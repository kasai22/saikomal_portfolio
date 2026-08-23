import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { EMPATHY_MAP } from "@/features/case-study-hsl/constants/data";

const QUADRANT_ICONS: Record<string, string> = {
  Says: "❝",
  Thinks: "◌",
  Does: "→",
  Feels: "◈",
};

export function EmpathyMapSection() {
  return (
    <section>
      <SectionHeading
        label="Define Phase"
        title="Empathy"
        accent="Map"
        sub="Synthesised from the stakeholder sessions — what applicants and vendors were actually doing, and why the silence was the part that hurt."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {EMPATHY_MAP.map((quadrant) => (
          <SurfaceCard key={quadrant.title}>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-[13px] text-[color:var(--accent)]"
                aria-hidden="true"
              >
                {QUADRANT_ICONS[quadrant.title]}
              </span>
              <h3 className="text-[15px] font-bold text-white">{quadrant.title}</h3>
            </div>
            <ul className="space-y-3">
              {quadrant.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] leading-relaxed text-white/65"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
