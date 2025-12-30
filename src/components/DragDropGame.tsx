import { useState, useCallback, useRef } from 'react';
import { VocabularyWord, Article } from '@/types/vocabulary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw, Flame, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { SRSData } from '@/types/srs';

interface DragDropGameProps {
  words: VocabularyWord[];
  onBack: () => void;
  onComplete: (correct: number, incorrect: number) => void;
  onRecordReview?: (wordId: string, isCorrect: boolean, responseTime: number) => SRSData;
  getWordDifficulty?: (wordId: string) => 'easy' | 'medium' | 'hard';
}

export const DragDropGame = ({ words, onBack, onComplete, onRecordReview, getWordDifficulty }: DragDropGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [activeDropZone, setActiveDropZone] = useState<Article | null>(null);
  const wordStartTime = useRef<number>(Date.now());
  const [lastSRSUpdate, setLastSRSUpdate] = useState<SRSData | null>(null);
  const currentWord = words[currentIndex];
  const isCompleted = currentIndex >= words.length;

  const handleDragStart = (e: React.DragEvent, wordId: string) => {
    setDraggedWord(wordId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, article: Article) => {
    e.preventDefault();
    setActiveDropZone(article);
  };

  const handleDragLeave = () => {
    setActiveDropZone(null);
  };

  const handleDrop = useCallback((e: React.DragEvent, article: Article) => {
    e.preventDefault();
    setActiveDropZone(null);
    setDraggedWord(null);

    if (!currentWord) return;

    const responseTime = Date.now() - wordStartTime.current;
    const isCorrect = currentWord.article === article;
    setResult(isCorrect ? 'correct' : 'incorrect');

    // Record SRS review
    if (onRecordReview) {
      const srsUpdate = onRecordReview(currentWord.id, isCorrect, responseTime);
      setLastSRSUpdate(srsUpdate);
    }

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      toast.success('Richtig! 🎉', { duration: 1500 });
    } else {
      setIncorrectCount(prev => prev + 1);
      toast.error(`Falsch! Es ist "${currentWord.article} ${currentWord.german}"`, { duration: 2000 });
    }

    setCompletedWords(prev => new Set([...prev, currentWord.id]));

    setTimeout(() => {
      setResult(null);
      setLastSRSUpdate(null);
      wordStartTime.current = Date.now();
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(correctCount + (isCorrect ? 1 : 0), incorrectCount + (isCorrect ? 0 : 1));
      }
    }, 1500);
  }, [currentWord, currentIndex, words.length, correctCount, incorrectCount, onComplete, onRecordReview]);

  const handleTouchStart = (wordId: string) => {
    setDraggedWord(wordId);
  };

  const handleArticleClick = (article: Article) => {
    if (!currentWord || result) return;
    
    const responseTime = Date.now() - wordStartTime.current;
    const isCorrect = currentWord.article === article;
    setResult(isCorrect ? 'correct' : 'incorrect');

    // Record SRS review
    if (onRecordReview) {
      const srsUpdate = onRecordReview(currentWord.id, isCorrect, responseTime);
      setLastSRSUpdate(srsUpdate);
    }

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      toast.success('Richtig! 🎉', { duration: 1500 });
    } else {
      setIncorrectCount(prev => prev + 1);
      toast.error(`Falsch! Es ist "${currentWord.article} ${currentWord.german}"`, { duration: 2000 });
    }

    setCompletedWords(prev => new Set([...prev, currentWord.id]));

    setTimeout(() => {
      setResult(null);
      setDraggedWord(null);
      setLastSRSUpdate(null);
      wordStartTime.current = Date.now();
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(correctCount + (isCorrect ? 1 : 0), incorrectCount + (isCorrect ? 0 : 1));
      }
    }, 1500);
  };

  const speakWord = () => {
    if ('speechSynthesis' in window && currentWord) {
      const utterance = new SpeechSynthesisUtterance(`${currentWord.article} ${currentWord.german}`);
      utterance.lang = 'de-DE';
      speechSynthesis.speak(utterance);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCompletedWords(new Set());
    setResult(null);
    setLastSRSUpdate(null);
    wordStartTime.current = Date.now();
  };

  const getDifficultyBadge = (wordId: string) => {
    if (!getWordDifficulty) return null;
    const difficulty = getWordDifficulty(wordId);
    const styles = {
      easy: 'bg-correct/10 text-correct',
      medium: 'bg-primary/10 text-primary',
      hard: 'bg-incorrect/10 text-incorrect',
    };
    const labels = {
      easy: 'Easy',
      medium: 'Learning',
      hard: 'Difficult',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[difficulty]}`}>
        {labels[difficulty]}
      </span>
    );
  };

  if (isCompleted) {
    const percentage = Math.round((correctCount / words.length) * 100);
    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-scale-in">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            {percentage >= 80 ? 'Ausgezeichnet!' : percentage >= 60 ? 'Gut gemacht!' : 'Weiter üben!'}
          </h2>
          <p className="text-muted-foreground mb-6">
            You got {correctCount} out of {words.length} correct
          </p>
          
          <div className="flex gap-4 items-center mb-8">
            <div className="flex items-center gap-2 bg-correct/10 text-correct px-4 py-2 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold">{correctCount}</span>
            </div>
            <div className="flex items-center gap-2 bg-incorrect/10 text-incorrect px-4 py-2 rounded-xl">
              <XCircle className="w-5 h-5" />
              <span className="font-bold">{incorrectCount}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button variant="primary" onClick={restartGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
          
          <span className="text-sm font-semibold text-muted-foreground">
            {currentIndex + 1}/{words.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Word Card */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div 
            className={`card-elevated p-8 w-full max-w-sm text-center transition-all duration-300 ${
              result === 'correct' ? 'ring-4 ring-correct animate-success bg-correct/5' : 
              result === 'incorrect' ? 'ring-4 ring-incorrect animate-shake bg-incorrect/5' : 
              draggedWord ? 'scale-95 opacity-75' : ''
            }`}
            draggable={!result}
            onDragStart={(e) => handleDragStart(e, currentWord.id)}
            onTouchStart={() => handleTouchStart(currentWord.id)}
          >
            <div className="flex justify-between items-center mb-2">
              {getDifficultyBadge(currentWord.id)}
              <button 
                onClick={speakWord}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <h2 className="font-heading text-4xl font-bold text-foreground mb-2">
              {currentWord.german}
            </h2>
            <p className="text-lg text-muted-foreground">{currentWord.english}</p>
            
            {result && (
              <div className={`mt-4 flex flex-col items-center gap-2`}>
                <div className={`flex items-center gap-2 ${
                  result === 'correct' ? 'text-correct' : 'text-incorrect'
                }`}>
                  {result === 'correct' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-semibold">
                    {result === 'correct' ? 'Correct!' : `It's "${currentWord.article}"`}
                  </span>
                </div>
                
                {/* SRS Feedback */}
                {lastSRSUpdate && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Brain className="w-3 h-3" />
                    <span>
                      {lastSRSUpdate.interval === 0 
                        ? 'Will review again soon'
                        : lastSRSUpdate.interval === 1 
                          ? 'Next review: tomorrow'
                          : `Next review: in ${lastSRSUpdate.interval} days`
                      }
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Drag the word or tap the correct article
          </p>
        </div>

        {/* Drop Zones */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {(['der', 'die', 'das'] as Article[]).map((article) => (
            <button
              key={article}
              onClick={() => handleArticleClick(article)}
              onDragOver={(e) => handleDragOver(e, article)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, article)}
              disabled={!!result}
              className={`
                article-box aspect-[4/3] flex flex-col items-center justify-center transition-all duration-200
                ${article === 'der' ? 'article-box-der' : article === 'die' ? 'article-box-die' : 'article-box-das'}
                ${activeDropZone === article ? 'drop-zone-active scale-105' : ''}
                ${!result ? 'hover:scale-105 active:scale-95' : 'opacity-50'}
              `}
            >
              <span className={`font-heading text-2xl font-bold ${
                article === 'der' ? 'text-der' : article === 'die' ? 'text-die' : 'text-das'
              }`}>
                {article}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {article === 'der' ? 'masculine' : article === 'die' ? 'feminine' : 'neuter'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
