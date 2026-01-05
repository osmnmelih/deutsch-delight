export interface ReadingText {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  topic: string;
  text: string;
  vocabulary: { german: string; english: string }[];
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export const readingTexts: ReadingText[] = [
  // A1 Level
  {
    id: 'a1-1',
    title: 'Meine Familie',
    level: 'A1',
    topic: 'Familie',
    text: `Hallo! Ich heiße Anna. Ich bin 25 Jahre alt. Ich wohne in Berlin mit meiner Familie. Meine Mutter heißt Maria und mein Vater heißt Peter. Ich habe einen Bruder. Er heißt Thomas und ist 22 Jahre alt. Wir haben auch eine Katze. Sie heißt Mimi. Meine Familie ist sehr nett. Am Wochenende essen wir zusammen Frühstück.`,
    vocabulary: [
      { german: 'die Familie', english: 'family' },
      { german: 'die Mutter', english: 'mother' },
      { german: 'der Vater', english: 'father' },
      { german: 'der Bruder', english: 'brother' },
      { german: 'die Katze', english: 'cat' },
      { german: 'zusammen', english: 'together' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Wie alt ist Anna?',
        options: ['22 Jahre', '25 Jahre', '27 Jahre', '30 Jahre'],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Ich bin 25 Jahre alt."',
      },
      {
        id: 'q2',
        question: 'Wo wohnt Anna?',
        options: ['In München', 'In Hamburg', 'In Berlin', 'In Köln'],
        correctAnswer: 2,
        explanation: 'Anna sagt: "Ich wohne in Berlin."',
      },
      {
        id: 'q3',
        question: 'Wie heißt Annas Katze?',
        options: ['Maria', 'Thomas', 'Mimi', 'Peter'],
        correctAnswer: 2,
        explanation: 'Die Katze heißt Mimi.',
      },
    ],
  },
  {
    id: 'a1-2',
    title: 'Im Supermarkt',
    level: 'A1',
    topic: 'Einkaufen',
    text: `Heute gehe ich in den Supermarkt. Ich brauche Brot, Milch und Äpfel. Der Supermarkt ist nicht weit von meinem Haus. Ich gehe zu Fuß. Im Supermarkt nehme ich einen Einkaufswagen. Das Brot kostet 2 Euro. Die Milch kostet 1,50 Euro. Die Äpfel kosten 3 Euro. Ich bezahle an der Kasse. Die Verkäuferin ist sehr freundlich.`,
    vocabulary: [
      { german: 'der Supermarkt', english: 'supermarket' },
      { german: 'das Brot', english: 'bread' },
      { german: 'die Milch', english: 'milk' },
      { german: 'der Apfel', english: 'apple' },
      { german: 'der Einkaufswagen', english: 'shopping cart' },
      { german: 'die Kasse', english: 'checkout' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was braucht die Person?',
        options: ['Brot, Käse, Milch', 'Brot, Milch, Äpfel', 'Wurst, Brot, Eier', 'Milch, Butter, Brot'],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Ich brauche Brot, Milch und Äpfel."',
      },
      {
        id: 'q2',
        question: 'Wie kommt die Person zum Supermarkt?',
        options: ['Mit dem Auto', 'Mit dem Bus', 'Zu Fuß', 'Mit dem Fahrrad'],
        correctAnswer: 2,
        explanation: 'Die Person sagt: "Ich gehe zu Fuß."',
      },
      {
        id: 'q3',
        question: 'Wie viel kostet das Brot?',
        options: ['1 Euro', '1,50 Euro', '2 Euro', '3 Euro'],
        correctAnswer: 2,
        explanation: 'Das Brot kostet 2 Euro.',
      },
    ],
  },
  {
    id: 'a1-3',
    title: 'Mein Tag',
    level: 'A1',
    topic: 'Alltag',
    text: `Ich stehe um 7 Uhr auf. Zuerst dusche ich. Dann esse ich Frühstück. Ich trinke Kaffee und esse Brot mit Marmelade. Um 8 Uhr fahre ich zur Arbeit. Ich arbeite in einem Büro. Ich arbeite von 9 bis 17 Uhr. Nach der Arbeit gehe ich einkaufen. Am Abend koche ich Abendessen. Ich sehe fern und gehe um 22 Uhr schlafen.`,
    vocabulary: [
      { german: 'aufstehen', english: 'to get up' },
      { german: 'duschen', english: 'to shower' },
      { german: 'das Frühstück', english: 'breakfast' },
      { german: 'die Arbeit', english: 'work' },
      { german: 'das Büro', english: 'office' },
      { german: 'fernsehen', english: 'to watch TV' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Wann steht die Person auf?',
        options: ['Um 6 Uhr', 'Um 7 Uhr', 'Um 8 Uhr', 'Um 9 Uhr'],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Ich stehe um 7 Uhr auf."',
      },
      {
        id: 'q2',
        question: 'Was trinkt die Person zum Frühstück?',
        options: ['Tee', 'Saft', 'Kaffee', 'Wasser'],
        correctAnswer: 2,
        explanation: 'Die Person trinkt Kaffee zum Frühstück.',
      },
      {
        id: 'q3',
        question: 'Wann geht die Person schlafen?',
        options: ['Um 21 Uhr', 'Um 22 Uhr', 'Um 23 Uhr', 'Um 24 Uhr'],
        correctAnswer: 1,
        explanation: 'Die Person geht um 22 Uhr schlafen.',
      },
    ],
  },
  // A2 Level
  {
    id: 'a2-1',
    title: 'Mein Urlaub in Italien',
    level: 'A2',
    topic: 'Reisen',
    text: `Letzten Sommer bin ich nach Italien gefahren. Ich habe zwei Wochen in Rom verbracht. Das Wetter war sehr schön und warm. Ich habe viele Sehenswürdigkeiten besucht. Das Kolosseum war beeindruckend! Ich habe auch leckeres italienisches Essen gegessen: Pizza, Pasta und Gelato. Jeden Tag bin ich durch die Altstadt spaziert. Die Menschen in Italien waren sehr freundlich. Ich habe viele Fotos gemacht. Es war ein toller Urlaub!`,
    vocabulary: [
      { german: 'der Urlaub', english: 'vacation' },
      { german: 'die Sehenswürdigkeit', english: 'sight/attraction' },
      { german: 'beeindruckend', english: 'impressive' },
      { german: 'die Altstadt', english: 'old town' },
      { german: 'spazieren', english: 'to walk/stroll' },
      { german: 'das Foto', english: 'photo' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Wie lange war die Person in Rom?',
        options: ['Eine Woche', 'Zwei Wochen', 'Drei Wochen', 'Einen Monat'],
        correctAnswer: 1,
        explanation: 'Im Text steht: "Ich habe zwei Wochen in Rom verbracht."',
      },
      {
        id: 'q2',
        question: 'Was hat die Person besucht?',
        options: ['Den Eiffelturm', 'Das Kolosseum', 'Die Sagrada Familia', 'Big Ben'],
        correctAnswer: 1,
        explanation: 'Die Person hat das Kolosseum besucht.',
      },
      {
        id: 'q3',
        question: 'Wie waren die Menschen in Italien?',
        options: ['Unhöflich', 'Kalt', 'Freundlich', 'Langweilig'],
        correctAnswer: 2,
        explanation: 'Die Menschen in Italien waren sehr freundlich.',
      },
    ],
  },
  {
    id: 'a2-2',
    title: 'Wohnungssuche',
    level: 'A2',
    topic: 'Wohnen',
    text: `Ich suche eine neue Wohnung in der Stadt. Meine alte Wohnung ist zu klein für mich. Ich möchte mindestens zwei Zimmer haben: ein Schlafzimmer und ein Wohnzimmer. Eine große Küche wäre auch schön. Ich habe schon viele Anzeigen im Internet gesehen. Die Mieten sind leider sehr hoch in der Innenstadt. Vielleicht muss ich in einem Vorort wohnen. Morgen habe ich einen Besichtigungstermin für eine schöne Wohnung mit Balkon.`,
    vocabulary: [
      { german: 'die Wohnung', english: 'apartment' },
      { german: 'das Schlafzimmer', english: 'bedroom' },
      { german: 'das Wohnzimmer', english: 'living room' },
      { german: 'die Miete', english: 'rent' },
      { german: 'der Vorort', english: 'suburb' },
      { german: 'der Besichtigungstermin', english: 'viewing appointment' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Warum sucht die Person eine neue Wohnung?',
        options: ['Sie ist zu teuer', 'Sie ist zu klein', 'Sie ist zu laut', 'Sie ist zu alt'],
        correctAnswer: 1,
        explanation: 'Die alte Wohnung ist zu klein.',
      },
      {
        id: 'q2',
        question: 'Wie viele Zimmer möchte die Person?',
        options: ['Ein Zimmer', 'Mindestens zwei Zimmer', 'Drei Zimmer', 'Vier Zimmer'],
        correctAnswer: 1,
        explanation: 'Die Person möchte mindestens zwei Zimmer haben.',
      },
      {
        id: 'q3',
        question: 'Was hat die Wohnung, die die Person morgen besichtigt?',
        options: ['Einen Garten', 'Einen Balkon', 'Eine Terrasse', 'Einen Keller'],
        correctAnswer: 1,
        explanation: 'Die Wohnung hat einen Balkon.',
      },
    ],
  },
  // B1 Level
  {
    id: 'b1-1',
    title: 'Umweltschutz im Alltag',
    level: 'B1',
    topic: 'Umwelt',
    text: `Immer mehr Menschen interessieren sich für Umweltschutz. Es gibt viele Möglichkeiten, im Alltag umweltfreundlicher zu leben. Zum Beispiel kann man weniger Plastik benutzen und stattdessen wiederverwendbare Taschen zum Einkaufen mitnehmen. Auch beim Energiesparen kann jeder etwas tun: Licht ausschalten, wenn man einen Raum verlässt, oder kürzer duschen. Viele Menschen entscheiden sich auch dafür, weniger Fleisch zu essen, weil die Fleischproduktion viel CO2 verursacht. Öffentliche Verkehrsmittel oder das Fahrrad sind besser für die Umwelt als das Auto.`,
    vocabulary: [
      { german: 'der Umweltschutz', english: 'environmental protection' },
      { german: 'umweltfreundlich', english: 'environmentally friendly' },
      { german: 'wiederverwendbar', english: 'reusable' },
      { german: 'das Energiesparen', english: 'energy saving' },
      { german: 'verursachen', english: 'to cause' },
      { german: 'öffentliche Verkehrsmittel', english: 'public transport' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was kann man statt Plastiktaschen benutzen?',
        options: ['Papiertaschen', 'Wiederverwendbare Taschen', 'Kartons', 'Keine Taschen'],
        correctAnswer: 1,
        explanation: 'Man kann wiederverwendbare Taschen zum Einkaufen mitnehmen.',
      },
      {
        id: 'q2',
        question: 'Warum essen manche Menschen weniger Fleisch?',
        options: ['Es ist zu teuer', 'Es schmeckt nicht gut', 'Die Produktion verursacht viel CO2', 'Es ist ungesund'],
        correctAnswer: 2,
        explanation: 'Die Fleischproduktion verursacht viel CO2.',
      },
      {
        id: 'q3',
        question: 'Was ist besser für die Umwelt als das Auto?',
        options: ['Das Flugzeug', 'Öffentliche Verkehrsmittel', 'Das Motorrad', 'Der LKW'],
        correctAnswer: 1,
        explanation: 'Öffentliche Verkehrsmittel oder das Fahrrad sind besser für die Umwelt.',
      },
    ],
  },
  {
    id: 'b1-2',
    title: 'Digitalisierung der Arbeitswelt',
    level: 'B1',
    topic: 'Arbeit',
    text: `Die Digitalisierung verändert unsere Arbeitswelt grundlegend. Viele Aufgaben, die früher Menschen erledigt haben, werden heute von Computern übernommen. Gleichzeitig entstehen aber auch neue Berufe, besonders im IT-Bereich. Home-Office ist seit der Corona-Pandemie viel häufiger geworden. Viele Arbeitnehmer schätzen die Flexibilität, von zu Hause arbeiten zu können. Allerdings kann es auch Nachteile geben: Der Kontakt zu Kollegen fehlt manchmal und es ist schwieriger, Arbeit und Privatleben zu trennen.`,
    vocabulary: [
      { german: 'die Digitalisierung', english: 'digitalization' },
      { german: 'grundlegend', english: 'fundamentally' },
      { german: 'die Aufgabe', english: 'task' },
      { german: 'übernehmen', english: 'to take over' },
      { german: 'die Flexibilität', english: 'flexibility' },
      { german: 'trennen', english: 'to separate' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was macht die Digitalisierung mit der Arbeitswelt?',
        options: ['Sie bleibt gleich', 'Sie verändert sie grundlegend', 'Sie macht sie einfacher', 'Sie zerstört sie'],
        correctAnswer: 1,
        explanation: 'Die Digitalisierung verändert die Arbeitswelt grundlegend.',
      },
      {
        id: 'q2',
        question: 'Was ist seit der Corona-Pandemie häufiger geworden?',
        options: ['Reisen', 'Home-Office', 'Büroarbeit', 'Fabrikarbeit'],
        correctAnswer: 1,
        explanation: 'Home-Office ist seit der Corona-Pandemie viel häufiger geworden.',
      },
      {
        id: 'q3',
        question: 'Was ist ein Nachteil von Home-Office?',
        options: ['Mehr Gehalt', 'Mehr Freizeit', 'Weniger Kontakt zu Kollegen', 'Mehr Urlaubstage'],
        correctAnswer: 2,
        explanation: 'Der Kontakt zu Kollegen fehlt manchmal.',
      },
    ],
  },
  // B2 Level
  {
    id: 'b2-1',
    title: 'Die Zukunft der Mobilität',
    level: 'B2',
    topic: 'Technologie',
    text: `Die Art und Weise, wie wir uns fortbewegen, steht vor einem fundamentalen Wandel. Elektrofahrzeuge gewinnen zunehmend an Bedeutung, während die traditionellen Verbrennungsmotoren allmählich an Relevanz verlieren. Autonomes Fahren, einst eine Science-Fiction-Fantasie, rückt immer näher an die Realität heran. Experten prognostizieren, dass selbstfahrende Autos innerhalb der nächsten Dekade zum alltäglichen Straßenbild gehören könnten. Dies hätte weitreichende Konsequenzen: weniger Unfälle durch menschliches Versagen, optimierter Verkehrsfluss und möglicherweise ein Rückgang des individuellen Autobesitzes zugunsten von Sharing-Modellen.`,
    vocabulary: [
      { german: 'der Wandel', english: 'change/transformation' },
      { german: 'der Verbrennungsmotor', english: 'combustion engine' },
      { german: 'das autonome Fahren', english: 'autonomous driving' },
      { german: 'prognostizieren', english: 'to predict/forecast' },
      { german: 'weitreichend', english: 'far-reaching' },
      { german: 'das Versagen', english: 'failure' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was passiert mit Verbrennungsmotoren laut dem Text?',
        options: ['Sie werden beliebter', 'Sie verlieren an Relevanz', 'Sie werden verboten', 'Sie werden billiger'],
        correctAnswer: 1,
        explanation: 'Traditionelle Verbrennungsmotoren verlieren allmählich an Relevanz.',
      },
      {
        id: 'q2',
        question: 'Was war autonomes Fahren früher?',
        options: ['Eine Realität', 'Eine Science-Fiction-Fantasie', 'Ein Luxus', 'Unmöglich'],
        correctAnswer: 1,
        explanation: 'Autonomes Fahren war einst eine Science-Fiction-Fantasie.',
      },
      {
        id: 'q3',
        question: 'Was könnte durch autonomes Fahren reduziert werden?',
        options: ['Autopreise', 'Unfälle durch menschliches Versagen', 'Benzinverbrauch', 'Steuern'],
        correctAnswer: 1,
        explanation: 'Es gäbe weniger Unfälle durch menschliches Versagen.',
      },
    ],
  },
  {
    id: 'b2-2',
    title: 'Kulturelle Identität in der Globalisierung',
    level: 'B2',
    topic: 'Gesellschaft',
    text: `In einer zunehmend vernetzten Welt stellt sich die Frage, wie kulturelle Identitäten bewahrt werden können. Einerseits ermöglicht die Globalisierung einen beispiellosen kulturellen Austausch: Wir können Musik aus aller Welt hören, internationale Küche genießen und mit Menschen verschiedener Kulturen kommunizieren. Andererseits befürchten Kritiker eine kulturelle Homogenisierung, bei der lokale Traditionen und Sprachen verdrängt werden. Besonders indigene Gemeinschaften kämpfen um den Erhalt ihrer kulturellen Praktiken und Sprachen. Die Herausforderung besteht darin, die Vorteile der Globalisierung zu nutzen, ohne die kulturelle Vielfalt zu opfern, die unsere Welt so bereichert.`,
    vocabulary: [
      { german: 'die Identität', english: 'identity' },
      { german: 'bewahren', english: 'to preserve' },
      { german: 'beispiellos', english: 'unprecedented' },
      { german: 'die Homogenisierung', english: 'homogenization' },
      { german: 'verdrängen', english: 'to displace' },
      { german: 'die Vielfalt', english: 'diversity' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was ermöglicht die Globalisierung laut dem Text?',
        options: ['Weniger Kommunikation', 'Kulturellen Austausch', 'Mehr Isolation', 'Weniger Reisen'],
        correctAnswer: 1,
        explanation: 'Die Globalisierung ermöglicht einen beispiellosen kulturellen Austausch.',
      },
      {
        id: 'q2',
        question: 'Was befürchten Kritiker der Globalisierung?',
        options: ['Mehr Kriege', 'Kulturelle Homogenisierung', 'Wirtschaftlichen Zusammenbruch', 'Umweltverschmutzung'],
        correctAnswer: 1,
        explanation: 'Kritiker befürchten eine kulturelle Homogenisierung.',
      },
      {
        id: 'q3',
        question: 'Worum kämpfen indigene Gemeinschaften?',
        options: ['Um Land', 'Um Geld', 'Um den Erhalt ihrer Kultur und Sprachen', 'Um politische Macht'],
        correctAnswer: 2,
        explanation: 'Indigene Gemeinschaften kämpfen um den Erhalt ihrer kulturellen Praktiken und Sprachen.',
      },
    ],
  },
  {
    id: 'b2-3',
    title: 'Psychische Gesundheit in der modernen Gesellschaft',
    level: 'B2',
    topic: 'Gesundheit',
    text: `Psychische Erkrankungen wie Depressionen und Angststörungen nehmen in der modernen Gesellschaft stetig zu. Experten führen dies auf verschiedene Faktoren zurück: den zunehmenden Leistungsdruck in Schule und Beruf, die ständige Erreichbarkeit durch digitale Medien und die Vereinsamung trotz scheinbar grenzenloser Vernetzung. Besonders junge Menschen sind betroffen, wobei soziale Medien eine ambivalente Rolle spielen: Sie können sowohl Gemeinschaft fördern als auch Gefühle der Unzulänglichkeit verstärken. Erfreulicherweise hat sich das gesellschaftliche Bewusstsein für psychische Gesundheit in den letzten Jahren verbessert, und die Stigmatisierung nimmt langsam ab.`,
    vocabulary: [
      { german: 'die psychische Gesundheit', english: 'mental health' },
      { german: 'die Angststörung', english: 'anxiety disorder' },
      { german: 'der Leistungsdruck', english: 'performance pressure' },
      { german: 'die Vereinsamung', english: 'loneliness/isolation' },
      { german: 'ambivalent', english: 'ambivalent' },
      { german: 'die Stigmatisierung', english: 'stigmatization' },
    ],
    questions: [
      {
        id: 'q1',
        question: 'Was nimmt in der modernen Gesellschaft zu?',
        options: ['Körperliche Fitness', 'Psychische Erkrankungen', 'Wirtschaftswachstum', 'Geburtenrate'],
        correctAnswer: 1,
        explanation: 'Psychische Erkrankungen wie Depressionen und Angststörungen nehmen stetig zu.',
      },
      {
        id: 'q2',
        question: 'Welche Rolle spielen soziale Medien laut dem Text?',
        options: ['Nur positiv', 'Nur negativ', 'Ambivalent', 'Keine Rolle'],
        correctAnswer: 2,
        explanation: 'Soziale Medien spielen eine ambivalente Rolle.',
      },
      {
        id: 'q3',
        question: 'Was passiert mit der Stigmatisierung psychischer Erkrankungen?',
        options: ['Sie nimmt zu', 'Sie nimmt langsam ab', 'Sie bleibt gleich', 'Sie ist verschwunden'],
        correctAnswer: 1,
        explanation: 'Die Stigmatisierung nimmt langsam ab.',
      },
    ],
  },
];

export const getTextsByLevel = (level: 'A1' | 'A2' | 'B1' | 'B2'): ReadingText[] => {
  return readingTexts.filter(text => text.level === level);
};

export const getTextsByTopic = (topic: string): ReadingText[] => {
  return readingTexts.filter(text => text.topic === topic);
};
