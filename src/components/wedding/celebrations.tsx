import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  celebrationDays,
  ceremonies,
  weddingEvents,
  type CelebrationDay,
  type WeddingEvent,
} from "@/config/wedding";
import { ArtPicture, VenueLink } from "./primitives";
import { ArchOutline, Diya, FloralCorner, LotusDivider, Mandala, Petals, Toran } from "./ornaments";

const stagger = (step: number) => ({ "--d": step }) as CSSProperties;

function DayDivider({ day }: { day: CelebrationDay }) {
  return (
    <header id={`day-${day.day}`} className="day-divider section-anchor">
      <Toran className="day-toran" swags={10} />
      <div className="day-divider-inner" data-reveal>
        <p className="eyebrow">{day.chapter}</p>
        <p className="day-numeral" aria-hidden="true">
          {day.day}
        </p>
        <p className="day-date">
          {day.weekday} · {day.day} January 2027
        </p>
        <h3>{day.title}</h3>
        <LotusDivider />
        <p className="day-subtitle">{day.subtitle}</p>
      </div>
    </header>
  );
}

/** Theme-specific foreground details, kept light so the painting leads. */
function ChapterAccents({ event }: { event: WeddingEvent }) {
  switch (event.theme) {
    case "spiritual":
      return (
        <div className="accent-diyas" aria-hidden="true">
          <Diya />
          <Diya />
          <Diya />
        </div>
      );
    case "turmeric":
      return <Petals className="accent-petals" count={6} />;
    case "evening":
      return (
        <div className="accent-lights" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={stagger(i)} />
          ))}
        </div>
      );
    case "sacred":
      return (
        <>
          <div className="accent-glow" aria-hidden="true" />
          <Mandala className="accent-mandala" petals={24} />
          <Petals className="accent-petals" count={5} />
        </>
      );
    case "moonlit":
      return <Petals className="accent-petals" count={5} />;
    case "botanical":
    case "heritage":
      return <Mandala className="accent-mandala" />;
    default:
      return null;
  }
}

function ChapterText({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <div className="chapter-content">
      <p className="eyebrow chapter-number" data-reveal style={stagger(0)}>
        Celebration {String(index + 1).padStart(2, "0")}
        <span aria-hidden="true"> · </span>
        {event.date}
      </p>
      <h2 id={`${event.id}-title`} data-reveal style={stagger(1)}>
        {event.displayTitle}
      </h2>
      <p className="event-ceremony" data-reveal style={stagger(2)}>
        {event.title}
      </p>
      <LotusDivider />
      <p className="event-description" data-reveal style={stagger(3)}>
        {event.description}
      </p>
      <dl className="event-details" data-reveal style={stagger(4)}>
        <div>
          <dt>Date</dt>
          <dd>{event.date}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>
            {event.schedule
              ? event.schedule.map((slot) => (
                  <span key={slot.title} className="event-slot">
                    <strong>{slot.time}</strong> {slot.title}
                  </span>
                ))
              : event.time}
          </dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>
            <VenueLink venueId={event.venueId} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Frame({ event, children }: { event: WeddingEvent; children: ReactNode }) {
  return (
    <div className={`chapter-art-frame frame-${event.layout}`} data-reveal>
      {children}
      {event.layout === "split" && (
        <>
          <ArchOutline className="frame-arch" />
          <FloralCorner className="corner bl" />
          <FloralCorner className="corner br" />
        </>
      )}
      {event.layout === "split-reverse" && <span className="frame-rule" aria-hidden="true" />}
    </div>
  );
}

export function EventChapter({ event, index }: { event: WeddingEvent; index: number }) {
  const art = (
    <ArtPicture
      className="event-art"
      src={event.illustration}
      alt={event.illustrationAlt}
      sizes={
        event.layout === "canvas" || event.layout === "panorama"
          ? "100vw"
          : "(max-width: 760px) 100vw, 50vw"
      }
    />
  );
  return (
    <section
      id={event.id}
      className={`event-chapter section-anchor layout-${event.layout} theme-${event.theme}`}
      aria-labelledby={`${event.id}-title`}
    >
      {event.layout === "canvas" || event.layout === "panorama" ? (
        <div
          className="chapter-bleed"
          data-parallax={event.layout === "canvas" ? "0.08" : undefined}
        >
          {art}
        </div>
      ) : (
        <Frame event={event}>{art}</Frame>
      )}
      <ChapterAccents event={event} />
      <ChapterText event={event} index={index} />
      <div className="chapter-footer" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{event.day} · I · 2027</span>
      </div>
    </section>
  );
}

export function Celebrations() {
  return (
    <div id="celebrations" className="celebrations section-anchor">
      <header className="celebrations-intro" data-reveal>
        <p className="eyebrow">Two days of celebrations</p>
        <h2>
          Our story, <em>in chapters</em>
        </h2>
        <LotusDivider />
        <p>
          From the first prayer to the seventh vow — each celebration is a page in our story. We
          would be honoured to have you with us for every one.
        </p>
      </header>
      {celebrationDays.map((day) => (
        <div key={day.day} className="celebration-day">
          <DayDivider day={day} />
          {weddingEvents
            .filter((event) => event.day === day.day)
            .map((event) => (
              <EventChapter key={event.id} event={event} index={weddingEvents.indexOf(event)} />
            ))}
        </div>
      ))}
    </div>
  );
}

export function Timeline() {
  const all = ceremonies();
  return (
    <section
      id="timeline"
      className="timeline-section section-anchor"
      aria-labelledby="timeline-title"
    >
      <header data-reveal>
        <p className="eyebrow">At a glance</p>
        <h2 id="timeline-title">The wedding timeline</h2>
        <LotusDivider />
      </header>
      <div className="timeline-days">
        {celebrationDays.map((day, dayIndex) => (
          <div className="timeline-day" key={day.day} data-reveal style={stagger(dayIndex)}>
            <div className="day-heading">
              <span className="day-heading-numeral">{day.day}</span>
              <div>
                <p>{day.weekday}</p>
                <small>January 2027 · {day.title}</small>
              </div>
            </div>
            <ol>
              {all
                .filter((slot) => slot.event.day === day.day)
                .map((slot) => (
                  <li key={`${slot.event.id}-${slot.title}`}>
                    <span className="timeline-marker" aria-hidden="true" />
                    <time dateTime={slot.start}>{slot.time}</time>
                    <a href={`#${slot.event.id}`} className="timeline-title">
                      {slot.title}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                    <em>{slot.displayTitle}</em>
                    <p className="timeline-venue">
                      <VenueLink venueId={slot.event.venueId} />
                    </p>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
