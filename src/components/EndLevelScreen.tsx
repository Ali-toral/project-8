import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { LEVELS } from '../data/levels';
import { toFarsiNumber } from '../data/money';
import { Confetti } from './Confetti';
import { audio } from '../lib/audio';

export const EndLevelScreen: React.FC = () => {
  const {
    currentLevelId, levelScore, levelCorrect, levelWrong,
    levelHints, setPage, startLevel, progress,
  } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(true);
  const [mounted, setMounted] = useState(false);

  const level = LEVELS.find(l => l.id === currentLevelId);
  const totalQ = levelCorrect + levelWrong;
  const percent = totalQ > 0 ? Math.round((levelCorrect / totalQ) * 100) : 0;
  const nextLevel = LEVELS.find(l => l.id === currentLevelId + 1);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    audio.playWin();
    audio.speak('آفرین قهرمان!');
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (percent >= 90) return 'فوق‌العاده بود! تو قهرمانی! 🏆';
    if (percent >= 70) return 'خیلی خوب بود! آفرین! 🌟';
    if (percent >= 50) return 'خوب بود! ادامه بده! 💪';
    return 'تلاشت عالی بود! بازم تمرین کن! 😊';
  };

  const getStars = () => {
    if (percent >= 90) return 3;
    if (percent >= 60) return 2;
    return 1;
  };

  const getCharacterMood = () => {
    if (percent >= 80) return '🥳';
    if (percent >= 50) return '😊';
    return '🤗';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Confetti active={showConfetti} />

      <div className={`game-card w-full max-w-md p-8 text-center transition-all duration-700
                       ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* Celebration header */}
        <div className="relative mb-4">
          <div className="text-7xl animate-celebrate">{getCharacterMood()}</div>
          <div className="absolute -top-2 right-1/4 text-2xl animate-sparkle">✨</div>
          <div className="absolute -top-1 left-1/4 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>💫</div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          آفرین قهرمان!
        </h1>
        <p className="text-lg text-purple-500 font-bold mb-5">
          {level?.emoji} {level?.title}
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-5">
          {[1, 2, 3].map((s) => (
            <div key={s}
                 className={`text-5xl transition-all duration-500 ${
                   s <= getStars() ? 'animate-bounce-in scale-100' : 'opacity-15 scale-75'
                 }`}
                 style={{ animationDelay: `${s * 0.3}s` }}>
              ⭐
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="bg-gradient-to-l from-purple-50 to-pink-50 rounded-2xl p-4 mb-5 border border-purple-100">
          <p className="text-lg font-black text-purple-700">{getMessage()}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="bg-green-50 rounded-2xl p-3 border border-green-100">
            <div className="text-2xl font-black text-green-600">{toFarsiNumber(levelCorrect)}</div>
            <div className="text-xs text-green-500 font-bold">✅ درست</div>
          </div>
          <div className="bg-red-50 rounded-2xl p-3 border border-red-100">
            <div className="text-2xl font-black text-red-500">{toFarsiNumber(levelWrong)}</div>
            <div className="text-xs text-red-400 font-bold">❌ اشتباه</div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3 border border-yellow-100">
            <div className="text-2xl font-black text-yellow-600">{toFarsiNumber(levelScore)}</div>
            <div className="text-xs text-yellow-500 font-bold">⭐ امتیاز</div>
          </div>
        </div>

        {/* Extra stats */}
        <div className="flex justify-center gap-4 mb-5 text-sm">
          <div className="flex items-center gap-1 text-orange-500 font-bold">
            🔥 بهترین دنباله: {toFarsiNumber(progress.bestCombo)}
          </div>
          <div className="flex items-center gap-1 text-blue-500 font-bold">
            📊 {toFarsiNumber(percent)}٪
          </div>
          <div className="flex items-center gap-1 text-purple-500 font-bold">
            💡 {toFarsiNumber(levelHints)}
          </div>
        </div>

        {/* Encouragement */}
        <div className="bg-gradient-to-l from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6 border border-indigo-100">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl animate-float">🐰</span>
            <p className="text-base font-bold text-indigo-700">
              {percent >= 70
                ? 'تو امروز خیلی خوب تلاش کردی! 🌟'
                : 'امروز بهتر شدی! ادامه بده! 👏'}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {nextLevel && progress.unlockedLevels.includes(nextLevel.id) && (
            <button
              onClick={() => startLevel(nextLevel.id)}
              className="w-full bg-gradient-to-l from-green-400 to-emerald-500 text-white
                         rounded-2xl p-4 font-black text-lg shadow-xl hover:shadow-2xl transition-all
                         transform hover:scale-[1.02] active:scale-[0.98] border border-green-300/30"
            >
              🚀 مرحله بعد: {nextLevel.title}
            </button>
          )}

          <button
            onClick={() => startLevel(currentLevelId)}
            className="w-full bg-gradient-to-l from-blue-400 to-blue-600 text-white
                       rounded-2xl p-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all
                       border border-blue-300/30"
          >
            🔄 تکرار این مرحله
          </button>

          <button
            onClick={() => setPage('map')}
            className="w-full bg-gray-100 text-gray-500
                       rounded-2xl p-3 font-bold text-base hover:bg-gray-200 transition-all"
          >
            🗺️ نقشه مراحل
          </button>
        </div>
      </div>
    </div>
  );
};
