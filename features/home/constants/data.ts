import type {
  AboutStat,
  CapabilityGroup,
  CaseStudyProject,
  CodingProject,
  ExperienceEntry,
  ProcessStep,
  Social,
} from "@/features/home/types";

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/kasai22", platform: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chsk1999", platform: "linkedin" },
];

export const CONTACT_SOCIALS: Social[] = [
  ...SOCIALS,
  { label: "X", href: "https://x.com/SaiKomal4", platform: "x" },
  { label: "Discord", href: "https://discord.com/users/695223950757593098", platform: "discord" },
  {
    label: "Slack",
    href: "https://mywork-tok1009.slack.com/team/U0BRJ480NLX",
    platform: "slack",
  },
];

export const HERO_EYEBROW = "I'm Sai Komal";
export const HERO_TAGS = ["Product Design", "Front-End Engineering", "Enterprise SaaS"];
export const HERO_HEADLINE_LINE_1 = "I design digital products that";
export const HERO_HEADLINE_LINE_2 = "make complex workflows simple.";
export const HERO_SUBCOPY =
  "Product Designer and UX Engineer with 3+ years designing dashboards, admin consoles, and operational workflows for logistics, DevOps, and fashion-tech platforms. I do the full loop myself — research, wireframes, high-fidelity UI, and the React/Next.js code to make it real.";

export const ABOUT_STATS: AboutStat[] = [
  { label: "Projects", value: "10+" },
  { label: "Case Studies", value: "5+" },
  { label: "Skills", value: "18+" },
  { label: "Years in UX", value: "3+" },
];

export const WHAT_I_BRING = [
  "Fast, tangible translation of design concepts into working prototypes — balancing technical feasibility with design intent",
  "Hands-on user research and usability testing to validate decisions with real feedback, not assumptions",
  "Wireframing and prototyping fluency across Figma, Sketch, and Adobe XD, from low-fidelity flows to interactive hi-fi builds",
  "Front-end implementation skills (React, Next.js, Tailwind CSS) that let me speak the same language as engineering teams",
  "Independent, SME-level ownership of UX problems, with active contribution in cross-functional team discussions",
];

export const DESIGN_PHILOSOPHY_QUOTE =
  "Most of the real design work happens after the mockup is 'done' — when it meets a real API, a loading state, or an edge case nobody drew. I'd rather be in the room for that part than hand off a static file and hope it survives.";

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    icon: "◈",
    category: "Product Strategy",
    description: "Turning an ambiguous problem into a scoped, buildable product decision",
    items: ["Product Discovery", "Problem Framing", "User Research", "Feature Validation", "Product Workflows"],
  },
  {
    icon: "◎",
    category: "UX Design",
    description: "Research, structure, and interaction work that shapes what gets built before UI does",
    items: [
      "User-Centered Design",
      "Usability Testing",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "Interaction Design",
      "Accessibility",
    ],
  },
  {
    icon: "⬡",
    category: "UI Design",
    description: "Turning validated flows into scalable, production-ready interface systems",
    items: [
      "High-Fidelity UI Design",
      "Design Systems",
      "Atomic Design",
      "Design Tokens",
      "Component Libraries",
      "Scalable UI Systems",
      "Rapid Prototyping",
    ],
  },
  {
    icon: "✦",
    category: "Product Collaboration",
    description: "Working the handoff so design intent survives contact with engineering",
    items: [
      "Cross-functional Collaboration",
      "Design–Dev Alignment",
      "Developer Handoff",
      "Stakeholder Communication",
      "Agile / Jira",
      "SDLC Awareness",
      "AI-Assisted Design",
    ],
  },
];

export const TOOL_GROUPS: { label: string; items: string[] }[] = [
  { label: "Design", items: ["Figma", "Sketch", "Adobe XD"] },
  { label: "Product & Collaboration", items: ["Jira", "Notion", "Miro", "Claude"] },
  { label: "Technology", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Talk to the people who'll actually use it, dig into the operational reality behind the request, and frame the actual problem before touching a screen.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Scope the problem into a buildable product decision — what's in, what's out, and what success actually looks like for the business and the user.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Wireframes through high-fidelity UI, built on a consistent design system rather than one-off screens, so the product holds together as it grows.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Wire up interactive flows myself in React and Next.js, so what engineering gets isn't a static file — it's close to what actually ships.",
  },
  {
    number: "05",
    title: "Validate",
    description:
      "Usability testing and real usage tell me what to fix next — the design isn't done when the mockup is, it's done when it survives contact with reality.",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "ONDL",
    role: "Product Owner",
    location: "Visakhapatnam, India",
    duration: "Oct 2024 — Present",
    current: true,
    summary: [
      "Contributed to scalable design systems using atomic design principles and reusable component structures, improving UI consistency across product modules.",
      "Led development of logistics platforms (Kudra, Parivahan, Karta) focusing on scalable fleet and trip-lifecycle workflows.",
      "Designed product flows for trip creation, driver assignment, fuel tracking, and vehicle allocation systems.",
      "Improved operational efficiency by 20% through workflow redesign.",
      "Collaborated closely with engineering teams to ensure scalable technical implementation.",
      "Leveraged generative AI tools to accelerate UI exploration and product design iterations.",
    ],
  },
  {
    company: "Sweya Infotech",
    role: "Associate UX Designer",
    location: "Visakhapatnam, India",
    duration: "May 2023 — Oct 2024",
    summary: [
      "Designed user interfaces for enterprise software platforms focusing on workflow optimization.",
      "Conducted user research and usability testing to improve product experiences.",
      "Built scalable UI components and contributed to design system documentation.",
      "Designed interfaces considering loading, empty, error, and partial data states.",
    ],
  },
  {
    company: "Oracle",
    role: "SQL Developer",
    location: "Hyderabad, India",
    duration: "Mar 2022 — Apr 2023",
    summary: [
      "Developed data-integration modules connecting Oracle PaaS with enterprise systems.",
      "Built internal reporting tools that improved data accessibility for business teams.",
    ],
  },
];

export const RECRUITER_SNAPSHOT = {
  experience: "3+ years",
  focus: "Enterprise SaaS & AI-assisted products",
  industries: ["Fashion tech", "Logistics", "DevOps", "Government"],
  frontEnd: "React, Next.js, Tailwind CSS",
  design: "Figma, design systems, prototyping",
  ai: "Building with Claude & AI-assisted workflows",
  location: "India · open to remote",
  availability: "Open to new roles",
};

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    title: "Kudra — Fleet & Trip Management Platform",
    description:
      "End-to-end product design of an enterprise logistics SaaS platform. Transformed manual, call-heavy fleet operations into a trip-centric, data-driven system — covering UX research, product strategy, workflow design, and a full design system.",
    tags: ["Product Strategy", "Enterprise UX", "SaaS Design", "Fleet Management"],
    accentColor: "#F5B731",
    slug: "/case-study/kudra",
    year: "2025",
    image: "/figmaAssets/kudra-dashboard.png",
    role: "Product Designer",
    timeline: "2025 – 2026",
    businessGoal: "Replace call-and-spreadsheet coordination with one system",
    readMins: 9,
  },
  {
    title: "Onliest REX — Luxury AI Fashion Stylist",
    description:
      "Product design and BRD ownership for REX, an agentic AI recommendation and design engine for a luxury fashion platform. Covers conversational and guided-wizard UX, live virtual try-on with explainable match scoring, image-based inspiration understanding, and an Admin-governed multi-agent architecture.",
    tags: ["Conversational AI", "Agentic Architecture", "Fashion Tech", "BRD → Product"],
    accentColor: "#c9a86a",
    slug: "/case-study/rex",
    year: "2026",
    image: "/rex/rex-hero.svg",
    role: "Product Owner / Designer",
    timeline: "~6 weeks",
    businessGoal: "Replace generic search with a scored AI stylist",
    readMins: 8,
  },
  {
    title: "Hindustan Shipyard Enterprise Digital Experience",
    description:
      "Five disconnected modules — recruitment, tenders, vendor, vigilance, portfolio — where every question became a phone call. I ran stakeholder research across each branch, then designed a candidate portal that shows applicants their real status and a tenders dashboard that moved bidding information out of email. Shipped; HR and the tender cell report fewer status calls.",
    tags: ["Stakeholder Research", "Enterprise Ecosystem", "Public Sector", "Accessibility"],
    accentColor: "#0FA3A3",
    slug: "/case-study",
    year: "2024",
    image: "/figmaAssets/image-16.png",
    role: "UX Researcher & Designer · Stakeholder POC",
    timeline: "12 weeks",
    businessGoal: "Replace status-chasing calls with self-serve visibility",
    readMins: 6,
  },
];

export const CODING_PROJECTS: CodingProject[] = [
  {
    title: "ONDL Jolt",
    tagline: "Hyperfast next-day delivery to remote areas",
    description:
      "A full-stack marketing and logistics platform for ONDL's Jolt delivery service — enabling businesses to check delivery availability across Tier 2, Tier 3, and rural markets.",
    url: "https://www.joltdelivery.in/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/figmaAssets/jolt-screenshot.png",
    accent: "#7C3AED",
    year: "2024",
  },
  {
    title: "ONDL",
    tagline: "Enterprise logistics & operations platform",
    description:
      "The primary web platform for ONDL — a modern enterprise logistics company. Built with a performance-first architecture and clean enterprise SaaS aesthetic to support B2B operations.",
    url: "https://www.ondl.in/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: null,
    accent: "#008080",
    year: "2024",
  },
  {
    title: "HotelFirst Advisory",
    tagline: "Strategic hotel advisory, delivered first",
    description:
      "A premium advisory firm website for HotelFirst — showcasing strategic hotel consulting services with a polished, conversion-focused design and clean content hierarchy.",
    url: "https://www.hotelfirst.one/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/figmaAssets/hotelfirst-screenshot.png",
    accent: "#EA580C",
    year: "2024",
  },
];

export const CONTACT_EMAIL = "chsaikomal@gmail.com";
