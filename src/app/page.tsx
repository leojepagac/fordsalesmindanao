import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import VehiclesSection from './components/VehiclesSection';
import WhyFordSection from './components/WhyFordSection';
import PromotionsSection from './components/PromotionsSection';
import ConsultantSection from './components/ConsultantSection';
import FinalCTASection from './components/FinalCTASection';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <VehiclesSection />
        <WhyFordSection />
        <PromotionsSection />
        <ConsultantSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}