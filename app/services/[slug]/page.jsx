import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, getServices, getSiteContent } from "@/lib/cms";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serviceBenefits = [
  "Editorial planning shaped around your audience and goals.",
  "Field-ready production workflows for Rwanda and regional projects.",
  "Delivery formats prepared for web, social, reports and stakeholder presentations."
];

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
  const [service, { site, services }] = await Promise.all([getService(slug), getSiteContent()]);
  if (!service) notFound();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
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
          <div className="detail-closing-card">
            <p className="eyebrow">Ready when the story matters</p>
            <h3>Bring us in early and we will help shape the message, not just capture the visuals.</h3>
            <Link className="button primary" href="/contact">Plan With TrueStory Africa</Link>
          </div>
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
