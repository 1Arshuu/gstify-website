import { Reveal } from '@/components/Reveal';
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Tiny uppercase eyebrow chip above the headline (optional) */
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
      <span className="chip mb-5">
        <Sparkles className="h-3 w-3" strokeWidth={2.6} />
        {eyebrow}
      </span>
    )}
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown"
        style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
      {title}
    </h2>
    {body && (
      <p className="mt-5 text-lg leading-relaxed" style={{ color: '#9793A6' }}>
        {body}
      </p>
    )}
  </Reveal>
);
