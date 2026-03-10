import { useQuery } from '@tanstack/react-query';
import { fetchActiveFires } from '@/services/firmsApi';
import { fireEvents as mockFires } from '@/data/mockData';
import type { FireEvent } from '@/services/apiTypes';

const TEN_MINUTES = 10 * 60 * 1000;

/**
 * Fetches live fire data from NASA FIRMS.
 * Falls back to mockData if the API key is missing or the request fails.
 */
export function useFireData() {
    return useQuery<FireEvent[]>({
        queryKey: ['fires'],
        queryFn: async () => {
            const key = import.meta.env.VITE_FIRMS_MAP_KEY;
            if (!key) return mockFires as FireEvent[];
            try {
                return await fetchActiveFires();
            } catch (err) {
                console.warn('[useFireData] FIRMS API failed, using mock data:', err);
                return mockFires as FireEvent[];
            }
        },
        staleTime: TEN_MINUTES,
        refetchInterval: TEN_MINUTES,
        retry: 1,
        retryDelay: 3000,
    });
}
