import { useState } from 'react';
import { Header } from './Header';
import { ProgressCard } from './ProgressCard';
import { LessonCard } from './LessonCard';
import { DragDropGame } from './DragDropGame';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen } from 'lucide-react';
import { lessonCategories, getWordsByCategory, getRandomWords } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { vocabularyWords } from '@/data/vocabulary';

export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: vocabularyWords.length,
    masteredWords: 0,
    currentStreak: 3,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  const [categories, setCategories] = useState(lessonCategories);

  const handleSelectLesson = (lessonId: string) => {
    const words = getWordsByCategory(lessonId);
    setGameWords(words);
    setActiveGame(lessonId);
  };

  const handleQuickPractice = () => {
    const words = getRandomWords(5);
    setGameWords(words);
    setActiveGame('quick-practice');
  };

  const handleGameComplete = (correct: number, incorrect: number) => {
    setProgress(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + correct,
      incorrectAnswers: prev.incorrectAnswers + incorrect,
      masteredWords: Math.min(prev.totalWords, prev.masteredWords + Math.floor(correct * 0.5)),
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
          >
            <BookOpen className="w-6 h-6" />
            <span>Review Words</span>
          </Button>
        </div>

        {/* Progress Card */}
        <ProgressCard progress={progress} />

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
