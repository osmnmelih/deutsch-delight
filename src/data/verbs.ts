export interface VerbConjugation {
  ich: string;
  du: string;
  'er/sie/es': string;
  wir: string;
  ihr: string;
  sie: string;
}

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  present: VerbConjugation;
  perfect: {
    auxiliary: 'haben' | 'sein';
    participle: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'regular' | 'irregular' | 'modal' | 'separable';
  examples: {
    german: string;
    english: string;
  }[];
}

export const verbs: Verb[] = [
  // Regular verbs
  {
    id: 'v1',
    infinitive: 'machen',
    english: 'to make/do',
    present: {
      ich: 'mache',
      du: 'machst',
      'er/sie/es': 'macht',
      wir: 'machen',
      ihr: 'macht',
      sie: 'machen'
    },
    perfect: { auxiliary: 'haben', participle: 'gemacht' },
    difficulty: 'beginner',
    category: 'regular',
    examples: [
      { german: 'Ich mache meine Hausaufgaben.', english: 'I do my homework.' },
      { german: 'Er hat Kaffee gemacht.', english: 'He made coffee.' }
    ]
  },
  {
    id: 'v2',
    infinitive: 'spielen',
    english: 'to play',
    present: {
      ich: 'spiele',
      du: 'spielst',
      'er/sie/es': 'spielt',
      wir: 'spielen',
      ihr: 'spielt',
      sie: 'spielen'
    },
    perfect: { auxiliary: 'haben', participle: 'gespielt' },
    difficulty: 'beginner',
    category: 'regular',
    examples: [
      { german: 'Die Kinder spielen im Garten.', english: 'The children play in the garden.' },
      { german: 'Wir haben Fußball gespielt.', english: 'We played football.' }
    ]
  },
  {
    id: 'v3',
    infinitive: 'lernen',
    english: 'to learn',
    present: {
      ich: 'lerne',
      du: 'lernst',
      'er/sie/es': 'lernt',
      wir: 'lernen',
      ihr: 'lernt',
      sie: 'lernen'
    },
    perfect: { auxiliary: 'haben', participle: 'gelernt' },
    difficulty: 'beginner',
    category: 'regular',
    examples: [
      { german: 'Ich lerne Deutsch.', english: 'I learn German.' },
      { german: 'Sie hat viel gelernt.', english: 'She learned a lot.' }
    ]
  },
  {
    id: 'v4',
    infinitive: 'arbeiten',
    english: 'to work',
    present: {
      ich: 'arbeite',
      du: 'arbeitest',
      'er/sie/es': 'arbeitet',
      wir: 'arbeiten',
      ihr: 'arbeitet',
      sie: 'arbeiten'
    },
    perfect: { auxiliary: 'haben', participle: 'gearbeitet' },
    difficulty: 'beginner',
    category: 'regular',
    examples: [
      { german: 'Er arbeitet im Büro.', english: 'He works in the office.' },
      { german: 'Ich habe heute viel gearbeitet.', english: 'I worked a lot today.' }
    ]
  },
  
  // Irregular verbs
  {
    id: 'v5',
    infinitive: 'sein',
    english: 'to be',
    present: {
      ich: 'bin',
      du: 'bist',
      'er/sie/es': 'ist',
      wir: 'sind',
      ihr: 'seid',
      sie: 'sind'
    },
    perfect: { auxiliary: 'sein', participle: 'gewesen' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich bin müde.', english: 'I am tired.' },
      { german: 'Sie ist Lehrerin gewesen.', english: 'She was a teacher.' }
    ]
  },
  {
    id: 'v6',
    infinitive: 'haben',
    english: 'to have',
    present: {
      ich: 'habe',
      du: 'hast',
      'er/sie/es': 'hat',
      wir: 'haben',
      ihr: 'habt',
      sie: 'haben'
    },
    perfect: { auxiliary: 'haben', participle: 'gehabt' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich habe einen Hund.', english: 'I have a dog.' },
      { german: 'Er hat Glück gehabt.', english: 'He was lucky.' }
    ]
  },
  {
    id: 'v7',
    infinitive: 'gehen',
    english: 'to go',
    present: {
      ich: 'gehe',
      du: 'gehst',
      'er/sie/es': 'geht',
      wir: 'gehen',
      ihr: 'geht',
      sie: 'gehen'
    },
    perfect: { auxiliary: 'sein', participle: 'gegangen' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich gehe zur Schule.', english: 'I go to school.' },
      { german: 'Sie ist nach Hause gegangen.', english: 'She went home.' }
    ]
  },
  {
    id: 'v8',
    infinitive: 'kommen',
    english: 'to come',
    present: {
      ich: 'komme',
      du: 'kommst',
      'er/sie/es': 'kommt',
      wir: 'kommen',
      ihr: 'kommt',
      sie: 'kommen'
    },
    perfect: { auxiliary: 'sein', participle: 'gekommen' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Er kommt aus Deutschland.', english: 'He comes from Germany.' },
      { german: 'Wir sind spät gekommen.', english: 'We came late.' }
    ]
  },
  {
    id: 'v9',
    infinitive: 'sehen',
    english: 'to see',
    present: {
      ich: 'sehe',
      du: 'siehst',
      'er/sie/es': 'sieht',
      wir: 'sehen',
      ihr: 'seht',
      sie: 'sehen'
    },
    perfect: { auxiliary: 'haben', participle: 'gesehen' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich sehe einen Film.', english: 'I see a movie.' },
      { german: 'Hast du das gesehen?', english: 'Did you see that?' }
    ]
  },
  {
    id: 'v10',
    infinitive: 'essen',
    english: 'to eat',
    present: {
      ich: 'esse',
      du: 'isst',
      'er/sie/es': 'isst',
      wir: 'essen',
      ihr: 'esst',
      sie: 'essen'
    },
    perfect: { auxiliary: 'haben', participle: 'gegessen' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Was isst du gern?', english: 'What do you like to eat?' },
      { german: 'Wir haben Pizza gegessen.', english: 'We ate pizza.' }
    ]
  },
  {
    id: 'v11',
    infinitive: 'trinken',
    english: 'to drink',
    present: {
      ich: 'trinke',
      du: 'trinkst',
      'er/sie/es': 'trinkt',
      wir: 'trinken',
      ihr: 'trinkt',
      sie: 'trinken'
    },
    perfect: { auxiliary: 'haben', participle: 'getrunken' },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich trinke Wasser.', english: 'I drink water.' },
      { german: 'Er hat Kaffee getrunken.', english: 'He drank coffee.' }
    ]
  },
  {
    id: 'v12',
    infinitive: 'schlafen',
    english: 'to sleep',
    present: {
      ich: 'schlafe',
      du: 'schläfst',
      'er/sie/es': 'schläft',
      wir: 'schlafen',
      ihr: 'schlaft',
      sie: 'schlafen'
    },
    perfect: { auxiliary: 'haben', participle: 'geschlafen' },
    difficulty: 'intermediate',
    category: 'irregular',
    examples: [
      { german: 'Das Baby schläft.', english: 'The baby is sleeping.' },
      { german: 'Ich habe gut geschlafen.', english: 'I slept well.' }
    ]
  },
  
  // Modal verbs
  {
    id: 'v13',
    infinitive: 'können',
    english: 'can/to be able to',
    present: {
      ich: 'kann',
      du: 'kannst',
      'er/sie/es': 'kann',
      wir: 'können',
      ihr: 'könnt',
      sie: 'können'
    },
    perfect: { auxiliary: 'haben', participle: 'gekonnt' },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich kann schwimmen.', english: 'I can swim.' },
      { german: 'Er hat das nicht gekonnt.', english: 'He could not do that.' }
    ]
  },
  {
    id: 'v14',
    infinitive: 'müssen',
    english: 'must/to have to',
    present: {
      ich: 'muss',
      du: 'musst',
      'er/sie/es': 'muss',
      wir: 'müssen',
      ihr: 'müsst',
      sie: 'müssen'
    },
    perfect: { auxiliary: 'haben', participle: 'gemusst' },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich muss arbeiten.', english: 'I have to work.' },
      { german: 'Er hat gehen müssen.', english: 'He had to go.' }
    ]
  },
  {
    id: 'v15',
    infinitive: 'wollen',
    english: 'to want',
    present: {
      ich: 'will',
      du: 'willst',
      'er/sie/es': 'will',
      wir: 'wollen',
      ihr: 'wollt',
      sie: 'wollen'
    },
    perfect: { auxiliary: 'haben', participle: 'gewollt' },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich will nach Hause.', english: 'I want to go home.' },
      { german: 'Sie hat das immer gewollt.', english: 'She always wanted that.' }
    ]
  },
  
  // Separable verbs
  {
    id: 'v16',
    infinitive: 'aufstehen',
    english: 'to get up',
    present: {
      ich: 'stehe auf',
      du: 'stehst auf',
      'er/sie/es': 'steht auf',
      wir: 'stehen auf',
      ihr: 'steht auf',
      sie: 'stehen auf'
    },
    perfect: { auxiliary: 'sein', participle: 'aufgestanden' },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7 o\'clock.' },
      { german: 'Er ist früh aufgestanden.', english: 'He got up early.' }
    ]
  },
  {
    id: 'v17',
    infinitive: 'anfangen',
    english: 'to begin',
    present: {
      ich: 'fange an',
      du: 'fängst an',
      'er/sie/es': 'fängt an',
      wir: 'fangen an',
      ihr: 'fangt an',
      sie: 'fangen an'
    },
    perfect: { auxiliary: 'haben', participle: 'angefangen' },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Der Film fängt um 8 an.', english: 'The movie starts at 8.' },
      { german: 'Wir haben angefangen.', english: 'We have started.' }
    ]
  },
  {
    id: 'v18',
    infinitive: 'einkaufen',
    english: 'to shop',
    present: {
      ich: 'kaufe ein',
      du: 'kaufst ein',
      'er/sie/es': 'kauft ein',
      wir: 'kaufen ein',
      ihr: 'kauft ein',
      sie: 'kaufen ein'
    },
    perfect: { auxiliary: 'haben', participle: 'eingekauft' },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Ich kaufe im Supermarkt ein.', english: 'I shop at the supermarket.' },
      { german: 'Sie hat Lebensmittel eingekauft.', english: 'She bought groceries.' }
    ]
  }
];

export const getVerbsByCategory = (category: string): Verb[] => {
  return verbs.filter(v => v.category === category);
};

export const getVerbsByDifficulty = (difficulty: string): Verb[] => {
  return verbs.filter(v => v.difficulty === difficulty);
};
