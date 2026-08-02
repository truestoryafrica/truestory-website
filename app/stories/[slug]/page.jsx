import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteContent, getStories, getStory } from "@/lib/cms";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return pageMetadata({
    title: story.seoTitle,
    description: story.seoDescription,
    path: `/stories/${story.slug}`,
    image: story.image,
    type: "article"
  });
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const [story, { site, services }] = await Promise.all([getStory(slug), getSiteContent()]);
  if (!story) notFound();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(story)) }}
        />
        <article className="story-detail">
          <header className="story-detail-header">
            <p className="eyebrow">{story.category} / {story.location}</p>
            <h1>{story.title}</h1>
            <p className="hero-lede">{story.excerpt}</p>
          </header>
          <div className="detail-image-frame wide">
            <Image src={story.image} alt={story.alt} width={1400} height={900} sizes="(max-width: 1080px) 100vw, 80vw" priority />
          </div>
          <div className="detail-body">
            {story.bodyHtml ? (
              <div className="story-rich-body" dangerouslySetInnerHTML={{ __html: story.bodyHtml }} />
            ) : (
              <>
                <p className="story-kicker">
                  Produced for teams that need impact to be understood clearly,
                  emotionally and credibly.
                </p>
                <p>
                  TrueStory Africa approaches each assignment with a documentary eye:
                  listening first, building trust with people on the ground, and
                  shaping the final story around the audience that needs to act.
                </p>
                <p>
                  The result is a story that feels human, useful and ready for the
                  platforms where decisions are made: websites, reports, campaigns,
                  social media and stakeholder presentations.
                </p>
              </>
            )}
            <div className="detail-actions">
              <Link className="button primary" href="/contact">Start a Similar Story</Link>
              <Link className="button ghost" href="/stories">Explore More Stories</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
