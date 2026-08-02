import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { deleteLocalInsight } from "@/lib/localInsights";

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.redirect(new URL("/admin/login?redirectTo=/admin", request.url), 303);
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");

  try {
    if (slug) await deleteLocalInsight(slug);
    return NextResponse.redirect(new URL("/admin?deletedInsight=1#insights-list", request.url), 303);
  } catch (error) {
    console.error("deleteLocalInsight failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1#insights-list", request.url), 303);
  }
}
