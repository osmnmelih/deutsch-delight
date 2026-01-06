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
        question: 'What time of day is it?',
        options: ['Morning', 'Afternoon', 'Evening', 'Night'],
        correctAnswer: 0
      },
      {
        question: 'What is being asked?',
        options: ['Your name', 'How you are', 'Where you live', 'Your age'],
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
        question: 'What is the speaker\'s name?',
        options: ['Anna', 'Maria', 'Lisa', 'Sarah'],
        correctAnswer: 1
      },
      {
        question: 'Where is the speaker from?',
        options: ['Austria', 'Switzerland', 'Germany', 'France'],
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
        question: 'What greeting is used?',
        options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
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
        question: 'What item is being asked about?',
        options: ['A pen', 'A book', 'A bag', 'A shirt'],
        correctAnswer: 1
      },
      {
        question: 'How much does it cost?',
        options: ['5 euros', '10 euros', '15 euros', '20 euros'],
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
        question: 'How many apples does the speaker want?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 1
      },
      {
        question: 'What fruits are mentioned?',
        options: ['Oranges and apples', 'Apples and bananas', 'Bananas and oranges', 'Grapes and apples'],
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
        question: 'What place is being asked about?',
        options: ['Airport', 'Train station', 'Bus stop', 'Hotel'],
        correctAnswer: 1
      },
      {
        question: 'What direction should you turn?',
        options: ['Right', 'Left', 'Back', 'Straight only'],
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
        question: 'What is next to the library?',
        options: ['The park', 'The museum', 'The school', 'The station'],
        correctAnswer: 1
      },
      {
        question: 'What is opposite the park?',
        options: ['The library', 'The school', 'The museum', 'The hotel'],
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
        question: 'What drink is ordered?',
        options: ['Tea', 'Coffee', 'Juice', 'Water'],
        correctAnswer: 1
      },
      {
        question: 'What food is ordered?',
        options: ['Bread', 'Cookie', 'Cake', 'Ice cream'],
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
        question: 'What is being requested?',
        options: ['The menu', 'The bill', 'More food', 'A table'],
        correctAnswer: 1
      },
      {
        question: 'What is the total amount?',
        options: ['€15.00', '€15.50', '€50.15', '€5.50'],
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
        question: 'What time does the speaker wake up?',
        options: ['6:00', '7:00', '7:30', '8:00'],
        correctAnswer: 1
      },
      {
        question: 'What time is breakfast?',
        options: ['7:00', '7:30', '8:00', '8:30'],
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
        question: 'When does this activity happen?',
        options: ['Weekdays', 'Monday', 'Weekend', 'Every day'],
        correctAnswer: 2
      },
      {
        question: 'What activities are mentioned?',
        options: ['Swimming and reading', 'Cinema and reading', 'Cinema and cooking', 'Sports and cinema'],
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
        question: 'What is the first speaker asking for?',
        options: ['Time', 'Help', 'Directions', 'Money'],
        correctAnswer: 1
      },
      {
        question: 'What is the response?',
        options: ['No', 'Maybe later', 'Yes, what do you need?', 'I don\'t know'],
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
        question: 'What is the weather like?',
        options: ['Rainy', 'Cold', 'Nice and sunny', 'Cloudy'],
        correctAnswer: 2
      },
      {
        question: 'What is mentioned about the temperature?',
        options: ['It\'s cold', 'It\'s warm', 'It\'s freezing', 'It\'s cool'],
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
        question: 'What is being asked?',
        options: ['The date', 'The time', 'The weather', 'The price'],
        correctAnswer: 1
      },
      {
        question: 'What time is it?',
        options: ['3:00', '3:15', '3:30', '3:45'],
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
        question: 'When is the appointment?',
        options: ['Today', 'Tomorrow', 'Next week', 'Yesterday'],
        correctAnswer: 1
      },
      {
        question: 'Where is the appointment?',
        options: ['At the dentist', 'At the doctor', 'At the bank', 'At the office'],
        correctAnswer: 1
      },
      {
        question: 'What time is the appointment?',
        options: ['8:00', '9:00', '10:00', '11:00'],
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
  { id: 'a1-1', level: 'A1', german: 'Ich heiße Maria.', english: 'My name is Maria.', audioSpeed: 'slow', hints: ['Start with "Ich"', 'Common greeting phrase'], keyWords: ['heiße'] },
  { id: 'a1-2', level: 'A1', german: 'Das Wetter ist schön.', english: 'The weather is nice.', audioSpeed: 'slow', hints: ['Neutral article "Das"', 'Weather vocabulary'], keyWords: ['Wetter', 'schön'] },
  { id: 'a1-3', level: 'A1', german: 'Ich trinke gern Kaffee.', english: 'I like to drink coffee.', audioSpeed: 'slow', hints: ['"gern" expresses preference', 'Common verb "trinken"'], keyWords: ['trinke', 'gern', 'Kaffee'] },
  { id: 'a1-4', level: 'A1', german: 'Wo ist die Toilette?', english: 'Where is the toilet?', audioSpeed: 'slow', hints: ['Question word "Wo"', 'Feminine article "die"'], keyWords: ['Wo', 'Toilette'] },
  { id: 'a1-5', level: 'A1', german: 'Ich komme aus Deutschland.', english: 'I come from Germany.', audioSpeed: 'slow', hints: ['Origin phrase with "aus"'], keyWords: ['komme', 'aus', 'Deutschland'] },
  { id: 'a1-6', level: 'A1', german: 'Heute ist Montag.', english: 'Today is Monday.', audioSpeed: 'slow', hints: ['Time expression "Heute"'], keyWords: ['Heute', 'Montag'] },
  { id: 'a1-7', level: 'A1', german: 'Ich habe einen Hund.', english: 'I have a dog.', audioSpeed: 'slow', hints: ['Accusative article "einen"'], keyWords: ['habe', 'einen', 'Hund'] },
  { id: 'a1-8', level: 'A1', german: 'Das Buch ist interessant.', english: 'The book is interesting.', audioSpeed: 'slow', hints: ['Neutral article "Das"'], keyWords: ['Buch', 'interessant'] },
  // A2 Level
  { id: 'a2-1', level: 'A2', german: 'Ich gehe morgen ins Kino.', english: 'I am going to the cinema tomorrow.', audioSpeed: 'normal', hints: ['Time word "morgen" before place', '"ins" = in das'], keyWords: ['morgen', 'ins', 'Kino'] },
  { id: 'a2-2', level: 'A2', german: 'Sie hat gestern einen Brief geschrieben.', english: 'She wrote a letter yesterday.', audioSpeed: 'normal', hints: ['Perfect tense with "haben"', 'Participle at the end'], keyWords: ['gestern', 'Brief', 'geschrieben'] },
  { id: 'a2-3', level: 'A2', german: 'Wir müssen früh aufstehen.', english: 'We have to get up early.', audioSpeed: 'normal', hints: ['Modal verb "müssen"', 'Separable verb "aufstehen"'], keyWords: ['müssen', 'früh', 'aufstehen'] },
  { id: 'a2-4', level: 'A2', german: 'Der Zug fährt um acht Uhr ab.', english: 'The train departs at eight o\'clock.', audioSpeed: 'normal', hints: ['Separable verb "abfahren"', 'Time expression with "um"'], keyWords: ['Zug', 'fährt', 'acht', 'ab'] },
  { id: 'a2-5', level: 'A2', german: 'Kannst du mir bitte helfen?', english: 'Can you please help me?', audioSpeed: 'normal', hints: ['Modal verb "können"', 'Dative pronoun "mir"'], keyWords: ['Kannst', 'mir', 'helfen'] },
  { id: 'a2-6', level: 'A2', german: 'Ich habe Hunger und Durst.', english: 'I am hungry and thirsty.', audioSpeed: 'normal', hints: ['Compound sentence with "und"'], keyWords: ['Hunger', 'und', 'Durst'] },
  // B1 Level
  { id: 'b1-1', level: 'B1', german: 'Obwohl es regnet, gehen wir spazieren.', english: 'Although it is raining, we are going for a walk.', audioSpeed: 'normal', hints: ['Subordinate clause with "obwohl"', 'Verb at end of first clause'], keyWords: ['Obwohl', 'regnet', 'spazieren'] },
  { id: 'b1-2', level: 'B1', german: 'Ich würde gern nach Berlin fahren.', english: 'I would like to go to Berlin.', audioSpeed: 'normal', hints: ['Subjunctive "würde"', 'Destination with "nach"'], keyWords: ['würde', 'gern', 'Berlin', 'fahren'] },
  { id: 'b1-3', level: 'B1', german: 'Als ich jung war, spielte ich Fußball.', english: 'When I was young, I played soccer.', audioSpeed: 'normal', hints: ['Temporal clause with "als"', 'Simple past "spielte"'], keyWords: ['Als', 'jung', 'spielte', 'Fußball'] },
  { id: 'b1-4', level: 'B1', german: 'Er hat mich gefragt, ob ich morgen Zeit habe.', english: 'He asked me if I have time tomorrow.', audioSpeed: 'normal', hints: ['Indirect question with "ob"'], keyWords: ['gefragt', 'ob', 'morgen', 'Zeit'] },
  { id: 'b1-5', level: 'B1', german: 'Nachdem ich gegessen hatte, bin ich spazieren gegangen.', english: 'After I had eaten, I went for a walk.', audioSpeed: 'normal', hints: ['Past perfect in first clause', 'Perfect tense in main clause'], keyWords: ['Nachdem', 'gegessen', 'spazieren', 'gegangen'] },
  // B2 Level
  { id: 'b2-1', level: 'B2', german: 'Hätte ich das gewusst, wäre ich früher gekommen.', english: 'Had I known that, I would have come earlier.', audioSpeed: 'fast', hints: ['Subjunctive II conditional', 'Past conditional structure'], keyWords: ['Hätte', 'gewusst', 'wäre', 'gekommen'] },
  { id: 'b2-2', level: 'B2', german: 'Je mehr ich lerne, desto besser verstehe ich die Grammatik.', english: 'The more I learn, the better I understand the grammar.', audioSpeed: 'fast', hints: ['Comparative construction "je...desto"'], keyWords: ['Je', 'desto', 'besser', 'Grammatik'] },
  { id: 'b2-3', level: 'B2', german: 'Die Firma, bei der ich arbeite, expandiert nach Asien.', english: 'The company where I work is expanding to Asia.', audioSpeed: 'fast', hints: ['Relative clause with preposition'], keyWords: ['Firma', 'bei der', 'expandiert', 'Asien'] },
  { id: 'b2-4', level: 'B2', german: 'Anstatt zu Hause zu bleiben, sind wir ins Museum gegangen.', english: 'Instead of staying at home, we went to the museum.', audioSpeed: 'fast', hints: ['Infinitive clause with "anstatt...zu"'], keyWords: ['Anstatt', 'bleiben', 'Museum', 'gegangen'] },
];

export const getLevelDictations = (level: 'A1' | 'A2' | 'B1' | 'B2'): ListeningDictation[] => {
  return listeningDictations.filter(d => d.level === level);
};
