import React, { useState } from 'react';
import { useGameStore } from '../store';
import { toFarsiNumber } from '../data/money';
import { SkillCategory } from '../types';

const skillLabels: Record<SkillCategory, { name: string; emoji: string }> = {
  money_recognition: { name: 'شناخت پول', emoji: '👀' },
  value_recognition: { name: 'تشخیص ارزش پول', emoji: '💰' },
  number_to_money: { name: 'عدد به تصویر پول', emoji: '🔢' },
  money_to_number: { name: 'تصویر پول به عدد', emoji: '🪙' },
  money_addition_small: { name: 'جمع پول‌های کوچک', emoji: '➕' },
  money_addition_large: { name: 'جمع پول‌های بزرگ‌تر', emoji: '💵' },
  payment: { name: 'پرداخت برای خرید', emoji: '💳' },
  shopping: { name: 'خرید از فروشگاه', emoji: '🛒' },
};

const getSkillStars = (score: number, attempts: number): number => {
  if (attempts === 0) return 0;
  const percent = (score / attempts) * 100;
  if (percent >= 90) return 5;
  if (percent >= 75) return 4;
  if (percent >= 60) return 3;
  if (percent >= 40) return 2;
  return 1;
};

const skillCats: SkillCategory[] = [
  'money_recognition', 'value_recognition', 'number_to_money', 'money_to_number',
  'money_addition_small', 'money_addition_large', 'payment', 'shopping',
];

export const ReportPage: React.FC = () => {
  const { setPage, progress } = useGameStore();
  const [activeTab, setActiveTab] = useState<'stats' | 'skills' | 'tips'>('stats');

  const totalQ = progress.totalQuestions;
  const percent = totalQ > 0 ? Math.round((progress.correctAnswers / totalQ) * 100) : 0;

  // Find weak & strong skills
  const weakSkills: { skill: SkillCategory; pct: number }[] = [];
  const strongSkills: { skill: SkillCategory; pct: number }[] = [];

  skillCats.forEach((sk) => {
    const attempts = progress.skillAttempts[sk] || 0;
    const score = progress.skillScores[sk] || 0;
    if (attempts > 0) {
      const pct = Math.round((score / attempts) * 100);
      if (pct < 60) weakSkills.push({ skill: sk, pct });
      else if (pct >= 75) strongSkills.push({ skill: sk, pct });
    }
  });

  const tabs = [
    { id: 'stats' as const, label: '📈 آمار', emoji: '📊' },
    { id: 'skills' as const, label: '🧠 مهارت', emoji: '🧠' },
    { id: 'tips' as const, label: '💡 پیشنهاد', emoji: '💡' },
  ];

  return (
    <div className="min-h-screen p-4 pb-20"
         style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 50%, #1a3050 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setPage('home')}
                className="bg-white/10 text-white rounded-xl px-4 py-2.5 hover:bg-white/20
                           transition-all font-bold border border-white/10">
          🏠 خانه
        </button>
        <h1 className="text-2xl font-black text-white">📊 کارنامه مربی</h1>
        <div className="w-20" />
      </div>

      {/* Tabs */}
      <div className="max-w-lg mx-auto mb-4">
        <div className="flex gap-2 bg-white/10 rounded-2xl p-1.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all
                ${activeTab === tab.id
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'text-white/60 hover:text-white/80'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <>
            {/* Overall success circle */}
            <div className="game-card p-6 text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle cx="60" cy="60" r="52" fill="none"
                          stroke={percent >= 70 ? '#22c55e' : percent >= 40 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${percent * 3.27} 327`}
                          className="transition-all duration-1000" />
                </svg>
                <div>
                  <div className="text-3xl font-black text-gray-800">{toFarsiNumber(percent)}٪</div>
                  <div className="text-xs text-gray-400 font-bold">موفقیت</div>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-600">
                {percent >= 70 ? '🌟 عملکرد عالی!' : percent >= 40 ? '💪 در حال پیشرفت!' : '🌱 ادامه بده!'}
              </p>
            </div>

            {/* Stats grid */}
            <div className="game-card p-5">
              <h3 className="font-black text-gray-800 mb-3">📋 جزئیات</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { val: totalQ, label: '📝 کل سؤال‌ها', bg: 'bg-blue-50', color: 'text-blue-600', border: 'border-blue-100' },
                  { val: progress.correctAnswers, label: '✅ پاسخ درست', bg: 'bg-green-50', color: 'text-green-600', border: 'border-green-100' },
                  { val: progress.wrongAnswers, label: '❌ پاسخ اشتباه', bg: 'bg-red-50', color: 'text-red-500', border: 'border-red-100' },
                  { val: progress.bestCombo, label: '🔥 بهترین دنباله', bg: 'bg-orange-50', color: 'text-orange-600', border: 'border-orange-100' },
                  { val: progress.completedLevels.length, label: '🏆 مراحل تکمیل', bg: 'bg-purple-50', color: 'text-purple-600', border: 'border-purple-100' },
                  { val: progress.totalScore, label: '⭐ کل امتیاز', bg: 'bg-yellow-50', color: 'text-yellow-600', border: 'border-yellow-100' },
                  { val: progress.hintsUsed, label: '💡 راهنمایی‌ها', bg: 'bg-indigo-50', color: 'text-indigo-600', border: 'border-indigo-100' },
                  { val: progress.unlockedLevels.length, label: '🔓 مراحل باز', bg: 'bg-pink-50', color: 'text-pink-600', border: 'border-pink-100' },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} rounded-xl p-3 text-center border ${item.border}`}>
                    <div className={`text-2xl font-black ${item.color}`}>{toFarsiNumber(item.val)}</div>
                    <div className="text-[10px] text-gray-500 font-bold mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="game-card p-5">
            <h3 className="font-black text-gray-800 mb-4">🧠 گزارش مهارت‌ها</h3>
            <div className="space-y-3">
              {skillCats.map((sk) => {
                const attempts = progress.skillAttempts[sk] || 0;
                const score = progress.skillScores[sk] || 0;
                const stars = getSkillStars(score, attempts);
                const label = skillLabels[sk];
                const pct = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

                return (
                  <div key={sk} className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-700 text-sm">
                        {label.emoji} {label.name}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">
                        {attempts > 0 ? `${toFarsiNumber(score)}/${toFarsiNumber(attempts)}` : 'هنوز تلاش نشده'}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= stars ? '' : 'opacity-20'}`}>
                            {s <= stars ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                      {attempts > 0 && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                          ${pct >= 75 ? 'bg-green-100 text-green-600' :
                            pct >= 50 ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-500'}`}>
                          {toFarsiNumber(pct)}٪
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    {attempts > 0 && (
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <>
            {/* Strong skills */}
            {strongSkills.length > 0 && (
              <div className="game-card p-5">
                <h3 className="font-black text-gray-800 mb-3">💪 مهارت‌های قوی</h3>
                <div className="space-y-2">
                  {strongSkills.map((ws, i) => (
                    <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
                      <span className="text-2xl">{skillLabels[ws.skill].emoji}</span>
                      <div>
                        <p className="font-bold text-green-700 text-sm">{skillLabels[ws.skill].name}</p>
                        <p className="text-xs text-green-500">🌟 عملکرد عالی: {toFarsiNumber(ws.pct)}٪</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weak skills - practice recommendations */}
            {weakSkills.length > 0 && (
              <div className="game-card p-5">
                <h3 className="font-black text-gray-800 mb-3">📈 نیاز به تمرین بیشتر</h3>
                <div className="space-y-2">
                  {weakSkills.map((ws, i) => {
                    const sk = ws.skill;
                    let recommendation = 'پیشنهاد: تمرین بیشتر';
                    if (sk === 'money_recognition' || sk === 'value_recognition') {
                      recommendation = 'پیشنهاد: تمرین شناخت پول‌ها از مرحله ۱';
                    } else if (sk.includes('addition')) {
                      recommendation = 'پیشنهاد: تمرین جمع با تصویر پول';
                    } else if (sk === 'payment' || sk === 'shopping') {
                      recommendation = 'پیشنهاد: تمرین انتخاب پول مناسب';
                    }

                    return (
                      <div key={i} className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-center gap-3">
                        <span className="text-2xl">{skillLabels[sk].emoji}</span>
                        <div>
                          <p className="font-bold text-orange-700 text-sm">{skillLabels[sk].name}</p>
                          <p className="text-xs text-orange-500">⚠️ {recommendation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No data */}
            {weakSkills.length === 0 && strongSkills.length === 0 && (
              <div className="game-card p-8 text-center">
                <div className="text-5xl mb-4">🎮</div>
                <p className="text-gray-500 font-bold">هنوز اطلاعات کافی نیست!</p>
                <p className="text-sm text-gray-400 mt-2">بیشتر بازی کن تا پیشنهادها نشان داده شوند.</p>
              </div>
            )}

            {/* General tip */}
            <div className="game-card p-5">
              <h3 className="font-black text-gray-800 mb-3">💡 نکته مهم</h3>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-700 font-medium leading-relaxed">
                  🐰 خرگوشک می‌گوید: هرگز کودک را با دیگران مقایسه نکنید.
                  هر کودک با سرعت خودش یاد می‌گیرد.
                  مهم‌ترین هدف، لذت بردن از یادگیری است! 🌟
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
