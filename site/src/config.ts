/**
 * The only place contact and company details live.
 * Every phone number, email address and company detail on the site is read from here.
 * Items marked TODO must be confirmed before going live (see the README, "Going live").
 */
export const site = {
  name: 'Llama Commercial',
  legalName: 'Llama Commercial Ltd',
  tagline: 'No drama. Just Llama.',
  descriptor: 'Commercial cleaning · London',
  domain: 'https://llamacommercial.co.uk', // TODO: confirm domain is registered
  phoneDisplay: '07000 000000', // TODO: real number
  phoneE164: '+447000000000', // TODO
  email: 'hello@llamacommercial.co.uk', // TODO
  hours: 'Monday to Saturday, 8am to 7pm', // TODO: confirm
  baseArea: 'Hackney, London',
  companyNumber: '[COMPANY NUMBER]', // TODO
  registeredOffice: '[REGISTERED ADDRESS]', // TODO
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '', // Formspree (or similar) URL, set in host env vars
};

/** Opening hours in schema.org format. Keep in step with `site.hours`. */
export const openingHoursSchema = 'Mo-Sa 08:00-19:00';

/** True while a value is still a placeholder such as "[REGISTERED ADDRESS]". */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export const telHref = `tel:${site.phoneE164}`;
export const mailHref = `mailto:${site.email}`;
