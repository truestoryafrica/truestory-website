import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInsight, getInsights, getSiteContent } from "@/lib/cms";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [insight, { site, services }] = await Promise.all([getInsight(slug), getSiteContent()]);
  if (!insight) notFound();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(insight, "/insights")) }}
        />
        <article className="story-detail">
          <header className="story-detail-header">
            <p className="eyebrow">{insight.category}</p>
            <h1>{insight.title}</h1>
            <p className="hero-lede">{insight.excerpt}</p>
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
            <div className="detail-actions">
              <Link className="button primary" href="/contact">Start a Similar Story</Link>
              <Link className="button ghost" href="/insights">More Insights</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
