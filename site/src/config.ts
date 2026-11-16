/**
 * The only place contact and company details live.
 * Every phone number and email address on the site is read from here.
 * Items marked TODO must be confirmed before going live (see the README, "Going live").
 */
export const site = {
  name: 'Llama Commercial',
  legalName: 'Llama Commercial Ltd',
  domain: 'https://llamacommercial.co.uk', // TODO: confirm domain is registered
  phoneDisplay: '07000 000000', // TODO: real number
  phoneE164: '+447000000000', // TODO
  email: 'hello@llamacommercial.co.uk', // TODO
};

/** Shorthands used in page copy. */
export const PHONE = site.phoneDisplay;
export const EMAIL = site.email;

export const telHref = `tel:${site.phoneE164}`;
export const mailHref = `mailto:${site.email}`;
