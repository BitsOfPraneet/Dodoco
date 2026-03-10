import { useQuery } from '@tanstack/react-query';
import { fetchSpeciesForFire } from '@/services/gbifApi';
import { getSpeciesForFire } from '@/data/mockData';
import type { FireEvent } from '@/services/apiTypes';
import type { Species } from '@/services/apiTypes';

/**
 * Fetches species data for a specific fire from GBIF + IUCN.
 * Falls back to mockData species if unavailable.
 */
export function useSpeciesForFire(fire: FireEvent | null) {
    return useQuery<Species[]>({
        queryKey: ['species', fire?.id],
        queryFn: async () => {
            if (!fire) return [];

            // If this is a mock fire (starts with 's' IDs in speciesIds), use mock data
            if (fire.speciesIds.length > 0 && fire.speciesIds[0].startsWith('s')) {
                return getSpeciesForFire(fire as any) as Species[];
            }

            try {
                const [lat, lng] = fire.coordinates;
                return await fetchSpeciesForFire(lat, lng, fire.id);
            } catch (err) {
                console.warn('[useSpeciesForFire] GBIF failed:', err);
                return [];
            }
        },
        enabled: !!fire,
        staleTime: 5 * 60 * 1000, // species data stable for 5 min
        retry: 1,
    });
}
