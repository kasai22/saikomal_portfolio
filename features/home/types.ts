export type SocialPlatform = "github" | "linkedin";

export interface Social {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface SkillGroup {
  icon: string;
  category: string;
  description: string;
  items: string[];
}

export interface WorkflowMetric {
  label: string;
  pct: number;
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

export interface GraphicProject {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  icon: string;
}
