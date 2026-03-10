import { fireEvents } from '@/data/mockData';
import { Bot } from 'lucide-react';

const IntelligenceFeed = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">AI Intelligence Feed</h2>
    <div className="space-y-3">
      {fireEvents.slice(0, 4).map(f => (
        <div key={f.id} className="glass-card p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Bot className="w-4 h-4 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-heading font-semibold">{f.countryFlag} {f.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{new Date(f.startTime).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.aiSummary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default IntelligenceFeed;
