import { getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Privacy Policy & Terms of Service",
  description:
    "TrueStory Africa's Terms & Conditions, Cookie Policy, Child Protection & Safeguarding Policy, and other legal and editorial policies.",
  path: "/terms"
});

export default async function TermsPage() {
  const { site, services } = await getSiteContent();

  return (
    <>
      <Header site={site} />
      <main className="detail-page">
        <div className="story-detail">
          <header className="story-detail-header">
            <p className="eyebrow">Legal</p>
            <h1>Privacy Policy &amp; Terms of Service</h1>
            <p className="hero-lede">
              Welcome to the TrueStory Africa website. By accessing or using this website, you agree
              to comply with these Terms &amp; Conditions. If you do not agree with any part of these
              terms, please do not use this website.
            </p>
          </header>
        </div>
        <div className="detail-body">
          <div className="story-rich-body">
            <h2>1. Terms &amp; Conditions</h2>

            <h3>Website Use</h3>
            <p>Users agree to use this website lawfully and respectfully. Users may not:</p>
            <ul>
              <li>Copy website content without permission</li>
              <li>Attempt unauthorized access to systems</li>
              <li>Upload harmful or malicious files</li>
              <li>Use website content for illegal purposes</li>
              <li>Misrepresent TrueStory Africa or its work</li>
            </ul>

            <h3>Intellectual Property</h3>
            <p>
              All content on this website including photography, videos, documentaries, graphics,
              branding materials, written content, logos, designs and creative concepts remains the
              intellectual property of TrueStory Africa unless otherwise stated. No content may be
              reproduced, distributed or commercially used without written permission.
            </p>

            <h3>Service Information</h3>
            <p>
              Information on this website is provided for general informational purposes. TrueStory
              Africa reserves the right to update services, modify pricing, change project timelines,
              adjust website content, or remove or update materials without prior notice.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
              TrueStory Africa is not liable for website interruptions, technical errors, third-party
              platform issues, temporary unavailability, loss caused by unauthorized access, or
              external links or third-party content.
            </p>

            <h3>External Links</h3>
            <p>
              This website may contain links to third-party platforms. TrueStory Africa is not
              responsible for external websites, services or privacy practices.
            </p>

            <h3>Governing Law</h3>
            <p>
              These Terms &amp; Conditions shall be governed in accordance with the laws of the
              Republic of Rwanda.
            </p>

            <h3>Contact</h3>
            <p>
              TrueStory Africa Ltd, Kigali, Rwanda
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.url}>{site.url}</a>
            </p>

            <h2>2. Cookie Policy</h2>

            <h3>Overview</h3>
            <p>
              This website may use cookies and similar technologies to improve website performance
              and user experience.
            </p>

            <h3>What Are Cookies?</h3>
            <p>Cookies are small files stored on a user&rsquo;s device when visiting a website.</p>

            <h3>Types of Cookies We May Use</h3>
            <ul>
              <li>Essential cookies</li>
              <li>Security cookies</li>
              <li>Analytics cookies</li>
              <li>Performance cookies</li>
              <li>Preference cookies</li>
            </ul>

            <h3>Purpose of Cookies</h3>
            <p>Cookies may help:</p>
            <ul>
              <li>Improve website functionality</li>
              <li>Understand website traffic</li>
              <li>Save user preferences</li>
              <li>Improve security</li>
              <li>Support analytics</li>
            </ul>

            <h3>Third-Party Cookies</h3>
            <p>
              Some embedded services such as YouTube, Vimeo, Instagram, LinkedIn and Google services
              may place cookies according to their own privacy policies.
            </p>

            <h3>Managing Cookies</h3>
            <p>
              Users may disable cookies through browser settings. Some website features may not
              function properly if cookies are disabled.
            </p>

            <h2>3. Child Protection &amp; Safeguarding Policy</h2>

            <h3>Commitment</h3>
            <p>
              TrueStory Africa is committed to protecting children and vulnerable individuals during
              all productions, storytelling activities and communication projects.
            </p>

            <h3>Safeguarding Principles</h3>
            <p>TrueStory Africa commits to:</p>
            <ul>
              <li>Respecting the dignity of children</li>
              <li>Prioritizing safety and wellbeing</li>
              <li>Protecting identities where necessary</li>
              <li>Avoiding exploitative storytelling</li>
              <li>Ensuring informed consent</li>
              <li>Using ethical production practices</li>
            </ul>

            <h3>Consent Requirements</h3>
            <p>Projects involving children may require:</p>
            <ul>
              <li>Parent or guardian consent</li>
              <li>Institutional approval</li>
              <li>School authorization where applicable</li>
              <li>Child-friendly communication approaches</li>
            </ul>

            <h3>Content Restrictions</h3>
            <p>TrueStory Africa will not knowingly produce or publish content that:</p>
            <ul>
              <li>Exploits children</li>
              <li>Misrepresents vulnerable individuals</li>
              <li>Endangers participants</li>
              <li>Violates dignity or privacy</li>
              <li>Promotes abuse or discrimination</li>
            </ul>

            <h3>Identity Protection</h3>
            <p>Where necessary, identities may be protected through:</p>
            <ul>
              <li>Limited identifying information</li>
              <li>Controlled publication</li>
              <li>Restricted access</li>
              <li>Image or name protection</li>
            </ul>

            <h3>Reporting Concerns</h3>
            <p>
              Any safeguarding concerns may be reported to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>4. Photo &amp; Video Consent Release Form</h2>
            <p>
              I voluntarily agree to participate in photography, video, documentary or storytelling
              content produced by TrueStory Africa. I understand that:
            </p>
            <ul>
              <li>My image, voice or statements may appear in public materials</li>
              <li>Content may be published online, on social media, websites or promotional platforms</li>
              <li>Content may be used for communication, awareness, educational or promotional purposes</li>
            </ul>
            <p>I confirm that:</p>
            <ul>
              <li>Participation is voluntary</li>
              <li>I may ask questions before participation</li>
              <li>I understand the purpose of the production</li>
            </ul>
            <p>
              Participants (or, for minors, a parent or guardian) are asked to provide their name,
              signature, date, relationship to child (where applicable) and contact details as part
              of this release.
            </p>

            <h2>5. Client Service Agreement</h2>

            <h3>Scope of Work</h3>
            <p>
              TrueStory Africa agrees to provide creative and communication services as agreed with
              the client, which may include photography, videography, documentary production,
              editing, branding, communication consultancy and content production.
            </p>

            <h3>Project Timelines</h3>
            <p>
              Project timelines will be agreed before production begins. Delays caused by weather,
              travel restrictions, client approvals, technical issues or force majeure events may
              affect delivery schedules.
            </p>

            <h3>Payment Terms</h3>
            <p>
              Clients agree to payment terms stated in quotations or invoices. Payments may include
              deposits, milestone payments and final delivery payments. Late payments may affect
              project timelines.
            </p>

            <h3>Revisions</h3>
            <p>
              Reasonable revisions may be included depending on project agreements. Additional
              revisions beyond agreed scope may incur extra charges.
            </p>

            <h3>Ownership &amp; Licensing</h3>
            <p>Unless otherwise agreed in writing:</p>
            <ul>
              <li>TrueStory Africa retains ownership of raw production files</li>
              <li>Final deliverables may be licensed to clients for agreed usage</li>
              <li>Portfolio usage rights may apply</li>
            </ul>

            <h3>Cancellation</h3>
            <p>
              Project cancellations after production begins may result in partial charges based on
              completed work.
            </p>

            <h2>6. Copyright &amp; Licensing Policy</h2>

            <h3>Ownership</h3>
            <p>All original materials produced by TrueStory Africa remain protected by copyright laws.</p>

            <h3>Licensing</h3>
            <p>
              Clients may receive usage rights according to project agreements, which may include
              internal use, social media use, commercial use, broadcast use, or campaign use.
            </p>

            <h3>Restrictions</h3>
            <p>
              Content may not be resold, redistributed, edited beyond agreed permissions, or used
              unlawfully without written approval.
            </p>

            <h3>Portfolio Rights</h3>
            <p>
              TrueStory Africa may showcase completed work for portfolio purposes, website display,
              awards submissions and social media promotion, unless restricted by written agreement.
            </p>

            <h2>7. Code of Ethics &amp; Editorial Standards</h2>

            <h3>Ethical Storytelling</h3>
            <p>TrueStory Africa is committed to truthful, respectful and responsible storytelling.</p>

            <h3>Editorial Principles</h3>
            <p>We commit to accuracy, respect, human dignity, cultural sensitivity, informed consent, child protection and honest representation.</p>

            <h3>Documentary Integrity</h3>
            <p>
              TrueStory Africa does not intentionally manipulate documentary situations in ways that
              misrepresent reality.
            </p>

            <h3>Respect for Communities</h3>
            <p>Communities and participants should be represented fairly and respectfully.</p>

            <h3>AI-Assisted Workflows</h3>
            <p>
              AI tools may support workflows but will not intentionally misrepresent real people,
              documentary situations, factual events or communities. Human editorial oversight
              remains part of production processes.
            </p>

            <h2>8. Accessibility Statement</h2>
            <p>
              TrueStory Africa is committed to improving accessibility and digital inclusion. We
              continue working toward making our website and digital platforms more accessible for
              all users. Users experiencing accessibility difficulties may contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>9. Refund &amp; Cancellation Policy</h2>

            <h3>Deposits</h3>
            <p>Deposits may be non-refundable once project preparation or production begins.</p>

            <h3>Cancellation by Client</h3>
            <p>
              Cancellation charges may apply depending on production stage, reserved dates, travel
              costs, equipment bookings and completed work.
            </p>

            <h3>Cancellation by TrueStory Africa</h3>
            <p>
              If TrueStory Africa cannot complete a project due to unforeseen circumstances,
              reasonable efforts will be made to reschedule, provide alternative arrangements, or
              discuss fair solutions.
            </p>

            <h2>10. Social Media Community Guidelines</h2>
            <p>Users engaging with TrueStory Africa social media platforms should remain respectful and avoid hate speech, harassment, spam, or false or harmful information.</p>
            <p>TrueStory Africa reserves the right to remove comments or block users engaging in abusive conduct.</p>

            <h2>11. NDA &amp; Confidentiality Statement</h2>
            <p>
              TrueStory Africa respects confidential information shared by clients, partners and
              collaborators, including internal documents, unreleased campaigns, production concepts,
              financial information and sensitive project details. Confidential information will not
              be shared without authorization unless legally required.
            </p>

            <h2>12. Brand Guidelines Summary</h2>

            <h3>Logo Usage</h3>
            <p>
              The TrueStory Africa logo should maintain correct proportions and approved colors, not
              be stretched or distorted, and maintain spacing around the logo.
            </p>

            <h3>Brand Colors</h3>
            <p>Primary colors: Black, White, Deep Red.</p>

            <h3>Typography</h3>
            <p>Primary font: Satoshi. Secondary font: Inter.</p>

            <h3>Brand Tone</h3>
            <p>The brand tone should feel human, authentic, documentary-driven, professional, cinematic, clean and modern.</p>

            <h3>Slogan</h3>
            <p>&ldquo;Real Stories. Clear Impact.&rdquo;</p>

            <h2>13. Health &amp; Safety Production Guidelines</h2>

            <h3>Production Safety</h3>
            <p>TrueStory Africa prioritizes safety during field productions and assignments.</p>

            <h3>Safety Measures</h3>
            <p>Production teams may assess travel safety, crowd safety, weather conditions, equipment handling, local permissions and emergency access.</p>

            <h3>Drone Usage</h3>
            <p>Drone operations must comply with applicable aviation and local regulations.</p>

            <h3>Field Conduct</h3>
            <p>
              Production teams should respect local communities and institutional rules, avoid
              unsafe production practices, and prioritize participant safety.
            </p>

            <h2>14. Portfolio Usage Policy</h2>
            <p>
              Unless otherwise agreed in writing, TrueStory Africa may display completed work for
              website portfolio, social media, showreels, awards submissions and professional
              presentations. Clients requesting confidentiality restrictions should communicate them
              before project completion.
            </p>

            <h2>15. AI Usage &amp; Authenticity Policy</h2>
            <p>TrueStory Africa values authentic storytelling. AI-assisted tools may support editing workflows, caption generation, workflow organization and production support.</p>
            <p>
              AI will not intentionally be used to fabricate documentary events, misrepresent people,
              create deceptive journalism, or falsify testimonies. Human editorial review remains
              part of all final outputs.
            </p>

            <h2>16. Media Kit Content</h2>
            <p>
              The TrueStory Africa media kit may include a company overview, founder profile, service
              list, brand guidelines, portfolio highlights, client list where approved, contact
              information, logo files and press-ready materials.
            </p>

            <blockquote>Real Stories. Clear Impact.</blockquote>

            <p>
              TrueStory Africa Ltd, Kigali, Rwanda
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.url}>{site.url}</a>
            </p>
          </div>
        </div>
      </main>
      <Footer site={site} services={services} />
    </>
  );
}
