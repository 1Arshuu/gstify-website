'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles as SparklesIcon, ArrowRight, Download, ShieldCheck,
  CloudUpload, Receipt, Calculator, Globe, Banknote,
  Smartphone, Layers, Star, Cpu, Check, X,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/components/Reveal';
import { Counter } from '@/components/Counter';
import { Marquee } from '@/components/Marquee';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { SpotlightCard } from '@/components/SpotlightCard';
import { InvoiceCard } from '@/components/InvoiceCard';
import { Sparkles } from '@/components/Sparkles';
import { Magnetic } from '@/components/Magnetic';
import { Testimonials } from '@/components/Testimonials';

const MUTED = '#9793A6';

const marqueeItems = [
  'Tax Invoice', '◇', 'Delivery Challan', '◇', 'Proforma', '◇',
  'Quotation', '◇', 'POS Bill', '◇', '5 PDF Templates', '◇',
  'Offline-First', '◇', 'Drive Backup', '◇', 'Per-line GST', '◇',
];

const compare: { label: string; free: string | boolean; pro: string | boolean }[] = [
  { label: 'Invoices / month',        free: '50',  pro: 'Unlimited' },
  { label: 'Saved customers',         free: '50',  pro: 'Unlimited' },
  { label: 'Devices',                 free: '1',   pro: 'Up to 3' },
  { label: 'PDF templates',           free: '1',   pro: 'All 5' },
  { label: 'Watermark-free PDFs',     free: false, pro: true },
  { label: 'GST auto-fetch by GSTIN', free: false, pro: true },
];

const faq = [
  { q: 'Is GSTify really free?', a: 'Yes. The Free plan gives you 50 invoices a month, 50 customers and 30 products — no credit card, no trial countdown. Upgrade to Pro (₹199/mo) only when you outgrow it.' },
  { q: 'Does it work offline?', a: 'Fully. Create invoices, add customers and record payments with zero signal. Everything syncs automatically the moment you reconnect.' },
  { q: 'How does backup work?', a: 'Connect Google Drive once. Snapshots are stored in your own Drive’s appData folder (only GSTify can read them). Restore on any device in one tap.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Pro and Business are billed through Google Play — cancel from your Google Play subscriptions whenever you like.' },
  { q: 'Is my data secure?', a: 'Data is encrypted in transit and at rest, backups go to your own Google Drive, and we never see your invoice contents.' },
];

export default function Home() {
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
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div>
      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="hero-bg relative overflow-x-clip">
        <div aria-hidden className="neon-grid" />
        <div ref={orb1} aria-hidden className="aurora-orb -top-40 -left-32 w-[560px] h-[560px] opacity-50"
             style={{ background: 'radial-gradient(circle, rgba(232,201,122,0.5), transparent 70%)', position: 'absolute' }} />
        <div ref={orb2} aria-hidden className="aurora-orb top-1/3 -right-40 w-[520px] h-[520px] opacity-45"
             style={{ background: 'radial-gradient(circle, rgba(94,234,212,0.42), transparent 70%)', position: 'absolute' }} />
        <Sparkles />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <motion.div
              initial={{ opacity: 1, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <span className="chip">
                <SparklesIcon className="h-3 w-3" strokeWidth={2.6} /> The future of GST billing
              </span>

              <h1 className="font-display text-dark-brown mt-6"
                  style={{ fontSize: 'clamp(2.9rem, 7vw, 5.6rem)', lineHeight: 1.02, letterSpacing: '-0.02em', fontWeight: 600 }}>
                GST billing for Indian SMBs,{' '}
                <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 600, animation: 'none' }}>
                  reimagined.
                </span>
              </h1>

              <p className="mt-7 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: MUTED }}>
                GSTify is the fastest way to create GST invoices on Android — five document types,
                GST-ready PDFs, smart payment tracking and Google Drive backup. All on your phone,
                all offline.
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
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2.6} /> No credit card
                </div>
                <span className="chip-teal">Made in India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex lg:col-span-5 justify-center relative"
            >
              <div aria-hidden className="absolute inset-0 m-auto w-[460px] h-[460px] rounded-full pointer-events-none opacity-60 animate-lux-rotate"
                   style={{ background: 'conic-gradient(from 0deg, transparent, rgba(232,201,122,0.55), transparent 40%, rgba(94,234,212,0.45), transparent 75%)', filter: 'blur(46px)' }} />
              <div className="invoice-3d relative animate-lux-float-y">
                <div className="invoice-spin"><InvoiceCard /></div>
              </div>
            </motion.div>
          </div>
        </div>

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

      {/* ════════════════════════ STATS ════════════════════════ */}
      <Section tone="base" grid>
        <Reveal className="text-center mb-12 max-w-3xl mx-auto">
          <span className="chip mb-5"><SparklesIcon className="h-3 w-3" strokeWidth={2.6} /> By the numbers</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Built for Indian SMBs.<br />
            <span className="gradient-text italic">Sized for India.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 grid-3d">
          {[
            { value: 5,   suffix: '',    label: 'Document Types', hint: 'Invoice → POS' },
            { value: 5,   suffix: '',    label: 'PDF Templates',  hint: 'Switch any time' },
            { value: 50,  suffix: '/mo', label: 'Free Invoices',  hint: 'No card needed' },
            { value: 100, suffix: '%',   label: 'Offline-Ready',  hint: 'Sync on reconnect' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-6 sm:p-7 text-center">
                <div className="font-display font-black gradient-text glow-text"
                     style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-[10.5px] font-extrabold uppercase text-[#C9A86A]" style={{ letterSpacing: '0.16em' }}>{s.label}</p>
                <p className="mt-1 text-xs font-semibold" style={{ color: MUTED }}>{s.hint}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ BENTO FEATURES ════════════════════════ */}
      <Section tone="warm" glow="violet">
        <SectionHeading
          eyebrow="Everything you need"
          title={<>One app. <span className="gradient-text italic">Every kind of bill.</span></>}
          body="From a quick POS receipt to a multi-page tax invoice — GSTify covers every document an Indian SMB issues, in a luminous, offline-first interface."
        />
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5 grid-3d">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="lux-card app-card-hover scanline rounded-3xl p-7 overflow-hidden relative flex flex-col md:h-full">
              <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 rounded-full opacity-50 pointer-events-none"
                   style={{ background: 'radial-gradient(circle, rgba(232,201,122,0.4), transparent 70%)', filter: 'blur(28px)' }} />
              <IconTile><Receipt className="h-6 w-6" strokeWidth={2.4} /></IconTile>
              <h3 className="font-display text-2xl lg:text-3xl font-black text-dark-brown mt-5" style={{ letterSpacing: '-0.01em' }}>5 document types</h3>
              <p className="mt-3 text-[15px] leading-relaxed max-w-md" style={{ color: MUTED }}>
                Tax Invoice, Delivery Challan, Proforma, Quotation and POS Cash Memo — all sharing one impossibly fast UI.
              </p>
              <div className="flex flex-wrap gap-2 mt-5 md:mt-auto md:pt-5">
                {['INV', 'CHL', 'PRO', 'QTN', 'POS'].map((p) => (<span key={p} className="chip">{p}</span>))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={50} className="md:col-span-2">
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
              <IconTile><Calculator className="h-5 w-5" strokeWidth={2.4} /></IconTile>
              <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>Per-line GST</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: MUTED }}>Mix 5/12/18/28% on one bill. CGST/SGST vs IGST handled by state.</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={100} className="md:col-span-2">
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
              <IconTile><CloudUpload className="h-5 w-5" strokeWidth={2.4} /></IconTile>
              <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>Drive backup</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: MUTED }}>Auto-syncs to <em>your</em> Drive on appData scope. Restore in seconds.</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={150} className="md:col-span-2">
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
              <IconTile><Globe className="h-5 w-5" strokeWidth={2.4} /></IconTile>
              <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>Offline-first</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: MUTED }}>Bill on the move. Everything syncs when you reconnect.</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
              <div className="flex items-start justify-between">
                <IconTile><Layers className="h-5 w-5" strokeWidth={2.4} /></IconTile>
                <div className="flex gap-1.5">
                  {['#E8C97A', '#5EEAD4', '#A78BFA', '#F472B6', '#34D399'].map((c) => (
                    <span key={c} className="w-5 h-5 rounded-md" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>5 PDF templates</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: MUTED }}>Classic Gold, Midnight, Sapphire, Rose, Emerald.</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={250} className="md:col-span-4">
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-7 flex flex-col md:h-full">
              <IconTile><Banknote className="h-5 w-5" strokeWidth={2.4} /></IconTile>
              <h3 className="font-display text-xl lg:text-2xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>Smart payment allocation</h3>
              <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed max-w-md" style={{ color: MUTED }}>
                Record one customer payment — we auto-split it across their oldest pending invoices. Anything left becomes an advance.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════ HOW IT WORKS ════════════════════════ */}
      <Section tone="base">
        <SectionHeading eyebrow="In two minutes" title={<>From install to <span className="gradient-text italic">first invoice.</span></>} />
        <div className="mt-14 sm:mt-16 grid md:grid-cols-3 gap-4 sm:gap-5 relative grid-3d">
          <div aria-hidden className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px"
               style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.5), rgba(94,234,212,0.5), transparent)' }} />
          {[
            { n: '01', title: 'Install', body: 'Free on the Play Store. No card. No trial timer.' },
            { n: '02', title: 'Sign in', body: 'Email + 6-digit OTP. Passwordless. We never see your password.' },
            { n: '03', title: 'Bill',    body: 'Add a customer, pick products, generate a GST-compliant PDF.' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <SpotlightCard className="app-card app-card-hover rounded-3xl p-7">
                <span className="chip-gold">Step {s.n}</span>
                <h3 className="font-display text-2xl font-extrabold text-dark-brown mt-4" style={{ letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
      <Section tone="warm" glow="gold">
        <Testimonials />
      </Section>

      {/* ════════════════════════ FREE vs PRO ════════════════════════ */}
      <Section tone="base" grid>
        <SectionHeading
          eyebrow="Free vs Pro"
          title={<>Start free. <span className="gradient-text italic">Scale when ready.</span></>}
          body="Everything you need to start is free forever. Upgrade only when your volume grows."
        />
        <Reveal className="mt-12 max-w-3xl mx-auto">
          <div className="app-card rounded-3xl p-6 sm:p-9 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 sm:gap-x-12 gap-y-3.5">
              <span />
              <span className="text-center text-[11px] font-extrabold uppercase" style={{ color: MUTED, letterSpacing: '0.14em' }}>Free</span>
              <span className="text-center text-[11px] font-extrabold uppercase text-gold" style={{ letterSpacing: '0.14em' }}>Pro</span>
              {compare.map((row) => (
                <CompareRow key={row.label} {...row} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Magnetic strength={0.35}>
                <Link href="/pricing" className="outline-button rounded-2xl px-7 inline-flex items-center gap-2 text-[14px]" style={{ height: '50px' }}>
                  Compare full plans <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════ FAQ ════════════════════════ */}
      <Section tone="warm">
        <SectionHeading eyebrow="Questions?" title={<>Everything you <span className="gradient-text italic">want to know.</span></>} />
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faq.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <details className="lux-card-soft rounded-2xl p-5 group">
                <summary className="cursor-pointer list-none font-bold text-dark-brown flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gold ml-3 transition-transform group-open:rotate-45 text-xl leading-none"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(232,201,122,0.7))' }}>+</span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ PRICING CTA ════════════════════════ */}
      <Section tone="base">
        <Reveal>
          <div className="banner-bg gold-border noise-overlay rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            <div aria-hidden className="cta-aurora" />
            <div className="relative z-10">
              <span className="chip mb-5"><SparklesIcon className="h-3 w-3" strokeWidth={2.6} /> Pricing</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                Free for the first<br />
                <span className="gradient-text italic">50 invoices</span> a month.
              </h2>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
                No credit card. No trial countdown. Upgrade to Pro (₹199/month) only when you outgrow it.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap justify-center">
                <Magnetic strength={0.4}>
                  <a href={BRAND.playStoreUrl} target="_blank" rel="noopener noreferrer"
                     className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]" style={{ height: '54px' }}>
                    <Download className="h-4 w-4" strokeWidth={2.8} /> Download Free
                  </a>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Link href="/pricing" className="outline-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]" style={{ height: '54px' }}>
                    Compare plans <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════ FINAL CTA ════════════════════════ */}
      <Section tone="warm" containerClassName="max-w-4xl">
        <Reveal>
          <div className="cta-cream p-10 sm:p-14 lg:p-16 text-center">
            <div aria-hidden className="cta-aurora" />
            <div className="relative z-10">
              <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 gold-gradient" style={{ boxShadow: '0 0 40px rgba(232,201,122,0.6)' }}>
                <Smartphone className="h-8 w-8 text-[#1A1205]" strokeWidth={2.2} />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark-brown" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                Stop chasing<br />
                <span className="gradient-text glow-text italic">paper bills.</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: MUTED }}>
                Two-minute setup. Free forever for small businesses. India-first design.
              </p>
              <div className="mt-8 flex justify-center">
                <Magnetic strength={0.4}>
                  <a href={BRAND.playStoreUrl} target="_blank" rel="noopener noreferrer"
                     className="gold-button rounded-2xl px-7 inline-flex items-center gap-2 text-[15px]" style={{ height: '54px' }}>
                    <Download className="h-4 w-4" strokeWidth={2.8} /> Get the App
                  </a>
                </Magnetic>
              </div>
              <p className="mt-5 text-xs font-semibold flex items-center justify-center gap-1.5" style={{ color: MUTED }}>
                <Cpu className="h-3.5 w-3.5 text-teal" strokeWidth={2.4} /> Android · Free · ₹0 to start
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

/** Gold-gradient icon tile — glows on dark, floats on card hover. */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="tilt-layer inline-flex items-center justify-center w-11 h-11 rounded-xl gold-gradient text-[#1A1205]"
          style={{ boxShadow: '0 0 24px rgba(232,201,122,0.5), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
      {children}
    </span>
  );
}

/** One row of the Free-vs-Pro comparison (label + Free cell + Pro cell). */
function CompareRow({ label, free, pro }: { label: string; free: string | boolean; pro: string | boolean }) {
  const Cell = ({ v, accent }: { v: string | boolean; accent?: boolean }) =>
    typeof v === 'boolean' ? (
      v ? (
        <Check className={`h-[18px] w-[18px] mx-auto ${accent ? 'text-gold' : 'text-teal'}`} strokeWidth={2.6} />
      ) : (
        <X className="h-[18px] w-[18px] mx-auto" style={{ color: 'rgba(151,147,166,0.45)' }} strokeWidth={2.4} />
      )
    ) : (
      <span className={`text-[13px] font-bold text-center block ${accent ? 'text-gold' : ''}`} style={accent ? undefined : { color: MUTED }}>{v}</span>
    );

  return (
    <>
      <span className="text-[13px] sm:text-[14px] font-semibold text-dark-brown border-t border-white/5 pt-3.5">{label}</span>
      <span className="border-t border-white/5 pt-3.5"><Cell v={free} /></span>
      <span className="border-t border-white/5 pt-3.5"><Cell v={pro} accent /></span>
    </>
  );
}
