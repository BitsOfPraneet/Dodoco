import { useState, useRef, useEffect } from 'react';
import { useGlobalStats } from '@/hooks/useGlobalStats';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { Info } from 'lucide-react';

const BIS_FACTORS = [
  { name: 'Species richness in burn zone', weight: 30 },
  { name: '% of species IUCN threatened', weight: 25 },
  { name: 'Fire Radiative Power / intensity', weight: 20 },
  { name: 'Presence of endemic species', weight: 15 },
  { name: 'Overlap with protected areas', weight: 10 },
];

const StatCard = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const count = useAnimatedCounter(value, 1500);
  return (
    <div className="glass-card p-4 text-center stat-pulse">
      <p className="text-2xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs text-muted-foreground font-mono mt-1">{label}</p>
    </div>
  );
};

const BisStatCard = ({ value, suffix }: { value: number; suffix: string }) => {
  const count = useAnimatedCounter(value, 1500);
  const [showInfo, setShowInfo] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showInfo) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowInfo(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInfo]);

  return (
    <div className="glass-card p-4 text-center stat-pulse relative" ref={popoverRef}>
      <button
        onClick={() => setShowInfo(prev => !prev)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent/60 transition-colors z-10"
        aria-label="BIS scoring factors info"
      >
        <Info className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <p className="text-2xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs text-muted-foreground font-mono mt-1">Biodiversity Score</p>

      {showInfo && (
        <div
          className="absolute top-full left-1/2 mt-2 w-72 z-[10001] glass-card p-4 text-left shadow-2xl border border-primary/20 bg-background/95 backdrop-blur-md"
          style={{ transform: 'translateX(-50%)' }}
        >
          <p className="text-xs font-heading font-semibold mb-3 text-primary uppercase tracking-wider">BIS Scoring Factors</p>
          <div className="space-y-3">
            {BIS_FACTORS.map(f => (
              <div key={f.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-medium uppercase tracking-tight text-muted-foreground/80">
                  <span>{f.name}</span>
                  <span className="font-mono text-primary">{f.weight}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/60 rounded-full" 
                    style={{ width: `${f.weight}%`, transition: 'width 1s ease-out' }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cumulative Impact</span>
            <span className="text-xs font-mono font-bold text-primary">100%</span>
          </div>
        </div>
      )}
    </div>
  );
};

const HeroStatsBar = () => {
  const stats = useGlobalStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <StatCard label="Active Fires" value={stats.activeFires} suffix="" />
      <StatCard label="Hectares Burning" value={stats.hectaresBurning} suffix="" />
      <StatCard label="Species at Risk" value={stats.speciesAtRisk} suffix="" />
      <BisStatCard value={stats.avgBiodiversityScore} suffix="/100" />
    </div>
  );
};

export default HeroStatsBar;
