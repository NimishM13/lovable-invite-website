import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { weddingSettings as settings } from '@/config/wedding';
import { Artwork, Ornament } from './primitives';

export function Entry({onEnter}: {onEnter: () => void}) {
  const [video, setVideo] = useState(Boolean(settings.introVideo.enabled && settings.introVideo.src));
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = '';};
  }, []);
  useEffect(() => {
    if (!video) { enterRef.current?.focus({preventScroll: true}); return; }
    const timeout = window.setTimeout(() => setVideo(false), 12000);
    const play = videoRef.current?.play();
    play?.catch(() => setVideo(false));
    return () => window.clearTimeout(timeout);
  }, [video]);
  const enter = () => {setLeaving(true); window.setTimeout(onEnter, 600);};
  return <div className={`entry-screen ${leaving ? 'entry-leaving' : ''}`}>
    {video ? <div className="video-intro">
      <video ref={videoRef} src={settings.introVideo.src} autoPlay muted playsInline onEnded={() => setVideo(false)} onError={() => setVideo(false)} aria-label="Wedding introduction" />
      {settings.introVideo.skipEnabled && <Button variant="stationery" className="skip-intro" onClick={() => setVideo(false)}>Skip intro <ArrowRight /></Button>}
    </div> : <section className="ganesh-page" aria-label="An auspicious beginning">
      <Artwork src={settings.illustrations.opening} alt="Lord Ganesha framed by marigold garlands, lotus flowers and brass diyas" eager portrait />
      <div className="entry-monogram">N <span>&</span> S</div>
      <div className="ganesh-copy">
        <p className="invocation" lang="sa">ॐ श्री गणेशाय नमः</p>
        <Ornament />
        <p className="shloka" lang="sa">वक्रतुण्ड महाकाय<br />सूर्यकोटि समप्रभः ।<br />निर्विघ्नं कुरु मे देव<br />शुभकार्येषु सर्वदा ॥</p>
        <p className="entry-blessing">{settings.blessing}</p>
        <Button ref={enterRef} variant="invitation" onClick={enter}>Enter invitation <ArrowRight /></Button>
        <p className="entry-date">{settings.dateText}</p>
      </div>
    </section>}
  </div>;
}
