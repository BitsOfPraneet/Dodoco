/**
 * Shared types that mirror the mockData interfaces exactly.
 * Components import from here so they never need to change.
 */

export type IUCNStatus = 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
export type Intensity = 'low' | 'medium' | 'high' | 'extreme';
export type HabitatType = 'forest' | 'grassland' | 'wetland' | 'mountain' | 'coastal';

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  iucnStatus: IUCNStatus;
  population: string;
  habitatType: HabitatType;
  isEndemic: boolean;
  imageUrl: string;
  description: string;
}

export interface FireEvent {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  coordinates: [number, number];
  intensity: Intensity;
  frp: number;
  areaBurned: number;
  biodiversityScore: number;
  biome: string;
  biomeColor: string;
  speciesIds: string[];
  carbonReleased: number;
  recoveryYears: number;
  aiSummary: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  startTime: string;
  windSpeed: number;
  duration: number;
}

/** Raw FIRMS VIIRS record parsed from CSV */
export interface FIRMSRecord {
  latitude: number;
  longitude: number;
  bright_ti4: number;
  scan: number;
  track: number;
  acq_date: string;
  acq_time: string;
  satellite: string;
  confidence: string;
  version: string;
  bright_ti5: number;
  frp: number;
  daynight: string;
}

/** Raw GBIF occurrence result */
export interface GBIFOccurrence {
  key: number;
  speciesKey?: number;
  species?: string;
  scientificName: string;
  vernacularName?: string;
  class?: string;
  kingdom?: string;
  decimalLatitude?: number;
  decimalLongitude?: number;
}

/** IUCN species lookup result */
export interface IUCNResult {
  status: IUCNStatus;
  population: string;
}
