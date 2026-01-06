'use client';

import Image from 'next/image';

// Avatar data for the gallery rows
const GALLERY_AVATARS = [
  '/avatars/hero-avatar-1.png',
  '/avatars/hero-avatar-2.png',
  '/avatars/hero-avatar-3.png',
  '/avatars/avatar-boy-gamer.png',
  '/avatars/avatar-girl-catears.png',
];

interface MarqueeRowProps {
  avatars: string[];
  direction: 'left' | 'right';
  speed: number; // seconds for one complete cycle
  size: number;
  opacity: number;
  className?: string;
}

function MarqueeRow({ avatars, direction, speed, size, opacity, className = '' }: MarqueeRowProps) {
  // Duplicate avatars for seamless loop
  const duplicatedAvatars = [...avatars, ...avatars, ...avatars];

  return (
    <div
      className={`flex gap-4 ${className}`}
      style={{ opacity }}
    >
      <div
        className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedAvatars.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
            style={{ width: size, height: size }}
          >
            <Image
              src={src}
              alt="Pixel Avatar"
              width={size}
              height={size}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface GalleryBackgroundProps {
  className?: string;
}

export default function GalleryBackground({ className = '' }: GalleryBackgroundProps) {
  // Shuffle avatars differently for each row
  const shuffleArray = (arr: string[], seed: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(seed * i) + 1) / 2 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const rows = [
    { avatars: shuffleArray(GALLERY_AVATARS, 1), direction: 'left' as const, speed: 40, size: 80, opacity: 0.4 },
    { avatars: shuffleArray(GALLERY_AVATARS, 2), direction: 'right' as const, speed: 35, size: 100, opacity: 0.5 },
    { avatars: shuffleArray(GALLERY_AVATARS, 3), direction: 'left' as const, speed: 45, size: 90, opacity: 0.45 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gallery rows */}
      <div className="absolute inset-0 flex flex-col justify-around py-20">
        {rows.map((row, index) => (
          <MarqueeRow
            key={index}
            avatars={row.avatars}
            direction={row.direction}
            speed={row.speed}
            size={row.size}
            opacity={row.opacity}
            className={index === 1 ? '-ml-20' : index === 2 ? 'ml-10' : ''}
          />
        ))}
      </div>

      {/* Center gradient overlay - makes the upload area stand out */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 60% at 50% 50%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 255, 0.85) 30%,
              rgba(255, 255, 255, 0.6) 50%,
              rgba(255, 255, 255, 0.3) 70%,
              transparent 100%
            )
          `
        }}
      />

      {/* Subtle color tint at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(167, 243, 208, 0.15) 0%,
              transparent 40%,
              transparent 60%,
              rgba(249, 168, 212, 0.15) 100%
            )
          `
        }}
      />
    </div>
  );
}
