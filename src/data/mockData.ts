export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  iucnStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  population: string;
  habitatType: 'forest' | 'grassland' | 'wetland' | 'mountain' | 'coastal';
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
  intensity: 'low' | 'medium' | 'high' | 'extreme';
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

export const speciesData: Species[] = [
  { id: 's1', commonName: 'Jaguar', scientificName: 'Panthera onca', iucnStatus: 'VU', population: '~64,000', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/12590596365142502963_0', description: 'Largest cat in the Americas, apex predator of tropical forests.' },
  { id: 's2', commonName: 'Giant Otter', scientificName: 'Pteronura brasiliensis', iucnStatus: 'EN', population: '~5,000', habitatType: 'wetland', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8170190579011439886_0', description: 'Largest otter species, highly social, declining due to habitat loss.' },
  { id: 's3', commonName: 'Harpy Eagle', scientificName: 'Harpia harpyja', iucnStatus: 'VU', population: '~50,000', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/2369141884340720058_0', description: 'One of the most powerful eagles, requires vast forest territory.' },
  { id: 's4', commonName: 'Black Spider Monkey', scientificName: 'Ateles paniscus', iucnStatus: 'EN', population: '~12,000', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/14316922553478891093_0', description: 'Arboreal primate, critical seed disperser in tropical forests.' },
  { id: 's5', commonName: 'Giant Anteater', scientificName: 'Myrmecophaga tridactyla', iucnStatus: 'VU', population: '~5,000', habitatType: 'grassland', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/4725989721263812577_0', description: 'Iconic insectivore, highly vulnerable to habitat fires.' },
  { id: 's6', commonName: 'Hyacinth Macaw', scientificName: 'Anodorhynchus hyacinthinus', iucnStatus: 'VU', population: '~6,500', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15017483803719115146_0', description: 'Largest flying parrot species, iconic blue plumage.' },
  { id: 's7', commonName: 'Amazonian Manatee', scientificName: 'Trichechus inunguis', iucnStatus: 'VU', population: '~10,000', habitatType: 'wetland', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15355858444770665456_0', description: 'Only freshwater manatee, endemic to Amazon basin.' },
  { id: 's8', commonName: 'Koala', scientificName: 'Phascolarctos cinereus', iucnStatus: 'EN', population: '~43,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/10821015387255102322_0', description: 'Iconic Australian marsupial, devastated by 2019-2020 fires.' },
  { id: 's9', commonName: 'Platypus', scientificName: 'Ornithorhynchus anatinus', iucnStatus: 'NT', population: '~300,000', habitatType: 'wetland', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/7408675505370623896_0', description: 'Egg-laying mammal, highly sensitive to waterway degradation.' },
  { id: 's10', commonName: 'Tasmanian Devil', scientificName: 'Sarcophilus harrisii', iucnStatus: 'EN', population: '~25,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8171938328560243127_0', description: 'Largest surviving carnivorous marsupial.' },
  { id: 's11', commonName: 'Forest Elephant', scientificName: 'Loxodonta cyclotis', iucnStatus: 'CR', population: '~100,000', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/244029346059165152_0', description: 'Critical ecosystem engineer of Congo Basin forests.' },
  { id: 's12', commonName: 'Western Gorilla', scientificName: 'Gorilla gorilla', iucnStatus: 'CR', population: '~316,000', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/2018227173169389560_0', description: 'Critically endangered great ape, key seed disperser.' },
  { id: 's13', commonName: 'Okapi', scientificName: 'Okapia johnstoni', iucnStatus: 'EN', population: '~35,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/1641827993399868387_0', description: 'Forest giraffe, endemic to Congo Basin rainforests.' },
  { id: 's14', commonName: 'Bonobo', scientificName: 'Pan paniscus', iucnStatus: 'EN', population: '~20,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/17811572662213968743_0', description: 'Our closest relative alongside chimpanzees, found only in DRC.' },
  { id: 's15', commonName: 'California Condor', scientificName: 'Gymnogyps californianus', iucnStatus: 'CR', population: '~500', habitatType: 'mountain', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/10976426619548985642_0', description: 'North America\'s largest flying bird, recovered from near-extinction.' },
  { id: 's16', commonName: 'Chinook Salmon', scientificName: 'Oncorhynchus tshawytscha', iucnStatus: 'EN', population: '~750,000', habitatType: 'wetland', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/8488158465403484002_0', description: 'Keystone species for Pacific Northwest ecosystems.' },
  { id: 's17', commonName: 'Amur Leopard', scientificName: 'Panthera pardus orientalis', iucnStatus: 'CR', population: '~100', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/10447218830281767806_0', description: 'World\'s rarest big cat, confined to Russian Far East.' },
  { id: 's18', commonName: 'Siberian Tiger', scientificName: 'Panthera tigris altaica', iucnStatus: 'EN', population: '~500', habitatType: 'forest', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/4393761721067689784_0', description: 'Largest cat subspecies, adapted to extreme cold.' },
  { id: 's19', commonName: 'Snow Leopard', scientificName: 'Panthera uncia', iucnStatus: 'VU', population: '~4,000', habitatType: 'mountain', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/3618861874681890784_0', description: 'Ghost of the mountains, keystone predator of Central Asian highlands.' },
  { id: 's20', commonName: 'Sumatran Orangutan', scientificName: 'Pongo abelii', iucnStatus: 'CR', population: '~14,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/9192804705835199539_0', description: 'Critically endangered great ape of Borneo and Sumatra.' },
  { id: 's21', commonName: 'Numbat', scientificName: 'Myrmecobius fasciatus', iucnStatus: 'EN', population: '~1,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15612858274269593134_0', description: 'Unique marsupial termite-eater, WA state emblem.' },
  { id: 's22', commonName: 'Quokka', scientificName: 'Setonix brachyurus', iucnStatus: 'VU', population: '~12,000', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/7204034201379172659_0', description: 'Small macropod known as the world\'s happiest animal.' },
  { id: 's23', commonName: 'Sierra Nevada Bighorn', scientificName: 'Ovis canadensis sierrae', iucnStatus: 'EN', population: '~600', habitatType: 'mountain', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/10257840407424568100_0', description: 'Subspecies of bighorn sheep endemic to the Sierra Nevada.' },
  { id: 's24', commonName: 'Giant Panda', scientificName: 'Ailuropoda melanoleuca', iucnStatus: 'VU', population: '~1,800', habitatType: 'forest', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15661833965286430029_0', description: 'Conservation success story, iconic bamboo forest dweller.' },
  { id: 's25', commonName: 'Black Rhino', scientificName: 'Diceros bicornis', iucnStatus: 'CR', population: '~5,600', habitatType: 'grassland', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/15545384818993490271_0', description: 'Highly threatened by poaching, critical for savanna ecosystems.' },
  { id: 's26', commonName: 'Polar Bear', scientificName: 'Ursus maritimus', iucnStatus: 'VU', population: '~26,000', habitatType: 'coastal', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/6759563682570415841_0', description: 'Marine mammal threatened by rapidly disappearing sea ice.' },
  { id: 's27', commonName: 'Blue Whale', scientificName: 'Balaenoptera musculus', iucnStatus: 'EN', population: '~25,000', habitatType: 'coastal', isEndemic: false, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/5064635018407081819_0', description: 'Largest animal to ever live, recovering slowly from commercial whaling.' },
  { id: 's28', commonName: 'Mountain Gorilla', scientificName: 'Gorilla beringei beringei', iucnStatus: 'EN', population: '~1,063', habitatType: 'mountain', isEndemic: true, imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/1308436046242544251_0', description: 'Great ape found in high-altitude forests of Rwanda, Uganda, and DRC.' },
];

export const fireEvents: FireEvent[] = [
  {
    id: 'f1', name: 'Amazon Basin Fire #AF-2847', country: 'Brazil', countryFlag: '🇧🇷',
    coordinates: [-3.4653, -62.2159], intensity: 'extreme', frp: 847, areaBurned: 4200,
    biodiversityScore: 94, biome: 'Tropical Forest', biomeColor: 'hsl(145, 60%, 40%)',
    speciesIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'],
    carbonReleased: 284000, recoveryYears: 55, windSpeed: 23, duration: 72,
    trend: 'up', trendPercent: 12,
    startTime: '2026-03-06T14:23:00Z',
    aiSummary: 'This fire in the Amazon Basin represents one of the most ecologically significant fire events this week. The burn zone overlaps critical habitat for 7 IUCN-listed threatened species, including the Endangered Giant Otter whose population has declined 60% since 1980. The estimated biodiversity recovery timeline of 40-60 years means damage to this ecosystem will persist well beyond current policy cycles. Immediate intervention is recommended to prevent secondary species displacement in adjacent buffer zones.'
  },
  {
    id: 'f2', name: 'California Wildfire #CW-1192', country: 'United States', countryFlag: '🇺🇸',
    coordinates: [37.7749, -119.4194], intensity: 'high', frp: 523, areaBurned: 1800,
    biodiversityScore: 72, biome: 'Mediterranean', biomeColor: 'hsl(280, 60%, 50%)',
    speciesIds: ['s15', 's16', 's23'],
    carbonReleased: 98000, recoveryYears: 25, windSpeed: 45, duration: 48,
    trend: 'up', trendPercent: 8,
    startTime: '2026-03-07T08:15:00Z',
    aiSummary: 'The California fire threatens critical habitat for the California Condor, one of the world\'s rarest birds with only ~500 individuals remaining. The fire\'s proximity to the Sierra Nevada range also puts the endangered Bighorn Sheep at significant risk. High wind speeds are accelerating spread into adjacent watersheds critical for Chinook Salmon spawning grounds.'
  },
  {
    id: 'f3', name: 'Siberian Forest Fire #SF-0847', country: 'Russia', countryFlag: '🇷🇺',
    coordinates: [62.0, 105.0], intensity: 'extreme', frp: 912, areaBurned: 8500,
    biodiversityScore: 78, biome: 'Boreal Forest', biomeColor: 'hsl(210, 60%, 50%)',
    speciesIds: ['s17', 's18', 's19'],
    carbonReleased: 520000, recoveryYears: 80, windSpeed: 18, duration: 168,
    trend: 'up', trendPercent: 15,
    startTime: '2026-03-01T03:42:00Z',
    aiSummary: 'This massive Siberian fire has been burning for over a week and represents a catastrophic threat to boreal biodiversity. The burn zone overlaps the last remaining habitat of the critically endangered Amur Leopard (~100 individuals). The boreal ecosystem\'s slow recovery rate means carbon sequestration capacity will be impaired for 80+ years.'
  },
  {
    id: 'f4', name: 'Congo Basin Fire #CB-3341', country: 'DR Congo', countryFlag: '🇨🇩',
    coordinates: [-0.228, 23.6345], intensity: 'high', frp: 634, areaBurned: 2100,
    biodiversityScore: 91, biome: 'Tropical Forest', biomeColor: 'hsl(145, 60%, 40%)',
    speciesIds: ['s11', 's12', 's13', 's14'],
    carbonReleased: 178000, recoveryYears: 60, windSpeed: 12, duration: 36,
    trend: 'up', trendPercent: 22,
    startTime: '2026-03-08T06:30:00Z',
    aiSummary: 'The Congo Basin fire is approaching critical habitat for two Critically Endangered species: the Forest Elephant and Western Gorilla. This region contains 234 endemic species found nowhere else on Earth. The fire\'s rapid escalation in the last 24 hours suggests possible human-caused ignition during dry season land clearing.'
  },
  {
    id: 'f5', name: 'Queensland Bushfire #QB-7721', country: 'Australia', countryFlag: '🇦🇺',
    coordinates: [-22.0, 144.0], intensity: 'high', frp: 478, areaBurned: 3200,
    biodiversityScore: 85, biome: 'Savanna', biomeColor: 'hsl(50, 70%, 50%)',
    speciesIds: ['s8', 's9', 's10', 's21', 's22'],
    carbonReleased: 145000, recoveryYears: 30, windSpeed: 55, duration: 96,
    trend: 'down', trendPercent: 3,
    startTime: '2026-03-05T11:00:00Z',
    aiSummary: 'Following the catastrophic 2019-2020 Black Summer fires that killed 3 billion animals, this Queensland fire threatens still-recovering Koala populations. The Endangered Koala has lost 30% of its population since 2018. Australian bushfire frequency has increased 2.4x compared to the 2000-2015 average.'
  },
  {
    id: 'f6', name: 'Borneo Forest Fire #BF-4412', country: 'Indonesia', countryFlag: '🇮🇩',
    coordinates: [0.9619, 114.5548], intensity: 'extreme', frp: 756, areaBurned: 5100,
    biodiversityScore: 89, biome: 'Tropical Forest', biomeColor: 'hsl(145, 60%, 40%)',
    speciesIds: ['s20'],
    carbonReleased: 410000, recoveryYears: 70, windSpeed: 15, duration: 120,
    trend: 'up', trendPercent: 18,
    startTime: '2026-03-03T09:12:00Z',
    aiSummary: 'Peatland fires in Borneo are releasing massive carbon stores and threatening the critically endangered Sumatran Orangutan. Peat fires can burn underground for months, making containment extremely difficult. The smoke haze is affecting air quality across Southeast Asia.'
  },
  {
    id: 'f7', name: 'Mediterranean Fire #MF-2201', country: 'Greece', countryFlag: '🇬🇷',
    coordinates: [38.2, 23.8], intensity: 'medium', frp: 312, areaBurned: 950,
    biodiversityScore: 54, biome: 'Mediterranean', biomeColor: 'hsl(280, 60%, 50%)',
    speciesIds: [],
    carbonReleased: 42000, recoveryYears: 15, windSpeed: 35, duration: 24,
    trend: 'stable', trendPercent: 0,
    startTime: '2026-03-08T16:45:00Z',
    aiSummary: 'Mediterranean ecosystem fires are becoming increasingly common due to extended dry seasons. While species diversity is lower than tropical zones, the Mediterranean biome contains many unique endemic plant species that cannot regenerate after high-intensity burns.'
  },
  {
    id: 'f8', name: 'Angola Savanna Fire #AS-1187', country: 'Angola', countryFlag: '🇦🇴',
    coordinates: [-11.2, 17.8], intensity: 'medium', frp: 287, areaBurned: 2800,
    biodiversityScore: 47, biome: 'Savanna', biomeColor: 'hsl(50, 70%, 50%)',
    speciesIds: [],
    carbonReleased: 67000, recoveryYears: 8, windSpeed: 20, duration: 18,
    trend: 'down', trendPercent: 5,
    startTime: '2026-03-08T22:10:00Z',
    aiSummary: 'Savanna fires in Angola are a natural part of the ecosystem cycle, but increased frequency is reducing recovery periods. The grassland biome shows moderate resilience but key woodland patches are being permanently lost.'
  },
  {
    id: 'f9', name: 'Cerrado Fire #CF-8834', country: 'Brazil', countryFlag: '🇧🇷',
    coordinates: [-15.0, -47.0], intensity: 'high', frp: 445, areaBurned: 3400,
    biodiversityScore: 68, biome: 'Savanna', biomeColor: 'hsl(50, 70%, 50%)',
    speciesIds: ['s1', 's5'],
    carbonReleased: 112000, recoveryYears: 20, windSpeed: 28, duration: 60,
    trend: 'up', trendPercent: 6,
    startTime: '2026-03-06T19:30:00Z',
    aiSummary: 'The Cerrado biome is the world\'s most biodiverse savanna and has lost 50% of its original vegetation. This fire threatens Jaguar corridors connecting fragmented habitats. The Cerrado is often overlooked in conservation attention compared to the Amazon, despite harboring 5% of global species diversity.'
  },
  {
    id: 'f10', name: 'Alaska Boreal Fire #AB-3390', country: 'United States', countryFlag: '🇺🇸',
    coordinates: [64.0, -153.0], intensity: 'medium', frp: 356, areaBurned: 6200,
    biodiversityScore: 42, biome: 'Boreal Forest', biomeColor: 'hsl(210, 60%, 50%)',
    speciesIds: [],
    carbonReleased: 340000, recoveryYears: 60, windSpeed: 14, duration: 144,
    trend: 'stable', trendPercent: 1,
    startTime: '2026-03-02T07:00:00Z',
    aiSummary: 'Arctic and subarctic fires are increasing at alarming rates due to climate change. While species diversity is lower, the massive carbon stores in permafrost and peatlands make these fires disproportionately important for global climate. Thawing permafrost creates a dangerous feedback loop.'
  },
  {
    id: 'f11', name: 'BC Wildfire #BC-5567', country: 'Canada', countryFlag: '🇨🇦',
    coordinates: [53.7, -127.6], intensity: 'high', frp: 589, areaBurned: 4100,
    biodiversityScore: 63, biome: 'Temperate Forest', biomeColor: 'hsl(170, 50%, 45%)',
    speciesIds: [],
    carbonReleased: 230000, recoveryYears: 45, windSpeed: 32, duration: 84,
    trend: 'up', trendPercent: 9,
    startTime: '2026-03-04T12:20:00Z',
    aiSummary: 'British Columbia experienced record-breaking fire seasons in 2023 and 2024. The temperate rainforest ecosystem, once considered too wet to burn, is now regularly experiencing fire due to prolonged droughts. Old-growth forest loss is irreplaceable on human timescales.'
  },
  {
    id: 'f12', name: 'Portugal Forest Fire #PF-1120', country: 'Portugal', countryFlag: '🇵🇹',
    coordinates: [39.5, -8.0], intensity: 'medium', frp: 298, areaBurned: 1200,
    biodiversityScore: 51, biome: 'Mediterranean', biomeColor: 'hsl(280, 60%, 50%)',
    speciesIds: [],
    carbonReleased: 54000, recoveryYears: 18, windSpeed: 40, duration: 30,
    trend: 'down', trendPercent: 7,
    startTime: '2026-03-07T14:55:00Z',
    aiSummary: 'Portugal continues to face severe fire seasons exacerbated by eucalyptus monoculture plantations. The 2017 fires killed 66 people and prompted EU-wide fire policy reform. Endemic Iberian species face compounding threats from repeated burns.'
  },
  {
    id: 'f13', name: 'Mozambique Fire #MZ-6643', country: 'Mozambique', countryFlag: '🇲🇿',
    coordinates: [-18.0, 35.0], intensity: 'low', frp: 187, areaBurned: 1800,
    biodiversityScore: 38, biome: 'Savanna', biomeColor: 'hsl(50, 70%, 50%)',
    speciesIds: [],
    carbonReleased: 35000, recoveryYears: 5, windSpeed: 16, duration: 12,
    trend: 'down', trendPercent: 11,
    startTime: '2026-03-09T01:30:00Z',
    aiSummary: 'Low-intensity savanna fire with moderate ecological impact. Grassland ecosystems show natural fire resilience, but increasing frequency is degrading soil quality and reducing native grass species diversity over time.'
  },
  {
    id: 'f14', name: 'Odisha Forest Fire #OF-4478', country: 'India', countryFlag: '🇮🇳',
    coordinates: [20.9, 84.0], intensity: 'medium', frp: 334, areaBurned: 900,
    biodiversityScore: 59, biome: 'Tropical Forest', biomeColor: 'hsl(145, 60%, 40%)',
    speciesIds: [],
    carbonReleased: 48000, recoveryYears: 22, windSpeed: 19, duration: 42,
    trend: 'up', trendPercent: 4,
    startTime: '2026-03-07T04:15:00Z',
    aiSummary: 'Eastern India\'s dry deciduous forests are experiencing increased fire frequency. Tiger corridors and elephant migration routes are being fragmented. The pre-monsoon dry season makes March particularly dangerous for forest fires in this region.'
  },
  {
    id: 'f15', name: 'Chile Wildfire #CL-9912', country: 'Chile', countryFlag: '🇨🇱',
    coordinates: [-38.0, -72.0], intensity: 'high', frp: 567, areaBurned: 2600,
    biodiversityScore: 66, biome: 'Temperate Forest', biomeColor: 'hsl(170, 50%, 45%)',
    speciesIds: [],
    carbonReleased: 134000, recoveryYears: 35, windSpeed: 42, duration: 56,
    trend: 'up', trendPercent: 14,
    startTime: '2026-03-05T18:40:00Z',
    aiSummary: 'Chile\'s Araucaria forests contain ancient tree species dating back to the Jurassic period. The Chilean fire season has intensified dramatically, with 2024 fires in Valparaíso killing over 130 people. Unique temperate rainforest species face existential threats.'
  },
];

export const getSpeciesForFire = (fire: FireEvent): Species[] => {
  return fire.speciesIds.map(id => speciesData.find(s => s.id === id)!).filter(Boolean);
};

export const iucnColors: Record<string, string> = {
  CR: 'hsl(0, 100%, 59%)',
  EN: 'hsl(20, 100%, 60%)',
  VU: 'hsl(42, 100%, 50%)',
  NT: 'hsl(210, 70%, 55%)',
  LC: 'hsl(145, 100%, 39%)',
};

export const iucnLabels: Record<string, string> = {
  CR: 'Critically Endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near Threatened',
  LC: 'Least Concern',
};

export const tickerAlerts = [
  "⚠ CRITICAL: Amazon Basin fire detected — 847 species habitats at risk",
  "🔴 Australia: Biodiversity Score 91/100 — Catastrophic",
  "⚠ Congo Basin: New fire cluster detected — 234 endemic species threatened",
  "🟡 California: 3 fires active — Biodiversity Score 67/100 — High Impact",
  "🔴 Siberia: 8,500 hectares burning — Amur Leopard habitat at extreme risk",
  "⚠ Indonesia: Peat fires releasing massive carbon — Orangutan habitat threatened",
  "🟡 Chile: Araucaria ancient forests under threat — 2,600 ha burned",
  "🔴 BC Canada: Record fire season continues — Old-growth forest losses mounting",
];

export const researchArticles = [
  { title: 'Kunming-Montreal 30x30 Target: Current Progress Dashboard — March 2026', source: 'CBD Secretariat', time: '2 hours ago' },
  { title: '2024 Breaks All Records: Fire Season Analysis Shows 13.5M Hectares Lost in Tropical Forests', source: 'Global Forest Watch', time: '1 day ago' },
  { title: 'TNFD Nature-Related Financial Disclosure: New Requirements for Corporates in EU by Q3 2026', source: 'TNFD Secretariat', time: '3 days ago' },
  { title: 'Amazon Tipping Point: Scientists Warn 20% Deforestation Threshold Approaching', source: 'Nature Journal', time: '5 days ago' },
  { title: 'UNEA-7 Resolution on AI for Biodiversity: Full Text and Implementation Guide', source: 'UNEP', time: '1 week ago' },
];

export const globalImpactStats = [
  { icon: '🔥', value: '13.5M', label: 'hectares burned in 2024', subtext: 'Largest forest fire year on record — equivalent to the size of Greece', source: 'Global Forest Watch 2025' },
  { icon: '🦎', value: '3 Billion', label: 'animals affected', subtext: 'Australian 2019-2020 fires alone displaced or killed 3 billion animals across 11M hectares', source: 'WWF 2020' },
  { icon: '💨', value: 'Fire > Agriculture', label: 'surpassed agriculture', subtext: '2024 marked the first year wildfires became the #1 cause of tropical forest loss, overtaking agricultural clearing', source: 'WRI 2025' },
  { icon: '💰', value: '$110B', label: 'economic damage', subtext: '2019-2020 Australian bushfires alone caused over $110B in financial damage — nature loss is a financial crisis', source: 'Insurance Council Australia' },
  { icon: '🌡️', value: '2.2×', label: 'more fire disturbance', subtext: '2023-2024 average annual forest fire disturbance was 2.2 times higher than the 2002-2022 average globally', source: 'ESA Copernicus 2025' },
  { icon: '⚡', value: '$58T', label: 'at risk', subtext: '55% of global GDP — $58 trillion — is exposed to significant risk from nature and biodiversity loss', source: 'WEF Global Risks Report 2024' },
];

export const sdgData = [
  { number: 13, name: 'Climate Action', color: '#3F7E44', target: '13.1', description: 'Real-time fire monitoring supports climate disaster resilience frameworks', progress: 72 },
  { number: 14, name: 'Life Below Water', color: '#0A97D9', target: '14.2', description: 'Coastal fire tracking protects mangrove and marine ecosystems', progress: 45 },
  { number: 15, name: 'Life on Land', color: '#56C02B', target: '15.5', description: 'Core mission: halt biodiversity loss through real-time threat intelligence', progress: 88 },
  { number: 11, name: 'Sustainable Cities', color: '#FD9D24', target: '11.5', description: 'Wildfire disaster risk reduction for urban-adjacent communities', progress: 61 },
  { number: 3, name: 'Good Health', color: '#4C9F38', target: '3.9', description: 'Wildfire smoke affects 1.5M deaths/year — health risk monitoring layer', progress: 34 },
  { number: 17, name: 'Partnerships', color: '#19486A', target: '17.18', description: 'Auto-generates SDG-compliant national biodiversity reports for UN submission', progress: 56 },
];
