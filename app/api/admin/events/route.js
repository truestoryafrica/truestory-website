import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { addLocalEvent } from "@/lib/localEvents";

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
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    return NextResponse.redirect(new URL("/admin?eventError=1", request.url), 303);
  }

  try {
    const event = await addLocalEvent({
      slug: String(formData.get("slug") || ""),
      name,
      client: String(formData.get("client") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "Event Coverage"),
      images: String(formData.get("images") || ""),
      videoUrl: String(formData.get("videoUrl") || ""),
      status: String(formData.get("status") || "published"),
      publishAt: parsePublishAt(formData.get("publishAt"))
    });

    return NextResponse.redirect(new URL(`/admin?createdEvent=${event.slug}&status=${event.status}#events-list`, request.url), 303);
  } catch (error) {
    console.error("addLocalEvent failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1#events-list", request.url), 303);
  }
}
