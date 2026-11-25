export interface QuestionItem {
  icon: string;
  count: number;
  label: string;
}

export interface Question {
  id: string;
  level: number;
  type: 'addition' | 'subtraction' | 'comparison' | 'multiplication';
  prompt: string;
  numberSentence: string;
  itemsGroupA?: QuestionItem;
  itemsGroupB?: QuestionItem;
  operatorSymbol: string;
  options: (number | string)[];
  correctAnswer: number | string;
}

const FRUITS = [
  { icon: '🍌', name: 'Bananas' },
  { icon: '🍎', name: 'Apples' },
  { icon: '🥥', name: 'Coconuts' },
  { icon: '🍍', name: 'Pineapples' },
  { icon: '🥭', name: 'Mangoes' },
  { icon: '🍓', name: 'Strawberries' },
  { icon: '🍉', name: 'Watermelons' },
  { icon: '🍇', name: 'Grapes' },
];

function getRandomFruit() {
  return FRUITS[Math.floor(Math.random() * FRUITS.length)];
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateOptions(correct: number, maxRange: number = 10): number[] {
  const options = new Set<number>([correct]);
  while (options.size < 3) {
    const delta = Math.random() > 0.5 ? 1 : -1;
    const factor = Math.floor(Math.random() * 3) + 1;
    const plausible = Math.max(0, correct + delta * factor);
    options.add(plausible);
  }
  return shuffle(Array.from(options));
}

export function generateQuestionsForLevel(level: number, count: number = 5): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const id = `lvl-${level}-q-${i + 1}-${Date.now()}`;
    const fruit = getRandomFruit();

    if (level <= 4) {
      // Levels 1-4: Addition up to 10
      // Higher levels use slightly larger sums
      const maxTarget = level === 1 ? 6 : level === 2 ? 8 : 10;
      const target = Math.floor(Math.random() * (maxTarget - 2)) + 3; // 3 to maxTarget
      const a = Math.floor(Math.random() * (target - 1)) + 1; // 1 to target - 1
      const b = target - a;
      const correct = a + b;

      questions.push({
        id,
        level,
        type: 'addition',
        prompt: `How many ${fruit.name.toLowerCase()} are there in total?`,
        numberSentence: `${a} + ${b} = ?`,
        operatorSymbol: '+',
        itemsGroupA: { icon: fruit.icon, count: a, label: `${a}` },
        itemsGroupB: { icon: fruit.icon, count: b, label: `${b}` },
        options: generateOptions(correct, 10),
        correctAnswer: correct,
      });
    } else if (level <= 8) {
      // Levels 5-8: Subtraction up to 10
      const a = Math.floor(Math.random() * 6) + 3; // 3 to 8 (or up to 10)
      const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 to a - 1
      const correct = a - b;

      questions.push({
        id,
        level,
        type: 'subtraction',
        prompt: `Take away ${b} from ${a}. How many ${fruit.name.toLowerCase()} are left?`,
        numberSentence: `${a} - ${b} = ?`,
        operatorSymbol: '-',
        itemsGroupA: { icon: fruit.icon, count: a, label: `${a}` },
        itemsGroupB: { icon: '❌', count: b, label: `take ${b}` },
        options: generateOptions(correct, 10),
        correctAnswer: correct,
      });
    } else if (level <= 12) {
      // Levels 9-12: Addition and Subtraction up to 20
      const isAdd = Math.random() > 0.4;
      if (isAdd) {
        const a = Math.floor(Math.random() * 9) + 4; // 4 to 12
        const b = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const correct = a + b;

        questions.push({
          id,
          level,
          type: 'addition',
          prompt: `Add them together! How many ${fruit.name.toLowerCase()} in all?`,
          numberSentence: `${a} + ${b} = ?`,
          operatorSymbol: '+',
          itemsGroupA: { icon: fruit.icon, count: Math.min(a, 10), label: `${a}` },
          itemsGroupB: { icon: fruit.icon, count: Math.min(b, 10), label: `${b}` },
          options: generateOptions(correct, 20),
          correctAnswer: correct,
        });
      } else {
        const a = Math.floor(Math.random() * 10) + 10; // 10 to 19
        const b = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const correct = a - b;

        questions.push({
          id,
          level,
          type: 'subtraction',
          prompt: `Subtract! How many ${fruit.name.toLowerCase()} are remaining?`,
          numberSentence: `${a} - ${b} = ?`,
          operatorSymbol: '-',
          itemsGroupA: { icon: fruit.icon, count: Math.min(a, 10), label: `${a}` },
          itemsGroupB: { icon: '❌', count: Math.min(b, 8), label: `take ${b}` },
          options: generateOptions(correct, 20),
          correctAnswer: correct,
        });
      }
    } else if (level <= 16) {
      // Levels 13-16: Counting & Comparing numbers (<, >, =)
      const a = Math.floor(Math.random() * 18) + 2;
      const coinFlip = Math.random();
      let b = a;
      if (coinFlip < 0.4) {
        b = a + Math.floor(Math.random() * 5) + 1;
      } else if (coinFlip < 0.8) {
        b = Math.max(1, a - Math.floor(Math.random() * 5) - 1);
      }
      const correct = a > b ? '>' : a < b ? '<' : '=';

      questions.push({
        id,
        level,
        type: 'comparison',
        prompt: `Which sign makes this true? Is ${a} greater, less, or equal to ${b}?`,
        numberSentence: `${a}  [ ? ]  ${b}`,
        operatorSymbol: 'vs',
        itemsGroupA: { icon: fruit.icon, count: Math.min(a, 6), label: `${a}` },
        itemsGroupB: { icon: '🥥', count: Math.min(b, 6), label: `${b}` },
        options: shuffle(['<', '>', '=']),
        correctAnswer: correct,
      });
    } else {
      // Levels 17-20: Multiplication tables of 2 and 5
      const table = Math.random() > 0.5 ? 2 : 5;
      const factor = Math.floor(Math.random() * 9) + 1; // 1 to 9
      const correct = table * factor;

      questions.push({
        id,
        level,
        type: 'multiplication',
        prompt: `How many ${fruit.name.toLowerCase()} in ${factor} groups of ${table}?`,
        numberSentence: `${table} × ${factor} = ?`,
        operatorSymbol: '×',
        itemsGroupA: { icon: fruit.icon, count: table, label: `${table} each` },
        itemsGroupB: { icon: '🧺', count: Math.min(factor, 5), label: `${factor} baskets` },
        options: generateOptions(correct, 50),
        correctAnswer: correct,
      });
    }
  }

  return questions;
}
