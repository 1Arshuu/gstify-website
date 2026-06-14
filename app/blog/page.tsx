import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { posts } from '@/lib/blog';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Blog — GST Billing Tips & Guides for Indian SMBs',
  description:
    'Practical guides on GST invoicing, delivery challans, billing and compliance for Indian small businesses — how to create GST invoices, choose a billing app, and stay compliant.',
  keywords: [
    'GST billing blog', 'GST invoice guide', 'how to create GST invoice',
    'GST tips for small business', 'delivery challan vs invoice', 'GST invoice format',
    'free GST billing app', 'billing tips India',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'GSTify Blog — GST Billing Tips & Guides',
    description: 'Guides on GST invoicing, challans and compliance for Indian SMBs.',
    url: '/blog',
  },
};

export default function Blog() {
  return (
    <Section tone="base" grid glow="teal">
      <SectionHeading
        eyebrow="Blog"
        title={<>GST billing, <span className="gradient-text glow-text italic">made simple.</span></>}
        body="Practical guides on GST invoicing, delivery challans and compliance — written for Indian small businesses."
      />

      <div className="mt-14 sm:mt-16 grid md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="app-card app-card-hover rounded-3xl p-7 flex flex-col group"
          >
            <span className="chip-teal self-start mb-4">{post.tag}</span>
            <h2 className="font-display text-xl lg:text-2xl font-extrabold text-dark-brown" style={{ letterSpacing: '-0.01em' }}>
              {post.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed flex-1" style={{ color: '#9793A6' }}>
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between text-xs" style={{ color: '#9793A6' }}>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingMins} min read · {post.dateLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-gold font-bold transition-all group-hover:gap-2">
                Read <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
