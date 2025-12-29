export type Article = 'der' | 'die' | 'das';

export interface VocabularyWord {
  id: string;
  german: string;
  english: string;
  article: Article;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LessonCategory {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  description: string;
  wordCount: number;
  progress: number;
  color: string;
}

export interface UserProgress {
  totalWords: number;
  masteredWords: number;
  currentStreak: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
