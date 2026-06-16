'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Download, ShieldCheck, Star,
  Receipt, Truck, FileText,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Marquee } from '@/components/Marquee';
import { Magnetic } from '@/components/Magnetic';
import { DocumentReel } from '@/components/DocumentReel';

const MUTED = '#9793A6';

const marqueeItems = [
  'Tax Invoice', '◇', 'Delivery Challan', '◇', 'Proforma', '◇',
  'Quotation', '◇', 'POS Bill', '◇', '5 PDF Templates', '◇',
  'Offline-First', '◇', 'Drive Backup', '◇', 'Per-line GST', '◇',
];

/**
 * Immersive cinematic hero — "The Billing Studio".
 * Volumetric light beams (mouse-parallaxed), film grain, vignette and a slow
 * 3D document reel as the centrepiece. Copy stays fully visible at first paint
 * (LCP): the intro only slides, never fades from 0.
 */
export function CinematicHero() {
  const root = useRef<HTMLElement>(null);

  // Desktop mouse parallax — drift the light beams toward the cursor.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 40;
        el.style.setProperty('--beam-x', `${dx.toFixed(1)}px`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={root} className="cine-stage cine-fades relative overflow-x-clip">
      {/* Atmosphere layers */}
      <div aria-hidden className="light-beams">
        <span className="light-beam b1" />
        <span className="light-beam b2" />
        <span className="light-beam b3" />
      </div>
      <div aria-hidden className="neon-grid" />
      <div aria-hidden className="cine-vignette" />
      <div aria-hidden className="cine-grain" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-10 sm:pt-12 lg:pt-16 pb-14 sm:pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* ── Copy ── */}
          <motion.div
            initial={{ opacity: 1, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left lg:pr-10"
          >
            <span className="cine-badge">
              <span className="rec" /> Smart GST billing · Made in India
            </span>

            <h1 className="font-display text-dark-brown mt-6"
                style={{ fontSize: 'clamp(2.6rem, 5.6vw, 4.6rem)', lineHeight: 1.04, letterSpacing: '-0.02em', fontWeight: 600 }}>
              Every GST document,{' '}
              <span className="gradient-text glow-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>
                done in seconds.
              </span>
            </h1>

            <p className="mt-7 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: MUTED }}>
              GSTify is the fastest way to create GST invoices on Android — five document types,
              GST-ready PDFs, smart payment tracking and automatic Google Drive backup. Everything
              you need to bill your customers, fully offline.
            </p>

            <div className="mt-9 flex gap-3 flex-wrap items-center justify-center lg:justify-start">
              <Magnetic strength={0.4}>
                <a href={BRAND.playStoreUrl} target="_blank" rel="noopener noreferrer"
                   className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]" style={{ height: '54px' }}>
                  <Download className="h-4 w-4" strokeWidth={2.8} /> Download Free
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <Link href="/features" className="outline-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]" style={{ height: '54px' }}>
                  Explore features <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </Link>
              </Magnetic>
            </div>

            <div className="mt-9 flex items-center gap-x-5 gap-y-3 flex-wrap justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-[#E8C97A] text-[#E8C97A]" strokeWidth={1.5}
                          style={{ filter: 'drop-shadow(0 0 6px rgba(232,201,122,0.7))' }} />
                  ))}
                </div>
                <span className="text-sm font-bold text-dark-brown">4.9</span>
              </div>
              <span aria-hidden className="hidden sm:block h-4 w-px" style={{ background: 'rgba(232,201,122,0.3)' }} />
              <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: MUTED }}>
                <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2.6} /> Mobile-first · Android
              </div>
              <span className="chip-teal">Made in India</span>
            </div>
          </motion.div>

          {/* ── Reel (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-5 items-center justify-center relative"
            style={{ minHeight: 420 }}
          >
            <div style={{ transform: 'translateX(30px) scale(0.9)' }}>
              <DocumentReel />
            </div>
          </motion.div>

          {/* ── Fanned document slides (mobile / tablet) ── */}
          <div className="lg:hidden flex justify-center">
            <div className="relative w-[260px] h-[210px]">
              {[
                { icon: Receipt, label: 'Tax Invoice', code: 'INV', c: '#E8C97A', rot: '-8deg', x: '-30px', y: '8px', z: 1, delay: '0s' },
                { icon: Truck,   label: 'Delivery',    code: 'CHL', c: '#5EEAD4', rot: '0deg',  x: '0px',   y: '0px', z: 3, delay: '0.5s' },
                { icon: FileText,label: 'Proforma',    code: 'PRO', c: '#A78BFA', rot: '8deg',  x: '30px',  y: '8px', z: 2, delay: '1s' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.code} className="absolute left-1/2 top-1/2"
                       style={{ transform: `translate(-50%,-50%) translate(${s.x},${s.y}) rotate(${s.rot})`, zIndex: s.z }}>
                    <div className="fan-card w-[150px] rounded-2xl p-4"
                         style={{ animationDelay: s.delay, background: '#14111E', border: '1px solid rgba(232,201,122,0.25)', boxShadow: '0 22px 50px -22px rgba(0,0,0,0.9)' }}>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                            style={{ background: `linear-gradient(135deg, ${s.c}, rgba(255,255,255,0.15))`, color: '#0A0813' }}>
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <p className="font-display text-lg font-black text-dark-brown mt-3">{s.code}</p>
                      <p className="text-[11px] font-semibold" style={{ color: '#B9B4C4' }}>{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10">
        <div className="divider-hairline mx-auto max-w-6xl" />
        <div className="py-3">
          <Marquee speed={14}>
            {marqueeItems.map((item, i) => (
              <span key={i} className={`text-sm font-extrabold uppercase ${item === '◇' ? 'text-[#5EEAD4]/50' : 'text-[#C9A86A]'}`}
                    style={{ letterSpacing: '0.18em' }}>{item}</span>
            ))}
          </Marquee>
        </div>
        <div className="divider-hairline mx-auto max-w-6xl" />
      </div>
    </section>
  );
}
