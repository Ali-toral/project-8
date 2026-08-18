import React, { useEffect } from 'react';
import { useGameStore } from './store';
import { HomePage } from './components/HomePage';
import { LevelMap } from './components/LevelMap';
import { GameScreen } from './components/GameScreen';
import { EndLevelScreen } from './components/EndLevelScreen';
import { ReportPage } from './components/ReportPage';
import { SettingsPage } from './components/SettingsPage';
import { ProfilePage } from './components/ProfilePage';
import { audio } from './lib/audio';

/** Bridges settings → audio engine and unlocks audio on first gesture */
const AudioController: React.FC = () => {
  const settings = useGameStore((s) => s.settings);

  useEffect(() => {
    audio.volume = settings.volume;
    audio.soundEnabled = settings.soundEnabled;
    audio.setMusicEnabled(settings.musicEnabled);
  }, [settings]);

  useEffect(() => {
    const unlock = () => {
      audio.unlock();
      if (audio.musicEnabled) audio.startMusic();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  return null;
};

const App: React.FC = () => {
  const currentPage = useGameStore((state) => state.currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'map':
        return <LevelMap />;
      case 'game':
        return <GameScreen />;
      case 'endLevel':
        return <EndLevelScreen />;
      case 'report':
        return <ReportPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <AudioController />
      {renderPage()}
    </div>
  );
};

export default App;
