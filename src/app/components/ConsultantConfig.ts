// ─────────────────────────────────────────────────────────────────────────────
// CONSULTANT CONFIGURATION
// Duplicate this page for each consultant and update the values below.
// The `agent` value is automatically appended to the Google Form URL.
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

export const CONSULTANT: ConsultantConfig = {
  agent: 'Rossie',
  name: 'Rossie Rivera',
  photo: "/assets/images/rossie.jpg",
  mobile: '+63 917 123 4567',
  messengerLink: 'https://m.me/joelsantos.ford',
  viberLink: 'viber://chat?number=%2B639171234567',
  whatsAppLink: 'https://wa.me/639171234567',
  googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsIQlWyEx-if5PZX83J2L3-6XKrCvyVkV8cGW1Scg4rFqr8w/viewform?usp=sharing&ouid=105447397526188623308'
};

export function getFormUrl(
consultant: ConsultantConfig,
actionType: 'quotation' | 'test-drive',
vehicleModel?: string)
: string {
  const params = new URLSearchParams({
    // Update these entry IDs to match your actual Google Form field IDs
    'entry.AGENT_FIELD': consultant.name,
    'entry.ACTION_FIELD': actionType === 'quotation' ? 'Request Quotation' : 'Book Test Drive',
    ...(vehicleModel ? { 'entry.VEHICLE_FIELD': vehicleModel } : {})
  });
  return `${consultant.googleFormBaseUrl}?${params.toString()}`;
}