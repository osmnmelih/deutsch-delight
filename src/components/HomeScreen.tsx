import { useState, useMemo } from 'react';
import { Header } from './Header';
import { ProgressCard } from './ProgressCard';
import { LessonCard } from './LessonCard';
import { DragDropGame } from './DragDropGame';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Brain, Flame } from 'lucide-react';
import { lessonCategories, getWordsByCategory } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { vocabularyWords } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [categories, setCategories] = useState(lessonCategories);
  
  // SRS Hook
  const { 
    isLoaded: srsLoaded,
    getNextWords, 
    getDueWordsForCategory,
    getStats, 
    recordReview, 
    getWordDifficulty 
  } = useSRS(vocabularyWords);

  // Calculate stats from SRS
  const globalStats = useMemo(() => getStats(), [getStats]);
  
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: vocabularyWords.length,
    masteredWords: 0,
    currentStreak: 3,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  
  // Update progress when SRS is loaded
  useMemo(() => {
    if (srsLoaded) {
      setProgress(prev => ({
        ...prev,
        masteredWords: globalStats.mastered,
      }));
    }
  }, [srsLoaded, globalStats.mastered]);

  const handleSelectLesson = (lessonId: string) => {
    // Use SRS to get words prioritized by difficulty
    const words = getNextWords(6, lessonId);
    setGameWords(words);
    setActiveGame(lessonId);
  };

  const handleQuickPractice = () => {
    // Get words that need review most (using SRS priority)
    const words = getNextWords(5);
    setGameWords(words);
    setActiveGame('quick-practice');
  };
  
  const handleReviewDue = () => {
    // Get only due words
    const dueWords = getDueWordsForCategory();
    if (dueWords.length === 0) {
      // If no words due, get some random ones
      const words = getNextWords(5);
      setGameWords(words);
    } else {
      setGameWords(dueWords.slice(0, 10));
    }
    setActiveGame('review-due');
  };

  const handleGameComplete = (correct: number, incorrect: number) => {
    const newStats = getStats();
    setProgress(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + correct,
      incorrectAnswers: prev.incorrectAnswers + incorrect,
      masteredWords: newStats.mastered,
      currentStreak: correct > incorrect ? prev.currentStreak + 1 : Math.max(0, prev.currentStreak - 1),
    }));

    if (activeGame && activeGame !== 'quick-practice') {
      setCategories(prev => prev.map(cat => 
        cat.id === activeGame 
          ? { ...cat, progress: Math.min(100, cat.progress + Math.round((correct / gameWords.length) * 30)) }
          : cat
      ));
    }
  };

  const handleBack = () => {
    setActiveGame(null);
    setGameWords([]);
  };

  if (activeGame && gameWords.length > 0) {
    return (
      <DragDropGame 
        words={gameWords} 
        onBack={handleBack}
        onComplete={handleGameComplete}
        onRecordReview={recordReview}
        getWordDifficulty={getWordDifficulty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <Header progress={progress} />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Guten Tag! 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Ready to learn some German?
          </p>
        </div>

        {/* SRS Stats Banner */}
        {srsLoaded && globalStats.dueNow > 0 && (
          <button 
            onClick={handleReviewDue}
            className="w-full bg-gradient-to-r from-primary to-accent p-4 rounded-2xl text-left animate-slide-up flex items-center justify-between"
            style={{ animationDelay: '50ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-primary-foreground">
                  {globalStats.dueNow} words to review
                </p>
                <p className="text-sm text-primary-foreground/80">
                  Tap to practice due words
                </p>
              </div>
            </div>
            <Flame className="w-6 h-6 text-primary-foreground animate-pulse" />
          </button>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <Button 
            variant="primary" 
            size="lg" 
            className="h-auto py-4 flex-col gap-2"
            onClick={handleQuickPractice}
          >
            <Sparkles className="w-6 h-6" />
            <span>Quick Practice</span>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="h-auto py-4 flex-col gap-2"
            onClick={handleReviewDue}
          >
            <BookOpen className="w-6 h-6" />
            <span>Review Due</span>
          </Button>
        </div>

        {/* Progress Card with SRS Stats */}
        <ProgressCard progress={progress} />
        
        {/* SRS Learning Stats */}
        <div className="card-elevated p-4 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Spaced Repetition</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-incorrect/10 p-3 rounded-xl">
              <p className="text-2xl font-bold text-incorrect">{globalStats.dueNow}</p>
              <p className="text-xs text-muted-foreground">Due Now</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-xl">
              <p className="text-2xl font-bold text-primary">{globalStats.learning}</p>
              <p className="text-xs text-muted-foreground">Learning</p>
            </div>
            <div className="bg-correct/10 p-3 rounded-xl">
              <p className="text-2xl font-bold text-correct">{globalStats.mastered}</p>
              <p className="text-xs text-muted-foreground">Mastered</p>
            </div>
          </div>
        </div>

        {/* Article Tips */}
        <div className="card-elevated p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="font-heading font-semibold mb-3">Article Tips 💡</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-der/10 text-der p-2 rounded-xl">
              <span className="font-bold">der</span>
              <p className="text-xs opacity-80">masculine</p>
            </div>
            <div className="bg-die/10 text-die p-2 rounded-xl">
              <span className="font-bold">die</span>
              <p className="text-xs opacity-80">feminine</p>
            </div>
            <div className="bg-das/10 text-das p-2 rounded-xl">
              <span className="font-bold">das</span>
              <p className="text-xs opacity-80">neuter</p>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <section>
          <h3 className="font-heading font-semibold text-lg mb-3">Lessons</h3>
          <div className="space-y-3">
            {categories.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                onSelect={handleSelectLesson}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Bottom Spacing for iOS */}
        <div className="h-8" />
      </main>
    </div>
  );
};
