import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { LIFECYCLE_STATES } from "@/features/case-study-kudra/constants/data";

export function UserFlowSection() {
  return (
    <section>
      <SectionHeading label="User Flow" title="Trip" accent="Lifecycle States" />
      <AccentCard>
        <p className="mb-8 max-w-xl text-[13px] text-white/65">
          The lifecycle was intentionally simplified to improve operational clarity and reduce
          process confusion across all stakeholder groups.
        </p>

        {/* Desktop / tablet: horizontal stepper */}
        <div className="hidden flex-wrap items-center gap-0 sm:flex">
          {LIFECYCLE_STATES.map((s, i, arr) => (
            <div key={s.state} className="flex items-center gap-0 sm:flex-1">
              <div className="flex flex-1 flex-col items-center">
                <div className="w-full rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-3 text-center">
                  <div className="text-[13px] font-bold text-[color:var(--accent)]">{s.state}</div>
                  <div className="mt-1 hidden text-[11px] text-white/45 sm:block">{s.desc}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div className="px-1 text-[15px] text-white/20 sm:px-2">→</div>}
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="space-y-2 sm:hidden">
          {LIFECYCLE_STATES.map((s) => (
            <div key={s.state} className="flex items-center gap-3 text-[13px]">
              <span className="w-24 shrink-0 font-semibold text-[color:var(--accent)]">
                {s.state}
              </span>
              <span className="text-[11px] text-white/50">{s.desc}</span>
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
