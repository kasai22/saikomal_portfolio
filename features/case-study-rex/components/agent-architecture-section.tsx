import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AGENT_ROLES } from "@/features/case-study-rex/constants/data";

export function AgentArchitectureSection() {
  return (
    <section>
      <SectionHeading
        label="Underlying Architecture"
        title="Orchestrated Agents,"
        accent="One Trusted Voice"
        sub="No single agent talks to the customer directly. Every response is assembled by an Orchestrator and validated before it ever reaches the chat, Wizard, or Try-On panel."
      />
      <SurfaceCard>
        <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/40">
          <span className="rounded-full border border-white/10 px-3 py-1">User</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-3 py-1 text-[color:var(--accent)]">
            Orchestrator
          </span>
          <span aria-hidden="true">→</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Specialist Agents</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Guardrails</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Design Studio</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AGENT_ROLES.map((a) => (
            <div key={a.agent} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/5 p-4">
              <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">→</span>
              <div>
                <div className="mb-1 text-[13px] font-semibold text-white">{a.agent}</div>
                <div className="text-[11px] leading-relaxed text-white/50">{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </section>
  );
}
