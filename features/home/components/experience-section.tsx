import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { ExperienceTimeline } from "@/features/home/components/experience-timeline";
import { EXPERIENCE } from "@/features/home/constants/data";

export function ExperienceSection() {
  return (
    <RevealSection id="experience" className="relative bg-white/[0.02] px-6 py-16">
      <SectionParallaxBg className="left-[15%] bottom-0 h-72 w-72 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-4xl">
        <RevealItem className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Where I&apos;ve worked
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Experience
          </h2>
        </RevealItem>

        <ExperienceTimeline entries={EXPERIENCE} />
      </div>
    </RevealSection>
  );
}
