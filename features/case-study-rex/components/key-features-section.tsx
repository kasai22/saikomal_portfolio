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
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20"
          >
            <span className="mb-3 inline-block rounded-full bg-[color:var(--accent-subtle)] px-2.5 py-1 text-xs font-medium text-[color:var(--accent)]">
              {f.tag}
            </span>
            <h4 className="mb-2 text-sm font-bold text-white">{f.title}</h4>
            <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
