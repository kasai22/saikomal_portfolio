export type SocialPlatform = "github" | "linkedin" | "x" | "discord" | "slack";

export interface Social {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface CapabilityGroup {
  icon: string;
  category: string;
  description: string;
  items: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  duration: string;
  current?: boolean;
  summary: string[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface CaseStudyProject {
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  slug: string;
  year: string;
  image: string;
  role: string;
  timeline: string;
  businessGoal: string;
  readMins: number;
}

export interface CodingProject {
  title: string;
  tagline: string;
  description: string;
  url: string;
  tech: string[];
  image: string | null;
  accent: string;
  year: string;
}
