import type { Metadata } from 'next';

// Server layout exists purely to attach metadata to the (client) features page.
export const metadata: Metadata = {
  title: 'Features',
  description:
    'Everything GSTify does: five GST document types (Tax Invoice, Delivery Challan, Proforma, Quotation, POS), per-line GST rates, GST Ledger, GSTR-1/2/3B/9 filing exports, 5 PDF templates, offline-first billing, smart payment allocation, and Google Drive backup.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Features · GSTify',
    description:
      'Five GST document types, per-line GST, 5 PDF templates, offline-first billing and Drive backup — all on Android.',
    url: '/features',
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
