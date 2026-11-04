import { useState, useEffect } from 'react';
import { GameLevel } from './types/game';
import { soundManager } from './audio/soundManager';
import { GameHUD } from './components/GameHUD';
import { SakuraCanvas } from './components/SakuraCanvas';
import { LevelIntro } from './components/levels/LevelIntro';
import { Level1MysteriousDoor } from './components/levels/Level1MysteriousDoor';
import { Level2HeartCollector } from './components/levels/Level2HeartCollector';
import { Level3CatMystery } from './components/levels/Level3CatMystery';
import { Level4SecretGarden } from './components/levels/Level4SecretGarden';
import { Level5FinalProposal } from './components/levels/Level5FinalProposal';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>('intro');
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem('akilesh_unlocked_level');
    if (savedLevel) {
      const parsed = parseInt(savedLevel, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        setUnlockedLevel(parsed);
      }
    }
  }, []);

  const saveUnlockedLevel = (lvlNum: number) => {
    if (lvlNum > unlockedLevel) {
      setUnlockedLevel(lvlNum);
      localStorage.setItem('akilesh_unlocked_level', lvlNum.toString());
    }
  };

  const handleToggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const handleSelectLevel = (levelId: GameLevel) => {
    setCurrentLevel(levelId);
  };

  const handleResetProgress = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('akilesh_unlocked_level');
    setUnlockedLevel(1);
    setCurrentLevel('intro');
    setShowResetConfirm(false);
    soundManager.playClick();
  };

  return (
    <div className="relative min-h-screen bg-[#0E091E] text-white font-['Fredoka',sans-serif] selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Ambient Japanese Sakura Petals & Sparkle Canvas */}
      <SakuraCanvas
        intensity={currentLevel === 'level5' ? 'celebration' : 'romantic'}
      />

      {/* Persistent Game HUD */}
      <GameHUD
        currentLevel={currentLevel}
        unlockedLevel={unlockedLevel}
        onSelectLevel={handleSelectLevel}
        onResetProgress={handleResetProgress}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Router */}
      <main className="relative z-10 w-full min-h-screen">
        {currentLevel === 'intro' && (
          <LevelIntro
            onStartGame={() => {
              saveUnlockedLevel(1);
              setCurrentLevel('level1');
            }}
          />
        )}

        {currentLevel === 'level1' && (
          <Level1MysteriousDoor
            onComplete={() => {
              saveUnlockedLevel(2);
              setCurrentLevel('level2');
            }}
          />
        )}

        {currentLevel === 'level2' && (
          <Level2HeartCollector
            onComplete={() => {
              saveUnlockedLevel(3);
              setCurrentLevel('level3');
            }}
          />
        )}

        {currentLevel === 'level3' && (
          <Level3CatMystery
            onComplete={() => {
              saveUnlockedLevel(4);
              setCurrentLevel('level4');
            }}
          />
        )}

        {currentLevel === 'level4' && (
          <Level4SecretGarden
            onComplete={() => {
              saveUnlockedLevel(5);
              setCurrentLevel('level5');
            }}
          />
        )}

        {currentLevel === 'level5' && (
          <Level5FinalProposal
            onRestart={() => {
              setCurrentLevel('intro');
            }}
          />
        )}
      </main>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-pink-400 rounded-3xl p-6 text-center shadow-2xl">
            <h4 className="text-xl font-black text-pink-200 mb-2">
              Restart Adventure?
            </h4>
            <p className="text-xs text-pink-100/70 mb-5 leading-relaxed">
              This will reset your level progress back to the beginning so you can replay the whole story from scratch!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md transition-colors"
              >
                Yes, Restart!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
