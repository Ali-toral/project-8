// Money types
export interface Money {
  id: string;
  value: number;
  type: 'coin' | 'bill';
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
  image?: string;
}

// Question types
export type QuestionType =
  | 'identify_money'       // Show image, ask value
  | 'find_money'           // Show value, pick image
  | 'classify_money'       // Sort money into groups
  | 'build_amount'         // Build a specific amount from coins
  | 'sum_money'            // Add two+ coins
  | 'wallet_total'         // Count wallet contents
  | 'item_price'           // Read price of item
  | 'pay_exact'            // Pay exact amount
  | 'pick_payment'         // Pick correct combination
  | 'buy_item'             // Full shopping experience
  | 'buy_multiple'         // Buy multiple items
  | 'story_problem';       // Story-based problem

export interface QuestionOption {
  id: string;
  text: string;
  moneyValues?: number[];
  isCorrect: boolean;
  emoji?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  storyText: string;
  questionText: string;
  options: QuestionOption[];
  correctAnswerId: string;
  difficulty: number; // 1-5
  hint1?: string;
  hint2?: string;
  hint3?: string;
  moneyShown?: number[];
  targetAmount?: number;
  itemEmoji?: string;
  itemName?: string;
  levelId: number;
  skillCategory: SkillCategory;
}

export type SkillCategory =
  | 'money_recognition'
  | 'value_recognition'
  | 'number_to_money'
  | 'money_to_number'
  | 'money_addition_small'
  | 'money_addition_large'
  | 'payment'
  | 'shopping';

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  difficulty: string;
  stars: number;
  color: string;
  bgGradient: string;
  requiredLevel: number; // previous level needed
  questionsCount: number;
}

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export interface PlayerProgress {
  currentLevel: number;
  completedLevels: number[];
  totalScore: number;
  bestCombo: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  hintsUsed: number;
  playTime: number; // in seconds
  skillScores: Record<SkillCategory, number>;
  skillAttempts: Record<SkillCategory, number>;
  shoppingCart: ShopItem[];
  unlockedLevels: number[];
  lastPlayDate: string;
}

export interface GameSettings {
  calmMode: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  currency: string;
  volume: number;
}

export type Page = 'home' | 'map' | 'game' | 'report' | 'settings' | 'profile' | 'endLevel';
