import { useEffect, useState } from 'react';
import { weddingSettings } from '@/config/wedding';
import { Ornament } from './primitives';
export function remainingTime(target: string, now: number) {
  const timestamp = Date.parse(target);
  if (!Number.isFinite(timestamp)) return null;
  const seconds = Math.max(0, Math.floor((timestamp - now) / 1000));
  return { total: seconds, values: [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60] };
}
export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof remainingTime>>(null);
  useEffect(() => {
    const update = () => setRemaining(remainingTime(weddingSettings.countdownTarget, Date.now()));
    update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer);
  }, []);
  return <section className="countdown-section" aria-label="Wedding countdown">
    <p className="eyebrow">Counting down to the celebration</p>
    <h2>A little closer to forever</h2>
    <Ornament />
    {remaining === null ? <p>{weddingSettings.dateText}</p> : remaining.total === 0 ? <p className="eyebrow celebration-started">The celebrations have begun!</p> :
      <div className="countdown-digits" role="timer" aria-label="Time until the wedding celebration">
        {remaining.values.map((value, index) => <div key={index}><span>{String(value).padStart(2, '0')}</span><small>{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</small></div>)}
      </div>}
    <p className="countdown-note">23 January 2027 · 8:00 AM IST</p>
  </section>;
}
