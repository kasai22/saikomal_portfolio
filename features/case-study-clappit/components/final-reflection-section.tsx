import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { ENTERPRISE_LEARNINGS, SYSTEM_INVESTMENT_POINTS } from "@/features/case-study-clappit/constants/data";

export function FinalReflectionSection() {
  return (
    <section>
      <SectionHeading
        label="Reflection"
        title="What I"
        accent="Learned"
        sub="Eight months of designing for one of the most technically demanding audiences in product design."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-6 font-bold text-white">Enterprise UX Learnings</h3>
          <div className="space-y-5">
            {ENTERPRISE_LEARNINGS.map((i) => (
              <div key={i.l} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">→</span>
                <div>
                  <div className="mb-1 text-sm font-semibold text-white">{i.l}</div>
                  <div className="text-sm leading-relaxed text-white/50">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div className="space-y-6">
          <AccentCard>
            <h3 className="mb-4 text-lg font-bold text-[color:var(--accent)]">Closing Thought</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Designing ClappIt reinforced something I believe deeply about enterprise UX: the
              best interfaces aren&apos;t the most minimal — they&apos;re the most{" "}
              <em>intentionally organised</em>. Technical users don&apos;t need less data. They
              need data that speaks clearly, at the right moment, at the right level of detail.
            </p>
            <p className="leading-relaxed text-white/70">
              The dashboard we built doesn&apos;t hide the complexity of Kubernetes
              orchestration. It <em>structures</em> it — putting critical information exactly
              where an engineer&apos;s eyes land first, and every subsequent layer one deliberate
              click away.
            </p>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-sm text-white/40">
                That&apos;s not simplification. That&apos;s{" "}
                <span className="font-semibold text-[color:var(--accent)]">
                  clarity-first design
                </span>{" "}
                for people who know exactly what they&apos;re doing.
              </p>
            </div>
          </AccentCard>
          <SurfaceCard>
            <h3 className="mb-4 text-sm font-bold text-white">Scalability in Product Design</h3>
            <p className="mb-4 text-sm leading-relaxed text-white/55">
              The most important design decision I made on this project wasn&apos;t a layout
              choice or a color choice — it was the decision to build a proper design system
              before designing any final screens.
            </p>
            <div className="space-y-2">
              {SYSTEM_INVESTMENT_POINTS.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">✦</span> {p}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
}
