import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AI_STATES } from "@/features/case-study-rex/constants/data";

/**
 * The states an AI product spends most of its time in and most designs
 * forget: loading, empty, cold-start, low-confidence, no-result and recovery.
 * Placed straight after the agent architecture, because each state is
 * handled by a part of that system.
 */
export function AiStatesSection() {
  return (
    <section>
      <SectionHeading
        label="AI Response & Error States"
        title="Designing for when the AI"
        accent="isn't sure"
        sub="The response and error states were defined alongside the happy path, so trust holds up when the system is slow, uncertain or wrong — not only when it is right."
      />
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_STATES.map((item, i) => (
          <li key={item.state}>
            <SurfaceCard className="h-full p-5 md:p-6">
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">·</span>
                {item.state}
              </p>
              <h3 className="mb-2 text-[14px] font-semibold text-ink">{item.rule}</h3>
              <p className="text-[13px] leading-relaxed text-ink/70">{item.detail}</p>
            </SurfaceCard>
          </li>
        ))}
      </ol>
    </section>
  );
}
