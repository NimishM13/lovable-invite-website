import { useEffect, useState, type RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { weddingSettings } from "@/config/wedding";

/**
 * Start the song. Call it straight from a guest's tap (the opening seal) — browsers, iOS Safari
 * especially, only allow sound that begins inside a user gesture. Resolves false if blocked.
 */
export function startMusic(audio: HTMLAudioElement | null) {
  if (!audio || !audio.paused) return Promise.resolve(Boolean(audio));
  return audio.play().then(
    () => true,
    () => false, // autoplay blocked or file unavailable: the play button stays available
  );
}

/** The looping song plus a small floating play/pause control (shown once the card is open). */
export function BackgroundMusic({
  audioRef,
  showControl,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  showControl: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  // Pause while the guest is in another app/tab, and pick up again when they return.
  useEffect(() => {
    let resume = false;
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        resume = !audio.paused;
        audio.pause();
      } else if (resume) {
        resume = false;
        void startMusic(audio);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [audioRef]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void startMusic(audio);
    else audio.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingSettings.music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {showControl && (
        <button
          type="button"
          className={`music-toggle${playing ? " is-playing" : ""}`}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={`${playing ? "Pause" : "Play"} music: ${weddingSettings.music.title}`}
          title={weddingSettings.music.title}
        >
          {playing ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      )}
    </>
  );
}
