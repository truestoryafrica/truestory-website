import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteContent, getStories, getStory } from "@/lib/cms";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function formatStoryDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

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
  const [story, stories, { site, services }] = await Promise.all([getStory(slug), getStories(), getSiteContent()]);
  if (!story) notFound();

  const others = stories.filter((item) => item.slug !== story.slug && item.status !== "draft");
  const related = [
    ...others.filter((item) => item.category === story.category),
    ...others.filter((item) => item.category !== story.category)
  ].slice(0, 3);

  const metaItems = [story.author, formatStoryDate(story.date), story.readingTime].filter(Boolean);

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(story)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Stories", path: "/stories" },
                { name: story.title, path: `/stories/${story.slug}` }
              ])
            )
          }}
        />
        <article className="story-detail">
          <header className="story-detail-header">
            <p className="eyebrow">{story.category} / {story.location}</p>
            <h1>{story.title}</h1>
            <p className="hero-lede">{story.excerpt}</p>
            {metaItems.length > 0 && (
              <div className="insight-meta">
                {metaItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
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
            {story.tags?.length > 0 && (
              <div className="insight-tags">
                {story.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            <div className="detail-actions">
              <Link className="button primary" href="/contact">Start a Similar Story</Link>
              <Link className="button ghost" href="/stories">Explore More Stories</Link>
            </div>
          </div>
          {related.length > 0 && (
            <div className="insight-related">
              <h2>Related Stories</h2>
              <div className="story-grid">
                {related.map((item) => (
                  <Link className="story-card" href={`/stories/${item.slug}`} key={item.slug}>
                    <div className="story-image">
                      <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                      <span>{item.category}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <strong className="link-arrow">Read Story<span aria-hidden="true">→</span></strong>
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
