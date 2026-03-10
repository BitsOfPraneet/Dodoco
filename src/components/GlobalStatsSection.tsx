import { globalImpactStats } from '@/data/mockData';
import { motion } from 'framer-motion';

const GlobalStatsSection = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">🌍 Global Impact</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {globalImpactStats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="glass-card p-5 card-hover-lift">
          <span className="text-2xl">{s.icon}</span>
          <p className="text-2xl font-heading font-bold text-primary mt-2">{s.value}</p>
          <p className="text-sm font-medium mt-1">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.subtext}</p>
          <p className="text-xs font-mono text-muted-foreground mt-2 opacity-60">Source: {s.source}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default GlobalStatsSection;
