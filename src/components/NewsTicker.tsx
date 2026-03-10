import { useFireData } from '@/hooks/useFireData';

const NewsTicker = () => {
  const { data: fires = [] } = useFireData();

  // Generate dynamic ticker alerts from top fires by score
  const alerts =
    fires.length > 0
      ? fires
        .slice()
        .sort((a, b) => b.biodiversityScore - a.biodiversityScore)
        .slice(0, 8)
        .map((f) => {
          const badge =
            f.biodiversityScore >= 90 ? '⚫' :
              f.biodiversityScore >= 75 ? '🔴' :
                f.biodiversityScore >= 55 ? '🟠' :
                  f.biodiversityScore >= 35 ? '🟡' : '🟢';
          return `${badge} ${f.country}: ${f.name} — Score ${f.biodiversityScore}/100 — ${f.areaBurned.toLocaleString()} ha burning`;
        })
      : [
        '⚠ CRITICAL: Amazon Basin fire detected — 847 species habitats at risk',
        '🔴 Australia: Biodiversity Score 91/100 — Catastrophic',
        '⚠ Congo Basin: New fire cluster detected — 234 endemic species threatened',
        '🟡 California: 3 fires active — Biodiversity Score 67/100 — High Impact',
        '🔴 Siberia: 8,500 hectares burning — Amur Leopard habitat at extreme risk',
        '⚠ Indonesia: Peat fires releasing massive carbon — Orangutan habitat threatened',
        '🟡 Chile: Araucaria ancient forests under threat — 2,600 ha burned',
        '🔴 BC Canada: Record fire season continues — Old-growth forest losses mounting',
      ];

  return (
    <div className="glass-card overflow-hidden my-4 py-2">
      <div className="ticker-scroll whitespace-nowrap flex gap-12 text-sm font-mono text-muted-foreground">
        {[...alerts, ...alerts].map((t, i) => (
          <span key={i} className="inline-block">{t}</span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
