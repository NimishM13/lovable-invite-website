import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { venues } from "@/config/wedding";
import { artworkSources } from "@/config/artwork";
import { LotusDivider } from "./ornaments";

export function Artwork({
  src,
  alt,
  className = "",
  eager = false,
  portrait = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  portrait?: boolean;
  sizes?: string | undefined;
}) {
  const [failed, setFailed] = useState(false);
  // A failed image leaves a quiet themed panel so the text composition still reads well.
  if (failed)
    return <div className={`artwork-fallback ${className}`} role="img" aria-label={alt} />;
  return (
    <img
      className={`artwork ${className}`}
      src={src}
      srcSet={artworkSources(src)?.srcSet}
      sizes={sizes}
      alt={alt}
      width={portrait ? 1024 : 1536}
      height={portrait ? 1536 : 1024}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/** Responsive artwork with a dedicated phone crop when one exists. */
export function ArtPicture({
  src,
  alt,
  className = "",
  eager = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string | undefined;
}) {
  const mobile = artworkSources(src)?.mobile;
  return (
    <picture className={className}>
      {mobile && <source media="(max-width: 760px)" srcSet={mobile} />}
      <Artwork src={src} alt={alt} eager={eager} sizes={sizes} />
    </picture>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return <LotusDivider className={className} />;
}

/** The venue name itself, linked to Google Maps when a secure link is configured. */
export function VenueLink({ venueId, className = "" }: { venueId: string; className?: string }) {
  const venue = venues[venueId];
  if (!venue) return null;
  if (!/^https:\/\//i.test(venue.mapsUrl)) return <span className={className}>{venue.name}</span>;
  return (
    <a
      className={`venue-link ${className}`}
      href={venue.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${venue.name} (opens Google Maps)`}
    >
      {venue.name}
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}
