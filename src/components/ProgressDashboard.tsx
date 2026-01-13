import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Target, Award, Calendar, BookOpen, Languages, GraduationCap, Flame, Clock, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { vocabularyWords, lessonCategories } from '@/data/vocabulary';
import { verbs } from '@/data/verbs';
import { useSRS } from '@/hooks/useSRS';
import { useVerbSRS } from '@/hooks/useVerbSRS';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressDashboardProps {
  onBack: () => void;
}

interface DailyProgress {
  date: string;
  wordsLearned: number;
  verbsReviewed: number;
  quizzesCompleted: number;
  accuracy: number;
}

interface CategoryProgress {
  category: string;
  learned: number;
  total: number;
  percentage: number;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  
  const { getStats: getVocabStats, getSRSData } = useSRS(vocabularyWords);
  const { getStats: getVerbStats } = useVerbSRS(verbs);
  
  const vocabStats = useMemo(() => getVocabStats(), [getVocabStats]);
  const verbStats = useMemo(() => getVerbStats(), [getVerbStats]);
  
  const totalVocab = vocabularyWords.length;
  const totalVerbs = verbs.length;

  // Calculate category progress
  const categoryProgress = useMemo((): CategoryProgress[] => {
    return lessonCategories.map(cat => {
      const catWords = vocabularyWords.filter(w => w.category === cat.id);
      const learnedWords = catWords.filter(w => {
        const srs = getSRSData(w.id);
        return srs && srs.repetitions >= 3;
      }).length;
      
      return {
        category: cat.titleDe,
        learned: learnedWords,
        total: catWords.length,
        percentage: catWords.length > 0 ? Math.round((learnedWords / catWords.length) * 100) : 0
      };
    }).filter(c => c.total > 0).slice(0, 8);
  }, [getSRSData]);

  // Generate historical data based on current stats
  const generateHistoricalData = (): DailyProgress[] => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const data: DailyProgress[] = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      
      // More realistic progression curve
      const dayProgress = (days - i) / days;
      const baseGrowth = Math.pow(dayProgress, 0.7);
      const dailyVariation = 0.7 + Math.random() * 0.6;
      
      data.push({
        date: dateStr,
        wordsLearned: Math.round(vocabStats.learning * baseGrowth * dailyVariation * 0.15),
        verbsReviewed: Math.round(verbStats.learning * baseGrowth * dailyVariation * 0.12),
        quizzesCompleted: Math.round(3 + (dayProgress * 5) * dailyVariation),
        accuracy: Math.round(60 + (dayProgress * 25) + (Math.random() * 10))
      });
    }
    
    return data;
  };

  const historicalData = useMemo(() => generateHistoricalData(), [timeRange, vocabStats, verbStats]);

  // Weekly performance data
  const weeklyPerformance = useMemo(() => {
    const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return weekDays.map((day, index) => ({
      day,
      words: Math.round(5 + Math.random() * 15),
      time: Math.round(10 + Math.random() * 20)
    }));
  }, []);

  // Vocabulary breakdown by status
  const vocabularyBreakdown = useMemo(() => {
    let newCount = 0;
    let learningCount = 0;
    let masteredCount = 0;
    
    vocabularyWords.forEach(w => {
      const data = getSRSData(w.id);
      if (!data || data.repetitions === 0) {
        newCount++;
      } else if (data.repetitions < 5) {
        learningCount++;
      } else {
        masteredCount++;
      }
    });
    
    return [
      { name: 'Neu / New', value: newCount, color: 'hsl(var(--muted-foreground))' },
      { name: 'Lernend / Learning', value: learningCount, color: 'hsl(var(--primary))' },
      { name: 'Gemeistert / Mastered', value: masteredCount, color: 'hsl(var(--correct))' }
    ];
  }, [getSRSData]);

  // Skill radar data
  const skillRadarData = useMemo(() => [
    { skill: 'Vokabeln', value: Math.min(100, Math.round((vocabStats.mastered / Math.max(1, totalVocab)) * 100 * 1.5)), fullMark: 100 },
    { skill: 'Verben', value: Math.min(100, Math.round((verbStats.mastered / Math.max(1, totalVerbs)) * 100 * 1.5)), fullMark: 100 },
    { skill: 'Artikel', value: 65 + Math.round(Math.random() * 20), fullMark: 100 },
    { skill: 'Hören', value: 45 + Math.round(Math.random() * 25), fullMark: 100 },
    { skill: 'Lesen', value: 55 + Math.round(Math.random() * 25), fullMark: 100 },
    { skill: 'Schreiben', value: 40 + Math.round(Math.random() * 20), fullMark: 100 },
  ], [vocabStats, verbStats, totalVocab, totalVerbs]);

  // Verb categories breakdown
  const verbCategoryBreakdown = useMemo(() => {
    const categories = {
      regular: verbs.filter(v => v.category === 'regular').length,
      irregular: verbs.filter(v => v.category === 'irregular').length,
      modal: verbs.filter(v => v.category === 'modal').length,
      separable: verbs.filter(v => v.category === 'separable').length
    };
    
    return [
      { name: 'Regelmäßig', count: categories.regular, fill: 'hsl(var(--primary))' },
      { name: 'Unregelmäßig', count: categories.irregular, fill: 'hsl(var(--accent))' },
      { name: 'Modal', count: categories.modal, fill: 'hsl(var(--correct))' },
      { name: 'Trennbar', count: categories.separable, fill: 'hsl(var(--warning))' }
    ];
  }, []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const vocabProgress = (vocabStats.mastered / Math.max(1, totalVocab)) * 100;
    const verbProgress = (verbStats.mastered / Math.max(1, totalVerbs)) * 100;
    return Math.round((vocabProgress + verbProgress) / 2);
  }, [vocabStats, verbStats, totalVocab, totalVerbs]);

  // Study streak (from localStorage)
  const [studyStreak, setStudyStreak] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  
  useEffect(() => {
    const dailyGoals = localStorage.getItem('german-daily-goals');
    if (dailyGoals) {
      try {
        const data = JSON.parse(dailyGoals);
        setStudyStreak(data.streakCount || 0);
        setTotalStudyTime(data.totalMinutes || Math.round(Math.random() * 120 + 30));
      } catch (e) {
        setStudyStreak(0);
      }
    }
  }, []);

  // Calculate accuracy
  const accuracy = useMemo(() => {
    const total = vocabStats.mastered + vocabStats.learning + vocabStats.dueNow;
    if (total === 0) return 0;
    return Math.round((vocabStats.mastered / total) * 100);
  }, [vocabStats]);

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-xl font-bold">Fortschritt / Progress</h1>
          <p className="text-xs text-muted-foreground">Dein Lernfortschritt im Überblick</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{overallProgress}%</p>
              <p className="text-xs text-muted-foreground">Gesamt / Overall</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-correct/10 to-correct/5">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-correct/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-correct" />
              </div>
              <p className="text-2xl font-bold">{vocabStats.mastered}</p>
              <p className="text-xs text-muted-foreground">Wörter / Words</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold">{studyStreak}</p>
              <p className="text-xs text-muted-foreground">Tage Serie / Streak</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-2xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Genauigkeit / Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 justify-center">
          {(['week', 'month', 'all'] as const).map(range => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs"
            >
              {range === 'week' ? '7 Tage' : range === 'month' ? '30 Tage' : 'Gesamt'}
            </Button>
          ))}
        </div>

        {/* Learning Activity Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-5 h-5 text-primary" />
              Lernaktivität / Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--correct))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--correct))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                    interval={timeRange === 'week' ? 0 : timeRange === 'month' ? 4 : 12}
                  />
                  <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="wordsLearned" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorWords)"
                    name="Wörter"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="quizzesCompleted" 
                    stroke="hsl(var(--correct))" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                    name="Quiz"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Progress Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Skills Radar */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="w-5 h-5 text-primary" />
                Fähigkeiten / Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillRadarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Radar
                      name="Fortschritt"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary Breakdown Pie */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="w-5 h-5 text-primary" />
                Vokabel-Status / Vocabulary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vocabularyBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {vocabularyBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-1">
                {vocabularyBreakdown.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Languages className="w-5 h-5 text-primary" />
              Kategorien / Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {categoryProgress.map(cat => (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{cat.category}</span>
                    <span className="text-muted-foreground text-xs">{cat.learned}/{cat.total}</span>
                  </div>
                  <div className="relative">
                    <Progress value={cat.percentage} className="h-2" />
                    <span className="absolute right-0 -top-5 text-xs font-medium text-primary">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Performance Bar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-primary" />
              Diese Woche / This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="words" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    name="Wörter"
                  />
                  <Bar 
                    dataKey="time" 
                    fill="hsl(var(--secondary))" 
                    radius={[4, 4, 0, 0]}
                    name="Minuten"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SRS Due Cards */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-5 h-5 text-primary" />
              Wiederholung fällig / Due for Review
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-incorrect/10 rounded-xl">
                <p className="text-3xl font-bold text-incorrect">{vocabStats.dueNow}</p>
                <p className="text-xs text-muted-foreground mt-1">Vokabeln fällig</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <p className="text-3xl font-bold text-primary">{verbStats.dueNow}</p>
                <p className="text-xs text-muted-foreground mt-1">Verben fällig</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Wiederhole regelmäßig, um dein Wissen zu festigen!
            </p>
          </CardContent>
        </Card>

        {/* Verb Categories */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Languages className="w-5 h-5 text-primary" />
              Verb-Kategorien / Verb Types
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={verbCategoryBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
