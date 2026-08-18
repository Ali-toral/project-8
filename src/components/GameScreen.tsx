import React, { useState, useCallback, useEffect } from 'react';
import { useGameStore } from '../store';
import { MoneyCard } from './MoneyCard';
import { Confetti } from './Confetti';
import { toFarsiNumber } from '../data/money';
import { LEVELS } from '../data/levels';
import { audio } from '../lib/audio';

type AnswerState = 'waiting' | 'correct' | 'wrong';

const COMBO_MESSAGES = [
  { threshold: 8, message: '🏆 قهرمان فروشگاه!' },
  { threshold: 5, message: '🌟 فوق‌العاده‌ای!' },
  { threshold: 3, message: '🔥 عالی پیش می‌ری!' },
];

const SUCCESS_MESSAGES = ['آفرین! 🎉', 'عالی بود! ⭐', 'درسته! 👏', 'خیلی خوب! 🌟', 'صحیح! 💰'];
const SUCCESS_SPEECH = ['آفرین!', 'هورا!', 'عالی بود!', 'خیلی خوب!'];
const ENCOURAGE_MESSAGES = ['😊 اوپس! دوباره نگاه کن.', '👀 یک بار دیگر تلاش کن!', '💪 نزدیک بود!'];

export const GameScreen: React.FC = () => {
  const {
    currentQuestions, currentQuestionIndex, currentCombo,
    levelScore, currentLevelId, setPage, settings,
    answerQuestion, nextQuestion, skipQuestion, useHint,
  } = useGameStore();

  const [answerState, setAnswerState] = useState<AnswerState>('waiting');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [canRetry, setCanRetry] = useState(false);
  const [comboMessage, setComboMessage] = useState('');
  const [animateQuestion, setAnimateQuestion] = useState(false);

  const question = currentQuestions[currentQuestionIndex];
  const level = LEVELS.find(l => l.id === currentLevelId);
  const totalQuestions = currentQuestions.length;
  const progressPercent = ((currentQuestionIndex) / totalQuestions) * 100;

  // Reset state on question change
  useEffect(() => {
    setAnswerState('waiting');
    setSelectedOptionId(null);
    setHintLevel(0);
    setFeedbackMessage('');
    setCanRetry(false);
    setComboMessage('');
    setAnimateQuestion(false);
    setTimeout(() => setAnimateQuestion(true), 50);
  }, [currentQuestionIndex, currentLevelId]);

  const handleSelectOption = useCallback((optionId: string) => {
    if (answerState !== 'waiting') return;

    const option = question.options.find(o => o.id === optionId);
    if (!option) return;

    audio.playClick();
    setSelectedOptionId(optionId);

    if (option.isCorrect) {
      setAnswerState('correct');
      answerQuestion(true, question.skillCategory);

      // 🎉 Hooray sound + optional speech
      audio.playCorrect();
      audio.speak(SUCCESS_SPEECH[Math.floor(Math.random() * SUCCESS_SPEECH.length)]);

      const msg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
      setFeedbackMessage(msg);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      const newCombo = currentCombo + 1;
      for (const cm of COMBO_MESSAGES) {
        if (newCombo === cm.threshold) {
          setComboMessage(cm.message);
          break;
        }
      }

      setTimeout(() => {
        nextQuestion();
      }, settings.calmMode ? 2600 : 1900);
    } else {
      setAnswerState('wrong');
      answerQuestion(false, question.skillCategory);

      // 😔 Gentle sad sound (not scary)
      audio.playWrong();

      const msg = ENCOURAGE_MESSAGES[Math.floor(Math.random() * ENCOURAGE_MESSAGES.length)];
      setFeedbackMessage(msg);
      setCanRetry(true);
    }
  }, [answerState, question, answerQuestion, currentCombo, nextQuestion, settings.calmMode]);

  const handleRetry = useCallback(() => {
    audio.playClick();
    setAnswerState('waiting');
    setSelectedOptionId(null);
    setFeedbackMessage('');
    setCanRetry(false);
  }, []);

  const handleHint = useCallback(() => {
    audio.playClick();
    const nextHintVal = hintLevel + 1;
    setHintLevel(nextHintVal);
    if (nextHintVal === 1) {
      useHint();
    }
  }, [hintLevel, useHint]);

  const handleSkip = useCallback(() => {
    audio.playClick();
    skipQuestion();
  }, [skipQuestion]);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-white text-2xl animate-pulse">🪙 در حال بارگذاری...</div>
      </div>
    );
  }

  const currentHintText = hintLevel >= 3 ? question.hint3 :
    hintLevel >= 2 ? question.hint2 :
    hintLevel >= 1 ? question.hint1 : null;

  const isShopQuestion = ['buy_item', 'pay_exact', 'pick_payment', 'buy_multiple', 'item_price'].includes(question.type);
  const isWalletQuestion = question.type === 'wallet_total';

  // Replace character name: پولی → خرگوشک
  const storyText = question.storyText.replace(/پولی/g, 'خرگوشک');

  // Background gradient based on level
  const bgGradients: Record<number, string> = {
    1: 'linear-gradient(160deg, #2f9e6e 0%, #43c6a4 55%, #a7f0d1 100%)',
    2: 'linear-gradient(160deg, #4f5bd5 0%, #7a5fd0 55%, #d3a5f5 100%)',
    3: 'linear-gradient(160deg, #d94f8c 0%, #e8707f 55%, #ffc898 100%)',
    4: 'linear-gradient(160deg, #1f7fd1 0%, #3fa9d8 55%, #9ae6e0 100%)',
    5: 'linear-gradient(160deg, #e0653a 0%, #f2a03d 55%, #ffe08a 100%)',
    6: 'linear-gradient(160deg, #8a5fc9 0%, #c06fb8 55%, #ffc2e0 100%)',
    7: 'linear-gradient(160deg, #c0392b 0%, #e67e22 55%, #f9d976 100%)',
  };

  return (
    <div className="min-h-screen flex flex-col"
         style={{ background: bgGradients[currentLevelId] || bgGradients[1] }}>
      <Confetti active={showConfetti} />

      {/* Top bar */}
      <div className="p-3 flex items-center justify-between bg-black/15 backdrop-blur-sm">
        <button
          onClick={() => setPage('map')}
          className="bg-white/25 backdrop-blur-sm text-white rounded-xl px-4 py-2
                     hover:bg-white/40 transition-all text-sm font-bold shadow-md"
        >
          ← خروج
        </button>

        <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-1.5">
          <span className="text-lg">{level?.emoji}</span>
          <span className="text-white font-bold text-sm">{level?.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {currentCombo >= 3 && (
            <span className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-black animate-pulse shadow-lg">
              🔥 {toFarsiNumber(currentCombo)}
            </span>
          )}
          <span className="bg-yellow-400/90 text-yellow-900 text-sm px-3 py-1.5 rounded-full font-black shadow-md">
            ⭐ {toFarsiNumber(levelScore)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2">
        <div className="bg-black/20 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="progress-bar h-full rounded-full"
            style={{
              width: `${Math.max(progressPercent, 5)}%`,
              background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-white/80 font-bold">
          <span>سؤال {toFarsiNumber(currentQuestionIndex + 1)} از {toFarsiNumber(totalQuestions)}</span>
          <span>{toFarsiNumber(Math.round(progressPercent))}٪</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-3 md:p-6">
        <div className={`game-card w-full max-w-lg p-5 md:p-8 ${animateQuestion ? 'animate-slide-up' : 'opacity-0'}`}>

          {/* Character & Story — خرگوشک 🐰 */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-3 bg-gradient-to-l from-pink-50 to-rose-50
                            rounded-2xl px-5 py-3 shadow-sm border border-pink-100 max-w-full">
              <span className="text-4xl animate-float" style={{ animationDuration: '2s' }}>🐰</span>
              <div className="text-right">
                <p className="text-rose-700 font-black text-sm mb-0.5">خرگوشک می‌گوید:</p>
                <p className="text-rose-600 font-bold text-base whitespace-pre-line leading-relaxed">
                  {storyText}
                </p>
              </div>
            </div>
          </div>

          {/* Money display area */}
          {question.moneyShown && question.moneyShown.length > 0 && (
            <div className="mb-5">
              {isWalletQuestion ? (
                <div className="relative mx-auto max-w-sm">
                  <div className="wallet-bg p-5 rounded-2xl shadow-xl">
                    <div className="text-center mb-2">
                      <span className="text-3xl">👛</span>
                      <span className="text-white font-bold text-sm mr-2">کیف پول</span>
                    </div>
                    <div className="flex items-end justify-center gap-3 flex-wrap bg-black/10 rounded-xl p-3">
                      {question.moneyShown.map((val, i) => (
                        <React.Fragment key={i}>
                          <MoneyCard value={val} size={settings.calmMode ? 'lg' : 'md'} animate />
                          {i < question.moneyShown!.length - 1 && (
                            <span className="text-white text-2xl font-black pb-4">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isShopQuestion && question.itemEmoji ? (
                <div className="bg-gradient-to-b from-sky-50 to-blue-50 rounded-2xl p-4 border-2 border-sky-100 shadow-sm">
                  <div className="text-center">
                    <div className="text-6xl mb-2 animate-bounce-in">{question.itemEmoji}</div>
                    <p className="font-black text-gray-800 text-lg">{question.itemName}</p>
                    {question.targetAmount && (
                      <div className="inline-block bg-rose-500 text-white rounded-xl px-4 py-1 mt-2 font-black text-lg shadow-md">
                        🏷️ {toFarsiNumber(question.targetAmount)} ریال
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-center gap-3 flex-wrap">
                  {question.moneyShown.map((val, i) => (
                    <React.Fragment key={i}>
                      <div className="animate-bounce-in" style={{ animationDelay: `${i * 0.15}s` }}>
                        <MoneyCard value={val} size={settings.calmMode ? 'xl' : 'lg'} animate />
                      </div>
                      {i < question.moneyShown!.length - 1 && (
                        <span className="text-3xl font-black text-white drop-shadow-md animate-sparkle pb-4">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Item display (when no moneyShown) */}
          {question.itemEmoji && (!question.moneyShown || question.moneyShown.length === 0) && (
            <div className="text-center mb-5">
              <div className="inline-flex flex-col items-center bg-gradient-to-b from-sky-50 to-blue-50
                              rounded-2xl px-8 py-5 border-2 border-sky-100 shadow-sm">
                <span className="text-6xl mb-2 animate-bounce-in">{question.itemEmoji}</span>
                <span className="font-black text-gray-800 text-lg">{question.itemName}</span>
                {question.targetAmount && (
                  <div className="bg-rose-500 text-white rounded-xl px-4 py-1 mt-2 font-black text-lg shadow-md">
                    🏷️ {toFarsiNumber(question.targetAmount)} ریال
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Question text */}
          <div className="bg-gradient-to-l from-indigo-50 to-purple-50 rounded-2xl p-4 mb-5 border border-indigo-100">
            <h2 className="text-xl md:text-2xl font-black text-center text-gray-800 whitespace-pre-line leading-relaxed">
              {question.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let btnClass = `bg-white border-2 border-gray-200 text-gray-800
                              hover:border-purple-400 hover:bg-purple-50 hover:shadow-md`;

              if (selectedOptionId === option.id) {
                if (option.isCorrect) {
                  btnClass = 'option-correct border-2 shadow-lg';
                } else {
                  btnClass = 'option-wrong border-2 animate-shake shadow-lg';
                }
              } else if (answerState === 'correct' && option.isCorrect) {
                btnClass = 'option-correct border-2 shadow-lg';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={answerState !== 'waiting'}
                  className={`option-btn w-full rounded-2xl p-4 text-lg font-bold
                    text-center transition-all duration-300
                    ${animateQuestion ? 'animate-slide-up' : 'opacity-0'}
                    ${btnClass}
                    ${answerState !== 'waiting' ? 'cursor-default' : ''}
                  `}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                    <span className="text-lg">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedbackMessage && (
            <div className={`mt-5 text-center p-4 rounded-2xl animate-bounce-in ${
              answerState === 'correct'
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-orange-50 border-2 border-orange-200'
            }`}>
              <p className={`text-2xl font-black ${
                answerState === 'correct' ? 'text-green-600' : 'text-orange-500'
              }`}>
                {feedbackMessage}
              </p>
              {comboMessage && (
                <p className="text-lg font-black mt-2 animate-celebrate text-purple-600">{comboMessage}</p>
              )}
            </div>
          )}

          {/* Retry / Skip after wrong */}
          {canRetry && (
            <div className="flex gap-3 mt-5 justify-center">
              <button
                onClick={handleRetry}
                className="bg-gradient-to-l from-blue-500 to-blue-600 text-white rounded-2xl px-6 py-3
                           font-black hover:shadow-xl transition-all text-base transform hover:scale-105 active:scale-95"
              >
                🔄 دوباره تلاش کن
              </button>
              <button
                onClick={handleSkip}
                className="bg-gray-200 text-gray-600 rounded-2xl px-6 py-3
                           font-bold hover:bg-gray-300 transition-all text-base"
              >
                ⏭️ رد کن
              </button>
            </div>
          )}

          {/* Hint + always-available skip */}
          {answerState === 'waiting' && (
            <div className="mt-5">
              {currentHintText && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-3 animate-slide-up">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">💡</span>
                    <span className="text-yellow-700 font-bold text-base">{currentHintText}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                {hintLevel < 3 && question.hint1 && (
                  <button
                    onClick={handleHint}
                    className="bg-yellow-100 text-yellow-700 rounded-xl px-5 py-2.5
                               font-bold hover:bg-yellow-200 transition-all text-sm
                               border border-yellow-200 hover:shadow-md"
                  >
                    💡 راهنمایی {hintLevel > 0 ? '(بیشتر)' : ''}
                  </button>
                )}
                {/* Skip button — always available */}
                <button
                  onClick={handleSkip}
                  className="bg-white/70 text-gray-500 rounded-xl px-5 py-2.5
                             font-bold hover:bg-white hover:text-gray-700 transition-all text-sm
                             border border-gray-200"
                >
                  ⏭️ رد کن
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bunny helper at corner */}
      <div className="fixed bottom-4 left-4 pointer-events-none hidden md:block">
        <div className="text-6xl animate-float drop-shadow-xl" style={{ animationDuration: '3s' }}>🐰</div>
      </div>
    </div>
  );
};
