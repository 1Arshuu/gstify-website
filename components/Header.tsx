'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, LayoutGrid, IndianRupee, LifeBuoy } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

const links = [
  { href: '/',         label: 'Home',     icon: Home },
  { href: '/features', label: 'Features', icon: LayoutGrid },
  { href: '/pricing',  label: 'Pricing',  icon: IndianRupee },
  { href: '/support',  label: 'Support',  icon: LifeBuoy },
];

export const Header = () => {
  const pathname                = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const lastY                   = useRef(0);
  const hoveringTop             = useRef(false);

  // Reveal-on-hover header: it slides away as you scroll down and reappears
  // when you scroll up OR move the cursor near the top edge of the screen.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Always show near the very top or while the cursor is hovering the top.
      if (hoveringTop.current || y < 80) { setHidden(false); lastY.current = y; return; }
      if (y > lastY.current + 4)      setHidden(true);   // scrolling down → hide
      else if (y < lastY.current - 4) setHidden(false);  // scrolling up → reveal
      lastY.current = y;
    };
    const onMove = (e: MouseEvent) => {
      const near = e.clientY <= 80;
      hoveringTop.current = near;
      if (near) setHidden(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // Never hide while the mobile menu is open.
  const isHidden = hidden && !open;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
    {/* Thin gold hover-hint strip — sits at the very top so users discover that
        moving to the top reveals the menu. Only shows while the bar is hidden. */}
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[99999998] pointer-events-none transition-opacity duration-300"
      style={{
        height: 3,
        opacity: isHidden ? 1 : 0,
        background: 'linear-gradient(90deg, transparent, rgba(168,126,30,0.55), rgba(215,176,95,0.9), rgba(168,126,30,0.55), transparent)',
      }}
    />
    <header
      className={cn('sticky top-0 z-[99999999] header-melt', scrolled && 'is-scrolled')}
      style={{
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        willChange: 'transform',
      }}
    >
      <nav className="relative z-10 container mx-auto px-3 sm:px-6 max-w-6xl h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="logo-shine relative inline-flex w-9 h-9 rounded-xl overflow-hidden transition-transform group-hover:scale-105"
            style={{ boxShadow: '0 6px 18px rgba(168,126,30,0.40)' }}
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

        {/* Desktop nav — icon expands on hover to reveal the page name beside it */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            const Icon = l.icon;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-label={l.label}
                  className={cn(
                    'group relative inline-flex items-center h-10 px-2.5 rounded-xl transition-all duration-300',
                    active ? 'text-gold' : 'text-[#9793A6] hover:text-gold hover:bg-white/[0.05]',
                  )}
                  style={active ? {
                    background: 'linear-gradient(180deg, rgba(232,201,122,0.18), rgba(94,234,212,0.08))',
                    border: '1px solid rgba(232,201,122,0.35)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 16px -6px rgba(232,201,122,0.6)',
                  } : undefined}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.3} />
                  <span
                    className={cn(
                      'overflow-hidden whitespace-nowrap font-bold text-[13px] transition-all duration-300 ease-out',
                      active
                        ? 'max-w-[140px] opacity-100 ml-2'
                        : 'max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2',
                    )}
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {l.label}
                  </span>
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
          className="hidden md:inline-flex items-center gap-1.5 gold-button lux-cta h-10 px-5 rounded-xl text-sm"
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
               background: 'linear-gradient(180deg, rgba(10,9,16,0.96), rgba(8,7,13,0.94))',
               backdropFilter: 'blur(24px) saturate(180%)',
               WebkitBackdropFilter: 'blur(24px) saturate(180%)',
             }}>
          <ul className="container mx-auto px-3 max-w-6xl py-4 space-y-1">
            {links.map((l) => {
              const active = isActive(l.href);
              const Icon = l.icon;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold',
                      active
                        ? 'text-dark-brown'
                        : 'text-[#9793A6] hover:bg-gold/10 hover:text-dark-brown',
                    )}
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      background: active
                        ? 'linear-gradient(180deg, rgba(215,176,95,0.28), rgba(168,126,30,0.16))'
                        : undefined,
                      border: active ? '1.5px solid rgba(168,126,30,0.40)' : '1.5px solid transparent',
                      boxShadow: active
                        ? 'inset 0 1px 0 rgba(255,255,255,0.85), 0 3px 10px -3px rgba(168,126,30,0.30)'
                        : undefined,
                    }}
                  >
                    <Icon className={cn('h-4 w-4', active ? 'text-gold' : '')} strokeWidth={2.2} />
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
    </>
  );
};
