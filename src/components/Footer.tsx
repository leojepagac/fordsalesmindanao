import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { CONSULTANT, getFormUrl } from '@/app/components/ConsultantConfig';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5 py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Arc pattern: logo+tagline left, links right */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Left — Brand + consultant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <AppLogo size={32} />
              <div>
                <span className="font-display font-bold text-lg text-white tracking-wide block leading-none">
                  Ford
                </span>
                <span className="text-accent text-xs font-bold uppercase tracking-widest">
                  {CONSULTANT?.name?.split(' ')?.[0]}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Your trusted Ford Sales Consultant in the Philippines. Professional guidance for every car purchase.
            </p>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href={`tel:${CONSULTANT?.mobile?.replace(/\s/g, '')}`} className="hover:text-accent transition-colors font-medium">
                {CONSULTANT?.mobile}
              </a>
            </div>
          </div>

          {/* Right — Quick links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="space-y-3">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Quick Links</p>
              {[
                { label: 'View Vehicles', href: '#vehicles' },
                { label: 'Why Ford', href: '#why-ford' },
                { label: 'Promotions', href: '#promotions' },
                { label: 'Meet Consultant', href: '#consultant' },
              ]?.map((link) => (
                <a
                  key={link?.label}
                  href={link?.href}
                  className="block text-muted-foreground hover:text-accent transition-colors text-sm font-medium min-h-[44px] flex items-center"
                >
                  {link?.label}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Actions</p>
              <a
                href={getFormUrl(CONSULTANT, 'quotation')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent transition-colors text-sm font-medium min-h-[44px] flex items-center"
              >
                Get Free Quotation
              </a>
              <a
                href={getFormUrl(CONSULTANT, 'test-drive')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent transition-colors text-sm font-medium min-h-[44px] flex items-center"
              >
                Book Test Drive
              </a>
              <a
                href={CONSULTANT?.messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent transition-colors text-sm font-medium min-h-[44px] flex items-center"
              >
                Message on Messenger
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 {CONSULTANT?.name} · Ford Sales Consultant · Philippines
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium">
                Terms
              </a>
            </div>
          </div>
          <p className="text-muted-foreground/50 text-xs mt-3 leading-relaxed max-w-2xl">
            Disclaimer: This page is managed by an independent Ford Sales Consultant. Vehicle prices, promotions, and availability are subject to change without prior notice. All transactions are subject to Ford Philippines dealership terms and conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}