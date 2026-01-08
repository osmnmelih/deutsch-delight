import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Volume2, Check, X, RotateCcw, Headphones, ChevronRight } from 'lucide-react';
import { listeningExercises, ListeningExercise as ListeningExerciseType } from '@/data/listeningExercises';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';
import { cn } from '@/lib/utils';

interface ListeningExerciseProps {
  onBack: () => void;
}

type CategoryFilter = 'all' | 'greeting' | 'shopping' | 'directions' | 'restaurant' | 'daily' | 'conversation';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

const categoryLabels: Record<string, string> = {
  greeting: 'Begrüßungen',
  shopping: 'Einkaufen',
  directions: 'Wegbeschreibungen',
  restaurant: 'Restaurant',
  daily: 'Alltag',
  conversation: 'Gespräche'
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Anfänger',
  intermediate: 'Mittelstufe',
  advanced: 'Fortgeschritten'
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-correct/20 text-correct',
  intermediate: 'bg-primary/20 text-primary',
  advanced: 'bg-incorrect/20 text-incorrect'
};

export const ListeningExercise = ({ onBack }: ListeningExerciseProps) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [currentExercise, setCurrentExercise] = useState<ListeningExerciseType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);

  const { speak, isSpeaking, isSupported } = useAudioPronunciation({ rate: 0.8 });

  const filteredExercises = useMemo(() => {
    return listeningExercises.filter(exercise => {
      const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
      return matchesCategory && matchesDifficulty;
    });
  }, [categoryFilter, difficultyFilter]);

  const handlePlayAudio = () => {
    if (currentExercise && isSupported) {
      speak(currentExercise.germanText);
    }
  };

  const handleSelectExercise = (exercise: ListeningExerciseType) => {
    setCurrentExercise(exercise);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowTranslation(false);
    setExerciseComplete(false);
    setCorrectCount(0);
    setTotalAnswered(0);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (isAnswered || !currentExercise) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setTotalAnswered(prev => prev + 1);
    
    const currentQuestion = currentExercise.questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!currentExercise) return;
    
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setExerciseComplete(true);
    }
  };

  const handleRestartExercise = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setTotalAnswered(0);
    setExerciseComplete(false);
    setShowTranslation(false);
  };

  const handleBackToList = () => {
    setCurrentExercise(null);
    setExerciseComplete(false);
  };

  // Exercise Selection View
  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6 text-primary" />
              <h1 className="font-heading text-xl font-bold">Hörübungen</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 space-y-6">
          {/* Filters */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Kategorie</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={categoryFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('all')}
                >
                  Alle
                </Button>
                {(['greeting', 'shopping', 'directions', 'restaurant', 'daily', 'conversation'] as const).map(cat => (
                  <Button
                    key={cat}
                    variant={categoryFilter === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {categoryLabels[cat]}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Schwierigkeit</p>
              <div className="flex gap-2">
                <Button
                  variant={difficultyFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDifficultyFilter('all')}
                >
                  Alle
                </Button>
                {(['beginner', 'intermediate', 'advanced'] as const).map(diff => (
                  <Button
                    key={diff}
                    variant={difficultyFilter === diff ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficultyFilter(diff)}
                  >
                    {difficultyLabels[diff]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-3">
            {filteredExercises.map((exercise) => (
              <Card 
                key={exercise.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSelectExercise(exercise)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full', difficultyColors[exercise.difficulty])}>
                          {difficultyLabels[exercise.difficulty]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {categoryLabels[exercise.category]}
                        </span>
                      </div>
                      <p className="text-sm font-medium line-clamp-1">{exercise.germanText}</p>
                      <p className="text-xs text-muted-foreground">{exercise.questions.length} Fragen</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Exercise Complete View
  if (exerciseComplete) {
    const accuracy = Math.round((correctCount / totalAnswered) * 100);
    
    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBackToList}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-xl font-bold">Übung abgeschlossen!</h1>
          </div>
        </header>

        <main className="container px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-6 max-w-sm">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Headphones className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold">{accuracy}%</h2>
              <p className="text-muted-foreground">Genauigkeit</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-correct/10 p-4 rounded-xl">
                <p className="text-2xl font-bold text-correct">{correctCount}</p>
                <p className="text-sm text-muted-foreground">Richtig</p>
              </div>
              <div className="bg-incorrect/10 p-4 rounded-xl">
                <p className="text-2xl font-bold text-incorrect">{totalAnswered - correctCount}</p>
                <p className="text-sm text-muted-foreground">Falsch</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleRestartExercise} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Nochmal versuchen
              </Button>
              <Button variant="outline" onClick={handleBackToList} className="w-full">
                Andere Übung wählen
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Active Exercise View
  const currentQuestion = currentExercise.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentExercise.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={handleBackToList}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <span className="text-sm text-muted-foreground">
              Frage {currentQuestionIndex + 1} von {currentExercise.questions.length}
            </span>
          </div>
          <span className="text-sm font-medium text-correct">{correctCount} richtig</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <main className="container px-4 py-6 flex-1 space-y-6">
        {/* Audio Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                variant="default"
                className="w-20 h-20 rounded-full"
                onClick={handlePlayAudio}
                disabled={isSpeaking || !isSupported}
              >
                <Volume2 className={cn("w-8 h-8", isSpeaking && "animate-pulse")} />
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                {isSupported 
                  ? 'Tippe, um das deutsche Audio zu hören' 
                  : 'Audio wird in deinem Browser nicht unterstützt'}
              </p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? 'Übersetzung verstecken' : 'Übersetzung zeigen'}
              </Button>
              
              {showTranslation && (
                <div className="text-center space-y-2 pt-2 border-t border-border w-full">
                  <p className="font-medium">{currentExercise.germanText}</p>
                  <p className="text-sm text-muted-foreground">{currentExercise.englishTranslation}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <div>
          <h3 className="font-heading text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              
              let buttonStyle = 'border-border hover:border-primary';
              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = 'border-correct bg-correct/10';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'border-incorrect bg-incorrect/10';
                }
              } else if (isSelected) {
                buttonStyle = 'border-primary bg-primary/10';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    'flex items-center justify-between',
                    buttonStyle
                  )}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <Check className="w-5 h-5 text-correct" />}
                  {isAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-incorrect" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {isAnswered && (
          <Button onClick={handleNextQuestion} className="w-full" size="lg">
            {currentQuestionIndex < currentExercise.questions.length - 1 ? 'Nächste Frage' : 'Ergebnisse anzeigen'}
          </Button>
        )}
      </main>
    </div>
  );
};
