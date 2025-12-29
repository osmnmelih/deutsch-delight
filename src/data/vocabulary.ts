import { VocabularyWord, LessonCategory } from '@/types/vocabulary';

export const vocabularyWords: VocabularyWord[] = [
  // Animals
  { id: '1', german: 'Hund', english: 'dog', article: 'der', category: 'animals', difficulty: 'beginner' },
  { id: '2', german: 'Katze', english: 'cat', article: 'die', category: 'animals', difficulty: 'beginner' },
  { id: '3', german: 'Pferd', english: 'horse', article: 'das', category: 'animals', difficulty: 'beginner' },
  { id: '4', german: 'Vogel', english: 'bird', article: 'der', category: 'animals', difficulty: 'beginner' },
  { id: '5', german: 'Maus', english: 'mouse', article: 'die', category: 'animals', difficulty: 'beginner' },
  { id: '6', german: 'Schwein', english: 'pig', article: 'das', category: 'animals', difficulty: 'beginner' },
  
  // Food
  { id: '7', german: 'Apfel', english: 'apple', article: 'der', category: 'food', difficulty: 'beginner' },
  { id: '8', german: 'Banane', english: 'banana', article: 'die', category: 'food', difficulty: 'beginner' },
  { id: '9', german: 'Brot', english: 'bread', article: 'das', category: 'food', difficulty: 'beginner' },
  { id: '10', german: 'Käse', english: 'cheese', article: 'der', category: 'food', difficulty: 'beginner' },
  { id: '11', german: 'Milch', english: 'milk', article: 'die', category: 'food', difficulty: 'beginner' },
  { id: '12', german: 'Ei', english: 'egg', article: 'das', category: 'food', difficulty: 'beginner' },
  
  // House
  { id: '13', german: 'Tisch', english: 'table', article: 'der', category: 'house', difficulty: 'beginner' },
  { id: '14', german: 'Lampe', english: 'lamp', article: 'die', category: 'house', difficulty: 'beginner' },
  { id: '15', german: 'Fenster', english: 'window', article: 'das', category: 'house', difficulty: 'beginner' },
  { id: '16', german: 'Stuhl', english: 'chair', article: 'der', category: 'house', difficulty: 'beginner' },
  { id: '17', german: 'Tür', english: 'door', article: 'die', category: 'house', difficulty: 'beginner' },
  { id: '18', german: 'Bett', english: 'bed', article: 'das', category: 'house', difficulty: 'beginner' },
  
  // Nature
  { id: '19', german: 'Baum', english: 'tree', article: 'der', category: 'nature', difficulty: 'beginner' },
  { id: '20', german: 'Blume', english: 'flower', article: 'die', category: 'nature', difficulty: 'beginner' },
  { id: '21', german: 'Wasser', english: 'water', article: 'das', category: 'nature', difficulty: 'beginner' },
  { id: '22', german: 'Berg', english: 'mountain', article: 'der', category: 'nature', difficulty: 'intermediate' },
  { id: '23', german: 'Sonne', english: 'sun', article: 'die', category: 'nature', difficulty: 'beginner' },
  { id: '24', german: 'Meer', english: 'sea', article: 'das', category: 'nature', difficulty: 'intermediate' },
  
  // Body
  { id: '25', german: 'Kopf', english: 'head', article: 'der', category: 'body', difficulty: 'beginner' },
  { id: '26', german: 'Hand', english: 'hand', article: 'die', category: 'body', difficulty: 'beginner' },
  { id: '27', german: 'Auge', english: 'eye', article: 'das', category: 'body', difficulty: 'beginner' },
  { id: '28', german: 'Fuß', english: 'foot', article: 'der', category: 'body', difficulty: 'beginner' },
  { id: '29', german: 'Nase', english: 'nose', article: 'die', category: 'body', difficulty: 'beginner' },
  { id: '30', german: 'Ohr', english: 'ear', article: 'das', category: 'body', difficulty: 'beginner' },
];

export const lessonCategories: LessonCategory[] = [
  {
    id: 'animals',
    title: 'Animals',
    titleDe: 'Tiere',
    icon: '🐾',
    description: 'Learn animal names and their articles',
    wordCount: 6,
    progress: 0,
    color: 'der',
  },
  {
    id: 'food',
    title: 'Food & Drinks',
    titleDe: 'Essen & Trinken',
    icon: '🍎',
    description: 'Master food vocabulary',
    wordCount: 6,
    progress: 0,
    color: 'die',
  },
  {
    id: 'house',
    title: 'Home',
    titleDe: 'Zuhause',
    icon: '🏠',
    description: 'Household items and furniture',
    wordCount: 6,
    progress: 0,
    color: 'das',
  },
  {
    id: 'nature',
    title: 'Nature',
    titleDe: 'Natur',
    icon: '🌳',
    description: 'Nature and environment words',
    wordCount: 6,
    progress: 0,
    color: 'der',
  },
  {
    id: 'body',
    title: 'Body',
    titleDe: 'Körper',
    icon: '👋',
    description: 'Body parts vocabulary',
    wordCount: 6,
    progress: 0,
    color: 'die',
  },
];

export const getWordsByCategory = (categoryId: string): VocabularyWord[] => {
  return vocabularyWords.filter(word => word.category === categoryId);
};

export const getRandomWords = (count: number, categoryId?: string): VocabularyWord[] => {
  const words = categoryId 
    ? vocabularyWords.filter(w => w.category === categoryId)
    : vocabularyWords;
  
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
