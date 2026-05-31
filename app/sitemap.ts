import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

// Fixed date (not `new Date()`) — Cache Components disallows reading the current
// time during prerender, and a static lastModified is fine for a marketing site.
const LAST_MODIFIED = new Date('2026-05-31');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/',               priority: 1.0, changeFrequency: 'weekly' },
    { path: '/features',       priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing',        priority: 0.9, changeFrequency: 'monthly' },
    { path: '/support',        priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms',          priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${BRAND.url}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
