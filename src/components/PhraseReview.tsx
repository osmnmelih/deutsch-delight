import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RotateCcw, Eye, EyeOff, ThumbsUp, ThumbsDown, Brain, CheckCircle } from 'lucide-react';
import { conversationScenarios } from '@/data/conversations';
import { usePhraseSRS, Phrase } from '@/hooks/usePhraseSRS';

interface PhraseReviewProps {
  onBack: () => void;
}

const PhraseReview = ({ onBack }: PhraseReviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });

  // Convert conversation key phrases to Phrase format
  const allPhrases: Phrase[] = useMemo(() => {
    return conversationScenarios.flatMap(scenario =>
      scenario.keyPhrases.map((phrase, idx) => ({
        id: `${scenario.id}-phrase-${idx}`,
        german: phrase.german,
        english: phrase.english,
        category: scenario.id,
        level: scenario.level,
      }))
    );
  }, []);

  const {
    isLoaded,
    getNextPhrases,
    getDuePhrases,
    recordReviewWithQuality,
    getStats,
    getPhraseDifficulty,
  } = usePhraseSRS(allPhrases);

  // Get review phrases
  const reviewPhrases = useMemo(() => {
    if (!isLoaded) return [];
    const due = getDuePhrases();
    if (due.length > 0) {
      return due.slice(0, 10);
    }
    return getNextPhrases(10);
  }, [isLoaded, getDuePhrases, getNextPhrases]);

  const stats = useMemo(() => getStats(), [getStats]);
  const currentPhrase = reviewPhrases[currentIndex];
  const difficulty = currentPhrase ? getPhraseDifficulty(currentPhrase.id) : 'medium';

  const handleResponse = useCallback((quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!currentPhrase) return;
    
    recordReviewWithQuality(currentPhrase.id, quality);
    
    const isCorrect = quality >= 3;
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    if (currentIndex < reviewPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    } else {
      setSessionComplete(true);
    }
  }, [currentPhrase, currentIndex, reviewPhrases.length, recordReviewWithQuality]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowTranslation(false);
    setSessionComplete(false);
    setSessionStats({ correct: 0, incorrect: 0 });
  };

  const difficultyColors = {
    easy: 'bg-correct/20 text-correct',
    medium: 'bg-primary/20 text-primary',
    hard: 'bg-incorrect/20 text-incorrect',
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Completion view
  if (sessionComplete) {
    const total = sessionStats.correct + sessionStats.incorrect;
    const percentage = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-heading font-bold text-lg">Session Complete</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-12 text-center space-y-6">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🌟' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h2 className="font-heading text-2xl font-bold">
            {percentage >= 80 ? 'Excellent!' : percentage >= 50 ? 'Good progress!' : 'Keep practicing!'}
          </h2>
          
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-correct">{sessionStats.correct}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-incorrect">{sessionStats.incorrect}</p>
              <p className="text-sm text-muted-foreground">To Review</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Review More
            </Button>
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // No phrases to review
  if (reviewPhrases.length === 0) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-heading font-bold text-lg">Phrase Review</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-12 text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-correct mx-auto" />
          <h2 className="font-heading text-xl font-bold">All caught up!</h2>
          <p className="text-muted-foreground">
            No phrases to review right now. Practice more conversations to add phrases.
          </p>
          <Button onClick={onBack}>Back to Home</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <h1 className="font-heading font-bold text-lg">Phrase Review</h1>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {reviewPhrases.length}
            </span>
          </div>
          <Progress value={((currentIndex + 1) / reviewPhrases.length) * 100} className="mt-2 h-1" />
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Stats banner */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Due:</span>
            <Badge variant="secondary">{stats.dueNow}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Mastered:</span>
            <Badge className="bg-correct/20 text-correct">{stats.mastered}</Badge>
          </div>
        </div>

        {/* Flashcard */}
        <Card className="card-elevated">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center gap-2 mb-2">
              <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
              <Badge variant="outline">{currentPhrase.level}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">{currentPhrase.german}</p>
              
              {showTranslation ? (
                <div className="space-y-2 animate-slide-up">
                  <p className="text-lg text-primary">{currentPhrase.english}</p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowTranslation(true)}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Show Translation
                </Button>
              )}
            </div>

            {showTranslation && (
              <div className="space-y-4 animate-slide-up">
                <p className="text-center text-sm text-muted-foreground">
                  How well did you know this?
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleResponse(1)}
                    className="h-auto py-3 flex-col gap-1 border-incorrect/50 hover:bg-incorrect/10"
                  >
                    <ThumbsDown className="w-5 h-5 text-incorrect" />
                    <span className="text-sm">Again</span>
                    <span className="text-xs text-muted-foreground">Didn't know</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResponse(3)}
                    className="h-auto py-3 flex-col gap-1 border-primary/50 hover:bg-primary/10"
                  >
                    <span className="text-xl">🤔</span>
                    <span className="text-sm">Hard</span>
                    <span className="text-xs text-muted-foreground">Struggled</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResponse(4)}
                    className="h-auto py-3 flex-col gap-1 border-correct/50 hover:bg-correct/10"
                  >
                    <ThumbsUp className="w-5 h-5 text-correct" />
                    <span className="text-sm">Good</span>
                    <span className="text-xs text-muted-foreground">Knew it</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResponse(5)}
                    className="h-auto py-3 flex-col gap-1 border-correct/50 hover:bg-correct/10"
                  >
                    <span className="text-xl">⚡</span>
                    <span className="text-sm">Easy</span>
                    <span className="text-xs text-muted-foreground">Instant</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Session: {sessionStats.correct} ✓ / {sessionStats.incorrect} ✗
        </div>
      </main>
    </div>
  );
};

export default PhraseReview;
