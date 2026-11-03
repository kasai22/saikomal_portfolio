import { KUDRA_OUTCOMES } from "@/constants/profile";

/**
 * Every project on the site — the five UX and product case studies, and the
 * four independent engineering projects — with the metadata the home page,
 * the case-study heroes, the sitemap and the page metadata all read.
 *
 * Timelines are the résumé's. The independent projects carry no dates: the
 * résumé lists them as independent work without start or finish dates, so
 * none are given here, and they are classified as "Independent Project"
 * rather than as employment or client work.
 */

/* ------------------------------------------------------------------ *
 * UX & product case studies
 * ------------------------------------------------------------------ */

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface UxProject {
  id: "rex" | "hr-admin" | "kudra" | "clappit" | "hsl";
  /** The route of the case study. */
  href: string;
  /** The name of the product. */
  name: string;
  /** What it is, after the dash on the résumé. */
  subtitle: string;
  /** The résumé timeline, verbatim. */
  timeline: string;
  /** Who it was for, where that is on the record. */
  context?: string;
  role: string;
  /** One or two sentences, from the résumé. */
  summary: string;
  /** What the project is evidence of. */
  focus: string[];
  /** Verified, measured outcomes only. Most projects have none. */
  metrics?: ProjectMetric[];
  image: { src: string; alt: string; width: number; height: number } | null;
  accent: string;
  /** "full" — a long-form case study. "summary" — a shorter project brief. */
  depth: "full" | "summary";
  readMins: number;
  /** Used as the page's meta description. */
  seoDescription: string;
}

export const UX_PROJECTS: UxProject[] = [
  {
    id: "rex",
    href: "/case-study/rex",
    name: "REX",
    subtitle: "AI Recommendation & Product Intelligence",
    timeline: "2026",
    context: "Onliest",
    role: "UX Designer",
    summary:
      "Designed conversational and personalised recommendation journeys, multilingual inputs and inspiration-image discovery — and the confidence signalling, ranking rationale and recovery states that make an AI's answer something a customer can trust.",
    focus: [
      "Confidence signalling",
      "Ranking rationale",
      "Low-confidence & no-result states",
      "Loading, error & recovery",
      "Human-AI interaction",
    ],
    image: { src: "/rex/rex-hero.svg", alt: "REX AI stylist interface", width: 1920, height: 1200 },
    accent: "#8B6C32",
    depth: "full",
    readMins: 8,
    seoDescription:
      "AI product design case study: REX, a conversational recommendation engine — confidence signalling, ranking rationale, low-confidence, no-result and recovery states, and human-AI interaction patterns.",
  },
  {
    id: "hr-admin",
    href: "/case-study/onliest-hr-admin",
    name: "Onliest HR Admin",
    subtitle: "Enterprise HRMS",
    timeline: "2026",
    context: "Onliest",
    role: "UX Designer",
    summary:
      "Designed role-based Admin, Manager and Employee workflows for attendance, leave, onboarding and approvals — with exception handling, bulk actions, audit trails and accessible table and form patterns.",
    focus: [
      "Role-based interfaces",
      "Exception handling",
      "Bulk actions",
      "Audit trails",
      "Accessible tables & forms",
    ],
    image: null,
    accent: "#3D5A80",
    depth: "summary",
    readMins: 3,
    seoDescription:
      "Enterprise UX project: Onliest HR Admin, an internal HRMS — role-based Admin, Manager and Employee workflows for attendance, leave, onboarding and approvals, with audit trails and accessible data entry.",
  },
  {
    id: "kudra",
    href: "/case-study/kudra",
    name: "Kudra",
    subtitle: "Fleet & Trip Management",
    timeline: "2025–2026",
    context: "ONDL",
    role: "Product Owner & UX Designer",
    summary:
      "Led UX across trip creation, driver and vehicle assignment, fuel tracking and fleet monitoring — field research with drivers, dispatchers and supervisors turned call-and-spreadsheet coordination into one trip-centric system.",
    focus: [
      "Field research",
      "Trip lifecycle",
      "Fleet dashboards",
      "Data-heavy interfaces",
      "Operational decision-making",
    ],
    metrics: [...KUDRA_OUTCOMES],
    image: {
      src: "/figmaAssets/kudra-dashboard.png",
      alt: "Kudra fleet operations dashboard",
      width: 1917,
      height: 1020,
    },
    accent: "#956807",
    depth: "full",
    readMins: 9,
    seoDescription:
      "Enterprise SaaS case study: Kudra, a fleet and trip management platform — field research, trip lifecycle, fleet dashboards and data-heavy interfaces. Trip-creation effort down 20%, manual operational effort down 30%.",
  },
  {
    id: "clappit",
    href: "/case-study/clappit",
    name: "ClappIt",
    subtitle: "Cloud Infrastructure Platform",
    timeline: "2023–2024",
    role: "UX Designer",
    summary:
      "Simplified complex cloud-infrastructure workflows for technical and non-technical users through clearer information architecture, navigation and reusable interface patterns.",
    focus: [
      "Complex technical products",
      "Infrastructure workflows",
      "Information architecture",
      "Reusable UI patterns",
    ],
    image: {
      src: "/figmaAssets/clappit-dashboard.png",
      alt: "ClappIt cluster dashboard with pods health, application performance, severity-coded alerts and network traffic",
      width: 1920,
      height: 1580,
    },
    accent: "#B3202F",
    depth: "summary",
    readMins: 3,
    seoDescription:
      "Enterprise interaction design project: ClappIt, a cloud infrastructure platform — information architecture, navigation and reusable UI patterns that make infrastructure workflows usable for technical and non-technical users.",
  },
  {
    id: "hsl",
    href: "/case-study",
    name: "Hindustan Shipyard Limited",
    subtitle: "Website Redesign",
    timeline: "2024",
    context: "Sweya Infotech",
    role: "UX Researcher & Designer",
    summary:
      "Restructured navigation, content hierarchy and responsive page experiences across five public-sector modules — stakeholder research turned a visual redesign into a status-visibility problem.",
    focus: [
      "Stakeholder research",
      "Enterprise information architecture",
      "Navigation",
      "Responsive design",
      "Government digital experience",
    ],
    image: {
      src: "/figmaAssets/image-16.png",
      alt: "Redesigned Hindustan Shipyard Limited homepage",
      width: 1424,
      height: 711,
    },
    accent: "#0C7E7E",
    depth: "full",
    readMins: 6,
    seoDescription:
      "Government and industrial UX case study: the Hindustan Shipyard Limited website redesign — stakeholder research, enterprise information architecture, navigation and responsive design across five modules.",
  },
];

export function getUxProject(id: UxProject["id"]): UxProject {
  const project = UX_PROJECTS.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown UX project: ${id}`);
  return project;
}

/** "REX — AI Recommendation & Product Intelligence" */
export function uxProjectTitle(project: UxProject): string {
  return `${project.name} — ${project.subtitle}`;
}

/* ------------------------------------------------------------------ *
 * Independent engineering projects
 *
 * Every claim below is taken from the project's own repository (README,
 * PRD, implementation plan, source) or verified against the live site's
 * response headers. Where a repository is public it is linked; where there
 * is no public repository, nothing is linked and no code is shown.
 * ------------------------------------------------------------------ */

export interface CodeExcerpt {
  /** Path inside the linked repository. */
  path: string;
  /** Why this excerpt, in one line. */
  caption: string;
  /** Verbatim from the repository. Never edited for display. */
  code: string;
}

export interface EngineeringChallenge {
  problem: string;
  approach: string;
}

export interface EngineeringProject {
  id: "gitam-marketplace" | "reality-3d" | "hotelfirst" | "portfolio";
  href: string;
  name: string;
  /** "Independent | …" — the résumé classification. */
  category: string;
  url: string;
  urlDisplay: string;
  repo?: string;
  /** The one-paragraph description, from the résumé. */
  description: string;
  /** The product objective — what it is for. */
  objective: string;
  stack: string[];
  /** Card and evidence-page accent. Text-safe on paper (AA at 13px). */
  accent: string;
  image: { src: string; alt: string; width: number; height: number };
  /** The split the evidence pages are organised around. */
  ownership: {
    designed: string[];
    implemented: string[];
    integrated: string[];
    /** Omitted where the role of AI on the project is not documented. */
    aiAssisted?: string[];
  };
  challenges: EngineeringChallenge[];
  /** How it is tested and verified. Omitted where nothing is documented. */
  validation?: string[];
  deployment: string;
  excerpt?: CodeExcerpt;
  /** Honest limits — what is not built yet. */
  limits?: string[];
}

export const ENGINEERING_PROJECTS: EngineeringProject[] = [
  {
    id: "gitam-marketplace",
    href: "/engineering/gitam-marketplace",
    name: "GITAM Marketplace",
    category: "Independent | Product Design & Web Development",
    url: "https://gitam-marketplace.in",
    urlDisplay: "gitam-marketplace.in",
    repo: "https://github.com/kasai22/gitamtrades",
    description:
      "Independently designed, built and deployed a university marketplace using React, Next.js, TypeScript and Tailwind CSS, integrating backend services for product workflows.",
    objective:
      "A student-only, peer-to-peer marketplace where verified GITAM students buy, sell and pass on items on campus. Listing is self-service and publishes immediately; safety is enforced by design rather than by an approval queue; payment always happens in person, never through the site.",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript (strict)",
      "Tailwind CSS v4",
      "shadcn/ui · Radix",
      "Zod · React Hook Form",
      "Supabase — Postgres, Auth, Storage, Realtime",
      "Vitest · PGlite · Playwright",
    ],
    accent: "#0F6B5C",
    image: {
      src: "/engineering/gitam-marketplace.png",
      alt: "GITAM Marketplace home page — join with a university email, list in under three minutes, chat then meet on campus",
      width: 1440,
      height: 900,
    },
    ownership: {
      designed: [
        "Product requirements written up as a PRD, an implementation plan and a requirement-by-requirement traceability matrix.",
        "The core journeys: university-email sign-up, a short publish-first listing form, search and filters, chat-then-meet exchange.",
        "Safety UX — reports with case numbers, blocks, appeals, and safe-exchange guidance on the sell form, the listing and the chat.",
        "Community threads with nested replies, voting, Hot/New/Top sorting and a moderation queue.",
      ],
      implemented: [
        "Feature-module architecture: auth, listings, search, messaging, moderation, admin, account and uploads, each owning its server actions, queries and components.",
        "Shared UI primitives on shadcn/Radix, plus product components — cards, badges, empty, loading and error states.",
        "A listing lifecycle state machine (draft, active, on hold, sold, expired, removed) that drives the seller's available actions.",
        "A deterministic, versioned moderation rules engine in TypeScript.",
        "Zod validation at every boundary.",
      ],
      integrated: [
        "Supabase Auth with the university email domain allowlist enforced in the database, and verification by link or 6-digit code.",
        "Postgres with row-level security on every table and explicit grants; state changes go through database functions.",
        "An image pipeline: upload route handler → file-type sniffing → re-encode to WebP (stripping EXIF/GPS) → thumbnail → QR-code detection; private storage served through short-lived signed URLs.",
        "Realtime messaging, an admin console and audit trail.",
      ],
      aiAssisted: [
        "Implementation was accelerated with AI coding assistants, directed by the PRD, implementation plan and traceability matrix kept in the repository.",
        "Generated code was reviewed, adapted and verified against the unit, database and end-to-end test suites and the production build.",
      ],
    },
    challenges: [
      {
        problem:
          "Listings must go live immediately — no human approval queue — without letting clearly prohibited items through.",
        approach:
          "Deterministic automated checks run on save: clear violations are blocked with a specific reason and a review path; ambiguous signals are hidden pending review.",
      },
      {
        problem:
          "The interface and the database could disagree about which status changes a seller is allowed to make.",
        approach:
          "The database function is the authority. The TypeScript mirror that drives the UI is checked against it in a parity test.",
      },
      {
        problem: "Event-ticket photos can carry barcodes, QR codes and booking codes.",
        approach:
          "Ticket listings with photos publish quarantined until a moderator checks them; text-only ticket listings publish immediately.",
      },
    ],
    validation: [
      "Unit tests for the moderation engine, schemas, state machine, search parameters and image pipeline (Vitest).",
      "Database tests that apply the real migrations in PGlite and verify row-level security, triggers and RPCs — no Docker needed.",
      "Playwright smoke tests and end-to-end MVP journeys.",
    ],
    deployment: "Deployed on Vercel; Supabase for data, auth and storage.",
    excerpt: {
      path: "src/features/listings/status.ts",
      caption:
        "The seller-side lifecycle. The database is the authority; this mirror drives the UI and is parity-tested against it.",
      code: `/**
 * Seller-initiated lifecycle transitions (PRD §8.3). The database function
 * public.listing_transition_allowed() is the authority; this mirror drives the UI and is checked
 * against the database in tests/db/status-parity.test.ts.
 */
export const SELLER_TRANSITIONS: Record<ListingStatus, readonly ListingStatus[]> = {
  draft: ["removed"],
  active: ["on_hold", "sold", "removed"],
  on_hold: ["active", "sold", "removed"],
  sold: ["active", "removed"],
  expired: ["active", "removed"],
  removed: [],
};

export function canTransition(from: ListingStatus, to: ListingStatus): boolean {
  return SELLER_TRANSITIONS[from].includes(to);
}`,
    },
  },
  {
    id: "reality-3d",
    href: "/engineering/reality-3d",
    name: "Reality 3D",
    category: "Independent | 3D Commerce Platform",
    url: "https://reality3d.in",
    urlDisplay: "reality3d.in",
    repo: "https://github.com/kasai22/sada3d-world",
    description:
      "Designed and developed a 3D-printing commerce experience with product discovery and customer-facing manufacturing workflows; implemented front-end features and backend/API integrations.",
    objective:
      "An on-demand manufacturing storefront: browse a catalogue of printable products, or upload your own model, inspect it in 3D and get a manufacturing quote — with what can and cannot be made stated plainly to the customer.",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "three.js (WebGL)",
      "Payload CMS 3",
      "PostgreSQL · Drizzle",
      "Supabase Auth",
      "S3-compatible object storage",
    ],
    accent: "#3D4FA0",
    image: {
      src: "/engineering/reality3d.png",
      alt: "Reality 3D home page — Manufacturing, reimagined: turn digital designs into physical products",
      width: 1440,
      height: 900,
    },
    ownership: {
      designed: [
        "Product discovery: catalogue browse, filter, search and sort, each with empty, loading and error states.",
        "The custom-print workflow: upload, analyse, configure, quote.",
        "A capability model customers can read — available, coming soon, unavailable — so nothing unapprovable can be quoted or ordered.",
        "An operations console for orders, customers, designs, production and issues.",
      ],
      implemented: [
        "One WebGL viewer behind an imperative engine class: React owns mounting, teardown and controls; the engine owns everything on the GPU.",
        "Format loaders for STL, OBJ and glTF/GLB, each imported on demand.",
        "A deterministic exploded view — pure maths, no randomness — so a model separates identically on every load.",
        "A quote engine with request validation and pricing rules, plus cart, checkout, guest order tracking and the account area.",
      ],
      integrated: [
        "Payload CMS as the catalogue and admin back end, on PostgreSQL with Drizzle migrations.",
        "Supabase authentication for customer accounts.",
        "S3-compatible object storage with presigned URLs for uploaded model files.",
        "Route handlers for quotes, models, designs, orders, checkout and health checks.",
      ],
      aiAssisted: [
        "Built in documented phases with AI coding assistance (Claude); each phase was reviewed, tested and committed separately.",
        "A self-run production audit and screen-and-state inventory record what is verified and what is not, rather than assuming generated code works.",
      ],
    },
    challenges: [
      {
        problem: "Customers upload STEP files, which are a boundary representation, not a mesh.",
        approach:
          "The custom-print analysis says so plainly — dimensions and volume cannot be measured from surfaces — while the file can still be quoted and manufactured, instead of failing silently.",
      },
      {
        problem: "An exploded view that rearranges itself between viewings is not a drawing anyone can read.",
        approach:
          "Explosion directions are pure and deterministic — radial from the assembly centre, with fixed fallback axes by scene order for centred parts.",
      },
      {
        problem: "The storefront must never sell a material or process the business has not approved.",
        approach:
          "Capability status comes from a business decision ledger; the quote engine, cart, checkout and order creation all refuse anything not approved.",
      },
    ],
    validation: [
      "Unit and stress tests on Node's built-in test runner — pricing, catalogue, cart and checkout, orders, security, storage, geometry and the viewer's maths.",
      "A written MVP production audit and screen-and-state inventory listing what is implemented, reachable and functional.",
    ],
    deployment: "Deployed on Vercel.",
    excerpt: {
      path: "src/lib/viewer/explode.ts",
      caption:
        "How a component travels in the exploded view — deterministic, so the same model explodes identically every time.",
      code: `export function explodeDirection(
  component: ExplodeComponent,
  assembly: AssemblyBounds,
): Vector3 {
  const radial = new Vector3().subVectors(component.center, assembly.center);
  const threshold = Math.max(assembly.radius * CENTRED_EPSILON, Number.EPSILON);

  if (radial.length() > threshold) return radial.normalize();

  const axis = FALLBACK_AXES[component.index % FALLBACK_AXES.length];
  // The table is non-empty and the index is taken modulo its length.
  return axis ? axis.clone() : new Vector3(0, 1, 0);
}`,
    },
    limits: ["Checkout runs on a mock payment adapter — no live payment provider is integrated yet."],
  },
  {
    id: "hotelfirst",
    href: "/engineering/hotelfirst",
    name: "HotelFirst",
    category: "Independent | Business Website",
    url: "https://hotelfirst.one",
    urlDisplay: "hotelfirst.one",
    description:
      "Designed, developed and deployed a responsive business website, translating service needs into clear information architecture and customer-facing page journeys.",
    objective:
      "A website for a hotel-owner advisory and asset-strategy practice: explain the services clearly, and give a hotel owner an obvious path from reading to getting in touch.",
    // Verified from the live deployment (prerendered Next.js, Tailwind CSS
    // in the CSS bundle, served by Vercel). There is no public repository,
    // so nothing that only the source would show is listed here.
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    accent: "#B4430A",
    image: {
      src: "/figmaAssets/hotelfirst-screenshot.png",
      alt: "HotelFirst advisory website home page",
      width: 1440,
      height: 900,
    },
    ownership: {
      designed: [
        "Information architecture that turns a list of advisory services into page journeys a hotel owner can follow.",
        "Content hierarchy and calls to action for each page.",
      ],
      implemented: [
        "A responsive front end — layouts that hold from phone to desktop.",
        "Statically prerendered pages for fast first load.",
      ],
      integrated: ["Deployment and hosting on Vercel."],
    },
    challenges: [],
    deployment: "Deployed on Vercel as a prerendered Next.js site.",
  },
  {
    id: "portfolio",
    href: "/engineering/portfolio",
    name: "Personal Portfolio",
    category: "Independent | Design & Development",
    url: "https://chsaikomal.site",
    urlDisplay: "chsaikomal.site",
    repo: "https://github.com/kasai22/saikomal_portfolio",
    description:
      "Built and maintain a portfolio showcasing product case studies, design decisions and hands-on web development work.",
    objective:
      "One site that has to work as a design portfolio and as a front-end code sample at the same time — so the way it is built is part of what it shows.",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "GSAP ScrollTrigger",
      "Lenis",
      "Vercel",
    ],
    accent: "#8A5A0A",
    image: {
      src: "/engineering/portfolio.png",
      alt: "This portfolio's home page",
      width: 1440,
      height: 900,
    },
    ownership: {
      designed: [
        "The visual system — an editorial paper-and-ink palette, a display grotesque with a mono annotation layer, and one section rhythm used everywhere.",
        "Long-form case studies with a contents rail, and five scroll-driven figures that explain the practice — how design, engineering and AI combine, how an interface is assembled, an AI product loop, how a problem gets ordered, and the method as one machine.",
      ],
      implemented: [
        "Feature-folder architecture: each case study owns its components and content; shared case-study primitives sit in one place.",
        "Every fact — dates, metrics, contact details, projects — read from two typed content modules, so nothing is duplicated.",
        "Motion that honours the reduced-motion preference everywhere: pinned, scroll-driven figures fall back to a static, fully written-out sequence on phones and under reduced motion — and GSAP is never downloaded there.",
        "A contents rail that builds itself from the headings on the page, so a new section is indexed without being registered.",
      ],
      integrated: ["Static generation for every route, metadata, sitemap and schema.org JSON-LD, deployed on Vercel."],
      aiAssisted: [
        "Claude is used as a coding partner — for audits, refactors and first drafts — with every change reviewed, built and checked in the browser before it ships.",
      ],
    },
    challenges: [
      {
        problem:
          "The same employment dates and metrics appeared in a timeline, cards, metadata and case studies, and drifted out of sync.",
        approach:
          "Moved every fact into one typed source with structured dates and a single formatter; the pages derive their copy from it.",
      },
      {
        problem:
          "The hero headline is the page's largest paint, and a fade-in entrance kept it from counting as painted until hydration finished.",
        approach:
          "The headline reveal is a mask, not a fade: the text is fully opaque from the first frame and rises from behind its own clip box, so the entrance costs nothing in Largest Contentful Paint.",
      },
      {
        problem:
          "The hero's project tiles had to travel into the real case-study cards below without a second copy of either ever being on screen.",
        approach:
          "A sibling layer measures both ends each frame and flies one tile at a time, hiding only the element it is standing in for — and below tablet width, or under reduced motion, nothing flies at all.",
      },
    ],
    deployment: "Deployed on Vercel; every route statically generated.",
    excerpt: {
      path: "constants/profile.ts",
      caption: "Dates are stored structured and formatted in one place, so no page carries its own copy.",
      code: `/** "November 2024 – May 2026", "May 2026 – Present". */
export function formatPeriod(role: Pick<Employment, "start" | "end">, short = false): string {
  const end = role.end ? formatYearMonth(role.end, short) : "Present";
  return \`\${formatYearMonth(role.start, short)} – \${end}\`;
}`,
    },
  },
];

export function getEngineeringProject(id: string): EngineeringProject | undefined {
  return ENGINEERING_PROJECTS.find((p) => p.id === id);
}

/** Counts shown on the home page — derived, so they cannot drift. */
export const PROJECT_COUNTS = {
  ux: UX_PROJECTS.length,
  engineering: ENGINEERING_PROJECTS.length,
} as const;
