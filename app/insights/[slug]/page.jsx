import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInsight, getInsights, getSiteContent } from "@/lib/cms";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { categoryServiceSlug } from "@/lib/insightCategories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function formatInsightDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.seoTitle,
    description: insight.seoDescription,
    path: `/insights/${insight.slug}`,
    image: insight.image,
    type: "article"
  });
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const [insight, insights, { site, services }] = await Promise.all([
    getInsight(slug),
    getInsights(),
    getSiteContent()
  ]);
  if (!insight) notFound();

  const others = insights.filter((item) => item.slug !== insight.slug && item.status !== "draft");
  const related = [
    ...others.filter((item) => item.category === insight.category),
    ...others.filter((item) => item.category !== insight.category)
  ].slice(0, 3);

  const metaItems = [insight.author, formatInsightDate(insight.date), insight.readingTime].filter(Boolean);
  const relatedServiceSlug = categoryServiceSlug[insight.category];
  const relatedService = relatedServiceSlug ? services.find((service) => service.slug === relatedServiceSlug) : null;

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(insight, "/insights")) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Insights", path: "/insights" },
                { name: insight.title, path: `/insights/${insight.slug}` }
              ])
            )
          }}
        />
        <article className="story-detail">
          <header className="story-detail-header">
            <p className="eyebrow">{insight.category}</p>
            <h1>{insight.title}</h1>
            <p className="hero-lede">{insight.excerpt}</p>
            {metaItems.length > 0 && (
              <div className="insight-meta">
                {metaItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
          </header>
          <div className="detail-image-frame wide">
            <Image src={insight.image} alt={insight.alt} width={1400} height={900} sizes="(max-width: 1080px) 100vw, 80vw" priority />
          </div>
          <div className="detail-body">
            {insight.bodyHtml ? (
              <div className="story-rich-body" dangerouslySetInnerHTML={{ __html: insight.bodyHtml }} />
            ) : (
              <p className="story-kicker">
                Field notes and behind-the-scenes thinking from the TrueStory Africa team.
              </p>
            )}
            {insight.tags.length > 0 && (
              <div className="insight-tags">
                {insight.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {relatedService && (
              <div className="detail-closing-card">
                <p className="eyebrow">Need this for your organization?</p>
                <h3>{relatedService.title}: {relatedService.summary}</h3>
                <Link className="button primary" href={`/services/${relatedService.slug}`}>
                  Explore {relatedService.title}
                </Link>
              </div>
            )}
            <div className="detail-actions">
              <Link className="button primary" href="/contact">Start a Similar Story</Link>
              <Link className="button ghost" href="/insights">More Insights</Link>
            </div>
          </div>
          {related.length > 0 && (
            <div className="insight-related">
              <h2>Related Insights</h2>
              <div className="story-grid">
                {related.map((item) => (
                  <Link className="story-card" href={`/insights/${item.slug}`} key={item.slug}>
                    <div className="story-image">
                      <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                      <span>{item.category}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <strong className="link-arrow">Read Insight<span aria-hidden="true">→</span></strong>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
