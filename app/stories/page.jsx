import Link from "next/link";
import Image from "next/image";
import { getPublishedStories, getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Impact Stories from Rwanda and Africa",
  description:
    "Explore TrueStory Africa impact stories across health, education, livelihoods and development work in Rwanda and Africa.",
  path: "/stories",
  image: "/assets/images/story-mothers-hope.webp"
});

export default async function StoriesIndexPage() {
  const [stories, { site, services }] = await Promise.all([getPublishedStories(), getSiteContent()]);

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <section className="section tonal-section">
          <p className="eyebrow">Impact Stories</p>
          <h1>Stories from the ground.</h1>
          <div className="story-grid">
            {stories.map((story) => (
              <Link className="story-card" href={`/stories/${story.slug}`} key={story.slug}>
                <div className="story-image">
                  <Image src={story.image} alt={story.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span>{story.category}</span>
                </div>
                <h2>{story.title}</h2>
                <p>{story.excerpt}</p>
                <strong className="link-arrow">Read Story<span aria-hidden="true">→</span></strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
