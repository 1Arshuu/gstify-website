'use client';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  /** Target value to count to */
  to:        number;
  /** Optional prefix (e.g. ₹) */
  prefix?:   string;
  /** Optional suffix (e.g. % or +) */
  suffix?:   string;
  /** Decimals to show */
  decimals?: number;
  /** Duration of the count animation in ms */
  duration?: number;
  className?: string;
}

/**
 * Number that counts from 0 up to the target the first time it scrolls
 * into view. Uses requestAnimationFrame so it's smooth on every device.
 */
export const Counter = ({
  to,
  prefix   = '',
  suffix   = '',
  decimals = 0,
  duration = 1600,
  className,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const display = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString('en-IN');

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
};
