import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import {
  INTERVIEW_GROUPS,
  KEY_INSIGHTS_FROM_RESEARCH,
  QUALITATIVE_RESEARCH_SUMMARY,
} from "@/features/case-study-hsl/constants/data";

const RESEARCH_STATS = [
  { value: "5", label: "Modules covered" },
  { value: "~5", label: "Stakeholders each" },
  { value: "3", label: "Session groups" },
  { value: "8wk", label: "Research & UX" },
];

export function ResearchSection() {
  return (
    <section>
      <SectionHeading label="Empathize Phase" title="Understanding the" accent="Workflows" />

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-4 font-semibold text-white">Qualitative research</h3>
          <p className="text-sm leading-relaxed text-white/65">{QUALITATIVE_RESEARCH_SUMMARY}</p>
        </SurfaceCard>

        <AccentCard className="flex flex-col justify-center">
          <h3 className="mb-2 text-lg font-bold text-[color:var(--accent)]">Research approach</h3>
          <p className="mb-6 text-sm leading-relaxed text-white/60">
            Stakeholder-led rather than survey-led. Working sessions with the branch teams who
            operated each module day to day, walking their real process step by step instead of
            asking them to describe it in the abstract.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {RESEARCH_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <div className="text-2xl font-bold text-[color:var(--accent)]">{stat.value}</div>
                <div className="mt-1 text-xs text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </AccentCard>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
          What I asked in each session
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {INTERVIEW_GROUPS.map((group) => (
            <SurfaceCard key={group.title}>
              <h4 className="mb-4 text-sm font-bold text-white">{group.title}</h4>
              <ul className="space-y-3">
                {group.questions.map((question) => (
                  <li
                    key={question}
                    className="border-l-2 border-[color:var(--accent-border)] pl-3 text-sm leading-relaxed text-white/60"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
          Key insights
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {KEY_INSIGHTS_FROM_RESEARCH.map((insight, index) => {
            const [title, ...rest] = insight.split(/\.\s(.+)/s);
            return (
              <SurfaceCard key={insight}>
                <div className="mb-3 text-xs font-bold tracking-widest text-[color:var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h4 className="mb-3 text-sm font-bold leading-relaxed text-white">{title}.</h4>
                <p className="text-sm leading-relaxed text-white/60">{rest.join("")}</p>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
