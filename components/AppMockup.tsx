'use client';
import { FileText, Plus, Search, Wallet, Receipt, ArrowUpRight } from 'lucide-react';

/**
 * Hand-built mini app mockup. Renders a Dashboard-style phone screen using
 * the exact same gold gradient, card recipe and typography as the real
 * Android app — so visitors immediately recognise the look.
 *
 * No image asset required; everything is composed in DOM.
 */
export const AppMockup = () => {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[9/19.5] mx-auto"
         style={{ filter: 'drop-shadow(0 30px 60px rgba(43,39,34,0.30)) drop-shadow(0 8px 16px rgba(43,39,34,0.15))' }}>
      {/* Phone bezel */}
      <div className="absolute inset-0 rounded-[44px] p-[3px]"
           style={{
             background: 'linear-gradient(160deg, #2B2722 0%, #3A342C 40%, #2B2722 100%)',
             boxShadow:
               'inset 0 1.5px 0 rgba(215,176,95,0.18), inset 0 -1.5px 0 rgba(0,0,0,0.6)',
           }}>
        {/* Screen */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #F6F2E9 0%, #ECE4D4 100%)' }}>

          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-[#2B2722] z-20" />

          {/* Status bar */}
          <div className="flex justify-between items-center px-7 pt-3 text-[10px] font-bold text-[#2B2722] z-10 relative">
            <span style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>9:41</span>
            <div className="flex gap-1 items-center">
              <span className="block w-3 h-1.5 rounded-sm bg-[#2B2722]/80" />
              <span className="block w-3 h-1.5 rounded-sm bg-[#2B2722]/60" />
              <span className="block w-3 h-1.5 rounded-sm bg-[#2B2722]/40" />
              <span className="ml-1 block w-4 h-2 rounded-sm border border-[#2B2722]/70" />
            </div>
          </div>

          {/* App header */}
          <div className="px-5 pt-6 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8A6717]"
                 style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Good morning
              </p>
              <p className="text-[15px] font-black text-[#2B2722]"
                 style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.02em' }}>
                XYZ Enterprises
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{
                   background: 'linear-gradient(135deg, #D7B05F, #B98A2E, #A87E1E)',
                   border: '1.5px solid rgba(255,255,255,0.55)',
                   boxShadow:
                     '0 6px 18px rgba(168,126,30,0.45), inset 0 1px 0 rgba(255,255,255,0.6)',
                 }}>
              <Search className="h-4 w-4 text-[#2B2722]" strokeWidth={2.6} />
            </div>
          </div>

          {/* Stat card — outstanding balance */}
          <div className="mx-4 mt-4 rounded-2xl p-4 relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, #2B2722 0%, #3A342C 100%)',
                 boxShadow:
                   '0 10px 28px rgba(43,39,34,0.30), inset 0 1.5px 0 rgba(215,176,95,0.12)',
               }}>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30"
                 style={{ background: 'radial-gradient(circle, rgba(215,176,95,0.6), transparent 70%)' }} />
            <div className="relative">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#D7B05F]"
                 style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Outstanding
              </p>
              <p className="text-2xl font-black mt-1 text-white" style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.03em' }}>
                ₹ 1,24,580
              </p>
              <div className="mt-2 flex gap-1.5 items-center">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8.5px] font-extrabold"
                      style={{
                        background: 'rgba(74,222,128,0.18)',
                        color: '#86EFAC',
                        fontFamily: 'var(--font-poppins), sans-serif',
                      }}>
                  <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={3} />
                  +12% MoM
                </span>
                <span className="text-[8.5px] text-white/55" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  · 14 invoices
                </span>
              </div>
            </div>
          </div>

          {/* Quick action row */}
          <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: FileText, label: 'Invoice' },
              { icon: Receipt,  label: 'POS' },
              { icon: Wallet,   label: 'Payment' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-xl p-2.5 flex flex-col items-center gap-1"
                   style={{
                     background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF8 100%)',
                     border: '1.5px solid rgba(168,126,30,0.32)',
                     boxShadow:
                       'inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1.5px 0 rgba(168,126,30,0.14), 0 4px 12px -4px rgba(43,39,34,0.10)',
                   }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #D7B05F, #B98A2E, #A87E1E)',
                        boxShadow: '0 3px 8px rgba(168,126,30,0.32)',
                      }}>
                  <Icon className="h-3.5 w-3.5 text-[#2B2722]" strokeWidth={2.6} />
                </span>
                <span className="text-[9px] font-extrabold text-[#2B2722]"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Recent invoice list */}
          <div className="mx-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8A6717]"
                 style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Recent
              </p>
              <p className="text-[9px] font-bold text-[#A87E1E]" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                See all
              </p>
            </div>
            <div className="space-y-2">
              {[
                { c: 'Sharma Textiles',  inv: 'INV-209', amt: '₹ 18,450', state: 'paid'    },
                { c: 'Patel Hardware',   inv: 'INV-208', amt: '₹ 9,210',  state: 'pending' },
                { c: 'Mehta & Sons',     inv: 'INV-207', amt: '₹ 32,800', state: 'paid'    },
              ].map((r) => (
                <div key={r.inv} className="rounded-xl p-2.5 flex items-center justify-between"
                     style={{
                       background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF8 100%)',
                       border: '1.5px solid rgba(168,126,30,0.22)',
                       boxShadow:
                         'inset 0 1px 0 rgba(255,255,255,1), 0 3px 8px -3px rgba(43,39,34,0.08)',
                     }}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-bold text-[#2B2722] truncate"
                       style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {r.c}
                    </p>
                    <p className="text-[9px] text-[#6B6B6B]" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {r.inv}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10.5px] font-extrabold text-[#2B2722]"
                       style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {r.amt}
                    </p>
                    <p className="text-[8.5px] font-extrabold uppercase tracking-wider mt-px"
                       style={{
                         fontFamily: 'var(--font-poppins), sans-serif',
                         color: r.state === 'paid' ? '#047857' : '#D97706',
                       }}>
                      {r.state}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAB */}
          <div className="absolute bottom-5 right-4 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[#2B2722] font-bold text-[11px] animate-[fab-float_3.2s_ease-in-out_infinite]"
               style={{
                 background: 'linear-gradient(135deg,#D7B05F,#B98A2E,#A87E1E)',
                 border: '1.5px solid rgba(255,255,255,0.55)',
                 boxShadow:
                   '0 10px 22px rgba(43,39,34,0.30), inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -1.5px 0 rgba(110,84,23,0.30)',
                 fontFamily: 'var(--font-poppins), sans-serif',
               }}>
            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
            New
          </div>

          {/* Bottom tab nav */}
          <div className="absolute bottom-0 inset-x-0 h-14 px-5 flex justify-around items-center border-t"
               style={{
                 background: 'rgba(251,248,242,0.92)',
                 backdropFilter: 'blur(8px)',
                 borderColor: 'rgba(168,126,30,0.20)',
               }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#A87E1E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A87E1E]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A87E1E]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A87E1E]/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
