import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { ApproachOverviewSection } from "./sections/ApproachOverviewSection";
import { CaseStudiesDescriptionSection } from "./sections/CaseStudiesDescriptionSection";
import { CaseStudiesHeroSection } from "./sections/CaseStudiesHeroSection";
import { CaseStudiesPreviewSection } from "./sections/CaseStudiesPreviewSection";
import { CaseStudiesTitleSection } from "./sections/CaseStudiesTitleSection";
import { DesignProcessFlowSection } from "./sections/DesignProcessFlowSection";
import { DesignThinkingProcessSection } from "./sections/DesignThinkingProcessSection";
import { ExplorationPhaseSection } from "./sections/ExplorationPhaseSection";
import { FramerEditorToolbarSection } from "./sections/FramerEditorToolbarSection";
import { KeyInsightsSection } from "./sections/KeyInsightsSection";
import { MyToolsSection } from "./sections/MyToolsSection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection";
import { SolutionMockupSection } from "./sections/SolutionMockupSection";
import { TargetAudienceIllustrationSection } from "./sections/TargetAudienceIllustrationSection";

export const CaseStudy = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <Link href="/">
            <button className="mb-8 mt-4 flex items-center gap-2 text-[#008080] hover:text-white transition-colors font-['Poppins'] text-sm font-medium group">
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </Link>

          <section className="relative w-full mb-12">
            <FramerEditorToolbarSection />
            <img
              className="pointer-events-none absolute right-4 top-[120px] hidden h-[249px] w-[454px] object-cover md:right-[48px] lg:right-[131px] lg:block"
              alt="GRS Innovations"
              src="/figmaAssets/image-147.png"
            />
          </section>

          <div className="flex flex-col gap-16 pb-20">
            <CaseStudiesDescriptionSection />
            <CaseStudiesPreviewSection />
            <CaseStudiesHeroSection />
            <section className="w-full rounded-2xl bg-[#0e0e0e] p-6 md:p-10">
              <CaseStudiesTitleSection />
            </section>
            <section className="w-full rounded-2xl bg-[#0e0e0e] p-6 md:p-10 overflow-x-auto">
              <h2 className="font-['Poppins'] text-2xl font-medium text-white mb-6">
                Project <span className="text-[#008080] font-bold">Timeline</span>
              </h2>
              <ProjectOverviewSection />
            </section>
            <SolutionMockupSection />
            <MyToolsSection />
            <TargetAudienceIllustrationSection />
            <ApproachOverviewSection />
            <DesignProcessFlowSection />
            <ExplorationPhaseSection />
            <KeyInsightsSection />
            <DesignThinkingProcessSection />
          </div>
        </div>
      </div>
    </div>
  );
};
