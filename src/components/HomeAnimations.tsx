"use client";

/**
 * Clean, minimal SVG animations for the homepage.
 * No backgrounds on strips - they sit directly on the white card.
 */

/* =========================================================
   Badge-sized animations (80x80 inside colored circles)
   ========================================================= */

/** מוגנים יחד - שני אנשים רכונים סביב מגן פועם */
export function ProtectedTogetherAnimation() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
      <g className="anim-lean-left" style={{ color: "#2d8a4e" }}>
        <circle cx="22" cy="30" r="7" fill="currentColor" />
        <path d="M 12 44 Q 22 39 32 44 L 32 62 L 12 62 Z" fill="currentColor" />
      </g>
      <g className="anim-lean-right" style={{ color: "#2d8a4e" }}>
        <circle cx="98" cy="30" r="7" fill="currentColor" />
        <path d="M 88 44 Q 98 39 108 44 L 108 62 L 88 62 Z" fill="currentColor" />
      </g>
      <g className="anim-shield-breathe">
        <path
          d="M 60 18 L 78 26 L 78 44 Q 78 58 60 66 Q 42 58 42 44 L 42 26 Z"
          fill="#2d8a4e"
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

/** חוסכים יחד - 3 מגדלי מטבעות בגובה עולה, נבנים ברצף */
export function SavingTogetherAnimation() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
      {/* Ground line */}
      <line x1="20" y1="70" x2="100" y2="70" stroke="#b8912e" strokeOpacity="0.35" strokeWidth="1" />

      {/* Stack 1 (left, short - 2 coins) */}
      <g className="anim-stack-col-1" style={{ transformOrigin: "35px 70px", transformBox: "fill-box" } as React.CSSProperties}>
        <ellipse cx="35" cy="66" rx="11" ry="3.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="35" cy="59" rx="11" ry="3.5" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
      </g>

      {/* Stack 2 (middle, medium - 3 coins) */}
      <g className="anim-stack-col-2" style={{ transformOrigin: "60px 70px", transformBox: "fill-box" } as React.CSSProperties}>
        <ellipse cx="60" cy="66" rx="11" ry="3.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="60" cy="59" rx="11" ry="3.5" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="60" cy="52" rx="11" ry="3.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
      </g>

      {/* Stack 3 (right, tallest - 4 coins) */}
      <g className="anim-stack-col-3" style={{ transformOrigin: "85px 70px", transformBox: "fill-box" } as React.CSSProperties}>
        <ellipse cx="85" cy="66" rx="11" ry="3.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="85" cy="59" rx="11" ry="3.5" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="85" cy="52" rx="11" ry="3.5" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
        <ellipse cx="85" cy="45" rx="11" ry="3.5" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
      </g>

      {/* Upward arrow indicator */}
      <g className="anim-growth-arrow" style={{ transformOrigin: "60px 40px", transformBox: "fill-box" } as React.CSSProperties}>
        <path
          d="M 26 38 L 60 22 L 94 30"
          stroke="#2d8a4e"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset="0"
        />
        <path d="M 88 26 L 96 28 L 92 35" fill="none" stroke="#2d8a4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* =========================================================
   Process strips - clean SVGs on transparent background
   Each is 280x80 viewBox, rendered full card width
   ========================================================= */

function Strip({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-20 mb-4">
      <svg
        viewBox="0 0 280 80"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

/* ---- Shared: detailed car shape centered around (0,0) ---- */
function CarGlyph({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <ellipse cx="0" cy="22" rx="30" ry="2.5" fill="#000" opacity="0.18" />
      <path
        d="M -30 14 L -23 2 Q -20 -2 -14 -2 L 14 -2 Q 20 -2 23 2 L 30 14 L 30 18 Q 30 21 27 21 L -27 21 Q -30 21 -30 18 Z"
        fill={color}
      />
      <path d="M -19 0 Q -17 -1 -14 -1 L -2 -1 L -2 11 L -21 11 Z" fill="#a8c4e0" opacity="0.9" />
      <path d="M 2 -1 L 14 -1 Q 17 -1 19 0 L 21 11 L 2 11 Z" fill="#a8c4e0" opacity="0.9" />
      <circle cx="-17" cy="21" r="5" fill="#1a1a1a" />
      <circle cx="-17" cy="21" r="2" fill="#555" />
      <circle cx="17" cy="21" r="5" fill="#1a1a1a" />
      <circle cx="17" cy="21" r="2" fill="#555" />
      <circle cx="28" cy="11" r="1.5" fill="#fffbe6" />
    </g>
  );
}

/** 1. דיווח על אירוע - שני רכבים מכיוונים מנוגדים מתנגשים באמצע */
export function CarsCollideStrip() {
  return (
    <Strip>
      {/* ground line */}
      <line x1="20" y1="60" x2="260" y2="60" stroke="#1a365d" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 6" />

      {/* Left car - comes from left, moves toward center, bounces back */}
      <g transform="translate(140 36)">
        <g className="anim-car-from-left">
          <g transform="translate(-30 0)">
            <CarGlyph color="#dc3545" />
          </g>
        </g>
      </g>

      {/* Right car - comes from right, moves toward center, bounces back */}
      <g transform="translate(140 36)">
        <g className="anim-car-from-right">
          <g transform="translate(30 0)">
            <CarGlyph color="#1a365d" flip />
          </g>
        </g>
      </g>

      {/* Impact burst at center */}
      <g className="anim-impact" transform="translate(140 34)">
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="10" y2="-10" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-10" y2="-10" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="14" y2="0" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-14" y2="0" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </Strip>
  );
}

/** 2. ניתוח AI - רכב באמצע, קרן סריקה עוברת מעליו */
export function AIScanStrip() {
  return (
    <Strip>
      <defs>
        <linearGradient id="scanGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#d4a843" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4a843" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d4a843" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform="translate(140 40)">
        <CarGlyph color="#1a365d" />
      </g>

      {/* Detection dots appearing in sequence */}
      <circle cx="126" cy="38" r="3" fill="#d4a843" className="anim-dot-1" />
      <circle cx="154" cy="36" r="3" fill="#d4a843" className="anim-dot-2" />
      <circle cx="140" cy="52" r="3" fill="#d4a843" className="anim-dot-3" />

      {/* Scan beam sweep */}
      <rect x="-60" y="0" width="60" height="80" fill="url(#scanGrad)" className="anim-scan-sweep" />

      {/* Small AI badge */}
      <g transform="translate(30 18)">
        <rect x="-14" y="-9" width="28" height="18" rx="4" fill="#d4a843" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1a365d">AI</text>
      </g>
    </Strip>
  );
}

/** 3. אישור שמאי - רשימת checkboxes שמסמנות ברצף + חותמת אישור */
export function AppraiserStrip() {
  return (
    <Strip>
      <g transform="translate(50 14)">
        {/* Document outline */}
        <rect x="0" y="0" width="180" height="52" rx="4" fill="white" stroke="#2d8a4e" strokeWidth="1.5" />
        <rect x="0" y="0" width="180" height="7" rx="4" fill="#2d8a4e" />
        <rect x="0" y="3" width="180" height="4" fill="#2d8a4e" />

        {/* Row 1 */}
        <rect x="12" y="16" width="10" height="10" rx="2" fill="none" stroke="#2d8a4e" strokeWidth="1.5" />
        <rect x="28" y="19" width="90" height="4" rx="2" fill="#1a365d" opacity="0.4" />
        <path d="M 14 21 L 17 24 L 21 18" stroke="#2d8a4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="anim-check-1" />

        {/* Row 2 */}
        <rect x="12" y="32" width="10" height="10" rx="2" fill="none" stroke="#2d8a4e" strokeWidth="1.5" />
        <rect x="28" y="35" width="110" height="4" rx="2" fill="#1a365d" opacity="0.4" />
        <path d="M 14 37 L 17 40 L 21 34" stroke="#2d8a4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="anim-check-2" />

        {/* Approved stamp */}
        <g className="anim-check-3" transform="translate(148 30) rotate(-8)">
          <rect x="-22" y="-10" width="44" height="20" rx="3" fill="none" stroke="#2d8a4e" strokeWidth="2.2" />
          <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="900" fill="#2d8a4e">אושר</text>
        </g>
      </g>
    </Strip>
  );
}

/** 4. חלוקת עלות - מטבע גדול שמתחלק ל-4 מטבעות שעפים החוצה */
export function CostDivideStrip() {
  return (
    <Strip>
      {/* Central coin that divides */}
      <g transform="translate(140 40)">
        {/* 4 flying pieces */}
        <g className="anim-split-tl">
          <circle r="8" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
          <text y="3" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        <g className="anim-split-tr">
          <circle r="8" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
          <text y="3" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        <g className="anim-split-bl">
          <circle r="8" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
          <text y="3" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        <g className="anim-split-br">
          <circle r="8" fill="#d4a843" stroke="#b8912e" strokeWidth="1.2" />
          <text y="3" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>

        {/* The big coin that pulses before splitting */}
        <g className="anim-center-pulse">
          <circle r="16" fill="#d4a843" stroke="#b8912e" strokeWidth="2" />
          <circle r="12" fill="none" stroke="#b8912e" strokeWidth="0.8" opacity="0.6" />
          <text y="5" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1a365d">₪</text>
        </g>
      </g>
    </Strip>
  );
}

/** 5. תשלום מהיר - שטר עף מבנק לארנק */
export function FastPaymentStrip() {
  return (
    <Strip>
      {/* Bank on right */}
      <g transform="translate(240 28)" className="anim-endpoint">
        <rect x="-16" y="8" width="32" height="20" rx="1.5" fill="#1a365d" />
        <path d="M -18 8 L 0 -2 L 18 8 Z" fill="#1a365d" />
        <rect x="-11" y="12" width="4" height="16" fill="#d4a843" />
        <rect x="-2" y="12" width="4" height="16" fill="#d4a843" />
        <rect x="7" y="12" width="4" height="16" fill="#d4a843" />
      </g>

      {/* Wallet on left */}
      <g transform="translate(40 32)" className="anim-endpoint">
        <rect x="-16" y="-2" width="32" height="22" rx="3" fill="#2d8a4e" />
        <path d="M -12 -2 Q -12 -9 -4 -9 L 4 -9 Q 12 -9 12 -2" fill="none" stroke="#1e6b38" strokeWidth="1.8" />
        <circle cx="10" cy="10" r="2.8" fill="#d4a843" />
      </g>

      {/* Banknote flying from bank to wallet */}
      <g className="anim-money-travel">
        <g transform="translate(140 40)">
          <rect x="-22" y="-11" width="44" height="22" rx="2" fill="#2d8a4e" stroke="#1e6b38" strokeWidth="1" />
          <rect x="-20" y="-9" width="40" height="18" rx="1" fill="none" stroke="#d4a843" strokeOpacity="0.7" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#d4a843" strokeWidth="1.4" />
          <text y="4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#d4a843">₪</text>
        </g>
      </g>
    </Strip>
  );
}

/** 6. שקיפות מלאה - גרף עמודות צומח (נתונים חשופים) */
export function TransparencyStrip() {
  return (
    <Strip>
      {/* Axis */}
      <line x1="60" y1="64" x2="220" y2="64" stroke="#1a365d" strokeOpacity="0.25" strokeWidth="1.2" />
      <line x1="60" y1="16" x2="60" y2="64" stroke="#1a365d" strokeOpacity="0.25" strokeWidth="1.2" />

      {/* Bar 1 */}
      <g className="anim-bar-grow-1">
        <rect x="78" y="20" width="18" height="44" rx="2" fill="#2d8a4e" />
        <text x="87" y="14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#2d8a4e">100%</text>
      </g>

      {/* Bar 2 */}
      <g className="anim-bar-grow-2">
        <rect x="108" y="32" width="18" height="32" rx="2" fill="#d4a843" />
        <text x="117" y="26" textAnchor="middle" fontSize="8" fontWeight="900" fill="#d4a843">72%</text>
      </g>

      {/* Bar 3 */}
      <g className="anim-bar-grow-3">
        <rect x="138" y="26" width="18" height="38" rx="2" fill="#2d8a4e" />
        <text x="147" y="20" textAnchor="middle" fontSize="8" fontWeight="900" fill="#2d8a4e">88%</text>
      </g>

      {/* Bar 4 */}
      <g className="anim-bar-grow-4">
        <rect x="168" y="38" width="18" height="26" rx="2" fill="#d4a843" />
        <text x="177" y="32" textAnchor="middle" fontSize="8" fontWeight="900" fill="#d4a843">56%</text>
      </g>

      {/* Bar 5 */}
      <g className="anim-bar-grow-5">
        <rect x="198" y="22" width="18" height="42" rx="2" fill="#2d8a4e" />
        <text x="207" y="16" textAnchor="middle" fontSize="8" fontWeight="900" fill="#2d8a4e">94%</text>
      </g>
    </Strip>
  );
}
