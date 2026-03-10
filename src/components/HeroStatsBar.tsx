import { useGlobalStats } from '@/hooks/useGlobalStats';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

const StatCard = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const count = useAnimatedCounter(value, 1500);
  return (
    <div className="glass-card p-4 text-center stat-pulse">
      <p className="text-2xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs text-muted-foreground font-mono mt-1">{label}</p>
    </div>
  );
};

const HeroStatsBar = () => {
  const stats = useGlobalStats();

  const items = [
    { label: 'Active Fires', value: stats.activeFires, suffix: '' },
    { label: 'Hectares Burning', value: stats.hectaresBurning, suffix: '' },
    { label: 'Species at Risk', value: stats.speciesAtRisk, suffix: '' },
    { label: 'Biodiversity Score', value: stats.avgBiodiversityScore, suffix: '/100' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {items.map(s => (
        <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
      ))}
    </div>
  );
};

export default HeroStatsBar;
