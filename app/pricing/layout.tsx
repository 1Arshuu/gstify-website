import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'GSTify pricing — start free with 50 invoices/month, no credit card required. Upgrade to Pro (₹199/mo) or Business (₹399/mo) when you grow. Billed securely through Google Play, cancel anytime.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · GSTify',
    description:
      'Free for the first 50 invoices a month. Pro from ₹199/mo. No card to start, cancel anytime.',
    url: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
