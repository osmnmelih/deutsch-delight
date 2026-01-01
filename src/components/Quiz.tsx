import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Volume2, 
  Sparkles,
  Trophy,
  Target,
  Clock
} from 'lucide-react';
import { VocabularyWord, Article } from '@/types/vocabulary';
import { QuizQuestion, QuizResult, QuestionType } from '@/types/quiz';
import { generateQuiz, generateTypedQuiz } from '@/lib/quizGenerator';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface QuizProps {
  words: VocabularyWord[];
  allWords: VocabularyWord[];
  onBack: () => void;
  onComplete: (correct: number, incorrect: number) => void;
  onRecordReview?: (wordId: string, correct: boolean, responseTime: number) => void;
  quizType?: QuestionType | 'mixed';
}

const articles: Article[] = ['der', 'die', 'das'];

export const Quiz = ({ 
  words, 
  allWords, 
  onBack, 
  onComplete, 
  onRecordReview,
  quizType = 'mixed'
}: QuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  
  const { speakWord, isSupported } = useAudioPronunciation();

  // Generate quiz on mount
  useEffect(() => {
    const count = Math.min(words.length, 10);
    const generated = quizType === 'mixed' 
      ? generateQuiz(words, allWords, count)
      : generateTypedQuiz(words, allWords, quizType as QuestionType, count);
    setQuestions(generated);
    setQuestionStartTime(Date.now());
  }, [words, allWords, quizType]);

  const currentQuestion = questions[currentIndex];
  const progressPercent = questions.length > 0 
    ? ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100 
    : 0;

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    
    const timeTaken = Date.now() - questionStartTime;
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase();
    
    const result: QuizResult = {
      questionId: currentQuestion.id,
      correct: isCorrect,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      timeTaken
    };
    
    setResults(prev => [...prev, result]);
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Record for SRS
    if (onRecordReview) {
      onRecordReview(currentQuestion.word.id, isCorrect, timeTaken);
    }
  }, [showResult, questionStartTime, currentQuestion, onRecordReview]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
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
    if (currentQuestion) {
      speakWord(currentQuestion.word.german, currentQuestion.word.article);
    }
  };

  const getArticleColor = (article: Article): string => {
    switch (article) {
      case 'der': return 'bg-der text-white';
      case 'die': return 'bg-die text-white';
      case 'das': return 'bg-das text-white';
    }
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
            Back
          </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 animate-scale-in">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className="font-heading text-3xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-8">Great effort on your German practice</p>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-5 h-5 text-correct" />
              </div>
              <p className="text-2xl font-bold text-correct">{correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{avgTime}s</p>
              <p className="text-xs text-muted-foreground">Avg Time</p>
            </div>
          </div>

          {/* Results breakdown */}
          <div className="w-full max-w-sm space-y-2 mb-8">
            {results.map((result, index) => {
              const question = questions[index];
              return (
                <div 
                  key={result.questionId}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    result.correct ? 'bg-correct/10' : 'bg-incorrect/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.correct ? (
                      <Check className="w-4 h-4 text-correct" />
                    ) : (
                      <X className="w-4 h-4 text-incorrect" />
                    )}
                    <span className="font-medium">{question.word.german}</span>
                  </div>
                  {!result.correct && (
                    <span className="text-sm text-muted-foreground">
                      {result.correctAnswer}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <Button variant="primary" size="lg" onClick={onBack} className="w-full max-w-sm">
            <Sparkles className="w-5 h-5 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading quiz...</div>
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
            Exit
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </header>

      {/* Question Content */}
      <main className="flex-1 flex flex-col p-6">
        {/* Question Type Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {currentQuestion.type === 'multiple-choice' && 'Multiple Choice'}
            {currentQuestion.type === 'fill-blank' && 'Fill in the Blank'}
            {currentQuestion.type === 'article-select' && 'Choose the Article'}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">
            {currentQuestion.prompt}
          </h2>
          {isSupported && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSpeak}
              className="mt-2"
            >
              <Volume2 className="w-4 h-4 mr-1" />
              Listen
            </Button>
          )}
        </div>

        {/* Answer Area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
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

          {/* Fill in the Blank */}
          {currentQuestion.type === 'fill-blank' && (
            <div className="space-y-4">
              <Input
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                placeholder="Type the article (der, die, or das)"
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
                  Check Answer
                </Button>
              )}
              {showResult && (
                <div className={`p-4 rounded-2xl text-center ${
                  inputAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase()
                    ? 'bg-correct/10 text-correct'
                    : 'bg-incorrect/10 text-incorrect'
                }`}>
                  {inputAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase() ? (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span className="font-bold">Correct!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <X className="w-5 h-5" />
                        <span className="font-bold">Not quite</span>
                      </div>
                      <p className="text-sm">
                        The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Article Select */}
          {currentQuestion.type === 'article-select' && (
            <div className="grid grid-cols-3 gap-3">
              {articles.map((article) => {
                const isSelected = selectedAnswer === article;
                const isCorrect = article === currentQuestion.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={article}
                    onClick={() => handleAnswer(article)}
                    disabled={showResult}
                    className={`p-6 rounded-2xl border-2 font-bold text-xl transition-all ${
                      showCorrect
                        ? `${getArticleColor(article)} border-transparent`
                        : showIncorrect
                        ? 'border-incorrect bg-incorrect/10 text-incorrect'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
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
        </div>

        {/* Next Button */}
        {showResult && (
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleNext}
            className="w-full mt-6 animate-slide-up"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </main>
    </div>
  );
};
