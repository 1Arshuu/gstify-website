'use client';

/**
 * Magical hero sparkles — a handful of 4-point gold stars scattered across
 * the hero. Each twinkles (opacity + scale) on its own 2–4s cycle so they
 * shimmer independently. Purely decorative: the container is absolutely
 * positioned and pointer-events:none, so it never affects layout (item 5).
 *
 * Positions are a fixed pseudo-random set (not Math.random) to keep the
 * server and client markup identical and avoid hydration mismatches.
 */
type Spark = { top: string; left: string; size: number; dur: number; delay: number };

const SPARKS: Spark[] = [
  { top: '14%', left: '8%',  size: 18, dur: 3.1, delay: 0.0 },
  { top: '28%', left: '88%', size: 14, dur: 2.4, delay: 0.6 },
  { top: '62%', left: '16%', size: 22, dur: 3.8, delay: 1.1 },
  { top: '44%', left: '54%', size: 12, dur: 2.7, delay: 0.3 },
  { top: '76%', left: '72%', size: 16, dur: 3.3, delay: 1.5 },
  { top: '10%', left: '46%', size: 13, dur: 2.2, delay: 0.9 },
  { top: '54%', left: '94%', size: 17, dur: 3.6, delay: 0.2 },
  { top: '84%', left: '36%', size: 15, dur: 2.9, delay: 1.8 },
];

export const Sparkles = () => {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {SPARKS.map((s, i) => (
        <svg
          key={i}
          className="sparkle"
          viewBox="0 0 24 24"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          {/* concave 4-point star */}
          <path
            d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
            fill="#D7B05F"
          />
        </svg>
      ))}
    </div>
  );
};
