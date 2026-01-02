export interface GrammarRule {
  id: string;
  pattern: string;
  article?: 'der' | 'die' | 'das';
  explanation: string;
  examples: string[];
  exceptions?: string[];
}

export interface CaseRule {
  id: string;
  case: 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv';
  title: string;
  explanation: string;
  question: string;
  articleTable: {
    masculine: string;
    feminine: string;
    neuter: string;
    plural: string;
  };
  einKeinTable: {
    masculine: string;
    feminine: string;
    neuter: string;
    plural: string;
  };
  prepositions?: string[];
  verbs?: string[];
  examples: string[];
}

export interface ComparisonRule {
  id: string;
  type: 'comparative' | 'superlative';
  title: string;
  formation: string;
  examples: { base: string; comparative: string; superlative: string; english: string }[];
  irregulars?: { base: string; comparative: string; superlative: string; english: string }[];
}

export interface GrammarCategory {
  id: string;
  title: string;
  description: string;
  rules: GrammarRule[];
}

export const grammarCategories: GrammarCategory[] = [
  {
    id: 'der-masculine',
    title: 'Der (Masculine)',
    description: 'Common patterns for masculine nouns',
    rules: [
      {
        id: 'der-ling',
        pattern: '-ling',
        article: 'der',
        explanation: 'Nouns ending in -ling are masculine',
        examples: ['der Schmetterling (butterfly)', 'der Frühling (spring)', 'der Lehrling (apprentice)'],
      },
      {
        id: 'der-er-agent',
        pattern: '-er (agent nouns)',
        article: 'der',
        explanation: 'Nouns ending in -er referring to people or tools are usually masculine',
        examples: ['der Lehrer (teacher)', 'der Computer (computer)', 'der Fahrer (driver)'],
        exceptions: ['die Butter', 'die Mutter', 'die Schwester'],
      },
      {
        id: 'der-ismus',
        pattern: '-ismus',
        article: 'der',
        explanation: 'Words ending in -ismus (from Latin/Greek) are masculine',
        examples: ['der Tourismus (tourism)', 'der Optimismus (optimism)', 'der Kapitalismus (capitalism)'],
      },
      {
        id: 'der-days',
        pattern: 'Days & Months',
        article: 'der',
        explanation: 'Days of the week and months are masculine',
        examples: ['der Montag (Monday)', 'der Januar (January)', 'der Sommer (summer)'],
      },
      {
        id: 'der-weather',
        pattern: 'Weather',
        article: 'der',
        explanation: 'Most weather phenomena are masculine',
        examples: ['der Regen (rain)', 'der Schnee (snow)', 'der Wind (wind)'],
      },
      {
        id: 'der-alcoholic',
        pattern: 'Alcoholic drinks',
        article: 'der',
        explanation: 'Most alcoholic beverages are masculine',
        examples: ['der Wein (wine)', 'der Whisky (whisky)', 'der Champagner (champagne)'],
        exceptions: ['das Bier'],
      },
    ],
  },
  {
    id: 'die-feminine',
    title: 'Die (Feminine)',
    description: 'Common patterns for feminine nouns',
    rules: [
      {
        id: 'die-ung',
        pattern: '-ung',
        article: 'die',
        explanation: 'Almost all nouns ending in -ung are feminine',
        examples: ['die Zeitung (newspaper)', 'die Wohnung (apartment)', 'die Übung (exercise)'],
      },
      {
        id: 'die-heit-keit',
        pattern: '-heit / -keit',
        article: 'die',
        explanation: 'Nouns ending in -heit or -keit are always feminine',
        examples: ['die Freiheit (freedom)', 'die Möglichkeit (possibility)', 'die Schönheit (beauty)'],
      },
      {
        id: 'die-schaft',
        pattern: '-schaft',
        article: 'die',
        explanation: 'Nouns ending in -schaft are feminine',
        examples: ['die Freundschaft (friendship)', 'die Wissenschaft (science)', 'die Mannschaft (team)'],
      },
      {
        id: 'die-tion-sion',
        pattern: '-tion / -sion',
        article: 'die',
        explanation: 'Words of Latin origin ending in -tion or -sion are feminine',
        examples: ['die Nation (nation)', 'die Information (information)', 'die Diskussion (discussion)'],
      },
      {
        id: 'die-ie',
        pattern: '-ie',
        article: 'die',
        explanation: 'Most nouns ending in -ie are feminine',
        examples: ['die Energie (energy)', 'die Fantasie (fantasy)', 'die Demokratie (democracy)'],
      },
      {
        id: 'die-e',
        pattern: '-e (many nouns)',
        article: 'die',
        explanation: 'Many nouns ending in -e are feminine (about 90%)',
        examples: ['die Lampe (lamp)', 'die Blume (flower)', 'die Straße (street)'],
        exceptions: ['der Name', 'der Käse', 'das Ende'],
      },
    ],
  },
  {
    id: 'das-neuter',
    title: 'Das (Neuter)',
    description: 'Common patterns for neuter nouns',
    rules: [
      {
        id: 'das-chen-lein',
        pattern: '-chen / -lein',
        article: 'das',
        explanation: 'Diminutives ending in -chen or -lein are always neuter',
        examples: ['das Mädchen (girl)', 'das Brötchen (bread roll)', 'das Büchlein (little book)'],
      },
      {
        id: 'das-ment',
        pattern: '-ment',
        article: 'das',
        explanation: 'Words ending in -ment (from Latin/French) are neuter',
        examples: ['das Dokument (document)', 'das Experiment (experiment)', 'das Instrument (instrument)'],
      },
      {
        id: 'das-um',
        pattern: '-um',
        article: 'das',
        explanation: 'Words ending in -um (from Latin) are neuter',
        examples: ['das Museum (museum)', 'das Zentrum (center)', 'das Datum (date)'],
      },
      {
        id: 'das-ge',
        pattern: 'Ge- (collective)',
        article: 'das',
        explanation: 'Collective nouns starting with Ge- are usually neuter',
        examples: ['das Gebäude (building)', 'das Gebirge (mountains)', 'das Gemüse (vegetables)'],
      },
      {
        id: 'das-infinitive',
        pattern: 'Infinitives as nouns',
        article: 'das',
        explanation: 'When verbs are used as nouns (infinitives), they are neuter',
        examples: ['das Essen (eating/food)', 'das Leben (life)', 'das Schwimmen (swimming)'],
      },
      {
        id: 'das-metals',
        pattern: 'Metals & Elements',
        article: 'das',
        explanation: 'Most metals and chemical elements are neuter',
        examples: ['das Gold (gold)', 'das Silber (silver)', 'das Eisen (iron)'],
      },
    ],
  },
];

export const caseRules: CaseRule[] = [
  {
    id: 'nominativ',
    case: 'nominativ',
    title: 'Nominativ (Subject)',
    explanation: 'The nominative case is used for the subject of a sentence - the person or thing doing the action.',
    question: 'Wer? Was? (Who? What?)',
    articleTable: {
      masculine: 'der',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    einKeinTable: {
      masculine: 'ein / kein',
      feminine: 'eine / keine',
      neuter: 'ein / kein',
      plural: '- / keine',
    },
    examples: [
      'Der Mann liest. (The man reads.)',
      'Die Frau singt. (The woman sings.)',
      'Das Kind spielt. (The child plays.)',
      'Ein Hund bellt. (A dog barks.)',
    ],
  },
  {
    id: 'akkusativ',
    case: 'akkusativ',
    title: 'Akkusativ (Direct Object)',
    explanation: 'The accusative case is used for the direct object - the person or thing receiving the action directly.',
    question: 'Wen? Was? (Whom? What?)',
    articleTable: {
      masculine: 'den',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    einKeinTable: {
      masculine: 'einen / keinen',
      feminine: 'eine / keine',
      neuter: 'ein / kein',
      plural: '- / keine',
    },
    prepositions: ['durch (through)', 'für (for)', 'gegen (against)', 'ohne (without)', 'um (around)'],
    verbs: ['haben', 'sehen', 'hören', 'lesen', 'essen', 'trinken', 'kaufen', 'brauchen'],
    examples: [
      'Ich sehe den Mann. (I see the man.)',
      'Sie kauft einen Apfel. (She buys an apple.)',
      'Er hat keinen Hunger. (He has no hunger.)',
      'Wir brauchen das Buch. (We need the book.)',
    ],
  },
  {
    id: 'dativ',
    case: 'dativ',
    title: 'Dativ (Indirect Object)',
    explanation: 'The dative case is used for the indirect object - the person or thing receiving something indirectly, often the recipient.',
    question: 'Wem? (To whom?)',
    articleTable: {
      masculine: 'dem',
      feminine: 'der',
      neuter: 'dem',
      plural: 'den (+n)',
    },
    einKeinTable: {
      masculine: 'einem / keinem',
      feminine: 'einer / keiner',
      neuter: 'einem / keinem',
      plural: '- / keinen (+n)',
    },
    prepositions: ['aus (from)', 'bei (at/with)', 'mit (with)', 'nach (after/to)', 'seit (since)', 'von (from)', 'zu (to)'],
    verbs: ['helfen', 'danken', 'gehören', 'gefallen', 'schmecken', 'folgen', 'glauben', 'antworten'],
    examples: [
      'Ich helfe dem Mann. (I help the man.)',
      'Sie gibt der Frau ein Buch. (She gives the woman a book.)',
      'Das Buch gehört einem Freund. (The book belongs to a friend.)',
      'Ich fahre mit dem Bus. (I travel by bus.)',
    ],
  },
  {
    id: 'genitiv',
    case: 'genitiv',
    title: 'Genitiv (Possession)',
    explanation: 'The genitive case shows possession or relationship between nouns. It answers "whose?" and is equivalent to "of" or apostrophe-s in English.',
    question: 'Wessen? (Whose?)',
    articleTable: {
      masculine: 'des (+s/es)',
      feminine: 'der',
      neuter: 'des (+s/es)',
      plural: 'der',
    },
    einKeinTable: {
      masculine: 'eines / keines (+s/es)',
      feminine: 'einer / keiner',
      neuter: 'eines / keines (+s/es)',
      plural: '- / keiner',
    },
    prepositions: ['wegen (because of)', 'während (during)', 'trotz (despite)', 'statt/anstatt (instead of)'],
    examples: [
      'Das Auto des Mannes. (The car of the man / The man\'s car.)',
      'Die Tasche der Frau. (The bag of the woman / The woman\'s bag.)',
      'Das Spielzeug des Kindes. (The toy of the child.)',
      'Wegen des Wetters. (Because of the weather.)',
    ],
  },
];

export const comparisonRules: ComparisonRule[] = [
  {
    id: 'comparative',
    type: 'comparative',
    title: 'Komparativ (Comparative)',
    formation: 'Add -er to the adjective. Many short adjectives also get an umlaut (a→ä, o→ö, u→ü).',
    examples: [
      { base: 'schnell', comparative: 'schneller', superlative: 'am schnellsten', english: 'fast' },
      { base: 'klein', comparative: 'kleiner', superlative: 'am kleinsten', english: 'small' },
      { base: 'schön', comparative: 'schöner', superlative: 'am schönsten', english: 'beautiful' },
      { base: 'langsam', comparative: 'langsamer', superlative: 'am langsamsten', english: 'slow' },
    ],
    irregulars: [
      { base: 'gut', comparative: 'besser', superlative: 'am besten', english: 'good' },
      { base: 'viel', comparative: 'mehr', superlative: 'am meisten', english: 'much/many' },
      { base: 'gern', comparative: 'lieber', superlative: 'am liebsten', english: 'gladly' },
      { base: 'hoch', comparative: 'höher', superlative: 'am höchsten', english: 'high' },
      { base: 'nah', comparative: 'näher', superlative: 'am nächsten', english: 'near' },
    ],
  },
  {
    id: 'superlative',
    type: 'superlative',
    title: 'Superlativ (Superlative)',
    formation: 'Add -st or -est (after d, t, s, ß, z) and use with "am" for predicative or add adjective endings for attributive use.',
    examples: [
      { base: 'alt', comparative: 'älter', superlative: 'am ältesten', english: 'old' },
      { base: 'jung', comparative: 'jünger', superlative: 'am jüngsten', english: 'young' },
      { base: 'groß', comparative: 'größer', superlative: 'am größten', english: 'big/tall' },
      { base: 'kalt', comparative: 'kälter', superlative: 'am kältesten', english: 'cold' },
      { base: 'warm', comparative: 'wärmer', superlative: 'am wärmsten', english: 'warm' },
    ],
  },
];

export const getGrammarByArticle = (article: 'der' | 'die' | 'das'): GrammarCategory | undefined => {
  const categoryMap = {
    'der': 'der-masculine',
    'die': 'die-feminine',
    'das': 'das-neuter',
  };
  return grammarCategories.find(cat => cat.id === categoryMap[article]);
};

export const getCaseByName = (caseName: 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv'): CaseRule | undefined => {
  return caseRules.find(c => c.case === caseName);
};
