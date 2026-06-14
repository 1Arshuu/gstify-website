'use client';
import { Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { SectionHeading } from '@/components/SectionHeading';

const MUTED = '#9793A6';

// Illustrative — swap for real Play Store reviews when you have them.
const items = [
  { quote: 'Switched from a paper bill book. Now I hand over a GST invoice before the customer leaves the counter.', name: 'Rajesh K.', role: 'Textile Shop · Surat', initials: 'RK' },
  { quote: 'Offline mode is a lifesaver at my warehouse where there is no signal. Everything syncs the moment I am back online.', name: 'Priya M.', role: 'Wholesale Distributor · Pune', initials: 'PM' },
  { quote: 'Lost my phone, restored everything on the new one from Drive in under a minute. That backup alone is worth it.', name: 'Imran S.', role: 'Hardware Store · Lucknow', initials: 'IS' },
  { quote: 'Per-line GST rates saved me from so many filing mistakes. The PDFs look more professional than my old software.', name: 'Anita R.', role: 'Boutique · Jaipur', initials: 'AR' },
];

export function Testimonials() {
  return (
    <>
      <SectionHeading
        eyebrow="Loved by SMBs"
        title={<>Billing that businesses <span className="gradient-text italic">actually enjoy.</span></>}
        body="Shop owners, distributors and freelancers across India bill faster with GSTify."
      />
      <div className="mt-14 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 grid-3d">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 60}>
            <SpotlightCard className="app-card app-card-hover rounded-3xl p-6 h-full flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-[#E8C97A] text-[#E8C97A]" strokeWidth={1.5}
                        style={{ filter: 'drop-shadow(0 0 5px rgba(232,201,122,0.7))' }} />
                ))}
              </div>
              <p className="text-[14px] leading-relaxed flex-1" style={{ color: '#CFC9D9' }}>
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="tilt-layer inline-flex items-center justify-center w-9 h-9 rounded-full gold-gradient text-[#1A1205] text-[12px] font-extrabold"
                      style={{ boxShadow: '0 0 18px rgba(232,201,122,0.5)' }}>
                  {t.initials}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-dark-brown leading-tight">{t.name}</p>
                  <p className="text-[11px]" style={{ color: MUTED }}>{t.role}</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}
