type WheatLogoProps = {
  className?: string;
  size?: number;
};

/**
 * Wheat sheaf logo — "אלומת שיבולים"
 * A bundle of wheat stalks tied at the middle, representing community unity
 */
export default function WheatLogo({ className = "", size = 32 }: WheatLogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="אלומת שיבולים"
    >
      {/* Center stalk */}
      <path
        d="M32 10 Q32 30 32 54"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Center wheat head - grain clusters */}
      <g fill="currentColor">
        <ellipse cx="32" cy="12" rx="2.2" ry="3.5" />
        <ellipse cx="29" cy="15" rx="1.8" ry="3" opacity="0.85" />
        <ellipse cx="35" cy="15" rx="1.8" ry="3" opacity="0.85" />
        <ellipse cx="30" cy="19" rx="1.8" ry="2.8" opacity="0.75" />
        <ellipse cx="34" cy="19" rx="1.8" ry="2.8" opacity="0.75" />
        <ellipse cx="32" cy="22" rx="1.8" ry="2.5" opacity="0.7" />
      </g>

      {/* Left stalk */}
      <path
        d="M22 16 Q25 32 28 54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      />
      {/* Left wheat head */}
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="21" cy="18" rx="2" ry="3.2" transform="rotate(-15 21 18)" />
        <ellipse cx="18" cy="21" rx="1.6" ry="2.6" transform="rotate(-15 18 21)" opacity="0.85" />
        <ellipse cx="24" cy="21" rx="1.6" ry="2.6" transform="rotate(-15 24 21)" opacity="0.85" />
        <ellipse cx="20" cy="25" rx="1.6" ry="2.4" transform="rotate(-15 20 25)" opacity="0.7" />
        <ellipse cx="23" cy="27" rx="1.5" ry="2.2" transform="rotate(-15 23 27)" opacity="0.65" />
      </g>

      {/* Right stalk */}
      <path
        d="M42 16 Q39 32 36 54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      />
      {/* Right wheat head */}
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="43" cy="18" rx="2" ry="3.2" transform="rotate(15 43 18)" />
        <ellipse cx="40" cy="21" rx="1.6" ry="2.6" transform="rotate(15 40 21)" opacity="0.85" />
        <ellipse cx="46" cy="21" rx="1.6" ry="2.6" transform="rotate(15 46 21)" opacity="0.85" />
        <ellipse cx="44" cy="25" rx="1.6" ry="2.4" transform="rotate(15 44 25)" opacity="0.7" />
        <ellipse cx="41" cy="27" rx="1.5" ry="2.2" transform="rotate(15 41 27)" opacity="0.65" />
      </g>

      {/* Outer left stalk (shorter) */}
      <path
        d="M14 22 Q19 36 24 54"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
        fill="none"
      />
      <g fill="currentColor" opacity="0.75">
        <ellipse cx="13" cy="24" rx="1.7" ry="2.7" transform="rotate(-25 13 24)" />
        <ellipse cx="10" cy="28" rx="1.4" ry="2.3" transform="rotate(-25 10 28)" opacity="0.75" />
        <ellipse cx="16" cy="28" rx="1.4" ry="2.3" transform="rotate(-25 16 28)" opacity="0.75" />
        <ellipse cx="13" cy="32" rx="1.4" ry="2" transform="rotate(-25 13 32)" opacity="0.6" />
      </g>

      {/* Outer right stalk (shorter) */}
      <path
        d="M50 22 Q45 36 40 54"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
        fill="none"
      />
      <g fill="currentColor" opacity="0.75">
        <ellipse cx="51" cy="24" rx="1.7" ry="2.7" transform="rotate(25 51 24)" />
        <ellipse cx="48" cy="28" rx="1.4" ry="2.3" transform="rotate(25 48 28)" opacity="0.75" />
        <ellipse cx="54" cy="28" rx="1.4" ry="2.3" transform="rotate(25 54 28)" opacity="0.75" />
        <ellipse cx="51" cy="32" rx="1.4" ry="2" transform="rotate(25 51 32)" opacity="0.6" />
      </g>

      {/* Binding rope/tie around the middle of the sheaf */}
      <ellipse
        cx="32"
        cy="42"
        rx="12"
        ry="3"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M20 42 Q32 46 44 42"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M20 42 Q32 38 44 42"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
