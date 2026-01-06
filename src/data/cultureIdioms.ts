export interface Idiom {
  id: string;
  german: string;
  literal: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  category: 'animals' | 'food' | 'body' | 'weather' | 'objects' | 'general';
}

export interface Proverb {
  id: string;
  german: string;
  english: string;
  meaning: string;
  usage: string;
}

export interface CulturalTip {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  category: 'etiquette' | 'customs' | 'food' | 'business' | 'holidays' | 'daily-life';
  content: string;
  dos: string[];
  donts: string[];
}

export const idioms: Idiom[] = [
  {
    id: 'idiom-1',
    german: 'Da steppt der Bär',
    literal: 'The bear dances there',
    meaning: 'It\'s a lively party / There\'s a lot going on',
    example: 'Auf der Party gestern hat der Bär gesteppt!',
    exampleTranslation: 'Yesterday\'s party was really lively!',
    category: 'animals',
  },
  {
    id: 'idiom-2',
    german: 'Ich verstehe nur Bahnhof',
    literal: 'I only understand train station',
    meaning: 'I don\'t understand anything',
    example: 'Er redet so schnell, ich verstehe nur Bahnhof.',
    exampleTranslation: 'He talks so fast, I don\'t understand anything.',
    category: 'objects',
  },
  {
    id: 'idiom-3',
    german: 'Das ist mir Wurst',
    literal: 'That is sausage to me',
    meaning: 'I don\'t care / It doesn\'t matter to me',
    example: 'Pizza oder Pasta? Das ist mir Wurst.',
    exampleTranslation: 'Pizza or pasta? I don\'t care.',
    category: 'food',
  },
  {
    id: 'idiom-4',
    german: 'Tomaten auf den Augen haben',
    literal: 'To have tomatoes on your eyes',
    meaning: 'To be oblivious / Not to see the obvious',
    example: 'Hast du Tomaten auf den Augen? Der Fehler ist offensichtlich!',
    exampleTranslation: 'Are you blind? The mistake is obvious!',
    category: 'food',
  },
  {
    id: 'idiom-5',
    german: 'Schwein gehabt',
    literal: 'Had pig',
    meaning: 'Got lucky',
    example: 'Der Bus war fast weg, aber wir haben Schwein gehabt!',
    exampleTranslation: 'The bus was almost gone, but we got lucky!',
    category: 'animals',
  },
  {
    id: 'idiom-6',
    german: 'Die Daumen drücken',
    literal: 'To press thumbs',
    meaning: 'To keep fingers crossed / Wish good luck',
    example: 'Ich drücke dir die Daumen für die Prüfung!',
    exampleTranslation: 'I\'m keeping my fingers crossed for your exam!',
    category: 'body',
  },
  {
    id: 'idiom-7',
    german: 'Einen Kater haben',
    literal: 'To have a tomcat',
    meaning: 'To have a hangover',
    example: 'Nach der Party hatte ich einen schrecklichen Kater.',
    exampleTranslation: 'After the party, I had a terrible hangover.',
    category: 'animals',
  },
  {
    id: 'idiom-8',
    german: 'Ins Fettnäpfchen treten',
    literal: 'To step into the fat bowl',
    meaning: 'To put your foot in your mouth / Make an embarrassing mistake',
    example: 'Ich bin ins Fettnäpfchen getreten, als ich nach ihrem Alter fragte.',
    exampleTranslation: 'I put my foot in my mouth when I asked about her age.',
    category: 'objects',
  },
  {
    id: 'idiom-9',
    german: 'Das Leben ist kein Ponyhof',
    literal: 'Life is not a pony farm',
    meaning: 'Life isn\'t always easy / Life isn\'t a bed of roses',
    example: 'Du musst hart arbeiten. Das Leben ist kein Ponyhof.',
    exampleTranslation: 'You have to work hard. Life isn\'t a bed of roses.',
    category: 'animals',
  },
  {
    id: 'idiom-10',
    german: 'Sich zum Affen machen',
    literal: 'To make yourself into a monkey',
    meaning: 'To make a fool of yourself',
    example: 'Er hat sich auf der Party zum Affen gemacht.',
    exampleTranslation: 'He made a fool of himself at the party.',
    category: 'animals',
  },
  {
    id: 'idiom-11',
    german: 'Jemandem auf den Keks gehen',
    literal: 'To go on someone\'s cookie',
    meaning: 'To annoy someone / Get on someone\'s nerves',
    example: 'Du gehst mir langsam auf den Keks!',
    exampleTranslation: 'You\'re starting to get on my nerves!',
    category: 'food',
  },
  {
    id: 'idiom-12',
    german: 'Den Nagel auf den Kopf treffen',
    literal: 'To hit the nail on the head',
    meaning: 'To be exactly right',
    example: 'Du hast den Nagel auf den Kopf getroffen!',
    exampleTranslation: 'You hit the nail on the head!',
    category: 'objects',
  },
];

export const proverbs: Proverb[] = [
  {
    id: 'proverb-1',
    german: 'Übung macht den Meister',
    english: 'Practice makes perfect',
    meaning: 'You improve through repeated practice',
    usage: 'Encouraging someone to keep practicing',
  },
  {
    id: 'proverb-2',
    german: 'Morgenstund hat Gold im Mund',
    english: 'The morning hour has gold in its mouth',
    meaning: 'The early bird catches the worm',
    usage: 'Emphasizing the value of getting up early',
  },
  {
    id: 'proverb-3',
    german: 'Wer zuletzt lacht, lacht am besten',
    english: 'He who laughs last, laughs best',
    meaning: 'Final success matters most',
    usage: 'When someone faces initial setbacks',
  },
  {
    id: 'proverb-4',
    german: 'Der Apfel fällt nicht weit vom Stamm',
    english: 'The apple doesn\'t fall far from the tree',
    meaning: 'Children resemble their parents',
    usage: 'Commenting on family similarities',
  },
  {
    id: 'proverb-5',
    german: 'Aller Anfang ist schwer',
    english: 'Every beginning is hard',
    meaning: 'Starting something new is always difficult',
    usage: 'Encouraging someone who is struggling to start',
  },
  {
    id: 'proverb-6',
    german: 'Wer nicht wagt, der nicht gewinnt',
    english: 'Nothing ventured, nothing gained',
    meaning: 'You have to take risks to succeed',
    usage: 'Encouraging someone to take a chance',
  },
  {
    id: 'proverb-7',
    german: 'Andere Länder, andere Sitten',
    english: 'Different countries, different customs',
    meaning: 'Cultures vary from place to place',
    usage: 'Explaining cultural differences',
  },
  {
    id: 'proverb-8',
    german: 'Aus den Augen, aus dem Sinn',
    english: 'Out of sight, out of mind',
    meaning: 'People forget about what they don\'t see',
    usage: 'When someone is forgotten after leaving',
  },
  {
    id: 'proverb-9',
    german: 'Ohne Fleiß kein Preis',
    english: 'No pain, no gain',
    meaning: 'Success requires hard work',
    usage: 'Motivating someone to work harder',
  },
  {
    id: 'proverb-10',
    german: 'Stille Wasser sind tief',
    english: 'Still waters run deep',
    meaning: 'Quiet people often have deep thoughts',
    usage: 'Describing someone who is quiet but thoughtful',
  },
];

export const culturalTips: CulturalTip[] = [
  {
    id: 'culture-1',
    title: 'Punctuality',
    titleDe: 'Pünktlichkeit',
    icon: '⏰',
    category: 'etiquette',
    content: 'Germans take punctuality very seriously. Being on time is considered a sign of respect. Arriving 5 minutes early is ideal for business meetings.',
    dos: ['Arrive on time or slightly early', 'Call ahead if you\'ll be late', 'Plan for potential delays'],
    donts: ['Arrive late without notice', 'Keep people waiting', 'Make excuses for tardiness'],
  },
  {
    id: 'culture-2',
    title: 'Greetings',
    titleDe: 'Begrüßungen',
    icon: '🤝',
    category: 'etiquette',
    content: 'A firm handshake with eye contact is standard. "Sie" (formal you) is used with strangers and in professional settings. "Du" (informal) is used among friends and younger people.',
    dos: ['Shake hands firmly', 'Maintain eye contact', 'Use "Sie" with strangers'],
    donts: ['Use "Du" with people you just met', 'Give a weak handshake', 'Look away during greeting'],
  },
  {
    id: 'culture-3',
    title: 'Bread Culture',
    titleDe: 'Brotkultur',
    icon: '🍞',
    category: 'food',
    content: 'Germany has over 3,000 types of bread. Bakeries (Bäckereien) are found everywhere. Germans often have bread for breakfast (Frühstück) and dinner (Abendbrot = evening bread).',
    dos: ['Try different regional breads', 'Visit local bakeries', 'Have Brötchen for breakfast'],
    donts: ['Expect only white bread', 'Skip the bakery experience', 'Waste bread'],
  },
  {
    id: 'culture-4',
    title: 'Recycling & Environment',
    titleDe: 'Recycling & Umwelt',
    icon: '♻️',
    category: 'daily-life',
    content: 'Germany has strict recycling rules. Trash is separated into paper, glass, packaging, and organic waste. Many bottles have a deposit (Pfand) that you get back when returning them.',
    dos: ['Sort your trash correctly', 'Return Pfand bottles', 'Use reusable bags'],
    donts: ['Mix different types of waste', 'Throw away Pfand bottles', 'Ignore recycling rules'],
  },
  {
    id: 'culture-5',
    title: 'Sunday Rest',
    titleDe: 'Sonntagsruhe',
    icon: '🛋️',
    category: 'customs',
    content: 'Sundays are traditionally quiet days. Most shops are closed, and loud activities (mowing lawns, drilling) are frowned upon or illegal. It\'s time for family and relaxation.',
    dos: ['Shop on Saturday for Sunday needs', 'Enjoy quiet activities', 'Respect neighbors\' peace'],
    donts: ['Do noisy chores on Sunday', 'Expect shops to be open', 'Play loud music'],
  },
  {
    id: 'culture-6',
    title: 'Christmas Markets',
    titleDe: 'Weihnachtsmärkte',
    icon: '🎄',
    category: 'holidays',
    content: 'From late November, Weihnachtsmärkte appear in every town. They feature Glühwein (mulled wine), Lebkuchen (gingerbread), crafts, and festive atmosphere. Each region has unique traditions.',
    dos: ['Try Glühwein and local specialties', 'Visit multiple markets', 'Buy handmade crafts'],
    donts: ['Miss this tradition in winter', 'Rush through the markets', 'Forget warm clothing'],
  },
  {
    id: 'culture-7',
    title: 'Business Etiquette',
    titleDe: 'Geschäftsetikette',
    icon: '💼',
    category: 'business',
    content: 'Germans prefer direct communication and thorough preparation. Meetings have clear agendas and stay on topic. Titles (Herr/Frau + surname) are used until invited to use first names.',
    dos: ['Be well-prepared', 'Stick to the agenda', 'Use formal titles'],
    donts: ['Make small talk excessively', 'Be vague or overly casual', 'Interrupt others'],
  },
  {
    id: 'culture-8',
    title: 'Tipping',
    titleDe: 'Trinkgeld',
    icon: '💶',
    category: 'daily-life',
    content: 'Tipping is appreciated but not mandatory. Typically, round up or add 5-10%. Say "Stimmt so" (keep the change) or specify the total amount you want to pay.',
    dos: ['Round up the bill', 'Tip for good service', 'Hand tip directly to server'],
    donts: ['Leave tip on table', 'Tip exactly 20% like in US', 'Feel obligated to tip for bad service'],
  },
];

export const getIdiomsByCategory = (category: Idiom['category']): Idiom[] => {
  return idioms.filter(i => i.category === category);
};

export const getCulturalTipsByCategory = (category: CulturalTip['category']): CulturalTip[] => {
  return culturalTips.filter(t => t.category === category);
};
