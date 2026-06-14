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
          color: '#F3EEE2',
          backgroundColor: '#07060C',
          backgroundImage:
            'radial-gradient(900px circle at 12% 0%, rgba(232,201,122,0.30), transparent 52%), radial-gradient(820px circle at 100% 8%, rgba(94,234,212,0.22), transparent 52%), radial-gradient(700px circle at 50% 120%, rgba(167,139,250,0.20), transparent 55%)',
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
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginTop: '54px',
            maxWidth: '1000px',
            backgroundImage: 'linear-gradient(110deg, #FFE9B0, #5EEAD4 55%, #E8C97A)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Invoices for Indian SMBs, reimagined.
        </div>

        <div style={{ display: 'flex', fontSize: '32px', color: '#9793A6', marginTop: '28px', maxWidth: '920px' }}>
          GST invoices, delivery challans & quotations on Android — offline-first, free to start.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '46px' }}>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #FFE9B0, #E8C97A, #C9A55A)',
              color: '#1A1205',
              fontSize: '26px',
              fontWeight: 800,
            }}
          >
            Free GST Billing
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1px solid rgba(94,234,212,0.5)',
              color: '#5EEAD4',
              fontSize: '26px',
              fontWeight: 700,
            }}
          >
            Made in India 🇮🇳
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
