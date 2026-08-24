import type {
  AboutStat,
  CapabilityGroup,
  CareerStep,
  CaseStudyProject,
  CodingProject,
  ExperienceEntry,
  Metric,
  ProcessStep,
  Service,
  Social,
  Strength,
  TriadConcept,
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

/* ------------------------------------------------------------------ *
 * Hero — the whole section is under 25 words. What used to be argued
 * in prose is now shown: proof numbers instead of adjectives.
 * ------------------------------------------------------------------ */

export const HERO_EYEBROW = "Sai Komal";
export const HERO_ROLE = "Product Designer & UX Engineer";
export const HERO_HEADLINE_LINE_1 = "Complex workflows,";
export const HERO_HEADLINE_LINE_2 = "made obvious.";
export const HERO_SUBCOPY = "I design enterprise products — then write the front-end that ships them.";

/** Proof chips under the hero headline. */
export const HERO_PROOF: Metric[] = [
  { value: "3+", label: "Years" },
  { value: "40%", label: "Manual coordination cut" },
  { value: "3", label: "Case studies" },
];

/** The design-to-ship loop, drawn as a track in the hero. */
export const HERO_LOOP = ["Research", "Design", "Prototype", "Ship"];

/* ------------------------------------------------------------------ *
 * The deck, sequenced work-first: the catalogue of what exists comes
 * before the argument about how it was made. Chapter numbers live here
 * so resequencing is a change in one place rather than eight.
 * ------------------------------------------------------------------ */
export const DECK = {
  work: { chapter: "01", eyebrow: "Selected work" },
  development: { chapter: "02", eyebrow: "Development" },
  help: { chapter: "03", eyebrow: "Ways I can help" },
  process: { chapter: "04", eyebrow: "How I work" },
  background: { chapter: "05", eyebrow: "About" },
  track: { chapter: "06", eyebrow: "Track record" },
  ask: { chapter: "07", eyebrow: "Contact" },
} as const;

/** Slide-level supporting lines — one sentence each, no more. */
export const SLIDE_INTRO = {
  work: "Long-form case studies. Every one replaced a manual process people were running by phone and spreadsheet.",
  development: "Sites I designed and shipped the front-end for, live in production.",
  help: "What I actually take off a team's plate, and what gets handed back.",
  process: "Five stages, each ending in something concrete enough to hand over.",
  background: "Engineering, then data, then UX. Which is why my work is dashboards and admin consoles.",
  track: "Four roles, one direction of travel — data, to design, to owning the product.",
  ask: "Looking for a full-time Product Designer or UX Engineer role. The form is the fastest reply.",
};

/** Counts of what is actually on this site, not rounded-up claims. */
export const ABOUT_STATS: AboutStat[] = [
  { label: "Projects", value: "6" },
  { label: "Case studies", value: "3" },
  { label: "Capabilities", value: "26" },
  { label: "Years in UX", value: "3+" },
];

/** About, told as a track rather than three paragraphs. */
export const CAREER_PATH: CareerStep[] = [
  { period: "2017–21", label: "Mechanical Engineering", detail: "B.Tech, VIT Vellore" },
  { period: "2021–23", label: "SQL Developer", detail: "Oracle — data at scale" },
  { period: "2023–24", label: "UX Designer", detail: "Sweya — enterprise UI" },
  { period: "2024–26", label: "Product Owner & UX Designer", detail: "ONDL — logistics platforms" },
  { period: "2026–", label: "UX Designer", detail: "Onliest — AI products" },
];

export const ABOUT_LEAD =
  "I design the screens and build a working version of them — so engineering gets something that survives its first edge case, not a static mockup.";

export const ABOUT_FOCUS =
  "Engineering, then data, then UX. Which is why my work is dashboards and admin consoles: the hard part is never one screen.";

export const STRENGTHS: Strength[] = [
  { icon: "◆", title: "Design to code", detail: "Figma through to a working React build" },
  { icon: "◇", title: "Research-led", detail: "Interviews and usability tests, not assumptions" },
  { icon: "◈", title: "Systems, not screens", detail: "Tokens, components, states" },
  { icon: "◉", title: "Edge-state literate", detail: "Loading, empty, error, partial data" },
  { icon: "✦", title: "Owns the ambiguity", detail: "Frames the problem before scoping it" },
];

/* ------------------------------------------------------------------ *
 * Engineering + UX + Product.
 *
 * Restored verbatim from the triad component that used to hold this
 * content inline before it was deleted from the working tree. Nothing here
 * is new copy — the three concepts, their one-line provenance and their
 * contributions are exactly as they were written. `ABOUT_FOCUS` above is
 * the synthesis line, and was orphaned by the same deletion.
 * ------------------------------------------------------------------ */
export const PRODUCT_THINKING: TriadConcept[] = [
  {
    label: "Engineering",
    detail: "B.Tech Mechanical — VIT Vellore",
    points: ["Systems thinking", "Technical constraints", "Structured problem solving", "Feasibility"],
  },
  {
    label: "UX",
    detail: "3+ years — logistics, DevOps, fashion-tech",
    points: ["Research", "Information architecture", "Interaction design", "Usability testing"],
  },
  {
    label: "Product",
    detail: "What actually ships",
    points: ["Business goals", "User needs", "Technical feasibility", "Usability"],
  },
];

export const DESIGN_PHILOSOPHY_QUOTE =
  "Most of the real design work happens after the mockup is done — when it meets a real API, a loading state, or an edge case nobody drew.";

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    icon: "◈",
    category: "Product Strategy",
    description: "Ambiguous problem to scoped, buildable decision",
    items: ["Product Discovery", "Problem Framing", "User Research", "Feature Validation", "Product Workflows"],
  },
  {
    icon: "◎",
    category: "UX Design",
    description: "The structure and interaction work that precedes UI",
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
    description: "Validated flows to production-ready interface systems",
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
    description: "Making design intent survive the handoff",
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
  { label: "Product", items: ["Jira", "Notion", "Miro", "Claude"] },
  { label: "Code", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"] },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Talk to the people who will actually use it.",
    output: "Interviews · Empathy map",
  },
  {
    number: "02",
    title: "Define",
    description: "Scope it — what is in, what is out, what success means.",
    output: "Problem statement · IA",
  },
  {
    number: "03",
    title: "Design",
    description: "Wireframes to hi-fi, on a system rather than one-off screens.",
    output: "Flows · Design system",
  },
  {
    number: "04",
    title: "Build",
    description: "Wire the real thing up in React, not a static file.",
    output: "Working prototype",
  },
  {
    number: "05",
    title: "Validate",
    description: "Real usage decides what gets fixed next.",
    output: "Usability findings",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Onliest",
    role: "UX Designer",
    location: "Visakhapatnam, India",
    duration: "May 2026 — Present",
    current: true,
    summary: [
      "Designed REX, an AI recommendation product — requirements through flows, interaction models and prototypes.",
      "Designed the AI edge states: low-confidence, no-result, cold-start, loading, empty and error.",
      "Built reusable Figma patterns across Marketplace, HR Admin and Revenue using Variables and Variants.",
    ],
  },
  {
    company: "ONDL",
    role: "Product Owner & UX Designer",
    location: "Visakhapatnam, India",
    duration: "Oct 2024 — May 2026",
    summary: [
      "Cut trip-creation effort 20% and manual operational effort 30% by consolidating the workflow.",
      "Designed Kudra end to end — trip creation, driver assignment, vehicle allocation, fuel tracking.",
      "Ran field research with drivers, dispatchers and fleet supervisors.",
    ],
  },
  {
    company: "Sweya Infotech",
    role: "UX Designer",
    location: "Visakhapatnam, India",
    duration: "May 2023 — Oct 2024",
    summary: [
      "Designed enterprise products from research and IA through to high-fidelity UI.",
      "Ran interviews, usability testing and stakeholder workshops to find workflow breakage.",
      "Created reusable components and design-system patterns for scalable interfaces.",
    ],
  },
  {
    company: "Oracle",
    role: "SQL Developer",
    location: "Hyderabad, India",
    duration: "Nov 2021 — Apr 2023",
    summary: [
      "Built enterprise data-integration and reporting solutions across APIs and business workflows.",
      "Shipped internal reporting tools that widened access to business data.",
    ],
  },
];

export const RECRUITER_SNAPSHOT = {
  experience: "3+ years",
  focus: "Enterprise SaaS & AI products",
  industries: ["Fashion tech", "Logistics", "DevOps", "Government"],
  frontEnd: "React, Next.js, Tailwind",
  design: "Figma, design systems",
  ai: "Claude & AI-assisted workflows",
  location: "India · open to remote",
  availability: "Open to new roles",
};

/** Ways I can help — offers, each naming what gets handed back. */
export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Design the product end to end",
    description: "Framing an ambiguous problem through to production-ready UI.",
    deliverables: ["Research", "IA & flows", "Wireframes", "High-fidelity UI"],
  },
  {
    number: "02",
    title: "Build the front-end",
    description: "The design shipped in React — not a static file thrown over the wall.",
    deliverables: ["React / Next.js", "Tailwind", "Working prototype", "Dev handoff"],
  },
  {
    number: "03",
    title: "Set up the design system",
    description: "Tokens, components and states, so the product holds together as it grows.",
    deliverables: ["Design tokens", "Component library", "Edge states", "Documentation"],
  },
  {
    number: "04",
    title: "Design AI-facing interfaces",
    description: "Making a model's output legible — and safe when it is uncertain.",
    deliverables: ["Conversational UX", "Explainable ranking", "Confidence signals", "Fallback states"],
  },
];

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    title: "Kudra — Fleet & Trip Management",
    description: "Call-and-spreadsheet fleet coordination, rebuilt as one trip-centric system.",
    tags: ["Product Strategy", "Enterprise UX", "SaaS Design", "Fleet Management"],
    accentColor: "#956807",
    slug: "/case-study/kudra",
    year: "2025",
    image: "/figmaAssets/kudra-dashboard.png",
    role: "Product Designer",
    timeline: "2025 – 2026",
    businessGoal: "Replace call-and-spreadsheet coordination with one system",
    readMins: 9,
    metrics: [
      { value: "84", label: "Vehicles tracked" },
      { value: "40%", label: "Less manual coordination" },
      { value: "78%", label: "Faster trip creation" },
    ],
  },
  {
    title: "Onliest REX — AI Fashion Stylist",
    description: "An agentic stylist that scores and explains every recommendation it makes.",
    tags: ["Conversational AI", "Agentic Architecture", "Fashion Tech", "BRD → Product"],
    accentColor: "#8B6C32",
    slug: "/case-study/rex",
    year: "2026",
    image: "/rex/rex-hero.svg",
    role: "Product Owner / Designer",
    timeline: "~6 weeks",
    businessGoal: "Replace generic search with a scored AI stylist",
    readMins: 8,
    metrics: [
      { value: "6", label: "Agents orchestrated" },
      { value: "6 wks", label: "BRD to prototype" },
      { value: "4", label: "Entry paths" },
    ],
  },
  {
    title: "Hindustan Shipyard Digital Experience",
    description: "Five siloed public-sector modules, unified so status-chasing calls stopped.",
    tags: ["Stakeholder Research", "Enterprise Ecosystem", "Public Sector", "Accessibility"],
    accentColor: "#0C7E7E",
    slug: "/case-study",
    year: "2024",
    image: "/figmaAssets/image-16.png",
    role: "UX Researcher & Designer",
    timeline: "12 weeks",
    businessGoal: "Replace status-chasing calls with self-serve visibility",
    readMins: 6,
    metrics: [
      { value: "5", label: "Modules unified" },
      { value: "12 wks", label: "Research to ship" },
      { value: "Live", label: "In production" },
    ],
  },
];

export const CODING_PROJECTS: CodingProject[] = [
  {
    title: "ONDL Jolt",
    tagline: "Next-day delivery to remote India",
    description: "Delivery-availability checker for Tier 2, Tier 3 and rural markets.",
    url: "https://www.joltdelivery.in/",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: "/figmaAssets/jolt-screenshot.png",
    accent: "#7C3AED",
    year: "2024",
  },
  {
    title: "ONDL",
    tagline: "Enterprise logistics platform",
    description: "The primary B2B web platform, built performance-first.",
    url: "https://www.ondl.in/",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: null,
    accent: "#008080",
    year: "2024",
  },
  {
    title: "HotelFirst Advisory",
    tagline: "Strategic hotel advisory",
    description: "Conversion-focused marketing site for a hotel consulting firm.",
    url: "https://www.hotelfirst.one/",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: "/figmaAssets/hotelfirst-screenshot.png",
    accent: "#C3490A",
    year: "2024",
  },
];

export const CONTACT_EMAIL = "chsaikomal@gmail.com";
