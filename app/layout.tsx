import type { Metadata, Viewport } from 'next';
import { Jost, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
  openGraph: {
    title:       `${BRAND.name} — ${BRAND.tagline}`,
    description: 'GST invoices in 5 seconds. Right from your phone. Offline-first. Built for Indian SMBs.',
    url:         BRAND.url,
    siteName:    BRAND.name,
    locale:      'en_IN',
    type:        'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${BRAND.name} — ${BRAND.tagline}`,
    description: 'GST invoices in 5 seconds. Offline-first. Built for Indian SMBs.',
    images:      ['/og.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon:        '/favicon.ico',
    shortcut:    '/favicon.ico',
    apple:       '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
export const viewport: Viewport = {
  themeColor: BRAND.colors.gold,
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning
          className={`${jost.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
