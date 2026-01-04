export type CaseType = 'akkusativ' | 'dativ';

export interface Preposition {
  id: string;
  german: string;
  english: string;
  case: CaseType;
  type: 'akkusativ' | 'dativ' | 'wechselpräposition';
  examples: {
    german: string;
    english: string;
  }[];
  notes?: string;
}

export interface WechselPreposition extends Preposition {
  type: 'wechselpräposition';
  akkusativExample: {
    german: string;
    english: string;
    context: string;
  };
  dativExample: {
    german: string;
    english: string;
    context: string;
  };
}

// Akkusativ prepositions (always take accusative)
export const akkusativPrepositions: Preposition[] = [
  {
    id: 'akk-durch',
    german: 'durch',
    english: 'through',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Ich gehe durch den Park.', english: 'I walk through the park.' },
      { german: 'Der Vogel fliegt durch das Fenster.', english: 'The bird flies through the window.' }
    ]
  },
  {
    id: 'akk-fuer',
    german: 'für',
    english: 'for',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Das Geschenk ist für dich.', english: 'The gift is for you.' },
      { german: 'Ich arbeite für eine große Firma.', english: 'I work for a big company.' }
    ]
  },
  {
    id: 'akk-gegen',
    german: 'gegen',
    english: 'against',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Er kämpft gegen den Feind.', english: 'He fights against the enemy.' },
      { german: 'Das Auto fuhr gegen die Wand.', english: 'The car drove against the wall.' }
    ]
  },
  {
    id: 'akk-ohne',
    german: 'ohne',
    english: 'without',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Ich trinke Kaffee ohne Zucker.', english: 'I drink coffee without sugar.' },
      { german: 'Er ging ohne seinen Freund.', english: 'He went without his friend.' }
    ]
  },
  {
    id: 'akk-um',
    german: 'um',
    english: 'around/at (time)',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Wir sitzen um den Tisch.', english: 'We sit around the table.' },
      { german: 'Der Film beginnt um 8 Uhr.', english: 'The movie starts at 8 o\'clock.' }
    ]
  },
  {
    id: 'akk-bis',
    german: 'bis',
    english: 'until/to',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Ich warte bis Freitag.', english: 'I wait until Friday.' },
      { german: 'Von hier bis zum Bahnhof.', english: 'From here to the train station.' }
    ],
    notes: 'Often used with other prepositions (bis zu, bis nach)'
  },
  {
    id: 'akk-entlang',
    german: 'entlang',
    english: 'along',
    case: 'akkusativ',
    type: 'akkusativ',
    examples: [
      { german: 'Ich gehe den Fluss entlang.', english: 'I walk along the river.' },
      { german: 'Wir fahren die Straße entlang.', english: 'We drive along the street.' }
    ],
    notes: 'Usually comes after the noun'
  }
];

// Dativ prepositions (always take dative)
export const dativPrepositions: Preposition[] = [
  {
    id: 'dat-aus',
    german: 'aus',
    english: 'from/out of',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich komme aus Deutschland.', english: 'I come from Germany.' },
      { german: 'Er geht aus dem Haus.', english: 'He goes out of the house.' }
    ]
  },
  {
    id: 'dat-bei',
    german: 'bei',
    english: 'at/near/with',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich wohne bei meinen Eltern.', english: 'I live with my parents.' },
      { german: 'Sie arbeitet bei Siemens.', english: 'She works at Siemens.' }
    ]
  },
  {
    id: 'dat-mit',
    german: 'mit',
    english: 'with',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich fahre mit dem Bus.', english: 'I travel by bus.' },
      { german: 'Er spricht mit seinem Freund.', english: 'He talks with his friend.' }
    ]
  },
  {
    id: 'dat-nach',
    german: 'nach',
    english: 'to/after',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich fahre nach Berlin.', english: 'I travel to Berlin.' },
      { german: 'Nach dem Essen gehen wir spazieren.', english: 'After the meal we go for a walk.' }
    ]
  },
  {
    id: 'dat-seit',
    german: 'seit',
    english: 'since/for (time)',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich lerne Deutsch seit einem Jahr.', english: 'I\'ve been learning German for a year.' },
      { german: 'Seit dem Sommer ist es warm.', english: 'Since summer it has been warm.' }
    ]
  },
  {
    id: 'dat-von',
    german: 'von',
    english: 'from/of',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Das Buch ist von meinem Bruder.', english: 'The book is from my brother.' },
      { german: 'Ich komme gerade vom Arzt.', english: 'I just came from the doctor.' }
    ]
  },
  {
    id: 'dat-zu',
    german: 'zu',
    english: 'to',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Ich gehe zum Supermarkt.', english: 'I go to the supermarket.' },
      { german: 'Sie fährt zur Arbeit.', english: 'She goes to work.' }
    ],
    notes: 'zu + dem = zum, zu + der = zur'
  },
  {
    id: 'dat-gegenueber',
    german: 'gegenüber',
    english: 'opposite/across from',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Das Hotel ist gegenüber dem Bahnhof.', english: 'The hotel is opposite the train station.' },
      { german: 'Er sitzt mir gegenüber.', english: 'He sits opposite me.' }
    ],
    notes: 'Can come before or after the noun'
  },
  {
    id: 'dat-ausser',
    german: 'außer',
    english: 'except/besides',
    case: 'dativ',
    type: 'dativ',
    examples: [
      { german: 'Alle außer mir waren da.', english: 'Everyone except me was there.' },
      { german: 'Außer dem Wetter war alles gut.', english: 'Except for the weather, everything was good.' }
    ]
  }
];

// Wechselpräpositionen (two-way prepositions)
export const wechselPraepositions: WechselPreposition[] = [
  {
    id: 'wech-an',
    german: 'an',
    english: 'at/on (vertical)',
    case: 'akkusativ', // Default for quiz - will show both
    type: 'wechselpräposition',
    examples: [
      { german: 'Das Bild hängt an der Wand.', english: 'The picture hangs on the wall.' }
    ],
    akkusativExample: {
      german: 'Ich hänge das Bild an die Wand.',
      english: 'I hang the picture on the wall.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Das Bild hängt an der Wand.',
      english: 'The picture hangs on the wall.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-auf',
    german: 'auf',
    english: 'on (horizontal)',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Das Buch liegt auf dem Tisch.', english: 'The book lies on the table.' }
    ],
    akkusativExample: {
      german: 'Ich lege das Buch auf den Tisch.',
      english: 'I put the book on the table.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Das Buch liegt auf dem Tisch.',
      english: 'The book lies on the table.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-hinter',
    german: 'hinter',
    english: 'behind',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Der Hund sitzt hinter dem Sofa.', english: 'The dog sits behind the sofa.' }
    ],
    akkusativExample: {
      german: 'Der Hund läuft hinter das Sofa.',
      english: 'The dog runs behind the sofa.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Der Hund sitzt hinter dem Sofa.',
      english: 'The dog sits behind the sofa.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-in',
    german: 'in',
    english: 'in/into',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Ich bin in der Schule.', english: 'I am in the school.' }
    ],
    akkusativExample: {
      german: 'Ich gehe in die Schule.',
      english: 'I go into the school.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Ich bin in der Schule.',
      english: 'I am in the school.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-neben',
    german: 'neben',
    english: 'next to',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Das Auto steht neben dem Haus.', english: 'The car is next to the house.' }
    ],
    akkusativExample: {
      german: 'Ich stelle das Auto neben das Haus.',
      english: 'I park the car next to the house.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Das Auto steht neben dem Haus.',
      english: 'The car is next to the house.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-ueber',
    german: 'über',
    english: 'over/above',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Die Lampe hängt über dem Tisch.', english: 'The lamp hangs over the table.' }
    ],
    akkusativExample: {
      german: 'Ich hänge die Lampe über den Tisch.',
      english: 'I hang the lamp over the table.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Die Lampe hängt über dem Tisch.',
      english: 'The lamp hangs over the table.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-unter',
    german: 'unter',
    english: 'under',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Die Katze liegt unter dem Bett.', english: 'The cat lies under the bed.' }
    ],
    akkusativExample: {
      german: 'Die Katze kriecht unter das Bett.',
      english: 'The cat crawls under the bed.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Die Katze liegt unter dem Bett.',
      english: 'The cat lies under the bed.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-vor',
    german: 'vor',
    english: 'in front of/before',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Das Auto parkt vor dem Haus.', english: 'The car is parked in front of the house.' }
    ],
    akkusativExample: {
      german: 'Ich fahre das Auto vor das Haus.',
      english: 'I drive the car in front of the house.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Das Auto parkt vor dem Haus.',
      english: 'The car is parked in front of the house.',
      context: 'Location/Position (wo?)'
    }
  },
  {
    id: 'wech-zwischen',
    german: 'zwischen',
    english: 'between',
    case: 'akkusativ',
    type: 'wechselpräposition',
    examples: [
      { german: 'Der Stuhl steht zwischen den Tischen.', english: 'The chair stands between the tables.' }
    ],
    akkusativExample: {
      german: 'Ich stelle den Stuhl zwischen die Tische.',
      english: 'I put the chair between the tables.',
      context: 'Movement/Direction (wohin?)'
    },
    dativExample: {
      german: 'Der Stuhl steht zwischen den Tischen.',
      english: 'The chair stands between the tables.',
      context: 'Location/Position (wo?)'
    }
  }
];

// Mnemonic for Akkusativ prepositions
export const akkusativMnemonic = {
  phrase: 'DOGFU',
  breakdown: 'Durch, Ohne, Gegen, Für, Um',
  full: 'Also: bis, entlang'
};

// Mnemonic for Dativ prepositions
export const dativMnemonic = {
  phrase: 'Aus-Bei-Mit-Nach-Seit-Von-Zu',
  breakdown: 'Always take dative case',
  full: 'Also: außer, gegenüber'
};

// Mnemonic for Wechselpräpositionen
export const wechselMnemonic = {
  phrase: 'AN-AUF-HINTER-IN-NEBEN-ÜBER-UNTER-VOR-ZWISCHEN',
  rule: 'Wohin? (direction) → Akkusativ | Wo? (location) → Dativ'
};
