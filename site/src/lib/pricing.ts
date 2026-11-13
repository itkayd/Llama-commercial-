/** Price estimate maths (section 11). Keep these numbers exactly. */
export const RATE = 22; // £ per cleaner hour
export const SQFT_PER_HR = 2000; // sq ft cleaned per hour
export const WEEKS = 4.33; // weeks per month

export function regular(sqft: number, washrooms: number, kitchens: number, visits: number) {
  const hours = Math.max(1, sqft / SQFT_PER_HR + washrooms * 0.15 + kitchens * 0.2);
  const perVisit = hours * RATE;
  const monthly = perVisit * visits * WEEKS;
  return { hours, perVisit, monthly, perSqft: sqft > 0 ? monthly / sqft : 0 };
}

export function deep(sqft: number, washrooms: number, kitchens: number) {
  return Math.max(149, sqft * 0.12 + washrooms * 15 + kitchens * 25);
}

export const LIMITS = {
  sqft: 50000,
  washrooms: 50,
  kitchens: 20,
} as const;

/** Empty, negative or non-numeric input counts as 0; values above `max` are clamped to `max`. */
export function clampInput(raw: unknown, max: number): number {
  const n = typeof raw === 'number' ? raw : Number(String(raw ?? '').replace(/,/g, '').trim());
  if (!Number.isFinite(n) || n <= 0 || String(raw ?? '').trim() === '') return 0;
  return Math.min(n, max);
}

const gbp0 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0, minimumFractionDigits: 0 });
const gbp2 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2, minimumFractionDigits: 2 });
const num0 = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });

/** £595 */
export const formatPounds = (n: number) => gbp0.format(Math.round(n));
/** £0.40 */
export const formatPence = (n: number) => gbp2.format(n);
/** 1,500 */
export const formatNumber = (n: number) => num0.format(n);
