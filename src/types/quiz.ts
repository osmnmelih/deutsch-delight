import { VocabularyWord, Article } from './vocabulary';

export type QuestionType = 'multiple-choice' | 'fill-blank' | 'article-select';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  word: VocabularyWord;
  options?: string[];
  correctAnswer: string;
  prompt: string;
}

export interface QuizResult {
  questionId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeTaken: number;
}

export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  results: QuizResult[];
  startTime: number;
}
