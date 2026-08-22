import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { ABOUT_STATS } from "@/features/home/constants/data";

export function AboutSection() {
  return (
    <RevealSection id="about" className="relative px-6 py-16">
      <SectionParallaxBg className="right-[12%] top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto max-w-4xl">
        <RevealItem className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">About Me</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            A designer with an <span className="text-brand">engineering mindset</span>
          </h2>
        </RevealItem>

        <RevealItem delayMs={100}>
          <GlassSurface level={2} className="space-y-5 p-6 lg:p-8">
            <p className="text-base leading-relaxed text-white/80">
              I&apos;m a <strong className="text-white">Product Designer and UX Engineer</strong> — I
              design the screens and I build a working version of them, so what an engineering team
              gets isn&apos;t a static mockup that falls apart at the first edge case.
            </p>
            <p className="leading-relaxed text-white/70">
              I started in <strong className="text-white">mechanical engineering</strong> (B.Tech, VIT
              Vellore), then moved through data engineering before landing in UX — which is probably
              why most of my work is enterprise dashboards and admin consoles: the kind of product
              where the hard part isn&apos;t one screen, it&apos;s making a hundred data points,
              permission levels, and edge states hold together as one system.
            </p>
            <p className="leading-relaxed text-white/70">
              I&apos;ve worked this way across a fleet management platform for logistics operators, a
              DevOps monitoring dashboard, and an AI styling product for a fashion platform —
              different domains, same process: talk to the people who&apos;ll actually use it, build
              something clickable fast, and let real usage tell me what to fix next.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-brand">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </GlassSurface>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
