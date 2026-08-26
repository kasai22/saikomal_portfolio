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

/**
 * One of the three disciplines that combine into product thinking. Content
 * restored verbatim from the `EngineeringUxTriad` component that previously
 * carried it inline.
 */
export interface TriadConcept {
  label: string;
  /** Where this came from, in one line. */
  detail: string;
  /** What it contributes. Surfaced on hover. */
  points: string[];
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

/** One offer in "Ways I can help" — a service, not a skill. */
export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

/**
 * One discipline in the product system — a practice, and the four things it
 * puts into circulation.
 *
 * Deliberately separate from `TriadConcept`, which the smaller About-section
 * triad still uses: that component's layout is written around exactly three
 * entries with prose detail, and this one is four-by-three single words that
 * have to survive being animated around a ring.
 */
export interface SystemDiscipline {
  id: "ux" | "engineering" | "ai";
  label: string;
  /** Where this comes from, in one line. Shown under the label. */
  detail: string;
  /** Exactly four. The ring geometry allots each discipline a fixed sector. */
  artifacts: string[];
}

/**
 * One stage of the intelligent product loop in `FIG. 03`.
 *
 * `side` is the distinction the diagram is drawn around: two of these six
 * belong to the person using the product and four belong to the system, and
 * they are drawn differently for that reason rather than for variety.
 */
export interface IntelligenceStage {
  id: "intent" | "context" | "reason" | "action" | "outcome" | "feedback";
  label: string;
  /** What this stage is, in product terms. Surfaced on emphasis. */
  note: string;
  /** Exactly three. The emphasis panel is laid out around three. */
  detail: [string, string, string];
  /** Whose side of the loop this is. Drives how the node is drawn. */
  side: "human" | "system";
}

/** One thing the system can reach for on its way to a decision. */
export interface IntelligenceCapability {
  id: "data" | "tools" | "surface";
  label: string;
  /** Two or three words. It sits inside a 146px box. */
  note: string;
}

/**
 * One of the nine raw inputs a product problem arrives as, in `FIG. 04`, and
 * the group it belongs in once it has been sorted.
 */
export interface MindInput {
  id:
    | "user"
    | "problem"
    | "research"
    | "business"
    | "tech"
    | "constraints"
    | "data"
    | "ai"
    | "workflow";
  label: string;
  cluster: "evidence" | "boundary" | "material";
}

/** One of the three groups the nine inputs sort into. */
export interface MindCluster {
  id: "evidence" | "boundary" | "material";
  label: string;
  /** What the group is, in four or five words. It sits under a bracket. */
  note: string;
}

/**
 * One stage of the structure the sorted inputs turn into.
 *
 * `output` is not a claim and not new copy — every one is the documented
 * output of the corresponding step in `PROCESS_STEPS`. See `MIND_STAGES`.
 */
export interface MindStage {
  id: "insight" | "model" | "flow" | "design" | "product";
  label: string;
  output: string;
}

/**
 * One station of the design machine in `FIG. 05` — a part of the apparatus,
 * and the step of the documented method it corresponds to.
 *
 * `title`, `description` and `output` are not new copy. Five of the six are
 * lifted from the matching entry in `PROCESS_STEPS`; see `DESIGN_MACHINE`.
 */
export interface MachineStation {
  id: "input" | "filter" | "form" | "construct" | "test" | "output";
  /** What this piece of apparatus does. The machine word. */
  part: string;
  /** Its number in the method, or empty for the delivery end. */
  step: string;
  title: string;
  description: string;
  output: string;
}
