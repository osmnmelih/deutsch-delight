import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, RotateCcw, Clock, Calendar, Hash, Lightbulb } from 'lucide-react';
import { 
  cardinalNumbers, 
  ordinalNumbers, 
  daysOfWeek, 
  months, 
  timeExpressions,
  timeRules,
  dateRules,
  numberRules,
  practiceQuestions,
  TimeQuestion
} from '@/data/numbersAndTime';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface NumbersAndTimeProps {
  onBack: () => void;
}

const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const NumbersAndTime = ({ onBack }: NumbersAndTimeProps) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [practiceType, setPracticeType] = useState<'number' | 'time' | 'date' | 'all'>('all');
  const [questions, setQuestions] = useState<TimeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const { speakWord } = useAudioPronunciation();

  const startPractice = () => {
    let filteredQuestions = practiceQuestions;
    if (practiceType !== 'all') {
      filteredQuestions = practiceQuestions.filter(q => q.type === practiceType);
    }
    setQuestions(shuffle(filteredQuestions).slice(0, 10));
    setCurrentIndex(0);
    setScore({ correct: 0, incorrect: 0 });
    setQuizComplete(false);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrect = currentQuestion.answer.toLowerCase();
    const correct = normalizedAnswer === normalizedCorrect;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  // Learn Mode - Numbers Section
  const renderNumbersSection = () => (
    <div className="space-y-6">
      {/* Number Rules */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <Hash className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Number Formation Rules</h3>
        </div>
        <div className="space-y-2 text-sm">
          <p><strong>1-12:</strong> {numberRules.basic}</p>
          <p><strong>13-19:</strong> {numberRules.teens}</p>
          <p><strong>20+:</strong> {numberRules.tens}</p>
          <p><strong>21-99:</strong> {numberRules.compound}</p>
          <div className="bg-yellow-500/10 p-2 rounded-lg mt-2">
            <p className="text-yellow-600 dark:text-yellow-400 font-medium">⚠️ {numberRules.note}</p>
          </div>
        </div>
      </div>

      {/* Cardinal Numbers */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Cardinal Numbers (Kardinalzahlen)</h4>
        <div className="grid grid-cols-3 gap-2">
          {cardinalNumbers.slice(0, 21).map(num => (
            <div key={num.number} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold">{num.number}</span>
                <span className="text-sm text-muted-foreground ml-2">{num.german}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(num.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {cardinalNumbers.slice(21).map(num => (
            <div key={num.number} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold">{num.number.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground ml-2">{num.german}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(num.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Ordinal Numbers */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Ordinal Numbers (Ordinalzahlen)</h4>
        <p className="text-xs text-muted-foreground mb-3">
          1-19: add "-te" | 20+: add "-ste" (with some irregulars)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ordinalNumbers.map(num => (
            <div key={num.number} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold">{num.number}.</span>
                <span className="text-sm text-muted-foreground ml-2">der/die/das {num.german}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(`der ${num.german}`)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Learn Mode - Time Section
  const renderTimeSection = () => (
    <div className="space-y-6">
      {/* Formal Time */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Telling Time</h3>
        </div>
        
        <div className="space-y-4">
          {/* Formal */}
          <div>
            <h4 className="font-medium mb-2">Formal (24-hour)</h4>
            <p className="text-xs text-muted-foreground mb-2">{timeRules.formal.description}</p>
            <div className="space-y-1">
              {timeRules.formal.examples.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div>
                    <span className="font-mono font-bold">{ex.time}</span>
                    <span className="text-sm ml-2">{ex.german}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(ex.german)}>
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Informal */}
          <div>
            <h4 className="font-medium mb-2">Informal (12-hour)</h4>
            <p className="text-xs text-muted-foreground mb-2">{timeRules.informal.description}</p>
            <div className="space-y-1">
              {timeRules.informal.examples.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div>
                    <span className="font-mono font-bold">{ex.time}</span>
                    <span className="text-sm ml-2">{ex.german}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(ex.german)}>
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 p-2 rounded-lg mt-2">
              <p className="text-xs text-yellow-600 dark:text-yellow-400">⚠️ {timeRules.informal.note}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time of Day */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Parts of the Day</h4>
        <div className="grid grid-cols-2 gap-2">
          {timeExpressions.filter(t => t.category === 'time').slice(4).map(expr => (
            <div key={expr.id} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-medium">{expr.german}</span>
                <span className="text-xs text-muted-foreground block">{expr.english}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(expr.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Duration & Frequency */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-elevated p-4">
          <h4 className="font-semibold mb-3">Duration</h4>
          <div className="space-y-1">
            {timeExpressions.filter(t => t.category === 'duration').map(expr => (
              <div key={expr.id} className="p-2 bg-muted/50 rounded-lg text-sm">
                <span className="font-medium">{expr.german}</span>
                <span className="text-muted-foreground ml-2">{expr.english}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-elevated p-4">
          <h4 className="font-semibold mb-3">Frequency</h4>
          <div className="space-y-1">
            {timeExpressions.filter(t => t.category === 'frequency').slice(0, 5).map(expr => (
              <div key={expr.id} className="p-2 bg-muted/50 rounded-lg text-sm">
                <span className="font-medium">{expr.german}</span>
                <span className="text-muted-foreground ml-2">{expr.english}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Learn Mode - Dates Section
  const renderDatesSection = () => (
    <div className="space-y-6">
      {/* Date Format */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold">Date Format</h3>
        </div>
        <p className="text-sm mb-2"><strong>Format:</strong> {dateRules.format}</p>
        <p className="text-xs text-muted-foreground mb-3">{dateRules.ordinalNote}</p>
        <div className="space-y-2">
          {dateRules.examples.map((ex, i) => (
            <div key={i} className="p-2 bg-muted/50 rounded-lg">
              <p className="font-mono text-sm">{ex.date}</p>
              <p className="text-sm">{ex.german}</p>
              <p className="text-xs text-muted-foreground">{ex.english}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Days of Week */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Days of the Week (Wochentage)</h4>
        <div className="grid grid-cols-2 gap-2">
          {daysOfWeek.map(day => (
            <div key={day.id} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-medium">{day.german}</span>
                <span className="text-xs text-muted-foreground block">{day.english}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(day.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Months */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Months (Monate)</h4>
        <div className="grid grid-cols-3 gap-2">
          {months.map(month => (
            <div key={month.id} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <span className="font-medium text-sm">{month.german}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(month.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Relative Time */}
      <div className="card-elevated p-4">
        <h4 className="font-semibold mb-3">Relative Time Expressions</h4>
        <div className="grid grid-cols-2 gap-2">
          {timeExpressions.filter(t => t.category === 'date').map(expr => (
            <div key={expr.id} className="p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-medium text-sm">{expr.german}</span>
                <span className="text-xs text-muted-foreground block">{expr.english}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakWord(expr.german)}>
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Practice Mode
  const renderPracticeMode = () => {
    if (questions.length === 0) {
      return (
        <div className="space-y-6">
          <div className="card-elevated p-6 text-center">
            <h3 className="font-heading font-semibold mb-4">Choose Practice Type</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(['all', 'number', 'time', 'date'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setPracticeType(type)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    practiceType === type 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold capitalize">{type === 'all' ? 'All Topics' : type}</p>
                </button>
              ))}
            </div>
            <Button onClick={startPractice} className="w-full" size="lg">
              Start Practice (10 Questions)
            </Button>
          </div>
        </div>
      );
    }

    if (quizComplete) {
      const accuracy = Math.round((score.correct / questions.length) * 100);
      return (
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
            <Button variant="outline" onClick={() => setQuestions([])} className="flex-1">
              New Practice
            </Button>
            <Button onClick={startPractice} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2 flex-1" />
          <span className="text-sm text-muted-foreground">{currentIndex + 1}/{questions.length}</span>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1 text-correct">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">{score.correct}</span>
          </div>
          <div className="flex items-center gap-1 text-incorrect">
            <XCircle className="w-4 h-4" />
            <span className="font-medium">{score.incorrect}</span>
          </div>
        </div>

        {/* Question */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
              {currentQuestion.type}
            </span>
            {currentQuestion.hint && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHint(!showHint)}
                className="h-8 w-8"
              >
                <Lightbulb className={`w-4 h-4 ${showHint ? 'text-yellow-500' : ''}`} />
              </Button>
            )}
          </div>

          <p className="text-lg font-medium text-center mb-4">{currentQuestion.question}</p>

          {showHint && currentQuestion.hint && (
            <div className="bg-yellow-500/10 p-3 rounded-lg mb-4">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">💡 {currentQuestion.hint}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your answer..."
              disabled={showResult}
              className="text-center text-lg"
              autoFocus
            />

            {showResult && (
              <div className={`p-4 rounded-xl ${
                isCorrect 
                  ? 'bg-correct/20 border border-correct' 
                  : 'bg-incorrect/20 border border-incorrect'
              }`}>
                <p className="font-semibold mb-1 flex items-center gap-2">
                  {isCorrect ? (
                    <><CheckCircle2 className="w-5 h-5 text-correct" /> Richtig!</>
                  ) : (
                    <><XCircle className="w-5 h-5 text-incorrect" /> Falsch!</>
                  )}
                </p>
                {!isCorrect && (
                  <p className="text-sm">
                    Correct answer: <strong>{currentQuestion.answer}</strong>
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakWord(currentQuestion.answer)}
                  className="mt-2"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
              </div>
            )}

            {!showResult ? (
              <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!userAnswer.trim()}>
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full" size="lg">
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-xl font-bold">Numbers & Time</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Mode Toggle */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'learn' | 'practice')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="mt-4">
            <Tabs defaultValue="numbers">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="numbers">Numbers</TabsTrigger>
                <TabsTrigger value="time">Time</TabsTrigger>
                <TabsTrigger value="dates">Dates</TabsTrigger>
              </TabsList>
              <TabsContent value="numbers">{renderNumbersSection()}</TabsContent>
              <TabsContent value="time">{renderTimeSection()}</TabsContent>
              <TabsContent value="dates">{renderDatesSection()}</TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="practice" className="mt-4">
            {renderPracticeMode()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
