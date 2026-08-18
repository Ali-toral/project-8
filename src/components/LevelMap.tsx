import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { LEVELS } from '../data/levels';
import { toFarsiNumber } from '../data/money';

export const LevelMap: React.FC = () => {
  const { setPage, startLevel, progress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const isUnlocked = (levelId: number) => progress.unlockedLevels.includes(levelId);
  const isCompleted = (levelId: number) => progress.completedLevels.includes(levelId);

  const levelEmojis: Record<number, string> = {
    1: '🟢', 2: '🟢', 3: '🟡', 4: '🟡', 5: '🟠', 6: '🟠', 7: '🔴',
  };

  return (
    <div className="min-h-screen p-4 pb-24"
         style={{ background: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 30%, #2d2d6e 60%, #1a1a3e 100%)' }}>

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-sparkle"
               style={{
                 width: `${1 + Math.random() * 2}px`,
                 height: `${1 + Math.random() * 2}px`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 3}s`,
                 opacity: 0.3 + Math.random() * 0.5,
               }} />
        ))}
      </div>

      {/* Header */}
      <div className={`flex items-center justify-between mb-8 transition-all duration-500
                       ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <button
          onClick={() => setPage('home')}
          className="bg-white/10 backdrop-blur-md text-white rounded-xl px-4 py-2.5
                     hover:bg-white/20 transition-all font-bold border border-white/10"
        >
          🏠 خانه
        </button>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          🗺️ نقشه مراحل
        </h1>
        <div className="bg-yellow-500/20 backdrop-blur-md rounded-xl px-4 py-2.5 border border-yellow-500/20">
          <span className="text-yellow-300 font-black">⭐ {toFarsiNumber(progress.totalScore)}</span>
        </div>
      </div>

      {/* Level path */}
      <div className="max-w-lg mx-auto relative">
        {/* Vertical line */}
        <div className="absolute right-[2.25rem] top-0 bottom-0 w-1 bg-white/10 rounded-full" />

        <div className="space-y-5">
          {LEVELS.map((level, index) => {
            const unlocked = isUnlocked(level.id);
            const completed = isCompleted(level.id);

            return (
              <div
                key={level.id}
                className={`relative transition-all duration-500 ${
                  mounted ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Connector dot */}
                <div className={`absolute right-[1.85rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10
                  ${completed ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                    unlocked ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' :
                    'bg-gray-600'}`} />

                {/* Level card */}
                <button
                  onClick={() => unlocked && startLevel(level.id)}
                  disabled={!unlocked}
                  className={`w-full mr-12 rounded-2xl p-5 text-right relative overflow-hidden
                    transition-all duration-300
                    ${unlocked
                      ? `bg-gradient-to-l ${level.bgGradient} text-white shadow-2xl
                         hover:-translate-y-1 hover:shadow-3xl cursor-pointer active:scale-[0.98]`
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50'
                    }
                    ${completed ? 'ring-2 ring-yellow-400/50' : ''}
                  `}
                >
                  {/* Background decoration */}
                  {unlocked && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/5 rounded-full" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 relative z-10">
                    {/* Level icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black
                      ${completed ? 'bg-yellow-400/90 shadow-lg' :
                        unlocked ? 'bg-white/20 backdrop-blur-sm' :
                        'bg-gray-700/50'}
                    `}>
                      {completed ? '✅' : unlocked ? level.emoji : '🔒'}
                    </div>

                    {/* Level info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold
                          ${unlocked ? 'bg-white/20' : 'bg-gray-700'}`}>
                          {levelEmojis[level.id]} مرحله {toFarsiNumber(level.id)}
                        </span>
                        {completed && <span className="text-yellow-300 text-sm">🏆</span>}
                      </div>
                      <h3 className="text-xl font-black mb-0.5">{level.title}</h3>
                      <p className="text-sm opacity-75">{level.subtitle}</p>
                    </div>

                    {/* Stars */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: level.stars }, (_, i) => (
                          <span key={i} className={`text-sm ${completed ? '' : 'opacity-40'}`}>
                            {completed ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                        ${level.difficulty === 'چالش' ? 'bg-red-500/80' :
                          level.difficulty === 'متوسط' ? 'bg-orange-500/80' :
                          'bg-green-500/80'}
                        ${unlocked ? 'text-white' : 'text-gray-400 bg-gray-700/80'}`}>
                        {level.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Completed badge */}
                  {completed && (
                    <div className="absolute top-0 left-0 bg-green-500/90 text-white text-[10px] px-2 py-1
                                    rounded-br-xl rounded-tl-xl font-bold">
                      ✓ تکمیل
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom character */}
      <div className={`text-center mt-10 transition-all duration-700 delay-700
                       ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
          <span className="text-4xl animate-float">🐰</span>
          <p className="text-white/50 text-sm font-medium">
            خرگوشک منتظرت است! یک مرحله انتخاب کن!
          </p>
        </div>
      </div>
    </div>
  );
};
