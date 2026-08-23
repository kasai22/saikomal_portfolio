import { SectionHeading } from "@/components/case-study/section-heading";
import { DELIVERABLES } from "@/features/case-study-kudra/constants/data";

export function DeliverablesSection() {
  return (
    <section>
      <SectionHeading label="Deliverables" title="What Was" accent="Produced" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {DELIVERABLES.map((del) => (
          <div
            key={del.d}
            className="rounded-sm border border-ink/12 bg-ink/[0.035] p-5 text-center transition-colors hover:border-ink/20"
          >
            <div className="mb-2 text-lg" aria-hidden="true">
              {del.icon}
            </div>
            <div className="text-[11px] leading-tight text-ink/65">{del.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
