export interface SentenceExercise {
  id: string;
  german: string;
  english: string;
  words: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'basic' | 'questions' | 'negation' | 'modal' | 'perfect' | 'cases';
}

export const sentenceExercises: SentenceExercise[] = [
  // Basic sentences
  {
    id: 's1',
    german: 'Ich bin müde',
    english: 'I am tired',
    words: ['Ich', 'bin', 'müde'],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 's2',
    german: 'Der Hund ist groß',
    english: 'The dog is big',
    words: ['Der', 'Hund', 'ist', 'groß'],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 's3',
    german: 'Ich lerne Deutsch',
    english: 'I learn German',
    words: ['Ich', 'lerne', 'Deutsch'],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 's4',
    german: 'Sie trinkt Wasser',
    english: 'She drinks water',
    words: ['Sie', 'trinkt', 'Wasser'],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 's5',
    german: 'Wir spielen Fußball',
    english: 'We play football',
    words: ['Wir', 'spielen', 'Fußball'],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 's6',
    german: 'Das Kind isst einen Apfel',
    english: 'The child eats an apple',
    words: ['Das', 'Kind', 'isst', 'einen', 'Apfel'],
    difficulty: 'beginner',
    category: 'basic'
  },
  
  // Questions
  {
    id: 's7',
    german: 'Wo wohnst du',
    english: 'Where do you live',
    words: ['Wo', 'wohnst', 'du'],
    difficulty: 'beginner',
    category: 'questions'
  },
  {
    id: 's8',
    german: 'Was machst du heute',
    english: 'What are you doing today',
    words: ['Was', 'machst', 'du', 'heute'],
    difficulty: 'beginner',
    category: 'questions'
  },
  {
    id: 's9',
    german: 'Wie heißt du',
    english: 'What is your name',
    words: ['Wie', 'heißt', 'du'],
    difficulty: 'beginner',
    category: 'questions'
  },
  {
    id: 's10',
    german: 'Hast du Zeit',
    english: 'Do you have time',
    words: ['Hast', 'du', 'Zeit'],
    difficulty: 'beginner',
    category: 'questions'
  },
  {
    id: 's11',
    german: 'Wann kommst du nach Hause',
    english: 'When are you coming home',
    words: ['Wann', 'kommst', 'du', 'nach', 'Hause'],
    difficulty: 'intermediate',
    category: 'questions'
  },
  
  // Negation
  {
    id: 's12',
    german: 'Ich habe kein Geld',
    english: 'I have no money',
    words: ['Ich', 'habe', 'kein', 'Geld'],
    difficulty: 'beginner',
    category: 'negation'
  },
  {
    id: 's13',
    german: 'Er spricht nicht Deutsch',
    english: 'He does not speak German',
    words: ['Er', 'spricht', 'nicht', 'Deutsch'],
    difficulty: 'intermediate',
    category: 'negation'
  },
  {
    id: 's14',
    german: 'Das ist keine gute Idee',
    english: 'That is not a good idea',
    words: ['Das', 'ist', 'keine', 'gute', 'Idee'],
    difficulty: 'intermediate',
    category: 'negation'
  },
  {
    id: 's15',
    german: 'Wir haben keinen Hunger',
    english: 'We are not hungry',
    words: ['Wir', 'haben', 'keinen', 'Hunger'],
    difficulty: 'intermediate',
    category: 'negation'
  },
  
  // Modal verbs
  {
    id: 's16',
    german: 'Ich kann schwimmen',
    english: 'I can swim',
    words: ['Ich', 'kann', 'schwimmen'],
    difficulty: 'beginner',
    category: 'modal'
  },
  {
    id: 's17',
    german: 'Du musst jetzt gehen',
    english: 'You must go now',
    words: ['Du', 'musst', 'jetzt', 'gehen'],
    difficulty: 'intermediate',
    category: 'modal'
  },
  {
    id: 's18',
    german: 'Er will Deutsch lernen',
    english: 'He wants to learn German',
    words: ['Er', 'will', 'Deutsch', 'lernen'],
    difficulty: 'intermediate',
    category: 'modal'
  },
  {
    id: 's19',
    german: 'Wir dürfen hier parken',
    english: 'We may park here',
    words: ['Wir', 'dürfen', 'hier', 'parken'],
    difficulty: 'intermediate',
    category: 'modal'
  },
  {
    id: 's20',
    german: 'Sie soll früh aufstehen',
    english: 'She should get up early',
    words: ['Sie', 'soll', 'früh', 'aufstehen'],
    difficulty: 'intermediate',
    category: 'modal'
  },
  
  // Perfect tense
  {
    id: 's21',
    german: 'Ich habe das Buch gelesen',
    english: 'I have read the book',
    words: ['Ich', 'habe', 'das', 'Buch', 'gelesen'],
    difficulty: 'intermediate',
    category: 'perfect'
  },
  {
    id: 's22',
    german: 'Er ist nach Berlin gefahren',
    english: 'He went to Berlin',
    words: ['Er', 'ist', 'nach', 'Berlin', 'gefahren'],
    difficulty: 'intermediate',
    category: 'perfect'
  },
  {
    id: 's23',
    german: 'Wir haben Pizza gegessen',
    english: 'We ate pizza',
    words: ['Wir', 'haben', 'Pizza', 'gegessen'],
    difficulty: 'intermediate',
    category: 'perfect'
  },
  {
    id: 's24',
    german: 'Sie ist gestern angekommen',
    english: 'She arrived yesterday',
    words: ['Sie', 'ist', 'gestern', 'angekommen'],
    difficulty: 'intermediate',
    category: 'perfect'
  },
  {
    id: 's25',
    german: 'Hast du gut geschlafen',
    english: 'Did you sleep well',
    words: ['Hast', 'du', 'gut', 'geschlafen'],
    difficulty: 'intermediate',
    category: 'perfect'
  },
  
  // Cases
  {
    id: 's26',
    german: 'Ich gebe dem Mann das Buch',
    english: 'I give the man the book',
    words: ['Ich', 'gebe', 'dem', 'Mann', 'das', 'Buch'],
    difficulty: 'advanced',
    category: 'cases'
  },
  {
    id: 's27',
    german: 'Er hilft der Frau',
    english: 'He helps the woman',
    words: ['Er', 'hilft', 'der', 'Frau'],
    difficulty: 'advanced',
    category: 'cases'
  },
  {
    id: 's28',
    german: 'Ich sehe den Hund',
    english: 'I see the dog',
    words: ['Ich', 'sehe', 'den', 'Hund'],
    difficulty: 'intermediate',
    category: 'cases'
  },
  {
    id: 's29',
    german: 'Das Auto des Mannes ist rot',
    english: "The man's car is red",
    words: ['Das', 'Auto', 'des', 'Mannes', 'ist', 'rot'],
    difficulty: 'advanced',
    category: 'cases'
  },
  {
    id: 's30',
    german: 'Wir fahren mit dem Bus',
    english: 'We travel by bus',
    words: ['Wir', 'fahren', 'mit', 'dem', 'Bus'],
    difficulty: 'intermediate',
    category: 'cases'
  }
];

export const sentenceCategories = [
  { id: 'basic', title: 'Basic Sentences', icon: '📝' },
  { id: 'questions', title: 'Questions', icon: '❓' },
  { id: 'negation', title: 'Negation', icon: '🚫' },
  { id: 'modal', title: 'Modal Verbs', icon: '💪' },
  { id: 'perfect', title: 'Perfect Tense', icon: '⏰' },
  { id: 'cases', title: 'Cases', icon: '📚' }
];

export const getSentencesByCategory = (category: string): SentenceExercise[] => {
  return sentenceExercises.filter(s => s.category === category);
};

export const getSentencesByDifficulty = (difficulty: string): SentenceExercise[] => {
  return sentenceExercises.filter(s => s.difficulty === difficulty);
};
