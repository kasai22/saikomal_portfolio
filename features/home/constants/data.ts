import type {
  AboutStat,
  CaseStudyProject,
  CodingProject,
  GraphicProject,
  SkillGroup,
  Social,
  WorkflowMetric,
} from "@/features/home/types";

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/kasai22", platform: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chsk1999", platform: "linkedin" },
];

export const HERO_TAGS = ["Product Designer", "Graphic Designer", "Frontend Developer"];

export const ABOUT_STATS: AboutStat[] = [
  { label: "Projects", value: "10+" },
  { label: "Case Studies", value: "5+" },
  { label: "Skills", value: "18+" },
  { label: "Years Active", value: "3+" },
];

export const WHAT_I_BRING = [
  "User-centered design approach with deep empathy for real users",
  "End-to-end design capability from research to high-fidelity prototypes",
  "Frontend skills to implement and validate designs in code",
  "Strong collaboration with developers, stakeholders, and product teams",
];

export const DESIGN_PHILOSOPHY_QUOTE =
  "Good design is invisible — it empowers users to accomplish their goals without friction or confusion. Every pixel, every interaction, every word on the screen is a decision that either builds or breaks trust.";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: "◈",
    category: "Product Design",
    description: "End-to-end design thinking from research to pixel-perfect delivery",
    items: [
      "Product Design",
      "UX Strategy",
      "SaaS Workflows",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "High-Fidelity UI",
      "Interaction Design",
      "Dashboard Design",
      "Usability Testing",
    ],
  },
  {
    icon: "⬡",
    category: "Systems & Collaboration",
    description: "Scalable design infrastructure built for cross-functional teams",
    items: [
      "Design Systems",
      "Atomic Design",
      "Design Tokens",
      "Component Libraries",
      "Scalable UI Architecture",
      "Developer Handoff",
      "Cross-functional Collaboration",
      "Product Discovery",
      "SDLC Awareness",
      "API-driven UI Thinking",
    ],
  },
  {
    icon: "◎",
    category: "Tools & AI Workflow",
    description: "Modern toolchain with AI-assisted workflows for rapid iteration",
    items: [
      "Figma",
      "Miro",
      "Notion",
      "Jira",
      "Claude AI",
      "ChatGPT",
      "AI-assisted Prototyping",
      "Rapid UI Iteration",
      "React / Next.js",
      "Tailwind CSS",
    ],
  },
];

export const WORKFLOW_METRICS: WorkflowMetric[] = [
  { label: "Research → Strategy", pct: 90 },
  { label: "Wireframes → Hi-Fi", pct: 95 },
  { label: "Design Systems", pct: 88 },
  { label: "Developer Handoff", pct: 92 },
  { label: "AI-Assisted Design", pct: 85 },
];

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
  },
  {
    title: "ClappIt — Cloud Infrastructure & DevOps Platform",
    description:
      "Full UX redesign of an AI-powered cloud infrastructure automation platform. Transformed cognitively overloaded DevOps dashboards into a clarity-first enterprise product — covering UX research, information architecture, design system, and high-fidelity UI.",
    tags: ["Enterprise UX", "Dashboard Design", "Design System", "DevOps SaaS"],
    accentColor: "#E8273A",
    slug: "/case-study/clappit",
    year: "2024",
    image: "/figmaAssets/clappit-dashboard.png",
  },
  {
    title: "HSL Website Redesign",
    description:
      "A comprehensive UX/UI redesign of Hindusthan Shipyard Limited's website. The project involved in-depth user research, competitive analysis, empathy mapping, wireframing, prototyping and high-fidelity visual design to create a modern, mobile-responsive platform.",
    tags: ["UX Research", "UI Design", "Prototyping", "Figma"],
    accentColor: "#008080",
    slug: "/case-study",
    year: "2024",
    image: "/figmaAssets/image-16.png",
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

export const GRAPHIC_PROJECTS: GraphicProject[] = [
  {
    title: "Brand Identity & Visual Design",
    description:
      "Logo design, brand systems, and visual identity work across multiple client projects — from logistics startups to enterprise software companies.",
    tags: ["Brand Identity", "Logo Design", "Visual Systems"],
    accent: "#8B5CF6",
    icon: "◈",
  },
  {
    title: "Marketing & Social Media Creatives",
    description:
      "Campaign creatives, social media templates, and digital marketing assets designed for product launches and ongoing brand communication.",
    tags: ["Social Media", "Digital Marketing", "Campaign Design"],
    accent: "#EC4899",
    icon: "⬡",
  },
  {
    title: "UI Illustration & Iconography",
    description:
      "Custom illustration sets, icon libraries, and product-integrated artwork created to complement SaaS product interfaces and marketing materials.",
    tags: ["Illustration", "Iconography", "Product Art"],
    accent: "#F59E0B",
    icon: "◎",
  },
];

export const CONTACT_EMAIL = "chsaikomal@gmail.com";
