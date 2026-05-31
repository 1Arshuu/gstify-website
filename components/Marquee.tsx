'use client';
import type { ReactNode, CSSProperties } from 'react';

/**
 * Infinite horizontal scrolling marquee. The content is duplicated so the
 * loop is seamless. The keyframes + animation live in globals.css (.marquee-track)
 * — keeping them global avoids styled-jsx keyframe-scoping quirks under Turbopack
 * that left the animation dead on some mobile browsers.
 */
export const Marquee = ({ children, speed = 14 }: { children: ReactNode; speed?: number }) => {
  return (
    <div className="relative overflow-hidden py-1"
         style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className="marquee-track flex gap-12 whitespace-nowrap w-max"
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        <div className="flex gap-12 shrink-0">{children}</div>
        <div className="flex gap-12 shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
};
