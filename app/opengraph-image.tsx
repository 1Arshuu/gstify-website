import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BRAND } from '@/lib/brand';

// Applies site-wide (Next uses this file for og:image on every route).
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          color: '#1E0F00',
          backgroundColor: '#FBF8F2',
          backgroundImage:
            'radial-gradient(900px circle at 12% 0%, rgba(232,201,122,0.55), transparent 55%), radial-gradient(800px circle at 100% 100%, rgba(184,150,79,0.40), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={104} height={104} style={{ borderRadius: '24px' }} alt="" />
          <span style={{ fontSize: '60px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {BRAND.name}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '70px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginTop: '54px',
            maxWidth: '980px',
          }}
        >
          Invoices for Indian SMBs, finally beautiful.
        </div>

        <div style={{ display: 'flex', fontSize: '32px', color: '#6B6B6B', marginTop: '28px', maxWidth: '900px' }}>
          GST invoices, delivery challans & quotations on Android — offline-first, free to start.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '46px' }}>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #E8C97A, #C9A55A, #B8964F)',
              color: '#1E0F00',
              fontSize: '26px',
              fontWeight: 800,
            }}
          >
            Free GST Billing
          </div>
          <span style={{ fontSize: '26px', color: '#7A5E2A', fontWeight: 700 }}>· Made in India 🇮🇳</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
