import type { Species, GBIFOccurrence, IUCNStatus } from './apiTypes';
import { lookupIUCNStatus } from './iucnApi';

const GBIF_BASE = 'https://api.gbif.org/v1';

/** Degree offset for ~50km bounding box */
const DEG_OFFSET = 0.45; // ~50km at equator

/** Timeout a fetch after N ms */
function fetchWithTimeout(url: string, timeoutMs = 6000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(id));
}

/**
 * Given fire coordinates, query GBIF for species occurring within a ~50km box
 * then enrich with IUCN status (fast, parallel, with timeout).
 */
export async function fetchSpeciesForFire(
    lat: number,
    lng: number,
    fireId: string,
): Promise<Species[]> {
    try {
        const minLat = lat - DEG_OFFSET;
        const maxLat = lat + DEG_OFFSET;
        const minLng = lng - DEG_OFFSET;
        const maxLng = lng + DEG_OFFSET;

        // WKT polygon — anti-clockwise as required by GBIF
        const wkt = `POLYGON((${minLng} ${minLat},${maxLng} ${minLat},${maxLng} ${maxLat},${minLng} ${maxLat},${minLng} ${minLat}))`;

        const params = new URLSearchParams({
            geometry: wkt,
            limit: '30',
            hasCoordinate: 'true',
            occurrenceStatus: 'PRESENT',
            kingdomKey: '1', // Animalia — skips plants/fungi for speed
        });

        const res = await fetchWithTimeout(`${GBIF_BASE}/occurrence/search?${params}`, 8000);
        if (!res.ok) return [];

        const json = await res.json();
        const results: GBIFOccurrence[] = json?.results ?? [];

        // Deduplicate by speciesKey
        const seen = new Set<number>();
        const unique = results.filter((r) => {
            if (!r.speciesKey || seen.has(r.speciesKey)) return false;
            seen.add(r.speciesKey);
            return true;
        });

        // Enrich with IUCN status — ALL in parallel with individual timeouts
        const batch = unique.slice(0, 10);
        const enriched = await Promise.all(
            batch.map(async (occ, idx): Promise<Species> => {
                const scientificName = occ.species ?? occ.scientificName ?? 'Unknown species';

                // IUCN lookup with timeout — don't let one slow call block everything
                let iucnStatus: IUCNStatus = 'LC';
                let population = 'Unknown';
                try {
                    const result = await Promise.race([
                        lookupIUCNStatus(scientificName),
                        new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
                    ]);
                    if (result) {
                        iucnStatus = result.status ?? 'LC';
                        population = result.population ?? 'Unknown';
                    }
                } catch {
                    // silently skip
                }

                return {
                    id: `${fireId}-sp-${idx}`,
                    commonName: occ.vernacularName ?? toCommonName(scientificName),
                    scientificName,
                    iucnStatus,
                    population,
                    habitatType: inferHabitatType(occ.class ?? ''),
                    isEndemic: false,
                    imageUrl: getWikimediaImage(scientificName),
                    description: `${occ.class ?? 'Species'} recorded in fire burn zone.`,
                };
            }),
        );

        return enriched;
    } catch {
        return [];
    }
}

/** Derive a readable common name from a scientific name */
function toCommonName(scientificName: string): string {
    // Strip author/year info and just return genus + species
    return scientificName.split(' ').slice(0, 2).join(' ');
}

/** Infer habitat type from taxonomic class */
function inferHabitatType(taxClass: string): Species['habitatType'] {
    const lower = taxClass.toLowerCase();
    if (lower.includes('aves') || lower.includes('mammal')) return 'forest';
    if (lower.includes('amphibia')) return 'wetland';
    if (lower.includes('reptil')) return 'grassland';
    if (lower.includes('actinopteri') || lower.includes('fish')) return 'wetland';
    return 'forest';
}

/** Generate a Wikimedia Commons thumbnail URL for a species */
function getWikimediaImage(scientificName: string): string {
    const encoded = encodeURIComponent(scientificName.replace(/ /g, '_'));
    return `https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/${encoded}&width=120`;
}
