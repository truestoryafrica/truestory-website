import { randomUUID } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { clampSeoDescription, clampSeoTitle, defaultSeoTitle } from "@/lib/seo";

export async function getLocalStories() {
  if (!isDatabaseConfigured()) return [];
  try {
    const sql = getDb();
    const rows = await sql`select * from stories order by date desc`;
    return rows.map(mapStoryRow);
  } catch (error) {
    console.error("getLocalStories failed:", error.message);
    return [];
  }
}

export async function addLocalStory(input) {
  const sql = getDb();
  const requestedSlug = String(input.slug || "").trim() ? slugify(input.slug) : "";

  const [existing] = requestedSlug ? await sql`select * from stories where slug = ${requestedSlug}` : [];
  const baseSlug = requestedSlug || slugify(input.title);
  const slug = existing ? existing.slug : requestedSlug || (await uniqueSlug(sql, baseSlug));

  const now = new Date().toISOString();
  const story = {
    id: existing?.id || `story-${randomUUID()}`,
    type: input.type || "Article",
    title: input.title,
    slug,
    category: input.category || "Documentary",
    location: input.location || "Rwanda",
    excerpt: input.excerpt,
    bodyHtml: sanitizeBodyHtml(input.bodyHtml),
    author: input.author || "TrueStory Africa Team",
    readingTime: input.readingTime || "",
    tags: parseTags(input.tags),
    status: input.status || "published",
    image: input.image || "/assets/images/story-mothers-hope.webp",
    alt: input.alt || input.title,
    date: existing?.date instanceof Date ? existing.date.toISOString() : existing?.date || now,
    updatedAt: now,
    publishAt: input.publishAt || null,
    seoTitle: input.seoTitle ? clampSeoTitle(input.seoTitle) : defaultSeoTitle(input.title),
    seoDescription: clampSeoDescription(input.seoDescription || input.excerpt)
  };

  await sql`
    insert into stories (id, type, title, slug, category, location, excerpt, body_html, author, reading_time, tags, status, image, alt, date, updated_at, publish_at, seo_title, seo_description)
    values (${story.id}, ${story.type}, ${story.title}, ${story.slug}, ${story.category}, ${story.location}, ${story.excerpt}, ${story.bodyHtml}, ${story.author}, ${story.readingTime}, ${story.tags}, ${story.status}, ${story.image}, ${story.alt}, ${story.date}, ${story.updatedAt}, ${story.publishAt}, ${story.seoTitle}, ${story.seoDescription})
    on conflict (slug) do update set
      type = excluded.type,
      title = excluded.title,
      category = excluded.category,
      location = excluded.location,
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
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description
  `;

  return { ...story, isLocal: true };
}

export async function deleteLocalStory(slug) {
  const sql = getDb();
  await sql`delete from stories where slug = ${slug}`;
}

function mapStoryRow(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    slug: row.slug,
    category: row.category,
    location: row.location,
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
    const [row] = await sql`select 1 from stories where slug = ${candidate}`;
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
    String(value || "story")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "story"
  );
}
