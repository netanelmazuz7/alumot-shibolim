"use client";

/**
 * אנימציה: איש בודד הופך לקבוצה של אנשים עם ידיים זה על כתפי זה
 * אנימציה מחזורית - 4 שניות
 */
export default function JoinAnimation() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Person 1 (left) - appears after center */}
        <g className="join-person join-person-left">
          {/* head */}
          <circle cx="25" cy="25" r="8" fill="currentColor" />
          {/* body */}
          <path
            d="M 15 40 Q 25 35 35 40 L 35 65 L 15 65 Z"
            fill="currentColor"
          />
          {/* arm reaching to center */}
          <rect x="33" y="42" width="15" height="5" rx="2" fill="currentColor" />
        </g>

        {/* Person 2 (center) - always visible */}
        <g className="join-person join-person-center">
          {/* head */}
          <circle cx="60" cy="25" r="9" fill="currentColor" />
          {/* body */}
          <path
            d="M 48 42 Q 60 37 72 42 L 72 68 L 48 68 Z"
            fill="currentColor"
          />
        </g>

        {/* Person 3 (right) - appears after center */}
        <g className="join-person join-person-right">
          {/* head */}
          <circle cx="95" cy="25" r="8" fill="currentColor" />
          {/* body */}
          <path
            d="M 85 40 Q 95 35 105 40 L 105 65 L 85 65 Z"
            fill="currentColor"
          />
          {/* arm reaching to center */}
          <rect x="72" y="42" width="15" height="5" rx="2" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
