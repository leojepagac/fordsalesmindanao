'use client';

import React, { useEffect, useRef } from 'react';
import { CONSULTANT, getFormUrl } from './ConsultantConfig';

const promos = [
{
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>,

  label: 'Hot Deal',
  title: 'Cash Discount Up to ₱150,000',
  description: 'Save big on selected Ford models with our exclusive cash discount offers. Limited units available.',
  cta: 'Claim Discount',
  highlight: true
},
{
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>,

  label: 'Financing',
  title: 'Flexible Financing at 0% Interest',
  description: 'Drive home your dream Ford with zero interest financing available on select models. Up to 60 months.',
  cta: 'Check Eligibility',
  highlight: false
},
{
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>,

  label: 'Low Down',
  title: 'Low Down Payment — Start at 10%',
  description: 'Own a Ford with a down payment as low as 10%. Make your dream vehicle a reality today.',
  cta: 'Compute Now',
  highlight: false
},
{
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>,

  label: 'Free',
  title: 'Free Consultation & Test Drive',
  description: 'No obligations. Talk to your dedicated Ford consultant and test drive your preferred model for free.',
  cta: 'Book Now',
  highlight: false
},
{
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>,

  label: 'Limited Time',
  title: 'Limited-Time Year-End Offers',
  description: 'Year-end promotions with additional accessories package, extended warranty, and more. Act fast.',
  cta: 'View Offer',
  highlight: false
}];


export default function PromotionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.promo-reveal');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 80}ms`;
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="promotions" ref={sectionRef} className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Subtle background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0,52,120,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14">
          <span className="accent-line mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
            Current Promos
          </p>
          <h2 className="font-display font-bold text-[rgba(6,23,137,1)] text-[42px]">
            Exclusive Ford Promotions
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl">
            Limited-time offers designed to help you own your Ford sooner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {promos?.map((promo) =>
          <div
            key={promo?.title}
            className={`promo-reveal promo-card ${promo?.highlight ? 'border-primary/30 bg-primary' : ''}`}
            style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>

              {/* Label */}
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${promo?.highlight ? 'bg-accent text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
                {promo?.label}
              </span>

              {/* Icon */}
              <div className={`mb-4 ${promo?.highlight ? 'text-accent' : 'text-primary'}`}>
                {promo?.icon}
              </div>

              <h3 className={`font-display font-bold text-xl mb-2 leading-snug ${promo?.highlight ? 'text-white' : 'text-foreground'}`}>
                {promo?.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-5 ${promo?.highlight ? 'text-white/75' : 'text-muted-foreground'}`}>
                {promo?.description}
              </p>

              <a
              href={getFormUrl(CONSULTANT, 'quotation')}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors min-h-[44px] ${promo?.highlight ? 'text-accent hover:text-white' : 'text-primary hover:text-primary/70'}`}
              aria-label={promo?.cta}>

                {promo?.cta}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>);

}