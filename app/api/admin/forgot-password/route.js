import { NextResponse } from "next/server";
import { getClientKey, isResetRateLimited, recordResetRequest } from "@/lib/adminAuth";
import { createPasswordResetToken } from "@/lib/adminCredentials";
import { site } from "@/content/site";

export async function POST(request) {
  const clientKey = getClientKey(request);
  if (isResetRateLimited(clientKey)) {
    return NextResponse.redirect(new URL("/admin/forgot-password?error=rate", request.url), 303);
  }
  recordResetRequest(clientKey);

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.redirect(new URL("/admin/forgot-password?error=unconfigured", request.url), 303);
  }

  try {
    const token = await createPasswordResetToken();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const resetLink = `${siteUrl}/admin/reset-password?token=${token}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "TrueStory Africa <onboarding@resend.dev>",
        to: site.email,
        subject: "Reset your TrueStory Africa admin password",
        html: `
          <h2>Password reset requested</h2>
          <p>Someone requested a password reset for the TrueStory Africa admin dashboard.</p>
          <p><a href="${resetLink}">Click here to set a new password</a></p>
          <p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
        `
      })
    });

    if (!emailResponse.ok) {
      const detail = await emailResponse.text().catch(() => "");
      console.error("Resend rejected the reset email:", emailResponse.status, detail);
      return NextResponse.redirect(new URL("/admin/forgot-password?error=1", request.url), 303);
    }

    return NextResponse.redirect(new URL("/admin/forgot-password?sent=1", request.url), 303);
  } catch (error) {
    console.error("forgot-password failed:", error.message);
    return NextResponse.redirect(new URL("/admin/forgot-password?error=1", request.url), 303);
  }
}
