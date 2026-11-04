import React, { useState, useEffect } from 'react';
import { AnimeCharacterAkilesh } from './AnimeCharacterAkilesh';
import { MagicalCat } from './MagicalCat';
import { soundManager } from '../audio/soundManager';

export interface DialogueBoxProps {
  speaker: 'cat' | 'akilesh' | 'narrator';
  text: string;
  catMood?: 'idle' | 'walk' | 'cheer' | 'think' | 'holdingHeart' | 'love' | 'surprised';
  akileshMood?: 'idle' | 'walk' | 'jump' | 'surprised' | 'blush' | 'celebrate';
  onNext?: () => void;
  showNextArrow?: boolean;
  className?: string;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  text,
  catMood = 'idle',
  akileshMood = 'idle',
  onNext,
  showNextArrow = true,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [text]);

  const handleBoxClick = () => {
    if (isTyping) {
      // Fast forward
      setDisplayedText(text);
      setIsTyping(false);
    } else if (onNext) {
      soundManager.playClick();
      onNext();
    }
  };

  const getSpeakerTitle = () => {
    switch (speaker) {
      case 'cat':
        return 'Yuki 🐾 (Magical Cat)';
      case 'akilesh':
        return 'Akilesh ✨';
      default:
        return 'Mystical Chronicle 📜';
    }
  };

  return (
    <div
      onClick={handleBoxClick}
      className={`relative w-full max-w-3xl mx-auto cursor-pointer select-none transition-all duration-200 hover:scale-[1.01] ${className}`}
    >
      {/* Decorative Character Avatar Pop-out */}
      <div className="absolute -top-16 left-4 sm:left-8 z-20 flex items-end">
        {speaker === 'cat' ? (
          <div className="relative bg-white/80 p-1.5 rounded-full ring-4 ring-pink-400 shadow-xl backdrop-blur-md">
            <MagicalCat pose={catMood} size={68} />
          </div>
        ) : speaker === 'akilesh' ? (
          <div className="relative bg-white/80 p-1 rounded-full ring-4 ring-indigo-400 shadow-xl backdrop-blur-md">
            <AnimeCharacterAkilesh pose={akileshMood} size={76} />
          </div>
        ) : null}
      </div>

      {/* Visual Novel Dialogue Container */}
      <div className="pt-4">
        <div className="relative bg-gradient-to-b from-slate-900/90 via-purple-950/90 to-slate-900/95 border-2 border-pink-400/70 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-lg">
          {/* Subtle anime corner ornaments */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-300 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-300 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300 rounded-br-sm pointer-events-none" />

          {/* Speaker Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md mb-2">
            <span>{getSpeakerTitle()}</span>
          </div>

          {/* Dialogue Text */}
          <p className="text-white sm:text-lg text-base font-semibold leading-relaxed tracking-wide min-h-[48px] drop-shadow">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 bg-pink-400 ml-1 animate-pulse" />}
          </p>

          {/* Advance Prompt */}
          {showNextArrow && (
            <div className="mt-2 flex justify-end items-center gap-1.5 text-xs font-bold text-pink-300/90 animate-bounce">
              <span>{isTyping ? 'Tap to skip' : 'Tap to continue'}</span>
              <span className="text-base text-pink-400">▼</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
