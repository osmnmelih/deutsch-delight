import { useState, useMemo, useEffect } from 'react';
import { Header } from './Header';
import { ProgressCard } from './ProgressCard';
import { LessonCard } from './LessonCard';
import { DragDropGame } from './DragDropGame';
import { VocabularyBrowser } from './VocabularyBrowser';
import { VisualMatchGame } from './VisualMatchGame';
import { GrammarLessons } from './GrammarLessons';
import { VerbLessons } from './VerbLessons';
import { Quiz } from './Quiz';
import { DailyGoalsCard } from './DailyGoalsCard';
import { AchievementsView } from './AchievementsView';
import { SentenceBuilder } from './SentenceBuilder';
import { ListeningExercise } from './ListeningExercise';
import { VerbConjugationQuiz } from './VerbConjugationQuiz';
import { VerbFlashcards } from './VerbFlashcards';
import { CaseQuiz } from './CaseQuiz';
import { PrepositionQuiz } from './PrepositionQuiz';
import { NumbersAndTime } from './NumbersAndTime';
import { ProgressDashboard } from './ProgressDashboard';
import ReadingComprehension from './ReadingComprehension';
import WritingPractice from './WritingPractice';
import ConversationPractice from './ConversationPractice';
import DictationExercise from './DictationExercise';
import CultureIdioms from './CultureIdioms';
import PhraseReview from './PhraseReview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, BookOpen, Brain, Flame, GraduationCap, 
  Languages, Headphones, BarChart3, BookMarked, PenLine, 
  Users, Keyboard, Globe, ChevronRight, Star, Zap, Image
} from 'lucide-react';
import { lessonCategories, getWordsByCategory } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { vocabularyWords } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { useUserProgress } from '@/hooks/useUserProgress';
import { QuestionType } from '@/types/quiz';
import { toast } from 'sonner';

type ActiveView = 
  | 'home' | 'vocabulary' | 'grammar' | 'quiz' | 'verbs' | 'achievements' 
  | 'sentences' | 'listening' | 'verbQuiz' | 'verbFlashcards' | 'caseQuiz' 
  | 'prepositions' | 'numbersTime' | 'dashboard' | 'reading' | 'writing' 
  | 'conversations' | 'dictation' | 'culture' | 'phraseReview' | 'visualMatch';

type GameMode = 'article' | 'visual' | null;

export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [quizType, setQuizType] = useState<QuestionType | 'mixed'>('mixed');
  
  const { 
    isLoaded: srsLoaded,
    getNextWords, 
    getDueWordsForCategory,
    getStats, 
    recordReview, 
    getWordDifficulty,
    getSRSData
  } = useSRS(vocabularyWords);
  
  const { 
    dailyProgress,
    newAchievements, 
    recordWordLearned, 
    recordQuizCompleted,
    clearNewAchievements
  } = useDailyGoals();

  const {
    isLoaded: progressLoaded,
    userLevel,
    addXP,
    recordCorrectAnswer,
    recordIncorrectAnswer,
    isCategoryUnlocked,
    getCategoryUnlockLevel,
  } = useUserProgress();

  useEffect(() => {
    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        toast.success(`🎉 Achievement: ${achievement.title}`, {
          description: achievement.description,
          duration: 4000
        });
      });
      clearNewAchievements();
    }
  }, [newAchievements, clearNewAchievements]);

  const globalStats = useMemo(() => getStats(), [getStats]);
  
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: vocabularyWords.length,
    masteredWords: 0,
    currentStreak: dailyProgress?.streakCount || 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  
  useEffect(() => {
    if (srsLoaded) {
      setProgress(prev => ({
        ...prev,
        masteredWords: globalStats.mastered,
        currentStreak: dailyProgress?.streakCount || prev.currentStreak,
      }));
    }
  }, [srsLoaded, globalStats.mastered, dailyProgress?.streakCount]);

  // Get unlocked words based on user level
  const unlockedWords = useMemo(() => {
    return vocabularyWords.filter(w => isCategoryUnlocked(w.category));
  }, [isCategoryUnlocked]);

  const handleStartPractice = (categoryId: string, mode: GameMode = 'article') => {
    const words = getNextWords(6, categoryId);
    if (words.length === 0) {
      toast.error('No words available in this category');
      return;
    }
    setGameWords(words);
    setGameMode(mode);
    setActiveGame(categoryId);
  };

  const handleQuickPractice = (mode: GameMode = 'visual') => {
    const words = getNextWords(5);
    if (words.length === 0) {
      toast.error('Start by learning some vocabulary first');
      return;
    }
    setGameWords(words);
    setGameMode(mode);
    setActiveGame('quick-practice');
  };
  
  const handleReviewDue = () => {
    const dueWords = getDueWordsForCategory();
    if (dueWords.length === 0) {
      const words = getNextWords(5);
      setGameWords(words);
    } else {
      setGameWords(dueWords.slice(0, 8));
    }
    setGameMode('visual');
    setActiveGame('review-due');
  };
  
  const handleOpenQuiz = (type: QuestionType | 'mixed' = 'mixed') => {
    setQuizType(type);
    setGameWords(unlockedWords);
    setActiveView('quiz');
  };

  const handleGameComplete = (correct: number, incorrect: number) => {
    const newStats = getStats();
    setProgress(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + correct,
      incorrectAnswers: prev.incorrectAnswers + incorrect,
      masteredWords: newStats.mastered,
    }));

    for (let i = 0; i < correct; i++) {
      recordWordLearned();
      recordCorrectAnswer();
    }
    for (let i = 0; i < incorrect; i++) {
      recordIncorrectAnswer();
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
    setGameMode(null);
  };
  
  const handlePracticeWord = (word: VocabularyWord) => {
    setGameWords([word]);
    setGameMode('article');
    setActiveGame('single-word');
  };

  // View routing
  if (activeView === 'vocabulary') {
    return (
      <VocabularyBrowser
        words={vocabularyWords}
        getSRSData={getSRSData}
        getWordDifficulty={getWordDifficulty}
        onBack={handleBack}
        onStartPractice={(catId) => handleStartPractice(catId, 'visual')}
        isCategoryUnlocked={isCategoryUnlocked}
        getCategoryUnlockLevel={getCategoryUnlockLevel}
      />
    );
  }

  const viewComponents: Record<Exclude<ActiveView, 'home' | 'vocabulary' | 'visualMatch'>, JSX.Element> = {
    grammar: <GrammarLessons onBack={handleBack} />,
    verbs: <VerbLessons onBack={handleBack} />,
    achievements: <AchievementsView onBack={handleBack} />,
    sentences: <SentenceBuilder onBack={handleBack} />,
    listening: <ListeningExercise onBack={handleBack} />,
    verbQuiz: <VerbConjugationQuiz onBack={handleBack} />,
    verbFlashcards: <VerbFlashcards onBack={handleBack} />,
    caseQuiz: <CaseQuiz onBack={handleBack} />,
    prepositions: <PrepositionQuiz onBack={handleBack} />,
    numbersTime: <NumbersAndTime onBack={handleBack} />,
    dashboard: <ProgressDashboard onBack={handleBack} />,
    reading: <ReadingComprehension onBack={handleBack} />,
    writing: <WritingPractice onBack={handleBack} />,
    conversations: <ConversationPractice onBack={handleBack} />,
    dictation: <DictationExercise onBack={handleBack} />,
    culture: <CultureIdioms onBack={handleBack} />,
    phraseReview: <PhraseReview onBack={handleBack} />,
    quiz: <Quiz words={gameWords.length ? gameWords : unlockedWords} allWords={unlockedWords} onBack={handleBack} onComplete={handleQuizComplete} onRecordReview={recordReview} quizType={quizType} />,
  };

  // Route to view components (vocabulary already handled above)
  if (activeView !== 'home' && activeView !== 'visualMatch') {
    const component = viewComponents[activeView as keyof typeof viewComponents];
    if (component) return component;
  }

  // Game mode rendering
  if (activeGame && gameWords.length > 0) {
    if (gameMode === 'visual') {
      return (
        <VisualMatchGame
          words={gameWords}
          onBack={handleBack}
          onComplete={handleGameComplete}
          onRecordReview={recordReview}
          onXPGain={addXP}
        />
      );
    }
    
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

  // Calculate level progress
  const levelProgress = userLevel.xpToNextLevel > 0 
    ? (userLevel.xp / userLevel.xpToNextLevel) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <Header progress={progress} />
      
      <main className="container px-4 py-4 space-y-4">
        {/* Level & XP Bar */}
        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">Level {userLevel.level}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {userLevel.wordsUnlocked} words unlocked
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {userLevel.xp}/{userLevel.xpToNextLevel} XP
              </Badge>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickPractice('visual')}
            className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex flex-col items-start gap-2 shadow-md active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">Visual Match</p>
              <p className="text-xs opacity-80">Learn with pictures</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickPractice('article')}
            className="p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground flex flex-col items-start gap-2 shadow-md active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">Article Practice</p>
              <p className="text-xs opacity-80">der, die, das</p>
            </div>
          </button>
        </div>

        {/* Due Reviews Banner */}
        {srsLoaded && globalStats.dueNow > 0 && (
          <button 
            onClick={handleReviewDue}
            className="w-full bg-accent/10 border border-accent/30 p-3 rounded-xl flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-accent">
                  {globalStats.dueNow} words due for review
                </p>
                <p className="text-xs text-muted-foreground">Tap to practice now</p>
              </div>
            </div>
            <Flame className="w-5 h-5 text-accent" />
          </button>
        )}

        {/* Daily Progress */}
        <DailyGoalsCard onViewAchievements={() => setActiveView('achievements')} />

        {/* Learning Stats */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-primary" />
              <span className="font-heading font-semibold text-sm">Progress</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2.5 rounded-xl bg-incorrect/10">
                <p className="text-xl font-bold text-incorrect">{globalStats.dueNow}</p>
                <p className="text-[10px] text-muted-foreground font-medium">Due</p>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-primary/10">
                <p className="text-xl font-bold text-primary">{globalStats.learning}</p>
                <p className="text-[10px] text-muted-foreground font-medium">Learning</p>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-correct/10">
                <p className="text-xl font-bold text-correct">{globalStats.mastered}</p>
                <p className="text-[10px] text-muted-foreground font-medium">Mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base">Practice Skills</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: 'Vocabulary', onClick: () => setActiveView('vocabulary') },
              { icon: <GraduationCap className="w-5 h-5" />, label: 'Grammar', onClick: () => setActiveView('grammar') },
              { icon: <Languages className="w-5 h-5" />, label: 'Verbs', onClick: () => setActiveView('verbs') },
              { icon: <Keyboard className="w-5 h-5" />, label: 'Dictation', onClick: () => setActiveView('dictation') },
              { icon: <Headphones className="w-5 h-5" />, label: 'Listening', onClick: () => setActiveView('listening') },
              { icon: <BookMarked className="w-5 h-5" />, label: 'Reading', onClick: () => setActiveView('reading') },
              { icon: <PenLine className="w-5 h-5" />, label: 'Writing', onClick: () => setActiveView('writing') },
              { icon: <Users className="w-5 h-5" />, label: 'Dialogs', onClick: () => setActiveView('conversations') },
            ].map((skill, i) => (
              <button
                key={i}
                onClick={skill.onClick}
                className="p-3 rounded-xl bg-card border border-border flex flex-col items-center gap-1.5 hover:bg-muted active:scale-95 transition-all"
              >
                <div className="text-muted-foreground">{skill.icon}</div>
                <span className="text-[10px] font-medium">{skill.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base">Explore</h3>
          </div>
          <div className="grid gap-2">
            {[
              { icon: <Globe className="w-5 h-5" />, label: 'Culture & Idioms', desc: 'Authentic expressions', view: 'culture' as ActiveView, color: 'bg-secondary/10 text-secondary' },
              { icon: <BarChart3 className="w-5 h-5" />, label: 'Statistics', desc: 'Track your progress', view: 'dashboard' as ActiveView, color: 'bg-primary/10 text-primary' },
              { icon: <Zap className="w-5 h-5" />, label: 'Quick Quiz', desc: 'Test your knowledge', view: 'quiz' as ActiveView, color: 'bg-accent/10 text-accent' },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => item.view === 'quiz' ? handleOpenQuiz() : setActiveView(item.view)}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted active:scale-[0.99] transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-6" />
      </main>
    </div>
  );
};
