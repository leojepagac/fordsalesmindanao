// ─────────────────────────────────────────────────────────────────────────────
// CONSULTANT CONFIGURATION
// Add new consultants to the CONSULTANTS object below.
// URL usage: yoursite.vercel.app/?consultant=rossie
// ─────────────────────────────────────────────────────────────────────────────

export interface ConsultantConfig {
  agent: string;
  name: string;
  photo: string;
  mobile: string;
  messengerLink: string;
  viberLink: string;
  whatsAppLink: string;
  googleFormBaseUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD ALL CONSULTANTS HERE
// ─────────────────────────────────────────────────────────────────────────────
export const CONSULTANTS: Record<string, ConsultantConfig> = {
  rossie: {
    agent: 'Rossie Rivera',
    name: 'Rossie Rivera',
    photo: '/assets/images/rossie.jpg',
    mobile: '+63 917 254 4567',
    messengerLink: 'https://m.me/rossie.rivera',
    viberLink: 'viber://chat?number=%2B639172544567',
    whatsAppLink: 'https://wa.me/639172544567',
    googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsIQlWyEx-if5PZX83J2L3-6XKrCvyVkV8cGW1Scg4rFqr8w/viewform'
  },
  clyde: {
    agent: 'Clyde Partisala',
    name: 'Clyde Partisala',
    photo: '/assets/images/cylde.jpg',
    mobile: '+63 917 123 1265',
    messengerLink: 'https://m.me/cylde.partisala',
    viberLink: 'viber://chat?number=%2B639171234567',
    whatsAppLink: 'https://wa.me/639171234567',
    googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsIQlWyEx-if5PZX83J2L3-6XKrCvyVkV8cGW1Scg4rFqr8w/viewform'
  },
  firfo: {
    agent: 'Firpo Eman',
    name: 'Firpo Eman',
    photo: '/assets/images/firpo.jpg',
    mobile: '+63 917 123 5266',
    messengerLink: 'https://m.me/firpo.eman',
    viberLink: 'viber://chat?number=%2B639171234567',
    whatsAppLink: 'https://wa.me/639171234567',
    googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsIQlWyEx-if5PZX83J2L3-6XKrCvyVkV8cGW1Scg4rFqr8w/viewform'
  },
  sheng: {
    agent: 'Sheila Cartoneros',
    name: 'Sheila Cartoneros',
    photo: '/assets/images/sheng.jpg',
    mobile: '+63 917 123 1256',
    messengerLink: 'https://m.me/sheila.cartoneros',
    viberLink: 'viber://chat?number=%2B639171234567',
    whatsAppLink: 'https://wa.me/639171234567',
    googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsIQlWyEx-if5PZX83J2L3-6XKrCvyVkV8cGW1Scg4rFqr8w/viewform'
  },
  // ── ADD MORE CONSULTANTS BELOW ──────────────────────────────────────────
  // juan: {
  //   agent: 'Juan Dela Cruz',
  //   name: 'Juan Dela Cruz',
  //   photo: '/assets/images/juan.jpg',
  //   mobile: '+63 919 123 4567',
  //   messengerLink: 'https://m.me/juan.delacruz',
  //   viberLink: 'viber://chat?number=%2B639191234567',
  //   whatsAppLink: 'https://wa.me/639191234567',
  //   googleFormBaseUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform'
  // },
};

// Default consultant if no URL parameter
export const DEFAULT_CONSULTANT = 'rossie';

// ─────────────────────────────────────────────────────────────────────────────
// DO NOT EDIT BELOW THIS LINE
// ─────────────────────────────────────────────────────────────────────────────

// Get consultant from URL parameter (client-side only)
export function getConsultant(): ConsultantConfig {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('consultant')?.toLowerCase().trim();
    if (key && CONSULTANTS[key]) {
      return CONSULTANTS[key];
    }
  }
  return CONSULTANTS[DEFAULT_CONSULTANT];
}

// Keep backward compatibility — existing components still work
export const CONSULTANT: ConsultantConfig = CONSULTANTS[DEFAULT_CONSULTANT];

// ─────────────────────────────────────────────────────────────────────────────
// FORM URL GENERATOR
// Automatically prefills consultant name in Google Form
// ─────────────────────────────────────────────────────────────────────────────
export function getFormUrl(
  consultant: ConsultantConfig,
  actionType: 'quotation' | 'test-drive',
  vehicleModel?: string
): string {
  const params = new URLSearchParams({
    'entry.85688683': consultant.agent,
    'entry.ACTION_FIELD': actionType === 'quotation'
      ? 'Request Quotation'
      : 'Book Test Drive',
    ...(vehicleModel ? { 'entry.VEHICLE_FIELD': vehicleModel } : {})
  });
  return `${consultant.googleFormBaseUrl}?${params.toString()}`;
}