import { useState } from 'react';
import { Bell } from 'lucide-react';

const AlertSubscription = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="alerts" className="my-8">
      <div className="glass-card p-6 text-center max-w-xl mx-auto">
        <Bell className="w-8 h-8 text-primary mx-auto mb-3" />
        <h2 className="text-xl font-heading font-bold mb-2">Fire Alert Subscription</h2>
        <p className="text-sm text-muted-foreground mb-4">Get notified when fires threaten critical biodiversity zones.</p>
        {submitted ? (
          <p className="text-sm text-primary font-medium">✓ Subscribed successfully!</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex gap-2 max-w-sm mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm" />
            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AlertSubscription;
