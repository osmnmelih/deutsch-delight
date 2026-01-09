import { Trophy, Target, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '@/types/vocabulary';
import { Card, CardContent } from '@/components/ui/card';

interface ProgressCardProps {
  progress: UserProgress;
}

export const ProgressCard = ({ progress }: ProgressCardProps) => {
  const accuracy = progress.correctAnswers + progress.incorrectAnswers > 0
    ? Math.round((progress.correctAnswers / (progress.correctAnswers + progress.incorrectAnswers)) * 100)
    : 0;

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-semibold text-lg">Dein Fortschritt</h2>
            <p className="text-xs text-muted-foreground">Your Progress</p>
          </div>
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl">
            <div className="flex justify-center mb-1.5">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{progress.masteredWords}</p>
            <p className="text-[10px] text-muted-foreground">Gelernt / Mastered</p>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-correct/10 to-correct/5 border border-correct/20 rounded-xl">
            <div className="flex justify-center mb-1.5">
              <CheckCircle2 className="w-5 h-5 text-correct" />
            </div>
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-[10px] text-muted-foreground">Genauigkeit / Accuracy</p>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
            <div className="flex justify-center mb-1.5">
              <span className="text-lg">📚</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{progress.totalWords}</p>
            <p className="text-[10px] text-muted-foreground">Wörter / Words</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <div>
              <span className="text-foreground font-medium">Gesamtfortschritt</span>
              <span className="text-muted-foreground text-xs ml-1">/ Overall Progress</span>
            </div>
            <span className="font-bold text-primary">{Math.round((progress.masteredWords / progress.totalWords) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${(progress.masteredWords / progress.totalWords) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};