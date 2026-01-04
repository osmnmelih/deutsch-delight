import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, XCircle, Volume2, RotateCcw, Lightbulb, ArrowRight, MapPin } from 'lucide-react';
import { 
  akkusativPrepositions, 
  dativPrepositions, 
  wechselPraepositions,
  akkusativMnemonic,
  dativMnemonic,
  wechselMnemonic,
  Preposition,
  WechselPreposition,
  CaseType
} from '@/data/prepositions';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface PrepositionQuizProps {
  onBack: () => void;
}

type QuizMode = 'fixed' | 'wechsel' | 'mixed';

interface QuizQuestion {
  id: string;
  preposition: Preposition | WechselPreposition;
  sentence: string;
  translation: string;
  correctCase: CaseType;
  isWechsel: boolean;
  context?: string;
}

const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const PrepositionQuiz = ({ onBack }: PrepositionQuizProps) => {
  const [quizMode, setQuizMode] = useState<QuizMode>('mixed');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<CaseType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [viewMode, setViewMode] = useState<'quiz' | 'learn'>('quiz');
  
  const { speakWord } = useAudioPronunciation();

  const generateQuestions = (count: number = 15): QuizQuestion[] => {
    const questionsList: QuizQuestion[] = [];
    
    if (quizMode === 'fixed' || quizMode === 'mixed') {
      // Add Akkusativ prepositions
      akkusativPrepositions.forEach(prep => {
        const example = prep.examples[0];
        questionsList.push({
          id: `${prep.id}-q`,
          preposition: prep,
          sentence: example.german,
          translation: example.english,
          correctCase: 'akkusativ',
          isWechsel: false
        });
      });
      
      // Add Dativ prepositions
      dativPrepositions.forEach(prep => {
        const example = prep.examples[0];
        questionsList.push({
          id: `${prep.id}-q`,
          preposition: prep,
          sentence: example.german,
          translation: example.english,
          correctCase: 'dativ',
          isWechsel: false
        });
      });
    }
    
    if (quizMode === 'wechsel' || quizMode === 'mixed') {
      // Add Wechselpräpositionen - both cases
      wechselPraepositions.forEach(prep => {
        // Akkusativ version
        questionsList.push({
          id: `${prep.id}-akk`,
          preposition: prep,
          sentence: prep.akkusativExample.german,
          translation: prep.akkusativExample.english,
          correctCase: 'akkusativ',
          isWechsel: true,
          context: prep.akkusativExample.context
        });
        
        // Dativ version
        questionsList.push({
          id: `${prep.id}-dat`,
          preposition: prep,
          sentence: prep.dativExample.german,
          translation: prep.dativExample.english,
          correctCase: 'dativ',
          isWechsel: true,
          context: prep.dativExample.context
        });
      });
    }
    
    return shuffle(questionsList).slice(0, count);
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

  // Learn Mode Content
  const renderLearnMode = () => (
    <div className="space-y-6">
      {/* Akkusativ Prepositions */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <h3 className="font-heading font-semibold">Akkusativ Prepositions</h3>
        </div>
        <div className="bg-blue-500/10 p-3 rounded-lg mb-3">
          <p className="font-bold text-blue-600 dark:text-blue-400">{akkusativMnemonic.phrase}</p>
          <p className="text-sm text-muted-foreground">{akkusativMnemonic.breakdown}</p>
          <p className="text-xs text-muted-foreground mt-1">{akkusativMnemonic.full}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {akkusativPrepositions.map(prep => (
            <div key={prep.id} className="p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{prep.german}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleSpeak(prep.german)}>
                  <Volume2 className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{prep.english}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dativ Prepositions */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <h3 className="font-heading font-semibold">Dativ Prepositions</h3>
        </div>
        <div className="bg-purple-500/10 p-3 rounded-lg mb-3">
          <p className="font-bold text-purple-600 dark:text-purple-400">{dativMnemonic.phrase}</p>
          <p className="text-sm text-muted-foreground">{dativMnemonic.breakdown}</p>
          <p className="text-xs text-muted-foreground mt-1">{dativMnemonic.full}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {dativPrepositions.map(prep => (
            <div key={prep.id} className="p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{prep.german}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleSpeak(prep.german)}>
                  <Volume2 className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{prep.english}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wechselpräpositionen */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <h3 className="font-heading font-semibold">Wechselpräpositionen (Two-Way)</h3>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg mb-3">
          <p className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {wechselMnemonic.rule}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{wechselMnemonic.phrase}</p>
        </div>
        <div className="space-y-3">
          {wechselPraepositions.map(prep => (
            <div key={prep.id} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{prep.german}</span>
                <span className="text-sm text-muted-foreground">{prep.english}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-blue-500/10 rounded border-l-2 border-blue-500">
                  <div className="flex items-center gap-1 mb-1">
                    <ArrowRight className="w-3 h-3 text-blue-500" />
                    <span className="font-medium text-blue-600 dark:text-blue-400">Akkusativ (wohin?)</span>
                  </div>
                  <p className="text-muted-foreground">{prep.akkusativExample.german}</p>
                </div>
                <div className="p-2 bg-purple-500/10 rounded border-l-2 border-purple-500">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3 text-purple-500" />
                    <span className="font-medium text-purple-600 dark:text-purple-400">Dativ (wo?)</span>
                  </div>
                  <p className="text-muted-foreground">{prep.dativExample.german}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => setViewMode('quiz')} className="w-full" size="lg">
        Start Quiz
      </Button>
    </div>
  );

  // Quiz mode selection screen
  if (!sessionStarted) {
    if (viewMode === 'learn') {
      return (
        <div className="min-h-screen bg-background p-4">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => setViewMode('quiz')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-xl font-bold">Learn Prepositions</h1>
          </div>
          <div className="max-w-md mx-auto">
            {renderLearnMode()}
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold">Preposition Quiz</h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={() => {}}
              className="flex-1"
            >
              Quiz Mode
            </Button>
            <Button
              variant="outline"
              onClick={() => setViewMode('learn')}
              className="flex-1"
            >
              Learn First
            </Button>
          </div>

          <div className="card-elevated p-6 text-center">
            <h2 className="font-heading text-lg font-semibold mb-2">Practice Preposition Cases</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Which case does each preposition require?
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
                <p className="text-xs text-muted-foreground">All preposition types</p>
              </button>
              
              <button
                onClick={() => setQuizMode('fixed')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  quizMode === 'fixed' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold">Fixed Case Prepositions</p>
                <p className="text-xs text-muted-foreground">Always Akkusativ or always Dativ</p>
              </button>
              
              <button
                onClick={() => setQuizMode('wechsel')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  quizMode === 'wechsel' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold">Wechselpräpositionen</p>
                <p className="text-xs text-muted-foreground">Two-way prepositions (motion vs. location)</p>
              </button>
            </div>

            <Button onClick={startQuiz} className="w-full" size="lg">
              Start Quiz (15 Questions)
            </Button>
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
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentQuestion.isWechsel 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-purple-600 dark:text-purple-400' 
                : currentQuestion.correctCase === 'akkusativ'
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                  : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
            }`}>
              {currentQuestion.isWechsel ? 'Wechselpräposition' : 'Fixed Case'}
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

          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Which case does this preposition require?
            </p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-3xl font-bold">{currentQuestion.preposition.german}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSpeak(currentQuestion.preposition.german)}
                className="h-8 w-8"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">{currentQuestion.preposition.english}</p>
          </div>

          {/* Context for Wechselpräpositionen */}
          {currentQuestion.isWechsel && currentQuestion.context && (
            <div className="bg-muted/50 p-3 rounded-lg mb-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Context:</p>
              <p className="text-sm font-medium">{currentQuestion.context}</p>
            </div>
          )}

          {/* Example sentence */}
          <div className="bg-muted/50 p-3 rounded-lg mb-4">
            <p className="text-sm text-center font-medium">"{currentQuestion.sentence}"</p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              {currentQuestion.translation}
            </p>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mb-4">
              <p className="text-sm">
                <strong>Hint:</strong>{' '}
                {currentQuestion.isWechsel ? (
                  <>
                    Wechselpräpositionen use Akkusativ for <strong>direction/movement</strong> (wohin?) 
                    and Dativ for <strong>location</strong> (wo?)
                  </>
                ) : (
                  <>
                    "{currentQuestion.preposition.german}" always takes {currentQuestion.correctCase}.
                    {currentQuestion.correctCase === 'akkusativ' 
                      ? ' Remember: DOGFU (Durch, Ohne, Gegen, Für, Um)' 
                      : ' Remember: Aus-Bei-Mit-Nach-Seit-Von-Zu'}
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(['akkusativ', 'dativ'] as CaseType[]).map(caseOption => {
            const isSelected = selectedAnswer === caseOption;
            const isCorrect = caseOption === currentQuestion.correctCase;
            
            let bgClass = 'bg-card hover:bg-muted border-border';
            if (showResult) {
              if (isCorrect) {
                bgClass = 'bg-correct text-correct-foreground border-correct';
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-incorrect text-incorrect-foreground border-incorrect';
              } else {
                bgClass = 'bg-card opacity-50 border-border';
              }
            } else if (isSelected) {
              bgClass = 'bg-primary text-primary-foreground border-primary';
            }
            
            return (
              <button
                key={caseOption}
                onClick={() => handleAnswer(caseOption)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all ${bgClass}`}
              >
                <p className="font-bold text-lg capitalize">{caseOption}</p>
                <p className="text-xs opacity-80">
                  {caseOption === 'akkusativ' ? 'wen/was?' : 'wem?'}
                </p>
                {showResult && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 mx-auto mt-2" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 mx-auto mt-2" />
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
                <strong>"{currentQuestion.preposition.german}"</strong>{' '}
                {currentQuestion.isWechsel 
                  ? `takes ${currentQuestion.correctCase} in this context (${currentQuestion.context}).`
                  : `always takes ${currentQuestion.correctCase}.`
                }
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
