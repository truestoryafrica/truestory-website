// Turns a YouTube watch/share/short link into its embeddable URL. Returns
// null for anything that isn't recognizably a YouTube link, so callers can
// fall back to a plain "watch on YouTube" link instead of a broken embed.
export function toYoutubeEmbedUrl(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed) return null;

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  let videoId = "";

  if (host === "youtu.be") {
    videoId = parsed.pathname.slice(1);
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      videoId = parsed.searchParams.get("v") || "";
    } else if (parsed.pathname.startsWith("/embed/")) {
      videoId = parsed.pathname.split("/")[2] || "";
    } else if (parsed.pathname.startsWith("/shorts/")) {
      videoId = parsed.pathname.split("/")[2] || "";
    }
  }

  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}
