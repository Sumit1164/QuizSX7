import type { MetadataRoute } from "next";
import { companies, subjects } from "@/lib/seed-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/practice", "/login", "/dashboard"];
  const subjectRoutes = subjects.flatMap((subject) => [
    `/practice/${subject.slug}`,
    ...subject.topics.map((topic) => `/practice/${subject.slug}/${topic.slug}`)
  ]);
  const companyRoutes = companies.map((company) => `/companies/${company.slug}`);

  return [...staticRoutes, ...subjectRoutes, ...companyRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("practice") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
