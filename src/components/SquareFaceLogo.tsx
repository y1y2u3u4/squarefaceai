'use client';

interface SquareFaceLogoProps {
  size?: number;
  className?: string;
}

export default function SquareFaceLogo({ size = 36, className = '' }: SquareFaceLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="50%" stopColor="#34d399"/>
          <stop offset="100%" stopColor="#6ee7b7"/>
        </linearGradient>
        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fafafa"/>
          <stop offset="100%" stopColor="#f5f5f5"/>
        </linearGradient>
      </defs>

      {/* Outer rounded square - brand color */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#logoGradient)"/>

      {/* Inner face square - light background */}
      <rect x="8" y="8" width="32" height="32" rx="8" fill="url(#faceGradient)"/>

      {/* Left eye - simple dot */}
      <circle cx="18" cy="20" r="3.5" fill="#1f2937"/>

      {/* Right eye - simple dot */}
      <circle cx="30" cy="20" r="3.5" fill="#1f2937"/>

      {/* Smile - simple arc */}
      <path
        d="M16 30 Q24 36 32 30"
        stroke="#1f2937"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
