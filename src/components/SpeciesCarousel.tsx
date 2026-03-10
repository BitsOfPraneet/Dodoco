import { speciesData, iucnColors } from '@/data/mockData';
import { useState } from 'react';

const SpeciesCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Double the data for seamless loop
  const displayItems = [...speciesData, ...speciesData];

  return (
    <section id="species" className="my-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold">Threatened Species</h2>
        <div className="text-xs font-mono text-muted-foreground animate-pulse">
          {isPaused ? '⏸ Paused' : '▶ Auto-scrolling'}
        </div>
      </div>

      <div
        className="relative group"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex gap-4 animate-infinite-scroll hover:animation-paused ${isPaused ? 'animation-paused' : ''}`}>
          {displayItems.map((s, i) => (
            <div key={`${s.id}-${i}`} className="glass-card min-w-[280px] max-w-[280px] p-4 card-hover-lift flex-shrink-0">
              <img src={s.imageUrl} alt={s.commonName} className="w-full h-36 object-cover rounded-md mb-3" />
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-heading font-bold truncate">{s.commonName}</h3>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-muted/50" style={{ color: iucnColors[s.iucnStatus] }}>{s.iucnStatus}</span>
              </div>
              <p className="text-xs italic text-muted-foreground mb-1">{s.scientificName}</p>
              <p className="text-xs text-muted-foreground">Pop: {s.population}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeciesCarousel;
