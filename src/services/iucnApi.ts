import type { IUCNResult, IUCNStatus } from './apiTypes';

const TOKEN = import.meta.env.VITE_IUCN_TOKEN as string;
const BASE = 'https://apiv3.iucnredlist.org/api/v3';

// Module-level cache to avoid re-fetching within a session
const cache = new Map<string, IUCNResult>();

const IUCN_STATUS_MAP: Record<string, IUCNStatus> = {
    'Critically Endangered': 'CR',
    'Endangered': 'EN',
    'Vulnerable': 'VU',
    'Near Threatened': 'NT',
    'Least Concern': 'LC',
    'Data Deficient': 'LC',
    'Extinct in the Wild': 'CR',
};

/**
 * Look up IUCN Red List status for a scientific name.
 * Returns null if not found or API unavailable.
 */
export async function lookupIUCNStatus(scientificName: string): Promise<IUCNResult | null> {
    if (!TOKEN) return null;

    const key = scientificName.toLowerCase();
    if (cache.has(key)) return cache.get(key)!;

    try {
        const url = `${BASE}/species/${encodeURIComponent(scientificName)}?token=${TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) return null;

        const json = await res.json();
        const result = json?.result?.[0];
        if (!result) return null;

        const rawStatus: string = result.category ?? '';
        const status: IUCNStatus = IUCN_STATUS_MAP[rawStatus] ?? 'LC';

        // Try to get population count from narrative
        const narrative = json?.result?.[0]?.population_trend ?? '';
        const pop = result.population_size
            ? `~${Number(result.population_size).toLocaleString()}`
            : 'Unknown';

        const iucnResult: IUCNResult = { status, population: pop };
        cache.set(key, iucnResult);
        return iucnResult;
    } catch {
        return null;
    }
}
