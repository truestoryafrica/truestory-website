import Link from "next/link";
import Image from "next/image";
import { getPublishedInsights, getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Insights on Documentary Storytelling in Africa",
  description:
    "Field notes, behind-the-scenes thinking and practical insights on documentary, photography and communication work in Rwanda and Africa.",
  path: "/insights",
  image: "/assets/images/hero-poster.webp"
});

export default async function InsightsIndexPage() {
  const [insights, { site, services }] = await Promise.all([getPublishedInsights(), getSiteContent()]);

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <section className="section tonal-section">
          <p className="eyebrow">Insights</p>
          <h1>Notes from the field.</h1>
          {insights.length === 0 && (
            <p className="hero-lede">New field notes and behind-the-scenes thinking are on the way — check back soon.</p>
          )}
          <div className="story-grid">
            {insights.map((insight) => (
              <Link className="story-card" href={`/insights/${insight.slug}`} key={insight.slug}>
                <div className="story-image">
                  <Image src={insight.image} alt={insight.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span>{insight.category}</span>
                </div>
                <h2>{insight.title}</h2>
                <p>{insight.excerpt}</p>
                <strong className="link-arrow">Read Insight<span aria-hidden="true">→</span></strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
