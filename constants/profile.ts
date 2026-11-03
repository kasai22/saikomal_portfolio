/**
 * The professional record — the single source of truth for every fact about
 * Sai Komal that appears on this site: identity, contact details, employment
 * dates, headline numbers and capabilities.
 *
 * Source: the latest résumé (Nov 2026). Nothing in this file is rounded up,
 * inferred or invented. If a fact changes, change it here; every page,
 * timeline, card, metadata block and JSON-LD graph reads from this module, so
 * there is no second copy to forget.
 *
 * Dates are stored as structured year/month values rather than display
 * strings, so a layout can format them however it needs (long on the
 * experience list, short on a mobile chip) without anyone retyping a date.
 */

/* ------------------------------------------------------------------ *
 * Identity
 * ------------------------------------------------------------------ */

export const PROFILE = {
  name: "Sai Komal",
  legalName: "Chunduri Sai Komal",
  /** The résumé designation, verbatim. */
  designation: "Product Designer | UX Engineer | Front-end Development",
  /** The short title used in the hero, page titles and metadata. */
  title: "Product Designer & UX Engineer",
  headline: "Designing intelligent products. Engineering experiences that work.",
  intro:
    "I design enterprise products, understand the systems behind them, and independently build the front-end experiences that bring them to life. My work spans UX strategy, AI-powered products, React and Next.js development, and data-driven interfaces.",
  /**
   * The professional summary. The five-year figure is software, data and
   * product design together — it is not five years of front-end engineering.
   */
  summary:
    "Product Designer and hands-on UX Engineer with 5 years across software, data work, and product design, including 4+ years in UX. Independently builds web applications using React, Next.js, TypeScript, and Tailwind CSS; integrates backend services and APIs; and brings strong SQL capabilities. Combines enterprise UX, systems thinking, and AI-assisted development.",
  location: "Visakhapatnam, India",
  education: {
    degree: "B.Tech in Mechanical Engineering",
    school: "Vellore Institute of Technology",
    period: "2017 – 2021",
  },
  /** Shown under the hero headline. */
  stackLine: ["React", "Next.js", "TypeScript", "SQL", "Figma", "Claude"],
} as const;

/* ------------------------------------------------------------------ *
 * Contact — from the résumé header.
 * ------------------------------------------------------------------ */

export const CONTACT = {
  email: "chundurisk1999@gmail.com",
  phoneDisplay: "+91 9505455999",
  phoneHref: "tel:+919505455999",
  portfolio: "https://chsaikomal.site",
  linkedin: "https://www.linkedin.com/in/chsk1999",
  linkedinDisplay: "linkedin.com/in/chsk1999",
  github: "https://github.com/kasai22",
  /**
   * The downloadable résumé — the Nov 2026 edition ("Product Designer | UX
   * Engineer | Front-end Development"). Every Resume button on the site
   * points here; replace the file at this path when the résumé changes.
   */
  resume: { href: "/SaiKomal_Resume.pdf", fileName: "SaiKomal_Resume.pdf" },
} as const;

export type SocialPlatform = "github" | "linkedin" | "x" | "discord" | "slack";

export interface SocialLink {
  label: string;
  href: string;
  platform: SocialPlatform;
}

/**
 * Profiles, ordered for a hiring reader: LinkedIn first, then the code.
 * Discord and a private Slack workspace link used to sit here; neither is on
 * the résumé and the Slack link only resolves for members, so they are gone.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: CONTACT.linkedin, platform: "linkedin" },
  { label: "GitHub", href: CONTACT.github, platform: "github" },
  { label: "X", href: "https://x.com/SaiKomal4", platform: "x" },
];

/* ------------------------------------------------------------------ *
 * Employment — exact résumé dates.
 * ------------------------------------------------------------------ */

export interface YearMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export interface Employment {
  id: "onliest" | "ondl" | "sweya" | "oracle";
  company: string;
  role: string;
  location: string;
  start: YearMonth;
  /** `null` means the role is current. */
  end: YearMonth | null;
  /** What the role produced. Each line is a résumé point, lightly edited. */
  summary: string[];
  /** The themes the role is evidence of. Rendered as quiet tags. */
  focus: string[];
}

export const EXPERIENCE: Employment[] = [
  {
    id: "onliest",
    company: "Onliest",
    role: "UX Designer",
    location: "Visakhapatnam, India",
    start: { year: 2026, month: 5 },
    end: null,
    summary: [
      "Designed REX, an AI recommendation product, from requirements through user flows, interaction models, wireframes and high-fidelity prototypes.",
      "Defined the AI response and error states — low-confidence, no-result, cold-start, loading, empty and recovery scenarios.",
      "Built reusable Figma patterns across the Marketplace, HR Admin and Revenue products.",
    ],
    focus: ["AI product design", "Human-AI interaction", "Conversational UX", "Reusable systems"],
  },
  {
    id: "ondl",
    company: "ONDL",
    role: "Product Owner & UX Designer",
    location: "Visakhapatnam, India",
    start: { year: 2024, month: 11 },
    end: { year: 2026, month: 5 },
    summary: [
      "Owned product and UX workflows for Kudra, a fleet and trip platform covering trip creation, driver assignment, vehicle allocation, fuel tracking and monitoring.",
      "Conducted field research with drivers, dispatchers and fleet supervisors.",
      "Workflow consolidation reduced trip-creation effort by 20% and manual operational effort by 30%.",
    ],
    focus: ["Enterprise SaaS", "Operational dashboards", "Product ownership", "Field research"],
  },
  {
    id: "sweya",
    company: "Sweya Infotech",
    role: "UX Designer",
    location: "Visakhapatnam, India",
    start: { year: 2022, month: 10 },
    end: { year: 2024, month: 11 },
    summary: [
      "Designed enterprise products from research and information architecture through user flows, wireframes, prototypes and high-fidelity interfaces.",
      "Conducted interviews, usability tests and stakeholder workshops.",
      "Created reusable components and design-system patterns.",
    ],
    focus: ["Enterprise UX", "Design systems", "Research", "Interaction design"],
  },
  {
    id: "oracle",
    company: "Oracle",
    role: "SQL Developer",
    location: "Hyderabad, India",
    start: { year: 2021, month: 7 },
    end: { year: 2022, month: 9 },
    summary: [
      "Built enterprise data-integration and reporting solutions, working with SQL, APIs, business workflows and data dependencies.",
      "Developed internal reporting tools that improved access to business data and supported enterprise workflows.",
    ],
    focus: ["SQL", "Data workflows", "Reporting", "Data dependencies"],
  },
];

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "November 2024" or, with `short`, "Nov 2024". */
export function formatYearMonth(value: YearMonth, short = false): string {
  const name = MONTHS_LONG[value.month - 1] ?? String(value.month);
  return `${short ? name.slice(0, 3) : name} ${value.year}`;
}

/** "November 2024 – May 2026", "May 2026 – Present". */
export function formatPeriod(role: Pick<Employment, "start" | "end">, short = false): string {
  const end = role.end ? formatYearMonth(role.end, short) : "Present";
  return `${formatYearMonth(role.start, short)} – ${end}`;
}

/** Machine-readable form for `<time dateTime>` and JSON-LD. */
export function isoYearMonth(value: YearMonth): string {
  return `${value.year}-${String(value.month).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ *
 * Headline numbers — verified, and the only ones the home page shows.
 * ------------------------------------------------------------------ */

export const CAREER_YEARS = {
  /** Software, data and product design together — since July 2021. */
  overall: "5",
  /** UX roles only — since October 2022. */
  ux: "4+",
} as const;

/**
 * Kudra's two measured outcomes. These are the only performance figures on
 * the site; the case study, the home card and the experience list all read
 * them from here.
 */
export const KUDRA_OUTCOMES = [
  { value: "20%", label: "Less trip-creation effort" },
  { value: "30%", label: "Less manual operational effort" },
] as const;

/**
 * The six figures the home page leads with — every one either a résumé fact
 * or a count of what is actually on this site. Project counts are filled in
 * by `constants/projects.ts`, so they cannot drift from the lists.
 */
export const HOME_METRICS = {
  overall: { value: CAREER_YEARS.overall, label: "Years across software, data & product design" },
  ux: { value: CAREER_YEARS.ux, label: "Years in UX" },
  trip: { value: KUDRA_OUTCOMES[0].value, label: "Less trip-creation effort — Kudra" },
  ops: { value: KUDRA_OUTCOMES[1].value, label: "Less manual operational effort — Kudra" },
} as const;

/* ------------------------------------------------------------------ *
 * Capabilities — what the work above is evidence of.
 * ------------------------------------------------------------------ */

export interface CapabilityGroup {
  id: string;
  title: string;
  /** One line on what it is used for, not an adjective. */
  description: string;
  items: string[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: "frontend",
    title: "Front-end engineering",
    description: "Component-based interfaces in a maintainable structure, responsive by default.",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "Tailwind CSS",
      "Responsive implementation",
    ],
  },
  {
    id: "data",
    title: "SQL & data",
    description: "The data side of a product — queries, reporting and the dependencies between them.",
    items: ["SQL", "PostgreSQL", "Reporting workflows", "Data dependencies"],
  },
  {
    id: "integration",
    title: "APIs & backend integration",
    description: "Wiring an interface to real services, and designing for what they return.",
    items: [
      "REST APIs",
      "Route handlers & server actions",
      "Supabase (Auth, Postgres, Storage)",
      "Headless CMS",
      "Data-driven UI",
      "Deployment on Vercel",
    ],
  },
  {
    id: "ai",
    title: "AI-assisted development",
    description: "AI speeds up implementation; understanding, review and validation stay with me.",
    items: [
      "Claude",
      "ChatGPT",
      "Structured prompting",
      "Prompt-led coding",
      "Code understanding",
      "Debugging & troubleshooting",
      "Reviewing AI output",
    ],
  },
  {
    id: "design",
    title: "Product design & design systems",
    description: "Enterprise UX — from research to a system other people can build on.",
    items: [
      "Figma (Variables, Components, Variants)",
      "Design systems",
      "Interaction design",
      "Information architecture",
      "Usability testing",
      "Data-heavy interfaces",
      "WCAG AA accessibility",
    ],
  },
];

/**
 * How AI fits into the engineering work. Stated once, plainly, because the
 * distinction matters to anyone hiring for it.
 */
export const AI_PRACTICE = {
  title: "How I use AI in engineering",
  points: [
    {
      label: "Frame",
      detail:
        "I write the requirements, constraints and acceptance criteria first, so the prompt describes a product decision rather than a guess.",
    },
    {
      label: "Generate",
      detail:
        "Claude and ChatGPT accelerate implementation — scaffolding, boilerplate, and first drafts of components and queries.",
    },
    {
      label: "Review",
      detail:
        "I read and understand what comes back, adapt it to the codebase's conventions, and reject what does not hold up.",
    },
    {
      label: "Validate",
      detail:
        "I integrate the change, debug it, and verify it works — in the browser, against real data, and in the production build.",
    },
  ],
} as const;
