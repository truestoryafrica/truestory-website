import { site } from "@/content/site";

const defaultKeywords = [
  "documentary production Rwanda",
  "photography services Kigali",
  "event coverage Rwanda",
  "communication services Rwanda",
  "NGO storytelling Africa",
  "impact storytelling Rwanda",
  "TrueStory Africa"
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const SEO_TITLE_MAX = 60;
const SEO_DESCRIPTION_MAX = 160;
const BRAND_SUFFIX = ` | ${site.name}`;

// Truncates at the last word boundary before the limit rather than
// mid-word, so search engines don't cut titles/descriptions off looking
// like "...Photography Comp" in results.
function truncateAtWord(value, maxLength) {
  const str = String(value || "").trim();
  if (str.length <= maxLength) return str;
  const clipped = str.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped}…`;
}

// Story/insight titles are free text typed into the admin dashboard, which
// has no dedicated SEO title field - it always derives one from the title.
// Truncating the title portion (not the final string) keeps the brand
// suffix intact instead of risking it getting cut off.
export function defaultSeoTitle(title) {
  return `${truncateAtWord(title, SEO_TITLE_MAX - BRAND_SUFFIX.length)}${BRAND_SUFFIX}`;
}

export function clampSeoTitle(value) {
  return truncateAtWord(value, SEO_TITLE_MAX);
}

export function clampSeoDescription(value) {
  return truncateAtWord(value, SEO_DESCRIPTION_MAX);
}

export function pageMetadata({
  title = "Documentary, Photography & Communication Services in Rwanda",
  description = site.description,
  path = "/",
  image = "/assets/images/hero-poster.webp",
  type = "website"
} = {}) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    keywords: defaultKeywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large"
      }
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_RW",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} visual storytelling`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: absoluteUrl("/assets/logo/truestory-africa-logo.svg"),
        description: site.description,
        email: site.email,
        telephone: site.phone,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          email: site.email,
          contactType: "customer service",
          areaServed: ["RW", "Africa"],
          availableLanguage: ["English", "Kinyarwanda"]
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressCountry: "RW"
        },
        sameAs: Object.values(site.social)
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        image: absoluteUrl("/assets/images/hero-poster.webp"),
        telephone: site.phone,
        email: site.email,
        priceRange: "$$",
        areaServed: [
          { "@type": "Country", name: "Rwanda" },
          { "@type": "Place", name: "Africa" }
        ],
        serviceType: [
          "Documentary video production",
          "Photography",
          "Event coverage",
          "Communication support",
          "Content writing",
          "Social media management"
        ],
        knowsAbout: defaultKeywords
      }
    ]
  };
}

export function serviceJsonLd(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    image: absoluteUrl(service.image),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    areaServed: [
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Place", name: "Africa" }
    ],
    url: absoluteUrl(`/services/${service.slug}`)
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function articleJsonLd(story, basePath = "/stories") {
  const hasNamedAuthor = story.author && story.author.trim() && story.author !== site.name;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(story.image)
    },
    datePublished: story.date,
    dateModified: story.updatedAt || story.date,
    author: hasNamedAuthor
      ? { "@type": "Person", name: story.author }
      : { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/logo/truestory-africa-logo.svg")
      }
    },
    mainEntityOfPage: absoluteUrl(`${basePath}/${story.slug}`)
  };
}
