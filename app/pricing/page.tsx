'use client';
import { Check, X, Download, Crown, Briefcase, Sparkles } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';

const plans = [
  {
    id: 'free', name: 'Free', icon: Sparkles,
    price: '₹0', period: 'forever',
    description: 'Perfect to try out GSTify with no commitment.',
    cta: 'Start Free', highlight: false,
    features: [
      { text: '50 invoices / month',         on: true  },
      { text: '100 customers',               on: true  },
      { text: '30 saved products',           on: true  },
      { text: '1 device',                    on: true  },
      { text: 'GSTify watermark on PDFs',    on: true  },
      { text: 'GST auto-fetch by GSTIN',     on: false },
      { text: 'All 5 invoice templates',     on: false },
      { text: 'PC / web login',              on: false },
    ],
  },
  {
    id: 'pro', name: 'Pro', icon: Crown,
    price: '₹199', period: '/month',
    yearly: '₹1,499/yr · save 37%',
    description: 'For SMBs who bill every day.',
    cta: 'Upgrade to Pro', highlight: true,
    features: [
      { text: 'Unlimited invoices',          on: true },
      { text: 'Unlimited customers',         on: true },
      { text: 'Unlimited products',          on: true },
      { text: 'Up to 3 devices',             on: true },
      { text: 'No watermark on PDFs',        on: true },
      { text: 'GST auto-fetch by GSTIN',     on: true },
      { text: 'All 5 invoice templates',     on: true },
      { text: 'PC / web login',              on: false },
    ],
  },
  {
    id: 'business', name: 'Business', icon: Briefcase,
    price: '₹399', period: '/month',
    yearly: '₹2,999/yr · save 38%',
    description: 'For teams with multiple users.',
    cta: 'Upgrade to Business', highlight: false,
    features: [
      { text: 'Everything in Pro',           on: true },
      { text: 'Up to 5 devices',             on: true },
      { text: 'PC / web login',              on: true },
      { text: 'Dedicated support',           on: true },
      { text: 'Early access to new features',on: true },
      { text: 'Custom branding (soon)',      on: true },
      { text: '—',                           on: false },
      { text: '—',                           on: false },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="hero-bg noise-overlay">
      <section className="container mx-auto px-3 sm:px-6 max-w-6xl pt-20 sm:pt-24 pb-20 sm:pb-28">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Start free. Upgrade <span className="gradient-text italic">when you grow.</span></>}
          body="No trial countdown. No card required to start. Cancel anytime from inside the app."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80}
              className={`${plan.highlight ? 'gold-border' : 'lux-card'} rounded-3xl p-8 relative flex flex-col ${plan.highlight ? 'lg:scale-105 lg:-my-2' : ''}`}>
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-dark-brown text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow"
                      style={{ letterSpacing: '0.14em' }}>
                  Most Popular
                </span>
              )}

              <plan.icon className="h-8 w-8 text-gold mb-4" strokeWidth={2.2} />
              <h3 className="font-display text-2xl font-black text-dark-brown" style={{ letterSpacing: '-0.025em' }}>{plan.name}</h3>
              <p className="mt-1 text-[13px] text-gold-dim">{plan.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-dark-brown" style={{ letterSpacing: '-0.03em' }}>
                  {plan.price}
                </span>
                <span className="text-sm font-semibold text-gold-dim">{plan.period}</span>
              </div>
              {plan.yearly && (
                <p className="mt-1 text-[12px] font-extrabold text-gold">{plan.yearly}</p>
              )}

              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-[14px]">
                    {f.on
                      ? <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" strokeWidth={2.6} />
                      : <X     className="h-4 w-4 text-gold-dim/40 flex-shrink-0 mt-0.5" strokeWidth={2.4} />}
                    <span className={f.on ? 'text-dark-brown' : 'text-gold-dim/60'}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a href={BRAND.playStoreUrl} target="_blank" rel="noopener noreferrer"
                 className={`mt-7 h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] font-bold ${plan.highlight ? 'gold-button' : 'outline-button'}`}>
                <Download className="h-4 w-4" strokeWidth={2.6} /> {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xs text-gold-dim mt-12 max-w-xl mx-auto leading-relaxed">
          Prices in INR. Pro and Business plans are billed through Google Play. Cancel any time from your Google Play subscriptions.
        </p>
      </section>

      {/* FAQ-style mini section */}
      <section className="surface-warm noise-overlay py-20">
        <div className="container mx-auto px-3 sm:px-6 max-w-3xl">
          <SectionHeading
            eyebrow="No surprises"
            title={<>Honest pricing. <span className="gradient-text italic">No tricks.</span></>}
            className="text-center"
          />
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {[
              { q: 'Hidden fees?',     a: 'None. The price you see is the final price.' },
              { q: 'Free trial?',      a: 'No trial — the Free plan is unlimited time.' },
              { q: 'Bill annually?',   a: 'Yes, save 37–38% by paying yearly.' },
              { q: 'Cancel anytime?',  a: 'Cancel from Google Play. Effective end of current billing cycle.' },
            ].map((f) => (
              <Reveal key={f.q} className="app-card rounded-2xl p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A5E2A] mb-1.5"
                   style={{ letterSpacing: '0.14em' }}>
                  {f.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
