export interface PostcodeArea {
  code: string;
  name: string;
}

export const closestAreas: PostcodeArea[] = [
  { code: 'E', name: 'East London' },
  { code: 'EC', name: 'City of London' },
  { code: 'N', name: 'North London' },
  { code: 'IG', name: 'Ilford' },
];

export const otherAreas: PostcodeArea[] = [
  { code: 'WC', name: 'West Central' },
  { code: 'NW', name: 'North West' },
  { code: 'W', name: 'West London' },
  { code: 'SE', name: 'South East' },
  { code: 'SW', name: 'South West' },
  { code: 'RM', name: 'Romford' },
  { code: 'EN', name: 'Enfield' },
  { code: 'BR', name: 'Bromley' },
  { code: 'CR', name: 'Croydon' },
  { code: 'SM', name: 'Sutton' },
];

export const closestBoroughs = [
  'Hackney',
  'Tower Hamlets',
  'Newham',
  'Islington',
  'Haringey',
  'Waltham Forest',
  'Redbridge',
  'Camden',
  'City of London',
];

export const allAreas = [...closestAreas, ...otherAreas];
