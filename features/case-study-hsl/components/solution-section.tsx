import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { POSSIBLE_SOLUTION_DESCRIPTION } from "@/features/case-study-hsl/constants/data";

const SOLUTION_PILLARS = [
  {
    title: "A candidate portal",
    detail:
      "Applicants log in to see their submitted resume on record and an explicit status — selected, rejected, or in process — instead of waiting on an email that may never arrive.",
  },
  {
    title: "A live tenders dashboard",
    detail:
      "Live tenders, requirements, and updates published on the platform, making the site the authoritative source rather than a mail thread.",
  },
  {
    title: "One system, five modules",
    detail:
      "A shared navigation model, component set, and accessibility baseline across HRMS, tenders, vendor management, vigilance, and the public portfolio.",
  },
];

export function SolutionSection() {
  return (
    <section>
      <SectionHeading label="The Solution" title="One Rule, Applied" accent="Everywhere" />

      <AccentCard className="mb-6">
        <p className="mb-4 text-[15px] font-medium leading-relaxed text-ink">
          Wherever someone was sending an email to find out where they stood, give them a screen
          that just tells them.
        </p>
        <p className="text-[13px] leading-relaxed text-ink/70">{POSSIBLE_SOLUTION_DESCRIPTION}</p>
      </AccentCard>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SOLUTION_PILLARS.map((pillar, index) => (
          <SurfaceCard key={pillar.title}>
            <div className="mb-4 text-[11px] font-bold tracking-widest text-[color:var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-3 text-[13px] font-bold text-ink">{pillar.title}</h3>
            <p className="text-[13px] leading-relaxed text-ink/65">{pillar.detail}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
