import { randomUUID } from "node:crypto";
import { getDb, isDatabaseConfigured } from "@/lib/db";

export async function getLocalEvents() {
  if (!isDatabaseConfigured()) return [];
  try {
    const sql = getDb();
    const rows = await sql`select * from events order by date desc`;
    return rows.map(mapEventRow);
  } catch (error) {
    console.error("getLocalEvents failed:", error.message);
    return [];
  }
}

export async function addLocalEvent(input) {
  const sql = getDb();
  const requestedSlug = String(input.slug || "").trim() ? slugify(input.slug) : "";

  const [existing] = requestedSlug ? await sql`select * from events where slug = ${requestedSlug}` : [];
  const baseSlug = requestedSlug || slugify(input.name);
  const slug = existing ? existing.slug : requestedSlug || (await uniqueSlug(sql, baseSlug));

  const now = new Date().toISOString();
  const event = {
    id: existing?.id || `event-${randomUUID()}`,
    name: input.name,
    slug,
    client: input.client || "",
    description: input.description || "",
    category: input.category || "Event Coverage",
    images: parseImages(input.images),
    videoUrl: input.videoUrl || "",
    status: input.status || "published",
    date: existing?.date instanceof Date ? existing.date.toISOString() : existing?.date || now,
    updatedAt: now,
    publishAt: input.publishAt || null
  };

  await sql`
    insert into events (id, name, slug, client, description, category, images, video_url, status, date, updated_at, publish_at)
    values (${event.id}, ${event.name}, ${event.slug}, ${event.client}, ${event.description}, ${event.category}, ${event.images}, ${event.videoUrl}, ${event.status}, ${event.date}, ${event.updatedAt}, ${event.publishAt})
    on conflict (slug) do update set
      name = excluded.name,
      client = excluded.client,
      description = excluded.description,
      category = excluded.category,
      images = excluded.images,
      video_url = excluded.video_url,
      status = excluded.status,
      updated_at = excluded.updated_at,
      publish_at = excluded.publish_at
  `;

  return { ...event, isLocal: true };
}

export async function deleteLocalEvent(slug) {
  const sql = getDb();
  await sql`delete from events where slug = ${slug}`;
}

function mapEventRow(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    client: row.client,
    description: row.description,
    category: row.category,
    images: (row.images || []).map((src, index) => ({ src, alt: `${row.name} — photo ${index + 1}` })),
    videoUrl: row.video_url,
    status: row.status,
    date: row.date instanceof Date ? row.date.toISOString() : row.date,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
    publishAt: row.publish_at instanceof Date ? row.publish_at.toISOString() : row.publish_at,
    isLocal: true
  };
}

async function uniqueSlug(sql, slug) {
  let candidate = slug;
  let index = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [row] = await sql`select 1 from events where slug = ${candidate}`;
    if (!row) return candidate;
    candidate = `${slug}-${index}`;
    index += 1;
  }
}

function parseImages(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

function slugify(value) {
  return (
    String(value || "event")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "event"
  );
}
