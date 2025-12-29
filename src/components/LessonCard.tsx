import { ChevronRight } from 'lucide-react';
import { LessonCategory } from '@/types/vocabulary';

interface LessonCardProps {
  lesson: LessonCategory;
  onSelect: (lessonId: string) => void;
  index: number;
}

export const LessonCard = ({ lesson, onSelect, index }: LessonCardProps) => {
  const colorClasses = {
    der: 'bg-der/10 border-der/30',
    die: 'bg-die/10 border-die/30',
    das: 'bg-das/10 border-das/30',
  };

  const progressColor = {
    der: 'bg-der',
    die: 'bg-die',
    das: 'bg-das',
  };

  return (
    <button
      onClick={() => onSelect(lesson.id)}
      className="w-full card-elevated p-4 flex items-center gap-4 hover:shadow-floating transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colorClasses[lesson.color as keyof typeof colorClasses]} border-2`}>
        {lesson.icon}
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-semibold text-foreground">{lesson.titleDe}</h3>
          <span className="text-xs text-muted-foreground">({lesson.title})</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{lesson.wordCount} words</p>
        
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${progressColor[lesson.color as keyof typeof progressColor]} transition-all duration-500`}
            style={{ width: `${lesson.progress}%` }}
          />
        </div>
      </div>
      
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
  );
};
