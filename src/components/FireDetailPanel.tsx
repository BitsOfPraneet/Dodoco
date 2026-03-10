import { X, Wind, Clock, Flame, TreePine, Map as MapIcon, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Circle, Polyline, useMap } from 'react-leaflet';
import type { FireEvent } from '@/services/apiTypes';
import { useSpeciesForFire } from '@/hooks/useSpeciesForFire';
import { iucnColors, iucnLabels } from '@/data/mockData';
import { useState, useEffect } from 'react';
import { fetchWeatherForCoords, type WeatherData } from '@/services/weatherApi';

interface Props { fire: FireEvent; onClose: () => void; }

const HEADER_HEIGHT = 110; 

const ZoomedMapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const FireDetailPanel = ({ fire, onClose }: Props) => {
  const { data: species = [], isLoading: speciesLoading } = useSpeciesForFire(fire);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    setWeatherLoading(true);
    fetchWeatherForCoords(fire.coordinates[0], fire.coordinates[1])
      .then(setWeather)
      .finally(() => setWeatherLoading(false));
  }, [fire.coordinates]);

  // Predictive spread calculation logic
  const getSpreadPoints = () => {
    if (!weather) return null;
    const [lat, lon] = fire.coordinates;
    const deg = weather.windDeg;
    const speed = weather.windSpeed; // m/s
    
    // Convert degrees to radians (Leaflet uses lat/lon, math needs radians)
    // 0 deg is North, 90 is East. Compass to Math: (90 - deg)
    const rad = ((90 - deg) * Math.PI) / 180;
    
    // Spread factor based on wind and intensity (simulated)
    const distanceFactor = 0.005 + (speed * 0.001); 
    
    // Points for a spread "cone"
    const p1 = [lat + Math.sin(rad) * distanceFactor * 2, lon + Math.cos(rad) * distanceFactor * 2];
    const p2 = [lat + Math.sin(rad + 0.4) * distanceFactor * 1.2, lon + Math.cos(rad + 0.4) * distanceFactor * 1.2];
    const p3 = [lat + Math.sin(rad - 0.4) * distanceFactor * 1.2, lon + Math.cos(rad - 0.4) * distanceFactor * 1.2];

    return { core: p1, left: p2, right: p3 };
  };

  const spread = getSpreadPoints();

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          top: HEADER_HEIGHT,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 998,
          cursor: 'pointer',
        }}
      />

      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        style={{
          position: 'fixed',
          right: 0,
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          width: '100%',
          maxWidth: 420,
          zIndex: 999,
          background: 'hsl(var(--card))',
          borderLeft: '1px solid hsl(var(--border))',
          boxShadow: '-4px 0 30px rgba(0,0,0,0.15)',
          overflowY: 'auto',
        }}
        className="scrollbar-hide"
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'hsl(var(--card))',
            borderBottom: '1px solid hsl(var(--border))',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 className="text-base font-heading font-bold truncate" style={{ maxWidth: 'calc(100% - 50px)' }}>
            {fire.countryFlag} {fire.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close fire detail panel"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--muted))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 150ms ease',
            }}
            className="hover:bg-destructive/15 group"
          >
            <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
          </button>
        </div>

        <div className="p-5">
          {/* Predictive Sense Map Box */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <MapIcon className="w-3.5 h-3.5" />
                Predictive Sense — Spread Analysis
              </h3>
              {weather && (
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
                  <Navigation 
                    className="w-2.5 h-2.5" 
                    style={{ transform: `rotate(${weather.windDeg}deg)` }} 
                  />
                  {(weather.windSpeed * 3.6).toFixed(1)} km/h
                </div>
              )}
            </div>
            
            <div className="h-48 w-full rounded-xl overflow-hidden glass-card relative border border-border/40">
              <MapContainer 
                center={fire.coordinates} 
                zoom={13} 
                zoomControl={false} 
                style={{ height: '100%', width: '100%' }}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
              >
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                <ZoomedMapController center={fire.coordinates} />
                
                {/* Fire Origin */}
                <Circle 
                  center={fire.coordinates} 
                  radius={200} 
                  pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1, weight: 2 }} 
                />

                {/* Wind Vectors - White Arrows */}
                {weather && (
                  <Polyline 
                    positions={[
                      fire.coordinates, 
                      [
                        fire.coordinates[0] + (Math.sin(((90 - (weather.windDeg + 180)) * Math.PI) / 180) * 0.004),
                        fire.coordinates[1] + (Math.cos(((90 - (weather.windDeg + 180)) * Math.PI) / 180) * 0.004)
                      ]
                    ]} 
                    pathOptions={{ color: 'white', weight: 3, opacity: 0.8 }}
                  />
                )}

                {/* Predictive Spread Shades */}
                {spread && (
                  <>
                    {/* High Risk (Red) */}
                    <Circle 
                      center={fire.coordinates} 
                      radius={1200} 
                      pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2, weight: 1, dashArray: '5, 5' }} 
                    />
                    {/* Directional Spread (Yellow/Green) */}
                    <Polyline 
                      positions={[fire.coordinates, spread.core as [number, number]]} 
                      pathOptions={{ color: '#eab308', weight: 4, opacity: 0.5 }}
                    />
                    <Circle 
                      center={spread.core as [number, number]} 
                      radius={800} 
                      pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.15, weight: 0 }} 
                    />
                  </>
                )}
              </MapContainer>
              
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end z-[400]">
                <div className="flex gap-1">
                  <div className="h-1 w-8 bg-red-500 rounded-full" />
                  <div className="h-1 w-8 bg-yellow-500 rounded-full opacity-60" />
                  <div className="h-1 w-8 bg-green-500 rounded-full opacity-40" />
                </div>
                <p className="text-[9px] font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  24H FORECAST
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="glass-card p-3 font-body"><Flame className="w-4 h-4 text-secondary mb-1" /><p className="font-mono font-bold">{fire.frp}</p><p className="text-xs text-muted-foreground">FRP (MW)</p></div>
            <div className="glass-card p-3 font-body"><TreePine className="w-4 h-4 text-primary mb-1" /><p className="font-mono font-bold">{fire.areaBurned.toLocaleString()}</p><p className="text-xs text-muted-foreground">Hectares</p></div>
            <div className="glass-card p-3 font-body">
              <Wind className="w-4 h-4 text-blue-500 mb-1" />
              <p className="font-mono font-bold">
                {weather ? (weather.windSpeed * 3.6).toFixed(1) : fire.windSpeed} km/h
              </p>
              <p className="text-xs text-muted-foreground">Local Wind</p>
            </div>
            <div className="glass-card p-3 font-body"><Clock className="w-4 h-4 text-warning mb-1" /><p className="font-mono font-bold">{fire.duration}h</p><p className="text-xs text-muted-foreground">Duration</p></div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-heading font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{fire.aiSummary}</p>
          </div>
          {speciesLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-3">
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Loading species from GBIF...
            </div>
          )}
          {species.length > 0 && (
            <div>
              <h3 className="text-sm font-heading font-semibold mb-2">Threatened Species ({species.length})</h3>
              <div className="space-y-2">
                {species.map(s => (
                  <div key={s.id} className="glass-card p-2 flex items-center gap-3">
                    <img src={s.imageUrl} alt={s.commonName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.commonName}</p>
                      <p className="text-xs text-muted-foreground italic">{s.scientificName}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: iucnColors[s.iucnStatus] }}>{s.iucnStatus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FireDetailPanel;
