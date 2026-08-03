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

export const HERO_TAGS = ["User Experience Engineer", "UX/UI Prototyping", "Front-End Development"];

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
  "Great UX engineering lives in the handoff — where a design concept has to survive contact with real technical constraints without losing its intent. My job is to make that translation as fast, tangible, and faithful as possible.";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: "◈",
    category: "UX Design & Research",
    description: "User-centered design methodology from discovery through validation",
    items: [
      "User Experience (UX) Design",
      "User-Centered Design Principles",
      "User Research",
      "Usability Testing",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "Interaction Design",
      "Design Systems",
      "Accessibility",
    ],
  },
  {
    icon: "⬡",
    category: "Prototyping & Front-End Engineering",
    description: "Turning design intent into tangible, technically feasible prototypes",
    items: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "Rapid Prototyping",
      "High-Fidelity UI",
      "HTML / CSS / JavaScript",
      "React / Next.js",
      "Tailwind CSS",
      "Component Libraries",
      "Developer Handoff",
    ],
  },
  {
    icon: "◎",
    category: "Process & Collaboration",
    description: "Cross-functional partnership with designers, developers, and stakeholders",
    items: [
      "Cross-functional Collaboration",
      "Design–Dev Alignment",
      "Product Discovery",
      "SDLC Awareness",
      "Agile / Jira",
      "Miro",
      "Notion",
      "Claude AI / ChatGPT",
      "AI-Assisted Prototyping",
      "Stakeholder Communication",
    ],
  },
];

export const WORKFLOW_METRICS: WorkflowMetric[] = [
  { label: "User Research → Insight", pct: 88 },
  { label: "Wireframes → Prototype", pct: 95 },
  { label: "Prototype → Front-End Code", pct: 90 },
  { label: "Usability Testing", pct: 85 },
  { label: "Developer Handoff", pct: 92 },
];

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    title: "Onliest REX — Luxury AI Fashion Stylist",
    description:
      "Product design and BRD ownership for REX, an agentic AI recommendation and design engine for a luxury fashion platform. Covers conversational and guided-wizard UX, live virtual try-on with explainable match scoring, image-based inspiration understanding, and an Admin-governed multi-agent architecture.",
    tags: ["Conversational AI", "Agentic Architecture", "Fashion Tech", "BRD → Product"],
    accentColor: "#c9a86a",
    slug: "/case-study/rex",
    year: "2026",
    image: "/rex/rex-hero.jpg",
  },
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
