import { Progress } from '@/components/ui/progress';
import { Flame, Target, Brain, Trophy } from 'lucide-react';
import { useDailyGoals, Achievement } from '@/hooks/useDailyGoals';

interface DailyGoalsCardProps {
  onViewAchievements: () => void;
}

export const DailyGoalsCard = ({ onViewAchievements }: DailyGoalsCardProps) => {
  const { dailyProgress, targets, getGoalProgress, achievements } = useDailyGoals();
  const progress = getGoalProgress();

  if (!dailyProgress) return null;

  return (
    <div className="card-elevated p-4 animate-slide-up" style={{ animationDelay: '120ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Daily Goals</h3>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1">
          <Flame className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm text-primary">{dailyProgress.streakCount} day streak</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Words Goal */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Words learned</span>
            <span className="font-medium">{dailyProgress.goals.wordsLearned}/{targets.wordsLearned}</span>
          </div>
          <Progress value={progress.words} className="h-2" />
        </div>

        {/* Quizzes Goal */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Quizzes completed</span>
            <span className="font-medium">{dailyProgress.goals.quizzesCompleted}/{targets.quizzesCompleted}</span>
          </div>
          <Progress value={progress.quizzes} className="h-2" />
        </div>

        {/* Correct Answers Goal */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Correct answers</span>
            <span className="font-medium">{dailyProgress.goals.correctAnswers}/{targets.correctAnswers}</span>
          </div>
          <Progress value={progress.answers} className="h-2" />
        </div>
      </div>

      {/* Achievements Preview */}
      <button 
        onClick={onViewAchievements}
        className="w-full mt-4 p-3 bg-muted/50 rounded-xl flex items-center justify-between hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-medium text-sm">Achievements</span>
        </div>
        <div className="flex items-center gap-1">
          {achievements.slice(0, 4).map((a, i) => (
            <span key={a.id} className="text-lg">{a.icon}</span>
          ))}
          {achievements.length > 4 && (
            <span className="text-sm text-muted-foreground ml-1">+{achievements.length - 4}</span>
          )}
          {achievements.length === 0 && (
            <span className="text-sm text-muted-foreground">None yet</span>
          )}
        </div>
      </button>
    </div>
  );
};
