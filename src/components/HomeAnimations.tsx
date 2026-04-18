"use client";

/**
 * סט אנימציות לדף הבית - SVG מונפש טהור ב-CSS
 * כל אנימציה נועדה למלא את רוחב המשבצת ולהניע את העין
 */

/* ============ ProtectedTogetherAnimation (מוגנים יחד) ============ */
export function ProtectedTogetherAnimation() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Left person leaning in */}
        <g className="anim-lean-l" style={{ color: "#2d8a4e" }}>
          <circle cx="22" cy="28" r="7" fill="currentColor" />
          <path d="M 12 42 Q 22 37 32 42 L 32 62 L 12 62 Z" fill="currentColor" />
        </g>
        {/* Right person leaning in */}
        <g className="anim-lean-r" style={{ color: "#2d8a4e" }}>
          <circle cx="98" cy="28" r="7" fill="currentColor" />
          <path d="M 88 42 Q 98 37 108 42 L 108 62 L 88 62 Z" fill="currentColor" />
        </g>
        {/* Central pulsing shield */}
        <g className="anim-shield-pulse">
          <path
            d="M 60 18 L 78 26 L 78 44 Q 78 58 60 66 Q 42 58 42 44 L 42 26 Z"
            fill="#2d8a4e"
            stroke="#1e6b38"
            strokeWidth="2"
          />
          <path
            d="M 52 42 L 58 49 L 70 36"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

/* ============ SavingTogetherAnimation (חוסכים יחד) ============ */
export function SavingTogetherAnimation() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Falling coins */}
        <g className="anim-coin-fall-1">
          <circle cx="35" cy="20" r="7" fill="#d4a843" stroke="#b8912e" strokeWidth="1.5" />
          <text x="35" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        <g className="anim-coin-fall-2">
          <circle cx="60" cy="20" r="7" fill="#d4a843" stroke="#b8912e" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        <g className="anim-coin-fall-3">
          <circle cx="85" cy="20" r="7" fill="#d4a843" stroke="#b8912e" strokeWidth="1.5" />
          <text x="85" y="24" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1a365d">₪</text>
        </g>
        {/* Coin stack growing */}
        <g className="anim-stack">
          <rect x="30" y="55" width="60" height="6" rx="3" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
          <rect x="32" y="48" width="56" height="6" rx="3" fill="#e8c46a" stroke="#b8912e" strokeWidth="1" />
          <rect x="34" y="41" width="52" height="6" rx="3" fill="#d4a843" stroke="#b8912e" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/* ============ Card-wide animation strips (for claim process) ============ */

// 1. Two cars colliding
export function CarsCollideStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-primary/5 mb-4">
      {/* Road */}
      <div className="absolute bottom-3 left-0 right-0 h-px bg-primary/20" />
      <div className="absolute bottom-3 left-0 right-0 flex justify-around text-[6px] text-primary/30">
        {"— — — — — — — —".split(" ").map((s, i) => <span key={i}>{s}</span>)}
      </div>
      {/* Right car moving left */}
      <div className="absolute inset-y-0 right-0 w-1/2 anim-car-right flex items-center justify-start">
        <CarSvg color="#1a365d" />
      </div>
      {/* Left car moving right (flipped) */}
      <div className="absolute inset-y-0 left-0 w-1/2 anim-car-left flex items-center justify-start">
        <CarSvg color="#dc3545" />
      </div>
      {/* Crash burst */}
      <div className="absolute inset-0 flex items-center justify-center anim-crash pointer-events-none">
        <span className="text-2xl">💥</span>
      </div>
    </div>
  );
}

function CarSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 60 30" className="w-16 h-8" aria-hidden="true">
      <path
        d="M 5 22 L 10 12 Q 12 9 16 9 L 44 9 Q 48 9 50 12 L 55 22 Z"
        fill={color}
      />
      <rect x="14" y="11" width="14" height="8" rx="1" fill="#a8c4e0" opacity="0.7" />
      <rect x="32" y="11" width="14" height="8" rx="1" fill="#a8c4e0" opacity="0.7" />
      <circle cx="15" cy="23" r="4" fill="#222" />
      <circle cx="45" cy="23" r="4" fill="#222" />
    </svg>
  );
}

// 2. AI scan sweeping over a car
export function AIScanStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-gold/10 mb-4">
      {/* Centered car */}
      <div className="absolute inset-0 flex items-center justify-center anim-ai-pulse">
        <CarSvg color="#b8912e" />
      </div>
      {/* Scan line */}
      <div className="absolute inset-y-0 w-1/4 anim-scan bg-gradient-to-l from-gold/0 via-gold to-gold/0 opacity-60" />
      {/* AI chip label */}
      <div className="absolute top-1 right-2 text-[10px] font-black text-gold-dark">AI</div>
    </div>
  );
}

// 3. Appraiser approval - clipboard sliding
export function AppraiserStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-green/10 mb-4">
      <div className="absolute inset-y-0 w-full anim-stamp-slide flex items-center justify-center">
        <svg viewBox="0 0 50 50" className="w-12 h-12" aria-hidden="true">
          <rect x="10" y="8" width="30" height="36" rx="3" fill="#2d8a4e" />
          <rect x="18" y="4" width="14" height="8" rx="2" fill="#1e6b38" />
          <line x1="15" y1="20" x2="35" y2="20" stroke="white" strokeWidth="1.5" />
          <line x1="15" y1="26" x2="35" y2="26" stroke="white" strokeWidth="1.5" />
          <line x1="15" y1="32" x2="28" y2="32" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Approval stamp that appears at center */}
      <div className="absolute inset-0 flex items-center justify-center anim-stamp-pop pointer-events-none">
        <div className="text-green text-3xl font-black border-4 border-green rounded-lg px-2 rotate-[-12deg] bg-white/80">
          ✓
        </div>
      </div>
    </div>
  );
}

// 4. Cost division - coins scattering
export function CostDivideStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-primary/5 mb-4">
      {/* Central coin that bursts */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Coin />
      </div>
      {/* Scattering coins */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="anim-coin-l absolute"><Coin small /></div>
        <div className="anim-coin-r absolute"><Coin small /></div>
        <div className="anim-coin-ul absolute"><Coin small /></div>
        <div className="anim-coin-ur absolute"><Coin small /></div>
      </div>
    </div>
  );
}

function Coin({ small = false }: { small?: boolean }) {
  const s = small ? 22 : 30;
  return (
    <svg viewBox="0 0 40 40" width={s} height={s} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#d4a843" stroke="#b8912e" strokeWidth="2" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="#b8912e" strokeWidth="1" opacity="0.5" />
      <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1a365d">₪</text>
    </svg>
  );
}

// 5. Fast payment - money flying across
export function FastPaymentStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-gold/10 mb-4">
      {/* Wallet on right */}
      <div className="absolute right-2 inset-y-0 flex items-center">
        <svg viewBox="0 0 30 30" className="w-7 h-7" aria-hidden="true">
          <rect x="3" y="8" width="24" height="18" rx="3" fill="#b8912e" />
          <circle cx="22" cy="17" r="2" fill="#d4a843" />
        </svg>
      </div>
      {/* Recipient hand on left */}
      <div className="absolute left-2 inset-y-0 flex items-center text-2xl">🫴</div>
      {/* Flying banknote */}
      <div className="absolute inset-y-0 w-full anim-money-fly flex items-center justify-center">
        <svg viewBox="0 0 60 30" className="w-14 h-8" aria-hidden="true">
          <rect x="2" y="2" width="56" height="26" rx="2" fill="#2d8a4e" stroke="#1e6b38" strokeWidth="1.5" />
          <circle cx="30" cy="15" r="7" fill="none" stroke="#d4a843" strokeWidth="1.5" />
          <text x="30" y="19" textAnchor="middle" fontSize="10" fontWeight="900" fill="#d4a843">₪</text>
        </svg>
      </div>
    </div>
  );
}

// 6. Transparency - expanding rings from eye
export function TransparencyStrip() {
  return (
    <div className="relative w-full h-16 overflow-hidden rounded-xl bg-green/10 mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Rings */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-green anim-ring-1" />
        <div className="absolute w-16 h-16 rounded-full border-2 border-green anim-ring-2" />
        <div className="absolute w-16 h-16 rounded-full border-2 border-green anim-ring-3" />
        {/* Eye */}
        <svg viewBox="0 0 50 30" className="w-12 h-8 relative z-10" aria-hidden="true">
          <ellipse cx="25" cy="15" rx="22" ry="12" fill="white" stroke="#2d8a4e" strokeWidth="2" />
          <circle cx="25" cy="15" r="7" fill="#2d8a4e" />
          <circle cx="27" cy="13" r="2" fill="white" />
        </svg>
      </div>
    </div>
  );
}
