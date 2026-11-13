export type GroupId = 'everyday' | 'floors' | 'deep';

export interface ServiceGroup {
  id: GroupId;
  name: string;
}

export const groups: ServiceGroup[] = [
  { id: 'everyday', name: 'Everyday cleaning' },
  { id: 'floors', name: 'Floors & carpets' },
  { id: 'deep', name: 'Deep & outdoor' },
];

export interface Service {
  slug: string;
  group: GroupId;
  h1: string;
  intro: string;
  included: string[];
  goodFor: string;
  howOften: string[];
  related: [string, string, string];
  description: string;
}

export const services: Service[] = [
  {
    slug: 'regular-office-cleaning',
    group: 'everyday',
    h1: 'Regular office and contract cleaning',
    intro: 'A regular clean to a written specification, on the days and times that suit your building.',
    included: [
      'Desks, surfaces and touchpoints wiped and sanitised',
      'Kitchens and breakout areas cleaned',
      'Washrooms cleaned and consumables refilled',
      'Bins emptied and recycling separated',
      'Carpets vacuumed and hard floors mopped',
    ],
    goodFor: 'Offices, business units, studios and clinics',
    howOften: ['Daily', 'several times a week', 'weekly'],
    related: ['deep-cleaning', 'carpet-and-upholstery-cleaning', 'floor-scrubbing'],
    description: 'Regular office and contract cleaning across London: desks, kitchens, washrooms, bins and floors, to a written specification.',
  },
  {
    slug: 'communal-area-cleaning',
    group: 'everyday',
    h1: 'Communal area cleaning',
    intro: 'Shared spaces kept clean for residents, tenants and visitors.',
    included: [
      'Entrances, door glass and letterbox areas',
      'Stairwells, handrails, corridors and lifts',
      'Bin stores cleaned and kept clear',
    ],
    goodFor: 'Residential blocks, mixed-use buildings and shared office entrances',
    howOften: ['Weekly', 'fortnightly'],
    related: ['car-park-cleaning', 'floor-scrubbing', 'deep-cleaning'],
    description: 'Communal area cleaning in London: entrances, stairwells, lifts, corridors and bin stores for residential and mixed-use blocks.',
  },
  {
    slug: 'school-cleaning',
    group: 'everyday',
    h1: 'School and education centre cleaning',
    intro: 'Term-time cleaning, with deep cleans in the holidays.',
    included: [
      'Classrooms, halls, corridors and offices',
      'Toilets and changing rooms cleaned to the colour code',
      'Deep cleans in the summer, Easter and Christmas holidays',
      'DBS checks to the level the school requires',
    ],
    goodFor: 'Primary and secondary schools, nurseries, colleges, tuition and training centres',
    howOften: ['Term-time daily', 'holiday deep cleans'],
    related: ['deep-cleaning', 'floor-stripping-and-sealing', 'sports-facility-cleaning'],
    description: 'School and education centre cleaning in London: classrooms, halls, toilets and holiday deep cleans by DBS-checked staff.',
  },
  {
    slug: 'church-cleaning',
    group: 'everyday',
    h1: 'Church and place of worship cleaning',
    intro: 'Careful, regular cleaning timed around your services and events.',
    included: [
      'Worship spaces, halls, kitchens and toilets',
      'Care around old timber, stone and fittings',
      'Halls cleaned after hires and events',
      'Cleaning timed around services',
    ],
    goodFor: 'Churches, mosques, temples, gurdwaras, synagogues and their halls',
    howOften: ['Weekly', 'before and after events'],
    related: ['rug-cleaning', 'floor-polishing', 'carpet-and-upholstery-cleaning'],
    description: 'Cleaning for churches and places of worship in London: worship spaces, halls, kitchens and toilets, timed around services.',
  },
  {
    slug: 'retail-and-factory-cleaning',
    group: 'everyday',
    h1: 'Shop, business unit and factory cleaning',
    intro: 'Cleaning that works around your trading hours and shifts.',
    included: [
      'Shop floors, glass, fitting rooms and tills',
      'Welfare areas, canteens and offices',
      'High-level dusting and floor scrubbing',
      'Site inductions and permits followed',
    ],
    goodFor: 'High-street shops, trade counters, workshops, factories and warehouses',
    howOften: ['Daily', 'weekly', 'around shifts'],
    related: ['floor-scrubbing', 'deep-cleaning', 'car-park-cleaning'],
    description: 'Shop, business unit and factory cleaning in London, worked around your trading hours and shifts.',
  },
  {
    slug: 'sports-facility-cleaning',
    group: 'everyday',
    h1: 'Sports facility cleaning',
    intro: 'Changing rooms and training spaces cleaned between sessions.',
    included: [
      'Changing rooms, showers and toilets',
      'Equipment, mats and benches disinfected',
      'Studio and sports hall floors',
      'Reception and spectator areas',
    ],
    goodFor: 'Gyms, leisure centres, studios, clubs and sports halls',
    howOften: ['Daily', 'between sessions'],
    related: ['floor-scrubbing', 'deep-cleaning', 'floor-polishing'],
    description: 'Gym and sports facility cleaning in London: changing rooms, showers, equipment, mats and sports hall floors.',
  },
  {
    slug: 'carpet-and-upholstery-cleaning',
    group: 'floors',
    h1: 'Carpet and upholstery cleaning',
    intro: 'Deep cleaning for carpets, chairs and fabric screens.',
    included: [
      'Hot-water extraction for a deep clean',
      'Low-moisture cleaning when the room is needed back quickly',
      'Spot and stain treatment',
      'Office chairs, sofas and fabric screens',
    ],
    goodFor: 'Office carpets, pubs, halls, chairs, sofas and fabric partitions',
    howOften: ['Every 6 to 12 months', 'after spills'],
    related: ['rug-cleaning', 'regular-office-cleaning', 'deep-cleaning'],
    description: 'Commercial carpet and upholstery cleaning in London: hot-water extraction, low-moisture cleaning and stain treatment.',
  },
  {
    slug: 'rug-cleaning',
    group: 'floors',
    h1: 'Rug cleaning',
    intro: 'Gentle on-site cleaning for rugs and runners.',
    included: [
      'Colour and fibre tested before cleaning',
      'Gentle on-site cleaning and drying',
      'Fringes and edges finished by hand',
    ],
    goodFor: 'Reception rugs, church rugs and runners',
    howOften: ['One-off', 'seasonal'],
    related: ['carpet-and-upholstery-cleaning', 'church-cleaning', 'deep-cleaning'],
    description: 'On-site rug cleaning in London for reception rugs, church rugs and runners, with colour and fibre tested first.',
  },
  {
    slug: 'floor-scrubbing',
    group: 'floors',
    h1: 'Floor scrubbing',
    intro: 'Machine scrubbing to lift ground-in dirt from hard floors.',
    included: [
      'Rotary or scrubber-dryer machine clean',
      'Edges and corners done by hand',
      'Wet floor signs in place while the floor dries',
    ],
    goodFor: 'Vinyl, safety flooring, linoleum, sealed stone and terrazzo',
    howOften: ['Monthly', 'quarterly'],
    related: ['floor-stripping-and-sealing', 'floor-polishing', 'regular-office-cleaning'],
    description: 'Machine floor scrubbing in London for vinyl, safety flooring, linoleum, stone and terrazzo.',
  },
  {
    slug: 'floor-stripping-and-sealing',
    group: 'floors',
    h1: 'Floor stripping and sealing',
    intro: 'Old, scuffed polish removed and fresh protection laid down.',
    included: [
      'Old polish stripped down to the floor',
      'Floor rinsed and neutralised',
      'Fresh coats of seal or polish applied',
      'Work done out of hours so the floor can cure',
    ],
    goodFor: 'Vinyl, linoleum, safety flooring and sealed wood in schools, halls and corridors',
    howOften: ['Once or twice a year'],
    related: ['floor-scrubbing', 'floor-polishing', 'school-cleaning'],
    description: 'Floor stripping and sealing in London: old polish removed and fresh coats of seal applied, out of hours.',
  },
  {
    slug: 'floor-polishing',
    group: 'floors',
    h1: 'Floor polishing',
    intro: 'Buffing to bring back the shine between full treatments.',
    included: [
      'High-speed buffing of sealed floors',
      'Scuff and heel-mark removal',
      'A brighter finish between strip-and-seal visits',
    ],
    goodFor: 'Corridors, receptions, halls and shop floors',
    howOften: ['Monthly', 'as needed'],
    related: ['floor-stripping-and-sealing', 'floor-scrubbing', 'church-cleaning'],
    description: 'Floor polishing and buffing in London for corridors, receptions, halls and shop floors.',
  },
  {
    slug: 'deep-cleaning',
    group: 'deep',
    h1: 'Deep cleaning',
    intro: 'A top-to-bottom clean for any building that needs more than the regular clean.',
    included: [
      'High and low dusting, behind and under furniture',
      'Kitchens degreased and appliances cleaned inside',
      'Washrooms descaled',
      'Skirting, doors, frames and switches',
    ],
    goodFor: 'Any commercial building, before or after works, events or a move',
    howOften: ['Quarterly', 'one-off', 'after works'],
    related: ['regular-office-cleaning', 'carpet-and-upholstery-cleaning', 'floor-scrubbing'],
    description: 'Commercial deep cleaning in London: high and low dusting, kitchens, washrooms, skirting and doors.',
  },
  {
    slug: 'car-park-cleaning',
    group: 'deep',
    h1: 'Car park cleaning',
    intro: 'Cleaner car parks for staff, residents and visitors.',
    included: [
      'Litter picking and sweeping',
      'Pressure washing of decks, ramps and stairwells',
      'Oil and tyre-mark treatment',
      'Lift lobbies, pay stations and signage',
    ],
    goodFor: 'Multi-storey, underground and surface car parks',
    howOften: ['Weekly litter picks', 'periodic washing'],
    related: ['communal-area-cleaning', 'retail-and-factory-cleaning', 'deep-cleaning'],
    description: 'Car park cleaning in London: litter picking, sweeping, pressure washing, oil stains, stairwells and lift lobbies.',
  },
];

export const serviceBySlug = (slug: string): Service => {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
};

export const groupName = (id: GroupId) => groups.find((g) => g.id === id)!.name;

export const serviceHref = (slug: string) => `/services/${slug}/`;

/** The home page "What we do" columns (section 9.1). Each item links to a service page. */
export const whatWeDo: { title: string; items: { label: string; slug: string }[] }[] = [
  {
    title: 'Everyday cleaning',
    items: [
      { label: 'Regular office and contract cleaning', slug: 'regular-office-cleaning' },
      { label: 'Communal area cleaning', slug: 'communal-area-cleaning' },
      { label: 'School and education centre cleaning', slug: 'school-cleaning' },
      { label: 'Shop, business unit and factory cleaning', slug: 'retail-and-factory-cleaning' },
      { label: 'Sports facility cleaning', slug: 'sports-facility-cleaning' },
    ],
  },
  {
    title: 'Floors & carpets',
    items: [
      { label: 'Carpet and upholstery cleaning', slug: 'carpet-and-upholstery-cleaning' },
      { label: 'Rug cleaning', slug: 'rug-cleaning' },
      { label: 'Floor scrubbing', slug: 'floor-scrubbing' },
      { label: 'Floor stripping and sealing', slug: 'floor-stripping-and-sealing' },
      { label: 'Floor polishing', slug: 'floor-polishing' },
    ],
  },
  {
    title: 'Deep & outdoor',
    items: [
      { label: 'Deep cleaning', slug: 'deep-cleaning' },
      { label: 'Car park cleaning', slug: 'car-park-cleaning' },
      { label: 'Washroom and kitchen deep cleans', slug: 'deep-cleaning' },
      { label: 'Holiday and shutdown cleans', slug: 'deep-cleaning' },
      { label: 'One-off cleans after works or events', slug: 'deep-cleaning' },
    ],
  },
];
