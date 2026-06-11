'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { CONSULTANT, getFormUrl } from '@/app/components/ConsultantConfig';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Vehicles', href: '#vehicles' },
  { label: 'Why Ford', href: '#why-ford' },
  { label: 'Promotions', href: '#promotions' },
  { label: 'Consultant', href: '#consultant' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const quotationUrl = getFormUrl(CONSULTANT, 'quotation');

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled ? 'glass-nav shadow-xl' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group" aria-label="FordLeadPage Home">
            <AppLogo size={92} className="flex-shrink-0" />
            <div className="leading-none">
              <span className="text-white text-xs font-bold tracking-widest">
  {CONSULTANT?.name?.split(' ')?.[0]}
</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="text-sm font-semibold text-white/80 hover:text-accent transition-colors duration-200 tracking-wide"
              >
                {link?.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={quotationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-accent text-sm py-2.5 px-5"
            aria-label="Get Free Quotation"
          >
            Get Free Quote
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            className="flex flex-col gap-1 pb-4 border-t border-white/10 pt-4"
            aria-label="Mobile navigation"
          >
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                onClick={handleLinkClick}
                className="text-white/85 hover:text-accent font-semibold text-base py-3 px-2 transition-colors min-h-[44px] flex items-center"
              >
                {link?.label}
              </a>
            ))}
            <a
              href={quotationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="btn-accent mt-2 text-sm"
              aria-label="Get Free Quotation"
            >
              Get Free Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}