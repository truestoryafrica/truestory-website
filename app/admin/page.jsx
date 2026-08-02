import AdminDashboardClient from "@/components/AdminDashboardClient";
import { getSiteContent } from "@/lib/cms";

export const metadata = {
  title: "Editorial Admin | TrueStory Africa",
  description: "TrueStory Africa editorial dashboard for stories, content and publishing.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminDashboard({ searchParams }) {
  const { stories, insights, site } = await getSiteContent();
  const params = await searchParams;
  const created = params?.created;
  const createdStatus = params?.status;
  const storyError = params?.storyError;
  const deleted = params?.deleted;
  const settingsSaved = params?.settingsSaved;
  const dbError = params?.dbError;
  const createdInsight = params?.createdInsight;
  const insightError = params?.insightError;
  const deletedInsight = params?.deletedInsight;

  return (
    <AdminDashboardClient
      stories={stories}
      insights={insights}
      site={site}
      notices={{
        created,
        createdStatus,
        storyError,
        deleted,
        settingsSaved,
        dbError,
        createdInsight,
        insightError,
        deletedInsight
      }}
    />
  );
}
