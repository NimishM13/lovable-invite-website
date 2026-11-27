import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Entry } from "@/components/wedding/entry";
import { Invitation } from "@/components/wedding/invitation";
import { BackgroundMusic, startMusic } from "@/components/wedding/music";
import { weddingSettings } from "@/config/wedding";

const title = `${weddingSettings.groom} Weds ${weddingSettings.bride} — ${weddingSettings.dateText}`;
const description = `You're invited to celebrate the wedding of ${weddingSettings.groom} and ${weddingSettings.bride}, ${weddingSettings.dateText}. Two days of love, blessings and beautiful beginnings.`;
const shareImage = `${weddingSettings.siteUrl}${weddingSettings.illustrations.coverWide}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#F8F2E8" },
      { property: "og:title", content: `${weddingSettings.groom} Weds ${weddingSettings.bride}` },
      {
        property: "og:description",
        content: `${weddingSettings.dateText} — ${weddingSettings.tagline} Join us for our wedding celebrations.`,
      },
      { property: "og:type", content: "website" },
      ...(weddingSettings.siteUrl
        ? [{ property: "og:url", content: weddingSettings.siteUrl }]
        : []),
      { property: "og:image", content: shareImage },
      { property: "og:image:width", content: "1536" },
      { property: "og:image:height", content: "1024" },
      {
        property: "og:image:alt",
        content: "Illustrated Indian bride and groom beneath a floral palace arch",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImage },
    ],
  }),
  component: WeddingInvitation,
});

function WeddingInvitation() {
  const [entered, setEntered] = useState(false);
  // Deep links (e.g. a shared #venues link) skip the intro and land on their section
  // once the entry screen has released the page.
  const deepLink = useRef<HTMLElement | null>(null);
  const music = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) {
      deepLink.current = target;
      setEntered(true);
    }
  }, []);
  useEffect(() => {
    if (!entered || !deepLink.current) return;
    const target = deepLink.current;
    deepLink.current = null;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }));
  }, [entered]);
  const enter = () => {
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <>
      {!entered && <Entry onEnter={enter} onGesture={() => void startMusic(music.current)} />}
      <BackgroundMusic audioRef={music} showControl={entered} />
      <div
        className={entered ? "invitation-entered" : "invitation-waiting"}
        inert={!entered}
        aria-hidden={!entered}
      >
        <Invitation />
      </div>
    </>
  );
}
