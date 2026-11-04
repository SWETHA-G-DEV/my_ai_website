import React from 'react';

export interface AkileshProps {
  pose?: 'idle' | 'walk' | 'jump' | 'surprised' | 'blush' | 'celebrate';
  direction?: 'left' | 'right';
  className?: string;
  size?: number; // base height in px
}

export const AnimeCharacterAkilesh: React.FC<AkileshProps> = ({
  pose = 'idle',
  direction = 'right',
  className = '',
  size = 120,
}) => {
  const isLeft = direction === 'left';
  const width = size * 0.75;
  const height = size;

  return (
    <div
      className={`relative inline-block select-none transition-transform duration-150 ${className} ${
        isLeft ? 'scale-x-[-1]' : ''
      }`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        viewBox="0 0 100 140"
        className={`w-full h-full drop-shadow-md overflow-visible ${
          pose === 'idle'
            ? 'animate-[bounce_3s_ease-in-out_infinite]'
            : pose === 'walk'
            ? 'animate-[pulse_0.6s_ease-in-out_infinite]'
            : pose === 'jump'
            ? '-translate-y-2'
            : pose === 'celebrate'
            ? 'animate-[bounce_0.8s_infinite]'
            : ''
        }`}
      >
        <defs>
          <linearGradient id="akileshSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF2E7" />
            <stop offset="100%" stopColor="#F5DBC7" />
          </linearGradient>
          <linearGradient id="akileshHair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E1B2E" />
            <stop offset="60%" stopColor="#2A2447" />
            <stop offset="100%" stopColor="#3F376A" />
          </linearGradient>
          <linearGradient id="akileshJacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <linearGradient id="akileshScarf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
          <filter id="animeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="50" cy="136" rx="22" ry="4" fill="rgba(0,0,0,0.2)" />

        {/* Legs / Pants */}
        <g id="legs">
          {pose === 'walk' ? (
            <>
              {/* Walking pose legs */}
              <path d="M42 98 L36 128 L32 134" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" />
              <path d="M58 98 L64 126 L70 132" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" />
              {/* Shoes */}
              <ellipse cx="30" cy="134" rx="6" ry="4" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
              <ellipse cx="72" cy="132" rx="6" ry="4" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
            </>
          ) : pose === 'jump' ? (
            <>
              {/* Jumping pose legs */}
              <path d="M42 98 L34 116 L44 128" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M58 98 L66 116 L56 128" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              {/* Shoes */}
              <ellipse cx="45" cy="129" rx="6" ry="3.5" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
              <ellipse cx="55" cy="129" rx="6" ry="3.5" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
            </>
          ) : (
            <>
              {/* Standing legs */}
              <path d="M42 96 L41 130" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" />
              <path d="M58 96 L59 130" stroke="#1E1B4B" strokeWidth="7" strokeLinecap="round" />
              {/* Shoes */}
              <path d="M36 130 C36 127 46 127 46 130 L46 134 C46 135 34 135 34 134 Z" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
              <path d="M54 130 C54 127 64 127 64 130 L64 134 C64 135 52 135 52 134 Z" fill="#FFFFFF" stroke="#312E81" strokeWidth="1.5" />
            </>
          )}
        </g>

        {/* Torso & Stylish Anime Hoodie */}
        <g id="body">
          {/* Inner Shirt */}
          <path d="M44 65 L56 65 L55 98 L45 98 Z" fill="#FFFFFF" />
          {/* Jacket / Hoodie */}
          <path
            d="M34 68 C34 62 66 62 66 68 L64 98 C64 100 36 100 36 98 Z"
            fill="url(#akileshJacket)"
          />
          {/* White jacket zipper line */}
          <line x1="50" y1="68" x2="50" y2="98" stroke="#E0E7FF" strokeWidth="1.5" />
          {/* Pocket accents */}
          <line x1="40" y1="88" x2="45" y2="92" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="60" y1="88" x2="55" y2="92" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Arms */}
        <g id="arms">
          {pose === 'celebrate' ? (
            <>
              <path d="M35 68 Q24 50 20 38" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="20" cy="36" r="4.5" fill="url(#akileshSkin)" />
              <path d="M65 68 Q76 50 80 38" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="80" cy="36" r="4.5" fill="url(#akileshSkin)" />
            </>
          ) : pose === 'walk' ? (
            <>
              <path d="M35 68 Q28 80 24 88" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="23" cy="89" r="4" fill="url(#akileshSkin)" />
              <path d="M65 68 Q72 80 76 84" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="77" cy="85" r="4" fill="url(#akileshSkin)" />
            </>
          ) : (
            <>
              <path d="M34 68 Q30 82 32 92" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="32" cy="94" r="4" fill="url(#akileshSkin)" />
              <path d="M66 68 Q70 82 68 92" stroke="url(#akileshJacket)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="68" cy="94" r="4" fill="url(#akileshSkin)" />
            </>
          )}
        </g>

        {/* Romantic Red Anime Scarf */}
        <g id="scarf">
          <ellipse cx="50" cy="62" rx="14" ry="6" fill="url(#akileshScarf)" />
          {/* Fluttering scarf tail */}
          <path
            d="M58 63 Q68 68 64 80 Q61 86 58 84 Q62 74 54 66 Z"
            fill="url(#akileshScarf)"
          />
        </g>

        {/* Neck */}
        <rect x="46" y="52" width="8" height="10" rx="3" fill="url(#akileshSkin)" />

        {/* Head / Face */}
        <g id="head">
          <path
            d="M36 34 C36 20 64 20 64 34 C64 48 58 58 50 59 C42 58 36 48 36 34 Z"
            fill="url(#akileshSkin)"
          />
          {/* Cute Ears */}
          <ellipse cx="35" cy="38" rx="2.5" ry="4.5" fill="url(#akileshSkin)" />
          <ellipse cx="65" cy="38" rx="2.5" ry="4.5" fill="url(#akileshSkin)" />

          {/* Cheeks / Blush */}
          {(pose === 'blush' || pose === 'celebrate' || pose === 'surprised' || pose === 'idle') && (
            <>
              <ellipse cx="40" cy="42" rx="3.5" ry="2" fill="#F43F5E" opacity={pose === 'blush' ? '0.7' : '0.4'} />
              <ellipse cx="60" cy="42" rx="3.5" ry="2" fill="#F43F5E" opacity={pose === 'blush' ? '0.7' : '0.4'} />
            </>
          )}

          {/* Anime Eyes */}
          {pose === 'celebrate' ? (
            <>
              {/* Happy crescent eyes */}
              <path d="M40 37 Q44 32 48 37" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M52 37 Q56 32 60 37" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="44" cy="36" rx="4" ry="5.5" fill="#1E1B4B" />
              <ellipse cx="43" cy="34" rx="1.6" ry="2.2" fill="#FFFFFF" />
              <circle cx="45.5" cy="38" r="0.8" fill="#FFFFFF" />
              {/* Eyebrow */}
              <path d="M40 28 Q44 26 47 28" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="56" cy="36" rx="4" ry="5.5" fill="#1E1B4B" />
              <ellipse cx="55" cy="34" rx="1.6" ry="2.2" fill="#FFFFFF" />
              <circle cx="57.5" cy="38" r="0.8" fill="#FFFFFF" />
              {/* Eyebrow */}
              <path d="M53 28 Q56 26 60 28" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Cute anime mouth */}
          {pose === 'celebrate' ? (
            <path d="M46 47 Q50 53 54 47 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="0.8" />
          ) : pose === 'surprised' ? (
            <ellipse cx="50" cy="47" rx="2.5" ry="3.5" fill="#E11D48" />
          ) : (
            <path d="M47 47 Q50 50 53 47" stroke="#9F1239" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          )}

          {/* Hair - Stylish anime bangs and tufts */}
          <path
            d="M32 30 C30 18 42 10 50 10 C62 10 70 18 68 30 C72 35 68 45 66 43 C64 35 62 26 58 26 C54 26 52 35 48 35 C44 35 42 27 38 28 C34 29 34 40 32 40 C30 40 30 33 32 30 Z"
            fill="url(#akileshHair)"
          />
          {/* Hair shine highlight */}
          <path
            d="M40 18 Q50 14 60 18"
            stroke="#93C5FD"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
            fill="none"
          />
          {/* Anime Ahoge / cute hair flick on top */}
          <path
            d="M50 11 Q55 2 58 6 Q53 7 50 11 Z"
            fill="url(#akileshHair)"
          />
        </g>
      </svg>
    </div>
  );
};
