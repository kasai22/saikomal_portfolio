import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

const ROUTES = ["", "/case-study", "/case-study/kudra", "/case-study/rex"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
