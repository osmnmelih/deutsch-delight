import { useMemo } from 'react';
import { ArrowLeft, Brain, TrendingUp, Clock, CheckCircle, Volume2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { SRSData } from '@/types/srs';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface VocabularyListProps {
  words: VocabularyWord[];
  getSRSData: (wordId: string) => SRSData;
  getWordDifficulty: (wordId: string) => 'easy' | 'medium' | 'hard';
  onBack: () => void;
  onPracticeWord: (word: VocabularyWord) => void;
}

export const VocabularyList = ({ 
  words, 
  getSRSData, 
  getWordDifficulty, 
  onBack,
  onPracticeWord 
}: VocabularyListProps) => {
  const { speakWord } = useAudioPronunciation();
  
  const sortedWords = useMemo(() => {
    return [...words].sort((a, b) => {
      const difficultyOrder = { hard: 0, medium: 1, easy: 2 };
      const aDiff = getWordDifficulty(a.id);
      const bDiff = getWordDifficulty(b.id);
      
      if (difficultyOrder[aDiff] !== difficultyOrder[bDiff]) {
        return difficultyOrder[aDiff] - difficultyOrder[bDiff];
      }
      
      // Secondary sort by next review date
      const aSRS = getSRSData(a.id);
      const bSRS = getSRSData(b.id);
      return new Date(aSRS.nextReview).getTime() - new Date(bSRS.nextReview).getTime();
    });
  }, [words, getWordDifficulty, getSRSData]);

  const stats = useMemo(() => {
    let hard = 0, medium = 0, easy = 0, dueNow = 0;
    words.forEach(word => {
      const diff = getWordDifficulty(word.id);
      if (diff === 'hard') hard++;
      else if (diff === 'medium') medium++;
      else easy++;
      
      const srs = getSRSData(word.id);
      if (isPast(new Date(srs.nextReview))) dueNow++;
    });
    return { hard, medium, easy, dueNow };
  }, [words, getWordDifficulty, getSRSData]);

  const getDifficultyStyles = (difficulty: 'easy' | 'medium' | 'hard') => {
    const styles = {
      easy: { bg: 'bg-correct/10', text: 'text-correct', label: 'Mastered' },
      medium: { bg: 'bg-primary/10', text: 'text-primary', label: 'Learning' },
      hard: { bg: 'bg-incorrect/10', text: 'text-incorrect', label: 'Difficult' },
    };
    return styles[difficulty];
  };

  const getArticleStyles = (article: string) => {
    if (article === 'der') return 'bg-der/20 text-der';
    if (article === 'die') return 'bg-die/20 text-die';
    return 'bg-das/20 text-das';
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold">Vocabulary</h1>
            <p className="text-sm text-muted-foreground">{words.length} words</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="p-4 border-b border-border/50">
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 rounded-xl bg-incorrect/10">
            <p className="text-lg font-bold text-incorrect">{stats.hard}</p>
            <p className="text-xs text-muted-foreground">Difficult</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-primary/10">
            <p className="text-lg font-bold text-primary">{stats.medium}</p>
            <p className="text-xs text-muted-foreground">Learning</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-correct/10">
            <p className="text-lg font-bold text-correct">{stats.easy}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-accent/10">
            <p className="text-lg font-bold text-accent">{stats.dueNow}</p>
            <p className="text-xs text-muted-foreground">Due</p>
          </div>
        </div>
      </div>

      {/* Word List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sortedWords.map((word, index) => {
            const srs = getSRSData(word.id);
            const difficulty = getWordDifficulty(word.id);
            const diffStyles = getDifficultyStyles(difficulty);
            const isDue = isPast(new Date(srs.nextReview));
            
            return (
              <div 
                key={word.id}
                onClick={() => onPracticeWord(word)}
                className="card-elevated p-4 cursor-pointer hover:scale-[1.02] transition-transform animate-slide-up"
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Word Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getArticleStyles(word.article)}`}>
                        {word.article}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground truncate">
                        {word.german}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(word.german, word.article);
                        }}
                        className="p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">{word.english}</p>
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${diffStyles.bg} ${diffStyles.text}`}>
                    {diffStyles.label}
                  </div>
                </div>

                {/* SRS Stats */}
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-correct" />
                      <span>{srs.correctCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{srs.repetitions} reps</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      <span>{srs.easeFactor.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 ${isDue ? 'text-incorrect font-medium' : ''}`}>
                    <Clock className="w-3 h-3" />
                    <span>
                      {isDue 
                        ? 'Due now' 
                        : srs.interval === 0 
                          ? 'New'
                          : formatDistanceToNow(new Date(srs.nextReview), { addSuffix: true })
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
