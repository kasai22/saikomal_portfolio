import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { cssVars } from "@/lib/css-vars";
import { HeroSection } from "@/features/case-study-hsl/components/hero-section";
import { OverviewSection } from "@/features/case-study-hsl/components/overview-section";
import { ProblemStatementSection } from "@/features/case-study-hsl/components/problem-statement-section";
import { SolutionSection } from "@/features/case-study-hsl/components/solution-section";
import { MyRoleSection } from "@/features/case-study-hsl/components/my-role-section";
import { AudienceAndApproachSection } from "@/features/case-study-hsl/components/audience-and-approach-section";
import { ProjectTimelineSection } from "@/features/case-study-hsl/components/project-timeline-section";
import { ResearchSection } from "@/features/case-study-hsl/components/research-section";
import { EmpathyMapSection } from "@/features/case-study-hsl/components/empathy-map-section";
import { UserGroupsSection } from "@/features/case-study-hsl/components/user-groups-section";
import { DesignThinkingStepsSection } from "@/features/case-study-hsl/components/design-thinking-steps-section";
import { InformationArchitectureSection } from "@/features/case-study-hsl/components/information-architecture-section";
import { VisualDesignSection } from "@/features/case-study-hsl/components/visual-design-section";
import { TypographyAndColorsSection } from "@/features/case-study-hsl/components/typography-and-colors-section";
import { HighFidelityDesignsSection } from "@/features/case-study-hsl/components/high-fidelity-designs-section";
import { OutcomesSection } from "@/features/case-study-hsl/components/outcomes-section";

export const metadata: Metadata = {
  title: "Hindustan Shipyard Enterprise Digital Experience — Case Study",
  description:
    "How five disconnected modules at Hindustan Shipyard Limited became one ecosystem — replacing status-chasing phone calls with a candidate portal and a live tenders dashboard. Shipped.",
};

const ACCENT_VARS = cssVars({
  "--accent": "#0C7E7E",
  "--accent-subtle": "rgba(12,126,126,0.12)",
  "--accent-border": "rgba(12,126,126,0.30)",
});

export default function HslCaseStudyPage() {
  return (
    <div style={ACCENT_VARS} className="min-h-screen bg-paper text-ink">
      <HeroSection />

      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-16">
        <div className="overflow-hidden rounded-sm border border-ink/12 lg:hidden">
          <Image
            src="/figmaAssets/image-16.png"
            alt="Redesigned Hindustan Shipyard Limited homepage"
            width={1424}
            height={711}
            className="block h-auto w-full"
          />
        </div>

        <OverviewSection />
        <ProblemStatementSection />
        <SolutionSection />
        <MyRoleSection />
        <AudienceAndApproachSection />
        <ProjectTimelineSection />
        <ResearchSection />
        <EmpathyMapSection />
        <UserGroupsSection />
        <DesignThinkingStepsSection />
        <InformationArchitectureSection />
        <VisualDesignSection />
        <TypographyAndColorsSection />
        <HighFidelityDesignsSection />
        <OutcomesSection />

        <CaseStudyCta tagline="Let's make the status visible before it becomes a phone call." />
      </div>
    </div>
  );
}
