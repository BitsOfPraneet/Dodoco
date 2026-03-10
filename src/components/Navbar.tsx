import { useState, useEffect } from 'react';
import { Menu, X, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Map', href: '/#fire-map', id: 'fire-map' },
  { name: 'Analytics', href: '/#analytics', id: 'analytics' },
  { name: 'Species', href: '/#species', id: 'species' },
  { name: 'About', href: '/#about', id: 'about' },
];

const NavLinkItem = ({
  href,
  children,
  isActive,
  onHover
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onHover: () => void;
}) => (
  <a
    href={href}
    onMouseEnter={onHover}
    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
      }`}
  >
    {children}
  </a>
);

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
}

const Navbar = ({ onOpenAuth, onOpenSettings, onToggleSidebar }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSection(hash || '');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav
      className="fixed top-[52px] left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-5xl"
    >
      <div className="glass-nav rounded-full px-4 lg:px-8 py-2 md:py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-background/40 border border-white/20 dark:border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-heading font-bold text-primary tracking-tight">Dodoco</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-1 relative py-1 px-1 bg-muted/20 rounded-full">
          {NAV_LINKS.map((link) => (
            <div key={link.id} className="relative px-1">
              <NavLinkItem
                href={link.href}
                isActive={activeSection === link.id}
                onHover={() => setHoveredSection(link.id)}
              >
                {link.name}
              </NavLinkItem>

              {/* Sliding Selection Pill */}
              <AnimatePresence>
                {(hoveredSection === link.id || (activeSection === link.id && !hoveredSection)) && (
                  <motion.div
                    layoutId="nav-pill"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-full -z-0 ${activeSection === link.id
                        ? 'bg-primary/20 border border-primary/30'
                        : 'bg-foreground/5'
                      }`}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Sidebar Toggle (Only on large screens) */}
          <button className="hidden lg:flex p-2 rounded-full hover:bg-accent transition-colors" onClick={onToggleSidebar}>
            <Menu className="w-4 h-4" />
          </button>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2 rounded-full hover:bg-accent transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 right-0 glass-nav rounded-3xl p-4 flex flex-col gap-2 mt-2 shadow-2xl backdrop-blur-2xl bg-background/80 border border-white/20"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${activeSection === link.id ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
