import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BackgroundMusic, startMusic } from "@/components/wedding/music";
import { weddingSettings } from "@/config/wedding";

describe("Background music", () => {
  let play: ReturnType<typeof vi.spyOn>;
  let pause: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    // jsdom has no media playback: emulate play/pause and their events.
    play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      Object.defineProperty(this, "paused", { configurable: true, value: false });
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
    pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      Object.defineProperty(this, "paused", { configurable: true, value: true });
      this.dispatchEvent(new Event("pause"));
    });
  });
  afterEach(() => vi.restoreAllMocks());

  it("loops the configured song", () => {
    const ref = createRef<HTMLAudioElement>();
    render(<BackgroundMusic audioRef={ref} showControl />);
    expect(ref.current?.getAttribute("src")).toBe(weddingSettings.music.src);
    expect(ref.current?.loop).toBe(true);
  });

  it("starts from the opening tap and can be paused and resumed by the guest", () => {
    const ref = createRef<HTMLAudioElement>();
    render(<BackgroundMusic audioRef={ref} showControl />);
    act(() => void startMusic(ref.current));
    expect(play).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /pause music/i }));
    expect(pause).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /play music/i }));
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("hides the control while the opening card is still closed", () => {
    const ref = createRef<HTMLAudioElement>();
    render(<BackgroundMusic audioRef={ref} showControl={false} />);
    expect(screen.queryByRole("button", { name: /music/i })).toBeNull();
  });

  it("does not throw when the browser blocks playback", async () => {
    play.mockImplementation(() => Promise.reject(new DOMException("blocked", "NotAllowedError")));
    const ref = createRef<HTMLAudioElement>();
    render(<BackgroundMusic audioRef={ref} showControl />);
    await expect(startMusic(ref.current)).resolves.toBe(false);
    expect(screen.getByRole("button", { name: /play music/i })).toBeTruthy();
  });
});
