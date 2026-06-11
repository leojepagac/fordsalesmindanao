'use client';

import React, { useEffect, useRef } from 'react';

const features = [
{
  title: 'Flexible Financing Options',
  description: 'Tailored payment plans to fit your monthly budget and lifestyle.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>

},
{
  title: 'Low Down Payment Programs',
  description: 'Drive your Ford home with as low as 10% down payment.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>

},
{
  title: 'Trade-In Assistance',
  description: 'Get the best value for your current vehicle with our trade-in program.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>

},
{
  title: 'Fast Approval Support',
  description: 'Bank and in-house financing with quick turnaround approvals.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>

},
{
  title: 'Nationwide Assistance',
  description: 'Ford dealerships across the Philippines for support wherever you are.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

},
{
  title: 'Genuine Ford Quality',
  description: 'Every vehicle backed by Ford\'s global heritage and warranty standards.',
  icon:
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>

}];


export default function WhyFordSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll<HTMLElement>('.feature-reveal');
            items.forEach((item, i) => {
              item.style.transitionDelay = `${i * 70}ms`;
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
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
    <section id="why-ford" ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <span className="accent-line mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
            Why Ford
          </p>
          <h2 className="font-display font-bold text-[42px] text-[rgba(6,23,137,1)]">
            Why Choose Ford?
          </h2>
          <p className="text-muted-foreground text-lg mt-3">
            Beyond the vehicle — we offer a complete ownership experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature) =>
          <div
            key={feature?.title}
            className="feature-item feature-reveal flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}>

              <div className="feature-icon-wrap text-primary flex-shrink-0">
                {feature?.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base mb-1.5 leading-snug">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}