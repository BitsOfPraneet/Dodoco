import { Satellite, Brain, Bell, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Satellite, title: 'Satellite Detection', desc: 'FIRMS/VIIRS sensors detect fires globally every 12 minutes' },
  { icon: Brain, title: 'AI Analysis', desc: 'Biodiversity impact scoring using IUCN species databases' },
  { icon: Bell, title: 'Real-Time Alerts', desc: 'Instant notifications when fires threaten critical habitats' },
  { icon: BarChart3, title: 'Impact Reporting', desc: 'SDG-aligned reports for conservation decision-makers' },
];

const HowItWorks = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">How It Works</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
          className="glass-card p-5 text-center card-hover-lift">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <s.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-heading font-bold mb-1">{s.title}</h3>
          <p className="text-xs text-muted-foreground">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
