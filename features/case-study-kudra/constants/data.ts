import type {
  ArchitectureModule,
  BalancingFactor,
  Challenge,
  Deliverable,
  DesignPrinciple,
  Feature,
  FutureScopeItem,
  KeyInsight,
  Learning,
  LifecycleState,
  MetadataItem,
  OutcomeMetric,
  ResearchArea,
  ResearchStat,
  ScreenShowcase,
  StatItem,
  StatusColor,
  UserRole,
  UxGoal,
  WorkflowStep,
} from "@/features/case-study-kudra/types";

export const HERO_METADATA: MetadataItem[] = [
  { label: "Role", value: "Product Designer" },
  { label: "Team", value: "Product Designer (me) · Fleet Operations SMEs · Engineering Team" },
  { label: "Timeline", value: "2025 – 2026" },
  { label: "Platform", value: "Web Application" },
  { label: "Domain", value: "Fleet Management" },
  { label: "Tools", value: "Figma · Miro · FigJam · Notion" },
];

export const HERO_STATS: StatItem[] = [
  { value: "84", label: "Vehicles Tracked" },
  { value: "40%", label: "Less Manual Coordination" },
  { value: "7", label: "Core Workflow Steps" },
  { value: "2025–26", label: "Design Timeline" },
];

export const OVERVIEW_PARAGRAPHS = [
  "Kudra turns fragmented logistics operations into one trip management system — beyond vehicle tracking, into structured workflows for fleet managers, branch operators and logistics teams.",
  "The goal was to cut the dependency on calls and spreadsheets while improving visibility across trips, drivers, fuel and fleet analytics, with every vehicle movement tied to a structured trip.",
];

export const COORDINATION_METHODS = ["Phone calls", "WhatsApp communication", "Spreadsheets", "Paper-based tracking"];

export const COORDINATION_PROBLEMS = [
  "No structured trip lifecycle",
  "Lack of trip visibility",
  "Poor coordination between branches",
  "No centralized fuel tracking",
  "Limited driver accountability",
  "No operational analytics",
];

export const MISSING_CONTEXT_ITEMS = [
  "Why a vehicle was moving",
  "Which trip it belonged to",
  "Who the assigned driver was",
  "Fuel usage during trips",
  "Trip completion status",
  "Branch coordination status",
];

export const VISION_PARAGRAPHS = [
  "A central control system for logistics fleets, with full visibility into trip planning, dispatch, monitoring and analytics.",
  "A workflow-first ecosystem where operations run on structured trip lifecycles rather than fragmented communication.",
];

export const VISION_GOALS = [
  "Streamline fleet operations",
  "Improve trip visibility",
  "Reduce operational chaos",
  "Generate actionable analytics",
  "Improve branch coordination",
];

export const USER_ROLES: UserRole[] = [
  {
    role: "Fleet Managers",
    icon: "🚛",
    responsibilities: ["Trip creation", "Vehicle and driver assignment", "Monitoring active trips", "Fleet analytics"],
    painPoints: ["Tracking many trips at once", "Excessive calls", "No fuel visibility", "No central dashboard"],
  },
  {
    role: "Branch Managers",
    icon: "🏢",
    responsibilities: ["Incoming and outgoing vehicles", "Status updates", "Dispatch coordination"],
    painPoints: ["No visibility into incoming trips", "Delayed updates", "Manual communication"],
  },
  {
    role: "Accounts Teams",
    icon: "📊",
    responsibilities: ["Fuel expenses", "Driver halt payments", "Trip reconciliation"],
    painPoints: ["Missing records", "Manual verification", "No trip-level financials"],
  },
];

export const RESEARCH_AREAS: ResearchArea[] = [
  { area: "Dispatch coordination", desc: "How trips were verbally coordinated between fleet and branches" },
  { area: "Trip tracking", desc: "How teams monitored vehicle movement and status" },
  { area: "Fuel logging", desc: "Paper records and their accuracy gaps" },
  { area: "Driver communication", desc: "Call frequency and information loss in verbal updates" },
  { area: "Branch coordination", desc: "How branches learned about incoming deliveries" },
  { area: "Reporting", desc: "What managers assembled by hand each month" },
];

export const RESEARCH_STATS: ResearchStat[] = [
  { v: "3", l: "Logistics Operators" },
  { v: "6wk", l: "Research Duration" },
  { v: "4", l: "User Groups" },
  { v: "16+", l: "Sessions Conducted" },
];

export const KEY_INSIGHTS: KeyInsight[] = [
  {
    num: "01",
    title: "Trips, Not Vehicles, Are the Operational Unit",
    desc: 'Managers talked about "the Chennai trip", never "truck KA-01-AB-1234". This became the foundation of the product strategy.',
  },
  {
    num: "02",
    title: "Operational Data Was Fragmented",
    desc: "Trip information lived across calls, WhatsApp, spreadsheets and memory. Every status update required a phone call.",
  },
  {
    num: "03",
    title: "Managers Needed Real-Time Visibility",
    desc: "Active trips, delayed vehicles, driver activity, fuel and completion status — without making a call.",
  },
  {
    num: "04",
    title: "Branches Needed Automatic Updates",
    desc: "Destination branches were often unaware of incoming vehicles, causing dock-planning failures at every hub.",
  },
];

export const UX_GOALS: UxGoal[] = [
  { goal: "Simplify operational workflows", desc: "Fewer steps per core fleet operation" },
  { goal: "Reduce coordination dependency", desc: "Visibility that removes the manual status call" },
  { goal: "Improve active trip visibility", desc: "Real-time context on every moving vehicle" },
  { goal: "Reduce cognitive overload", desc: "The right information at the right moment, not everything at once" },
  { goal: "Enable faster trip creation", desc: "From 15+ minutes to under 2" },
  { goal: "Scale the workflow", desc: "Works at 10 vehicles and at 1,000" },
];

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  { module: "Dashboard", icon: "📊", desc: "Real-time fleet status, active trips, vehicle states, and operational KPIs." },
  { module: "Trip Management", icon: "🗺️", desc: "Create, dispatch, monitor, and close trips through a structured lifecycle." },
  { module: "Vehicle Management", icon: "🚛", desc: "Vehicle profiles, maintenance records, performance analytics, and status." },
  { module: "Driver Management", icon: "👤", desc: "Driver profiles, trip history, halt logs, and efficiency tracking." },
  { module: "Reports & Analytics", icon: "📈", desc: "Fleet-wide reports on fuel, trips, vehicles, and drivers with export." },
  { module: "Notifications", icon: "🔔", desc: "Automatic branch alerts and operational announcements across hubs." },
  { module: "Frequent Routes", icon: "📍", desc: "Route suggestions based on historical trip data to speed up creation." },
  { module: "Locations", icon: "🏢", desc: "Manage branches, hubs, and delivery points used in trip planning." },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { step: "01", title: "Trip Creation", items: ["Select origin and destination", "Assign driver and vehicle", "Select route from frequent route suggestions", "Add freight and planned trip details"] },
  { step: "02", title: "Trip Dispatch", items: ["Capture starting odometer", "Record starting fuel level", "Confirm dispatch — status changes to Dispatched", "Automatic notifications sent to destination branch"] },
  { step: "03", title: "Ongoing Monitoring", items: ["Track vehicle movement on live map", "Monitor trip progress and checkpoints", "View refueling updates in real-time", "Track driver halt activity and delays"] },
  { step: "04", title: "Fuel Tracking", items: ["Operators record refueling amount and cost", "Fuel quantity and location captured per stop", "Enables mileage and efficiency reporting", "Data tied directly to the active trip record"] },
  { step: "05", title: "Driver Halt Tracking", items: ["System records halt locations and durations", "Halt reasons and waiting times captured", "Improves operational accountability", "Supports driver payment calculations"] },
  { step: "06", title: "Trip Completion", items: ["Capture ending odometer and fuel level", "Platform auto-calculates distance, mileage, and fuel efficiency", "Trip duration and completion time recorded", "Status moves to Completed → Closed"] },
  { step: "07", title: "Reports & Analytics", items: ["Vehicle reports — mileage, fuel efficiency, utilization", "Driver reports — halt duration, trip completion history", "Operational reports — route performance, fleet utilization trends"] },
];

export const LIFECYCLE_STATES: LifecycleState[] = [
  { state: "Created", desc: "Trip defined with all operational details" },
  { state: "Dispatched", desc: "Vehicle and driver confirmed, branch notified" },
  { state: "Ongoing", desc: "Trip in motion, live tracking active" },
  { state: "Completed", desc: "Destination reached, metrics captured" },
  { state: "Closed", desc: "Financial reconciliation complete" },
];

export const EXPLORATION_AREAS: ResearchArea[] = [
  { area: "Dashboard hierarchy", desc: "Prioritizing real-time trip status and vehicle states above all other data" },
  { area: "Operational visibility", desc: "Making trip progress scannable within 3 seconds for fleet managers" },
  { area: "Data-heavy layouts", desc: "Structuring dense operational tables without creating cognitive overload" },
  { area: "Trip status visibility", desc: "Designing status indicators that communicated state at a glance" },
  { area: "Fleet monitoring efficiency", desc: "Placing the most-used actions at minimum click depth" },
];

export const BALANCING_FACTORS: BalancingFactor[] = [
  { f: "Information density", v: "Show everything that matters" },
  { f: "Readability", v: "Still be scannable under pressure" },
  { f: "Operational speed", v: "Reach any action in two clicks" },
  { f: "Enterprise scalability", v: "Work for 10 vehicles or 10,000" },
];

export const WIREFRAME_OUTCOMES = ["Status prioritization hierarchy", "KPI card placement", "Navigation structure", "Workflow step sequencing"];

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  { p: "High readability", d: "Operators read dashboards in seconds — typography and contrast must work at a glance" },
  { p: "Minimal cognitive load", d: "Show only what's needed for the current task; everything else one click away" },
  { p: "Status-first hierarchy", d: "Trip and vehicle states always take visual precedence over secondary data" },
  { p: "Data clarity", d: "Numbers and operational metrics are the product — they must be immediately parseable" },
  { p: "Scannable interfaces", d: "Tables, cards, and lists designed for rapid vertical scanning under pressure" },
];

export const UI_DECISIONS = [
  "Color-coded trip states (Created / Dispatched / Ongoing / Completed / Closed)",
  "Structured dashboard cards with consistent header, filter, and data zones",
  "Clear typography hierarchy — metrics large, labels small, metadata smallest",
  "Modular analytics widgets that can be added/removed per user role",
  "Simplified operational tables with status-first column ordering",
];

export const STATUS_COLORS: StatusColor[] = [
  { state: "Moving", color: "#22c55e", label: "Green" },
  { state: "Halted", color: "#956807", label: "Amber" },
  { state: "Stopped", color: "#ef4444", label: "Red" },
  { state: "Inactive", color: "#6b7280", label: "Grey" },
];

export const SCREEN_SHOWCASE: ScreenShowcase[] = [
  {
    imageSrc: "/kudra/live-tracking.png",
    title: "Live Tracking",
    desc: "Real-time vehicle route visualization on an interactive map, with halt-point timeline, duration markers, and 48-hour playback. Operators can trace a vehicle's exact path and pinpoint every stop.",
    tag: "Live Tracking Module",
  },
  {
    imageSrc: "/kudra/fleet-management.png",
    title: "Fleet Management",
    desc: "A structured vehicle registry showing GPS device IDs, vehicle numbers, last known location, operational status (In Transit / Idle / Inactive), and inline action controls for live tracking and editing.",
    tag: "Fleet Management Module",
  },
  {
    imageSrc: "/kudra/vehicle-reports.png",
    title: "Vehicle Reports",
    desc: "Per-vehicle analytics covering total distance, average and maximum speed, running hours, idle time, and halt points — filterable by date range. Enables managers to measure efficiency and identify underperforming assets.",
    tag: "Reports Module",
  },
  {
    imageSrc: "/kudra/add-device.png",
    title: "Add New Device",
    desc: "A structured onboarding form for registering fleet vehicles — capturing vehicle number, GPS device ID, vehicle type, capacity, service number, body type, FastTag ID, and driver assignment in a single workflow.",
    tag: "Fleet Management · Add Device",
  },
];

export const FEATURES: Feature[] = [
  { feature: "Trip Lifecycle Management", icon: "🗺️", detail: "A structured state machine — Created → Dispatched → Ongoing → Completed → Closed — gives every stakeholder clear visibility into where a trip stands without any manual communication." },
  { feature: "Frequent Route Suggestions", icon: "📍", detail: "The system analyzed historical trips to recommend frequently used routes. Benefits: faster trip creation, reduced manual effort, and standardized operational workflows across branches." },
  { feature: "Fuel Tracking", icon: "⛽", detail: "Fuel logs integrated directly into trip workflows — enabling mileage tracking, fuel efficiency reporting, and cost visibility per trip tied to the live operational record." },
  { feature: "Driver Halt Tracking", icon: "⏸️", detail: "Operators could track halt duration and delays during trips — improving operational accountability, driver payment workflows, and delay visibility for fleet managers." },
  { feature: "Branch Notifications", icon: "📣", detail: "Automatic announcements triggered when trips were created or dispatched. Replaced WhatsApp chains with context-aware, timestamped notifications across hubs." },
  { feature: "Fleet Analytics", icon: "📊", detail: "Integrated analytics enabling vehicle performance tracking, driver efficiency monitoring, operational optimization, and fleet utilization analysis — all from live trip data." },
];

export const CHALLENGES: Challenge[] = [
  {
    ch: "Designing for Complex Logistics Workflows",
    detail: "Fleet operations involved multiple stakeholders and edge-case scenarios — vehicles rerouted mid-trip, drivers swapping, branches changing plans. Balancing simplicity with operational depth became a central design challenge.",
    solution: "Built flexible trip states with override capabilities and designed exception handling directly into the workflow — not as an afterthought.",
  },
  {
    ch: "Managing Data-Heavy Interfaces",
    detail: "The platform required displaying large amounts of operational information without overwhelming users. A single dashboard could surface hundreds of data points simultaneously.",
    solution: "Careful prioritization of visual hierarchy, information grouping, and dashboard readability — with progressive disclosure to keep the primary view clean.",
  },
  {
    ch: "Multiple Stakeholder Needs",
    detail: "Fleet managers, branch managers, and accounts teams required different workflows and levels of visibility from the same underlying data. One screen could not serve all roles equally.",
    solution: "Role-based views with shared data — same trip record, different UI surfaces depending on who's looking. The product supported fleet ops, branch coordination, financial reconciliation, and driver monitoring.",
  },
];

export const OUTCOME_METRICS: OutcomeMetric[] = [
  { metric: "40%", label: "Reduced manual operational coordination", desc: "Fleet managers reported a significant drop in daily coordination call volume." },
  { metric: "78%", label: "Faster trip creation", desc: "Average trip creation time dropped from ~15 minutes to under 3 minutes using frequent route suggestions." },
  { metric: "100%", label: "Trip cost visibility", desc: "All trips now have a complete cost record — fuel, driver allowances, tolls — without manual data consolidation." },
  { metric: "60%", label: "Reduction in reporting effort", desc: "Monthly fleet reports now generate automatically. What took 2–3 days of manual work now takes minutes." },
  { metric: "3×", label: "Increase in fleet accountability", desc: "Driver halt tracking and fuel analytics created a measurable accountability framework." },
  { metric: "84", label: "Vehicles actively tracked", desc: "Full fleet across multiple branches now tracked under a single operational system." },
];

export const IMPACT_SUMMARY = [
  "Reduced manual operational coordination by 40%",
  "Improved active trip visibility across branches",
  "Faster trip creation workflows",
  "Better fleet accountability",
  "Improved operational reporting accuracy",
  "Reduced dependency on calls and spreadsheets",
];

export const LEARNINGS: Learning[] = [
  { l: "Workflow-first UX thinking", d: "The best interface decisions came from mapping the operational reality first — not from UI patterns. Understanding what fleet managers actually do before designing how they do it was essential." },
  { l: "Enterprise dashboard hierarchy", d: "In high-pressure operational environments, visual hierarchy isn't aesthetic — it's functional. Wrong prioritization means missed alerts and operational failures." },
  { l: "Operational visibility design", d: "Visibility is a feature, not a side effect. Every screen had to answer 'what does the user need to know right now?' before 'what can we show them?'" },
  { l: "Human-centered logistics systems", d: "Behind every data point is a driver, a fleet manager, a branch coordinator. Designing for the human context — not just the data model — was what made the system usable under pressure." },
  { l: "Designing for real-world operational environments", d: "This is a tool used during crisis — a delayed vehicle, a missed delivery, a fuel discrepancy. It must be calm, clear, and fast when the user is not." },
];

export const FINAL_REFLECTION_PARAGRAPHS = [
  "Kudra was more than a fleet management dashboard.",
  "It was an operational transformation project that introduced structure, visibility, and accountability into logistics workflows.",
  "By shifting operations from fragmented communication into a centralized trip management ecosystem, the platform helped logistics teams operate with greater efficiency, transparency, and control.",
];

export const FINAL_REFLECTION_QUOTE =
  "The project also highlighted how strong UX can reduce operational chaos in enterprise systems.";

export const FUTURE_SCOPE: FutureScopeItem[] = [
  { title: "Multi-Stop Trip Workflows", icon: "🛣️", desc: "Support complex trips with multiple waypoints, intermediate pickups, and sequential delivery confirmations." },
  { title: "AI-Powered Route Optimization", icon: "🗺️", desc: "AI-powered routing that suggests optimal paths based on traffic, distance, fuel efficiency, and historical trip data." },
  { title: "Predictive Fuel Analytics", icon: "⛽", desc: "ML-driven fuel consumption forecasting based on route, vehicle age, load weight, and driver behavior patterns." },
  { title: "Driver Mobile Application", icon: "📱", desc: "Companion app for drivers enabling trip confirmation, halt logging, fuel entry, and delivery confirmation from the field." },
  { title: "Automated Dispatch Planning", icon: "🤖", desc: "AI-assisted dispatch that matches available vehicles and drivers to incoming trip requests based on capacity and location." },
  { title: "Fleet Intelligence Systems", icon: "📊", desc: "Executive-level fleet intelligence dashboards with trend analysis, predictive maintenance alerts, and cost optimization." },
];

export const DELIVERABLES: Deliverable[] = [
  { d: "UX Research", icon: "🔍" },
  { d: "User Personas", icon: "👤" },
  { d: "Workflow Mapping", icon: "🗺️" },
  { d: "User Flows", icon: "🔀" },
  { d: "Wireframes", icon: "📐" },
  { d: "Dashboard UX", icon: "📊" },
  { d: "High-Fidelity UI", icon: "🎨" },
  { d: "Design System", icon: "🧩" },
  { d: "Operational Workflows", icon: "⚙️" },
  { d: "Analytics Experience", icon: "📈" },
];
