import { sdgData } from '@/data/mockData';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ChevronRight } from 'lucide-react';
import 'react-circular-progressbar/dist/styles.css';

const SDGTracker = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">SDG Alignment</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sdgData.map(s => (
        <div key={s.number} className="glass-card p-4 flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0">
            <CircularProgressbar value={s.progress} text={`${s.progress}%`} styles={buildStyles({
              textSize: '24px', pathColor: s.color, textColor: s.color, trailColor: 'hsl(var(--border))',
            })} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-heading font-bold">SDG {s.number}: {s.name}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
            <button
              onClick={() => window.open(`/sdg?goal=${s.number}`, '_blank')}
              className="text-[10px] font-bold uppercase tracking-wider text-primary mt-2 hover:underline flex items-center gap-1"
            >
              Learn More <ChevronRight className="w-2 h-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SDGTracker;
