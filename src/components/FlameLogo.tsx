import React from 'react';

interface FlameLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  variant?: 'color-full' | 'color-emblem' | 'full-lockup' | 'emblem-only' | 'text-only' | 'badge-glow';
  color?: string;
}

export const FlameLogo: React.FC<FlameLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color-full',
  color = '#ffffff',
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { emblemSize: 36, textSize: 'text-2xl', subTextSize: 'text-[9px]' };
      case 'md':
        return { emblemSize: 52, textSize: 'text-3xl sm:text-4xl', subTextSize: 'text-[10px] sm:text-xs' };
      case 'lg':
        return { emblemSize: 76, textSize: 'text-4xl sm:text-5xl', subTextSize: 'text-xs sm:text-sm' };
      case 'xl':
        return { emblemSize: 104, textSize: 'text-5xl sm:text-6xl', subTextSize: 'text-sm sm:text-base' };
      case '2xl':
        return { emblemSize: 136, textSize: 'text-6xl sm:text-7xl', subTextSize: 'text-base sm:text-lg' };
      case 'custom':
      default:
        return { emblemSize: 64, textSize: 'text-4xl', subTextSize: 'text-xs' };
    }
  };

  const { emblemSize, textSize, subTextSize } = getDimensions();

  // Full Color Fiery Emblem matching color_logo_transbkgrd (1).webp
  const renderColorEmblemSvg = (w: number, h: number) => (
    <svg
      viewBox="0 0 260 260"
      width={w}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 drop-shadow-[0_4px_16px_rgba(255,50,0,0.35)]"
      aria-label="Flame International Fiery Crest"
    >
      <defs>
        {/* Deep Red to Crimson Orb Radial Gradient */}
        <radialGradient id="flameOrbGrad" cx="42%" cy="40%" r="62%" fx="35%" fy="30%">
          <stop offset="0%" stopColor="#ff4d2e" />
          <stop offset="45%" stopColor="#e61616" />
          <stop offset="78%" stopColor="#b30c14" />
          <stop offset="100%" stopColor="#690408" />
        </radialGradient>

        {/* Glossy Top Sheen */}
        <radialGradient id="topSheen" cx="50%" cy="15%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ff8a73" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>

        {/* Fiery Golden Flame Gradient */}
        <linearGradient id="mainFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff3a00" />
          <stop offset="35%" stopColor="#ff7a00" />
          <stop offset="70%" stopColor="#ffb800" />
          <stop offset="100%" stopColor="#fff5a0" />
        </linearGradient>

        {/* Secondary Back Flame Glow */}
        <linearGradient id="backFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#d92400" />
          <stop offset="60%" stopColor="#ff9900" />
          <stop offset="100%" stopColor="#ffdd6b" />
        </linearGradient>

        {/* Horizontal Dark Bar Metallic Gradient */}
        <linearGradient id="darkBannerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#444950" />
          <stop offset="12%" stopColor="#25292e" />
          <stop offset="50%" stopColor="#121417" />
          <stop offset="85%" stopColor="#1a1d21" />
          <stop offset="100%" stopColor="#30353d" />
        </linearGradient>

        {/* Text 3D Chrome Shading */}
        <linearGradient id="flameTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="48%" stopColor="#f4f5f8" />
          <stop offset="52%" stopColor="#d2d6de" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Circular Clip for Inner Elements */}
        <clipPath id="orbCircleClip">
          <circle cx="130" cy="130" r="120" />
        </clipPath>
      </defs>

      {/* Main Circular Red Orb Base */}
      <circle cx="130" cy="130" r="120" fill="url(#flameOrbGrad)" />
      <circle cx="130" cy="130" r="120" fill="url(#topSheen)" />

      {/* Group clipped inside the sphere */}
      <g clipPath="url(#orbCircleClip)">
        
        {/* Core Fiery Flame Silhouette rising upward */}
        {/* Back Flame layer */}
        <path
          d="M 20 160 C 25 130 45 110 60 120 C 72 128 70 102 85 85 C 98 70 115 50 135 68 C 145 78 148 95 160 82 C 176 65 195 42 215 70 C 230 90 236 125 240 160 Z"
          fill="url(#backFlameGrad)"
          opacity="0.85"
        />

        {/* Primary Roaring Flame Crests matching official logo */}
        <path
          d="M 25 155 
             C 32 135 48 118 64 128 
             C 74 135 78 112 90 98 
             C 102 82 118 65 132 82 
             C 142 94 146 110 158 98 
             C 172 84 186 64 200 86 
             C 214 108 225 128 235 155 
             L 235 180 L 25 180 Z"
          fill="url(#mainFlameGrad)"
        />

        {/* Stylized Sharp Inner Flame Tongues */}
        {/* Left Tongue */}
        <path
          d="M 40 150 C 44 125 56 100 70 112 C 78 119 78 132 84 140 C 76 132 68 130 64 145 Z"
          fill="#fff5a0"
          opacity="0.9"
        />
        {/* Mid-Left Tongue */}
        <path
          d="M 78 145 C 84 115 100 90 115 105 C 122 112 120 125 126 138 C 118 126 108 122 102 142 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Center-Right Main High Tongue */}
        <path
          d="M 125 140 C 135 105 152 75 170 95 C 180 106 180 120 188 135 C 178 122 168 116 160 138 Z"
          fill="#ffffff"
        />
        {/* Far Right Tongue */}
        <path
          d="M 175 140 C 185 110 202 92 216 112 C 224 124 222 135 228 148 C 220 136 212 132 205 145 Z"
          fill="#fff5a0"
          opacity="0.9"
        />

        {/* Extra Wisps & Ember Spark Highlights */}
        <path d="M 68 95 C 75 82 86 78 92 90 C 86 86 78 88 74 96 Z" fill="#fff9c4" />
        <path d="M 118 75 C 126 60 140 54 148 68 C 140 64 130 66 126 76 Z" fill="#ffffff" />
        <path d="M 168 60 C 178 42 196 35 206 54 C 196 48 184 50 178 62 Z" fill="#ffffff" />
        <path d="M 204 80 C 212 68 222 66 226 78 C 220 74 214 76 210 82 Z" fill="#fff9c4" />

        {/* Glowing Base Underneath Text */}
        <ellipse cx="130" cy="148" rx="85" ry="18" fill="#ff7a00" opacity="0.6" filter="blur(6px)" />

        {/* Bold 3D "FLAME" lettering on emblem */}
        <g filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.9))">
          <text
            x="130"
            y="152"
            textAnchor="middle"
            fill="url(#flameTextGrad)"
            fontSize="54"
            fontFamily="'Raleway', sans-serif"
            fontWeight="900"
            letterSpacing="2"
            stroke="#101214"
            strokeWidth="2.5"
            paintOrder="stroke fill"
          >
            FLAME
          </text>
        </g>

        {/* Horizontal Dark Metallic Bar for "INTERNATIONAL" */}
        <g filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.8))">
          {/* Top highlight border line on bar */}
          <line x1="8" y1="158" x2="252" y2="158" stroke="#8e96a3" strokeWidth="1.5" />
          
          {/* Bar rectangle */}
          <rect x="10" y="159" width="240" height="26" fill="url(#darkBannerGrad)" />

          {/* Bottom border line on bar */}
          <line x1="8" y1="185" x2="252" y2="185" stroke="#121416" strokeWidth="2" />
          
          {/* Subtle bottom red glow line */}
          <line x1="12" y1="187" x2="248" y2="187" stroke="#ff3a00" strokeWidth="1.2" opacity="0.8" />

          {/* "INTERNATIONAL" white text inside dark bar */}
          <text
            x="130"
            y="178"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="15.5"
            fontFamily="'Raleway', sans-serif"
            fontWeight="800"
            letterSpacing="5"
          >
            INTERNATIONAL
          </text>
        </g>

      </g>

      {/* Outer crisp white border matching flame_logo_whiteBORDER.png */}
      <circle cx="130" cy="130" r="121" stroke="#ffffff" strokeWidth="5.5" fill="none" />
      <circle cx="130" cy="130" r="118.25" stroke="#ffffff" strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  );

  // Pure Monochrome / White Vector Emblem for dark header or minimalist uses
  const renderMonochromeSvg = (w: number, h: number) => (
    <svg
      viewBox="0 0 240 240"
      width={w}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300"
      aria-label="Flame International Monochrome Emblem"
    >
      <circle cx="120" cy="120" r="112" stroke={color} strokeWidth="5" fill="none" />
      <path
        d="M 28 126 C 36 108 50 86 64 96 C 74 103 76 116 86 102 C 98 84 110 60 126 78 C 136 89 138 104 148 92 C 162 74 176 56 192 78 C 204 94 208 112 212 126"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M 58 84 C 64 68 76 62 82 76" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M 106 68 C 114 50 128 42 136 60" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M 152 56 C 162 38 178 30 188 50" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M 182 72 C 190 56 200 52 206 68" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />

      <text
        x="120"
        y="148"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="44"
        fontFamily="'Raleway', sans-serif"
        fontWeight="900"
        letterSpacing="2"
      >
        FLAME
      </text>

      <line x1="26" y1="160" x2="214" y2="160" stroke="#ffffff" strokeWidth="3.5" />
      <line x1="26" y1="184" x2="214" y2="184" stroke="#ffffff" strokeWidth="3.5" />

      <text
        x="120"
        y="177"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="13.5"
        fontFamily="'Raleway', sans-serif"
        fontWeight="900"
        letterSpacing="5"
      >
        INTERNATIONAL
      </text>
    </svg>
  );

  // Variant: Just the Fiery Orb Emblem
  if (variant === 'color-emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src="/images/flame-logo.png?v=4"
          alt="Flame International Emblem"
          className="h-auto w-auto object-contain max-h-full drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
          style={{ height: emblemSize }}
        />
      </div>
    );
  }

  // Variant: Monochrome Emblem Only
  if (variant === 'emblem-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderMonochromeSvg(emblemSize, emblemSize)}
      </div>
    );
  }

  // Variant: Glowing Circular Badge
  if (variant === 'badge-glow') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff3a00] via-[#ff9800] to-[#ffb800] blur-xl opacity-60 animate-pulse" />
        <div className="relative rounded-full p-1 bg-gradient-to-b from-white/30 to-black/60 shadow-[0_10px_30px_rgba(255,50,0,0.5)]">
          {renderColorEmblemSvg(emblemSize, emblemSize)}
        </div>
      </div>
    );
  }

  // Variant: Text Only
  if (variant === 'text-only') {
    return (
      <div className={`flex flex-col text-left font-['Raleway'] tracking-tight ${className}`}>
        <span 
          className={`${textSize} font-black font-[900] tracking-wider leading-none text-white`}
        >
          FLAME
        </span>
        <span 
          className={`${subTextSize} font-black font-[900] tracking-[0.32em] uppercase leading-none mt-1 text-white`}
        >
          INTERNATIONAL
        </span>
      </div>
    );
  }

  // Variant: Monochrome Full Lockup
  if (variant === 'full-lockup') {
    return (
      <div className={`inline-flex items-center space-x-3 sm:space-x-4 ${className}`}>
        {renderMonochromeSvg(emblemSize, emblemSize)}
        <div className="flex flex-col text-left font-['Raleway']">
          <span 
            className={`${textSize} font-black font-[900] tracking-wider leading-none text-white drop-shadow-sm`}
          >
            FLAME
          </span>
          <span 
            className={`${subTextSize} font-black font-[900] tracking-[0.32em] uppercase leading-none mt-1 sm:mt-1.5 text-white`}
          >
            INTERNATIONAL
          </span>
        </div>
      </div>
    );
  }

  // Default: Official Flame International Logo image asset
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/images/flame-logo.png?v=4"
        alt="Flame International"
        className="h-auto w-auto object-contain max-h-full drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
        style={{ height: emblemSize }}
      />
    </div>
  );
};

