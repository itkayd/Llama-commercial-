/**
 * The only place contact and company details live.
 * Every phone number and email address on the site is read from here.
 */
export const SITE = {
  name: 'Llama Commercial',
  legalName: 'Llama Commercial Ltd',
  tagline: 'No drama. Just Llama.',
  phone: '07000 000000', // placeholder: replace before launch
  email: 'hello@llamacommercial.co.uk',
  area: 'Greater London',
  url: 'https://llamacommercial.co.uk',
  year: 2026,
};

/** "07000 000000" -> "tel:+447000000000": spaces removed, leading 0 swapped for +44. */
export const telHref = `tel:${SITE.phone.replace(/\s+/g, '').replace(/^0/, '+44')}`;
export const mailHref = `mailto:${SITE.email}`;
