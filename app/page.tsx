'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles as SparklesIcon, ArrowRight, Download, ShieldCheck,
  CloudUpload, Receipt, Calculator, Globe, Banknote,
  Smartphone, Lock, Layers, Star, Search,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/components/Reveal';
import { Counter } from '@/components/Counter';
import { Marquee } from '@/components/Marquee';
import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightCard } from '@/components/SpotlightCard';
import { InvoiceCard } from '@/components/InvoiceCard';
import { Sparkles } from '@/components/Sparkles';
import { CursorGlow } from '@/components/CursorGlow';

const marqueeItems = [
  'Tax Invoice', '·', 'Delivery Challan', '·', 'E-Way Bill', '·',
  'Proforma', '·', 'Quotation', '·', 'POS Bill', '·',
  '5 PDF Templates', '·', 'Offline-First', '·', 'Drive Backup', '·',
];

export default function Home() {
  // Scroll-linked parallax — the hero's ambient gold orbs drift slowly upward
  // as you scroll past the hero (item 5). Disabled under reduced-motion.
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (orb1.current) orb1.current.style.transform = `translateY(${(-y * 0.3).toFixed(1)}px)`;
        if (orb2.current) orb2.current.style.transform = `translateY(${(-y * 0.18).toFixed(1)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      {/* Cursor-following gold glow — site-wide, self-disables on touch */}
      <CursorGlow />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="hero-bg noise-overlay relative overflow-x-clip">
        {/* Ambient gold orbs (parallax targets) */}
        <div ref={orb1} aria-hidden className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none opacity-55 will-change-transform"
             style={{ background: 'radial-gradient(circle, rgba(232,201,122,0.55), transparent 70%)', filter: 'blur(80px)' }} />
        <div ref={orb2} aria-hidden className="absolute top-1/2 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none opacity-45 will-change-transform"
             style={{ background: 'radial-gradient(circle, rgba(184,150,79,0.40), transparent 70%)', filter: 'blur(80px)' }} />

        {/* Magical floating sparkles */}
        <Sparkles />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-14 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* ━━━ Left — copy ━━━ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <span className="chip">
                <SparklesIcon className="h-3 w-3" strokeWidth={2.6} />
                GST billing · Made in India
              </span>

              <h1 className="font-display text-dark-brown mt-6"
                  style={{
                    fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.015em',
                    fontWeight: 600,
                  }}>
                Invoices for Indian SMBs,{' '}
                <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>
                  finally beautiful.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
                 style={{ color: '#6B6B6B' }}>
                The fastest way to bill on Android — six document types from Tax Invoice
                to POS, GST-ready PDFs, smart payment tracking, and Drive backup. All on
                your phone, all offline.
              </p>

              <div className="mt-9 flex gap-3 flex-wrap items-center justify-center lg:justify-start">
                <motion.a
                  href={BRAND.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]"
                  style={{ height: '54px' }}
                >
                  <Download className="h-4 w-4" strokeWidth={2.8} />
                  Download Free
                </motion.a>
                <Link href="/features"
                      className="outline-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]"
                      style={{ height: '54px' }}>
                  See features <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </Link>
              </div>

              {/* Trust row — slim and elegant */}
              <div className="mt-9 flex items-center gap-x-5 gap-y-3 flex-wrap justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-[#E8C97A] text-[#E8C97A]" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-dark-brown">4.9</span>
                </div>
                <span aria-hidden className="hidden sm:block h-4 w-px bg-gold/25" />
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B]">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2.6} />
                  No credit card
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B]">
                  <Lock className="h-3.5 w-3.5 text-gold" strokeWidth={2.6} />
                  Encrypted backup
                </div>
              </div>
            </motion.div>

            {/* ━━━ Right — invoice card (desktop only) ━━━ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex lg:col-span-5 justify-center relative"
            >
              {/* Soft rotating halo */}
              <div aria-hidden className="absolute inset-0 m-auto w-[440px] h-[440px] rounded-full pointer-events-none opacity-45 animate-lux-rotate"
                   style={{
                     background: 'conic-gradient(from 0deg, transparent, rgba(232,201,122,0.45), transparent 60%)',
                     filter: 'blur(44px)',
                   }} />

              {/* Gentle vertical float — calm, no spinning */}
              <div className="relative animate-lux-float-y">
                <InvoiceCard />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ━━━ Marquee strip ━━━ */}
        <div className="relative">
          <div className="divider-hairline mx-auto max-w-6xl" />
          <div className="py-3">
            <Marquee speed={10}>
              {marqueeItems.map((item, i) => (
                <span key={i}
                      className={`text-sm font-extrabold uppercase ${item === '·' ? 'text-[#B8964F]/40' : 'text-[#7A5E2A]'}`}
                      style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-jost), sans-serif' }}>
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
          <div className="divider-hairline mx-auto max-w-6xl" />
        </div>
      </section>

      {/* ════════════════════════ BENTO FEATURES ════════════════════════ */}
      <section className="surface-warm noise-overlay py-14 sm:py-20 lg:py-24 relative overflow-x-clip">
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(232,201,122,0.30), transparent 60%)', filter: 'blur(80px)' }} />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
          <SectionHeading
            eyebrow="Everything you need"
            title={<>One app. <span className="gradient-text italic">Every kind of bill.</span></>}
            body="From a quick POS receipt to a multi-page tax invoice with e-way details — GSTify covers every document an Indian SMB issues."
          />

          {/* Bento — auto-flow on mobile, structured on desktop. grid-3d adds the
              shared perspective for the cursor tilt (item 5). */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5 grid-3d">

            {/* 6 doc types — large card.
                MOBILE HEIGHT FIX (item 2): the card is `flex flex-col` always, but
                `h-full` is gated to md+. On a single-column mobile grid there is no
                row to stretch into, so the flex column collapses to its content and
                `md:mt-auto` never fires → no giant void above the icon. */}
            <Reveal className="md:col-span-4">
              <SpotlightCard className="lux-card app-card-hover rounded-3xl p-7 overflow-hidden relative flex flex-col md:h-full">
                <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 rounded-full opacity-40 pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(232,201,122,0.50), transparent 70%)', filter: 'blur(30px)' }} />
                <IconTile><Receipt className="h-6 w-6 text-dark-brown" strokeWidth={2.4} /></IconTile>
                <h3 className="font-display text-2xl lg:text-3xl font-black text-dark-brown mt-5"
                    style={{ letterSpacing: '-0.025em' }}>
                  6 document types
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed max-w-md"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Tax Invoice, Delivery Challan, E-Way Bill, Proforma, Quotation, and POS Cash Memo — all share the same fast UI.
                </p>
                <div className="flex flex-wrap gap-2 mt-5 md:mt-auto md:pt-5">
                  {['INV', 'CHL', 'EWB', 'PRO', 'QTN', 'POS'].map((p) => (
                    <span key={p} className="chip">{p}</span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Per-line GST */}
            <Reveal delay={50} className="md:col-span-2">
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
                <IconTile><Calculator className="h-5 w-5 text-dark-brown" strokeWidth={2.4} /></IconTile>
                <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4"
                    style={{ letterSpacing: '-0.02em' }}>
                  Per-line GST rates
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Mix 5%, 12%, 18%, 28% on one bill. CGST/SGST vs IGST handled by state.
                </p>
              </SpotlightCard>
            </Reveal>

            {/* Drive */}
            <Reveal delay={100} className="md:col-span-2">
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
                <IconTile><CloudUpload className="h-5 w-5 text-dark-brown" strokeWidth={2.4} /></IconTile>
                <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4"
                    style={{ letterSpacing: '-0.02em' }}>
                  Drive backup
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Auto-syncs to <em>your</em> Drive on appData scope. Restore in seconds.
                </p>
              </SpotlightCard>
            </Reveal>

            {/* Offline */}
            <Reveal delay={150} className="md:col-span-2">
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
                <IconTile><Globe className="h-5 w-5 text-dark-brown" strokeWidth={2.4} /></IconTile>
                <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4"
                    style={{ letterSpacing: '-0.02em' }}>
                  Offline-first
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Bill on the move. Everything syncs when you reconnect.
                </p>
              </SpotlightCard>
            </Reveal>

            {/* 5 templates with color swatches */}
            <Reveal delay={200} className="md:col-span-2">
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
                <div className="flex items-start justify-between">
                  <IconTile><Layers className="h-5 w-5 text-dark-brown" strokeWidth={2.4} /></IconTile>
                  <div className="flex gap-1.5">
                    {['#B8964F', '#0E0805', '#1D357A', '#C9785A', '#047857'].map((c) => (
                      <span key={c} className="w-5 h-5 rounded-md"
                            style={{
                              background: c,
                              border: '1.5px solid rgba(255,255,255,0.7)',
                              boxShadow: '0 2px 6px rgba(44,24,16,0.18)',
                            }} />
                    ))}
                  </div>
                </div>
                <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4"
                    style={{ letterSpacing: '-0.02em' }}>
                  5 PDF templates
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Classic Gold, Modern Midnight, Sapphire, Rose, Emerald.
                </p>
              </SpotlightCard>
            </Reveal>

            {/* Payments — wide */}
            <Reveal delay={250} className="md:col-span-4">
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
                <IconTile><Banknote className="h-5 w-5 text-dark-brown" strokeWidth={2.4} /></IconTile>
                <h3 className="font-display text-xl lg:text-2xl font-extrabold text-dark-brown mt-4"
                    style={{ letterSpacing: '-0.02em' }}>
                  Smart payment allocation
                </h3>
                <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed max-w-md"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Record one customer payment — we auto-split it across their oldest pending invoices. Anything left becomes an advance.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* hairline divider with a golden diamond (item 6) */}
      <div className="surface">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="divider-diamond"><span /></div>
        </div>
      </div>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <section className="surface noise-overlay py-16 sm:py-20 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Reveal className="text-center mb-12 max-w-3xl mx-auto">
            <p className="chip mb-5">
              <SparklesIcon className="h-3 w-3" strokeWidth={2.6} />
              By the numbers
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown"
                style={{ letterSpacing: '-0.035em', lineHeight: 1.05 }}>
              Built for Indian SMBs.<br />
              <span className="gradient-text italic">Sized for India.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 grid-3d">
            {[
              { value: 6,   suffix: '',    label: 'Document Types',  hint: 'Invoice → POS' },
              { value: 5,   suffix: '',    label: 'PDF Templates',   hint: 'Switch any time' },
              { value: 50,  suffix: '/mo', label: 'Free Invoices',   hint: 'No card needed' },
              { value: 100, suffix: '%',   label: 'Offline-Ready',   hint: 'Sync on reconnect' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <SpotlightCard className="app-card app-card-hover rounded-3xl p-6 sm:p-7 text-center">
                  <div className="font-display font-black gradient-text"
                       style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-[10.5px] font-extrabold uppercase text-[#7A5E2A]"
                     style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-jost), sans-serif' }}>
                    {s.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B6B6B]"
                     style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
                    {s.hint}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ HOW IT WORKS ════════════════════════ */}
      <section className="surface-warm noise-overlay py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            eyebrow="In two minutes"
            title={<>From install to <span className="gradient-text italic">first invoice.</span></>}
          />

          <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-4 sm:gap-5 relative grid-3d">
            <div aria-hidden className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(184,150,79,0.45), transparent)' }} />

            {[
              { n: '01', title: 'Install', body: 'Free on the Play Store. No card. No trial timer.' },
              { n: '02', title: 'Sign in', body: 'Email + 6-digit OTP. Passwordless. We never see your password.' },
              { n: '03', title: 'Bill',    body: 'Add a customer, pick products, generate a GST-compliant PDF.' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <SpotlightCard className="app-card app-card-hover rounded-3xl p-7">
                  <span className="chip-gold">Step {s.n}</span>
                  <h3 className="font-display text-2xl font-extrabold text-dark-brown mt-4"
                      style={{ letterSpacing: '-0.025em' }}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed"
                     style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                    {s.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ PRICING CTA ════════════════════════ */}
      <section className="surface noise-overlay py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Reveal>
            <div className="banner-bg gold-border noise-overlay rounded-3xl p-8 sm:p-10 lg:p-16 text-center relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40"
                   style={{ background: 'radial-gradient(ellipse at center, rgba(232,201,122,0.55), transparent 70%)' }} />

              <span className="chip relative mb-5">
                <SparklesIcon className="h-3 w-3" strokeWidth={2.6} />
                Pricing
              </span>
              <h2 className="relative font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown"
                  style={{ letterSpacing: '-0.035em', lineHeight: 1.05 }}>
                Free for the first<br />
                <span className="gradient-text italic">50 invoices</span> a month.
              </h2>
              <p className="relative mt-5 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                 style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                No credit card. No trial countdown. Upgrade to Pro (₹199/month) only when you outgrow it.
              </p>
              <div className="relative mt-8 flex gap-3 flex-wrap justify-center">
                <motion.a
                  href={BRAND.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]"
                  style={{ height: '54px' }}
                >
                  <Download className="h-4 w-4" strokeWidth={2.8} /> Download Free
                </motion.a>
                <Link href="/pricing"
                      className="outline-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]"
                      style={{ height: '54px' }}>
                  Compare plans <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════ FINAL CTA — warm cream card + gold aurora ════════════════════════ */}
      <section className="surface-warm noise-overlay py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Reveal>
            <div className="cta-cream p-10 sm:p-14 lg:p-16 text-center">
              {/* moving gold aurora behind the headline */}
              <div aria-hidden className="cta-aurora" />

              <div className="relative z-10">
                <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 gold-gradient"
                     style={{
                       border: '1.5px solid rgba(255,255,255,0.55)',
                       boxShadow: '0 12px 30px rgba(184,150,79,0.45), inset 0 1.5px 0 rgba(255,255,255,0.6)',
                     }}>
                  <Smartphone className="h-8 w-8 text-dark-brown" strokeWidth={2.2} />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown"
                    style={{ letterSpacing: '-0.035em', lineHeight: 1.05 }}>
                  Stop chasing<br />
                  <span className="gradient-text italic">paper bills.</span>
                </h2>
                <p className="mt-5 text-base sm:text-lg leading-relaxed"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Two-minute setup. Free forever for small businesses. India-first design.
                </p>
                <motion.a
                  href={BRAND.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px] mt-8"
                  style={{ height: '54px' }}
                >
                  <Download className="h-4 w-4" strokeWidth={2.8} /> Get the App
                </motion.a>
                <p className="mt-5 text-xs font-semibold"
                   style={{ color: '#6B6B6B', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Android · Free · ₹0 to start
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/** Reusable gold-gradient icon tile — keeps the bento cards consistent.
 *  `.tilt-layer` makes it float toward the viewer on card hover (item 5). */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="tilt-layer inline-flex items-center justify-center w-11 h-11 rounded-xl gold-gradient"
          style={{
            border: '1.5px solid rgba(255,255,255,0.55)',
            boxShadow:
              '0 6px 16px rgba(184,150,79,0.40), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(122,84,0,0.25)',
          }}>
      {children}
    </span>
  );
}
