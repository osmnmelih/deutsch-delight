export interface WritingPrompt {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  category: 'email' | 'description' | 'opinion' | 'story' | 'formal';
  prompt: string;
  hints: string[];
  vocabularySuggestions: { german: string; english: string }[];
  grammarTips: string[];
  exampleSentences: string[];
  wordCountTarget: { min: number; max: number };
}

export const writingPrompts: WritingPrompt[] = [
  // A1 Level
  {
    id: 'a1-1',
    title: 'Sich vorstellen',
    level: 'A1',
    category: 'description',
    prompt: 'Stellen Sie sich vor. Schreiben Sie über sich selbst: Name, Alter, Wohnort, Familie, Hobbys.',
    hints: [
      'Beginnen Sie mit "Hallo, ich heiße..."',
      'Verwenden Sie einfache Sätze',
      'Schreiben Sie über 3-4 verschiedene Themen',
    ],
    vocabularySuggestions: [
      { german: 'heißen', english: 'to be called' },
      { german: 'wohnen', english: 'to live' },
      { german: 'kommen aus', english: 'to come from' },
      { german: 'das Hobby', english: 'hobby' },
      { german: 'gern', english: 'gladly/like to' },
      { german: 'arbeiten', english: 'to work' },
    ],
    grammarTips: [
      'Verb auf Position 2: "Ich wohne in Berlin."',
      'Benutzen Sie "gern" für Hobbys: "Ich lese gern."',
      'Zahlen: eins, zwei, drei... für das Alter',
    ],
    exampleSentences: [
      'Ich heiße Maria und bin 25 Jahre alt.',
      'Ich komme aus Deutschland.',
      'Meine Hobbys sind Lesen und Schwimmen.',
    ],
    wordCountTarget: { min: 30, max: 60 },
  },
  {
    id: 'a1-2',
    title: 'Mein Tagesablauf',
    level: 'A1',
    category: 'description',
    prompt: 'Beschreiben Sie einen typischen Tag in Ihrem Leben. Was machen Sie morgens, mittags und abends?',
    hints: [
      'Benutzen Sie Zeitangaben: um 7 Uhr, am Morgen, etc.',
      'Beschreiben Sie die Reihenfolge mit: zuerst, dann, danach',
      'Schreiben Sie mindestens 5 Aktivitäten',
    ],
    vocabularySuggestions: [
      { german: 'aufstehen', english: 'to get up' },
      { german: 'frühstücken', english: 'to have breakfast' },
      { german: 'arbeiten', english: 'to work' },
      { german: 'zu Mittag essen', english: 'to have lunch' },
      { german: 'schlafen gehen', english: 'to go to sleep' },
      { german: 'fernsehen', english: 'to watch TV' },
    ],
    grammarTips: [
      'Trennbare Verben: "Ich stehe um 7 Uhr auf."',
      'Zeitangaben am Anfang: "Um 8 Uhr frühstücke ich."',
      'Verbposition bei Zeitangabe am Anfang: Verb auf Position 2',
    ],
    exampleSentences: [
      'Um 7 Uhr stehe ich auf.',
      'Zuerst dusche ich, dann frühstücke ich.',
      'Am Abend sehe ich gern fern.',
    ],
    wordCountTarget: { min: 40, max: 80 },
  },
  // A2 Level
  {
    id: 'a2-1',
    title: 'Ein besonderer Tag',
    level: 'A2',
    category: 'story',
    prompt: 'Erzählen Sie von einem besonderen Tag in Ihrem Leben (Geburtstag, Hochzeit, Reise, etc.). Was ist passiert?',
    hints: [
      'Benutzen Sie das Perfekt für die Vergangenheit',
      'Beschreiben Sie Ihre Gefühle',
      'Erzählen Sie, wer dabei war',
    ],
    vocabularySuggestions: [
      { german: 'feiern', english: 'to celebrate' },
      { german: 'sich freuen', english: 'to be happy' },
      { german: 'überraschen', english: 'to surprise' },
      { german: 'unvergesslich', english: 'unforgettable' },
      { german: 'zusammen', english: 'together' },
      { german: 'erleben', english: 'to experience' },
    ],
    grammarTips: [
      'Perfekt mit haben: "Ich habe gefeiert."',
      'Perfekt mit sein: "Ich bin gefahren."',
      'Adjektive: "Es war ein schöner Tag."',
    ],
    exampleSentences: [
      'Letztes Jahr habe ich meinen Geburtstag gefeiert.',
      'Meine Familie hat mich überrascht.',
      'Es war ein unvergesslicher Tag.',
    ],
    wordCountTarget: { min: 60, max: 100 },
  },
  {
    id: 'a2-2',
    title: 'Eine E-Mail an einen Freund',
    level: 'A2',
    category: 'email',
    prompt: 'Schreiben Sie eine E-Mail an einen Freund. Erzählen Sie von Ihrem Wochenende und fragen Sie nach seinem/ihrem Wochenende.',
    hints: [
      'Beginnen Sie mit einer Begrüßung: "Liebe/Lieber..."',
      'Stellen Sie Fragen: "Wie war dein Wochenende?"',
      'Beenden Sie mit einer Verabschiedung',
    ],
    vocabularySuggestions: [
      { german: 'das Wochenende', english: 'weekend' },
      { german: 'sich treffen', english: 'to meet' },
      { german: 'Spaß haben', english: 'to have fun' },
      { german: 'langweilig', english: 'boring' },
      { german: 'spannend', english: 'exciting' },
      { german: 'bald', english: 'soon' },
    ],
    grammarTips: [
      'Du-Form für Freunde: "Wie geht es dir?"',
      'Perfekt für vergangene Ereignisse',
      'Fragen: "Hast du...?", "Bist du...?"',
    ],
    exampleSentences: [
      'Lieber Max, wie geht es dir?',
      'Am Samstag bin ich ins Kino gegangen.',
      'Ich hoffe, wir sehen uns bald! Liebe Grüße',
    ],
    wordCountTarget: { min: 50, max: 100 },
  },
  // B1 Level
  {
    id: 'b1-1',
    title: 'Meinung: Soziale Medien',
    level: 'B1',
    category: 'opinion',
    prompt: 'Schreiben Sie Ihre Meinung zum Thema "Soziale Medien - Fluch oder Segen?". Nennen Sie Vor- und Nachteile.',
    hints: [
      'Gliedern Sie: Einleitung, Vorteile, Nachteile, Fazit',
      'Benutzen Sie Konnektoren: einerseits, andererseits, außerdem',
      'Geben Sie Beispiele für Ihre Argumente',
    ],
    vocabularySuggestions: [
      { german: 'der Vorteil', english: 'advantage' },
      { german: 'der Nachteil', english: 'disadvantage' },
      { german: 'die Kommunikation', english: 'communication' },
      { german: 'die Privatsphäre', english: 'privacy' },
      { german: 'vernetzen', english: 'to connect' },
      { german: 'abhängig', english: 'dependent/addicted' },
    ],
    grammarTips: [
      'Konjunktiv II für Höflichkeit: "Ich würde sagen..."',
      'Nebensätze mit "weil": "..., weil man Freunde finden kann."',
      'Passiv: "Daten werden gesammelt."',
    ],
    exampleSentences: [
      'Meiner Meinung nach haben soziale Medien Vor- und Nachteile.',
      'Einerseits kann man mit Freunden in Kontakt bleiben.',
      'Andererseits gibt es Probleme mit der Privatsphäre.',
    ],
    wordCountTarget: { min: 100, max: 150 },
  },
  {
    id: 'b1-2',
    title: 'Beschwerde im Restaurant',
    level: 'B1',
    category: 'formal',
    prompt: 'Schreiben Sie eine formelle Beschwerde-E-Mail an ein Restaurant. Das Essen war kalt und der Service war schlecht.',
    hints: [
      'Benutzen Sie die Sie-Form',
      'Beschreiben Sie das Problem sachlich',
      'Fordern Sie eine Lösung oder Entschädigung',
    ],
    vocabularySuggestions: [
      { german: 'sich beschweren', english: 'to complain' },
      { german: 'enttäuscht', english: 'disappointed' },
      { german: 'die Entschädigung', english: 'compensation' },
      { german: 'unzufrieden', english: 'dissatisfied' },
      { german: 'erwarten', english: 'to expect' },
      { german: 'die Qualität', english: 'quality' },
    ],
    grammarTips: [
      'Konjunktiv II: "Ich hätte erwartet...", "Es wäre schön..."',
      'Passiv: "Das Essen wurde kalt serviert."',
      'Formelle Anrede: "Sehr geehrte Damen und Herren"',
    ],
    exampleSentences: [
      'Sehr geehrte Damen und Herren,',
      'ich möchte mich über meinen Besuch am 15. Januar beschweren.',
      'Ich erwarte eine angemessene Entschädigung.',
    ],
    wordCountTarget: { min: 80, max: 130 },
  },
  // B2 Level
  {
    id: 'b2-1',
    title: 'Essay: Klimawandel',
    level: 'B2',
    category: 'opinion',
    prompt: 'Schreiben Sie einen Essay zum Thema "Was kann der Einzelne gegen den Klimawandel tun?". Diskutieren Sie verschiedene Maßnahmen und deren Wirksamkeit.',
    hints: [
      'Strukturieren Sie klar: Einleitung, Hauptteil mit Argumenten, Schluss',
      'Verwenden Sie komplexe Satzstrukturen',
      'Beziehen Sie Gegenargumente ein',
    ],
    vocabularySuggestions: [
      { german: 'der Klimawandel', english: 'climate change' },
      { german: 'der CO2-Ausstoß', english: 'CO2 emissions' },
      { german: 'nachhaltig', english: 'sustainable' },
      { german: 'die Maßnahme', english: 'measure' },
      { german: 'der Verbrauch', english: 'consumption' },
      { german: 'verantwortlich', english: 'responsible' },
    ],
    grammarTips: [
      'Relativsätze: "Maßnahmen, die wirksam sind..."',
      'Passiv-Varianten: "Es muss gehandelt werden."',
      'Konzessivsätze: "Obwohl..., dennoch..."',
    ],
    exampleSentences: [
      'Der Klimawandel stellt eine der größten Herausforderungen unserer Zeit dar.',
      'Obwohl individuelle Maßnahmen begrenzt wirken, sind sie dennoch wichtig.',
      'Zusammenfassend lässt sich sagen, dass jeder einen Beitrag leisten kann.',
    ],
    wordCountTarget: { min: 150, max: 250 },
  },
  {
    id: 'b2-2',
    title: 'Bewerbungsschreiben',
    level: 'B2',
    category: 'formal',
    prompt: 'Schreiben Sie ein Bewerbungsschreiben für ein Praktikum bei einer deutschen Firma. Stellen Sie Ihre Qualifikationen und Motivation dar.',
    hints: [
      'Folgen Sie dem deutschen Bewerbungsformat',
      'Betonen Sie relevante Erfahrungen und Fähigkeiten',
      'Zeigen Sie Ihre Motivation für die Stelle',
    ],
    vocabularySuggestions: [
      { german: 'die Bewerbung', english: 'application' },
      { german: 'die Qualifikation', english: 'qualification' },
      { german: 'die Erfahrung', english: 'experience' },
      { german: 'bewerben (sich)', english: 'to apply' },
      { german: 'der Lebenslauf', english: 'CV/resume' },
      { german: 'geeignet', english: 'suitable' },
    ],
    grammarTips: [
      'Konjunktiv II für Höflichkeit: "Ich würde mich freuen..."',
      'Nominalstil: "Aufgrund meiner Erfahrung..."',
      'Partizipien: "Die gesammelten Erfahrungen..."',
    ],
    exampleSentences: [
      'mit großem Interesse habe ich Ihre Stellenanzeige gelesen.',
      'Aufgrund meiner Erfahrung bin ich für diese Position geeignet.',
      'Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.',
    ],
    wordCountTarget: { min: 150, max: 250 },
  },
];

export interface GrammarCorrection {
  type: 'grammar' | 'spelling' | 'style' | 'vocabulary';
  original: string;
  suggestion: string;
  explanation: string;
}

export interface WritingFeedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  corrections: GrammarCorrection[];
}

// Common German writing mistakes and corrections
export const commonMistakes: { pattern: RegExp; correction: string; explanation: string }[] = [
  { pattern: /\bIch bin \d+ jahr alt\b/i, correction: 'Ich bin X Jahre alt', explanation: 'Jahre (plural) für Alter' },
  { pattern: /\bich\b(?![\s,])/g, correction: 'Ich', explanation: 'Satzanfang mit Großbuchstaben' },
  { pattern: /\bweil .+ verb$/i, correction: 'weil + Verb am Ende', explanation: 'Im Nebensatz steht das Verb am Ende' },
  { pattern: /\bhat ge[a-z]+t\b/i, correction: 'Partizip II prüfen', explanation: 'Achten Sie auf die Partizip-II-Form' },
];

export const getPromptsByLevel = (level: 'A1' | 'A2' | 'B1' | 'B2'): WritingPrompt[] => {
  return writingPrompts.filter(prompt => prompt.level === level);
};

export const getPromptsByCategory = (category: WritingPrompt['category']): WritingPrompt[] => {
  return writingPrompts.filter(prompt => prompt.category === category);
};
