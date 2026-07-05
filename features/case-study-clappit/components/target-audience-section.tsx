import { SectionHeading } from "@/components/case-study/section-heading";
import { AUDIENCE_SEGMENTS } from "@/features/case-study-clappit/constants/data";

export function TargetAudienceSection() {
  return (
    <section>
      <SectionHeading
        label="Target Audience"
        title="Who We"
        accent="Designed For"
        sub="Five distinct user types — each with unique goals, frustrations, and workflow expectations that shaped every design decision."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {AUDIENCE_SEGMENTS.map((a) => (
          <div
            key={a.role}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/20"
          >
            <div className="mb-5 flex items-start gap-3 border-b border-white/[0.08] pb-5">
              <span className="text-2xl">{a.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-white">{a.role}</h3>
                <span className="mt-1 inline-block rounded-full bg-[color:var(--accent-subtle)] px-2 py-0.5 text-xs font-medium text-[color:var(--accent)]">
                  Frequency: {a.freq}
                </span>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Goal
                </span>
                <p className="mt-1 leading-relaxed text-white/65">{a.goal}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Frustration
                </span>
                <p className="mt-1 leading-relaxed text-[#ff8a94]">{a.frustration}</p>
              </div>
              <div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/30">
                  Core Needs
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {a.needs.map((n) => (
                    <li
                      key={n}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Behavior Pattern
                </span>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{a.behavior}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
