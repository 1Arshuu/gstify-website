'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

export const Footer = () => {
  // Read the year on the client only — calling new Date() during prerender is
  // disallowed under Cache Components (it would make the static shell dynamic).
  // The default matches the build year, so there's no visible change on mount.
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  /**
   * Footer link with the same active-page awareness as the header — but since
   * a gold pill looks out of place down here, the active page just gets
   * text-dark-brown + a small gold underline accent (.footer-link.is-active).
   */
  const FootLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'footer-link inline-block text-sm hover:text-gold',
          active ? 'is-active text-dark-brown font-bold' : 'text-[#6B6B6B]',
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <footer className="border-t border-gold/15 bg-gradient-to-b from-cream to-cream-warm">
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex w-8 h-8 rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt={`${BRAND.name} logo`}
                  width={32}
                  height={32}
                  unoptimized
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </span>
              <span className="font-display text-lg font-black text-dark-brown tracking-tight">
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-3 text-sm text-gold-dim max-w-xs leading-relaxed">
              {BRAND.tagline}. Built in India, for Indian businesses.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-soft"
            >
              <Mail className="h-3.5 w-3.5" /> {BRAND.email}
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-3">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li><FootLink href="/features">Features</FootLink></li>
              <li><FootLink href="/pricing">Pricing</FootLink></li>
              <li>
                <a
                  href={BRAND.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-block text-sm text-[#6B6B6B] hover:text-gold"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + Support */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gold-dim mb-3">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li><FootLink href="/support">Support</FootLink></li>
              <li><FootLink href="/privacy-policy">Privacy Policy</FootLink></li>
              <li><FootLink href="/terms">Terms of Service</FootLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/15 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs text-gold-dim">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-gold-dim">
            Made with care in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};
