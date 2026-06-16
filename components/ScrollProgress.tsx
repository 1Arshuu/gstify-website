'use client';
import { useEffect, useRef } from 'react';

/**
 * Awwwards-style scroll-progress bar pinned to the very top of the viewport.
 * Writes a scaleX straight to the DOM on scroll (rAF-throttled) so React stays
 * out of the hot path. Sits above the header so it's always visible.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
        el.style.transform = `scaleX(${p.toFixed(4)})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="scroll-progress">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  );
}
