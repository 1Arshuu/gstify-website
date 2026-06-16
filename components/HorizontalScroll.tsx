'use client';
import { Children, useEffect, useRef, type ReactNode } from 'react';

/**
 * Desktop scroll-jack: a band of full-screen panels that scroll sideways while
 * the user scrolls down. A tall outer element reserves the scroll distance; an
 * inner sticky viewport holds a horizontal track that we translateX in step with
 * scroll progress. Disabled on < lg and under reduced-motion — there the panels
 * simply stack vertically (the `is-hscroll` class is what turns the effect on).
 */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const panels = Children.toArray(children);

  useEffect(() => {
    const o = outer.current, t = track.current;
    if (!o || !t) return;
    const mqWide = window.matchMedia('(min-width: 1024px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const active = () => mqWide.matches && !mqMotion.matches;

    const onScroll = () => {
      if (!active()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = o.offsetHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / total)) : 0;
        const maxX = t.scrollWidth - window.innerWidth;
        t.style.transform = `translate3d(${(-progress * maxX).toFixed(1)}px,0,0)`;
      });
    };

    const sync = () => {
      const on = active();
      o.classList.toggle('is-hscroll', on);
      if (!on) t.style.transform = '';
      else onScroll();
    };

    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    mqWide.addEventListener('change', sync);
    mqMotion.addEventListener('change', sync);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sync);
      mqWide.removeEventListener('change', sync);
      mqMotion.removeEventListener('change', sync);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outer} className="hscroll-outer" style={{ ['--panels' as string]: panels.length } as React.CSSProperties}>
      <div className="hscroll-sticky">
        <div ref={track} className="hscroll-track">
          {panels.map((child, i) => (
            <div className="hscroll-panel" key={i}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
