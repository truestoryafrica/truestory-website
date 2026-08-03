import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedEvents, getService, getServices, getSiteContent } from "@/lib/cms";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { toYoutubeEmbedUrl } from "@/lib/video";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";

const serviceBenefits = [
  "Editorial planning shaped around your audience and goals.",
  "Field-ready production workflows for Rwanda and regional projects.",
  "Delivery formats prepared for web, social, reports and stakeholder presentations."
];

// Slugs that get a "video coming soon" placeholder linking to the real
// YouTube channel, until a specific published video is set on the service.
// Event Coverage doesn't need one - each event gallery below can carry its
// own video link instead of one generic placeholder for the whole page.
const videoPlaceholderSlugs = ["documentary-video-production-rwanda"];

function VideoPlaceholder({ site }) {
  return (
    <div className="video-placeholder">
      <span className="video-placeholder-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6 4 20 12 6 20" />
        </svg>
      </span>
      <div>
        <p className="eyebrow">Watch the Story</p>
        <h3>Full video coming soon</h3>
        <p>We&apos;re preparing the final cut for our YouTube channel — follow us there to catch it the moment it goes live.</p>
        <Link className="button ghost" href={site.social.youtube} target="_blank" rel="noopener noreferrer">
          Visit Our YouTube Channel
        </Link>
      </div>
    </div>
  );
}

function ServiceVideo({ site }) {
  const embedUrl = toYoutubeEmbedUrl(site.documentaryVideoUrl);
  if (!embedUrl) return <VideoPlaceholder site={site} />;
  return (
    <div className="service-video-frame">
      <iframe
        src={embedUrl}
        title="Documentary showreel"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    image: service.image
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const [service, { site, services }, events] = await Promise.all([
    getService(slug),
    getSiteContent(),
    getPublishedEvents()
  ]);
  if (!service) notFound();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Services", path: "/#services" },
                { name: service.title, path: `/services/${service.slug}` }
              ])
            )
          }}
        />
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Service {service.number}</p>
            <h1>{service.title}</h1>
            <p>{service.summary}</p>
            <div className="detail-actions">
              <Link className="button primary" href="/contact">Start a Project</Link>
              <Link className="button ghost" href="/#services">View All Services</Link>
            </div>
          </div>
          <div className="detail-image-frame">
            <Image src={service.image} alt={service.alt} width={1200} height={900} sizes="(max-width: 1080px) 100vw, 52vw" priority />
          </div>
        </section>
        <section className="detail-body">
          <h2>Built for impact-driven teams in Rwanda and across Africa.</h2>
          <p>
            TrueStory Africa combines documentary craft, field logistics and
            communication strategy so every deliverable is useful beyond the shoot:
            for campaigns, reports, fundraising, documentation and public trust.
          </p>
          <div className="detail-benefits">
            {serviceBenefits.map((benefit, index) => (
              <article key={benefit}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{benefit}</p>
              </article>
            ))}
          </div>
          {videoPlaceholderSlugs.includes(service.slug) && <ServiceVideo site={site} />}
          <div className="detail-closing-card">
            <p className="eyebrow">Ready when the story matters</p>
            <h3>Bring us in early and we will help shape the message, not just capture the visuals.</h3>
            <Link className="button primary" href="/contact">Plan With TrueStory Africa</Link>
          </div>
        </section>
        {service.slug === "event-coverage-rwanda" && (
          <section className="event-galleries">
            <p className="eyebrow">From Recent Events</p>
            <h2>Every event, its own story.</h2>
            <div className="event-gallery-list">
              {events.map((event) => (
                <EventGallery event={event} key={event.slug} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
