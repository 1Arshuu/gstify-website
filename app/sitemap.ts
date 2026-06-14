import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { posts } from '@/lib/blog';

// Fixed date (not `new Date()`) — Cache Components disallows reading the current
// time during prerender, and a static lastModified is fine for a marketing site.
const LAST_MODIFIED = new Date('2026-05-31');

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date };

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Entry[] = [
    { path: '/',               priority: 1.0, changeFrequency: 'weekly' },
    { path: '/features',       priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing',        priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blog',           priority: 0.8, changeFrequency: 'weekly' },
    { path: '/support',        priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms',          priority: 0.3, changeFrequency: 'yearly' },
  ];

  // One entry per blog post (uses the post's own date for lastModified).
  const blog: Entry[] = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(p.date),
  }));

  return [...routes, ...blog].map((r) => ({
    url: `${BRAND.url}${r.path}`,
    lastModified: r.lastModified ?? LAST_MODIFIED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
