import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with GSTify, the GST billing app for Indian SMBs. Contact support, find answers to common questions, and learn how to create invoices, e-way bills, and quotations on Android.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Support · GSTify',
    description: 'Help, FAQs and contact for GSTify — GST billing for Indian small businesses.',
    url: '/support',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
