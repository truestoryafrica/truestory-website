# TrueStory Africa — Website

The marketing site and built-in CMS for TrueStory Africa, a documentary, photography and
communications studio based in Kigali, Rwanda. Built with Next.js (App Router), with a
custom admin dashboard instead of a third-party CMS.

- **Live domain:** truestoryafrica.com
- **Framework:** Next.js 15 (App Router, React 19)
- **Database:** Postgres (see [Database setup](#database-setup))
- **Styling:** a single hand-written `app/globals.css` — no CSS framework

---

## Folder structure

```
├── app/                        Routes (Next.js App Router — one folder per URL segment)
│   ├── page.jsx                 Homepage — all landing-page sections live in this one file
│   ├── layout.jsx                Root HTML shell: fonts, theme-flash prevention script, metadata
│   ├── globals.css                Every style in the site (design tokens, components, responsive)
│   ├── manifest.js, robots.js, sitemap.js   Dynamically generated — do not add static
│   │                                          robots.txt/sitemap.xml files, they'd be ignored
│   ├── team/page.jsx              /team — full team listing
│   ├── stories/                   /stories (listing) and /stories/[slug] (story detail)
│   ├── insights/                  /insights (listing) and /insights/[slug] (insight detail)
│   ├── services/[slug]/page.jsx   /services/<slug> — one page per service, no listing index
│   ├── admin/
│   │   ├── page.jsx                /admin — the dashboard (protected, see middleware.js)
│   │   └── login/page.jsx          /admin/login — password entry
│   └── api/
│       ├── contact/route.js               Public contact form handler — saves to the database
│       │                                    and notifies via Formspree (see Environment variables)
│       └── admin/                          Dashboard actions (all session-protected)
│           ├── login/, logout/              Session cookie issue/clear
│           ├── stories/, stories/delete/    Create / delete a story
│           ├── insights/, insights/delete/  Create / delete an insight
│           ├── settings/                    Update editable site settings
│           └── upload/                      Upload an image to Supabase Storage, returns its public URL
│
├── components/                 Shared React components used across routes
│   ├── Header.jsx, Footer.jsx, Brand.jsx     Site chrome — used on every page, not just home
│   ├── ContactForm.jsx                       The public contact form (client component)
│   ├── ThemeToggle.jsx                       Light/dark switch
│   ├── ScrollReveal.jsx, ScrollProgressBar.jsx, ScrollProgressDots.jsx, HeaderScrollEffect.jsx
│   │                                          Scroll-driven animation/UI behaviour, homepage-only
│   ├── StatCounter.jsx                       Animated count-up number (Impact section)
│   └── AdminDashboardClient.jsx              The entire admin dashboard UI (client component)
│
├── lib/                         Server-side logic — no UI
│   ├── cms.js                    getSiteContent() — merges database content with content/site.js
│   │                              fallback content. Every page reads content through this file,
│   │                              never directly from content/site.js or the database.
│   ├── db.js                     Postgres client (lib/db.js reads DATABASE_URL)
│   ├── schema.sql                 Run this once against your database before setting DATABASE_URL
│   ├── localStories.js            Story CRUD (database-backed)
│   ├── localInsights.js           Insight CRUD (database-backed)
│   ├── localMessages.js           Contact message storage — write-only from the admin's point of
│   │                              view; kept as a backup record, not shown in the dashboard UI
│   ├── localSettings.js           Editable site settings read/write (database-backed)
│   ├── adminAuth.js               Password check, session tokens, login rate-limiting
│   └── seo.js                     Shared metadata/JSON-LD builders used by every page
│
├── content/
│   └── site.js                    Seed/fallback content: site info, services, sample stories,
│                                  team. Always present even with an empty database — this is
│                                  what keeps the site working before you've configured Postgres.
│
├── public/
│   └── assets/
│       ├── images/                See "Image naming convention" below
│       ├── team/                  Team headshots, named person-first-last.jpeg
│       ├── logo/                  Brand logo (SVG)
│       └── icons/                 favicon.svg
│   (Images uploaded through the admin dashboard do NOT land here — they go to Supabase
│    Storage, see "Image uploads" below. A serverless host's filesystem is disposable, so
│    anything saved to public/ at runtime would silently disappear.)
│
├── middleware.js                Protects every /admin/* route except /admin/login
├── next.config.mjs               Image formats, security headers, cache headers
├── CMS-SEO-CHECKLIST.md          Editorial checklist — read before publishing a new story
├── .env / .env.example           See "Environment variables" below
└── package.json
```

---

## Image naming convention

Files in `public/assets/images/` and `public/assets/team/` are named after **what they are
used for**, not where they came from — so the filename alone tells you which section of the
site will break if you move or delete it.

| Pattern | Example | Used for |
|---|---|---|
| `hero-*` | `hero-poster.webp` | The homepage hero's right-hand image |
| `service-*` | `service-photo-storytelling.webp` | One per entry in the Services grid (`content/site.js`) |
| `story-*` | `story-mothers-hope.webp` | One per impact story |
| `about-*` | `about-photo.webp` | The About section photo |
| `public/assets/team/first-last.jpeg` | `laury-habyarimana.jpeg` | Team headshots |

If you add a new service, story, or team member, follow the same pattern rather than using
a generic name — it makes the next person's `grep` a lot more useful.

---

## Getting started

```bash
npm install
cp .env.example .env   # then fill in real values, see below
npm run dev
```

Open http://localhost:3000. Admin dashboard: http://localhost:3000/admin/login.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | For a working admin/CMS | Postgres connection string — see [Database setup](#database-setup) |
| `NEXT_PUBLIC_SUPABASE_URL` | For image uploads | Your Supabase project URL — see [Image uploads](#image-uploads) |
| `SUPABASE_ANON_KEY` | For image uploads | Supabase anon/publishable API key — see [Image uploads](#image-uploads) |
| `ADMIN_PASSWORD` | In production | Admin login password. **Without this set, the admin panel auto-locks in production** rather than falling back to a default — this is intentional and safe. |
| `ADMIN_SESSION_TOKEN` | In production | Long random string used to sign the admin session cookie |
| `RESEND_API_KEY` | For admin password reset | Resend (resend.com) API key used to email the reset link from `/admin/forgot-password` |
| `RESEND_FROM_EMAIL` | Optional | From-address for reset emails; falls back to `TrueStory Africa <onboarding@resend.dev>` if unset |
| `NEXT_PUBLIC_SITE_URL` | Yes | Used to build canonical URLs, sitemap, Open Graph tags |
| `FORMSPREE_FORM_ID` | Optional | If set, contact form submissions are forwarded to this Formspree form for email notification. Submissions are always saved to the database regardless. |
| `CONTACT_WEBHOOK_URL` | Optional | If set, also POSTs each submission here (Slack/Zapier/Make automation) |
| `CONTACT_WEBHOOK_SECRET` | Optional | Sent as a Bearer token to `CONTACT_WEBHOOK_URL` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console ownership check |

## Database setup

The admin dashboard (stories, contact messages, site settings) is backed by Postgres.
Without `DATABASE_URL` set, the public site still works and shows the seed content from
`content/site.js`, but nothing created in the admin dashboard will be saved.

1. Create a Postgres database — [Supabase](https://supabase.com) has a free tier and takes
   about two minutes to set up.
2. In its SQL editor, run the contents of `lib/schema.sql` once.
3. Copy the connection string (prefer the "transaction pooler" variant on port `6543` if
   your provider offers one — it behaves better under serverless hosting) into
   `DATABASE_URL` in `.env` locally, and in your hosting provider's environment variables
   for production.

## Image uploads

Images uploaded through the admin dashboard (story/insight cover images) are stored in
Supabase Storage, not on the app server's own filesystem — a serverless host like Vercel
recycles its filesystem constantly, so anything saved there at runtime would vanish.

Uses the same Supabase project as the database:

1. In your Supabase dashboard: **Project Settings → Data API** for the project URL, and
   **Project Settings → API Keys** for the anon/publishable key.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env` (and in your hosting
   provider's environment variables for production).
3. A public `uploads` storage bucket and an insert policy for it already exist on the
   project — this was set up once via SQL against `storage.buckets` / `storage.objects`.
   You don't need to redo this per environment; it's a property of the Supabase project,
   not the app deployment.

The anon key is safe to expose (it's meant to be public — that's what "publishable" means);
write access to the bucket is gated by the app's own admin session check before it ever
calls Supabase, not by Supabase-side auth.

## Content model

`lib/cms.js` is the single entry point every page uses to read content — never import
`content/site.js` directly from a page. `getSiteContent()` merges:

- **Seed content** (`content/site.js`) — services, sample stories, team, and default site
  info. This is what renders if the database is empty or unreachable.
- **Database content** — stories and settings created/edited through `/admin`. A
  database story with the same slug as a seed story replaces it; otherwise it's added.

## Deployment

The site is built for Vercel (the `next.config.mjs` headers and `postgres` driver's
connection pooling assume a serverless environment).

1. Push to the GitHub repo connected to your Vercel project.
2. Set the environment variables listed above in Vercel's project settings.
3. Deploy. `npm run build` runs automatically.

If you're replacing the previous static site at the same domain, see the project owner
for how the domain is currently attached in Vercel — moving it to point at this project is a
few clicks in the Vercel dashboard, not a DNS change.

## Before publishing content

Read `CMS-SEO-CHECKLIST.md` before adding a new story, service, or landing page — it covers
required fields, image sizing, and the SEO output the CMS generates automatically.

## Scripts

```bash
npm run dev      # local dev server, http://localhost:3000
npm run build    # production build
npm run start    # run a production build locally (after npm run build)
npm run lint     # ESLint
```
