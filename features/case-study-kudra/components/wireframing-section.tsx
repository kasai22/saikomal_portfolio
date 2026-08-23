import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { BALANCING_FACTORS, EXPLORATION_AREAS, WIREFRAME_OUTCOMES } from "@/features/case-study-kudra/constants/data";

export function WireframingSection() {
  return (
    <section>
      <SectionHeading label="Wireframing & Exploration" title="From Concept to" accent="Structure" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="mb-2 leading-relaxed text-ink/70">
            Early explorations focused on establishing the right operational hierarchy before
            touching visual design.
          </p>
          {EXPLORATION_AREAS.map((e) => (
            <div key={e.area} className="flex items-start gap-4 rounded-sm border border-ink/12 bg-ink/[0.035] p-4">
              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
              <div>
                <div className="text-[13px] font-semibold text-ink">{e.area}</div>
                <div className="mt-0.5 text-[13px] text-ink/60">{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <AccentCard className="flex flex-col justify-between gap-8">
          <div>
            <h3 className="mb-4 text-[15px] font-bold text-[color:var(--accent)]">The Balancing Act</h3>
            <p className="mb-5 text-[13px] leading-relaxed text-ink/65">
              Low-fidelity wireframes went through 5 rounds of iteration. The central challenge
              was balancing three competing forces across every screen:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {BALANCING_FACTORS.map((b) => (
                <div key={b.f} className="flex items-center justify-between rounded-sm border border-ink/12 bg-ink/[0.035] px-4 py-3">
                  <span className="text-[13px] text-ink/72">{b.f}</span>
                  <span className="text-[11px] italic text-ink/60">{b.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-[13px] font-bold text-ink">Low-fidelity wireframes established:</h3>
            <BulletList items={WIREFRAME_OUTCOMES} />
          </div>
        </AccentCard>
      </div>
    </section>
  );
}
