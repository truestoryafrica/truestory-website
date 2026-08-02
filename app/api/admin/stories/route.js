import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { addLocalStory } from "@/lib/localStories";

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.redirect(new URL("/admin/login?redirectTo=/admin", request.url), 303);
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();

  if (!title || !excerpt) {
    return NextResponse.redirect(new URL("/admin?storyError=1", request.url), 303);
  }

  try {
    const story = await addLocalStory({
      slug: String(formData.get("slug") || ""),
      type: String(formData.get("type") || "Article"),
      title,
      excerpt,
      bodyHtml: String(formData.get("bodyHtml") || ""),
      author: String(formData.get("author") || "TrueStory Africa Team"),
      readingTime: String(formData.get("readingTime") || ""),
      tags: String(formData.get("tags") || ""),
      status: String(formData.get("status") || "published"),
      category: String(formData.get("category") || "Documentary"),
      location: String(formData.get("location") || "Rwanda"),
      image: String(formData.get("image") || ""),
      alt: String(formData.get("alt") || ""),
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || "")
    });

    return NextResponse.redirect(new URL(`/admin?created=${story.slug}&status=${story.status}`, request.url), 303);
  } catch (error) {
    console.error("addLocalStory failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1", request.url), 303);
  }
}
