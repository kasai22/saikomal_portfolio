import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { ABOUT_STATS, DESIGN_PHILOSOPHY_QUOTE, WHAT_I_BRING } from "@/features/home/constants/data";

export function AboutSection() {
  return (
    <RevealSection id="about" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-12 flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            About Me
          </span>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Who I <span className="text-brand">Am</span>
          </h2>
        </RevealItem>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <RevealItem delayMs={100}>
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-white/80">
                I&apos;m a{" "}
                <strong className="text-white">
                  Product Designer and Frontend Developer
                </strong>{" "}
                passionate about crafting digital experiences that are not just beautiful but
                deeply usable.
              </p>
              <p className="leading-relaxed text-white/70">
                With a background spanning design research, wireframing, and front-end
                implementation, I bridge the gap between design and development — bringing ideas
                to life with pixel-perfect precision and user empathy at the core.
              </p>
              <p className="leading-relaxed text-white/70">
                My design process centers around understanding real users — their needs,
                frustrations, and goals. Whether it&apos;s a shipyard website, a mobile app, or a
                SaaS dashboard, I approach every project with the same rigor: research first,
                iterate fast, validate always.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-brand">{stat.value}</div>
                    <div className="mt-1 text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          <RevealItem delayMs={200} className="flex flex-col gap-6">
            <div className="rounded-3xl border border-brand/30 bg-brand/5 p-8">
              <h3 className="mb-4 text-xl font-semibold text-brand">Design Philosophy</h3>
              <p className="leading-relaxed text-white/70">&quot;{DESIGN_PHILOSOPHY_QUOTE}&quot;</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-4 text-xl font-semibold text-white">What I Bring</h3>
              <ul className="space-y-3">
                {WHAT_I_BRING.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <span className="mt-1 shrink-0 text-brand">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
