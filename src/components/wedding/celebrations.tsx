import { weddingEvents, venues, type WeddingEvent } from '@/config/wedding';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Artwork, LocationButton, Ornament } from './primitives';

export function Timeline() {
  return <section id="timeline" className="timeline-section section-anchor">
    <p className="eyebrow">Three days of togetherness</p>
    <h2>Our wedding celebrations</h2>
    <Ornament />
    <div className="timeline-days">{['22', '23', '24'].map((day, index) => <div className="timeline-day" key={day}>
      <div className="day-heading"><span>{day}</span><div><p>January 2027</p><small>{['Friday', 'Saturday', 'Sunday'][index]}</small></div></div>
      <ol>{weddingEvents.filter(event => event.day === day).flatMap(event => (event.schedule ?? [{time: event.time, title: event.title, displayTitle: event.displayTitle}]).map((slot, slotIndex) =>
        <li key={`${event.id}-${slotIndex}`}><a href={`#${event.id}`}><time>{slot.time}</time><strong>{slot.displayTitle}</strong><span>{slot.title}</span><small>{venues[event.venueId]?.name}</small><ArrowUpRight aria-hidden="true" /></a></li>
      ))}</ol>
    </div>)}</div>
    <Button variant="stationery" asChild><a href="#celebrations">Let the celebrations unfold <ArrowDown /></a></Button>
  </section>;
}
function Decorations({type}: {type: string}) {
  return <div className={`decorations decorations-${type}`} aria-hidden="true">
    {type === 'disco' ? <><div className="disco-reflection" /><div className="light-beam" /><div className="music-wave">{Array.from({length: 12}, (_, i) => <i key={i} />)}</div></> :
      Array.from({length: type === 'mandala' ? 2 : 7}, (_, i) => <i key={i}>{type === 'mandala' ? '✺' : type === 'diya' ? '✧' : type === 'confetti' ? '✦' : '❀'}</i>)}
  </div>;
}
export function EventChapter({event, index}: {event: WeddingEvent; index: number}) {
  return <section id={event.id} className={`event-chapter section-anchor theme-${event.theme}`}>
    <div className="event-art"><Artwork src={event.illustration} alt={event.illustrationAlt} /></div>
    <Decorations type={event.decorations} />
    <div className="chapter-content">
      <p className="eyebrow chapter-number">Celebration {String(index + 1).padStart(2, '0')} <span> / </span> {event.date}</p>
      <Ornament />
      <h2>{event.displayTitle}</h2>
      <p className="event-ceremony">{event.title}</p>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <p className="event-date">{event.date}</p>
        {event.schedule ? <div className="event-subtimes">{event.schedule.map(slot => <p key={slot.title}><strong>{slot.time}</strong><span>{slot.title}</span></p>)}</div> : <p className="event-time">{event.time}</p>}
        <p className="event-venue">{venues[event.venueId]?.name}</p>
      </div>
      <LocationButton venueId={event.venueId} />
    </div>
    <div className="chapter-footer" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span><span>◆</span><span>N & S</span></div>
  </section>;
}
