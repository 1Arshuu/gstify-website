import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // ── Advanced caching ──────────────────────────────────────────────────────
  // Cache Components (Next 16) turns on Partial Prerendering: every page here is
  // fully static, so each is prerendered into a static shell at build time and
  // served instantly from the CDN. Unlocks the `use cache` directive + cacheLife
  // for any future dynamic/data sections.
  cacheComponents: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  allowedDevOrigins: ['172.16.2.34', 'localhost'],

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      // Static media + fonts. (Next already serves /_next/static immutably.)
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // HTML pages: let the CDN serve instantly and revalidate in the background.
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
