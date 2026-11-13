/** Line icons on a 24 × 24 grid (section 3.5). Rendered by components/Icon.astro. */
export const icons = {
  office: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-3h3v3"/>',
  school: '<path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11.3V16c0 1.4 2.3 2.8 5 2.8s5-1.4 5-2.8v-4.7"/><path d="M21 9v5"/>',
  church: '<path d="M12 2.5v4M10 4.5h4"/><path d="M7 21V11.5l5-4.5 5 4.5V21"/><path d="M4 21h16"/><path d="M10.5 21v-3.5a1.5 1.5 0 013 0V21"/>',
  shop: '<path d="M4 8l1.8-4h12.4L20 8"/><path d="M4 8h16v1.2a2.7 2.7 0 01-5.3 0 2.7 2.7 0 01-5.4 0A2.7 2.7 0 014 9.2V8z"/><path d="M5.5 12v9h13v-9"/><path d="M10 21v-5h4v5"/>',
  gym: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
  factory: '<path d="M2.5 21h19"/><path d="M3.5 21V11l5.5 3.3V11l5.5 3.3V7h3l1 14"/><path d="M7 18h2M12 18h2"/>',
  communal: '<path d="M3 20.5h4.5v-4h4v-4h4v-4H20"/><path d="M3 20.5V4"/>',
  carpark: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16.5v-9h3.2a2.7 2.7 0 010 5.4H10"/>',
  phone: '<path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 006.2 6.2l1.4-2.1 4.2 1.6V18a2.5 2.5 0 01-2.5 2.5A15.5 15.5 0 012.5 6 2.5 2.5 0 015 3.5z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
} as const;

export type IconName = keyof typeof icons;
