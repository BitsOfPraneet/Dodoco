import { Globe, Wifi } from 'lucide-react';

const TopUtilityBar = () => (
  <div
    className="w-full py-1.5 px-4 flex items-center justify-between text-xs font-mono"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      zIndex: 1000,
      background: `hsl(var(--utility-bar))`,
      color: 'hsl(var(--primary-foreground))',
    }}
  >
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> LIVE</span>
      <span className="live-dot inline-block w-2 h-2 rounded-full bg-red-500" />
      <span>Wildfire Monitoring Active</span>
    </div>
    <div className="flex items-center gap-3">
      <span>Last Updated: {new Date().toLocaleTimeString()}</span>
      <Globe className="w-3 h-3" />
    </div>
  </div>
);

export default TopUtilityBar;
