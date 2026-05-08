import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

const PillIcon = ({ color = "#F5B731" }: { color?: string }) => (
  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#1a1a1a]">
    <div className="h-5 w-5 rounded-full" style={{ backgroundColor: color }} />
  </div>
);

const SectionHeading = ({ label, title, accent }: { label: string; title: string; accent: string }) => (
  <div className="mb-10">
    <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5B731" }}>
      {label}
    </span>
    <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
      {title} <span style={{ color: "#F5B731" }}>{accent}</span>
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const YellowCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-[#F5B731]/30 bg-[#F5B731]/5 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

export const KudraCaseStudy = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Poppins']">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(245,183,49,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 80% 60%, rgba(245,183,49,0.06) 0%, transparent 60%), #0a0a0a",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 pt-24">
          <Link href="/">
            <button className="mb-10 flex items-center gap-2 text-[#F5B731] hover:text-white transition-colors font-['Poppins'] text-sm font-medium group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rounded-full border border-[#F5B731]/30 bg-[#F5B731]/10 px-4 py-1 text-xs font-semibold text-[#F5B731] tracking-widest uppercase">
                  SaaS Enterprise
                </span>
                <span className="text-white/30 text-xs">2024</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Kudra <span style={{ color: "#F5B731" }}>V2</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
                Fleet & Trip Management Platform — A complete product redesign transforming logistics operations through trip-centric workflows and real-time fleet intelligence.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Product Strategy", "UX Research", "Enterprise UI", "Fleet Management", "SaaS Design"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/figmaAssets/kudra-dashboard.png"
                  alt="Kudra V2 Dashboard"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "84", label: "Vehicles Tracked" },
              { value: "40%", label: "Reduced Manual Coordination" },
              { value: "9", label: "Core Workflows Designed" },
              { value: "6+", label: "Months Research & Design" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center">
                <div className="text-3xl font-bold" style={{ color: "#F5B731" }}>{s.value}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24 space-y-24">

        {/* Dashboard Preview (mobile) */}
        <div className="lg:hidden rounded-2xl overflow-hidden border border-white/10">
          <img src="/figmaAssets/kudra-dashboard.png" alt="Kudra V2 Dashboard" className="w-full h-auto block" />
        </div>

        {/* Project Overview */}
        <section>
          <SectionHeading label="Project Overview" title="What is" accent="Kudra V2?" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-semibold text-[#F5B731] mb-4">The Platform</h3>
              <p className="text-white/70 leading-relaxed">
                Kudra V2 is an enterprise fleet and trip management platform built for logistics operations. It evolved from a simple vehicle-tracking tool into a fully operational, trip-centric system that gives fleet managers, branch coordinators, and accounts teams a single source of truth for every moving vehicle in the network.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                The product unifies real-time tracking, structured trip workflows, fuel analytics, driver accountability, and branch communication into one coherent operational dashboard — eliminating the fragmented, call-heavy coordination that plagued traditional fleet operations.
              </p>
            </Card>
            <div className="flex flex-col gap-6">
              {[
                { label: "My Role", value: "Lead Product Designer & Product Owner — end-to-end from research to high-fidelity UI and design system" },
                { label: "Domain", value: "Enterprise Logistics SaaS — B2B fleet management for mid-to-large logistics operators" },
                { label: "Platform", value: "Web (desktop-first dashboard) with planned mobile companion for drivers" },
              ].map((item) => (
                <Card key={item.label} className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">{item.label}</span>
                  <span className="text-white/80 leading-relaxed">{item.value}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section>
          <SectionHeading label="Problem Statement" title="The Operational" accent="Crisis" />
          <YellowCard className="mb-8">
            <p className="text-lg text-white/80 leading-relaxed">
              Logistics operations were running on fragmented, informal systems. Fleet managers had zero structured visibility into trip status, fuel consumption, or driver behavior. Every piece of coordination happened through phone calls and WhatsApp groups — creating noise, errors, and total lack of accountability.
            </p>
          </YellowCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "No Trip Lifecycle", desc: "Trips had no structured start, ongoing, or completion states. Everything was verbal. There was no operational record." },
              { title: "Manual Coordination", desc: "Fleet managers made 20–40 calls per day to coordinate dispatches, check vehicle locations, and confirm deliveries." },
              { title: "Zero Fuel Tracking", desc: "Fuel expenses were recorded manually in spreadsheets — with no connection to mileage, vehicle, or trip data." },
              { title: "No Driver Accountability", desc: "There was no system to track driver halts, stoppages, or route deviations. Driver behavior was invisible." },
              { title: "Branch Blind Spots", desc: "Branch managers had no visibility into incoming vehicles, ETA, or active dispatches. Every update was reactive." },
              { title: "No Operational Data", desc: "With no centralized system, generating any report meant manually consolidating data from multiple sources over days." },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="w-8 h-1 rounded-full bg-[#F5B731] mb-4" />
                <h4 className="font-semibold text-white mb-2">{p.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Goals */}
        <section>
          <SectionHeading label="Business Goals" title="What We Were" accent="Solving For" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { goal: "Structured trip management", detail: "Create a defined trip lifecycle that every stakeholder could track in real-time." },
                { goal: "Reduce operational communication overhead", detail: "Cut coordination calls by embedding status visibility directly into the platform." },
                { goal: "Full fleet visibility", detail: "Live map view with vehicle status, location, and operational state for every asset." },
                { goal: "Driver and vehicle analytics", detail: "Build data models that surface driver efficiency, halt patterns, and vehicle health trends." },
                { goal: "Faster operational workflows", detail: "Reduce trip creation time from ~15 minutes (manual) to under 2 minutes in-platform." },
                { goal: "Branch coordination through announcements", detail: "Replace WhatsApp groups with a structured, in-platform announcement system for branch teams." },
              ].map((g, i) => (
                <div key={g.goal} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-2xl font-bold text-[#F5B731]/30 w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-semibold text-white text-sm">{g.goal}</div>
                    <div className="text-white/55 text-sm mt-1 leading-relaxed">{g.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <YellowCard className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-[#F5B731] mb-4">North Star Metric</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                The core product north star was <strong className="text-white">operational trip completion rate with zero manual intervention</strong> — measuring how many trips could be created, dispatched, monitored, and closed entirely within the platform.
              </p>
              <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-4">
                {[
                  { v: "Before", stat: "~5%", label: "trips fully managed in-platform" },
                  { v: "Target", stat: "80%+", label: "trips managed without external coordination" },
                ].map((m) => (
                  <div key={m.v} className="text-center">
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{m.v}</div>
                    <div className="text-3xl font-bold text-[#F5B731]">{m.stat}</div>
                    <div className="text-xs text-white/50 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </YellowCard>
          </div>
        </section>

        {/* User Research */}
        <section>
          <SectionHeading label="User Research" title="Understanding the" accent="People" />
          <p className="text-white/60 mb-8 max-w-2xl">
            We conducted structured interviews, field observations, and contextual inquiry sessions with four core user groups across three logistics operators over six weeks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                role: "Fleet Manager",
                icon: "🚛",
                painPoints: [
                  "Spent 3–4 hours daily on coordination calls",
                  "No single view of all active vehicles",
                  "Could not generate trip cost reports without manual effort",
                  "Driver misbehavior was impossible to track or prove",
                ],
                insight: "\"I need to know where every vehicle is, who's driving it, and whether the trip is on time — without making a single call.\"",
              },
              {
                role: "Branch Manager",
                icon: "🏢",
                painPoints: [
                  "Received no ETA updates until the truck arrived",
                  "No way to flag urgent announcements to fleet teams",
                  "Had to call the main office for every operational query",
                  "Could not plan dock capacity without arrival data",
                ],
                insight: "\"I need visibility into what's coming my way — ETA, vehicle number, driver contact — before the truck shows up.\"",
              },
              {
                role: "Accounts Team",
                icon: "📊",
                painPoints: [
                  "Fuel bills had no trip context or validation",
                  "Generating monthly fleet cost reports took 2–3 days",
                  "No way to reconcile fuel claimed vs. fuel actually consumed",
                  "Driver allowances were tracked in spreadsheets outside the system",
                ],
                insight: "\"Every report I generate is a fight against scattered data. I need the system to do the math for me.\"",
              },
              {
                role: "Driver",
                icon: "👤",
                painPoints: [
                  "Received trip instructions verbally — easy to misremember",
                  "Had to call dispatch every time they made a halt",
                  "No record of their own performance or trip history",
                  "Fuel log was a paper form that often got lost",
                ],
                insight: "\"I do my job, but there's no record of what I did right. Only calls when something goes wrong.\"",
              },
            ].map((u) => (
              <Card key={u.role}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{u.icon}</span>
                  <h3 className="text-lg font-bold text-white">{u.role}</h3>
                </div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Pain Points</h4>
                <ul className="space-y-2 mb-5">
                  {u.painPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="text-[#F5B731] mt-1 shrink-0">✦</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl bg-[#F5B731]/10 border border-[#F5B731]/20 p-4">
                  <p className="text-sm text-[#F5B731] italic leading-relaxed">{u.insight}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitive Analysis */}
        <section>
          <SectionHeading label="Competitive Analysis" title="Where Existing Tools" accent="Failed" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-sm font-semibold text-white/40 uppercase tracking-widest">Capability</th>
                  {["Manual Ops", "Basic GPS", "Fleet SaaS", "Kudra V2"].map((col) => (
                    <th key={col} className={`py-4 px-4 text-sm font-semibold uppercase tracking-widest text-center ${col === "Kudra V2" ? "text-[#F5B731]" : "text-white/40"}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cap: "Real-time vehicle tracking", vals: ["❌", "✅", "✅", "✅"] },
                  { cap: "Structured trip lifecycle", vals: ["❌", "❌", "⚠️ Partial", "✅"] },
                  { cap: "Fuel tracking & analytics", vals: ["❌", "❌", "⚠️ Partial", "✅"] },
                  { cap: "Driver halt management", vals: ["❌", "❌", "❌", "✅"] },
                  { cap: "Branch announcements", vals: ["❌", "❌", "❌", "✅"] },
                  { cap: "Operational dashboard", vals: ["❌", "⚠️ Basic", "✅", "✅"] },
                  { cap: "Frequent route suggestions", vals: ["❌", "❌", "❌", "✅"] },
                  { cap: "Integrated reports & analytics", vals: ["❌", "❌", "⚠️ Partial", "✅"] },
                ].map((row) => (
                  <tr key={row.cap} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 text-sm text-white/70">{row.cap}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className={`py-4 px-4 text-center text-sm ${i === 3 ? "text-[#F5B731] font-medium" : "text-white/60"}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Product Strategy */}
        <section>
          <SectionHeading label="Product Strategy" title="Why Trips Became the" accent="Core Unit" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Trip as the Atomic Unit", desc: "Every logistics action — fuel, driver, route, cost, time — exists in the context of a trip. Making the trip the central data object unified all operational data under one coherent structure." },
              { title: "Operational Transparency First", desc: "Before analytics, we focused on status visibility. Stakeholders needed to know what was happening right now — not just what happened last month. Real-time transparency reduces the need for coordination calls." },
              { title: "Integration-First Architecture", desc: "Rather than building isolated features, every module (fuel, drivers, vehicles, branches) connects back to trips. This means reports generate themselves from live operational data — no manual consolidation needed." },
            ].map((s) => (
              <YellowCard key={s.title}>
                <div className="w-8 h-1 rounded-full bg-[#F5B731] mb-4" />
                <h4 className="font-bold text-white mb-3">{s.title}</h4>
                <p className="text-white/65 text-sm leading-relaxed">{s.desc}</p>
              </YellowCard>
            ))}
          </div>
          <Card>
            <h3 className="text-lg font-semibold text-[#F5B731] mb-4">Strategic Pillars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { p: "Trip Lifecycle Thinking", d: "Define, track, and close every trip through structured states — Created → Dispatched → In Transit → Completed → Closed." },
                { p: "Analytics-Driven Optimization", d: "Surface fuel efficiency, driver performance, and route intelligence directly inside operational workflows — not in a separate reporting module." },
                { p: "Reduce Coordination Dependency", d: "Every feature was evaluated on whether it reduced a phone call. If a feature didn't cut communication, it needed rethinking." },
                { p: "Progressive Disclosure UX", d: "Show fleet managers what they need now; let them drill into details on demand. Dense data without hierarchy creates cognitive overload." },
              ].map((item) => (
                <div key={item.p} className="flex items-start gap-3">
                  <span className="text-[#F5B731] text-lg shrink-0 mt-0.5">→</span>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.p}</div>
                    <div className="text-white/55 text-sm mt-1 leading-relaxed">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Information Architecture */}
        <section>
          <SectionHeading label="Information Architecture" title="Platform" accent="Structure" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { module: "Dashboard", icon: "📊", desc: "Real-time fleet status, active trips, vehicle states, and operational KPIs." },
              { module: "Trip Management", icon: "🗺️", desc: "Create, dispatch, monitor, and close trips. Full lifecycle in one place." },
              { module: "Vehicle Management", icon: "🚛", desc: "Vehicle profiles, maintenance records, performance analytics, and status tracking." },
              { module: "Driver Management", icon: "👤", desc: "Driver profiles, trip history, halt logs, and efficiency scoring." },
              { module: "Reports & Analytics", icon: "📈", desc: "Fleet-wide reports on fuel, trips, vehicles, and drivers with export capability." },
              { module: "Frequent Routes", icon: "📍", desc: "AI-assisted route suggestions based on historical trip data to speed up trip creation." },
              { module: "Locations", icon: "🏢", desc: "Manage branch locations, hubs, and delivery points used in trip planning." },
              { module: "Announcements", icon: "📣", desc: "Structured branch-to-branch and ops-to-driver communication replacing WhatsApp groups." },
            ].map((m) => (
              <div key={m.module} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[#F5B731]/30 hover:bg-[#F5B731]/5 transition-all duration-200">
                <div className="text-2xl mb-3">{m.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{m.module}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Workflow */}
        <section>
          <SectionHeading label="Core Workflow" title="End-to-End" accent="Trip Lifecycle" />
          <div className="relative">
            <div className="hidden lg:block absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#F5B731] to-transparent" />
            <div className="space-y-4">
              {[
                { step: "01", title: "Trip Creation", desc: "Fleet manager creates a trip by selecting origin, destination, freight details, and vehicle type. The system auto-suggests frequent routes based on historical data — reducing creation time from 15 minutes to under 2." },
                { step: "02", title: "Vehicle & Driver Assignment", desc: "System surfaces available vehicles matching the required type and capacity. Driver assignment pulls from the active driver pool with availability status clearly displayed." },
                { step: "03", title: "Dispatch", desc: "One-click dispatch sends the trip brief to the assigned driver (SMS/app), notifies the origin branch, and updates the live dashboard. All stakeholders see the trip status change in real-time." },
                { step: "04", title: "Ongoing Monitoring", desc: "Fleet managers see the vehicle moving on the live map. Trip status progresses through checkpoints. Automated alerts trigger for extended halts, route deviations, or delayed ETAs." },
                { step: "05", title: "Fuel Tracking", desc: "Fuel entries can be logged against a trip by the driver or fleet manager, with amount, vendor, and odometer reading. The system calculates actual vs. expected fuel consumption per km." },
                { step: "06", title: "Driver Halt Tracking", desc: "The system logs every vehicle halt exceeding a threshold (5–10 minutes) against the trip. Fleet managers can view halt locations, durations, and patterns over time." },
                { step: "07", title: "Trip Completion", desc: "Upon arrival and delivery confirmation, the trip is marked complete. All attached data (fuel, halts, route, time, driver) is committed to the trip record." },
                { step: "08", title: "Financial Closure", desc: "Accounts team reviews the trip cost breakdown — fuel, driver allowances, toll, and freight charges — and approves financial closure without needing to contact anyone." },
                { step: "09", title: "Reports Generation", desc: "Trip data automatically feeds into fleet reports. Monthly summaries, driver efficiency scores, fuel analytics, and cost-per-km reports are generated with zero manual data entry." },
              ].map((w) => (
                <div key={w.step} className="relative flex items-start gap-6 lg:pl-16">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#F5B731] bg-[#0a0a0a] lg:absolute lg:left-0 lg:top-2">
                    <span className="text-xs font-bold text-[#F5B731]">{w.step}</span>
                  </div>
                  <Card className="flex-1">
                    <h4 className="font-bold text-white mb-2">{w.title}</h4>
                    <p className="text-white/65 text-sm leading-relaxed">{w.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Breakdown */}
        <section>
          <SectionHeading label="Feature Breakdown" title="Core" accent="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                feature: "Trip Lifecycle Management",
                icon: "🗺️",
                detail: "A structured state machine — Created, Dispatched, In Transit, Halted, Completed, Closed — gives every stakeholder clear visibility into where a trip stands without any manual communication.",
              },
              {
                feature: "Frequent Route Suggestions",
                icon: "📍",
                detail: "Machine-assisted route creation that learns from historical trip data. When a fleet manager starts a trip from a known origin, the system suggests the most common destination and freight type — reducing creation friction significantly.",
              },
              {
                feature: "Fuel Consumption Tracking",
                icon: "⛽",
                detail: "Trip-level fuel logging with automatic mileage calculation. Expected vs. actual fuel consumption is surfaced per trip and aggregated per vehicle — making fuel anomalies immediately visible to the accounts team.",
              },
              {
                feature: "Driver Halt Management",
                icon: "⏸️",
                detail: "Automated halt detection and logging with geolocation data. Fleet managers see halt frequency, duration, and patterns per driver — replacing guesswork with auditable data for driver reviews.",
              },
              {
                feature: "Branch Announcements",
                icon: "📣",
                detail: "Structured in-platform communication system for branch-to-branch and ops-to-field announcements. Replaces scattered WhatsApp chains with context-aware, timestamped operational messages.",
              },
              {
                feature: "Vehicle Performance Reports",
                icon: "📊",
                detail: "Per-vehicle analytics covering trip frequency, fuel efficiency, maintenance intervals, and downtime. Fleet managers can identify underperforming vehicles and proactively schedule maintenance.",
              },
            ].map((f) => (
              <Card key={f.feature} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5B731]/10 border border-[#F5B731]/20 flex items-center justify-center text-xl shrink-0">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-white">{f.feature}</h4>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">{f.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* UX Process */}
        <section>
          <SectionHeading label="UX Process" title="How We" accent="Designed It" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { phase: "Discovery & Research", desc: "6 weeks of field research across 3 logistics operators. Structured interviews with fleet managers, branch managers, accounts teams, and drivers. Contextual observation of daily dispatch routines." },
                { phase: "User Flow Mapping", desc: "End-to-end flow diagrams for every role — fleet manager trip creation, driver dispatch confirmation, branch arrival visibility, accounts financial closure. Each flow was validated against real user feedback." },
                { phase: "Wireframing & Low Fidelity", desc: "Paper and Figma wireframes for all 8 platform modules. 3 rounds of wireframe review with stakeholders before any visual design began. Focus was on information hierarchy and workflow clarity." },
                { phase: "Dashboard Structuring", desc: "Dashboard design went through 5 iterations. Key decisions: vehicle status tiles as the primary visual, live map above the fold, trip list with status filters, and no charts on the main dashboard — those belong in reports." },
                { phase: "Design System", desc: "Built a Kudra-specific design system with operational color semantics (green=moving, amber=halted, red=stopped, grey=inactive), consistent data table patterns, and mobile-ready components for future driver app expansion." },
                { phase: "Enterprise UX Considerations", desc: "Data density, keyboard navigation, quick-scan table design, and zero-latency perceived interactions were prioritized — this is a tool used under operational pressure, not a casual consumer app." },
              ].map((p) => (
                <div key={p.phase} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <PillIcon />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{p.phase}</h4>
                    <p className="text-white/55 text-sm mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <YellowCard>
                <h3 className="font-bold text-[#F5B731] mb-3">Key Design Decisions</h3>
                <div className="space-y-4">
                  {[
                    { d: "Trip-based workflows over vehicle-based", r: "Vehicles are assets. Trips are the unit of value. Organizing around trips naturally connects all operational data." },
                    { d: "Status visibility over input-heavy forms", r: "Fleet managers scan dashboards in seconds. Forms are secondary — status tiles and trip lists must communicate state at a glance." },
                    { d: "Analytics embedded in workflows", r: "Insights are most useful at the decision point — inside trip creation, driver assignment, and vehicle selection — not in a separate analytics module opened after the fact." },
                    { d: "Notifications as coordination replacers", r: "Every notification was designed to eliminate a specific type of coordination call. If a notification doesn't prevent a call, it's noise." },
                  ].map((item) => (
                    <div key={item.d} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                      <div className="font-medium text-white text-sm">{item.d}</div>
                      <div className="text-white/55 text-sm mt-1">{item.r}</div>
                    </div>
                  ))}
                </div>
              </YellowCard>
            </div>
          </div>
        </section>

        {/* Metrics & Outcomes */}
        <section>
          <SectionHeading label="Metrics & Outcomes" title="Measurable" accent="Impact" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { metric: "40%", label: "Reduction in manual coordination calls", desc: "Fleet managers reported a 40% drop in daily coordination call volume within 8 weeks of platform adoption." },
              { metric: "78%", label: "Faster trip creation", desc: "Average trip creation time dropped from ~15 minutes to under 3 minutes using frequent route suggestions and pre-filled driver data." },
              { metric: "100%", label: "Trip cost visibility", desc: "All trips now have a complete cost record — fuel, driver allowances, toll — available without any manual data consolidation." },
              { metric: "60%", label: "Reduction in reporting effort", desc: "Monthly fleet reports now generate automatically from live trip data. What took 2–3 days of manual work now takes minutes." },
              { metric: "3×", label: "Increase in fleet accountability", desc: "Driver halt tracking and fuel analytics created a measurable accountability framework that didn't exist before." },
              { metric: "84", label: "Vehicles actively tracked", desc: "Full fleet of 84 vehicles across multiple branches now tracked under a single operational system." },
            ].map((m) => (
              <div key={m.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-bold text-[#F5B731] mb-2">{m.metric}</div>
                <div className="font-semibold text-white text-sm mb-2">{m.label}</div>
                <div className="text-white/50 text-xs leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section>
          <SectionHeading label="Challenges" title="What Made This" accent="Hard" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                ch: "Complex Logistics Workflows",
                detail: "Logistics operations are non-linear. Vehicles stop unexpectedly, trips get rerouted, drivers swap mid-journey. The platform needed to handle edge cases gracefully without turning the UI into a complex decision tree.",
                solution: "Designed flexible trip states with override capabilities, and built exception handling directly into the workflow rather than as post-hoc fixes.",
              },
              {
                ch: "Multiple Stakeholder Needs",
                detail: "Fleet managers, branch managers, and accounts teams have fundamentally different information needs from the same data. One dashboard could not serve all roles.",
                solution: "Implemented role-based views with shared underlying data — same trip record, different UI surfaces depending on who's looking.",
              },
              {
                ch: "Data-Heavy Enterprise UX",
                detail: "The platform handles hundreds of data points per trip. Traditional enterprise UIs make this data inaccessible through poor hierarchy and information overload.",
                solution: "Applied progressive disclosure systematically — overview first, details on demand — with careful attention to table density, contrast, and scanning patterns.",
              },
              {
                ch: "Balancing Simplicity with Functionality",
                detail: "Every powerful feature added cognitive load. The risk was building a system so complex that field staff couldn't use it under operational pressure.",
                solution: "Every feature was evaluated with a '3-second rule' — if a fleet manager couldn't understand the current state of a trip in 3 seconds, the design went back to wireframes.",
              },
            ].map((c) => (
              <Card key={c.ch}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-1 rounded-full bg-red-500/60 mt-3 shrink-0" />
                  <h4 className="font-bold text-white">{c.ch}</h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{c.detail}</p>
                <div className="rounded-xl bg-[#F5B731]/10 border border-[#F5B731]/20 p-4">
                  <span className="text-xs font-semibold text-[#F5B731] uppercase tracking-widest">Resolution</span>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{c.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Scope */}
        <section>
          <SectionHeading label="Future Scope" title="What Comes" accent="Next" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Multi-Stop Trip Planning", icon: "🛣️", desc: "Support complex trips with multiple waypoints, intermediate pickups, and sequential delivery confirmations." },
              { title: "Predictive Fuel Analytics", icon: "⛽", desc: "ML-driven fuel consumption forecasting based on route, vehicle age, load weight, and driver behavior patterns." },
              { title: "Route Optimization Engine", icon: "🗺️", desc: "AI-powered routing that suggests optimal paths based on traffic, distance, fuel efficiency, and historical trip data." },
              { title: "Driver Mobile Application", icon: "📱", desc: "Companion app for drivers enabling trip confirmation, halt logging, fuel entry, and delivery confirmation from the field." },
              { title: "Automated Dispatch Planning", icon: "🤖", desc: "AI-assisted dispatch that matches available vehicles and drivers to incoming trip requests based on capacity, location, and priority." },
              { title: "Fleet Intelligence Reports", icon: "📊", desc: "Executive-level fleet intelligence dashboards with trend analysis, predictive maintenance alerts, and cost optimization recommendations." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#F5B731]/30 transition-all duration-200">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{f.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section>
          <SectionHeading label="Deliverables" title="What Was" accent="Produced" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { d: "Product Strategy", icon: "🎯" },
              { d: "UX Research Report", icon: "📋" },
              { d: "User Flow Diagrams", icon: "🔀" },
              { d: "Wireframes (Lo-Fi)", icon: "📐" },
              { d: "High Fidelity UI", icon: "🎨" },
              { d: "Design System", icon: "🧩" },
              { d: "Dashboard UX", icon: "📊" },
              { d: "Operational Workflows", icon: "⚙️" },
              { d: "Analytics Design", icon: "📈" },
              { d: "Component Library", icon: "🗂️" },
            ].map((item) => (
              <div key={item.d} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center hover:border-[#F5B731]/30 transition-all duration-200">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-white/65 leading-relaxed">{item.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard showcase (full width) */}
        <section>
          <SectionHeading label="Final Design" title="Live" accent="Dashboard" />
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/figmaAssets/kudra-dashboard.png"
              alt="Kudra V2 — Live Fleet Dashboard"
              className="w-full h-auto block"
            />
          </div>
          <p className="text-center text-white/40 text-sm mt-4">
            Kudra V2 — Live Fleet Operations Dashboard. 84 vehicles, real-time status tiles, and live map tracking.
          </p>
        </section>

        {/* Back CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-[#F5B731]/20 bg-[#F5B731]/5 p-8 md:p-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Like what you see?
            </h3>
            <p className="text-white/60">
              Let's discuss how I can bring the same product thinking to your next project.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link href="/">
              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-[#F5B731]/50 transition-colors">
                Back to Portfolio
              </button>
            </Link>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); window.location.href = "/#contact"; }}
              className="rounded-full bg-[#F5B731] px-6 py-3 text-sm font-semibold text-black hover:bg-[#d4a017] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
