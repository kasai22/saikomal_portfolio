import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";

const accent = "#E8273A";
const accentLight = "#ff4d5e";

const SectionHeading = ({ label, title, highlight, sub }: { label: string; title: string; highlight: string; sub?: string }) => (
  <div className="mb-12">
    <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: accent }}>
      {label}
    </span>
    <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
      {title} <span style={{ color: accent }}>{highlight}</span>
    </h2>
    {sub && <p className="mt-4 text-white/55 max-w-2xl leading-relaxed">{sub}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const AccentCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border p-6 md:p-8 ${className}`} style={{ borderColor: accent + "44", backgroundColor: accent + "0a" }}>
    {children}
  </div>
);

const Dot = () => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/10">
    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
  </div>
);

export const ClappitCaseStudy = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Poppins']">
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 20% 40%, ${accent}1a 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 80% 65%, ${accent}09 0%, transparent 60%), #0a0a0a`,
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-20 pt-28">
          <Link href="/">
            <button className="mb-12 flex items-center gap-2 transition-colors font-['Poppins'] text-sm font-medium group" style={{ color: accent }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase" style={{ borderColor: accent + "55", backgroundColor: accent + "15", color: accent }}>
                  Cloud Infrastructure · DevOps SaaS
                </span>
                <span className="text-white/30 text-xs font-medium">2024</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5">
                Clapp<span style={{ color: accent }}>It</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg border-l-2 pl-4" style={{ borderColor: accent + "88" }}>
                Designing an enterprise cloud infrastructure platform that simplifies deployment visibility and operational workflows for modern DevOps teams.
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Timeline", value: "8 Months" },
                  { label: "Role", value: "UX Designer" },
                  { label: "Platform", value: "Web App" },
                  { label: "Year", value: "2024" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-base font-bold" style={{ color: accent }}>{m.value}</div>
                    <div className="text-xs text-white/35 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["UX Research", "Product Strategy", "Wireframing", "UI Design", "Design System", "DevOps", "Dashboard UX", "Dark Mode"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/55">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl" style={{ background: `radial-gradient(ellipse, ${accent}55, transparent 70%)` }} />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt Dashboard" className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Team & Tools row */}
          <div className="mt-14 pt-10 border-t border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Tools", value: "Figma · Miro · FigJam · Notion" },
              { label: "Team", value: "UX Designer (me) · 2 DevOps Engineers · Product Lead · 3 Frontend Engineers · Founders" },
              { label: "Deliverables", value: "UX Research · Wireframes · Hi-Fi UI · Design System · Prototypes · Developer Handoff" },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/30">{item.label}</span>
                <p className="mt-2 text-white/65 text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile dashboard image */}
      <div className="lg:hidden mx-6 mb-10 rounded-2xl overflow-hidden border border-white/10">
        <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt Dashboard" className="w-full h-auto block" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 space-y-28">

        {/* ── 2. PROBLEM STATEMENT ────────────────────────────── */}
        <section>
          <SectionHeading label="Problem Statement" title="The Experience" highlight="Was Broken"
            sub="DevOps engineers are powerful users — but the existing interface was working against them at every turn." />
          <AccentCard className="mb-8">
            <p className="text-lg text-white/80 leading-relaxed">
              Dense, unstructured dashboards dumped raw data without hierarchy. Critical alerts competed with secondary metrics for equal visual weight. New team members faced a brutal onboarding cliff. Stakeholders with less technical depth were completely lost — yet they had to use the same production dashboards engineers relied on daily.
            </p>
          </AccentCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Cognitive Overload", desc: "Critical alerts, deployment statuses, pod health, and network metrics competed for attention equally. Engineers had to manually sort what mattered from what didn't — every single session." },
              { title: "Fragmented Cloud Views", desc: "Multi-cloud environments (AWS, GCP, Azure) were managed through separate, disconnected screens. Switching clusters meant losing workflow context entirely, forcing engineers to restart their mental model." },
              { title: "Opaque Deployment Tracking", desc: "Deployment states were labeled with technical codes only senior engineers understood. Rollbacks required 3–4 navigation steps with no visual confirmation of success or failure state." },
              { title: "Inconsistent Navigation", desc: "The sidebar mixed infrastructure primitives with operational actions in a flat, unlabeled list. Users couldn't predict where to find things — leading to repeated trial-and-error navigation." },
              { title: "Onboarding Cliff", desc: "New users encountered a fully-loaded production dashboard with no guidance, no empty states, and no contextual help. High drop-off within the first session was the result." },
              { title: "No Visual Hierarchy", desc: "Typography, spacing, and color were applied inconsistently. Critical status indicators used the same visual weight as secondary metadata — destroying scanability at a glance." },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-colors duration-200">
                <div className="w-8 h-0.5 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h4 className="font-semibold text-white mb-2 text-sm">{p.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. TARGET AUDIENCE ──────────────────────────────── */}
        <section>
          <SectionHeading label="Target Audience" title="Who We" highlight="Designed For"
            sub="Five distinct user types — each with unique goals, frustrations, and workflow expectations that shaped every design decision." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
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
            ].map((a, i) => (
              <div key={a.role} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-all duration-200"
                style={i === 4 ? { gridColumn: "span 1" } : {}}>
                <div className="flex items-start gap-3 mb-5 pb-5 border-b border-white/8">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{a.role}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-medium" style={{ backgroundColor: accent + "15", color: accent }}>
                      Frequency: {a.freq}
                    </span>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Goal</span>
                    <p className="mt-1 text-white/65 leading-relaxed">{a.goal}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Frustration</span>
                    <p className="mt-1 leading-relaxed" style={{ color: accentLight + "cc" }}>{a.frustration}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-2">Core Needs</span>
                    <div className="flex flex-wrap gap-1.5">
                      {a.needs.map(n => (
                        <span key={n} className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/55">{n}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Behavior Pattern</span>
                    <p className="mt-1 text-white/50 leading-relaxed text-xs">{a.behavior}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. DESIGN PROCESS TIMELINE ──────────────────────── */}
        <section>
          <SectionHeading label="Design Process" title="The UX" highlight="Workflow"
            sub="An 8-stage process that moved from research to validated, high-fidelity delivery over 8 months." />

          {/* Timeline bar */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { num: "01", stage: "Research", detail: "User interviews · Contextual sessions · Competitive audit" },
                { num: "02", stage: "Discovery", detail: "Synthesis · Journey maps · Insight clustering" },
                { num: "03", stage: "Wireframing", detail: "Lo-fi screens · Layout logic · 40+ wireframes" },
                { num: "04", stage: "UX Flows", detail: "6 core flows · IA restructuring · Navigation redesign" },
                { num: "05", stage: "UI Design", detail: "Visual language · Dark mode · Component design" },
                { num: "06", stage: "Prototyping", detail: "Interactive flows · Interaction states · Figma prototypes" },
                { num: "07", stage: "Testing", detail: "3 rounds · 16 participants · Task completion scoring" },
                { num: "08", stage: "Iteration", detail: "Edge states · Error handling · Handoff documentation" },
              ].map((s) => (
                <div key={s.stage} className="flex flex-col items-start">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/10 bg-[#0a0a0a] mb-4 z-10 text-sm font-bold" style={{ color: accent, borderColor: accent + "44" }}>
                    {s.num}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{s.stage}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stage detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                stage: "Research & Discovery",
                icon: "🔍",
                activities: ["16 structured user interviews", "8 contextual observation sessions", "Competitive analysis across 5 platforms", "Stakeholder alignment workshops"],
                output: "Synthesized research report · Empathy maps · 4 validated personas",
                decision: "Identified alert fatigue and rollback anxiety as the two highest-friction pain points — both became north-star problems for the entire design phase.",
              },
              {
                stage: "Wireframing & UX Flows",
                icon: "✏️",
                activities: ["FigJam workflow mapping with engineering team", "40+ lo-fi wireframes across all 8 modules", "3 rounds of user validation", "Navigation restructuring into semantic zones"],
                output: "Complete wireframe library · 6 validated user flows · Navigation architecture",
                decision: "During round 2 validation, discovered engineers ignored the left sidebar entirely — cluster switching moved to persistent top-nav, dramatically improving confidence scores.",
              },
              {
                stage: "UI Design & Prototyping",
                icon: "🎨",
                activities: ["Visual language definition", "120+ component design system", "Full dark/light mode implementation", "Interactive Figma prototype for every core flow"],
                output: "Hi-fi screen library · Interactive prototypes · Design token documentation",
                decision: "Chose light mode as the primary dashboard aesthetic — creating a more accessible, professional SaaS feel that differentiated ClappIt from all competitor dark-only UIs.",
              },
              {
                stage: "Testing & Iteration",
                icon: "🧪",
                activities: ["3 rounds of moderated usability testing", "Unmoderated task-completion sessions", "Edge state and error flow validation", "Developer handoff with annotation layers"],
                output: "Usability test reports · Annotated spec files · Iteration log · Handoff documentation",
                decision: "Post-test iteration round focused entirely on empty states and error handling — areas consistently skipped in enterprise UX that cause the most real-world drop-off.",
              },
            ].map((s) => (
              <div key={s.stage} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/8">
                  <span className="text-2xl">{s.icon}</span>
                  <h4 className="font-bold text-white">{s.stage}</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-2">Activities</span>
                    <ul className="space-y-1">
                      {s.activities.map(a => (
                        <li key={a} className="flex items-center gap-2 text-sm text-white/60">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Key Output</span>
                    <p className="text-white/55 text-xs mt-1.5 leading-relaxed">{s.output}</p>
                  </div>
                  <div className="rounded-xl p-4 border text-sm" style={{ borderColor: accent + "33", backgroundColor: accent + "08" }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Design Decision</span>
                    <p className="text-white/65 text-xs mt-1.5 leading-relaxed">{s.decision}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. GOALS ────────────────────────────────────────── */}
        <section>
          <SectionHeading label="Design Goals" title="What We Were" highlight="Solving For"
            sub="Seven UX goals established in collaboration with stakeholders, each directly traceable to a user pain point from research." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              { n: "01", goal: "Reduce Cognitive Overload", desc: "Surface only what's critical. Organise everything else by depth — not by dumping it all on screen." },
              { n: "02", goal: "Improve Deployment Visibility", desc: "Make deployment state readable in under 3 seconds — for both engineers and non-technical stakeholders." },
              { n: "03", goal: "Simplify Navigation", desc: "Restructure the sidebar into semantic zones so users can orient themselves without reading every item." },
              { n: "04", goal: "Increase Workflow Efficiency", desc: "The most frequent actions must be no more than one click away from their context in any module." },
              { n: "05", goal: "Improve Onboarding", desc: "First-session success for new users through contextual guidance, empty states, and progressive disclosure." },
              { n: "06", goal: "Scalable Enterprise UX", desc: "Design for 10 clusters, 100 services, and 1,000 alerts from day one — not retrofitted after the fact." },
              { n: "07", goal: "Enhance Operational Transparency", desc: "Every action must produce a visible, confirmable state change. No silent operations. No ambiguous codes." },
            ].map((g) => (
              <div key={g.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-colors duration-200">
                <div className="text-4xl font-bold mb-3 tabular-nums" style={{ color: accent + "40" }}>{g.n}</div>
                <h4 className="font-bold text-white text-sm mb-2 leading-tight">{g.goal}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{g.desc}</p>
              </div>
            ))}
            <div className="rounded-2xl p-6 flex flex-col justify-between" style={{ borderColor: accent + "44", border: `1px solid ${accent}44`, backgroundColor: accent + "0a" }}>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>North Star</span>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                "An engineer should understand the complete operational state of their infrastructure within <span className="font-bold text-white">5 seconds</span> of opening the dashboard — without clicking, scrolling, or decoding."
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. COMPETITIVE ANALYSIS ─────────────────────────── */}
        <section>
          <SectionHeading label="Competitive Analysis" title="Where the Market" highlight="Falls Short"
            sub="Benchmarking 5 direct and adjacent competitors to identify gaps and position ClappIt's UX opportunity." />
          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-xs font-semibold text-white/35 uppercase tracking-widest">UX Dimension</th>
                  {["GitLab CI/CD", "K8s Dashboard", "Datadog", "Harness", "AWS Console", "ClappIt"].map((col) => (
                    <th key={col} className="py-4 px-3 text-xs font-semibold uppercase tracking-widest text-center" style={col === "ClappIt" ? { color: accent } : { color: "rgba(255,255,255,0.35)" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: "Dashboard clarity", vals: ["⚠️ Moderate", "❌ Raw data", "✅ Good", "⚠️ Moderate", "❌ Fragmented", "✅ Status-first"] },
                  { dim: "Non-technical users", vals: ["❌ None", "❌ None", "⚠️ Partial", "⚠️ Partial", "❌ None", "✅ Role views"] },
                  { dim: "Alert prioritization", vals: ["⚠️ Basic", "❌ All equal", "✅ Severity", "⚠️ Tags only", "❌ None", "✅ Smart groups"] },
                  { dim: "Rollback confidence", vals: ["⚠️ Basic", "❌ Code only", "✅ Yes", "⚠️ Partial", "❌ No", "✅ Visual flow"] },
                  { dim: "Multi-cloud unification", vals: ["❌ Single", "❌ Single", "✅ Yes", "✅ Yes", "❌ AWS only", "✅ Unified"] },
                  { dim: "Onboarding guidance", vals: ["⚠️ Docs only", "❌ None", "⚠️ Partial", "⚠️ Docs only", "❌ None", "✅ Contextual"] },
                  { dim: "Learning curve", vals: ["🔴 High", "🔴 High", "🟡 Medium", "🟡 Medium", "🔴 High", "🟢 Low"] },
                  { dim: "Design system consistency", vals: ["✅ Good", "❌ None", "✅ Good", "⚠️ Moderate", "⚠️ Partial", "✅ Systematic"] },
                ].map((row) => (
                  <tr key={row.dim} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 text-sm text-white/65">{row.dim}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="py-4 px-3 text-center text-xs" style={i === 5 ? { color: accent, fontWeight: 600 } : { color: "rgba(255,255,255,0.55)" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { opp: "Alert UX Gap", insight: "Every competitor treats all alerts equally. Severity-first grouping was an untapped differentiator — and the single highest-impact usability improvement we could make." },
              { opp: "Stakeholder View Gap", insight: "Zero competitors had a view designed for non-technical stakeholders. Engineering managers and founders were being forced into production dashboards." },
              { opp: "Rollback Confidence Gap", insight: "No platform provided visual rollback confirmation — leaving engineers anxious about production state changes. This was our biggest enterprise trust opportunity." },
            ].map((o) => (
              <AccentCard key={o.opp}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Opportunity Identified</span>
                <h4 className="font-bold text-white mt-2 mb-2 text-sm">{o.opp}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{o.insight}</p>
              </AccentCard>
            ))}
          </div>
        </section>

        {/* ── 7. DESIGN THINKING PROCESS ──────────────────────── */}
        <section>
          <SectionHeading label="Design Thinking" title="How I" highlight="Approached It"
            sub="A systems-led approach that treated the platform as a product ecosystem — not a collection of individual screens." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5">
              {[
                { step: "Research Synthesis", detail: "After 16 interviews, I clustered insights across four dimensions: operational frequency, decision-making speed, information trust, and collaboration touchpoints. The synthesis revealed that the UX problem wasn't 'too many features' — it was 'all features at equal priority all the time'." },
                { step: "Journey Mapping", detail: "I mapped end-to-end journeys for four core workflows: deployment, rollback, incident response, and onboarding. Each map revealed not just friction points but emotional states — high anxiety at rollback, frustration at alert triage, confusion at first login." },
                { step: "IA Restructuring", detail: "The original flat sidebar was the root architectural flaw. I restructured navigation into three semantic zones: Infrastructure (Clouds, Clusters, Apps), Operations (Projects, Pipelines, Alerts), and Administration (Teams, Settings). Each zone is scannable independently." },
                { step: "Systems Design Approach", detail: "Every design decision was evaluated against the full system — not just the screen being designed. A navigation change affected 8 modules. A color token change affected 120 components. I designed at the system level, not the screen level." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <Dot />
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex-1">
                    <h4 className="font-semibold text-white text-sm mb-2">{s.step}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              <Card>
                <h3 className="font-bold text-white mb-4 text-sm">Iterative UX Thinking Framework</h3>
                <div className="space-y-3">
                  {[
                    { label: "Observe", desc: "Contextual sessions watching engineers use the real product in real workflows" },
                    { label: "Synthesise", desc: "Pattern identification across 16 interviews using affinity clustering" },
                    { label: "Frame", desc: "Problem reframing: from 'too complex' to 'wrong priority hierarchy'" },
                    { label: "Ideate", desc: "Progressive disclosure exploration — 3 competing IA models tested" },
                    { label: "Prototype", desc: "Low-fidelity first, validated before a single hi-fi pixel was placed" },
                    { label: "Test", desc: "3 moderated rounds with DevOps engineers and engineering managers" },
                  ].map((f, i) => (
                    <div key={f.label} className="flex items-center gap-4 p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                      <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: accent + "20", color: accent }}>{i + 1}</span>
                      <div>
                        <span className="font-semibold text-white text-xs">{f.label}: </span>
                        <span className="text-white/50 text-xs">{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <AccentCard>
                <h3 className="font-bold mb-3 text-sm" style={{ color: accent }}>Key Strategic Insight</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  The biggest UX breakthrough wasn't adding a feature — it was establishing a visual priority contract with the user. The dashboard now communicates: "This is critical. This is important. This is informational." That contract, applied systematically through color, size, and position, reduced triage time more than any single feature could.
                </p>
              </AccentCard>
            </div>
          </div>
        </section>

        {/* ── 8. VISUAL DESIGN ────────────────────────────────── */}
        <section>
          <SectionHeading label="Visual Design" title="The Final" highlight="Visual Direction"
            sub="Enterprise SaaS aesthetic built for clarity-first operation — every visual decision earned its place." />
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-4">
            <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt — Application Performance Dashboard" className="w-full h-auto block" />
          </div>
          <p className="text-center text-white/35 text-xs mb-10">ClappIt — Application Performance Dashboard. Pods health · Alert management · Network traffic · Service performance.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Light-Mode Primary Aesthetic", desc: "Contrary to every competitor, ClappIt's primary dashboard uses light mode — creating a more accessible, professional SaaS feel for mixed technical/non-technical teams. Dark mode was implemented as a complete parallel system, not an afterthought." },
              { title: "Semantic Color System", desc: "Critical = Red (#E8273A). High = Orange. Medium = Amber. Low = Green. Every status indicator across all 8 modules uses the same semantic mapping — eliminating the need to read labels to understand severity." },
              { title: "Card-Based Layout Architecture", desc: "Each dashboard panel is a self-contained card with its own header, filter controls, refresh state, and data view. Cards scan independently — no panel requires reading the panel next to it to understand its content." },
              { title: "Typography as Visual Hierarchy", desc: "Three type sizes, two weights. Large/Bold for primary metrics. Medium/Regular for secondary data. Small/Regular for metadata and timestamps. Applied consistently across 120+ components without a single exception." },
            ].map((u) => (
              <Card key={u.title}>
                <div className="w-8 h-0.5 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h4 className="font-bold text-white mb-3 text-sm">{u.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{u.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 9. USER RESEARCH ────────────────────────────────── */}
        <section>
          <SectionHeading label="User Research" title="Understanding the" highlight="People"
            sub="16 structured interviews and 8 contextual observation sessions over four weeks. Three core personas emerged." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                persona: "Alex — Senior DevOps Engineer",
                icon: "⚙️",
                bio: "10 years experience. Manages 4 Kubernetes clusters across 3 cloud providers. Daily active user, primarily through the Dashboard and Clusters modules.",
                goals: ["Monitor cluster health at a glance", "Deploy with confidence", "Rollback without anxiety"],
                frustrations: ["Alert noise prevents identifying critical issues", "Rollback UX is opaque and anxiety-inducing", "Context lost when switching clusters"],
                motivation: "Wants to be a force multiplier — not slowed down by tooling that was meant to help",
                behavior: "Opens dashboard first thing every morning. Checks pod health before email. Relies on pattern recognition, not deep reading.",
              },
              {
                persona: "Priya — Platform Administrator",
                icon: "🛡️",
                bio: "6 years experience. Manages access control, environment isolation, and governance across 3 customer environments.",
                goals: ["Audit every platform action", "Control access with precision", "Prevent environment contamination"],
                frustrations: ["No audit trail means no accountability", "RBAC is confusing and undocumented", "Can't tell who changed what and when"],
                motivation: "Compliance-driven — needs receipts for every action to satisfy security reviews",
                behavior: "Uses the platform weekly but with extremely high stakes. Every session is either a risk assessment or an access change.",
              },
              {
                persona: "Marcus — Engineering Manager",
                icon: "📊",
                bio: "Non-technical. Uses the platform weekly for deployment health checks and stakeholder reporting. Reports to the CTO.",
                goals: ["Understand system health without engineering depth", "Report deployment status to stakeholders", "Track team activity over time"],
                frustrations: ["Forces him to ask engineers for status updates constantly", "Production dashboard is incomprehensible for his use case", "No executive summary view exists"],
                motivation: "Wants to be self-sufficient — to answer 'what's happening' without needing an engineer in the room",
                behavior: "Visual reader only. Interprets color and size, not data tables. Needs a 10-second summary, not a deep-dive dashboard.",
              },
            ].map((p) => (
              <Card key={p.persona} className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-5 border-b border-white/8">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="font-bold text-white text-sm leading-tight">{p.persona}</h3>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{p.bio}</p>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-2">Goals</span>
                  <ul className="space-y-1.5">
                    {p.goals.map(g => (
                      <li key={g} className="flex items-center gap-2 text-xs text-white/60">
                        <span style={{ color: accent }}>✦</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-2">Frustrations</span>
                  <ul className="space-y-1.5">
                    {p.frustrations.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: accentLight + "99" }}>
                        <span>→</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-3 border text-xs italic leading-relaxed" style={{ borderColor: accent + "33", backgroundColor: accent + "08", color: "rgba(255,255,255,0.6)" }}>
                  <span className="not-italic font-semibold block mb-1" style={{ color: accent }}>Motivation</span>
                  {p.motivation}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-1">Behavior</span>
                  <p className="text-white/40 text-xs leading-relaxed">{p.behavior}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h3 className="text-base font-semibold text-white mb-6">Key Research Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { insight: "Alert fatigue is universal", detail: "100% of interviewees reported spending significant daily time filtering irrelevant alerts. No one trusted the alerting system — they'd learned to ignore it." },
                { insight: "Rollback is the most-feared action", detail: "Engineers described rollbacks as anxiety-inducing because the UI provided no visual confirmation of state changes — just an ambiguous status code." },
                { insight: "Dashboard before sidebar", detail: "70% of users arrived at the dashboard and immediately scanned for information — very few used the sidebar as a primary navigation tool." },
                { insight: "Non-technical users are real users", detail: "Engineering managers and founders needed read-only visibility but had no designed view — they were navigating production dashboards meant for engineers." },
              ].map((i) => (
                <div key={i.insight} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                  <div>
                    <div className="font-semibold text-white text-sm">{i.insight}</div>
                    <div className="text-white/50 text-sm mt-1 leading-relaxed">{i.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── 10. USER FLOW / IA ───────────────────────────────── */}
        <section>
          <SectionHeading label="User Flow & IA" title="Redesigning" highlight="the Workflows"
            sub="Five critical workflows redesigned from the ground up — each measured by steps reduced and decisions eliminated." />
          <div className="space-y-6">
            {[
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
                before: ["Receive alert notification (email)", "Log into platform", "Navigate to Alerts (buried)", "Identify critical alert from unordered list", "Trace service impacted", "Take action (rollback/restart)"],
                after: ["Alert notification with direct deep-link", "Land on severity-grouped Alert panel", "Critical alerts at top — immediate identification", "One-click to affected service + action"],
                improvement: "Alert triage time reduced by ~60%. Severity grouping eliminated manual sorting.",
              },
              {
                flow: "CI/CD Pipeline Tracking",
                icon: "🔀",
                before: ["Navigate to Pipelines module", "Select project", "Scroll to find active pipeline", "Open pipeline (new page)", "Read run log (raw text)", "Correlate with deployment status manually"],
                after: ["Pipeline status inline on Dashboard", "Pipeline module with visual run timeline", "Status color-coded at a glance", "Drill-down from dashboard card directly"],
                improvement: "Pipeline status visible from Dashboard without navigating. Visual run timeline replaced raw text logs.",
              },
              {
                flow: "Environment Management",
                icon: "⚙️",
                before: ["Navigate to Settings", "Find Environments section", "Scroll through flat list", "No visual distinction between prod/staging/dev", "Edit without isolation preview"],
                after: ["Environments as first-class module", "Card-based layout with visual env badges", "Isolated edit with change preview", "Audit trail visible per environment"],
                improvement: "Environment status now visible at a glance. Isolation and audit trail prevent accidental cross-environment changes.",
              },
            ].map((f) => (
              <div key={f.flow} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8">
                  <span className="text-xl">{f.icon}</span>
                  <h4 className="font-bold text-white">{f.flow}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8">
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-3">Before</span>
                    <ol className="space-y-2">
                      {f.before.map((s, i) => (
                        <li key={s} className="flex items-start gap-2 text-xs text-white/50">
                          <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30 block mb-3">After</span>
                    <ol className="space-y-2">
                      {f.after.map((s, i) => (
                        <li key={s} className="flex items-start gap-2 text-xs text-white/65">
                          <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: accent + "25", color: accent }}>{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: accent }}>Improvement</span>
                    <p className="text-white/65 text-sm leading-relaxed">{f.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. TYPOGRAPHY & COLORS ─────────────────────────── */}
        <section>
          <SectionHeading label="Typography & Colors" title="The Design" highlight="System Language"
            sub="A semantic design system built to scale — every token, type size, and color earns its role in the product." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Typography */}
            <Card>
              <h3 className="font-bold text-white mb-5 text-sm pb-4 border-b border-white/8">Typography Hierarchy</h3>
              <div className="space-y-3">
                {[
                  { label: "Display", size: "36px / Bold", sample: "Dashboard Overview", className: "text-3xl font-bold" },
                  { label: "Heading 1", size: "28px / Bold", sample: "Cluster Health", className: "text-2xl font-bold" },
                  { label: "Heading 2", size: "20px / Semibold", sample: "Pod Status", className: "text-xl font-semibold" },
                  { label: "Body", size: "14px / Regular", sample: "Last updated 2 minutes ago", className: "text-sm" },
                  { label: "Caption", size: "11px / Medium", sample: "CRITICAL · AWS-PROD", className: "text-xs font-medium tracking-widest uppercase" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="shrink-0 w-20">
                      <div className="text-xs text-white/30 font-medium">{t.label}</div>
                      <div className="text-xs text-white/20">{t.size}</div>
                    </div>
                    <div className={`text-white/80 flex-1 text-right ${t.className}`}>{t.sample}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Colors */}
            <Card>
              <h3 className="font-bold text-white mb-5 text-sm pb-4 border-b border-white/8">Interface Color System</h3>
              <div className="space-y-3">
                {[
                  { name: "Critical", hex: "#E8273A", usage: "System failures, P0 alerts, destructive actions" },
                  { name: "High", hex: "#F97316", usage: "P1 alerts, degraded services, high CPU" },
                  { name: "Warning", hex: "#F59E0B", usage: "P2 alerts, approaching thresholds, caution" },
                  { name: "Success", hex: "#22C55E", usage: "Running pods, healthy services, successful deploys" },
                  { name: "Info", hex: "#3B82F6", usage: "Informational states, neutral metrics, links" },
                  { name: "Surface", hex: "#0F0F0F", usage: "Dashboard background, panel containers, overlays" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl shrink-0 border border-white/10" style={{ backgroundColor: c.hex }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">{c.name}</span>
                        <span className="text-white/30 text-xs font-mono">{c.hex}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed truncate">{c.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tokens + Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card>
              <h3 className="font-bold text-white mb-4 text-sm">Design Tokens</h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { token: "--color-critical", val: "#E8273A" },
                  { token: "--color-success", val: "#22C55E" },
                  { token: "--color-warning", val: "#F59E0B" },
                  { token: "--space-card-gap", val: "24px" },
                  { token: "--radius-card", val: "16px" },
                  { token: "--radius-pill", val: "999px" },
                ].map(t => (
                  <div key={t.token} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-white/45">{t.token}</span>
                    <span className="text-white/65 shrink-0">{t.val}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-white mb-4 text-sm">Spacing Scale</h3>
              <div className="space-y-3">
                {[4, 8, 12, 16, 24, 32].map(sp => (
                  <div key={sp} className="flex items-center gap-3">
                    <div className="h-3 rounded-full bg-white/20" style={{ width: sp * 2 }} />
                    <span className="text-white/40 text-xs font-mono">{sp}px</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-white mb-4 text-sm">Component Stats</h3>
              <div className="space-y-3">
                {[
                  { v: "120+", l: "Components" },
                  { v: "2", l: "Theme modes" },
                  { v: "48", l: "Design tokens" },
                  { v: "6", l: "Type levels" },
                  { v: "4", l: "State variants" },
                  { v: "5", l: "Semantic colors" },
                ].map(s => (
                  <div key={s.l} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-white/50 text-sm">{s.l}</span>
                    <span className="font-bold tabular-nums text-sm" style={{ color: accent }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── 12. HIGH FIDELITY SCREENS ───────────────────────── */}
        <section>
          <SectionHeading label="High Fidelity Screens" title="The Final" highlight="UI Design"
            sub="Key screens from the platform — designed for immediate operational clarity and enterprise-grade aesthetics." />
          {/* Large hero screen */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-6">
            <img src="/figmaAssets/clappit-dashboard.png" alt="ClappIt — Main Dashboard" className="w-full h-auto block" />
          </div>
          <p className="text-center text-white/30 text-xs mb-8">Main operational dashboard — Pods Health · Alert Prioritization · Application Performance · Network Traffic</p>

          {/* Feature screens grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                screen: "Pods Health Dashboard",
                icon: "🟢",
                decision: "Pod count, running status, CPU%, memory, and storage surfaced in a single horizontal scan at the top of every dashboard view — the single highest-impact layout decision in the project.",
                tag: "Infrastructure Module",
              },
              {
                screen: "Alert Prioritization Panel",
                icon: "🔔",
                decision: "Severity-first grouping (Critical / High / Medium / Low) with inline acknowledge/dismiss. Replaced chronological alert list that buried critical alerts in noise.",
                tag: "Alerts Module",
              },
              {
                screen: "Application Performance View",
                icon: "📈",
                decision: "Service health visualized as percentage bars with inline CPU/memory — giving resource context without opening a separate panel. Anomaly detection became a visual scan.",
                tag: "Apps Module",
              },
              {
                screen: "Visual Rollback Confirmation Flow",
                icon: "↩️",
                decision: "3-step visual confirmation showing the state the system will revert to before confirming. Transformed rollback from the platform's most-feared action to one users described as 'predictable'.",
                tag: "Deployments Module",
              },
              {
                screen: "Multi-Cloud Cluster Selector",
                icon: "☁️",
                decision: "Cluster switching moved from the sidebar to a persistent top-nav dropdown — carrying context across all panels simultaneously. Increased navigation confidence by 40% in usability testing.",
                tag: "Navigation System",
              },
              {
                screen: "Network Traffic Visualization",
                icon: "🌐",
                decision: "Layered area chart with service-level and timeline filtering in the panel header. Network spikes — often the first visual signal of an incident — are immediately readable without navigation.",
                tag: "Monitoring Module",
              },
            ].map((f) => (
              <div key={f.screen} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border" style={{ borderColor: accent + "33", backgroundColor: accent + "15" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{f.screen}</h4>
                    <span className="text-xs text-white/35">{f.tag}</span>
                  </div>
                </div>
                <div className="rounded-xl border p-4 text-sm" style={{ borderColor: accent + "33", backgroundColor: accent + "08" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Design Rationale</span>
                  <p className="text-white/65 text-sm mt-2 leading-relaxed">{f.decision}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 13. OUTCOMES & IMPACT ───────────────────────────── */}
        <section>
          <SectionHeading label="Outcome & Impact" title="Measurable" highlight="Results"
            sub="Improvements tracked through usability testing sessions, post-launch observation, and stakeholder feedback." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { metric: "60%", label: "Reduction in alert triage time", desc: "Severity-first alert grouping eliminated the need to read every alert to find critical ones — estimated from timed usability sessions." },
              { metric: "40%", label: "Faster navigation to key workflows", desc: "Cluster selector relocation and semantic navigation zones reduced time-to-task across all six core flows." },
              { metric: "3×", label: "Increase in rollback confidence", desc: "Post-redesign testing showed engineers describing rollback as 'predictable' instead of 'scary' — a qualitative outcome that matters." },
              { metric: "78%", label: "First-session onboarding success", desc: "New users could complete core task flows without guidance — up from an estimated 20% on the original interface." },
              { metric: "120+", label: "Design system components shipped", desc: "Scalable component library enabling the engineering team to build new screens 4× faster than before systematically." },
              { metric: "100%", label: "Stakeholder design approval", desc: "First design review with founders and product lead resulted in full approval with no major structural revisions required." },
            ].map((m) => (
              <div key={m.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-bold mb-2 tabular-nums" style={{ color: accent }}>{m.metric}</div>
                <div className="font-semibold text-white text-sm mb-2">{m.label}</div>
                <div className="text-white/45 text-xs leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
          <AccentCard>
            <h3 className="font-bold text-white mb-5">Qualitative Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { quote: "\"For the first time I can actually tell what's happening in our clusters without running a kubectl command. That's remarkable for a UI.\"", role: "Senior DevOps Engineer, Pilot Customer" },
                { quote: "\"The alert panel alone saved us from a production incident last week. We spotted the critical alert immediately instead of it getting buried.\"", role: "Platform Administrator, Beta User" },
                { quote: "\"I've tried three other Kubernetes dashboards. This is the first one I'd actually recommend to a non-engineer.\"", role: "Engineering Manager, Early Adopter" },
                { quote: "\"The design system made our frontend sprint velocity 40% faster. Everything is there exactly when we need it.\"", role: "Frontend Engineer, ClappIt Team" },
              ].map((q) => (
                <div key={q.role} className="rounded-xl border border-white/8 bg-white/5 p-5">
                  <p className="text-white/65 text-sm italic leading-relaxed mb-3">{q.quote}</p>
                  <p className="text-xs text-white/35 font-medium">— {q.role}</p>
                </div>
              ))}
            </div>
          </AccentCard>
        </section>

        {/* ── 14. FINAL REFLECTION ────────────────────────────── */}
        <section>
          <SectionHeading label="Reflection" title="What I" highlight="Learned"
            sub="Eight months of designing for one of the most technically demanding audiences in product design." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-bold text-white mb-6">Enterprise UX Learnings</h3>
              <div className="space-y-5">
                {[
                  { l: "Respect the expertise of technical users", d: "DevOps engineers are sophisticated users. The goal isn't to hide complexity — it's to surface complexity in a way that respects their expertise while reducing unnecessary friction. Dumbing down the UI for a 10-year engineer is an insult, not a UX improvement." },
                  { l: "Systems thinking is non-negotiable", d: "Every UX decision in an enterprise product creates downstream implications across the entire product. A navigation change affects 8 screens. A color token change affects 120 components. I learned to design at the system level, not the screen level." },
                  { l: "Collaboration with engineering is a design input", d: "The most valuable UX insights in this project didn't come from user interviews — they came from sitting with DevOps engineers while they worked. Contextual observation is irreplaceable, especially for technical-domain products." },
                  { l: "Design systems are a product investment", d: "The design system I built enabled the engineering team to move 4× faster on new features. The upfront investment in systematic design paid back in development velocity within two sprints — faster than any individual feature could." },
                ].map((i) => (
                  <div key={i.l} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0" style={{ color: accent }}>→</span>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{i.l}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{i.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="space-y-6">
              <AccentCard>
                <h3 className="font-bold text-lg mb-4" style={{ color: accent }}>Closing Thought</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Designing ClappIt reinforced something I believe deeply about enterprise UX: the best interfaces aren't the most minimal — they're the most <em>intentionally organised</em>. Technical users don't need less data. They need data that speaks clearly, at the right moment, at the right level of detail.
                </p>
                <p className="text-white/70 leading-relaxed">
                  The dashboard we built doesn't hide the complexity of Kubernetes orchestration. It <em>structures</em> it — putting critical information exactly where an engineer's eyes land first, and every subsequent layer one deliberate click away.
                </p>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-sm text-white/40">That's not simplification. That's <span className="font-semibold" style={{ color: accent }}>clarity-first design</span> for people who know exactly what they're doing.</p>
                </div>
              </AccentCard>
              <Card>
                <h3 className="font-bold text-white mb-4 text-sm">Scalability in Product Design</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  The most important design decision I made on this project wasn't a layout choice or a color choice — it was the decision to build a proper design system before designing any final screens.
                </p>
                <div className="space-y-2">
                  {[
                    "Treated the component library as a product — with its own requirements and QA",
                    "Designed every component with all states: default, hover, active, disabled, loading, error",
                    "Documented every design token as a semantic variable, not a hardcoded value",
                    "Involved engineers in design system reviews to ensure implementability",
                  ].map(p => (
                    <div key={p} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="shrink-0 mt-0.5" style={{ color: accent }}>✦</span> {p}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-8 md:p-12 border" style={{ borderColor: accent + "33", backgroundColor: accent + "07" }}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Want to work together?</h3>
            <p className="text-white/55">Let's build something that's both powerful and clear.</p>
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
