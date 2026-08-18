import React, { useState } from 'react';
import { getMoneyByValue, toFarsiNumber } from '../data/money';

interface MoneyCardProps {
  value: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  onClick?: () => void;
  selected?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { coin: 'w-12 h-12', bill: 'w-16 h-9', valueText: 'text-[9px]' },
  md: { coin: 'w-16 h-16', bill: 'w-22 h-12', valueText: 'text-[11px]' },
  lg: { coin: 'w-24 h-24', bill: 'w-32 h-[4.5rem]', valueText: 'text-xs' },
  xl: { coin: 'w-32 h-32', bill: 'w-40 h-[5.5rem]', valueText: 'text-sm' },
};

export const MoneyCard: React.FC<MoneyCardProps> = ({
  value,
  size = 'lg',
  showLabel = true,
  onClick,
  selected = false,
  animate = false,
  className = '',
}) => {
  const money = getMoneyByValue(value);
  const isBill = value >= 200;
  const s = sizeMap[size];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showImage = money?.image && !imgError;

  return (
    <div
      onClick={onClick}
      className={`
        coin-card inline-flex flex-col items-center gap-1
        ${selected ? 'scale-110 z-10' : ''}
        ${animate ? 'animate-bounce-in' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
        transition-transform duration-200
      `}
    >
      {/* Image area */}
      <div className="relative flex items-center justify-center">
        {showImage ? (
          <div
            className={`${isBill ? `${s.bill} rounded-lg` : `${s.coin} rounded-full`}
              bg-white border-2 border-black/10 overflow-hidden shadow-md
              ${selected ? 'ring-4 ring-yellow-400 border-yellow-500' : ''}
              transition-all duration-200`}
            style={{ minWidth: isBill ? undefined : undefined }}
          >
            <img
              src={money!.image}
              alt={`${toFarsiNumber(value)} ریال`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              draggable={false}
            />
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                <span className="text-xl">{isBill ? '💵' : '🪙'}</span>
              </div>
            )}
          </div>
        ) : (
          /* Fallback to emoji */
          <div
            className={`${isBill ? `${s.bill} rounded-lg` : `${s.coin} rounded-full`}
              bg-white border-2 border-black/10 shadow-md flex items-center justify-center
              ${selected ? 'ring-4 ring-yellow-400 border-yellow-500' : ''}`}
          >
            <span className={size === 'xl' ? 'text-5xl' : size === 'lg' ? 'text-4xl' : 'text-2xl'}>
              {isBill ? '💵' : '🪙'}
            </span>
          </div>
        )}
      </div>

      {/* Value label */}
      {showLabel && (
        <span
          className={`${s.valueText} font-black text-white bg-black/60 backdrop-blur-sm
            rounded-full px-2.5 py-0.5 whitespace-nowrap shadow-sm`}
        >
          {toFarsiNumber(value)} ریال
        </span>
      )}
    </div>
  );
};
