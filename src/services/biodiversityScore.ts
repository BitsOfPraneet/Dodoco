/**
 * Biodiversity Impact Score Engine
 *
 * Score = weighted sum of 5 factors (total = 100):
 *   - Species richness in burn zone (30%)
 *   - % of species that are IUCN threatened (25%)
 *   - Fire Radiative Power / intensity (20%)
 *   - Presence of endemic species (15%)
 *   - Overlap with protected areas (10%)
 */

interface ScoreInput {
    frp: number;           // Fire Radiative Power in MW
    speciesRichness: number; // number of species in burn zone
    threatRatio: number;   // 0–1, fraction of species that are threatened (VU/EN/CR)
    hasEndemic: boolean;
    inProtectedArea: boolean;
}

const MAX_FRP = 1200;
const MAX_RICHNESS = 30;

export function computeBiodiversityScore(input: ScoreInput): number {
    const richnessScore = Math.min(input.speciesRichness / MAX_RICHNESS, 1) * 30;
    const threatScore = Math.min(input.threatRatio, 1) * 25;
    const frpScore = Math.min(input.frp / MAX_FRP, 1) * 20;
    const endemicScore = input.hasEndemic ? 15 : 0;
    const protectedScore = input.inProtectedArea ? 10 : 0;

    return Math.round(richnessScore + threatScore + frpScore + endemicScore + protectedScore);
}
