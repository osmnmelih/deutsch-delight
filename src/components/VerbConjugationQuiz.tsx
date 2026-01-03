import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, X, RotateCcw, Languages, Sparkles } from 'lucide-react';
import { verbs, Verb, VerbConjugation } from '@/data/verbs';
import { useVerbSRS } from '@/hooks/useVerbSRS';
import { cn } from '@/lib/utils';

interface VerbConjugationQuizProps {
  onBack: () => void;
}

type Tense = 'present' | 'perfect';
type Person = keyof VerbConjugation;

const persons: Person[] = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie'];

interface QuizQuestion {
  verb: Verb;
  tense: Tense;
  person: Person;
  correctAnswer: string;
}

const generateQuestions = (verbList: Verb[], count: number): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  const shuffledVerbs = [...verbList].sort(() => Math.random() - 0.5);
  const tenses: Tense[] = ['present', 'perfect'];
  
  for (let i = 0; i < Math.min(count, shuffledVerbs.length * 2); i++) {
    const verb = shuffledVerbs[i % shuffledVerbs.length];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const person = persons[Math.floor(Math.random() * persons.length)];
    
    let correctAnswer: string;
    if (tense === 'present') {
      correctAnswer = verb.präsens[person];
    } else {
      // For perfect tense, construct the full form
      const auxiliary = verb.perfekt.auxiliary === 'haben' 
        ? (person === 'ich' ? 'habe' : 
           person === 'du' ? 'hast' : 
           person === 'er/sie/es' ? 'hat' : 
           person === 'wir' ? 'haben' : 
           person === 'ihr' ? 'habt' : 'haben')
        : (person === 'ich' ? 'bin' : 
           person === 'du' ? 'bist' : 
           person === 'er/sie/es' ? 'ist' : 
           person === 'wir' ? 'sind' : 
           person === 'ihr' ? 'seid' : 'sind');
      correctAnswer = `${auxiliary} ${verb.perfekt.participle}`;
    }
    
    questions.push({ verb, tense, person, correctAnswer });
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

export const VerbConjugationQuiz = ({ onBack }: VerbConjugationQuizProps) => {
  const { recordReview, getNextVerbs, getStats } = useVerbSRS(verbs);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState(10);

  const verbStats = useMemo(() => getStats(), [getStats]);

  const startQuiz = useCallback(() => {
    const filteredVerbs = selectedCategory === 'all' 
      ? verbs 
      : verbs.filter(v => v.category === selectedCategory);
    
    // Prioritize due verbs
    const prioritizedVerbs = getNextVerbs(questionCount, selectedCategory === 'all' ? undefined : selectedCategory);
    const quizQuestions = generateQuestions(
      prioritizedVerbs.length >= questionCount ? prioritizedVerbs : filteredVerbs,
      questionCount
    );
    
    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setUserAnswer('');
    setIsAnswered(false);
    setCorrectCount(0);
    setQuizComplete(false);
    setQuizStarted(true);
  }, [selectedCategory, questionCount, getNextVerbs]);

  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim() || isAnswered) return;
    
    const currentQuestion = questions[currentIndex];
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(currentQuestion.correctAnswer);
    
    const isAnswerCorrect = normalized === correct;
    setIsCorrect(isAnswerCorrect);
    setIsAnswered(true);
    
    if (isAnswerCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    // Record for SRS
    recordReview(currentQuestion.verb.id, isAnswerCorrect);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isAnswered) {
        handleSubmitAnswer();
      } else if (!quizComplete) {
        handleNextQuestion();
      }
    }
  };

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Languages className="w-6 h-6 text-primary" />
              <h1 className="font-heading text-xl font-bold">Verb Conjugation Quiz</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 space-y-6">
          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-incorrect/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-incorrect">{verbStats.dueNow}</p>
                  <p className="text-xs text-muted-foreground">Due</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-primary">{verbStats.learning}</p>
                  <p className="text-xs text-muted-foreground">Learning</p>
                </div>
                <div className="bg-correct/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-correct">{verbStats.mastered}</p>
                  <p className="text-xs text-muted-foreground">Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Selection */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Verb Category</p>
            <div className="flex flex-wrap gap-2">
              {['all', 'regular', 'irregular', 'modal', 'separable'].map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Number of Questions</p>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map(count => (
                <Button
                  key={count}
                  variant={questionCount === count ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQuestionCount(count)}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={startQuiz} className="w-full" size="lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </main>
      </div>
    );
  }

  // Quiz Complete
  if (quizComplete) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-xl font-bold">Quiz Complete!</h1>
          </div>
        </header>

        <main className="container px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-6 max-w-sm">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Languages className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold">{accuracy}%</h2>
              <p className="text-muted-foreground">Accuracy</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-correct/10 p-4 rounded-xl">
                <p className="text-2xl font-bold text-correct">{correctCount}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="bg-incorrect/10 p-4 rounded-xl">
                <p className="text-2xl font-bold text-incorrect">{questions.length - correctCount}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={startQuiz} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
                Back to Menu
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Active Quiz
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <span className="text-sm font-medium text-correct">{correctCount} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <main className="container px-4 py-6 flex-1 space-y-6">
        {/* Verb Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              {currentQuestion.tense === 'present' ? 'Present Tense' : 'Perfect Tense'}
            </p>
            <h2 className="text-2xl font-bold mb-1">{currentQuestion.verb.infinitive}</h2>
            <p className="text-muted-foreground">{currentQuestion.verb.english}</p>
          </CardContent>
        </Card>

        {/* Question */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg">
              Conjugate for <span className="font-bold text-primary">{currentQuestion.person}</span>
            </p>
          </div>

          <Input
            type="text"
            placeholder="Type your answer..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAnswered}
            className={cn(
              'text-center text-lg h-14',
              isAnswered && isCorrect && 'border-correct bg-correct/10',
              isAnswered && !isCorrect && 'border-incorrect bg-incorrect/10'
            )}
            autoFocus
          />

          {isAnswered && (
            <div className={cn(
              'p-4 rounded-xl flex items-center gap-3',
              isCorrect ? 'bg-correct/10' : 'bg-incorrect/10'
            )}>
              {isCorrect ? (
                <Check className="w-6 h-6 text-correct" />
              ) : (
                <X className="w-6 h-6 text-incorrect" />
              )}
              <div>
                <p className={cn('font-semibold', isCorrect ? 'text-correct' : 'text-incorrect')}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    Correct answer: <span className="font-medium">{currentQuestion.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isAnswered ? (
          <Button 
            onClick={handleSubmitAnswer} 
            className="w-full" 
            size="lg"
            disabled={!userAnswer.trim()}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full" size="lg">
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </main>
    </div>
  );
};
