import Image from "next/image";

export default function CredibilityStrip({ partners }) {
  return (
    <section className="credibility-strip">
      <div className="credibility-strip-inner">
        <p className="credibility-label">
          Trusted by organizations
          <br />
          making a difference
        </p>
        <div className="credibility-partners">
          {partners.map((partner) =>
            partner.logo ? (
              <Image key={partner.name} src={partner.logo} alt={partner.name} width={120} height={40} className="credibility-logo" />
            ) : (
              <span key={partner.name}>{partner.name}</span>
            )
          )}
        </div>
        <span className="credibility-more" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </section>
  );
}
