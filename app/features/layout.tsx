import type { Metadata } from 'next';

// Server layout exists purely to attach metadata to the (client) features page.
export const metadata: Metadata = {
  title: 'Features',
  description:
    'Everything GSTify does: six GST document types (Tax Invoice, E-Way Bill, Delivery Challan, Proforma, Quotation, POS), per-line GST rates, 5 PDF templates, offline-first billing, smart payment allocation, and Google Drive backup.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Features · GSTify',
    description:
      'Six GST document types, per-line GST, 5 PDF templates, offline-first billing and Drive backup — all on Android.',
    url: '/features',
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
