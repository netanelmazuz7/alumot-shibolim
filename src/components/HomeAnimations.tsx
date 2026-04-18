"use client";

/**
 * Polished SVG animations for the homepage.
 * Every animation is a single viewBox-scaled SVG - predictable at any size,
 * no emoji, consistent palette, smooth easing.
 */

/* =========================================================
   Icons that sit inside a small circular badge (80x80)
   ========================================================= */

/** מוגנים יחד - שני אנשים רכונים פנימה סביב מגן פועם */
export function ProtectedTogetherAnimation() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Left person */}
      <g className="anim-lean-left" style={{ color: "#2d8a4e" }}>
        <circle cx="22" cy="30" r="7" fill="currentColor" />
        <path
          d="M 12 44 Q 22 39 32 44 L 32 62 L 12 62 Z"
          fill="currentColor"
        />
      </g>
      {/* Right person */}
      <g className="anim-lean-right" style={{ color: "#2d8a4e" }}>
        <circle cx="98" cy="30" r="7" fill="currentColor" />
        <path
          d="M 88 44 Q 98 39 108 44 L 108 62 L 88 62 Z"
          fill="currentColor"
        />
      </g>
      {/* Shield center */}
      <g className="anim-shield-breathe">
        <path
          d="M 60 18 L 78 26 L 78 44 Q 78 58 60 66 Q 42 58 42 44 L 42 26 Z"
          fill="#2d8a4e"
        />
        <path
          d="M 60 18 L 78 26 L 78 44 Q 78 58 60 66 Q 42 58 42 44 L 42 26 Z"
          fill="none"
          stroke="#1e6b38"
          strokeWidth="1.5"
        />
        <path
          d="M 51 42 L 57 49 L 70 36"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

/** חוסכים יחד - מטבעות נופלים על ערימה שגדלה */
export function SavingTogetherAnimation() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Falling coins */}
      <g className="anim-coin-drop-1">
        <circle cx="60" cy="18" r="6.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1.3" />
        <text x="60" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
      </g>
      <g className="anim-coin-drop-2">
        <circle cx="42" cy="18" r="6.5" fill="#e8c46a" stroke="#b8912e" strokeWidth="1.3" />
        <text x="42" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
      </g>
      <g className="anim-coin-drop-3">
        <circle cx="78" cy="18" r="6.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1.3" />
        <text x="78" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
      </g>
      {/* Stack growing */}
      <g className="anim-stack-rise">
        <ellipse cx="60" cy="64" rx="32" ry="4.5" fill="#b8912e" opacity="0.25" />
        <rect x="30" y="56" width="60" height="8" rx="4" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
        <rect x="33" y="48" width="54" height="8" rx="4" fill="#e8c46a" stroke="#b8912e" strokeWidth="1.2" />
        <rect x="36" y="40" width="48" height="8" rx="4" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* =========================================================
   Full-width strips for the claim process grid
   Each strip is a single SVG, 280x64 viewBox, that scales to card width.
   ========================================================= */

const stripClass =
  "w-full h-16 mb-4 rounded-xl";

function StripFrame({
  bg,
  children,
}: {
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${stripClass} overflow-hidden`} style={{ background: bg }}>
      <svg
        viewBox="0 0 280 64"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

/** רכב מפורט וחזותי */
function Car({
  x,
  y,
  color,
  flip = false,
  className,
}: {
  x: number;
  y: number;
  color: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y})${flip ? " scale(-1 1)" : ""}`}
      className={className}
    >
      {/* shadow */}
      <ellipse cx="0" cy="20" rx="28" ry="2.5" fill="#000" opacity="0.15" />
      {/* body */}
      <path
        d="M -28 12 L -22 2 Q -19 -2 -14 -2 L 14 -2 Q 19 -2 22 2 L 28 12 L 28 16 Q 28 19 25 19 L -25 19 Q -28 19 -28 16 Z"
        fill={color}
      />
      {/* windows */}
      <path
        d="M -18 0 Q -16 -1 -13 -1 L -1 -1 L -1 10 L -20 10 Z"
        fill="#a8c4e0"
        opacity="0.85"
      />
      <path
        d="M 1 -1 L 13 -1 Q 16 -1 18 0 L 20 10 L 1 10 Z"
        fill="#a8c4e0"
        opacity="0.85"
      />
      {/* wheels */}
      <circle cx="-16" cy="19" r="4.5" fill="#1a1a1a" />
      <circle cx="-16" cy="19" r="2" fill="#555" />
      <circle cx="16" cy="19" r="4.5" fill="#1a1a1a" />
      <circle cx="16" cy="19" r="2" fill="#555" />
      {/* headlight */}
      <circle cx="26" cy="10" r="1.5" fill="#fffbe6" />
    </g>
  );
}

/** 1. דיווח על אירוע - שני רכבים נוסעים זה מול זה ומתנגשים */
export function CarsCollideStrip() {
  return (
    <StripFrame bg="linear-gradient(90deg, #f5e6c8 0%, #faf3e6 50%, #f5e6c8 100%)">
      {/* road lines */}
      <line
        x1="0"
        y1="50"
        x2="280"
        y2="50"
        stroke="#1a365d"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="6 8"
      />
      {/* Right-side car (blue) approaches from right */}
      <g className="anim-car-r">
        <Car x={220} y={38} color="#1a365d" />
      </g>
      {/* Left-side car (red) approaches from left, flipped */}
      <g className="anim-car-l">
        <Car x={60} y={38} color="#dc3545" flip />
      </g>
      {/* Impact sparks at center */}
      <g className="anim-spark" transform="translate(140 36)">
        <line x1="0" y1="0" x2="0" y2="-12" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="8" y2="-8" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-8" y2="-8" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="12" y2="0" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-12" y2="0" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="0" r="3" fill="#d4a843" />
      </g>
    </StripFrame>
  );
}

/** 2. ניתוח AI - רכב במרכז, קרן סריקה עוברת מעליו, נקודות זיהוי */
export function AIScanStrip() {
  return (
    <StripFrame bg="linear-gradient(135deg, #0f2341 0%, #1a365d 100%)">
      {/* tech grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d4a843" strokeOpacity="0.12" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="scanGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#d4a843" stopOpacity="0" />
          <stop offset="50%" stopColor="#e8c46a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4a843" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="280" height="64" fill="url(#grid)" />

      {/* Centered car */}
      <g transform="translate(140 34)">
        <Car x={0} y={0} color="#e8c46a" />
      </g>

      {/* Detection dots on car */}
      <circle cx="128" cy="32" r="2.5" fill="#d4a843" className="anim-dot-1">
        <title>detect</title>
      </circle>
      <circle cx="152" cy="30" r="2.5" fill="#d4a843" className="anim-dot-2" />
      <circle cx="140" cy="46" r="2.5" fill="#d4a843" className="anim-dot-3" />

      {/* Scan beam */}
      <rect
        x="-60"
        y="0"
        width="60"
        height="64"
        fill="url(#scanGrad)"
        className="anim-scan-sweep"
      />

      {/* AI label */}
      <g transform="translate(18 14)">
        <rect x="-10" y="-8" width="32" height="16" rx="3" fill="#d4a843" />
        <text x="6" y="3" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1a365d">AI</text>
      </g>
    </StripFrame>
  );
}

/** 3. אישור שמאי - checklist של 3 שורות שמסמנות ✓ ברצף */
export function AppraiserStrip() {
  return (
    <StripFrame bg="linear-gradient(90deg, #f0f9f3 0%, #ffffff 100%)">
      {/* Document */}
      <g transform="translate(40 8)">
        <rect x="0" y="0" width="200" height="48" rx="4" fill="white" stroke="#2d8a4e" strokeOpacity="0.3" strokeWidth="1.5" />
        {/* Header bar */}
        <rect x="0" y="0" width="200" height="8" rx="4" fill="#2d8a4e" />
        <rect x="0" y="4" width="200" height="4" fill="#2d8a4e" />

        {/* Row 1 */}
        <g className="anim-row-1">
          <rect x="12" y="14" width="10" height="10" rx="2" fill="none" stroke="#2d8a4e" strokeWidth="1.5" />
          <rect x="28" y="17" width="100" height="4" rx="2" fill="#1a365d" opacity="0.5" />
        </g>
        <path d="M 14 19 L 17 22 L 21 16" stroke="#2d8a4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="anim-check-1" />

        {/* Row 2 */}
        <g className="anim-row-2">
          <rect x="12" y="28" width="10" height="10" rx="2" fill="none" stroke="#2d8a4e" strokeWidth="1.5" />
          <rect x="28" y="31" width="120" height="4" rx="2" fill="#1a365d" opacity="0.5" />
        </g>
        <path d="M 14 33 L 17 36 L 21 30" stroke="#2d8a4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="anim-check-2" />

        {/* Approved stamp */}
        <g className="anim-check-3" transform="translate(170 30)">
          <rect x="-24" y="-10" width="48" height="20" rx="3" fill="none" stroke="#2d8a4e" strokeWidth="2" transform="rotate(-8)" />
          <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="900" fill="#2d8a4e" transform="rotate(-8)">אושר</text>
        </g>
      </g>
    </StripFrame>
  );
}

/** 4. חלוקת עלות - מטבע מרכזי שמתחלק לחברים מסביב */
export function CostDivideStrip() {
  return (
    <StripFrame bg="linear-gradient(90deg, #faf3e6 0%, #ffffff 50%, #faf3e6 100%)">
      {/* Dashed paths from center to 4 corners */}
      <g stroke="#d4a843" strokeOpacity="0.4" strokeDasharray="2 3" strokeWidth="1" fill="none">
        <line x1="140" y1="32" x2="60" y2="16" />
        <line x1="140" y1="32" x2="220" y2="16" />
        <line x1="140" y1="32" x2="60" y2="48" />
        <line x1="140" y1="32" x2="220" y2="48" />
      </g>

      {/* 4 recipient people */}
      {[
        { x: 52, y: 18 },
        { x: 228, y: 18 },
        { x: 52, y: 46 },
        { x: 228, y: 46 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle cx="0" cy="-4" r="3.5" fill="#1a365d" />
          <path d="M -6 4 Q 0 0 6 4 L 6 10 L -6 10 Z" fill="#1a365d" />
        </g>
      ))}

      {/* Splitting coins */}
      <g transform="translate(140 32)">
        <g className="anim-split-tl">
          <MiniCoin />
        </g>
        <g className="anim-split-tr">
          <MiniCoin />
        </g>
        <g className="anim-split-bl">
          <MiniCoin />
        </g>
        <g className="anim-split-br">
          <MiniCoin />
        </g>

        {/* Central coin */}
        <g className="anim-center-pulse">
          <circle r="13" fill="#d4a843" stroke="#b8912e" strokeWidth="1.5" />
          <circle r="10" fill="none" stroke="#b8912e" strokeWidth="0.8" opacity="0.6" />
          <text y="4" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1a365d">₪</text>
        </g>
      </g>
    </StripFrame>
  );
}

function MiniCoin() {
  return (
    <g>
      <circle r="7" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
      <text y="3" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1a365d">₪</text>
    </g>
  );
}

/** 5. תשלום מהיר - שטר עף מבנק ליד המקבל לאורך נתיב מקווקו */
export function FastPaymentStrip() {
  return (
    <StripFrame bg="linear-gradient(90deg, #faf3e6 0%, #ffffff 50%, #f0f9f3 100%)">
      {/* Dotted trajectory */}
      <path
        d="M 230 32 Q 140 12 50 32"
        stroke="#d4a843"
        strokeOpacity="0.4"
        strokeDasharray="2 4"
        strokeWidth="1"
        fill="none"
      />

      {/* Right: Bank building */}
      <g transform="translate(234 20)" className="anim-endpoint">
        <rect x="-14" y="6" width="28" height="18" rx="1" fill="#1a365d" />
        <path d="M -16 6 L 0 -2 L 16 6 Z" fill="#1a365d" />
        <rect x="-10" y="10" width="4" height="14" fill="#d4a843" />
        <rect x="-2" y="10" width="4" height="14" fill="#d4a843" />
        <rect x="6" y="10" width="4" height="14" fill="#d4a843" />
      </g>

      {/* Left: Wallet receiving */}
      <g transform="translate(46 20)" className="anim-endpoint">
        <rect x="-14" y="0" width="28" height="20" rx="3" fill="#2d8a4e" />
        <path d="M -10 0 Q -10 -6 -4 -6 L 4 -6 Q 10 -6 10 0" fill="none" stroke="#1e6b38" strokeWidth="1.5" />
        <circle cx="8" cy="10" r="2.5" fill="#d4a843" />
      </g>

      {/* Flying banknote */}
      <g className="anim-money-travel" style={{ transformOrigin: "140px 32px" }}>
        <g transform="translate(140 32)">
          <rect x="-20" y="-10" width="40" height="20" rx="2" fill="#2d8a4e" stroke="#1e6b38" strokeWidth="1" />
          <rect x="-18" y="-8" width="36" height="16" rx="1" fill="none" stroke="#d4a843" strokeOpacity="0.6" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="5.5" fill="none" stroke="#d4a843" strokeWidth="1.3" />
          <text y="3" textAnchor="middle" fontSize="9" fontWeight="900" fill="#d4a843">₪</text>
        </g>
      </g>
    </StripFrame>
  );
}

/** 6. שקיפות מלאה - עין עם טבעות שמתרחבות מסביב */
export function TransparencyStrip() {
  return (
    <StripFrame bg="linear-gradient(90deg, #f0f9f3 0%, #ffffff 100%)">
      {/* Background data ticks - subtle transparency */}
      <g opacity="0.15" stroke="#2d8a4e" strokeWidth="1">
        <line x1="30" y1="12" x2="50" y2="12" />
        <line x1="30" y1="20" x2="70" y2="20" />
        <line x1="30" y1="44" x2="60" y2="44" />
        <line x1="30" y1="52" x2="80" y2="52" />
        <line x1="210" y1="12" x2="250" y2="12" />
        <line x1="210" y1="20" x2="240" y2="20" />
        <line x1="210" y1="44" x2="250" y2="44" />
        <line x1="210" y1="52" x2="230" y2="52" />
      </g>

      {/* Expanding rings */}
      <g transform="translate(140 32)">
        <circle r="14" fill="none" stroke="#2d8a4e" strokeWidth="1.5" className="anim-ring-1" />
        <circle r="14" fill="none" stroke="#2d8a4e" strokeWidth="1.5" className="anim-ring-2" />
        <circle r="14" fill="none" stroke="#2d8a4e" strokeWidth="1.5" className="anim-ring-3" />

        {/* Eye */}
        <g className="anim-eye-blink">
          <ellipse cx="0" cy="0" rx="16" ry="10" fill="white" stroke="#2d8a4e" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="6" fill="#2d8a4e" />
          <circle cx="2" cy="-2" r="1.8" fill="white" />
        </g>
      </g>
    </StripFrame>
  );
}
