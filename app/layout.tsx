import type { Metadata, Viewport } from 'next';
import { Jost, Poppins, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BRAND } from '@/lib/brand';

// Defer the 640-line WebGL fluid simulation past initial hydration so it
// doesn't block the critical JS path. Desktop/fine-pointer only anyway.
const SplashCursor = dynamic(() => import('@/components/SplashCursor'), { ssr: false });

// Display / headings — geometric sans (matches the app's heading font)
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight:   ['400', '500', '600', '700', '800'],
  style:    ['normal', 'italic'],
  display:  'swap',
});

// Body / UI — rounded humanist sans. 4 weights only (light + extrabold not used).
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight:   ['400', '500', '600', '700'],
  style:    ['normal'],
  display:  'swap',
});

// Mono used rarely (code snippets only) — optional so it never blocks rendering.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display:  'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default:  'GSTify — Free GST Billing & Invoice App for India',
    template: `%s · ${BRAND.name}`,
  },
  description:
    'GSTify is a free GST billing and invoicing app for Indian small businesses. Create GST invoices, ' +
    'delivery challans, proforma, quotations and POS bills, track customer payments, and back up to ' +
    'Google Drive — offline-first, on Android.',
  keywords: [
    'GST billing app',
    'GST invoice app',
    'free GST billing software',
    'GST invoice generator India',
    'invoice maker app',
    'billing app for small business',
    'POS billing app',
    'delivery challan app',
    'quotation maker',
    'GST software for small business',
    'invoice app India',
    'mobile billing app',
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'business',
  applicationName: BRAND.name,
  alternates: { canonical: '/' },
  // OG/Twitter images come from app/opengraph-image.tsx (generated at build).
  openGraph: {
    title:       'GSTify — Free GST Billing & Invoice App for India',
    description: 'Create GST invoices, challans, quotations & POS bills on Android. Track payments, back up to Drive, work offline. Free for Indian SMBs.',
    url:         BRAND.url,
    siteName:    BRAND.name,
    locale:      'en_IN',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'GSTify — Free GST Billing & Invoice App for India',
    description: 'GST invoices, challans, quotations & POS bills on Android. Offline-first, free to start. Built for Indian SMBs.',
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
        'Free GST billing and invoicing app for Indian SMBs. Create GST invoices, delivery challans, ' +
        'proforma, quotations and POS bills, track payments, and back up to Google Drive — offline-first.',
      url: BRAND.url,
      downloadUrl: BRAND.playStoreUrl,
      installUrl: BRAND.playStoreUrl,
      publisher: { '@id': `${BRAND.url}/#organization` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BRAND.url}/#faq`,
      mainEntity: [
        { q: 'Is GSTify really free?', a: 'Yes. The Free plan gives you 50 GST invoices a month, 50 customers and 30 products with no credit card and no trial countdown. Upgrade to Pro (₹199/month) only when you outgrow it.' },
        { q: 'Does GSTify work offline?', a: 'Yes. You can create invoices, add customers and record payments with no internet. Everything syncs automatically the moment you reconnect.' },
        { q: 'How does backup work?', a: 'Connect Google Drive once and GSTify stores backup snapshots in your own Drive appData folder, which only GSTify can read. Restore on any device in one tap.' },
        { q: 'Which documents can GSTify create?', a: 'Tax Invoice, Delivery Challan, Proforma, Quotation and POS Cash Memo — all GST-compliant, with five PDF templates.' },
        { q: 'Can I cancel anytime?', a: 'Yes. Pro and Business are billed through Google Play, so you can cancel from your Google Play subscriptions whenever you like.' },
        { q: 'Is my data secure?', a: 'Your data is encrypted in transit and at rest, backups go to your own Google Drive, and we never see your invoice contents.' },
      ].map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning
          className={`${jost.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* WebGL gold "splash" fluid that trails the cursor. Sits at z-0 behind
            the content so it glows through the translucent section surfaces and
            fills the hero; desktop/fine-pointer only, off under reduced motion. */}
        <SplashCursor />
        {/* Ivory Gold signature: drifting gold-dust field behind everything.
            Content sits in the z-1 .gm-content wrapper; section surfaces are
            slightly translucent so the dust shimmers through. */}
        <div className="gm-galaxy" aria-hidden />
        <div className="gm-content flex min-h-screen flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
