import React from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { GameLevel } from '../types/game';
import { soundManager } from '../audio/soundManager';

interface GameHUDProps {
  currentLevel: GameLevel;
  unlockedLevel: number;
  onSelectLevel: (lvl: GameLevel) => void;
  onResetProgress: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentLevel,
  unlockedLevel,
  onSelectLevel,
  onResetProgress,
  isMuted,
  onToggleSound,
}) => {
  const levels: { id: GameLevel; num: number; label: string; short: string }[] = [
    { id: 'level1', num: 1, label: 'The Mysterious Door', short: 'L1: Door' },
    { id: 'level2', num: 2, label: 'Heart Collector', short: 'L2: Hearts' },
    { id: 'level3', num: 3, label: "The Cat's Mystery", short: 'L3: Trivia' },
    { id: 'level4', num: 4, label: 'The Secret Garden', short: 'L4: Garden' },
    { id: 'level5', num: 5, label: 'The Final Proposal', short: 'L5: Proposal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-pink-500/30 px-3 py-2 sm:px-6 sm:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Title */}
        <div
          onClick={() => onSelectLevel('intro')}
          className="flex items-center gap-2 cursor-pointer group"
          title="Return to Intro"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/30 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-extrabold text-xs sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 tracking-wider">
              THE SECRET WORLD OF AKILESH ❤️
            </h1>
            <p className="text-[10px] text-pink-300/70 hidden sm:block">A Magical Anime Adventure</p>
          </div>
        </div>

        {/* Level Progression Dots / Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {levels.map((lvl) => {
            const isUnlocked = unlockedLevel >= lvl.num;
            const isCurrent = currentLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  if (isUnlocked) {
                    soundManager.playClick();
                    onSelectLevel(lvl.id);
                  }
                }}
                disabled={!isUnlocked}
                className={`relative px-2 py-1 sm:px-3 sm:py-1 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50 scale-105 ring-2 ring-amber-300'
                    : isUnlocked
                    ? 'bg-slate-800/80 hover:bg-slate-700/80 text-pink-200 border border-pink-400/30'
                    : 'bg-slate-900/40 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
                }`}
                title={lvl.label}
              >
                <span>{lvl.num}</span>
                <span className="hidden md:inline">{lvl.short.replace(`L${lvl.num}: `, '')}</span>
                {isUnlocked && unlockedLevel > lvl.num && (
                  <span className="text-[10px] text-amber-300">★</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Sound & Restart */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl transition-all border ${
              isMuted
                ? 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                : 'bg-pink-500/20 text-pink-300 border-pink-500/40 hover:bg-pink-500/30 shadow-sm'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Restart */}
          <button
            onClick={onResetProgress}
            className="p-2 rounded-xl bg-slate-800/80 text-pink-300 hover:text-white border border-pink-500/30 hover:bg-rose-900/40 transition-all"
            title="Restart Adventure"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
