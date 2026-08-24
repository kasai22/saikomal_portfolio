import { SectionHeading } from "@/components/case-study/section-heading";
import { KEY_FEATURES } from "@/features/case-study-rex/constants/data";

export function KeyFeaturesSection() {
  return (
    <section>
      <SectionHeading
        label="Key Features"
        title="Four Ways In,"
        accent="One Recommendation Engine"
        sub="Whether a customer converses, steps through a Wizard, uploads inspiration, or simply browses, every path resolves to the same scored, explainable recommendation."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {KEY_FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-sm border border-ink/12 bg-ink/[0.033] p-6 transition-colors duration-instant hover:border-ink/20"
          >
            <span className="mb-3 inline-block rounded-full bg-[color:var(--accent-subtle)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--accent)]">
              {f.tag}
            </span>
            <h3 className="t-h4 mb-2 text-ink">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-ink/62">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
