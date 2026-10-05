import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Entry } from '@/components/wedding/entry';
import { Invitation } from '@/components/wedding/invitation';
import { weddingSettings } from '@/config/wedding';

export const Route = createFileRoute('/')({
  head: () => ({meta: [
    {title: `${weddingSettings.groom} Weds ${weddingSettings.bride} — ${weddingSettings.dateText}`},
    {name: 'description', content: `You're invited to celebrate the wedding of ${weddingSettings.groom} and ${weddingSettings.bride}, ${weddingSettings.dateText}. Three days of love, blessings and beautiful beginnings.`},
    {property: 'og:title', content: `${weddingSettings.groom} Weds ${weddingSettings.bride}`},
    {property: 'og:description', content: `${weddingSettings.dateText} — ${weddingSettings.tagline} Join us for our wedding celebrations.`},
    {property: 'og:type', content: 'website'},
    {name: 'twitter:card', content: 'summary_large_image'},
  ]}),
  component: WeddingInvitation,
});
function WeddingInvitation() {
  const [entered, setEntered] = useState(false);
  return <>{!entered && <Entry onEnter={() => {setEntered(true); window.scrollTo({top: 0, behavior: 'instant'});}} />}<div className={entered ? 'invitation-entered' : ''} inert={!entered} aria-hidden={!entered}><Invitation /></div></>;
}
