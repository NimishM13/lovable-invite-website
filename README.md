# Nimish Sanjana's Union

Build a complete, production-quality, mobile-first digital Indian Hindu wedding invitation website for:

NIMISH WEDS SANJANA

Wedding celebrations:

22–24 January 2027

IMPORTANT:

Build the complete website in ONE GO.

I want a SINGLE-PAGE APPLICATION / SINGLE INVITATION.

Everyone will receive the same wedding invitation.

DO NOT create personalized invitation routes.

DO NOT create guest-specific invitation configurations.

DO NOT create separate event URLs.

DO NOT create a multi-page website.

Instead, create one beautiful immersive wedding invitation experience where the guest enters once and explores the entire wedding celebration through scrolling, transitions and event sections.

The website should feel like a PREMIUM DIGITAL INDIAN WEDDING INVITATION rather than a conventional wedding website.

--------------------------------------------------

1. TECHNOLOGY

--------------------------------------------------

Use a modern Lovable-compatible stack.

Preferred:

- React

- TypeScript

- Tailwind CSS

- Framer Motion or equivalent animation library

- Lucide icons where appropriate

Keep the code clean, reusable and configuration-driven.

The website must be:

- Mobile-first

- Fully responsive

- Beautiful on desktop

- Optimized for WhatsApp/mobile sharing

--------------------------------------------------

2. OVERALL EXPERIENCE

--------------------------------------------------

The guest journey should feel like opening a premium physical wedding invitation.

Experience:

ENTRY VIDEO

        ↓

GANESH + SHLOKA

        ↓

ENTER INVITATION

        ↓

NIMISH WEDS SANJANA

        ↓

FAMILY BLESSINGS

        ↓

COUNTDOWN

        ↓

WEDDING CELEBRATION TIMELINE

        ↓

INDIVIDUAL EVENT EXPERIENCES

        ↓

VENUES + MAPS

        ↓

CLOSING MESSAGE

Everything should exist within one SPA.

Use smooth scrolling and transitions between sections.

--------------------------------------------------

3. ENTRY VIDEO

--------------------------------------------------

When the website opens, show an optional full-screen wedding intro video.

Example:

/videos/wedding-intro.mp4

The video should:

- autoplay muted

- work on mobile

- fade in/out elegantly

- have a Skip Intro button

- automatically continue if video fails

- never block access to the invitation

Do not autoplay audio.

If no video is configured, automatically skip this experience.

Create configuration:

const weddingSettings = {

  introVideo: {

    enabled: true,

    src: "/videos/wedding-intro.mp4",

    skipEnabled: true

  }

};

--------------------------------------------------

4. GANESH OPENING SCREEN

--------------------------------------------------

After the intro video, show a full-screen auspicious Ganesh opening.

This should feel like the first page of a premium Indian wedding card.

Visual elements:

- elegant Ganesh illustration/artwork

- mandala

- marigold

- flowers

- diya

- subtle traditional ornamentation

- warm ivory/cream background

- muted saffron/gold

- soft glow

Avoid cartoonish Ganesh imagery.

Use tasteful Indian artistic styling.

Display:

ॐ श्री गणेशाय नमः

Then:

वक्रतुण्ड महाकाय

सूर्यकोटि समप्रभः ।

निर्विघ्नं कुरु मे देव

शुभकार्येषु सर्वदा ॥

Below:

"With the blessings of Lord Ganesha,

we invite you to celebrate our beautiful beginning."

Button:

ENTER INVITATION

On clicking:

smoothly transition into the main wedding experience.

--------------------------------------------------

5. MAIN HERO

--------------------------------------------------

The main wedding identity should be established here.

Display:

NIMISH

WEDS

SANJANA

22 — 24 JANUARY 2027

Suggested tagline:

"Three days. Countless memories. One beautiful beginning."

Use elegant Indian wedding typography.

The hero should have a rich illustrated composition.

Possible elements:

- illustrated bride and groom

- floral frame

- marigold

- traditional architecture

- mandala

- decorative hanging elements

Do not make it look like a generic website hero section.

It should feel like the cover of an illustrated wedding invitation.

--------------------------------------------------

6. FAMILY BLESSINGS

--------------------------------------------------

Add a section:

WITH THE BLESSINGS OF OUR FAMILY

Show:

Groom's Family

Grandparents:

- Grandfather Name

- Grandmother Name

Parents:

- Father Name

- Mother Name

Bride's Family

Grandparents:

- Grandfather Name

- Grandmother Name

Parents:

- Father Name

- Mother Name

IMPORTANT:

Use centralized editable configuration.

Example:

const family = {

  groom: {

    grandparents: [

      "Grandfather Name",

      "Grandmother Name"

    ],

    parents: [

      "Father Name",

      "Mother Name"

    ]

  },

  bride: {

    grandparents: [

      "Grandfather Name",

      "Grandmother Name"

    ],

    parents: [

      "Father Name",

      "Mother Name"

    ]

  }

};

I will replace the placeholder names later.

Do not hardcode names into UI components.

Design this section elegantly.

It should feel emotional and family-oriented, not like a contact list.

--------------------------------------------------

7. WEDDING COUNTDOWN

--------------------------------------------------

Add:

COUNTING DOWN TO THE CELEBRATION

Show:

DAYS

HOURS

MINUTES

SECONDS

Target:

23 January 2027, 8:00 AM IST

Make this configurable.

When countdown reaches zero:

"THE CELEBRATIONS HAVE BEGUN!"

Do not show negative values.

The countdown should look elegant and premium, not like a digital clock widget.

--------------------------------------------------

8. WEDDING TIMELINE

--------------------------------------------------

Create a beautiful chronological wedding timeline.

The timeline should be one of the major sections of the website.

Use rich illustrations and event-specific artwork.

Wedding schedule:

================================

22 JANUARY 2027

================================

9:00 AM

SHUBH AARAMBH

Mata Poojan

Venue:

Chhatrapati Nagar

3:00 PM onwards

RANGON KI SHAAM

Mehndi

Venue:

Chota Bangrda

================================

23 JANUARY 2027

================================

8:00 AM

MANGAL AARAMBH

Ganesh Pooja

Venue:

Vallabha Garden, Mhow

9:00 AM – 10:30 AM

CHALK / KALASH

Venue:

Vallabha Garden, Mhow

12:30 PM – 3:30 PM

RIWAAZ & RANG

Sagai & Haldi Carnival

Venue:

Vallabha Garden, Mhow

9:00 PM – 11:00 PM

TAAL • THUMKE • TASHAN

Sangeet & DJ

Venue:

Vallabha Garden, Mhow

================================

24 JANUARY 2027

================================

10:00 AM

DULHA KI SAWARI

Baarat

Venue:

Vallabha Garden, Mhow

12:00 PM

MILNE KI MEHFIL

Reception

Venue:

Vallabha Garden, Mhow

3:00 PM

SAAT PHERE, EK SAFAR

Sacred Wedding Phere

Venue:

Vallabha Garden, Mhow

--------------------------------------------------

9. EVENT GROUPING

--------------------------------------------------

Use event sections rather than separate website pages.

The following should be treated as individual visual experiences:

1. Mata Poojan

2. Mehndi

3. Ganesh Pooja + Chalk/Kalash

4. Sagai + Haldi Carnival

5. Sangeet + DJ

6. Baarat

7. Reception

8. Sacred Wedding Phere

IMPORTANT:

Ganesh Pooja and Chalk/Kalash should be ONE visual event section.

Inside it display:

8:00 AM — Ganesh Pooja

9:00 AM – 10:30 AM — Chalk / Kalash

--------------------------------------------------

10. EVENT-SPECIFIC VISUAL WORLDS

--------------------------------------------------

Every event must have a completely different visual identity.

Do NOT simply change the background color.

The illustration, composition, decorative elements and animations should change.

----------------------------------------

MATA POOJAN

----------------------------------------

Title:

SHUBH AARAMBH

Theme:

SPIRITUAL • AUSPICIOUS • PEACEFUL

Illustrations:

- temple-inspired arch

- diya

- kalash

- marigold

- flowers

- mandala

- subtle sacred motifs

Use calm warm colors.

----------------------------------------

MEHNDI

----------------------------------------

Title:

RANGON KI SHAAM

Theme:

FRESH • PLAYFUL • BOTANICAL • COLORFUL

Illustrations:

- mehndi hands

- paisley

- floral vines

- decorated hands

- women celebrating

- dholak

- colorful cushions

- flowers

- hanging decorations

Use green, yellow, pink and orange accents.

----------------------------------------

GANESH + CHALK / KALASH

----------------------------------------

Title:

MANGAL AARAMBH

Theme:

HERITAGE • AUSPICIOUS • TRADITIONAL

Illustrations:

- kalash

- mango leaves

- rangoli

- diya

- marigold

- traditional Indian patterns

- mandala

- ornamental architecture

Use symmetrical invitation-card composition.

----------------------------------------

SAGAI + HALDI

----------------------------------------

Title:

RIWAAZ & RANG

Theme:

JOY • COLOR • FLOWERS • TURMERIC

Illustrations:

- turmeric

- haldi bowls

- marigold

- decorated thalis

- floral showers

- colorful umbrellas

- festive family scene

Make this one of the happiest and most colorful sections.

----------------------------------------

SANGEET + DJ

----------------------------------------

Title:

TAAL • THUMKE • TASHAN

This must be dramatically different from the other events.

Theme:

DISCO • MUSIC • GLAMOUR • NIGHT

Use:

- disco ball

- dancing silhouettes

- stage lights

- light beams

- music waves

- stars

- glamorous couple

- reflective surfaces

- dark premium background

- vibrant accent lighting

Animation:

- slow disco ball rotation

- subtle moving lights

- music waves

- sparkles

IMPORTANT:

It should feel like:

INDIAN WEDDING × PREMIUM DISCO NIGHT

NOT like a cheap nightclub.

----------------------------------------

BAARAT

----------------------------------------

Title:

DULHA KI SAWARI

Theme:

CELEBRATION • ENERGY • MOVEMENT

Illustrations:

- groom

- baraat

- dhol players

- dancers

- shehnai

- flowers

- decorative umbrellas

- confetti

Make the illustration feel like a moving procession.

----------------------------------------

RECEPTION

----------------------------------------

Title:

MILNE KI MEHFIL

Theme:

ELEGANT • WARM • REFINED

Illustrations:

- elegant floral arrangements

- lights

- architectural arch

- couple

- flowers

- subtle Indian motifs

Keep it sophisticated.

----------------------------------------

PHERE

----------------------------------------

Title:

SAAT PHERE, EK SAFAR

Theme:

HARMONY • SACRED • TOGETHERNESS • TIMELESS

This should be the emotional centerpiece.

Illustrations:

- bride and groom

- mandap

- garlands

- sacred fire

- floral vines

- mandala

- warm light

Creative concept:

Two separate floral paths gradually becoming one shared circular mandala.

Avoid cliché hearts.

The visual should communicate:

Two journeys becoming one.

--------------------------------------------------

11. RICH ILLUSTRATED DESIGN

--------------------------------------------------

THIS IS A CRITICAL REQUIREMENT.

Do NOT build a normal website containing cards with icons.

I want a richly illustrated Indian wedding invitation.

Use large illustrations as part of the composition.

Illustrations can occupy 30–50% of a section.

They can:

- extend from edges

- enter from corners

- sit behind text

- frame content

- form decorative borders

- appear in foreground

- appear in background

- overlap sections

- create depth

Think of premium Indian wedding stationery.

Visual references can include:

- hand-painted Indian wedding scenes

- marigold garlands

- embroidered umbrellas

- decorative pots

- mandala

- floral borders

- illustrated bride and groom

- traditional architecture

- hand-painted textures

Do NOT copy copyrighted artwork.

Use original, generated, CSS/SVG or legally reusable artwork.

--------------------------------------------------

12. ILLUSTRATED COUPLE

--------------------------------------------------

Use an elegant illustrated Indian bride and groom.

The couple can appear on:

- main hero

- reception

- sangeet

- phere

Do not force the couple into every section.

Keep the illustration treatment consistent.

The couple should feel like part of the wedding stationery artwork.

--------------------------------------------------

13. ILLUSTRATION LAYERS

--------------------------------------------------

Use multiple visual layers:

BACKGROUND:

- watercolor texture

- architecture

- mandala

- paper texture

MIDGROUND:

- flowers

- arches

- marigold strings

- decorative patterns

FOREGROUND:

- couple

- dancers

- baraat

- wedding objects

- floral arrangements

This should create depth.

--------------------------------------------------

14. DECORATIVE BORDERS

--------------------------------------------------

Use event-appropriate illustrated borders:

- marigold garlands

- floral vines

- paisley

- Indian textile patterns

- mandala frames

- ornamental corners

- decorative arches

Do not use the same border everywhere.

--------------------------------------------------

15. ANIMATED ILLUSTRATIONS

--------------------------------------------------

Use subtle animations.

Examples:

Mata Poojan:

- diya glow

- floating particles

Mehndi:

- flowers gently sway

- petals move

Haldi:

- petals falling

Sangeet:

- disco ball rotates

- light beams move

Baarat:

- confetti

- subtle dancing movement

Phere:

- gentle mandala glow

Animations should enhance the invitation.

Do not make the website distracting.

Respect prefers-reduced-motion.

--------------------------------------------------

16. EVENT INFORMATION

--------------------------------------------------

Every event section must clearly show:

DATE

TIME

VENUE

Example:

23 January 2027

12:30 PM – 3:30 PM

Vallabha Garden, Mhow

Then:

[ VIEW LOCATION ]

--------------------------------------------------

17. VENUES

--------------------------------------------------

Create centralized venue configuration:

const venues = {

  "chhatrapati-nagar": {

    name: "Chhatrapati Nagar",

    address: "",

    mapsUrl: ""

  },

  "chota-bangrda": {

    name: "Chota Bangrda",

    address: "",

    mapsUrl: ""

  },

  "vallabha-garden": {

    name: "Vallabha Garden, Mhow",

    address: "",

    mapsUrl: ""

  }

};

I will enter actual Google Maps URLs later.

DO NOT invent map URLs.

The View Location button should open the configured mapsUrl.

--------------------------------------------------

18. SHARE INVITATION

--------------------------------------------------

Add a Share Invitation button near the end of the experience.

Use Web Share API where available.

Fallback to WhatsApp sharing.

Suggested message:

"You're invited to celebrate the wedding festivities of Nimish & Sanjana! ❤️

22–24 January 2027

We'd love to celebrate these beautiful moments with you."

Also provide:

Copy Invitation Link

Since this is one public invitation, the copied link should simply be the website URL.

--------------------------------------------------

19. NO ADD TO CALENDAR

--------------------------------------------------

Do NOT add:

- Add to Calendar

- Google Calendar

- ICS

- calendar integration

--------------------------------------------------

20. NAVIGATION

--------------------------------------------------

Because this is a single-page experience, use elegant navigation.

On desktop:

A subtle top navigation can show:

Home

Family

Celebrations

Timeline

On mobile:

Use a compact floating/menu navigation.

However, do not make it look like a corporate website.

The navigation should feel integrated into the invitation.

The user should also be able to simply scroll through the entire experience without using navigation.

--------------------------------------------------

21. EVENT TRANSITIONS

--------------------------------------------------

When moving from one event section to another, create visual transitions.

Example:

Mehndi:

flowers/vines

↓

Haldi:

marigold/turmeric

↓

Sangeet:

darkness/disco lights

↓

Baarat:

bright celebration

↓

Reception:

elegant transition

↓

Phere:

warm peaceful transition

The website should feel like moving through different chapters of the wedding.

--------------------------------------------------

22. CENTRAL CONFIGURATION

--------------------------------------------------

Create editable configuration files.

I should be able to modify:

- couple names

- wedding dates

- countdown

- family names

- event titles

- event dates

- event times

- event descriptions

- venue names

- maps URLs

- event themes

- illustrations

- intro video

WITHOUT modifying UI components.

--------------------------------------------------

23. EVENT DATA

--------------------------------------------------

Create:

const weddingEvents = [...]

with:

id

title

displayTitle

date

time

venueId

theme

description

illustration

decorations

Example:

{

  id: "sangeet",

  title: "Sangeet & DJ",

  displayTitle: "Taal • Thumke • Tashan",

  date: "23 January 2027",

  time: "9:00 PM – 11:00 PM",

  venueId: "vallabha-garden",

  theme: "disco"

}

--------------------------------------------------

24. WEDDING SETTINGS

--------------------------------------------------

Create:

const weddingSettings = {

  groom: "Nimish",

  bride: "Sanjana",

  dateText: "22–24 January 2027",

  countdownTarget: "2027-01-23T08:00:00+05:30",

  tagline: "Three days. Countless memories. One beautiful beginning."

};

--------------------------------------------------

25. DESIGN STYLE

--------------------------------------------------

Overall design:

PREMIUM

WARM

FRESH

INDIAN

ARTISTIC

CONTEMPORARY

EMOTIONAL

Use:

- warm ivory

- cream

- muted gold

- marigold

- earthy colors

- deep green

- muted pink

- saffron

But each event can have its own palette.

--------------------------------------------------

26. TYPOGRAPHY

--------------------------------------------------

Use:

Elegant serif/display font for:

- Nimish Weds Sanjana

- event titles

- major headings

Readable modern font for:

- dates

- timings

- venue

- descriptions

Use a proper Devanagari font for Sanskrit.

Avoid overly decorative fonts that reduce readability.

--------------------------------------------------

27. PAPER / WATERCOLOUR FEEL

--------------------------------------------------

The website should feel like premium wedding stationery.

Use subtle:

- paper grain

- watercolor washes

- handmade-paper texture

- soft gradients

- ink/paint texture

Keep it subtle.

--------------------------------------------------

28. MOBILE EXPERIENCE

--------------------------------------------------

Mobile is the highest priority.

The majority of guests will open this through WhatsApp.

Make sure:

- no horizontal scrolling

- text is readable

- buttons are easy to tap

- illustrations are beautifully cropped

- animations remain smooth

- pages load quickly

- event sections feel immersive

Do NOT simply scale down desktop.

Create intentional mobile compositions.

--------------------------------------------------

29. DESKTOP EXPERIENCE

--------------------------------------------------

Desktop should feel like a large digital invitation.

Use:

- wide illustrated compositions

- decorative side artwork

- layered illustrations

- subtle parallax where appropriate

- large event scenes

But do not make desktop feel like a different website.

--------------------------------------------------

30. PERFORMANCE

--------------------------------------------------

Optimize for Indian mobile networks.

Use:

- WebP / AVIF

- SVG

- compressed images

- optimized video

- lazy loading

- lightweight animations

Do not load unnecessarily huge assets.

--------------------------------------------------

31. ACCESSIBILITY

--------------------------------------------------

Include:

- semantic HTML

- alt text

- accessible buttons

- sufficient contrast

- reduced motion

- keyboard support

--------------------------------------------------

32. FALLBACKS

--------------------------------------------------

If intro video fails:

Skip it.

If an illustration fails:

Use a beautiful theme background.

If countdown fails:

Show wedding date normally.

The invitation must never look broken.

--------------------------------------------------

33. CLOSING SECTION

--------------------------------------------------

End with an emotional closing section.

Suggested text:

"Your presence will make these moments even more special."

Then:

WITH LOVE,

NIMISH & SANJANA

Use a beautiful illustrated floral/couple composition.

Add:

[ SHARE INVITATION ]

--------------------------------------------------

34. FINAL EXPERIENCE

--------------------------------------------------

The complete website should feel like:

A PREMIUM ILLUSTRATED INDIAN WEDDING INVITATION BROUGHT TO LIFE DIGITALLY.

Not:

- a generic wedding website

- a SaaS dashboard

- a corporate landing page

- a simple timeline

- a collection of cards

The guest should feel:

"I have opened a beautiful wedding invitation."

The experience should tell a story:

GANESH

↓

BLESSINGS

↓

NIMISH & SANJANA

↓

FAMILY

↓

COUNTDOWN

↓

22 JAN — SHUBH AARAMBH

↓

22 JAN — RANGON KI SHAAM

↓

23 JAN — MANGAL AARAMBH

↓

23 JAN — RIWAAZ & RANG

↓

23 JAN — TAAL • THUMKE • TASHAN

↓

24 JAN — DULHA KI SAWARI

↓

24 JAN — MILNE KI MEHFIL

↓

24 JAN — SAAT PHERE, EK SAFAR

↓

WITH LOVE — NIMISH & SANJANA

--------------------------------------------------

35. IMPLEMENTATION IN ONE GO

--------------------------------------------------

Implement the complete website now.

Do NOT stop at wireframes.

Do NOT ask me for missing family names, Maps URLs or video before building.

Use clearly marked placeholders for those.

Build:

- complete SPA

- intro video experience

- Ganesh opening

- shloka

- main hero

- family section

- countdown

- complete wedding timeline

- all 8 event experiences

- rich event-specific illustrations/placeholders

- event-specific themes

- animations

- venue information

- Google Maps buttons

- share button

- WhatsApp sharing

- responsive mobile design

- responsive desktop design

- centralized editable configuration

Do not implement personalized invitations or separate event routes.

Everything must work from one wedding invitation URL.

Prioritize visual quality and emotional storytelling over excessive technical complexity.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/99091814-7808-52f0-b212-1a060f5c901e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
