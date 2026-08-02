// Split out from lib/adminAuth.js because this depends (transitively, via
// lib/adminCredentials.js) on node:crypto for password hashing. adminAuth.js
// is imported by middleware.js, which runs on the Edge Runtime and cannot
// bundle Node built-ins -- only import this file from actual API routes.
import { isAdminLocked, getAdminPassword, safeCompare } from "@/lib/adminAuth";
import { verifyStoredAdminPassword } from "@/lib/adminCredentials";

export async function isValidAdminPassword(password) {
  if (isAdminLocked()) return false;
  // A database-stored password (set via a completed reset) always takes
  // precedence once it exists -- it's the only way this can ever change,
  // since ADMIN_PASSWORD is a static environment variable.
  const storedResult = await verifyStoredAdminPassword(password);
  if (storedResult !== null) return storedResult;
  return safeCompare(password, getAdminPassword());
}
