import { useMemo } from 'react';
import { useFireData } from './useFireData';

export interface GlobalStats {
    activeFires: number;
    hectaresBurning: number;
    speciesAtRisk: number;
    avgBiodiversityScore: number;
}

/**
 * Derives global aggregate stats from live fire data.
 */
export function useGlobalStats(): GlobalStats {
    const { data: fires = [] } = useFireData();

    return useMemo(() => {
        const activeFires = fires.length;
        const hectaresBurning = fires.reduce((s, f) => s + f.areaBurned, 0);
        // Estimate species at risk: unique species IDs or 1–4 per fire based on score
        const speciesAtRisk = fires.reduce((s, f) => {
            return s + (f.speciesIds.length > 0 ? f.speciesIds.length : Math.round(f.biodiversityScore / 25));
        }, 0);
        const avgBiodiversityScore =
            fires.length > 0
                ? Math.round(fires.reduce((s, f) => s + f.biodiversityScore, 0) / fires.length)
                : 0;

        return { activeFires, hectaresBurning, speciesAtRisk, avgBiodiversityScore };
    }, [fires]);
}
