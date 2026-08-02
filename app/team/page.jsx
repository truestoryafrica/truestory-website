import Image from "next/image";
import { team } from "@/content/site";
import { getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Our Team",
  description: "Meet the cinematographers, photographers and producers behind TrueStory Africa's documentary and communication work.",
  path: "/team"
});

export default async function TeamPage() {
  const { site, services } = await getSiteContent();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <section className="section tonal-section">
          <p className="eyebrow">Our Team</p>
          <h1>The people behind the stories.</h1>
          <div className="team-grid">
            {team.map((member) => (
              <article className="team-card" key={member.name}>
                <Image src={member.image} alt={member.alt} width={520} height={520} sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 25vw" />
                <span>{member.role}</span>
                <h2>{member.name}</h2>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
