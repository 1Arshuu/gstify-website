import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Download } from 'lucide-react';
import { getPost, allSlugs } from '@/lib/blog';
import { BRAND } from '@/lib/brand';
import { Section } from '@/components/Section';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${BRAND.url}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'en-IN',
        mainEntityOfPage: url,
        image: `${BRAND.url}/opengraph-image`,
        author: { '@type': 'Organization', name: BRAND.name, url: BRAND.url },
        publisher: { '@type': 'Organization', name: BRAND.name, logo: { '@type': 'ImageObject', url: `${BRAND.url}/icon-512.png` } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BRAND.url}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <Section tone="base" containerClassName="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-soft mb-8">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.4} /> All articles
      </Link>

      <span className="chip-teal">{post.tag}</span>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-dark-brown mt-5" style={{ letterSpacing: '-0.02em', lineHeight: 1.08 }}>
        {post.title}
      </h1>

      <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold" style={{ color: '#9793A6' }}>
        <Clock className="h-3.5 w-3.5" /> {post.readingMins} min read · {post.dateLabel}
      </p>

      <article className="legal-prose mt-8">
        {post.body.map((b, i) => {
          if (b.h) return <h2 key={i}>{b.h}</h2>;
          if (b.ul) return <ul key={i}>{b.ul.map((li, j) => <li key={j}>{li}</li>)}</ul>;
          return <p key={i}>{b.p}</p>;
        })}
      </article>

      {/* Inline CTA */}
      <div className="mt-12 app-card rounded-3xl p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h3 className="font-display text-xl font-extrabold text-dark-brown" style={{ letterSpacing: '-0.01em' }}>
            Bill in seconds with {BRAND.name}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: '#9793A6' }}>
            Free GST invoices, challans, quotations and POS bills on Android — offline, no card.
          </p>
        </div>
        <a
          href={BRAND.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button rounded-xl px-6 inline-flex items-center justify-center gap-2 text-[14px] whitespace-nowrap"
          style={{ height: '50px' }}
        >
          <Download className="h-4 w-4" strokeWidth={2.8} /> Download Free
        </a>
      </div>
    </Section>
  );
}
