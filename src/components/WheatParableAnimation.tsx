"use client";

/**
 * אנימציה יחידה למשל השיבול:
 * שלב א': שיבול בודד מתעקם ונשבר.
 * שלב ב': אלומה של שיבולים מתכופפת חזק - ולא נשברת, חוזרת זקופה.
 * ללא מלל, ללא ידיים מצוירות - רק הסיפור הטהור דרך תנועה.
 */
export default function WheatParableAnimation() {
  return (
    <svg
      viewBox="0 0 500 300"
      className="w-full h-auto max-h-[340px]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wheatGrain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
        <linearGradient id="wheatStem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c49a3a" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a87e3e" />
          <stop offset="100%" stopColor="#6b4a1c" />
        </linearGradient>
      </defs>

      {/* ========== PHASE A: Single intact shaft (visible early) ========== */}
      <g className="wp-phase-a">
        <g className="wp-shaft-bend" style={{ transformOrigin: "250px 260px", transformBox: "fill-box" } as React.CSSProperties}>
          <SingleShaft />
        </g>
      </g>

      {/* ========== PHASE B: Broken pieces (appear at the snap) ========== */}
      <g className="wp-phase-b">
        {/* Top piece rotating/falling left */}
        <g className="wp-broken-top">
          <g transform="translate(250 160)">
            <ShaftHead />
            <rect x="-3" y="-5" width="6" height="50" rx="3" fill="url(#wheatStem)" />
            <path
              d="M -3 45 L -6 50 L 0 47 L 5 52 L 2 47 L 7 51 L 4 45 Z"
              fill="#8b6914"
            />
          </g>
        </g>
        {/* Bottom piece rotating right */}
        <g className="wp-broken-bottom">
          <g transform="translate(250 220)">
            <rect x="-3" y="0" width="6" height="60" rx="3" fill="url(#wheatStem)" />
            <path
              d="M -3 0 L -6 -5 L 0 -2 L 5 -7 L 2 -2 L 7 -6 L 4 0 Z"
              fill="#8b6914"
            />
          </g>
        </g>
        {/* Crack flash */}
        <g className="wp-crack">
          <g transform="translate(250 210)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="0"
                y1="0"
                x2={Math.cos((angle * Math.PI) / 180) * 22}
                y2={Math.sin((angle * Math.PI) / 180) * 22}
                stroke="#d4a843"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </g>
        </g>
      </g>

      {/* ========== PHASE C: Bundle (bends but doesn't break) ========== */}
      <g className="wp-phase-c">
        <g className="wp-bundle-bend" style={{ transformOrigin: "250px 270px", transformBox: "fill-box" } as React.CSSProperties}>
          {/* 5 shafts in the bundle */}
          {[-40, -20, 0, 20, 40].map((offset, i) => (
            <g key={i} transform={`translate(${250 + offset} 260) rotate(${offset / 10})`}>
              <ShaftHead small />
              <rect x="-2.5" y="-65" width="5" height="200" rx="2.5" fill="url(#wheatStem)" />
            </g>
          ))}
          {/* Rope binding */}
          <ellipse cx="250" cy="190" rx="56" ry="8" fill="none" stroke="url(#ropeGrad)" strokeWidth="6" />
          <ellipse cx="250" cy="204" rx="56" ry="8" fill="none" stroke="url(#ropeGrad)" strokeWidth="6" />
          <circle cx="300" cy="197" r="7" fill="#6b4a1c" stroke="#3e2a0e" strokeWidth="1.5" />
          <path d="M 295 197 L 305 197 M 300 192 L 300 202" stroke="#3e2a0e" strokeWidth="1.5" />
        </g>
      </g>

      {/* Ground line */}
      <line x1="80" y1="278" x2="420" y2="278" stroke="#8b6914" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}

function SingleShaft() {
  return (
    <g transform="translate(250 260)">
      <ShaftHead />
      {/* Stem */}
      <rect x="-3" y="-65" width="6" height="260" rx="3" fill="url(#wheatStem)" />
    </g>
  );
}

function ShaftHead({ small = false }: { small?: boolean }) {
  const rx = small ? 10 : 13;
  const ry = small ? 22 : 28;
  return (
    <g transform={`translate(0 ${small ? -90 : -95})`}>
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#wheatGrain)" />
      {[-18, -6, 6, 18].map((dy, i) => (
        <ellipse key={i} cx="0" cy={dy} rx={small ? 5 : 7} ry={small ? 3.5 : 4.5} fill="#b8862f" />
      ))}
      {/* Little antenna hairs on top */}
      <line x1="0" y1={-ry} x2="-5" y2={-ry - 8} stroke="#8b6914" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="0" y1={-ry} x2="0" y2={-ry - 10} stroke="#8b6914" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="0" y1={-ry} x2="5" y2={-ry - 8} stroke="#8b6914" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}
