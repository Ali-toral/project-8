import { Money } from '../types';

export const MONEY_LIST: Money[] = [
  {
    id: 'coin_1',
    value: 1,
    type: 'coin',
    emoji: '🪙',
    label: '۱ ریال',
    color: '#CD7F32',
    bgColor: '#FFF3E0',
    image: '/money/coin-1.png',
  },
  {
    id: 'coin_2',
    value: 2,
    type: 'coin',
    emoji: '🪙',
    label: '۲ ریال',
    color: '#C0C0C0',
    bgColor: '#F5F5F5',
    image: '/money/coin-2.png',
  },
  {
    id: 'coin_5',
    value: 5,
    type: 'coin',
    emoji: '🪙',
    label: '۵ ریال',
    color: '#FFD700',
    bgColor: '#FFFDE7',
    image: '/money/coin-5.png',
  },
  {
    id: 'coin_50',
    value: 50,
    type: 'coin',
    emoji: '🪙',
    label: '۵۰ ریال',
    color: '#B8860B',
    bgColor: '#FFF8E1',
    image: '/money/coin-50.png',
  },
  {
    id: 'coin_100',
    value: 100,
    type: 'coin',
    emoji: '🪙',
    label: '۱۰۰ ریال',
    color: '#DAA520',
    bgColor: '#FFF9C4',
    image: '/money/coin-100.png',
  },
  {
    id: 'bill_200',
    value: 200,
    type: 'bill',
    emoji: '💵',
    label: '۲۰۰ ریال',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    image: '/money/bill-200.png',
  },
];

export function getMoneyByValue(value: number): Money | undefined {
  return MONEY_LIST.find(m => m.value === value);
}

export function toFarsiNumber(n: number): string {
  const farsiDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return n.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
}

export function getMoneyEmoji(value: number): string {
  const m = getMoneyByValue(value);
  return m ? m.emoji : '💰';
}
