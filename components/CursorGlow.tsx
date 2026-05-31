'use client';
import { useEffect, useRef } from 'react';

/**
 * Soft gold orb that trails the cursor across the whole page. It interpolates
 * its position toward the pointer every frame (requestAnimationFrame) so it
 * lags slightly, and uses mix-blend-mode:multiply to add warmth over content.
 *
 * It is position:fixed + pointer-events:none, and disables itself entirely on
 * touch devices and when the user prefers reduced motion (item 5).
 *
 * `suppressHydrationWarning` is intentional: this fixed-position node is a
 * common target for browser extensions that inject attributes (e.g. datasq*,
 * style.top) before React hydrates. We render an identical empty <div> on
 * server and client, so suppressing the extension-caused attribute mismatch
 * here is safe — the only thing this component ever writes is `transform`.
 */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices and when reduced motion is requested.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let tgtX = curX;
    let tgtY = curY;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tgtX = e.clientX;
      tgtY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '0.4';
      }
    };

    const tick = () => {
      // Slow-trailing interpolation toward the pointer.
      curX += (tgtX - curX) * 0.12;
      curY += (tgtY - curY) * 0.12;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden suppressHydrationWarning className="cursor-glow" />;
};
