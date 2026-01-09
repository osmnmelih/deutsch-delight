import { ChevronRight, Lock } from 'lucide-react';
import { LessonCategory } from '@/types/vocabulary';

interface LessonCardProps {
  lesson: LessonCategory;
  onSelect: (lessonId: string) => void;
  index: number;
  isLocked?: boolean;
}

export const LessonCard = ({ lesson, onSelect, index, isLocked = false }: LessonCardProps) => {
  const colorClasses = {
    der: 'from-der/15 to-der/5 border-der/30',
    die: 'from-die/15 to-die/5 border-die/30',
    das: 'from-das/15 to-das/5 border-das/30',
  };

  const progressColor = {
    der: 'bg-der',
    die: 'bg-die',
    das: 'bg-das',
  };

  const iconBg = {
    der: 'bg-der/20 border-der/30',
    die: 'bg-die/20 border-die/30',
    das: 'bg-das/20 border-das/30',
  };

  return (
    <button
      onClick={() => !isLocked && onSelect(lesson.id)}
      disabled={isLocked}
      className={`w-full bg-gradient-to-br ${colorClasses[lesson.color as keyof typeof colorClasses]} border rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 animate-slide-up group ${
        isLocked 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-lg hover:-translate-y-1 active:scale-[0.99]'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${iconBg[lesson.color as keyof typeof iconBg]} border-2 relative`}>
        {lesson.icon}
        {isLocked && (
          <div className="absolute inset-0 bg-background/60 rounded-2xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading font-semibold text-foreground">{lesson.titleDe}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{lesson.title}</p>
        <p className="text-sm text-muted-foreground mt-1">{lesson.wordCount} Wörter / words</p>
        
        <div className="mt-2.5 h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${progressColor[lesson.color as keyof typeof progressColor]} transition-all duration-500`}
            style={{ width: `${lesson.progress}%` }}
          />
        </div>
      </div>
      
      <ChevronRight className={`w-5 h-5 transition-all ${isLocked ? 'text-muted-foreground/50' : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'}`} />
    </button>
  );
};