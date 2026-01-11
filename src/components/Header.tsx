import { Flame, Settings, User } from 'lucide-react';
import { UserProgress } from '@/types/vocabulary';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  progress: UserProgress;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export const Header = ({ progress, onOpenSettings, onOpenProfile }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      onOpenProfile?.();
    } else {
      navigate('/auth');
    }
  };

  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

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

          <button 
            onClick={handleProfileClick}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            {user ? (
              <Avatar className="w-7 h-7">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
