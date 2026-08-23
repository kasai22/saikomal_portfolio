export type SocialPlatform = "github" | "linkedin" | "x" | "discord" | "slack";

export interface Social {
  label: string;
  href: string;
  platform: SocialPlatform;
}

/** A single numeric outcome — rendered as a metric chip, never a sentence. */
export interface Metric {
  value: string;
  label: string;
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
  /** One short line. Anything longer belongs in a case study, not here. */
  description: string;
  /** Concrete artefact this stage produces — shown as a caption chip. */
  output: string;
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

/** One stop on the "how I got here" track in the About section. */
export interface CareerStep {
  period: string;
  label: string;
  detail: string;
}

/** A short, scannable strength — replaces long "what I bring" prose. */
export interface Strength {
  icon: string;
  title: string;
  detail: string;
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
  /** Headline outcomes, shown as chips on the card. */
  metrics: Metric[];
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
