import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Start a documentary, photography or communications project with TrueStory Africa. Based in Kigali, Rwanda, working across the continent.",
  path: "/contact"
});

export default async function ContactPage() {
  const { site, services } = await getSiteContent();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <section className="section contact-section">
          <div>
            <p className="eyebrow gold">From brief to broadcast</p>
            <h1>Ready to tell a story worth funding?</h1>
            <p>
              Bring the mission, the audience and the moment. Send a short brief and
              TrueStory Africa will respond with scope, timing and the right
              production approach.
            </p>
            <div className="contact-tags">
              <span>Based in Kigali</span>
              <span>Across Africa</span>
              <span>Film + Photo + Comms</span>
            </div>
            <ContactForm />
            <div className="contact-direct-cards">
              <Link className="contact-direct-card" href={`mailto:${site.email}`}>
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span>
                  <strong>Email</strong>
                  <p>{site.email}</p>
                </span>
              </Link>
              <Link className="contact-direct-card" href={`tel:${site.phone}`}>
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 0-2Z" />
                  </svg>
                </span>
                <span>
                  <strong>Call</strong>
                  <p>{site.displayPhone}</p>
                </span>
              </Link>
            </div>
          </div>
          <div className="process-card">
            {[
              ["01", "Share the mission", "Who the story is for, where it will be used, and what action it should support."],
              ["02", "Choose the format", "Film, photography, event coverage, writing, social media or a campaign package."],
              ["03", "Plan production", "TrueStory Africa responds with a practical scope, schedule and next steps."]
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
