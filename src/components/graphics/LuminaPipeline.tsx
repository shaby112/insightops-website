export function LuminaPipeline() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-indigo-200/40 bg-[#050A1C] p-4 shadow-[0_30px_80px_-40px_rgba(53,103,255,0.7)]">
      <svg viewBox="0 0 1200 460" className="w-full h-auto" role="img" aria-label="Messy data sources transformed into structured insights">
        <defs>
          <linearGradient id="leftFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8CA6FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#70E5FF" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="rightFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#928AFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8FE7FF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="prismFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B59CFF" />
            <stop offset="100%" stopColor="#695CFF" />
          </linearGradient>
          <linearGradient id="prismSide" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A8ECFF" />
            <stop offset="100%" stopColor="#4B6BDB" />
          </linearGradient>
          <linearGradient id="prismBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E3AC7" />
            <stop offset="100%" stopColor="#5A6BFF" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="1200" height="460" fill="#050A1C" />
        <ellipse cx="600" cy="230" rx="320" ry="160" fill="#4358FF" opacity="0.14" />

        <text x="56" y="44" fill="#BFC8E8" fontSize="15" letterSpacing="2.5">RAW SOURCES</text>
        <text x="958" y="44" fill="#BFC8E8" fontSize="15" letterSpacing="2.5">INSIGHTS</text>

        <g opacity="0.95">
          <rect x="54" y="74" width="60" height="46" rx="10" fill="#121D36" stroke="#5A6B96" />
          <ellipse cx="84" cy="87" rx="14" ry="4.5" fill="#8FC7FF" opacity="0.75" />
          <line x1="70" y1="92" x2="98" y2="92" stroke="#8FC7FF" opacity="0.8" />
          <ellipse cx="84" cy="102" rx="14" ry="4.5" fill="#8FC7FF" opacity="0.75" />
        </g>
        <g opacity="0.95">
          <rect x="60" y="166" width="50" height="40" rx="10" fill="#1A2746" stroke="#5F6F9A" />
          <circle cx="79" cy="186" r="7" fill="#95E2FF" opacity="0.8" />
          <circle cx="92" cy="186" r="4" fill="#6E7BFF" opacity="0.9" />
        </g>
        <g opacity="0.95">
          <rect x="58" y="248" width="58" height="46" rx="10" fill="#141E37" stroke="#5A6B96" />
          <path d="M73 281 L73 262 L83 271 L92 258 L101 267" stroke="#8FE7FF" strokeWidth="2" fill="none" />
        </g>
        <g opacity="0.95">
          <rect x="62" y="335" width="52" height="38" rx="10" fill="#1A2642" stroke="#6476A6" />
          <rect x="72" y="346" width="6" height="18" rx="2" fill="#7BA4FF" />
          <rect x="82" y="352" width="6" height="12" rx="2" fill="#8EE8FF" />
          <rect x="92" y="341" width="6" height="23" rx="2" fill="#6F76FF" />
        </g>

        {[96, 182, 270, 354].map((y) => (
          <g key={`left-tag-${y}`}>
            <rect x="156" y={y - 18} width="132" height="36" rx="8" fill="#111C33" stroke="#4A5A84" opacity="0.9" />
            <circle cx="174" cy={y} r="3.5" fill="#89D7FF" />
            <rect x="184" y={y - 2} width="38" height="4" rx="2" fill="#89D7FF" opacity="0.7" />
            <rect x="226" y={y - 2} width="24" height="4" rx="2" fill="#7477FF" opacity="0.8" />
          </g>
        ))}

        <path d="M290 96 C 365 64, 430 108, 520 220" stroke="url(#leftFlow)" strokeWidth="2.4" fill="none" />
        <path d="M290 180 C 380 165, 448 176, 520 220" stroke="url(#leftFlow)" strokeWidth="2.8" fill="none" />
        <path d="M290 270 C 375 292, 448 240, 520 220" stroke="url(#leftFlow)" strokeWidth="2.2" fill="none" strokeDasharray="5 5" />
        <path d="M290 354 C 390 390, 450 302, 520 220" stroke="url(#leftFlow)" strokeWidth="2.6" fill="none" />

        <polygon points="600,78 660,246 540,246" fill="url(#prismFront)" filter="url(#heroGlow)" />
        <polygon points="600,78 724,246 660,246" fill="url(#prismSide)" opacity="0.92" />
        <polygon points="540,246 660,246 600,356" fill="url(#prismBase)" opacity="0.95" />
        <line x1="600" y1="78" x2="600" y2="356" stroke="#DFD5FF" opacity="0.45" />
        <line x1="600" y1="78" x2="540" y2="246" stroke="#DFD5FF" opacity="0.28" />
        <line x1="600" y1="78" x2="660" y2="246" stroke="#DFD5FF" opacity="0.28" />

        <path d="M682 220 C 760 160, 820 118, 930 106" stroke="url(#rightFlow)" strokeWidth="2.6" fill="none" />
        <path d="M682 220 C 758 216, 840 208, 930 204" stroke="url(#rightFlow)" strokeWidth="2.6" fill="none" />
        <path d="M682 220 C 772 280, 844 300, 930 322" stroke="url(#rightFlow)" strokeWidth="2.6" fill="none" />

        <g>
          <rect x="938" y="76" width="214" height="86" rx="14" fill="#121A2F" stroke="#4B5D89" />
          <text x="964" y="106" fill="#A8B9E6" fontSize="13" letterSpacing="1.4">KPI SNAPSHOT</text>
          <text x="964" y="138" fill="#FFFFFF" fontSize="30" fontWeight="700">$2.25K</text>
          <text x="1086" y="138" fill="#8FE8FF" fontSize="20" fontWeight="700">99%</text>
        </g>

        <g>
          <rect x="938" y="177" width="214" height="78" rx="14" fill="#11192D" stroke="#4B5D89" />
          <circle cx="978" cy="216" r="20" fill="none" stroke="#6D72FF" strokeWidth="10" />
          <path d="M978 196 A 20 20 0 0 1 995 228" stroke="#8FE8FF" strokeWidth="10" fill="none" />
          <rect x="1022" y="198" width="16" height="36" rx="3" fill="#8FE8FF" />
          <rect x="1044" y="190" width="16" height="44" rx="3" fill="#6E71FF" />
          <rect x="1066" y="204" width="16" height="30" rx="3" fill="#7EA6FF" />
          <rect x="1088" y="184" width="16" height="50" rx="3" fill="#A4A1FF" />
        </g>

        <g>
          <rect x="938" y="270" width="214" height="96" rx="14" fill="#121A2F" stroke="#4B5D89" />
          <text x="962" y="300" fill="#A8B9E6" fontSize="13" letterSpacing="1.2">ACTIONABLE INSIGHT</text>
          <text x="962" y="326" fill="#EAF2FF" fontSize="15">Revenue up 18% after model</text>
          <text x="962" y="348" fill="#EAF2FF" fontSize="15">identified conversion bottleneck.</text>
        </g>
      </svg>
    </div>
  );
}
