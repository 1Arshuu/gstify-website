'use client';

/**
 * Hand-rendered "real-looking" invoice card. Replaces the phone mockup
 * in the hero — it's lighter, always renders correctly on mobile, and
 * speaks more directly to the product (which is an invoice app).
 *
 * Slight rotation + soft drop shadow gives it the floating-paper feel.
 */
export const InvoiceCard = () => {
  const items = [
    { name: 'Cotton Fabric (10 m)',    qty: 2, rate: '₹ 2,200', total: '₹ 4,400' },
    { name: 'Silk Saree — Banarasi',   qty: 1, rate: '₹ 8,500', total: '₹ 8,500' },
    { name: 'Embroidery Service',      qty: 3, rate: '₹ 1,850', total: '₹ 5,550' },
  ];

  return (
    <div
      className="relative will-change-transform"
      style={{
        width: 360,
        transform: 'rotate(-2.5deg)',
        filter:
          'drop-shadow(0 28px 56px rgba(44,24,16,0.22)) drop-shadow(0 10px 18px rgba(44,24,16,0.14))',
      }}
    >
      <div
        className="relative rounded-[26px] overflow-hidden noise-overlay"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FBF8F2 100%)',
          border: '1.5px solid rgba(184,150,79,0.32)',
          boxShadow:
            'inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1.5px 0 rgba(184,150,79,0.14)',
        }}
      >
        {/* Gold band */}
        <div
          className="h-2 w-full"
          style={{ background: 'linear-gradient(90deg, #E8C97A, #C9A55A, #B8964F)' }}
        />

        <div className="p-6">
          {/* Header — company + invoice number */}
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A5E2A]"
                style={{ fontFamily: 'var(--font-jost), sans-serif' }}
              >
                From
              </p>
              <p
                className="font-display text-[17px] font-black text-[#1E0F00] mt-0.5"
                style={{ letterSpacing: '-0.02em' }}
              >
                XYZ Enterprises
              </p>
              <p
                className="text-[10px] font-semibold text-[#6B6B6B] mt-0.5"
                style={{ fontFamily: 'var(--font-jost), sans-serif' }}
              >
                GSTIN 09XXXXXX1A1Z2
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A5E2A]"
                style={{ fontFamily: 'var(--font-jost), sans-serif' }}
              >
                Invoice
              </p>
              <p
                className="text-sm font-extrabold text-[#1E0F00] mt-0.5"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', letterSpacing: '0.02em' }}
              >
                INV-2079
              </p>
              <p
                className="text-[10px] font-semibold text-[#6B6B6B] mt-0.5"
                style={{ fontFamily: 'var(--font-jost), sans-serif' }}
              >
                15 Mar 2026
              </p>
            </div>
          </div>

          {/* Bill to */}
          <div className="mt-5">
            <p
              className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A5E2A]"
              style={{ fontFamily: 'var(--font-jost), sans-serif' }}
            >
              Bill to
            </p>
            <p
              className="text-[13px] font-bold text-[#1E0F00] mt-0.5"
              style={{ fontFamily: 'var(--font-jost), sans-serif' }}
            >
              Sharma Textiles · Lucknow
            </p>
          </div>

          {/* Items */}
          <div className="mt-5">
            <div
              className="grid grid-cols-12 text-[9px] uppercase tracking-[0.14em] font-extrabold text-[#7A5E2A] pb-2"
              style={{
                borderBottom: '1px solid rgba(184,150,79,0.25)',
                fontFamily: 'var(--font-jost), sans-serif',
              }}
            >
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-4 text-right">Total</div>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(184,150,79,0.12)' }}>
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 py-2 text-[11.5px] text-[#1E0F00]"
                  style={{
                    fontFamily: 'var(--font-jost), sans-serif',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(184,150,79,0.12)',
                  }}
                >
                  <div className="col-span-6 font-semibold truncate">{item.name}</div>
                  <div className="col-span-2 text-right">{item.qty}</div>
                  <div className="col-span-4 text-right font-bold">{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtotal & GST */}
          <div className="mt-3 space-y-1">
            {[
              { l: 'Subtotal', v: '₹ 18,450' },
              { l: 'CGST 9%',  v: '₹ 1,661' },
              { l: 'SGST 9%',  v: '₹ 1,661' },
            ].map((r) => (
              <div
                key={r.l}
                className="flex justify-between text-[11px]"
                style={{ fontFamily: 'var(--font-jost), sans-serif', color: '#6B6B6B' }}
              >
                <span>{r.l}</span>
                <span className="font-semibold">{r.v}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className="mt-3 pt-3 flex items-end justify-between"
            style={{ borderTop: '1.5px solid rgba(184,150,79,0.35)' }}
          >
            <div>
              <p
                className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A5E2A]"
                style={{ fontFamily: 'var(--font-jost), sans-serif' }}
              >
                Total
              </p>
              <p
                className="font-display font-black gradient-text"
                style={{ fontSize: '28px', letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                ₹ 21,772
              </p>
            </div>
            <span
              className="inline-flex px-2.5 py-1 rounded-full text-[9.5px] font-extrabold uppercase"
              style={{
                background: 'rgba(4,120,87,0.12)',
                color: '#047857',
                letterSpacing: '0.14em',
                border: '1px solid rgba(4,120,87,0.25)',
                fontFamily: 'var(--font-jost), sans-serif',
              }}
            >
              Paid
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
