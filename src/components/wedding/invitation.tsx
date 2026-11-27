import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X, Share2, Link as LinkIcon, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  weddingSettings as settings,
  family,
  venues,
  weddingEvents,
  type FamilySide,
} from "@/config/wedding";
import { artworkSources } from "@/config/artwork";
import { Artwork, VenueLink } from "./primitives";
import { ArchOutline, FloralCorner, LotusDivider, Mandala, Pavilion, Petals } from "./ornaments";
import { SaveTheDate } from "./scratch";
import { Celebrations, Timeline } from "./celebrations";
import { useInvitationMotion } from "./motion";

const stagger = (step: number) => ({ "--d": step }) as CSSProperties;
const NAV: [string, string][] = [
  ["Home", "home"],
  ["Family", "family"],
  ["Celebrations", "celebrations"],
  ["Timeline", "timeline"],
  ["Venues", "venues"],
];

function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="invitation-nav">
      <a
        href="#home"
        className="nav-monogram"
        aria-label={`${settings.groom} and ${settings.bride}, back to top`}
      >
        {settings.groom[0]}
        <span>&amp;</span>
        {settings.bride[0]}
      </a>
      <nav
        id="invitation-menu"
        aria-label="Invitation chapters"
        className={open ? "nav-links nav-open" : "nav-links"}
      >
        {NAV.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <p className="nav-date">{settings.dateText}</p>
      <Button
        className="mobile-menu"
        variant="ghost"
        size="icon"
        aria-controls="invitation-menu"
        aria-label={open ? "Close invitation menu" : "Open invitation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
    </header>
  );
}

function Hero() {
  const wide = artworkSources(settings.illustrations.coverWide);
  return (
    <section id="home" className="hero-section section-anchor" aria-labelledby="hero-names">
      <div className="hero-art" data-parallax="0.12" data-parallax-mobile>
        <picture>
          <source
            media="(min-width: 761px) and (min-aspect-ratio: 1/1)"
            srcSet={wide?.srcSet ?? settings.illustrations.coverWide}
            sizes="100vw"
          />
          <Artwork
            src={settings.illustrations.cover}
            alt="Illustrated Indian bride and groom on a palace terrace, framed by a floral arch with peacocks"
            portrait
            eager
            sizes="100vw"
          />
        </picture>
      </div>
      <Petals className="hero-petals" />
      <div className="hero-copy">
        <p className="hero-invocation" lang="sa" style={stagger(0)}>
          {settings.invocation}
        </p>
        <p className="eyebrow" style={stagger(1)}>
          Together with our families
        </p>
        <h1 id="hero-names" style={stagger(2)}>
          <span className="name">{settings.groom}</span>
          <span className="amp">&amp;</span>
          <span className="name">{settings.bride}</span>
        </h1>
        <div style={stagger(3)}>
          <LotusDivider />
        </div>
        <p className="hero-date" style={stagger(4)}>
          {settings.dateText}
        </p>
        <p className="hero-message" style={stagger(5)}>
          {settings.heroMessage}
        </p>
      </div>
      <a href="#family" className="scroll-cue">
        <span className="scroll-line" aria-hidden="true" />
        <span>Begin the story</span>
      </a>
    </section>
  );
}

function FamilyPanel({ side, name }: { side: FamilySide; name: string }) {
  return (
    <article className="family-panel" data-reveal>
      <ArchOutline className="family-arch" />
      <FloralCorner className="corner bl" />
      <FloralCorner className="corner br" />
      <p className="eyebrow">{side.label}</p>
      <h3>{name}</h3>
      {side.parents.length > 0 && (
        <>
          <p className="family-label">Beloved {side.relation} of</p>
          <p className="family-names">{side.parents.join(" & ")}</p>
        </>
      )}
      {side.grandparents.length > 0 && (
        <>
          <p className="family-label">With the blessings of</p>
          <p className="family-names is-elders">
            {side.grandparents.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </p>
        </>
      )}
    </article>
  );
}

function Family() {
  return (
    <section id="family" className="family-section section-anchor" aria-labelledby="family-title">
      <div className="family-heading" data-reveal>
        <p className="family-invocation" lang="sa">
          {settings.invocation}
        </p>
        <p className="shloka" lang="sa">
          {settings.shloka.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <LotusDivider />
        <p className="eyebrow">With the blessings of our elders</p>
        <h2 id="family-title">
          A celebration <em>of two families</em>
        </h2>
        <p className="family-intro">{settings.familyBlessing}</p>
      </div>
      <div className="families">
        <FamilyPanel side={family.groom} name={settings.groom} />
        <div className="family-union" aria-hidden="true">
          <Mandala className="union-mandala" />
          <span>&amp;</span>
        </div>
        <FamilyPanel side={family.bride} name={settings.bride} />
      </div>
      <p className="family-blessing" data-reveal>
        {settings.blessing}
      </p>
    </section>
  );
}

function Venues() {
  return (
    <section id="venues" className="venues-section section-anchor" aria-labelledby="venues-title">
      <header data-reveal>
        <p className="eyebrow">Where the memories begin</p>
        <h2 id="venues-title">Venues &amp; guest information</h2>
        <LotusDivider />
      </header>
      <div className="venue-list">
        {Object.entries(venues).map(([id, venue], index) => {
          const hosted = weddingEvents.filter((event) => event.venueId === id);
          return (
            <article className="venue-card" key={id} data-reveal style={stagger(index)}>
              <Pavilion className="venue-illustration" />
              <span className="venue-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>
                <VenueLink venueId={id} />
              </h3>
              {/* <p className="venue-address">{venue.address || "Full address will be shared soon"}</p> */}
              {hosted.length > 0 && (
                <ul className="venue-events" aria-label={`Celebrations at ${venue.name}`}>
                  {hosted.map((event) => (
                    <li key={event.id}>
                      <a href={`#${event.id}`}>{event.title}</a>
                      <span>
                        {event.day} Jan · {event.time}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function useInvitationUrl() {
  const [url, setUrl] = useState(settings.siteUrl);
  useEffect(() => {
    if (!settings.siteUrl) setUrl(`${window.location.origin}${window.location.pathname}`);
  }, []);
  return url;
}

function Finale() {
  const url = useInvitationUrl();
  const [status, setStatus] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  const text = `You're invited to celebrate the wedding festivities of ${settings.groom} & ${settings.bride}! ❤️\n${settings.dateText}\nWe'd love to celebrate these beautiful moments with you.`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const share = async () => {
    try {
      await navigator.share({ title: `${settings.groom} Weds ${settings.bride}`, text, url });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setStatus("Sharing is unavailable here — try WhatsApp or copy the link");
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Invitation link copied");
      window.setTimeout(() => setStatus(""), 4000);
    } catch {
      setManualUrl(url);
      setStatus("Select the invitation link to copy it");
    }
  };
  const finaleArt = artworkSources(settings.illustrations.finale);
  return (
    <section id="finale" className="finale-section section-anchor" aria-labelledby="finale-names">
      <Mandala className="finale-mandala" petals={24} />
      <Petals className="finale-petals" count={6} />
      <div className="finale-window" data-reveal>
        <picture>
          {finaleArt?.mobile && <source media="(max-width: 760px)" srcSet={finaleArt.mobile} />}
          <Artwork
            src={settings.illustrations.finale}
            alt="The bride and groom beneath a palace arch of blush roses and lanterns"
            sizes="(max-width: 760px) 80vw, 440px"
          />
        </picture>
        <ArchOutline className="finale-arch" />
        <FloralCorner className="corner bl" />
        <FloralCorner className="corner br" />
      </div>
      <div className="finale-copy">
        <p className="finale-message" data-reveal>
          {settings.finaleMessage}
        </p>
        <LotusDivider />
        <p className="eyebrow" data-reveal>
          With love,
        </p>
        <h2 id="finale-names" data-reveal style={stagger(1)}>
          <span>{settings.groom}</span>
          <span className="amp">&amp;</span>
          <span>{settings.bride}</span>
        </h2>
        <p className="finale-date" data-reveal style={stagger(2)}>
          {settings.dateText}
        </p>
        <p className="finale-closing" data-reveal style={stagger(3)}>
          {settings.closing}
        </p>
        <div className="share-controls" data-reveal style={stagger(4)}>
          <Button variant="invitation" asChild>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Share on WhatsApp
            </a>
          </Button>
          {canShare && (
            <Button variant="stationery" onClick={share}>
              <Share2 aria-hidden="true" />
              More ways to share
            </Button>
          )}
          <Button variant="stationery" onClick={copy}>
            {status === "Invitation link copied" ? (
              <Check aria-hidden="true" />
            ) : (
              <LinkIcon aria-hidden="true" />
            )}
            Copy invitation link
          </Button>
        </div>
        <p className="share-status" role="status">
          {status}
        </p>
        {manualUrl && (
          <input
            className="manual-link"
            aria-label="Invitation link"
            value={manualUrl}
            readOnly
            onFocus={(e) => e.target.select()}
          />
        )}
      </div>
      <footer>
        Made with love, for a lifetime of memories <span aria-hidden="true">❧</span>
      </footer>
    </section>
  );
}

export function Invitation() {
  useInvitationMotion();
  return (
    <>
      <a href="#family" className="skip-link">
        Skip to invitation details
      </a>
      <Navigation />
      <main>
        <Hero />
        <Family />
        <SaveTheDate />
        <Celebrations />
        <Timeline />
        <Venues />
        <Finale />
      </main>
    </>
  );
}
