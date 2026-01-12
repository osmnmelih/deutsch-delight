import { useState, useMemo, useEffect } from 'react';
import { Header } from './Header';
import { DragDropGame } from './DragDropGame';
import { VocabularyBrowser } from './VocabularyBrowser';
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
import { SettingsPage } from './SettingsPage';
import { ProfilePage } from './ProfilePage';
import { MixedPractice } from './MixedPractice';
import { VocabularyFlashcards } from './VocabularyFlashcards';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Brain, Flame, GraduationCap, 
  Languages, Headphones, BarChart3, BookMarked, PenLine, 
  Users, Keyboard, Globe, ChevronRight, Star, Zap, 
  Target, Trophy, Sparkles, Play, Clock
} from 'lucide-react';
import { vocabularyWords } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { useSyncedSRS } from '@/hooks/useSyncedSRS';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { useUserProgress } from '@/hooks/useUserProgress';
import { QuestionType } from '@/types/quiz';
import { toast } from 'sonner';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';

type ActiveView = 
  | 'home' | 'vocabulary' | 'grammar' | 'quiz' | 'verbs' | 'achievements' 
  | 'sentences' | 'listening' | 'verbQuiz' | 'verbFlashcards' | 'caseQuiz' 
  | 'prepositions' | 'numbersTime' | 'dashboard' | 'reading' | 'writing' 
  | 'conversations' | 'dictation' | 'culture' | 'phraseReview' | 'settings' | 'profile'
  | 'mixedPractice' | 'vocabFlashcards';

export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [quizType, setQuizType] = useState<QuestionType | 'mixed'>('mixed');
  
  const { 
    isLoaded: srsLoaded,
    getNextWords, 
    getDueWordsForCategory,
    getStats, 
    recordReview, 
    getWordDifficulty,
    getSRSData,
    recordReviewWithQuality
  } = useSyncedSRS(vocabularyWords);
  
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
        toast.success(`🎉 Erfolg! / Achievement: ${achievement.title}`, {
          description: achievement.description,
          duration: 4000
        });
      });
      clearNewAchievements();
    }
  }, [newAchievements, clearNewAchievements]);

  const globalStats = useMemo(() => getStats(), [getStats]);
  
  // Review notifications
  useReviewNotifications({ 
    dueWords: globalStats.dueNow, 
    enabled: srsLoaded 
  });

  // Listen for review notification action
  useEffect(() => {
    const handleStartReview = () => {
      handleReviewDue();
    };
    
    window.addEventListener('start-review', handleStartReview);
    return () => window.removeEventListener('start-review', handleStartReview);
  }, []);
  
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

  const unlockedWords = useMemo(() => {
    return vocabularyWords.filter(w => isCategoryUnlocked(w.category));
  }, [isCategoryUnlocked]);

  const handleStartPractice = (categoryId: string) => {
    const words = getNextWords(6, categoryId);
    if (words.length === 0) {
      toast.error('Keine Wörter verfügbar / No words available');
      return;
    }
    setGameWords(words);
    setActiveGame(categoryId);
  };

  const handleQuickPractice = () => {
    const words = getNextWords(5);
    if (words.length === 0) {
      toast.error('Lerne zuerst einige Vokabeln / Learn some vocabulary first');
      return;
    }
    setGameWords(words);
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
  };

  // View routing
  if (activeView === 'vocabulary') {
    return (
      <VocabularyBrowser
        words={vocabularyWords}
        getSRSData={getSRSData}
        getWordDifficulty={getWordDifficulty}
        onBack={handleBack}
        onStartPractice={(catId) => handleStartPractice(catId)}
        isCategoryUnlocked={isCategoryUnlocked}
        getCategoryUnlockLevel={getCategoryUnlockLevel}
      />
    );
  }

  const viewComponents: Record<Exclude<ActiveView, 'home' | 'vocabulary'>, JSX.Element> = {
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
    settings: <SettingsPage onBack={handleBack} />,
    profile: <ProfilePage onBack={handleBack} />,
    quiz: <Quiz words={gameWords.length ? gameWords : unlockedWords} allWords={unlockedWords} onBack={handleBack} onComplete={handleQuizComplete} onRecordReview={(wordId, correct, time) => { recordReview(wordId, correct, time); }} quizType={quizType} />,
    mixedPractice: <MixedPractice words={unlockedWords} onBack={handleBack} onComplete={handleQuizComplete} onRecordReview={(wordId, correct, time) => { recordReview(wordId, correct, time); }} />,
    vocabFlashcards: <VocabularyFlashcards words={gameWords} categoryTitle="Vokabeln" getSRSData={getSRSData} getWordDifficulty={getWordDifficulty} onRecordReview={(wordId, quality) => { recordReviewWithQuality(wordId, quality); }} onBack={handleBack} />,
  };

  if (activeView !== 'home') {
    const component = viewComponents[activeView as keyof typeof viewComponents];
    if (component) return component;
  }

  // Game mode rendering
  if (activeGame && gameWords.length > 0) {
    return (
      <DragDropGame
        words={gameWords} 
        onBack={handleBack}
        onComplete={handleGameComplete}
        onRecordReview={(wordId, correct, time) => { recordReview(wordId, correct, time); }}
        getWordDifficulty={getWordDifficulty}
      />
    );
  }
        getWordDifficulty={getWordDifficulty}
      />
    );
  }

  const levelProgress = userLevel.xpToNextLevel > 0 
    ? (userLevel.xp / userLevel.xpToNextLevel) * 100 
    : 0;

  // Skill cards data with bilingual labels
  const skillCards = [
    { 
      icon: <BookOpen className="w-5 h-5" />, 
      labelDe: 'Vokabeln', 
      labelEn: 'Vocabulary',
      onClick: () => setActiveView('vocabulary'),
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30'
    },
    { 
      icon: <GraduationCap className="w-5 h-5" />, 
      labelDe: 'Grammatik', 
      labelEn: 'Grammar',
      onClick: () => setActiveView('grammar'),
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30'
    },
    { 
      icon: <Languages className="w-5 h-5" />, 
      labelDe: 'Verben', 
      labelEn: 'Verbs',
      onClick: () => setActiveView('verbs'),
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30'
    },
    { 
      icon: <Keyboard className="w-5 h-5" />, 
      labelDe: 'Diktat', 
      labelEn: 'Dictation',
      onClick: () => setActiveView('dictation'),
      color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30'
    },
    { 
      icon: <Headphones className="w-5 h-5" />, 
      labelDe: 'Hören', 
      labelEn: 'Listening',
      onClick: () => setActiveView('listening'),
      color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30'
    },
    { 
      icon: <BookMarked className="w-5 h-5" />, 
      labelDe: 'Lesen', 
      labelEn: 'Reading',
      onClick: () => setActiveView('reading'),
      color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30'
    },
    { 
      icon: <PenLine className="w-5 h-5" />, 
      labelDe: 'Schreiben', 
      labelEn: 'Writing',
      onClick: () => setActiveView('writing'),
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30'
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      labelDe: 'Dialoge', 
      labelEn: 'Dialogs',
      onClick: () => setActiveView('conversations'),
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30'
    },
  ];

  const exploreItems = [
    { 
      icon: <Globe className="w-5 h-5" />, 
      labelDe: 'Kultur & Redewendungen', 
      labelEn: 'Culture & Idioms',
      descDe: 'Authentische Ausdrücke',
      descEn: 'Authentic expressions',
      view: 'culture' as ActiveView, 
      iconBg: 'bg-secondary/15 text-secondary' 
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      labelDe: 'Statistiken', 
      labelEn: 'Statistics',
      descDe: 'Verfolge deinen Fortschritt',
      descEn: 'Track your progress',
      view: 'dashboard' as ActiveView, 
      iconBg: 'bg-primary/15 text-primary' 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      labelDe: 'Schnell-Quiz', 
      labelEn: 'Quick Quiz',
      descDe: 'Teste dein Wissen',
      descEn: 'Test your knowledge',
      view: 'quiz' as ActiveView, 
      iconBg: 'bg-accent/15 text-accent' 
    },
  ];

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <Header progress={progress} onOpenSettings={() => setActiveView('settings')} onOpenProfile={() => setActiveView('profile')} />
      
      <main className="container px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Welcome & Level Card */}
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/10 via-card to-secondary/5">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground">
                  Willkommen zurück!
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">Welcome back!</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-primary/15 rounded-full px-3 py-1.5">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="font-bold text-sm text-primary">{dailyProgress?.streakCount || 0}</span>
                </div>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-heading font-bold text-base">
                      Stufe {userLevel.level}
                      <span className="text-muted-foreground font-normal text-sm ml-1">/ Level {userLevel.level}</span>
                    </p>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {userLevel.xp}/{userLevel.xpToNextLevel} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {userLevel.wordsUnlocked} Wörter freigeschaltet / words unlocked
                  </p>
                </div>
              </div>
              <Progress value={levelProgress} className="h-2.5" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveView('mixedPractice')}
            className="group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex flex-col items-start gap-3 shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-11 h-11 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Play className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <p className="font-heading font-bold text-sm">Üben starten</p>
              <p className="text-xs opacity-80 mt-0.5">Start Practice</p>
            </div>
          </button>

          <button
            onClick={() => handleOpenQuiz()}
            className="group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground flex flex-col items-start gap-3 shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-11 h-11 rounded-xl bg-secondary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <p className="font-heading font-bold text-sm">Quiz starten</p>
              <p className="text-xs opacity-80 mt-0.5">Start Quiz</p>
            </div>
          </button>
        </div>

        {/* Due Reviews Banner */}
        {srsLoaded && globalStats.dueNow > 0 && (
          <button 
            onClick={handleReviewDue}
            className="w-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 p-4 rounded-2xl flex items-center justify-between active:scale-[0.99] transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-foreground">
                  {globalStats.dueNow} Wörter fällig
                </p>
                <p className="text-xs text-muted-foreground">{globalStats.dueNow} words due for review</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-accent" />
            </div>
          </button>
        )}

        {/* Daily Goals */}
        <DailyGoalsCard onViewAchievements={() => setActiveView('achievements')} />

        {/* Learning Stats */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <div>
                <span className="font-heading font-semibold text-sm">Fortschritt</span>
                <span className="text-muted-foreground text-xs ml-1">/ Progress</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                <p className="text-2xl font-bold text-red-500">{globalStats.dueNow}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">Fällig / Due</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-2xl font-bold text-primary">{globalStats.learning}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">Lernend / Learning</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-correct/10 to-correct/5 border border-correct/20">
                <p className="text-2xl font-bold text-correct">{globalStats.mastered}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">Gelernt / Mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-bold text-base">Fähigkeiten üben</h3>
              <p className="text-xs text-muted-foreground">Practice Skills</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {skillCards.map((skill, i) => (
              <button
                key={i}
                onClick={skill.onClick}
                className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} border flex flex-col items-center gap-2 hover:shadow-md active:scale-95 transition-all duration-200`}
              >
                <div className="text-foreground/80">{skill.icon}</div>
                <div className="text-center">
                  <span className="text-[10px] font-semibold block leading-tight">{skill.labelDe}</span>
                  <span className="text-[8px] text-muted-foreground block">{skill.labelEn}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-bold text-base">Entdecken</h3>
              <p className="text-xs text-muted-foreground">Explore</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {exploreItems.map((item) => (
              <button
                key={item.view}
                onClick={() => item.view === 'quiz' ? handleOpenQuiz() : setActiveView(item.view)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/50 hover:bg-muted/50 hover:shadow-sm active:scale-[0.99] transition-all duration-200 text-left"
              >
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{item.labelDe}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.labelEn} • {item.descEn}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="h-8" />
      </main>
    </div>
  );
};