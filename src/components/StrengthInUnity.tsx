import { Heart, Users } from "lucide-react";

export default function StrengthInUnity() {
  return (
    <section className="py-24 bg-gradient-to-bl from-wheat-light via-cream to-wheat overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-gold-dark" />
            <span className="text-sm font-bold text-gold-dark">
              המשל הישן שמאחורי השם
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            שיבול אחד - נשבר. אלומה - עומדת.
          </h2>
          <p className="text-xl text-primary/60 max-w-2xl mx-auto">
            המשל של אבי השבטים על יחידות קהילתית - כל אחד מאיתנו לבד, שביר. יחד,
            אנחנו בלתי ניתנים לשבירה.
          </p>
        </div>

        {/* Single-image illustration with two scenes */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-wheat-dark/10 p-6 md:p-10 mb-12">
          <svg
            viewBox="0 0 900 460"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Skin gradient */}
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5cba7" />
                <stop offset="100%" stopColor="#d99e6c" />
              </linearGradient>
              {/* Wheat gradient */}
              <linearGradient id="wheatGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5e6c8" />
                <stop offset="100%" stopColor="#d4a843" />
              </linearGradient>
              {/* Stem gradient */}
              <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c49a3a" />
                <stop offset="100%" stopColor="#8b6914" />
              </linearGradient>
              {/* Rope gradient */}
              <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a87e3e" />
                <stop offset="100%" stopColor="#6b4a1c" />
              </linearGradient>
              {/* Panel backgrounds */}
              <radialGradient id="leftBg" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="100%" stopColor="#fecaca" stopOpacity="0.3" />
              </radialGradient>
              <radialGradient id="rightBg" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* ============ LEFT PANEL - single broken stalk ============ */}
            <g>
              {/* Panel background */}
              <rect
                x="20"
                y="20"
                width="410"
                height="420"
                rx="24"
                fill="url(#leftBg)"
                stroke="#fca5a5"
                strokeWidth="2"
              />

              {/* Panel title */}
              <text
                x="225"
                y="60"
                textAnchor="middle"
                fontSize="22"
                fontWeight="900"
                fill="#b91c1c"
                fontFamily="system-ui, sans-serif"
              >
                שיבול אחד - נשבר בקלות
              </text>

              {/* Top broken piece of stalk - angled */}
              <g transform="translate(225, 200) rotate(-35)">
                {/* Grain head */}
                <ellipse cx="0" cy="-70" rx="14" ry="28" fill="url(#wheatGrad)" />
                {[-20, -8, 4, 16, 28].map((dy, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy={-80 + i * 12}
                    rx="7"
                    ry="5"
                    fill="#b8862f"
                  />
                ))}
                {/* Top stem piece */}
                <rect x="-3" y="-40" width="6" height="60" fill="url(#stemGrad)" rx="3" />
                {/* Splinter at break */}
                <path
                  d="M -3 20 L -5 26 L 0 22 L 4 28 L 2 22 L 6 26 L 3 20 Z"
                  fill="#8b6914"
                />
              </g>

              {/* Bottom broken piece of stalk */}
              <g transform="translate(225, 245) rotate(25)">
                <rect x="-3" y="-10" width="6" height="100" fill="url(#stemGrad)" rx="3" />
                {/* Splinter at break */}
                <path
                  d="M -3 -10 L -5 -16 L 0 -12 L 4 -18 L 2 -12 L 6 -16 L 3 -10 Z"
                  fill="#8b6914"
                />
              </g>

              {/* Break burst effect */}
              <g transform="translate(225, 225)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="0"
                    y1="0"
                    x2={Math.cos((angle * Math.PI) / 180) * 28}
                    y2={Math.sin((angle * Math.PI) / 180) * 28}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))}
                <circle cx="0" cy="0" r="6" fill="#dc2626" />
              </g>

              {/* LEFT HAND (coming from top-left, gripping top piece) */}
              <g transform="translate(130, 140)">
                {/* Arm/sleeve */}
                <rect x="-30" y="-40" width="55" height="50" fill="#1e40af" rx="10" />
                {/* Palm */}
                <ellipse cx="10" cy="20" rx="35" ry="28" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.5" />
                {/* Thumb */}
                <ellipse cx="-15" cy="30" rx="10" ry="16" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-30 -15 30)" />
                {/* Fingers gripping */}
                <ellipse cx="25" cy="10" rx="8" ry="14" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(15 25 10)" />
                <ellipse cx="35" cy="18" rx="7" ry="13" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(25 35 18)" />
                <ellipse cx="42" cy="28" rx="6" ry="11" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(40 42 28)" />
                <ellipse cx="45" cy="40" rx="5" ry="9" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(55 45 40)" />
              </g>

              {/* RIGHT HAND (coming from bottom-right, gripping bottom piece) */}
              <g transform="translate(320, 300)">
                {/* Arm/sleeve */}
                <rect x="-25" y="30" width="55" height="50" fill="#1e40af" rx="10" />
                {/* Palm */}
                <ellipse cx="-10" cy="10" rx="35" ry="28" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.5" />
                {/* Thumb */}
                <ellipse cx="15" cy="0" rx="10" ry="16" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(30 15 0)" />
                {/* Fingers gripping */}
                <ellipse cx="-25" cy="20" rx="8" ry="14" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-15 -25 20)" />
                <ellipse cx="-35" cy="12" rx="7" ry="13" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-25 -35 12)" />
                <ellipse cx="-42" cy="2" rx="6" ry="11" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-40 -42 2)" />
                <ellipse cx="-45" cy="-10" rx="5" ry="9" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-55 -45 -10)" />
              </g>

              {/* Snap indicator */}
              <g transform="translate(225, 110)">
                <path
                  d="M -10 0 L 0 -10 L 10 0 L 0 10 Z"
                  fill="#dc2626"
                  stroke="#7f1d1d"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill="white"
                >
                  ✗
                </text>
              </g>

              {/* Bottom caption */}
              <text
                x="225"
                y="410"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#991b1b"
                fontFamily="system-ui, sans-serif"
              >
                לבד - שביר ללא הגנה
              </text>
            </g>

            {/* ============ RIGHT PANEL - bundle, can't break ============ */}
            <g>
              {/* Panel background */}
              <rect
                x="470"
                y="20"
                width="410"
                height="420"
                rx="24"
                fill="url(#rightBg)"
                stroke="#86efac"
                strokeWidth="2"
              />

              {/* Panel title */}
              <text
                x="675"
                y="60"
                textAnchor="middle"
                fontSize="22"
                fontWeight="900"
                fill="#15803d"
                fontFamily="system-ui, sans-serif"
              >
                אלומה - לא נשברת!
              </text>

              {/* Bundle of 5 stalks */}
              <g transform="translate(675, 230)">
                {[-50, -25, 0, 25, 50].map((offset, i) => (
                  <g key={i} transform={`translate(${offset}, 0) rotate(${offset / 8})`}>
                    {/* Grain head */}
                    <ellipse cx="0" cy="-90" rx="12" ry="24" fill="url(#wheatGrad)" />
                    {[-20, -8, 4, 16].map((dy, j) => (
                      <ellipse
                        key={j}
                        cx="0"
                        cy={-100 + j * 12}
                        rx="6"
                        ry="4"
                        fill="#b8862f"
                      />
                    ))}
                    {/* Stem */}
                    <rect x="-2.5" y="-60" width="5" height="180" fill="url(#stemGrad)" rx="2" />
                  </g>
                ))}

                {/* Binding rope - double wrap */}
                <ellipse cx="0" cy="10" rx="75" ry="13" fill="none" stroke="url(#ropeGrad)" strokeWidth="8" />
                <ellipse cx="0" cy="25" rx="75" ry="13" fill="none" stroke="url(#ropeGrad)" strokeWidth="8" />
                {/* Rope knot */}
                <circle cx="70" cy="18" r="10" fill="#6b4a1c" stroke="#3e2a0e" strokeWidth="2" />
                <path d="M 62 18 L 78 18 M 70 10 L 70 26" stroke="#3e2a0e" strokeWidth="2" />
              </g>

              {/* LEFT HAND trying to break (same position, showing strain) */}
              <g transform="translate(560, 180)">
                {/* Arm */}
                <rect x="-30" y="-40" width="55" height="55" fill="#1e40af" rx="10" />
                {/* Palm */}
                <ellipse cx="10" cy="25" rx="38" ry="30" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.5" />
                {/* Thumb */}
                <ellipse cx="-18" cy="35" rx="11" ry="17" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-30 -18 35)" />
                {/* Fingers gripping bundle */}
                <ellipse cx="28" cy="12" rx="8" ry="15" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(10 28 12)" />
                <ellipse cx="40" cy="22" rx="7" ry="14" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(20 40 22)" />
                <ellipse cx="48" cy="34" rx="6" ry="12" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(35 48 34)" />
                <ellipse cx="52" cy="46" rx="5" ry="10" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(50 52 46)" />
              </g>

              {/* RIGHT HAND trying to break (same position) */}
              <g transform="translate(790, 300)">
                {/* Arm */}
                <rect x="-25" y="25" width="55" height="55" fill="#1e40af" rx="10" />
                {/* Palm */}
                <ellipse cx="-10" cy="5" rx="38" ry="30" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.5" />
                {/* Thumb */}
                <ellipse cx="18" cy="-5" rx="11" ry="17" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(30 18 -5)" />
                {/* Fingers */}
                <ellipse cx="-28" cy="15" rx="8" ry="15" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-10 -28 15)" />
                <ellipse cx="-40" cy="5" rx="7" ry="14" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-20 -40 5)" />
                <ellipse cx="-48" cy="-7" rx="6" ry="12" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-35 -48 -7)" />
                <ellipse cx="-52" cy="-19" rx="5" ry="10" fill="url(#skinGrad)" stroke="#8b5a2b" strokeWidth="1.2" transform="rotate(-50 -52 -19)" />
              </g>

              {/* Strain lines / sweat marks - showing the hands trying hard */}
              <g stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none">
                {/* Left hand strain */}
                <path d="M 545 135 Q 540 128 547 122" />
                <path d="M 530 150 Q 524 146 528 138" />
                {/* Right hand strain */}
                <path d="M 810 340 Q 816 346 812 354" />
                <path d="M 825 325 Q 832 330 828 338" />
              </g>

              {/* Force arrows showing pressure */}
              <g fill="#15803d">
                <path d="M 575 160 L 600 175 L 592 178 L 600 175 L 597 183 Z" opacity="0.6" />
                <path d="M 775 320 L 750 305 L 758 302 L 750 305 L 753 297 Z" opacity="0.6" />
              </g>

              {/* Success indicator */}
              <g transform="translate(675, 110)">
                <circle cx="0" cy="0" r="16" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
                <path
                  d="M -7 0 L -2 5 L 8 -5"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>

              {/* Glow around bundle - "protected" aura */}
              <circle
                cx="675"
                cy="230"
                r="130"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity="0.4"
              />

              {/* Bottom caption */}
              <text
                x="675"
                y="410"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#14532d"
                fontFamily="system-ui, sans-serif"
              >
                יחד - בלתי ניתנים לשבירה
              </text>
            </g>

            {/* Center divider with VS */}
            <g transform="translate(450, 230)">
              <circle cx="0" cy="0" r="26" fill="white" stroke="#d4a843" strokeWidth="3" />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="16"
                fontWeight="900"
                fill="#8b6914"
                fontFamily="system-ui, sans-serif"
              >
                VS
              </text>
            </g>
          </svg>

          {/* Caption under image */}
          <div className="grid grid-cols-2 gap-6 mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-danger font-bold">
              <span className="text-2xl">💔</span>
              <span>נזק של 12,000₪? משלם לבד.</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green font-bold">
              <Users className="w-5 h-5" />
              <span>נזק של 12,000₪? רק ~5₪ לחבר.</span>
            </div>
          </div>
        </div>

        {/* Story section */}
        <div className="max-w-3xl mx-auto bg-gradient-to-l from-primary to-primary-dark rounded-3xl p-10 text-center shadow-2xl">
          <p className="text-gold text-sm font-bold mb-3 tracking-wider">
            המשל של אבי השבטים
          </p>
          <blockquote className="text-white text-xl leading-relaxed italic">
            &ldquo;אב זקן קרא לבניו לפני מותו, נתן לכל אחד שיבול אחד וביקש שישברו
            אותו - וכל אחד שבר בקלות. אז כרך את כל השיבולים יחד לאלומה וביקש
            שישברו - אף אחד לא הצליח. אמר להם: &apos;כשאתם מאוחדים - אתם בלתי
            ניתנים לשבירה&apos;.&rdquo;
          </blockquote>
          <p className="text-gold/70 text-sm mt-6">
            זה הרעיון שעומד בבסיס אלומת שיבולים.
          </p>
        </div>
      </div>
    </section>
  );
}
