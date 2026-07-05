import { SectionHeading } from "@/components/case-study/section-heading";
import { USER_FLOW_REDESIGNS } from "@/features/case-study-clappit/constants/data";

export function UserFlowSection() {
  return (
    <section>
      <SectionHeading
        label="User Flow & IA"
        title="Redesigning"
        accent="the Workflows"
        sub="Five critical workflows redesigned from the ground up — each measured by steps reduced and decisions eliminated."
      />
      <div className="space-y-6">
        {USER_FLOW_REDESIGNS.map((f) => (
          <div key={f.flow} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-6 py-4">
              <span className="text-xl">{f.icon}</span>
              <h4 className="font-bold text-white">{f.flow}</h4>
            </div>
            <div className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="p-5">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-white/30">
                  Before
                </span>
                <ol className="space-y-2">
                  {f.before.map((s, i) => (
                    <li key={s} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-[10px] text-red-400">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-5">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-white/30">
                  After
                </span>
                <ol className="space-y-2">
                  {f.after.map((s, i) => (
                    <li key={s} className="flex items-start gap-2 text-xs text-white/65">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-subtle)] text-[10px] text-[color:var(--accent)]">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col justify-center p-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                  Improvement
                </span>
                <p className="text-sm leading-relaxed text-white/65">{f.improvement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
