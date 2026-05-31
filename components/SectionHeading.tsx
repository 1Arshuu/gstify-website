import { Reveal } from '@/components/Reveal';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Tiny uppercase eyebrow above the headline (optional) */
  eyebrow?: string;
  /** Main headline — pass JSX so you can wrap accent words */
  title:    ReactNode;
  /** Supporting paragraph */
  body?:    ReactNode;
  /** Center or left-align */
  align?:   'left' | 'center';
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, body, align = 'center', className }: SectionHeadingProps) => (
  <Reveal className={`${className ?? ''} ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
    {eyebrow && (
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-4"
         style={{ letterSpacing: '0.16em' }}>
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown"
        style={{ letterSpacing: '-0.035em', lineHeight: 1.05 }}>
      {title}
    </h2>
    {body && (
      <p className="mt-5 text-lg text-gold-dim leading-relaxed">
        {body}
      </p>
    )}
  </Reveal>
);
