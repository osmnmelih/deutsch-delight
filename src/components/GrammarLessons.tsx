import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronRight, Volume2, Lightbulb, BookOpen, CheckCircle2, Play, Filter, Search, GraduationCap, Star, ChevronDown, X } from 'lucide-react';
import { grammarSections, GrammarLesson, GrammarSection, GrammarLevel } from '@/data/grammar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAudioPronunciation } from '@/hooks/useAudioPronunciation';

interface GrammarLessonsProps {
  onBack: () => void;
}

type ViewMode = 'sections' | 'lessons' | 'lesson-detail';

const levelColors: Record<GrammarLevel, { bg: string; text: string; border: string }> = {
  'A1': { bg: 'bg-correct/15', text: 'text-correct', border: 'border-correct/30' },
  'A2': { bg: 'bg-primary/15', text: 'text-primary', border: 'border-primary/30' },
  'B1': { bg: 'bg-accent/15', text: 'text-accent', border: 'border-accent/30' },
  'B2': { bg: 'bg-die/15', text: 'text-die', border: 'border-die/30' },
};

export const GrammarLessons = ({ onBack }: GrammarLessonsProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('sections');
  const [selectedSection, setSelectedSection] = useState<GrammarSection | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [levelFilter, setLevelFilter] = useState<GrammarLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedGrammarLessons');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const { speak, isSpeaking, isSupported } = useAudioPronunciation({ rate: 0.85 });

  const speakGerman = (text: string) => {
    if (isSupported) {
      // Clean text for better pronunciation
      const cleanText = text
        .replace(/\([^)]*\)/g, '') // Remove parentheses content
        .replace(/→/g, '') // Remove arrows
        .replace(/\.\.\./g, '') // Remove ellipsis
        .trim();
      speak(cleanText);
    }
  };

  const filteredSections = useMemo(() => {
    return grammarSections.map(section => ({
      ...section,
      lessons: section.lessons.filter(lesson => {
        const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
        const matchesSearch = searchQuery === '' || 
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.titleDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLevel && matchesSearch;
      })
    })).filter(section => section.lessons.length > 0);
  }, [levelFilter, searchQuery]);

  const totalLessons = grammarSections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
    localStorage.setItem('completedGrammarLessons', JSON.stringify([...newCompleted]));
  };

  const openSection = (section: GrammarSection) => {
    setSelectedSection(section);
    setViewMode('lessons');
  };

  const openLesson = (lesson: GrammarLesson) => {
    setSelectedLesson(lesson);
    setViewMode('lesson-detail');
  };

  const goBack = () => {
    if (viewMode === 'lesson-detail') {
      setViewMode('lessons');
      setSelectedLesson(null);
    } else if (viewMode === 'lessons') {
      setViewMode('sections');
      setSelectedSection(null);
    } else {
      onBack();
    }
  };

  // Lesson Detail View
  if (viewMode === 'lesson-detail' && selectedLesson) {
    return (
      <LessonDetailView 
        lesson={selectedLesson} 
        onBack={goBack} 
        speakGerman={speakGerman}
        isSpeaking={isSpeaking}
        isCompleted={completedLessons.has(selectedLesson.id)}
        onToggleComplete={() => markLessonComplete(selectedLesson.id)}
      />
    );
  }

  // Lessons List View
  if (viewMode === 'lessons' && selectedSection) {
    const sectionLessons = selectedSection.lessons.filter(lesson => {
      const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
      const matchesSearch = searchQuery === '' || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.titleDe.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    });

    return (
      <div className="min-h-screen bg-background safe-area-inset flex flex-col">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
          <div className="flex items-center gap-3 p-4">
            <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedSection.icon}</span>
                <h1 className="font-heading text-xl font-bold">{selectedSection.title}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{sectionLessons.length} lessons</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sectionLessons.map((lesson, index) => {
            const colors = levelColors[lesson.level];
            const isCompleted = completedLessons.has(lesson.id);
            
            return (
              <button
                key={lesson.id}
                onClick={() => openLesson(lesson)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all duration-200",
                  "hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
                  isCompleted ? "bg-correct/5 border-correct/20" : "bg-card border-border/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                    isCompleted ? "bg-correct/20 text-correct" : colors.bg + " " + colors.text
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        colors.bg, colors.text
                      )}>
                        {lesson.level}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground truncate">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.titleDe}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            );
          })}
          <div className="h-8" />
        </div>
      </div>
    );
  }

  // Sections Overview
  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold">German Grammar</h1>
            <p className="text-sm text-muted-foreground">{totalLessons} lessons • {completedCount} completed</p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showFilters ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="font-medium text-primary">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 pb-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(['all', 'A1', 'A2', 'B1', 'B2'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    levelFilter === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Level Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          {(['A1', 'A2', 'B1', 'B2'] as GrammarLevel[]).map((level) => {
            const colors = levelColors[level];
            const levelLessons = grammarSections.flatMap(s => s.lessons.filter(l => l.level === level));
            const completed = levelLessons.filter(l => completedLessons.has(l.id)).length;
            
            return (
              <button
                key={level}
                onClick={() => setLevelFilter(levelFilter === level ? 'all' : level)}
                className={cn(
                  "p-3 rounded-xl text-center transition-all",
                  levelFilter === level ? colors.bg + " " + colors.border + " border-2" : "bg-muted/30 border border-transparent",
                  "hover:shadow-sm"
                )}
              >
                <div className={cn("text-lg font-bold", levelFilter === level ? colors.text : "text-foreground")}>{level}</div>
                <div className="text-xs text-muted-foreground">{completed}/{levelLessons.length}</div>
              </button>
            );
          })}
        </div>

        {/* Sections */}
        {filteredSections.map((section) => {
          const sectionCompleted = section.lessons.filter(l => completedLessons.has(l.id)).length;
          const sectionProgress = Math.round((sectionCompleted / section.lessons.length) * 100);

          return (
            <button
              key={section.id}
              onClick={() => openSection(section)}
              className="w-full text-left p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.titleDe}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={sectionProgress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {sectionCompleted}/{section.lessons.length}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No lessons match your filters</p>
            <button 
              onClick={() => { setLevelFilter('all'); setSearchQuery(''); }}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
};

// Lesson Detail Component
interface LessonDetailViewProps {
  lesson: GrammarLesson;
  onBack: () => void;
  speakGerman: (text: string) => void;
  isSpeaking: boolean;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const LessonDetailView = ({ lesson, onBack, speakGerman, isSpeaking, isCompleted, onToggleComplete }: LessonDetailViewProps) => {
  const [showExercises, setShowExercises] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const colors = levelColors[lesson.level];

  const checkAnswer = () => {
    setShowAnswer(true);
  };

  const nextExercise = () => {
    if (lesson.exercises && currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserAnswer('');
      setShowAnswer(false);
    } else {
      setShowExercises(false);
      setCurrentExercise(0);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", colors.bg, colors.text)}>
                {lesson.level}
              </span>
              <span className="text-xs text-muted-foreground">Lesson {lesson.number}</span>
            </div>
            <h1 className="font-heading text-lg font-bold truncate">{lesson.title}</h1>
          </div>
          <button
            onClick={onToggleComplete}
            className={cn(
              "p-2 rounded-full transition-colors",
              isCompleted ? "bg-correct/20 text-correct" : "hover:bg-muted text-muted-foreground"
            )}
          >
            <CheckCircle2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* German Title with Audio */}
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-muted-foreground">{lesson.titleDe}</h2>
          <button 
            onClick={() => speakGerman(lesson.titleDe)}
            disabled={isSpeaking}
            className={cn(
              "p-2 rounded-full transition-colors",
              isSpeaking ? "bg-primary/20 text-primary animate-pulse" : "hover:bg-muted text-muted-foreground"
            )}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{lesson.description}</p>

        {/* Key Points */}
        <div className="space-y-3">
          <h3 className="font-heading font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Key Points
          </h3>
          <div className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground flex-1">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-3">
          <h3 className="font-heading font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Examples
          </h3>
          <div className="space-y-2">
            {lesson.examples.map((example, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">
                    {example.highlight ? (
                      <>
                        {example.german.split(example.highlight).map((part, j, arr) => (
                          <span key={j}>
                            {part}
                            {j < arr.length - 1 && (
                              <span className="text-primary font-bold bg-primary/10 px-1 rounded">
                                {example.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                      </>
                    ) : example.german}
                  </p>
                  <button 
                    onClick={() => speakGerman(example.german)}
                    disabled={isSpeaking}
                    className={cn(
                      "p-1.5 rounded-full transition-colors",
                      isSpeaking ? "text-primary animate-pulse" : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{example.english}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        {lesson.tips && lesson.tips.length > 0 && (
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-accent" />
              Pro Tips
            </h3>
            <ul className="space-y-2">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="space-y-3">
            {!showExercises ? (
              <Button 
                onClick={() => setShowExercises(true)}
                className="w-full gap-2"
                size="lg"
              >
                <Play className="w-5 h-5" />
                Practice Exercises ({lesson.exercises.length})
              </Button>
            ) : (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold">
                    Exercise {currentExercise + 1}/{lesson.exercises.length}
                  </h3>
                  <button 
                    onClick={() => setShowExercises(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="font-medium">{lesson.exercises[currentExercise].question}</p>
                  
                  {lesson.exercises[currentExercise].hint && !showAnswer && (
                    <p className="text-sm text-muted-foreground italic">
                      Hint: {lesson.exercises[currentExercise].hint}
                    </p>
                  )}

                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={showAnswer}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />

                  {showAnswer && (
                    <div className={cn(
                      "p-3 rounded-xl",
                      userAnswer.toLowerCase().trim() === lesson.exercises[currentExercise].answer.toLowerCase().trim()
                        ? "bg-correct/10 border border-correct/30"
                        : "bg-incorrect/10 border border-incorrect/30"
                    )}>
                      <p className="font-medium">
                        {userAnswer.toLowerCase().trim() === lesson.exercises[currentExercise].answer.toLowerCase().trim()
                          ? "✓ Correct!"
                          : "✗ Not quite"}
                      </p>
                      <p className="text-sm mt-1">
                        Answer: <span className="font-medium">{lesson.exercises[currentExercise].answer}</span>
                      </p>
                      <button 
                        onClick={() => speakGerman(lesson.exercises![currentExercise].answer)}
                        className="flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
                      >
                        <Volume2 className="w-4 h-4" /> Listen
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!showAnswer ? (
                      <Button onClick={checkAnswer} className="flex-1">
                        Check Answer
                      </Button>
                    ) : (
                      <Button onClick={nextExercise} className="flex-1">
                        {currentExercise < lesson.exercises.length - 1 ? 'Next Exercise' : 'Finish'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mark Complete */}
        <Button
          onClick={onToggleComplete}
          variant={isCompleted ? "outline" : "default"}
          className="w-full gap-2"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5" />
          {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Button>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default GrammarLessons;
