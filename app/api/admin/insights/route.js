import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { addLocalInsight } from "@/lib/localInsights";

// The admin form's datetime-local input has no timezone info, so an empty
// value means "publish immediately" rather than an invalid date.
function parsePublishAt(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.redirect(new URL("/admin/login?redirectTo=/admin", request.url), 303);
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();

  if (!title || !excerpt) {
    return NextResponse.redirect(new URL("/admin?insightError=1", request.url), 303);
  }

  try {
    const insight = await addLocalInsight({
      slug: String(formData.get("slug") || ""),
      title,
      excerpt,
      bodyHtml: String(formData.get("bodyHtml") || ""),
      author: String(formData.get("author") || "TrueStory Africa Team"),
      readingTime: String(formData.get("readingTime") || ""),
      tags: String(formData.get("tags") || ""),
      status: String(formData.get("status") || "published"),
      publishAt: parsePublishAt(formData.get("publishAt")),
      featured: formData.get("featured") === "on",
      category: String(formData.get("category") || "Field Notes"),
      image: String(formData.get("image") || ""),
      alt: String(formData.get("alt") || ""),
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || "")
    });

    return NextResponse.redirect(new URL(`/admin?createdInsight=${insight.slug}&status=${insight.status}`, request.url), 303);
  } catch (error) {
    console.error("addLocalInsight failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1", request.url), 303);
  }
}
