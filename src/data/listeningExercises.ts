export interface ListeningExercise {
  id: string;
  germanText: string;
  englishTranslation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'greeting' | 'shopping' | 'directions' | 'restaurant' | 'daily' | 'conversation';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export const listeningExercises: ListeningExercise[] = [
  // Greetings
  {
    id: 'l1',
    germanText: 'Guten Morgen! Wie geht es Ihnen heute?',
    englishTranslation: 'Good morning! How are you today?',
    difficulty: 'beginner',
    category: 'greeting',
    questions: [
      {
        question: 'Welche Tageszeit ist es?',
        options: ['Morgen', 'Nachmittag', 'Abend', 'Nacht'],
        correctAnswer: 0
      },
      {
        question: 'Was wird gefragt?',
        options: ['Ihr Name', 'Wie es Ihnen geht', 'Wo Sie wohnen', 'Ihr Alter'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l2',
    germanText: 'Hallo! Ich heiße Maria. Ich komme aus Deutschland.',
    englishTranslation: 'Hello! My name is Maria. I come from Germany.',
    difficulty: 'beginner',
    category: 'greeting',
    questions: [
      {
        question: 'Wie heißt die Sprecherin?',
        options: ['Anna', 'Maria', 'Lisa', 'Sarah'],
        correctAnswer: 1
      },
      {
        question: 'Woher kommt die Sprecherin?',
        options: ['Österreich', 'Schweiz', 'Deutschland', 'Frankreich'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l3',
    germanText: 'Guten Abend! Schön, Sie kennenzulernen.',
    englishTranslation: 'Good evening! Nice to meet you.',
    difficulty: 'beginner',
    category: 'greeting',
    questions: [
      {
        question: 'Welche Begrüßung wird verwendet?',
        options: ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'],
        correctAnswer: 2
      }
    ]
  },
  
  // Shopping
  {
    id: 'l4',
    germanText: 'Entschuldigung, was kostet dieses Buch? Es kostet zehn Euro.',
    englishTranslation: 'Excuse me, how much does this book cost? It costs ten euros.',
    difficulty: 'beginner',
    category: 'shopping',
    questions: [
      {
        question: 'Nach welchem Artikel wird gefragt?',
        options: ['Ein Stift', 'Ein Buch', 'Eine Tasche', 'Ein Hemd'],
        correctAnswer: 1
      },
      {
        question: 'Wie viel kostet es?',
        options: ['5 Euro', '10 Euro', '15 Euro', '20 Euro'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l5',
    germanText: 'Ich möchte zwei Äpfel und drei Bananen kaufen, bitte.',
    englishTranslation: 'I would like to buy two apples and three bananas, please.',
    difficulty: 'beginner',
    category: 'shopping',
    questions: [
      {
        question: 'Wie viele Äpfel möchte der Sprecher?',
        options: ['Einen', 'Zwei', 'Drei', 'Vier'],
        correctAnswer: 1
      },
      {
        question: 'Welche Früchte werden genannt?',
        options: ['Orangen und Äpfel', 'Äpfel und Bananen', 'Bananen und Orangen', 'Trauben und Äpfel'],
        correctAnswer: 1
      }
    ]
  },
  
  // Directions
  {
    id: 'l6',
    germanText: 'Wo ist der Bahnhof? Gehen Sie geradeaus und dann links.',
    englishTranslation: 'Where is the train station? Go straight and then left.',
    difficulty: 'intermediate',
    category: 'directions',
    questions: [
      {
        question: 'Nach welchem Ort wird gefragt?',
        options: ['Flughafen', 'Bahnhof', 'Bushaltestelle', 'Hotel'],
        correctAnswer: 1
      },
      {
        question: 'In welche Richtung soll man abbiegen?',
        options: ['Rechts', 'Links', 'Zurück', 'Nur geradeaus'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l7',
    germanText: 'Das Museum ist neben der Bibliothek, gegenüber dem Park.',
    englishTranslation: 'The museum is next to the library, opposite the park.',
    difficulty: 'intermediate',
    category: 'directions',
    questions: [
      {
        question: 'Was ist neben der Bibliothek?',
        options: ['Der Park', 'Das Museum', 'Die Schule', 'Der Bahnhof'],
        correctAnswer: 1
      },
      {
        question: 'Was liegt gegenüber dem Park?',
        options: ['Die Bibliothek', 'Die Schule', 'Das Museum', 'Das Hotel'],
        correctAnswer: 2
      }
    ]
  },
  
  // Restaurant
  {
    id: 'l8',
    germanText: 'Ich hätte gern eine Tasse Kaffee und ein Stück Kuchen, bitte.',
    englishTranslation: 'I would like a cup of coffee and a piece of cake, please.',
    difficulty: 'beginner',
    category: 'restaurant',
    questions: [
      {
        question: 'Welches Getränk wird bestellt?',
        options: ['Tee', 'Kaffee', 'Saft', 'Wasser'],
        correctAnswer: 1
      },
      {
        question: 'Welches Essen wird bestellt?',
        options: ['Brot', 'Kekse', 'Kuchen', 'Eis'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l9',
    germanText: 'Die Rechnung, bitte. Das macht fünfzehn Euro fünfzig.',
    englishTranslation: 'The bill, please. That will be fifteen euros fifty.',
    difficulty: 'intermediate',
    category: 'restaurant',
    questions: [
      {
        question: 'Was wird verlangt?',
        options: ['Die Speisekarte', 'Die Rechnung', 'Mehr Essen', 'Einen Tisch'],
        correctAnswer: 1
      },
      {
        question: 'Wie viel beträgt der Gesamtpreis?',
        options: ['15,00 €', '15,50 €', '50,15 €', '5,50 €'],
        correctAnswer: 1
      }
    ]
  },
  
  // Daily activities
  {
    id: 'l10',
    germanText: 'Ich stehe um sieben Uhr auf und frühstücke um halb acht.',
    englishTranslation: 'I get up at seven o\'clock and have breakfast at half past seven.',
    difficulty: 'intermediate',
    category: 'daily',
    questions: [
      {
        question: 'Um wie viel Uhr steht der Sprecher auf?',
        options: ['6:00 Uhr', '7:00 Uhr', '7:30 Uhr', '8:00 Uhr'],
        correctAnswer: 1
      },
      {
        question: 'Wann ist das Frühstück?',
        options: ['7:00 Uhr', '7:30 Uhr', '8:00 Uhr', '8:30 Uhr'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l11',
    germanText: 'Am Wochenende gehe ich gern ins Kino oder lese ein Buch.',
    englishTranslation: 'On the weekend I like to go to the cinema or read a book.',
    difficulty: 'intermediate',
    category: 'daily',
    questions: [
      {
        question: 'Wann findet diese Aktivität statt?',
        options: ['Wochentage', 'Montag', 'Wochenende', 'Jeden Tag'],
        correctAnswer: 2
      },
      {
        question: 'Welche Aktivitäten werden genannt?',
        options: ['Schwimmen und Lesen', 'Kino und Lesen', 'Kino und Kochen', 'Sport und Kino'],
        correctAnswer: 1
      }
    ]
  },
  
  // Conversations
  {
    id: 'l12',
    germanText: 'Kannst du mir helfen? Natürlich, was brauchst du?',
    englishTranslation: 'Can you help me? Of course, what do you need?',
    difficulty: 'intermediate',
    category: 'conversation',
    questions: [
      {
        question: 'Was fragt der erste Sprecher?',
        options: ['Die Zeit', 'Um Hilfe', 'Nach dem Weg', 'Um Geld'],
        correctAnswer: 1
      },
      {
        question: 'Was ist die Antwort?',
        options: ['Nein', 'Vielleicht später', 'Ja, was brauchst du?', 'Ich weiß nicht'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l13',
    germanText: 'Das Wetter ist heute sehr schön. Ja, die Sonne scheint und es ist warm.',
    englishTranslation: 'The weather is very nice today. Yes, the sun is shining and it is warm.',
    difficulty: 'intermediate',
    category: 'conversation',
    questions: [
      {
        question: 'Wie ist das Wetter?',
        options: ['Regnerisch', 'Kalt', 'Schön und sonnig', 'Bewölkt'],
        correctAnswer: 2
      },
      {
        question: 'Was wird über die Temperatur gesagt?',
        options: ['Es ist kalt', 'Es ist warm', 'Es friert', 'Es ist kühl'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l14',
    germanText: 'Wie spät ist es? Es ist Viertel nach drei.',
    englishTranslation: 'What time is it? It is quarter past three.',
    difficulty: 'beginner',
    category: 'conversation',
    questions: [
      {
        question: 'Was wird gefragt?',
        options: ['Das Datum', 'Die Uhrzeit', 'Das Wetter', 'Der Preis'],
        correctAnswer: 1
      },
      {
        question: 'Wie spät ist es?',
        options: ['3:00 Uhr', '3:15 Uhr', '3:30 Uhr', '3:45 Uhr'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l15',
    germanText: 'Ich habe morgen einen wichtigen Termin beim Arzt um neun Uhr.',
    englishTranslation: 'I have an important appointment at the doctor tomorrow at nine o\'clock.',
    difficulty: 'advanced',
    category: 'daily',
    questions: [
      {
        question: 'Wann ist der Termin?',
        options: ['Heute', 'Morgen', 'Nächste Woche', 'Gestern'],
        correctAnswer: 1
      },
      {
        question: 'Wo ist der Termin?',
        options: ['Beim Zahnarzt', 'Beim Arzt', 'Bei der Bank', 'Im Büro'],
        correctAnswer: 1
      },
      {
        question: 'Um wie viel Uhr ist der Termin?',
        options: ['8:00 Uhr', '9:00 Uhr', '10:00 Uhr', '11:00 Uhr'],
        correctAnswer: 1
      }
    ]
  }
];

export const getExercisesByCategory = (category: string): ListeningExercise[] => {
  return listeningExercises.filter(e => e.category === category);
};

export const getExercisesByDifficulty = (difficulty: string): ListeningExercise[] => {
  return listeningExercises.filter(e => e.difficulty === difficulty);
};

// Dictation Exercise Types and Data
export interface ListeningDictation {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  german: string;
  english: string;
  audioSpeed: 'slow' | 'normal' | 'fast';
  hints: string[];
  keyWords: string[];
}

export const listeningDictations: ListeningDictation[] = [
  // A1 Level
  { id: 'a1-1', level: 'A1', german: 'Ich heiße Maria.', english: 'My name is Maria.', audioSpeed: 'slow', hints: ['Beginnt mit "Ich"', 'Häufige Begrüßungsphrase'], keyWords: ['heiße'] },
  { id: 'a1-2', level: 'A1', german: 'Das Wetter ist schön.', english: 'The weather is nice.', audioSpeed: 'slow', hints: ['Neutraler Artikel "Das"', 'Wetter-Vokabular'], keyWords: ['Wetter', 'schön'] },
  { id: 'a1-3', level: 'A1', german: 'Ich trinke gern Kaffee.', english: 'I like to drink coffee.', audioSpeed: 'slow', hints: ['"gern" drückt Vorliebe aus', 'Häufiges Verb "trinken"'], keyWords: ['trinke', 'gern', 'Kaffee'] },
  { id: 'a1-4', level: 'A1', german: 'Wo ist die Toilette?', english: 'Where is the toilet?', audioSpeed: 'slow', hints: ['Fragewort "Wo"', 'Femininer Artikel "die"'], keyWords: ['Wo', 'Toilette'] },
  { id: 'a1-5', level: 'A1', german: 'Ich komme aus Deutschland.', english: 'I come from Germany.', audioSpeed: 'slow', hints: ['Herkunftsphrase mit "aus"'], keyWords: ['komme', 'aus', 'Deutschland'] },
  { id: 'a1-6', level: 'A1', german: 'Heute ist Montag.', english: 'Today is Monday.', audioSpeed: 'slow', hints: ['Zeitausdruck "Heute"'], keyWords: ['Heute', 'Montag'] },
  { id: 'a1-7', level: 'A1', german: 'Ich habe einen Hund.', english: 'I have a dog.', audioSpeed: 'slow', hints: ['Akkusativ-Artikel "einen"'], keyWords: ['habe', 'einen', 'Hund'] },
  { id: 'a1-8', level: 'A1', german: 'Das Buch ist interessant.', english: 'The book is interesting.', audioSpeed: 'slow', hints: ['Neutraler Artikel "Das"'], keyWords: ['Buch', 'interessant'] },
  // A2 Level
  { id: 'a2-1', level: 'A2', german: 'Ich gehe morgen ins Kino.', english: 'I am going to the cinema tomorrow.', audioSpeed: 'normal', hints: ['Zeitwort "morgen" vor Ort', '"ins" = in das'], keyWords: ['morgen', 'ins', 'Kino'] },
  { id: 'a2-2', level: 'A2', german: 'Sie hat gestern einen Brief geschrieben.', english: 'She wrote a letter yesterday.', audioSpeed: 'normal', hints: ['Perfekt mit "haben"', 'Partizip am Ende'], keyWords: ['gestern', 'Brief', 'geschrieben'] },
  { id: 'a2-3', level: 'A2', german: 'Wir müssen früh aufstehen.', english: 'We have to get up early.', audioSpeed: 'normal', hints: ['Modalverb "müssen"', 'Trennbares Verb "aufstehen"'], keyWords: ['müssen', 'früh', 'aufstehen'] },
  { id: 'a2-4', level: 'A2', german: 'Der Zug fährt um acht Uhr ab.', english: 'The train departs at eight o\'clock.', audioSpeed: 'normal', hints: ['Trennbares Verb "abfahren"', 'Zeitausdruck mit "um"'], keyWords: ['Zug', 'fährt', 'acht', 'ab'] },
  { id: 'a2-5', level: 'A2', german: 'Kannst du mir bitte helfen?', english: 'Can you please help me?', audioSpeed: 'normal', hints: ['Modalverb "können"', 'Dativ-Pronomen "mir"'], keyWords: ['Kannst', 'mir', 'helfen'] },
  { id: 'a2-6', level: 'A2', german: 'Ich habe Hunger und Durst.', english: 'I am hungry and thirsty.', audioSpeed: 'normal', hints: ['Zusammengesetzter Satz mit "und"'], keyWords: ['Hunger', 'und', 'Durst'] },
  // B1 Level
  { id: 'b1-1', level: 'B1', german: 'Obwohl es regnet, gehen wir spazieren.', english: 'Although it is raining, we are going for a walk.', audioSpeed: 'normal', hints: ['Nebensatz mit "obwohl"', 'Verb am Ende des ersten Satzes'], keyWords: ['Obwohl', 'regnet', 'spazieren'] },
  { id: 'b1-2', level: 'B1', german: 'Ich würde gern nach Berlin fahren.', english: 'I would like to go to Berlin.', audioSpeed: 'normal', hints: ['Konjunktiv "würde"', 'Ziel mit "nach"'], keyWords: ['würde', 'gern', 'Berlin', 'fahren'] },
  { id: 'b1-3', level: 'B1', german: 'Als ich jung war, spielte ich Fußball.', english: 'When I was young, I played soccer.', audioSpeed: 'normal', hints: ['Temporalsatz mit "als"', 'Präteritum "spielte"'], keyWords: ['Als', 'jung', 'spielte', 'Fußball'] },
  { id: 'b1-4', level: 'B1', german: 'Er hat mich gefragt, ob ich morgen Zeit habe.', english: 'He asked me if I have time tomorrow.', audioSpeed: 'normal', hints: ['Indirekte Frage mit "ob"'], keyWords: ['gefragt', 'ob', 'morgen', 'Zeit'] },
  { id: 'b1-5', level: 'B1', german: 'Nachdem ich gegessen hatte, bin ich spazieren gegangen.', english: 'After I had eaten, I went for a walk.', audioSpeed: 'normal', hints: ['Plusquamperfekt im ersten Satz', 'Perfekt im Hauptsatz'], keyWords: ['Nachdem', 'gegessen', 'spazieren', 'gegangen'] },
  // B2 Level
  { id: 'b2-1', level: 'B2', german: 'Hätte ich das gewusst, wäre ich früher gekommen.', english: 'Had I known that, I would have come earlier.', audioSpeed: 'fast', hints: ['Konjunktiv II Konditionalsatz', 'Vergangene Konditionalstruktur'], keyWords: ['Hätte', 'gewusst', 'wäre', 'gekommen'] },
  { id: 'b2-2', level: 'B2', german: 'Je mehr ich lerne, desto besser verstehe ich die Grammatik.', english: 'The more I learn, the better I understand the grammar.', audioSpeed: 'fast', hints: ['Vergleichskonstruktion "je...desto"'], keyWords: ['Je', 'desto', 'besser', 'Grammatik'] },
  { id: 'b2-3', level: 'B2', german: 'Die Firma, bei der ich arbeite, expandiert nach Asien.', english: 'The company where I work is expanding to Asia.', audioSpeed: 'fast', hints: ['Relativsatz mit Präposition'], keyWords: ['Firma', 'bei der', 'expandiert', 'Asien'] },
  { id: 'b2-4', level: 'B2', german: 'Anstatt zu Hause zu bleiben, sind wir ins Museum gegangen.', english: 'Instead of staying at home, we went to the museum.', audioSpeed: 'fast', hints: ['Infinitivsatz mit "anstatt...zu"'], keyWords: ['Anstatt', 'bleiben', 'Museum', 'gegangen'] },
];

export const getLevelDictations = (level: 'A1' | 'A2' | 'B1' | 'B2'): ListeningDictation[] => {
  return listeningDictations.filter(d => d.level === level);
};
