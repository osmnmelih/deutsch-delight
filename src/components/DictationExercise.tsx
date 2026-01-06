import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Volume2, Eye, EyeOff, RotateCcw, Check, X, Lightbulb, ChevronRight } from 'lucide-react';
import { listeningDictations, ListeningDictation } from '@/data/listeningExercises';

interface DictationExerciseProps {
  onBack: () => void;
}

const DictationExercise = ({ onBack }: DictationExerciseProps) => {
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [exercises, setExercises] = useState<ListeningDictation[]>([]);

  useEffect(() => {
    if (selectedLevel) {
      const levelExercises = listeningDictations.filter(d => d.level === selectedLevel);
      setExercises(levelExercises);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
    }
  }, [selectedLevel]);

  const currentExercise = exercises[currentIndex];

  const speakText = useCallback((text: string, speed: 'slow' | 'normal' | 'fast' = 'normal') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = speed === 'slow' ? 0.6 : speed === 'fast' ? 1.2 : 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:'"]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswer = () => {
    const normalized = normalizeText(userInput);
    const expected = normalizeText(currentExercise.german);
    const correct = normalized === expected;
    
    setIsCorrect(correct);
    setIsChecked(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setShowAnswer(false);
      setShowHints(false);
      setIsChecked(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserInput('');
    setShowAnswer(false);
    setShowHints(false);
    setIsChecked(false);
    setScore({ correct: 0, total: 0 });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isChecked) {
      checkAnswer();
    }
  };

  const levels: ('A1' | 'A2' | 'B1' | 'B2')[] = ['A1', 'A2', 'B1', 'B2'];
  const levelColors = {
    A1: 'bg-correct/20 text-correct border-correct/30',
    A2: 'bg-primary/20 text-primary border-primary/30',
    B1: 'bg-secondary/20 text-secondary border-secondary/30',
    B2: 'bg-accent/20 text-accent border-accent/30',
  };

  // Level selection view
  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎧</span>
                <h1 className="font-heading font-bold text-lg">Dictation Exercise</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-xl font-bold">Select Your Level</h2>
            <p className="text-muted-foreground text-sm">
              Listen to German sentences and type what you hear
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {levels.map(level => {
              const count = listeningDictations.filter(d => d.level === level).length;
              return (
                <Card
                  key={level}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => setSelectedLevel(level)}
                >
                  <CardContent className="p-6 text-center">
                    <Badge className={`${levelColors[level]} mb-3 text-lg px-4 py-1`}>
                      {level}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{count} exercises</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                How it works
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click the speaker icon to hear the sentence</li>
                <li>• Type exactly what you hear in German</li>
                <li>• Use hints if you get stuck</li>
                <li>• Check your answer and learn from mistakes</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Completion view
  if (currentIndex >= exercises.length - 1 && isChecked) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSelectedLevel(null)} className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-heading font-bold text-lg">Results</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-12 text-center space-y-6">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h2 className="font-heading text-2xl font-bold">
            {percentage >= 80 ? 'Excellent!' : percentage >= 50 ? 'Good job!' : 'Keep practicing!'}
          </h2>
          <p className="text-3xl font-bold text-primary">
            {score.correct} / {score.total}
          </p>
          <p className="text-muted-foreground">{percentage}% correct</p>
          
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => setSelectedLevel(null)}>
              Choose Another Level
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Exercise view
  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSelectedLevel(null)} className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Badge className={levelColors[selectedLevel]}>{selectedLevel}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} / {exercises.length}
            </div>
          </div>
          <Progress value={((currentIndex + 1) / exercises.length) * 100} className="mt-2 h-1" />
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <Card className="card-elevated">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">Listen and Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Audio buttons */}
            <div className="flex justify-center gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => speakText(currentExercise.german, 'slow')}
                className="gap-2"
              >
                <Volume2 className="w-5 h-5" />
                Slow
              </Button>
              <Button
                size="lg"
                onClick={() => speakText(currentExercise.german, currentExercise.audioSpeed)}
                className="gap-2"
              >
                <Volume2 className="w-5 h-5" />
                Play
              </Button>
            </div>

            {/* Input */}
            <div className="space-y-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type what you hear..."
                className="text-lg text-center h-14"
                disabled={isChecked}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>

            {/* Hints */}
            {!isChecked && (
              <div className="flex justify-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="gap-2"
                >
                  {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswer ? 'Hide Answer' : 'Reveal'}
                </Button>
              </div>
            )}

            {showHints && !isChecked && (
              <div className="bg-muted/50 p-4 rounded-xl space-y-2">
                <p className="text-sm font-medium">Hints:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentExercise.hints.map((hint, idx) => (
                    <li key={idx}>• {hint}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentExercise.keyWords.map((word, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {showAnswer && !isChecked && (
              <div className="bg-muted/50 p-4 rounded-xl text-center">
                <p className="text-lg font-medium">{currentExercise.german}</p>
                <p className="text-sm text-muted-foreground">{currentExercise.english}</p>
              </div>
            )}

            {/* Result */}
            {isChecked && (
              <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/20' : 'bg-incorrect/20'}`}>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-correct" />
                  ) : (
                    <X className="w-6 h-6 text-incorrect" />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite'}
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium">{currentExercise.german}</p>
                  <p className="text-sm text-muted-foreground">{currentExercise.english}</p>
                  {!isCorrect && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Your answer: <span className="italic">{userInput}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-center">
              {!isChecked ? (
                <Button onClick={checkAnswer} disabled={!userInput.trim()} className="gap-2 px-8">
                  <Check className="w-4 h-4" />
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="gap-2 px-8">
                  {currentIndex < exercises.length - 1 ? (
                    <>
                      Next <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    'See Results'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Score */}
        <div className="text-center text-sm text-muted-foreground">
          Score: {score.correct} / {score.total}
        </div>
      </main>
    </div>
  );
};

export default DictationExercise;
