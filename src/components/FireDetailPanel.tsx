import { X, Wind, Clock, Flame, TreePine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FireEvent } from '@/services/apiTypes';
import { useSpeciesForFire } from '@/hooks/useSpeciesForFire';
import { iucnColors, iucnLabels } from '@/data/mockData';

interface Props { fire: FireEvent; onClose: () => void; }

const HEADER_HEIGHT = 110; // TopUtilityBar (40px) + Navbar (70px)

const FireDetailPanel = ({ fire, onClose }: Props) => {
  const { data: species = [], isLoading: speciesLoading } = useSpeciesForFire(fire);
  return (
    <AnimatePresence>
      {/* Backdrop overlay — click to dismiss */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          top: HEADER_HEIGHT,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 998,
          cursor: 'pointer',
        }}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        style={{
          position: 'fixed',
          right: 0,
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          width: '100%',
          maxWidth: 420,
          zIndex: 999,
          background: 'hsl(var(--card))',
          borderLeft: '1px solid hsl(var(--border))',
          boxShadow: '-4px 0 30px rgba(0,0,0,0.15)',
          overflowY: 'auto',
        }}
        className="scrollbar-hide"
      >
        {/* Sticky close header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'hsl(var(--card))',
            borderBottom: '1px solid hsl(var(--border))',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 className="text-base font-heading font-bold truncate" style={{ maxWidth: 'calc(100% - 50px)' }}>
            {fire.countryFlag} {fire.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close fire detail panel"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--muted))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 150ms ease',
            }}
            className="hover:bg-destructive/15 group"
          >
            <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
          </button>
        </div>

        {/* Panel content */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="glass-card p-3"><Flame className="w-4 h-4 text-secondary mb-1" /><p className="font-mono font-bold">{fire.frp}</p><p className="text-xs text-muted-foreground">FRP (MW)</p></div>
            <div className="glass-card p-3"><TreePine className="w-4 h-4 text-primary mb-1" /><p className="font-mono font-bold">{fire.areaBurned.toLocaleString()}</p><p className="text-xs text-muted-foreground">Hectares</p></div>
            <div className="glass-card p-3"><Wind className="w-4 h-4 text-blue-500 mb-1" /><p className="font-mono font-bold">{fire.windSpeed} km/h</p><p className="text-xs text-muted-foreground">Wind</p></div>
            <div className="glass-card p-3"><Clock className="w-4 h-4 text-warning mb-1" /><p className="font-mono font-bold">{fire.duration}h</p><p className="text-xs text-muted-foreground">Duration</p></div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-heading font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{fire.aiSummary}</p>
          </div>
          {speciesLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-3">
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Loading species from GBIF...
            </div>
          )}
          {species.length > 0 && (
            <div>
              <h3 className="text-sm font-heading font-semibold mb-2">Threatened Species ({species.length})</h3>
              <div className="space-y-2">
                {species.map(s => (
                  <div key={s.id} className="glass-card p-2 flex items-center gap-3">
                    <img src={s.imageUrl} alt={s.commonName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.commonName}</p>
                      <p className="text-xs text-muted-foreground italic">{s.scientificName}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: iucnColors[s.iucnStatus] }}>{s.iucnStatus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FireDetailPanel;
