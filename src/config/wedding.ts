import cover from '@/assets/wedding-cover.webp';
import opening from '@/assets/ganesh-opening.webp';
import mata from '@/assets/mata-poojan.webp';
import mehndi from '@/assets/mehndi.webp';
import kalash from '@/assets/ganesh-kalash.webp';
import haldi from '@/assets/haldi.webp';
import sangeet from '@/assets/sangeet.webp';
import baarat from '@/assets/baarat.webp';
import reception from '@/assets/reception.webp';
import phere from '@/assets/phere.webp';

// Replace the optional video, family names and Maps URLs here when ready.
export const weddingSettings = {
  groom: 'Nimish', bride: 'Sanjana', dateText: '22–24 January 2027',
  countdownTarget: '2027-01-23T08:00:00+05:30',
  tagline: 'Three days. Countless memories. One beautiful beginning.',
  introVideo: { enabled: true, src: '/videos/wedding-intro.mp4', skipEnabled: true },
  illustrations: { cover, opening, closing: reception },
  blessing: 'With the blessings of Lord Ganesha, we invite you to celebrate our beautiful beginning.',
  closing: 'Your presence will make these moments even more special.',
};
export const family = {
  groom: { grandparents: ['Grandfather Name', 'Grandmother Name'], parents: ['Father Name', 'Mother Name'] },
  bride: { grandparents: ['Grandfather Name', 'Grandmother Name'], parents: ['Father Name', 'Mother Name'] },
};
export const venues: Record<string, {name: string; address: string; mapsUrl: string}> = {
  'chhatrapati-nagar': { name: 'Chhatrapati Nagar', address: '', mapsUrl: '' },
  'chota-bangrda': { name: 'Chota Bangrda', address: '', mapsUrl: '' },
  'vallabha-garden': { name: 'Vallabha Garden, Mhow', address: '', mapsUrl: '' },
};
export type WeddingEvent = {
  id: string; title: string; displayTitle: string; date: string; day: string; time: string;
  venueId: string; theme: string; description: string; illustration: string; illustrationAlt: string;
  decorations: string; schedule?: {time: string; title: string; displayTitle: string}[];
};
export const weddingEvents: WeddingEvent[] = [
  { id: 'mata-poojan', title: 'Mata Poojan', displayTitle: 'Shubh Aarambh', date: '22 January 2027', day: '22', time: '9:00 AM', venueId: 'chhatrapati-nagar', theme: 'spiritual', description: 'A prayer, a blessing, and the first step towards our beautiful beginning.', illustration: mata, illustrationAlt: 'Temple arch, sacred kalash, marigold offerings and glowing brass diyas', decorations: 'diya' },
  { id: 'mehndi', title: 'Mehndi', displayTitle: 'Rangon Ki Shaam', date: '22 January 2027', day: '22', time: '3:00 PM onwards', venueId: 'chota-bangrda', theme: 'botanical', description: 'Hands adorned with henna. An afternoon filled with laughter, music and a little magic.', illustration: mehndi, illustrationAlt: 'Women celebrating mehndi under flowering vines with dholak and embroidered cushions', decorations: 'petals' },
  { id: 'ganesh-kalash', title: 'Ganesh Pooja + Chalk / Kalash', displayTitle: 'Mangal Aarambh', date: '23 January 2027', day: '23', time: '8:00 AM – 10:30 AM', venueId: 'vallabha-garden', theme: 'heritage', description: 'Honouring our traditions, surrounded by the love and blessings of our families.', illustration: kalash, illustrationAlt: 'Ornamental heritage arch with mango-leaf kalash, rangoli and symmetrical diyas', decorations: 'mandala', schedule: [{time: '8:00 AM', title: 'Ganesh Pooja', displayTitle: 'Mangal Aarambh'}, {time: '9:00 AM – 10:30 AM', title: 'Chalk / Kalash', displayTitle: 'Chalk / Kalash'}] },
  { id: 'haldi', title: 'Sagai & Haldi Carnival', displayTitle: 'Riwaaz & Rang', date: '23 January 2027', day: '23', time: '12:30 PM – 3:30 PM', venueId: 'vallabha-garden', theme: 'turmeric', description: 'A promise of forever, a splash of haldi, and a whole lot of sunshine.', illustration: haldi, illustrationAlt: 'Joyful family haldi ceremony with yellow flowers, turmeric bowls and festive umbrellas', decorations: 'petals' },
  { id: 'sangeet', title: 'Sangeet & DJ', displayTitle: 'Taal • Thumke • Tashan', date: '23 January 2027', day: '23', time: '9:00 PM – 11:00 PM', venueId: 'vallabha-garden', theme: 'disco', description: 'Under the stars and on the dance floor. A night of music, sparkle and unforgettable moves.', illustration: sangeet, illustrationAlt: 'Glamorous Indian couple dancing beneath a mirror disco ball and golden stage lights', decorations: 'disco' },
  { id: 'baarat', title: 'Baarat', displayTitle: 'Dulha Ki Sawari', date: '24 January 2027', day: '24', time: '10:00 AM', venueId: 'vallabha-garden', theme: 'procession', description: 'Dhol beats, dancing feet, and a groom on his way to forever.', illustration: baarat, illustrationAlt: 'Groom on a white horse leading a joyful baraat procession with dhol players and parasols', decorations: 'confetti' },
  { id: 'reception', title: 'Reception', displayTitle: 'Milne Ki Mehfil', date: '24 January 2027', day: '24', time: '12:00 PM', venueId: 'vallabha-garden', theme: 'floral', description: 'An afternoon of warm embraces and cherished company. Come celebrate with us.', illustration: reception, illustrationAlt: 'Bride and groom under an elegant palace arch with blush roses and warm lanterns', decorations: 'vines' },
  { id: 'phere', title: 'Sacred Wedding Phere', displayTitle: 'Saat Phere, Ek Safar', date: '24 January 2027', day: '24', time: '3:00 PM', venueId: 'vallabha-garden', theme: 'sacred', description: 'Seven sacred vows. Two journeys becoming one. With you as witness to our forever.', illustration: phere, illustrationAlt: 'Bride and groom taking phere around sacred fire beneath a floral mandap as two flower paths become one', decorations: 'mandala' },
];
