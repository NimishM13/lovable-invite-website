import { describe, expect, it } from "vitest";
import { scratchedRatio, SCRATCH_REVEAL_RATIO } from "@/components/wedding/scratch";
import { weddingSettings } from "@/config/wedding";

/** RGBA pixels with the given alpha values. */
function pixels(alphas: number[]) {
  const data = new Uint8ClampedArray(alphas.length * 4);
  alphas.forEach((alpha, index) => (data[index * 4 + 3] = alpha));
  return data;
}

describe("Save-the-date scratch card", () => {
  it("reports an untouched foil as nothing scratched", () => {
    expect(scratchedRatio(pixels([255, 255, 255, 255]))).toBe(0);
  });
  it("counts transparent pixels as scratched away", () => {
    expect(scratchedRatio(pixels([0, 0, 255, 255]))).toBe(0.5);
    expect(scratchedRatio(pixels([0, 0, 0, 0]))).toBe(1);
  });
  it("ignores pixels outside the round seal (sampled as fully transparent from the start)", () => {
    // A circle covers ~78.5% of its square canvas; the corners start transparent.
    expect(scratchedRatio(pixels([0, 255, 255, 255]), pixels([0, 255, 255, 255]))).toBe(0);
    expect(scratchedRatio(pixels([0, 0, 255, 255]), pixels([0, 255, 255, 255]))).toBeCloseTo(1 / 3);
  });
  it("handles empty input without dividing by zero", () => {
    expect(scratchedRatio(new Uint8ClampedArray())).toBe(0);
  });
  it("reveals once a little over half the seal is scratched", () => {
    expect(SCRATCH_REVEAL_RATIO).toBeGreaterThan(0.3);
    expect(SCRATCH_REVEAL_RATIO).toBeLessThan(0.7);
  });
  it("hides the configured wedding date under the seals", () => {
    const values = weddingSettings.saveTheDate.map((seal) => seal.value);
    expect(values).toHaveLength(3);
    for (const value of values)
      expect(weddingSettings.dateText.replace("–", " & ")).toContain(value.replace("–", " & "));
  });
});
