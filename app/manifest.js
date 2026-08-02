import { site } from "@/content/site";

export default function manifest() {
  return {
    name: site.name,
    short_name: "TrueStory",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#151515",
    theme_color: "#151515",
    icons: [
      {
        src: "/assets/icons/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
