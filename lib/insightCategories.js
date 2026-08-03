export const insightCategories = [
  "Documentary Storytelling",
  "Photography",
  "Videography",
  "Strategic Communications",
  "Visual Storytelling",
  "Branding",
  "Content Strategy",
  "Social Media",
  "Event Coverage",
  "Case Studies",
  "NGO Communications",
  "Development Communications",
  "Humanitarian Communications",
  "Public Relations",
  "Advocacy & Campaigns",
  "Impact Stories",
  "Media Production",
  "Storytelling Tips",
  "Industry Insights",
  "Behind the Scenes"
];

// Best-effort map from an insight's category to the paid service it's most
// relevant to, so article pages can link to the service they support -
// internal links that give the service pages more topical authority instead
// of insights being a dead end. Falls back to null (no CTA) for anything
// unmapped, including pre-existing categories like "Impact" from before this
// list existed.
export const categoryServiceSlug = {
  "Documentary Storytelling": "documentary-video-production-rwanda",
  Videography: "documentary-video-production-rwanda",
  "Media Production": "documentary-video-production-rwanda",
  "Behind the Scenes": "documentary-video-production-rwanda",
  "Event Coverage": "event-coverage-rwanda",
  Photography: "photography-services-kigali-rwanda",
  "Visual Storytelling": "photography-services-kigali-rwanda",
  "Content Strategy": "content-writing-rwanda",
  "Case Studies": "content-writing-rwanda",
  "Impact Stories": "content-writing-rwanda",
  "Storytelling Tips": "content-writing-rwanda",
  "Industry Insights": "content-writing-rwanda",
  "Strategic Communications": "communication-services-rwanda",
  Branding: "communication-services-rwanda",
  "NGO Communications": "communication-services-rwanda",
  "Development Communications": "communication-services-rwanda",
  "Humanitarian Communications": "communication-services-rwanda",
  "Public Relations": "communication-services-rwanda",
  "Advocacy & Campaigns": "communication-services-rwanda",
  "Social Media": "social-media-management-rwanda",
  // Legacy categories used before this list existed, kept mapped so
  // already-published content still gets a working cross-link.
  Impact: "content-writing-rwanda",
  "Field Notes": "content-writing-rwanda",
  Culture: "communication-services-rwanda",
  "Company News": "communication-services-rwanda"
};
