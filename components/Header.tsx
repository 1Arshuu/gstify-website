'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/support',  label: 'Support' },
];

export const Header = () => {
  const pathname                = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={cn('sticky top-0 z-50 header-melt transition-shadow duration-300', scrolled && 'is-scrolled')}>
      <nav className="relative z-10 container mx-auto px-3 sm:px-6 max-w-6xl h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="logo-shine relative inline-flex w-9 h-9 rounded-xl overflow-hidden transition-transform group-hover:scale-105"
            style={{ boxShadow: '0 6px 18px rgba(184,150,79,0.40)' }}
          >
            <Image
              src="/logo.png"
              alt={`${BRAND.name} logo`}
              width={36}
              height={36}
              priority
              unoptimized
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
          <span className="font-display text-xl font-black text-dark-brown" style={{ letterSpacing: '-0.02em' }}>
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'nav-underline relative inline-flex items-center px-4 py-2 rounded-full text-sm font-bold transition-colors',
                    active ? 'text-dark-brown' : 'text-[#6B6B6B] hover:text-dark-brown',
                  )}
                  style={{ fontFamily: 'var(--font-jost), sans-serif' }}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, rgba(232,201,122,0.28), rgba(184,150,79,0.16))',
                        border: '1.5px solid rgba(184,150,79,0.40)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.85), 0 3px 10px -3px rgba(184,150,79,0.35)',
                        zIndex: 0,
                      }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href={BRAND.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 gold-button h-10 px-5 rounded-xl text-sm"
        >
          Get the App
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg hover:bg-gold/10 text-dark-brown"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="relative z-10 md:hidden border-t border-gold/15"
             style={{
               background: 'linear-gradient(180deg, rgba(255,252,245,0.96), rgba(251,248,242,0.94))',
               backdropFilter: 'blur(24px) saturate(180%)',
               WebkitBackdropFilter: 'blur(24px) saturate(180%)',
             }}>
          <ul className="container mx-auto px-3 max-w-6xl py-4 space-y-1">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-3 py-2.5 rounded-lg text-sm font-bold',
                      active
                        ? 'text-dark-brown'
                        : 'text-[#6B6B6B] hover:bg-gold/10 hover:text-dark-brown',
                    )}
                    style={{
                      fontFamily: 'var(--font-jost), sans-serif',
                      background: active
                        ? 'linear-gradient(180deg, rgba(232,201,122,0.28), rgba(184,150,79,0.16))'
                        : undefined,
                      border: active ? '1.5px solid rgba(184,150,79,0.40)' : '1.5px solid transparent',
                      boxShadow: active
                        ? 'inset 0 1px 0 rgba(255,255,255,0.85), 0 3px 10px -3px rgba(184,150,79,0.30)'
                        : undefined,
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href={BRAND.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="gold-button h-11 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                Get the App
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
