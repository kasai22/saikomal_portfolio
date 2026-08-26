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
import { ProcessArtifactsSection } from "@/features/case-study-hsl/components/process-artifacts-section";
import { CourseCorrection } from "@/components/case-study/course-correction";
import { EmpathyMapSection } from "@/features/case-study-hsl/components/empathy-map-section";
import { UserGroupsSection } from "@/features/case-study-hsl/components/user-groups-section";
import { DesignThinkingStepsSection } from "@/features/case-study-hsl/components/design-thinking-steps-section";
import { InformationArchitectureSection } from "@/features/case-study-hsl/components/information-architecture-section";
import { VisualDesignSection } from "@/features/case-study-hsl/components/visual-design-section";
import { TypographyAndColorsSection } from "@/features/case-study-hsl/components/typography-and-colors-section";
import { HighFidelityDesignsSection } from "@/features/case-study-hsl/components/high-fidelity-designs-section";
import { OutcomesSection } from "@/features/case-study-hsl/components/outcomes-section";
import { SectionRail } from "@/components/case-study/section-rail";

export const metadata: Metadata = {
  title: "Hindustan Shipyard: Unified Public Sector Portal",
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
      <SectionRail />
      <HeroSection />

      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-16">
        <div className="border-ink/12 overflow-hidden rounded-sm border lg:hidden">
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
        <ProcessArtifactsSection />
        <UserGroupsSection />
        <DesignThinkingStepsSection />
        <InformationArchitectureSection />
        <VisualDesignSection />
        <TypographyAndColorsSection />
        <HighFidelityDesignsSection />
        <OutcomesSection />
        <CourseCorrection
          firstTake="I took the brief at face value: the platform was outdated and non-responsive, so this was a visual and responsive redesign across five modules."
          whatChangedIt="The stakeholder sessions kept returning to the same thing, and it was never layout. Staff were spending a large part of the day answering “where does mine stand?” — the system already held every status, but only a person could release it."
          whatIDid="Reframed the project from a redesign to a status-visibility problem, and reran Define against that. The candidate portal and the tenders dashboard exist because of that reframe; a purely visual refresh would have shipped and changed nothing."
          cost="The first round of module wireframes was scrapped, and Empathize/Define ran considerably longer than planned."
        />

        <CaseStudyCta tagline="Let's make the status visible before it becomes a phone call." />
      </div>
    </div>
  );
}
