import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Volume2, Check, X, Sparkles, Trophy, Target, Clock, Brain, Zap, BookOpen, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VocabularyWord, Article } from '@/types/vocabulary';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface MixedPracticeProps {
  words: VocabularyWord[];
  onBack: () => void;
  onComplete: (correct: number, incorrect: number) => void;
  onRecordReview?: (wordId: string, correct: boolean, responseTime: number) => void;
}

type ExerciseType = 'translate-to-german' | 'translate-to-english' | 'article-select' | 'fill-article' | 'listening' | 'spelling';

interface Exercise {
  id: string;
  type: ExerciseType;
  word: VocabularyWord;
  prompt: string;
  promptDe: string;
  correctAnswer: string;
  options?: string[];
}

const articles: Article[] = ['der', 'die', 'das'];

// Shuffle utility
const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateExercises = (words: VocabularyWord[], count: number = 10): Exercise[] => {
  const selectedWords = shuffle(words).slice(0, count);
  const exerciseTypes: ExerciseType[] = [
    'translate-to-german', 
    'translate-to-english', 
    'article-select', 
    'fill-article',
    'listening',
    'spelling'
  ];
  
  return selectedWords.map((word, index) => {
    const type = exerciseTypes[index % exerciseTypes.length];
    
    switch (type) {
      case 'translate-to-german':
        const wrongGerman = shuffle(words.filter(w => w.id !== word.id)).slice(0, 3);
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: `Wie heißt "${word.english}" auf Deutsch?`,
          promptDe: `What is "${word.english}" in German?`,
          correctAnswer: word.german,
          options: shuffle([word.german, ...wrongGerman.map(w => w.german)])
        };
        
      case 'translate-to-english':
        const wrongEnglish = shuffle(words.filter(w => w.id !== word.id)).slice(0, 3);
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: `Was bedeutet "${word.article} ${word.german}" auf Englisch?`,
          promptDe: `What does "${word.article} ${word.german}" mean in English?`,
          correctAnswer: word.english,
          options: shuffle([word.english, ...wrongEnglish.map(w => w.english)])
        };
        
      case 'article-select':
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: `Welcher Artikel passt zu "${word.german}"?`,
          promptDe: `Which article goes with "${word.german}"?`,
          correctAnswer: word.article,
          options: articles
        };
        
      case 'fill-article':
        const sentences = [
          { de: `_____ ${word.german} ist schön.`, en: `The ${word.english} is beautiful.` },
          { de: `Ich sehe _____ ${word.german}.`, en: `I see the ${word.english}.` },
          { de: `Das ist _____ ${word.german}.`, en: `That is the ${word.english}.` }
        ];
        const sentence = sentences[Math.floor(Math.random() * sentences.length)];
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: `Fülle die Lücke: ${sentence.de}`,
          promptDe: `Fill the blank: ${sentence.en}`,
          correctAnswer: word.article
        };
        
      case 'listening':
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: 'Höre zu und wähle das richtige Wort.',
          promptDe: 'Listen and choose the correct word.',
          correctAnswer: word.german,
          options: shuffle([word.german, ...shuffle(words.filter(w => w.id !== word.id)).slice(0, 3).map(w => w.german)])
        };
        
      case 'spelling':
        return {
          id: `${word.id}-${type}`,
          type,
          word,
          prompt: `Schreibe das deutsche Wort für "${word.english}".`,
          promptDe: `Write the German word for "${word.english}".`,
          correctAnswer: word.german
        };
        
      default:
        return {
          id: `${word.id}-default`,
          type: 'translate-to-german',
          word,
          prompt: `Wie heißt "${word.english}" auf Deutsch?`,
          promptDe: `What is "${word.english}" in German?`,
          correctAnswer: word.german,
          options: shuffle([word.german, ...shuffle(words).slice(0, 3).map(w => w.german)])
        };
    }
  });
};

export const MixedPractice = ({
  words,
  onBack,
  onComplete,
  onRecordReview
}: MixedPracticeProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [results, setResults] = useState<{ correct: boolean; timeTaken: number }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const { speakWord, isSupported } = useAudioPronunciation();

  useEffect(() => {
    const generated = generateExercises(words, Math.min(words.length, 10));
    setExercises(shuffle(generated));
    setQuestionStartTime(Date.now());
  }, [words]);

  const currentExercise = exercises[currentIndex];
  const progressPercent = exercises.length > 0 
    ? ((currentIndex + (showResult ? 1 : 0)) / exercises.length) * 100 
    : 0;

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    
    const timeTaken = Date.now() - questionStartTime;
    const isCorrect = answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase();
    
    setResults(prev => [...prev, { correct: isCorrect, timeTaken }]);
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (onRecordReview) {
      onRecordReview(currentExercise.word.id, isCorrect, timeTaken);
    }
  }, [showResult, questionStartTime, currentExercise, onRecordReview]);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setInputAnswer('');
      setShowResult(false);
      setQuestionStartTime(Date.now());
    } else {
      setIsComplete(true);
      const correct = results.filter(r => r.correct).length;
      const incorrect = results.filter(r => !r.correct).length;
      onComplete(correct, incorrect);
    }
  };

  const handleSpeak = () => {
    if (currentExercise) {
      speakWord(currentExercise.word.german, currentExercise.word.article);
    }
  };

  const getExerciseIcon = (type: ExerciseType) => {
    switch (type) {
      case 'translate-to-german':
      case 'translate-to-english':
        return <Languages className="w-4 h-4" />;
      case 'article-select':
      case 'fill-article':
        return <BookOpen className="w-4 h-4" />;
      case 'listening':
        return <Volume2 className="w-4 h-4" />;
      case 'spelling':
        return <Brain className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getExerciseLabel = (type: ExerciseType) => {
    switch (type) {
      case 'translate-to-german': return 'Übersetzen';
      case 'translate-to-english': return 'Bedeutung';
      case 'article-select': return 'Artikel';
      case 'fill-article': return 'Lückentext';
      case 'listening': return 'Hören';
      case 'spelling': return 'Schreiben';
      default: return 'Übung';
    }
  };

  const getArticleColor = (article: string, isCorrect?: boolean, isSelected?: boolean): string => {
    if (isCorrect) return 'bg-correct text-white border-correct';
    if (isSelected) return 'bg-incorrect/10 text-incorrect border-incorrect';
    switch (article) {
      case 'der': return 'bg-der/10 text-der border-der/50 hover:bg-der/20';
      case 'die': return 'bg-die/10 text-die border-die/50 hover:bg-die/20';
      case 'das': return 'bg-das/10 text-das border-das/50 hover:bg-das/20';
    }
    return 'border-border';
  };

  // Completion screen
  if (isComplete) {
    const correct = results.filter(r => r.correct).length;
    const incorrect = results.filter(r => !r.correct).length;
    const accuracy = Math.round((correct / results.length) * 100);
    const avgTime = Math.round(results.reduce((acc, r) => acc + r.timeTaken, 0) / results.length / 1000);

    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <header className="p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück
          </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 animate-scale-in">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className="font-heading text-3xl font-bold mb-2">Übung abgeschlossen!</h1>
          <p className="text-muted-foreground mb-8">Practice Complete - Great job!</p>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Genauigkeit</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-5 h-5 text-correct" />
              </div>
              <p className="text-2xl font-bold text-correct">{correct}</p>
              <p className="text-xs text-muted-foreground">Richtig</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{avgTime}s</p>
              <p className="text-xs text-muted-foreground">Ø Zeit</p>
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={onBack} className="w-full max-w-sm">
            <Sparkles className="w-5 h-5 mr-2" />
            Weiter lernen
          </Button>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Übungen werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Beenden
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            {currentIndex + 1} / {exercises.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </header>

      {/* Exercise Content */}
      <main className="flex-1 flex flex-col p-6">
        {/* Exercise Type Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary" className="gap-1.5">
            {getExerciseIcon(currentExercise.type)}
            {getExerciseLabel(currentExercise.type)}
          </Badge>
        </div>

        {/* Question Prompt */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-1">
            {currentExercise.prompt}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentExercise.promptDe}
          </p>
          
          {/* Auto-play audio for listening exercises */}
          {currentExercise.type === 'listening' && isSupported && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleSpeak}
              className="mt-4"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Anhören / Listen
            </Button>
          )}
        </div>

        {/* Answer Area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Multiple Choice Options */}
          {currentExercise.options && currentExercise.type !== 'article-select' && (
            <div className="space-y-3">
              {currentExercise.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentExercise.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium transition-all ${
                      showCorrect
                        ? 'border-correct bg-correct/10 text-correct'
                        : showIncorrect
                        ? 'border-incorrect bg-incorrect/10 text-incorrect'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <Check className="w-5 h-5" />}
                      {showIncorrect && <X className="w-5 h-5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Article Selection */}
          {currentExercise.type === 'article-select' && (
            <div className="grid grid-cols-3 gap-3">
              {articles.map((article) => {
                const isSelected = selectedAnswer === article;
                const isCorrect = article === currentExercise.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={article}
                    onClick={() => handleAnswer(article)}
                    disabled={showResult}
                    className={`p-6 rounded-2xl border-2 font-bold text-xl transition-all ${
                      showCorrect
                        ? getArticleColor(article, true)
                        : showIncorrect
                        ? 'border-incorrect bg-incorrect/10 text-incorrect'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : getArticleColor(article)
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{article}</span>
                      {showCorrect && <Check className="w-5 h-5" />}
                      {showIncorrect && <X className="w-5 h-5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Text Input (for fill-article and spelling) */}
          {(currentExercise.type === 'fill-article' || currentExercise.type === 'spelling') && (
            <div className="space-y-4">
              <Input
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                placeholder={currentExercise.type === 'fill-article' 
                  ? 'Artikel eingeben (der, die, das)' 
                  : 'Deutsches Wort schreiben...'}
                className="text-center text-lg py-6"
                disabled={showResult}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputAnswer.trim()) {
                    handleAnswer(inputAnswer.trim());
                  }
                }}
              />
              {!showResult && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => handleAnswer(inputAnswer.trim())}
                  disabled={!inputAnswer.trim()}
                >
                  Prüfen / Check
                </Button>
              )}
              {showResult && (
                <div className={`p-4 rounded-2xl text-center ${
                  inputAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase()
                    ? 'bg-correct/10 text-correct'
                    : 'bg-incorrect/10 text-incorrect'
                }`}>
                  {inputAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase() ? (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span className="font-bold">Richtig! / Correct!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <X className="w-5 h-5" />
                        <span className="font-bold">Nicht ganz / Not quite</span>
                      </div>
                      <p className="text-sm">
                        Richtige Antwort: <strong>{currentExercise.correctAnswer}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next Button */}
        {showResult && (
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleNext}
            className="w-full mt-6 animate-slide-up"
          >
            {currentIndex < exercises.length - 1 ? 'Weiter / Next' : 'Ergebnis / Results'}
          </Button>
        )}
      </main>
    </div>
  );
};
