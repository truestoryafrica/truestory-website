import { site } from "@/content/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"]
      }
    ],
    sitemap: `${site.url}/sitemap.xml`
  };
}
