import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useFireData } from '@/hooks/useFireData';

const INTENSITY_COLORS: Record<string, string> = {
  extreme: '#dc2626',
  high: '#ea580c',
  medium: '#f59e0b',
  low: '#65a30d',
};

const AnalyticsCharts = () => {
  const { data: fires = [] } = useFireData();

  // Aggregate fires by biome
  const biomeData = useMemo(() => {
    const map: Record<string, { fires: number; area: number }> = {};
    fires.forEach((f) => {
      const key = f.biome || 'Other';
      if (!map[key]) map[key] = { fires: 0, area: 0 };
      map[key].fires += 1;
      map[key].area += f.areaBurned;
    });
    return Object.entries(map)
      .map(([biome, data]) => ({ biome, ...data }))
      .sort((a, b) => b.fires - a.fires);
  }, [fires]);

  // Aggregate fires by intensity
  const intensityData = useMemo(() => {
    const map: Record<string, number> = { extreme: 0, high: 0, medium: 0, low: 0 };
    fires.forEach((f) => { map[f.intensity] = (map[f.intensity] || 0) + 1; });
    return Object.entries(map)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, color: INTENSITY_COLORS[name] }));
  }, [fires]);

  // Top 10 fires by biodiversity score for the area chart
  const topFires = useMemo(() => {
    return [...fires]
      .sort((a, b) => b.biodiversityScore - a.biodiversityScore)
      .slice(0, 10)
      .map((f) => ({
        name: f.country.length > 10 ? f.country.slice(0, 10) + '…' : f.country,
        score: f.biodiversityScore,
        frp: f.frp,
        area: f.areaBurned,
      }));
  }, [fires]);

  return (
    <section id="analytics" className="my-8">
      <h2 className="text-xl font-heading font-bold mb-4">Live Analytics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart 1: Top Fires by Biodiversity Score */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-heading font-semibold mb-3">
            Top Fires by Biodiversity Score
            <span className="text-xs font-normal text-muted-foreground ml-2">({fires.length} active)</span>
          </h3>
          {topFires.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topFires}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="score" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Bio Score" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Loading fire data...
            </div>
          )}
        </div>

        {/* Chart 2: Fires by Biome */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-heading font-semibold mb-3">Active Fires by Biome</h3>
          {biomeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={biomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="biome" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="fires" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Fire Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Loading...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsCharts;
