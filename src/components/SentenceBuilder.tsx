import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X, RotateCcw, Volume2, Shuffle } from 'lucide-react';
import { sentenceExercises, sentenceCategories, SentenceExercise } from '@/data/sentences';
import { cn } from '@/lib/utils';

interface SentenceBuilderProps {
  onBack: () => void;
}

export const SentenceBuilder = ({ onBack }: SentenceBuilderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  
  const exercises = useMemo(() => {
    if (!selectedCategory) return [];
    return sentenceExercises.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);
  
  const currentExercise = exercises[currentExerciseIndex];
  
  useEffect(() => {
    if (currentExercise) {
      resetExercise();
    }
  }, [currentExercise?.id]);
  
  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const resetExercise = () => {
    setSelectedWords([]);
    setAvailableWords(shuffleArray(currentExercise?.words || []));
    setIsChecked(false);
    setIsCorrect(false);
  };
  
  const handleWordClick = (word: string, index: number) => {
    if (isChecked) return;
    
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };
  
  const handleRemoveWord = (index: number) => {
    if (isChecked) return;
    
    const word = selectedWords[index];
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };
  
  const handleCheck = () => {
    if (selectedWords.length === 0) return;
    
    const userSentence = selectedWords.join(' ');
    const correct = userSentence === currentExercise.german;
    
    setIsCorrect(correct);
    setIsChecked(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
  };
  
  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Completed all exercises
      setSelectedCategory(null);
      setCurrentExerciseIndex(0);
      setScore({ correct: 0, total: 0 });
    }
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };
  
  // Category selection view
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="bg-card border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-heading text-xl font-bold">Sentence Builder</h1>
              <p className="text-sm text-muted-foreground">Build German sentences from word blocks</p>
            </div>
          </div>
        </header>
        
        <main className="container px-4 py-6 space-y-4">
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Choose a category to practice building sentences
            </p>
          </div>
          
          <div className="grid gap-3">
            {sentenceCategories.map((category) => {
              const count = sentenceExercises.filter(s => s.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="card-elevated p-4 text-left hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{count} exercises</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }
  
  // Exercise view
  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-heading text-lg font-bold">
                {sentenceCategories.find(c => c.id === selectedCategory)?.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentExerciseIndex + 1} / {exercises.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">
              Score: {score.correct}/{score.total}
            </p>
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-6 space-y-6">
        {/* Translation prompt */}
        <div className="card-elevated p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Translate to German:</p>
          <p className="text-xl font-heading font-semibold">{currentExercise.english}</p>
          <span className={cn(
            "inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium",
            currentExercise.difficulty === 'beginner' && "bg-correct/20 text-correct",
            currentExercise.difficulty === 'intermediate' && "bg-primary/20 text-primary",
            currentExercise.difficulty === 'advanced' && "bg-incorrect/20 text-incorrect"
          )}>
            {currentExercise.difficulty}
          </span>
        </div>
        
        {/* Sentence building area */}
        <div className="space-y-4">
          <div 
            className={cn(
              "min-h-[80px] p-4 rounded-xl border-2 border-dashed flex flex-wrap gap-2 items-center",
              isChecked && isCorrect && "border-correct bg-correct/10",
              isChecked && !isCorrect && "border-incorrect bg-incorrect/10",
              !isChecked && "border-border bg-card"
            )}
          >
            {selectedWords.length === 0 ? (
              <p className="text-muted-foreground text-sm w-full text-center">
                Tap words below to build your sentence
              </p>
            ) : (
              selectedWords.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleRemoveWord(index)}
                  disabled={isChecked}
                  className={cn(
                    "px-3 py-2 rounded-lg font-medium transition-all",
                    isChecked 
                      ? "bg-muted cursor-default" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                  )}
                >
                  {word}
                </button>
              ))
            )}
          </div>
          
          {/* Available words */}
          <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
            {availableWords.map((word, index) => (
              <button
                key={`${word}-${index}`}
                onClick={() => handleWordClick(word, index)}
                disabled={isChecked}
                className={cn(
                  "px-3 py-2 rounded-lg font-medium border-2 transition-all",
                  isChecked
                    ? "border-muted bg-muted/50 text-muted-foreground cursor-default"
                    : "border-border bg-card hover:border-primary hover:bg-primary/10 active:scale-95"
                )}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        
        {/* Result feedback */}
        {isChecked && (
          <div className={cn(
            "p-4 rounded-xl animate-slide-up",
            isCorrect ? "bg-correct/20" : "bg-incorrect/20"
          )}>
            <div className="flex items-center gap-3 mb-2">
              {isCorrect ? (
                <>
                  <Check className="w-6 h-6 text-correct" />
                  <span className="font-heading font-bold text-correct">Richtig!</span>
                </>
              ) : (
                <>
                  <X className="w-6 h-6 text-incorrect" />
                  <span className="font-heading font-bold text-incorrect">Nicht ganz...</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  Correct: <span className="font-semibold">{currentExercise.german}</span>
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => speakText(currentExercise.german)}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            {isCorrect && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(currentExercise.german)}
                className="gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Listen
              </Button>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-3">
          {!isChecked ? (
            <>
              <Button
                variant="outline"
                onClick={resetExercise}
                className="gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Shuffle
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleCheck}
                disabled={selectedWords.length === 0}
              >
                Check Answer
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={resetExercise}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleNext}
              >
                {currentExerciseIndex < exercises.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
