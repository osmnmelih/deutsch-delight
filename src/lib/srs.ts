import { SRSData, ReviewQuality, SRSStats } from '@/types/srs';

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export function createInitialSRSData(wordId: string): SRSData {
  return {
    wordId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    lastReview: null,
    nextReview: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0,
  };
}

export function calculateNextReview(
  srsData: SRSData,
  quality: ReviewQuality
): SRSData {
  const now = new Date();
  let { easeFactor, interval, repetitions, correctCount, incorrectCount } = srsData;

  // Update counts
  if (quality >= 3) {
    correctCount++;
  } else {
    incorrectCount++;
  }

  // SM-2 algorithm adaptation
  if (quality < 3) {
    // Failed review - reset
    repetitions = 0;
    interval = 0;
  } else {
    // Successful review
    if (repetitions === 0) {
      interval = 1; // 1 day
    } else if (repetitions === 1) {
      interval = 3; // 3 days
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }

  // Update ease factor based on quality
  easeFactor = Math.max(
    MIN_EASE_FACTOR,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate next review date
  const nextReviewDate = new Date(now);
  if (interval === 0) {
    // Show again in current session (add minutes instead of days)
    nextReviewDate.setMinutes(nextReviewDate.getMinutes() + 10);
  } else {
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  }

  return {
    ...srsData,
    easeFactor,
    interval,
    repetitions,
    lastReview: now.toISOString(),
    nextReview: nextReviewDate.toISOString(),
    correctCount,
    incorrectCount,
  };
}

export function isDue(srsData: SRSData): boolean {
  const now = new Date();
  const nextReview = new Date(srsData.nextReview);
  return now >= nextReview;
}

export function getPriority(srsData: SRSData): number {
  // Higher priority = more urgent to review
  // Factors: overdue time, difficulty (inverse of ease factor), fewer repetitions
  const now = new Date();
  const nextReview = new Date(srsData.nextReview);
  const overdueDays = (now.getTime() - nextReview.getTime()) / (1000 * 60 * 60 * 24);
  
  // Base priority from overdue status
  let priority = Math.max(0, overdueDays) * 10;
  
  // Add priority for difficult words (lower ease factor = higher priority)
  priority += (DEFAULT_EASE_FACTOR - srsData.easeFactor) * 5;
  
  // Add priority for words with fewer repetitions
  priority += Math.max(0, 5 - srsData.repetitions) * 2;
  
  // Add priority for words with more incorrect answers
  const errorRate = srsData.incorrectCount / Math.max(1, srsData.correctCount + srsData.incorrectCount);
  priority += errorRate * 10;
  
  return priority;
}

export function sortByPriority(srsDataList: SRSData[]): SRSData[] {
  return [...srsDataList].sort((a, b) => getPriority(b) - getPriority(a));
}

export function getDueWords(srsDataList: SRSData[]): SRSData[] {
  return srsDataList.filter(isDue);
}

export function calculateStats(srsDataList: SRSData[]): SRSStats {
  const dueNow = srsDataList.filter(isDue).length;
  const mastered = srsDataList.filter(srs => srs.repetitions >= 5 && srs.easeFactor >= 2.0).length;
  const learning = srsDataList.length - mastered;
  
  return { dueNow, learning, mastered };
}

export function qualityFromCorrect(isCorrect: boolean, responseTime?: number): ReviewQuality {
  if (!isCorrect) {
    return 1; // Incorrect but will see correct answer
  }
  
  // If we have response time, use it to determine quality
  if (responseTime !== undefined) {
    if (responseTime < 2000) return 5; // Very fast = perfect
    if (responseTime < 4000) return 4; // Fast = good
    return 3; // Slow = correct with difficulty
  }
  
  return 4; // Default correct
}
