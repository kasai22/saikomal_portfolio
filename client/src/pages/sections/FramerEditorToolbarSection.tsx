import { Card, CardContent } from "@/components/ui/card";

const caseStudyParagraphs = [
  [
    {
      text: "Product design is a dynamic and multifaceted discipline that blends aesthetics, functionality, and innovation to ",
      highlight: false,
    },
    {
      text: "create products",
      highlight: true,
    },
    {
      text: " that enhance users' lives and experiences. Through a meticulous process of ",
      highlight: false,
    },
    {
      text: "research",
      highlight: true,
    },
    {
      text: ", ",
      highlight: false,
    },
    {
      text: "ideation",
      highlight: true,
    },
    {
      text: ", ",
      highlight: false,
    },
    {
      text: "prototyping",
      highlight: true,
    },
    {
      text: ", and ",
      highlight: false,
    },
    {
      text: "iteration",
      highlight: true,
    },
    {
      text: ", product designers transform concepts into tangible ",
      highlight: false,
    },
    {
      text: "solutions",
      highlight: true,
    },
    {
      text: ", addressing both practical needs and emotional desires.",
      highlight: false,
    },
  ],
  [
    {
      text: "Striking a delicate balance between ",
      highlight: false,
    },
    {
      text: "form",
      highlight: true,
    },
    {
      text: " and ",
      highlight: false,
    },
    {
      text: "function",
      highlight: true,
    },
    {
      text: ", product design continually evolves to adapt to emerging technologies, societal trends, and user preferences, ",
      highlight: false,
    },
    {
      text: "shaping the way",
      highlight: true,
    },
    {
      text: " we interact with the world around us and defining the landscape of our everyday lives.",
      highlight: false,
    },
  ],
];

export const FramerEditorToolbarSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="w-full max-w-[800px] rounded-[40px] border-0 bg-transparent p-0 shadow-none">
        <CardContent className="flex w-full flex-col items-start gap-8 px-6 py-8 sm:px-10 sm:py-10 md:px-14">
          <header className="w-full">
            <h2 className="font-display-semibold-l text-[length:var(--display-semibold-l-font-size)] font-[number:var(--display-semibold-l-font-weight)] leading-[var(--display-semibold-l-line-height)] tracking-[var(--display-semibold-l-letter-spacing)] text-adaptivestrong [font-style:var(--display-semibold-l-font-style)]">
              Case Studies
            </h2>
          </header>
          <div className="flex w-full flex-col gap-4">
            {caseStudyParagraphs.map((paragraph, paragraphIndex) => (
              <p
                key={`paragraph-${paragraphIndex}`}
                className="font-heading-regular-l text-[length:var(--heading-regular-l-font-size)] font-[number:var(--heading-regular-l-font-weight)] leading-[var(--heading-regular-l-line-height)] tracking-[var(--heading-regular-l-letter-spacing)] [font-style:var(--heading-regular-l-font-style)]"
              >
                {paragraph.map((segment, segmentIndex) => (
                  <span
                    key={`segment-${paragraphIndex}-${segmentIndex}`}
                    className={
                      segment.highlight ? "text-white" : "text-[#ffffff99]"
                    }
                  >
                    {segment.text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
