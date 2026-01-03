import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RotateCcw, Volume2, Check, X, Clock, Flame, Layers } from 'lucide-react';
import { verbs, Verb } from '@/data/verbs';
import { useVerbSRS } from '@/hooks/useVerbSRS';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';
import { ReviewQuality } from '@/types/srs';
import { cn } from '@/lib/utils';

interface VerbFlashcardsProps {
  onBack: () => void;
}

type SessionType = 'due' | 'all' | 'new';

export const VerbFlashcards = ({ onBack }: VerbFlashcardsProps) => {
  const { 
    recordReviewWithQuality, 
    getNextVerbs, 
    getDueVerbsForCategory,
    getStats, 
    getVerbDifficulty,
    getSRSData
  } = useVerbSRS(verbs);
  
  const { speak, isSpeaking, isSupported } = useAudioPronunciation({ rate: 0.85 });

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('due');
  const [sessionVerbs, setSessionVerbs] = useState<Verb[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ easy: number; good: number; hard: number; again: number }>({
    easy: 0, good: 0, hard: 0, again: 0
  });

  const stats = useMemo(() => getStats(), [getStats]);
  const dueVerbs = useMemo(() => getDueVerbsForCategory(), [getDueVerbsForCategory]);

  const startSession = useCallback((type: SessionType) => {
    let verbsForSession: Verb[];
    
    switch (type) {
      case 'due':
        verbsForSession = dueVerbs.length > 0 ? dueVerbs : getNextVerbs(10);
        break;
      case 'new':
        // Get verbs that haven't been reviewed much
        verbsForSession = verbs
          .filter(v => {
            const srs = getSRSData(v.id);
            return srs.repetitions < 2;
          })
          .slice(0, 10);
        if (verbsForSession.length === 0) {
          verbsForSession = getNextVerbs(10);
        }
        break;
      case 'all':
      default:
        verbsForSession = getNextVerbs(15);
        break;
    }
    
    setSessionVerbs(verbsForSession);
    setSessionType(type);
    setCurrentIndex(0);
    setShowAnswer(false);
    setReviewedCount(0);
    setSessionComplete(false);
    setSessionResults({ easy: 0, good: 0, hard: 0, again: 0 });
    setSessionStarted(true);
  }, [dueVerbs, getNextVerbs, getSRSData]);

  const handleSpeak = (text: string) => {
    if (isSupported) {
      speak(text);
    }
  };

  const handleRating = (quality: ReviewQuality) => {
    const currentVerb = sessionVerbs[currentIndex];
    recordReviewWithQuality(currentVerb.id, quality);
    
    // Update session results
    const qualityKey = quality === 5 ? 'easy' : quality === 4 ? 'good' : quality === 2 ? 'hard' : 'again';
    setSessionResults(prev => ({ ...prev, [qualityKey]: prev[qualityKey] + 1 }));
    setReviewedCount(prev => prev + 1);
    
    // Move to next card or complete
    if (currentIndex < sessionVerbs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  };

  // Start Screen
  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              <h1 className="font-heading text-xl font-bold">Verb Flashcards</h1>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 space-y-6">
          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-incorrect/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-incorrect">{stats.dueNow}</p>
                  <p className="text-xs text-muted-foreground">Due Now</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-primary">{stats.learning}</p>
                  <p className="text-xs text-muted-foreground">Learning</p>
                </div>
                <div className="bg-correct/10 p-3 rounded-xl">
                  <p className="text-xl font-bold text-correct">{stats.mastered}</p>
                  <p className="text-xs text-muted-foreground">Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Options */}
          <div className="space-y-3">
            <h2 className="font-heading font-semibold">Choose Session Type</h2>
            
            <Card 
              className={cn(
                "cursor-pointer transition-all",
                dueVerbs.length > 0 ? "border-primary bg-primary/5" : "opacity-60"
              )}
              onClick={() => dueVerbs.length > 0 && startSession('due')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-incorrect/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-incorrect" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Review Due</h3>
                  <p className="text-sm text-muted-foreground">
                    {dueVerbs.length} verbs ready for review
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => startSession('new')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Learn New</h3>
                  <p className="text-sm text-muted-foreground">
                    Start learning new verbs
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => startSession('all')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Practice All</h3>
                  <p className="text-sm text-muted-foreground">
                    Mixed practice session
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Session Complete
  if (sessionComplete) {
    const totalReviewed = sessionResults.easy + sessionResults.good + sessionResults.hard + sessionResults.again;
    const successRate = Math.round(((sessionResults.easy + sessionResults.good) / totalReviewed) * 100);
    
    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-xl font-bold">Session Complete!</h1>
          </div>
        </header>

        <main className="container px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-6 max-w-sm w-full">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Layers className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold">{totalReviewed}</h2>
              <p className="text-muted-foreground">Cards Reviewed</p>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-correct/10 p-3 rounded-xl">
                <p className="text-xl font-bold text-correct">{sessionResults.easy}</p>
                <p className="text-xs text-muted-foreground">Easy</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <p className="text-xl font-bold text-primary">{sessionResults.good}</p>
                <p className="text-xs text-muted-foreground">Good</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-xl">
                <p className="text-xl font-bold text-accent">{sessionResults.hard}</p>
                <p className="text-xs text-muted-foreground">Hard</p>
              </div>
              <div className="bg-incorrect/10 p-3 rounded-xl">
                <p className="text-xl font-bold text-incorrect">{sessionResults.again}</p>
                <p className="text-xs text-muted-foreground">Again</p>
              </div>
            </div>

            <p className="text-muted-foreground">
              Success Rate: <span className="font-bold text-foreground">{successRate}%</span>
            </p>

            <div className="space-y-3">
              <Button onClick={() => startSession(sessionType)} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Start New Session
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

  // Active Flashcard Session
  const currentVerb = sessionVerbs[currentIndex];
  const difficulty = getVerbDifficulty(currentVerb.id);
  const progress = ((currentIndex + 1) / sessionVerbs.length) * 100;

  const difficultyStyles = {
    easy: 'bg-correct/20 text-correct',
    medium: 'bg-primary/20 text-primary',
    hard: 'bg-incorrect/20 text-incorrect'
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <span className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {sessionVerbs.length}
            </span>
          </div>
          <span className={cn('text-xs px-2 py-1 rounded-full', difficultyStyles[difficulty])}>
            {difficulty}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <main className="container px-4 py-6 flex-1 flex flex-col">
        {/* Flashcard */}
        <Card 
          className={cn(
            "flex-1 cursor-pointer transition-all",
            showAnswer ? "bg-gradient-to-br from-primary/5 to-accent/5" : ""
          )}
          onClick={() => !showAnswer && setShowAnswer(true)}
        >
          <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
            {!showAnswer ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">{currentVerb.english}</p>
                <h2 className="text-3xl font-bold mb-4">{currentVerb.infinitive}</h2>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {currentVerb.category}
                </span>
                <p className="text-sm text-muted-foreground mt-6">Tap to reveal conjugations</p>
              </>
            ) : (
              <div className="w-full space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold">{currentVerb.infinitive}</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(currentVerb.infinitive);
                    }}
                    disabled={isSpeaking}
                  >
                    <Volume2 className={cn("w-5 h-5", isSpeaking && "animate-pulse")} />
                  </Button>
                </div>
                <p className="text-muted-foreground">{currentVerb.english}</p>
                
                {/* Present Tense */}
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Present Tense (Präsens)</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(currentVerb.präsens).map(([person, conjugation]) => (
                      <button
                        key={person}
                        className="text-left px-2 py-1 rounded hover:bg-muted transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(`${person}, ${conjugation as string}`);
                        }}
                      >
                        <span className="text-muted-foreground">{person}: </span>
                        <span className="font-medium">{conjugation as string}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Perfect Tense */}
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Perfect Tense (Perfekt)</h3>
                  <button
                    className="text-left px-2 py-1 rounded hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(`Ich habe ${currentVerb.perfekt.participle}`);
                    }}
                  >
                    <span className="text-muted-foreground">{currentVerb.perfekt.auxiliary} + </span>
                    <span className="font-medium">{currentVerb.perfekt.participle}</span>
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rating Buttons */}
        {showAnswer && (
          <div className="mt-4 space-y-2">
            <p className="text-center text-sm text-muted-foreground mb-3">How well did you know this?</p>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3 border-incorrect text-incorrect hover:bg-incorrect/10"
                onClick={() => handleRating(1)}
              >
                <X className="w-5 h-5 mb-1" />
                <span className="text-xs">Again</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3 border-accent text-accent hover:bg-accent/10"
                onClick={() => handleRating(2)}
              >
                <span className="text-lg mb-1">😓</span>
                <span className="text-xs">Hard</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3 border-primary text-primary hover:bg-primary/10"
                onClick={() => handleRating(4)}
              >
                <span className="text-lg mb-1">🙂</span>
                <span className="text-xs">Good</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-3 border-correct text-correct hover:bg-correct/10"
                onClick={() => handleRating(5)}
              >
                <Check className="w-5 h-5 mb-1" />
                <span className="text-xs">Easy</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
