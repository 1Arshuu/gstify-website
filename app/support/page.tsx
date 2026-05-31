'use client';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle, ExternalLink } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const faq = [
  {
    q: 'Is GSTify free?',
    a: 'Yes. Free tier includes 50 invoices/month, 100 customers, 30 products, and 1 device. Upgrade to Pro (₹199/mo) for unlimited everything and the GSTify watermark removed.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. You can create invoices, add customers, and record payments without internet. Everything syncs to Supabase when you reconnect.',
  },
  {
    q: 'How does backup work?',
    a: 'Connect Google Drive once. The app stores backup snapshots in your own Drive\'s appData folder (only GSTify can access them). Restore on any device with one tap.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Data is stored in Supabase (encrypted in transit + at rest). Backups go to your own Google Drive. We never see your invoice contents.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes. Pro and Business subscriptions are managed through Google Play. Cancel any time from your Google Play subscriptions page.',
  },
  {
    q: 'I lost my device. Can I get my data back?',
    a: 'If you had Drive backup enabled — yes. Install GSTify on a new device, sign in with the same email, and restore from Drive in one tap.',
  },
];

export default function Support() {
  return (
    <div className="hero-bg">
      <section className="container mx-auto px-3 sm:px-6 max-w-3xl py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-3" style={{ letterSpacing: '0.14em' }}>
            Support
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-black text-dark-brown" style={{ letterSpacing: '-0.03em' }}>
            How can we help?
          </h1>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <a href={`mailto:${BRAND.email}`} className="lux-card rounded-2xl p-6 hover:-translate-y-0.5 transition-transform">
            <Mail className="h-7 w-7 text-gold mb-3" strokeWidth={2.2} />
            <h3 className="font-display text-lg font-extrabold text-dark-brown">Email us</h3>
            <p className="text-sm text-gold-dim mt-1">{BRAND.email}</p>
            <p className="text-xs text-gold-dim mt-2 inline-flex items-center gap-1">Open mail app <ExternalLink className="h-3 w-3" /></p>
          </a>
          <a href={`https://wa.me/${BRAND.email.split('@')[0]}`} target="_blank" rel="noopener noreferrer" className="lux-card rounded-2xl p-6 hover:-translate-y-0.5 transition-transform">
            <MessageSquare className="h-7 w-7 text-gold mb-3" strokeWidth={2.2} />
            <h3 className="font-display text-lg font-extrabold text-dark-brown">WhatsApp</h3>
            <p className="text-sm text-gold-dim mt-1">Quick replies during business hours</p>
            <p className="text-xs text-gold-dim mt-2 inline-flex items-center gap-1">Start chat <ExternalLink className="h-3 w-3" /></p>
          </a>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-2xl font-extrabold text-dark-brown mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gold" /> Frequently asked
        </h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="lux-card-soft rounded-2xl p-5 group"
            >
              <summary className="cursor-pointer list-none font-bold text-dark-brown flex items-center justify-between">
                <span>{item.q}</span>
                <span className="text-gold ml-3 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-[14px] text-gold-dim leading-relaxed">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </section>
    </div>
  );
}
