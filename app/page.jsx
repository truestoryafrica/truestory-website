import Link from "next/link";
import Image from "next/image";
import ScrollProgressDots from "@/components/ScrollProgressDots";
import StatCounter from "@/components/StatCounter";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CredibilityStrip from "@/components/CredibilityStrip";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getSiteContent } from "@/lib/cms";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Documentary, Photography & Communication",
  description:
    "Documentary video, photography, event coverage and communication services for impact-driven organizations in Rwanda and across Africa.",
  path: "/"
});

export default async function HomePage() {
  const { site, services, stories, team, partners, testimonials } = await getSiteContent();
  const publishedStories = stories
    .filter((story) => story.status !== "draft")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Header site={site} />
      <ScrollProgressDots />
      <ScrollReveal />
      <main>
        <Hero site={site} />
        <KeywordMarquee />
        <CredibilityStrip partners={partners} />
        <Services services={services} />
        <Stories stories={publishedStories} />
        <Impact />
        <Testimonials testimonials={testimonials} />
        <About />
        <Team team={team} />
      </main>
      <Footer site={site} services={services} />
    </>
  );
}


function Hero({ site }) {
  return (
    <section id="home" className="hero section-snap">
      <div className="hero-copy">
        <div className="hero-copy-inner">
        <div className="hero-kicker">
          <span aria-hidden="true" />
          <span>{site.location} • Storytelling Across Africa</span>
        </div>
        <h1>
          Honest stories.<br />
          Lasting <span>change</span>.
        </h1>
        <p className="hero-lede">
          We film, photograph and write the true stories that funders,
          governments and audiences can&apos;t look away from.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="#work">
            See Our Work
            <span className="icon-circle" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="hero-meta">
          <div className="hero-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Based in {site.location} — working across the continent
          </div>
        </div>
        </div>
      </div>
      <div className="hero-media" aria-label="TrueStory Africa campaign artwork">
        <span aria-hidden="true" className="hero-media-wedge" />
        <Image
          src="/assets/images/hero-poster.webp"
          alt="TrueStory Africa poster with Real stories. Clear impact."
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1080px) 100vw, 54vw"
        />
      </div>
      <div className="hero-social-rail" aria-label="Follow TrueStory Africa">
        <span className="hero-social-rail-line" aria-hidden="true" />
        <Link href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </Link>
        <Link href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </Link>
        <Link href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
          </svg>
        </Link>
        <Link href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </Link>
        <Link href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </Link>
        <Link href={`mailto:${site.email}`} aria-label="Email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </Link>
        <span className="hero-social-rail-line" aria-hidden="true" />
      </div>
    </section>
  );
}

function KeywordMarquee() {
  const keywords = [
    "Documentary Film",
    "Photo Storytelling",
    "Event Coverage",
    "Content & Writing",
    "Communication Support"
  ];
  const loop = [...keywords, ...keywords];

  return (
    <div className="keyword-marquee" aria-label="TrueStory Africa services">
      <div>
        {loop.map((keyword, index) => (
          <span key={`${keyword}-${index}`}>
            {keyword}
            <strong>•</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICE_ICONS = [
  // Documentary Video Production — film reel
  <>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </>,
  // Event Coverage — spotlight burst
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
    <line x1="9.69" y1="8" x2="21.17" y2="8" />
    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
    <line x1="14.31" y1="16" x2="2.83" y2="16" />
    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
  </>,
  // Photo Storytelling — camera
  <>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </>,
  // Content & Writing — bars
  <>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </>,
  // Communication Support — chat bubble
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  // Social Media Management — share nodes
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </>
];

function Services({ services }) {
  return (
    <section id="services" className="section services-section">
      <div className="section-intro">
        <p className="eyebrow reveal">What We Do</p>
        <h2 className="reveal">
          Storytelling that moves people.<br />
          Communication that moves <em>policy</em>.
        </h2>
        <Link href="#services" className="link-arrow reveal">View All Services<span aria-hidden="true">→</span></Link>
        <AuthenticStoryProcess />
      </div>
      <div className="service-grid reveal-group">
        {services.map((service, index) => (
          <Link className={`service-card reveal ${index === 0 ? "featured" : ""}`} href={`/services/${service.slug}`} key={service.slug}>
            <Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 36vw" />
            <span className="card-shade" />
            <div className="card-top">
              <span className="card-icon" aria-hidden="true">
                <svg width={index === 0 ? 26 : 20} height={index === 0 ? 26 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {SERVICE_ICONS[index % SERVICE_ICONS.length]}
                </svg>
              </span>
              <span className="card-number">{service.number}</span>
            </div>
            <div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const PROCESS_ICONS = [
  <>
    <path d="M6 8.5a6 6 0 1 1 12 0c0 2-1 3-2.2 3.9-1 .8-1.8 1.4-1.8 2.9v.7a2 2 0 0 1-4 0" />
    <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0" />
    <line x1="12" y1="20" x2="12" y2="21.5" />
  </>,
  <>
    <path d="M2 12.5l3.5-3.5 4 1.5 3-2.5 3 2.5 4-1.5L22 12" />
    <path d="M6 13.5l3 3a2 2 0 0 0 2.8 0l1.2-1.2 2.5 2.2a1.6 1.6 0 0 0 2.3-2.2L15 12" />
  </>,
  <>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </>,
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </>,
  <>
    <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15.5 8.5a4.5 4.5 0 0 1 0 7" />
    <path d="M18.5 6a7.5 7.5 0 0 1 0 12" />
  </>
];

function AuthenticStoryProcess() {
  const steps = [
    ["1. Listen", "Listen deeply to understand context and people."],
    ["2. Build Trust", "Earn trust through presence, respect and consistency."],
    ["3. Document", "Capture moments that reflect real experiences."],
    ["4. Tell the Story", "Craft the narrative with accuracy and sensitivity."],
    ["5. Amplify Impact", "Share strategically to inspire action and change."]
  ];

  return (
    <div className="story-process reveal">
      <div className="process-kicker">
        <span />
        <p>The Authentic Story Process</p>
      </div>
      <div className="process-timeline">
        {steps.map(([title, text], index) => (
          <article key={title} className={index === steps.length - 1 ? "is-last" : ""}>
            <div className="process-node-col">
              <div className="process-node" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  {PROCESS_ICONS[index]}
                </svg>
              </div>
              {index !== steps.length - 1 && <span className="process-node-line" />}
            </div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="process-foundation">
        Authenticity is not a step.
        <span>It is the foundation of every step.</span>
      </p>
    </div>
  );
}

function Stories({ stories }) {
  const featured = stories.slice(0, 3);
  return (
    <section id="work" className="section tonal-section">
      <div className="split-heading">
        <div>
          <p className="eyebrow reveal">Selected Work</p>
          <h2 className="reveal">Stories from the ground. Voices that matter.</h2>
        </div>
        <Link href="/stories" className="link-arrow">View All Stories<span aria-hidden="true">→</span></Link>
      </div>
      <div className="story-grid reveal-group">
        {featured.map((story) => (
          <Link className="story-card reveal" href={`/stories/${story.slug}`} key={story.slug}>
            <div className="story-image">
              <Image src={story.image} alt={story.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <span>{story.category}</span>
            </div>
            <h3>{story.title}</h3>
            <p>{story.excerpt}</p>
            <strong className="link-arrow">Read Story<span aria-hidden="true">→</span></strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    ["120+", "Stories Told"],
    ["80+", "Projects Delivered"],
    ["15+", "Countries Reached"],
    ["2M+", "Lives Represented On Screen"]
  ];
  return (
    <section id="impact" className="section impact-section">
      <div>
        <p className="eyebrow reveal">Our Impact</p>
        <h2 className="reveal">Stories have the power to move real decisions.</h2>
        <p className="reveal">
          From Kigali to the continent, every film and photograph is built to
          change a mind, unlock a budget, or shift a policy.
        </p>
      </div>
      <div className="stats-grid reveal-group">
        {stats.map(([value, label]) => (
          <div key={label} className="reveal">
            <StatCounter value={value} className="stats-grid-number" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section className="section testimonials-section">
      <div>
        <p className="eyebrow reveal">Clients Say</p>
        <h2 className="reveal">Trusted by partners. Driven by impact.</h2>
      </div>
      <div className="reveal">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div>
        <p className="eyebrow reveal">About Us</p>
        <h2 className="reveal">We are TrueStory Africa.</h2>
        <p className="reveal">
          We make documentary films, photography and communication content for
          NGOs, UN agencies, development partners and institutions who need their
          impact seen and believed.
        </p>
        <p className="reveal">
          Every project pairs cinematic craft with editorial rigor, so the story
          holds up in a boardroom and on a phone screen.
        </p>
        <Link href="#about" className="link-arrow">Learn More About Us<span aria-hidden="true">→</span></Link>
      </div>
      <Image
        className="about-photo reveal"
        src="/assets/images/about-photo.webp"
        alt="A woman holding a TrueStory Africa branded photo frame at an event"
        width={900}
        height={1200}
        sizes="(max-width: 1080px) 100vw, 32vw"
      />
      <aside className="reveal">
        <span className="about-aside-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </span>
        <h3>Let&apos;s tell your story.</h3>
        <p>Bring us your impact — we&apos;ll bring the audience.</p>
        <Link className="button primary" href="/contact">
          Get In Touch
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </aside>
    </section>
  );
}

function Team({ team }) {
  return (
    <section id="team" className="section team-section">
      <div className="split-heading">
        <div>
          <p className="eyebrow reveal">Our Team</p>
          <h2 className="reveal">The people behind the stories.</h2>
        </div>
        <Link href="/team" className="link-arrow">Meet the Full Team<span aria-hidden="true">→</span></Link>
      </div>
      <div className="team-grid reveal-group">
        {team.map((member) => (
          <article className="team-card reveal" key={member.name}>
            <div className="team-flip">
              <div className="team-flip-inner">
                <div className="team-flip-front">
                  <Image src={member.image} alt={member.alt} width={520} height={520} sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 25vw" />
                </div>
                <div className="team-flip-back">
                  <p>{member.bio}</p>
                </div>
              </div>
            </div>
            <span>{member.role}</span>
            <h3>{member.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

