import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Target, Award, Calendar, BookOpen, Languages, GraduationCap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { vocabularyWords } from '@/data/vocabulary';
import { verbs } from '@/data/verbs';
import { useSRS } from '@/hooks/useSRS';
import { useVerbSRS } from '@/hooks/useVerbSRS';

interface ProgressDashboardProps {
  onBack: () => void;
}

interface DailyProgress {
  date: string;
  wordsLearned: number;
  verbsReviewed: number;
  quizzesCompleted: number;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  
  const { getStats: getVocabStats, getSRSData } = useSRS(vocabularyWords);
  const { getStats: getVerbStats } = useVerbSRS(verbs);
  
  const vocabStats = useMemo(() => getVocabStats(), [getVocabStats]);
  const verbStats = useMemo(() => getVerbStats(), [getVerbStats]);
  
  const totalVocab = vocabularyWords.length;
  const totalVerbs = verbs.length;

  // Generate mock historical data based on current stats
  const generateHistoricalData = (): DailyProgress[] => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const data: DailyProgress[] = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      
      // Simulate growing progress
      const progress = (days - i) / days;
      const randomFactor = 0.5 + Math.random() * 0.5;
      
      data.push({
        date: dateStr,
        wordsLearned: Math.round(vocabStats.learning * progress * randomFactor / 3),
        verbsReviewed: Math.round(verbStats.learning * progress * randomFactor / 3),
        quizzesCompleted: Math.round(5 * progress * randomFactor)
      });
    }
    
    return data;
  };

  const historicalData = useMemo(() => generateHistoricalData(), [timeRange, vocabStats, verbStats]);

  // Vocabulary breakdown by difficulty
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
      { name: 'New', value: newCount, color: 'hsl(var(--muted-foreground))' },
      { name: 'Learning', value: learningCount, color: 'hsl(var(--primary))' },
      { name: 'Mastered', value: masteredCount, color: 'hsl(var(--correct))' }
    ];
  }, [getSRSData]);

  // Verb categories breakdown
  const verbCategoryBreakdown = useMemo(() => {
    const categories = {
      regular: verbs.filter(v => v.category === 'regular').length,
      irregular: verbs.filter(v => v.category === 'irregular').length,
      modal: verbs.filter(v => v.category === 'modal').length,
      separable: verbs.filter(v => v.category === 'separable').length
    };
    
    return [
      { name: 'Regular', count: categories.regular, fill: 'hsl(var(--primary))' },
      { name: 'Irregular', count: categories.irregular, fill: 'hsl(var(--accent))' },
      { name: 'Modal', count: categories.modal, fill: 'hsl(var(--correct))' },
      { name: 'Separable', count: categories.separable, fill: 'hsl(var(--warning))' }
    ];
  }, []);

  // Grammar topics mastery (simulated)
  const grammarTopics = [
    { topic: 'Articles', mastery: 75 },
    { topic: 'Cases', mastery: 45 },
    { topic: 'Prepositions', mastery: 30 },
    { topic: 'Verb Tenses', mastery: 60 },
    { topic: 'Adjectives', mastery: 55 },
    { topic: 'Comparison', mastery: 40 }
  ];

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const vocabProgress = (vocabStats.mastered / Math.max(1, totalVocab)) * 100;
    const verbProgress = (verbStats.mastered / Math.max(1, totalVerbs)) * 100;
    return Math.round((vocabProgress + verbProgress) / 2);
  }, [vocabStats, verbStats, totalVocab, totalVerbs]);

  // Study streak (from localStorage)
  const [studyStreak, setStudyStreak] = useState(0);
  useEffect(() => {
    const dailyGoals = localStorage.getItem('german-daily-goals');
    if (dailyGoals) {
      try {
        const data = JSON.parse(dailyGoals);
        setStudyStreak(data.streakCount || 0);
      } catch (e) {
        setStudyStreak(0);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-xl font-bold">Progress Dashboard</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="card-elevated p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{overallProgress}%</p>
            <p className="text-xs text-muted-foreground">Overall Progress</p>
          </div>
          
          <div className="card-elevated p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-correct/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-correct" />
            </div>
            <p className="text-2xl font-bold">{vocabStats.mastered}</p>
            <p className="text-xs text-muted-foreground">Words Mastered</p>
          </div>
          
          <div className="card-elevated p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
              <Languages className="w-5 h-5 text-accent-foreground" />
            </div>
            <p className="text-2xl font-bold">{verbStats.mastered}</p>
            <p className="text-xs text-muted-foreground">Verbs Learned</p>
          </div>
          
          <div className="card-elevated p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-warning/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl font-bold">{studyStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 justify-center">
          {(['week', 'month', 'all'] as const).map(range => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === 'week' ? '7 Days' : range === 'month' ? '30 Days' : 'All Time'}
            </Button>
          ))}
        </div>

        {/* Learning Activity Chart */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Learning Activity</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVerbs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--correct))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--correct))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  interval={timeRange === 'week' ? 0 : timeRange === 'month' ? 4 : 10}
                />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="wordsLearned" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1}
                  fill="url(#colorWords)"
                  name="Words"
                />
                <Area 
                  type="monotone" 
                  dataKey="verbsReviewed" 
                  stroke="hsl(var(--correct))" 
                  fillOpacity={1}
                  fill="url(#colorVerbs)"
                  name="Verbs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vocabulary & Verb Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Vocabulary Breakdown */}
          <div className="card-elevated p-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold">Vocabulary Status</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vocabularyBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vocabularyBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {vocabularyBreakdown.map(item => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verb Categories */}
          <div className="card-elevated p-4">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold">Verb Categories</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={verbCategoryBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    width={70}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grammar Mastery */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Grammar Mastery</h3>
          </div>
          <div className="space-y-4">
            {grammarTopics.map(topic => (
              <div key={topic.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{topic.topic}</span>
                  <span className="text-muted-foreground">{topic.mastery}%</span>
                </div>
                <Progress value={topic.mastery} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* SRS Due Cards */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Spaced Repetition Status</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-incorrect/10 rounded-xl">
              <p className="text-3xl font-bold text-incorrect">{vocabStats.dueNow}</p>
              <p className="text-sm text-muted-foreground">Vocabulary Due</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-xl">
              <p className="text-3xl font-bold text-primary">{verbStats.dueNow}</p>
              <p className="text-sm text-muted-foreground">Verbs Due</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Review due items regularly to maintain your knowledge!
          </p>
        </div>
      </div>
    </div>
  );
};
