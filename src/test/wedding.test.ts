import { describe, expect, it } from 'vitest';
import { remainingTime } from '@/components/wedding/countdown';
import { weddingEvents, venues, weddingSettings } from '@/config/wedding';

describe('Wedding invitation', () => {
  it('counts down to the exact IST ceremony time', () => {
    expect(remainingTime(weddingSettings.countdownTarget, Date.parse('2027-01-22T02:30:00Z'))?.values).toEqual([1, 0, 0, 0]);
  });
  it('never shows negative values after the celebration begins', () => {
    expect(remainingTime(weddingSettings.countdownTarget, Date.parse('2027-02-01T00:00:00Z')))).toEqual({total: 0, values: [0, 0, 0, 0]});
  });
  it('safely falls back for invalid countdown configuration', () => {
    expect(remainingTime('not-a-date', Date.now())).toBeNull();
  });
  it('has eight chapters and nine chronological ceremonies', () => {
    expect(weddingEvents).toHaveLength(8);
    expect(weddingEvents.flatMap(event => event.schedule ?? [event])).toHaveLength(9);
    expect(new Set(weddingEvents.map(event => event.id)).size).toBe(8);
    expect(weddingEvents.every(event => Boolean(venues[event.venueId]))).toBe(true);
    expect(weddingEvents.map(event => event.day)).toEqual(['22', '22', '23', '23', '23', '24', '24', '24']);
  });
  it('does not invent location links', () => {
    expect(Object.values(venues).every(venue => venue.mapsUrl === '')).toBe(true);
  });
});