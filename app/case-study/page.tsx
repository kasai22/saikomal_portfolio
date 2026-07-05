import type { Metadata } from "next";
import Image from "next/image";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { IntroSection } from "@/features/case-study-hsl/components/intro-section";
import { PossibleSolutionSection } from "@/features/case-study-hsl/components/possible-solution-section";
import { AudienceAndApproachSection } from "@/features/case-study-hsl/components/audience-and-approach-section";
import { MyRoleSection } from "@/features/case-study-hsl/components/my-role-section";
import { ProblemStatementSection } from "@/features/case-study-hsl/components/problem-statement-section";
import { ProjectTimelineSection } from "@/features/case-study-hsl/components/project-timeline-section";
import { EmpathizePhaseSection } from "@/features/case-study-hsl/components/empathize-phase-section";
import { EmpathyMapSection } from "@/features/case-study-hsl/components/empathy-map-section";
import { DesignThinkingStepsSection } from "@/features/case-study-hsl/components/design-thinking-steps-section";
import { VisualDesignSection } from "@/features/case-study-hsl/components/visual-design-section";
import { UserPersonasSection } from "@/features/case-study-hsl/components/user-personas-section";
import { InformationArchitectureSection } from "@/features/case-study-hsl/components/information-architecture-section";
import { TypographyAndColorsSection } from "@/features/case-study-hsl/components/typography-and-colors-section";
import { HighFidelityDesignsSection } from "@/features/case-study-hsl/components/high-fidelity-designs-section";

export const metadata: Metadata = {
  title: "HSL Website Redesign — Case Study",
  description:
    "A UX/UI case study on redesigning Hindusthan Shipyard Limited's website: research, information architecture, design system, and high-fidelity UI.",
};

export default function HslCaseStudyPage() {
  return (
    <div className="px-4 pt-20 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <BackToPortfolioLink />

        <section className="relative mb-12 w-full">
          <IntroSection />
          <Image
            src="/figmaAssets/image-147.png"
            alt="GRS Innovations"
            width={2704}
            height={1481}
            className="pointer-events-none absolute right-4 top-[120px] hidden h-[249px] w-[454px] object-cover md:right-12 lg:right-[131px] lg:block"
          />
        </section>

        <div className="flex flex-col gap-16 pb-20">
          <PossibleSolutionSection />
          <AudienceAndApproachSection />
          <MyRoleSection />

          <section className="w-full rounded-2xl bg-[#0e0e0e] p-6 md:p-10">
            <ProblemStatementSection />
          </section>

          <section className="w-full overflow-x-auto rounded-2xl bg-[#0e0e0e] p-6 md:p-10">
            <h2 className="mb-6 font-display text-2xl font-medium text-white">
              Project <span className="font-bold text-brand">Timeline</span>
            </h2>
            <ProjectTimelineSection />
          </section>

          <EmpathizePhaseSection />
          <EmpathyMapSection />
          <DesignThinkingStepsSection />
          <VisualDesignSection />
          <UserPersonasSection />
          <InformationArchitectureSection />
          <TypographyAndColorsSection />
          <HighFidelityDesignsSection />
        </div>
      </div>
    </div>
  );
}
