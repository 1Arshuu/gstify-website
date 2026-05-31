import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  allowedDevOrigins: ['172.16.2.34', 'localhost'],

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
