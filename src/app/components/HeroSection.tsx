'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CONSULTANT, getFormUrl } from './ConsultantConfig';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headlineRef?.current, subRef?.current, ctaRef?.current, badgeRef?.current];
    els?.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = `opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms, transform 0.75s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, []);

  const quotationUrl = getFormUrl(CONSULTANT, 'quotation');
  const testDriveUrl = getFormUrl(CONSULTANT, 'test-drive');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero">
      
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1691807927049-b7fc0d69e4f0"
          alt="Dark blue Ford truck driving on a wide open highway at dusk, dramatic low-key lighting, moody atmospheric sky"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />
        
        {/* Cinematic gradient scrim — dark left, fade right */}
        <div className="absolute inset-0 gradient-hero-scrim" />
      </div>
      {/* Content — bottom-left aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-36">
        {/* Badge */}
        <div ref={badgeRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-white tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
            Philippines&apos; Trusted Ford Dealer Network
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-hero-xl font-display font-bold text-white max-w-3xl leading-tight mb-5">
          
          Find Your Next
          <br />
          <span className="text-white">Ford Today</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
          
          Get the Best Ford Deals, Flexible Financing Options, and Professional
          Assistance from Your Trusted Ford Sales Consultant.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a
            href={quotationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-base"
            aria-label="Get Free Quotation">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
            Get Free Quotation
          </a>
          <a
            href={testDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white text-base"
            aria-label="Book A Test Drive">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Book A Test Drive
          </a>
        </div>

        {/* Floating trust badge */}
        <div className="mt-12 animate-float-badge inline-block">
          <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3 bg-white">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent">
              <AppImage
                src={CONSULTANT?.photo}
                alt={`${CONSULTANT?.name}, Ford Sales Consultant`}
                width={40}
                height={40}
                className="w-full h-full object-cover" />
              
            </div>
            <div>
              <p suppressHydrationWarning className="text-white font-semibold text-sm leading-tight">{CONSULTANT?.name}</p>
              <p suppressHydrationWarning className="text-accent text-xs font-medium">Ford Sales Consultant</p>
            </div>
            <div className="w-px h-8 bg-white/20 mx-1" />
            <div className="text-right">
              <p suppressHydrationWarning className="text-white/60 text-xs">Your Consultant</p>
              <p suppressHydrationWarning className="text-white font-semibold text-sm">{CONSULTANT?.mobile}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>);

}