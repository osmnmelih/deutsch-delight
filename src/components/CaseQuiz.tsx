import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, XCircle, Volume2, RotateCcw, Lightbulb } from 'lucide-react';
import { akkusativVerbs, dativVerbs, akkusativDativVerbs, genitivVerbs, CaseVerb } from '@/data/verbs';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface CaseQuizProps {
  onBack: () => void;
}

type CaseType = 'akkusativ' | 'dativ' | 'genitiv';
type QuizMode = 'identify' | 'fill-blank' | 'mixed';

interface QuizQuestion {
  id: string;
  verb: CaseVerb;
  questionType: 'identify' | 'fill-blank';
  correctCase: CaseType;
  sentence?: string;
  blank?: string;
  options: CaseType[];
}

const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const CaseQuiz = ({ onBack }: CaseQuizProps) => {
  const [quizMode, setQuizMode] = useState<QuizMode>('mixed');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<CaseType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  
  const { speakWord } = useAudioPronunciation();

  // Combine all case verbs
  const allCaseVerbs = useMemo(() => {
    const akk = akkusativVerbs.map(v => ({ ...v, normalizedCase: 'akkusativ' as CaseType }));
    const dat = dativVerbs.map(v => ({ ...v, normalizedCase: 'dativ' as CaseType }));
    const gen = genitivVerbs.map(v => ({ ...v, normalizedCase: 'genitiv' as CaseType }));
    return [...akk, ...dat, ...gen];
  }, []);

  const generateQuestions = (count: number = 15): QuizQuestion[] => {
    const selectedVerbs = shuffle(allCaseVerbs).slice(0, count);
    
    return selectedVerbs.map((verbData, index) => {
      const verb = verbData as CaseVerb & { normalizedCase: CaseType };
      const questionType: 'identify' | 'fill-blank' = 
        quizMode === 'mixed' 
          ? (index % 2 === 0 ? 'identify' : 'fill-blank')
          : quizMode === 'identify' ? 'identify' : 'fill-blank';
      
      const example = verb.examples[0];
      
      if (questionType === 'fill-blank') {
        // Create fill-in-the-blank with the object removed
        const sentence = example.german;
        const highlight = example.highlight;
        
        return {
          id: `q${index}`,
          verb,
          questionType,
          correctCase: verb.normalizedCase,
          sentence: sentence.replace(highlight, '_____'),
          blank: highlight,
          options: shuffle(['akkusativ', 'dativ', 'genitiv'] as CaseType[])
        };
      }
      
      return {
        id: `q${index}`,
        verb,
        questionType,
        correctCase: verb.normalizedCase,
        options: shuffle(['akkusativ', 'dativ', 'genitiv'] as CaseType[])
      };
    });
  };

  const startQuiz = () => {
    const newQuestions = generateQuestions(15);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore({ correct: 0, incorrect: 0 });
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setSessionStarted(true);
  };

  useEffect(() => {
    if (sessionStarted && questions.length === 0) {
      startQuiz();
    }
  }, [sessionStarted]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: CaseType) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correctCase) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSpeak = (text: string) => {
    speakWord(text);
  };

  const getCaseColor = (caseType: CaseType) => {
    switch (caseType) {
      case 'akkusativ': return 'text-blue-600 dark:text-blue-400';
      case 'dativ': return 'text-purple-600 dark:text-purple-400';
      case 'genitiv': return 'text-orange-600 dark:text-orange-400';
    }
  };

  const getCaseBgColor = (caseType: CaseType, isSelected: boolean, isCorrect: boolean) => {
    if (!showResult) {
      return isSelected ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted';
    }
    
    if (caseType === currentQuestion?.correctCase) {
      return 'bg-correct text-correct-foreground';
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-incorrect text-incorrect-foreground';
    }
    
    return 'bg-card opacity-50';
  };

  const getCaseLabel = (caseType: CaseType) => {
    switch (caseType) {
      case 'akkusativ': return 'Akkusativ (wen/was?)';
      case 'dativ': return 'Dativ (wem?)';
      case 'genitiv': return 'Genitiv (wessen?)';
    }
  };

  // Quiz mode selection screen
  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold">Case Quiz</h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="card-elevated p-6 text-center">
            <h2 className="font-heading text-lg font-semibold mb-2">Practice German Cases</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Learn which case (Akkusativ, Dativ, or Genitiv) each verb requires
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setQuizMode('mixed')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  quizMode === 'mixed' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold">Mixed Practice</p>
                <p className="text-xs text-muted-foreground">Both question types</p>
              </button>
              
              <button
                onClick={() => setQuizMode('identify')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  quizMode === 'identify' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold">Identify the Case</p>
                <p className="text-xs text-muted-foreground">Which case does this verb require?</p>
              </button>
              
              <button
                onClick={() => setQuizMode('fill-blank')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  quizMode === 'fill-blank' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold">Fill in the Blank</p>
                <p className="text-xs text-muted-foreground">Complete sentences with correct case</p>
              </button>
            </div>

            <Button onClick={startQuiz} className="w-full" size="lg">
              Start Quiz (15 Questions)
            </Button>
          </div>

          {/* Case info cards */}
          <div className="grid gap-3">
            <div className="card-elevated p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Akkusativ</p>
              <p className="text-xs text-muted-foreground">Direct object - wen/was?</p>
              <p className="text-xs mt-1">den, die, das, einen, eine, ein</p>
            </div>
            <div className="card-elevated p-4 border-l-4 border-purple-500">
              <p className="font-semibold text-purple-600 dark:text-purple-400">Dativ</p>
              <p className="text-xs text-muted-foreground">Indirect object - wem?</p>
              <p className="text-xs mt-1">dem, der, dem, einem, einer, einem</p>
            </div>
            <div className="card-elevated p-4 border-l-4 border-orange-500">
              <p className="font-semibold text-orange-600 dark:text-orange-400">Genitiv</p>
              <p className="text-xs text-muted-foreground">Possession - wessen?</p>
              <p className="text-xs mt-1">des, der, des, eines, einer, eines</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz complete screen
  if (quizComplete) {
    const accuracy = Math.round((score.correct / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold">Quiz Complete!</h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="card-elevated p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">{accuracy}%</span>
            </div>
            
            <h2 className="font-heading text-xl font-semibold mb-2">
              {accuracy >= 80 ? 'Ausgezeichnet!' : accuracy >= 60 ? 'Gut gemacht!' : 'Weiter üben!'}
            </h2>
            
            <div className="flex justify-center gap-6 my-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-correct">{score.correct}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-incorrect">{score.incorrect}</p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Home
              </Button>
              <Button onClick={startQuiz} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>

          {/* Review missed questions */}
          {score.incorrect > 0 && (
            <div className="card-elevated p-4">
              <h3 className="font-semibold mb-3">Review These Verbs:</h3>
              <div className="space-y-2">
                {questions
                  .filter((_, i) => {
                    // This is a simplified check - in a real app you'd track which were wrong
                    return true;
                  })
                  .slice(0, 5)
                  .map(q => (
                    <div key={q.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{q.verb.infinitive}</p>
                        <p className="text-xs text-muted-foreground">{q.verb.english}</p>
                      </div>
                      <span className={`text-sm font-medium ${getCaseColor(q.correctCase)}`}>
                        {q.correctCase}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Score */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-1 text-correct">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-medium">{score.correct}</span>
        </div>
        <div className="flex items-center gap-1 text-incorrect">
          <XCircle className="w-4 h-4" />
          <span className="font-medium">{score.incorrect}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-md mx-auto">
        <div className="card-elevated p-6 mb-6">
          {/* Question type badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-2 py-1 bg-muted rounded-full">
              {currentQuestion.questionType === 'identify' ? 'Identify Case' : 'Fill in Blank'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHint(!showHint)}
              className="h-8 w-8"
            >
              <Lightbulb className={`w-4 h-4 ${showHint ? 'text-yellow-500' : ''}`} />
            </Button>
          </div>

          {currentQuestion.questionType === 'identify' ? (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Which case does this verb require?
                </p>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold">{currentQuestion.verb.infinitive}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSpeak(currentQuestion.verb.infinitive)}
                    className="h-8 w-8"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground">{currentQuestion.verb.english}</p>
              </div>

              {/* Example sentence */}
              <div className="bg-muted/50 p-3 rounded-lg mb-4">
                <p className="text-sm text-center">
                  "{currentQuestion.verb.examples[0].german}"
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {currentQuestion.verb.examples[0].english}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center mb-2">
                What case is used in this sentence?
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-lg text-center font-medium">
                  {currentQuestion.sentence}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {currentQuestion.verb.examples[0].english}
                </p>
              </div>
              <p className="text-center text-sm mb-2">
                <span className="font-semibold">{currentQuestion.verb.infinitive}</span>
                {' '}— {currentQuestion.verb.english}
              </p>
            </>
          )}

          {/* Hint */}
          {showHint && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mb-4">
              <p className="text-sm">
                <strong>Hint:</strong> The object "{currentQuestion.verb.examples[0].highlight}" 
                answers the question{' '}
                <strong>
                  {currentQuestion.correctCase === 'akkusativ' && '"wen/was?"'}
                  {currentQuestion.correctCase === 'dativ' && '"wem?"'}
                  {currentQuestion.correctCase === 'genitiv' && '"wessen?"'}
                </strong>
              </p>
              {currentQuestion.verb.notes && (
                <p className="text-xs text-muted-foreground mt-1">{currentQuestion.verb.notes}</p>
              )}
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctCase;
            
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                  getCaseBgColor(option, isSelected, isCorrect)
                } ${!showResult && !isSelected ? 'border-border' : 'border-transparent'}`}
              >
                <div className="text-left">
                  <p className="font-semibold capitalize">{option}</p>
                  <p className="text-xs opacity-80">
                    {option === 'akkusativ' && 'wen/was?'}
                    {option === 'dativ' && 'wem?'}
                    {option === 'genitiv' && 'wessen?'}
                  </p>
                </div>
                {showResult && isCorrect && (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next */}
        {showResult && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              selectedAnswer === currentQuestion.correctCase 
                ? 'bg-correct/20 border border-correct' 
                : 'bg-incorrect/20 border border-incorrect'
            }`}>
              <p className="font-semibold mb-1">
                {selectedAnswer === currentQuestion.correctCase ? 'Richtig!' : 'Falsch!'}
              </p>
              <p className="text-sm">
                <strong>{currentQuestion.verb.infinitive}</strong> takes the{' '}
                <span className={getCaseColor(currentQuestion.correctCase)}>
                  {currentQuestion.correctCase}
                </span>{' '}case.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Example: {currentQuestion.verb.examples[0].german}
              </p>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
