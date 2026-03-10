import { useFireData } from '@/hooks/useFireData';
import type { FireEvent } from '@/services/apiTypes';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const intensityColor: Record<string, string> = {
  extreme: 'text-destructive',
  high: 'text-secondary',
  medium: 'text-warning',
  low: 'text-safe',
};

interface Props { onFireSelect: (f: FireEvent) => void; }

const LeaderboardTable = ({ onFireSelect }: Props) => {
  const { data: fireEvents = [], isLoading } = useFireData();

  return (
    <section id="leaderboard" className="my-8">
      <h2 className="text-xl font-heading font-bold mb-4">Fire Leaderboard</h2>
      <div className="glass-card overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground text-sm">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading live fire data...
          </div>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-mono text-muted-foreground uppercase">
              <th className="p-3">Rank</th><th className="p-3">Fire</th><th className="p-3">Country</th>
              <th className="p-3">FRP</th><th className="p-3">Area (ha)</th><th className="p-3">Bio Score</th>
              <th className="p-3">Intensity</th><th className="p-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {[...fireEvents].sort((a, b) => b.biodiversityScore - a.biodiversityScore).map((f, i) => (
              <tr key={f.id} onClick={() => onFireSelect(f)} className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors">
                <td className="p-3 font-mono font-bold">{i + 1}</td>
                <td className="p-3 font-medium truncate max-w-[200px]">{f.name}</td>
                <td className="p-3">{f.countryFlag} {f.country}</td>
                <td className="p-3 font-mono">{f.frp}</td>
                <td className="p-3 font-mono">{f.areaBurned.toLocaleString()}</td>
                <td className="p-3 font-mono font-bold">{f.biodiversityScore}</td>
                <td className={`p-3 font-mono font-bold capitalize ${intensityColor[f.intensity]}`}>{f.intensity}</td>
                <td className="p-3">
                  {f.trend === 'up' ? <TrendingUp className="w-4 h-4 text-destructive" /> : f.trend === 'down' ? <TrendingDown className="w-4 h-4 text-safe" /> : <Minus className="w-4 h-4 text-muted-foreground" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaderboardTable;
