import React, { useState } from 'react';
import { useGameStore } from '../store';
import { toFarsiNumber } from '../data/money';

// Rabbit first — خرگوشک is the star of the game!
const AVATARS = ['🐰', '👦', '👧', '', '', '🐱', '🦊', '🐼', '🦁', '', '🐯', '🦄', '🐶', '', '', '🐹'];

export const ProfilePage: React.FC = () => {
  const { setPage, playerName, playerAvatar, setPlayerName, setPlayerAvatar, progress } = useGameStore();
  const [name, setName] = useState(playerName);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setPlayerName(name || 'دوست من');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setPage('home');
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%)' }}>
      <div className="game-card w-full max-w-md p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setPage('home')}
                  className="text-gray-400 hover:text-gray-600 transition-colors font-bold">
            ← بازگشت
          </button>
          <h1 className="text-2xl font-black text-gray-800">👤 پروفایل</h1>
          <div />
        </div>

        {/* Current avatar display */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-100 to-pink-100
                            rounded-full flex items-center justify-center text-7xl
                            shadow-xl border-4 border-white">
              {playerAvatar}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs
                            rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
              ✏️
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3 font-medium">شکلک خودت را انتخاب کن!</p>
        </div>

        {/* Avatar selection */}
        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2 text-sm">🎭 شکلک</label>
          <div className="grid grid-cols-8 gap-2 bg-gray-50 rounded-2xl p-3">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setPlayerAvatar(avatar)}
                className={`text-3xl p-1.5 rounded-xl transition-all duration-200
                  ${playerAvatar === avatar
                    ? 'bg-purple-200 ring-2 ring-purple-500 scale-110 shadow-md'
                    : 'hover:bg-purple-50 hover:scale-105'}`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2 text-sm">📝 اسم</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمت را بنویس..."
            className="w-full border-2 border-gray-200 rounded-2xl p-4 text-xl font-bold
                       text-center focus:border-purple-400 focus:outline-none focus:ring-4
                       focus:ring-purple-100 transition-all bg-gray-50"
            dir="rtl"
          />
        </div>

        {/* Quick stats */}
        <div className="bg-gradient-to-l from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 border border-purple-100">
          <h3 className="font-bold text-purple-700 mb-2 text-sm">📊 آمار سریع</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-black text-purple-600">{toFarsiNumber(progress.totalScore)}</div>
              <div className="text-[10px] text-purple-400">⭐ امتیاز</div>
            </div>
            <div>
              <div className="text-lg font-black text-purple-600">{toFarsiNumber(progress.completedLevels.length)}</div>
              <div className="text-[10px] text-purple-400">🏆 مراحل</div>
            </div>
            <div>
              <div className="text-lg font-black text-purple-600">{toFarsiNumber(progress.bestCombo)}</div>
              <div className="text-[10px] text-purple-400">🔥 دنباله</div>
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`w-full rounded-2xl p-4 font-black text-lg shadow-xl transition-all
                      transform hover:scale-[1.02] active:scale-[0.98]
                      ${saved
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-l from-purple-500 to-pink-500 text-white hover:shadow-2xl'}`}
        >
          {saved ? '✅ ذخیره شد!' : '✅ ذخیره و بازگشت'}
        </button>
      </div>
    </div>
  );
};
