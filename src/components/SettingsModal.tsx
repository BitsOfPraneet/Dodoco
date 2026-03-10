import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTheme } from '@/contexts/ThemeContext';

interface Props { isOpen: boolean; onClose: () => void; }

const SettingsModal = ({ isOpen, onClose }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle dark theme</p>
            </div>
            <button onClick={toggleTheme} className="px-3 py-1.5 rounded-md border border-input text-sm font-mono hover:bg-accent">
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-xs text-muted-foreground">Fire alert emails</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Coming soon</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
