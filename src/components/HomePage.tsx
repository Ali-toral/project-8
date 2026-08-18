import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { toFarsiNumber } from '../data/money';

const FloatingEmoji: React.FC<{ emoji: string; style: React.CSSProperties }> = ({ emoji, style }) => (
  <div className="absolute text-3xl animate-float opacity-20 pointer-events-none select-none" style={style}>
    {emoji}
  </div>
);

export const HomePage: React.FC = () => {
  const { setPage, playerName, playerAvatar, progress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const floatingItems = [
    { emoji: '🪙', style: { top: '8%', left: '8%', animationDelay: '0s' } },
    { emoji: '💵', style: { top: '15%', right: '12%', animationDelay: '1s' } },
    { emoji: '⭐', style: { bottom: '25%', left: '10%', animationDelay: '0.5s' } },
    { emoji: '🛍️', style: { bottom: '15%', right: '8%', animationDelay: '1.5s' } },
    { emoji: '🎈', style: { top: '40%', left: '5%', animationDelay: '2s' } },
    { emoji: '🌟', style: { top: '60%', right: '5%', animationDelay: '0.8s' } },
    { emoji: '🎁', style: { bottom: '40%', left: '85%', animationDelay: '1.2s' } },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>

      {/* Floating decorations */}
      {floatingItems.map((item, i) => (
        <FloatingEmoji key={i} emoji={item.emoji} style={item.style} />
      ))}

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Title */}
      <div className={`text-center mb-8 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="relative inline-block">
          <div className="text-8xl mb-4 animate-float filter drop-shadow-lg">🛒</div>
          <div className="absolute -top-2 -right-4 text-2xl animate-sparkle">✨</div>
          <div className="absolute -bottom-1 -left-4 text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>💫</div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl mb-3"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          فروشگاه رنگارنگ من
        </h1>
        <p className="text-xl md:text-2xl text-purple-100 font-bold">
          بازی آموزشی پول و خرید 💰
        </p>
      </div>

      {/* Character greeting */}
      <div className={`mb-10 text-center transition-all duration-700 delay-200
                       ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="inline-flex items-center gap-4 bg-white/15 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl border border-white/20">
          <div className="text-4xl animate-float" style={{ animationDuration: '2.5s' }}>{playerAvatar}</div>
          <div className="text-right">
            <span className="text-lg text-white font-black block">سلام {playerName}! 👋</span>
            <span className="text-sm text-purple-100">
              {progress.totalScore > 0
                ? `⭐ امتیاز: ${toFarsiNumber(progress.totalScore)}`
                : 'خوش آمدی!'
              }
            </span>
          </div>
          <div className="text-4xl animate-float" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>🐰</div>
        </div>
        <p className="text-purple-200 mt-3 text-sm font-medium">
          خرگوشک منتظرت است! بیا با هم بازی کنیم! 🎮
        </p>
      </div>

      {/* Buttons */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg transition-all duration-700 delay-400
                       ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Start Game - Full width on top */}
        <button
          onClick={() => setPage('map')}
          className="sm:col-span-2 group flex items-center gap-4 bg-gradient-to-l from-green-400 to-emerald-500
                     text-white rounded-3xl p-6 shadow-2xl hover:shadow-green-500/30
                     transform hover:scale-[1.03] transition-all duration-300 active:scale-95
                     border-2 border-green-300/30"
        >
          <span className="text-5xl group-hover:animate-bounce transition-transform">🚀</span>
          <div className="text-right flex-1">
            <div className="text-2xl font-black">شروع بازی</div>
            <div className="text-sm text-green-100 font-medium">ماجراجویی در فروشگاه!</div>
          </div>
          <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">→</span>
        </button>

        <button
          onClick={() => setPage('report')}
          className="group flex items-center gap-3 bg-gradient-to-l from-blue-500 to-blue-700
                     text-white rounded-2xl p-5 shadow-xl hover:shadow-blue-500/30
                     transform hover:scale-105 transition-all duration-300 active:scale-95
                     border-2 border-blue-400/30"
        >
          <span className="text-4xl group-hover:animate-bounce">📊</span>
          <div className="text-right">
            <div className="text-lg font-black">کارنامه مربی</div>
            <div className="text-xs text-blue-200">گزارش پیشرفت</div>
          </div>
        </button>

        <button
          onClick={() => setPage('settings')}
          className="group flex items-center gap-3 bg-gradient-to-l from-amber-400 to-orange-500
                     text-white rounded-2xl p-5 shadow-xl hover:shadow-orange-500/30
                     transform hover:scale-105 transition-all duration-300 active:scale-95
                     border-2 border-amber-300/30"
        >
          <span className="text-4xl group-hover:animate-spin">⚙️</span>
          <div className="text-right">
            <div className="text-lg font-black">تنظیمات</div>
            <div className="text-xs text-amber-100">صدا و حالت بازی</div>
          </div>
        </button>

        <button
          onClick={() => setPage('profile')}
          className="sm:col-span-2 group flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm
                     text-white rounded-2xl p-4 shadow-lg hover:bg-white/25
                     transform hover:scale-105 transition-all duration-300 active:scale-95
                     border-2 border-white/20"
        >
          <span className="text-3xl">{playerAvatar}</span>
          <div className="text-right">
            <div className="text-lg font-bold">👤 پروفایل</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className={`mt-10 text-center transition-all duration-700 delay-500
                       ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white/30 text-xs">
          🎓 بازی آموزشی مفهوم پول و جمع پول‌ها
        </p>
      </div>
    </div>
  );
};
