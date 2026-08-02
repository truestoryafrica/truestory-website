import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  clearLoginAttempts,
  getAdminSessionToken,
  getClientKey,
  isLoginRateLimited,
  recordFailedLogin
} from "@/lib/adminAuth";
import { isValidAdminPassword } from "@/lib/adminPassword";

export async function POST(request) {
  const clientKey = getClientKey(request);
  if (isLoginRateLimited(clientKey)) {
    return NextResponse.redirect(new URL("/admin/login?error=rate", request.url), 303);
  }

  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const redirectTo = safeRedirectPath(formData.get("redirectTo"));

  if (!(await isValidAdminPassword(password))) {
    recordFailedLogin(clientKey);
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  clearLoginAttempts(clientKey);

  const response = NextResponse.redirect(new URL(redirectTo, request.url), 303);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}

function safeRedirectPath(value) {
  const path = String(value || "/admin");
  if (!path.startsWith("/") || path.startsWith("//")) return "/admin";
  return path;
}
