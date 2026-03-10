import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to Top"
      className="group"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 998,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 300ms ease, transform 300ms ease, background-color 200ms ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(10px)'; }}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTopButton;
