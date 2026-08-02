import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "Image storage is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string" || !allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Upload a JPG, PNG, WEBP or GIF image." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be smaller than 4MB." }, { status: 400 });
  }

  const extension = extensionFor(file.type);
  const filename = `${Date.now()}-${safeName(file.name || "story-image")}.${extension}`;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  const uploadResponse = await fetch(`${supabaseUrl}/storage/v1/object/uploads/${filename}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
      "Content-Type": file.type
    },
    body: bytes
  });

  if (!uploadResponse.ok) {
    const detail = await uploadResponse.text().catch(() => "");
    console.error("Supabase Storage upload failed:", uploadResponse.status, detail);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ url: `${supabaseUrl}/storage/v1/object/public/uploads/${filename}` });
}

function extensionFor(type) {
  if (type === "image/png") return "png";
  if (type === "image/gif") return "gif";
  if (type === "image/webp") return "webp";
  return "jpg";
}

function safeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "story-image";
}
