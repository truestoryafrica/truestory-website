import { getDb, isDatabaseConfigured } from "@/lib/db";

export async function getLocalSettings() {
  if (!isDatabaseConfigured()) return {};
  try {
    const sql = getDb();
    const [row] = await sql`select data from settings where id = 1`;
    return row?.data && typeof row.data === "object" ? row.data : {};
  } catch (error) {
    console.error("getLocalSettings failed:", error.message);
    return {};
  }
}

export async function updateLocalSettings(input) {
  const sql = getDb();
  const settings = {
    name: clean(input.name),
    tagline: clean(input.tagline),
    description: clean(input.description),
    location: clean(input.location),
    email: clean(input.email),
    phone: clean(input.phone),
    displayPhone: clean(input.displayPhone),
    social: {
      instagram: clean(input.instagram),
      linkedin: clean(input.linkedin),
      youtube: clean(input.youtube)
    },
    updatedAt: new Date().toISOString()
  };

  await sql`
    insert into settings (id, data, updated_at)
    values (1, ${sql.json(settings)}, now())
    on conflict (id) do update set data = excluded.data, updated_at = excluded.updated_at
  `;

  return settings;
}

export function applyLocalSettings(site, settings) {
  if (!settings || !Object.keys(settings).length) return site;
  return {
    ...site,
    ...withoutEmpty(settings),
    social: {
      ...site.social,
      ...withoutEmpty(settings.social || {})
    }
  };
}

function clean(value) {
  return String(value || "").trim();
}

function withoutEmpty(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ""));
}
