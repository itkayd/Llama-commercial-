import type { IconName } from './icons';

export interface Sector {
  icon: IconName;
  title: string;
  line: string;
}

export const sectors: Sector[] = [
  { icon: 'office', title: 'Offices & business units', line: 'Daily or weekly cleans for desks, kitchens, meeting rooms and washrooms.' },
  { icon: 'school', title: 'Schools & education centres', line: 'Term-time cleaning and deep cleans in the holidays, by DBS-checked staff.' },
  { icon: 'church', title: 'Churches & places of worship', line: 'Weekly cleans around services, plus halls cleaned after events.' },
  { icon: 'shop', title: 'Shops & retail', line: 'Shop floors, glass, tills and stockrooms, cleaned before opening or after close.' },
  { icon: 'gym', title: 'Gyms & sports facilities', line: 'Changing rooms, showers, studios, mats and sports hall floors.' },
  { icon: 'factory', title: 'Factories & warehouses', line: 'Welfare areas, canteens, offices and floor scrubbing, worked around your shifts.' },
  { icon: 'communal', title: 'Communal areas', line: 'Entrances, stairwells, lifts, corridors and bin stores in residential and mixed-use blocks.' },
  { icon: 'carpark', title: 'Car parks', line: 'Litter picking, sweeping, pressure washing, stairwells and lift lobbies.' },
];
