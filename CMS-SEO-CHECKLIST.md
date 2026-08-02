# CMS SEO Checklist

Use this checklist for every story, service page, team profile, and future landing page.

## Required Fields
- `title`: 50-60 characters, with the main keyword and location when natural.
- `slug`: short, lowercase, hyphenated, and stable after publishing.
- `meta_description`: 140-160 characters, written as a search result snippet.
- `excerpt`: 1-2 sentence editorial summary for cards and previews.
- `featured_image`: compressed WebP/JPEG with descriptive alt text.
- `image_alt`: specific, human-readable description of the image.
- `canonical_url`: final public URL for the page.
- `publish_date` and `updated_date`: used for article schema and sitemap freshness.
- `category`: documentary, photography, event coverage, communication, writing, or impact story.
- `location`: city/country when relevant, such as Kigali, Rwanda.

## Automatic CMS Output
- Generate clean URLs such as `/stories/mothers-hope-rwanda/`.
- Generate page-specific `<title>`, meta description, Open Graph, and Twitter tags.
- Generate JSON-LD using `Article`, `ImageObject`, `BreadcrumbList`, and `Organization`.
- Add every public page to `sitemap.xml` with the latest `updated_date`.
- Exclude drafts, private pages, duplicate archive pages, and test pages from the sitemap.
- Add canonical URLs to prevent duplicate content.
- Use descriptive image filenames before upload, such as `documentary-filming-rwanda-health-clinic.jpg`.

## Content Strategy
- Create separate landing pages for high-intent searches:
  - Documentary video production in Rwanda
  - Photography services in Kigali
  - Event coverage in Rwanda
  - Communication services for NGOs in Africa
  - Impact storytelling for development organizations
- Publish case studies that explain the client goal, production process, location, deliverables, and measurable impact.
- Add internal links from stories to related services and from services to relevant stories.
- Keep page load fast by compressing images, lazy-loading below-the-fold media, and using modern image formats.

## Quality Rules
- One clear `h1` per page.
- Headings should follow a logical order.
- Every image needs meaningful alt text.
- Every story needs a unique title, slug, and meta description.
- Avoid placeholder links, duplicate pages, and thin pages with little useful content.
