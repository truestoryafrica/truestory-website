import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { updateLocalSettings } from "@/lib/localSettings";

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.redirect(new URL("/admin/login?redirectTo=/admin", request.url), 303);
  }

  const formData = await request.formData();

  try {
    await updateLocalSettings(Object.fromEntries(formData.entries()));
    return NextResponse.redirect(new URL("/admin?settingsSaved=1#settings", request.url), 303);
  } catch (error) {
    console.error("updateLocalSettings failed:", error.message);
    return NextResponse.redirect(new URL("/admin?dbError=1#settings", request.url), 303);
  }
}
