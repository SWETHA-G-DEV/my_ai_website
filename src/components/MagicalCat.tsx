import React from 'react';

export interface MagicalCatProps {
  pose?: 'idle' | 'walk' | 'cheer' | 'think' | 'holdingHeart' | 'love' | 'surprised';
  direction?: 'left' | 'right';
  className?: string;
  size?: number; // base size
  speech?: string;
}

export const MagicalCat: React.FC<MagicalCatProps> = ({
  pose = 'idle',
  direction = 'right',
  className = '',
  size = 90,
  speech,
}) => {
  const isLeft = direction === 'left';
  const width = pose === 'holdingHeart' ? size * 1.25 : size;
  const height = pose === 'holdingHeart' ? size * 1.2 : size;

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {speech && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 min-w-[140px] max-w-[220px] bg-white/95 backdrop-blur-md text-pink-900 font-bold text-xs py-1.5 px-3 rounded-2xl shadow-lg border-2 border-pink-300 z-30 animate-bounce text-center">
          {speech}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-pink-300" />
        </div>
      )}

      <div
        className={`relative transition-transform duration-200 ${isLeft ? 'scale-x-[-1]' : ''}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full drop-shadow-md overflow-visible ${
            pose === 'idle'
              ? 'animate-[bounce_2.4s_ease-in-out_infinite]'
              : pose === 'cheer'
              ? 'animate-[bounce_0.6s_ease-in-out_infinite]'
              : pose === 'walk'
              ? 'animate-[pulse_0.5s_infinite]'
              : ''
          }`}
        >
          <defs>
            <linearGradient id="catFur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#FFF8F8" />
              <stop offset="100%" stopColor="#FDE2E4" />
            </linearGradient>
            <linearGradient id="catEarPink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="catEye" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="45%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="ribbonPink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="bigHeartGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF4B72" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="60" cy="112" rx="26" ry="5" fill="rgba(0,0,0,0.18)" />

          {/* Tail */}
          <path
            d="M84 88 C98 84 108 68 104 56 C101 48 94 52 94 58 C94 68 84 76 76 82 Z"
            fill="url(#catFur)"
            stroke="#FDE2E4"
            strokeWidth="1"
            className="animate-[pulse_1.8s_ease-in-out_infinite]"
          />

          {/* Body */}
          <ellipse cx="60" cy="85" rx="26" ry="22" fill="url(#catFur)" stroke="#FEE2E2" strokeWidth="1.2" />

          {/* Back Paws */}
          <ellipse cx="44" cy="106" rx="8" ry="5.5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
          <ellipse cx="76" cy="106" rx="8" ry="5.5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />

          {/* Front Paws / Arms */}
          {pose === 'holdingHeart' ? (
            <>
              {/* Huge glowing red heart held in front of chest */}
              <g filter="url(#heartGlow)" className="animate-[pulse_1.5s_ease-in-out_infinite]">
                <path
                  d="M60 48 C48 30 22 42 28 66 C32 80 50 94 60 102 C70 94 88 80 92 66 C98 42 72 30 60 48 Z"
                  fill="url(#bigHeartGrad)"
                  stroke="#FFE4E6"
                  strokeWidth="2"
                />
                {/* Heart shimmer highlight */}
                <path
                  d="M38 52 C32 60 34 70 42 74"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.6"
                  fill="none"
                />
                <circle cx="76" cy="62" r="3" fill="#FFFFFF" opacity="0.8" />
              </g>
              {/* Cat paws clasping the heart */}
              <ellipse cx="34" cy="72" rx="7" ry="5.5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
              <ellipse cx="86" cy="72" rx="7" ry="5.5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
            </>
          ) : pose === 'cheer' ? (
            <>
              {/* Arms raised up */}
              <ellipse cx="38" cy="64" rx="6" ry="10" transform="rotate(-30 38 64)" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
              <ellipse cx="82" cy="64" rx="6" ry="10" transform="rotate(30 82 64)" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
            </>
          ) : (
            <>
              {/* Resting paws */}
              <ellipse cx="50" cy="98" rx="6.5" ry="5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
              <ellipse cx="70" cy="98" rx="6.5" ry="5" fill="#FFFFFF" stroke="#FDE2E4" strokeWidth="1.2" />
            </>
          )}

          {/* Pink Ribbon & Golden Bell */}
          <g id="ribbon">
            {/* Ribbon Collar */}
            <path d="M42 66 Q60 74 78 66 Q60 70 42 66 Z" fill="url(#ribbonPink)" />
            {/* Ribbon Bow */}
            <path d="M60 69 L51 62 Q48 70 56 71 Z" fill="url(#ribbonPink)" />
            <path d="M60 69 L69 62 Q72 70 64 71 Z" fill="url(#ribbonPink)" />
            {/* Bell */}
            <circle cx="60" cy="72" r="3.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="60" cy="72" r="1" fill="#78350F" />
          </g>

          {/* Cat Head */}
          <g id="catHead">
            {/* Ears */}
            {/* Left Ear */}
            <path d="M36 42 L24 16 C28 14 42 22 46 28 Z" fill="url(#catFur)" stroke="#FDE2E4" strokeWidth="1" />
            <path d="M34 38 L27 20 C30 19 38 25 41 29 Z" fill="url(#catEarPink)" />
            {/* Right Ear */}
            <path d="M84 42 L96 16 C92 14 78 22 74 28 Z" fill="url(#catFur)" stroke="#FDE2E4" strokeWidth="1" />
            <path d="M86 38 L93 20 C90 19 82 25 79 29 Z" fill="url(#catEarPink)" />

            {/* Head Circle */}
            <ellipse cx="60" cy="46" rx="30" ry="25" fill="url(#catFur)" stroke="#FEE2E2" strokeWidth="1.2" />

            {/* Rosy Pink Cheeks */}
            <ellipse cx="40" cy="53" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="80" cy="53" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

            {/* Whiskers */}
            <line x1="32" y1="50" x2="16" y2="48" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="32" y1="54" x2="18" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="88" y1="50" x2="104" y2="48" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="88" y1="54" x2="102" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

            {/* Big Sparkling Anime Eyes */}
            {pose === 'love' ? (
              <>
                {/* Cute closed happy eye crescents */}
                <path d="M42 45 Q48 38 54 45" stroke="#E11D48" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M66 45 Q72 38 78 45" stroke="#E11D48" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {/* Left Eye */}
                <ellipse cx="48" cy="44" rx="6.5" ry="8" fill="url(#catEye)" />
                <ellipse cx="46" cy="41" rx="2.5" ry="3.5" fill="#FFFFFF" />
                <circle cx="50" cy="47" r="1.3" fill="#FFFFFF" />
                <circle cx="49" cy="42" r="0.7" fill="#67E8F9" />

                {/* Right Eye */}
                <ellipse cx="72" cy="44" rx="6.5" ry="8" fill="url(#catEye)" />
                <ellipse cx="70" cy="41" rx="2.5" ry="3.5" fill="#FFFFFF" />
                <circle cx="74" cy="47" r="1.3" fill="#FFFFFF" />
                <circle cx="73" cy="42" r="0.7" fill="#67E8F9" />
              </>
            )}

            {/* Cute pink nose & mouth */}
            <path d="M58 52 L62 52 L60 54 Z" fill="#FB7185" />
            <path d="M56 55 Q60 58 60 55 Q60 58 64 55" stroke="#E11D48" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Sparkles / Little floating star when happy */}
          {(pose === 'cheer' || pose === 'holdingHeart' || pose === 'love') && (
            <g className="animate-[spin_4s_linear_infinite]">
              <path d="M102 30 L104 36 L110 38 L104 40 L102 46 L100 40 L94 38 L100 36 Z" fill="#FBBF24" />
              <path d="M16 32 L18 36 L22 38 L18 40 L16 44 L14 40 L10 38 L14 36 Z" fill="#F472B6" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
