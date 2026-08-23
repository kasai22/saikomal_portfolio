import { RevealSection } from "@/components/ui/reveal-section";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ExperienceTimeline } from "@/features/home/components/experience-timeline";
import { EXPERIENCE } from "@/features/home/constants/data";

export function ExperienceSection() {
  return (
    <RevealSection id="experience" className="relative bg-white/[0.02] px-6 py-14">
      <SectionParallaxBg className="left-[15%] bottom-0 h-72 w-72 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <ExperienceTimeline entries={EXPERIENCE} />
      </div>
    </RevealSection>
  );
}
