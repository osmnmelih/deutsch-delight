import { Flame, Settings } from 'lucide-react';
import { UserProgress } from '@/types/vocabulary';

interface HeaderProps {
  progress: UserProgress;
}

export const Header = ({ progress }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 safe-area-inset">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇩🇪</span>
          <h1 className="font-heading font-bold text-xl text-foreground">
            Deutsch<span className="text-primary">Lernen</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm">{progress.currentStreak}</span>
          </div>
          
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
