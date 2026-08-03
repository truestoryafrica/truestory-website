import { randomUUID } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { clampSeoDescription, clampSeoTitle, defaultSeoTitle } from "@/lib/seo";

export async function getLocalInsights() {
  if (!isDatabaseConfigured()) return [];
  try {
    const sql = getDb();
    const rows = await sql`select * from insights order by date desc`;
    return rows.map(mapInsightRow);
  } catch (error) {
    console.error("getLocalInsights failed:", error.message);
    return [];
  }
}

export async function addLocalInsight(input) {
  const sql = getDb();
  const requestedSlug = String(input.slug || "").trim() ? slugify(input.slug) : "";

  const [existing] = requestedSlug ? await sql`select * from insights where slug = ${requestedSlug}` : [];
  const baseSlug = requestedSlug || slugify(input.title);
  const slug = existing ? existing.slug : requestedSlug || (await uniqueSlug(sql, baseSlug));

  const now = new Date().toISOString();
  const insight = {
    id: existing?.id || `insight-${randomUUID()}`,
    title: input.title,
    slug,
    category: input.category || "Field Notes",
    excerpt: input.excerpt,
    bodyHtml: sanitizeBodyHtml(input.bodyHtml),
    author: input.author || "TrueStory Africa Team",
    readingTime: input.readingTime || "",
    tags: parseTags(input.tags),
    status: input.status || "published",
    image: input.image || "/assets/images/hero-poster.webp",
    alt: input.alt || input.title,
    date: existing?.date instanceof Date ? existing.date.toISOString() : existing?.date || now,
    updatedAt: now,
    publishAt: input.publishAt || null,
    featured: Boolean(input.featured),
    seoTitle: input.seoTitle ? clampSeoTitle(input.seoTitle) : defaultSeoTitle(input.title),
    seoDescription: clampSeoDescription(input.seoDescription || input.excerpt)
  };

  await sql`
    insert into insights (id, title, slug, category, excerpt, body_html, author, reading_time, tags, status, image, alt, date, updated_at, publish_at, featured, seo_title, seo_description)
    values (${insight.id}, ${insight.title}, ${insight.slug}, ${insight.category}, ${insight.excerpt}, ${insight.bodyHtml}, ${insight.author}, ${insight.readingTime}, ${insight.tags}, ${insight.status}, ${insight.image}, ${insight.alt}, ${insight.date}, ${insight.updatedAt}, ${insight.publishAt}, ${insight.featured}, ${insight.seoTitle}, ${insight.seoDescription})
    on conflict (slug) do update set
      title = excluded.title,
      category = excluded.category,
      excerpt = excluded.excerpt,
      body_html = excluded.body_html,
      author = excluded.author,
      reading_time = excluded.reading_time,
      tags = excluded.tags,
      status = excluded.status,
      image = excluded.image,
      alt = excluded.alt,
      updated_at = excluded.updated_at,
      publish_at = excluded.publish_at,
      featured = excluded.featured,
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description
  `;

  // Only one insight can be featured at a time - marking this one clears the flag
  // on every other insight instead of leaving multiple "featured" simultaneously.
  if (insight.featured) {
    await sql`update insights set featured = false where slug != ${insight.slug}`;
  }

  return { ...insight, isLocal: true };
}

export async function deleteLocalInsight(slug) {
  const sql = getDb();
  await sql`delete from insights where slug = ${slug}`;
}

function mapInsightRow(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    bodyHtml: row.body_html,
    author: row.author,
    readingTime: row.reading_time,
    tags: row.tags || [],
    status: row.status,
    image: row.image,
    alt: row.alt,
    date: row.date instanceof Date ? row.date.toISOString() : row.date,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
    publishAt: row.publish_at instanceof Date ? row.publish_at.toISOString() : row.publish_at,
    featured: Boolean(row.featured),
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    isLocal: true
  };
}

async function uniqueSlug(sql, slug) {
  let candidate = slug;
  let index = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [row] = await sql`select 1 from insights where slug = ${candidate}`;
    if (!row) return candidate;
    candidate = `${slug}-${index}`;
    index += 1;
  }
}

function parseTags(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

const sanitizeOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "h1", "h2", "blockquote", "ul", "ol", "li", "a", "div", "span"],
  allowedAttributes: {
    a: ["href"]
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" })
  }
};

function sanitizeBodyHtml(value) {
  return sanitizeHtml(String(value || ""), sanitizeOptions);
}

function slugify(value) {
  return (
    String(value || "insight")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "insight"
  );
}
