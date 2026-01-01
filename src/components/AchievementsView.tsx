import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';
import { useDailyGoals } from '@/hooks/useDailyGoals';

interface AchievementsViewProps {
  onBack: () => void;
}

export const AchievementsView = ({ onBack }: AchievementsViewProps) => {
  const { achievements, allAchievements, getStats } = useDailyGoals();
  const stats = getStats();

  const unlockedIds = new Set(achievements.map(a => a.id));

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="font-heading font-bold text-lg">Achievements</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl">
                {achievements.length} / {allAchievements.length}
              </h2>
              <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/50 p-3 rounded-xl">
              <p className="text-2xl font-bold text-primary">{stats.totalWordsLearned}</p>
              <p className="text-xs text-muted-foreground">Words</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl">
              <p className="text-2xl font-bold text-correct">{stats.longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl">
              <p className="text-2xl font-bold text-accent">{stats.totalQuizzes}</p>
              <p className="text-xs text-muted-foreground">Quizzes</p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-3">
          {allAchievements.map(achievement => {
            const isUnlocked = unlockedIds.has(achievement.id);
            const unlockedAchievement = achievements.find(a => a.id === achievement.id);
            
            return (
              <div 
                key={achievement.id}
                className={`card-elevated p-4 text-center transition-all ${
                  isUnlocked ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-primary/20 to-accent/20' 
                    : 'bg-muted'
                }`}>
                  {isUnlocked ? (
                    <span className="text-3xl">{achievement.icon}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-heading font-bold text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {isUnlocked && unlockedAchievement?.unlockedAt && (
                  <p className="text-xs text-primary mt-2">
                    {new Date(unlockedAchievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </main>
    </div>
  );
};
