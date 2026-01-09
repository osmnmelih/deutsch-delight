import { Progress } from '@/components/ui/progress';
import { Flame, Target, Brain, Trophy } from 'lucide-react';
import { useDailyGoals, Achievement } from '@/hooks/useDailyGoals';
import { Card, CardContent } from '@/components/ui/card';

interface DailyGoalsCardProps {
  onViewAchievements: () => void;
}

export const DailyGoalsCard = ({ onViewAchievements }: DailyGoalsCardProps) => {
  const { dailyProgress, targets, getGoalProgress, achievements } = useDailyGoals();
  const progress = getGoalProgress();

  if (!dailyProgress) return null;

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm">Tagesziele</h3>
              <p className="text-[10px] text-muted-foreground">Daily Goals</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20 rounded-full px-3 py-1">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-primary">{dailyProgress.streakCount}</span>
            <span className="text-xs text-muted-foreground">Tage / days</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Words Goal */}
          <div className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <div>
                <span className="font-medium text-foreground">Wörter gelernt</span>
                <span className="text-muted-foreground text-xs ml-1">/ Words learned</span>
              </div>
              <span className="font-bold text-primary">{dailyProgress.goals.wordsLearned}/{targets.wordsLearned}</span>
            </div>
            <Progress value={progress.words} className="h-2" />
          </div>

          {/* Quizzes Goal */}
          <div className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <div>
                <span className="font-medium text-foreground">Quizze abgeschlossen</span>
                <span className="text-muted-foreground text-xs ml-1">/ Quizzes completed</span>
              </div>
              <span className="font-bold text-secondary">{dailyProgress.goals.quizzesCompleted}/{targets.quizzesCompleted}</span>
            </div>
            <Progress value={progress.quizzes} className="h-2" />
          </div>

          {/* Correct Answers Goal */}
          <div className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <div>
                <span className="font-medium text-foreground">Richtige Antworten</span>
                <span className="text-muted-foreground text-xs ml-1">/ Correct answers</span>
              </div>
              <span className="font-bold text-correct">{dailyProgress.goals.correctAnswers}/{targets.correctAnswers}</span>
            </div>
            <Progress value={progress.answers} className="h-2" />
          </div>
        </div>

        {/* Achievements Preview */}
        <button 
          onClick={onViewAchievements}
          className="w-full mt-4 p-3 bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 rounded-xl flex items-center justify-between hover:bg-muted/70 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <div className="text-left">
              <span className="font-medium text-sm block">Erfolge</span>
              <span className="text-[10px] text-muted-foreground">Achievements</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {achievements.slice(0, 4).map((a) => (
              <span key={a.id} className="text-lg">{a.icon}</span>
            ))}
            {achievements.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">+{achievements.length - 4}</span>
            )}
            {achievements.length === 0 && (
              <span className="text-xs text-muted-foreground">Noch keine / None yet</span>
            )}
          </div>
        </button>
      </CardContent>
    </Card>
  );
};