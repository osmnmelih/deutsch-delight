import { useState, useEffect, useCallback } from 'react';

export interface DailyGoals {
  wordsLearned: number;
  quizzesCompleted: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
}

export interface DailyProgress {
  date: string;
  goals: DailyGoals;
  streakCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: AchievementStats) => boolean;
  unlockedAt?: number;
}

export interface AchievementStats {
  totalWordsLearned: number;
  totalQuizzes: number;
  totalCorrect: number;
  longestStreak: number;
  currentStreak: number;
  daysActive: number;
  perfectQuizzes: number;
}

const DAILY_TARGETS = {
  wordsLearned: 10,
  quizzesCompleted: 3,
  correctAnswers: 20,
  timeSpent: 15
};

const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_word',
    title: 'First Steps',
    description: 'Learn your first word',
    icon: '🌱',
    condition: (stats) => stats.totalWordsLearned >= 1
  },
  {
    id: 'ten_words',
    title: 'Vocabulary Builder',
    description: 'Learn 10 words',
    icon: '📚',
    condition: (stats) => stats.totalWordsLearned >= 10
  },
  {
    id: 'fifty_words',
    title: 'Word Collector',
    description: 'Learn 50 words',
    icon: '🏆',
    condition: (stats) => stats.totalWordsLearned >= 50
  },
  {
    id: 'hundred_words',
    title: 'Vocabulary Master',
    description: 'Learn 100 words',
    icon: '👑',
    condition: (stats) => stats.totalWordsLearned >= 100
  },
  {
    id: 'first_quiz',
    title: 'Quiz Taker',
    description: 'Complete your first quiz',
    icon: '✏️',
    condition: (stats) => stats.totalQuizzes >= 1
  },
  {
    id: 'ten_quizzes',
    title: 'Quiz Champion',
    description: 'Complete 10 quizzes',
    icon: '🎯',
    condition: (stats) => stats.totalQuizzes >= 10
  },
  {
    id: 'perfect_quiz',
    title: 'Perfectionist',
    description: 'Get 100% on a quiz',
    icon: '💯',
    condition: (stats) => stats.perfectQuizzes >= 1
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    description: '3 day streak',
    icon: '🔥',
    condition: (stats) => stats.longestStreak >= 3
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: '7 day streak',
    icon: '⚡',
    condition: (stats) => stats.longestStreak >= 7
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: '30 day streak',
    icon: '🌟',
    condition: (stats) => stats.longestStreak >= 30
  },
  {
    id: 'active_7',
    title: 'Dedicated Learner',
    description: 'Active for 7 days',
    icon: '📅',
    condition: (stats) => stats.daysActive >= 7
  },
  {
    id: 'correct_100',
    title: 'Sharp Mind',
    description: '100 correct answers',
    icon: '🧠',
    condition: (stats) => stats.totalCorrect >= 100
  }
];

const getToday = () => new Date().toISOString().split('T')[0];

export const useDailyGoals = () => {
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [allProgress, setAllProgress] = useState<DailyProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('daily-progress');
    const storedAchievements = localStorage.getItem('achievements');
    
    if (stored) {
      const allData: DailyProgress[] = JSON.parse(stored);
      setAllProgress(allData);
      
      const today = getToday();
      const todayProgress = allData.find(p => p.date === today);
      
      if (todayProgress) {
        setDailyProgress(todayProgress);
      } else {
        // Calculate streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayProgress = allData.find(p => p.date === yesterdayStr);
        
        const newProgress: DailyProgress = {
          date: today,
          goals: { wordsLearned: 0, quizzesCompleted: 0, correctAnswers: 0, timeSpent: 0 },
          streakCount: yesterdayProgress ? yesterdayProgress.streakCount : 0
        };
        setDailyProgress(newProgress);
      }
    } else {
      setDailyProgress({
        date: getToday(),
        goals: { wordsLearned: 0, quizzesCompleted: 0, correctAnswers: 0, timeSpent: 0 },
        streakCount: 0
      });
    }
    
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded || !dailyProgress) return;
    
    const updated = allProgress.filter(p => p.date !== dailyProgress.date);
    updated.push(dailyProgress);
    setAllProgress(updated);
    localStorage.setItem('daily-progress', JSON.stringify(updated));
  }, [dailyProgress, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements, isLoaded]);

  // Calculate achievement stats
  const getStats = useCallback((): AchievementStats => {
    const totalWordsLearned = allProgress.reduce((acc, p) => acc + p.goals.wordsLearned, 0);
    const totalQuizzes = allProgress.reduce((acc, p) => acc + p.goals.quizzesCompleted, 0);
    const totalCorrect = allProgress.reduce((acc, p) => acc + p.goals.correctAnswers, 0);
    const longestStreak = Math.max(...allProgress.map(p => p.streakCount), dailyProgress?.streakCount || 0);
    const currentStreak = dailyProgress?.streakCount || 0;
    const daysActive = allProgress.length;
    
    // Perfect quizzes stored separately
    const perfectQuizzes = parseInt(localStorage.getItem('perfect-quizzes') || '0');
    
    return {
      totalWordsLearned,
      totalQuizzes,
      totalCorrect,
      longestStreak,
      currentStreak,
      daysActive,
      perfectQuizzes
    };
  }, [allProgress, dailyProgress]);

  // Check for new achievements
  const checkAchievements = useCallback(() => {
    const stats = getStats();
    const newlyUnlocked: Achievement[] = [];
    
    ACHIEVEMENTS.forEach(achievement => {
      const isUnlocked = achievements.find(a => a.id === achievement.id);
      if (!isUnlocked && achievement.condition(stats)) {
        const unlocked = { ...achievement, unlockedAt: Date.now() };
        newlyUnlocked.push(unlocked);
      }
    });
    
    if (newlyUnlocked.length > 0) {
      setAchievements(prev => [...prev, ...newlyUnlocked]);
      setNewAchievements(newlyUnlocked);
    }
  }, [achievements, getStats]);

  // Record word learned
  const recordWordLearned = useCallback(() => {
    if (!dailyProgress) return;
    
    setDailyProgress(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        goals: { ...prev.goals, wordsLearned: prev.goals.wordsLearned + 1 }
      };
      
      // Check if daily goal met and update streak
      if (updated.goals.wordsLearned >= DAILY_TARGETS.wordsLearned && 
          prev.goals.wordsLearned < DAILY_TARGETS.wordsLearned) {
        updated.streakCount = prev.streakCount + 1;
      }
      
      return updated;
    });
    
    setTimeout(checkAchievements, 100);
  }, [dailyProgress, checkAchievements]);

  // Record quiz completed
  const recordQuizCompleted = useCallback((correct: number, total: number) => {
    if (!dailyProgress) return;
    
    // Track perfect quizzes
    if (correct === total && total > 0) {
      const current = parseInt(localStorage.getItem('perfect-quizzes') || '0');
      localStorage.setItem('perfect-quizzes', String(current + 1));
    }
    
    setDailyProgress(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        goals: {
          ...prev.goals,
          quizzesCompleted: prev.goals.quizzesCompleted + 1,
          correctAnswers: prev.goals.correctAnswers + correct
        }
      };
    });
    
    setTimeout(checkAchievements, 100);
  }, [dailyProgress, checkAchievements]);

  // Get progress percentage
  const getGoalProgress = useCallback(() => {
    if (!dailyProgress) return { words: 0, quizzes: 0, answers: 0, overall: 0 };
    
    const words = Math.min(100, (dailyProgress.goals.wordsLearned / DAILY_TARGETS.wordsLearned) * 100);
    const quizzes = Math.min(100, (dailyProgress.goals.quizzesCompleted / DAILY_TARGETS.quizzesCompleted) * 100);
    const answers = Math.min(100, (dailyProgress.goals.correctAnswers / DAILY_TARGETS.correctAnswers) * 100);
    const overall = (words + quizzes + answers) / 3;
    
    return { words, quizzes, answers, overall };
  }, [dailyProgress]);

  // Clear new achievements notification
  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  return {
    dailyProgress,
    achievements,
    newAchievements,
    targets: DAILY_TARGETS,
    allAchievements: ACHIEVEMENTS,
    isLoaded,
    recordWordLearned,
    recordQuizCompleted,
    getGoalProgress,
    getStats,
    clearNewAchievements
  };
};
