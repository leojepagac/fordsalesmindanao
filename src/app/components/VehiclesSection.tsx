'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CONSULTANT, getFormUrl } from './ConsultantConfig';

const vehicles = [
{
  name: 'Ford Ranger',
  tagline: 'Built Tough. Born Ready.',
  description: 'The best-selling pickup truck in the Philippines. Dominate any terrain with confidence.',
  price: '₱ 1,198,000',
  image: "/assets/images/vehicles/ford-ranger.jpg",
  alt: 'White Ford Ranger pickup truck parked on rocky mountain terrain, bright daylight, rugged outdoor setting',
  badge: 'Best Seller',
  span: 'lg:col-span-2',
  height: 'h-72 lg:h-80'
},
{
  name: 'Ford Everest',
  tagline: 'Command Every Road.',
  description: 'Premium SUV with 7-seat capacity and advanced 4WD capability.',
  price: '₱ 1,698,000',
  image: "/assets/images/vehicles/ford-everest.jpg",
  alt: 'Dark silver SUV on a winding forest road, dense green trees, moody overcast sky, cinematic lighting',
  badge: 'Top Pick',
  span: 'lg:col-span-1',
  height: 'h-72'
},
{
  name: 'Ford Territory',
  tagline: 'Urban. Smart. Connected.',
  description: 'Compact SUV designed for city living with smart tech features.',
  price: '₱ 1,028,000',
  image: "/assets/images/vehicles/ford-territory.jpg",
  alt: 'Modern compact SUV in a clean urban cityscape, glass buildings background, bright natural daylight',
  badge: 'Value Pick',
  span: 'lg:col-span-1',
  height: 'h-72'
},
{
  name: 'Ford Explorer',
  tagline: 'Luxury Meets Adventure.',
  description: 'Full-size SUV with premium interior and powerful performance.',
  price: '₱ 2,698,000',
  image: "/assets/images/vehicles/ford-explorer.jpg",
  alt: 'Large full-size SUV on a wide open desert road at golden hour, warm orange sky, dramatic shadows',
  badge: 'Premium',
  span: 'lg:col-span-1',
  height: 'h-72'
},
{
  name: 'Ford Mustang',
  tagline: 'Pure American Muscle.',
  description: 'Iconic sports car with legendary performance and timeless style.',
  price: '₱ 3,498,000',
  image: "/assets/images/vehicles/ford-mustang.jpg",
  alt: 'Red Ford Mustang sports car on a straight highway at dusk, low angle shot, dramatic motion blur background',
  badge: 'Icon',
  span: 'lg:col-span-2',
  height: 'h-72 lg:h-80'
}];


// Bento audit:
// Array has 5 cards: [Ranger cs-2, Everest cs-1, Territory cs-1, Explorer cs-1, Mustang cs-2]
// Row 1: [col-1+2: Ranger cs-2] [col-3: Everest cs-1]
// Row 2: [col-1: Territory cs-1] [col-2: Explorer cs-1] [col-3: NEEDS FILL]
// → Territory cs-1, Explorer cs-1, + Mustang starts row 3
// Row 3: [col-1+2: Mustang cs-2] [col-3: empty → Mustang extends or row fills]
// Revised: 3-col grid, Ranger cs-2 + Everest cs-1 | Territory cs-1 + Explorer cs-1 + (Mustang row-alone) | Mustang cs-3 full
// Final: Ranger(cs-2), Everest(cs-1), Territory(cs-1), Explorer(cs-1), Mustang(cs-3 full last row)
// Placed 5/5 cards ✓

export default function VehiclesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.vehicle-reveal');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 80}ms`;
              card.classList.add('opacity-100');
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
    <section id="vehicles" ref={sectionRef} className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <span className="accent-line mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
            Vehicle Lineup
          </p>
          <h2 className="font-display font-bold text-[42px] text-[rgba(6,23,137,1)]">
            Featured Ford Models
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl">
            From rugged pickups to sleek sports cars — find the Ford that fits your life.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles?.map((vehicle, index) => {
            const isLastCard = index === vehicles?.length - 1;
            const colSpanClass = isLastCard ?
            'md:col-span-2 lg:col-span-3' :
            index === 0 ?
            'lg:col-span-2' : '';

            return (
              /* vehicle-reveal card */
              <div
                key={vehicle?.name}
                className={`vehicle-reveal vehicle-card ${colSpanClass} opacity-0`}
                style={{ transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
                
                {/* Image */}
                <div className={`relative w-full overflow-hidden ${vehicle?.height}`}>
                  <AppImage
                    src={vehicle?.image}
                    alt={vehicle?.alt}
                    fill
                    className="vehicle-img object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  
                  {/* Scrim */}
                  <div className="absolute inset-0 gradient-card-scrim" />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {vehicle?.badge}
                  </span>
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                      {vehicle?.tagline}
                    </p>
                    <h3 className="text-card-title font-display font-bold text-white leading-tight mb-1">
                      {vehicle?.name}
                    </h3>
                    <p className="text-white/75 text-sm leading-snug mb-3 hidden sm:block">
                      {vehicle?.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="text-accent font-bold text-lg">
                        Starting at {vehicle?.price}
                      </span>
                      <div className="flex gap-2">
                        <a
                          href={getFormUrl(CONSULTANT, 'quotation', vehicle?.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide rounded-md hover:bg-accent/90 transition-colors min-h-[44px]"
                          aria-label={`Request quote for ${vehicle?.name}`}>
                          
                          Get Quote
                        </a>
                        <a
                          href={getFormUrl(CONSULTANT, 'test-drive', vehicle?.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide rounded-md hover:bg-white/25 transition-colors backdrop-blur-sm min-h-[44px]"
                          aria-label={`Book test drive for ${vehicle?.name}`}>
                          
                          Test Drive
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

}