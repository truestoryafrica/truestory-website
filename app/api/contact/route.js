import { NextResponse } from "next/server";
import { addLocalMessage } from "@/lib/localMessages";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return String(value || "").trim();
}

async function notifyByEmail(lead) {
  if (!process.env.FORMSPREE_FORM_ID) return;

  try {
    await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        organization: lead.organization || "Not provided",
        projectType: lead.projectType,
        budget: lead.budget || "Not specified",
        message: lead.message,
        _subject: `${lead.projectType} inquiry from ${lead.name}`
      })
    });
  } catch (error) {
    console.error("notifyByEmail failed:", error.message);
  }
}

async function notifyWebhook(lead) {
  if (!process.env.CONTACT_WEBHOOK_URL) return;

  try {
    await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {})
      },
      body: JSON.stringify({
        source: "truestory-africa-website",
        submittedAt: new Date().toISOString(),
        lead
      })
    });
  } catch (error) {
    console.error("notifyWebhook failed:", error.message);
  }
}

export async function POST(request) {
  try {
    const payload = await request.json().catch(() => null);
    if (!payload) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (clean(payload.website)) {
      return NextResponse.json({ message: "Thanks. Your project brief has been received." });
    }

    const lead = {
      name: clean(payload.name).slice(0, 120),
      email: clean(payload.email).slice(0, 160),
      organization: clean(payload.organization).slice(0, 160),
      projectType: clean(payload.projectType).slice(0, 80),
      budget: clean(payload.budget).slice(0, 120),
      message: clean(payload.message).slice(0, 3000)
    };

    if (!lead.name || !emailPattern.test(lead.email) || !lead.projectType || lead.message.length < 20) {
      return NextResponse.json(
        { error: "Please add your name, a valid email, project type, and a brief message of at least 20 characters." },
        { status: 422 }
      );
    }

    await addLocalMessage({
      ...lead,
      subject: `${lead.projectType} inquiry from ${lead.name}`
    });

    // Best-effort notifications — the lead is already saved above, so a failure
    // here should never fail the user-facing submission.
    await Promise.allSettled([notifyByEmail(lead), notifyWebhook(lead)]);

    return NextResponse.json({
      message: "Thanks. Your project brief has been received and the team will follow up soon."
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while sending your brief. Please try again or email the team directly." },
      { status: 500 }
    );
  }
}
