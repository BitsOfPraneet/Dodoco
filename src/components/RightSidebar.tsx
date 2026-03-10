import { useFireData } from '@/hooks/useFireData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-destructive" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-safe" />;
  return <Minus className="w-3 h-3 text-muted-foreground" />;
};

const RightSidebar = () => {
  const { data: fireEvents = [] } = useFireData();

  return (
    <aside className="hidden xl:flex flex-col w-64 py-6 pr-4 gap-3 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-3">Active Fires</p>
      {fireEvents.slice(0, 6).map(f => (
        <div key={f.id} className="glass-card p-3 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium truncate">{f.countryFlag} {f.country}</span>
            <TrendIcon trend={f.trend} />
          </div>
          <p className="text-muted-foreground truncate">{f.name}</p>
          <div className="flex gap-2 mt-1 text-muted-foreground">
            <span>{f.areaBurned.toLocaleString()} ha</span>
            <span>•</span>
            <span>FRP {f.frp}</span>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default RightSidebar;
