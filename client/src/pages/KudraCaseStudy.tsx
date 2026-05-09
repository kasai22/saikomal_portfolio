import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

const A = "#F5B731";
const AL = "rgba(245,183,49,0.12)";
const AB = "rgba(245,183,49,0.25)";

const Label = ({ text }: { text: string }) => (
  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: A }}>{text}</span>
);

const SectionHeading = ({ label, title, accent }: { label: string; title: string; accent: string }) => (
  <div className="mb-10">
    <Label text={label} />
    <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
      {title} <span style={{ color: A }}>{accent}</span>
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 ${className}`}>{children}</div>
);

const YCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border p-6 md:p-8 ${className}`} style={{ borderColor: AB, backgroundColor: AL }}>{children}</div>
);

const Dot = () => (
  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: A }} />
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((i) => (
      <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
        <Dot /> {i}
      </li>
    ))}
  </ul>
);

const StepBadge = ({ n }: { n: string }) => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold text-xs" style={{ borderColor: A, color: A }}>
    {n}
  </div>
);

export const KudraCaseStudy = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Poppins']">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{ background: `radial-gradient(ellipse 80% 60% at 25% 40%, rgba(245,183,49,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 80% 55%, rgba(245,183,49,0.05) 0%, transparent 60%), #0a0a0a` }}
        />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 pt-24">
          <Link href="/">
            <button className="mb-10 flex items-center gap-2 text-sm font-medium group transition-colors" style={{ color: A }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = A)}>
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="rounded-full border px-4 py-1 text-xs font-semibold tracking-widest uppercase" style={{ borderColor: AB, backgroundColor: AL, color: A }}>
                  Logistics / Fleet Management SaaS
                </span>
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-3" style={{ color: A }}>Kudra</h1>
              <p className="text-white/40 italic text-base mb-6">
                "Transforming Fleet Operations Through Structured Trip Management"
              </p>
              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
                A logistics operations platform that evolved from simple GPS tracking into a centralized trip management ecosystem — bringing visibility, structure, and accountability to fleet operations.
              </p>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Role", value: "Product Designer" },
                  { label: "Timeline", value: "2025 – 2026" },
                  { label: "Platform", value: "Web Application" },
                  { label: "Domain", value: "Fleet Management" },
                  { label: "Tools", value: "Figma · Miro · FigJam · Notion" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs text-white/35 uppercase tracking-widest mb-1">{m.label}</div>
                    <div className="text-sm font-semibold text-white">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dashboard */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/figmaAssets/kudra-dashboard.png" alt="Kudra Dashboard" className="w-full h-auto block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "84", label: "Vehicles Tracked" },
              { value: "40%", label: "Less Manual Coordination" },
              { value: "7", label: "Core Workflow Steps" },
              { value: "2025–26", label: "Design Timeline" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: A }}>{s.value}</div>
                <div className="text-xs text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24 space-y-24">

        {/* Mobile dashboard */}
        <div className="lg:hidden rounded-2xl overflow-hidden border border-white/10">
          <img src="/figmaAssets/kudra-dashboard.png" alt="Kudra Dashboard" className="w-full h-auto block" />
        </div>

        {/* ── CASE STUDY INTRO ── */}
        <section>
          <SectionHeading label="Case Study" title="The" accent="Overview" />
          <YCard>
            <p className="text-white/75 leading-relaxed text-lg mb-4">
              Kudra was designed to transform fragmented logistics operations into a centralized trip management ecosystem. The platform evolved beyond simple vehicle tracking and introduced structured workflows for fleet managers, branch operators, and logistics teams.
            </p>
            <p className="text-white/65 leading-relaxed">
              The goal was to reduce operational dependency on calls and spreadsheets while improving visibility across trips, drivers, fuel usage, and fleet analytics. The product focused on building a scalable enterprise workflow where every vehicle movement was tied to a structured operational trip.
            </p>
          </YCard>
        </section>

        {/* ── PROBLEM STATEMENT ── */}
        <section>
          <SectionHeading label="Problem Statement" title="The Operational" accent="Reality" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-semibold text-white mb-5">How logistics teams coordinated</h3>
              <BulletList items={["Phone calls", "WhatsApp communication", "Spreadsheets", "Paper-based tracking"]} />
            </Card>
            <Card>
              <h3 className="font-semibold text-white mb-5">What this created</h3>
              <BulletList items={[
                "No structured trip lifecycle",
                "Lack of trip visibility",
                "Poor coordination between branches",
                "No centralized fuel tracking",
                "Limited driver accountability",
                "No operational analytics",
              ]} />
            </Card>
          </div>
          <YCard className="mt-6">
            <h3 className="font-semibold text-white mb-4">Vehicles were moving without operational context.</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-4">Teams could not easily identify:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Why a vehicle was moving", "Which trip it belonged to", "Who the assigned driver was", "Fuel usage during trips", "Trip completion status", "Branch coordination status"].map((i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/65">
                  <span style={{ color: A }}>✦</span> {i}
                </div>
              ))}
            </div>
          </YCard>
        </section>

        {/* ── PRODUCT VISION ── */}
        <section>
          <SectionHeading label="Product Vision" title="The" accent="North Star" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <p className="text-white/75 leading-relaxed text-lg mb-6">
                  To create a centralized operational control system for logistics fleets that provides complete visibility into trip planning, dispatch, monitoring, and analytics.
                </p>
                <p className="text-white/65 leading-relaxed">
                  Kudra aimed to establish a workflow-first ecosystem where operations teams could manage logistics through structured trip lifecycles rather than fragmented communication.
                </p>
              </Card>
            </div>
            <YCard className="flex flex-col justify-center gap-4">
              {[
                "Streamline fleet operations",
                "Improve trip visibility",
                "Reduce operational chaos",
                "Generate actionable analytics",
                "Improve branch coordination",
              ].map((g) => (
                <div key={g} className="flex items-center gap-3 text-sm text-white/70">
                  <span style={{ color: A }}>→</span> {g}
                </div>
              ))}
            </YCard>
          </div>
        </section>

        {/* ── TARGET AUDIENCE ── */}
        <section>
          <SectionHeading label="Target Audience" title="Who Uses" accent="Kudra?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: "Fleet Managers",
                icon: "🚛",
                responsibilities: ["Trip creation", "Vehicle assignment", "Driver assignment", "Monitoring active trips", "Reviewing fleet analytics"],
                painPoints: ["Difficulty tracking multiple ongoing trips", "Excessive operational calls", "Lack of fuel visibility", "No centralized operational dashboard"],
              },
              {
                role: "Branch Managers",
                icon: "🏢",
                responsibilities: ["Monitoring incoming and outgoing vehicles", "Updating operational statuses", "Coordinating dispatch communication"],
                painPoints: ["No visibility into incoming trips", "Delayed operational updates", "Dependency on manual communication"],
              },
              {
                role: "Accounts Teams",
                icon: "📊",
                responsibilities: ["Fuel expense tracking", "Driver halt payments", "Trip reconciliation"],
                painPoints: ["Missing operational records", "Manual expense verification", "Lack of trip-level financial tracking"],
              },
            ].map((u) => (
              <Card key={u.role}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{u.icon}</span>
                  <h3 className="font-bold text-white text-lg">{u.role}</h3>
                </div>
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">Responsibilities</p>
                  <BulletList items={u.responsibilities} />
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400/70 mb-3">Pain Points</p>
                  <ul className="space-y-2">
                    {u.painPoints.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-white/55 leading-relaxed">
                        <span className="text-red-400/60 mt-0.5 shrink-0">✗</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── RESEARCH & DISCOVERY ── */}
        <section>
          <SectionHeading label="Research & Discovery" title="Understanding the" accent="Operations" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-white/65 leading-relaxed mb-6">
                To better understand operational workflows, interviews and observational research were conducted with logistics operators, dispatch teams, and fleet managers. Research focused on:
              </p>
              <div className="space-y-3">
                {[
                  { area: "Dispatch coordination workflows", desc: "How trips were verbally coordinated between fleet and branches" },
                  { area: "Trip tracking processes", desc: "How teams monitored vehicle movement and status" },
                  { area: "Fuel logging systems", desc: "Paper-based fuel records and their accuracy gaps" },
                  { area: "Driver communication patterns", desc: "Call frequency and information loss in verbal updates" },
                  { area: "Branch coordination methods", desc: "How branches learned about incoming deliveries" },
                  { area: "Reporting inefficiencies", desc: "Manual effort required to compile operational data" },
                ].map((r) => (
                  <div key={r.area} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: A }} />
                    <div>
                      <div className="font-semibold text-white text-sm">{r.area}</div>
                      <div className="text-white/50 text-sm mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <YCard className="flex flex-col justify-center">
              <h3 className="font-bold mb-2 text-lg" style={{ color: A }}>Research Approach</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Structured interviews and contextual observation sessions with logistics operators across multiple branches. Focus was on shadowing real operational workflows — not just asking about them.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "3", l: "Logistics Operators" },
                  { v: "6wk", l: "Research Duration" },
                  { v: "4", l: "User Groups" },
                  { v: "16+", l: "Sessions Conducted" },
                ].map((s) => (
                  <div key={s.l} className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold" style={{ color: A }}>{s.v}</div>
                    <div className="text-xs text-white/45 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </YCard>
          </div>
        </section>

        {/* ── KEY INSIGHTS ── */}
        <section>
          <SectionHeading label="Key Insights" title="What We" accent="Discovered" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Trips Needed to Become the Core Operational Unit",
                desc: "Operations teams naturally thought in terms of trips rather than vehicles. Fleet managers talked about \"the Chennai trip\" — not \"truck KA-01-AB-1234\". This insight became the foundation of the entire product strategy.",
              },
              {
                num: "02",
                title: "Operational Data Was Fragmented",
                desc: "Critical trip information existed across calls, WhatsApp messages, spreadsheets, and human memory. There was no centralized operational visibility — every status update required a phone call.",
              },
              {
                num: "03",
                title: "Managers Needed Real-Time Operational Visibility",
                desc: "Fleet managers wanted to instantly understand active trips, delayed vehicles, driver activity, fuel usage, and trip completion status — without making a single call.",
              },
              {
                num: "04",
                title: "Branches Required Automatic Operational Updates",
                desc: "Destination branches were often completely unaware of incoming vehicles. This created coordination delays, dock planning failures, and operational inefficiencies at every hub.",
              },
            ].map((ins) => (
              <Card key={ins.num}>
                <div className="text-4xl font-bold mb-4" style={{ color: A, opacity: 0.25 }}>{ins.num}</div>
                <h4 className="font-bold text-white text-base mb-3">{ins.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{ins.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── UX GOALS ── */}
        <section>
          <SectionHeading label="UX Goals" title="What We Were" accent="Designing For" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { goal: "Simplify operational workflows", desc: "Reduce the number of steps required to complete core fleet operations" },
              { goal: "Reduce coordination dependency", desc: "Embed visibility that eliminates the need for manual status calls" },
              { goal: "Improve active trip visibility", desc: "Give all stakeholders real-time context on every moving vehicle" },
              { goal: "Reduce cognitive overload", desc: "Surface the right information at the right moment — not everything at once" },
              { goal: "Enable faster trip creation", desc: "Reduce trip creation time from 15+ minutes to under 2 minutes" },
              { goal: "Create scalable enterprise workflows", desc: "Build a system that works for 10 vehicles today and 1,000 tomorrow" },
            ].map((g) => (
              <div key={g.goal} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="w-6 h-1 rounded-full mb-3" style={{ backgroundColor: A }} />
                <h4 className="font-semibold text-white text-sm mb-2">{g.goal}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── INFORMATION ARCHITECTURE ── */}
        <section>
          <SectionHeading label="Information Architecture" title="Platform" accent="Structure" />
          <p className="text-white/60 mb-8 max-w-2xl">
            The platform architecture was designed around operational efficiency — ensuring quick access to the most-used workflows while reducing navigation complexity.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { module: "Dashboard", icon: "📊", desc: "Real-time fleet status, active trips, vehicle states, and operational KPIs." },
              { module: "Trip Management", icon: "🗺️", desc: "Create, dispatch, monitor, and close trips through a structured lifecycle." },
              { module: "Vehicle Management", icon: "🚛", desc: "Vehicle profiles, maintenance records, performance analytics, and status." },
              { module: "Driver Management", icon: "👤", desc: "Driver profiles, trip history, halt logs, and efficiency tracking." },
              { module: "Reports & Analytics", icon: "📈", desc: "Fleet-wide reports on fuel, trips, vehicles, and drivers with export." },
              { module: "Notifications", icon: "🔔", desc: "Automatic branch alerts and operational announcements across hubs." },
              { module: "Frequent Routes", icon: "📍", desc: "Route suggestions based on historical trip data to speed up creation." },
              { module: "Locations", icon: "🏢", desc: "Manage branches, hubs, and delivery points used in trip planning." },
            ].map((m) => (
              <div
                key={m.module}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 cursor-default"
                onMouseEnter={e => { e.currentTarget.style.borderColor = AB; e.currentTarget.style.backgroundColor = AL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.backgroundColor = ""; }}
              >
                <div className="text-2xl mb-3">{m.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{m.module}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CORE WORKFLOW ── */}
        <section>
          <SectionHeading label="Core Workflow" title="The Trip" accent="Lifecycle" />
          <div className="relative">
            <div className="hidden lg:block absolute left-[19px] top-10 bottom-10 w-0.5" style={{ background: `linear-gradient(to bottom, ${A}, transparent)` }} />
            <div className="space-y-4">
              {[
                {
                  step: "01", title: "Trip Creation",
                  items: ["Select origin and destination", "Assign driver and vehicle", "Select route from frequent route suggestions", "Add freight and planned trip details"],
                },
                {
                  step: "02", title: "Trip Dispatch",
                  items: ["Capture starting odometer", "Record starting fuel level", "Confirm dispatch — status changes to Dispatched", "Automatic notifications sent to destination branch"],
                },
                {
                  step: "03", title: "Ongoing Monitoring",
                  items: ["Track vehicle movement on live map", "Monitor trip progress and checkpoints", "View refueling updates in real-time", "Track driver halt activity and delays"],
                },
                {
                  step: "04", title: "Fuel Tracking",
                  items: ["Operators record refueling amount and cost", "Fuel quantity and location captured per stop", "Enables mileage and efficiency reporting", "Data tied directly to the active trip record"],
                },
                {
                  step: "05", title: "Driver Halt Tracking",
                  items: ["System records halt locations and durations", "Halt reasons and waiting times captured", "Improves operational accountability", "Supports driver payment calculations"],
                },
                {
                  step: "06", title: "Trip Completion",
                  items: ["Capture ending odometer and fuel level", "Platform auto-calculates distance, mileage, and fuel efficiency", "Trip duration and completion time recorded", "Status moves to Completed → Closed"],
                },
                {
                  step: "07", title: "Reports & Analytics",
                  items: ["Vehicle reports — mileage, fuel efficiency, utilization", "Driver reports — halt duration, trip completion history", "Operational reports — route performance, fleet utilization trends"],
                },
              ].map((w) => (
                <div key={w.step} className="relative flex items-start gap-5 lg:pl-14">
                  <div className="relative z-10 lg:absolute lg:left-0 lg:top-3">
                    <StepBadge n={w.step} />
                  </div>
                  <Card className="flex-1">
                    <h4 className="font-bold text-white mb-3">{w.title}</h4>
                    <BulletList items={w.items} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USER FLOW ── */}
        <section>
          <SectionHeading label="User Flow" title="Trip" accent="Lifecycle States" />
          <YCard>
            <p className="text-white/65 text-sm mb-8 max-w-xl">
              The lifecycle was intentionally simplified to improve operational clarity and reduce process confusion across all stakeholder groups.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-0">
              {[
                { state: "Created", desc: "Trip defined with all operational details" },
                { state: "Dispatched", desc: "Vehicle and driver confirmed, branch notified" },
                { state: "Ongoing", desc: "Trip in motion, live tracking active" },
                { state: "Completed", desc: "Destination reached, metrics captured" },
                { state: "Closed", desc: "Financial reconciliation complete" },
              ].map((s, i, arr) => (
                <div key={s.state} className="flex items-center gap-0 sm:flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className="rounded-xl px-4 py-3 text-center w-full border" style={{ borderColor: AB, backgroundColor: AL }}>
                      <div className="font-bold text-sm" style={{ color: A }}>{s.state}</div>
                      <div className="text-xs text-white/45 mt-1 hidden sm:block">{s.desc}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="text-white/20 px-1 sm:px-2 text-lg">→</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 sm:hidden space-y-2">
              {[
                { state: "Created", desc: "Trip defined with all operational details" },
                { state: "Dispatched", desc: "Vehicle and driver confirmed, branch notified" },
                { state: "Ongoing", desc: "Trip in motion, live tracking active" },
                { state: "Completed", desc: "Destination reached, metrics captured" },
                { state: "Closed", desc: "Financial reconciliation complete" },
              ].map(s => (
                <div key={s.state} className="flex items-center gap-3 text-sm">
                  <span className="font-semibold w-24 shrink-0" style={{ color: A }}>{s.state}</span>
                  <span className="text-white/50 text-xs">{s.desc}</span>
                </div>
              ))}
            </div>
          </YCard>
        </section>

        {/* ── WIREFRAMING & EXPLORATION ── */}
        <section>
          <SectionHeading label="Wireframing & Exploration" title="From Concept to" accent="Structure" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-white/65 leading-relaxed mb-2">Early explorations focused on establishing the right operational hierarchy before touching visual design.</p>
              {[
                { area: "Dashboard hierarchy", desc: "Prioritizing real-time trip status and vehicle states above all other data" },
                { area: "Operational visibility", desc: "Making trip progress scannable within 3 seconds for fleet managers" },
                { area: "Data-heavy layouts", desc: "Structuring dense operational tables without creating cognitive overload" },
                { area: "Trip status visibility", desc: "Designing status indicators that communicated state at a glance" },
                { area: "Fleet monitoring efficiency", desc: "Placing the most-used actions at minimum click depth" },
              ].map((e) => (
                <div key={e.area} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: A }} />
                  <div>
                    <div className="font-semibold text-white text-sm">{e.area}</div>
                    <div className="text-white/50 text-sm mt-0.5">{e.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <YCard className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4" style={{ color: A }}>The Balancing Act</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Low-fidelity wireframes went through 5 rounds of iteration. The central challenge was balancing three competing forces across every screen:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { f: "Information density", v: "Show everything that matters" },
                    { f: "Readability", v: "Still be scannable under pressure" },
                    { f: "Operational speed", v: "Reach any action in two clicks" },
                    { f: "Enterprise scalability", v: "Work for 10 vehicles or 10,000" },
                  ].map((b) => (
                    <div key={b.f} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="text-sm text-white/70">{b.f}</span>
                      <span className="text-xs text-white/40 italic">{b.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-3">Low-fidelity wireframes established:</h3>
                <BulletList items={["Status prioritization hierarchy", "KPI card placement", "Navigation structure", "Workflow step sequencing"]} />
              </div>
            </YCard>
          </div>
        </section>

        {/* ── DESIGN SYSTEM ── */}
        <section>
          <SectionHeading label="Design System" title="Visual" accent="Language" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <h3 className="font-semibold text-white mb-4">Design Principles</h3>
                <div className="space-y-3">
                  {[
                    { p: "High readability", d: "Operators read dashboards in seconds — typography and contrast must work at a glance" },
                    { p: "Minimal cognitive load", d: "Show only what's needed for the current task; everything else one click away" },
                    { p: "Status-first hierarchy", d: "Trip and vehicle states always take visual precedence over secondary data" },
                    { p: "Data clarity", d: "Numbers and operational metrics are the product — they must be immediately parseable" },
                    { p: "Scannable interfaces", d: "Tables, cards, and lists designed for rapid vertical scanning under pressure" },
                  ].map((pr) => (
                    <div key={pr.p} className="flex items-start gap-3 border-t border-white/5 pt-3 first:border-0 first:pt-0">
                      <span className="shrink-0 mt-0.5" style={{ color: A }}>→</span>
                      <div>
                        <div className="font-medium text-white text-sm">{pr.p}</div>
                        <div className="text-white/50 text-xs mt-0.5 leading-relaxed">{pr.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="space-y-5">
              <Card>
                <h3 className="font-semibold text-white mb-4">UI Decisions</h3>
                <div className="space-y-3">
                  {[
                    "Color-coded trip states (Created / Dispatched / Ongoing / Completed / Closed)",
                    "Structured dashboard cards with consistent header, filter, and data zones",
                    "Clear typography hierarchy — metrics large, labels small, metadata smallest",
                    "Modular analytics widgets that can be added/removed per user role",
                    "Simplified operational tables with status-first column ordering",
                  ].map((d) => (
                    <div key={d} className="flex items-start gap-3 text-sm text-white/65">
                      <Dot /> {d}
                    </div>
                  ))}
                </div>
              </Card>
              <YCard>
                <h3 className="font-semibold mb-3" style={{ color: A }}>Status Color Semantics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { state: "Moving", color: "#22c55e", label: "Green" },
                    { state: "Halted", color: "#F5B731", label: "Amber" },
                    { state: "Stopped", color: "#ef4444", label: "Red" },
                    { state: "Inactive", color: "#6b7280", label: "Grey" },
                  ].map((c) => (
                    <div key={c.state} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <div>
                        <div className="text-xs font-semibold text-white">{c.state}</div>
                        <div className="text-xs text-white/40">{c.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </YCard>
            </div>
          </div>
        </section>

        {/* ── HIGH FIDELITY DESIGN ── */}
        <section>
          <SectionHeading label="High Fidelity Design" title="The Final" accent="Dashboard" />
          <p className="text-white/60 mb-6 max-w-2xl">
            The final UI adopted a clean enterprise SaaS aesthetic — dark layouts, structured cards, clear status indicators, and analytics-first interfaces prioritizing active trips, vehicle statuses, and fleet performance metrics.
          </p>
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-4">
            <img src="/figmaAssets/kudra-dashboard.png" alt="Kudra — Live Fleet Dashboard" className="w-full h-auto block" />
          </div>
          <p className="text-center text-white/35 text-sm">
            Kudra — Live Fleet Operations Dashboard. 84 vehicles, real-time status tiles, and live map tracking.
          </p>
        </section>

        {/* ── KEY FEATURES ── */}
        <section>
          <SectionHeading label="Key Features" title="Core" accent="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                feature: "Trip Lifecycle Management",
                icon: "🗺️",
                detail: "A structured state machine — Created → Dispatched → Ongoing → Completed → Closed — gives every stakeholder clear visibility into where a trip stands without any manual communication.",
              },
              {
                feature: "Frequent Route Suggestions",
                icon: "📍",
                detail: "The system analyzed historical trips to recommend frequently used routes. Benefits: faster trip creation, reduced manual effort, and standardized operational workflows across branches.",
              },
              {
                feature: "Fuel Tracking",
                icon: "⛽",
                detail: "Fuel logs integrated directly into trip workflows — enabling mileage tracking, fuel efficiency reporting, and cost visibility per trip tied to the live operational record.",
              },
              {
                feature: "Driver Halt Tracking",
                icon: "⏸️",
                detail: "Operators could track halt duration and delays during trips — improving operational accountability, driver payment workflows, and delay visibility for fleet managers.",
              },
              {
                feature: "Branch Notifications",
                icon: "📣",
                detail: "Automatic announcements triggered when trips were created or dispatched. Replaced WhatsApp chains with context-aware, timestamped notifications across hubs.",
              },
              {
                feature: "Fleet Analytics",
                icon: "📊",
                detail: "Integrated analytics enabling vehicle performance tracking, driver efficiency monitoring, operational optimization, and fleet utilization analysis — all from live trip data.",
              },
            ].map((f) => (
              <Card key={f.feature} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 border" style={{ borderColor: AB, backgroundColor: AL }}>
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-white">{f.feature}</h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{f.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── CHALLENGES ── */}
        <section>
          <SectionHeading label="Challenges" title="What Made This" accent="Hard" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((c) => (
              <Card key={c.ch}>
                <div className="w-8 h-1 rounded-full bg-red-500/50 mb-4" />
                <h4 className="font-bold text-white mb-3 text-sm">{c.ch}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{c.detail}</p>
                <div className="rounded-xl p-4 border text-sm" style={{ borderColor: AB, backgroundColor: AL }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: A }}>Resolution</span>
                  <p className="text-white/65 mt-2 leading-relaxed text-sm">{c.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section>
          <SectionHeading label="Outcomes & Impact" title="Measurable" accent="Results" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { metric: "40%", label: "Reduced manual operational coordination", desc: "Fleet managers reported a significant drop in daily coordination call volume." },
              { metric: "78%", label: "Faster trip creation", desc: "Average trip creation time dropped from ~15 minutes to under 3 minutes using frequent route suggestions." },
              { metric: "100%", label: "Trip cost visibility", desc: "All trips now have a complete cost record — fuel, driver allowances, tolls — without manual data consolidation." },
              { metric: "60%", label: "Reduction in reporting effort", desc: "Monthly fleet reports now generate automatically. What took 2–3 days of manual work now takes minutes." },
              { metric: "3×", label: "Increase in fleet accountability", desc: "Driver halt tracking and fuel analytics created a measurable accountability framework." },
              { metric: "84", label: "Vehicles actively tracked", desc: "Full fleet across multiple branches now tracked under a single operational system." },
            ].map((m) => (
              <div key={m.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-bold mb-2" style={{ color: A }}>{m.metric}</div>
                <div className="font-semibold text-white text-sm mb-2">{m.label}</div>
                <div className="text-white/45 text-xs leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
          <YCard>
            <h3 className="font-bold text-white mb-4">Product Impact Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Reduced manual operational coordination by 40%",
                "Improved active trip visibility across branches",
                "Faster trip creation workflows",
                "Better fleet accountability",
                "Improved operational reporting accuracy",
                "Reduced dependency on calls and spreadsheets",
              ].map((i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/65">
                  <span style={{ color: A }}>✦</span> {i}
                </div>
              ))}
            </div>
          </YCard>
        </section>

        {/* ── LEARNINGS ── */}
        <section>
          <SectionHeading label="Learnings" title="What This Project" accent="Taught Me" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <div className="space-y-5">
                {[
                  { l: "Workflow-first UX thinking", d: "The best interface decisions came from mapping the operational reality first — not from UI patterns. Understanding what fleet managers actually do before designing how they do it was essential." },
                  { l: "Enterprise dashboard hierarchy", d: "In high-pressure operational environments, visual hierarchy isn't aesthetic — it's functional. Wrong prioritization means missed alerts and operational failures." },
                  { l: "Operational visibility design", d: "Visibility is a feature, not a side effect. Every screen had to answer 'what does the user need to know right now?' before 'what can we show them?'" },
                  { l: "Human-centered logistics systems", d: "Behind every data point is a driver, a fleet manager, a branch coordinator. Designing for the human context — not just the data model — was what made the system usable under pressure." },
                  { l: "Designing for real-world operational environments", d: "This is a tool used during crisis — a delayed vehicle, a missed delivery, a fuel discrepancy. It must be calm, clear, and fast when the user is not." },
                ].map((i) => (
                  <div key={i.l} className="flex items-start gap-3 border-t border-white/5 pt-4 first:border-0 first:pt-0">
                    <span className="shrink-0 mt-0.5" style={{ color: A }}>→</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{i.l}</div>
                      <div className="text-white/55 text-sm mt-1 leading-relaxed">{i.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <YCard className="flex flex-col justify-center">
              <h3 className="font-bold text-lg mb-4" style={{ color: A }}>Final Reflection</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Kudra was more than a fleet management dashboard.
              </p>
              <p className="text-white/65 leading-relaxed mb-4">
                It was an operational transformation project that introduced structure, visibility, and accountability into logistics workflows.
              </p>
              <p className="text-white/65 leading-relaxed mb-6">
                By shifting operations from fragmented communication into a centralized trip management ecosystem, the platform helped logistics teams operate with greater efficiency, transparency, and control.
              </p>
              <div className="border-t border-white/10 pt-5">
                <p className="text-sm text-white/40 italic">
                  "The project also highlighted how strong UX can reduce operational chaos in enterprise systems."
                </p>
              </div>
            </YCard>
          </div>
        </section>

        {/* ── FUTURE SCOPE ── */}
        <section>
          <SectionHeading label="Future Scope" title="What Comes" accent="Next" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Multi-Stop Trip Workflows", icon: "🛣️", desc: "Support complex trips with multiple waypoints, intermediate pickups, and sequential delivery confirmations." },
              { title: "AI-Powered Route Optimization", icon: "🗺️", desc: "AI-powered routing that suggests optimal paths based on traffic, distance, fuel efficiency, and historical trip data." },
              { title: "Predictive Fuel Analytics", icon: "⛽", desc: "ML-driven fuel consumption forecasting based on route, vehicle age, load weight, and driver behavior patterns." },
              { title: "Driver Mobile Application", icon: "📱", desc: "Companion app for drivers enabling trip confirmation, halt logging, fuel entry, and delivery confirmation from the field." },
              { title: "Automated Dispatch Planning", icon: "🤖", desc: "AI-assisted dispatch that matches available vehicles and drivers to incoming trip requests based on capacity and location." },
              { title: "Fleet Intelligence Systems", icon: "📊", desc: "Executive-level fleet intelligence dashboards with trend analysis, predictive maintenance alerts, and cost optimization." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 cursor-default"
                onMouseEnter={e => { e.currentTarget.style.borderColor = AB; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ""; }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{f.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DELIVERABLES ── */}
        <section>
          <SectionHeading label="Deliverables" title="What Was" accent="Produced" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
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
            ].map((del) => (
              <div key={del.d} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center hover:border-white/20 transition-colors">
                <div className="text-2xl mb-2">{del.icon}</div>
                <div className="text-xs text-white/60 leading-tight">{del.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-8 md:p-12 border" style={{ borderColor: AB, backgroundColor: AL }}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Want to work together?</h3>
            <p className="text-white/55">Let's build something operationally transformative.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/">
              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors">
                Back to Portfolio
              </button>
            </Link>
            <a
              href="/#contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: A }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d4a017")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = A)}
            >
              Get in Touch
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
