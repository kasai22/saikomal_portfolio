import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { ENGINEERING_PROJECTS, UX_PROJECTS } from "@/constants/projects";

/** Every route on the site, derived from the project lists so none is missed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    ...UX_PROJECTS.map((project) => project.href),
    ...ENGINEERING_PROJECTS.map((project) => project.href),
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
