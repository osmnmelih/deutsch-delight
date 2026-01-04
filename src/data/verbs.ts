export interface VerbConjugation {
  ich: string;
  du: string;
  'er/sie/es': string;
  wir: string;
  ihr: string;
  sie: string;
}

export type TenseType = 
  | 'präsens' 
  | 'präteritum' 
  | 'perfekt' 
  | 'plusquamperfekt' 
  | 'futurI' 
  | 'futurII'
  | 'konjunktivI'
  | 'konjunktivII';

export interface TenseInfo {
  name: string;
  nameDe: string;
  description: string;
  formation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

export const tenseInfo: Record<TenseType, TenseInfo> = {
  präsens: {
    name: 'Present Tense',
    nameDe: 'Präsens',
    description: 'Actions happening now, habitual actions, or general truths',
    formation: 'Verb stem + personal endings (-e, -st, -t, -en, -t, -en)',
    level: 'A1'
  },
  präteritum: {
    name: 'Simple Past',
    nameDe: 'Präteritum',
    description: 'Written narratives, formal reports, and with sein/haben',
    formation: 'Verb stem + -te (weak) or vowel change (strong) + endings',
    level: 'A2'
  },
  perfekt: {
    name: 'Present Perfect',
    nameDe: 'Perfekt',
    description: 'Spoken past, completed actions with present relevance',
    formation: 'haben/sein (conjugated) + past participle (ge- + stem + -t/-en)',
    level: 'A1'
  },
  plusquamperfekt: {
    name: 'Past Perfect',
    nameDe: 'Plusquamperfekt',
    description: 'Actions completed before another past action',
    formation: 'hatte/war (Präteritum of haben/sein) + past participle',
    level: 'B1'
  },
  futurI: {
    name: 'Future I',
    nameDe: 'Futur I',
    description: 'Future actions, predictions, or assumptions',
    formation: 'werden (conjugated) + infinitive',
    level: 'A2'
  },
  futurII: {
    name: 'Future II',
    nameDe: 'Futur II',
    description: 'Future perfect - actions completed by a future time',
    formation: 'werden (conjugated) + past participle + haben/sein',
    level: 'B2'
  },
  konjunktivI: {
    name: 'Subjunctive I',
    nameDe: 'Konjunktiv I',
    description: 'Indirect speech, formal writing, wishes',
    formation: 'Verb stem + -e, -est, -e, -en, -et, -en',
    level: 'B2'
  },
  konjunktivII: {
    name: 'Subjunctive II',
    nameDe: 'Konjunktiv II',
    description: 'Hypotheticals, polite requests, unreal conditions',
    formation: 'Präteritum stem (often with umlaut) + subjunctive endings, or würde + infinitive',
    level: 'B1'
  }
};

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  präsens: VerbConjugation;
  präteritum: VerbConjugation;
  perfekt: {
    auxiliary: 'haben' | 'sein';
    participle: string;
  };
  plusquamperfekt: {
    auxiliary: 'haben' | 'sein';
    participle: string;
  };
  futurI: VerbConjugation;
  konjunktivI: VerbConjugation;
  konjunktivII: VerbConjugation;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'regular' | 'irregular' | 'modal' | 'separable';
  caseRequired?: 'akkusativ' | 'dativ' | 'akkusativ+dativ' | 'genitiv';
  examples: {
    german: string;
    english: string;
    tense?: TenseType;
  }[];
}

// Akkusativ verbs - verbs that require accusative case
export interface CaseVerb {
  id: string;
  infinitive: string;
  english: string;
  case: 'akkusativ' | 'dativ' | 'akkusativ+dativ' | 'genitiv';
  preposition?: string;
  examples: {
    german: string;
    english: string;
    highlight: string; // The accusative/dative object
  }[];
  notes?: string;
}

export const akkusativVerbs: CaseVerb[] = [
  {
    id: 'akk1',
    infinitive: 'haben',
    english: 'to have',
    case: 'akkusativ',
    examples: [
      { german: 'Ich habe einen Hund.', english: 'I have a dog.', highlight: 'einen Hund' },
      { german: 'Sie hat keine Zeit.', english: 'She has no time.', highlight: 'keine Zeit' }
    ]
  },
  {
    id: 'akk2',
    infinitive: 'brauchen',
    english: 'to need',
    case: 'akkusativ',
    examples: [
      { german: 'Ich brauche einen Stift.', english: 'I need a pen.', highlight: 'einen Stift' },
      { german: 'Wir brauchen mehr Zeit.', english: 'We need more time.', highlight: 'mehr Zeit' }
    ]
  },
  {
    id: 'akk3',
    infinitive: 'sehen',
    english: 'to see',
    case: 'akkusativ',
    examples: [
      { german: 'Ich sehe den Mann.', english: 'I see the man.', highlight: 'den Mann' },
      { german: 'Siehst du mich?', english: 'Do you see me?', highlight: 'mich' }
    ]
  },
  {
    id: 'akk4',
    infinitive: 'hören',
    english: 'to hear',
    case: 'akkusativ',
    examples: [
      { german: 'Ich höre die Musik.', english: 'I hear the music.', highlight: 'die Musik' },
      { german: 'Hörst du mich?', english: 'Do you hear me?', highlight: 'mich' }
    ]
  },
  {
    id: 'akk5',
    infinitive: 'lesen',
    english: 'to read',
    case: 'akkusativ',
    examples: [
      { german: 'Er liest das Buch.', english: 'He reads the book.', highlight: 'das Buch' },
      { german: 'Sie liest einen Roman.', english: 'She reads a novel.', highlight: 'einen Roman' }
    ]
  },
  {
    id: 'akk6',
    infinitive: 'schreiben',
    english: 'to write',
    case: 'akkusativ',
    examples: [
      { german: 'Ich schreibe einen Brief.', english: 'I write a letter.', highlight: 'einen Brief' },
      { german: 'Er schreibt eine E-Mail.', english: 'He writes an email.', highlight: 'eine E-Mail' }
    ]
  },
  {
    id: 'akk7',
    infinitive: 'kaufen',
    english: 'to buy',
    case: 'akkusativ',
    examples: [
      { german: 'Sie kauft ein Kleid.', english: 'She buys a dress.', highlight: 'ein Kleid' },
      { german: 'Wir kaufen das Auto.', english: 'We buy the car.', highlight: 'das Auto' }
    ]
  },
  {
    id: 'akk8',
    infinitive: 'verkaufen',
    english: 'to sell',
    case: 'akkusativ',
    examples: [
      { german: 'Er verkauft sein Haus.', english: 'He sells his house.', highlight: 'sein Haus' },
      { german: 'Sie verkaufen alte Bücher.', english: 'They sell old books.', highlight: 'alte Bücher' }
    ]
  },
  {
    id: 'akk9',
    infinitive: 'essen',
    english: 'to eat',
    case: 'akkusativ',
    examples: [
      { german: 'Ich esse einen Apfel.', english: 'I eat an apple.', highlight: 'einen Apfel' },
      { german: 'Sie isst das Brot.', english: 'She eats the bread.', highlight: 'das Brot' }
    ]
  },
  {
    id: 'akk10',
    infinitive: 'trinken',
    english: 'to drink',
    case: 'akkusativ',
    examples: [
      { german: 'Er trinkt den Kaffee.', english: 'He drinks the coffee.', highlight: 'den Kaffee' },
      { german: 'Wir trinken ein Bier.', english: 'We drink a beer.', highlight: 'ein Bier' }
    ]
  },
  {
    id: 'akk11',
    infinitive: 'kennen',
    english: 'to know (person/place)',
    case: 'akkusativ',
    examples: [
      { german: 'Ich kenne den Mann.', english: 'I know the man.', highlight: 'den Mann' },
      { german: 'Kennst du diese Stadt?', english: 'Do you know this city?', highlight: 'diese Stadt' }
    ]
  },
  {
    id: 'akk12',
    infinitive: 'lieben',
    english: 'to love',
    case: 'akkusativ',
    examples: [
      { german: 'Ich liebe dich.', english: 'I love you.', highlight: 'dich' },
      { german: 'Sie liebt ihre Familie.', english: 'She loves her family.', highlight: 'ihre Familie' }
    ]
  },
  {
    id: 'akk13',
    infinitive: 'mögen',
    english: 'to like',
    case: 'akkusativ',
    examples: [
      { german: 'Ich mag diesen Film.', english: 'I like this movie.', highlight: 'diesen Film' },
      { german: 'Magst du Schokolade?', english: 'Do you like chocolate?', highlight: 'Schokolade' }
    ]
  },
  {
    id: 'akk14',
    infinitive: 'finden',
    english: 'to find',
    case: 'akkusativ',
    examples: [
      { german: 'Ich finde meinen Schlüssel.', english: 'I find my key.', highlight: 'meinen Schlüssel' },
      { german: 'Sie findet den Weg.', english: 'She finds the way.', highlight: 'den Weg' }
    ]
  },
  {
    id: 'akk15',
    infinitive: 'verstehen',
    english: 'to understand',
    case: 'akkusativ',
    examples: [
      { german: 'Ich verstehe dich.', english: 'I understand you.', highlight: 'dich' },
      { german: 'Er versteht das Problem.', english: 'He understands the problem.', highlight: 'das Problem' }
    ]
  },
  {
    id: 'akk16',
    infinitive: 'besuchen',
    english: 'to visit',
    case: 'akkusativ',
    examples: [
      { german: 'Ich besuche meine Oma.', english: 'I visit my grandma.', highlight: 'meine Oma' },
      { german: 'Wir besuchen das Museum.', english: 'We visit the museum.', highlight: 'das Museum' }
    ]
  },
  {
    id: 'akk17',
    infinitive: 'fragen',
    english: 'to ask',
    case: 'akkusativ',
    examples: [
      { german: 'Ich frage den Lehrer.', english: 'I ask the teacher.', highlight: 'den Lehrer' },
      { german: 'Frag mich!', english: 'Ask me!', highlight: 'mich' }
    ]
  },
  {
    id: 'akk18',
    infinitive: 'suchen',
    english: 'to search/look for',
    case: 'akkusativ',
    examples: [
      { german: 'Ich suche meine Brille.', english: 'I am looking for my glasses.', highlight: 'meine Brille' },
      { german: 'Sie sucht eine Wohnung.', english: 'She is looking for an apartment.', highlight: 'eine Wohnung' }
    ]
  },
  {
    id: 'akk19',
    infinitive: 'nehmen',
    english: 'to take',
    case: 'akkusativ',
    examples: [
      { german: 'Ich nehme den Bus.', english: 'I take the bus.', highlight: 'den Bus' },
      { german: 'Nimm das Buch!', english: 'Take the book!', highlight: 'das Buch' }
    ]
  },
  {
    id: 'akk20',
    infinitive: 'rufen',
    english: 'to call',
    case: 'akkusativ',
    examples: [
      { german: 'Sie ruft den Arzt.', english: 'She calls the doctor.', highlight: 'den Arzt' },
      { german: 'Ruf mich an!', english: 'Call me!', highlight: 'mich' }
    ]
  }
];

export const dativVerbs: CaseVerb[] = [
  {
    id: 'dat1',
    infinitive: 'helfen',
    english: 'to help',
    case: 'dativ',
    examples: [
      { german: 'Ich helfe dir.', english: 'I help you.', highlight: 'dir' },
      { german: 'Er hilft dem Mann.', english: 'He helps the man.', highlight: 'dem Mann' }
    ],
    notes: 'One of the most common dative verbs'
  },
  {
    id: 'dat2',
    infinitive: 'danken',
    english: 'to thank',
    case: 'dativ',
    examples: [
      { german: 'Ich danke Ihnen.', english: 'I thank you (formal).', highlight: 'Ihnen' },
      { german: 'Wir danken dem Chef.', english: 'We thank the boss.', highlight: 'dem Chef' }
    ]
  },
  {
    id: 'dat3',
    infinitive: 'gefallen',
    english: 'to please/to like',
    case: 'dativ',
    examples: [
      { german: 'Das Buch gefällt mir.', english: 'I like the book.', highlight: 'mir' },
      { german: 'Gefällt dir das Kleid?', english: 'Do you like the dress?', highlight: 'dir' }
    ],
    notes: 'The thing that pleases is the subject; the person pleased is in dative'
  },
  {
    id: 'dat4',
    infinitive: 'gehören',
    english: 'to belong to',
    case: 'dativ',
    examples: [
      { german: 'Das Auto gehört mir.', english: 'The car belongs to me.', highlight: 'mir' },
      { german: 'Wem gehört das Buch?', english: 'Who does the book belong to?', highlight: 'Wem' }
    ]
  },
  {
    id: 'dat5',
    infinitive: 'glauben',
    english: 'to believe',
    case: 'dativ',
    examples: [
      { german: 'Ich glaube dir.', english: 'I believe you.', highlight: 'dir' },
      { german: 'Glaub mir!', english: 'Believe me!', highlight: 'mir' }
    ],
    notes: 'When believing a person (not a thing/fact)'
  },
  {
    id: 'dat6',
    infinitive: 'folgen',
    english: 'to follow',
    case: 'dativ',
    examples: [
      { german: 'Der Hund folgt dem Kind.', english: 'The dog follows the child.', highlight: 'dem Kind' },
      { german: 'Folgen Sie mir!', english: 'Follow me!', highlight: 'mir' }
    ]
  },
  {
    id: 'dat7',
    infinitive: 'antworten',
    english: 'to answer',
    case: 'dativ',
    examples: [
      { german: 'Ich antworte dem Lehrer.', english: 'I answer the teacher.', highlight: 'dem Lehrer' },
      { german: 'Antworte mir!', english: 'Answer me!', highlight: 'mir' }
    ]
  },
  {
    id: 'dat8',
    infinitive: 'passen',
    english: 'to fit/suit',
    case: 'dativ',
    examples: [
      { german: 'Die Hose passt mir.', english: 'The pants fit me.', highlight: 'mir' },
      { german: 'Das passt mir gut.', english: 'That suits me well.', highlight: 'mir' }
    ]
  },
  {
    id: 'dat9',
    infinitive: 'schmecken',
    english: 'to taste (good to)',
    case: 'dativ',
    examples: [
      { german: 'Das Essen schmeckt mir.', english: 'The food tastes good to me.', highlight: 'mir' },
      { german: 'Schmeckt dir der Kuchen?', english: 'Do you like the cake?', highlight: 'dir' }
    ]
  },
  {
    id: 'dat10',
    infinitive: 'fehlen',
    english: 'to be missing/to miss',
    case: 'dativ',
    examples: [
      { german: 'Du fehlst mir.', english: 'I miss you.', highlight: 'mir' },
      { german: 'Was fehlt dir?', english: 'What\'s wrong with you?', highlight: 'dir' }
    ]
  },
  {
    id: 'dat11',
    infinitive: 'gratulieren',
    english: 'to congratulate',
    case: 'dativ',
    examples: [
      { german: 'Ich gratuliere dir!', english: 'I congratulate you!', highlight: 'dir' },
      { german: 'Wir gratulieren dem Gewinner.', english: 'We congratulate the winner.', highlight: 'dem Gewinner' }
    ]
  },
  {
    id: 'dat12',
    infinitive: 'begegnen',
    english: 'to meet/encounter',
    case: 'dativ',
    examples: [
      { german: 'Ich begegne einem Freund.', english: 'I meet a friend.', highlight: 'einem Freund' },
      { german: 'Sie begegnet ihm oft.', english: 'She meets him often.', highlight: 'ihm' }
    ]
  },
  {
    id: 'dat13',
    infinitive: 'verzeihen',
    english: 'to forgive',
    case: 'dativ',
    examples: [
      { german: 'Ich verzeihe dir.', english: 'I forgive you.', highlight: 'dir' },
      { german: 'Verzeihen Sie mir!', english: 'Forgive me!', highlight: 'mir' }
    ]
  },
  {
    id: 'dat14',
    infinitive: 'vertrauen',
    english: 'to trust',
    case: 'dativ',
    examples: [
      { german: 'Ich vertraue dir.', english: 'I trust you.', highlight: 'dir' },
      { german: 'Sie vertraut ihm nicht.', english: 'She doesn\'t trust him.', highlight: 'ihm' }
    ]
  },
  {
    id: 'dat15',
    infinitive: 'zuhören',
    english: 'to listen to',
    case: 'dativ',
    examples: [
      { german: 'Hör mir zu!', english: 'Listen to me!', highlight: 'mir' },
      { german: 'Er hört dem Lehrer zu.', english: 'He listens to the teacher.', highlight: 'dem Lehrer' }
    ]
  },
  {
    id: 'dat16',
    infinitive: 'ähneln',
    english: 'to resemble',
    case: 'dativ',
    examples: [
      { german: 'Sie ähnelt ihrer Mutter.', english: 'She resembles her mother.', highlight: 'ihrer Mutter' },
      { german: 'Er ähnelt seinem Vater.', english: 'He resembles his father.', highlight: 'seinem Vater' }
    ]
  },
  {
    id: 'dat17',
    infinitive: 'widersprechen',
    english: 'to contradict',
    case: 'dativ',
    examples: [
      { german: 'Ich widerspreche dir.', english: 'I contradict you.', highlight: 'dir' },
      { german: 'Er widerspricht dem Chef.', english: 'He contradicts the boss.', highlight: 'dem Chef' }
    ]
  },
  {
    id: 'dat18',
    infinitive: 'gelingen',
    english: 'to succeed',
    case: 'dativ',
    examples: [
      { german: 'Es gelingt mir.', english: 'I succeed.', highlight: 'mir' },
      { german: 'Der Kuchen gelingt ihr immer.', english: 'She always succeeds with the cake.', highlight: 'ihr' }
    ],
    notes: 'Impersonal verb - "es" is the subject'
  },
  {
    id: 'dat19',
    infinitive: 'schaden',
    english: 'to harm/damage',
    case: 'dativ',
    examples: [
      { german: 'Rauchen schadet der Gesundheit.', english: 'Smoking harms health.', highlight: 'der Gesundheit' },
      { german: 'Das schadet mir nicht.', english: 'That doesn\'t harm me.', highlight: 'mir' }
    ]
  },
  {
    id: 'dat20',
    infinitive: 'nützen',
    english: 'to be useful to',
    case: 'dativ',
    examples: [
      { german: 'Das nützt mir nichts.', english: 'That\'s no use to me.', highlight: 'mir' },
      { german: 'Wem nützt das?', english: 'Who does that benefit?', highlight: 'Wem' }
    ]
  }
];

// Verbs that take both accusative AND dative
export const akkusativDativVerbs: CaseVerb[] = [
  {
    id: 'akkdat1',
    infinitive: 'geben',
    english: 'to give',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich gebe dir das Buch.', english: 'I give you the book.', highlight: 'dir (DAT) + das Buch (AKK)' },
      { german: 'Er gibt dem Kind einen Apfel.', english: 'He gives the child an apple.', highlight: 'dem Kind (DAT) + einen Apfel (AKK)' }
    ],
    notes: 'Dative = indirect object (recipient), Accusative = direct object (thing given)'
  },
  {
    id: 'akkdat2',
    infinitive: 'schenken',
    english: 'to give (as a gift)',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich schenke ihr eine Blume.', english: 'I give her a flower.', highlight: 'ihr (DAT) + eine Blume (AKK)' },
      { german: 'Er schenkt dem Kind ein Spielzeug.', english: 'He gives the child a toy.', highlight: 'dem Kind (DAT) + ein Spielzeug (AKK)' }
    ]
  },
  {
    id: 'akkdat3',
    infinitive: 'zeigen',
    english: 'to show',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich zeige dir den Weg.', english: 'I show you the way.', highlight: 'dir (DAT) + den Weg (AKK)' },
      { german: 'Sie zeigt dem Touristen die Stadt.', english: 'She shows the tourist the city.', highlight: 'dem Touristen (DAT) + die Stadt (AKK)' }
    ]
  },
  {
    id: 'akkdat4',
    infinitive: 'schicken',
    english: 'to send',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich schicke dir eine Nachricht.', english: 'I send you a message.', highlight: 'dir (DAT) + eine Nachricht (AKK)' },
      { german: 'Er schickt dem Kunden die Rechnung.', english: 'He sends the customer the bill.', highlight: 'dem Kunden (DAT) + die Rechnung (AKK)' }
    ]
  },
  {
    id: 'akkdat5',
    infinitive: 'bringen',
    english: 'to bring',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich bringe dir das Essen.', english: 'I bring you the food.', highlight: 'dir (DAT) + das Essen (AKK)' },
      { german: 'Sie bringt dem Kind die Jacke.', english: 'She brings the child the jacket.', highlight: 'dem Kind (DAT) + die Jacke (AKK)' }
    ]
  },
  {
    id: 'akkdat6',
    infinitive: 'erklären',
    english: 'to explain',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich erkläre dir die Grammatik.', english: 'I explain the grammar to you.', highlight: 'dir (DAT) + die Grammatik (AKK)' },
      { german: 'Der Lehrer erklärt den Schülern das Problem.', english: 'The teacher explains the problem to the students.', highlight: 'den Schülern (DAT) + das Problem (AKK)' }
    ]
  },
  {
    id: 'akkdat7',
    infinitive: 'erzählen',
    english: 'to tell/narrate',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich erzähle dir eine Geschichte.', english: 'I tell you a story.', highlight: 'dir (DAT) + eine Geschichte (AKK)' },
      { german: 'Sie erzählt dem Kind ein Märchen.', english: 'She tells the child a fairy tale.', highlight: 'dem Kind (DAT) + ein Märchen (AKK)' }
    ]
  },
  {
    id: 'akkdat8',
    infinitive: 'leihen',
    english: 'to lend/borrow',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich leihe dir mein Auto.', english: 'I lend you my car.', highlight: 'dir (DAT) + mein Auto (AKK)' },
      { german: 'Er leiht dem Freund Geld.', english: 'He lends his friend money.', highlight: 'dem Freund (DAT) + Geld (AKK)' }
    ]
  },
  {
    id: 'akkdat9',
    infinitive: 'empfehlen',
    english: 'to recommend',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich empfehle dir dieses Restaurant.', english: 'I recommend this restaurant to you.', highlight: 'dir (DAT) + dieses Restaurant (AKK)' },
      { german: 'Der Arzt empfiehlt dem Patienten Sport.', english: 'The doctor recommends exercise to the patient.', highlight: 'dem Patienten (DAT) + Sport (AKK)' }
    ]
  },
  {
    id: 'akkdat10',
    infinitive: 'versprechen',
    english: 'to promise',
    case: 'akkusativ+dativ',
    examples: [
      { german: 'Ich verspreche dir die Wahrheit.', english: 'I promise you the truth.', highlight: 'dir (DAT) + die Wahrheit (AKK)' },
      { german: 'Er verspricht dem Kind ein Geschenk.', english: 'He promises the child a gift.', highlight: 'dem Kind (DAT) + ein Geschenk (AKK)' }
    ]
  }
];

// Genitiv verbs (B2 level)
export const genitivVerbs: CaseVerb[] = [
  {
    id: 'gen1',
    infinitive: 'sich erinnern',
    english: 'to remember',
    case: 'genitiv',
    examples: [
      { german: 'Ich erinnere mich des Tages.', english: 'I remember the day.', highlight: 'des Tages' },
      { german: 'Er erinnert sich seiner Kindheit.', english: 'He remembers his childhood.', highlight: 'seiner Kindheit' }
    ],
    notes: 'Often replaced with "an + Akkusativ" in spoken German'
  },
  {
    id: 'gen2',
    infinitive: 'bedürfen',
    english: 'to require/need',
    case: 'genitiv',
    examples: [
      { german: 'Das bedarf keiner Erklärung.', english: 'That requires no explanation.', highlight: 'keiner Erklärung' },
      { german: 'Es bedarf großer Anstrengung.', english: 'It requires great effort.', highlight: 'großer Anstrengung' }
    ]
  },
  {
    id: 'gen3',
    infinitive: 'sich schämen',
    english: 'to be ashamed',
    case: 'genitiv',
    examples: [
      { german: 'Er schämt sich seiner Tat.', english: 'He is ashamed of his deed.', highlight: 'seiner Tat' },
      { german: 'Sie schämt sich dessen.', english: 'She is ashamed of it.', highlight: 'dessen' }
    ]
  },
  {
    id: 'gen4',
    infinitive: 'sich annehmen',
    english: 'to take care of',
    case: 'genitiv',
    examples: [
      { german: 'Sie nimmt sich der Sache an.', english: 'She takes care of the matter.', highlight: 'der Sache' },
      { german: 'Er nimmt sich des Problems an.', english: 'He takes care of the problem.', highlight: 'des Problems' }
    ]
  },
  {
    id: 'gen5',
    infinitive: 'sich bemächtigen',
    english: 'to seize/take control',
    case: 'genitiv',
    examples: [
      { german: 'Er bemächtigte sich der Macht.', english: 'He seized power.', highlight: 'der Macht' },
      { german: 'Panik bemächtigte sich seiner.', english: 'Panic took hold of him.', highlight: 'seiner' }
    ]
  }
];

export const verbs: Verb[] = [
  // Regular verbs
  {
    id: 'v1',
    infinitive: 'machen',
    english: 'to make/do',
    präsens: {
      ich: 'mache',
      du: 'machst',
      'er/sie/es': 'macht',
      wir: 'machen',
      ihr: 'macht',
      sie: 'machen'
    },
    präteritum: {
      ich: 'machte',
      du: 'machtest',
      'er/sie/es': 'machte',
      wir: 'machten',
      ihr: 'machtet',
      sie: 'machten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gemacht' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gemacht' },
    futurI: {
      ich: 'werde machen',
      du: 'wirst machen',
      'er/sie/es': 'wird machen',
      wir: 'werden machen',
      ihr: 'werdet machen',
      sie: 'werden machen'
    },
    konjunktivI: {
      ich: 'mache',
      du: 'machest',
      'er/sie/es': 'mache',
      wir: 'machen',
      ihr: 'machet',
      sie: 'machen'
    },
    konjunktivII: {
      ich: 'machte',
      du: 'machtest',
      'er/sie/es': 'machte',
      wir: 'machten',
      ihr: 'machtet',
      sie: 'machten'
    },
    difficulty: 'beginner',
    category: 'regular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich mache meine Hausaufgaben.', english: 'I do my homework.', tense: 'präsens' },
      { german: 'Er machte einen Fehler.', english: 'He made a mistake.', tense: 'präteritum' },
      { german: 'Sie hat Kaffee gemacht.', english: 'She made coffee.', tense: 'perfekt' },
      { german: 'Ich werde das morgen machen.', english: 'I will do that tomorrow.', tense: 'futurI' }
    ]
  },
  {
    id: 'v2',
    infinitive: 'spielen',
    english: 'to play',
    präsens: {
      ich: 'spiele',
      du: 'spielst',
      'er/sie/es': 'spielt',
      wir: 'spielen',
      ihr: 'spielt',
      sie: 'spielen'
    },
    präteritum: {
      ich: 'spielte',
      du: 'spieltest',
      'er/sie/es': 'spielte',
      wir: 'spielten',
      ihr: 'spieltet',
      sie: 'spielten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gespielt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gespielt' },
    futurI: {
      ich: 'werde spielen',
      du: 'wirst spielen',
      'er/sie/es': 'wird spielen',
      wir: 'werden spielen',
      ihr: 'werdet spielen',
      sie: 'werden spielen'
    },
    konjunktivI: {
      ich: 'spiele',
      du: 'spielest',
      'er/sie/es': 'spiele',
      wir: 'spielen',
      ihr: 'spielet',
      sie: 'spielen'
    },
    konjunktivII: {
      ich: 'spielte',
      du: 'spieltest',
      'er/sie/es': 'spielte',
      wir: 'spielten',
      ihr: 'spieltet',
      sie: 'spielten'
    },
    difficulty: 'beginner',
    category: 'regular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Die Kinder spielen im Garten.', english: 'The children play in the garden.', tense: 'präsens' },
      { german: 'Wir spielten gestern Fußball.', english: 'We played football yesterday.', tense: 'präteritum' },
      { german: 'Ich habe Klavier gespielt.', english: 'I played piano.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v3',
    infinitive: 'lernen',
    english: 'to learn',
    präsens: {
      ich: 'lerne',
      du: 'lernst',
      'er/sie/es': 'lernt',
      wir: 'lernen',
      ihr: 'lernt',
      sie: 'lernen'
    },
    präteritum: {
      ich: 'lernte',
      du: 'lerntest',
      'er/sie/es': 'lernte',
      wir: 'lernten',
      ihr: 'lerntet',
      sie: 'lernten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gelernt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gelernt' },
    futurI: {
      ich: 'werde lernen',
      du: 'wirst lernen',
      'er/sie/es': 'wird lernen',
      wir: 'werden lernen',
      ihr: 'werdet lernen',
      sie: 'werden lernen'
    },
    konjunktivI: {
      ich: 'lerne',
      du: 'lernest',
      'er/sie/es': 'lerne',
      wir: 'lernen',
      ihr: 'lernet',
      sie: 'lernen'
    },
    konjunktivII: {
      ich: 'lernte',
      du: 'lerntest',
      'er/sie/es': 'lernte',
      wir: 'lernten',
      ihr: 'lerntet',
      sie: 'lernten'
    },
    difficulty: 'beginner',
    category: 'regular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich lerne Deutsch.', english: 'I learn German.', tense: 'präsens' },
      { german: 'Er lernte fleißig.', english: 'He studied diligently.', tense: 'präteritum' },
      { german: 'Sie hat viel gelernt.', english: 'She learned a lot.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v4',
    infinitive: 'arbeiten',
    english: 'to work',
    präsens: {
      ich: 'arbeite',
      du: 'arbeitest',
      'er/sie/es': 'arbeitet',
      wir: 'arbeiten',
      ihr: 'arbeitet',
      sie: 'arbeiten'
    },
    präteritum: {
      ich: 'arbeitete',
      du: 'arbeitetest',
      'er/sie/es': 'arbeitete',
      wir: 'arbeiteten',
      ihr: 'arbeitetet',
      sie: 'arbeiteten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gearbeitet' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gearbeitet' },
    futurI: {
      ich: 'werde arbeiten',
      du: 'wirst arbeiten',
      'er/sie/es': 'wird arbeiten',
      wir: 'werden arbeiten',
      ihr: 'werdet arbeiten',
      sie: 'werden arbeiten'
    },
    konjunktivI: {
      ich: 'arbeite',
      du: 'arbeitest',
      'er/sie/es': 'arbeite',
      wir: 'arbeiten',
      ihr: 'arbeitet',
      sie: 'arbeiten'
    },
    konjunktivII: {
      ich: 'arbeitete',
      du: 'arbeitetest',
      'er/sie/es': 'arbeitete',
      wir: 'arbeiteten',
      ihr: 'arbeitetet',
      sie: 'arbeiteten'
    },
    difficulty: 'beginner',
    category: 'regular',
    examples: [
      { german: 'Er arbeitet im Büro.', english: 'He works in the office.', tense: 'präsens' },
      { german: 'Sie arbeitete den ganzen Tag.', english: 'She worked all day.', tense: 'präteritum' },
      { german: 'Ich habe heute viel gearbeitet.', english: 'I worked a lot today.', tense: 'perfekt' }
    ]
  },
  
  // Irregular verbs
  {
    id: 'v5',
    infinitive: 'sein',
    english: 'to be',
    präsens: {
      ich: 'bin',
      du: 'bist',
      'er/sie/es': 'ist',
      wir: 'sind',
      ihr: 'seid',
      sie: 'sind'
    },
    präteritum: {
      ich: 'war',
      du: 'warst',
      'er/sie/es': 'war',
      wir: 'waren',
      ihr: 'wart',
      sie: 'waren'
    },
    perfekt: { auxiliary: 'sein', participle: 'gewesen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gewesen' },
    futurI: {
      ich: 'werde sein',
      du: 'wirst sein',
      'er/sie/es': 'wird sein',
      wir: 'werden sein',
      ihr: 'werdet sein',
      sie: 'werden sein'
    },
    konjunktivI: {
      ich: 'sei',
      du: 'sei(e)st',
      'er/sie/es': 'sei',
      wir: 'seien',
      ihr: 'seiet',
      sie: 'seien'
    },
    konjunktivII: {
      ich: 'wäre',
      du: 'wär(e)st',
      'er/sie/es': 'wäre',
      wir: 'wären',
      ihr: 'wär(e)t',
      sie: 'wären'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich bin müde.', english: 'I am tired.', tense: 'präsens' },
      { german: 'Er war gestern krank.', english: 'He was sick yesterday.', tense: 'präteritum' },
      { german: 'Sie ist Lehrerin gewesen.', english: 'She was a teacher.', tense: 'perfekt' },
      { german: 'Wenn ich reich wäre...', english: 'If I were rich...', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v6',
    infinitive: 'haben',
    english: 'to have',
    präsens: {
      ich: 'habe',
      du: 'hast',
      'er/sie/es': 'hat',
      wir: 'haben',
      ihr: 'habt',
      sie: 'haben'
    },
    präteritum: {
      ich: 'hatte',
      du: 'hattest',
      'er/sie/es': 'hatte',
      wir: 'hatten',
      ihr: 'hattet',
      sie: 'hatten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gehabt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gehabt' },
    futurI: {
      ich: 'werde haben',
      du: 'wirst haben',
      'er/sie/es': 'wird haben',
      wir: 'werden haben',
      ihr: 'werdet haben',
      sie: 'werden haben'
    },
    konjunktivI: {
      ich: 'habe',
      du: 'habest',
      'er/sie/es': 'habe',
      wir: 'haben',
      ihr: 'habet',
      sie: 'haben'
    },
    konjunktivII: {
      ich: 'hätte',
      du: 'hättest',
      'er/sie/es': 'hätte',
      wir: 'hätten',
      ihr: 'hättet',
      sie: 'hätten'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich habe einen Hund.', english: 'I have a dog.', tense: 'präsens' },
      { german: 'Er hatte keine Zeit.', english: 'He had no time.', tense: 'präteritum' },
      { german: 'Sie hat Glück gehabt.', english: 'She was lucky.', tense: 'perfekt' },
      { german: 'Wenn ich Zeit hätte...', english: 'If I had time...', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v7',
    infinitive: 'werden',
    english: 'to become',
    präsens: {
      ich: 'werde',
      du: 'wirst',
      'er/sie/es': 'wird',
      wir: 'werden',
      ihr: 'werdet',
      sie: 'werden'
    },
    präteritum: {
      ich: 'wurde',
      du: 'wurdest',
      'er/sie/es': 'wurde',
      wir: 'wurden',
      ihr: 'wurdet',
      sie: 'wurden'
    },
    perfekt: { auxiliary: 'sein', participle: 'geworden' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'geworden' },
    futurI: {
      ich: 'werde werden',
      du: 'wirst werden',
      'er/sie/es': 'wird werden',
      wir: 'werden werden',
      ihr: 'werdet werden',
      sie: 'werden werden'
    },
    konjunktivI: {
      ich: 'werde',
      du: 'werdest',
      'er/sie/es': 'werde',
      wir: 'werden',
      ihr: 'werdet',
      sie: 'werden'
    },
    konjunktivII: {
      ich: 'würde',
      du: 'würdest',
      'er/sie/es': 'würde',
      wir: 'würden',
      ihr: 'würdet',
      sie: 'würden'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Es wird kalt.', english: 'It\'s getting cold.', tense: 'präsens' },
      { german: 'Er wurde Arzt.', english: 'He became a doctor.', tense: 'präteritum' },
      { german: 'Sie ist Mutter geworden.', english: 'She became a mother.', tense: 'perfekt' },
      { german: 'Ich würde gern kommen.', english: 'I would like to come.', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v8',
    infinitive: 'gehen',
    english: 'to go',
    präsens: {
      ich: 'gehe',
      du: 'gehst',
      'er/sie/es': 'geht',
      wir: 'gehen',
      ihr: 'geht',
      sie: 'gehen'
    },
    präteritum: {
      ich: 'ging',
      du: 'gingst',
      'er/sie/es': 'ging',
      wir: 'gingen',
      ihr: 'gingt',
      sie: 'gingen'
    },
    perfekt: { auxiliary: 'sein', participle: 'gegangen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gegangen' },
    futurI: {
      ich: 'werde gehen',
      du: 'wirst gehen',
      'er/sie/es': 'wird gehen',
      wir: 'werden gehen',
      ihr: 'werdet gehen',
      sie: 'werden gehen'
    },
    konjunktivI: {
      ich: 'gehe',
      du: 'gehest',
      'er/sie/es': 'gehe',
      wir: 'gehen',
      ihr: 'gehet',
      sie: 'gehen'
    },
    konjunktivII: {
      ich: 'ginge',
      du: 'gingest',
      'er/sie/es': 'ginge',
      wir: 'gingen',
      ihr: 'ginget',
      sie: 'gingen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich gehe zur Schule.', english: 'I go to school.', tense: 'präsens' },
      { german: 'Er ging nach Hause.', english: 'He went home.', tense: 'präteritum' },
      { german: 'Sie ist einkaufen gegangen.', english: 'She went shopping.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v9',
    infinitive: 'kommen',
    english: 'to come',
    präsens: {
      ich: 'komme',
      du: 'kommst',
      'er/sie/es': 'kommt',
      wir: 'kommen',
      ihr: 'kommt',
      sie: 'kommen'
    },
    präteritum: {
      ich: 'kam',
      du: 'kamst',
      'er/sie/es': 'kam',
      wir: 'kamen',
      ihr: 'kamt',
      sie: 'kamen'
    },
    perfekt: { auxiliary: 'sein', participle: 'gekommen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gekommen' },
    futurI: {
      ich: 'werde kommen',
      du: 'wirst kommen',
      'er/sie/es': 'wird kommen',
      wir: 'werden kommen',
      ihr: 'werdet kommen',
      sie: 'werden kommen'
    },
    konjunktivI: {
      ich: 'komme',
      du: 'kommest',
      'er/sie/es': 'komme',
      wir: 'kommen',
      ihr: 'kommet',
      sie: 'kommen'
    },
    konjunktivII: {
      ich: 'käme',
      du: 'kämest',
      'er/sie/es': 'käme',
      wir: 'kämen',
      ihr: 'kämet',
      sie: 'kämen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Er kommt aus Deutschland.', english: 'He comes from Germany.', tense: 'präsens' },
      { german: 'Sie kam spät.', english: 'She came late.', tense: 'präteritum' },
      { german: 'Wir sind pünktlich gekommen.', english: 'We came on time.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v10',
    infinitive: 'sehen',
    english: 'to see',
    präsens: {
      ich: 'sehe',
      du: 'siehst',
      'er/sie/es': 'sieht',
      wir: 'sehen',
      ihr: 'seht',
      sie: 'sehen'
    },
    präteritum: {
      ich: 'sah',
      du: 'sahst',
      'er/sie/es': 'sah',
      wir: 'sahen',
      ihr: 'saht',
      sie: 'sahen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gesehen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gesehen' },
    futurI: {
      ich: 'werde sehen',
      du: 'wirst sehen',
      'er/sie/es': 'wird sehen',
      wir: 'werden sehen',
      ihr: 'werdet sehen',
      sie: 'werden sehen'
    },
    konjunktivI: {
      ich: 'sehe',
      du: 'sehest',
      'er/sie/es': 'sehe',
      wir: 'sehen',
      ihr: 'sehet',
      sie: 'sehen'
    },
    konjunktivII: {
      ich: 'sähe',
      du: 'sähest',
      'er/sie/es': 'sähe',
      wir: 'sähen',
      ihr: 'sähet',
      sie: 'sähen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich sehe einen Film.', english: 'I see a movie.', tense: 'präsens' },
      { german: 'Er sah sie nicht.', english: 'He didn\'t see her.', tense: 'präteritum' },
      { german: 'Hast du das gesehen?', english: 'Did you see that?', tense: 'perfekt' }
    ]
  },
  {
    id: 'v11',
    infinitive: 'essen',
    english: 'to eat',
    präsens: {
      ich: 'esse',
      du: 'isst',
      'er/sie/es': 'isst',
      wir: 'essen',
      ihr: 'esst',
      sie: 'essen'
    },
    präteritum: {
      ich: 'aß',
      du: 'aßt',
      'er/sie/es': 'aß',
      wir: 'aßen',
      ihr: 'aßt',
      sie: 'aßen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gegessen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gegessen' },
    futurI: {
      ich: 'werde essen',
      du: 'wirst essen',
      'er/sie/es': 'wird essen',
      wir: 'werden essen',
      ihr: 'werdet essen',
      sie: 'werden essen'
    },
    konjunktivI: {
      ich: 'esse',
      du: 'essest',
      'er/sie/es': 'esse',
      wir: 'essen',
      ihr: 'esset',
      sie: 'essen'
    },
    konjunktivII: {
      ich: 'äße',
      du: 'äßest',
      'er/sie/es': 'äße',
      wir: 'äßen',
      ihr: 'äßet',
      sie: 'äßen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Was isst du gern?', english: 'What do you like to eat?', tense: 'präsens' },
      { german: 'Er aß das ganze Brot.', english: 'He ate all the bread.', tense: 'präteritum' },
      { german: 'Wir haben Pizza gegessen.', english: 'We ate pizza.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v12',
    infinitive: 'trinken',
    english: 'to drink',
    präsens: {
      ich: 'trinke',
      du: 'trinkst',
      'er/sie/es': 'trinkt',
      wir: 'trinken',
      ihr: 'trinkt',
      sie: 'trinken'
    },
    präteritum: {
      ich: 'trank',
      du: 'trankst',
      'er/sie/es': 'trank',
      wir: 'tranken',
      ihr: 'trankt',
      sie: 'tranken'
    },
    perfekt: { auxiliary: 'haben', participle: 'getrunken' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'getrunken' },
    futurI: {
      ich: 'werde trinken',
      du: 'wirst trinken',
      'er/sie/es': 'wird trinken',
      wir: 'werden trinken',
      ihr: 'werdet trinken',
      sie: 'werden trinken'
    },
    konjunktivI: {
      ich: 'trinke',
      du: 'trinkest',
      'er/sie/es': 'trinke',
      wir: 'trinken',
      ihr: 'trinket',
      sie: 'trinken'
    },
    konjunktivII: {
      ich: 'tränke',
      du: 'tränkest',
      'er/sie/es': 'tränke',
      wir: 'tränken',
      ihr: 'tränket',
      sie: 'tränken'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich trinke Wasser.', english: 'I drink water.', tense: 'präsens' },
      { german: 'Sie trank viel Kaffee.', english: 'She drank a lot of coffee.', tense: 'präteritum' },
      { german: 'Er hat Bier getrunken.', english: 'He drank beer.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v13',
    infinitive: 'schlafen',
    english: 'to sleep',
    präsens: {
      ich: 'schlafe',
      du: 'schläfst',
      'er/sie/es': 'schläft',
      wir: 'schlafen',
      ihr: 'schlaft',
      sie: 'schlafen'
    },
    präteritum: {
      ich: 'schlief',
      du: 'schliefst',
      'er/sie/es': 'schlief',
      wir: 'schliefen',
      ihr: 'schlieft',
      sie: 'schliefen'
    },
    perfekt: { auxiliary: 'haben', participle: 'geschlafen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'geschlafen' },
    futurI: {
      ich: 'werde schlafen',
      du: 'wirst schlafen',
      'er/sie/es': 'wird schlafen',
      wir: 'werden schlafen',
      ihr: 'werdet schlafen',
      sie: 'werden schlafen'
    },
    konjunktivI: {
      ich: 'schlafe',
      du: 'schlafest',
      'er/sie/es': 'schlafe',
      wir: 'schlafen',
      ihr: 'schlafet',
      sie: 'schlafen'
    },
    konjunktivII: {
      ich: 'schliefe',
      du: 'schliefest',
      'er/sie/es': 'schliefe',
      wir: 'schliefen',
      ihr: 'schliefet',
      sie: 'schliefen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    examples: [
      { german: 'Das Baby schläft.', english: 'The baby is sleeping.', tense: 'präsens' },
      { german: 'Er schlief 10 Stunden.', english: 'He slept 10 hours.', tense: 'präteritum' },
      { german: 'Ich habe gut geschlafen.', english: 'I slept well.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v14',
    infinitive: 'lesen',
    english: 'to read',
    präsens: {
      ich: 'lese',
      du: 'liest',
      'er/sie/es': 'liest',
      wir: 'lesen',
      ihr: 'lest',
      sie: 'lesen'
    },
    präteritum: {
      ich: 'las',
      du: 'last',
      'er/sie/es': 'las',
      wir: 'lasen',
      ihr: 'last',
      sie: 'lasen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gelesen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gelesen' },
    futurI: {
      ich: 'werde lesen',
      du: 'wirst lesen',
      'er/sie/es': 'wird lesen',
      wir: 'werden lesen',
      ihr: 'werdet lesen',
      sie: 'werden lesen'
    },
    konjunktivI: {
      ich: 'lese',
      du: 'lesest',
      'er/sie/es': 'lese',
      wir: 'lesen',
      ihr: 'leset',
      sie: 'lesen'
    },
    konjunktivII: {
      ich: 'läse',
      du: 'läsest',
      'er/sie/es': 'läse',
      wir: 'läsen',
      ihr: 'läset',
      sie: 'läsen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Sie liest ein Buch.', english: 'She reads a book.', tense: 'präsens' },
      { german: 'Er las die Zeitung.', english: 'He read the newspaper.', tense: 'präteritum' },
      { german: 'Ich habe das Buch gelesen.', english: 'I read the book.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v15',
    infinitive: 'schreiben',
    english: 'to write',
    präsens: {
      ich: 'schreibe',
      du: 'schreibst',
      'er/sie/es': 'schreibt',
      wir: 'schreiben',
      ihr: 'schreibt',
      sie: 'schreiben'
    },
    präteritum: {
      ich: 'schrieb',
      du: 'schriebst',
      'er/sie/es': 'schrieb',
      wir: 'schrieben',
      ihr: 'schriebt',
      sie: 'schrieben'
    },
    perfekt: { auxiliary: 'haben', participle: 'geschrieben' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'geschrieben' },
    futurI: {
      ich: 'werde schreiben',
      du: 'wirst schreiben',
      'er/sie/es': 'wird schreiben',
      wir: 'werden schreiben',
      ihr: 'werdet schreiben',
      sie: 'werden schreiben'
    },
    konjunktivI: {
      ich: 'schreibe',
      du: 'schreibest',
      'er/sie/es': 'schreibe',
      wir: 'schreiben',
      ihr: 'schreibet',
      sie: 'schreiben'
    },
    konjunktivII: {
      ich: 'schriebe',
      du: 'schriebest',
      'er/sie/es': 'schriebe',
      wir: 'schrieben',
      ihr: 'schriebet',
      sie: 'schrieben'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich schreibe einen Brief.', english: 'I write a letter.', tense: 'präsens' },
      { german: 'Sie schrieb eine E-Mail.', english: 'She wrote an email.', tense: 'präteritum' },
      { german: 'Er hat das Buch geschrieben.', english: 'He wrote the book.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v16',
    infinitive: 'sprechen',
    english: 'to speak',
    präsens: {
      ich: 'spreche',
      du: 'sprichst',
      'er/sie/es': 'spricht',
      wir: 'sprechen',
      ihr: 'sprecht',
      sie: 'sprechen'
    },
    präteritum: {
      ich: 'sprach',
      du: 'sprachst',
      'er/sie/es': 'sprach',
      wir: 'sprachen',
      ihr: 'spracht',
      sie: 'sprachen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gesprochen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gesprochen' },
    futurI: {
      ich: 'werde sprechen',
      du: 'wirst sprechen',
      'er/sie/es': 'wird sprechen',
      wir: 'werden sprechen',
      ihr: 'werdet sprechen',
      sie: 'werden sprechen'
    },
    konjunktivI: {
      ich: 'spreche',
      du: 'sprechest',
      'er/sie/es': 'spreche',
      wir: 'sprechen',
      ihr: 'sprechet',
      sie: 'sprechen'
    },
    konjunktivII: {
      ich: 'spräche',
      du: 'sprächest',
      'er/sie/es': 'spräche',
      wir: 'sprächen',
      ihr: 'sprächet',
      sie: 'sprächen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Er spricht Deutsch.', english: 'He speaks German.', tense: 'präsens' },
      { german: 'Sie sprach mit ihm.', english: 'She spoke with him.', tense: 'präteritum' },
      { german: 'Wir haben über das Thema gesprochen.', english: 'We spoke about the topic.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v17',
    infinitive: 'nehmen',
    english: 'to take',
    präsens: {
      ich: 'nehme',
      du: 'nimmst',
      'er/sie/es': 'nimmt',
      wir: 'nehmen',
      ihr: 'nehmt',
      sie: 'nehmen'
    },
    präteritum: {
      ich: 'nahm',
      du: 'nahmst',
      'er/sie/es': 'nahm',
      wir: 'nahmen',
      ihr: 'nahmt',
      sie: 'nahmen'
    },
    perfekt: { auxiliary: 'haben', participle: 'genommen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'genommen' },
    futurI: {
      ich: 'werde nehmen',
      du: 'wirst nehmen',
      'er/sie/es': 'wird nehmen',
      wir: 'werden nehmen',
      ihr: 'werdet nehmen',
      sie: 'werden nehmen'
    },
    konjunktivI: {
      ich: 'nehme',
      du: 'nehmest',
      'er/sie/es': 'nehme',
      wir: 'nehmen',
      ihr: 'nehmet',
      sie: 'nehmen'
    },
    konjunktivII: {
      ich: 'nähme',
      du: 'nähmest',
      'er/sie/es': 'nähme',
      wir: 'nähmen',
      ihr: 'nähmet',
      sie: 'nähmen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich nehme den Bus.', english: 'I take the bus.', tense: 'präsens' },
      { german: 'Er nahm seine Tasche.', english: 'He took his bag.', tense: 'präteritum' },
      { german: 'Sie hat das Geld genommen.', english: 'She took the money.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v18',
    infinitive: 'geben',
    english: 'to give',
    präsens: {
      ich: 'gebe',
      du: 'gibst',
      'er/sie/es': 'gibt',
      wir: 'geben',
      ihr: 'gebt',
      sie: 'geben'
    },
    präteritum: {
      ich: 'gab',
      du: 'gabst',
      'er/sie/es': 'gab',
      wir: 'gaben',
      ihr: 'gabt',
      sie: 'gaben'
    },
    perfekt: { auxiliary: 'haben', participle: 'gegeben' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gegeben' },
    futurI: {
      ich: 'werde geben',
      du: 'wirst geben',
      'er/sie/es': 'wird geben',
      wir: 'werden geben',
      ihr: 'werdet geben',
      sie: 'werden geben'
    },
    konjunktivI: {
      ich: 'gebe',
      du: 'gebest',
      'er/sie/es': 'gebe',
      wir: 'geben',
      ihr: 'gebet',
      sie: 'geben'
    },
    konjunktivII: {
      ich: 'gäbe',
      du: 'gäbest',
      'er/sie/es': 'gäbe',
      wir: 'gäben',
      ihr: 'gäbet',
      sie: 'gäben'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ+dativ',
    examples: [
      { german: 'Er gibt mir das Buch.', english: 'He gives me the book.', tense: 'präsens' },
      { german: 'Sie gab ihm einen Kuss.', english: 'She gave him a kiss.', tense: 'präteritum' },
      { german: 'Ich habe dir das Geld gegeben.', english: 'I gave you the money.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v19',
    infinitive: 'fahren',
    english: 'to drive/travel',
    präsens: {
      ich: 'fahre',
      du: 'fährst',
      'er/sie/es': 'fährt',
      wir: 'fahren',
      ihr: 'fahrt',
      sie: 'fahren'
    },
    präteritum: {
      ich: 'fuhr',
      du: 'fuhrst',
      'er/sie/es': 'fuhr',
      wir: 'fuhren',
      ihr: 'fuhrt',
      sie: 'fuhren'
    },
    perfekt: { auxiliary: 'sein', participle: 'gefahren' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gefahren' },
    futurI: {
      ich: 'werde fahren',
      du: 'wirst fahren',
      'er/sie/es': 'wird fahren',
      wir: 'werden fahren',
      ihr: 'werdet fahren',
      sie: 'werden fahren'
    },
    konjunktivI: {
      ich: 'fahre',
      du: 'fahrest',
      'er/sie/es': 'fahre',
      wir: 'fahren',
      ihr: 'fahret',
      sie: 'fahren'
    },
    konjunktivII: {
      ich: 'führe',
      du: 'führest',
      'er/sie/es': 'führe',
      wir: 'führen',
      ihr: 'führet',
      sie: 'führen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Er fährt nach Berlin.', english: 'He drives to Berlin.', tense: 'präsens' },
      { german: 'Wir fuhren mit dem Zug.', english: 'We traveled by train.', tense: 'präteritum' },
      { german: 'Sie ist nach Hause gefahren.', english: 'She drove home.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v20',
    infinitive: 'finden',
    english: 'to find',
    präsens: {
      ich: 'finde',
      du: 'findest',
      'er/sie/es': 'findet',
      wir: 'finden',
      ihr: 'findet',
      sie: 'finden'
    },
    präteritum: {
      ich: 'fand',
      du: 'fandest',
      'er/sie/es': 'fand',
      wir: 'fanden',
      ihr: 'fandet',
      sie: 'fanden'
    },
    perfekt: { auxiliary: 'haben', participle: 'gefunden' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gefunden' },
    futurI: {
      ich: 'werde finden',
      du: 'wirst finden',
      'er/sie/es': 'wird finden',
      wir: 'werden finden',
      ihr: 'werdet finden',
      sie: 'werden finden'
    },
    konjunktivI: {
      ich: 'finde',
      du: 'findest',
      'er/sie/es': 'finde',
      wir: 'finden',
      ihr: 'findet',
      sie: 'finden'
    },
    konjunktivII: {
      ich: 'fände',
      du: 'fändest',
      'er/sie/es': 'fände',
      wir: 'fänden',
      ihr: 'fändet',
      sie: 'fänden'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich finde das interessant.', english: 'I find that interesting.', tense: 'präsens' },
      { german: 'Er fand seinen Schlüssel.', english: 'He found his key.', tense: 'präteritum' },
      { german: 'Hast du die Lösung gefunden?', english: 'Did you find the solution?', tense: 'perfekt' }
    ]
  },
  
  // Modal verbs
  {
    id: 'v21',
    infinitive: 'können',
    english: 'can/to be able to',
    präsens: {
      ich: 'kann',
      du: 'kannst',
      'er/sie/es': 'kann',
      wir: 'können',
      ihr: 'könnt',
      sie: 'können'
    },
    präteritum: {
      ich: 'konnte',
      du: 'konntest',
      'er/sie/es': 'konnte',
      wir: 'konnten',
      ihr: 'konntet',
      sie: 'konnten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gekonnt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gekonnt' },
    futurI: {
      ich: 'werde können',
      du: 'wirst können',
      'er/sie/es': 'wird können',
      wir: 'werden können',
      ihr: 'werdet können',
      sie: 'werden können'
    },
    konjunktivI: {
      ich: 'könne',
      du: 'könnest',
      'er/sie/es': 'könne',
      wir: 'können',
      ihr: 'könnet',
      sie: 'können'
    },
    konjunktivII: {
      ich: 'könnte',
      du: 'könntest',
      'er/sie/es': 'könnte',
      wir: 'könnten',
      ihr: 'könntet',
      sie: 'könnten'
    },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich kann schwimmen.', english: 'I can swim.', tense: 'präsens' },
      { german: 'Er konnte nicht kommen.', english: 'He could not come.', tense: 'präteritum' },
      { german: 'Könntest du mir helfen?', english: 'Could you help me?', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v22',
    infinitive: 'müssen',
    english: 'must/to have to',
    präsens: {
      ich: 'muss',
      du: 'musst',
      'er/sie/es': 'muss',
      wir: 'müssen',
      ihr: 'müsst',
      sie: 'müssen'
    },
    präteritum: {
      ich: 'musste',
      du: 'musstest',
      'er/sie/es': 'musste',
      wir: 'mussten',
      ihr: 'musstet',
      sie: 'mussten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gemusst' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gemusst' },
    futurI: {
      ich: 'werde müssen',
      du: 'wirst müssen',
      'er/sie/es': 'wird müssen',
      wir: 'werden müssen',
      ihr: 'werdet müssen',
      sie: 'werden müssen'
    },
    konjunktivI: {
      ich: 'müsse',
      du: 'müssest',
      'er/sie/es': 'müsse',
      wir: 'müssen',
      ihr: 'müsset',
      sie: 'müssen'
    },
    konjunktivII: {
      ich: 'müsste',
      du: 'müsstest',
      'er/sie/es': 'müsste',
      wir: 'müssten',
      ihr: 'müsstet',
      sie: 'müssten'
    },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich muss arbeiten.', english: 'I have to work.', tense: 'präsens' },
      { german: 'Er musste gehen.', english: 'He had to go.', tense: 'präteritum' },
      { german: 'Ich müsste eigentlich lernen.', english: 'I really should study.', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v23',
    infinitive: 'wollen',
    english: 'to want',
    präsens: {
      ich: 'will',
      du: 'willst',
      'er/sie/es': 'will',
      wir: 'wollen',
      ihr: 'wollt',
      sie: 'wollen'
    },
    präteritum: {
      ich: 'wollte',
      du: 'wolltest',
      'er/sie/es': 'wollte',
      wir: 'wollten',
      ihr: 'wolltet',
      sie: 'wollten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gewollt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gewollt' },
    futurI: {
      ich: 'werde wollen',
      du: 'wirst wollen',
      'er/sie/es': 'wird wollen',
      wir: 'werden wollen',
      ihr: 'werdet wollen',
      sie: 'werden wollen'
    },
    konjunktivI: {
      ich: 'wolle',
      du: 'wollest',
      'er/sie/es': 'wolle',
      wir: 'wollen',
      ihr: 'wollet',
      sie: 'wollen'
    },
    konjunktivII: {
      ich: 'wollte',
      du: 'wolltest',
      'er/sie/es': 'wollte',
      wir: 'wollten',
      ihr: 'wolltet',
      sie: 'wollten'
    },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Ich will nach Hause.', english: 'I want to go home.', tense: 'präsens' },
      { german: 'Sie wollte das nicht.', english: 'She didn\'t want that.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v24',
    infinitive: 'sollen',
    english: 'should/supposed to',
    präsens: {
      ich: 'soll',
      du: 'sollst',
      'er/sie/es': 'soll',
      wir: 'sollen',
      ihr: 'sollt',
      sie: 'sollen'
    },
    präteritum: {
      ich: 'sollte',
      du: 'solltest',
      'er/sie/es': 'sollte',
      wir: 'sollten',
      ihr: 'solltet',
      sie: 'sollten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gesollt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gesollt' },
    futurI: {
      ich: 'werde sollen',
      du: 'wirst sollen',
      'er/sie/es': 'wird sollen',
      wir: 'werden sollen',
      ihr: 'werdet sollen',
      sie: 'werden sollen'
    },
    konjunktivI: {
      ich: 'solle',
      du: 'sollest',
      'er/sie/es': 'solle',
      wir: 'sollen',
      ihr: 'sollet',
      sie: 'sollen'
    },
    konjunktivII: {
      ich: 'sollte',
      du: 'solltest',
      'er/sie/es': 'sollte',
      wir: 'sollten',
      ihr: 'solltet',
      sie: 'sollten'
    },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Du sollst mehr schlafen.', english: 'You should sleep more.', tense: 'präsens' },
      { german: 'Ich sollte das machen.', english: 'I should do that.', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v25',
    infinitive: 'dürfen',
    english: 'may/to be allowed',
    präsens: {
      ich: 'darf',
      du: 'darfst',
      'er/sie/es': 'darf',
      wir: 'dürfen',
      ihr: 'dürft',
      sie: 'dürfen'
    },
    präteritum: {
      ich: 'durfte',
      du: 'durftest',
      'er/sie/es': 'durfte',
      wir: 'durften',
      ihr: 'durftet',
      sie: 'durften'
    },
    perfekt: { auxiliary: 'haben', participle: 'gedurft' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gedurft' },
    futurI: {
      ich: 'werde dürfen',
      du: 'wirst dürfen',
      'er/sie/es': 'wird dürfen',
      wir: 'werden dürfen',
      ihr: 'werdet dürfen',
      sie: 'werden dürfen'
    },
    konjunktivI: {
      ich: 'dürfe',
      du: 'dürfest',
      'er/sie/es': 'dürfe',
      wir: 'dürfen',
      ihr: 'dürfet',
      sie: 'dürfen'
    },
    konjunktivII: {
      ich: 'dürfte',
      du: 'dürftest',
      'er/sie/es': 'dürfte',
      wir: 'dürften',
      ihr: 'dürftet',
      sie: 'dürften'
    },
    difficulty: 'intermediate',
    category: 'modal',
    examples: [
      { german: 'Darf ich fragen?', english: 'May I ask?', tense: 'präsens' },
      { german: 'Er durfte nicht rauchen.', english: 'He was not allowed to smoke.', tense: 'präteritum' },
      { german: 'Dürfte ich Sie stören?', english: 'Might I disturb you?', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v26',
    infinitive: 'mögen',
    english: 'to like',
    präsens: {
      ich: 'mag',
      du: 'magst',
      'er/sie/es': 'mag',
      wir: 'mögen',
      ihr: 'mögt',
      sie: 'mögen'
    },
    präteritum: {
      ich: 'mochte',
      du: 'mochtest',
      'er/sie/es': 'mochte',
      wir: 'mochten',
      ihr: 'mochtet',
      sie: 'mochten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gemocht' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gemocht' },
    futurI: {
      ich: 'werde mögen',
      du: 'wirst mögen',
      'er/sie/es': 'wird mögen',
      wir: 'werden mögen',
      ihr: 'werdet mögen',
      sie: 'werden mögen'
    },
    konjunktivI: {
      ich: 'möge',
      du: 'mögest',
      'er/sie/es': 'möge',
      wir: 'mögen',
      ihr: 'möget',
      sie: 'mögen'
    },
    konjunktivII: {
      ich: 'möchte',
      du: 'möchtest',
      'er/sie/es': 'möchte',
      wir: 'möchten',
      ihr: 'möchtet',
      sie: 'möchten'
    },
    difficulty: 'intermediate',
    category: 'modal',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich mag Schokolade.', english: 'I like chocolate.', tense: 'präsens' },
      { german: 'Er mochte sie nicht.', english: 'He didn\'t like her.', tense: 'präteritum' },
      { german: 'Ich möchte einen Kaffee.', english: 'I would like a coffee.', tense: 'konjunktivII' }
    ]
  },
  
  // Separable verbs
  {
    id: 'v27',
    infinitive: 'aufstehen',
    english: 'to get up',
    präsens: {
      ich: 'stehe auf',
      du: 'stehst auf',
      'er/sie/es': 'steht auf',
      wir: 'stehen auf',
      ihr: 'steht auf',
      sie: 'stehen auf'
    },
    präteritum: {
      ich: 'stand auf',
      du: 'standest auf',
      'er/sie/es': 'stand auf',
      wir: 'standen auf',
      ihr: 'standet auf',
      sie: 'standen auf'
    },
    perfekt: { auxiliary: 'sein', participle: 'aufgestanden' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'aufgestanden' },
    futurI: {
      ich: 'werde aufstehen',
      du: 'wirst aufstehen',
      'er/sie/es': 'wird aufstehen',
      wir: 'werden aufstehen',
      ihr: 'werdet aufstehen',
      sie: 'werden aufstehen'
    },
    konjunktivI: {
      ich: 'stehe auf',
      du: 'stehest auf',
      'er/sie/es': 'stehe auf',
      wir: 'stehen auf',
      ihr: 'stehet auf',
      sie: 'stehen auf'
    },
    konjunktivII: {
      ich: 'stände auf',
      du: 'ständest auf',
      'er/sie/es': 'stände auf',
      wir: 'ständen auf',
      ihr: 'ständet auf',
      sie: 'ständen auf'
    },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7 o\'clock.', tense: 'präsens' },
      { german: 'Er stand früh auf.', english: 'He got up early.', tense: 'präteritum' },
      { german: 'Sie ist spät aufgestanden.', english: 'She got up late.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v28',
    infinitive: 'anfangen',
    english: 'to begin',
    präsens: {
      ich: 'fange an',
      du: 'fängst an',
      'er/sie/es': 'fängt an',
      wir: 'fangen an',
      ihr: 'fangt an',
      sie: 'fangen an'
    },
    präteritum: {
      ich: 'fing an',
      du: 'fingst an',
      'er/sie/es': 'fing an',
      wir: 'fingen an',
      ihr: 'fingt an',
      sie: 'fingen an'
    },
    perfekt: { auxiliary: 'haben', participle: 'angefangen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'angefangen' },
    futurI: {
      ich: 'werde anfangen',
      du: 'wirst anfangen',
      'er/sie/es': 'wird anfangen',
      wir: 'werden anfangen',
      ihr: 'werdet anfangen',
      sie: 'werden anfangen'
    },
    konjunktivI: {
      ich: 'fange an',
      du: 'fangest an',
      'er/sie/es': 'fange an',
      wir: 'fangen an',
      ihr: 'fanget an',
      sie: 'fangen an'
    },
    konjunktivII: {
      ich: 'finge an',
      du: 'fingest an',
      'er/sie/es': 'finge an',
      wir: 'fingen an',
      ihr: 'finget an',
      sie: 'fingen an'
    },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Der Film fängt um 8 an.', english: 'The movie starts at 8.', tense: 'präsens' },
      { german: 'Es fing an zu regnen.', english: 'It started to rain.', tense: 'präteritum' },
      { german: 'Wir haben angefangen.', english: 'We have started.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v29',
    infinitive: 'einkaufen',
    english: 'to shop',
    präsens: {
      ich: 'kaufe ein',
      du: 'kaufst ein',
      'er/sie/es': 'kauft ein',
      wir: 'kaufen ein',
      ihr: 'kauft ein',
      sie: 'kaufen ein'
    },
    präteritum: {
      ich: 'kaufte ein',
      du: 'kauftest ein',
      'er/sie/es': 'kaufte ein',
      wir: 'kauften ein',
      ihr: 'kauftet ein',
      sie: 'kauften ein'
    },
    perfekt: { auxiliary: 'haben', participle: 'eingekauft' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'eingekauft' },
    futurI: {
      ich: 'werde einkaufen',
      du: 'wirst einkaufen',
      'er/sie/es': 'wird einkaufen',
      wir: 'werden einkaufen',
      ihr: 'werdet einkaufen',
      sie: 'werden einkaufen'
    },
    konjunktivI: {
      ich: 'kaufe ein',
      du: 'kaufest ein',
      'er/sie/es': 'kaufe ein',
      wir: 'kaufen ein',
      ihr: 'kaufet ein',
      sie: 'kaufen ein'
    },
    konjunktivII: {
      ich: 'kaufte ein',
      du: 'kauftest ein',
      'er/sie/es': 'kaufte ein',
      wir: 'kauften ein',
      ihr: 'kauftet ein',
      sie: 'kauften ein'
    },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Ich kaufe im Supermarkt ein.', english: 'I shop at the supermarket.', tense: 'präsens' },
      { german: 'Sie kaufte Lebensmittel ein.', english: 'She bought groceries.', tense: 'präteritum' },
      { german: 'Wir haben eingekauft.', english: 'We went shopping.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v30',
    infinitive: 'anrufen',
    english: 'to call (phone)',
    präsens: {
      ich: 'rufe an',
      du: 'rufst an',
      'er/sie/es': 'ruft an',
      wir: 'rufen an',
      ihr: 'ruft an',
      sie: 'rufen an'
    },
    präteritum: {
      ich: 'rief an',
      du: 'riefst an',
      'er/sie/es': 'rief an',
      wir: 'riefen an',
      ihr: 'rieft an',
      sie: 'riefen an'
    },
    perfekt: { auxiliary: 'haben', participle: 'angerufen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'angerufen' },
    futurI: {
      ich: 'werde anrufen',
      du: 'wirst anrufen',
      'er/sie/es': 'wird anrufen',
      wir: 'werden anrufen',
      ihr: 'werdet anrufen',
      sie: 'werden anrufen'
    },
    konjunktivI: {
      ich: 'rufe an',
      du: 'rufest an',
      'er/sie/es': 'rufe an',
      wir: 'rufen an',
      ihr: 'rufet an',
      sie: 'rufen an'
    },
    konjunktivII: {
      ich: 'riefe an',
      du: 'riefest an',
      'er/sie/es': 'riefe an',
      wir: 'riefen an',
      ihr: 'riefet an',
      sie: 'riefen an'
    },
    difficulty: 'intermediate',
    category: 'separable',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich rufe dich später an.', english: 'I\'ll call you later.', tense: 'präsens' },
      { german: 'Er rief mich gestern an.', english: 'He called me yesterday.', tense: 'präteritum' },
      { german: 'Hast du sie angerufen?', english: 'Did you call her?', tense: 'perfekt' }
    ]
  },
  {
    id: 'v31',
    infinitive: 'ausgehen',
    english: 'to go out',
    präsens: {
      ich: 'gehe aus',
      du: 'gehst aus',
      'er/sie/es': 'geht aus',
      wir: 'gehen aus',
      ihr: 'geht aus',
      sie: 'gehen aus'
    },
    präteritum: {
      ich: 'ging aus',
      du: 'gingst aus',
      'er/sie/es': 'ging aus',
      wir: 'gingen aus',
      ihr: 'gingt aus',
      sie: 'gingen aus'
    },
    perfekt: { auxiliary: 'sein', participle: 'ausgegangen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'ausgegangen' },
    futurI: {
      ich: 'werde ausgehen',
      du: 'wirst ausgehen',
      'er/sie/es': 'wird ausgehen',
      wir: 'werden ausgehen',
      ihr: 'werdet ausgehen',
      sie: 'werden ausgehen'
    },
    konjunktivI: {
      ich: 'gehe aus',
      du: 'gehest aus',
      'er/sie/es': 'gehe aus',
      wir: 'gehen aus',
      ihr: 'gehet aus',
      sie: 'gehen aus'
    },
    konjunktivII: {
      ich: 'ginge aus',
      du: 'gingest aus',
      'er/sie/es': 'ginge aus',
      wir: 'gingen aus',
      ihr: 'ginget aus',
      sie: 'gingen aus'
    },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Wir gehen heute Abend aus.', english: 'We\'re going out tonight.', tense: 'präsens' },
      { german: 'Sie ging mit Freunden aus.', english: 'She went out with friends.', tense: 'präteritum' },
      { german: 'Seid ihr ausgegangen?', english: 'Did you go out?', tense: 'perfekt' }
    ]
  },
  {
    id: 'v32',
    infinitive: 'zurückkommen',
    english: 'to come back',
    präsens: {
      ich: 'komme zurück',
      du: 'kommst zurück',
      'er/sie/es': 'kommt zurück',
      wir: 'kommen zurück',
      ihr: 'kommt zurück',
      sie: 'kommen zurück'
    },
    präteritum: {
      ich: 'kam zurück',
      du: 'kamst zurück',
      'er/sie/es': 'kam zurück',
      wir: 'kamen zurück',
      ihr: 'kamt zurück',
      sie: 'kamen zurück'
    },
    perfekt: { auxiliary: 'sein', participle: 'zurückgekommen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'zurückgekommen' },
    futurI: {
      ich: 'werde zurückkommen',
      du: 'wirst zurückkommen',
      'er/sie/es': 'wird zurückkommen',
      wir: 'werden zurückkommen',
      ihr: 'werdet zurückkommen',
      sie: 'werden zurückkommen'
    },
    konjunktivI: {
      ich: 'komme zurück',
      du: 'kommest zurück',
      'er/sie/es': 'komme zurück',
      wir: 'kommen zurück',
      ihr: 'kommet zurück',
      sie: 'kommen zurück'
    },
    konjunktivII: {
      ich: 'käme zurück',
      du: 'kämest zurück',
      'er/sie/es': 'käme zurück',
      wir: 'kämen zurück',
      ihr: 'kämet zurück',
      sie: 'kämen zurück'
    },
    difficulty: 'intermediate',
    category: 'separable',
    examples: [
      { german: 'Ich komme morgen zurück.', english: 'I\'m coming back tomorrow.', tense: 'präsens' },
      { german: 'Er kam spät zurück.', english: 'He came back late.', tense: 'präteritum' },
      { german: 'Sie ist endlich zurückgekommen.', english: 'She finally came back.', tense: 'perfekt' }
    ]
  },
  // Additional verbs for B2 coverage (33-55)
  {
    id: 'v33',
    infinitive: 'denken',
    english: 'to think',
    präsens: {
      ich: 'denke',
      du: 'denkst',
      'er/sie/es': 'denkt',
      wir: 'denken',
      ihr: 'denkt',
      sie: 'denken'
    },
    präteritum: {
      ich: 'dachte',
      du: 'dachtest',
      'er/sie/es': 'dachte',
      wir: 'dachten',
      ihr: 'dachtet',
      sie: 'dachten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gedacht' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gedacht' },
    futurI: {
      ich: 'werde denken',
      du: 'wirst denken',
      'er/sie/es': 'wird denken',
      wir: 'werden denken',
      ihr: 'werdet denken',
      sie: 'werden denken'
    },
    konjunktivI: {
      ich: 'denke',
      du: 'denkest',
      'er/sie/es': 'denke',
      wir: 'denken',
      ihr: 'denket',
      sie: 'denken'
    },
    konjunktivII: {
      ich: 'dächte',
      du: 'dächtest',
      'er/sie/es': 'dächte',
      wir: 'dächten',
      ihr: 'dächtet',
      sie: 'dächten'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich denke an dich.', english: 'I think of you.', tense: 'präsens' },
      { german: 'Er dachte lange nach.', english: 'He thought for a long time.', tense: 'präteritum' },
      { german: 'Ich hätte das nicht gedacht.', english: 'I wouldn\'t have thought that.', tense: 'konjunktivII' }
    ]
  },
  {
    id: 'v34',
    infinitive: 'bringen',
    english: 'to bring',
    präsens: {
      ich: 'bringe',
      du: 'bringst',
      'er/sie/es': 'bringt',
      wir: 'bringen',
      ihr: 'bringt',
      sie: 'bringen'
    },
    präteritum: {
      ich: 'brachte',
      du: 'brachtest',
      'er/sie/es': 'brachte',
      wir: 'brachten',
      ihr: 'brachtet',
      sie: 'brachten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gebracht' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gebracht' },
    futurI: {
      ich: 'werde bringen',
      du: 'wirst bringen',
      'er/sie/es': 'wird bringen',
      wir: 'werden bringen',
      ihr: 'werdet bringen',
      sie: 'werden bringen'
    },
    konjunktivI: {
      ich: 'bringe',
      du: 'bringest',
      'er/sie/es': 'bringe',
      wir: 'bringen',
      ihr: 'bringet',
      sie: 'bringen'
    },
    konjunktivII: {
      ich: 'brächte',
      du: 'brächtest',
      'er/sie/es': 'brächte',
      wir: 'brächten',
      ihr: 'brächtet',
      sie: 'brächten'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ+dativ',
    examples: [
      { german: 'Ich bringe dir das Buch.', english: 'I bring you the book.', tense: 'präsens' },
      { german: 'Er brachte mir Blumen.', english: 'He brought me flowers.', tense: 'präteritum' },
      { german: 'Sie hat es gebracht.', english: 'She brought it.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v35',
    infinitive: 'kennen',
    english: 'to know (person/place)',
    präsens: {
      ich: 'kenne',
      du: 'kennst',
      'er/sie/es': 'kennt',
      wir: 'kennen',
      ihr: 'kennt',
      sie: 'kennen'
    },
    präteritum: {
      ich: 'kannte',
      du: 'kanntest',
      'er/sie/es': 'kannte',
      wir: 'kannten',
      ihr: 'kanntet',
      sie: 'kannten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gekannt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gekannt' },
    futurI: {
      ich: 'werde kennen',
      du: 'wirst kennen',
      'er/sie/es': 'wird kennen',
      wir: 'werden kennen',
      ihr: 'werdet kennen',
      sie: 'werden kennen'
    },
    konjunktivI: {
      ich: 'kenne',
      du: 'kennest',
      'er/sie/es': 'kenne',
      wir: 'kennen',
      ihr: 'kennet',
      sie: 'kennen'
    },
    konjunktivII: {
      ich: 'kennte',
      du: 'kenntest',
      'er/sie/es': 'kennte',
      wir: 'kennten',
      ihr: 'kenntet',
      sie: 'kennten'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich kenne ihn gut.', english: 'I know him well.', tense: 'präsens' },
      { german: 'Sie kannte die Stadt.', english: 'She knew the city.', tense: 'präteritum' },
      { german: 'Hast du sie gekannt?', english: 'Did you know her?', tense: 'perfekt' }
    ]
  },
  {
    id: 'v36',
    infinitive: 'nennen',
    english: 'to name/call',
    präsens: {
      ich: 'nenne',
      du: 'nennst',
      'er/sie/es': 'nennt',
      wir: 'nennen',
      ihr: 'nennt',
      sie: 'nennen'
    },
    präteritum: {
      ich: 'nannte',
      du: 'nanntest',
      'er/sie/es': 'nannte',
      wir: 'nannten',
      ihr: 'nanntet',
      sie: 'nannten'
    },
    perfekt: { auxiliary: 'haben', participle: 'genannt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'genannt' },
    futurI: {
      ich: 'werde nennen',
      du: 'wirst nennen',
      'er/sie/es': 'wird nennen',
      wir: 'werden nennen',
      ihr: 'werdet nennen',
      sie: 'werden nennen'
    },
    konjunktivI: {
      ich: 'nenne',
      du: 'nennest',
      'er/sie/es': 'nenne',
      wir: 'nennen',
      ihr: 'nennet',
      sie: 'nennen'
    },
    konjunktivII: {
      ich: 'nennte',
      du: 'nenntest',
      'er/sie/es': 'nennte',
      wir: 'nennten',
      ihr: 'nenntet',
      sie: 'nennten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Wie nennt man das?', english: 'What do you call that?', tense: 'präsens' },
      { german: 'Sie nannte ihn Max.', english: 'She called him Max.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v37',
    infinitive: 'rennen',
    english: 'to run',
    präsens: {
      ich: 'renne',
      du: 'rennst',
      'er/sie/es': 'rennt',
      wir: 'rennen',
      ihr: 'rennt',
      sie: 'rennen'
    },
    präteritum: {
      ich: 'rannte',
      du: 'ranntest',
      'er/sie/es': 'rannte',
      wir: 'rannten',
      ihr: 'ranntet',
      sie: 'rannten'
    },
    perfekt: { auxiliary: 'sein', participle: 'gerannt' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gerannt' },
    futurI: {
      ich: 'werde rennen',
      du: 'wirst rennen',
      'er/sie/es': 'wird rennen',
      wir: 'werden rennen',
      ihr: 'werdet rennen',
      sie: 'werden rennen'
    },
    konjunktivI: {
      ich: 'renne',
      du: 'rennest',
      'er/sie/es': 'renne',
      wir: 'rennen',
      ihr: 'rennet',
      sie: 'rennen'
    },
    konjunktivII: {
      ich: 'rennte',
      du: 'renntest',
      'er/sie/es': 'rennte',
      wir: 'rennten',
      ihr: 'renntet',
      sie: 'rennten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    examples: [
      { german: 'Er rennt schnell.', english: 'He runs fast.', tense: 'präsens' },
      { german: 'Sie rannte nach Hause.', english: 'She ran home.', tense: 'präteritum' },
      { german: 'Wir sind gerannt.', english: 'We ran.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v38',
    infinitive: 'senden',
    english: 'to send',
    präsens: {
      ich: 'sende',
      du: 'sendest',
      'er/sie/es': 'sendet',
      wir: 'senden',
      ihr: 'sendet',
      sie: 'senden'
    },
    präteritum: {
      ich: 'sandte',
      du: 'sandtest',
      'er/sie/es': 'sandte',
      wir: 'sandten',
      ihr: 'sandtet',
      sie: 'sandten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gesandt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gesandt' },
    futurI: {
      ich: 'werde senden',
      du: 'wirst senden',
      'er/sie/es': 'wird senden',
      wir: 'werden senden',
      ihr: 'werdet senden',
      sie: 'werden senden'
    },
    konjunktivI: {
      ich: 'sende',
      du: 'sendest',
      'er/sie/es': 'sende',
      wir: 'senden',
      ihr: 'sendet',
      sie: 'senden'
    },
    konjunktivII: {
      ich: 'sendete',
      du: 'sendetest',
      'er/sie/es': 'sendete',
      wir: 'sendeten',
      ihr: 'sendetet',
      sie: 'sendeten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ+dativ',
    examples: [
      { german: 'Ich sende dir eine E-Mail.', english: 'I send you an email.', tense: 'präsens' },
      { german: 'Er sandte einen Brief.', english: 'He sent a letter.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v39',
    infinitive: 'wenden',
    english: 'to turn',
    präsens: {
      ich: 'wende',
      du: 'wendest',
      'er/sie/es': 'wendet',
      wir: 'wenden',
      ihr: 'wendet',
      sie: 'wenden'
    },
    präteritum: {
      ich: 'wandte',
      du: 'wandtest',
      'er/sie/es': 'wandte',
      wir: 'wandten',
      ihr: 'wandtet',
      sie: 'wandten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gewandt' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gewandt' },
    futurI: {
      ich: 'werde wenden',
      du: 'wirst wenden',
      'er/sie/es': 'wird wenden',
      wir: 'werden wenden',
      ihr: 'werdet wenden',
      sie: 'werden wenden'
    },
    konjunktivI: {
      ich: 'wende',
      du: 'wendest',
      'er/sie/es': 'wende',
      wir: 'wenden',
      ihr: 'wendet',
      sie: 'wenden'
    },
    konjunktivII: {
      ich: 'wendete',
      du: 'wendetest',
      'er/sie/es': 'wendete',
      wir: 'wendeten',
      ihr: 'wendetet',
      sie: 'wendeten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    examples: [
      { german: 'Ich wende mich an Sie.', english: 'I turn to you.', tense: 'präsens' },
      { german: 'Er wandte den Kopf.', english: 'He turned his head.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v40',
    infinitive: 'bitten',
    english: 'to ask/request',
    präsens: {
      ich: 'bitte',
      du: 'bittest',
      'er/sie/es': 'bittet',
      wir: 'bitten',
      ihr: 'bittet',
      sie: 'bitten'
    },
    präteritum: {
      ich: 'bat',
      du: 'bat(e)st',
      'er/sie/es': 'bat',
      wir: 'baten',
      ihr: 'batet',
      sie: 'baten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gebeten' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gebeten' },
    futurI: {
      ich: 'werde bitten',
      du: 'wirst bitten',
      'er/sie/es': 'wird bitten',
      wir: 'werden bitten',
      ihr: 'werdet bitten',
      sie: 'werden bitten'
    },
    konjunktivI: {
      ich: 'bitte',
      du: 'bittest',
      'er/sie/es': 'bitte',
      wir: 'bitten',
      ihr: 'bittet',
      sie: 'bitten'
    },
    konjunktivII: {
      ich: 'bäte',
      du: 'bätest',
      'er/sie/es': 'bäte',
      wir: 'bäten',
      ihr: 'bätet',
      sie: 'bäten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich bitte dich um Hilfe.', english: 'I ask you for help.', tense: 'präsens' },
      { german: 'Er bat um Verzeihung.', english: 'He asked for forgiveness.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v41',
    infinitive: 'sitzen',
    english: 'to sit',
    präsens: {
      ich: 'sitze',
      du: 'sitzt',
      'er/sie/es': 'sitzt',
      wir: 'sitzen',
      ihr: 'sitzt',
      sie: 'sitzen'
    },
    präteritum: {
      ich: 'saß',
      du: 'saßest',
      'er/sie/es': 'saß',
      wir: 'saßen',
      ihr: 'saßt',
      sie: 'saßen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gesessen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gesessen' },
    futurI: {
      ich: 'werde sitzen',
      du: 'wirst sitzen',
      'er/sie/es': 'wird sitzen',
      wir: 'werden sitzen',
      ihr: 'werdet sitzen',
      sie: 'werden sitzen'
    },
    konjunktivI: {
      ich: 'sitze',
      du: 'sitzest',
      'er/sie/es': 'sitze',
      wir: 'sitzen',
      ihr: 'sitzet',
      sie: 'sitzen'
    },
    konjunktivII: {
      ich: 'säße',
      du: 'säßest',
      'er/sie/es': 'säße',
      wir: 'säßen',
      ihr: 'säßet',
      sie: 'säßen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich sitze auf dem Stuhl.', english: 'I sit on the chair.', tense: 'präsens' },
      { german: 'Er saß am Fenster.', english: 'He sat at the window.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v42',
    infinitive: 'liegen',
    english: 'to lie (position)',
    präsens: {
      ich: 'liege',
      du: 'liegst',
      'er/sie/es': 'liegt',
      wir: 'liegen',
      ihr: 'liegt',
      sie: 'liegen'
    },
    präteritum: {
      ich: 'lag',
      du: 'lagst',
      'er/sie/es': 'lag',
      wir: 'lagen',
      ihr: 'lagt',
      sie: 'lagen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gelegen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gelegen' },
    futurI: {
      ich: 'werde liegen',
      du: 'wirst liegen',
      'er/sie/es': 'wird liegen',
      wir: 'werden liegen',
      ihr: 'werdet liegen',
      sie: 'werden liegen'
    },
    konjunktivI: {
      ich: 'liege',
      du: 'liegest',
      'er/sie/es': 'liege',
      wir: 'liegen',
      ihr: 'lieget',
      sie: 'liegen'
    },
    konjunktivII: {
      ich: 'läge',
      du: 'lägest',
      'er/sie/es': 'läge',
      wir: 'lägen',
      ihr: 'läget',
      sie: 'lägen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Das Buch liegt auf dem Tisch.', english: 'The book lies on the table.', tense: 'präsens' },
      { german: 'Er lag im Bett.', english: 'He lay in bed.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v43',
    infinitive: 'stehen',
    english: 'to stand',
    präsens: {
      ich: 'stehe',
      du: 'stehst',
      'er/sie/es': 'steht',
      wir: 'stehen',
      ihr: 'steht',
      sie: 'stehen'
    },
    präteritum: {
      ich: 'stand',
      du: 'standest',
      'er/sie/es': 'stand',
      wir: 'standen',
      ihr: 'standet',
      sie: 'standen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gestanden' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gestanden' },
    futurI: {
      ich: 'werde stehen',
      du: 'wirst stehen',
      'er/sie/es': 'wird stehen',
      wir: 'werden stehen',
      ihr: 'werdet stehen',
      sie: 'werden stehen'
    },
    konjunktivI: {
      ich: 'stehe',
      du: 'stehest',
      'er/sie/es': 'stehe',
      wir: 'stehen',
      ihr: 'stehet',
      sie: 'stehen'
    },
    konjunktivII: {
      ich: 'stände',
      du: 'ständest',
      'er/sie/es': 'stände',
      wir: 'ständen',
      ihr: 'ständet',
      sie: 'ständen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich stehe vor der Tür.', english: 'I stand in front of the door.', tense: 'präsens' },
      { german: 'Er stand im Regen.', english: 'He stood in the rain.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v44',
    infinitive: 'fallen',
    english: 'to fall',
    präsens: {
      ich: 'falle',
      du: 'fällst',
      'er/sie/es': 'fällt',
      wir: 'fallen',
      ihr: 'fallt',
      sie: 'fallen'
    },
    präteritum: {
      ich: 'fiel',
      du: 'fielst',
      'er/sie/es': 'fiel',
      wir: 'fielen',
      ihr: 'fielt',
      sie: 'fielen'
    },
    perfekt: { auxiliary: 'sein', participle: 'gefallen' },
    plusquamperfekt: { auxiliary: 'sein', participle: 'gefallen' },
    futurI: {
      ich: 'werde fallen',
      du: 'wirst fallen',
      'er/sie/es': 'wird fallen',
      wir: 'werden fallen',
      ihr: 'werdet fallen',
      sie: 'werden fallen'
    },
    konjunktivI: {
      ich: 'falle',
      du: 'fallest',
      'er/sie/es': 'falle',
      wir: 'fallen',
      ihr: 'fallet',
      sie: 'fallen'
    },
    konjunktivII: {
      ich: 'fiele',
      du: 'fielest',
      'er/sie/es': 'fiele',
      wir: 'fielen',
      ihr: 'fielet',
      sie: 'fielen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Die Blätter fallen.', english: 'The leaves fall.', tense: 'präsens' },
      { german: 'Er fiel hin.', english: 'He fell down.', tense: 'präteritum' },
      { german: 'Der Apfel ist gefallen.', english: 'The apple fell.', tense: 'perfekt' }
    ]
  },
  {
    id: 'v45',
    infinitive: 'halten',
    english: 'to hold/stop',
    präsens: {
      ich: 'halte',
      du: 'hältst',
      'er/sie/es': 'hält',
      wir: 'halten',
      ihr: 'haltet',
      sie: 'halten'
    },
    präteritum: {
      ich: 'hielt',
      du: 'hieltest',
      'er/sie/es': 'hielt',
      wir: 'hielten',
      ihr: 'hieltet',
      sie: 'hielten'
    },
    perfekt: { auxiliary: 'haben', participle: 'gehalten' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gehalten' },
    futurI: {
      ich: 'werde halten',
      du: 'wirst halten',
      'er/sie/es': 'wird halten',
      wir: 'werden halten',
      ihr: 'werdet halten',
      sie: 'werden halten'
    },
    konjunktivI: {
      ich: 'halte',
      du: 'haltest',
      'er/sie/es': 'halte',
      wir: 'halten',
      ihr: 'haltet',
      sie: 'halten'
    },
    konjunktivII: {
      ich: 'hielte',
      du: 'hieltest',
      'er/sie/es': 'hielte',
      wir: 'hielten',
      ihr: 'hieltet',
      sie: 'hielten'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich halte das Buch.', english: 'I hold the book.', tense: 'präsens' },
      { german: 'Der Bus hielt an.', english: 'The bus stopped.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v46',
    infinitive: 'lassen',
    english: 'to let/leave',
    präsens: {
      ich: 'lasse',
      du: 'lässt',
      'er/sie/es': 'lässt',
      wir: 'lassen',
      ihr: 'lasst',
      sie: 'lassen'
    },
    präteritum: {
      ich: 'ließ',
      du: 'ließest',
      'er/sie/es': 'ließ',
      wir: 'ließen',
      ihr: 'ließt',
      sie: 'ließen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gelassen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gelassen' },
    futurI: {
      ich: 'werde lassen',
      du: 'wirst lassen',
      'er/sie/es': 'wird lassen',
      wir: 'werden lassen',
      ihr: 'werdet lassen',
      sie: 'werden lassen'
    },
    konjunktivI: {
      ich: 'lasse',
      du: 'lassest',
      'er/sie/es': 'lasse',
      wir: 'lassen',
      ihr: 'lasset',
      sie: 'lassen'
    },
    konjunktivII: {
      ich: 'ließe',
      du: 'ließest',
      'er/sie/es': 'ließe',
      wir: 'ließen',
      ihr: 'ließet',
      sie: 'ließen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Lass mich in Ruhe!', english: 'Leave me alone!', tense: 'präsens' },
      { german: 'Er ließ den Hund raus.', english: 'He let the dog out.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v47',
    infinitive: 'rufen',
    english: 'to call',
    präsens: {
      ich: 'rufe',
      du: 'rufst',
      'er/sie/es': 'ruft',
      wir: 'rufen',
      ihr: 'ruft',
      sie: 'rufen'
    },
    präteritum: {
      ich: 'rief',
      du: 'riefst',
      'er/sie/es': 'rief',
      wir: 'riefen',
      ihr: 'rieft',
      sie: 'riefen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gerufen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gerufen' },
    futurI: {
      ich: 'werde rufen',
      du: 'wirst rufen',
      'er/sie/es': 'wird rufen',
      wir: 'werden rufen',
      ihr: 'werdet rufen',
      sie: 'werden rufen'
    },
    konjunktivI: {
      ich: 'rufe',
      du: 'rufest',
      'er/sie/es': 'rufe',
      wir: 'rufen',
      ihr: 'rufet',
      sie: 'rufen'
    },
    konjunktivII: {
      ich: 'riefe',
      du: 'riefest',
      'er/sie/es': 'riefe',
      wir: 'riefen',
      ihr: 'riefet',
      sie: 'riefen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich rufe dich.', english: 'I call you.', tense: 'präsens' },
      { german: 'Sie rief um Hilfe.', english: 'She called for help.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v48',
    infinitive: 'schlafen',
    english: 'to sleep',
    präsens: {
      ich: 'schlafe',
      du: 'schläfst',
      'er/sie/es': 'schläft',
      wir: 'schlafen',
      ihr: 'schlaft',
      sie: 'schlafen'
    },
    präteritum: {
      ich: 'schlief',
      du: 'schliefst',
      'er/sie/es': 'schlief',
      wir: 'schliefen',
      ihr: 'schlieft',
      sie: 'schliefen'
    },
    perfekt: { auxiliary: 'haben', participle: 'geschlafen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'geschlafen' },
    futurI: {
      ich: 'werde schlafen',
      du: 'wirst schlafen',
      'er/sie/es': 'wird schlafen',
      wir: 'werden schlafen',
      ihr: 'werdet schlafen',
      sie: 'werden schlafen'
    },
    konjunktivI: {
      ich: 'schlafe',
      du: 'schlafest',
      'er/sie/es': 'schlafe',
      wir: 'schlafen',
      ihr: 'schlafet',
      sie: 'schlafen'
    },
    konjunktivII: {
      ich: 'schliefe',
      du: 'schliefest',
      'er/sie/es': 'schliefe',
      wir: 'schliefen',
      ihr: 'schliefet',
      sie: 'schliefen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    examples: [
      { german: 'Ich schlafe gut.', english: 'I sleep well.', tense: 'präsens' },
      { german: 'Er schlief lange.', english: 'He slept for a long time.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v49',
    infinitive: 'tragen',
    english: 'to carry/wear',
    präsens: {
      ich: 'trage',
      du: 'trägst',
      'er/sie/es': 'trägt',
      wir: 'tragen',
      ihr: 'tragt',
      sie: 'tragen'
    },
    präteritum: {
      ich: 'trug',
      du: 'trugst',
      'er/sie/es': 'trug',
      wir: 'trugen',
      ihr: 'trugt',
      sie: 'trugen'
    },
    perfekt: { auxiliary: 'haben', participle: 'getragen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'getragen' },
    futurI: {
      ich: 'werde tragen',
      du: 'wirst tragen',
      'er/sie/es': 'wird tragen',
      wir: 'werden tragen',
      ihr: 'werdet tragen',
      sie: 'werden tragen'
    },
    konjunktivI: {
      ich: 'trage',
      du: 'tragest',
      'er/sie/es': 'trage',
      wir: 'tragen',
      ihr: 'traget',
      sie: 'tragen'
    },
    konjunktivII: {
      ich: 'trüge',
      du: 'trügest',
      'er/sie/es': 'trüge',
      wir: 'trügen',
      ihr: 'trüget',
      sie: 'trügen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Sie trägt ein Kleid.', english: 'She wears a dress.', tense: 'präsens' },
      { german: 'Er trug den Koffer.', english: 'He carried the suitcase.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v50',
    infinitive: 'waschen',
    english: 'to wash',
    präsens: {
      ich: 'wasche',
      du: 'wäschst',
      'er/sie/es': 'wäscht',
      wir: 'waschen',
      ihr: 'wascht',
      sie: 'waschen'
    },
    präteritum: {
      ich: 'wusch',
      du: 'wuschst',
      'er/sie/es': 'wusch',
      wir: 'wuschen',
      ihr: 'wuscht',
      sie: 'wuschen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gewaschen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gewaschen' },
    futurI: {
      ich: 'werde waschen',
      du: 'wirst waschen',
      'er/sie/es': 'wird waschen',
      wir: 'werden waschen',
      ihr: 'werdet waschen',
      sie: 'werden waschen'
    },
    konjunktivI: {
      ich: 'wasche',
      du: 'waschest',
      'er/sie/es': 'wasche',
      wir: 'waschen',
      ihr: 'waschet',
      sie: 'waschen'
    },
    konjunktivII: {
      ich: 'wüsche',
      du: 'wüschest',
      'er/sie/es': 'wüsche',
      wir: 'wüschen',
      ihr: 'wüschet',
      sie: 'wüschen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich wasche das Auto.', english: 'I wash the car.', tense: 'präsens' },
      { german: 'Sie wusch die Wäsche.', english: 'She washed the laundry.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v51',
    infinitive: 'ziehen',
    english: 'to pull/move',
    präsens: {
      ich: 'ziehe',
      du: 'ziehst',
      'er/sie/es': 'zieht',
      wir: 'ziehen',
      ihr: 'zieht',
      sie: 'ziehen'
    },
    präteritum: {
      ich: 'zog',
      du: 'zogst',
      'er/sie/es': 'zog',
      wir: 'zogen',
      ihr: 'zogt',
      sie: 'zogen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gezogen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gezogen' },
    futurI: {
      ich: 'werde ziehen',
      du: 'wirst ziehen',
      'er/sie/es': 'wird ziehen',
      wir: 'werden ziehen',
      ihr: 'werdet ziehen',
      sie: 'werden ziehen'
    },
    konjunktivI: {
      ich: 'ziehe',
      du: 'ziehest',
      'er/sie/es': 'ziehe',
      wir: 'ziehen',
      ihr: 'ziehet',
      sie: 'ziehen'
    },
    konjunktivII: {
      ich: 'zöge',
      du: 'zögest',
      'er/sie/es': 'zöge',
      wir: 'zögen',
      ihr: 'zöget',
      sie: 'zögen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich ziehe an der Tür.', english: 'I pull on the door.', tense: 'präsens' },
      { german: 'Sie zog nach Berlin.', english: 'She moved to Berlin.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v52',
    infinitive: 'schließen',
    english: 'to close',
    präsens: {
      ich: 'schließe',
      du: 'schließt',
      'er/sie/es': 'schließt',
      wir: 'schließen',
      ihr: 'schließt',
      sie: 'schließen'
    },
    präteritum: {
      ich: 'schloss',
      du: 'schlossest',
      'er/sie/es': 'schloss',
      wir: 'schlossen',
      ihr: 'schlosst',
      sie: 'schlossen'
    },
    perfekt: { auxiliary: 'haben', participle: 'geschlossen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'geschlossen' },
    futurI: {
      ich: 'werde schließen',
      du: 'wirst schließen',
      'er/sie/es': 'wird schließen',
      wir: 'werden schließen',
      ihr: 'werdet schließen',
      sie: 'werden schließen'
    },
    konjunktivI: {
      ich: 'schließe',
      du: 'schließest',
      'er/sie/es': 'schließe',
      wir: 'schließen',
      ihr: 'schließet',
      sie: 'schließen'
    },
    konjunktivII: {
      ich: 'schlösse',
      du: 'schlössest',
      'er/sie/es': 'schlösse',
      wir: 'schlössen',
      ihr: 'schlösset',
      sie: 'schlössen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich schließe die Tür.', english: 'I close the door.', tense: 'präsens' },
      { german: 'Er schloss das Fenster.', english: 'He closed the window.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v53',
    infinitive: 'verlieren',
    english: 'to lose',
    präsens: {
      ich: 'verliere',
      du: 'verlierst',
      'er/sie/es': 'verliert',
      wir: 'verlieren',
      ihr: 'verliert',
      sie: 'verlieren'
    },
    präteritum: {
      ich: 'verlor',
      du: 'verlorst',
      'er/sie/es': 'verlor',
      wir: 'verloren',
      ihr: 'verlort',
      sie: 'verloren'
    },
    perfekt: { auxiliary: 'haben', participle: 'verloren' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'verloren' },
    futurI: {
      ich: 'werde verlieren',
      du: 'wirst verlieren',
      'er/sie/es': 'wird verlieren',
      wir: 'werden verlieren',
      ihr: 'werdet verlieren',
      sie: 'werden verlieren'
    },
    konjunktivI: {
      ich: 'verliere',
      du: 'verlierest',
      'er/sie/es': 'verliere',
      wir: 'verlieren',
      ihr: 'verlieret',
      sie: 'verlieren'
    },
    konjunktivII: {
      ich: 'verlöre',
      du: 'verlörest',
      'er/sie/es': 'verlöre',
      wir: 'verlören',
      ihr: 'verlöret',
      sie: 'verlören'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Ich verliere meinen Schlüssel.', english: 'I lose my key.', tense: 'präsens' },
      { german: 'Sie verlor das Spiel.', english: 'She lost the game.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v54',
    infinitive: 'gewinnen',
    english: 'to win',
    präsens: {
      ich: 'gewinne',
      du: 'gewinnst',
      'er/sie/es': 'gewinnt',
      wir: 'gewinnen',
      ihr: 'gewinnt',
      sie: 'gewinnen'
    },
    präteritum: {
      ich: 'gewann',
      du: 'gewannst',
      'er/sie/es': 'gewann',
      wir: 'gewannen',
      ihr: 'gewannt',
      sie: 'gewannen'
    },
    perfekt: { auxiliary: 'haben', participle: 'gewonnen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'gewonnen' },
    futurI: {
      ich: 'werde gewinnen',
      du: 'wirst gewinnen',
      'er/sie/es': 'wird gewinnen',
      wir: 'werden gewinnen',
      ihr: 'werdet gewinnen',
      sie: 'werden gewinnen'
    },
    konjunktivI: {
      ich: 'gewinne',
      du: 'gewinnest',
      'er/sie/es': 'gewinne',
      wir: 'gewinnen',
      ihr: 'gewinnet',
      sie: 'gewinnen'
    },
    konjunktivII: {
      ich: 'gewönne',
      du: 'gewönnest',
      'er/sie/es': 'gewönne',
      wir: 'gewönnen',
      ihr: 'gewönnet',
      sie: 'gewönnen'
    },
    difficulty: 'intermediate',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Wer gewinnt?', english: 'Who wins?', tense: 'präsens' },
      { german: 'Er gewann den Preis.', english: 'He won the prize.', tense: 'präteritum' }
    ]
  },
  {
    id: 'v55',
    infinitive: 'beginnen',
    english: 'to begin',
    präsens: {
      ich: 'beginne',
      du: 'beginnst',
      'er/sie/es': 'beginnt',
      wir: 'beginnen',
      ihr: 'beginnt',
      sie: 'beginnen'
    },
    präteritum: {
      ich: 'begann',
      du: 'begannst',
      'er/sie/es': 'begann',
      wir: 'begannen',
      ihr: 'begannt',
      sie: 'begannen'
    },
    perfekt: { auxiliary: 'haben', participle: 'begonnen' },
    plusquamperfekt: { auxiliary: 'haben', participle: 'begonnen' },
    futurI: {
      ich: 'werde beginnen',
      du: 'wirst beginnen',
      'er/sie/es': 'wird beginnen',
      wir: 'werden beginnen',
      ihr: 'werdet beginnen',
      sie: 'werden beginnen'
    },
    konjunktivI: {
      ich: 'beginne',
      du: 'beginnest',
      'er/sie/es': 'beginne',
      wir: 'beginnen',
      ihr: 'beginnet',
      sie: 'beginnen'
    },
    konjunktivII: {
      ich: 'begönne',
      du: 'begönnest',
      'er/sie/es': 'begönne',
      wir: 'begönnen',
      ihr: 'begönnet',
      sie: 'begönnen'
    },
    difficulty: 'beginner',
    category: 'irregular',
    caseRequired: 'akkusativ',
    examples: [
      { german: 'Der Film beginnt um 8.', english: 'The movie begins at 8.', tense: 'präsens' },
      { german: 'Es begann zu regnen.', english: 'It began to rain.', tense: 'präteritum' }
    ]
  }
];

export const getVerbsByCategory = (category: string): Verb[] => {
  return verbs.filter(v => v.category === category);
};

export const getVerbsByDifficulty = (difficulty: string): Verb[] => {
  return verbs.filter(v => v.difficulty === difficulty);
};

export const getVerbsByCase = (caseType: 'akkusativ' | 'dativ' | 'akkusativ+dativ' | 'genitiv'): Verb[] => {
  return verbs.filter(v => v.caseRequired === caseType);
};

export const getAllCaseVerbs = () => ({
  akkusativ: akkusativVerbs,
  dativ: dativVerbs,
  akkusativDativ: akkusativDativVerbs,
  genitiv: genitivVerbs
});
