const tokens = [
  { name: 'Carbon Credit', ticker: 'VCU', price: '$14.20', change: '+2.3%', up: true },
  { name: 'Biodiversity Credit', ticker: 'BDC', price: '$8.75', change: '+5.1%', up: true },
  { name: 'Nature Token', ticker: 'NTK', price: '$2.34', change: '-1.2%', up: false },
  { name: 'REDD+ Credit', ticker: 'REDD', price: '$11.50', change: '+0.8%', up: true },
];

const MarketSection = () => (
  <section className="my-8">
    <h2 className="text-xl font-heading font-bold mb-4">Nature Markets</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {tokens.map(t => (
        <div key={t.ticker} className="glass-card p-4 card-hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">{t.ticker}</span>
            <span className={`text-xs font-mono font-bold ${t.up ? 'text-safe' : 'text-destructive'}`}>{t.change}</span>
          </div>
          <p className="text-lg font-heading font-bold">{t.price}</p>
          <p className="text-xs text-muted-foreground mt-1">{t.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MarketSection;
