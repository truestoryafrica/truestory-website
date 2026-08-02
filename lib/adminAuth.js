// NOTE: this file is imported by middleware.js, which runs on Next.js's Edge
// Runtime -- it must never import anything that pulls in Node built-ins
// (like node:crypto, used by lib/adminCredentials.js for password hashing).
// The DB-aware password check lives in lib/adminPassword.js instead, so only
// actual API routes (Node.js runtime) end up depending on it.

export const ADMIN_COOKIE_NAME = "tsa_admin_session";

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const loginAttempts = new Map();

const MAX_RESET_REQUESTS = 3;
const RESET_WINDOW_MS = 15 * 60 * 1000;
const resetAttempts = new Map();

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "truestory-admin";
}

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || "local-admin-session";
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_TOKEN);
}

export function isAdminLocked() {
  return process.env.NODE_ENV === "production" && !isAdminConfigured();
}

export function isValidAdminSession(token) {
  if (!token || isAdminLocked()) return false;
  return safeCompare(token, getAdminSessionToken());
}

export function safeCompare(a, b) {
  const strA = String(a ?? "");
  const strB = String(b ?? "");
  if (strA.length !== strB.length) return false;
  let mismatch = 0;
  for (let i = 0; i < strA.length; i += 1) {
    mismatch |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
  }
  return mismatch === 0;
}

export function getClientKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export function isLoginRateLimited(key) {
  const entry = loginAttempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_LOGIN_ATTEMPTS;
}

export function recordFailedLogin(key) {
  const entry = loginAttempts.get(key);
  if (!entry || Date.now() - entry.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, firstAttempt: Date.now() });
    return;
  }
  entry.count += 1;
}

export function clearLoginAttempts(key) {
  loginAttempts.delete(key);
}

export function isResetRateLimited(key) {
  const entry = resetAttempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttempt > RESET_WINDOW_MS) {
    resetAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_RESET_REQUESTS;
}

export function recordResetRequest(key) {
  const entry = resetAttempts.get(key);
  if (!entry || Date.now() - entry.firstAttempt > RESET_WINDOW_MS) {
    resetAttempts.set(key, { count: 1, firstAttempt: Date.now() });
    return;
  }
  entry.count += 1;
}
