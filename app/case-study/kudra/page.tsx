import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { HeroSection } from "@/features/case-study-kudra/components/hero-section";
import { OverviewSection } from "@/features/case-study-kudra/components/overview-section";
import { ProblemStatementSection } from "@/features/case-study-kudra/components/problem-statement-section";
import { VisionSection } from "@/features/case-study-kudra/components/vision-section";
import { TargetAudienceSection } from "@/features/case-study-kudra/components/target-audience-section";
import { ResearchSection } from "@/features/case-study-kudra/components/research-section";
import { KeyInsightsSection } from "@/features/case-study-kudra/components/key-insights-section";
import { UxGoalsSection } from "@/features/case-study-kudra/components/ux-goals-section";
import { InformationArchitectureSection } from "@/features/case-study-kudra/components/information-architecture-section";
import { CoreWorkflowSection } from "@/features/case-study-kudra/components/core-workflow-section";
import { UserFlowSection } from "@/features/case-study-kudra/components/user-flow-section";
import { WireframingSection } from "@/features/case-study-kudra/components/wireframing-section";
import { DesignSystemSection } from "@/features/case-study-kudra/components/design-system-section";
import { HighFidelitySection } from "@/features/case-study-kudra/components/high-fidelity-section";
import { KeyFeaturesSection } from "@/features/case-study-kudra/components/key-features-section";
import { ChallengesSection } from "@/features/case-study-kudra/components/challenges-section";
import { OutcomesSection } from "@/features/case-study-kudra/components/outcomes-section";
import { LearningsSection } from "@/features/case-study-kudra/components/learnings-section";
import { FutureScopeSection } from "@/features/case-study-kudra/components/future-scope-section";
import { DeliverablesSection } from "@/features/case-study-kudra/components/deliverables-section";
import { cssVars } from "@/lib/css-vars";

export const metadata: Metadata = {
  title: "Kudra — Fleet & Trip Management Platform",
  description:
    "A case study on designing Kudra, an enterprise logistics SaaS that transformed fragmented fleet operations into a structured, trip-centric management system.",
};

const ACCENT_VARS = cssVars({
  "--accent": "#956807",
  "--accent-subtle": "rgba(149,104,7,0.12)",
  "--accent-border": "rgba(245,183,49,0.25)",
});

export default function KudraCaseStudyPage() {
  return (
    <div style={ACCENT_VARS} className="min-h-screen bg-paper text-ink">
      <HeroSection />

      <div className="mx-auto max-w-7xl space-y-6 px-6 pb-16">
        <div className="overflow-hidden rounded-sm border border-ink/12 lg:hidden">
          <Image
            src="/figmaAssets/kudra-dashboard.png"
            alt="Kudra fleet operations dashboard"
            width={1917}
            height={1020}
            className="block h-auto w-full"
          />
        </div>

        <OverviewSection />
        <ProblemStatementSection />
        <VisionSection />
        <TargetAudienceSection />
        <ResearchSection />
        <KeyInsightsSection />
        <UxGoalsSection />
        <InformationArchitectureSection />
        <CoreWorkflowSection />
        <UserFlowSection />
        <WireframingSection />
        <DesignSystemSection />
        <HighFidelitySection />
        <KeyFeaturesSection />
        <ChallengesSection />
        <OutcomesSection />
        <LearningsSection />
        <FutureScopeSection />
        <DeliverablesSection />

        <CaseStudyCta tagline="Let's build something operationally transformative." />
      </div>
    </div>
  );
}
