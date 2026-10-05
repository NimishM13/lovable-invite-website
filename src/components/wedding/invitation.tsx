import { useState } from 'react';
import { Menu, X, Share2, Link as LinkIcon, Check, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { weddingSettings as settings, family, venues, weddingEvents } from '@/config/wedding';
import { Artwork, Ornament, LocationButton } from './primitives';
import { Countdown } from './countdown';
import { EventChapter, Timeline } from './celebrations';
import { artworkSources } from '@/config/artwork';

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="invitation-nav"><a href="#home" className="nav-monogram" aria-label="Nimish and Sanjana, home">N <span>&</span> S</a>
    <nav aria-label="Invitation chapters" className={open ? 'nav-links nav-open' : 'nav-links'}>
      {[['Home', 'home'], ['Family', 'family'], ['Celebrations', 'celebrations'], ['Timeline', 'timeline']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
    </nav><p className="nav-date">{settings.dateText}</p>
    <Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? 'Close invitation menu' : 'Open invitation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
  </header>;
}
function Family() {
  return <section id="family" className="family-section section-anchor">
    <p className="eyebrow">With the blessings of our family</p>
    <h2>Rooted in love.<br /><em>Surrounded by blessings.</em></h2>
    <Ornament />
    <p className="family-intro">Two families, a lifetime of love,<br />and a new story waiting to unfold.</p>
    <div className="families">{(['groom', 'bride'] as const).map(side => <div className="family-column" key={side}>
      <p className="eyebrow">{side === 'groom' ? "Groom’s family" : "Bride’s family"}</p><h3>{settings[side]}</h3>
      <small>With the blessings of</small><p>{family[side].grandparents.join(' & ')}</p>
      <small>Beloved {side === 'groom' ? 'son' : 'daughter'} of</small><p>{family[side].parents.join(' & ')}</p>
    </div>)}</div>
    <Ornament />
  </section>;
}
function Closing() {
  const [status, setStatus] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const invitationUrl = () => `${window.location.origin}${window.location.pathname}`;
  const share = async () => {
    const url = invitationUrl();
    const text = `You're invited to celebrate the wedding festivities of ${settings.groom} & ${settings.bride}! ❤️\n${settings.dateText}\nWe'd love to celebrate these beautiful moments with you.`;
    if (navigator.share) {
      try {await navigator.share({title: `${settings.groom} Weds ${settings.bride}`, text, url}); return;}
      catch (error) {if (error instanceof DOMException && error.name === 'AbortError') return;}
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener,noreferrer');
  };
  const copy = async () => {
    try {await navigator.clipboard.writeText(invitationUrl()); setStatus('Invitation link copied'); window.setTimeout(() => setStatus(''), 4000);}
    catch {setManualUrl(invitationUrl()); setStatus('Select the invitation link to copy it');}
  };
  return <section className="closing-section">
    <picture className="closing-art"><source media="(max-width: 760px)" srcSet={artworkSources(settings.illustrations.closing)?.mobile} /><Artwork src={settings.illustrations.closing} alt="Floral palace arch and illustrated wedding couple" /></picture>
    <div className="closing-copy"><Ornament /><p className="closing-message">{settings.closing}</p><p className="eyebrow">With love,</p><h2>{settings.groom}<span>&</span>{settings.bride}</h2><p className="closing-date">{settings.dateText}</p>
      <div className="share-controls"><Button variant="invitation" onClick={share}><Share2 />Share invitation</Button><Button variant="stationery" onClick={copy}>{status === 'Invitation link copied' ? <Check /> : <LinkIcon />}Copy invitation link</Button></div>
      <p className="share-status" role="status">{status}</p>{manualUrl && <input className="manual-link" aria-label="Invitation link" value={manualUrl} readOnly onFocus={e => e.target.select()} />}
    </div><footer>Made with love, for a lifetime of memories <span>❧</span></footer>
  </section>;
}
export function Invitation() {
  return <><Navigation /><main>
    <section id="home" className="hero-section section-anchor">
      <picture className="hero-picture"><source media="(min-width: 761px)" srcSet={artworkSources(settings.illustrations.coverWide)?.srcSet ?? settings.illustrations.coverWide} sizes="100vw" /><Artwork src={settings.illustrations.cover} alt="Illustrated Indian bride and groom within a hand-painted floral palace frame" portrait eager /></picture>
      <div className="hero-copy"><p className="eyebrow">Together with our families</p><h1>{settings.groom}<span>Weds</span>{settings.bride}</h1><Ornament /><p className="hero-date">{settings.dateText}</p><p className="hero-tagline">{settings.tagline}</p></div>
      <a href="#family" className="scroll-cue" aria-label="Explore the invitation"><ArrowDown /><span>A celebration of love</span></a>
    </section>
    <Family /><Countdown /><Timeline />
    <div id="celebrations" className="section-anchor">{weddingEvents.map((event, index) => <EventChapter key={event.id} event={event} index={index} />)}</div>
    <section id="venues" className="venues-section section-anchor"><p className="eyebrow">Where the memories begin</p><h2>Places of celebration</h2><Ornament /><div className="venue-list">{Object.entries(venues).map(([id, venue], index) => <div className="venue-item" key={id}><span className="venue-number">0{index + 1}</span><h3>{venue.name}</h3><p>{venue.address || 'Full address to follow'}</p><LocationButton venueId={id} /></div>)}</div></section>
    <Closing />
  </main></>;
}
