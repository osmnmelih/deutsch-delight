import { useState, useMemo, useEffect } from 'react';
import { Header } from './Header';
import { ProgressCard } from './ProgressCard';
import { LessonCard } from './LessonCard';
import { DragDropGame } from './DragDropGame';
import { VocabularyList } from './VocabularyList';
import { GrammarLessons } from './GrammarLessons';
import { VerbLessons } from './VerbLessons';
import { Quiz } from './Quiz';
import { DailyGoalsCard } from './DailyGoalsCard';
import { AchievementsView } from './AchievementsView';
import { SentenceBuilder } from './SentenceBuilder';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Brain, Flame, List, GraduationCap, FileQuestion, Languages, MessageSquare } from 'lucide-react';
import { lessonCategories } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { vocabularyWords } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { QuestionType } from '@/types/quiz';
import { toast } from 'sonner';

export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'vocabulary' | 'grammar' | 'quiz' | 'verbs' | 'achievements' | 'sentences'>('home');
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [categories, setCategories] = useState(lessonCategories);
  const [quizType, setQuizType] = useState<QuestionType | 'mixed'>('mixed');
  
  // SRS Hook
  const { 
    isLoaded: srsLoaded,
    getNextWords, 
    getDueWordsForCategory,
    getStats, 
    recordReview, 
    getWordDifficulty,
    getSRSData
  } = useSRS(vocabularyWords);
  
  // Daily Goals Hook
  const { 
    dailyProgress,
    newAchievements, 
    recordWordLearned, 
    recordQuizCompleted,
    clearNewAchievements
  } = useDailyGoals();

  // Show achievement notifications
  useEffect(() => {
    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        toast.success(`🎉 Achievement Unlocked: ${achievement.title}`, {
          description: achievement.description,
          icon: achievement.icon,
          duration: 5000
        });
      });
      clearNewAchievements();
    }
  }, [newAchievements, clearNewAchievements]);

  // Calculate stats from SRS
  const globalStats = useMemo(() => getStats(), [getStats]);
  
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: vocabularyWords.length,
    masteredWords: 0,
    currentStreak: dailyProgress?.streakCount || 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  
  // Update progress when SRS is loaded or daily progress changes
  useMemo(() => {
    if (srsLoaded) {
      setProgress(prev => ({
        ...prev,
        masteredWords: globalStats.mastered,
        currentStreak: dailyProgress?.streakCount || prev.currentStreak,
      }));
    }
  }, [srsLoaded, globalStats.mastered, dailyProgress?.streakCount]);

  const handleSelectLesson = (lessonId: string) => {
    const words = getNextWords(6, lessonId);
    setGameWords(words);
    setActiveGame(lessonId);
  };

  const handleQuickPractice = () => {
    const words = getNextWords(5);
    setGameWords(words);
    setActiveGame('quick-practice');
  };
  
  const handleReviewDue = () => {
    const dueWords = getDueWordsForCategory();
    if (dueWords.length === 0) {
      const words = getNextWords(5);
      setGameWords(words);
    } else {
      setGameWords(dueWords.slice(0, 10));
    }
    setActiveGame('review-due');
  };
  
  const handleOpenVocabulary = () => {
    setActiveView('vocabulary');
  };
  
  const handleOpenGrammar = () => {
    setActiveView('grammar');
  };
  
  const handleOpenVerbs = () => {
    setActiveView('verbs');
  };
  
  const handleOpenQuiz = (type: QuestionType | 'mixed' = 'mixed') => {
    setQuizType(type);
    setGameWords(vocabularyWords);
    setActiveView('quiz');
  };
  
  const handleViewAchievements = () => {
    setActiveView('achievements');
  };
  
  const handlePracticeWord = (word: VocabularyWord) => {
    setGameWords([word]);
    setActiveGame('single-word');
    setActiveView('home');
  };

  const handleGameComplete = (correct: number, incorrect: number) => {
    const newStats = getStats();
    setProgress(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + correct,
      incorrectAnswers: prev.incorrectAnswers + incorrect,
      masteredWords: newStats.mastered,
    }));

    // Record for daily goals
    for (let i = 0; i < correct; i++) {
      recordWordLearned();
    }
    
    if (activeGame && activeGame !== 'quick-practice') {
      setCategories(prev => prev.map(cat => 
        cat.id === activeGame 
          ? { ...cat, progress: Math.min(100, cat.progress + Math.round((correct / gameWords.length) * 30)) }
          : cat
      ));
    }
  };
  
  const handleQuizComplete = (correct: number, incorrect: number) => {
    handleGameComplete(correct, incorrect);
    recordQuizCompleted(correct, correct + incorrect);
  };

  const handleBack = () => {
    setActiveGame(null);
    setActiveView('home');
    setGameWords([]);
  };

  // Vocabulary List View
  if (activeView === 'vocabulary') {
    return (
      <VocabularyList
        words={vocabularyWords}
        getSRSData={getSRSData}
        getWordDifficulty={getWordDifficulty}
        onBack={handleBack}
        onPracticeWord={handlePracticeWord}
      />
    );
  }
  
  // Grammar Lessons View
  if (activeView === 'grammar') {
    return <GrammarLessons onBack={handleBack} />;
  }
  
  // Verb Lessons View
  if (activeView === 'verbs') {
    return <VerbLessons onBack={handleBack} />;
  }
  
  // Achievements View
  if (activeView === 'achievements') {
    return <AchievementsView onBack={handleBack} />;
  }
  
  // Sentence Builder View
  if (activeView === 'sentences') {
    return <SentenceBuilder onBack={handleBack} />;
  }
  
  // Quiz View
  if (activeView === 'quiz') {
    return (
      <Quiz
        words={gameWords}
        allWords={vocabularyWords}
        onBack={handleBack}
        onComplete={handleQuizComplete}
        onRecordReview={recordReview}
        quizType={quizType}
      />
    );
  }

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
        <div className="grid grid-cols-5 gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <Button 
            variant="primary" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={handleQuickPractice}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px]">Practice</span>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={() => handleOpenQuiz('mixed')}
          >
            <FileQuestion className="w-5 h-5" />
            <span className="text-[10px]">Quiz</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={handleReviewDue}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Review</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={handleOpenVocabulary}
          >
            <List className="w-5 h-5" />
            <span className="text-[10px]">Words</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={handleOpenGrammar}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px]">Grammar</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={handleOpenVerbs}
          >
            <Languages className="w-5 h-5" />
            <span className="text-[10px]">Verbs</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-auto py-3 flex-col gap-1"
            onClick={() => setActiveView('sentences')}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Sentences</span>
          </Button>
        </div>

        {/* Daily Goals Card */}
        <DailyGoalsCard onViewAchievements={handleViewAchievements} />

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
