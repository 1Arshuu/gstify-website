'use client';
import { useEffect, useRef, useState, type ReactNode, type CSSProperties, createElement } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Delay in milliseconds before the reveal kicks in */
  delay?:    number;
  /** Distance the element rises from in pixels */
  y?:        number;
  /** Forward tilt (deg) the element straightens up from — set 0 to opt out */
  rotate?:   number;
  /** Use a longer/shorter duration */
  duration?: number;
  className?: string;
  /** Render as a different tag (default: div) */
  as?: 'div' | 'section' | 'article' | 'h2' | 'p';
}

/**
 * Tiny, GPU-accelerated scroll reveal. Sits on top of IntersectionObserver
 * + CSS transitions — orders of magnitude lighter than framer-motion's
 * `whileInView`. Content reveals with a gentle 3D rotateX(8deg) → 0deg plus a
 * translateY rise, so sections feel like they tip up into place (item 5).
 */
export const Reveal = ({
  children,
  delay = 0,
  y = 20,
  rotate = 8,
  duration = 600,
  className,
  as = 'div',
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip the animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hidden state tilts/rises in 3D; the revealed state settles to `none` so we
  // DON'T leave a permanent compositing layer on every card (lingering
  // perspective/translate3d layers overflow the browser's layer budget and make
  // cards randomly blank out). `none` interpolates from the 3D matrix smoothly.
  const hidden = `perspective(1000px) rotateX(${rotate}deg) translate3d(0,${y}px,0)`;

  const style: CSSProperties = {
    opacity:    shown ? 1 : 0,
    transform:  shown ? 'none' : hidden,
    transformOrigin: 'center bottom',
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: shown ? 'auto' : 'opacity, transform',
  };

  return createElement(as, { ref, style, className }, children);
};
