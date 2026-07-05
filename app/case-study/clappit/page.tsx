import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { cssVars } from "@/lib/css-vars";
import { HeroSection } from "@/features/case-study-clappit/components/hero-section";
import { ProblemStatementSection } from "@/features/case-study-clappit/components/problem-statement-section";
import { TargetAudienceSection } from "@/features/case-study-clappit/components/target-audience-section";
import { DesignProcessSection } from "@/features/case-study-clappit/components/design-process-section";
import { DesignGoalsSection } from "@/features/case-study-clappit/components/design-goals-section";
import { CompetitiveAnalysisSection } from "@/features/case-study-clappit/components/competitive-analysis-section";
import { DesignThinkingSection } from "@/features/case-study-clappit/components/design-thinking-section";
import { VisualDesignSection } from "@/features/case-study-clappit/components/visual-design-section";
import { UserResearchSection } from "@/features/case-study-clappit/components/user-research-section";
import { UserFlowSection } from "@/features/case-study-clappit/components/user-flow-section";
import { TypographyColorsSection } from "@/features/case-study-clappit/components/typography-colors-section";
import { HighFidelityScreensSection } from "@/features/case-study-clappit/components/high-fidelity-screens-section";
import { OutcomesImpactSection } from "@/features/case-study-clappit/components/outcomes-impact-section";
import { FinalReflectionSection } from "@/features/case-study-clappit/components/final-reflection-section";

export const metadata: Metadata = {
  title: "ClappIt — Cloud Infrastructure & DevOps Platform",
  description:
    "A case study on redesigning ClappIt, an enterprise cloud infrastructure platform, from cognitively overloaded DevOps dashboards into a clarity-first product.",
};

const ACCENT_VARS = cssVars({
  "--accent": "#E8273A",
  "--accent-subtle": "rgba(232,39,58,0.10)",
  "--accent-border": "rgba(232,39,58,0.33)",
});

export default function ClappitCaseStudyPage() {
  return (
    <div style={ACCENT_VARS} className="min-h-screen bg-[#0a0a0a] text-white">
      <HeroSection />

      <div className="mx-auto max-w-7xl space-y-28 px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-white/10 lg:hidden">
          <Image
            src="/figmaAssets/clappit-dashboard.png"
            alt="ClappIt dashboard"
            width={1920}
            height={1580}
            className="block h-auto w-full"
          />
        </div>

        <ProblemStatementSection />
        <TargetAudienceSection />
        <DesignProcessSection />
        <DesignGoalsSection />
        <CompetitiveAnalysisSection />
        <DesignThinkingSection />
        <VisualDesignSection />
        <UserResearchSection />
        <UserFlowSection />
        <TypographyColorsSection />
        <HighFidelityScreensSection />
        <OutcomesImpactSection />
        <FinalReflectionSection />

        <CaseStudyCta tagline="Let's build something that's both powerful and clear." />
      </div>
    </div>
  );
}
