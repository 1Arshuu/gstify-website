'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#01';

/**
 * "Decoding" text — when it scrolls into view, the characters resolve from
 * random glyphs into the final string. Renders the full text on first paint
 * (server + client) so there's no hydration mismatch; the scramble is a
 * post-mount, in-view effect. Respects reduced motion.
 */
export function ScrambleText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const run = () => {
      const dur = 850;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const revealed = Math.floor(p * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealed || text[i] === ' ') out += text[i];
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplay(out);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
