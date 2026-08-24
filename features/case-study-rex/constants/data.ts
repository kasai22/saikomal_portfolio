import type {
  MetaItem,
  TeamToolItem,
  ProblemPoint,
  SolutionPillar,
  KeyFeature,
  HighFidelityScreen,
  OutcomeMetric,
  AgentRole,
} from "@/features/case-study-rex/types";

export const HERO_TAGLINE =
  "Designing REX — a luxury AI stylist and product-design engine for Onliest that turns vague fashion instincts into personalized, purchase-ready saree & blouse recommendations.";

export const HERO_META: MetaItem[] = [
  { label: "Role", value: "Product Designer" },
  { label: "Platform", value: "Web App" },
  { label: "Focus", value: "Saree & Blouse" },
  { label: "Year", value: "2026" },
];

export const HERO_TAGS = [
  "Conversational AI",
  "Agentic Architecture",
  "Personalization",
  "Fashion Tech",
  "Design System",
  "Voice & Avatar UX",
  "RAG / GenAI",
  "BRD → Product",
];

export const TEAM_TOOLS: TeamToolItem[] = [
  { label: "Tools", value: "Figma · Notion · Claude AI · Jira" },
  {
    label: "Collaborators",
    value: "Product Owner (me) · CTO · AI/ML Lead · GenAI/RAG Lead · Fashion Curator · Security Lead",
  },
  {
    label: "Deliverables",
    value: "Business Requirements Document · Conversational & Wizard UX · Design System · Admin Governance Model",
  },
];

export const OVERVIEW_INTRO =
  "Onliest REX is the AI recommendation, personalization, and product-design engine for Onliest.ai — a luxury fashion platform. Rather than behaving like a generic e-commerce recommender, REX is built to act as a personal AI stylist: understanding a customer's body, occasion, taste, and budget well enough to design a saree or blouse with them, not just for them.";

export const OVERVIEW_POINTS = [
  {
    label: "My Role",
    value:
      "Owned the Business Requirements Document end to end and translated it into the conversational, wizard and try-on experiences shown here.",
  },
  {
    label: "The Challenge",
    value:
      "Turn a multi-agent AI system into something that feels like working with a stylist, not filling out a form.",
  },
  {
    label: "The Approach",
    value:
      "A low-friction conversation paired with a structured wizard, backed by a scored engine a customer can trust and an Admin team can control.",
  },
];

export const PROBLEM_INTRO =
  "Premium fashion customers often need guidance beyond simple filtering. They may not know what design suits their body, skin tone, occasion, or budget — and existing platforms respond with endless catalogs instead of understanding. Onliest needed an AI system that could ask the right questions, reason over trust-sensitive data, and still feel like luxury, not automation.";

export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    title: "Decision Paralysis",
    desc:
      "Browsing thousands of sarees with no reliable way to know what suits your body, skin tone, occasion or cultural context. Customers default to endless scrolling.",
  },
  {
    title: "One-Size-Fits-All Recommenders",
    desc:
      "Generic e-commerce logic treats a saree, a blouse and jewellery the same way, ignoring that fit, drape and occasion rules differ per product line.",
  },
  {
    title: "Inspiration Without Translation",
    desc:
      "Customers save Pinterest boards and wedding photos, but have no way to turn “I like this” into a manufacturable design without a human stylist.",
  },
  {
    title: "Trust & Hallucination Risk",
    desc:
      "An AI stylist that invents availability, price or delivery destroys trust instantly — and bridal timing is non-negotiable.",
  },
];

export const SOLUTION_INTRO =
  "REX addresses this with a tiered, agentic architecture: a conversational and guided-wizard front end backed by independent per-product-line scoring, tiered LLM routing, and hallucination guardrails — all configurable from a single Admin layer instead of buried in code.";

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    icon: "💬",
    title: "Conversational + Guided Wizard",
    desc:
      "Free chat, voice or an uploaded image, or a structured 14-step wizard — two entry points into the same engine.",
  },
  {
    icon: "🧩",
    title: "Product-Line Independent Scoring",
    desc:
      "Each category carries its own weights, fit rules and penalties, so a blouse's neckline scoring never distorts a saree's drape.",
  },
  {
    icon: "🕸️",
    title: "Hierarchical Agent Orchestration",
    desc:
      "An orchestrator routes work to specialist agents through MCP-style tools. No agent reaches the customer directly.",
  },
  {
    icon: "🎚️",
    title: "Tiered, Cost-Aware LLM Routing",
    desc:
      "Guests get rule-based results, unpaid users route to Llama, paid members to OpenAI — configurable by Admin, not hardcoded.",
  },
  {
    icon: "🛡️",
    title: "Hallucination Guardrails",
    desc:
      "Every product, price, inventory and delivery claim is validated against the catalogue before display.",
  },
];

export const KEY_FEATURES: KeyFeature[] = [
  {
    title: "Interactive Stylist Chat",
    tag: "Conversational Mode",
    desc: "A live conversation with REX — via text or voice — where customers describe an occasion ('a saree for a birthday party in Miami around 8pm') and REX responds with a curated design plus a live Match Score.",
  },
  {
    title: "Guided Design Wizard",
    tag: "Structured Mode",
    desc: "A 14-step guided flow (fabric → border → pallu → blouse → fasteners) for customers who'd rather build their look step-by-step, with progress tracked and a live preview updating alongside every choice.",
  },
  {
    title: "Upload Your Inspiration",
    tag: "Image Understanding",
    desc: "Customers upload up to five inspiration images — Pinterest boards, wedding photos, celebrity looks — and REX extracts color, motif, fabric, and embroidery signals to recommend a similar, Onliest-suitable (not copied) design.",
  },
  {
    title: "Live Virtual Try-On",
    tag: "Fit Confidence",
    desc: "Recommendations render on a mannequin scaled to the customer's real proportions, with the Match Score panel breaking down Confidence, Color Harmony, Occasion Match, and Preference Match in one glance.",
  },
  {
    title: "Explore Curated Collections",
    tag: "Discovery Mode",
    desc: "For customers who want to browse rather than converse, curated designer collections are ranked by REX against the same fit, palette, and occasion profile — with full filtering by material, occasion, price, and color.",
  },
  {
    title: "Design Studio Handoff",
    tag: "Refinement",
    desc: "Any design — from chat, Wizard, or Explore — can be sent to Design Studio, where borders, drape, palette, and motifs remain fully editable until it's no longer REX's suggestion, but the customer's own design.",
  },
];

export const HIGH_FIDELITY_CAPTION =
  "Five core surfaces of the REX experience — from open conversation to structured design to discovery.";

export const HIGH_FIDELITY_SCREENS: HighFidelityScreen[] = [
  {
    screen: "Interactive Stylist Chat",
    image: "/rex/screen-1.svg",
    tag: "Conversational Mode",
    decision:
      "Voice input, live transcript, and a stylist avatar sit alongside the generated design and a real-time Match Score — so the conversation and the recommendation are never more than a glance apart.",
  },
  {
    screen: "Guided Design Wizard",
    image: "/rex/screen-2.svg",
    tag: "Structured Mode · Step 14 of 14",
    decision:
      "A persistent step tracker and progress bar give customers who prefer control a transparent, undo-able path — while the same Match Score panel keeps both modes consistent.",
  },
  {
    screen: "Upload Your Inspiration",
    image: "/rex/screen-3.svg",
    tag: "Image Understanding",
    decision:
      "Drag-and-drop upload with format guidance (JPG/PNG/SVG/TIFF, 25MB max) sits next to REX's own conversational suggestion — reinforcing that upload is one of several ways in, not the only one.",
  },
  {
    screen: "Explore Curated Collections",
    image: "/rex/screen-4.svg",
    tag: "Discovery Mode",
    decision:
      "Filterable, ranked collections give browsing customers the same scored personalization as the chat and Wizard flows, closing the loop between passive discovery and active design.",
  },
  {
    screen: "REX Landing & Onboarding",
    image: "/rex/screen-5.svg",
    tag: "Entry Point",
    decision:
      "Four clear entry paths — Design Saree, Design Blouse, Just Exploring, Upload Inspiration — replace a single generic search bar, reducing the 'blank page' problem of a first-time AI stylist session.",
  },
];

export const AGENT_ROLES: AgentRole[] = [
  { agent: "Orchestrator Agent", role: "Controls the overall flow and merges specialist agent outputs before anything reaches the customer." },
  { agent: "Preference Discovery Agent", role: "Asks only the minimal, adaptive questions needed when data is missing or confidence is low." },
  { agent: "Image Understanding Agent", role: "Extracts color, motif, fabric, and embroidery signals from uploaded inspiration images." },
  { agent: "Scoring Agent", role: "Calculates the Match Score, penalties, and confidence shown in the Live Virtual Try-On panel." },
  { agent: "Hallucination Guardrail Agent", role: "Validates every claim against catalog, inventory, pricing, and delivery data before display." },
  { agent: "Design Generation Agent", role: "Produces the design candidates that populate directly into Design Studio for refinement." },
];

export const OUTCOME_METRICS: OutcomeMetric[] = [
  { metric: "5 → 25", label: "Recommendation batch scaling", desc: "Initial batch of 5 designs, 4 more per 'More' click, scaling up to an Admin-configurable maximum by loyalty tier." },
  { metric: "8", label: "Scoring parameters per design", desc: "Overall Match, Confidence, Color Harmony, Occasion Match, and Preference Match are all surfaced individually, not collapsed into one opaque number." },
  { metric: "2", label: "Tiered LLM routing paths", desc: "Llama for unpaid registered users, OpenAI for paid and Platinum members — with a future Onliest-owned domain-specific LLM planned for Phase 2." },
  { metric: "10", label: "Languages in initial scope", desc: "English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Gujarati, Bengali, and Odiya — configurable through Admin as REX expands." },
  { metric: "0", label: "Hardcoded recommendation rules", desc: "Every weight, penalty, threshold, and prompt lives in the Admin configuration layer — not the codebase — to keep the business in control of its own AI." },
  { metric: "CEO-only", label: "Algorithm access boundary", desc: "Proprietary scoring formulas and weights are visible only to the CEO or a CEO-delegated Product Controller, enforced through field-level encryption and RBAC." },
];

export const REFLECTION_POINTS = [
  "Designing for trust mattered more than designing for cleverness — customers forgive a clarifying question far more readily than a confidently wrong recommendation.",
  "Giving every recommendation a visible, broken-down Match Score turned an opaque AI decision into something a customer (and the business) could actually reason about.",
  "Two entry points — free conversation and a structured Wizard — served very different customer mindsets without forking the underlying recommendation logic.",
  "Writing the BRD alongside the UX meant every screen was traceable back to a business rule, which made trade-offs (like tiered LLM routing) a design decision, not just an engineering one.",
];
