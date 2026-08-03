import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { deleteLocalEvent } from "@/lib/localEvents";

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.redirect(new URL("/admin/login?redirectTo=/admin", request.url), 303);
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");

  try {
    if (slug) await deleteLocalEvent(slug);
    return NextResponse.redirect(new URL("/admin?deletedEvent=1#events-list", request.url), 303);
  } catch (error) {
    console.error("deleteLocalEvent failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1#events-list", request.url), 303);
  }
}
