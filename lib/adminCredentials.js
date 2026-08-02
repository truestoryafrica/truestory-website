import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getDb, isDatabaseConfigured } from "@/lib/db";

const scrypt = promisify(scryptCallback);
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password, stored) {
  const [salt, hashHex] = String(stored).split(":");
  if (!salt || !hashHex) return false;
  const derivedKey = await scrypt(password, salt, 64);
  const storedBuffer = Buffer.from(hashHex, "hex");
  if (derivedKey.length !== storedBuffer.length) return false;
  return timingSafeEqual(derivedKey, storedBuffer);
}

function timingSafeStringEqual(a, b) {
  const bufA = Buffer.from(String(a || ""));
  const bufB = Buffer.from(String(b || ""));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Returns true/false once a database password has been set (a real reset
// happened), or null if there's no stored password yet -- the caller should
// fall back to comparing against the ADMIN_PASSWORD environment variable.
export async function verifyStoredAdminPassword(password) {
  if (!isDatabaseConfigured()) return null;
  try {
    const sql = getDb();
    const [row] = await sql`select password_hash from admin_auth where id = 1`;
    if (!row?.password_hash) return null;
    return await verifyPassword(password, row.password_hash);
  } catch (error) {
    console.error("verifyStoredAdminPassword failed:", error.message);
    return null;
  }
}

export async function setAdminPassword(password) {
  const sql = getDb();
  const hash = await hashPassword(password);
  await sql`
    insert into admin_auth (id, password_hash, reset_token, reset_token_expires, updated_at)
    values (1, ${hash}, null, null, now())
    on conflict (id) do update set
      password_hash = excluded.password_hash,
      reset_token = null,
      reset_token_expires = null,
      updated_at = now()
  `;
}

export async function createPasswordResetToken() {
  const sql = getDb();
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
  await sql`
    insert into admin_auth (id, reset_token, reset_token_expires, updated_at)
    values (1, ${token}, ${expires.toISOString()}, now())
    on conflict (id) do update set
      reset_token = excluded.reset_token,
      reset_token_expires = excluded.reset_token_expires,
      updated_at = now()
  `;
  return token;
}

export async function isValidPasswordResetToken(token) {
  if (!token || !isDatabaseConfigured()) return false;
  try {
    const sql = getDb();
    const [row] = await sql`select reset_token, reset_token_expires from admin_auth where id = 1`;
    if (!row?.reset_token) return false;
    if (new Date(row.reset_token_expires).getTime() < Date.now()) return false;
    return timingSafeStringEqual(token, row.reset_token);
  } catch (error) {
    console.error("isValidPasswordResetToken failed:", error.message);
    return false;
  }
}
