import { cache } from "react";
import { insights as fallbackInsights, partners as fallbackPartners, services as fallbackServices, site as fallbackSite, stories as fallbackStories, team as fallbackTeam, testimonials as fallbackTestimonials } from "@/content/site";
import { getLocalInsights } from "@/lib/localInsights";
import { getLocalStories } from "@/lib/localStories";
import { applyLocalSettings, getLocalSettings } from "@/lib/localSettings";

function imageUrl(source, fallback = "/assets/images/hero-poster.webp") {
  if (!source) return fallback;
  if (typeof source === "string") return source;
  return fallback;
}

function normalizeSite(settings) {
  if (!settings) return fallbackSite;
  return {
    ...fallbackSite,
    name: settings.siteName || fallbackSite.name,
    description: settings.description || fallbackSite.description,
    email: settings.email || fallbackSite.email,
    phone: settings.phone || fallbackSite.phone,
    displayPhone: settings.phone || fallbackSite.displayPhone,
    location: settings.location || fallbackSite.location,
    social: {
      instagram: settings.instagram || fallbackSite.social.instagram,
      linkedin: settings.linkedin || fallbackSite.social.linkedin,
      youtube: settings.youtube || fallbackSite.social.youtube
    }
  };
}

function normalizeService(service, index) {
  return {
    title: service.title,
    slug: service.slug?.current || service.slug,
    number: service.number || String(index + 1).padStart(2, "0"),
    image: imageUrl(service.image, fallbackServices[index]?.image),
    alt: service.image?.alt || service.alt || service.title,
    summary: service.summary,
    seoTitle: service.seoTitle || `${service.title} | ${fallbackSite.name}`,
    seoDescription: service.seoDescription || service.summary
  };
}

function normalizeStory(story) {
  return {
    title: story.title,
    slug: story.slug?.current || story.slug,
    category: story.category,
    location: story.location || "Rwanda",
    image: imageUrl(story.featuredImage || story.image, story.image),
    alt: story.featuredImage?.alt || story.alt || story.title,
    excerpt: story.excerpt,
    bodyHtml: story.bodyHtml || story.body,
    author: story.author,
    readingTime: story.readingTime,
    status: story.status || "published",
    date: story.publishedAt || story.date,
    updatedAt: story.updatedAt || story.publishedAt || story.date,
    seoTitle: story.seoTitle || `${story.title} | ${fallbackSite.name}`,
    seoDescription: story.seoDescription || story.excerpt
  };
}

function normalizeTeamMember(member) {
  return {
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: imageUrl(member.image, member.image),
    alt: member.image?.alt || member.alt || member.name
  };
}

// Wrapped in React's cache() so repeated calls within a single request (e.g.
// generateMetadata + the page component both calling getSiteContent, or the
// getStories/getStory helpers below each triggering their own call) only hit
// the database once instead of redundantly re-fetching every time.
export const getSiteContent = cache(async function getSiteContent() {
  // getLocalStories/getLocalInsights/getLocalSettings never throw — they fail
  // safe and return empty defaults if the database is unreachable or
  // unconfigured, so the public site keeps rendering seed content instead of
  // erroring out.
  const [localStories, localInsights, localSettings] = await Promise.all([
    getLocalStories(),
    getLocalInsights(),
    getLocalSettings()
  ]);
  return {
    site: applyLocalSettings(fallbackSite, localSettings),
    services: fallbackServices,
    partners: fallbackPartners,
    testimonials: fallbackTestimonials,
    stories: localStories.length
      ? [...localStories, ...fallbackStories.filter((story) => !localStories.some((localStory) => localStory.slug === story.slug))]
      : fallbackStories,
    insights: localInsights.length
      ? [...localInsights, ...fallbackInsights.filter((insight) => !localInsights.some((localInsight) => localInsight.slug === insight.slug))]
      : fallbackInsights,
    team: fallbackTeam
  };
});

export async function getServices() {
  const { services } = await getSiteContent();
  return services;
}

export async function getStories() {
  const { stories } = await getSiteContent();
  return stories;
}

export async function getPublishedStories() {
  const stories = await getStories();
  return stories.filter((story) => story.status !== "draft");
}

export async function getService(slug) {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}

export async function getStory(slug) {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug);
}

export async function getInsights() {
  const { insights } = await getSiteContent();
  return insights;
}

export async function getPublishedInsights() {
  const insights = await getInsights();
  return insights.filter((insight) => insight.status !== "draft");
}

export async function getInsight(slug) {
  const insights = await getInsights();
  return insights.find((insight) => insight.slug === slug);
}
