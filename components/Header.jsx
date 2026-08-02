import Link from "next/link";
import Brand from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export default function Header({ site }) {
  return (
    <header id="site-header" className="site-header">
      <HeaderScrollEffect />
      <Link className="brand-link" href="/" aria-label={`${site.name} home`}>
        <Brand />
      </Link>
      <div className="nav-group">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/" data-nav="home">Home</Link>
          <Link href="/#services" data-nav="services">Services</Link>
          <Link href="/#work" data-nav="work">Stories</Link>
          <Link href="/#impact" data-nav="impact">Impact</Link>
          <Link href="/#about" data-nav="about">About</Link>
          <Link href="/#team" data-nav="team">Team</Link>
          <Link href="/insights" data-nav="insights">Insights</Link>
          <Link href="/contact" data-nav="contact">Contact</Link>
        </nav>
        <ThemeToggle />
        <Link className="nav-cta" href="/contact">
          Work With Us
          <span className="icon-circle" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
      <details className="mobile-menu">
        <summary aria-label="Open navigation menu">
          <span />
          <span />
        </summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#work">Stories</Link>
          <Link href="/#impact">Impact</Link>
          <Link href="/#about">About</Link>
          <Link href="/#team">Team</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact">Work With Us</Link>
        </nav>
      </details>
    </header>
  );
}
