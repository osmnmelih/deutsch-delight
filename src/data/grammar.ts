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

// Comprehensive Grammar Lesson Structure based on textbook curriculum
export type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface GrammarLesson {
  id: string;
  number: number;
  title: string;
  titleDe: string;
  level: GrammarLevel;
  category: string;
  description: string;
  keyPoints: string[];
  examples: { german: string; english: string; highlight?: string }[];
  exercises?: { question: string; answer: string; hint?: string }[];
  tips?: string[];
}

export interface GrammarSection {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  lessons: GrammarLesson[];
}

// Complete Grammar Curriculum
export const grammarSections: GrammarSection[] = [
  {
    id: 'verben-1',
    title: 'Verbs 1 - Basics',
    titleDe: 'Verben 1',
    icon: '🔤',
    lessons: [
      {
        id: 'personalpronomen',
        number: 1,
        title: 'Personal Pronouns',
        titleDe: 'Personalpronomen',
        level: 'A1',
        category: 'verben-1',
        description: 'Learn all personal pronouns: ich, du, er, sie, es, wir, ihr, sie und Sie',
        keyPoints: [
          'ich (I) - 1st person singular',
          'du (you informal) - 2nd person singular',
          'er/sie/es (he/she/it) - 3rd person singular',
          'wir (we) - 1st person plural',
          'ihr (you all informal) - 2nd person plural',
          'sie/Sie (they/You formal) - 3rd person plural / formal',
        ],
        examples: [
          { german: 'Ich bin Student.', english: 'I am a student.', highlight: 'Ich' },
          { german: 'Du bist nett.', english: 'You are nice.', highlight: 'Du' },
          { german: 'Er kommt aus Berlin.', english: 'He comes from Berlin.', highlight: 'Er' },
          { german: 'Sie ist Lehrerin.', english: 'She is a teacher.', highlight: 'Sie' },
          { german: 'Wir lernen Deutsch.', english: 'We learn German.', highlight: 'Wir' },
        ],
        tips: ['Sie (formal you) is always capitalized', 'Use "du" with friends, family, children', 'Use "Sie" in formal situations'],
      },
      {
        id: 'konjugation-praesens',
        number: 2,
        title: 'Present Tense Conjugation',
        titleDe: 'Konjugation Präsens',
        level: 'A1',
        category: 'verben-1',
        description: 'Regular verb conjugation patterns: ich komme, du kommst',
        keyPoints: [
          'Remove -en from infinitive to get the stem',
          'Add endings: -e, -st, -t, -en, -t, -en',
          'ich → -e, du → -st, er/sie/es → -t',
          'wir → -en, ihr → -t, sie/Sie → -en',
        ],
        examples: [
          { german: 'ich komme', english: 'I come', highlight: '-e' },
          { german: 'du kommst', english: 'you come', highlight: '-st' },
          { german: 'er/sie/es kommt', english: 'he/she/it comes', highlight: '-t' },
          { german: 'wir kommen', english: 'we come', highlight: '-en' },
          { german: 'ihr kommt', english: 'you all come', highlight: '-t' },
          { german: 'sie/Sie kommen', english: 'they/You come', highlight: '-en' },
        ],
        exercises: [
          { question: 'Conjugate "spielen" for "ich"', answer: 'ich spiele', hint: 'Remove -en, add -e' },
          { question: 'Conjugate "wohnen" for "du"', answer: 'du wohnst', hint: 'Add -st to stem' },
          { question: 'Conjugate "lernen" for "wir"', answer: 'wir lernen', hint: 'Keep the -en' },
        ],
      },
      {
        id: 'sein-haben-besondere',
        number: 3,
        title: 'Sein, Haben & Special Verbs',
        titleDe: 'Sein, haben und besondere Verben',
        level: 'A1',
        category: 'verben-1',
        description: 'Irregular verbs sein (to be) and haben (to have)',
        keyPoints: [
          'sein: bin, bist, ist, sind, seid, sind',
          'haben: habe, hast, hat, haben, habt, haben',
          'These are the most important verbs in German',
          'Used to form compound tenses',
        ],
        examples: [
          { german: 'Ich bin müde.', english: 'I am tired.', highlight: 'bin' },
          { german: 'Du hast Hunger.', english: 'You are hungry.', highlight: 'hast' },
          { german: 'Er ist Arzt.', english: 'He is a doctor.', highlight: 'ist' },
          { german: 'Wir haben Zeit.', english: 'We have time.', highlight: 'haben' },
        ],
      },
      {
        id: 'vokalwechsel',
        number: 4,
        title: 'Verbs with Vowel Change',
        titleDe: 'Verben mit Vokalwechsel',
        level: 'A1',
        category: 'verben-1',
        description: 'Verbs that change vowels: ich esse wenig, aber du isst viel!',
        keyPoints: [
          'e → i: sprechen → sprichst, essen → isst',
          'e → ie: lesen → liest, sehen → sieht',
          'a → ä: fahren → fährst, schlafen → schläfst',
          'Change only in du and er/sie/es forms',
        ],
        examples: [
          { german: 'Ich esse Pizza.', english: 'I eat pizza.', highlight: 'esse' },
          { german: 'Du isst Pizza.', english: 'You eat pizza.', highlight: 'isst' },
          { german: 'Er fährt Auto.', english: 'He drives a car.', highlight: 'fährt' },
          { german: 'Sie liest ein Buch.', english: 'She reads a book.', highlight: 'liest' },
        ],
        exercises: [
          { question: 'sprechen → du ...', answer: 'du sprichst', hint: 'e → i' },
          { question: 'schlafen → er ...', answer: 'er schläft', hint: 'a → ä' },
          { question: 'sehen → sie ...', answer: 'sie sieht', hint: 'e → ie' },
        ],
      },
      {
        id: 'modalverben-konjugation',
        number: 5,
        title: 'Modal Verbs: Conjugation',
        titleDe: 'Modalverben: Konjugation und Position im Satz',
        level: 'A1',
        category: 'verben-1',
        description: 'Ich muss, ich kann, ich will - Modal verb conjugation and sentence position',
        keyPoints: [
          'Modal verbs: müssen, können, wollen, sollen, dürfen, mögen/möchten',
          'Singular forms have vowel changes',
          'Modal verb in position 2, infinitive at the end',
          'ich muss/kann/will → no ending in 1st & 3rd singular',
        ],
        examples: [
          { german: 'Ich kann schwimmen.', english: 'I can swim.', highlight: 'kann ... schwimmen' },
          { german: 'Du musst arbeiten.', english: 'You must work.', highlight: 'musst ... arbeiten' },
          { german: 'Er will Deutsch lernen.', english: 'He wants to learn German.', highlight: 'will ... lernen' },
        ],
      },
      {
        id: 'modalverben-gebrauch-1',
        number: 6,
        title: 'Modal Verbs: Usage 1',
        titleDe: 'Modalverben: Gebrauch 1',
        level: 'A1',
        category: 'verben-1',
        description: 'Ich kann, ich will, ich möchte - ability, desire, polite requests',
        keyPoints: [
          'können - ability, possibility (can)',
          'wollen - strong desire, intention (want)',
          'möchten - polite wish (would like)',
          'müssen - necessity, obligation (must)',
        ],
        examples: [
          { german: 'Ich kann Klavier spielen.', english: 'I can play piano.', highlight: 'kann' },
          { german: 'Ich will nach Berlin fahren.', english: 'I want to go to Berlin.', highlight: 'will' },
          { german: 'Ich möchte einen Kaffee.', english: 'I would like a coffee.', highlight: 'möchte' },
        ],
      },
      {
        id: 'modalverben-gebrauch-2',
        number: 7,
        title: 'Modal Verbs: Usage 2',
        titleDe: 'Modalverben: Gebrauch 2',
        level: 'A1',
        category: 'verben-1',
        description: 'Ich muss, ich soll, ich darf - obligation, advice, permission',
        keyPoints: [
          'müssen - must, have to (strong obligation)',
          'sollen - should, supposed to (advice, duty)',
          'dürfen - may, allowed to (permission)',
          'nicht dürfen - must not (prohibition)',
        ],
        examples: [
          { german: 'Ich muss heute arbeiten.', english: 'I must work today.', highlight: 'muss' },
          { german: 'Du sollst mehr schlafen.', english: 'You should sleep more.', highlight: 'sollst' },
          { german: 'Hier darf man nicht rauchen.', english: 'You may not smoke here.', highlight: 'darf ... nicht' },
        ],
      },
      {
        id: 'trennbare-verben',
        number: 8,
        title: 'Separable Verbs',
        titleDe: 'Trennbare Verben',
        level: 'A1',
        category: 'verben-1',
        description: 'Ich kaufe im Supermarkt ein - Separable prefix verbs',
        keyPoints: [
          'Prefix separates and goes to the end',
          'Common prefixes: an-, auf-, aus-, ein-, mit-, vor-, zu-',
          'einkaufen → Ich kaufe ein',
          'anfangen → Wir fangen an',
        ],
        examples: [
          { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7 o\'clock.', highlight: 'stehe ... auf' },
          { german: 'Wir fangen jetzt an.', english: 'We start now.', highlight: 'fangen ... an' },
          { german: 'Er ruft seine Mutter an.', english: 'He calls his mother.', highlight: 'ruft ... an' },
        ],
        exercises: [
          { question: 'aufstehen: Ich ___ um 8 Uhr ___.', answer: 'Ich stehe um 8 Uhr auf.', hint: 'Prefix goes to end' },
          { question: 'einkaufen: Sie ___ im Supermarkt ___.', answer: 'Sie kauft im Supermarkt ein.' },
        ],
      },
      {
        id: 'imperativ',
        number: 9,
        title: 'Imperative',
        titleDe: 'Imperativ',
        level: 'A1',
        category: 'verben-1',
        description: 'Helfen Sie mir! - Commands and requests',
        keyPoints: [
          'du-form: stem (+ e optional): Komm! Geh! Warte!',
          'ihr-form: stem + t: Kommt! Geht! Wartet!',
          'Sie-form: infinitive + Sie: Kommen Sie! Gehen Sie!',
          'Irregular: sein → Sei! Seid! Seien Sie!',
        ],
        examples: [
          { german: 'Komm her!', english: 'Come here! (informal)', highlight: 'Komm' },
          { german: 'Warte bitte!', english: 'Wait please!', highlight: 'Warte' },
          { german: 'Helfen Sie mir bitte!', english: 'Help me please! (formal)', highlight: 'Helfen Sie' },
          { german: 'Seid ruhig!', english: 'Be quiet! (plural)', highlight: 'Seid' },
        ],
      },
    ],
  },
  {
    id: 'saetze-fragen',
    title: 'Sentences & Questions',
    titleDe: 'Sätze und Fragen',
    icon: '❓',
    lessons: [
      {
        id: 'fragen-fragewort',
        number: 10,
        title: 'W-Questions',
        titleDe: 'Fragen mit Fragewort',
        level: 'A1',
        category: 'saetze-fragen',
        description: 'Wer? Wie? Wo? Was? - Question words',
        keyPoints: [
          'Wer? - Who?',
          'Was? - What?',
          'Wo? - Where?',
          'Woher? - Where from?',
          'Wohin? - Where to?',
          'Wann? - When?',
          'Wie? - How?',
          'Warum? - Why?',
        ],
        examples: [
          { german: 'Wer ist das?', english: 'Who is that?', highlight: 'Wer' },
          { german: 'Was machst du?', english: 'What are you doing?', highlight: 'Was' },
          { german: 'Wo wohnst du?', english: 'Where do you live?', highlight: 'Wo' },
          { german: 'Woher kommst du?', english: 'Where do you come from?', highlight: 'Woher' },
          { german: 'Wann kommst du?', english: 'When are you coming?', highlight: 'Wann' },
        ],
      },
      {
        id: 'ja-nein-fragen',
        number: 11,
        title: 'Yes/No Questions',
        titleDe: 'Ja-/Nein-Fragen und Antworten',
        level: 'A1',
        category: 'saetze-fragen',
        description: 'Lernen Sie Deutsch? - Yes/No questions and answers',
        keyPoints: [
          'Verb comes first in yes/no questions',
          'Answer with Ja/Nein + full sentence',
          'Doch - contradicts a negative question',
        ],
        examples: [
          { german: 'Sprechen Sie Deutsch?', english: 'Do you speak German?', highlight: 'Sprechen' },
          { german: 'Ja, ich spreche Deutsch.', english: 'Yes, I speak German.' },
          { german: 'Nein, ich spreche kein Deutsch.', english: 'No, I don\'t speak German.' },
          { german: 'Kommst du nicht? - Doch!', english: 'Aren\'t you coming? - Yes, I am!', highlight: 'Doch' },
        ],
      },
      {
        id: 'position-2',
        number: 12,
        title: 'Verb Position 2',
        titleDe: 'Position 2 im Satz',
        level: 'A1',
        category: 'saetze-fragen',
        description: 'Am Abend essen wir Pizza - The verb always in position 2',
        keyPoints: [
          'Conjugated verb is ALWAYS in position 2',
          'Subject can be in position 1 or 3',
          'Time expressions often come first',
          'Inversion: when subject is not first',
        ],
        examples: [
          { german: 'Ich esse Pizza.', english: 'I eat pizza. (1-2-3)', highlight: 'esse (pos. 2)' },
          { german: 'Am Abend esse ich Pizza.', english: 'In the evening I eat pizza.', highlight: 'esse (pos. 2)' },
          { german: 'Heute lerne ich Deutsch.', english: 'Today I learn German.', highlight: 'lerne (pos. 2)' },
        ],
      },
      {
        id: 'zwei-positionen',
        number: 13,
        title: 'Two Fixed Positions',
        titleDe: 'Zwei feste Positionen im Satz',
        level: 'A1',
        category: 'saetze-fragen',
        description: 'Ich gehe ... schwimmen - Sentence bracket',
        keyPoints: [
          'Conjugated verb in position 2',
          'Infinitive/participle/prefix at the end',
          'Creates a "bracket" (Satzklammer)',
          'Other elements go between the bracket',
        ],
        examples: [
          { german: 'Ich gehe heute schwimmen.', english: 'I go swimming today.', highlight: 'gehe ... schwimmen' },
          { german: 'Ich habe gestern Pizza gegessen.', english: 'I ate pizza yesterday.', highlight: 'habe ... gegessen' },
          { german: 'Ich rufe dich morgen an.', english: 'I\'ll call you tomorrow.', highlight: 'rufe ... an' },
        ],
      },
    ],
  },
  {
    id: 'pronomen-nomen-artikel',
    title: 'Pronouns, Nouns & Articles',
    titleDe: 'Pronomen, Nomen und Artikel',
    icon: '📝',
    lessons: [
      {
        id: 'nomen-plural',
        number: 14,
        title: 'Noun Plurals',
        titleDe: 'Nomen: Plural',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Die Männer, die Frauen, die Babys - Plural forms',
        keyPoints: [
          '-e: der Tag → die Tage',
          '-en/-n: die Frau → die Frauen',
          '-er: das Kind → die Kinder',
          '-s: das Auto → die Autos',
          'Umlaut + ending: der Mann → die Männer',
        ],
        examples: [
          { german: 'das Haus → die Häuser', english: 'house → houses', highlight: 'Häuser' },
          { german: 'die Blume → die Blumen', english: 'flower → flowers', highlight: 'Blumen' },
          { german: 'das Baby → die Babys', english: 'baby → babies', highlight: 'Babys' },
        ],
      },
      {
        id: 'artikel-definit-indefinit',
        number: 15,
        title: 'Definite & Indefinite Articles',
        titleDe: 'Artikel: definit, indefinit, kein Artikel',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Der, das, die - ein, ein, eine - kein Artikel',
        keyPoints: [
          'Definite: der, die, das (the)',
          'Indefinite: ein, eine (a/an)',
          'No article for: professions, nationalities, materials',
          'Plural has no indefinite article',
        ],
        examples: [
          { german: 'Das ist ein Buch.', english: 'That is a book.', highlight: 'ein' },
          { german: 'Ich bin Lehrer.', english: 'I am a teacher.', highlight: '(no article)' },
          { german: 'Sie trinkt Kaffee.', english: 'She drinks coffee.', highlight: '(no article)' },
        ],
      },
      {
        id: 'negation',
        number: 16,
        title: 'Negation',
        titleDe: 'Negation',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Ich koche nicht. Ich habe keine Zeit.',
        keyPoints: [
          'nicht - negates verbs, adjectives, adverbs',
          'kein - negates nouns with ein/eine',
          'nicht comes after the verb (usually)',
          'nicht comes before specific elements being negated',
        ],
        examples: [
          { german: 'Ich verstehe nicht.', english: 'I don\'t understand.', highlight: 'nicht' },
          { german: 'Ich habe keine Zeit.', english: 'I have no time.', highlight: 'keine' },
          { german: 'Das ist nicht richtig.', english: 'That is not correct.', highlight: 'nicht' },
        ],
      },
      {
        id: 'akkusativ',
        number: 17,
        title: 'Accusative Case',
        titleDe: 'Akkusativ',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Der Mann isst den Fisch - Direct object case',
        keyPoints: [
          'Only masculine changes: der → den, ein → einen',
          'Used for direct objects (What/Whom?)',
          'After certain prepositions: für, durch, gegen, ohne, um',
          'Feminine, neuter, plural unchanged',
        ],
        examples: [
          { german: 'Ich sehe den Mann.', english: 'I see the man.', highlight: 'den' },
          { german: 'Sie kauft einen Apfel.', english: 'She buys an apple.', highlight: 'einen' },
          { german: 'Das ist für dich.', english: 'That is for you.', highlight: 'für' },
        ],
      },
      {
        id: 'dativ',
        number: 18,
        title: 'Dative Case',
        titleDe: 'Dativ',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Ich fahre mit dem Auto - Indirect object case',
        keyPoints: [
          'der → dem, die → der, das → dem, die (pl) → den (+n)',
          'ein → einem, eine → einer',
          'Dative prepositions: aus, bei, mit, nach, seit, von, zu',
          'Used for indirect objects (To whom?)',
        ],
        examples: [
          { german: 'Ich helfe dem Mann.', english: 'I help the man.', highlight: 'dem' },
          { german: 'Sie gibt der Frau ein Buch.', english: 'She gives the woman a book.', highlight: 'der' },
          { german: 'Ich fahre mit dem Bus.', english: 'I go by bus.', highlight: 'mit dem' },
        ],
      },
      {
        id: 'possessivartikel',
        number: 19,
        title: 'Possessive Articles',
        titleDe: 'Possessivartikel',
        level: 'A1',
        category: 'pronomen-nomen-artikel',
        description: 'Mein, dein, unser - Possessive articles',
        keyPoints: [
          'mein (my), dein (your), sein (his), ihr (her)',
          'unser (our), euer (your pl.), ihr (their), Ihr (Your formal)',
          'Take same endings as ein/kein',
          'Agree with the noun they describe',
        ],
        examples: [
          { german: 'Das ist mein Buch.', english: 'That is my book.', highlight: 'mein' },
          { german: 'Wo ist deine Tasche?', english: 'Where is your bag?', highlight: 'deine' },
          { german: 'Ich liebe meinen Hund.', english: 'I love my dog.', highlight: 'meinen' },
        ],
      },
      {
        id: 'artikel-interrogativ-demonstrativ',
        number: 20,
        title: 'Interrogative & Demonstrative Articles',
        titleDe: 'Artikel: interrogativ und demonstrativ',
        level: 'A2',
        category: 'pronomen-nomen-artikel',
        description: 'Welcher? – Dieser! Which one? - This one!',
        keyPoints: [
          'welcher/welche/welches - which?',
          'dieser/diese/dieses - this',
          'jener/jene/jenes - that',
          'Take same endings as der/die/das',
        ],
        examples: [
          { german: 'Welches Buch möchtest du?', english: 'Which book would you like?', highlight: 'Welches' },
          { german: 'Dieses Buch ist interessant.', english: 'This book is interesting.', highlight: 'Dieses' },
        ],
      },
      {
        id: 'personalpronomen-akk-dat',
        number: 21,
        title: 'Personal Pronouns: Accusative & Dative',
        titleDe: 'Personalpronomen: Akkusativ und Dativ',
        level: 'A2',
        category: 'pronomen-nomen-artikel',
        description: 'Nur mit dir – nie ohne dich',
        keyPoints: [
          'Accusative: mich, dich, ihn/sie/es, uns, euch, sie/Sie',
          'Dative: mir, dir, ihm/ihr/ihm, uns, euch, ihnen/Ihnen',
          'Word order: Dative before Accusative (when both nouns)',
          'Pronoun always before noun',
        ],
        examples: [
          { german: 'Er sieht mich.', english: 'He sees me.', highlight: 'mich' },
          { german: 'Sie hilft mir.', english: 'She helps me.', highlight: 'mir' },
          { german: 'Ich gebe es dir.', english: 'I give it to you.', highlight: 'es dir' },
        ],
      },
      {
        id: 'verben-akk-dat',
        number: 22,
        title: 'Verbs with Accusative & Dative',
        titleDe: 'Verben mit Akkusativ und Dativ',
        level: 'A2',
        category: 'pronomen-nomen-artikel',
        description: 'Ich kaufe meinem Sohn einen Ball',
        keyPoints: [
          'Some verbs take both: geben, schenken, zeigen, bringen',
          'Pattern: Subject + Verb + Dative (person) + Accusative (thing)',
          'Dative = recipient, Accusative = thing given',
        ],
        examples: [
          { german: 'Ich gebe dem Kind einen Apfel.', english: 'I give the child an apple.', highlight: 'dem ... einen' },
          { german: 'Sie schenkt ihm ein Buch.', english: 'She gives him a book.', highlight: 'ihm ... ein' },
        ],
      },
      {
        id: 'verben-mit-dativ',
        number: 23,
        title: 'Verbs with Dative',
        titleDe: 'Verben mit Dativ',
        level: 'A2',
        category: 'pronomen-nomen-artikel',
        description: 'Ich helfe dir, du dankst mir',
        keyPoints: [
          'helfen (help), danken (thank), gehören (belong to)',
          'gefallen (please), schmecken (taste), glauben (believe)',
          'antworten (answer), folgen (follow), gratulieren (congratulate)',
        ],
        examples: [
          { german: 'Ich helfe dir.', english: 'I help you.', highlight: 'dir' },
          { german: 'Das Buch gehört mir.', english: 'The book belongs to me.', highlight: 'mir' },
          { german: 'Das Essen schmeckt mir.', english: 'The food tastes good to me.', highlight: 'mir' },
        ],
      },
      {
        id: 'frage-personen-sachen',
        number: 24,
        title: 'Asking about People & Things',
        titleDe: 'Frage nach Personen und Sachen',
        level: 'A2',
        category: 'pronomen-nomen-artikel',
        description: 'Wem schenkst du was?',
        keyPoints: [
          'Persons: Wer? (nom), Wen? (acc), Wem? (dat), Wessen? (gen)',
          'Things: Was? (nom/acc)',
          'Preposition + was → wo(r) + preposition: worüber, wofür',
        ],
        examples: [
          { german: 'Wem hilfst du?', english: 'Whom are you helping?', highlight: 'Wem' },
          { german: 'Wofür interessierst du dich?', english: 'What are you interested in?', highlight: 'Wofür' },
        ],
      },
    ],
  },
  {
    id: 'verben-2',
    title: 'Verbs 2 - Past Tenses',
    titleDe: 'Verben 2',
    icon: '⏮️',
    lessons: [
      {
        id: 'praeteritum-sein-haben',
        number: 25,
        title: 'Simple Past: sein & haben',
        titleDe: 'Präteritum: sein und haben',
        level: 'A2',
        category: 'verben-2',
        description: 'Ich war, ich hatte - Simple past of sein and haben',
        keyPoints: [
          'sein: war, warst, war, waren, wart, waren',
          'haben: hatte, hattest, hatte, hatten, hattet, hatten',
          'Used in written German and narratives',
          'Common in everyday speech for sein/haben',
        ],
        examples: [
          { german: 'Ich war gestern in Berlin.', english: 'I was in Berlin yesterday.', highlight: 'war' },
          { german: 'Wir hatten keine Zeit.', english: 'We had no time.', highlight: 'hatten' },
        ],
      },
      {
        id: 'perfekt-haben',
        number: 26,
        title: 'Perfect Tense with haben',
        titleDe: 'Perfekt mit haben',
        level: 'A2',
        category: 'verben-2',
        description: 'Was hast du gestern gemacht?',
        keyPoints: [
          'haben + Partizip II (past participle)',
          'Most verbs use haben',
          'Regular: ge- + stem + -t (gemacht, gekauft)',
          'Irregular: ge- + changed stem + -en (gegessen, gesehen)',
        ],
        examples: [
          { german: 'Ich habe Pizza gegessen.', english: 'I ate pizza.', highlight: 'habe ... gegessen' },
          { german: 'Sie hat ein Buch gelesen.', english: 'She read a book.', highlight: 'hat ... gelesen' },
        ],
      },
      {
        id: 'perfekt-sein',
        number: 27,
        title: 'Perfect Tense with sein',
        titleDe: 'Perfekt mit sein',
        level: 'A2',
        category: 'verben-2',
        description: 'Ich bin gekommen, ich habe gelacht',
        keyPoints: [
          'sein + Partizip II for movement/change of state',
          'Movement: gehen, kommen, fahren, fliegen',
          'Change of state: werden, sterben, einschlafen',
          'Also: sein, bleiben, passieren',
        ],
        examples: [
          { german: 'Ich bin nach Berlin gefahren.', english: 'I went/drove to Berlin.', highlight: 'bin ... gefahren' },
          { german: 'Sie ist spät aufgewacht.', english: 'She woke up late.', highlight: 'ist ... aufgewacht' },
        ],
      },
      {
        id: 'partizip-perfekt',
        number: 28,
        title: 'Past Participle Formation',
        titleDe: 'Partizip Perfekt (Partizip 2)',
        level: 'A2',
        category: 'verben-2',
        description: 'Gesehen – eingekauft – bezahlt',
        keyPoints: [
          'Regular: ge- + stem + -t: machen → gemacht',
          'Irregular: ge- + changed stem + -en: sehen → gesehen',
          'No ge-: verbs ending in -ieren, inseparable prefixes',
          'Separable: prefix + ge- + stem: eingekauft',
        ],
        examples: [
          { german: 'gekauft (bought)', english: 'ge + kauf + t', highlight: 'ge...t' },
          { german: 'gesehen (seen)', english: 'ge + seh + en', highlight: 'ge...en' },
          { german: 'eingekauft (shopped)', english: 'ein + ge + kauf + t', highlight: 'ein-ge-...' },
          { german: 'bezahlt (paid)', english: 'be + zahl + t (no ge-)', highlight: 'no ge-' },
        ],
      },
      {
        id: 'praeteritum-modalverben',
        number: 29,
        title: 'Simple Past: Modal Verbs',
        titleDe: 'Präteritum: Modalverben',
        level: 'A2',
        category: 'verben-2',
        description: 'Ich konnte, ich musste, ich wollte',
        keyPoints: [
          'Modal verbs use simple past in speech (not perfect)',
          'können → konnte, müssen → musste',
          'wollen → wollte, sollen → sollte',
          'dürfen → durfte, mögen → mochte',
        ],
        examples: [
          { german: 'Ich konnte nicht kommen.', english: 'I couldn\'t come.', highlight: 'konnte' },
          { german: 'Sie musste arbeiten.', english: 'She had to work.', highlight: 'musste' },
          { german: 'Wir wollten ins Kino gehen.', english: 'We wanted to go to the cinema.', highlight: 'wollten' },
        ],
      },
      {
        id: 'zeitengebrauch',
        number: 30,
        title: 'Using Tenses',
        titleDe: 'Zeitengebrauch',
        level: 'A2',
        category: 'verben-2',
        description: 'Gestern hatte er Zeit und hat Sport gemacht',
        keyPoints: [
          'Spoken German: Perfekt for past (except sein, haben, modals)',
          'Written German: Präteritum (simple past)',
          'Present for future with time word: Morgen fahre ich...',
        ],
        examples: [
          { german: 'Gestern bin ich ins Kino gegangen.', english: 'Yesterday I went to the cinema. (spoken)', highlight: 'bin ... gegangen' },
          { german: 'Er ging ins Kino.', english: 'He went to the cinema. (written)', highlight: 'ging' },
        ],
      },
      {
        id: 'reflexive-verben',
        number: 31,
        title: 'Reflexive Verbs',
        titleDe: 'Reflexive (und reziproke) Verben',
        level: 'A2',
        category: 'verben-2',
        description: 'Sie wäscht sich - Reflexive verbs',
        keyPoints: [
          'Reflexive pronouns: mich/mir, dich/dir, sich, uns, euch, sich',
          'Accusative reflexive: sich waschen, sich anziehen',
          'Dative reflexive: sich etwas kaufen, sich die Hände waschen',
          'Reciprocal: sich treffen, sich kennen',
        ],
        examples: [
          { german: 'Ich wasche mich.', english: 'I wash myself.', highlight: 'mich' },
          { german: 'Ich wasche mir die Hände.', english: 'I wash my hands.', highlight: 'mir' },
          { german: 'Wir treffen uns morgen.', english: 'We meet each other tomorrow.', highlight: 'uns' },
        ],
      },
    ],
  },
  {
    id: 'praepositionen-1',
    title: 'Prepositions 1',
    titleDe: 'Präpositionen 1',
    icon: '📍',
    lessons: [
      {
        id: 'temporale-praepositionen',
        number: 32,
        title: 'Temporal Prepositions',
        titleDe: 'Temporale Präpositionen',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Im, am, um, von ... bis, nach, vor',
        keyPoints: [
          'am + day/date: am Montag, am 5. Mai',
          'im + month/season: im Januar, im Sommer',
          'um + time: um 8 Uhr',
          'von ... bis: from ... to',
        ],
        examples: [
          { german: 'Ich komme am Montag.', english: 'I\'m coming on Monday.', highlight: 'am' },
          { german: 'Im Sommer fahre ich nach Italien.', english: 'In summer I go to Italy.', highlight: 'Im' },
          { german: 'Der Kurs beginnt um 9 Uhr.', english: 'The course starts at 9 o\'clock.', highlight: 'um' },
        ],
      },
      {
        id: 'praepositionen-dativ',
        number: 33,
        title: 'Prepositions with Dative',
        titleDe: 'Präpositionen mit Dativ',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Aus, bei, mit, nach, seit, von, zu',
        keyPoints: [
          'aus - from, out of',
          'bei - at, near, with',
          'mit - with',
          'nach - after, to (cities/countries)',
          'seit - since, for (time)',
          'von - from, of',
          'zu - to',
        ],
        examples: [
          { german: 'Ich komme aus Deutschland.', english: 'I come from Germany.', highlight: 'aus' },
          { german: 'Ich fahre mit dem Zug.', english: 'I go by train.', highlight: 'mit dem' },
          { german: 'Ich gehe zum Arzt.', english: 'I go to the doctor.', highlight: 'zum' },
        ],
      },
      {
        id: 'praepositionen-akkusativ',
        number: 34,
        title: 'Prepositions with Accusative',
        titleDe: 'Präpositionen mit Akkusativ',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Für, um, durch, ohne, gegen',
        keyPoints: [
          'für - for',
          'um - around, at (time)',
          'durch - through',
          'ohne - without',
          'gegen - against',
        ],
        examples: [
          { german: 'Das ist für dich.', english: 'That is for you.', highlight: 'für dich' },
          { german: 'Wir gehen durch den Park.', english: 'We walk through the park.', highlight: 'durch den' },
          { german: 'Ich trinke Kaffee ohne Zucker.', english: 'I drink coffee without sugar.', highlight: 'ohne' },
        ],
      },
      {
        id: 'wechselpraepositionen-dativ',
        number: 35,
        title: 'Two-Way Prepositions: Location (Dative)',
        titleDe: 'Wechselpräpositionen mit Dativ',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Wo? Im Kino - Location with dative',
        keyPoints: [
          'Wo? (Where?) → Dative = Location',
          'in, an, auf, über, unter, vor, hinter, neben, zwischen',
          'in + dem = im, an + dem = am',
          'Answer to "Wo bist du?"',
        ],
        examples: [
          { german: 'Ich bin im Kino.', english: 'I am at the cinema.', highlight: 'im (in dem)' },
          { german: 'Das Bild hängt an der Wand.', english: 'The picture hangs on the wall.', highlight: 'an der' },
          { german: 'Die Katze liegt auf dem Sofa.', english: 'The cat lies on the sofa.', highlight: 'auf dem' },
        ],
      },
      {
        id: 'wechselpraepositionen-akkusativ',
        number: 36,
        title: 'Two-Way Prepositions: Direction (Accusative)',
        titleDe: 'Wechselpräpositionen mit Dativ und Akkusativ',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Im Kino oder ins Kino?',
        keyPoints: [
          'Wohin? (Where to?) → Accusative = Direction',
          'Wo? (Where?) → Dative = Location',
          'in + das = ins, an + das = ans',
          'Answer to "Wohin gehst du?"',
        ],
        examples: [
          { german: 'Ich gehe ins Kino.', english: 'I go to the cinema.', highlight: 'ins (in das)' },
          { german: 'Ich bin im Kino.', english: 'I am at the cinema.', highlight: 'im (in dem)' },
          { german: 'Sie legt das Buch auf den Tisch.', english: 'She puts the book on the table.', highlight: 'auf den' },
        ],
      },
      {
        id: 'lokale-praep-wohin',
        number: 37,
        title: 'Local Prepositions: Wohin?',
        titleDe: 'Lokale Präpositionen: Wohin?',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Ich gehe zum Arzt und auf den Markt',
        keyPoints: [
          'zu + Dativ: to people, places (zum Arzt, zur Schule)',
          'in + Akkusativ: into buildings (ins Kino)',
          'auf + Akkusativ: onto open areas (auf den Markt)',
          'nach: to cities, countries without article (nach Berlin)',
        ],
        examples: [
          { german: 'Ich gehe zum Arzt.', english: 'I go to the doctor.', highlight: 'zum' },
          { german: 'Ich fahre nach Berlin.', english: 'I travel to Berlin.', highlight: 'nach' },
          { german: 'Ich gehe auf den Markt.', english: 'I go to the market.', highlight: 'auf den' },
        ],
      },
      {
        id: 'lokale-praep-wo',
        number: 38,
        title: 'Local Prepositions: Wo?',
        titleDe: 'Lokale Präpositionen: Wo?',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Ich war beim Arzt und bin jetzt auf dem Markt',
        keyPoints: [
          'bei + Dativ: at someone\'s place (beim Arzt)',
          'in + Dativ: inside buildings (im Kino)',
          'auf + Dativ: on open areas (auf dem Markt)',
          'in: in cities, countries (in Berlin)',
        ],
        examples: [
          { german: 'Ich bin beim Arzt.', english: 'I am at the doctor\'s.', highlight: 'beim' },
          { german: 'Ich bin in Berlin.', english: 'I am in Berlin.', highlight: 'in' },
          { german: 'Ich bin auf dem Markt.', english: 'I am at the market.', highlight: 'auf dem' },
        ],
      },
      {
        id: 'lokale-praep-woher',
        number: 39,
        title: 'Local Prepositions: Woher?',
        titleDe: 'Lokale Präpositionen: Woher?',
        level: 'A2',
        category: 'praepositionen-1',
        description: 'Ich komme aus den Bergen vom Skifahren',
        keyPoints: [
          'aus + Dativ: out of buildings/places',
          'von + Dativ: from people, events',
          'aus: from cities, countries (aus Berlin)',
        ],
        examples: [
          { german: 'Ich komme aus dem Kino.', english: 'I come from the cinema.', highlight: 'aus dem' },
          { german: 'Ich komme vom Arzt.', english: 'I come from the doctor.', highlight: 'vom' },
          { german: 'Ich komme aus Deutschland.', english: 'I come from Germany.', highlight: 'aus' },
        ],
      },
    ],
  },
  {
    id: 'adjektive-1',
    title: 'Adjectives 1',
    titleDe: 'Adjektive 1',
    icon: '🎨',
    lessons: [
      {
        id: 'adj-nominativ-akkusativ',
        number: 40,
        title: 'Adjective Endings: Nom. & Acc.',
        titleDe: 'Nominativ und Akkusativ',
        level: 'A2',
        category: 'adjektive-1',
        description: 'Ein netter Mann! Ich liebe den netten Mann',
        keyPoints: [
          'After der/die/das: -e (der nette Mann)',
          'After ein/eine: -er (m), -e (f), -es (n)',
          'Accusative masculine: -en (den netten Mann)',
          'Only masculine accusative changes',
        ],
        examples: [
          { german: 'Der nette Mann hilft mir.', english: 'The nice man helps me.', highlight: 'nette' },
          { german: 'Ein netter Mann hilft mir.', english: 'A nice man helps me.', highlight: 'netter' },
          { german: 'Ich sehe den netten Mann.', english: 'I see the nice man.', highlight: 'netten' },
        ],
      },
      {
        id: 'adj-nom-akk-dat',
        number: 41,
        title: 'Adjective Endings: Nom., Acc., Dat.',
        titleDe: 'Nominativ, Akkusativ und Dativ',
        level: 'A2',
        category: 'adjektive-1',
        description: 'Am ersten Mai',
        keyPoints: [
          'Dative: all genders take -en after der-words',
          'Dative: nach einem langen Tag',
          'Pattern: strong endings when no article signal',
          'Weak endings (-en) after definite articles',
        ],
        examples: [
          { german: 'mit dem neuen Auto', english: 'with the new car', highlight: 'neuen' },
          { german: 'nach einem langen Tag', english: 'after a long day', highlight: 'langen' },
          { german: 'am ersten Mai', english: 'on the first of May', highlight: 'ersten' },
        ],
      },
      {
        id: 'komparativ-vergleich',
        number: 42,
        title: 'Comparative & Comparison',
        titleDe: 'Komparativ und Vergleichssätze',
        level: 'A2',
        category: 'adjektive-1',
        description: 'Schneller als ...',
        keyPoints: [
          'Add -er for comparative: schnell → schneller',
          'Umlaut often added: alt → älter, groß → größer',
          'als = than (Er ist größer als ich)',
          'so ... wie = as ... as (so groß wie)',
        ],
        examples: [
          { german: 'Sie ist schneller als ich.', english: 'She is faster than me.', highlight: 'schneller als' },
          { german: 'Er ist so groß wie ich.', english: 'He is as tall as me.', highlight: 'so ... wie' },
          { german: 'Berlin ist größer als München.', english: 'Berlin is bigger than Munich.', highlight: 'größer' },
        ],
      },
      {
        id: 'superlativ',
        number: 43,
        title: 'Superlative',
        titleDe: 'Superlativ',
        level: 'A2',
        category: 'adjektive-1',
        description: 'Der kleinste Mann läuft am schnellsten',
        keyPoints: [
          'am + adjective + -sten: am schnellsten',
          'der/die/das + adjective + -ste: der schnellste',
          '-esten after d, t, s, ß, z: am ältesten',
          'Irregular: gut → am besten, viel → am meisten',
        ],
        examples: [
          { german: 'Er läuft am schnellsten.', english: 'He runs the fastest.', highlight: 'am schnellsten' },
          { german: 'Das ist der größte Hund.', english: 'That is the biggest dog.', highlight: 'größte' },
          { german: 'Sie singt am besten.', english: 'She sings the best.', highlight: 'am besten' },
        ],
      },
    ],
  },
  {
    id: 'satzverbindungen-1',
    title: 'Sentence Connectors 1',
    titleDe: 'Sätze und Satzverbindungen 1',
    icon: '🔗',
    lessons: [
      {
        id: 'hauptsaetze-pos0',
        number: 44,
        title: 'Connecting Main Clauses (Position 0)',
        titleDe: 'Hauptsätze verbinden (Position 0)',
        level: 'A2',
        category: 'satzverbindungen-1',
        description: 'Und, aber, oder, denn',
        keyPoints: [
          'und (and), aber (but), oder (or), denn (because)',
          'Position 0: don\'t change word order',
          'Subject-Verb order remains: Ich esse, und du trinkst.',
          'Called coordinating conjunctions',
        ],
        examples: [
          { german: 'Ich esse Pizza, und er trinkt Cola.', english: 'I eat pizza, and he drinks cola.', highlight: 'und' },
          { german: 'Sie ist müde, aber sie arbeitet.', english: 'She is tired, but she works.', highlight: 'aber' },
          { german: 'Ich lerne, denn ich habe eine Prüfung.', english: 'I study because I have an exam.', highlight: 'denn' },
        ],
      },
      {
        id: 'hauptsaetze-pos1',
        number: 45,
        title: 'Connecting Main Clauses (Position 1)',
        titleDe: 'Hauptsätze verbinden (Position 1)',
        level: 'A2',
        category: 'satzverbindungen-1',
        description: 'Deshalb, sonst, dann, danach',
        keyPoints: [
          'deshalb (therefore), sonst (otherwise), dann (then), danach (after that)',
          'Position 1: cause inversion (verb before subject)',
          'Ich bin müde, deshalb gehe ich ins Bett.',
          'Called adverbial connectors',
        ],
        examples: [
          { german: 'Ich bin müde, deshalb gehe ich schlafen.', english: 'I am tired, therefore I go to sleep.', highlight: 'deshalb' },
          { german: 'Beeil dich, sonst kommst du zu spät.', english: 'Hurry up, otherwise you\'ll be late.', highlight: 'sonst' },
          { german: 'Erst esse ich, dann gehe ich.', english: 'First I eat, then I go.', highlight: 'dann' },
        ],
      },
      {
        id: 'nebensaetze-weil-wenn-dass',
        number: 46,
        title: 'Subordinate Clauses: weil, wenn, dass',
        titleDe: 'Nebensätze mit weil, wenn und dass',
        level: 'A2',
        category: 'satzverbindungen-1',
        description: '... weil ich Deutsch lernen möchte',
        keyPoints: [
          'weil (because), wenn (if/when), dass (that)',
          'Verb goes to the END of the clause',
          'Comma before the conjunction',
          'Main clause can come first or second',
        ],
        examples: [
          { german: 'Ich lerne Deutsch, weil ich in Berlin arbeite.', english: 'I learn German because I work in Berlin.', highlight: 'weil ... arbeite' },
          { german: 'Wenn es regnet, bleibe ich zu Hause.', english: 'When it rains, I stay home.', highlight: 'Wenn ... regnet' },
          { german: 'Ich glaube, dass er kommt.', english: 'I believe that he is coming.', highlight: 'dass ... kommt' },
        ],
      },
    ],
  },
  {
    id: 'woerter-wortbildung',
    title: 'Words & Word Formation',
    titleDe: 'Wörter und Wortbildung',
    icon: '🧩',
    lessons: [
      {
        id: 'komposita',
        number: 47,
        title: 'Compound Words',
        titleDe: 'Komposita',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Kinderarzt oder Arztkinder?',
        keyPoints: [
          'German loves compound words',
          'Last word determines gender and meaning',
          'der Kindergarten = children\'s garden (kindergarten)',
          'das Haustier = house animal (pet)',
        ],
        examples: [
          { german: 'der Kinderarzt', english: 'children\'s doctor (pediatrician)', highlight: 'Kinder+Arzt' },
          { german: 'das Schlafzimmer', english: 'sleep room (bedroom)', highlight: 'Schlaf+Zimmer' },
          { german: 'die Haustür', english: 'house door (front door)', highlight: 'Haus+Tür' },
        ],
      },
      {
        id: 'zusammengesetzte-verben',
        number: 48,
        title: 'Compound Verbs',
        titleDe: 'Zusammengesetzte Verben',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Ich bin dann mal weg',
        keyPoints: [
          'Separable: prefix stressed, separates (aufstehen → ich stehe auf)',
          'Inseparable: prefix unstressed, stays (verstehen → ich verstehe)',
          'Common separable: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-',
          'Common inseparable: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-',
        ],
        examples: [
          { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7.', highlight: 'stehe ... auf' },
          { german: 'Ich verstehe das nicht.', english: 'I don\'t understand that.', highlight: 'verstehe' },
        ],
      },
      {
        id: 'genusregeln',
        number: 49,
        title: 'Gender Rules',
        titleDe: 'Genusregeln',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Der, die oder das?',
        keyPoints: [
          'der: -ling, -er (agent), -ismus, days, months, weather',
          'die: -ung, -heit, -keit, -schaft, -tion, -ie, most -e',
          'das: -chen, -lein, -ment, -um, Ge- collective, infinitives',
          'Learn nouns with their articles!',
        ],
        examples: [
          { german: 'der Frühling (-ling)', english: 'spring', highlight: '-ling → der' },
          { german: 'die Zeitung (-ung)', english: 'newspaper', highlight: '-ung → die' },
          { german: 'das Mädchen (-chen)', english: 'girl', highlight: '-chen → das' },
        ],
      },
      {
        id: 'partikeln',
        number: 50,
        title: 'Particles',
        titleDe: 'Partikeln',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Was heißt das denn?',
        keyPoints: [
          'denn - adds interest/surprise to questions',
          'doch - contradicts negative, emphasizes',
          'mal - softens requests',
          'ja - emphasizes known information',
          'eigentlich - actually',
        ],
        examples: [
          { german: 'Was ist denn das?', english: 'What is that (then)?', highlight: 'denn' },
          { german: 'Komm doch!', english: 'Do come!', highlight: 'doch' },
          { german: 'Kannst du mir mal helfen?', english: 'Can you help me (for a sec)?', highlight: 'mal' },
        ],
      },
      {
        id: 'neue-woerter',
        number: 51,
        title: 'Creating New Words',
        titleDe: 'Aus Wörtern neue Wörter machen',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: '-chen, -lein, -er, -in, -ung',
        keyPoints: [
          '-chen/-lein: diminutive (das Häuschen)',
          '-er: person who does something (der Lehrer)',
          '-in: feminine form (die Lehrerin)',
          '-ung: noun from verb (die Übung from üben)',
        ],
        examples: [
          { german: 'das Haus → das Häuschen', english: 'house → little house', highlight: '-chen' },
          { german: 'lehren → der Lehrer → die Lehrerin', english: 'teach → teacher (m/f)', highlight: '-er, -in' },
        ],
      },
      {
        id: 'negationswoerter',
        number: 52,
        title: 'Negation Words',
        titleDe: 'Negationswörter',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Nicht und nichts, noch nicht und nicht mehr',
        keyPoints: [
          'nicht - not',
          'nichts - nothing',
          'noch nicht - not yet',
          'nicht mehr - no more, no longer',
          'niemand - nobody',
          'nie/niemals - never',
        ],
        examples: [
          { german: 'Ich verstehe nichts.', english: 'I understand nothing.', highlight: 'nichts' },
          { german: 'Er ist noch nicht da.', english: 'He is not here yet.', highlight: 'noch nicht' },
          { german: 'Sie arbeitet nicht mehr.', english: 'She doesn\'t work anymore.', highlight: 'nicht mehr' },
        ],
      },
      {
        id: 'lokale-adverbien',
        number: 53,
        title: 'Local Adverbs',
        titleDe: 'Lokale Adverbien: Position und Direktion',
        level: 'B1',
        category: 'woerter-wortbildung',
        description: 'Ich bin oben. Komm auch nach oben.',
        keyPoints: [
          'Position: oben (up), unten (down), hier, da, dort',
          'Direction: nach oben (upward), nach unten (downward)',
          'hin - away from speaker, her - toward speaker',
          'hierhin, dorthin, herein, heraus',
        ],
        examples: [
          { german: 'Ich bin oben.', english: 'I am upstairs.', highlight: 'oben' },
          { german: 'Komm nach oben!', english: 'Come upstairs!', highlight: 'nach oben' },
          { german: 'Geh hinaus!', english: 'Go outside!', highlight: 'hinaus' },
        ],
      },
    ],
  },
  {
    id: 'verben-3',
    title: 'Verbs 3 - Advanced',
    titleDe: 'Verben 3',
    icon: '📚',
    lessons: [
      {
        id: 'praeteritum-full',
        number: 54,
        title: 'Simple Past (Präteritum)',
        titleDe: 'Präteritum',
        level: 'B1',
        category: 'verben-3',
        description: 'Er kam, sah und sagte',
        keyPoints: [
          'Regular: stem + -te, -test, -te, -ten, -tet, -ten',
          'Irregular: vowel change + endings',
          'Used in written German, stories, reports',
          'Common in speech for sein, haben, modals',
        ],
        examples: [
          { german: 'Er machte seine Hausaufgaben.', english: 'He did his homework.', highlight: 'machte' },
          { german: 'Sie kam gestern an.', english: 'She arrived yesterday.', highlight: 'kam' },
          { german: 'Wir gingen ins Kino.', english: 'We went to the cinema.', highlight: 'gingen' },
        ],
      },
      {
        id: 'plusquamperfekt',
        number: 55,
        title: 'Past Perfect',
        titleDe: 'Plusquamperfekt',
        level: 'B1',
        category: 'verben-3',
        description: 'Ich hatte zu lange geschlafen',
        keyPoints: [
          'hatte/war (past) + Partizip II',
          'Action happened before another past action',
          'Ich hatte gegessen, bevor er kam.',
          'Often with nachdem, bevor, als',
        ],
        examples: [
          { german: 'Ich hatte das Buch schon gelesen.', english: 'I had already read the book.', highlight: 'hatte ... gelesen' },
          { german: 'Sie war schon gegangen.', english: 'She had already left.', highlight: 'war ... gegangen' },
        ],
      },
      {
        id: 'reflexivpronomen-akk-dat',
        number: 56,
        title: 'Reflexive Pronouns: Acc. & Dat.',
        titleDe: 'Reflexivpronomen im Akkusativ und Dativ',
        level: 'B1',
        category: 'verben-3',
        description: 'Ich wasche mir die Hände',
        keyPoints: [
          'Accusative: when reflexive is only object',
          'Dative: when there\'s another accusative object',
          'Ich wasche mich (acc) vs. Ich wasche mir die Hände (dat)',
        ],
        examples: [
          { german: 'Ich ziehe mich an.', english: 'I get dressed.', highlight: 'mich (acc)' },
          { german: 'Ich ziehe mir einen Mantel an.', english: 'I put on a coat.', highlight: 'mir (dat)' },
        ],
      },
      {
        id: 'trennbar-untrennbar',
        number: 57,
        title: 'Separable & Inseparable Verbs',
        titleDe: 'Trennbare und untrennbare Verben',
        level: 'B1',
        category: 'verben-3',
        description: 'Kaufe ich ein oder bestelle ich Pizza?',
        keyPoints: [
          'Separable: stressed prefix (áufstehen)',
          'Inseparable: unstressed prefix (verstéhen)',
          'Some prefixes can be both: um-, über-, unter-, durch-',
          'Meaning changes with stress',
        ],
        examples: [
          { german: 'Ich kaufe ein. (einkaufen)', english: 'I shop.', highlight: 'kaufe ... ein' },
          { german: 'Ich verkaufe das Auto. (verkaufen)', english: 'I sell the car.', highlight: 'verkaufe' },
        ],
      },
      {
        id: 'verben-praepositionen',
        number: 58,
        title: 'Verbs with Prepositions',
        titleDe: 'Verben mit Präpositionen',
        level: 'B1',
        category: 'verben-3',
        description: 'Sie freut sich über die Blumen',
        keyPoints: [
          'Many verbs require specific prepositions',
          'warten auf (acc) - wait for',
          'sich freuen über (acc) - be happy about',
          'denken an (acc) - think of',
          'sich interessieren für (acc) - be interested in',
        ],
        examples: [
          { german: 'Ich warte auf den Bus.', english: 'I wait for the bus.', highlight: 'warten auf' },
          { german: 'Sie freut sich über das Geschenk.', english: 'She is happy about the gift.', highlight: 'freut sich über' },
        ],
      },
      {
        id: 'praepositionaladverbien',
        number: 59,
        title: 'Prepositional Adverbs',
        titleDe: 'Präpositionaladverbien und -pronomen',
        level: 'B1',
        category: 'verben-3',
        description: 'Daneben, danach, dafür ...',
        keyPoints: [
          'da(r) + preposition: darauf, dafür, damit',
          'wo(r) + preposition in questions: worauf, wofür',
          'Refers to things, not people',
          'For people use preposition + pronoun',
        ],
        examples: [
          { german: 'Wofür interessierst du dich?', english: 'What are you interested in?', highlight: 'Wofür' },
          { german: 'Dafür interessiere ich mich.', english: 'I am interested in that.', highlight: 'Dafür' },
        ],
      },
      {
        id: 'konjunktiv2-formen',
        number: 60,
        title: 'Subjunctive II: Forms',
        titleDe: 'Konjunktiv 2: Formen',
        level: 'B1',
        category: 'verben-3',
        description: 'Wäre, hätte, würde ...',
        keyPoints: [
          'würde + infinitive (most verbs)',
          'wäre (would be), hätte (would have)',
          'könnte, müsste, sollte (modal verbs)',
          'Based on past tense + umlaut',
        ],
        examples: [
          { german: 'Ich würde gern kommen.', english: 'I would like to come.', highlight: 'würde' },
          { german: 'Wenn ich reich wäre...', english: 'If I were rich...', highlight: 'wäre' },
          { german: 'Ich hätte gern einen Kaffee.', english: 'I would like a coffee.', highlight: 'hätte' },
        ],
      },
      {
        id: 'konjunktiv2-gebrauch',
        number: 61,
        title: 'Subjunctive II: Usage',
        titleDe: 'Konjunktiv 2: Gebrauch',
        level: 'B1',
        category: 'verben-3',
        description: 'Wenn ich viel Geld hätte, ...',
        keyPoints: [
          'Polite requests: Könnten Sie mir helfen?',
          'Wishes: Ich hätte gern...',
          'Unreal conditions: Wenn ich reich wäre...',
          'Advice: An deiner Stelle würde ich...',
        ],
        examples: [
          { german: 'Könnten Sie mir bitte helfen?', english: 'Could you please help me?', highlight: 'Könnten' },
          { german: 'Wenn ich Zeit hätte, würde ich kommen.', english: 'If I had time, I would come.', highlight: 'hätte ... würde' },
        ],
      },
      {
        id: 'passiv',
        number: 62,
        title: 'Passive Voice',
        titleDe: 'Passiv',
        level: 'B1',
        category: 'verben-3',
        description: 'Der Baum wird gepflanzt',
        keyPoints: [
          'werden + Partizip II',
          'Focus on action, not actor',
          'Der Kuchen wird gebacken. (is being baked)',
          'von + dative for agent',
        ],
        examples: [
          { german: 'Das Haus wird gebaut.', english: 'The house is being built.', highlight: 'wird ... gebaut' },
          { german: 'Die Pizza wird von ihm gemacht.', english: 'The pizza is made by him.', highlight: 'wird ... gemacht' },
        ],
      },
      {
        id: 'passiv-vergangenheit',
        number: 63,
        title: 'Passive: Past Tenses',
        titleDe: 'Passiv in der Vergangenheit',
        level: 'B1',
        category: 'verben-3',
        description: 'Wann wurde der Kölner Dom gebaut?',
        keyPoints: [
          'Präteritum: wurde + Partizip II',
          'Perfekt: ist + Partizip II + worden',
          'Der Dom wurde gebaut. (was built)',
          'Der Dom ist gebaut worden. (has been built)',
        ],
        examples: [
          { german: 'Das Haus wurde 1990 gebaut.', english: 'The house was built in 1990.', highlight: 'wurde ... gebaut' },
          { german: 'Die Arbeit ist erledigt worden.', english: 'The work has been completed.', highlight: 'ist ... worden' },
        ],
      },
      {
        id: 'futur1',
        number: 64,
        title: 'Future with werden',
        titleDe: 'Vermutung und Zukunft mit Futur 1',
        level: 'B1',
        category: 'verben-3',
        description: 'Der Präsident wird Japan besuchen',
        keyPoints: [
          'werden + infinitive',
          'Future actions: Ich werde kommen.',
          'Predictions/assumptions: Er wird wohl krank sein.',
          'Often replaced by present + time word',
        ],
        examples: [
          { german: 'Ich werde morgen ankommen.', english: 'I will arrive tomorrow.', highlight: 'werde ... ankommen' },
          { german: 'Er wird wohl schlafen.', english: 'He is probably sleeping.', highlight: 'wird ... schlafen' },
        ],
      },
      {
        id: 'werden-funktionen',
        number: 65,
        title: 'Functions of werden',
        titleDe: 'Funktionen von werden',
        level: 'B1',
        category: 'verben-3',
        description: 'Werden, werden, werden ...',
        keyPoints: [
          'Main verb: become (Er wird Arzt.)',
          'Future auxiliary: will (Er wird kommen.)',
          'Passive auxiliary: is being (Es wird gemacht.)',
          'Different meanings, same verb!',
        ],
        examples: [
          { german: 'Er wird Arzt.', english: 'He becomes a doctor.', highlight: 'wird (become)' },
          { german: 'Er wird kommen.', english: 'He will come.', highlight: 'wird (future)' },
          { german: 'Es wird gemacht.', english: 'It is being done.', highlight: 'wird (passive)' },
        ],
      },
      {
        id: 'verb-lassen',
        number: 66,
        title: 'The Verb lassen',
        titleDe: 'Das Verb lassen',
        level: 'B1',
        category: 'verben-3',
        description: 'Leben und leben lassen',
        keyPoints: [
          'lassen + infinitive: have something done',
          'Ich lasse mein Auto reparieren. (I have my car repaired)',
          'Also: leave, let, allow',
          'Lass mich! (Leave me alone!)',
        ],
        examples: [
          { german: 'Ich lasse meine Haare schneiden.', english: 'I have my hair cut.', highlight: 'lasse ... schneiden' },
          { german: 'Lass mich in Ruhe!', english: 'Leave me alone!', highlight: 'Lass' },
        ],
      },
      {
        id: 'positions-direktionsverben',
        number: 67,
        title: 'Position & Direction Verbs',
        titleDe: 'Positions- und Direktionsverben',
        level: 'B1',
        category: 'verben-3',
        description: 'Stehen/stellen, sitzen/setzen, liegen/legen und hängen',
        keyPoints: [
          'Position (Wo?): stehen, sitzen, liegen, hängen + Dativ',
          'Direction (Wohin?): stellen, setzen, legen, hängen + Akkusativ',
          'Das Buch liegt auf dem Tisch. (is lying)',
          'Ich lege das Buch auf den Tisch. (I lay it)',
        ],
        examples: [
          { german: 'Das Buch steht im Regal.', english: 'The book stands in the shelf.', highlight: 'steht ... im' },
          { german: 'Ich stelle das Buch ins Regal.', english: 'I put the book in the shelf.', highlight: 'stelle ... ins' },
        ],
      },
    ],
  },
  {
    id: 'nomen-2',
    title: 'Nouns 2 - Advanced',
    titleDe: 'Nomen 2',
    icon: '📖',
    lessons: [
      {
        id: 'genitiv',
        number: 68,
        title: 'Genitive Case',
        titleDe: 'Genitiv',
        level: 'B1',
        category: 'nomen-2',
        description: 'Das Auto seines Vaters',
        keyPoints: [
          'Shows possession: des Mannes, der Frau',
          'Masculine/neuter nouns add -(e)s',
          'After certain prepositions: wegen, während, trotz',
          'Often replaced by von + Dativ in speech',
        ],
        examples: [
          { german: 'Das Auto des Mannes.', english: 'The man\'s car.', highlight: 'des Mannes' },
          { german: 'Trotz des Regens gehen wir.', english: 'Despite the rain, we go.', highlight: 'trotz des' },
        ],
      },
      {
        id: 'n-deklination',
        number: 69,
        title: 'N-Declension',
        titleDe: 'n-Deklination',
        level: 'B1',
        category: 'nomen-2',
        description: 'Kennen Sie den Herrn?',
        keyPoints: [
          'Weak masculine nouns add -(e)n in all cases except nominative',
          'der Herr → den Herrn, dem Herrn',
          'der Student → den Studenten',
          'Includes: Junge, Kollege, Kunde, Name, Herz',
        ],
        examples: [
          { german: 'Ich kenne den Studenten.', english: 'I know the student.', highlight: 'den Studenten' },
          { german: 'Ich helfe dem Herrn.', english: 'I help the gentleman.', highlight: 'dem Herrn' },
        ],
      },
      {
        id: 'adjektive-als-nomen-personen',
        number: 70,
        title: 'Adjectives as Nouns (People)',
        titleDe: 'Adjektive für Personen als Nomen',
        level: 'B1',
        category: 'nomen-2',
        description: 'Der Jugendliche – ein Jugendlicher',
        keyPoints: [
          'Adjectives can become nouns for people',
          'Keep adjective endings!',
          'der Deutsche, ein Deutscher, die Deutsche',
          'der Kranke (sick person), der Alte (old person)',
        ],
        examples: [
          { german: 'der Deutsche / ein Deutscher', english: 'the German / a German (man)', highlight: 'Deutsche' },
          { german: 'Ich kenne einen Deutschen.', english: 'I know a German.', highlight: 'einen Deutschen' },
        ],
      },
      {
        id: 'adjektive-neutrale-nomen',
        number: 71,
        title: 'Adjectives as Neutral Nouns',
        titleDe: 'Adjektive als neutrale Nomen',
        level: 'B1',
        category: 'nomen-2',
        description: 'Alles Gute!',
        keyPoints: [
          'Abstract concepts: das Gute, das Neue',
          'After etwas, nichts, viel, wenig: etwas Neues',
          'Capital letter, adjective endings',
        ],
        examples: [
          { german: 'Alles Gute!', english: 'All the best!', highlight: 'Gute' },
          { german: 'Ich habe etwas Interessantes gelesen.', english: 'I read something interesting.', highlight: 'Interessantes' },
        ],
      },
    ],
  },
  {
    id: 'satzverbindungen-2',
    title: 'Sentence Connectors 2',
    titleDe: 'Sätze und Satzverbindungen 2',
    icon: '🔗',
    lessons: [
      {
        id: 'indirekte-fragen',
        number: 72,
        title: 'Indirect Questions',
        titleDe: 'Indirekte Fragen',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Wissen Sie, ob ...?',
        keyPoints: [
          'W-question: Ich weiß nicht, wo er ist.',
          'Yes/No question: Ich weiß nicht, ob er kommt.',
          'Verb goes to the end',
          'No question mark in indirect questions',
        ],
        examples: [
          { german: 'Ich weiß nicht, wo er wohnt.', english: 'I don\'t know where he lives.', highlight: 'wo ... wohnt' },
          { german: 'Weißt du, ob sie kommt?', english: 'Do you know if she is coming?', highlight: 'ob ... kommt' },
        ],
      },
      {
        id: 'infinitiv-mit-zu',
        number: 73,
        title: 'Infinitive with zu',
        titleDe: 'Infinitiv mit zu',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Es ist schön, ein Fest zu feiern',
        keyPoints: [
          'Infinitive clause: ..., etwas zu machen',
          'Separable verbs: ..., aufzustehen',
          'After verbs: hoffen, versuchen, beginnen',
          'After adjectives: Es ist schwer zu verstehen.',
        ],
        examples: [
          { german: 'Ich versuche, Deutsch zu lernen.', english: 'I try to learn German.', highlight: 'zu lernen' },
          { german: 'Es ist schwer aufzustehen.', english: 'It is hard to get up.', highlight: 'aufzustehen' },
        ],
      },
      {
        id: 'infinitiv-ohne-zu',
        number: 74,
        title: 'Infinitive without zu',
        titleDe: 'Infinitiv ohne zu',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Ich will singen, lass mich singen!',
        keyPoints: [
          'Modal verbs: Ich kann schwimmen.',
          'lassen: Lass mich gehen.',
          'sehen, hören, fühlen: Ich sehe ihn kommen.',
          'gehen, fahren, kommen + infinitive',
        ],
        examples: [
          { german: 'Ich höre sie singen.', english: 'I hear her singing.', highlight: 'singen' },
          { german: 'Lass uns gehen!', english: 'Let\'s go!', highlight: 'gehen' },
        ],
      },
      {
        id: 'relativsaetze-1',
        number: 75,
        title: 'Relative Clauses 1',
        titleDe: 'Relativsätze 1',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Das ist der Mann, der immer meine Nachbarin besucht',
        keyPoints: [
          'Relative pronouns: der, die, das (like definite articles)',
          'Agree in gender/number with noun they refer to',
          'Case depends on function in relative clause',
          'Verb goes to the end',
        ],
        examples: [
          { german: 'Der Mann, der dort steht, ist mein Vater.', english: 'The man who stands there is my father.', highlight: 'der ... steht' },
          { german: 'Die Frau, die ich kenne, arbeitet hier.', english: 'The woman whom I know works here.', highlight: 'die ... kenne' },
        ],
      },
      {
        id: 'relativsaetze-2',
        number: 76,
        title: 'Relative Clauses 2',
        titleDe: 'Relativsätze 2',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Wie heißt das Ding, mit dem man ...?',
        keyPoints: [
          'With prepositions: preposition + relative pronoun',
          'Das Buch, mit dem ich arbeite...',
          'For things: wo(r) + preposition possible',
          'Das Thema, worüber wir sprechen...',
        ],
        examples: [
          { german: 'Der Stift, mit dem ich schreibe, ist rot.', english: 'The pen with which I write is red.', highlight: 'mit dem' },
          { german: 'Das Thema, wofür ich mich interessiere...', english: 'The topic I\'m interested in...', highlight: 'wofür' },
        ],
      },
      {
        id: 'temporale-nebensaetze-wenn-als',
        number: 77,
        title: 'Temporal Clauses: wenn & als',
        titleDe: 'Temporale Nebensätze mit wenn und als',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Ich gehe, wenn ... / Ich ging, als ...',
        keyPoints: [
          'wenn - when (present/future, repeated past)',
          'als - when (single past event)',
          'Wenn ich ankomme, rufe ich an. (when I arrive)',
          'Als ich ankam, war niemand da. (when I arrived)',
        ],
        examples: [
          { german: 'Wenn ich Zeit habe, lese ich.', english: 'When I have time, I read.', highlight: 'Wenn' },
          { german: 'Als ich jung war, spielte ich Fußball.', english: 'When I was young, I played soccer.', highlight: 'Als' },
        ],
      },
      {
        id: 'temporale-nebensaetze',
        number: 78,
        title: 'More Temporal Clauses',
        titleDe: 'Temporale Nebensätze',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Während, bevor, nachdem, seit',
        keyPoints: [
          'während - while',
          'bevor - before',
          'nachdem - after (often with past perfect)',
          'seit/seitdem - since',
          'bis - until',
        ],
        examples: [
          { german: 'Während ich esse, lese ich.', english: 'While I eat, I read.', highlight: 'Während' },
          { german: 'Nachdem ich gegessen hatte, ging ich.', english: 'After I had eaten, I left.', highlight: 'Nachdem' },
        ],
      },
      {
        id: 'finalsaetze',
        number: 79,
        title: 'Purpose Clauses',
        titleDe: 'Finalsätze',
        level: 'B1',
        category: 'satzverbindungen-2',
        description: 'Um ... zu und damit',
        keyPoints: [
          'um ... zu + infinitive (same subject)',
          'damit + subordinate clause (different subjects)',
          'Express purpose: in order to',
        ],
        examples: [
          { german: 'Ich lerne, um die Prüfung zu bestehen.', english: 'I study in order to pass the exam.', highlight: 'um ... zu' },
          { german: 'Ich erkläre es, damit du verstehst.', english: 'I explain it so that you understand.', highlight: 'damit' },
        ],
      },
      {
        id: 'doppelkonnektoren',
        number: 80,
        title: 'Double Connectors',
        titleDe: 'Doppelkonnektoren',
        level: 'B2',
        category: 'satzverbindungen-2',
        description: 'Entweder ... oder, weder ... noch, sowohl ... als auch',
        keyPoints: [
          'entweder ... oder - either ... or',
          'weder ... noch - neither ... nor',
          'sowohl ... als auch - both ... and',
          'nicht nur ... sondern auch - not only ... but also',
        ],
        examples: [
          { german: 'Entweder kommst du, oder ich gehe.', english: 'Either you come, or I go.', highlight: 'Entweder ... oder' },
          { german: 'Sie spricht sowohl Deutsch als auch Englisch.', english: 'She speaks both German and English.', highlight: 'sowohl ... als auch' },
        ],
      },
      {
        id: 'vergleichssaetze',
        number: 81,
        title: 'Comparison Clauses',
        titleDe: 'Vergleichssätze',
        level: 'B2',
        category: 'satzverbindungen-2',
        description: 'Je größer, desto besser!',
        keyPoints: [
          'je ... desto/umso - the ... the',
          'als ob - as if (+ Konjunktiv II)',
          'wie wenn - as if',
        ],
        examples: [
          { german: 'Je mehr ich lerne, desto besser verstehe ich.', english: 'The more I learn, the better I understand.', highlight: 'Je ... desto' },
          { german: 'Er tut, als ob er nichts wüsste.', english: 'He acts as if he knew nothing.', highlight: 'als ob' },
        ],
      },
    ],
  },
  {
    id: 'praepositionen-2',
    title: 'Prepositions 2',
    titleDe: 'Präpositionen 2',
    icon: '📍',
    lessons: [
      {
        id: 'praepositionen-genitiv',
        number: 82,
        title: 'Prepositions with Genitive',
        titleDe: 'Präpositionen mit Genitiv',
        level: 'B2',
        category: 'praepositionen-2',
        description: 'Während, wegen, trotz, innerhalb, außerhalb',
        keyPoints: [
          'während - during',
          'wegen - because of',
          'trotz - despite',
          'innerhalb - within',
          'außerhalb - outside of',
          'statt/anstatt - instead of',
        ],
        examples: [
          { german: 'Wegen des Wetters bleiben wir zu Hause.', english: 'Because of the weather, we stay home.', highlight: 'Wegen des' },
          { german: 'Trotz der Kälte gehen wir spazieren.', english: 'Despite the cold, we go for a walk.', highlight: 'Trotz der' },
        ],
      },
      {
        id: 'temporale-praepositionen-2',
        number: 83,
        title: 'More Temporal Prepositions',
        titleDe: 'Temporale Präpositionen 2',
        level: 'B2',
        category: 'praepositionen-2',
        description: 'Innerhalb, außerhalb, in, nach, vor, seit, bei, während',
        keyPoints: [
          'innerhalb + Genitiv: within (a time frame)',
          'in + Dativ: in (the past), in + (time from now)',
          'vor + Dativ: ago',
          'nach + Dativ: after',
        ],
        examples: [
          { german: 'Innerhalb einer Woche.', english: 'Within a week.', highlight: 'Innerhalb' },
          { german: 'In zwei Wochen fahre ich.', english: 'In two weeks I\'m leaving.', highlight: 'In' },
          { german: 'Vor drei Jahren war ich dort.', english: 'Three years ago I was there.', highlight: 'Vor' },
        ],
      },
    ],
  },
  {
    id: 'adjektive-2',
    title: 'Adjectives 2',
    titleDe: 'Adjektive 2',
    icon: '🎨',
    lessons: [
      {
        id: 'adjektivdeklination-vollstaendig',
        number: 84,
        title: 'Complete Adjective Declension',
        titleDe: 'Adjektivdeklination mit und ohne Artikel',
        level: 'B2',
        category: 'adjektive-2',
        description: 'Deutsches Bier',
        keyPoints: [
          'Without article: strong endings (like der/die/das)',
          'kalter Kaffee, frische Milch, kaltes Bier',
          'After indefinite: mixed endings',
          'After definite: weak endings (-e/-en)',
        ],
        examples: [
          { german: 'kalter Kaffee', english: 'cold coffee (no article)', highlight: 'kalter' },
          { german: 'ein kalter Kaffee', english: 'a cold coffee', highlight: 'kalter' },
          { german: 'der kalte Kaffee', english: 'the cold coffee', highlight: 'kalte' },
        ],
      },
      {
        id: 'partizip-als-adjektiv',
        number: 85,
        title: 'Participles as Adjectives',
        titleDe: 'Partizip 1 als Adjektiv',
        level: 'B2',
        category: 'adjektive-2',
        description: 'Schwimmende Vögel und fliegende Fische',
        keyPoints: [
          'Partizip I (present): infinitive + d (lachend, singend)',
          'Used as adjective: das lachende Kind',
          'Meaning: doing the action (the laughing child)',
          'Takes adjective endings',
        ],
        examples: [
          { german: 'das schlafende Kind', english: 'the sleeping child', highlight: 'schlafende' },
          { german: 'fließendes Wasser', english: 'running water', highlight: 'fließendes' },
        ],
      },
    ],
  },
];

// Legacy exports for backwards compatibility
export const grammarCategories: GrammarCategory[] = [
  {
    id: 'der-masculine',
    title: 'Der (Masculine)',
    description: 'Common patterns for masculine nouns',
    rules: [
      { id: 'der-ling', pattern: '-ling', article: 'der', explanation: 'Nouns ending in -ling are masculine', examples: ['der Schmetterling (butterfly)', 'der Frühling (spring)', 'der Lehrling (apprentice)'] },
      { id: 'der-er-agent', pattern: '-er (agent nouns)', article: 'der', explanation: 'Nouns ending in -er referring to people or tools are usually masculine', examples: ['der Lehrer (teacher)', 'der Computer (computer)', 'der Fahrer (driver)'], exceptions: ['die Butter', 'die Mutter', 'die Schwester'] },
      { id: 'der-ismus', pattern: '-ismus', article: 'der', explanation: 'Words ending in -ismus are masculine', examples: ['der Tourismus (tourism)', 'der Optimismus (optimism)'] },
      { id: 'der-days', pattern: 'Days & Months', article: 'der', explanation: 'Days of the week and months are masculine', examples: ['der Montag (Monday)', 'der Januar (January)'] },
      { id: 'der-weather', pattern: 'Weather', article: 'der', explanation: 'Most weather phenomena are masculine', examples: ['der Regen (rain)', 'der Schnee (snow)', 'der Wind (wind)'] },
    ],
  },
  {
    id: 'die-feminine',
    title: 'Die (Feminine)',
    description: 'Common patterns for feminine nouns',
    rules: [
      { id: 'die-ung', pattern: '-ung', article: 'die', explanation: 'Almost all nouns ending in -ung are feminine', examples: ['die Zeitung (newspaper)', 'die Wohnung (apartment)'] },
      { id: 'die-heit-keit', pattern: '-heit / -keit', article: 'die', explanation: 'Nouns ending in -heit or -keit are always feminine', examples: ['die Freiheit (freedom)', 'die Möglichkeit (possibility)'] },
      { id: 'die-schaft', pattern: '-schaft', article: 'die', explanation: 'Nouns ending in -schaft are feminine', examples: ['die Freundschaft (friendship)', 'die Wissenschaft (science)'] },
      { id: 'die-tion-sion', pattern: '-tion / -sion', article: 'die', explanation: 'Words ending in -tion or -sion are feminine', examples: ['die Nation (nation)', 'die Information (information)'] },
      { id: 'die-e', pattern: '-e (many nouns)', article: 'die', explanation: 'Many nouns ending in -e are feminine (about 90%)', examples: ['die Lampe (lamp)', 'die Blume (flower)'], exceptions: ['der Name', 'der Käse', 'das Ende'] },
    ],
  },
  {
    id: 'das-neuter',
    title: 'Das (Neuter)',
    description: 'Common patterns for neuter nouns',
    rules: [
      { id: 'das-chen-lein', pattern: '-chen / -lein', article: 'das', explanation: 'Diminutives ending in -chen or -lein are always neuter', examples: ['das Mädchen (girl)', 'das Brötchen (bread roll)'] },
      { id: 'das-ment', pattern: '-ment', article: 'das', explanation: 'Words ending in -ment are neuter', examples: ['das Dokument (document)', 'das Experiment (experiment)'] },
      { id: 'das-um', pattern: '-um', article: 'das', explanation: 'Words ending in -um are neuter', examples: ['das Museum (museum)', 'das Zentrum (center)'] },
      { id: 'das-ge', pattern: 'Ge- (collective)', article: 'das', explanation: 'Collective nouns starting with Ge- are usually neuter', examples: ['das Gebäude (building)', 'das Gemüse (vegetables)'] },
      { id: 'das-infinitive', pattern: 'Infinitives as nouns', article: 'das', explanation: 'When verbs are used as nouns, they are neuter', examples: ['das Essen (eating/food)', 'das Leben (life)'] },
    ],
  },
];

export const caseRules: CaseRule[] = [
  {
    id: 'nominativ', case: 'nominativ', title: 'Nominativ (Subject)', explanation: 'The nominative case is used for the subject of a sentence.', question: 'Wer? Was?',
    articleTable: { masculine: 'der', feminine: 'die', neuter: 'das', plural: 'die' },
    einKeinTable: { masculine: 'ein / kein', feminine: 'eine / keine', neuter: 'ein / kein', plural: '- / keine' },
    examples: ['Der Mann liest.', 'Die Frau singt.', 'Das Kind spielt.'],
  },
  {
    id: 'akkusativ', case: 'akkusativ', title: 'Akkusativ (Direct Object)', explanation: 'The accusative case is used for the direct object.', question: 'Wen? Was?',
    articleTable: { masculine: 'den', feminine: 'die', neuter: 'das', plural: 'die' },
    einKeinTable: { masculine: 'einen / keinen', feminine: 'eine / keine', neuter: 'ein / kein', plural: '- / keine' },
    prepositions: ['durch', 'für', 'gegen', 'ohne', 'um'],
    verbs: ['haben', 'sehen', 'hören', 'lesen', 'essen', 'trinken', 'kaufen'],
    examples: ['Ich sehe den Mann.', 'Sie kauft einen Apfel.'],
  },
  {
    id: 'dativ', case: 'dativ', title: 'Dativ (Indirect Object)', explanation: 'The dative case is used for the indirect object.', question: 'Wem?',
    articleTable: { masculine: 'dem', feminine: 'der', neuter: 'dem', plural: 'den (+n)' },
    einKeinTable: { masculine: 'einem / keinem', feminine: 'einer / keiner', neuter: 'einem / keinem', plural: '- / keinen' },
    prepositions: ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu'],
    verbs: ['helfen', 'danken', 'gehören', 'gefallen', 'schmecken'],
    examples: ['Ich helfe dem Mann.', 'Sie gibt der Frau ein Buch.'],
  },
  {
    id: 'genitiv', case: 'genitiv', title: 'Genitiv (Possession)', explanation: 'The genitive case shows possession.', question: 'Wessen?',
    articleTable: { masculine: 'des (+s/es)', feminine: 'der', neuter: 'des (+s/es)', plural: 'der' },
    einKeinTable: { masculine: 'eines / keines', feminine: 'einer / keiner', neuter: 'eines / keines', plural: '- / keiner' },
    prepositions: ['wegen', 'während', 'trotz', 'statt'],
    examples: ['Das Auto des Mannes.', 'Die Tasche der Frau.'],
  },
];

export const comparisonRules: ComparisonRule[] = [
  {
    id: 'comparative', type: 'comparative', title: 'Komparativ', formation: 'Add -er. Many short adjectives get an umlaut.',
    examples: [
      { base: 'schnell', comparative: 'schneller', superlative: 'am schnellsten', english: 'fast' },
      { base: 'klein', comparative: 'kleiner', superlative: 'am kleinsten', english: 'small' },
    ],
    irregulars: [
      { base: 'gut', comparative: 'besser', superlative: 'am besten', english: 'good' },
      { base: 'viel', comparative: 'mehr', superlative: 'am meisten', english: 'much' },
      { base: 'gern', comparative: 'lieber', superlative: 'am liebsten', english: 'gladly' },
    ],
  },
  {
    id: 'superlative', type: 'superlative', title: 'Superlativ', formation: 'Add -st or -est and use with "am".',
    examples: [
      { base: 'alt', comparative: 'älter', superlative: 'am ältesten', english: 'old' },
      { base: 'groß', comparative: 'größer', superlative: 'am größten', english: 'big' },
    ],
  },
];

// Helper functions
export const getGrammarByArticle = (article: 'der' | 'die' | 'das'): GrammarCategory | undefined => {
  const categoryMap = { 'der': 'der-masculine', 'die': 'die-feminine', 'das': 'das-neuter' };
  return grammarCategories.find(cat => cat.id === categoryMap[article]);
};

export const getCaseByName = (caseName: 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv'): CaseRule | undefined => {
  return caseRules.find(c => c.case === caseName);
};

export const getLessonsByLevel = (level: GrammarLevel): GrammarLesson[] => {
  return grammarSections.flatMap(section => section.lessons.filter(lesson => lesson.level === level));
};

export const getLessonsBySection = (sectionId: string): GrammarLesson[] => {
  const section = grammarSections.find(s => s.id === sectionId);
  return section?.lessons || [];
};

export const getLesson = (lessonId: string): GrammarLesson | undefined => {
  return grammarSections.flatMap(s => s.lessons).find(l => l.id === lessonId);
};
