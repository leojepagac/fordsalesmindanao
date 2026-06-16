'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getConsultant } from './ConsultantConfig';

export default function InquiryFormSection() {
  const CONSULTANT = getConsultant();
  const sectionRef = useRef<HTMLElement>(null);
  const [formType, setFormType] = useState<'quotation' | 'test-drive'>('quotation');
  const [vehicleModel, setVehicleModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    car_interest: '',
    message: '',
    consultant: CONSULTANT.agent,
    source: 'Landing Page Form',
    action_type: 'quotation'
  });

  useEffect(() => {
    // Check if there's a vehicle model passed via URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const model = params.get('model');
      if (model) {
        setVehicleModel(model);
        setFormData(prev => ({ ...prev, car_interest: model }));
      }
      const action = params.get('action');
      if (action === 'test-drive') {
        setFormType('test-drive');
        setFormData(prev => ({ ...prev, action_type: 'test-drive' }));
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll<HTMLElement>('.form-reveal');
            els.forEach((el, i) => {
              el.style.transitionDelay = `${i * 100}ms`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormTypeChange = (type: 'quotation' | 'test-drive') => {
    setFormType(type);
    setFormData(prev => ({ ...prev, action_type: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          consultant: CONSULTANT.agent,
          consultant_email: CONSULTANT.mobile,
          source: 'Landing Page Form',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          car_interest: '',
          message: '',
          consultant: CONSULTANT.agent,
          source: 'Landing Page Form',
          action_type: formType
        });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" ref={sectionRef} className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div
          className="form-reveal text-center mb-12"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <span className="accent-line mb-4 mx-auto" />
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
            Get In Touch
          </p>
          <h2 className="text-section-xl font-display font-bold text-white leading-tight mb-4">
            Inquire Now — It&apos;s Free!
          </h2>
          <p className="text-white/70 text-lg">
            Talk to <span className="text-accent font-semibold">{CONSULTANT?.name}</span> directly.
            No pressure, no obligation.
          </p>
        </div>

        {/* Form Type Toggle */}
        <div
          className="form-reveal flex rounded-xl overflow-hidden border border-white/10 mb-8"
          style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <button
            type="button"
            onClick={() => handleFormTypeChange('quotation')}
            className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wide transition-all ${
              formType === 'quotation'
                ? 'bg-accent text-accent-foreground'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}>
            📋 Request Quotation
          </button>
          <button
            type="button"
            onClick={() => handleFormTypeChange('test-drive')}
            className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wide transition-all ${
              formType === 'test-drive'
                ? 'bg-accent text-accent-foreground'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}>
            🚗 Book Test Drive
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="form-reveal bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center mb-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-white font-bold text-xl mb-2">Inquiry Sent Successfully!</h3>
            <p className="text-white/70">
              Thank you! <span className="text-accent font-semibold">{CONSULTANT?.name}</span> will
              contact you shortly. Please check your email for confirmation.
            </p>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <form
            onSubmit={handleSubmit}
            className="form-reveal glass-card rounded-2xl p-8 space-y-5"
            style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Dela Cruz"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="juan@gmail.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Phone + Car Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="09171234567"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                  Car Model *
                </label>
                <select
                  name="car_interest"
                  value={formData.car_interest}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors">
                  <option value="" className="bg-gray-900">Select a model...</option>
                  <option value="Ford Ranger" className="bg-gray-900">Ford Ranger</option>
                  <option value="Ford Everest" className="bg-gray-900">Ford Everest</option>
                  <option value="Ford Territory" className="bg-gray-900">Ford Territory</option>
                  <option value="Ford Bronco Sport" className="bg-gray-900">Ford Bronco Sport</option>
                  <option value="Ford Explorer" className="bg-gray-900">Ford Explorer</option>
                  <option value="Ford Mustang" className="bg-gray-900">Ford Mustang</option>
                  <option value="Others" className="bg-gray-900">Others</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                Message or Question
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ask about pricing, financing, availability, or anything else..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-accent text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {formType === 'quotation' ? '📋 Send Quotation Request' : '🚗 Book My Test Drive'}
                </span>
              )}
            </button>

            {/* Consultant info */}
            <p className="text-white/40 text-xs text-center">
              Your inquiry goes directly to <span className="text-accent">{CONSULTANT?.name}</span> —
              your dedicated Ford Sales Consultant. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}