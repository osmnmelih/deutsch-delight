export interface SRSData {
  wordId: string;
  easeFactor: number; // Difficulty multiplier (1.3 - 2.5)
  interval: number; // Days until next review
  repetitions: number; // Consecutive correct answers
  lastReview: string | null; // ISO date string
  nextReview: string; // ISO date string
  correctCount: number;
  incorrectCount: number;
}

export interface SRSStats {
  dueNow: number;
  learning: number;
  mastered: number;
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout
// 1 - Incorrect, but recognized after seeing answer
// 2 - Incorrect, but easy to recall after seeing answer
// 3 - Correct with difficulty
// 4 - Correct with hesitation
// 5 - Perfect recall
