'use client';
import { useEffect, useRef } from 'react';

/**
 * Soft gold orb that trails the cursor. It interpolates toward the pointer every
 * frame (requestAnimationFrame) so it lags slightly.
 *
 * The element is rendered identically on server and client (so there's no
 * hydration mismatch), but the animation only wires up on mouse-capable,
 * motion-allowed devices. On touch/reduced-motion it stays an inert, invisible,
 * un-styled (no filter, no blend, no transform) fixed div — which the browser
 * never promotes to a compositing layer, so it has no effect on mobile.
 *
 * `suppressHydrationWarning` guards against browser extensions that inject
 * attributes onto fixed elements before React hydrates.
 */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        el.style.opacity = '0.5';
      }
    };

    const tick = () => {
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
