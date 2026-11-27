import { useEffect, useState } from "react";
import { weddingSettings } from "@/config/wedding";

export function remainingTime(target: string, now: number) {
  const timestamp = Date.parse(target);
  if (!Number.isFinite(timestamp)) return null;
  const seconds = Math.max(0, Math.floor((timestamp - now) / 1000));
  return {
    total: seconds,
    values: [
      Math.floor(seconds / 86400),
      Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60,
      seconds % 60,
    ],
  };
}

const LABELS = ["Days", "Hours", "Minutes", "Seconds"];

export function formatTarget(target: string) {
  const time = Date.parse(target);
  if (!Number.isFinite(time)) return null;
  return `${new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(time))} IST`;
}

/** Live days/hours/minutes/seconds to the configured start; static until mounted (hydration-safe). */
export function CountdownDigits() {
  // undefined until mounted: the server and first client render show the same static date.
  const [remaining, setRemaining] = useState<ReturnType<typeof remainingTime> | undefined>(
    undefined,
  );
  useEffect(() => {
    let timer: number | undefined;
    const update = () => {
      const next = remainingTime(weddingSettings.countdownTarget, Date.now());
      setRemaining(next);
      return Boolean(next && next.total > 0);
    };
    if (update())
      timer = window.setInterval(() => {
        if (!update()) window.clearInterval(timer);
      }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const targetText = formatTarget(weddingSettings.countdownTarget);
  return (
    <>
      {remaining === undefined || remaining === null ? (
        <p className="countdown-static">{weddingSettings.dateText}</p>
      ) : remaining.total === 0 ? (
        <p className="countdown-complete">
          The wedding day is here — thank you for being part of our story.
        </p>
      ) : (
        <div
          className="countdown-digits"
          role="timer"
          aria-live="off"
          aria-label={`${remaining.values[0]} days, ${remaining.values[1]} hours and ${remaining.values[2]} minutes ${weddingSettings.countdownLabel}`}
        >
          {remaining.values.map((value, index) => (
            <div key={LABELS[index]} className="countdown-unit">
              <span>{String(value).padStart(2, "0")}</span>
              <small>{LABELS[index]}</small>
            </div>
          ))}
        </div>
      )}
      {targetText && (
        <p className="countdown-note">
          {remaining?.total === 0 ? "Began" : "Until"} {targetText}
        </p>
      )}
    </>
  );
}
