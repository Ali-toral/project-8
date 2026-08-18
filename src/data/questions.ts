import { Question, QuestionOption, ShopItem } from '../types';
import { toFarsiNumber } from './money';

const SHOP_ITEMS: ShopItem[] = [
  { id: 'pencil', name: 'مداد', emoji: '✏️', price: 50 },
  { id: 'eraser', name: 'پاک‌کن', emoji: '🧽', price: 50 },
  { id: 'notebook', name: 'دفتر', emoji: '📒', price: 100 },
  { id: 'apple', name: 'سیب', emoji: '🍎', price: 100 },
  { id: 'balloon', name: 'بادکنک', emoji: '🎈', price: 5 },
  { id: 'toy', name: 'اسباب‌بازی', emoji: '🧸', price: 200 },
  { id: 'flower', name: 'گل', emoji: '🌷', price: 100 },
  { id: 'candy', name: 'آب‌نبات', emoji: '🍬', price: 2 },
  { id: 'sticker', name: 'برچسب', emoji: '⭐', price: 5 },
  { id: 'ruler', name: 'خط‌کش', emoji: '📏', price: 50 },
  { id: 'color_pencil', name: 'مداد رنگی', emoji: '🖍️', price: 200 },
  { id: 'book', name: 'کتاب', emoji: '📚', price: 250 },
];

let questionIdCounter = 0;
function nextId(): string {
  return `q_${++questionIdCounter}`;
}

function makeOption(text: string, isCorrect: boolean, emoji?: string): QuestionOption {
  return { id: `opt_${Math.random().toString(36).substr(2, 6)}`, text, isCorrect, emoji };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Helper to pick random items (used in dynamic question generation)
function _pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}
void _pickRandom;

// ===== LEVEL 1: Recognize money =====
function generateLevel1Questions(): Question[] {
  const questions: Question[] = [];

  // Q1: Identify 1 rial coin
  const q1opts = shuffle([
    makeOption(`${toFarsiNumber(1)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(2)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 1,
    skillCategory: 'money_recognition',
    storyText: 'پولی یک سکه پیدا کرده! 🪙',
    questionText: 'این چند ریال است؟',
    moneyShown: [1],
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: 'به عدد روی سکه نگاه کن! 👀',
    hint2: 'این کوچک‌ترین سکه است.',
    hint3: `جواب: ${toFarsiNumber(1)} ریال`,
  });

  // Q2: Identify 2 rial
  const q2opts = shuffle([
    makeOption(`${toFarsiNumber(2)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(1)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 1,
    skillCategory: 'money_recognition',
    storyText: 'پولی یک سکه نقره‌ای دارد! 🥈',
    questionText: 'این چند ریال است؟',
    moneyShown: [2],
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: 'این سکه نقره‌ای رنگ است.',
    hint2: 'بزرگ‌تر از ۱ ریال و کوچک‌تر از ۵ ریال.',
    hint3: `جواب: ${toFarsiNumber(2)} ریال`,
  });

  // Q3: Identify 5 rial
  const q3opts = shuffle([
    makeOption(`${toFarsiNumber(5)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(2)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(1)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 1,
    skillCategory: 'money_recognition',
    storyText: 'این سکه طلایی رنگ است! ✨',
    questionText: 'این چند ریال است؟',
    moneyShown: [5],
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: 'رنگ طلایی دارد. 🌟',
    hint2: 'بزرگ‌ترین سکه کوچک است.',
    hint3: `جواب: ${toFarsiNumber(5)} ریال`,
  });

  // Q4: Identify 50 rial
  const q4opts = shuffle([
    makeOption(`${toFarsiNumber(50)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(100)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 2,
    skillCategory: 'money_recognition',
    storyText: 'پولی یک سکه بزرگ دارد! 😮',
    questionText: 'این چند ریال است؟',
    moneyShown: [50],
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: 'عدد ۵۰ روی آن نوشته شده.',
    hint2: 'از ۵ ریال بزرگ‌تر است.',
    hint3: `جواب: ${toFarsiNumber(50)} ریال`,
  });

  // Q5: Identify 100 rial
  const q5opts = shuffle([
    makeOption(`${toFarsiNumber(100)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(200)} ریال`, false, '💵'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 2,
    skillCategory: 'money_recognition',
    storyText: 'این سکه خیلی ارزشمند است! 💰',
    questionText: 'این چند ریال است؟',
    moneyShown: [100],
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: 'عدد ۱۰۰ روی آن نوشته شده.',
    hint2: 'از ۵۰ ریال بیشتر ارزش دارد.',
    hint3: `جواب: ${toFarsiNumber(100)} ریال`,
  });

  // Q6: Identify 200 rial bill
  const q6opts = shuffle([
    makeOption(`${toFarsiNumber(200)} ریال`, true, '💵'),
    makeOption(`${toFarsiNumber(100)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 1, difficulty: 2,
    skillCategory: 'money_recognition',
    storyText: 'پولی یک اسکناس دارد! 💵',
    questionText: 'این چند ریال است؟',
    moneyShown: [200],
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: 'این سکه نیست، اسکناس است! 💵',
    hint2: 'بزرگ‌ترین پول ماست.',
    hint3: `جواب: ${toFarsiNumber(200)} ریال`,
  });

  return questions;
}

// ===== LEVEL 2: Find matching money =====
function generateLevel2Questions(): Question[] {
  const questions: Question[] = [];

  // Q1: Find 2 rial among coins
  const q1opts = shuffle([
    makeOption(`${toFarsiNumber(2)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(1)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 1,
    skillCategory: 'number_to_money',
    storyText: 'پولی دنبال ۲ ریال می‌گردد! 🧐',
    questionText: `سکه ${toFarsiNumber(2)} ریال را پیدا کن!`,
    targetAmount: 2,
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: 'دنبال عدد ۲ بگرد! 🔍',
    hint2: 'سکه نقره‌ای رنگ است.',
  });

  // Q2: Find 5 rial
  const q2opts = shuffle([
    makeOption(`${toFarsiNumber(5)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(2)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 1,
    skillCategory: 'number_to_money',
    storyText: 'پولی ۵ ریال لازم دارد! 🪙',
    questionText: `سکه ${toFarsiNumber(5)} ریال را پیدا کن!`,
    targetAmount: 5,
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: 'دنبال عدد ۵ بگرد! 🔍',
  });

  // Q3: Find 50 rial
  const q3opts = shuffle([
    makeOption(`${toFarsiNumber(50)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(100)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 2,
    skillCategory: 'number_to_money',
    storyText: 'کمک کن! پولی ۵۰ ریال می‌خواد! 😊',
    questionText: `سکه ${toFarsiNumber(50)} ریال کدام است؟`,
    targetAmount: 50,
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: 'عدد ۵۰ را پیدا کن!',
  });

  // Q4: Find 100 rial
  const q4opts = shuffle([
    makeOption(`${toFarsiNumber(100)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(200)} ریال`, false, '💵'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 2,
    skillCategory: 'number_to_money',
    storyText: 'پولی به ۱۰۰ ریال نیاز دارد! 💰',
    questionText: `${toFarsiNumber(100)} ریال را پیدا کن!`,
    targetAmount: 100,
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: 'دنبال عدد ۱۰۰ بگرد!',
  });

  // Q5: Find 200 rial
  const q5opts = shuffle([
    makeOption(`${toFarsiNumber(200)} ریال`, true, '💵'),
    makeOption(`${toFarsiNumber(100)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 2,
    skillCategory: 'number_to_money',
    storyText: 'اسکناس ۲۰۰ ریالی کجاست؟ 🤔',
    questionText: `${toFarsiNumber(200)} ریال را پیدا کن!`,
    targetAmount: 200,
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: 'این اسکناس است، نه سکه! 💵',
  });

  // Q6: Find 1 rial
  const q6opts = shuffle([
    makeOption(`${toFarsiNumber(1)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(2)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(5)} ریال`, false, '🪙'),
  ]);
  questions.push({
    id: nextId(), type: 'find_money', levelId: 2, difficulty: 1,
    skillCategory: 'number_to_money',
    storyText: 'کوچک‌ترین سکه کجاست؟ 🧐',
    questionText: `سکه ${toFarsiNumber(1)} ریال را پیدا کن!`,
    targetAmount: 1,
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: 'کوچک‌ترین عدد را پیدا کن!',
  });

  return questions;
}

// ===== LEVEL 3: Number ↔ Money =====
function generateLevel3Questions(): Question[] {
  const questions: Question[] = [];

  // Build amount: 7 rial
  const q1opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(5)} + 🪙 ${toFarsiNumber(2)}`, true),
    makeOption(`🪙 ${toFarsiNumber(5)} + 🪙 ${toFarsiNumber(5)}`, false),
    makeOption(`🪙 ${toFarsiNumber(1)} + 🪙 ${toFarsiNumber(2)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'build_amount', levelId: 3, difficulty: 2,
    skillCategory: 'money_to_number',
    storyText: `پولی ${toFarsiNumber(7)} ریال می‌خواهد. 🤔`,
    questionText: `کدام پول‌ها ${toFarsiNumber(7)} ریال می‌شوند؟`,
    targetAmount: 7,
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(5)} به‌علاوه ${toFarsiNumber(2)} چند می‌شود؟`,
    hint2: `${toFarsiNumber(5)} + ${toFarsiNumber(2)} = ${toFarsiNumber(7)}`,
  });

  // Build amount: 6 rial
  const q2opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(5)} + 🪙 ${toFarsiNumber(1)}`, true),
    makeOption(`🪙 ${toFarsiNumber(2)} + 🪙 ${toFarsiNumber(2)}`, false),
    makeOption(`🪙 ${toFarsiNumber(5)} + 🪙 ${toFarsiNumber(5)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'build_amount', levelId: 3, difficulty: 2,
    skillCategory: 'money_to_number',
    storyText: `دوست پولی ${toFarsiNumber(6)} ریال لازم دارد! 😊`,
    questionText: `کدام پول‌ها ${toFarsiNumber(6)} ریال می‌شوند؟`,
    targetAmount: 6,
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(5)} به‌علاوه ${toFarsiNumber(1)} چند می‌شود؟`,
  });

  // Build amount: 3 rial
  const q3opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(2)} + 🪙 ${toFarsiNumber(1)}`, true),
    makeOption(`🪙 ${toFarsiNumber(1)} + 🪙 ${toFarsiNumber(1)}`, false),
    makeOption(`🪙 ${toFarsiNumber(5)} + 🪙 ${toFarsiNumber(1)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'build_amount', levelId: 3, difficulty: 1,
    skillCategory: 'money_to_number',
    storyText: `پولی ${toFarsiNumber(3)} ریال لازم دارد! 🪙`,
    questionText: `کدام پول‌ها ${toFarsiNumber(3)} ریال می‌شوند؟`,
    targetAmount: 3,
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(2)} به‌علاوه ${toFarsiNumber(1)} چند می‌شود؟`,
  });

  // Sum: 2+5 = ?
  const q4opts = shuffle([
    makeOption(`${toFarsiNumber(7)} ریال`, true),
    makeOption(`${toFarsiNumber(6)} ریال`, false),
    makeOption(`${toFarsiNumber(8)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 3, difficulty: 2,
    skillCategory: 'money_addition_small',
    storyText: 'پولی دو سکه دارد! 🪙🪙',
    questionText: `🪙 ${toFarsiNumber(2)} ریال + 🪙 ${toFarsiNumber(5)} ریال = چند ریال؟`,
    moneyShown: [2, 5],
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: `اول ${toFarsiNumber(2)} را پیدا کن. 👀`,
    hint2: `حالا ${toFarsiNumber(5)} را اضافه کن!`,
    hint3: `${toFarsiNumber(2)} + ${toFarsiNumber(5)} = ${toFarsiNumber(7)}`,
  });

  // Sum: 1+5 = ?
  const q5opts = shuffle([
    makeOption(`${toFarsiNumber(6)} ریال`, true),
    makeOption(`${toFarsiNumber(5)} ریال`, false),
    makeOption(`${toFarsiNumber(7)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 3, difficulty: 2,
    skillCategory: 'money_addition_small',
    storyText: 'سکه‌ها را با هم جمع کن! ➕',
    questionText: `🪙 ${toFarsiNumber(1)} ریال + 🪙 ${toFarsiNumber(5)} ریال = چند ریال؟`,
    moneyShown: [1, 5],
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(1)} + ${toFarsiNumber(5)} = ؟`,
  });

  // Sum: 2+2 = ?
  const q6opts = shuffle([
    makeOption(`${toFarsiNumber(4)} ریال`, true),
    makeOption(`${toFarsiNumber(3)} ریال`, false),
    makeOption(`${toFarsiNumber(5)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 3, difficulty: 1,
    skillCategory: 'money_addition_small',
    storyText: 'دو سکه شبیه هم! 🪙🪙',
    questionText: `🪙 ${toFarsiNumber(2)} ریال + 🪙 ${toFarsiNumber(2)} ریال = چند ریال؟`,
    moneyShown: [2, 2],
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(2)} + ${toFarsiNumber(2)} = ؟`,
  });

  return questions;
}

// ===== LEVEL 4: Adding money =====
function generateLevel4Questions(): Question[] {
  const questions: Question[] = [];

  const addPairs: [number, number, number][] = [
    [1, 5, 6],
    [2, 5, 7],
    [5, 5, 10],
    [1, 2, 3],
    [2, 2, 4],
    [1, 1, 2],
    [5, 2, 7],
  ];

  addPairs.forEach(([a, b, sum], i) => {
    const wrongOptions = [sum - 1, sum + 1].filter(v => v > 0 && v !== sum);
    const opts = shuffle([
      makeOption(`${toFarsiNumber(sum)} ریال`, true),
      ...wrongOptions.map(w => makeOption(`${toFarsiNumber(w)} ریال`, false)),
    ]);
    questions.push({
      id: nextId(), type: 'sum_money', levelId: 4, difficulty: 2,
      skillCategory: 'money_addition_small',
      storyText: i % 2 === 0 ? 'پول‌ها را با هم جمع کن! ➕' : 'چند ریال داری؟ 🤔',
      questionText: `🪙 ${toFarsiNumber(a)} ریال + 🪙 ${toFarsiNumber(b)} ریال = چند ریال؟`,
      moneyShown: [a, b],
      options: opts,
      correctAnswerId: opts.find(o => o.isCorrect)!.id,
      hint1: `اول ${toFarsiNumber(a)} را بشمار! 👀`,
      hint2: `حالا ${toFarsiNumber(b)} تا اضافه کن!`,
      hint3: `${toFarsiNumber(a)} + ${toFarsiNumber(b)} = ${toFarsiNumber(sum)}`,
    });
  });

  return questions;
}

// ===== LEVEL 5: Bigger money =====
function generateLevel5Questions(): Question[] {
  const questions: Question[] = [];

  // Identify big money
  const q1opts = shuffle([
    makeOption(`${toFarsiNumber(100)} ریال`, true, '🪙'),
    makeOption(`${toFarsiNumber(50)} ریال`, false, '🪙'),
    makeOption(`${toFarsiNumber(200)} ریال`, false, '💵'),
  ]);
  questions.push({
    id: nextId(), type: 'identify_money', levelId: 5, difficulty: 2,
    skillCategory: 'value_recognition',
    storyText: 'پولی یک سکه بزرگ پیدا کرده! 🤩',
    questionText: 'این چند ریال است؟',
    moneyShown: [100],
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: 'به عدد روی سکه نگاه کن!',
  });

  // Sum: 50 + 50
  const q2opts = shuffle([
    makeOption(`${toFarsiNumber(100)} ریال`, true),
    makeOption(`${toFarsiNumber(50)} ریال`, false),
    makeOption(`${toFarsiNumber(150)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 5, difficulty: 3,
    skillCategory: 'money_addition_large',
    storyText: 'دو سکه ۵۰ ریالی! 🪙🪙',
    questionText: `🪙 ${toFarsiNumber(50)} ریال + 🪙 ${toFarsiNumber(50)} ریال = چند ریال؟`,
    moneyShown: [50, 50],
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(50)} + ${toFarsiNumber(50)} = ؟`,
    hint2: `مثل ${toFarsiNumber(5)} + ${toFarsiNumber(5)} = ${toFarsiNumber(10)}`,
  });

  // Sum: 100 + 50
  const q3opts = shuffle([
    makeOption(`${toFarsiNumber(150)} ریال`, true),
    makeOption(`${toFarsiNumber(100)} ریال`, false),
    makeOption(`${toFarsiNumber(200)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 5, difficulty: 3,
    skillCategory: 'money_addition_large',
    storyText: 'پول‌ها را بشمار! 💰',
    questionText: `🪙 ${toFarsiNumber(100)} ریال + 🪙 ${toFarsiNumber(50)} ریال = چند ریال؟`,
    moneyShown: [100, 50],
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: `اول ${toFarsiNumber(100)} تا داری.`,
    hint2: `${toFarsiNumber(50)} تا اضافه کن!`,
  });

  // Sum: 200 + 50
  const q4opts = shuffle([
    makeOption(`${toFarsiNumber(250)} ریال`, true),
    makeOption(`${toFarsiNumber(150)} ریال`, false),
    makeOption(`${toFarsiNumber(300)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 5, difficulty: 3,
    skillCategory: 'money_addition_large',
    storyText: 'اسکناس و سکه! 💵🪙',
    questionText: `💵 ${toFarsiNumber(200)} ریال + 🪙 ${toFarsiNumber(50)} ریال = چند ریال؟`,
    moneyShown: [200, 50],
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(200)} + ${toFarsiNumber(50)} = ؟`,
  });

  // Wallet: 200 + 50
  const q5opts = shuffle([
    makeOption(`${toFarsiNumber(250)} ریال`, true),
    makeOption(`${toFarsiNumber(200)} ریال`, false),
    makeOption(`${toFarsiNumber(300)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'wallet_total', levelId: 5, difficulty: 3,
    skillCategory: 'money_addition_large',
    storyText: 'کیف پول پولی را ببین! 👛',
    questionText: 'در کیف پول چند ریال داری؟',
    moneyShown: [200, 50],
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: 'هر پول داخل کیف را جمع کن!',
  });

  // Sum: 100 + 100
  const q6opts = shuffle([
    makeOption(`${toFarsiNumber(200)} ریال`, true),
    makeOption(`${toFarsiNumber(100)} ریال`, false),
    makeOption(`${toFarsiNumber(150)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'sum_money', levelId: 5, difficulty: 3,
    skillCategory: 'money_addition_large',
    storyText: 'دو سکه ۱۰۰ ریالی! 🪙🪙',
    questionText: `🪙 ${toFarsiNumber(100)} ریال + 🪙 ${toFarsiNumber(100)} ریال = چند ریال؟`,
    moneyShown: [100, 100],
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(100)} + ${toFarsiNumber(100)} = ؟`,
  });

  // Wallet: 100 + 50 + 50
  const q7opts = shuffle([
    makeOption(`${toFarsiNumber(200)} ریال`, true),
    makeOption(`${toFarsiNumber(150)} ریال`, false),
    makeOption(`${toFarsiNumber(250)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'wallet_total', levelId: 5, difficulty: 4,
    skillCategory: 'money_addition_large',
    storyText: 'کیف پول پر شده! 👛✨',
    questionText: 'در کیف پول چند ریال داری؟',
    moneyShown: [100, 50, 50],
    options: q7opts,
    correctAnswerId: q7opts.find(o => o.isCorrect)!.id,
    hint1: 'اول دو تا ۵۰ ریال را جمع کن!',
    hint2: 'حالا ۱۰۰ ریال اضافه کن!',
  });

  return questions;
}

// ===== LEVEL 6: Shopping basics =====
function generateLevel6Questions(): Question[] {
  const questions: Question[] = [];

  // Item price reading
  const q1opts = shuffle([
    makeOption(`${toFarsiNumber(50)} ریال`, true),
    makeOption(`${toFarsiNumber(20)} ریال`, false),
    makeOption(`${toFarsiNumber(100)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'item_price', levelId: 6, difficulty: 2,
    skillCategory: 'shopping',
    storyText: 'پاک‌کن چقدر است؟ 🧽',
    questionText: 'قیمت پاک‌کن چند ریال است؟',
    itemEmoji: '🧽', itemName: 'پاک‌کن',
    targetAmount: 50,
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: 'به عدد زیر پاک‌کن نگاه کن!',
  });

  // Pay exact
  const q2opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(50)} ریال`, true),
    makeOption(`🪙 ${toFarsiNumber(100)} ریال`, false),
    makeOption(`🪙 ${toFarsiNumber(5)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pay_exact', levelId: 6, difficulty: 2,
    skillCategory: 'payment',
    storyText: `پولی می‌خواهد یک پاک‌کن بخرد! 🧽`,
    questionText: `قیمت: ${toFarsiNumber(50)} ریال\nبا کدام پول می‌توانی بخری؟`,
    itemEmoji: '🧽', itemName: 'پاک‌کن',
    targetAmount: 50,
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: 'پولی که مقدارش با قیمت برابر باشد!',
  });

  // Pay for notebook
  const q3opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(100)} ریال`, true),
    makeOption(`🪙 ${toFarsiNumber(50)} ریال`, false),
    makeOption(`💵 ${toFarsiNumber(200)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pay_exact', levelId: 6, difficulty: 2,
    skillCategory: 'payment',
    storyText: `سارا یک دفتر می‌خواهد! 📒`,
    questionText: `قیمت دفتر: ${toFarsiNumber(100)} ریال\nکدام پول مناسب است؟`,
    itemEmoji: '📒', itemName: 'دفتر',
    targetAmount: 100,
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: 'دنبال ۱۰۰ ریال بگرد!',
  });

  // Pay with combination for 7 rial balloon?
  // Pay for balloon (5 rial)
  const q4opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(5)} ریال`, true),
    makeOption(`🪙 ${toFarsiNumber(2)} ریال`, false),
    makeOption(`🪙 ${toFarsiNumber(1)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pay_exact', levelId: 6, difficulty: 1,
    skillCategory: 'payment',
    storyText: `علی یک بادکنک می‌خواهد! 🎈`,
    questionText: `قیمت بادکنک: ${toFarsiNumber(5)} ریال\nکدام سکه مناسب است؟`,
    itemEmoji: '🎈', itemName: 'بادکنک',
    targetAmount: 5,
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: 'بادکنک ۵ ریال است. کدام سکه ۵ ریال است؟',
  });

  // Pick payment combination: 250 rial
  const q5opts = shuffle([
    makeOption(`💵 ${toFarsiNumber(200)} + 🪙 ${toFarsiNumber(50)}`, true),
    makeOption(`🪙 ${toFarsiNumber(100)} + 🪙 ${toFarsiNumber(50)}`, false),
    makeOption(`💵 ${toFarsiNumber(200)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pick_payment', levelId: 6, difficulty: 3,
    skillCategory: 'payment',
    storyText: `علی یک کتاب می‌خواهد! 📚`,
    questionText: `قیمت کتاب: ${toFarsiNumber(250)} ریال\nکدام پول‌ها کافی هستند؟`,
    itemEmoji: '📚', itemName: 'کتاب',
    targetAmount: 250,
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(200)} + ${toFarsiNumber(50)} = ؟`,
    hint2: `${toFarsiNumber(200)} + ${toFarsiNumber(50)} = ${toFarsiNumber(250)}`,
  });

  // Buy flower
  const q6opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(100)} ریال`, true),
    makeOption(`🪙 ${toFarsiNumber(50)} ریال`, false),
    makeOption(`💵 ${toFarsiNumber(200)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'buy_item', levelId: 6, difficulty: 2,
    skillCategory: 'shopping',
    storyText: `سارا یک گل می‌خواهد! 🌷`,
    questionText: `قیمت گل: ${toFarsiNumber(100)} ریال\nکدام پول مناسب است؟`,
    itemEmoji: '🌷', itemName: 'گل',
    targetAmount: 100,
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: 'گل ۱۰۰ ریال است!',
  });

  // Story: two items
  const q7opts = shuffle([
    makeOption(`${toFarsiNumber(150)} ریال`, true),
    makeOption(`${toFarsiNumber(100)} ریال`, false),
    makeOption(`${toFarsiNumber(200)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'buy_multiple', levelId: 6, difficulty: 3,
    skillCategory: 'shopping',
    storyText: `پولی مداد و پاک‌کن می‌خواهد! ✏️🧽`,
    questionText: `مداد: ${toFarsiNumber(100)} ریال\nپاک‌کن: ${toFarsiNumber(50)} ریال\nبرای هر دو چقدر لازم است؟`,
    targetAmount: 150,
    moneyShown: [100, 50],
    options: q7opts,
    correctAnswerId: q7opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(100)} + ${toFarsiNumber(50)} = ؟`,
  });

  return questions;
}

// ===== LEVEL 7: Big shopping =====
function generateLevel7Questions(): Question[] {
  const questions: Question[] = [];

  // Story problem 1
  const q1opts = shuffle([
    makeOption(`${toFarsiNumber(7)} ریال`, true),
    makeOption(`${toFarsiNumber(5)} ریال`, false),
    makeOption(`${toFarsiNumber(3)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'story_problem', levelId: 7, difficulty: 3,
    skillCategory: 'money_addition_small',
    storyText: `پولی ${toFarsiNumber(2)} ریال دارد. 🪙\nدوستش ${toFarsiNumber(5)} ریال داد.`,
    questionText: 'حالا چند ریال دارد؟',
    moneyShown: [2, 5],
    options: q1opts,
    correctAnswerId: q1opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(2)} + ${toFarsiNumber(5)} = ؟`,
  });

  // Story: buy pencil 250 rial
  const q2opts = shuffle([
    makeOption(`💵 ${toFarsiNumber(200)} + 🪙 ${toFarsiNumber(50)}`, true),
    makeOption(`🪙 ${toFarsiNumber(100)} + 🪙 ${toFarsiNumber(100)}`, false),
    makeOption(`💵 ${toFarsiNumber(200)} + 🪙 ${toFarsiNumber(100)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pick_payment', levelId: 7, difficulty: 4,
    skillCategory: 'payment',
    storyText: `علی یک مداد رنگی می‌خواهد! 🖍️\nقیمت: ${toFarsiNumber(250)} ریال`,
    questionText: 'کدام پول‌ها کافی هستند؟',
    targetAmount: 250,
    options: q2opts,
    correctAnswerId: q2opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(200)} + ${toFarsiNumber(50)} = ؟`,
  });

  // Buy toy 200 rial
  const q3opts = shuffle([
    makeOption(`💵 ${toFarsiNumber(200)} ریال`, true),
    makeOption(`🪙 ${toFarsiNumber(100)} ریال`, false),
    makeOption(`🪙 ${toFarsiNumber(50)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'buy_item', levelId: 7, difficulty: 3,
    skillCategory: 'shopping',
    storyText: `پولی یک اسباب‌بازی می‌خواهد! 🧸\nقیمت: ${toFarsiNumber(200)} ریال`,
    questionText: 'کدام پول مناسب است؟',
    itemEmoji: '🧸', itemName: 'اسباب‌بازی',
    targetAmount: 200,
    options: q3opts,
    correctAnswerId: q3opts.find(o => o.isCorrect)!.id,
    hint1: 'اسباب‌بازی ۲۰۰ ریال است. اسکناس ۲۰۰ ریال!',
  });

  // Wallet count: 200 + 100 + 50
  const q4opts = shuffle([
    makeOption(`${toFarsiNumber(350)} ریال`, true),
    makeOption(`${toFarsiNumber(300)} ریال`, false),
    makeOption(`${toFarsiNumber(250)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'wallet_total', levelId: 7, difficulty: 4,
    skillCategory: 'money_addition_large',
    storyText: 'کیف پول پولی پر شده! 👛💰',
    questionText: 'در کیف پول چند ریال داری؟',
    moneyShown: [200, 100, 50],
    options: q4opts,
    correctAnswerId: q4opts.find(o => o.isCorrect)!.id,
    hint1: `اول ${toFarsiNumber(200)} + ${toFarsiNumber(100)} = ${toFarsiNumber(300)}`,
    hint2: `حالا ${toFarsiNumber(300)} + ${toFarsiNumber(50)} = ؟`,
  });

  // Buy 2 items
  const q5opts = shuffle([
    makeOption(`${toFarsiNumber(200)} ریال`, true),
    makeOption(`${toFarsiNumber(150)} ریال`, false),
    makeOption(`${toFarsiNumber(250)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'buy_multiple', levelId: 7, difficulty: 4,
    skillCategory: 'shopping',
    storyText: `سارا سیب و دفتر می‌خواهد! 🍎📒`,
    questionText: `سیب: ${toFarsiNumber(100)} ریال\nدفتر: ${toFarsiNumber(100)} ریال\nجمع قیمت‌ها چقدر است؟`,
    targetAmount: 200,
    options: q5opts,
    correctAnswerId: q5opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(100)} + ${toFarsiNumber(100)} = ؟`,
  });

  // Pay combination
  const q6opts = shuffle([
    makeOption(`🪙 ${toFarsiNumber(100)} + 🪙 ${toFarsiNumber(50)}`, true),
    makeOption(`🪙 ${toFarsiNumber(50)} + 🪙 ${toFarsiNumber(50)}`, false),
    makeOption(`💵 ${toFarsiNumber(200)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pick_payment', levelId: 7, difficulty: 3,
    skillCategory: 'payment',
    storyText: `خرید خط‌کش! 📏\nقیمت: ${toFarsiNumber(150)} ریال`,
    questionText: 'کدام پول‌ها درست هستند؟',
    targetAmount: 150,
    options: q6opts,
    correctAnswerId: q6opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(100)} + ${toFarsiNumber(50)} = ${toFarsiNumber(150)}`,
  });

  // Final challenge: shopping mission
  const q7opts = shuffle([
    makeOption(`${toFarsiNumber(300)} ریال`, true),
    makeOption(`${toFarsiNumber(250)} ریال`, false),
    makeOption(`${toFarsiNumber(350)} ریال`, false),
  ]);
  questions.push({
    id: nextId(), type: 'story_problem', levelId: 7, difficulty: 5,
    skillCategory: 'shopping',
    storyText: `مأموریت نهایی! 🏆\nپولی می‌خواهد مداد رنگی و دفتر بخرد!`,
    questionText: `مداد رنگی: ${toFarsiNumber(200)} ریال\nدفتر: ${toFarsiNumber(100)} ریال\nجمع کل چقدر است؟`,
    targetAmount: 300,
    options: q7opts,
    correctAnswerId: q7opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(200)} + ${toFarsiNumber(100)} = ؟`,
    hint2: `جواب: ${toFarsiNumber(300)} ریال`,
  });

  // Final: pick money for 300
  const q8opts = shuffle([
    makeOption(`💵 ${toFarsiNumber(200)} + 🪙 ${toFarsiNumber(100)}`, true),
    makeOption(`🪙 ${toFarsiNumber(100)} + 🪙 ${toFarsiNumber(100)}`, false),
    makeOption(`💵 ${toFarsiNumber(200)} + 🪙 ${toFarsiNumber(50)}`, false),
  ]);
  questions.push({
    id: nextId(), type: 'pick_payment', levelId: 7, difficulty: 5,
    skillCategory: 'payment',
    storyText: `پرداخت نهایی! 💰\nمبلغ: ${toFarsiNumber(300)} ریال`,
    questionText: 'کدام پول‌ها را باید بدهی؟',
    targetAmount: 300,
    options: q8opts,
    correctAnswerId: q8opts.find(o => o.isCorrect)!.id,
    hint1: `${toFarsiNumber(200)} + ${toFarsiNumber(100)} = ${toFarsiNumber(300)} ✅`,
  });

  return questions;
}

export function getQuestionsForLevel(levelId: number): Question[] {
  questionIdCounter = levelId * 100; // Reset counter per level
  switch (levelId) {
    case 1: return generateLevel1Questions();
    case 2: return generateLevel2Questions();
    case 3: return generateLevel3Questions();
    case 4: return generateLevel4Questions();
    case 5: return generateLevel5Questions();
    case 6: return generateLevel6Questions();
    case 7: return generateLevel7Questions();
    default: return generateLevel1Questions();
  }
}

export { SHOP_ITEMS };
