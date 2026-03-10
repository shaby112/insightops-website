export function LuminaPipeline() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040A18]">
      <svg
        viewBox="0 0 1200 420"
        className="w-full h-auto"
        role="img"
        aria-label="Data sources flowing through the Kuantra prism into structured insights"
      >
        <defs>
          {/* ── Glow filters ── */}
          <filter id="megaGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="45" />
          </filter>
          <filter id="prismGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-10%" y="-300%" width="120%" height="700%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Prism gradients ── */}
          <linearGradient id="prismFront" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FF70FF" />
            <stop offset="30%" stopColor="#CC40EE" />
            <stop offset="70%" stopColor="#7030BB" />
            <stop offset="100%" stopColor="#3A1888" />
          </linearGradient>
          <linearGradient id="prismRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B0DEFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2848AA" stopOpacity="0.5" />
          </linearGradient>

          {/* ── Line gradients ── */}
          <linearGradient id="lineL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1880CC" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#28AAFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#40C8FF" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="lineR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40C0FF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#28A0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1870CC" stopOpacity="0.15" />
          </linearGradient>

          {/* ── Card fill ── */}
          <linearGradient id="cardFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E1A30" />
            <stop offset="100%" stopColor="#081220" />
          </linearGradient>
          <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#121E38" />
            <stop offset="100%" stopColor="#0A1428" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="1200" height="420" fill="#040A18" />

        {/* Ambient center glow — large diffuse pink/purple */}
        <ellipse cx="590" cy="210" rx="220" ry="160" fill="#CC30EE" filter="url(#megaGlow)" opacity="0.55" />
        <ellipse cx="590" cy="210" rx="100" ry="80" fill="#EE50FF" filter="url(#megaGlow)" opacity="0.35" />

        {/* ════════════════════════════════════════
            LEFT COLUMN A — Large source icons
            ════════════════════════════════════════ */}
        {/* Icon 1 — Database */}
        <g>
          <rect x="42" y="62" width="68" height="56" rx="12" fill="url(#iconBg)" stroke="#1E3055" strokeWidth="1" />
          <ellipse cx="76" cy="78" rx="18" ry="6" fill="none" stroke="#3A78CC" strokeWidth="1.5" opacity="0.8" />
          <rect x="58" y="78" width="36" height="20" fill="none" stroke="#3A78CC" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="76" cy="98" rx="18" ry="6" fill="none" stroke="#3A78CC" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* Icon 2 — Server/cloud */}
        <g>
          <rect x="46" y="152" width="62" height="50" rx="12" fill="url(#iconBg)" stroke="#1E3055" strokeWidth="1" />
          <rect x="56" y="162" width="42" height="12" rx="4" fill="none" stroke="#4A88DD" strokeWidth="1.5" opacity="0.7" />
          <rect x="56" y="178" width="42" height="12" rx="4" fill="none" stroke="#4A88DD" strokeWidth="1.5" opacity="0.5" />
          <circle cx="64" cy="168" r="3" fill="#50A0FF" opacity="0.9" />
          <circle cx="64" cy="184" r="3" fill="#50A0FF" opacity="0.7" />
        </g>

        {/* Icon 3 — Chart/analytics */}
        <g>
          <rect x="44" y="244" width="64" height="50" rx="12" fill="url(#iconBg)" stroke="#1E3055" strokeWidth="1" />
          <polyline points="54,286 62,272 70,279 79,264 88,271 98,260" stroke="#4AB0FF" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <line x1="54" y1="288" x2="98" y2="288" stroke="#243A5A" strokeWidth="1" />
        </g>

        {/* Icon 4 — API/code */}
        <g>
          <rect x="46" y="330" width="60" height="46" rx="12" fill="url(#iconBg)" stroke="#1E3055" strokeWidth="1" />
          <text x="56" y="359" fill="#5068EE" fontSize="16" fontFamily="monospace" fontWeight="700" opacity="0.9">{`</>`}</text>
        </g>

        {/* ════════════════════════════════════════
            SHORT DOTTED LINES: Col A → Col B
            ════════════════════════════════════════ */}
        {[90, 177, 269, 353].map((y) => (
          <line key={`dot-${y}`} x1="112" y1={y} x2="152" y2={y}
            stroke="#2A4878" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
        ))}

        {/* ════════════════════════════════════════
            LEFT COLUMN B — Mini dashboard cards
            ════════════════════════════════════════ */}
        {[
          { y: 62, icon: "bars" },
          { y: 152, icon: "bars2" },
          { y: 244, icon: "line" },
          { y: 330, icon: "bars3" },
        ].map(({ y, icon }) => (
          <g key={`card-${y}`}>
            <rect x="152" y={y} width="96" height="52" rx="10" fill="url(#iconBg)" stroke="#1C2E4A" strokeWidth="1" opacity="0.95" />
            {/* Mini bar chart in card */}
            <rect x="162" y={y + 20} width="7" height="18" rx="2" fill="#3A88EE" opacity="0.8" />
            <rect x="173" y={y + 14} width="7" height="24" rx="2" fill="#28A0FF" opacity="0.9" />
            <rect x="184" y={y + 24} width="7" height="14" rx="2" fill="#3A88EE" opacity="0.75" />
            <rect x="195" y={y + 10} width="7" height="28" rx="2" fill="#60C0FF" opacity="0.85" />
            <line x1="162" y1={y + 40} x2="207" y2={y + 40} stroke="#1A2E48" strokeWidth="1" />
            {/* Subtle glow on active bar */}
            <rect x="195" y={y + 10} width="7" height="28" rx="2" fill="#60C0FF" filter="url(#softBlur)" opacity="0.5" />
          </g>
        ))}

        {/* ════════════════════════════════════════
            THICK FLOWING LINES: Col B → Prism
            ════════════════════════════════════════ */}
        {/* Line 1 — top source → prism top-left */}
        <path d="M250 88 C 320 88, 390 64, 460 180"
          stroke="url(#lineL)" strokeWidth="5" fill="none" filter="url(#lineGlow)" opacity="0.85" />
        <path d="M250 88 C 320 88, 390 64, 460 180"
          stroke="#50C8FF" strokeWidth="1.5" fill="none" opacity="0.9" />

        {/* Line 2 — upper-mid */}
        <path d="M250 178 C 326 178, 394 160, 460 192"
          stroke="url(#lineL)" strokeWidth="5.5" fill="none" filter="url(#lineGlow)" opacity="0.9" strokeDasharray="none" />
        <path d="M250 178 C 326 178, 394 160, 460 192"
          stroke="#40C0FF" strokeWidth="1.5" fill="none" opacity="0.95" />

        {/* Line 3 — lower-mid */}
        <path d="M250 270 C 334 270, 396 230, 460 208"
          stroke="url(#lineL)" strokeWidth="5" fill="none" filter="url(#lineGlow)" opacity="0.85" />
        <path d="M250 270 C 334 270, 396 230, 460 208"
          stroke="#38BCFF" strokeWidth="1.5" fill="none" opacity="0.9" />

        {/* Line 4 — bottom source → prism bottom-left */}
        <path d="M250 353 C 336 353, 400 300, 460 222"
          stroke="url(#lineL)" strokeWidth="4" fill="none" filter="url(#lineGlow)" opacity="0.8" strokeDasharray="10 4" />
        <path d="M250 353 C 336 353, 400 300, 460 222"
          stroke="#30B8FF" strokeWidth="1.2" fill="none" opacity="0.85" strokeDasharray="10 4" />

        {/* ════════════════════════════════════
            PRISM — the glowing hero
            ════════════════════════════════════ */}
        {/* Large diffuse pink halo (behind the prism shape) */}
        <ellipse cx="590" cy="195" rx="135" ry="110" fill="#EE50FF" filter="url(#prismGlow)" opacity="0.45" />

        {/* Prism — front-left face (bright pink/magenta) */}
        <polygon
          points="590,60 455,305 660,305"
          fill="url(#prismFront)"
          filter="url(#prismGlow)"
          opacity="0.96"
        />

        {/* Prism — right face (blue-silver, 3D depth) */}
        <polygon
          points="590,60 660,305 740,305"
          fill="url(#prismRight)"
          opacity="0.75"
        />

        {/* Edge lines for crisp 3D geometry */}
        <line x1="590" y1="60" x2="455" y2="305" stroke="#F0C0FF" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="590" y1="60" x2="660" y2="305" stroke="#F0C0FF" strokeOpacity="0.25" strokeWidth="0.8" />
        <line x1="590" y1="60" x2="740" y2="305" stroke="#C0D8FF" strokeOpacity="0.2" strokeWidth="0.8" />

        {/* Bright apex highlight */}
        <circle cx="590" cy="60" r="5" fill="#FFAAFF" filter="url(#iconGlow)" opacity="0.9" />

        {/* ════════════════════════════════════
            CLEAN FLOW LINES: Prism → Output
            ════════════════════════════════════ */}
        {/* Top output line */}
        <path d="M680 165 C 740 140, 800 110, 860 95"
          stroke="url(#lineR)" strokeWidth="4.5" fill="none" filter="url(#lineGlow)" opacity="0.9" />
        <path d="M680 165 C 740 140, 800 110, 860 95"
          stroke="#50C8FF" strokeWidth="1.5" fill="none" opacity="0.95" />

        {/* Mid output line */}
        <path d="M686 200 C 754 198, 808 196, 860 194"
          stroke="url(#lineR)" strokeWidth="5" fill="none" filter="url(#lineGlow)" opacity="0.9" />
        <path d="M686 200 C 754 198, 808 196, 860 194"
          stroke="#48C4FF" strokeWidth="1.5" fill="none" opacity="0.95" />

        {/* Bottom output line */}
        <path d="M686 235 C 756 268, 806 300, 860 330"
          stroke="url(#lineR)" strokeWidth="4" fill="none" filter="url(#lineGlow)" opacity="0.85" />
        <path d="M686 235 C 756 268, 806 300, 860 330"
          stroke="#38B8FF" strokeWidth="1.2" fill="none" opacity="0.9" />

        {/* ════════════════════════════════════
            RIGHT — small output cards (mid-tier)
            ════════════════════════════════════ */}
        {[
          { y: 68, label: "→" },
          { y: 170, label: "→" },
          { y: 306, label: "→" },
        ].map(({ y }, i) => (
          <g key={`rcrd-${i}`}>
            <rect x="860" y={y} width="68" height="46" rx="9" fill="url(#cardFill)" stroke="#1A2E4A" strokeWidth="1" />
            {/* Horizontal dashed lines inside */}
            <line x1="870" y1={y + 14} x2="918" y2={y + 14} stroke="#2A4060" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="870" y1={y + 22} x2="908" y2={y + 22} stroke="#2A4060" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="870" y1={y + 30} x2="914" y2={y + 30} stroke="#2A4060" strokeWidth="1.5" strokeDasharray="5 3" />
            {/* Arrow */}
            <text x="928" y={y + 27} fill="#3A7ACC" fontSize="16" fontWeight="600">›</text>
          </g>
        ))}

        {/* ════════════════════════════════════
            RIGHT — KPI output cards (far right)
            ════════════════════════════════════ */}
        {/* Card 1: Numbers */}
        <rect x="956" y="48" width="228" height="82" rx="13" fill="url(#cardFill)" stroke="#1A2E4A" strokeWidth="1" />
        <text x="974" y="76" fill="#3A5880" fontSize="10" letterSpacing="2.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="600">KPI SNAPSHOT</text>
        <text x="974" y="112" fill="#FFFFFF" fontSize="30" fontWeight="700" fontFamily="'Space Grotesk',sans-serif">$2.4K</text>
        <text x="1096" y="112" fill="#60DCFF" fontSize="22" fontWeight="700" fontFamily="'Space Grotesk',sans-serif">97%</text>

        {/* Card 2: Donut + Bars */}
        <rect x="956" y="152" width="228" height="76" rx="13" fill="url(#cardFill)" stroke="#1A2E4A" strokeWidth="1" />
        <circle cx="990" cy="190" r="23" fill="none" stroke="#2A30AA" strokeWidth="9" opacity="0.55" />
        <path d="M990 167 A 23 23 0 0 1 1010 225" stroke="#50DCFF" strokeWidth="9" fill="none" strokeLinecap="round" />
        <rect x="1034" y="182" width="13" height="28" rx="3" fill="#50DCFF" opacity="0.75" />
        <rect x="1053" y="173" width="13" height="37" rx="3" fill="#4858FF" opacity="0.75" />
        <rect x="1072" y="186" width="13" height="24" rx="3" fill="#58AAFF" opacity="0.75" />
        <rect x="1091" y="170" width="13" height="40" rx="3" fill="#8060FF" opacity="0.75" />
        <rect x="1110" y="179" width="13" height="31" rx="3" fill="#48AAFF" opacity="0.75" />
        <rect x="1129" y="193" width="13" height="17" rx="3" fill="#60D8FF" opacity="0.75" />
        <line x1="1034" y1="220" x2="1155" y2="220" stroke="#1C2E48" strokeWidth="1" />

        {/* Card 3: Insight text */}
        <rect x="956" y="252" width="228" height="86" rx="13" fill="url(#cardFill)" stroke="#1A2E4A" strokeWidth="1" />
        <text x="974" y="278" fill="#3A5880" fontSize="10" letterSpacing="2.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="600">ACTIONABLE INSIGHT</text>
        <text x="974" y="304" fill="#B8D0F0" fontSize="13" fontFamily="'Space Grotesk',sans-serif">Revenue +18% after model</text>
        <text x="974" y="324" fill="#B8D0F0" fontSize="13" fontFamily="'Space Grotesk',sans-serif">identified key bottleneck.</text>

        {/* ── Subtle sparkle accents ── */}
        <g filter="url(#iconGlow)" opacity="0.6">
          <polygon points="500,130 502,124 504,130 498,127 506,127" fill="#F0C0FF" />
          <polygon points="668,142 670,136 672,142 666,139 674,139" fill="#A0E4FF" />
          <polygon points="568,358 570,352 572,358 566,355 574,355" fill="#D0A8FF" />
        </g>
      </svg>
    </div>
  );
}
