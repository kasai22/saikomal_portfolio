import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { USER_GROUPS } from "@/features/case-study-hsl/constants/data";

interface SectionTone {
  border: string;
  label: string;
  marker: string;
}

const NEUTRAL_TONE: SectionTone = {
  border: "border-ink/12 bg-ink/[0.035]",
  label: "text-ink/60",
  marker: "text-ink/60",
};

const SECTION_TONE: Record<string, SectionTone> = {
  Frustrations: {
    border: "border-red-500/20 bg-red-500/5",
    label: "text-red-400/70",
    marker: "text-red-400/60",
  },
  Goals: NEUTRAL_TONE,
  "What I designed": {
    border: "border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)]",
    label: "text-[color:var(--accent)]",
    marker: "text-[color:var(--accent)]",
  },
};

export function UserGroupsSection() {
  return (
    <section>
      <SectionHeading
        label="Define Phase"
        title="Who I Designed"
        accent="For"
        sub="The three groups the stakeholder sessions kept pointing back to — described from what module owners reported, not from invented personas."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {USER_GROUPS.map((group) => (
          <SurfaceCard key={group.id} className="flex flex-col">
            <span className="mb-4 w-fit rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
              {group.module}
            </span>
            <h3 className="mb-3 text-[15px] font-bold text-ink">{group.name}</h3>
            <p className="mb-6 text-[13px] leading-relaxed text-ink/65">{group.summary}</p>

            <div className="mt-auto space-y-4">
              {group.sections.map((section) => {
                const tone = SECTION_TONE[section.title] ?? NEUTRAL_TONE;
                return (
                  <div key={section.title} className={`rounded-sm border p-4 ${tone.border}`}>
                    <p
                      className={`mb-3 text-[11px] font-semibold uppercase tracking-widest ${tone.label}`}
                    >
                      {section.title}
                    </p>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/65"
                        >
                          <span className={`mt-0.5 shrink-0 ${tone.marker}`} aria-hidden="true">
                            {section.title === "Frustrations" ? "✗" : "✦"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
