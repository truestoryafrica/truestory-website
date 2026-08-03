import Link from "next/link";
import Brand from "@/components/Brand";

export default function Footer({ site, services }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Brand size={32} />
            <p>{site.tagline} Across Africa.</p>
          </div>
          <nav aria-label="Company">
            <strong>Company</strong>
            <Link href="/#about">About Us</Link>
            <Link href="/#team">Our Team</Link>
            <Link href="/#work">Stories</Link>
            <Link href={`mailto:${site.email}?subject=Careers%20at%20TrueStory%20Africa`}>Careers</Link>
            <Link href="/admin/login">Admin Login</Link>
          </nav>
          <nav aria-label="Services">
            <strong>Services</strong>
            {services.slice(0, 4).map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>
            ))}
          </nav>
          <nav aria-label="Connect">
            <strong>Connect</strong>
            <div className="footer-connect-info">
              <span>{site.location}</span>
              <Link href={`mailto:${site.email}`}>{site.email}</Link>
              <Link href={`tel:${site.phone}`}>{site.displayPhone}</Link>
            </div>
            <div className="footer-social-icons">
              <Link href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link href="/terms">Privacy Policy &amp; Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
