'use client';
import { Receipt, Truck, FileText, FileSignature, ShoppingBag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The cinematic "film reel" — a 3D carousel that slowly turns, showing the five
 * GST document types as glowing glass slides. Each panel is positioned on a ring
 * via `rotateY(72°·i) translateZ()` (see .reel-panel in globals.css) and the whole
 * ring auto-rotates. Pauses on hover. Rendered desktop-only by the hero (the
 * spinning preserve-3d context is intentionally kept off small/low-GPU screens).
 */

type Doc = {
  code: string;
  name: string;
  icon: LucideIcon;
  rim: string;   // border gradient start
  glow: string;  // outer glow color
  accent: string;
};

const DOCS: Doc[] = [
  { code: 'INV', name: 'Tax Invoice',     icon: Receipt,       rim: '#E8C97A', glow: 'rgba(232,201,122,0.6)', accent: '#E8C97A' },
  { code: 'CHL', name: 'Delivery Challan', icon: Truck,         rim: '#5EEAD4', glow: 'rgba(94,234,212,0.55)', accent: '#5EEAD4' },
  { code: 'PRO', name: 'Proforma',        icon: FileText,      rim: '#A78BFA', glow: 'rgba(167,139,250,0.5)', accent: '#A78BFA' },
  { code: 'QTN', name: 'Quotation',       icon: FileSignature, rim: '#F472B6', glow: 'rgba(244,114,182,0.5)', accent: '#F472B6' },
  { code: 'POS', name: 'POS Cash Memo',   icon: ShoppingBag,   rim: '#34D399', glow: 'rgba(52,211,153,0.5)',  accent: '#34D399' },
];

export function DocumentReel() {
  return (
    <div className="reel-stage" aria-hidden>
      <div className="reel-floor" />
      <div className="reel">
        {DOCS.map((d, i) => {
          const Icon = d.icon;
          return (
            <div
              key={d.code}
              className="reel-panel"
              style={{ ['--i' as string]: i, ['--rim' as string]: d.rim, ['--glow' as string]: d.glow, background: '#14111E' } as React.CSSProperties}
            >
              {/* Colored header band */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${d.accent}, transparent)` }} />

              <div className="p-5 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${d.accent}, rgba(255,255,255,0.15))`, color: '#0A0813', boxShadow: `0 0 22px -4px ${d.glow}` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em]" style={{ color: d.accent }}>
                    GST · {d.code}
                  </span>
                </div>

                <p className="font-display text-2xl font-black text-dark-brown mt-5" style={{ letterSpacing: '-0.02em' }}>
                  {d.code}
                </p>
                <p className="text-[13px] font-semibold" style={{ color: '#B9B4C4' }}>{d.name}</p>

                {/* Skeleton "document" lines */}
                <div className="mt-5 space-y-2 flex-1">
                  {[0.9, 0.7, 0.8, 0.55].map((w, k) => (
                    <div key={k} className="h-2 rounded-full" style={{ width: `${w * 100}%`, background: 'rgba(255,255,255,0.07)' }} />
                  ))}
                </div>

                {/* Footer total chip */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px]" style={{ color: '#7E7A8C' }}>GSTIN ··· 1A1AA</span>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-extrabold"
                    style={{ background: `${d.accent}1F`, color: d.accent, border: `1px solid ${d.accent}55` }}
                  >
                    GST-ready
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
