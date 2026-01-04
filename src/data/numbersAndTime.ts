export interface NumberWord {
  number: number;
  german: string;
  english: string;
}

export interface TimeExpression {
  id: string;
  german: string;
  english: string;
  category: 'time' | 'date' | 'duration' | 'frequency';
  example?: {
    german: string;
    english: string;
  };
}

export interface TimeQuestion {
  id: string;
  type: 'number' | 'time' | 'date' | 'quantity';
  question: string;
  answer: string;
  hint?: string;
}

// Cardinal numbers 0-100
export const cardinalNumbers: NumberWord[] = [
  { number: 0, german: 'null', english: 'zero' },
  { number: 1, german: 'eins', english: 'one' },
  { number: 2, german: 'zwei', english: 'two' },
  { number: 3, german: 'drei', english: 'three' },
  { number: 4, german: 'vier', english: 'four' },
  { number: 5, german: 'fünf', english: 'five' },
  { number: 6, german: 'sechs', english: 'six' },
  { number: 7, german: 'sieben', english: 'seven' },
  { number: 8, german: 'acht', english: 'eight' },
  { number: 9, german: 'neun', english: 'nine' },
  { number: 10, german: 'zehn', english: 'ten' },
  { number: 11, german: 'elf', english: 'eleven' },
  { number: 12, german: 'zwölf', english: 'twelve' },
  { number: 13, german: 'dreizehn', english: 'thirteen' },
  { number: 14, german: 'vierzehn', english: 'fourteen' },
  { number: 15, german: 'fünfzehn', english: 'fifteen' },
  { number: 16, german: 'sechzehn', english: 'sixteen' },
  { number: 17, german: 'siebzehn', english: 'seventeen' },
  { number: 18, german: 'achtzehn', english: 'eighteen' },
  { number: 19, german: 'neunzehn', english: 'nineteen' },
  { number: 20, german: 'zwanzig', english: 'twenty' },
  { number: 21, german: 'einundzwanzig', english: 'twenty-one' },
  { number: 22, german: 'zweiundzwanzig', english: 'twenty-two' },
  { number: 30, german: 'dreißig', english: 'thirty' },
  { number: 40, german: 'vierzig', english: 'forty' },
  { number: 50, german: 'fünfzig', english: 'fifty' },
  { number: 60, german: 'sechzig', english: 'sixty' },
  { number: 70, german: 'siebzig', english: 'seventy' },
  { number: 80, german: 'achtzig', english: 'eighty' },
  { number: 90, german: 'neunzig', english: 'ninety' },
  { number: 100, german: 'hundert', english: 'hundred' },
  { number: 1000, german: 'tausend', english: 'thousand' },
  { number: 1000000, german: 'eine Million', english: 'one million' }
];

// Ordinal numbers
export const ordinalNumbers: NumberWord[] = [
  { number: 1, german: 'erste', english: 'first' },
  { number: 2, german: 'zweite', english: 'second' },
  { number: 3, german: 'dritte', english: 'third' },
  { number: 4, german: 'vierte', english: 'fourth' },
  { number: 5, german: 'fünfte', english: 'fifth' },
  { number: 6, german: 'sechste', english: 'sixth' },
  { number: 7, german: 'siebte', english: 'seventh' },
  { number: 8, german: 'achte', english: 'eighth' },
  { number: 9, german: 'neunte', english: 'ninth' },
  { number: 10, german: 'zehnte', english: 'tenth' },
  { number: 11, german: 'elfte', english: 'eleventh' },
  { number: 12, german: 'zwölfte', english: 'twelfth' },
  { number: 20, german: 'zwanzigste', english: 'twentieth' },
  { number: 100, german: 'hundertste', english: 'hundredth' }
];

// Days of the week
export const daysOfWeek: TimeExpression[] = [
  { id: 'day-1', german: 'Montag', english: 'Monday', category: 'date' },
  { id: 'day-2', german: 'Dienstag', english: 'Tuesday', category: 'date' },
  { id: 'day-3', german: 'Mittwoch', english: 'Wednesday', category: 'date' },
  { id: 'day-4', german: 'Donnerstag', english: 'Thursday', category: 'date' },
  { id: 'day-5', german: 'Freitag', english: 'Friday', category: 'date' },
  { id: 'day-6', german: 'Samstag', english: 'Saturday', category: 'date' },
  { id: 'day-7', german: 'Sonntag', english: 'Sunday', category: 'date' }
];

// Months
export const months: TimeExpression[] = [
  { id: 'month-1', german: 'Januar', english: 'January', category: 'date' },
  { id: 'month-2', german: 'Februar', english: 'February', category: 'date' },
  { id: 'month-3', german: 'März', english: 'March', category: 'date' },
  { id: 'month-4', german: 'April', english: 'April', category: 'date' },
  { id: 'month-5', german: 'Mai', english: 'May', category: 'date' },
  { id: 'month-6', german: 'Juni', english: 'June', category: 'date' },
  { id: 'month-7', german: 'Juli', english: 'July', category: 'date' },
  { id: 'month-8', german: 'August', english: 'August', category: 'date' },
  { id: 'month-9', german: 'September', english: 'September', category: 'date' },
  { id: 'month-10', german: 'Oktober', english: 'October', category: 'date' },
  { id: 'month-11', german: 'November', english: 'November', category: 'date' },
  { id: 'month-12', german: 'Dezember', english: 'December', category: 'date' }
];

// Time expressions
export const timeExpressions: TimeExpression[] = [
  // Time of day
  { id: 'time-1', german: 'Uhr', english: 'o\'clock', category: 'time', example: { german: 'Es ist drei Uhr.', english: 'It is three o\'clock.' } },
  { id: 'time-2', german: 'halb', english: 'half past', category: 'time', example: { german: 'Es ist halb vier.', english: 'It is half past three.' } },
  { id: 'time-3', german: 'Viertel nach', english: 'quarter past', category: 'time', example: { german: 'Es ist Viertel nach drei.', english: 'It is quarter past three.' } },
  { id: 'time-4', german: 'Viertel vor', english: 'quarter to', category: 'time', example: { german: 'Es ist Viertel vor vier.', english: 'It is quarter to four.' } },
  { id: 'time-5', german: 'morgens', english: 'in the morning', category: 'time' },
  { id: 'time-6', german: 'vormittags', english: 'in the late morning', category: 'time' },
  { id: 'time-7', german: 'mittags', english: 'at noon', category: 'time' },
  { id: 'time-8', german: 'nachmittags', english: 'in the afternoon', category: 'time' },
  { id: 'time-9', german: 'abends', english: 'in the evening', category: 'time' },
  { id: 'time-10', german: 'nachts', english: 'at night', category: 'time' },
  
  // Duration
  { id: 'dur-1', german: 'die Sekunde', english: 'second', category: 'duration' },
  { id: 'dur-2', german: 'die Minute', english: 'minute', category: 'duration' },
  { id: 'dur-3', german: 'die Stunde', english: 'hour', category: 'duration' },
  { id: 'dur-4', german: 'der Tag', english: 'day', category: 'duration' },
  { id: 'dur-5', german: 'die Woche', english: 'week', category: 'duration' },
  { id: 'dur-6', german: 'der Monat', english: 'month', category: 'duration' },
  { id: 'dur-7', german: 'das Jahr', english: 'year', category: 'duration' },
  
  // Frequency
  { id: 'freq-1', german: 'immer', english: 'always', category: 'frequency' },
  { id: 'freq-2', german: 'oft', english: 'often', category: 'frequency' },
  { id: 'freq-3', german: 'manchmal', english: 'sometimes', category: 'frequency' },
  { id: 'freq-4', german: 'selten', english: 'rarely', category: 'frequency' },
  { id: 'freq-5', german: 'nie', english: 'never', category: 'frequency' },
  { id: 'freq-6', german: 'täglich', english: 'daily', category: 'frequency' },
  { id: 'freq-7', german: 'wöchentlich', english: 'weekly', category: 'frequency' },
  { id: 'freq-8', german: 'monatlich', english: 'monthly', category: 'frequency' },
  { id: 'freq-9', german: 'jährlich', english: 'yearly', category: 'frequency' },
  
  // Relative time
  { id: 'rel-1', german: 'heute', english: 'today', category: 'date' },
  { id: 'rel-2', german: 'morgen', english: 'tomorrow', category: 'date' },
  { id: 'rel-3', german: 'gestern', english: 'yesterday', category: 'date' },
  { id: 'rel-4', german: 'übermorgen', english: 'day after tomorrow', category: 'date' },
  { id: 'rel-5', german: 'vorgestern', english: 'day before yesterday', category: 'date' },
  { id: 'rel-6', german: 'nächste Woche', english: 'next week', category: 'date' },
  { id: 'rel-7', german: 'letzte Woche', english: 'last week', category: 'date' },
  { id: 'rel-8', german: 'dieses Jahr', english: 'this year', category: 'date' }
];

// German time telling rules
export const timeRules = {
  formal: {
    description: 'Formal/24-hour time (used in schedules, announcements)',
    examples: [
      { time: '14:30', german: 'vierzehn Uhr dreißig', english: '2:30 PM' },
      { time: '08:15', german: 'acht Uhr fünfzehn', english: '8:15 AM' },
      { time: '20:45', german: 'zwanzig Uhr fünfundvierzig', english: '8:45 PM' }
    ]
  },
  informal: {
    description: 'Informal/12-hour time (conversational)',
    examples: [
      { time: '3:00', german: 'drei Uhr', english: 'three o\'clock' },
      { time: '3:15', german: 'Viertel nach drei', english: 'quarter past three' },
      { time: '3:30', german: 'halb vier', english: 'half past three (lit. half four)' },
      { time: '3:45', german: 'Viertel vor vier', english: 'quarter to four' }
    ],
    note: 'Important: "halb" refers to the NEXT hour! "halb vier" = 3:30, not 4:30'
  }
};

// Date format rules
export const dateRules = {
  format: 'Day.Month.Year (e.g., 25.12.2024)',
  ordinalNote: 'Dates use ordinal numbers: "der erste Januar" (the first of January)',
  examples: [
    { date: '01.01.2024', german: 'der erste Januar zweitausendvierundzwanzig', english: 'January 1st, 2024' },
    { date: '25.12.2024', german: 'der fünfundzwanzigste Dezember', english: 'December 25th' },
    { date: '03.10.1990', german: 'der dritte Oktober neunzehnhundertneunzig', english: 'October 3rd, 1990' }
  ]
};

// Quiz questions for practice
export const practiceQuestions: TimeQuestion[] = [
  // Numbers
  { id: 'q1', type: 'number', question: 'How do you say "15" in German?', answer: 'fünfzehn' },
  { id: 'q2', type: 'number', question: 'How do you say "47" in German?', answer: 'siebenundvierzig', hint: 'Remember: ones before tens!' },
  { id: 'q3', type: 'number', question: 'How do you say "83" in German?', answer: 'dreiundachtzig' },
  { id: 'q4', type: 'number', question: 'How do you say "100" in German?', answer: 'hundert' },
  { id: 'q5', type: 'number', question: 'How do you say "21" in German?', answer: 'einundzwanzig' },
  
  // Time
  { id: 'q6', type: 'time', question: 'How do you say "3:00" in German?', answer: 'drei Uhr' },
  { id: 'q7', type: 'time', question: 'How do you say "3:30" in German (informal)?', answer: 'halb vier', hint: '"halb" refers to the next hour!' },
  { id: 'q8', type: 'time', question: 'How do you say "3:15" in German?', answer: 'Viertel nach drei' },
  { id: 'q9', type: 'time', question: 'How do you say "3:45" in German?', answer: 'Viertel vor vier' },
  { id: 'q10', type: 'time', question: 'How do you say "14:30" in formal German?', answer: 'vierzehn Uhr dreißig' },
  
  // Dates
  { id: 'q11', type: 'date', question: 'How do you say "Monday" in German?', answer: 'Montag' },
  { id: 'q12', type: 'date', question: 'How do you say "December" in German?', answer: 'Dezember' },
  { id: 'q13', type: 'date', question: 'How do you say "tomorrow" in German?', answer: 'morgen' },
  { id: 'q14', type: 'date', question: 'What is "der erste" in English?', answer: 'the first' },
  { id: 'q15', type: 'date', question: 'How do you say "next week" in German?', answer: 'nächste Woche' },
  
  // Quantity
  { id: 'q16', type: 'quantity', question: 'How do you say "once" in German?', answer: 'einmal' },
  { id: 'q17', type: 'quantity', question: 'How do you say "twice" in German?', answer: 'zweimal' },
  { id: 'q18', type: 'quantity', question: 'How do you say "daily" in German?', answer: 'täglich' },
  { id: 'q19', type: 'quantity', question: 'How do you say "sometimes" in German?', answer: 'manchmal' },
  { id: 'q20', type: 'quantity', question: 'How do you say "always" in German?', answer: 'immer' }
];

// Number formation rules
export const numberRules = {
  basic: 'Numbers 1-12 are unique words',
  teens: '13-19: unit + "zehn" (e.g., dreizehn = drei + zehn)',
  tens: '20, 30, etc.: unit + "zig" (with variations: zwanzig, dreißig)',
  compound: '21-99: unit + "und" + tens (e.g., einundzwanzig = 21)',
  note: 'German says "one and twenty" instead of "twenty-one"!'
};
