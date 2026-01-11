import { Flame, Settings } from 'lucide-react';
import { UserProgress } from '@/types/vocabulary';

interface HeaderProps {
  progress: UserProgress;
  onOpenSettings?: () => void;
}

export const Header = ({ progress, onOpenSettings }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40 safe-area-inset">
      <div className="container flex items-center justify-between h-16 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
            <span className="text-lg">🇩🇪</span>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-foreground leading-tight">
              Deutsch<span className="text-primary">Lernen</span>
            </h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Learn German</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-primary">{progress.currentStreak}</span>
          </div>
          
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
