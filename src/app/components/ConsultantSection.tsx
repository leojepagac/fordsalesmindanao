'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CONSULTANT } from './ConsultantConfig';

export default function ConsultantSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll<HTMLElement>('.consultant-reveal');
            els.forEach((el, i) => {
              el.style.transitionDelay = `${i * 100}ms`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="consultant" ref={sectionRef} className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Photo */}
          <div
            className="consultant-reveal relative"
            style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
          >
            {/* Gold accent offset box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded-2xl pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-2xl">
              <AppImage
                src={CONSULTANT?.photo}
                alt={`${CONSULTANT?.name}, Ford Sales Consultant Philippines, professional headshot`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Name plate */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">
                  Your Ford Consultant
                </p>
                <h3 className="text-white font-display font-bold text-2xl leading-tight">
                  {CONSULTANT?.name}
                </h3>
                <p className="text-white/70 text-sm mt-0.5">Ford Sales Consultant</p>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="space-y-8">
            <div
              className="consultant-reveal"
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
            >
              <span className="accent-line mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
                Meet Your Consultant
              </p>
              <h2 className="text-section-xl font-display font-bold text-white leading-tight">
                Your Trusted Ford Specialist
              </h2>
            </div>

            <div
              className="consultant-reveal"
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
            >
              <p className="text-white/75 text-lg leading-relaxed">
                Helping customers find the perfect Ford vehicle with professional guidance,
                financing assistance, and test drive scheduling.
              </p>
              <p className="text-white/60 text-base leading-relaxed mt-4">
                With years of experience in the Ford dealership network, {CONSULTANT?.name} is
                dedicated to making your car-buying journey smooth, transparent, and rewarding.
                From your first inquiry to driving your new Ford home.
              </p>
            </div>

            {/* Stats */}
            <div
              className="consultant-reveal grid grid-cols-3 gap-4"
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
            >
              {[
                { value: '200+', label: 'Vehicles Sold' },
                { value: '5★', label: 'Customer Rating' },
                { value: '7 yrs', label: 'Experience' },
              ]?.map((stat) => (
                <div key={stat?.label} className="glass-card rounded-xl p-4 text-center">
                  <p className="text-accent font-display font-bold text-2xl">{stat?.value}</p>
                  <p className="text-white/60 text-xs mt-1">{stat?.label}</p>
                </div>
              ))}
            </div>

            {/* Contact buttons */}
            <div
              className="consultant-reveal"
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                Contact {CONSULTANT?.name?.split(' ')?.[0]} Directly
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${CONSULTANT?.mobile?.replace(/\s/g, '')}`}
                  className="contact-btn contact-btn-call"
                  aria-label={`Call ${CONSULTANT?.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href={CONSULTANT?.messengerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn contact-btn-messenger"
                  aria-label={`Message ${CONSULTANT?.name} on Messenger`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.558 3.75 7.28V22l3.42-1.875c.914.253 1.883.39 2.83.39 5.523 0 10-4.144 10-9.272S17.523 2 12 2zm1.03 12.49l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.93-2.72-5.49 5.82z" />
                  </svg>
                  Messenger
                </a>
                <a
                  href={CONSULTANT?.viberLink}
                  className="contact-btn contact-btn-viber"
                  aria-label={`Contact ${CONSULTANT?.name} on Viber`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.54 3.46A17.2 17.2 0 0 0 12.01 1C5.88 1 .96 5.92.96 12.05c0 2.04.53 4.03 1.55 5.79L1 23l5.28-1.49A11.1 11.1 0 0 0 12 22.96c6.13 0 11.05-4.92 11.05-11.05 0-2.95-1.15-5.73-3.51-7.45zm-8.53 17c-1.63 0-3.23-.44-4.63-1.27l-.33-.2-3.43.97.93-3.43-.22-.35A9.1 9.1 0 0 1 2.92 12C2.92 6.95 7.04 2.96 12 2.96c2.4 0 4.66.93 6.36 2.63A8.97 8.97 0 0 1 21.1 12c0 5.05-4.12 9.04-9.09 9.04zm5.01-6.75c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.72.89-.88 1.08-.16.18-.33.2-.6.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.13-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.18-.52-.32z" />
                  </svg>
                  Viber
                </a>
                <a
                  href={CONSULTANT?.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn contact-btn-whatsapp"
                  aria-label={`Contact ${CONSULTANT?.name} on WhatsApp`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741 1.057.978-3.93-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}