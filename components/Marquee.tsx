'use client';
import type { ReactNode } from 'react';

/**
 * Infinite horizontal scrolling marquee. The content is duplicated so the
 * loop is seamless. Used for the "What's inside GSTify" strip below the hero.
 */
export const Marquee = ({ children, speed = 10 }: { children: ReactNode; speed?: number }) => {
  return (
    <div className="relative overflow-hidden py-1"
         style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform"
           style={{ animation: `marquee ${speed}s linear infinite` }}>
        <div className="flex gap-12 shrink-0">{children}</div>
        <div className="flex gap-12 shrink-0" aria-hidden>{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
