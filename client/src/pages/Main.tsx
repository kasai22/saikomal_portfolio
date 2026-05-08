import { Card, CardContent } from "@/components/ui/card";
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

const sections = [
  { key: "case-studies-title", component: <CaseStudiesTitleSection /> },
  {
    key: "case-studies-description",
    component: <CaseStudiesDescriptionSection />,
  },
  { key: "case-studies-preview", component: <CaseStudiesPreviewSection /> },
  { key: "case-studies-hero", component: <CaseStudiesHeroSection /> },
  { key: "project-overview", component: <ProjectOverviewSection /> },
  { key: "solution-mockup", component: <SolutionMockupSection /> },
  {
    key: "target-audience-illustration",
    component: <TargetAudienceIllustrationSection />,
  },
  { key: "approach-overview", component: <ApproachOverviewSection /> },
  { key: "my-tools", component: <MyToolsSection /> },
  { key: "design-process-flow", component: <DesignProcessFlowSection /> },
  { key: "exploration-phase", component: <ExplorationPhaseSection /> },
  { key: "key-insights", component: <KeyInsightsSection /> },
  {
    key: "design-thinking-process",
    component: <DesignThinkingProcessSection />,
  },
];

export const Main = (): JSX.Element => {
  return (
    <main className="w-full bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col">
        <section className="relative w-full">
          <FramerEditorToolbarSection />
          <img
            className="pointer-events-none absolute right-4 top-[120px] hidden h-[249px] w-[454px] object-cover md:right-[48px] lg:right-[131px] lg:block"
            alt="Image"
            src="/figmaAssets/image-147.png"
          />
        </section>
        <Card className="w-full border-0 bg-transparent shadow-none">
          <CardContent className="flex w-full flex-col items-center gap-0 px-0 py-0">
            {sections.map((section) => (
              <section key={section.key} className="relative w-full">
                {section.component}
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
