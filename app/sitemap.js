import { getSiteContent } from "@/lib/cms";

export default async function sitemap() {
  const { services, site, stories: allStories, insights: allInsights } = await getSiteContent();
  const stories = allStories.filter((story) => story.status !== "draft");
  const insights = allInsights.filter((insight) => insight.status !== "draft");
  const now = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${site.url}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${site.url}/stories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${site.url}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85
    })),
    ...stories.map((story) => ({
      url: `${site.url}/stories/${story.slug}`,
      lastModified: new Date(story.updatedAt || story.date),
      changeFrequency: "monthly",
      priority: 0.8
    })),
    ...insights.map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: new Date(insight.updatedAt || insight.date),
      changeFrequency: "monthly",
      priority: 0.7
    }))
  ];
}
