import Link from "next/link";
import Image from "next/image";
import { getPublishedInsights, getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBrowser from "@/components/InsightsBrowser";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Insights on Documentary Storytelling",
  description:
    "Field notes, behind-the-scenes thinking and practical insights on documentary, photography and communication work in Rwanda and Africa.",
  path: "/insights",
  image: "/assets/images/hero-poster.webp"
});

function formatInsightDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function InsightMeta({ insight }) {
  const items = [insight.author, formatInsightDate(insight.date), insight.readingTime].filter(Boolean);
  if (!items.length) return null;
  return (
    <div className="insight-meta">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function FeaturedInsight({ insight }) {
  return (
    <Link className="insight-featured" href={`/insights/${insight.slug}`}>
      <div className="insight-featured-image">
        <Image src={insight.image} alt={insight.alt} fill sizes="(max-width: 900px) 100vw, 55vw" priority />
        <span>{insight.category}</span>
      </div>
      <div className="insight-featured-body">
        <p className="eyebrow">Featured Insight</p>
        <InsightMeta insight={insight} />
        <h2>{insight.title}</h2>
        <p>{insight.excerpt}</p>
        <strong className="link-arrow">Read Insight<span aria-hidden="true">→</span></strong>
      </div>
    </Link>
  );
}

export default async function InsightsIndexPage() {
  const [insights, { site, services }] = await Promise.all([getPublishedInsights(), getSiteContent()]);
  const featured = insights.find((insight) => insight.featured) || insights[0];

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <section className="detail-hero insights-hero">
          <div>
            <p className="eyebrow">Insights</p>
            <h1>Insights</h1>
            <p className="hero-lede">
              Ideas, guides and stories that shape documentary storytelling, photography,
              strategic communication and visual impact across Africa.
            </p>
            <div className="detail-actions">
              <Link className="link-arrow" href="#latest-insights">
                Explore Insights<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="detail-image-frame">
            <Image
              src="/assets/images/service-documentary-video.webp"
              alt="TrueStory Africa photographer capturing a story in the field"
              width={1200}
              height={900}
              sizes="(max-width: 1080px) 100vw, 52vw"
              priority
            />
          </div>
        </section>

        <section className="section tonal-section" id="latest-insights">
          {featured && <FeaturedInsight insight={featured} />}
          <p className="eyebrow reveal">Latest Insights</p>
          <InsightsBrowser insights={insights} />
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
