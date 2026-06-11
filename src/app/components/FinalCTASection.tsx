'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CONSULTANT, getFormUrl } from './ConsultantConfig';

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll<HTMLElement>('.cta-reveal');
            els.forEach((el, i) => {
              el.style.transitionDelay = `${i * 120}ms`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1ce387ae0-1767870992898.png"
          alt="Ford vehicles parked at a modern dealership at night, dramatic exterior lighting, dark atmosphere, deep shadows"
          fill
          className="object-cover object-center"
          sizes="100vw" />
        
        {/* Dark overlay — dark text needs light bg, but we have dark overlay so text is white */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.75)' }} />
        {/* Blue tint overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,52,120,0.45)' }} />
      </div>
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <div
          className="cta-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-accent/40 bg-accent/10"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-accent text-sm font-bold uppercase tracking-widest">
            Limited Slots Available
          </span>
        </div>

        <h2
          className="cta-reveal text-section-xl font-display font-bold text-white leading-tight mb-5"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          
          Ready to Own or Test Drive
          <br />
          <span className="text-accent">Your Ford?</span>
        </h2>

        <p
          className="cta-reveal text-white/75 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          
          Request a free quotation or schedule your test drive today.
          {CONSULTANT?.name} is ready to assist you personally.
        </p>

        <div
          className="cta-reveal flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          
          <a
            href={getFormUrl(CONSULTANT, 'quotation')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-base"
            aria-label="Get Free Quotation">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            GET FREE QUOTATION
          </a>
          <a
            href={getFormUrl(CONSULTANT, 'test-drive')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white text-base"
            aria-label="Book A Test Drive">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            BOOK A TEST DRIVE
          </a>
        </div>

        {/* Consultant mini card */}
        <div
          className="cta-reveal mt-12 inline-flex items-center gap-4 glass-card rounded-2xl px-6 py-4"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
            <AppImage
              src={CONSULTANT?.photo}
              alt={`${CONSULTANT?.name} Ford Sales Consultant`}
              width={48}
              height={48}
              className="w-full h-full object-cover" />
            
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-sm">{CONSULTANT?.name}</p>
            <p className="text-accent text-xs">Ford Sales Consultant</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <a
            href={`tel:${CONSULTANT?.mobile?.replace(/\s/g, '')}`}
            className="text-white hover:text-accent transition-colors font-semibold text-sm min-h-[44px] flex items-center"
            aria-label={`Call ${CONSULTANT?.name}`}>
            
            {CONSULTANT?.mobile}
          </a>
        </div>
      </div>
    </section>);

}