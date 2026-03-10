import type { FIRMSRecord, FireEvent, Intensity } from './apiTypes';
import { computeBiodiversityScore } from './biodiversityScore';

const FIRMS_KEY = import.meta.env.VITE_FIRMS_MAP_KEY as string;
const BASE_URL = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv';

// Fetch global active fires from VIIRS SNPP (past 1 day, world)
export async function fetchActiveFires(): Promise<FireEvent[]> {
    if (!FIRMS_KEY) throw new Error('VITE_FIRMS_MAP_KEY not set');

    const url = `${BASE_URL}/${FIRMS_KEY}/VIIRS_SNPP_NRT/world/1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`FIRMS API error: ${res.status}`);

    const csv = await res.text();
    const records = parseCSV(csv);

    if (records.length === 0) throw new Error('No fire records returned');

    // Cluster nearby records and convert to FireEvent[]
    const clusters = clusterFires(records);
    return clusters.map((cluster, idx) => clusterToFireEvent(cluster, idx));
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────

function parseCSV(csv: string): FIRMSRecord[] {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim());
    return lines.slice(1).map((line) => {
        const vals = line.split(',');
        const row: Record<string, string> = {};
        headers.forEach((h, i) => { row[h] = (vals[i] ?? '').trim(); });
        return {
            latitude: parseFloat(row.latitude ?? '0'),
            longitude: parseFloat(row.longitude ?? '0'),
            bright_ti4: parseFloat(row.bright_ti4 ?? '0'),
            scan: parseFloat(row.scan ?? '0'),
            track: parseFloat(row.track ?? '0'),
            acq_date: row.acq_date ?? '',
            acq_time: row.acq_time ?? '',
            satellite: row.satellite ?? '',
            confidence: row.confidence ?? 'n',
            version: row.version ?? '',
            bright_ti5: parseFloat(row.bright_ti5 ?? '0'),
            frp: parseFloat(row.frp ?? '0'),
            daynight: row.daynight ?? '',
        };
    }).filter((r) => !isNaN(r.latitude) && !isNaN(r.longitude));
}

// ─── Clustering ───────────────────────────────────────────────────────────────

const CLUSTER_RADIUS_DEG = 0.45; // ~50km

function clusterFires(records: FIRMSRecord[]): FIRMSRecord[][] {
    const assigned = new Set<number>();
    const clusters: FIRMSRecord[][] = [];

    // Sort by FRP desc so the hottest fire seeds each cluster
    const sorted = [...records].sort((a, b) => b.frp - a.frp);

    for (let i = 0; i < sorted.length; i++) {
        if (assigned.has(i)) continue;
        const seed = sorted[i];
        const cluster: FIRMSRecord[] = [seed];
        assigned.add(i);

        for (let j = i + 1; j < sorted.length; j++) {
            if (assigned.has(j)) continue;
            const r = sorted[j];
            if (
                Math.abs(r.latitude - seed.latitude) < CLUSTER_RADIUS_DEG &&
                Math.abs(r.longitude - seed.longitude) < CLUSTER_RADIUS_DEG
            ) {
                cluster.push(r);
                assigned.add(j);
            }
        }
        clusters.push(cluster);
    }

    // Return top 50 clusters by total FRP
    return clusters
        .sort((a, b) => totalFRP(b) - totalFRP(a))
        .slice(0, 50);
}

function totalFRP(cluster: FIRMSRecord[]): number {
    return cluster.reduce((s, r) => s + r.frp, 0);
}

// ─── Cluster → FireEvent ──────────────────────────────────────────────────────

function clusterToFireEvent(cluster: FIRMSRecord[], idx: number): FireEvent {
    // Use centroid of cluster
    const lat = cluster.reduce((s, r) => s + r.latitude, 0) / cluster.length;
    const lng = cluster.reduce((s, r) => s + r.longitude, 0) / cluster.length;
    const frp = Math.round(cluster.reduce((s, r) => s + r.frp, 0));
    const maxBrightness = Math.max(...cluster.map((r) => r.bright_ti4));

    const intensity = frpToIntensity(frp);
    const country = getCountryFromCoords(lat, lng);
    const biomeInfo = getBiomeFromCoords(lat, lng);
    const areaBurned = Math.round(cluster.length * 375); // each VIIRS pixel ≈ 375m × 375m = 0.14 km²
    const carbonReleased = Math.round(areaBurned * 68); // ~68 tC/ha average
    const recoveryYears = getRecoveryYears(biomeInfo.biome);

    const biodiversityScore = computeBiodiversityScore({
        frp,
        speciesRichness: Math.min(cluster.length, 30),
        threatRatio: 0, // updated after GBIF/IUCN call
        hasEndemic: false,
        inProtectedArea: false,
    });

    const acqDate = cluster[0].acq_date;
    const acqTime = cluster[0].acq_time.padStart(4, '0');
    const startTime = `${acqDate}T${acqTime.slice(0, 2)}:${acqTime.slice(2, 4)}:00Z`;

    // Generate descriptive fire name: "Biome Fire, Country" or "Region Fire" for unknown
    const regionDesc = getRegionDescriptor(lat, lng);
    const fireName = country.name !== 'Unknown'
        ? `${biomeInfo.biome} Fire, ${country.name}`
        : `${biomeInfo.biome} Fire, ${regionDesc}`;

    return {
        id: `firms-${idx}-${acqDate}`,
        name: fireName,
        country: country.name !== 'Unknown' ? country.name : regionDesc,
        countryFlag: country.flag,
        coordinates: [lat, lng],
        intensity,
        frp,
        areaBurned,
        biodiversityScore,
        biome: biomeInfo.biome,
        biomeColor: biomeInfo.color,
        speciesIds: [],
        carbonReleased,
        recoveryYears,
        aiSummary: `Active fire cluster detected at ${lat.toFixed(2)}°, ${lng.toFixed(2)}° in ${biomeInfo.biome} biome${country.name !== 'Unknown' ? `, ${country.name}` : ''} with total FRP of ${frp} MW across ${cluster.length} satellite detection(s). Estimated ${areaBurned.toLocaleString()} hectares affected in ${biomeInfo.biome.toLowerCase()} ecosystem.`,
        trend: 'up',
        trendPercent: Math.round(frp / 100),
        startTime,
        windSpeed: Math.round(15 + (frp / 100) + Math.random() * 20),
        duration: 24,
    };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function frpToIntensity(frp: number): Intensity {
    if (frp >= 500) return 'extreme';
    if (frp >= 200) return 'high';
    if (frp >= 80) return 'medium';
    return 'low';
}

function getRecoveryYears(biome: string): number {
    const map: Record<string, number> = {
        'Tropical Forest': 55, 'Boreal Forest': 80, 'Temperate Forest': 45,
        'Mediterranean': 15, 'Savanna': 8, 'Grassland': 5, 'Tundra': 40,
    };
    return map[biome] ?? 20;
}

// ─── Biome Lookup ─────────────────────────────────────────────────────────────

function getBiomeFromCoords(lat: number, lng: number): { biome: string; color: string } {
    // Approximate biome from lat + lon bounding boxes
    if (lat > 60) return { biome: 'Boreal Forest', color: 'hsl(210, 60%, 50%)' };
    if (lat > 50) return { biome: 'Temperate Forest', color: 'hsl(170, 50%, 45%)' };
    if (lat > 35 && lat < 50) {
        if ((lng > -10 && lng < 40) || (lng > -125 && lng < -100)) {
            return { biome: 'Mediterranean', color: 'hsl(280, 60%, 50%)' };
        }
        return { biome: 'Temperate Forest', color: 'hsl(170, 50%, 45%)' };
    }
    if (lat > 23 && lat <= 35) return { biome: 'Mediterranean', color: 'hsl(280, 60%, 50%)' };
    if (lat >= -5 && lat <= 23 && lng >= -80 && lng <= -35) {
        return { biome: 'Tropical Forest', color: 'hsl(145, 60%, 40%)' };
    }
    if (lat >= -5 && lat <= 5 && lng >= 10 && lng <= 30) {
        return { biome: 'Tropical Forest', color: 'hsl(145, 60%, 40%)' };
    }
    if (lat >= -20 && lat <= 10 && lng >= -80 && lng <= -35) {
        return { biome: 'Savanna', color: 'hsl(50, 70%, 50%)' };
    }
    if (lat >= -35 && lat <= -5 && lng >= 10 && lng <= 50) {
        return { biome: 'Savanna', color: 'hsl(50, 70%, 50%)' };
    }
    if (lat >= -10 && lat <= 10 && lng >= 95 && lng <= 145) {
        return { biome: 'Tropical Forest', color: 'hsl(145, 60%, 40%)' };
    }
    if (lat >= -45 && lat <= -10 && lng >= 110 && lng <= 155) {
        return { biome: 'Savanna', color: 'hsl(50, 70%, 50%)' };
    }
    if (lat < -50) return { biome: 'Tundra', color: 'hsl(200, 30%, 60%)' };
    return { biome: 'Grassland', color: 'hsl(80, 55%, 45%)' };
}

// ─── Country Lookup (lat/lng bounding boxes) ──────────────────────────────────

const COUNTRY_BOXES: { name: string; flag: string; minLat: number; maxLat: number; minLng: number; maxLng: number }[] = [
    { name: 'Canada', flag: '🇨🇦', minLat: 42, maxLat: 83, minLng: -141, maxLng: -52 },
    { name: 'United States', flag: '🇺🇸', minLat: 24, maxLat: 49, minLng: -125, maxLng: -66 },
    { name: 'Alaska', flag: '🇺🇸', minLat: 54, maxLat: 72, minLng: -170, maxLng: -130 },
    { name: 'Mexico', flag: '🇲🇽', minLat: 14, maxLat: 33, minLng: -118, maxLng: -86 },
    { name: 'Guatemala', flag: '🇬🇹', minLat: 13, maxLat: 18, minLng: -92, maxLng: -88 },
    { name: 'Honduras', flag: '🇭🇳', minLat: 13, maxLat: 16, minLng: -89, maxLng: -83 },
    { name: 'Cuba', flag: '🇨🇺', minLat: 19, maxLat: 24, minLng: -85, maxLng: -74 },
    { name: 'Brazil', flag: '🇧🇷', minLat: -33, maxLat: 5, minLng: -74, maxLng: -35 },
    { name: 'Colombia', flag: '🇨🇴', minLat: -4, maxLat: 13, minLng: -79, maxLng: -66 },
    { name: 'Peru', flag: '🇵🇪', minLat: -18, maxLat: 0, minLng: -81, maxLng: -68 },
    { name: 'Bolivia', flag: '🇧🇴', minLat: -23, maxLat: -9, minLng: -69, maxLng: -57 },
    { name: 'Argentina', flag: '🇦🇷', minLat: -55, maxLat: -21, minLng: -74, maxLng: -53 },
    { name: 'Chile', flag: '🇨🇱', minLat: -56, maxLat: -17, minLng: -76, maxLng: -66 },
    { name: 'Venezuela', flag: '🇻🇪', minLat: 0, maxLat: 13, minLng: -73, maxLng: -59 },
    { name: 'Paraguay', flag: '🇵🇾', minLat: -27, maxLat: -19, minLng: -62, maxLng: -54 },
    { name: 'Ecuador', flag: '🇪🇨', minLat: -5, maxLat: 2, minLng: -81, maxLng: -75 },
    { name: 'Portugal', flag: '🇵🇹', minLat: 36, maxLat: 42, minLng: -10, maxLng: -6 },
    { name: 'Spain', flag: '🇪🇸', minLat: 35, maxLat: 44, minLng: -10, maxLng: 4 },
    { name: 'France', flag: '🇫🇷', minLat: 41, maxLat: 51, minLng: -5, maxLng: 9 },
    { name: 'Italy', flag: '🇮🇹', minLat: 36, maxLat: 47, minLng: 6, maxLng: 19 },
    { name: 'Greece', flag: '🇬🇷', minLat: 34, maxLat: 42, minLng: 19, maxLng: 30 },
    { name: 'Turkey', flag: '🇹🇷', minLat: 35, maxLat: 42, minLng: 25, maxLng: 45 },
    { name: 'Ukraine', flag: '🇺🇦', minLat: 44, maxLat: 53, minLng: 22, maxLng: 40 },
    { name: 'Romania', flag: '🇷🇴', minLat: 43, maxLat: 48, minLng: 20, maxLng: 30 },
    { name: 'Germany', flag: '🇩🇪', minLat: 47, maxLat: 55, minLng: 5, maxLng: 15 },
    { name: 'Sweden', flag: '🇸🇪', minLat: 55, maxLat: 69, minLng: 11, maxLng: 24 },
    { name: 'Finland', flag: '🇫🇮', minLat: 59, maxLat: 70, minLng: 20, maxLng: 32 },
    { name: 'Norway', flag: '🇳🇴', minLat: 57, maxLat: 71, minLng: 4, maxLng: 31 },
    { name: 'Russia', flag: '🇷🇺', minLat: 41, maxLat: 82, minLng: 26, maxLng: 180 },
    { name: 'China', flag: '🇨🇳', minLat: 18, maxLat: 53, minLng: 73, maxLng: 135 },
    { name: 'Mongolia', flag: '🇲🇳', minLat: 41, maxLat: 52, minLng: 87, maxLng: 120 },
    { name: 'Japan', flag: '🇯🇵', minLat: 24, maxLat: 46, minLng: 122, maxLng: 154 },
    { name: 'South Korea', flag: '🇰🇷', minLat: 33, maxLat: 39, minLng: 124, maxLng: 132 },
    { name: 'India', flag: '🇮🇳', minLat: 8, maxLat: 37, minLng: 68, maxLng: 98 },
    { name: 'Pakistan', flag: '🇵🇰', minLat: 23, maxLat: 37, minLng: 60, maxLng: 77 },
    { name: 'Nepal', flag: '🇳🇵', minLat: 26, maxLat: 30, minLng: 80, maxLng: 88 },
    { name: 'Bangladesh', flag: '🇧🇩', minLat: 20, maxLat: 27, minLng: 88, maxLng: 93 },
    { name: 'Vietnam', flag: '🇻🇳', minLat: 8, maxLat: 23, minLng: 102, maxLng: 110 },
    { name: 'Cambodia', flag: '🇰🇭', minLat: 10, maxLat: 15, minLng: 102, maxLng: 108 },
    { name: 'Laos', flag: '🇱🇦', minLat: 13, maxLat: 23, minLng: 100, maxLng: 108 },
    { name: 'Philippines', flag: '🇵🇭', minLat: 4, maxLat: 21, minLng: 116, maxLng: 127 },
    { name: 'Malaysia', flag: '🇲🇾', minLat: 0, maxLat: 7, minLng: 100, maxLng: 119 },
    { name: 'Indonesia', flag: '🇮🇩', minLat: -11, maxLat: 6, minLng: 95, maxLng: 141 },
    { name: 'Australia', flag: '🇦🇺', minLat: -44, maxLat: -10, minLng: 113, maxLng: 154 },
    { name: 'Papua New Guinea', flag: '🇵🇬', minLat: -12, maxLat: 0, minLng: 140, maxLng: 160 },
    { name: 'New Zealand', flag: '🇳🇿', minLat: -47, maxLat: -34, minLng: 165, maxLng: 179 },
    { name: 'Thailand', flag: '🇹🇭', minLat: 5, maxLat: 21, minLng: 97, maxLng: 106 },
    { name: 'Myanmar', flag: '🇲🇲', minLat: 9, maxLat: 29, minLng: 92, maxLng: 101 },
    { name: 'Iran', flag: '🇮🇷', minLat: 25, maxLat: 40, minLng: 44, maxLng: 63 },
    { name: 'Iraq', flag: '🇮🇶', minLat: 29, maxLat: 37, minLng: 38, maxLng: 49 },
    { name: 'Saudi Arabia', flag: '🇸🇦', minLat: 15, maxLat: 33, minLng: 34, maxLng: 56 },
    { name: 'Kazakhstan', flag: '🇰🇿', minLat: 40, maxLat: 55, minLng: 50, maxLng: 87 },
    { name: 'DR Congo', flag: '🇨🇩', minLat: -15, maxLat: 5, minLng: 12, maxLng: 31 },
    { name: 'Angola', flag: '🇦🇴', minLat: -18, maxLat: -4, minLng: 11, maxLng: 25 },
    { name: 'Mozambique', flag: '🇲🇿', minLat: -27, maxLat: -10, minLng: 32, maxLng: 41 },
    { name: 'Tanzania', flag: '🇹🇿', minLat: -11, maxLat: -1, minLng: 29, maxLng: 40 },
    { name: 'Kenya', flag: '🇰🇪', minLat: -5, maxLat: 5, minLng: 33, maxLng: 42 },
    { name: 'Uganda', flag: '🇺🇬', minLat: -1, maxLat: 4, minLng: 29, maxLng: 35 },
    { name: 'Madagascar', flag: '🇲🇬', minLat: -26, maxLat: -12, minLng: 43, maxLng: 50 },
    { name: 'Zambia', flag: '🇿🇲', minLat: -18, maxLat: -8, minLng: 22, maxLng: 33 },
    { name: 'Zimbabwe', flag: '🇿🇼', minLat: -22, maxLat: -15, minLng: 25, maxLng: 33 },
    { name: 'Botswana', flag: '🇧🇼', minLat: -27, maxLat: -17, minLng: 20, maxLng: 29 },
    { name: 'Namibia', flag: '🇳🇦', minLat: -29, maxLat: -17, minLng: 12, maxLng: 25 },
    { name: 'South Africa', flag: '🇿🇦', minLat: -35, maxLat: -22, minLng: 16, maxLng: 33 },
    { name: 'Nigeria', flag: '🇳🇬', minLat: 4, maxLat: 14, minLng: 2, maxLng: 15 },
    { name: 'Ghana', flag: '🇬🇭', minLat: 4, maxLat: 11, minLng: -3, maxLng: 1 },
    { name: 'Cameroon', flag: '🇨🇲', minLat: 1, maxLat: 13, minLng: 8, maxLng: 16 },
    { name: 'Central African Republic', flag: '🇨🇫', minLat: 2, maxLat: 11, minLng: 14, maxLng: 27 },
    { name: 'Ethiopia', flag: '🇪🇹', minLat: 3, maxLat: 15, minLng: 33, maxLng: 48 },
    { name: 'Somalia', flag: '🇸🇴', minLat: -2, maxLat: 12, minLng: 40, maxLng: 51 },
    { name: 'Sudan', flag: '🇸🇩', minLat: 8, maxLat: 23, minLng: 22, maxLng: 39 },
    { name: 'South Sudan', flag: '🇸🇸', minLat: 3, maxLat: 13, minLng: 24, maxLng: 36 },
    { name: 'Chad', flag: '🇹🇩', minLat: 7, maxLat: 24, minLng: 13, maxLng: 24 },
    { name: 'Niger', flag: '🇳🇪', minLat: 11, maxLat: 24, minLng: 0, maxLng: 16 },
    { name: 'Mali', flag: '🇲🇱', minLat: 10, maxLat: 25, minLng: -12, maxLng: 4 },
    { name: 'Morocco', flag: '🇲🇦', minLat: 27, maxLat: 36, minLng: -13, maxLng: -1 },
    { name: 'Algeria', flag: '🇩🇿', minLat: 19, maxLat: 37, minLng: -9, maxLng: 12 },
    { name: 'Libya', flag: '🇱🇾', minLat: 19, maxLat: 33, minLng: 9, maxLng: 25 },
    { name: 'Egypt', flag: '🇪🇬', minLat: 22, maxLat: 31, minLng: 25, maxLng: 36 },
];

function getCountryFromCoords(lat: number, lng: number): { name: string; flag: string } {
    for (const c of COUNTRY_BOXES) {
        if (lat >= c.minLat && lat <= c.maxLat && lng >= c.minLng && lng <= c.maxLng) {
            return { name: c.name, flag: c.flag };
        }
    }
    return { name: 'Unknown', flag: '🌍' };
}

// ─── Region Descriptor (fallback when no exact country match) ─────────────────

function getRegionDescriptor(lat: number, lng: number): string {
    // Broad region labels for fires that fall outside specific country bounding boxes
    if (lat > 60) return 'Northern Eurasia';
    if (lat > 35 && lng >= -30 && lng <= 50) return 'Southern Europe';
    if (lat > 35 && lng > 50 && lng <= 100) return 'Central Asia';
    if (lat > 35 && lng > 100) return 'East Asia';
    if (lat > 23 && lng >= -130 && lng <= -60) return 'North America';
    if (lat > 0 && lat <= 23 && lng >= -120 && lng <= -60) return 'Central America';
    if (lat <= 0 && lat > -35 && lng >= -80 && lng <= -35) return 'South America';
    if (lat > 0 && lat <= 23 && lng >= -20 && lng <= 55) return 'West Africa';
    if (lat > -35 && lat <= 0 && lng >= 10 && lng <= 55) return 'East Africa';
    if (lat > 0 && lat <= 23 && lng >= 55 && lng <= 100) return 'South Asia';
    if (lat > -10 && lat <= 23 && lng >= 95 && lng <= 145) return 'Southeast Asia';
    if (lat <= -10 && lng >= 100 && lng <= 180) return 'Oceania';
    if (lat <= -35) return 'Southern Hemisphere';
    if (lng >= 150) return 'Pacific Region';
    if (lng <= -130) return 'Pacific Region';
    return 'Remote Region';
}

