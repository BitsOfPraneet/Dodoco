const partners = ['UNEP', 'IUCN', 'WWF', 'Global Forest Watch', 'NASA FIRMS', 'ESA Copernicus', 'TNFD', 'CBD'];

const PartnerLogos = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4 text-center">Data & Research Partners</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {partners.map(p => (
        <div key={p} className="glass-card px-6 py-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">
          {p}
        </div>
      ))}
    </div>
  </section>
);

export default PartnerLogos;
