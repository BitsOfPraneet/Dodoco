import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import type { FireEvent } from '@/services/apiTypes';
import { useFireData } from '@/hooks/useFireData';
import 'leaflet/dist/leaflet.css';

const intensityRadius: Record<string, number> = { extreme: 14, high: 11, medium: 8, low: 6 };
const intensityColor: Record<string, string> = { extreme: '#dc2626', high: '#ea580c', medium: '#f59e0b', low: '#65a30d' };

const tileOptions = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    labelsUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  },
  street: {
    url: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; CartoDB',
    labelsUrl: null,
  },
  terrain: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    labelsUrl: null,
  },
};

type MapStyle = keyof typeof tileOptions;

interface Props { onFireSelect: (f: FireEvent) => void; }

const FitBounds = () => {
  const map = useMap();
  useEffect(() => { map.setView([20, 0], 2); }, [map]);
  return null;
};

const CustomZoom = () => {
  const map = useMap();
  return (
    <div style={{ position: 'absolute', bottom: 80, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
      {[{ label: '+', fn: () => map.zoomIn() }, { label: '−', fn: () => map.zoomOut() }].map(({ label, fn }) => (
        <button
          key={label}
          onClick={fn}
          className="hover:bg-primary hover:text-primary-foreground"
          style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 300, cursor: 'pointer', border: 'none',
            background: 'hsl(var(--card))', color: 'hsl(var(--primary))',
            transition: 'background 200ms ease, color 200ms ease',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const FireMap = ({ onFireSelect }: Props) => {
  const [mapStyle, setMapStyle] = useState<MapStyle>('satellite');
  const tile = tileOptions[mapStyle];
  const { data: fireEvents = [], isLoading } = useFireData();

  const styleButtons: { key: MapStyle; label: string }[] = [
    { key: 'satellite', label: 'Satellite' },
    { key: 'street', label: 'Street' },
    { key: 'terrain', label: 'Terrain' },
  ];

  return (
    <section id="fire-map" className="mb-4">
      {/* Map style toggle */}
      <div className="flex gap-1 mb-2">
        {styleButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMapStyle(key)}
            className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
            style={{
              background: mapStyle === key ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: mapStyle === key ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
              border: `1px solid ${mapStyle === key ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden" style={{ height: '65vh', position: 'relative', zIndex: 0 }}>
        <MapContainer center={[20, 0]} zoom={2} minZoom={2} zoomControl={false} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer key={`${mapStyle}-base`} url={tile.url} attribution={tile.attribution} maxZoom={19} />
          {tile.labelsUrl && (
            <TileLayer key={`${mapStyle}-labels`} url={tile.labelsUrl} maxZoom={19} opacity={0.8} />
          )}
          <FitBounds />
          <CustomZoom />
          {fireEvents.map(f => (
            <CircleMarker key={f.id} center={f.coordinates} radius={intensityRadius[f.intensity]}
              pathOptions={{ color: intensityColor[f.intensity], fillColor: intensityColor[f.intensity], fillOpacity: 0.6, weight: 2 }}
              eventHandlers={{ click: () => onFireSelect(f) }}>
              <Popup>
                <div className="text-xs font-body">
                  <p className="font-bold">{f.countryFlag} {f.name}</p>
                  <p>FRP: {f.frp} MW • {f.areaBurned.toLocaleString()} ha</p>
                  <p>Bio Score: {f.biodiversityScore}/100</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default FireMap;
