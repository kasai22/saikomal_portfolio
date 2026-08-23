import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { PROBLEM_INTRO, PROBLEM_POINTS } from "@/features/case-study-rex/constants/data";

export function ProblemStatementSection() {
  return (
    <section>
      <SectionHeading
        label="Problem Statement"
        title="Fashion Discovery"
        accent="Was Guesswork"
        sub="Luxury customers deserve a stylist's judgment, not a filter panel — but building an AI stylist that's trustworthy, explainable, and commercially sustainable is a much harder problem."
      />
      <AccentCard className="mb-8">
        <p className="text-[15px] leading-relaxed text-white/80">{PROBLEM_INTRO}</p>
      </AccentCard>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEM_POINTS.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/20"
          >
            <div className="mb-4 h-0.5 w-8 rounded-full bg-[color:var(--accent)]" />
            <h3 className="t-h4 mb-2 text-white">{p.title}</h3>
            <p className="text-[13px] leading-relaxed text-white/55">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
