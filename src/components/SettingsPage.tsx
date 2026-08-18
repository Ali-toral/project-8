import React from 'react';
import { useGameStore } from '../store';

const Toggle: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-16 h-9 rounded-full transition-all duration-300 relative shadow-inner
      ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
  >
    <div className={`w-7 h-7 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md
      ${enabled ? 'right-1' : 'left-1'}`} />
  </button>
);

export const SettingsPage: React.FC = () => {
  const { setPage, settings, updateSettings, resetProgress } = useGameStore();

  return (
    <div className="min-h-screen p-4"
         style={{ background: 'linear-gradient(135deg, #2d3436 0%, #636e72 50%, #2d3436 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setPage('home')}
                className="bg-white/10 text-white rounded-xl px-4 py-2.5 hover:bg-white/20 transition-all font-bold
                           border border-white/10">
          🏠 خانه
        </button>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          ⚙️ تنظیمات
        </h1>
        <div className="w-20" />
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Sound Settings */}
        <div className="game-card p-6">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            🔊 صدا و موسیقی
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-700 block">🔊 صداهای بازی</span>
                <span className="text-xs text-gray-400">صدای آفرین، اوپس و ...</span>
              </div>
              <Toggle enabled={settings.soundEnabled} onToggle={() => updateSettings({ soundEnabled: !settings.soundEnabled })} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-700 block">🎵 موسیقی پس‌زمینه</span>
                <span className="text-xs text-gray-400">موسیقی شاد و آرام</span>
              </div>
              <Toggle enabled={settings.musicEnabled} onToggle={() => updateSettings({ musicEnabled: !settings.musicEnabled })} />
            </div>
          </div>
        </div>

        {/* Calm Mode */}
        <div className="game-card p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              🌱 حالت یادگیری آرام
            </h2>
            <Toggle enabled={settings.calmMode} onToggle={() => updateSettings({ calmMode: !settings.calmMode })} />
          </div>

          <div className="bg-gray-50 rounded-xl p-3 space-y-1">
            <p className="text-xs text-gray-500 flex items-center gap-1">✅ تصاویر بزرگ‌تر</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">✅ زمان بیشتر برای پاسخ</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">✅ سرعت انیمیشن کمتر</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">✅ راهنمایی بیشتر</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">✅ سؤال‌های ساده‌تر</p>
          </div>

          {settings.calmMode && (
            <div className="mt-3 bg-green-50 rounded-xl p-3 text-sm text-green-700 font-bold border border-green-200">
              🌱 حالت آرام فعال است
            </div>
          )}
        </div>

        {/* Currency */}
        <div className="game-card p-6">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            💰 واحد پول
          </h2>
          <div className="flex gap-3">
            {['ریال', 'تومان'].map(curr => (
              <button
                key={curr}
                onClick={() => updateSettings({ currency: curr })}
                className={`flex-1 py-3.5 rounded-2xl font-black text-lg transition-all duration-300
                  ${settings.currency === curr
                    ? 'bg-gradient-to-l from-purple-500 to-purple-700 text-white shadow-xl scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="game-card p-6">
          <h2 className="text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
            🗑️ بازنشانی پیشرفت
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            با بازنشانی، تمام پیشرفت، امتیازها و مراحل تکمیل‌شده پاک می‌شوند.
          </p>
          <button
            onClick={() => {
              if (window.confirm('آیا مطمئن هستید؟ تمام پیشرفت پاک خواهد شد.')) {
                resetProgress();
              }
            }}
            className="w-full bg-red-50 text-red-500 rounded-2xl py-3.5 font-bold
                       hover:bg-red-100 transition-all border-2 border-red-200 hover:border-red-300"
          >
            🗑️ بازنشانی همه‌چیز
          </button>
        </div>
      </div>
    </div>
  );
};
