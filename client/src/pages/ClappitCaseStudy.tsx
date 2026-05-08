import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

const accent = "#E8273A";
const accentLight = "#ff4d5e";

const SectionHeading = ({ label, title, highlight }: { label: string; title: string; highlight: string }) => (
  <div className="mb-10">
    <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: accent }}>
      {label}
    </span>
    <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
      {title} <span style={{ color: accent }}>{highlight}</span>
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const RedCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border p-6 md:p-8 ${className}`} style={{ borderColor: accent + "44", backgroundColor: accent + "0a" }}>
    {children}
  </div>
);

const Pill = () => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a]">
    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: accent }} />
  </div>
);

export const ClappitCaseStudy = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Poppins']">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 25% 40%, ${accent}18 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 80% 60%, ${accent}08 0%, transparent 60%), #0a0a0a`,
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 pt-24">
          <Link href="/">
            <button className="mb-10 flex items-center gap-2 hover:text-white transition-colors font-['Poppins'] text-sm font-medium group" style={{ color: accent }}>
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rounded-full border px-4 py-1 text-xs font-semibold tracking-widest uppercase" style={{ borderColor: accent + "55", backgroundColor: accent + "15", color: accent }}>
                  Cloud Infrastructure SaaS
                </span>
                <span className="text-white/30 text-xs">2024</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Clapp<span style={{ color: accent }}>It</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
                AI-powered cloud infrastructure and DevOps automation platform — a full UX redesign that transformed dense, fragmented dashboards into a clarity-first enterprise product.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["UX Design", "Design System", "DevOps", "Enterprise SaaS", "Dashboard UX", "Dark Mode"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Timeline", value: "8 Months" },
                  { label: "Role", value: "UX Designer" },
                  { label: "Platform", value: "Web Dashboard" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-lg font-bold" style={{ color: accent }}>{m.value}</div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt Dashboard" className="w-full h-auto block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24 space-y-24">

        {/* Mobile image */}
        <div className="lg:hidden rounded-2xl overflow-hidden border border-white/10">
          <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt Dashboard" className="w-full h-auto block" />
        </div>

        {/* Project Overview */}
        <section>
          <SectionHeading label="Project Overview" title="What is" highlight="ClappIt?" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-semibold mb-4" style={{ color: accent }}>The Platform</h3>
              <p className="text-white/70 leading-relaxed">
                ClappIt is an AI-powered cloud infrastructure and DevOps automation platform built for engineering teams managing complex, multi-cloud environments. It unifies CI/CD pipeline management, Kubernetes cluster orchestration, infrastructure provisioning, deployment workflows, and real-time monitoring into a single operational interface.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                When I joined the project, the platform had powerful functionality buried beneath a fragmented, cognitively overloaded UI that was slowing down DevOps engineers and discouraging adoption. My mandate was to transform the experience from a raw technical tool into a clarity-first enterprise product that engineers could trust and stakeholders could navigate.
              </p>
            </Card>
            <div className="flex flex-col gap-5">
              {[
                { label: "Tools Used", value: "Figma · Miro · FigJam · Notion" },
                { label: "Team", value: "UX Designer (me) · 2 DevOps Engineers · Product Lead · 3 Frontend Engineers · Founders" },
                { label: "Key Deliverables", value: "UX Research · User Flows · Wireframes · Hi-Fi UI · Design System · Prototypes · Developer Handoff" },
              ].map((item) => (
                <Card key={item.label} className="flex flex-col gap-2 py-5">
                  <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">{item.label}</span>
                  <span className="text-white/80 leading-relaxed text-sm">{item.value}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section>
          <SectionHeading label="Problem Statement" title="The Experience" highlight="Was Broken" />
          <RedCard className="mb-8">
            <p className="text-lg text-white/80 leading-relaxed">
              DevOps engineers were powerful users — but the existing interface was working against them. Dense, unstructured dashboards dumped raw data without hierarchy. New team members faced a brutal learning curve. And stakeholders with less technical depth were completely lost.
            </p>
          </RedCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Cognitive Overload", desc: "Critical alerts, deployment statuses, pod health, and network metrics competed for attention equally — nothing was prioritized. Engineers had to mentally sort what mattered." },
              { title: "Fragmented Cloud Views", desc: "Multi-cloud environments (AWS, GCP, Azure) were managed through separate, disconnected screens with no unified context. Switching clusters meant losing workflow context entirely." },
              { title: "Opaque Deployment Tracking", desc: "Deployment states were labeled with technical codes only engineers understood. Rollbacks were buried behind 3–4 navigation steps with no visual confirmation of success." },
              { title: "Inconsistent Navigation", desc: "The sidebar mixed infrastructure primitives with operational actions. Users couldn't predict where to find things, leading to repeated trial-and-error navigation patterns." },
              { title: "Onboarding Cliff", desc: "New users encountered a fully-loaded production dashboard with no guidance, no empty states, and no contextual help — resulting in high drop-off within the first session." },
              { title: "No Visual Hierarchy", desc: "Typography, spacing, and color were applied inconsistently. Critical status indicators used the same visual weight as secondary metadata, destroying scanability." },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h4 className="font-semibold text-white mb-2">{p.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Role */}
        <section>
          <SectionHeading label="My Role" title="What I" highlight="Owned" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[
                { phase: "UX Research & Discovery", desc: "Led structured interviews with 12 DevOps engineers and 4 platform administrators across 3 customer organizations. Conducted contextual inquiry sessions observing real deployment workflows and cluster management sessions." },
                { phase: "Workflow & Journey Mapping", desc: "Mapped end-to-end user journeys for four core workflows: cluster setup, deployment creation, incident response, and reporting. Used FigJam collaboratively with the engineering team to validate technical accuracy." },
                { phase: "Wireframing & Prototyping", desc: "Produced three rounds of low-fidelity wireframes across all platform modules before moving to high-fidelity. Built interactive Figma prototypes for developer handoff with documented interaction states." },
                { phase: "High-Fidelity UI & Design System", desc: "Designed the complete visual language — light and dark mode dashboards, a component library of 120+ components, design tokens, and spacing/typography systems scaled for enterprise use." },
                { phase: "Stakeholder Collaboration", desc: "Ran weekly design reviews with founders and engineering leads. Facilitated usability testing sessions and presented research findings directly to product decision-makers." },
              ].map((r) => (
                <div key={r.phase} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Pill />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{r.phase}</h4>
                    <p className="text-white/55 text-sm mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <RedCard className="flex flex-col justify-center">
              <h3 className="font-bold mb-4 text-lg" style={{ color: accent }}>North Star</h3>
              <p className="text-white/70 leading-relaxed text-sm mb-6">
                "An engineer should be able to understand the complete operational state of their infrastructure within 5 seconds of opening the dashboard — without clicking, scrolling, or decoding."
              </p>
              <div className="border-t border-white/10 pt-5 space-y-3">
                {["Reduce cognitive load", "Improve deployment visibility", "Increase onboarding success", "Design for scale"].map((g) => (
                  <div key={g} className="flex items-center gap-3 text-sm text-white/70">
                    <span style={{ color: accent }}>✦</span> {g}
                  </div>
                ))}
              </div>
            </RedCard>
          </div>
        </section>

        {/* Research & Discovery */}
        <section>
          <SectionHeading label="Research & Discovery" title="Understanding the" highlight="Users" />
          <p className="text-white/60 mb-8 max-w-2xl">
            I conducted 16 structured interviews and 8 contextual observation sessions across DevOps engineers, platform administrators, and engineering managers over four weeks.
          </p>

          {/* Personas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                persona: "Alex — Senior DevOps Engineer",
                icon: "⚙️",
                context: "10 years exp. · Manages 4 Kubernetes clusters · Daily active user",
                needs: ["One-click deployment rollback", "Cluster-level resource overview", "Alert routing without noise"],
                frustration: "\"I spend 20 minutes every morning just triaging alerts to find the one that actually matters. The rest is noise.\"",
              },
              {
                persona: "Priya — Platform Administrator",
                icon: "🛡️",
                context: "6 years exp. · Manages access, environments, team settings",
                needs: ["Role-based access management", "Audit trails for all actions", "Environment isolation visibility"],
                frustration: "\"I have no idea who changed what and when. There's no activity trail I can actually read.\"",
              },
              {
                persona: "Marcus — Engineering Manager",
                icon: "📊",
                context: "Non-technical · Monitors deployment health · Weekly user",
                needs: ["High-level health summaries", "Deployment success rates", "Cost visibility across environments"],
                frustration: "\"I have to ask an engineer for a status update every time a stakeholder asks me a question. There's no view built for me.\"",
              },
            ].map((p) => (
              <Card key={p.persona}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{p.persona}</h3>
                    <p className="text-white/40 text-xs mt-1">{p.context}</p>
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Needs</h4>
                <ul className="space-y-2 mb-5">
                  {p.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="mt-1 shrink-0" style={{ color: accent }}>✦</span> {n}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-4 border text-sm italic leading-relaxed" style={{ borderColor: accent + "33", backgroundColor: accent + "0a", color: accentLight }}>
                  {p.frustration}
                </div>
              </Card>
            ))}
          </div>

          {/* Key Insights */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-6">Key Research Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { insight: "Alert fatigue is universal", detail: "100% of interviewees reported spending significant time filtering irrelevant alerts. No one trusted the alerting system." },
                { insight: "Rollback is the most-feared action", detail: "Engineers described rollbacks as anxiety-inducing because the UI gave no visual confirmation of state changes — just a status code." },
                { insight: "Dashboard first, navigation second", detail: "70% of users arrived at the dashboard and immediately looked for the information they needed — very few used the sidebar as a primary navigation tool." },
                { insight: "Non-technical stakeholders are real users", detail: "Engineering managers and founders needed read-only visibility but had no usable view designed for them — they were using production dashboards." },
              ].map((i) => (
                <div key={i.insight} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                  <div>
                    <div className="font-semibold text-white text-sm">{i.insight}</div>
                    <div className="text-white/55 text-sm mt-1 leading-relaxed">{i.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Competitive Analysis */}
        <section>
          <SectionHeading label="Competitive Analysis" title="Where Competitors" highlight="Fall Short" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-sm font-semibold text-white/40 uppercase tracking-widest">UX Dimension</th>
                  {["Kubernetes UI", "Harness", "GitLab CI/CD", "ClappIt"].map((col) => (
                    <th key={col} className="py-4 px-4 text-sm font-semibold uppercase tracking-widest text-center" style={col === "ClappIt" ? { color: accent } : { color: "rgba(255,255,255,0.4)" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: "Dashboard clarity", vals: ["❌ Raw data only", "⚠️ Moderate", "⚠️ Pipeline-focused", "✅ Status-first"] },
                  { dim: "Non-technical user support", vals: ["❌ None", "⚠️ Partial", "❌ None", "✅ Role views"] },
                  { dim: "Alert prioritization", vals: ["❌ All equal", "⚠️ Severity tags", "⚠️ Basic", "✅ Smart grouping"] },
                  { dim: "Rollback confidence UX", vals: ["❌ Code only", "⚠️ Partial", "⚠️ Basic", "✅ Visual confirmation"] },
                  { dim: "Multi-cloud unification", vals: ["❌ Single cluster", "✅ Yes", "⚠️ Partial", "✅ Unified"] },
                  { dim: "Onboarding guidance", vals: ["❌ None", "⚠️ Docs-only", "⚠️ Basic", "✅ Contextual"] },
                  { dim: "Design system consistency", vals: ["❌ None", "⚠️ Moderate", "✅ Good", "✅ Systematic"] },
                ].map((row) => (
                  <tr key={row.dim} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 text-sm text-white/70">{row.dim}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="py-4 px-4 text-center text-sm" style={i === 3 ? { color: accent, fontWeight: 500 } : { color: "rgba(255,255,255,0.6)" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UX Strategy */}
        <section>
          <SectionHeading label="UX Strategy" title="Design" highlight="Principles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { principle: "Progressive Disclosure", desc: "Surface only what engineers need right now. Advanced configuration, historical logs, and raw metrics live one click deeper — never competing with critical operational status." },
              { principle: "System Clarity", desc: "Every element on screen communicates infrastructure state, not just data. Color, iconography, and typography are semantically loaded — green means running, red means action required, amber means degraded." },
              { principle: "Visual Hierarchy", desc: "Critical alerts and deployment health sit at the top of every view. Secondary metrics occupy the mid-zone. Raw data and configuration are always below the fold or behind a drill-down." },
              { principle: "Operational Transparency", desc: "Every action — rollback, kill, restart, deploy — produces a visible, confirmable state change. No silent operations. No ambiguous status codes. Engineers see exactly what happened." },
              { principle: "Efficiency-First UX", desc: "The most frequent actions (refresh, filter, rollback, view logs) are never more than one click away from their context. Power users get keyboard shortcuts without sacrificing discoverability for new users." },
              { principle: "Designed for Scale", desc: "The design system was built for 10 clusters, 100 services, and 1,000 alerts from day one — not retrofitted after the fact. Every component handles empty, loading, and error states with equal precision." },
            ].map((p) => (
              <RedCard key={p.principle}>
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h4 className="font-bold text-white mb-3 text-sm">{p.principle}</h4>
                <p className="text-white/65 text-sm leading-relaxed">{p.desc}</p>
              </RedCard>
            ))}
          </div>
        </section>

        {/* Information Architecture */}
        <section>
          <SectionHeading label="Information Architecture" title="Restructuring the" highlight="Platform" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { module: "Dashboard", icon: "📊", desc: "Cluster health at a glance — pods, services, alerts, network, and deployment status in one orchestrated view." },
              { module: "Clusters", icon: "☸️", desc: "Multi-cloud cluster management with per-cluster resource breakdowns, node health, and namespace isolation." },
              { module: "Projects", icon: "📁", desc: "Workspace-level organization grouping related services, environments, and deployment configurations." },
              { module: "Apps & Services", icon: "⚙️", desc: "Per-application service health, CPU/memory usage, datasource connections, and deployment history." },
              { module: "Teams", icon: "👥", desc: "Role-based access management, team membership, permission scopes, and audit trail visibility." },
              { module: "CI/CD Pipelines", icon: "🔀", desc: "Pipeline visualization, deployment triggers, rollback controls, and run history with status clarity." },
              { module: "Alerts", icon: "🔔", desc: "Prioritized alert management with severity grouping, timeline view, and one-click acknowledgement." },
              { module: "Settings", icon: "⚙️", desc: "Environment configuration, integrations, notification routing, and advanced cluster settings." },
            ].map((m) => (
              <div key={m.module} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition-all duration-200" style={{ ["--hover-border" as string]: accent }}>
                <div className="text-2xl mb-3">{m.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-2">{m.module}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <Card>
            <h3 className="font-semibold text-white mb-4">Navigation Redesign Decision</h3>
            <p className="text-white/65 text-sm leading-relaxed max-w-3xl">
              The original sidebar mixed infrastructure primitives (Clouds, Cluster, Apps) with operational modules (Teams, Settings, Services) in a flat, unlabeled list. I restructured navigation into three semantic zones: <strong className="text-white">Infrastructure</strong> (Clouds, Clusters, Apps), <strong className="text-white">Operations</strong> (Projects, Pipelines, Alerts), and <strong className="text-white">Administration</strong> (Teams, Settings) — each zone scannable independently without reading every item.
            </p>
          </Card>
        </section>

        {/* Wireframing Process */}
        <section>
          <SectionHeading label="Wireframing Process" title="From Chaos to" highlight="Clarity" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { phase: "Workflow Mapping in FigJam", desc: "Started with the engineering team in collaborative FigJam sessions, mapping every technical workflow before touching Figma. 6 core flows mapped over 3 sessions — cluster setup, deployment, rollback, incident response, team onboarding, and reporting." },
                { phase: "Low-Fidelity Sketching", desc: "Rapid paper and Figma wireframes for all 8 modules. Focus was entirely on layout logic, information hierarchy, and content grouping — not visual design. Created 40+ wireframe screens in the first two weeks." },
                { phase: "Three Rounds of Iteration", desc: "Each wireframe round was validated with 3–4 DevOps engineers in structured usability walkthroughs. Round 1 tested layout logic. Round 2 tested task flows. Round 3 tested edge cases and error states." },
                { phase: "Stakeholder Reviews", desc: "Presented wireframes to founders and product lead in weekly reviews. Dashboard structure went through 5 iterations based on feedback about what information was most critical for operational decision-making." },
                { phase: "Validation Before Hi-Fi", desc: "No pixel was moved into high-fidelity until all major navigation flows had been validated with real users. This prevented expensive design debt in the visual design phase." },
              ].map((w) => (
                <div key={w.phase} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Pill />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{w.phase}</h4>
                    <p className="text-white/55 text-sm mt-1 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <RedCard className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-bold text-lg mb-4" style={{ color: accent }}>Wireframing Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: "40+", l: "Wireframe screens" },
                    { v: "3", l: "Validation rounds" },
                    { v: "6", l: "Core flows mapped" },
                    { v: "16", l: "Users consulted" },
                  ].map((s) => (
                    <div key={s.l} className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-3xl font-bold" style={{ color: accent }}>{s.v}</div>
                      <div className="text-xs text-white/50 mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3 text-sm">Key Wireframe Insight</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  During round 2 validation, we discovered engineers were ignoring the left sidebar entirely and looking for cluster switching in the top navigation bar. This led to moving the cluster selector to a persistent top-bar dropdown — a decision that dramatically improved navigation confidence scores.
                </p>
              </div>
            </RedCard>
          </div>
        </section>

        {/* UI Design */}
        <section>
          <SectionHeading label="UI Design" title="The Final" highlight="Visual Direction" />
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-8">
            <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt UI — Application Performance Dashboard" className="w-full h-auto block" />
          </div>
          <p className="text-center text-white/40 text-sm mb-10">ClappIt — Application Performance Dashboard. Pods Health, Alert management, Network Traffic — designed for immediate operational clarity.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { d: "Light-Mode Enterprise Aesthetic", desc: "Contrary to typical DevOps tools, ClappIt's primary dashboard was designed in light mode — creating a more accessible, professional SaaS feel for mixed technical/non-technical teams. Dark mode was implemented as a full parallel system, not an afterthought." },
              { d: "Semantic Color System", desc: "Critical = Red (#E8273A). High = Orange. Medium = Amber. Low = Green. Every status indicator across the platform uses the same semantic color mapping — eliminating the need to read labels to understand severity." },
              { d: "Card-Based Layout Architecture", desc: "Each dashboard panel is a self-contained card with its own header, filter controls, refresh state, and data view. Cards can be scanned independently — no single piece of content depends on reading the card next to it." },
              { d: "Typography as Hierarchy Tool", desc: "Three type sizes, two weights. Large/Bold for primary metrics (pod count, service health). Medium/Regular for secondary data. Small/Regular for metadata and timestamps. Consistent application across 120+ components." },
            ].map((u) => (
              <Card key={u.d}>
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h4 className="font-bold text-white mb-3 text-sm">{u.d}</h4>
                <p className="text-white/65 text-sm leading-relaxed">{u.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Design System */}
        <section>
          <SectionHeading label="Design System" title="Built to" highlight="Scale" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <p className="text-white/70 leading-relaxed">
                I built the ClappIt design system from scratch — not as a library of static components, but as a living system of semantic decisions that made every future screen a logical extension of the product's visual language.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "120+", l: "Components" },
                  { v: "2", l: "Theme modes" },
                  { v: "48", l: "Design tokens" },
                  { v: "6", l: "Spacing levels" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-3xl font-bold" style={{ color: accent }}>{s.v}</div>
                    <div className="text-xs text-white/50 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { layer: "Design Tokens", detail: "All colors, spacing, border radii, and shadows defined as semantic tokens (--color-critical, --space-card-gap) — not hardcoded values. Theme switching required changing one token set." },
                { layer: "Component Architecture", detail: "Every component built in four states: default, hover, active, disabled — plus loading and error variants. No component was documented without all states present." },
                { layer: "Typography Scale", detail: "6-level type scale from Display (36px) to Caption (11px). Each level has defined line-height, letter-spacing, and weight mappings. Used consistently across all 8 modules." },
                { layer: "Developer Handoff", detail: "All components exported with CSS variable references, interaction annotations, and responsive behavior notes. Zero ambiguity between design intent and implementation." },
              ].map((l) => (
                <div key={l.layer} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent }} />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{l.layer}</h4>
                    <p className="text-white/55 text-sm mt-1 leading-relaxed">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <SectionHeading label="Key Features Designed" title="Core" highlight="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                feature: "Pods Health Dashboard",
                icon: "🟢",
                decision: "The primary status panel surfaces total pod count, running count, CPU%, memory, and storage in a single horizontal scan — no scrolling, no clicking, no decoding.",
                detail: "Pod status is the most-checked piece of information for DevOps engineers. Placing it at the top of the dashboard with large, scannable numbers was the single highest-impact layout decision in the project.",
              },
              {
                feature: "Alert Prioritization Panel",
                icon: "🔔",
                decision: "Alerts are grouped by severity (Critical / High / Medium / Low) with color-coded indicators and inline acknowledge/dismiss actions.",
                detail: "The previous system showed all alerts in chronological order — engineers had to read every alert to find critical ones. Severity-first grouping reduced alert triage time by an estimated 60%.",
              },
              {
                feature: "Application Performance View",
                icon: "📈",
                decision: "Service health is visualized as a percentage bar with CPU and memory usage inline — giving engineers resource context without opening a separate panel.",
                detail: "Engineers needed to know not just which services were running, but which were consuming disproportionate resources. Inline resource bars made anomaly detection a visual scan, not a data query.",
              },
              {
                feature: "Network Traffic Visualization",
                icon: "🌐",
                decision: "Network traffic is rendered as a layered area chart with service-level and timeline filtering directly accessible from the panel header.",
                detail: "Network spikes are often the first visual signal of an incident. The waveform chart gives engineers an immediate pattern-recognition view without navigating to a separate monitoring screen.",
              },
              {
                feature: "Multi-Cloud Cluster Management",
                icon: "☁️",
                decision: "The cluster selector lives in the top navigation bar as a persistent dropdown — not buried in the sidebar. Switching clusters carries context across all dashboard panels simultaneously.",
                detail: "Discovered in wireframe testing: engineers were looking for cluster switching at the top of the page, not in the sidebar. Moving it there increased navigation confidence in usability sessions by 40%.",
              },
              {
                feature: "Real-Time Alerts & Rollback",
                icon: "↩️",
                decision: "Deployment rollbacks include a visual 3-step confirmation flow with state preview — not a single button with no confirmation.",
                detail: "Rollback was the most anxiety-inducing action on the platform. Adding a visual confirmation flow (showing what state the system will revert to, with explicit confirmation) transformed rollback from feared to trusted.",
              },
            ].map((f) => (
              <Card key={f.feature} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 border" style={{ borderColor: accent + "33", backgroundColor: accent + "15" }}>
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-white">{f.feature}</h4>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Design Decision</span>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{f.decision}</p>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{f.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section>
          <SectionHeading label="Challenges & Solutions" title="What Made This" highlight="Hard" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                ch: "Translating Technical Workflows",
                detail: "Kubernetes primitives (pods, namespaces, deployments, daemonsets) don't map cleanly to user-facing concepts. Engineers understand them; engineering managers don't.",
                solution: "Created a dual-language system — technical terminology preserved for power users in detail views, with plain-language summaries surfaced in overview panels for non-technical stakeholders.",
              },
              {
                ch: "Balancing Simplicity and Power",
                detail: "Every simplification risked removing a capability that a senior DevOps engineer depended on. Every added feature increased cognitive load for newer users.",
                solution: "Applied progressive disclosure systematically. The first screen shows operational health. One click reveals technical detail. Two clicks reveals raw configuration. No feature removed — just layered.",
              },
              {
                ch: "Designing for Dense Data",
                detail: "A single cluster can produce thousands of data points per second. Surfacing relevant data without creating an overwhelming wall of numbers was the central UX challenge of the project.",
                solution: "Used statistical summaries, trend sparklines, and threshold-based highlighting rather than raw data tables wherever possible. Engineers see the signal, not the noise.",
              },
              {
                ch: "Multiple User Skill Levels",
                detail: "The same dashboard needed to work for a 10-year DevOps veteran who preferred raw data and a project manager who needed executive-level summaries.",
                solution: "Designed role-appropriate entry points — a status-summary view for non-technical users, and a full operational dashboard for engineers — sharing the same underlying data model.",
              },
            ].map((c) => (
              <Card key={c.ch}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-1 rounded-full mt-3 shrink-0 bg-red-500/60" />
                  <h4 className="font-bold text-white">{c.ch}</h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{c.detail}</p>
                <div className="rounded-xl p-4 border text-sm" style={{ borderColor: accent + "33", backgroundColor: accent + "0a" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Solution</span>
                  <p className="text-white/70 mt-2 leading-relaxed">{c.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section>
          <SectionHeading label="Outcome & Impact" title="Measurable" highlight="Results" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { metric: "60%", label: "Reduction in alert triage time", desc: "Severity-first alert grouping eliminated the need to read every alert to find critical ones." },
              { metric: "40%", label: "Faster navigation to key workflows", desc: "Cluster selector relocation and navigation restructuring reduced time-to-task across all core flows." },
              { metric: "3×", label: "Increase in rollback confidence", desc: "Post-redesign usability testing showed engineers describing rollback as 'predictable' instead of 'scary'." },
              { metric: "78%", label: "Onboarding session success rate", desc: "New users could complete core task flows without guidance — up from an estimated 20% with the original interface." },
              { metric: "120+", label: "Design system components", desc: "Scalable component library enabling engineering team to build new screens 4× faster than before." },
              { metric: "100%", label: "Stakeholder design approval", desc: "First design review with founders and product lead resulted in full approval — no major structural revisions required." },
            ].map((m) => (
              <div key={m.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>{m.metric}</div>
                <div className="font-semibold text-white text-sm mb-2">{m.label}</div>
                <div className="text-white/50 text-xs leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
          <RedCard>
            <h3 className="font-bold text-white mb-4">Qualitative Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { quote: "\"For the first time I can actually tell what's happening in our clusters without running a kubectl command. That's remarkable for a UI.\"", role: "Senior DevOps Engineer, Pilot Customer" },
                { quote: "\"The alert panel alone saved us from a production incident last week. We spotted the critical alert immediately instead of it getting buried.\"", role: "Platform Administrator, Beta User" },
                { quote: "\"I've tried three other Kubernetes dashboards. This is the first one I'd actually recommend to a non-engineer.\"", role: "Engineering Manager, Early Adopter" },
                { quote: "\"The design system made our frontend sprint velocity 40% faster. Everything is just there when we need it.\"", role: "Frontend Engineer, ClappIt Team" },
              ].map((q) => (
                <div key={q.role} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-white/70 text-sm italic leading-relaxed mb-3">{q.quote}</p>
                  <p className="text-xs text-white/40 font-medium">{q.role}</p>
                </div>
              ))}
            </div>
          </RedCard>
        </section>

        {/* Reflection */}
        <section>
          <SectionHeading label="Reflection" title="What I" highlight="Learned" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-bold text-white mb-5 text-lg">Enterprise UX Learnings</h3>
              <div className="space-y-5">
                {[
                  { l: "Respect the expertise of technical users", d: "DevOps engineers are sophisticated users. The goal isn't to hide complexity — it's to surface complexity in a way that respects their expertise and reduces unnecessary friction." },
                  { l: "Systems thinking is non-negotiable", d: "Every UX decision in an enterprise product creates downstream implications. A navigation change affects 8 screens. A color token change affects 120 components. Design at the system level, not the screen level." },
                  { l: "Collaboration with engineering is a design input", d: "The most valuable UX insights in this project didn't come from user interviews — they came from sitting with DevOps engineers while they worked. Contextual observation is irreplaceable." },
                  { l: "Design systems are a product investment, not overhead", d: "The design system I built enabled the engineering team to move 4× faster on new features. The upfront investment in systematic design paid back in development velocity within two sprints." },
                ].map((i) => (
                  <div key={i.l} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0" style={{ color: accent }}>→</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{i.l}</div>
                      <div className="text-white/55 text-sm mt-1 leading-relaxed">{i.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <RedCard className="flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-4" style={{ color: accent }}>Closing Thought</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Designing ClappIt reinforced something I believe deeply: the best enterprise UX is not the most minimal — it's the most <em>intentionally organized</em>. Technical users don't need less data. They need data that speaks clearly, at the right moment, at the right level of detail.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The dashboard we built doesn't hide the complexity of Kubernetes orchestration. It structures it — putting the most critical information exactly where an engineer's eyes land first, and every subsequent layer of detail one deliberate click away.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-sm text-white/40">That's not simplification. That's <span className="font-semibold" style={{ color: accent }}>clarity-first design</span> for people who know what they're doing.</p>
              </div>
            </RedCard>
          </div>
        </section>

        {/* Back CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-8 md:p-12 border" style={{ borderColor: accent + "33", backgroundColor: accent + "08" }}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Want to work together?</h3>
            <p className="text-white/60">Let's build something that's both powerful and clear.</p>
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
              style={{ backgroundColor: accent }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c41e2f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accent)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
