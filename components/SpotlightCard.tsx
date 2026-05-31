'use client';
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';

interface SpotlightCardProps {
  children:   ReactNode;
  className?: string;
}

/**
 * Wraps any card with two cursor-driven effects:
 *   1. a gold radial spotlight (rendered by .spotlight::before in globals.css)
 *      via the --mx / --my custom properties, and
 *   2. a subtle 3D tilt (max ±6°) — the card leans toward the cursor. The grid
 *      wrapper supplies `perspective`, .tilt-3d supplies preserve-3d + the
 *      `transform 0.4s ease` smoothing, so the card trails the pointer (item 5).
 *
 * We keep React out of the render hot path — everything is written straight to
 * the element's style on mousemove.
 */
const MAX_TILT = 6; // degrees

export const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Spotlight position (always — it's cheap and respects no-motion fine).
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);

    if (reduced.current) return;

    // Tilt: invert Y so the top leans away when the cursor is up top. We bake
    // perspective into the element's own transform so it reads as real depth
    // even though the intervening Reveal wrapper flattens the grid's perspective.
    const rx = (0.5 - py / rect.height) * (MAX_TILT * 2);
    const ry = (px / rect.width - 0.5) * (MAX_TILT * 2);
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Drop the inline transform so the card eases back to rest via the
    // .tilt-3d transition (and CSS hover styles take over again).
    el.style.removeProperty('transform');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight tilt-3d ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
