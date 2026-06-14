'use client';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Section } from '@/components/Section';
import { SpotlightCard } from '@/components/SpotlightCard';

const MUTED = '#9793A6';

const faq = [
  { q: 'Is GSTify free?', a: 'Yes. Free tier includes 50 invoices/month, 50 customers, 30 products, and 1 device. Upgrade to Pro (₹199/mo) for unlimited everything and the GSTify watermark removed.' },
  { q: 'Does it work offline?', a: 'Yes. You can create invoices, add customers, and record payments without internet. Everything syncs to Supabase when you reconnect.' },
  { q: 'How does backup work?', a: 'Connect Google Drive once. The app stores backup snapshots in your own Drive\'s appData folder (only GSTify can access them). Restore on any device with one tap.' },
  { q: 'Free users: please connect Google Drive', a: 'On the Free plan your data is stored locally on your device. If you uninstall the app, lose your phone, or clear app data, that data cannot be recovered unless you have connected Google Drive backup. We strongly recommend connecting Drive right after your first invoice. GSTify is not responsible for any data loss where Drive backup was not enabled.' },
  { q: 'Is my data secure?', a: 'Yes. Data is stored in Supabase (encrypted in transit + at rest). Backups go to your own Google Drive. We never see your invoice contents.' },
  { q: 'What happens to my data when I upgrade to Pro?', a: 'It moves with you — automatically. On your first launch as a Pro/Business user, every invoice, customer, product, payment and expense stored on your device is uploaded to the cloud. From then on your data syncs across all your signed-in devices.' },
  { q: 'Can I cancel my subscription?', a: 'Yes. Pro and Business subscriptions are managed through Google Play. Cancel any time from your Google Play subscriptions page.' },
  { q: 'I lost my device. Can I get my data back?', a: 'If you had Drive backup enabled — yes. Install GSTify on a new device, sign in with the same email, and restore from Drive in one tap.' },
];

export default function Support() {
  return (
    <Section tone="base" glow="gold" containerClassName="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="chip mb-5"><Sparkles className="h-3 w-3" strokeWidth={2.6} /> Support</span>
          <h1 className="font-display text-4xl lg:text-6xl font-black text-dark-brown" style={{ letterSpacing: '-0.02em', lineHeight: 1.04 }}>
            How can we <span className="gradient-text glow-text italic">help?</span>
          </h1>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14 grid-3d">
          <SpotlightCard className="app-card app-card-hover rounded-2xl">
            <a href={`mailto:${BRAND.email}`} className="block p-6">
              <span className="tilt-layer inline-flex items-center justify-center w-11 h-11 rounded-xl gold-gradient text-[#1A1205] mb-3"
                    style={{ boxShadow: '0 0 22px rgba(232,201,122,0.5)' }}>
                <Mail className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="font-display text-lg font-extrabold text-dark-brown">Email us</h3>
              <p className="text-sm mt-1" style={{ color: MUTED }}>{BRAND.email}</p>
              <p className="text-xs mt-2 inline-flex items-center gap-1 text-teal">Open mail app <ExternalLink className="h-3 w-3" /></p>
            </a>
          </SpotlightCard>
          <SpotlightCard className="app-card app-card-hover rounded-2xl">
            <a href={`https://wa.me/${BRAND.email.split('@')[0]}`} target="_blank" rel="noopener noreferrer" className="block p-6">
              <span className="tilt-layer inline-flex items-center justify-center w-11 h-11 rounded-xl gold-gradient text-[#1A1205] mb-3"
                    style={{ boxShadow: '0 0 22px rgba(232,201,122,0.5)' }}>
                <MessageSquare className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="font-display text-lg font-extrabold text-dark-brown">WhatsApp</h3>
              <p className="text-sm mt-1" style={{ color: MUTED }}>Quick replies during business hours</p>
              <p className="text-xs mt-2 inline-flex items-center gap-1 text-teal">Start chat <ExternalLink className="h-3 w-3" /></p>
            </a>
          </SpotlightCard>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-2xl font-extrabold text-dark-brown mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gold" /> Frequently asked
        </h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="lux-card-soft rounded-2xl p-5 group"
            >
              <summary className="cursor-pointer list-none font-bold text-dark-brown flex items-center justify-between">
                <span>{item.q}</span>
                <span className="text-gold ml-3 transition-transform group-open:rotate-45 text-xl leading-none"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(232,201,122,0.7))' }}>+</span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>{item.a}</p>
            </motion.details>
          ))}
        </div>
    </Section>
  );
}
