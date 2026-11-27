import cover from "@/assets/wedding-cover.webp";
import coverWide from "@/assets/wedding-cover-wide.webp";
import opening from "@/assets/ganesh-opening.webp";
import kalash from "@/assets/ganesh-kalash.webp";
import haldi from "@/assets/haldi.webp";
import sangeet from "@/assets/sangeet.webp";
import baarat from "@/assets/baarat.webp";
import reception from "@/assets/reception.webp";
import receptionNight from "@/assets/reception-night.webp";
import phere from "@/assets/phere.webp";
import sohnneyaa from "@/assets/audio/sohnneyaa.mp3";

/**
 * Single source of truth for everything a guest reads.
 * Edit names, times, venues and messages here — no UI code needs to change.
 * All times are Asia/Kolkata (+05:30).
 */
export const weddingSettings = {
  groom: "Nimish",
  bride: "Sanjana",
  monogram: "N & S",
  dateText: "23–24 January 2027",
  /** Public URL of the deployed invitation; used for absolute share/preview links. Leave "" to use the current page URL. */
  siteUrl: "https://wedding-invite-black-ten.vercel.app",
  /** The countdown counts to this moment (ISO 8601 with IST offset): the Phere on the wedding day. */
  countdownTarget: "2027-01-24T15:00:00+05:30",
  countdownLabel: "until the wedding day",
  /** The three gold seals guests scratch to reveal the date (shown after reveal, with the countdown). */
  saveTheDate: [
    { label: "Day", value: "24" },
    { label: "Month", value: "January" },
    { label: "Year", value: "2027" },
  ],
  tagline: "Two days. Countless memories. One beautiful beginning.",
  heroMessage:
    "Together with our families, we joyfully invite you to celebrate our wedding — two days of rituals, music and blessings.",
  invocation: "॥ श्री गणेशाय नमः ॥",
  shloka: [
    "वक्रतुण्ड महाकाय",
    "सूर्यकोटि समप्रभः ।",
    "निर्विघ्नं कुरु मे देव",
    "शुभकार्येषु सर्वदा ॥",
  ],
  blessing:
    "With the blessings of Lord Ganesha, we invite you to celebrate our beautiful beginning.",
  familyBlessing:
    "With the divine grace of the Almighty and the heartfelt blessings of our elders, two families come together to celebrate a union of hearts.",
  finaleMessage:
    "With love in our hearts and blessings from our families, we invite you to celebrate the beginning of our forever.",
  closing: "Your presence will make these moments even more special.",
  illustrations: { cover, coverWide, opening, finale: reception },
  /** Background song: starts when the guest taps the seal, loops, and has a play/pause button. */
  music: { src: sohnneyaa, title: "Sohnneyaa (The Wedding Version)" },
};

export type FamilySide = {
  label: string;
  relation: string;
  /** Leave arrays empty to hide a line. */
  grandparents: string[];
  parents: string[];
};
export const family: { groom: FamilySide; bride: FamilySide } = {
  groom: {
    label: "The Groom’s Family",
    relation: "son",
    grandparents: ["Late Shri Badrilal Ji Mandowara", "Smt Santosh Ji Mandowara"],
    parents: ["Manish Mandowara", "Preeti Mandowara"],
  },
  bride: {
    label: "The Bride’s Family",
    relation: "daughter",
    grandparents: ["Late Shri Shankarlal Ji Rathi", "Late Smt Kamla Devi Ji Rathi"],
    parents: ["Govind Rathi", "Anju Rathi"],
  },
};

export type Venue = {
  name: string;
  /** Full postal address. Leave "" until confirmed — the UI shows a gentle placeholder. */
  address: string;
  /** Google Maps share link. The venue name links here wherever it appears; leave "" for plain text. */
  mapsUrl: string;
};
export const venues: Record<string, Venue> = {
  "vallabha-garden": {
    name: "Vallabha Garden, Mhow",
    address: "",
    mapsUrl: "https://maps.app.goo.gl/ifLq34V9kNzoni9m7",
  },
};

export type CelebrationDay = {
  day: string;
  weekday: string;
  chapter: string;
  title: string;
  subtitle: string;
};
export const celebrationDays: CelebrationDay[] = [
  {
    day: "23",
    weekday: "Saturday",
    chapter: "Chapter I",
    title: "Colours, Rituals & Music",
    subtitle: "Blessings at dawn, haldi at noon, music under the stars",
  },
  {
    day: "24",
    weekday: "Sunday",
    chapter: "Chapter II",
    title: "The Wedding",
    subtitle: "A procession, seven sacred vows, and an evening of celebration",
  },
];

/** Desktop composition for a chapter. On phones every chapter is one uniform snap page. */
export type ChapterLayout = "canvas" | "split" | "split-reverse" | "panorama";
export type EventTheme =
  | "spiritual"
  | "botanical"
  | "heritage"
  | "turmeric"
  | "evening"
  | "procession"
  | "floral"
  | "sacred"
  | "moonlit";
export type EventSlot = {
  time: string;
  title: string;
  displayTitle: string;
  /** ISO start/end with +05:30 (machine-readable time). End is optional. */
  start: string;
  end?: string;
};
export type WeddingEvent = EventSlot & {
  id: string;
  date: string;
  day: string;
  venueId: string;
  theme: EventTheme;
  layout: ChapterLayout;
  description: string;
  illustration: string;
  illustrationAlt: string;
  schedule?: EventSlot[];
};
export const weddingEvents: WeddingEvent[] = [
  {
    id: "ganesh-kalash",
    title: "Ganesh Pooja + Chalk / Kalash",
    displayTitle: "Mangal Aarambh",
    date: "23 January 2027",
    day: "23",
    time: "8:00 AM – 10:30 AM",
    start: "2027-01-23T08:00:00+05:30",
    end: "2027-01-23T10:30:00+05:30",
    venueId: "vallabha-garden",
    theme: "heritage",
    layout: "split-reverse",
    description: "Honouring our traditions, surrounded by the love and blessings of our families.",
    illustration: kalash,
    illustrationAlt:
      "Ornamental heritage arch with mango-leaf kalash, rangoli and symmetrical diyas",
    schedule: [
      {
        time: "8:00 AM",
        title: "Ganesh Pooja",
        displayTitle: "Mangal Aarambh",
        start: "2027-01-23T08:00:00+05:30",
      },
      {
        time: "9:00 AM – 10:30 AM",
        title: "Chalk / Kalash",
        displayTitle: "Chalk / Kalash",
        start: "2027-01-23T09:00:00+05:30",
        end: "2027-01-23T10:30:00+05:30",
      },
    ],
  },
  {
    id: "haldi",
    title: "Sagai & Haldi Carnival",
    displayTitle: "Riwaaz & Rang",
    date: "23 January 2027",
    day: "23",
    time: "12:30 PM – 3:30 PM",
    start: "2027-01-23T12:30:00+05:30",
    end: "2027-01-23T15:30:00+05:30",
    venueId: "vallabha-garden",
    theme: "turmeric",
    layout: "canvas",
    description: "A promise of forever, a splash of haldi, and a whole lot of sunshine.",
    illustration: haldi,
    illustrationAlt:
      "Joyful family haldi ceremony with yellow flowers, turmeric bowls and festive umbrellas",
  },
  {
    id: "sangeet",
    title: "Sangeet & DJ",
    displayTitle: "Taal\u00a0• Thumke\u00a0• Tashan",
    date: "23 January 2027",
    day: "23",
    time: "8:00 PM onwards",
    start: "2027-01-23T21:00:00+05:30",
    end: "2027-01-23T23:00:00+05:30",
    venueId: "vallabha-garden",
    theme: "evening",
    layout: "canvas",
    description:
      "Under the stars and on the dance floor. A night of music, sparkle and unforgettable moves.",
    illustration: sangeet,
    illustrationAlt: "Indian couple dancing beneath warm stage lights in an evening garden",
  },
  {
    id: "baarat",
    title: "Baarat",
    displayTitle: "Dulha Ki Sawari",
    date: "24 January 2027",
    day: "24",
    time: "10:00 AM",
    start: "2027-01-24T10:00:00+05:30",
    venueId: "vallabha-garden",
    theme: "procession",
    layout: "panorama",
    description: "Dhol beats, dancing feet, and a groom on his way to forever.",
    illustration: baarat,
    illustrationAlt:
      "Groom in ivory sherwani and saffron safa on a decorated white horse, leading the baraat with dhol, shehnai and royal umbrellas",
  },
  {
    id: "phere",
    title: "Sacred Wedding Phere",
    displayTitle: "Saat Phere, Ek Safar",
    date: "24 January 2027",
    day: "24",
    time: "3:00 PM",
    start: "2027-01-24T15:00:00+05:30",
    venueId: "vallabha-garden",
    theme: "sacred",
    layout: "canvas",
    description:
      "Seven sacred vows. Two journeys becoming one. With you as witness to our forever.",
    illustration: phere,
    illustrationAlt:
      "Bride and groom taking phere around sacred fire beneath a floral mandap as two flower paths become one",
  },
  {
    id: "reception",
    title: "Reception",
    displayTitle: "Milne Ki Mehfil",
    date: "24 January 2027",
    day: "24",
    time: "7:30 PM onwards",
    start: "2027-01-24T19:30:00+05:30",
    venueId: "vallabha-garden",
    theme: "moonlit",
    layout: "split",
    description:
      "An evening of warm embraces and cherished company, under lanterns and starlight. Come celebrate with us.",
    illustration: receptionNight,
    illustrationAlt:
      "Bride and groom beneath a lantern-lit palace arch of blush roses under a crescent moon",
  },
];

/** Every individual ceremony (sub-slots expanded) with its parent chapter. */
export function ceremonies() {
  return weddingEvents.flatMap((event) =>
    (event.schedule ?? [event]).map((slot) => ({ ...slot, event })),
  );
}
