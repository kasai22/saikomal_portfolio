import { Card, CardContent } from "@/components/ui/card";

const processSteps = [
  {
    title: "Emphatize",
    iconSrc: "/figmaAssets/carbon-text-link-analysis.svg",
    iconAlt: "Carbon text link",
    connectorSrc: "/figmaAssets/group-387.png",
    items: ["User Research", "User Interview", "Entrant Analysis"],
  },
  {
    title: "Define",
    iconSrc: "/figmaAssets/fluent-calendar-search-16-regular.svg",
    iconAlt: "Fluent calendar",
    connectorSrc: "/figmaAssets/group-419.png",
    items: ["User Persona", "User Jouney Map", "Goal Statement", "Empathy Map"],
  },
  {
    title: "Ideate",
    iconSrc: "/figmaAssets/icons8-idea.svg",
    iconAlt: "Idea",
    connectorSrc: "/figmaAssets/group-420.png",
    items: ["Brainstorming", "Card Sorting", "User Flow"],
  },
  {
    title: "Design",
    iconSrc: "/figmaAssets/fluent-design-ideas-16-regular.svg",
    iconAlt: "Fluent design ideas",
    connectorSrc: "/figmaAssets/group-421.png",
    items: ["Paper Wireframes", "Visual Design", "Prototype"],
  },
  {
    title: "Test",
    iconSrc: "/figmaAssets/file-icons-testcafe.svg",
    iconAlt: "File icons testcafe",
    items: ["CheckUsability", "Survey Insight", "Improvements"],
  },
];

export const TargetAudienceIllustrationSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-3 py-0 text-white">
      <div className="mx-auto flex w-full max-w-[1226px] flex-col items-center">
        <header className="flex w-full flex-col items-center">
          <div className="mt-7 h-8 w-full max-w-[487px] rounded-[94px] bg-[#212121]" />
          <h2 className="-mt-8 text-center [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0]">
            <span className="font-bold text-[#008080]">Design Thinking</span>
            <span className="font-bold text-white">&nbsp;</span>
            <span className="font-medium text-white">Process</span>
          </h2>
          <p className="mt-[70px] w-full max-w-[1184px] text-justify [font-family:'Poppins',Helvetica] text-[26px] font-normal leading-[normal] tracking-[0] text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </header>
        <div className="mt-[115px] grid w-full grid-cols-5 items-start gap-3 md:gap-6">
          {processSteps.map((step, index) => (
            <article key={step.title} className="flex flex-col items-center">
              <div className="flex w-full items-center justify-center">
                <Card className="w-full max-w-[156px] rounded-[77.83px/81.5px] border-0 bg-[#212121] shadow-[0px_2px_10px_#0000001a]">
                  <CardContent className="flex h-[163px] items-center justify-center p-0">
                    <img
                      className="max-h-[88px] w-auto object-contain"
                      alt={step.iconAlt}
                      src={step.iconSrc}
                    />
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <img
                    className="ml-3 hidden h-[33px] w-[79px] object-contain md:block"
                    alt="Group"
                    src={step.connectorSrc}
                  />
                )}
              </div>
              <h3 className="mt-5 text-center [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-white">
                {step.title}
              </h3>
              <div className="mt-6 text-center [font-family:'Poppins',Helvetica] text-xl font-normal leading-[normal] tracking-[0] text-white">
                {step.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
