import type { ReactNode } from 'react';
import { FloatingShapes } from '@/components/FloatingShapes';

type Tone = 'base' | 'warm' | 'hero';
type Glow = 'gold' | 'teal' | 'violet';

const TONE: Record<Tone, string> = {
  base: 'surface',
  warm: 'surface-warm',
  hero: 'hero-bg',
};

const GLOW: Record<Glow, string> = {
  gold:   'rgba(232,201,122,0.30)',
  teal:   'rgba(94,234,212,0.28)',
  violet: 'rgba(167,139,250,0.28)',
};

/**
 * Unified section primitive — one consistent vertical rhythm, container width,
 * tone and optional neon backdrops across every page. Keeps the whole app
 * feeling like a single coherent system instead of bespoke per-section spacing.
 */
export function Section({
  children,
  tone = 'base',
  grid = false,
  glow,
  shapes = false,
  mesh = false,
  size = 'normal',
  id,
  className = '',
  containerClassName = '',
}: {
  children: ReactNode;
  tone?: Tone;
  grid?: boolean;
  glow?: Glow;
  /** drifting glass motion-graphics shapes behind the content */
  shapes?: boolean;
  /** Stripe-style flowing mesh-gradient backdrop */
  mesh?: boolean;
  /** vertical padding scale */
  size?: 'tight' | 'normal' | 'loose';
  id?: string;
  className?: string;
  containerClassName?: string;
}) {
  const pad =
    size === 'tight' ? 'py-12 sm:py-16' : size === 'loose' ? 'py-24 sm:py-36' : 'py-20 sm:py-28';

  return (
    <section id={id} className={`${TONE[tone]} noise-overlay relative overflow-hidden ${pad} ${className}`}>
      {mesh && <div aria-hidden className="mesh-gradient" />}
      {grid && <div aria-hidden className="neon-grid" />}
      {shapes && <FloatingShapes />}
      {glow && (
        <div
          aria-hidden
          className="aurora-orb top-0 left-1/2 -translate-x-1/2 w-[820px] h-[620px] opacity-25"
          style={{ background: `radial-gradient(circle, ${GLOW[glow]}, transparent 65%)`, position: 'absolute' }}
        />
      )}
      <div className={`container mx-auto px-4 sm:px-6 max-w-6xl relative z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
