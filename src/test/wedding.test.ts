import { describe, expect, it } from "vitest";
import { remainingTime } from "@/components/wedding/countdown";
import {
  celebrationDays,
  ceremonies,
  family,
  weddingEvents,
  venues,
  weddingSettings,
} from "@/config/wedding";

describe("Wedding invitation", () => {
  it("counts down to the exact IST ceremony time", () => {
    expect(
      remainingTime(weddingSettings.countdownTarget, Date.parse("2027-01-22T02:30:00Z"))?.values,
    ).toEqual([1, 0, 0, 0]);
  });
  it("never shows negative values after the celebration begins", () => {
    const result = remainingTime(
      weddingSettings.countdownTarget,
      Date.parse("2027-02-01T00:00:00Z"),
    );
    expect(result).toEqual({ total: 0, values: [0, 0, 0, 0] });
  });
  it("safely falls back for invalid countdown configuration", () => {
    expect(remainingTime("not-a-date", Date.now())).toBeNull();
  });
  it("has six chapters and seven ceremonies across 23–24 January", () => {
    expect(weddingEvents).toHaveLength(6);
    expect(weddingEvents.flatMap((event) => event.schedule ?? [event])).toHaveLength(7);
    expect(new Set(weddingEvents.map((event) => event.id)).size).toBe(6);
    expect(weddingEvents.every((event) => Boolean(venues[event.venueId]))).toBe(true);
    expect(weddingEvents.map((event) => event.day)).toEqual(["23", "23", "23", "24", "24", "24"]);
  });
  it("only lists venues that host a celebration", () => {
    expect(
      Object.keys(venues).every((id) => weddingEvents.some((event) => event.venueId === id)),
    ).toBe(true);
  });
  it("only uses secure Google Maps links or leaves them empty", () => {
    expect(
      Object.values(venues).every(
        (venue) => venue.mapsUrl === "" || /^https:\/\/maps\.app\.goo\.gl\//.test(venue.mapsUrl),
      ),
    ).toBe(true);
  });
  it("gives every ceremony a valid IST start that matches its day and comes in order", () => {
    const all = ceremonies();
    expect(all.map((slot) => slot.title)).toEqual([
      "Ganesh Pooja",
      "Chalk / Kalash",
      "Sagai & Haldi Carnival",
      "Sangeet & DJ",
      "Baarat",
      "Sacred Wedding Phere",
      "Reception",
    ]);
    all.forEach((slot) => {
      expect(slot.start).toMatch(/\+05:30$/);
      expect(slot.start.slice(8, 10)).toBe(slot.event.day);
      if (slot.end) expect(Date.parse(slot.end)).toBeGreaterThan(Date.parse(slot.start));
    });
    const starts = all.map((slot) => Date.parse(slot.start));
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
  });
  it("has one illustrated day chapter for each celebration day", () => {
    expect(celebrationDays.map((day) => day.day)).toEqual([
      ...new Set(weddingEvents.map((event) => event.day)),
    ]);
  });
  it("keeps both families configured without placeholders", () => {
    for (const side of [family.groom, family.bride]) {
      expect(side.parents.length).toBeGreaterThan(0);
      expect([...side.parents, ...side.grandparents].join(" ")).not.toMatch(/placeholder|tbd|xxx/i);
    }
    expect(weddingSettings.siteUrl === "" || weddingSettings.siteUrl.startsWith("https://")).toBe(
      true,
    );
  });
});
