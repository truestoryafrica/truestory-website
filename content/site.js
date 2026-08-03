export const site = {
  name: "TrueStory Africa",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://truestoryafrica.com",
  tagline: "Real stories. Clear impact.",
  description:
    "TrueStory Africa provides documentary video production, photography, event coverage, content writing and communication services for impact-driven organizations in Rwanda and across Africa.",
  location: "Kigali, Rwanda",
  email: "hello@truestoryafrica.com",
  phone: "+250780355911",
  displayPhone: "+250 780 355 911",
  social: {
    instagram: "https://www.instagram.com/truestory.africa/",
    linkedin: "https://www.linkedin.com/in/truestory-africa-1ba07340a",
    youtube: "https://www.youtube.com/channel/UCaDLSXh5A4my4hKjKfhkvoQ",
    facebook: "https://www.facebook.com/profile.php?id=61590409682009",
    x: "https://x.com/TrueStoryAfrika"
  }
};

// Real partner organizations, using each org's official logo asset from
// public/assets/partners/. logo stays null (renders as clean text) until
// the real asset is supplied -- UNDP's is still outstanding.
export const partners = [
  { name: "UNICEF", logo: "/assets/partners/unicef.svg" },
  { name: "UNDP", logo: null },
  { name: "World Health Organization", logo: "/assets/partners/who.svg" },
  { name: "The World Bank", logo: "/assets/partners/world-bank.svg" },
  { name: "USAID", logo: "/assets/partners/usaid.svg" },
  { name: "Save the Children", logo: "/assets/partners/save-the-children.svg" }
];

// Placeholder testimonial copy, written to match the site's voice at the
// team's request. Attributed by role/organization only, not a specific named
// individual, since these are illustrative, not real quotes -- swap in real,
// client-approved testimonials (with a named, consenting contact) before
// this goes live for real visitors.
export const testimonials = [
  {
    quote:
      "TrueStory Africa consistently turns complex programme results into visual stories that resonate with both our partners and decision-makers.",
    role: "Communications Lead",
    organization: "UNICEF Rwanda"
  },
  {
    quote:
      "Their documentary approach captures the evidence and the emotion behind our work, making the results accessible to a much wider audience.",
    role: "Programme Manager",
    organization: "The World Bank"
  },
  {
    quote:
      "Professional, creative and deeply committed to impact. TrueStory Africa is more than a vendor — they're a trusted partner.",
    role: "Regional Director",
    organization: "Save the Children"
  }
];

export const services = [
  {
    title: "Documentary Video Production",
    slug: "documentary-video-production-rwanda",
    number: "01",
    image: "/assets/images/service-documentary-video.webp",
    alt: "TrueStory Africa cinematographer filming on location in Rwanda",
    summary: "Character-driven films that put real impact on screen, from concept to final cut.",
    seoTitle: "Documentary Video Production in Rwanda | TrueStory Africa",
    seoDescription:
      "Documentary video production in Rwanda for NGOs, development partners and impact-driven organizations across Africa."
  },
  {
    title: "Event Coverage",
    slug: "event-coverage-rwanda",
    number: "02",
    image: "/assets/images/service-event-coverage.webp",
    alt: "Conference attendees seated at round tables during a panel workshop",
    summary: "Every keynote and ribbon-cutting, captured with intent.",
    seoTitle: "Event Coverage in Rwanda | TrueStory Africa",
    seoDescription:
      "Professional event coverage in Kigali and Rwanda, including photography, video and communication-ready content."
  },
  {
    title: "Photo Storytelling",
    slug: "photography-services-kigali-rwanda",
    number: "03",
    image: "/assets/images/service-photo-storytelling.webp",
    alt: "A photographer capturing a smiling woman in patterned dress",
    summary: "Images that carry a story further than words can.",
    seoTitle: "Photography Services in Kigali, Rwanda | TrueStory Africa",
    seoDescription:
      "Photography services in Kigali and Rwanda for organizations that need authentic, story-led images."
  },
  {
    title: "Content & Writing",
    slug: "content-writing-rwanda",
    number: "04",
    image: "/assets/images/service-content-writing.webp",
    alt: "Writing and editorial work for reports and features",
    summary: "Reports and features that read like journalism.",
    seoTitle: "Content Writing Services in Rwanda | TrueStory Africa",
    seoDescription:
      "Editorial writing, reports and storytelling content for NGOs, institutions and development organizations in Rwanda."
  },
  {
    title: "Communication Support",
    slug: "communication-services-rwanda",
    number: "05",
    image: "/assets/images/service-communication-support.webp",
    alt: "Communication strategy and messaging support",
    summary: "Strategy and messaging that says what matters.",
    seoTitle: "Communication Services in Rwanda | TrueStory Africa",
    seoDescription:
      "Communication strategy, messaging and campaign support for organizations working in Rwanda and across Africa."
  },
  {
    title: "Social Media Management",
    slug: "social-media-management-rwanda",
    number: "06",
    image: "/assets/images/service-social-media.webp",
    alt: "Social media content management for TrueStory Africa",
    summary: "Feeds that build trust one post at a time.",
    seoTitle: "Social Media Management in Rwanda | TrueStory Africa",
    seoDescription:
      "Social media content planning and management for impact-driven organizations in Rwanda."
  }
];

// Real photo sets from past event-coverage assignments, shown on the Event
// Coverage service page. Each event gets its own small gallery rather than
// one generic photo, so the range of work (workshops, galas, broadcast
// events) is obvious at a glance.
export const eventGalleries = [
  {
    name: "AU-WYDE Regional Workshop",
    slug: "unwomen-au-wyde",
    category: "Event Coverage",
    videoUrl: "",
    client: "UN Women / UNICEF Rwanda",
    description: "Panel sessions and working groups from a regional workshop on women and youth in the digital economy.",
    images: [
      { src: "/assets/images/events/unwomen-au-wyde/1.webp", alt: "Attendees at the AU-WYDE regional workshop" },
      { src: "/assets/images/events/unwomen-au-wyde/2.webp", alt: "Panelist speaking at the AU-WYDE regional workshop" },
      { src: "/assets/images/events/unwomen-au-wyde/3.webp", alt: "Working group session at the AU-WYDE regional workshop" },
      { src: "/assets/images/events/unwomen-au-wyde/4.webp", alt: "Panel discussion at the AU-WYDE regional workshop" },
      { src: "/assets/images/events/unwomen-au-wyde/5.webp", alt: "Speaker addressing the AU-WYDE regional workshop" },
      { src: "/assets/images/events/unwomen-au-wyde/6.webp", alt: "Wide view of the AU-WYDE regional workshop conference room" }
    ]
  },
  {
    name: "Equity Group Gala Dinner",
    slug: "equity-group-gala-dinner",
    category: "Event Coverage",
    videoUrl: "",
    client: "Equity Group — Powering Africa's Opportunities",
    description: "An evening gala bringing together business leaders and partners across the region.",
    images: [
      { src: "/assets/images/events/equity-group-gala-dinner/1.webp", alt: "Gala dinner venue setup with stage backdrop" },
      { src: "/assets/images/events/equity-group-gala-dinner/2.webp", alt: "Guests networking at the Equity Group gala dinner" },
      { src: "/assets/images/events/equity-group-gala-dinner/3.webp", alt: "Guest at the Equity Group gala dinner" },
      { src: "/assets/images/events/equity-group-gala-dinner/4.webp", alt: "Guests arriving at the Equity Group gala dinner" },
      { src: "/assets/images/events/equity-group-gala-dinner/5.webp", alt: "Guests toasting at the Equity Group gala dinner" }
    ]
  },
  {
    name: "Ukwezi Kw'Abana Broadcast Event",
    slug: "ukwezi-child-protection",
    category: "Event Coverage",
    videoUrl: "",
    client: "NCDA / Rwanda Broadcasting Agency",
    description: "Live broadcast coverage of a public child-protection awareness campaign event.",
    images: [
      { src: "/assets/images/events/ukwezi-child-protection/1.webp", alt: "Speaker on stage at the Ukwezi Kw'Abana broadcast event" },
      { src: "/assets/images/events/ukwezi-child-protection/2.webp", alt: "Panelist speaking at the Ukwezi Kw'Abana broadcast event" },
      { src: "/assets/images/events/ukwezi-child-protection/3.webp", alt: "Panelist at the Ukwezi Kw'Abana broadcast event" },
      { src: "/assets/images/events/ukwezi-child-protection/4.webp", alt: "Panelists seated on stage at the Ukwezi Kw'Abana broadcast event" },
      { src: "/assets/images/events/ukwezi-child-protection/5.webp", alt: "Full panel on stage at the Ukwezi Kw'Abana broadcast event" },
      { src: "/assets/images/events/ukwezi-child-protection/6.webp", alt: "Panelist speaking at the Ukwezi Kw'Abana broadcast event" }
    ]
  }
];

export const stories = [
  {
    title: "A Mother's Hope",
    slug: "mothers-hope-rural-health-rwanda",
    category: "Health",
    location: "Rwanda",
    image: "/assets/images/story-mothers-hope.webp",
    alt: "A mother holding her child at a rural health clinic",
    excerpt: "Inside the community health posts turning prenatal care into a lifeline for rural Rwanda.",
    date: "2026-07-26",
    seoTitle: "A Mother's Hope | Rural Health Story in Rwanda",
    seoDescription:
      "A documentary-style impact story about rural health, prenatal care and community support in Rwanda."
  },
  {
    title: "A Brighter Tomorrow",
    slug: "brighter-tomorrow-education-rwanda",
    category: "Education",
    location: "Rwanda",
    image: "/assets/images/story-brighter-tomorrow.webp",
    alt: "Children smiling in a classroom",
    excerpt: "One classroom, rebuilt by its community, is changing what is possible for 400 children.",
    date: "2026-07-26",
    seoTitle: "A Brighter Tomorrow | Education Story in Rwanda",
    seoDescription:
      "An education impact story from Rwanda about classroom rebuilding, community action and opportunity."
  },
  {
    title: "Growing Resilience",
    slug: "growing-resilience-smallholder-farmers-rwanda",
    category: "Livelihoods",
    location: "Rwanda",
    image: "/assets/images/story-growing-resilience.jpeg",
    alt: "Children accessing a clean water source",
    excerpt: "How smallholder farmers turned drought-hit land into a cooperative that feeds a district.",
    date: "2026-07-26",
    seoTitle: "Growing Resilience | Livelihoods Story in Rwanda",
    seoDescription:
      "A livelihoods and resilience story about smallholder farmers, climate pressure and cooperative growth in Rwanda."
  }
];

// No seed/fallback insights — unlike stories, this section should stay empty until
// the editorial team publishes real content through /admin, rather than showing
// placeholder text on the live site.
export const insights = [];

export const team = [
  {
    name: "Isaac Gisubizo",
    role: "Cinematographer",
    image: "/assets/team/isaac-gisubizo.jpeg",
    alt: "Isaac Gisubizo",
    bio: "Visual storyteller with a keen eye for capturing human moments that make a story unforgettable."
  },
  {
    name: "Benjamin Irihose",
    role: "Cinematographer",
    image: "/assets/team/benjamin-irihose.jpeg",
    alt: "Benjamin Irihose",
    bio: "Cinematographer dedicated to crafting visually compelling stories with technical precision."
  },
  {
    name: "Hakizimana Shaban",
    role: "Video Production Lead",
    image: "/assets/team/hakizimana-shaban.jpeg",
    alt: "Hakizimana Shaban",
    bio: "Leads video production from concept to final delivery with creativity and purpose."
  },
  {
    name: "Laury Habyarimana",
    role: "Photographer",
    image: "/assets/team/laury-habyarimana.jpeg",
    alt: "Laury Habyarimana",
    bio: "Photographer passionate about meaningful moments, events, portraits and documentary work."
  }
];
