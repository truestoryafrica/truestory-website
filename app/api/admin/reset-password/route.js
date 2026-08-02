import { NextResponse } from "next/server";
import { isValidPasswordResetToken, setAdminPassword } from "@/lib/adminCredentials";

export async function POST(request) {
  const formData = await request.formData();
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  const redirectWithError = (error) =>
    NextResponse.redirect(new URL(`/admin/reset-password?token=${token}&error=${error}`, request.url), 303);

  if (!(await isValidPasswordResetToken(token))) {
    return redirectWithError("invalid");
  }

  if (password.length < 10) {
    return redirectWithError("short");
  }

  if (password !== confirmPassword) {
    return redirectWithError("mismatch");
  }

  try {
    await setAdminPassword(password);
    return NextResponse.redirect(new URL("/admin/login?reset=1", request.url), 303);
  } catch (error) {
    console.error("reset-password failed:", error.message);
    return redirectWithError("failed");
  }
}
