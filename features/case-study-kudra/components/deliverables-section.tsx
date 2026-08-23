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
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-colors hover:border-white/20"
          >
            <div className="mb-2 text-lg" aria-hidden="true">
              {del.icon}
            </div>
            <div className="text-[11px] leading-tight text-white/60">{del.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
