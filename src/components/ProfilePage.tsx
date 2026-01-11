import { useState, useEffect } from 'react';
import { ArrowLeft, User, LogOut, Bell, BellOff, Flame, Trophy, Target, BookOpen, Brain, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format, subDays } from 'date-fns';
import { de } from 'date-fns/locale';

interface ProfilePageProps {
  onBack: () => void;
}

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  email: string | null;
}

interface UserProgressData {
  total_words_learned: number;
  total_quizzes_completed: number;
  total_correct_answers: number;
  total_incorrect_answers: number;
  current_streak: number;
  longest_streak: number;
  total_xp: number;
  current_level: number;
}

interface NotificationSettings {
  review_reminders: boolean;
  daily_goal_reminders: boolean;
  streak_reminders: boolean;
}

interface StreakDay {
  date: string;
  words_learned: number;
  quizzes_completed: number;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgressData | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings | null>(null);
  const [streakHistory, setStreakHistory] = useState<StreakDay[]>([]);
  const [updatingNotifications, setUpdatingNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }

      // Fetch progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (progressData) {
        setProgress(progressData);
      }

      // Fetch notification settings
      const { data: notifData } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (notifData) {
        setNotifications(notifData);
      }

      // Fetch streak history (last 7 days)
      const { data: streakData } = await supabase
        .from('streak_history')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', format(subDays(new Date(), 7), 'yyyy-MM-dd'))
        .order('date', { ascending: false });
      
      if (streakData) {
        setStreakHistory(streakData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSetting = async (key: keyof NotificationSettings, value: boolean) => {
    if (!user || !notifications) return;
    
    setUpdatingNotifications(true);
    
    try {
      const { error } = await supabase
        .from('notification_settings')
        .update({ [key]: value })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setNotifications({ ...notifications, [key]: value });
      toast.success('Einstellungen gespeichert / Settings saved');
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('Fehler beim Speichern / Error saving');
    } finally {
      setUpdatingNotifications(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Auf Wiedersehen! / Goodbye!');
    }
  };

  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (profile?.email) {
      return profile.email[0].toUpperCase();
    }
    return 'U';
  };

  const accuracy = progress 
    ? Math.round((progress.total_correct_answers / Math.max(1, progress.total_correct_answers + progress.total_incorrect_answers)) * 100)
    : 0;

  // Generate last 7 days for streak calendar
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const streakDay = streakHistory.find(s => s.date === dateStr);
    return {
      date,
      dateStr,
      active: streakDay && (streakDay.words_learned > 0 || streakDay.quizzes_completed > 0),
      words: streakDay?.words_learned || 0,
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40">
        <div className="container flex items-center gap-3 h-16 px-4 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-lg">Profil</h1>
            <p className="text-xs text-muted-foreground">Profile</p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-5 space-y-4 max-w-lg mx-auto">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-20 bg-gradient-to-br from-primary to-primary/70" />
          <CardContent className="pt-0 -mt-10">
            <div className="flex items-end gap-4">
              <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xl font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="pb-2 flex-1">
                <h2 className="font-heading font-bold text-lg">
                  {profile?.display_name || 'Lernender'}
                </h2>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xl font-bold text-primary">{progress?.current_streak || 0}</p>
                <p className="text-[10px] text-muted-foreground">Tage-Serie / Streak</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                <Trophy className="w-5 h-5 text-secondary mx-auto mb-1" />
                <p className="text-xl font-bold text-secondary">{progress?.total_xp || 0}</p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-accent/10 border border-accent/20">
                <Target className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-xl font-bold text-accent">{accuracy}%</p>
                <p className="text-[10px] text-muted-foreground">Genauigkeit / Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Calendar */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <span>Lernverlauf</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Streak History</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-2">
              {last7Days.map((day) => (
                <div key={day.dateStr} className="flex-1 text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">
                    {format(day.date, 'EEE', { locale: de })}
                  </p>
                  <div 
                    className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                      day.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.active ? (
                      <Flame className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{format(day.date, 'd')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="text-sm">
                <span className="font-medium">Längste Serie / Best Streak:</span>
                <span className="ml-2 text-primary font-bold">{progress?.longest_streak || 0} Tage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Statistics */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-5 h-5 text-secondary" />
              <div>
                <span>Lernstatistik</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Learning Stats</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Wörter gelernt</p>
                  <p className="text-xs text-muted-foreground">Words learned</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-base font-bold">
                {progress?.total_words_learned || 0}
              </Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quizze abgeschlossen</p>
                  <p className="text-xs text-muted-foreground">Quizzes completed</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-base font-bold">
                {progress?.total_quizzes_completed || 0}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Richtige Antworten / Correct</p>
                <span className="text-sm text-green-600 font-bold">{progress?.total_correct_answers || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Falsche Antworten / Incorrect</p>
                <span className="text-sm text-red-500 font-bold">{progress?.total_incorrect_answers || 0}</span>
              </div>
              <Progress value={accuracy} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground text-center">{accuracy}% Genauigkeit</p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5 text-accent" />
              <div>
                <span>Benachrichtigungen</span>
                <span className="text-muted-foreground font-normal text-sm ml-2">/ Notifications</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Wiederholungs-Erinnerungen</Label>
                <p className="text-xs text-muted-foreground">Review reminders</p>
              </div>
              <Switch
                checked={notifications?.review_reminders ?? true}
                onCheckedChange={(checked) => updateNotificationSetting('review_reminders', checked)}
                disabled={updatingNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Tagesziel-Erinnerungen</Label>
                <p className="text-xs text-muted-foreground">Daily goal reminders</p>
              </div>
              <Switch
                checked={notifications?.daily_goal_reminders ?? true}
                onCheckedChange={(checked) => updateNotificationSetting('daily_goal_reminders', checked)}
                disabled={updatingNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Serie-Erinnerungen</Label>
                <p className="text-xs text-muted-foreground">Streak reminders</p>
              </div>
              <Switch
                checked={notifications?.streak_reminders ?? true}
                onCheckedChange={(checked) => updateNotificationSetting('streak_reminders', checked)}
                disabled={updatingNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button 
          variant="outline" 
          className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Abmelden / Sign Out
        </Button>

        <div className="h-8" />
      </main>
    </div>
  );
};

export default ProfilePage;
