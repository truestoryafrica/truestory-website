/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },
  async redirects() {
    return [
      // Old static-site URLs that no longer exist under these slugs — send
      // both search engines and anyone with an old bookmark/backlink to the
      // current equivalent instead of a 404.
      { source: "/impact", destination: "/#impact", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/documentary", destination: "/services/documentary-video-production-rwanda", permanent: true },
      { source: "/services/photo-storytelling", destination: "/services/photography-services-kigali-rwanda", permanent: true },
      { source: "/services/content-writing", destination: "/services/content-writing-rwanda", permanent: true },
      { source: "/services/communication", destination: "/services/communication-services-rwanda", permanent: true },
      { source: "/services/event-coverage", destination: "/services/event-coverage-rwanda", permanent: true },
      { source: "/services/social-media", destination: "/services/social-media-management-rwanda", permanent: true },
      { source: "/stories/mothers-hope", destination: "/stories/mothers-hope-rural-health-rwanda", permanent: true },
      { source: "/stories/brighter-tomorrow", destination: "/stories/brighter-tomorrow-education-rwanda", permanent: true },
      { source: "/stories/growing-resilience", destination: "/stories/growing-resilience-smallholder-farmers-rwanda", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      }
    ];
  }
};

export default nextConfig;
