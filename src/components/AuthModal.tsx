import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props { isOpen: boolean; onClose: () => void; initialMode: 'login' | 'signup'; }

const AuthModal = ({ isOpen, onClose, initialMode }: Props) => {
  const [mode, setMode] = useState(initialMode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">{mode === 'login' ? 'Log In' : 'Sign Up'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={e => { e.preventDefault(); onClose(); }} className="space-y-3">
          <input type="email" placeholder="Email" required className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm" />
          <input type="password" placeholder="Password" required className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm" />
          <button type="submit" className="w-full py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90">{mode === 'login' ? 'Log In' : 'Create Account'}</button>
        </form>
        <p className="text-xs text-center text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary font-medium">{mode === 'login' ? 'Sign Up' : 'Log In'}</button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
