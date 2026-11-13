import { describe, expect, it } from 'vitest';
import { clampInput, deep, formatPounds, regular } from './pricing';

describe('regular()', () => {
  it('defaults: 1,500 sq ft, 2 washrooms, 1 kitchen, 5 visits', () => {
    const r = regular(1500, 2, 1, 5);
    expect(r.hours).toBeCloseTo(1.25, 10);
    expect(r.perVisit).toBeCloseTo(27.5, 10);
    expect(r.monthly).toBeCloseTo(595.375, 6);
    expect(formatPounds(r.monthly)).toBe('£595');
  });

  it('applies the 1 hour minimum', () => {
    const r = regular(200, 0, 0, 1);
    expect(r.hours).toBe(1);
    expect(r.perVisit).toBe(22);
    expect(r.monthly).toBeCloseTo(95.26, 6);
    expect(formatPounds(r.monthly)).toBe('£95');
  });

  it('returns 0 per sq ft when there is no floor area', () => {
    expect(regular(0, 0, 0, 1).perSqft).toBe(0);
  });
});

describe('deep()', () => {
  it('applies the £149 minimum', () => {
    expect(deep(500, 1, 0)).toBe(149);
  });

  it('prices by area, washrooms and kitchens', () => {
    expect(deep(3000, 3, 2)).toBeCloseTo(455, 10);
  });
});

describe('clampInput()', () => {
  it('treats empty, negative and non-numeric input as 0', () => {
    expect(clampInput('', 100)).toBe(0);
    expect(clampInput('-5', 100)).toBe(0);
    expect(clampInput('abc', 100)).toBe(0);
    expect(clampInput(undefined, 100)).toBe(0);
  });

  it('clamps to the maximum and accepts commas', () => {
    expect(clampInput('60,000', 50000)).toBe(50000);
    expect(clampInput('1,500', 50000)).toBe(1500);
  });
});
