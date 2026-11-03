import type {
  CaseStudyProject,
  IntelligenceCapability,
  IntelligenceStage,
  MachineStation,
  MindCluster,
  MindInput,
  MindStage,
  ProcessStep,
  SystemDiscipline,
} from "@/features/home/types";
import { CAREER_YEARS, CONTACT, HOME_METRICS, PROFILE, SOCIAL_LINKS } from "@/constants/profile";
import { PROJECT_COUNTS, UX_PROJECTS, uxProjectTitle } from "@/constants/projects";

/*
 * Copy and running order for the home page only. Every *fact* — dates,
 * metrics, contact details, project metadata — is read from
 * `constants/profile.ts` and `constants/projects.ts` rather than retyped here,
 * so the home page cannot disagree with the case studies, the metadata or
 * the résumé.
 */

/** Hero icon row: code first, career second. */
export const SOCIALS = SOCIAL_LINKS.filter((s) => s.platform !== "x").sort(
  (a, b) => Number(b.platform === "github") - Number(a.platform === "github"),
);

/** Contact slide: every profile, LinkedIn first. */
export const CONTACT_SOCIALS = SOCIAL_LINKS;

export const CONTACT_EMAIL = CONTACT.email;

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export const HERO_EYEBROW = PROFILE.name;
export const HERO_ROLE = PROFILE.title;
export const HERO_HEADLINE_LINE_1 = "Designing intelligent products.";
export const HERO_HEADLINE_LINE_2 = "Engineering experiences that work.";
export const HERO_SUBCOPY = PROFILE.intro;
export const HERO_STACK = PROFILE.stackLine;

/** Proof chips under the hero headline — résumé facts, nothing rounded up. */
export const HERO_PROOF = [
  { value: HOME_METRICS.overall.value, label: "Years · software, data & design" },
  { value: HOME_METRICS.ux.value, label: "Years in UX" },
  {
    value: String(PROJECT_COUNTS.ux + PROJECT_COUNTS.engineering),
    label: "Products designed or built",
  },
];

/** The design-to-ship loop, drawn as a track in the hero. */
export const HERO_LOOP = ["Research", "Design", "Build", "Ship"];

/**
 * The full set of headline numbers, shown once in the snapshot strip after
 * the work: four résumé figures and two counts of what is on this site.
 */
export const SNAPSHOT_METRICS = [
  HOME_METRICS.overall,
  HOME_METRICS.ux,
  HOME_METRICS.trip,
  HOME_METRICS.ops,
  { value: String(PROJECT_COUNTS.ux), label: "UX & product projects" },
  { value: String(PROJECT_COUNTS.engineering), label: "Independent engineering projects" },
];

/* ------------------------------------------------------------------ *
 * The deck. Hero, then six numbered slides — the work, the engineering,
 * the method, the capabilities, the record, the ask. Chapter numbers live
 * here so resequencing is a change in one place.
 * ------------------------------------------------------------------ */
export const DECK = {
  work: { chapter: "01", eyebrow: "Selected UX & product experience" },
  engineering: { chapter: "02", eyebrow: "Independent engineering projects" },
  /**
   * The method. Rendered by the design machine — the five steps drawn as one
   * apparatus — so the method is stated once on the page, not twice.
   */
  approach: { chapter: "03", eyebrow: "My approach" },
  capabilities: { chapter: "04", eyebrow: "Technical capabilities" },
  track: { chapter: "05", eyebrow: "Professional experience" },
  ask: { chapter: "06", eyebrow: "Contact" },
  /**
   * Not numbered slides. The four figures sit inside the running order as
   * diagrams rather than as stops on it — the site sets every index and
   * marker in the mono annotation face, so a `FIG.` mark reads as an
   * insertion rather than as a competing sequence.
   */
  system: { chapter: "FIG. 01", eyebrow: "Product thinking" },
  /** How an interface actually gets put together. */
  build: { chapter: "FIG. 02", eyebrow: "Construction" },
  /** What the product does once intelligence is inside it. */
  intelligence: { chapter: "FIG. 03", eyebrow: "AI product" },
  /** What happens between a brief landing and a product existing. */
  mind: { chapter: "FIG. 04", eyebrow: "Problem solving" },
} as const;

/** Slide-level supporting lines — one sentence each, no more. */
export const SLIDE_INTRO = {
  work: "AI recommendations, enterprise HR, fleet operations, cloud infrastructure and a public-sector website — from research to high-fidelity interfaces.",
  engineering:
    "Products I design, build, and ship — taken from product requirements to a deployed web application.",
  approach:
    "Discover, Define, Design, Build, Validate — the five steps drawn as the apparatus they make up: a problem in one end, a working product out of the other.",
  capabilities: `${CAREER_YEARS.overall} years across software, data and product design, including ${CAREER_YEARS.ux} in UX — and the front-end, data and AI-assisted engineering that turn a design into a working product.`,
  track: "Four roles, one direction of travel — data, to design, to owning the product.",
  ask: "Open to Senior UI/UX Engineer, UX Engineer and Product Designer roles. The form opens your email client with the message ready to send.",
  system:
    "Not three handoffs on the way to a product. One loop, and the experience is what comes out of it.",
  build: "An interface is not drawn, it is assembled. This is the order the pieces go in.",
  intelligence:
    "Intent, context, a decision, an action, an outcome — and the feedback that changes what happens the next time.",
  mind: "Nine inputs, none of them sequenced. Getting them into something buildable is most of the job.",
};

/** Quick-scan facts, also read by the JSON-LD graph and FIG. 01. */
export const RECRUITER_SNAPSHOT = {
  frontEnd: "React, Next.js, TypeScript, Tailwind",
  availability: "Open to new roles",
};

/* ------------------------------------------------------------------ *
 * Selected work — derived from `UX_PROJECTS`, in résumé order.
 * ------------------------------------------------------------------ */

export const CASE_STUDIES: CaseStudyProject[] = UX_PROJECTS.map((project) => ({
  id: project.id,
  title: uxProjectTitle(project),
  name: project.name,
  subtitle: project.subtitle,
  description: project.summary,
  tags: project.focus,
  accentColor: project.accent,
  slug: project.href,
  timeline: project.timeline,
  image: project.image?.src ?? null,
  imageAlt: project.image?.alt ?? "",
  role: project.role,
  context: project.context,
  readMins: project.readMins,
  format: project.depth,
  metrics: project.metrics ? [...project.metrics] : [],
}));

/**
 * The three projects the hero shows as tiles — and the three pieces that fly
 * from the hero into their cards. Only projects with a real screen qualify,
 * so a tile is never a placeholder. A project's position in this list is its
 * slot number at both ends of the flight (`data-hero-piece` / `data-work-slot`).
 */
export const HERO_PIECES = CASE_STUDIES.filter(
  (project): project is CaseStudyProject & { image: string } => project.image !== null,
).slice(0, 3);

/** The assembly slot for a card, or `undefined` if no hero tile flies into it. */
export function heroSlotFor(project: CaseStudyProject): number | undefined {
  const index = HERO_PIECES.findIndex((piece) => piece.id === project.id);
  return index === -1 ? undefined : index;
}

/* ------------------------------------------------------------------ *
 * The product system — the circulating diagram in `FIG. 01`.
 *
 * Every word here is already somewhere else on this site: the disciplines
 * are the three the profile names (UX, engineering, AI-assisted development),
 * the front-end line comes from `RECRUITER_SNAPSHOT`, and the AI vocabulary from the REX case study and
 * the Onliest role — agentic architecture, scoring, and the low-confidence
 * and cold-start states its edge cases are written around. Nothing here
 * claims an outcome. It is a picture of how the work circulates, not of
 * what it achieved.
 * ------------------------------------------------------------------ */

export const PRODUCT_SYSTEM: SystemDiscipline[] = [
  {
    id: "ux",
    label: "UX",
    detail: "Logistics, DevOps, fashion-tech",
    artifacts: ["Research", "User needs", "Flows", "Interaction"],
  },
  {
    id: "engineering",
    label: "Engineering",
    detail: "B.Tech Mechanical, then the front end",
    artifacts: ["Systems", "Constraints", "Code", "Feasibility"],
  },
  {
    id: "ai",
    label: "AI",
    detail: "Claude & AI-assisted workflows",
    artifacts: ["Context", "Intelligence", "Decision", "Confidence"],
  },
];

/** What the three of them produce by running as one loop. */
export const SYSTEM_CORE = {
  label: "Product experience",
  detail: "One system, not three handoffs",
};

/* ------------------------------------------------------------------ *
 * The intelligent product loop — the diagram in `FIG. 03`.
 *
 * These are conceptual stages, not a model architecture and not a claim
 * about a shipped system. The vocabulary is the vocabulary of the REX
 * work in `features/case-study-rex`: a preference-discovery step that
 * asks rather than guesses when confidence is low, a scoring step whose
 * confidence is shown to the user rather than hidden, and a guardrail
 * that validates every claim against real catalogue, inventory, pricing
 * and delivery data before any of it reaches a screen. Those three are
 * the reason the diagram has two branches instead of one straight line.
 *
 * Nothing here is a number, an outcome or a result.
 * ------------------------------------------------------------------ */

export const AI_LOOP: IntelligenceStage[] = [
  {
    id: "intent",
    side: "human",
    label: "User intent",
    note: "What someone is actually trying to get done",
    detail: ["Stated request", "Implied goal", "Constraints"],
  },
  {
    id: "context",
    side: "system",
    label: "Context",
    note: "What the product already knows before it thinks",
    detail: ["User data", "Task context", "System state"],
  },
  {
    id: "reason",
    side: "system",
    label: "AI system",
    note: "Interprets, weighs the options, commits to one",
    detail: ["Reasoning", "Decision", "Generation"],
  },
  {
    id: "action",
    side: "system",
    label: "Action",
    note: "What the product does with the decision",
    detail: ["Interface", "Workflow", "Recommendation"],
  },
  {
    id: "outcome",
    side: "system",
    label: "Outcome",
    note: "A result the user can interrogate, not just accept",
    detail: ["Result", "Confidence", "Undo"],
  },
  {
    id: "feedback",
    side: "human",
    label: "Feedback",
    note: "Accepted, corrected or abandoned — and the system keeps it",
    detail: ["Accepted", "Corrected", "Refined"],
  },
];

/** What the system reaches for on the way to a decision, and gets back. */
export const AI_CAPABILITIES: IntelligenceCapability[] = [
  { id: "data", label: "Data", note: "Records, history, state" },
  { id: "tools", label: "Tools", note: "Retrieval, scoring" },
  { id: "surface", label: "Interface", note: "Where it can act" },
];

/**
 * The two branches off the straight line. Both are UX decisions before they
 * are engineering ones, which is the point of drawing them at all.
 */
export const AI_BRANCH = {
  clarify: { label: "Low confidence", note: "Ask, don't guess" },
  guard: { label: "Guardrail", note: "Validated before it is shown" },
} as const;

export const AI_LOOP_CAPTION =
  "Conceptual stages — a product architecture, not a model one. The two branches are where the design work actually is: ask when confidence is low, and validate before anything reaches a screen.";

/* ------------------------------------------------------------------ *
 * How a problem gets ordered — the diagram in `FIG. 04`.
 *
 * The nine inputs are conceptual: they are the kinds of thing a brief
 * arrives as, not findings from any project. Nothing here is a result.
 *
 * The five stages are not new either. They are the five steps already
 * documented in `PROCESS_STEPS` — Discover, Define, Design, Build,
 * Validate — named for what comes *out* of each rather than for what you
 * do in it, and every `output` string below is that step's own recorded
 * output. Discover's "Interviews · Empathy map" and Define's "Problem
 * statement · IA" are verbatim; step 03's "Flows · Design system" is split
 * across Flow and Design, which is how it is actually worked; and Product
 * carries steps 04 and 05 together. The edge states under Flow are the
 * loading, empty and error states the REX and Onliest work is written
 * around, and Design's components are the design-system work on the résumé.
 * ------------------------------------------------------------------ */

export const PROBLEM_INPUTS: MindInput[] = [
  { id: "user", label: "User", cluster: "evidence" },
  { id: "problem", label: "Problem", cluster: "evidence" },
  { id: "research", label: "Research", cluster: "evidence" },
  { id: "business", label: "Business", cluster: "boundary" },
  { id: "tech", label: "Tech", cluster: "boundary" },
  { id: "constraints", label: "Constraints", cluster: "boundary" },
  { id: "data", label: "Data", cluster: "material" },
  { id: "ai", label: "AI", cluster: "material" },
  { id: "workflow", label: "Workflow", cluster: "material" },
];

/** What the nine sort into. Three groups, three each — and the sorting is
 *  the first real decision anybody makes on a project. */
export const PROBLEM_CLUSTERS: MindCluster[] = [
  { id: "evidence", label: "Evidence", note: "What is actually true" },
  { id: "boundary", label: "Boundary", note: "What is not negotiable" },
  { id: "material", label: "Material", note: "What there is to build with" },
];

export const MIND_STAGES: MindStage[] = [
  { id: "insight", label: "Insight", output: "Interviews · Empathy map" },
  { id: "model", label: "Model", output: "Problem statement · IA" },
  { id: "flow", label: "Flow", output: "Flows · Edge states" },
  { id: "design", label: "Design", output: "Design system · Components" },
  { id: "product", label: "Product", output: "Working prototype · Usability findings" },
];

export const MIND_CAPTION =
  "The nine inputs are conceptual. The five stages are not — they are the five steps of the method this practice actually runs on, named for what comes out of each, and the artefact under every one is that step's own recorded output.";

/* ------------------------------------------------------------------ *
 * The design machine — slide 03, "My approach".
 *
 * This is not a sixth process. It is `PROCESS_STEPS` — the five steps
 * already documented in `PROCESS_STEPS` — drawn as the machine they add up
 * to, one station per step. Every `title`, `description` and `output`
 * below is that step's own, verbatim; only the `part` names are new, and
 * they name apparatus rather than making any claim.
 *
 * The sixth station is the delivery end. It has no step number because it
 * is not a step: it is what the other five produce. The screen shown there
 * is Kudra's live fleet view, the same asset the Kudra case study uses.
 *
 * Nothing here is an outcome or a metric.
 * ------------------------------------------------------------------ */

export const DESIGN_MACHINE: MachineStation[] = [
  {
    id: "input",
    part: "Input",
    step: "01",
    title: "Discover",
    description: "Talk to the people who will actually use it.",
    output: "Interviews · Empathy map",
  },
  {
    id: "filter",
    part: "Filter",
    step: "02",
    title: "Define",
    description: "Scope it — what is in, what is out, what success means.",
    output: "Problem statement · IA",
  },
  {
    id: "form",
    part: "Form",
    step: "03",
    title: "Design",
    description: "Wireframes to hi-fi, on a system rather than one-off screens.",
    output: "Flows · Design system",
  },
  {
    id: "construct",
    part: "Construct",
    step: "04",
    title: "Build",
    description: "Wire the real thing up in React, not a static file.",
    output: "Working prototype",
  },
  {
    id: "test",
    part: "Test",
    step: "05",
    title: "Validate",
    description: "Real usage decides what gets fixed next.",
    output: "Usability findings",
  },
  {
    id: "output",
    part: "Output",
    step: "",
    title: "Product",
    description: "In front of the people it was built for, doing the job.",
    output: "Kudra · fleet operations",
  },
];

/** The real screen that resolves in the output frame. */
export const MACHINE_PRODUCT = {
  src: "/kudra/fleet-management.png",
  alt: "Kudra fleet management screen — the live vehicle view from the case study",
};

export const MACHINE_CAPTION =
  "The machine is the five steps of the method — Discover, Define, Design, Build, Validate — drawn as apparatus. Every description and artefact is that step's own; the screen at the delivery end is Kudra's fleet view from the case study.";

/**
 * The five steps of the method — the canonical record. `MIND_STAGES` and
 * `DESIGN_MACHINE` are both derived from these entries, and FIG. 04's nodes
 * read them directly.
 */
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
