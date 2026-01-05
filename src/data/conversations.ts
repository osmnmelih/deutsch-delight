export interface DialogueLine {
  speaker: 'A' | 'B';
  german: string;
  english: string;
  notes?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  context: string;
  contextDe: string;
  roles: { A: string; B: string };
  dialogue: DialogueLine[];
  keyPhrases: { german: string; english: string; usage: string }[];
  practicePrompts: { situation: string; expectedResponse: string; hints: string[] }[];
}

export const conversationScenarios: ConversationScenario[] = [
  // A1 Level - Basic Conversations
  {
    id: 'greeting-intro',
    title: 'Meeting Someone New',
    titleDe: 'Jemanden Kennenlernen',
    icon: '👋',
    level: 'A1',
    context: 'You meet someone at a language exchange event.',
    contextDe: 'Du triffst jemanden bei einem Sprachaustausch.',
    roles: { A: 'Anna', B: 'Max' },
    dialogue: [
      { speaker: 'A', german: 'Hallo! Ich bin Anna. Wie heißt du?', english: 'Hello! I am Anna. What is your name?' },
      { speaker: 'B', german: 'Hallo Anna! Ich heiße Max. Freut mich!', english: 'Hello Anna! My name is Max. Nice to meet you!' },
      { speaker: 'A', german: 'Freut mich auch! Woher kommst du?', english: 'Nice to meet you too! Where are you from?' },
      { speaker: 'B', german: 'Ich komme aus Berlin. Und du?', english: 'I come from Berlin. And you?' },
      { speaker: 'A', german: 'Ich komme aus München. Was machst du beruflich?', english: 'I come from Munich. What do you do for work?' },
      { speaker: 'B', german: 'Ich bin Student. Ich studiere Informatik.', english: 'I am a student. I study computer science.' },
    ],
    keyPhrases: [
      { german: 'Wie heißt du?', english: 'What is your name?', usage: 'Informal way to ask someone\'s name' },
      { german: 'Freut mich!', english: 'Nice to meet you!', usage: 'Common greeting when meeting someone' },
      { german: 'Woher kommst du?', english: 'Where are you from?', usage: 'Asking about origin' },
      { german: 'Was machst du beruflich?', english: 'What do you do for work?', usage: 'Asking about profession' },
    ],
    practicePrompts: [
      { situation: 'Someone asks: "Wie heißt du?"', expectedResponse: 'Ich heiße [Name].', hints: ['Start with "Ich heiße..."', 'Add your name'] },
      { situation: 'Someone asks: "Woher kommst du?"', expectedResponse: 'Ich komme aus [City/Country].', hints: ['Use "Ich komme aus..."', 'Name your city or country'] },
    ],
  },
  {
    id: 'cafe-order',
    title: 'Ordering at a Café',
    titleDe: 'Im Café bestellen',
    icon: '☕',
    level: 'A1',
    context: 'You are at a café and want to order something.',
    contextDe: 'Du bist in einem Café und möchtest etwas bestellen.',
    roles: { A: 'Kellner (Waiter)', B: 'Gast (Guest)' },
    dialogue: [
      { speaker: 'A', german: 'Guten Tag! Was möchten Sie bestellen?', english: 'Good day! What would you like to order?' },
      { speaker: 'B', german: 'Ich hätte gerne einen Kaffee, bitte.', english: 'I would like a coffee, please.' },
      { speaker: 'A', german: 'Möchten Sie auch etwas zu essen?', english: 'Would you also like something to eat?' },
      { speaker: 'B', german: 'Ja, ein Stück Kuchen, bitte.', english: 'Yes, a piece of cake, please.' },
      { speaker: 'A', german: 'Gerne. Das macht 6,50 Euro.', english: 'Gladly. That will be 6.50 euros.' },
      { speaker: 'B', german: 'Hier, bitte. Stimmt so.', english: 'Here you go. Keep the change.' },
      { speaker: 'A', german: 'Vielen Dank! Einen schönen Tag noch!', english: 'Thank you very much! Have a nice day!' },
    ],
    keyPhrases: [
      { german: 'Ich hätte gerne...', english: 'I would like...', usage: 'Polite way to order something' },
      { german: 'Die Rechnung, bitte.', english: 'The bill, please.', usage: 'Asking for the check' },
      { german: 'Stimmt so.', english: 'Keep the change.', usage: 'When tipping' },
      { german: 'Was kostet das?', english: 'How much does that cost?', usage: 'Asking about price' },
    ],
    practicePrompts: [
      { situation: 'You want to order a tea.', expectedResponse: 'Ich hätte gerne einen Tee, bitte.', hints: ['Use "Ich hätte gerne..."', 'Don\'t forget "bitte"'] },
      { situation: 'You want to ask for the bill.', expectedResponse: 'Die Rechnung, bitte.', hints: ['Die Rechnung = the bill'] },
    ],
  },
  {
    id: 'shopping-clothes',
    title: 'Shopping for Clothes',
    titleDe: 'Kleidung einkaufen',
    icon: '👕',
    level: 'A2',
    context: 'You are in a clothing store looking for a jacket.',
    contextDe: 'Du bist in einem Bekleidungsgeschäft und suchst eine Jacke.',
    roles: { A: 'Verkäufer (Salesperson)', B: 'Kunde (Customer)' },
    dialogue: [
      { speaker: 'A', german: 'Guten Tag! Kann ich Ihnen helfen?', english: 'Good day! Can I help you?' },
      { speaker: 'B', german: 'Ja, ich suche eine Winterjacke.', english: 'Yes, I\'m looking for a winter jacket.' },
      { speaker: 'A', german: 'Welche Größe brauchen Sie?', english: 'What size do you need?' },
      { speaker: 'B', german: 'Ich trage Größe M.', english: 'I wear size M.' },
      { speaker: 'A', german: 'Hier haben wir schöne Jacken in Größe M.', english: 'Here we have nice jackets in size M.' },
      { speaker: 'B', german: 'Kann ich diese anprobieren?', english: 'Can I try this one on?' },
      { speaker: 'A', german: 'Natürlich! Die Umkleidekabinen sind dort hinten.', english: 'Of course! The fitting rooms are back there.' },
      { speaker: 'B', german: 'Die passt gut. Was kostet sie?', english: 'It fits well. How much does it cost?' },
      { speaker: 'A', german: 'Diese Jacke kostet 89 Euro.', english: 'This jacket costs 89 euros.' },
      { speaker: 'B', german: 'Das ist in Ordnung. Ich nehme sie.', english: 'That\'s fine. I\'ll take it.' },
    ],
    keyPhrases: [
      { german: 'Ich suche...', english: 'I\'m looking for...', usage: 'Telling what you want to find' },
      { german: 'Kann ich ... anprobieren?', english: 'Can I try ... on?', usage: 'Asking to try something' },
      { german: 'Welche Größe?', english: 'What size?', usage: 'Asking about size' },
      { german: 'Ich nehme es.', english: 'I\'ll take it.', usage: 'Deciding to buy' },
      { german: 'Haben Sie das in einer anderen Farbe?', english: 'Do you have this in another color?', usage: 'Asking for alternatives' },
    ],
    practicePrompts: [
      { situation: 'You want to find pants.', expectedResponse: 'Ich suche eine Hose.', hints: ['Use "Ich suche..."', 'die Hose = pants'] },
      { situation: 'Ask to try something on.', expectedResponse: 'Kann ich das anprobieren?', hints: ['Kann ich...?', 'anprobieren = to try on'] },
    ],
  },
  {
    id: 'doctor-visit',
    title: 'At the Doctor',
    titleDe: 'Beim Arzt',
    icon: '🏥',
    level: 'A2',
    context: 'You are at the doctor\'s office because you don\'t feel well.',
    contextDe: 'Du bist beim Arzt, weil du dich nicht wohl fühlst.',
    roles: { A: 'Arzt (Doctor)', B: 'Patient' },
    dialogue: [
      { speaker: 'A', german: 'Guten Tag! Was kann ich für Sie tun?', english: 'Good day! What can I do for you?' },
      { speaker: 'B', german: 'Ich fühle mich nicht gut. Ich habe Kopfschmerzen und Fieber.', english: 'I don\'t feel well. I have a headache and fever.' },
      { speaker: 'A', german: 'Seit wann haben Sie diese Symptome?', english: 'Since when have you had these symptoms?' },
      { speaker: 'B', german: 'Seit drei Tagen.', english: 'For three days.' },
      { speaker: 'A', german: 'Haben Sie auch Husten oder Halsschmerzen?', english: 'Do you also have a cough or sore throat?' },
      { speaker: 'B', german: 'Ja, ich habe leichten Husten.', english: 'Yes, I have a slight cough.' },
      { speaker: 'A', german: 'Ich werde Sie untersuchen. Bitte machen Sie den Mund auf.', english: 'I will examine you. Please open your mouth.' },
      { speaker: 'A', german: 'Sie haben eine Erkältung. Ich verschreibe Ihnen Medikamente.', english: 'You have a cold. I will prescribe you medication.' },
      { speaker: 'B', german: 'Wie oft muss ich die Medikamente nehmen?', english: 'How often do I have to take the medication?' },
      { speaker: 'A', german: 'Dreimal täglich, nach dem Essen.', english: 'Three times a day, after meals.' },
    ],
    keyPhrases: [
      { german: 'Ich habe Schmerzen.', english: 'I have pain.', usage: 'Describing pain' },
      { german: 'Mir ist schlecht.', english: 'I feel sick/nauseous.', usage: 'Expressing feeling unwell' },
      { german: 'Ich brauche ein Rezept.', english: 'I need a prescription.', usage: 'Asking for prescription' },
      { german: 'Wo tut es weh?', english: 'Where does it hurt?', usage: 'Doctor asking about pain location' },
    ],
    practicePrompts: [
      { situation: 'Describe that you have a stomachache.', expectedResponse: 'Ich habe Bauchschmerzen.', hints: ['der Bauch = stomach', 'die Schmerzen = pain'] },
      { situation: 'Say you\'ve been sick for a week.', expectedResponse: 'Ich bin seit einer Woche krank.', hints: ['seit = since/for', 'eine Woche = one week'] },
    ],
  },
  {
    id: 'train-station',
    title: 'At the Train Station',
    titleDe: 'Am Bahnhof',
    icon: '🚂',
    level: 'A2',
    context: 'You want to buy a train ticket.',
    contextDe: 'Du möchtest eine Fahrkarte kaufen.',
    roles: { A: 'Mitarbeiter (Employee)', B: 'Reisender (Traveler)' },
    dialogue: [
      { speaker: 'B', german: 'Guten Tag! Ich möchte eine Fahrkarte nach Hamburg.', english: 'Good day! I would like a ticket to Hamburg.' },
      { speaker: 'A', german: 'Einfache Fahrt oder hin und zurück?', english: 'One way or round trip?' },
      { speaker: 'B', german: 'Hin und zurück, bitte.', english: 'Round trip, please.' },
      { speaker: 'A', german: 'Wann möchten Sie fahren?', english: 'When would you like to travel?' },
      { speaker: 'B', german: 'Morgen früh, gegen 8 Uhr.', english: 'Tomorrow morning, around 8 o\'clock.' },
      { speaker: 'A', german: 'Es gibt einen ICE um 8:15 Uhr. Möchten Sie erste oder zweite Klasse?', english: 'There\'s an ICE at 8:15. Would you like first or second class?' },
      { speaker: 'B', german: 'Zweite Klasse, bitte. Von welchem Gleis fährt der Zug?', english: 'Second class, please. From which platform does the train leave?' },
      { speaker: 'A', german: 'Gleis 7. Das macht 89 Euro.', english: 'Platform 7. That will be 89 euros.' },
      { speaker: 'B', german: 'Kann ich mit Karte zahlen?', english: 'Can I pay by card?' },
      { speaker: 'A', german: 'Ja, natürlich. Hier ist Ihre Fahrkarte.', english: 'Yes, of course. Here is your ticket.' },
    ],
    keyPhrases: [
      { german: 'eine Fahrkarte nach...', english: 'a ticket to...', usage: 'Buying a train ticket' },
      { german: 'Wann fährt der nächste Zug?', english: 'When does the next train leave?', usage: 'Asking about departure times' },
      { german: 'Von welchem Gleis?', english: 'From which platform?', usage: 'Asking about platform' },
      { german: 'Hat der Zug Verspätung?', english: 'Is the train delayed?', usage: 'Asking about delays' },
    ],
    practicePrompts: [
      { situation: 'Ask for a one-way ticket to Berlin.', expectedResponse: 'Ich möchte eine einfache Fahrt nach Berlin.', hints: ['einfache Fahrt = one way', 'nach = to'] },
      { situation: 'Ask when the train arrives.', expectedResponse: 'Wann kommt der Zug an?', hints: ['ankommen = to arrive', 'Wann = when'] },
    ],
  },
  // B1 Level - Intermediate Conversations
  {
    id: 'apartment-search',
    title: 'Apartment Viewing',
    titleDe: 'Wohnungsbesichtigung',
    icon: '🏠',
    level: 'B1',
    context: 'You are viewing an apartment to rent.',
    contextDe: 'Du besichtigst eine Wohnung zur Miete.',
    roles: { A: 'Vermieter (Landlord)', B: 'Interessent (Interested Party)' },
    dialogue: [
      { speaker: 'A', german: 'Willkommen! Das ist die Wohnung. Sie hat 70 Quadratmeter.', english: 'Welcome! This is the apartment. It has 70 square meters.' },
      { speaker: 'B', german: 'Schön! Wie viele Zimmer hat die Wohnung?', english: 'Nice! How many rooms does the apartment have?' },
      { speaker: 'A', german: 'Zwei Schlafzimmer, ein Wohnzimmer, eine Küche und ein Bad.', english: 'Two bedrooms, a living room, a kitchen, and a bathroom.' },
      { speaker: 'B', german: 'Wie hoch ist die Miete?', english: 'How much is the rent?' },
      { speaker: 'A', german: 'Die Kaltmiete beträgt 800 Euro, plus 200 Euro Nebenkosten.', english: 'The base rent is 800 euros, plus 200 euros for utilities.' },
      { speaker: 'B', german: 'Sind Haustiere erlaubt?', english: 'Are pets allowed?' },
      { speaker: 'A', german: 'Kleine Haustiere sind kein Problem.', english: 'Small pets are no problem.' },
      { speaker: 'B', german: 'Ab wann wäre die Wohnung verfügbar?', english: 'From when would the apartment be available?' },
      { speaker: 'A', german: 'Ab dem ersten des nächsten Monats.', english: 'From the first of next month.' },
      { speaker: 'B', german: 'Das klingt gut. Welche Unterlagen brauchen Sie von mir?', english: 'That sounds good. What documents do you need from me?' },
    ],
    keyPhrases: [
      { german: 'die Kaltmiete', english: 'base rent (without utilities)', usage: 'Discussing rent costs' },
      { german: 'die Nebenkosten', english: 'utilities/additional costs', usage: 'Additional monthly costs' },
      { german: 'die Kaution', english: 'security deposit', usage: 'Usually 2-3 months rent' },
      { german: 'der Mietvertrag', english: 'rental agreement', usage: 'The contract you sign' },
    ],
    practicePrompts: [
      { situation: 'Ask if the apartment has a balcony.', expectedResponse: 'Hat die Wohnung einen Balkon?', hints: ['der Balkon = balcony', 'Hat...?'] },
      { situation: 'Ask about the lease duration.', expectedResponse: 'Wie lange läuft der Mietvertrag?', hints: ['laufen = to run', 'der Mietvertrag = lease'] },
    ],
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    titleDe: 'Vorstellungsgespräch',
    icon: '💼',
    level: 'B1',
    context: 'You are at a job interview for a marketing position.',
    contextDe: 'Du bist bei einem Vorstellungsgespräch für eine Marketingstelle.',
    roles: { A: 'Personalleiter (HR Manager)', B: 'Bewerber (Applicant)' },
    dialogue: [
      { speaker: 'A', german: 'Vielen Dank, dass Sie gekommen sind. Erzählen Sie mir etwas über sich.', english: 'Thank you for coming. Tell me something about yourself.' },
      { speaker: 'B', german: 'Gerne. Ich habe Marketing studiert und arbeite seit drei Jahren in der Branche.', english: 'Gladly. I studied marketing and have been working in the industry for three years.' },
      { speaker: 'A', german: 'Was sind Ihre Stärken?', english: 'What are your strengths?' },
      { speaker: 'B', german: 'Ich bin kreativ, teamfähig und arbeite sehr gut unter Druck.', english: 'I am creative, a team player, and work very well under pressure.' },
      { speaker: 'A', german: 'Warum möchten Sie bei uns arbeiten?', english: 'Why do you want to work with us?' },
      { speaker: 'B', german: 'Ihr Unternehmen ist innovativ und ich möchte meine Fähigkeiten hier einbringen.', english: 'Your company is innovative and I would like to contribute my skills here.' },
      { speaker: 'A', german: 'Was sind Ihre Gehaltsvorstellungen?', english: 'What are your salary expectations?' },
      { speaker: 'B', german: 'Ich stelle mir ein Jahresgehalt von etwa 50.000 Euro vor.', english: 'I envision an annual salary of about 50,000 euros.' },
      { speaker: 'A', german: 'Wann könnten Sie bei uns anfangen?', english: 'When could you start with us?' },
      { speaker: 'B', german: 'Ich habe eine Kündigungsfrist von einem Monat.', english: 'I have a notice period of one month.' },
    ],
    keyPhrases: [
      { german: 'die Berufserfahrung', english: 'professional experience', usage: 'Talking about work history' },
      { german: 'die Qualifikation', english: 'qualification', usage: 'Discussing skills and education' },
      { german: 'die Gehaltsvorstellung', english: 'salary expectation', usage: 'Discussing compensation' },
      { german: 'die Kündigungsfrist', english: 'notice period', usage: 'Time before you can leave current job' },
    ],
    practicePrompts: [
      { situation: 'Describe your experience.', expectedResponse: 'Ich habe fünf Jahre Erfahrung in diesem Bereich.', hints: ['die Erfahrung = experience', 'der Bereich = field'] },
      { situation: 'Ask about working hours.', expectedResponse: 'Wie sind die Arbeitszeiten?', hints: ['die Arbeitszeiten = working hours'] },
    ],
  },
  {
    id: 'restaurant-complaint',
    title: 'Restaurant Complaint',
    titleDe: 'Beschwerde im Restaurant',
    icon: '🍽️',
    level: 'B1',
    context: 'Your food order is wrong and you need to complain politely.',
    contextDe: 'Deine Bestellung stimmt nicht und du musst dich höflich beschweren.',
    roles: { A: 'Kellner (Waiter)', B: 'Gast (Guest)' },
    dialogue: [
      { speaker: 'B', german: 'Entschuldigung, das ist leider nicht das, was ich bestellt habe.', english: 'Excuse me, this is unfortunately not what I ordered.' },
      { speaker: 'A', german: 'Oh, das tut mir leid. Was hatten Sie bestellt?', english: 'Oh, I\'m sorry. What did you order?' },
      { speaker: 'B', german: 'Ich hatte das Hähnchen ohne Soße bestellt, aber hier ist Soße drauf.', english: 'I had ordered the chicken without sauce, but there\'s sauce on it.' },
      { speaker: 'A', german: 'Das tut mir wirklich leid. Ich bringe Ihnen sofort ein neues Gericht.', english: 'I\'m really sorry. I\'ll bring you a new dish right away.' },
      { speaker: 'B', german: 'Vielen Dank. Außerdem ist mein Wasser noch nicht gekommen.', english: 'Thank you very much. Also, my water hasn\'t arrived yet.' },
      { speaker: 'A', german: 'Das bringe ich Ihnen gleich mit. Noch einmal Entschuldigung.', english: 'I\'ll bring that right away. Sorry again.' },
      { speaker: 'B', german: 'Kein Problem. Könnte ich auch noch etwas Brot bekommen?', english: 'No problem. Could I also get some bread?' },
      { speaker: 'A', german: 'Selbstverständlich. Gibt es sonst noch etwas?', english: 'Of course. Is there anything else?' },
    ],
    keyPhrases: [
      { german: 'Das ist nicht das, was ich bestellt habe.', english: 'This is not what I ordered.', usage: 'Pointing out wrong order' },
      { german: 'Das Essen ist kalt.', english: 'The food is cold.', usage: 'Complaining about temperature' },
      { german: 'Könnte ich bitte...?', english: 'Could I please...?', usage: 'Polite request' },
      { german: 'Ich möchte mich beschweren.', english: 'I would like to complain.', usage: 'Formal complaint' },
    ],
    practicePrompts: [
      { situation: 'The food is too salty.', expectedResponse: 'Das Essen ist zu salzig.', hints: ['salzig = salty', 'zu = too'] },
      { situation: 'You want to speak to the manager.', expectedResponse: 'Könnte ich bitte mit dem Manager sprechen?', hints: ['sprechen = to speak', 'mit = with'] },
    ],
  },
  // B2 Level - Advanced Conversations
  {
    id: 'political-discussion',
    title: 'Discussing Politics',
    titleDe: 'Politische Diskussion',
    icon: '🗳️',
    level: 'B2',
    context: 'You\'re discussing current political topics with a friend.',
    contextDe: 'Du diskutierst aktuelle politische Themen mit einem Freund.',
    roles: { A: 'Lisa', B: 'Thomas' },
    dialogue: [
      { speaker: 'A', german: 'Was hältst du von der neuen Umweltpolitik der Regierung?', english: 'What do you think of the government\'s new environmental policy?' },
      { speaker: 'B', german: 'Meiner Meinung nach ist das ein Schritt in die richtige Richtung, aber es reicht nicht aus.', english: 'In my opinion, it\'s a step in the right direction, but it\'s not enough.' },
      { speaker: 'A', german: 'Ich stimme dir zu. Die Maßnahmen müssten viel konsequenter sein.', english: 'I agree with you. The measures would have to be much more consistent.' },
      { speaker: 'B', german: 'Das Problem ist, dass wirtschaftliche Interessen oft Vorrang haben.', english: 'The problem is that economic interests often take priority.' },
      { speaker: 'A', german: 'Andererseits muss man auch an die Arbeitsplätze denken.', english: 'On the other hand, you also have to think about jobs.' },
      { speaker: 'B', german: 'Das stimmt, aber langfristig wird die Umweltzerstörung teurer sein.', english: 'That\'s true, but in the long term, environmental destruction will be more expensive.' },
      { speaker: 'A', german: 'Ich finde, wir brauchen einen gesellschaftlichen Wandel.', english: 'I think we need a societal change.' },
      { speaker: 'B', german: 'Absolut. Jeder Einzelne kann etwas beitragen.', english: 'Absolutely. Every individual can contribute something.' },
    ],
    keyPhrases: [
      { german: 'Meiner Meinung nach...', english: 'In my opinion...', usage: 'Expressing opinion' },
      { german: 'Ich stimme dir zu.', english: 'I agree with you.', usage: 'Agreeing' },
      { german: 'Andererseits...', english: 'On the other hand...', usage: 'Presenting counter-argument' },
      { german: 'Das sehe ich anders.', english: 'I see that differently.', usage: 'Polite disagreement' },
      { german: 'Es ist umstritten, ob...', english: 'It is controversial whether...', usage: 'Discussing debate' },
    ],
    practicePrompts: [
      { situation: 'Express that you partially agree.', expectedResponse: 'Ich stimme dir teilweise zu, aber...', hints: ['teilweise = partially', 'aber = but'] },
      { situation: 'Say that you see it differently.', expectedResponse: 'Ich sehe das etwas anders.', hints: ['etwas = somewhat', 'anders = differently'] },
    ],
  },
  {
    id: 'business-negotiation',
    title: 'Business Negotiation',
    titleDe: 'Geschäftsverhandlung',
    icon: '📊',
    level: 'B2',
    context: 'You are negotiating a business deal with a potential partner.',
    contextDe: 'Du verhandelst einen Geschäftsabschluss mit einem potenziellen Partner.',
    roles: { A: 'Herr Schmidt (Supplier)', B: 'Frau Weber (Buyer)' },
    dialogue: [
      { speaker: 'A', german: 'Wir können Ihnen einen Mengenrabatt von 10% anbieten.', english: 'We can offer you a volume discount of 10%.' },
      { speaker: 'B', german: 'Das ist ein guter Anfang, aber wir hatten auf 15% gehofft.', english: 'That\'s a good start, but we were hoping for 15%.' },
      { speaker: 'A', german: 'Bei einer Mindestbestellmenge von 5.000 Stück könnten wir auf 12% gehen.', english: 'With a minimum order of 5,000 units, we could go to 12%.' },
      { speaker: 'B', german: 'Das klingt schon besser. Wie sieht es mit den Lieferzeiten aus?', english: 'That sounds better. How about delivery times?' },
      { speaker: 'A', german: 'Normalerweise liefern wir innerhalb von 4 Wochen.', english: 'Normally we deliver within 4 weeks.' },
      { speaker: 'B', german: 'Könnten Sie die Lieferzeit auf 3 Wochen verkürzen?', english: 'Could you shorten the delivery time to 3 weeks?' },
      { speaker: 'A', german: 'Das wäre gegen einen kleinen Aufpreis möglich.', english: 'That would be possible for a small surcharge.' },
      { speaker: 'B', german: 'Lassen Sie uns die Details im Vertrag festhalten.', english: 'Let\'s put the details in the contract.' },
    ],
    keyPhrases: [
      { german: 'Wir können Ihnen anbieten...', english: 'We can offer you...', usage: 'Making an offer' },
      { german: 'Das liegt über/unter unserem Budget.', english: 'That is above/below our budget.', usage: 'Discussing budget' },
      { german: 'Können wir uns in der Mitte treffen?', english: 'Can we meet in the middle?', usage: 'Compromising' },
      { german: 'unter der Voraussetzung, dass...', english: 'on the condition that...', usage: 'Setting conditions' },
    ],
    practicePrompts: [
      { situation: 'Ask for better payment terms.', expectedResponse: 'Könnten Sie uns bessere Zahlungsbedingungen anbieten?', hints: ['die Zahlungsbedingungen = payment terms', 'anbieten = to offer'] },
      { situation: 'Propose meeting halfway.', expectedResponse: 'Können wir uns bei 13% einigen?', hints: ['sich einigen = to agree', 'bei = at'] },
    ],
  },
  {
    id: 'tech-support',
    title: 'Technical Support',
    titleDe: 'Technischer Support',
    icon: '💻',
    level: 'B2',
    context: 'You are calling tech support about a software problem.',
    contextDe: 'Du rufst beim technischen Support wegen eines Softwareproblems an.',
    roles: { A: 'Techniker (Technician)', B: 'Kunde (Customer)' },
    dialogue: [
      { speaker: 'A', german: 'Technischer Support, wie kann ich Ihnen helfen?', english: 'Technical support, how can I help you?' },
      { speaker: 'B', german: 'Mein Computer stürzt ständig ab, wenn ich das Programm öffne.', english: 'My computer keeps crashing when I open the program.' },
      { speaker: 'A', german: 'Seit wann tritt dieses Problem auf?', english: 'Since when has this problem been occurring?' },
      { speaker: 'B', german: 'Seit dem letzten Update vor drei Tagen.', english: 'Since the last update three days ago.' },
      { speaker: 'A', german: 'Haben Sie versucht, das Programm neu zu installieren?', english: 'Have you tried reinstalling the program?' },
      { speaker: 'B', german: 'Ja, aber das hat nicht geholfen.', english: 'Yes, but that didn\'t help.' },
      { speaker: 'A', german: 'Ich werde mich per Fernzugriff mit Ihrem Computer verbinden.', english: 'I will connect to your computer via remote access.' },
      { speaker: 'B', german: 'In Ordnung. Was muss ich dafür tun?', english: 'Alright. What do I need to do for that?' },
      { speaker: 'A', german: 'Bitte laden Sie unsere Support-Software herunter und geben Sie mir den Zugangscode.', english: 'Please download our support software and give me the access code.' },
    ],
    keyPhrases: [
      { german: 'Das Programm stürzt ab.', english: 'The program crashes.', usage: 'Describing crashes' },
      { german: 'Haben Sie es aus- und wieder eingeschaltet?', english: 'Have you turned it off and on again?', usage: 'Basic troubleshooting' },
      { german: 'per Fernzugriff', english: 'via remote access', usage: 'Remote connection' },
      { german: 'Die Fehlermeldung lautet...', english: 'The error message says...', usage: 'Reporting error messages' },
    ],
    practicePrompts: [
      { situation: 'Describe that the screen freezes.', expectedResponse: 'Der Bildschirm friert ein.', hints: ['einfrieren = to freeze', 'der Bildschirm = screen'] },
      { situation: 'Ask if they can send a technician.', expectedResponse: 'Können Sie einen Techniker schicken?', hints: ['schicken = to send', 'der Techniker = technician'] },
    ],
  },
];

export const getScenariosByLevel = (level: 'A1' | 'A2' | 'B1' | 'B2'): ConversationScenario[] => {
  return conversationScenarios.filter(s => s.level === level);
};
