import { useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { venues } from '@/config/wedding';
import { artworkSources } from '@/config/artwork';

export function Artwork({src, alt, className = '', eager = false, portrait = false}: {src: string; alt: string; className?: string; eager?: boolean; portrait?: boolean}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`artwork-fallback ${className}`} aria-hidden="true"><span>✺</span></div>;
  return <img className={`artwork ${className}`} src={src} srcSet={artworkSources(src)?.srcSet} sizes="(max-width: 760px) 100vw, 100vw" alt={alt} width={portrait ? 1024 : 1536} height={portrait ? 1536 : 1024} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
export function Ornament({className = ''}: {className?: string}) {
  return <div className={`ornament ${className}`} aria-hidden="true"><span /><b>❧</b><span /></div>;
}
export function LocationButton({venueId}: {venueId: string}) {
  const venue = venues[venueId];
  const valid = venue?.mapsUrl && /^https?:\/\//i.test(venue.mapsUrl);
  if (!venue) return null;
  return <div className="location-control">
    {valid ? <Button variant="stationery" asChild><a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin />View location<ArrowUpRight /></a></Button>
      : <><Button variant="stationery" disabled aria-describedby={`map-note-${venueId}`}><MapPin />View location</Button><small id={`map-note-${venueId}`}>Location link coming soon</small></>}
  </div>;
}
