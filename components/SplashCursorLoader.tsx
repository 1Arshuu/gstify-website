'use client';
import dynamic from 'next/dynamic';

// `ssr: false` is only legal inside a Client Component.
// This wrapper lets us import it from the Server Component layout.
const SplashCursor = dynamic(() => import('@/components/SplashCursor'), { ssr: false });

export default function SplashCursorLoader() {
  return <SplashCursor />;
}
