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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, BookOpen, Brain, Flame, List, GraduationCap, FileQuestion, 
  Languages, MessageSquare, Headphones, Layers, Scale, ArrowLeftRight, 
  Clock, BarChart3, BookMarked, PenLine, Users, Keyboard, Globe, 
  MessageCircle, ChevronRight
} from 'lucide-react';
import { lessonCategories } from '@/data/vocabulary';
import { UserProgress, VocabularyWord } from '@/types/vocabulary';
import { vocabularyWords } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { QuestionType } from '@/types/quiz';
import { toast } from 'sonner';

type ActiveView = 
  | 'home' | 'vocabulary' | 'grammar' | 'quiz' | 'verbs' | 'achievements' 
  | 'sentences' | 'listening' | 'verbQuiz' | 'verbFlashcards' | 'caseQuiz' 
  | 'prepositions' | 'numbersTime' | 'dashboard' | 'reading' | 'writing' 
  | 'conversations' | 'dictation' | 'culture' | 'phraseReview';

interface SkillButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'accent';
  badge?: string;
}

const SkillButton = ({ icon, label, onClick, variant = 'default', badge }: SkillButtonProps) => {
  const variants = {
    default: 'bg-card hover:bg-muted border border-border',
    primary: 'bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary',
    accent: 'bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all hover:scale-105 relative`}
    >
      {badge && (
        <Badge className="absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0 bg-accent text-accent-foreground">
          {badge}
        </Badge>
      )}
      {icon}
      <span className="text-[11px] font-medium text-center leading-tight">{label}</span>
    </button>
  );
};

export const HomeScreen = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [categories, setCategories] = useState(lessonCategories);
  const [quizType, setQuizType] = useState<QuestionType | 'mixed'>('mixed');
  const [activeTab, setActiveTab] = useState('practice');
  
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

  const globalStats = useMemo(() => getStats(), [getStats]);
  
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: vocabularyWords.length,
    masteredWords: 0,
    currentStreak: dailyProgress?.streakCount || 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  
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
  
  const handleOpenQuiz = (type: QuestionType | 'mixed' = 'mixed') => {
    setQuizType(type);
    setGameWords(vocabularyWords);
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
  
  const handlePracticeWord = (word: VocabularyWord) => {
    setGameWords([word]);
    setActiveGame('single-word');
    setActiveView('home');
  };

  // View rendering
  const viewComponents: Record<ActiveView, JSX.Element | null> = {
    home: null,
    vocabulary: <VocabularyList words={vocabularyWords} getSRSData={getSRSData} getWordDifficulty={getWordDifficulty} onBack={handleBack} onPracticeWord={handlePracticeWord} />,
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
    quiz: <Quiz words={gameWords} allWords={vocabularyWords} onBack={handleBack} onComplete={handleQuizComplete} onRecordReview={recordReview} quizType={quizType} />,
  };

  if (activeView !== 'home' && viewComponents[activeView]) {
    return viewComponents[activeView];
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
      
      <main className="container px-4 py-4 space-y-4">
        {/* Welcome & Quick Start */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Guten Tag! 👋</h2>
            <p className="text-sm text-muted-foreground">Ready to learn German?</p>
          </div>
          <Button onClick={handleQuickPractice} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Quick Start
          </Button>
        </div>

        {/* SRS Review Banner */}
        {srsLoaded && globalStats.dueNow > 0 && (
          <button 
            onClick={handleReviewDue}
            className="w-full bg-gradient-to-r from-primary to-accent p-3 rounded-xl text-left flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-primary-foreground text-sm">
                  {globalStats.dueNow} words to review
                </p>
                <p className="text-xs text-primary-foreground/80">Tap to practice due words</p>
              </div>
            </div>
            <Flame className="w-5 h-5 text-primary-foreground animate-pulse" />
          </button>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-10">
            <TabsTrigger value="practice" className="text-xs">Practice</TabsTrigger>
            <TabsTrigger value="learn" className="text-xs">Learn</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="explore" className="text-xs">Explore</TabsTrigger>
          </TabsList>

          {/* Practice Tab */}
          <TabsContent value="practice" className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <SkillButton 
                icon={<Sparkles className="w-5 h-5" />} 
                label="Practice" 
                onClick={handleQuickPractice}
                variant="primary"
              />
              <SkillButton 
                icon={<FileQuestion className="w-5 h-5" />} 
                label="Quiz" 
                onClick={() => handleOpenQuiz('mixed')}
              />
              <SkillButton 
                icon={<BookOpen className="w-5 h-5" />} 
                label="Review" 
                onClick={handleReviewDue}
                badge={globalStats.dueNow > 0 ? `${globalStats.dueNow}` : undefined}
              />
              <SkillButton 
                icon={<Layers className="w-5 h-5" />} 
                label="Flashcards" 
                onClick={() => setActiveView('verbFlashcards')}
              />
            </div>

            {/* Daily Goals */}
            <DailyGoalsCard onViewAchievements={() => setActiveView('achievements')} />

            {/* SRS Stats */}
            <Card className="card-elevated">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="font-heading font-semibold text-sm">Spaced Repetition</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-incorrect/10 p-2 rounded-lg">
                    <p className="text-lg font-bold text-incorrect">{globalStats.dueNow}</p>
                    <p className="text-[10px] text-muted-foreground">Due</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-lg font-bold text-primary">{globalStats.learning}</p>
                    <p className="text-[10px] text-muted-foreground">Learning</p>
                  </div>
                  <div className="bg-correct/10 p-2 rounded-lg">
                    <p className="text-lg font-bold text-correct">{globalStats.mastered}</p>
                    <p className="text-[10px] text-muted-foreground">Mastered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn" className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <SkillButton 
                icon={<List className="w-5 h-5" />} 
                label="Vocabulary" 
                onClick={() => setActiveView('vocabulary')}
              />
              <SkillButton 
                icon={<GraduationCap className="w-5 h-5" />} 
                label="Grammar" 
                onClick={() => setActiveView('grammar')}
              />
              <SkillButton 
                icon={<Languages className="w-5 h-5" />} 
                label="Verbs" 
                onClick={() => setActiveView('verbs')}
              />
              <SkillButton 
                icon={<Scale className="w-5 h-5" />} 
                label="Cases" 
                onClick={() => setActiveView('caseQuiz')}
              />
              <SkillButton 
                icon={<ArrowLeftRight className="w-5 h-5" />} 
                label="Preps" 
                onClick={() => setActiveView('prepositions')}
              />
              <SkillButton 
                icon={<Clock className="w-5 h-5" />} 
                label="Numbers" 
                onClick={() => setActiveView('numbersTime')}
              />
              <SkillButton 
                icon={<MessageSquare className="w-5 h-5" />} 
                label="Sentences" 
                onClick={() => setActiveView('sentences')}
              />
              <SkillButton 
                icon={<Languages className="w-5 h-5" />} 
                label="Verb Quiz" 
                onClick={() => setActiveView('verbQuiz')}
              />
            </div>

            {/* Word Categories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-sm">Word Categories</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveView('vocabulary')} className="text-xs gap-1">
                  See all <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {categories.slice(0, 4).map((lesson, index) => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    onSelect={handleSelectLesson}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <SkillButton 
                icon={<Headphones className="w-5 h-5" />} 
                label="Listening" 
                onClick={() => setActiveView('listening')}
              />
              <SkillButton 
                icon={<Keyboard className="w-5 h-5" />} 
                label="Dictation" 
                onClick={() => setActiveView('dictation')}
                variant="accent"
              />
              <SkillButton 
                icon={<BookMarked className="w-5 h-5" />} 
                label="Reading" 
                onClick={() => setActiveView('reading')}
              />
              <SkillButton 
                icon={<PenLine className="w-5 h-5" />} 
                label="Writing" 
                onClick={() => setActiveView('writing')}
              />
              <SkillButton 
                icon={<Users className="w-5 h-5" />} 
                label="Dialogs" 
                onClick={() => setActiveView('conversations')}
              />
              <SkillButton 
                icon={<MessageCircle className="w-5 h-5" />} 
                label="Phrases" 
                onClick={() => setActiveView('phraseReview')}
                variant="primary"
              />
              <SkillButton 
                icon={<BarChart3 className="w-5 h-5" />} 
                label="Stats" 
                onClick={() => setActiveView('dashboard')}
              />
              <SkillButton 
                icon={<Globe className="w-5 h-5" />} 
                label="Culture" 
                onClick={() => setActiveView('culture')}
                variant="accent"
              />
            </div>

            {/* Progress Summary */}
            <ProgressCard progress={progress} />
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="mt-4 space-y-4">
            {/* Featured Section */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-secondary/20 to-primary/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="font-heading font-bold">German Culture & Idioms</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn authentic expressions, proverbs, and cultural tips
                  </p>
                  <Button size="sm" onClick={() => setActiveView('culture')}>
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* All Activities */}
            <div>
              <h3 className="font-heading font-semibold text-sm mb-3">All Activities</h3>
              <div className="grid gap-2">
                {[
                  { icon: <Keyboard className="w-4 h-4" />, label: 'Dictation', desc: 'Listen and type', view: 'dictation' as ActiveView },
                  { icon: <Users className="w-4 h-4" />, label: 'Conversations', desc: 'Practice dialogues', view: 'conversations' as ActiveView },
                  { icon: <MessageCircle className="w-4 h-4" />, label: 'Phrase Review', desc: 'SRS for phrases', view: 'phraseReview' as ActiveView },
                  { icon: <BookMarked className="w-4 h-4" />, label: 'Reading', desc: 'Comprehension exercises', view: 'reading' as ActiveView },
                  { icon: <PenLine className="w-4 h-4" />, label: 'Writing', desc: 'Compose German texts', view: 'writing' as ActiveView },
                ].map((item) => (
                  <button
                    key={item.view}
                    onClick={() => setActiveView(item.view)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Spacing */}
        <div className="h-4" />
      </main>
    </div>
  );
};
