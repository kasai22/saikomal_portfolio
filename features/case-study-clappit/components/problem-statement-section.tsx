import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { PROBLEM_INTRO, PROBLEM_POINTS } from "@/features/case-study-clappit/constants/data";

export function ProblemStatementSection() {
  return (
    <section>
      <SectionHeading
        label="Problem Statement"
        title="The Experience"
        accent="Was Broken"
        sub="DevOps engineers are powerful users — but the existing interface was working against them at every turn."
      />
      <AccentCard className="mb-8">
        <p className="text-lg leading-relaxed text-white/80">{PROBLEM_INTRO}</p>
      </AccentCard>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEM_POINTS.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/20"
          >
            <div className="mb-4 h-0.5 w-8 rounded-full bg-[color:var(--accent)]" />
            <h4 className="mb-2 text-sm font-semibold text-white">{p.title}</h4>
            <p className="text-sm leading-relaxed text-white/55">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
