import { motion } from 'framer-motion';

const VideoHero = () => (
  <section className="relative overflow-hidden" style={{ width: '100%', height: '85vh' }}>
    {/* YouTube video background */}
    <iframe
      src="https://www.youtube.com/embed/wXASRXbjR08?autoplay=1&mute=1&loop=1&playlist=wXASRXbjR08&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(1.25)',
        width: '100vw',
        height: '56.25vw',
        minHeight: '100vh',
        minWidth: '177.77vh',
        border: 'none',
        pointerEvents: 'none' as const,
        zIndex: 0,
      }}
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen={false}
      frameBorder="0"
      title="Dodoco Background"
    />

    {/* Gradient overlay */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(10,40,20,0.50) 40%, rgba(0,0,0,0.75) 100%)',
      zIndex: 1,
    }} />

    {/* Hero content */}
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight text-white">
            Real-Time Wildfire & Biodiversity Intelligence
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-6 font-body text-white">
            Monitoring the intersection of wildfires and biodiversity loss across the planet. Powered by satellite data, AI analysis, and conservation science.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#fire-map" className="px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30 text-white">Explore Live Map</a>
            <button
              onClick={() => window.open('/sdg', '_blank')}
              className="px-6 py-2.5 bg-white text-green-900 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default VideoHero;
