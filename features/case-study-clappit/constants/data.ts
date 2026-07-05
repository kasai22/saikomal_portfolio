import type {
  AudienceSegment,
  ColorToken,
  ComparisonRow,
  ComponentStat,
  CompetitiveOpportunity,
  DesignGoal,
  DesignToken,
  EnterpriseLearning,
  FrameworkStep,
  HighFidelityScreen,
  MetaItem,
  OutcomeMetric,
  ProblemPoint,
  ProcessStep,
  ResearchInsight,
  ResearchPersona,
  StageDetail,
  Testimonial,
  TeamToolItem,
  TimelineStage,
  TypeSample,
  UserFlowRedesign,
  VisualDecision,
} from "@/features/case-study-clappit/types";

export const HERO_TAGLINE =
  "Designing an enterprise cloud infrastructure platform that simplifies deployment visibility and operational workflows for modern DevOps teams.";

export const HERO_META: MetaItem[] = [
  { label: "Timeline", value: "8 Months" },
  { label: "Role", value: "UX Designer" },
  { label: "Platform", value: "Web App" },
  { label: "Year", value: "2024" },
];

export const HERO_TAGS = [
  "UX Research",
  "Product Strategy",
  "Wireframing",
  "UI Design",
  "Design System",
  "DevOps",
  "Dashboard UX",
  "Dark Mode",
];

export const TEAM_TOOLS: TeamToolItem[] = [
  { label: "Tools", value: "Figma · Miro · FigJam · Notion" },
  {
    label: "Team",
    value: "UX Designer (me) · 2 DevOps Engineers · Product Lead · 3 Frontend Engineers · Founders",
  },
  {
    label: "Deliverables",
    value: "UX Research · Wireframes · Hi-Fi UI · Design System · Prototypes · Developer Handoff",
  },
];

export const PROBLEM_INTRO =
  "Dense, unstructured dashboards dumped raw data without hierarchy. Critical alerts competed with secondary metrics for equal visual weight. New team members faced a brutal onboarding cliff. Stakeholders with less technical depth were completely lost — yet they had to use the same production dashboards engineers relied on daily.";

export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    title: "Cognitive Overload",
    desc: "Critical alerts, deployment statuses, pod health, and network metrics competed for attention equally. Engineers had to manually sort what mattered from what didn't — every single session.",
  },
  {
    title: "Fragmented Cloud Views",
    desc: "Multi-cloud environments (AWS, GCP, Azure) were managed through separate, disconnected screens. Switching clusters meant losing workflow context entirely, forcing engineers to restart their mental model.",
  },
  {
    title: "Opaque Deployment Tracking",
    desc: "Deployment states were labeled with technical codes only senior engineers understood. Rollbacks required 3–4 navigation steps with no visual confirmation of success or failure state.",
  },
  {
    title: "Inconsistent Navigation",
    desc: "The sidebar mixed infrastructure primitives with operational actions in a flat, unlabeled list. Users couldn't predict where to find things — leading to repeated trial-and-error navigation.",
  },
  {
    title: "Onboarding Cliff",
    desc: "New users encountered a fully-loaded production dashboard with no guidance, no empty states, and no contextual help. High drop-off within the first session was the result.",
  },
  {
    title: "No Visual Hierarchy",
    desc: "Typography, spacing, and color were applied inconsistently. Critical status indicators used the same visual weight as secondary metadata — destroying scanability at a glance.",
  },
];

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    icon: "⚙️",
    role: "DevOps Engineers",
    freq: "Daily",
    goal: "Fast operational decision-making with minimal cognitive friction",
    frustration: "Alert fatigue, opaque deployment states, context-loss when switching clusters",
    needs: ["One-click rollback", "Cluster-level resource overview", "Alert severity routing"],
    behavior: "Power users who prefer data density but are blocked by poor visual hierarchy",
  },
  {
    icon: "☁️",
    role: "Cloud Infrastructure Teams",
    freq: "Daily",
    goal: "Unified visibility across multi-cloud environments",
    frustration: "Switching between AWS, GCP, Azure UIs to get a unified picture is exhausting",
    needs: ["Single pane of glass", "Cross-cloud resource comparison", "Cost attribution per environment"],
    behavior: "Heavy keyboard users; need fast drill-down from cluster to pod level",
  },
  {
    icon: "📊",
    role: "Engineering Managers",
    freq: "Weekly",
    goal: "High-level health summaries without needing technical depth",
    frustration: "No stakeholder-friendly view — forced to use production dashboards or ask engineers",
    needs: ["Deployment success rates", "Team-level activity summaries", "Cost visibility"],
    behavior: "Non-technical; interpret visual signals only — never raw data tables",
  },
  {
    icon: "🛡️",
    role: "Platform Administrators",
    freq: "Weekly",
    goal: "Access management and governance with full audit visibility",
    frustration: "No audit trail, no activity history, no way to track who changed what",
    needs: ["Role-based access control", "Audit trails", "Environment isolation controls"],
    behavior: "Compliance-focused; document every action — needs receipts for every change",
  },
  {
    icon: "🏢",
    role: "Enterprise Operations Teams",
    freq: "As needed",
    goal: "Business continuity, SLA adherence, and incident reporting",
    frustration: "No incident timeline or business-impact translation layer in existing UIs",
    needs: ["Incident dashboards", "SLA tracking", "Exportable reports"],
    behavior: "Occasional but high-stakes users; operate under pressure during incidents",
  },
];

export const TIMELINE_STAGES: TimelineStage[] = [
  { num: "01", stage: "Research", detail: "User interviews · Contextual sessions · Competitive audit" },
  { num: "02", stage: "Discovery", detail: "Synthesis · Journey maps · Insight clustering" },
  { num: "03", stage: "Wireframing", detail: "Lo-fi screens · Layout logic · 40+ wireframes" },
  { num: "04", stage: "UX Flows", detail: "6 core flows · IA restructuring · Navigation redesign" },
  { num: "05", stage: "UI Design", detail: "Visual language · Dark mode · Component design" },
  { num: "06", stage: "Prototyping", detail: "Interactive flows · Interaction states · Figma prototypes" },
  { num: "07", stage: "Testing", detail: "3 rounds · 16 participants · Task completion scoring" },
  { num: "08", stage: "Iteration", detail: "Edge states · Error handling · Handoff documentation" },
];

export const STAGE_DETAILS: StageDetail[] = [
  {
    stage: "Research & Discovery",
    icon: "🔍",
    activities: [
      "16 structured user interviews",
      "8 contextual observation sessions",
      "Competitive analysis across 5 platforms",
      "Stakeholder alignment workshops",
    ],
    output: "Synthesized research report · Empathy maps · 4 validated personas",
    decision:
      "Identified alert fatigue and rollback anxiety as the two highest-friction pain points — both became north-star problems for the entire design phase.",
  },
  {
    stage: "Wireframing & UX Flows",
    icon: "✏️",
    activities: [
      "FigJam workflow mapping with engineering team",
      "40+ lo-fi wireframes across all 8 modules",
      "3 rounds of user validation",
      "Navigation restructuring into semantic zones",
    ],
    output: "Complete wireframe library · 6 validated user flows · Navigation architecture",
    decision:
      "During round 2 validation, discovered engineers ignored the left sidebar entirely — cluster switching moved to persistent top-nav, dramatically improving confidence scores.",
  },
  {
    stage: "UI Design & Prototyping",
    icon: "🎨",
    activities: [
      "Visual language definition",
      "120+ component design system",
      "Full dark/light mode implementation",
      "Interactive Figma prototype for every core flow",
    ],
    output: "Hi-fi screen library · Interactive prototypes · Design token documentation",
    decision:
      "Chose light mode as the primary dashboard aesthetic — creating a more accessible, professional SaaS feel that differentiated ClappIt from all competitor dark-only UIs.",
  },
  {
    stage: "Testing & Iteration",
    icon: "🧪",
    activities: [
      "3 rounds of moderated usability testing",
      "Unmoderated task-completion sessions",
      "Edge state and error flow validation",
      "Developer handoff with annotation layers",
    ],
    output: "Usability test reports · Annotated spec files · Iteration log · Handoff documentation",
    decision:
      "Post-test iteration round focused entirely on empty states and error handling — areas consistently skipped in enterprise UX that cause the most real-world drop-off.",
  },
];

export const DESIGN_GOALS: DesignGoal[] = [
  { n: "01", goal: "Reduce Cognitive Overload", desc: "Surface only what's critical. Organise everything else by depth — not by dumping it all on screen." },
  { n: "02", goal: "Improve Deployment Visibility", desc: "Make deployment state readable in under 3 seconds — for both engineers and non-technical stakeholders." },
  { n: "03", goal: "Simplify Navigation", desc: "Restructure the sidebar into semantic zones so users can orient themselves without reading every item." },
  { n: "04", goal: "Increase Workflow Efficiency", desc: "The most frequent actions must be no more than one click away from their context in any module." },
  { n: "05", goal: "Improve Onboarding", desc: "First-session success for new users through contextual guidance, empty states, and progressive disclosure." },
  { n: "06", goal: "Scalable Enterprise UX", desc: "Design for 10 clusters, 100 services, and 1,000 alerts from day one — not retrofitted after the fact." },
  { n: "07", goal: "Enhance Operational Transparency", desc: "Every action must produce a visible, confirmable state change. No silent operations. No ambiguous codes." },
];

export const COMPARISON_COLUMNS = ["GitLab CI/CD", "K8s Dashboard", "Datadog", "Harness", "AWS Console", "ClappIt"];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { dim: "Dashboard clarity", vals: ["⚠️ Moderate", "❌ Raw data", "✅ Good", "⚠️ Moderate", "❌ Fragmented", "✅ Status-first"] },
  { dim: "Non-technical users", vals: ["❌ None", "❌ None", "⚠️ Partial", "⚠️ Partial", "❌ None", "✅ Role views"] },
  { dim: "Alert prioritization", vals: ["⚠️ Basic", "❌ All equal", "✅ Severity", "⚠️ Tags only", "❌ None", "✅ Smart groups"] },
  { dim: "Rollback confidence", vals: ["⚠️ Basic", "❌ Code only", "✅ Yes", "⚠️ Partial", "❌ No", "✅ Visual flow"] },
  { dim: "Multi-cloud unification", vals: ["❌ Single", "❌ Single", "✅ Yes", "✅ Yes", "❌ AWS only", "✅ Unified"] },
  { dim: "Onboarding guidance", vals: ["⚠️ Docs only", "❌ None", "⚠️ Partial", "⚠️ Docs only", "❌ None", "✅ Contextual"] },
  { dim: "Learning curve", vals: ["🔴 High", "🔴 High", "🟡 Medium", "🟡 Medium", "🔴 High", "🟢 Low"] },
  { dim: "Design system consistency", vals: ["✅ Good", "❌ None", "✅ Good", "⚠️ Moderate", "⚠️ Partial", "✅ Systematic"] },
];

export const COMPETITIVE_OPPORTUNITIES: CompetitiveOpportunity[] = [
  {
    opp: "Alert UX Gap",
    insight:
      "Every competitor treats all alerts equally. Severity-first grouping was an untapped differentiator — and the single highest-impact usability improvement we could make.",
  },
  {
    opp: "Stakeholder View Gap",
    insight:
      "Zero competitors had a view designed for non-technical stakeholders. Engineering managers and founders were being forced into production dashboards.",
  },
  {
    opp: "Rollback Confidence Gap",
    insight:
      "No platform provided visual rollback confirmation — leaving engineers anxious about production state changes. This was our biggest enterprise trust opportunity.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "Research Synthesis",
    detail:
      "After 16 interviews, I clustered insights across four dimensions: operational frequency, decision-making speed, information trust, and collaboration touchpoints. The synthesis revealed that the UX problem wasn't 'too many features' — it was 'all features at equal priority all the time'.",
  },
  {
    step: "Journey Mapping",
    detail:
      "I mapped end-to-end journeys for four core workflows: deployment, rollback, incident response, and onboarding. Each map revealed not just friction points but emotional states — high anxiety at rollback, frustration at alert triage, confusion at first login.",
  },
  {
    step: "IA Restructuring",
    detail:
      "The original flat sidebar was the root architectural flaw. I restructured navigation into three semantic zones: Infrastructure (Clouds, Clusters, Apps), Operations (Projects, Pipelines, Alerts), and Administration (Teams, Settings). Each zone is scannable independently.",
  },
  {
    step: "Systems Design Approach",
    detail:
      "Every design decision was evaluated against the full system — not just the screen being designed. A navigation change affected 8 modules. A color token change affected 120 components. I designed at the system level, not the screen level.",
  },
];

export const FRAMEWORK_STEPS: FrameworkStep[] = [
  { label: "Observe", desc: "Contextual sessions watching engineers use the real product in real workflows" },
  { label: "Synthesise", desc: "Pattern identification across 16 interviews using affinity clustering" },
  { label: "Frame", desc: "Problem reframing: from 'too complex' to 'wrong priority hierarchy'" },
  { label: "Ideate", desc: "Progressive disclosure exploration — 3 competing IA models tested" },
  { label: "Prototype", desc: "Low-fidelity first, validated before a single hi-fi pixel was placed" },
  { label: "Test", desc: "3 moderated rounds with DevOps engineers and engineering managers" },
];

export const KEY_STRATEGIC_INSIGHT =
  'The biggest UX breakthrough wasn\'t adding a feature — it was establishing a visual priority contract with the user. The dashboard now communicates: "This is critical. This is important. This is informational." That contract, applied systematically through color, size, and position, reduced triage time more than any single feature could.';

export const VISUAL_DECISIONS: VisualDecision[] = [
  {
    title: "Light-Mode Primary Aesthetic",
    desc: "Contrary to every competitor, ClappIt's primary dashboard uses light mode — creating a more accessible, professional SaaS feel for mixed technical/non-technical teams. Dark mode was implemented as a complete parallel system, not an afterthought.",
  },
  {
    title: "Semantic Color System",
    desc: "Critical = Red (#E8273A). High = Orange. Medium = Amber. Low = Green. Every status indicator across all 8 modules uses the same semantic mapping — eliminating the need to read labels to understand severity.",
  },
  {
    title: "Card-Based Layout Architecture",
    desc: "Each dashboard panel is a self-contained card with its own header, filter controls, refresh state, and data view. Cards scan independently — no panel requires reading the panel next to it to understand its content.",
  },
  {
    title: "Typography as Visual Hierarchy",
    desc: "Three type sizes, two weights. Large/Bold for primary metrics. Medium/Regular for secondary data. Small/Regular for metadata and timestamps. Applied consistently across 120+ components without a single exception.",
  },
];

export const RESEARCH_PERSONAS: ResearchPersona[] = [
  {
    persona: "Alex — Senior DevOps Engineer",
    icon: "⚙️",
    bio: "10 years experience. Manages 4 Kubernetes clusters across 3 cloud providers. Daily active user, primarily through the Dashboard and Clusters modules.",
    goals: ["Monitor cluster health at a glance", "Deploy with confidence", "Rollback without anxiety"],
    frustrations: [
      "Alert noise prevents identifying critical issues",
      "Rollback UX is opaque and anxiety-inducing",
      "Context lost when switching clusters",
    ],
    motivation: "Wants to be a force multiplier — not slowed down by tooling that was meant to help",
    behavior: "Opens dashboard first thing every morning. Checks pod health before email. Relies on pattern recognition, not deep reading.",
  },
  {
    persona: "Priya — Platform Administrator",
    icon: "🛡️",
    bio: "6 years experience. Manages access control, environment isolation, and governance across 3 customer environments.",
    goals: ["Audit every platform action", "Control access with precision", "Prevent environment contamination"],
    frustrations: [
      "No audit trail means no accountability",
      "RBAC is confusing and undocumented",
      "Can't tell who changed what and when",
    ],
    motivation: "Compliance-driven — needs receipts for every action to satisfy security reviews",
    behavior: "Uses the platform weekly but with extremely high stakes. Every session is either a risk assessment or an access change.",
  },
  {
    persona: "Marcus — Engineering Manager",
    icon: "📊",
    bio: "Non-technical. Uses the platform weekly for deployment health checks and stakeholder reporting. Reports to the CTO.",
    goals: [
      "Understand system health without engineering depth",
      "Report deployment status to stakeholders",
      "Track team activity over time",
    ],
    frustrations: [
      "Forces him to ask engineers for status updates constantly",
      "Production dashboard is incomprehensible for his use case",
      "No executive summary view exists",
    ],
    motivation: "Wants to be self-sufficient — to answer 'what's happening' without needing an engineer in the room",
    behavior: "Visual reader only. Interprets color and size, not data tables. Needs a 10-second summary, not a deep-dive dashboard.",
  },
];

export const RESEARCH_INSIGHTS: ResearchInsight[] = [
  {
    insight: "Alert fatigue is universal",
    detail: "100% of interviewees reported spending significant daily time filtering irrelevant alerts. No one trusted the alerting system — they'd learned to ignore it.",
  },
  {
    insight: "Rollback is the most-feared action",
    detail: "Engineers described rollbacks as anxiety-inducing because the UI provided no visual confirmation of state changes — just an ambiguous status code.",
  },
  {
    insight: "Dashboard before sidebar",
    detail: "70% of users arrived at the dashboard and immediately scanned for information — very few used the sidebar as a primary navigation tool.",
  },
  {
    insight: "Non-technical users are real users",
    detail: "Engineering managers and founders needed read-only visibility but had no designed view — they were navigating production dashboards meant for engineers.",
  },
];

export const USER_FLOW_REDESIGNS: UserFlowRedesign[] = [
  {
    flow: "Deployment Management",
    icon: "🚀",
    before: ["Navigate to Projects", "Select Environment", "Find Service", "Scroll to Deploy", "Submit (no confirmation)", "Parse status code manually"],
    after: ["Open Deployments module", "Select service inline", "One-click deploy with preview", "Visual confirmation of state"],
    improvement: "6 steps → 4 steps. Visual confirmation replaced ambiguous status codes.",
  },
  {
    flow: "Infrastructure Monitoring",
    icon: "📡",
    before: ["Open Dashboard", "Filter by cluster (buried in sidebar)", "Scroll through all panels", "Manually correlate pod health + alerts + network"],
    after: ["Open Dashboard", "Cluster selector in persistent top nav", "Integrated pod health + alerts + network in single scan"],
    improvement: "Cluster context persistent across all views. Dashboard panels co-located for cross-correlation.",
  },
  {
    flow: "Incident Response",
    icon: "🚨",
    before: [
      "Receive alert notification (email)",
      "Log into platform",
      "Navigate to Alerts (buried)",
      "Identify critical alert from unordered list",
      "Trace service impacted",
      "Take action (rollback/restart)",
    ],
    after: [
      "Alert notification with direct deep-link",
      "Land on severity-grouped Alert panel",
      "Critical alerts at top — immediate identification",
      "One-click to affected service + action",
    ],
    improvement: "Alert triage time reduced by ~60%. Severity grouping eliminated manual sorting.",
  },
  {
    flow: "CI/CD Pipeline Tracking",
    icon: "🔀",
    before: [
      "Navigate to Pipelines module",
      "Select project",
      "Scroll to find active pipeline",
      "Open pipeline (new page)",
      "Read run log (raw text)",
      "Correlate with deployment status manually",
    ],
    after: [
      "Pipeline status inline on Dashboard",
      "Pipeline module with visual run timeline",
      "Status color-coded at a glance",
      "Drill-down from dashboard card directly",
    ],
    improvement: "Pipeline status visible from Dashboard without navigating. Visual run timeline replaced raw text logs.",
  },
  {
    flow: "Environment Management",
    icon: "⚙️",
    before: [
      "Navigate to Settings",
      "Find Environments section",
      "Scroll through flat list",
      "No visual distinction between prod/staging/dev",
      "Edit without isolation preview",
    ],
    after: [
      "Environments as first-class module",
      "Card-based layout with visual env badges",
      "Isolated edit with change preview",
      "Audit trail visible per environment",
    ],
    improvement: "Environment status now visible at a glance. Isolation and audit trail prevent accidental cross-environment changes.",
  },
];

export const TYPE_SAMPLES: TypeSample[] = [
  { label: "Display", size: "36px / Bold", sample: "Dashboard Overview", className: "text-3xl font-bold" },
  { label: "Heading 1", size: "28px / Bold", sample: "Cluster Health", className: "text-2xl font-bold" },
  { label: "Heading 2", size: "20px / Semibold", sample: "Pod Status", className: "text-xl font-semibold" },
  { label: "Body", size: "14px / Regular", sample: "Last updated 2 minutes ago", className: "text-sm" },
  { label: "Caption", size: "11px / Medium", sample: "CRITICAL · AWS-PROD", className: "text-xs font-medium uppercase tracking-widest" },
];

export const COLOR_TOKENS: ColorToken[] = [
  { name: "Critical", hex: "#E8273A", usage: "System failures, P0 alerts, destructive actions" },
  { name: "High", hex: "#F97316", usage: "P1 alerts, degraded services, high CPU" },
  { name: "Warning", hex: "#F59E0B", usage: "P2 alerts, approaching thresholds, caution" },
  { name: "Success", hex: "#22C55E", usage: "Running pods, healthy services, successful deploys" },
  { name: "Info", hex: "#3B82F6", usage: "Informational states, neutral metrics, links" },
  { name: "Surface", hex: "#0F0F0F", usage: "Dashboard background, panel containers, overlays" },
];

export const DESIGN_TOKENS: DesignToken[] = [
  { token: "--color-critical", val: "#E8273A" },
  { token: "--color-success", val: "#22C55E" },
  { token: "--color-warning", val: "#F59E0B" },
  { token: "--space-card-gap", val: "24px" },
  { token: "--radius-card", val: "16px" },
  { token: "--radius-pill", val: "999px" },
];

export const SPACING_SCALE = [4, 8, 12, 16, 24, 32];

export const COMPONENT_STATS: ComponentStat[] = [
  { v: "120+", l: "Components" },
  { v: "2", l: "Theme modes" },
  { v: "48", l: "Design tokens" },
  { v: "6", l: "Type levels" },
  { v: "4", l: "State variants" },
  { v: "5", l: "Semantic colors" },
];

export const HIGH_FIDELITY_CAPTION =
  "Main operational dashboard — Pods Health · Alert Prioritization · Application Performance · Network Traffic";

export const HIGH_FIDELITY_SCREENS: HighFidelityScreen[] = [
  {
    screen: "Pods Health Dashboard",
    icon: "🟢",
    decision:
      "Pod count, running status, CPU%, memory, and storage surfaced in a single horizontal scan at the top of every dashboard view — the single highest-impact layout decision in the project.",
    tag: "Infrastructure Module",
  },
  {
    screen: "Alert Prioritization Panel",
    icon: "🔔",
    decision:
      "Severity-first grouping (Critical / High / Medium / Low) with inline acknowledge/dismiss. Replaced chronological alert list that buried critical alerts in noise.",
    tag: "Alerts Module",
  },
  {
    screen: "Application Performance View",
    icon: "📈",
    decision:
      "Service health visualized as percentage bars with inline CPU/memory — giving resource context without opening a separate panel. Anomaly detection became a visual scan.",
    tag: "Apps Module",
  },
  {
    screen: "Visual Rollback Confirmation Flow",
    icon: "↩️",
    decision:
      "3-step visual confirmation showing the state the system will revert to before confirming. Transformed rollback from the platform's most-feared action to one users described as 'predictable'.",
    tag: "Deployments Module",
  },
  {
    screen: "Multi-Cloud Cluster Selector",
    icon: "☁️",
    decision:
      "Cluster switching moved from the sidebar to a persistent top-nav dropdown — carrying context across all panels simultaneously. Increased navigation confidence by 40% in usability testing.",
    tag: "Navigation System",
  },
  {
    screen: "Network Traffic Visualization",
    icon: "🌐",
    decision:
      "Layered area chart with service-level and timeline filtering in the panel header. Network spikes — often the first visual signal of an incident — are immediately readable without navigation.",
    tag: "Monitoring Module",
  },
];

export const OUTCOME_METRICS: OutcomeMetric[] = [
  { metric: "60%", label: "Reduction in alert triage time", desc: "Severity-first alert grouping eliminated the need to read every alert to find critical ones — estimated from timed usability sessions." },
  { metric: "40%", label: "Faster navigation to key workflows", desc: "Cluster selector relocation and semantic navigation zones reduced time-to-task across all six core flows." },
  { metric: "3×", label: "Increase in rollback confidence", desc: "Post-redesign testing showed engineers describing rollback as 'predictable' instead of 'scary' — a qualitative outcome that matters." },
  { metric: "78%", label: "First-session onboarding success", desc: "New users could complete core task flows without guidance — up from an estimated 20% on the original interface." },
  { metric: "120+", label: "Design system components shipped", desc: "Scalable component library enabling the engineering team to build new screens 4× faster than before systematically." },
  { metric: "100%", label: "Stakeholder design approval", desc: "First design review with founders and product lead resulted in full approval with no major structural revisions required." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "\"For the first time I can actually tell what's happening in our clusters without running a kubectl command. That's remarkable for a UI.\"",
    role: "Senior DevOps Engineer, Pilot Customer",
  },
  {
    quote: "\"The alert panel alone saved us from a production incident last week. We spotted the critical alert immediately instead of it getting buried.\"",
    role: "Platform Administrator, Beta User",
  },
  {
    quote: "\"I've tried three other Kubernetes dashboards. This is the first one I'd actually recommend to a non-engineer.\"",
    role: "Engineering Manager, Early Adopter",
  },
  {
    quote: "\"The design system made our frontend sprint velocity 40% faster. Everything is there exactly when we need it.\"",
    role: "Frontend Engineer, ClappIt Team",
  },
];

export const ENTERPRISE_LEARNINGS: EnterpriseLearning[] = [
  {
    l: "Respect the expertise of technical users",
    d: "DevOps engineers are sophisticated users. The goal isn't to hide complexity — it's to surface complexity in a way that respects their expertise while reducing unnecessary friction. Dumbing down the UI for a 10-year engineer is an insult, not a UX improvement.",
  },
  {
    l: "Systems thinking is non-negotiable",
    d: "Every UX decision in an enterprise product creates downstream implications across the entire product. A navigation change affects 8 screens. A color token change affects 120 components. I learned to design at the system level, not the screen level.",
  },
  {
    l: "Collaboration with engineering is a design input",
    d: "The most valuable UX insights in this project didn't come from user interviews — they came from sitting with DevOps engineers while they worked. Contextual observation is irreplaceable, especially for technical-domain products.",
  },
  {
    l: "Design systems are a product investment",
    d: "The design system I built enabled the engineering team to move 4× faster on new features. The upfront investment in systematic design paid back in development velocity within two sprints — faster than any individual feature could.",
  },
];

export const SYSTEM_INVESTMENT_POINTS = [
  "Treated the component library as a product — with its own requirements and QA",
  "Designed every component with all states: default, hover, active, disabled, loading, error",
  "Documented every design token as a semantic variable, not a hardcoded value",
  "Involved engineers in design system reviews to ensure implementability",
];
