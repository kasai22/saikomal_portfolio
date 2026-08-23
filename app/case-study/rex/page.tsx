import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { cssVars } from "@/lib/css-vars";
import { HeroSection } from "@/features/case-study-rex/components/hero-section";
import { OverviewSection } from "@/features/case-study-rex/components/overview-section";
import { ProblemStatementSection } from "@/features/case-study-rex/components/problem-statement-section";
import { SolutionSection } from "@/features/case-study-rex/components/solution-section";
import { KeyFeaturesSection } from "@/features/case-study-rex/components/key-features-section";
import { AgentArchitectureSection } from "@/features/case-study-rex/components/agent-architecture-section";
import { HighFidelityScreensSection } from "@/features/case-study-rex/components/high-fidelity-screens-section";
import { OutcomesSection } from "@/features/case-study-rex/components/outcomes-section";
import { ReflectionSection } from "@/features/case-study-rex/components/reflection-section";

export const metadata: Metadata = {
  title: "Onliest REX — AI Fashion Stylist Case Study",
  description:
    "A case study on designing Onliest REX, a luxury AI recommendation and product-design engine that turns vague fashion instincts into personalized, purchase-ready saree and blouse designs.",
};

const ACCENT_VARS = cssVars({
  "--accent": "#8B6C32",
  "--accent-subtle": "rgba(139,108,50,0.12)",
  "--accent-border": "rgba(139,108,50,0.30)",
});

export default function RexCaseStudyPage() {
  return (
    <div style={ACCENT_VARS} className="min-h-screen bg-paper text-ink">
      <HeroSection />

      <div className="mx-auto max-w-7xl space-y-6 px-6 pb-16">
        <div className="overflow-hidden rounded-sm border border-ink/12 lg:hidden">
          <Image
            src="/rex/rex-hero.svg"
            alt="Onliest REX interface"
            width={1920}
            height={1200}
            className="block h-auto w-full"
          />
        </div>

        <OverviewSection />
        <ProblemStatementSection />
        <SolutionSection />
        <KeyFeaturesSection />
        <AgentArchitectureSection />
        <HighFidelityScreensSection />
        <OutcomesSection />
        <ReflectionSection />

        <CaseStudyCta tagline="Let's design AI experiences people can actually trust." />
      </div>
    </div>
  );
}
