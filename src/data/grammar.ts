export interface GrammarRule {
  id: string;
  pattern: string;
  article: 'der' | 'die' | 'das';
  explanation: string;
  examples: string[];
  exceptions?: string[];
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

export const getGrammarByArticle = (article: 'der' | 'die' | 'das'): GrammarCategory | undefined => {
  const categoryMap = {
    'der': 'der-masculine',
    'die': 'die-feminine',
    'das': 'das-neuter',
  };
  return grammarCategories.find(cat => cat.id === categoryMap[article]);
};
