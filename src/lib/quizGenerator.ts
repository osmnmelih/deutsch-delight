import { VocabularyWord, Article } from '@/types/vocabulary';
import { QuizQuestion, QuestionType } from '@/types/quiz';

const articles: Article[] = ['der', 'die', 'das'];

// Generate a unique ID
const generateId = (): string => Math.random().toString(36).substring(2, 9);

// Shuffle array
const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate multiple choice question (English to German) - German prompts
export const generateMultipleChoiceQuestion = (
  word: VocabularyWord,
  allWords: VocabularyWord[]
): QuizQuestion => {
  const wrongOptions = shuffle(
    allWords.filter(w => w.id !== word.id && w.category === word.category)
  ).slice(0, 3);
  
  // If not enough words in category, get from other categories
  if (wrongOptions.length < 3) {
    const moreWords = shuffle(
      allWords.filter(w => w.id !== word.id && !wrongOptions.includes(w))
    ).slice(0, 3 - wrongOptions.length);
    wrongOptions.push(...moreWords);
  }
  
  const options = shuffle([
    word.german,
    ...wrongOptions.map(w => w.german)
  ]);
  
  return {
    id: generateId(),
    type: 'multiple-choice',
    word,
    options,
    correctAnswer: word.german,
    prompt: `Wie heißt "${word.english}" auf Deutsch?`
  };
};

// Generate fill-in-the-blank question - German prompts
export const generateFillBlankQuestion = (word: VocabularyWord): QuizQuestion => {
  // Create a sentence with the article missing - German focus
  const sentences = [
    `Ergänze den Artikel: _____ ${word.german}`,
    `Ich sehe _____ ${word.german}.`,
    `Das ist _____ ${word.german}.`,
    `Wo ist _____ ${word.german}?`
  ];
  
  const prompt = sentences[Math.floor(Math.random() * sentences.length)];
  
  return {
    id: generateId(),
    type: 'fill-blank',
    word,
    correctAnswer: word.article,
    prompt
  };
};

// Generate article selection question - German prompts
export const generateArticleSelectQuestion = (word: VocabularyWord): QuizQuestion => {
  return {
    id: generateId(),
    type: 'article-select',
    word,
    options: articles,
    correctAnswer: word.article,
    prompt: `Welcher Artikel passt zu "${word.german}"?`
  };
};

// Generate a mixed quiz
export const generateQuiz = (
  words: VocabularyWord[],
  allWords: VocabularyWord[],
  questionCount: number = 10
): QuizQuestion[] => {
  const selectedWords = shuffle(words).slice(0, questionCount);
  const questions: QuizQuestion[] = [];
  
  const questionTypes: QuestionType[] = ['multiple-choice', 'fill-blank', 'article-select'];
  
  selectedWords.forEach((word, index) => {
    // Rotate through question types for variety
    const type = questionTypes[index % questionTypes.length];
    
    switch (type) {
      case 'multiple-choice':
        questions.push(generateMultipleChoiceQuestion(word, allWords));
        break;
      case 'fill-blank':
        questions.push(generateFillBlankQuestion(word));
        break;
      case 'article-select':
        questions.push(generateArticleSelectQuestion(word));
        break;
    }
  });
  
  return shuffle(questions);
};

// Generate a quiz of specific type only
export const generateTypedQuiz = (
  words: VocabularyWord[],
  allWords: VocabularyWord[],
  type: QuestionType,
  questionCount: number = 10
): QuizQuestion[] => {
  const selectedWords = shuffle(words).slice(0, questionCount);
  
  return selectedWords.map(word => {
    switch (type) {
      case 'multiple-choice':
        return generateMultipleChoiceQuestion(word, allWords);
      case 'fill-blank':
        return generateFillBlankQuestion(word);
      case 'article-select':
        return generateArticleSelectQuestion(word);
    }
  });
};
