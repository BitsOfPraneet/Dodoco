import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Where does the fire data come from?', a: 'We use NASA FIRMS and VIIRS satellite data, updated every 12 minutes globally, combined with ESA Copernicus fire monitoring.' },
  { q: 'How is the Biodiversity Score calculated?', a: 'Our AI engine cross-references fire perimeters with IUCN Red List species habitats, endemism data, and ecosystem fragility indices to produce a 0-100 score.' },
  { q: 'Can I receive fire alerts for specific regions?', a: 'Yes! Subscribe to alerts with your email and select specific countries, biomes, or species of interest.' },
  { q: 'How does this support the SDGs?', a: 'WildLife Watch directly contributes to SDG 13 (Climate Action), SDG 15 (Life on Land), and SDG 17 (Partnerships) through real-time monitoring and automated reporting.' },
  { q: 'Is this data available via API?', a: 'We are developing a public API for researchers and conservation organizations. Contact us for early access.' },
];

const FAQ = () => (
  <section id="faq" className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">FAQ</h2>
    <div className="glass-card p-4">
      <Accordion type="single" collapsible>
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-sm font-medium text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
