import type { Metadata, Viewport } from 'next';
import { Jost, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';
import { BRAND } from '@/lib/brand';

// Body / UI — geometric sans
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight:   ['400', '500', '600', '700', '800'],
  display:  'swap',
});

// Display / headings — elegant serif (roman + italic)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  display:  'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display:  'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default:  `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    'Create GST invoices, e-way bills, delivery challans and quotations in seconds. ' +
    'Track payments, auto-backup to Google Drive, works offline. Built for Indian SMBs.',
  keywords: [
    'GST billing app',
    'GST invoice generator',
    'India GST',
    'small business billing',
    'invoice app India',
    'e-way bill app',
    'delivery challan',
    'GSTR',
    'free GST app',
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'business',
  applicationName: BRAND.name,
  alternates: { canonical: '/' },
  // OG/Twitter images come from app/opengraph-image.tsx (generated at build).
  openGraph: {
    title:       `${BRAND.name} — ${BRAND.tagline}`,
    description: 'GST invoices in 5 seconds. Right from your phone. Offline-first. Built for Indian SMBs.',
    url:         BRAND.url,
    siteName:    BRAND.name,
    locale:      'en_IN',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${BRAND.name} — ${BRAND.tagline}`,
    description: 'GST invoices in 5 seconds. Offline-first. Built for Indian SMBs.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Icons come from app/icon.png + app/apple-icon.png + app/favicon.ico (file conventions).
  manifest: '/site.webmanifest',
};
export const viewport: Viewport = {
  themeColor: BRAND.colors.gold,
  width: 'device-width',
  initialScale: 1,
};


// Structured data (rich results): the publisher, the site, and the app itself.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BRAND.url}/#organization`,
      name: BRAND.name,
      url: BRAND.url,
      logo: `${BRAND.url}/icon-512.png`,
      email: BRAND.email,
      sameAs: [BRAND.playStoreUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${BRAND.url}/#website`,
      url: BRAND.url,
      name: BRAND.name,
      description: `${BRAND.tagline}. Built for Indian SMBs.`,
      publisher: { '@id': `${BRAND.url}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${BRAND.url}/#app`,
      name: BRAND.name,
      operatingSystem: 'Android',
      applicationCategory: 'BusinessApplication',
      description:
        'Create GST invoices, e-way bills, delivery challans and quotations in seconds. ' +
        'Track payments, auto-backup to Google Drive, works offline.',
      url: BRAND.url,
      downloadUrl: BRAND.playStoreUrl,
      installUrl: BRAND.playStoreUrl,
      publisher: { '@id': `${BRAND.url}/#organization` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning
          className={`${jost.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Cursor-following gold glow — site-wide, self-disables on touch */}
        <CursorGlow />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
