import { Trophy, Target, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '@/types/vocabulary';

interface ProgressCardProps {
  progress: UserProgress;
}

export const ProgressCard = ({ progress }: ProgressCardProps) => {
  const accuracy = progress.correctAnswers + progress.incorrectAnswers > 0
    ? Math.round((progress.correctAnswers / (progress.correctAnswers + progress.incorrectAnswers)) * 100)
    : 0;

  return (
    <div className="card-elevated p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg">Your Progress</h2>
        <Trophy className="w-5 h-5 text-primary" />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-muted/50 rounded-xl">
          <div className="flex justify-center mb-1">
            <Target className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.masteredWords}</p>
          <p className="text-xs text-muted-foreground">Mastered</p>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-xl">
          <div className="flex justify-center mb-1">
            <CheckCircle2 className="w-5 h-5 text-correct" />
          </div>
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-xl">
          <div className="flex justify-center mb-1">
            <span className="text-lg">📚</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.totalWords}</p>
          <p className="text-xs text-muted-foreground">Words</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-semibold">{Math.round((progress.masteredWords / progress.totalWords) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
            style={{ width: `${(progress.masteredWords / progress.totalWords) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
