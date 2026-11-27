import { useEffect, useRef, useState } from "react";
import { weddingSettings as settings } from "@/config/wedding";
import { LotusDivider, Mandala, Petals, Seal } from "./ornaments";

const OPEN_MS = 1500;
const OPEN_MS_REDUCED = 250;

/**
 * The opening: a gatefold invitation card painted with Lord Ganesha. Breaking the seal swings
 * both leaves open onto the invitation. “Skip intro” enters immediately; Enter/Escape work too.
 */
export function Entry({ onEnter, onGesture }: { onEnter: () => void; onGesture?: () => void }) {
  const [opening, setOpening] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  const finish = () => {
    if (!done.current) {
      done.current = true;
      onEnter();
    }
  };
  const enterNow = () => {
    onGesture?.();
    finish();
  };
  const open = () => {
    if (opening) return;
    onGesture?.();
    setOpening(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(finish, reduce ? OPEN_MS_REDUCED : OPEN_MS);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    screenRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") enterNow();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaf = (side: "left" | "right") => (
    <div className={`gate-leaf gate-${side}`} aria-hidden="true">
      <div
        className="gate-face"
        style={{ backgroundImage: `url(${settings.illustrations.opening})` }}
      />
      <div className="gate-edge" />
    </div>
  );

  return (
    <div
      className={`entry-screen ${opening ? "is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-names"
      ref={screenRef}
      tabIndex={-1}
    >
      <Mandala className="entry-backdrop-mandala" />
      <button type="button" className="skip-intro" onClick={enterNow}>
        Skip intro
      </button>
      <div className="gate">
        {leaf("left")}
        {leaf("right")}
        <div className="gate-copy">
          <p className="gate-eyebrow">The wedding of</p>
          <h1 id="entry-names" className="gate-names">
            {settings.groom}
            <span>&amp;</span>
            {settings.bride}
          </h1>
          <LotusDivider />
          <p className="gate-date">{settings.dateText}</p>
          <button
            type="button"
            className="seal-button"
            onClick={open}
            aria-label="Open the invitation"
          >
            <Seal initials={[settings.groom.charAt(0), settings.bride.charAt(0)]} />
            <span>Tap the seal to open</span>
          </button>
        </div>
        <Petals className="gate-petals" count={5} />
      </div>
    </div>
  );
}
