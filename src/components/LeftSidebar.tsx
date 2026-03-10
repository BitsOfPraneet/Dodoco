import { useState, useEffect } from 'react';
import { Flame, BarChart3, Leaf, BookOpen, Globe, Rss, Target, Info, ChevronLeft, ChevronRight, X } from 'lucide-react';

const items = [
  { icon: Flame, label: 'Live Fire Map', id: 'fire-map' },
  { icon: BarChart3, label: 'Damage Leaderboard', id: 'leaderboard' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Globe, label: 'Global Statistics', id: 'global-stats' },
  { icon: Leaf, label: 'Species at Risk', id: 'species' },
  { icon: Rss, label: 'Intelligence Feed', id: 'intelligence-feed' },
  { icon: Target, label: 'SDG Tracker', id: 'sdg-tracker' },
  { icon: BookOpen, label: 'Reports', id: 'reports' },
  { icon: Info, label: 'About', id: 'about' },
];

const OFFSET = 130;

interface LeftSidebarProps {
  open: boolean;
  onToggle: () => void;
}

const LeftSidebar = ({ open, onToggle }: LeftSidebarProps) => {
  const [activeSection, setActiveSection] = useState('fire-map');
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-110px 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    if (isMobile) onToggle();
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Dark overlay */}
        {open && (
          <div
            onClick={onToggle}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1001,
              transition: 'opacity 300ms ease',
            }}
          />
        )}
        <aside
          style={{
            position: 'fixed',
            top: 110,
            left: 0,
            bottom: 0,
            width: 280,
            zIndex: 1002,
            transform: open ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 300ms ease',
            background: 'hsl(var(--sidebar-background))',
            borderRight: '1px solid hsl(var(--border))',
            overflowY: 'auto',
            padding: '16px 0',
          }}
          className="scrollbar-hide"
        >
          <div className="flex items-center justify-between px-4 mb-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Navigation</p>
            <button onClick={onToggle} className="p-1 rounded-md hover:bg-accent">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {items.map(({ icon: Icon, label, id }) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className="flex items-center gap-3 mx-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  padding: '10px 16px',
                  borderLeft: active ? '3px solid hsl(var(--primary))' : '3px solid transparent',
                  background: active ? 'hsl(var(--primary) / 0.12)' : 'transparent',
                  color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  fontWeight: active ? 600 : 400,
                }}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{label}</span>
              </a>
            );
          })}
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      style={{
        width: open ? 280 : 64,
        minWidth: open ? 280 : 64,
        transition: 'width 300ms ease, min-width 300ms ease',
        position: 'sticky',
        top: 110,
        height: 'calc(100vh - 110px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: open ? '24px 0' : '24px 0',
        borderRight: '1px solid hsl(var(--border))',
        background: 'hsl(var(--sidebar-background))',
      }}
      className="hidden lg:flex flex-col scrollbar-hide relative"
    >
      {/* Toggle button on right edge */}
      <button
        onClick={onToggle}
        style={{
          position: 'absolute',
          right: -16,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'transform 300ms ease',
        }}
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {open && (
        <p className="text-xs font-mono text-muted-foreground mb-2 px-4 uppercase tracking-wider" style={{ opacity: open ? 1 : 0, transition: 'opacity 200ms ease' }}>
          Navigation
        </p>
      )}

      {items.map(({ icon: Icon, label, id }) => {
        const active = activeSection === id;
        return (
          <div key={id} className="relative" onMouseEnter={() => setHoveredItem(id)} onMouseLeave={() => setHoveredItem(null)}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="flex items-center rounded-lg text-sm transition-all duration-200 mx-2"
              style={{
                padding: open ? '10px 16px' : '10px 0',
                justifyContent: open ? 'flex-start' : 'center',
                gap: open ? 12 : 0,
                borderLeft: active ? '3px solid hsl(var(--primary))' : '3px solid transparent',
                background: active ? 'hsl(var(--primary) / 0.12)' : 'transparent',
                color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                fontWeight: active ? 600 : 400,
              }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {open && (
                <span style={{ opacity: 1, transition: 'opacity 200ms ease', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              )}
            </a>
            {/* Tooltip when collapsed */}
            {!open && hoveredItem === id && (
              <div
                style={{
                  position: 'absolute',
                  left: 70,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 20,
                  border: '1px solid hsl(var(--border))',
                  pointerEvents: 'none',
                }}
              >
                {label}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default LeftSidebar;
