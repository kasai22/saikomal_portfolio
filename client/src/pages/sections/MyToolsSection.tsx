import { Card, CardContent } from "@/components/ui/card";

const empathySections = [
  {
    title: "Says",
    items: [
      "I need easy access to tender details.",
      "How can I track my application?",
      "I want to connect with the right department quickly.",
    ],
  },
  {
    title: "Thinks",
    items: [
      "Is this information reliable and up-to-date?",
      "Is this process secure?",
      "Will I get timely updates on my application or tender?",
    ],
  },
  {
    title: "Does",
    items: [
      "Logs in to the employee portal for payroll or attendance tracking.",
      "Searches for current tenders.",
      "Applies for a job opening.",
      'Uses the "Contact Us" feature to ask a question or report an issue.',
    ],
  },
  {
    title: "Feels",
    items: [
      "Feels confused if the navigation isn't intuitive.",
      "Feels frustrated if there's no clear status tracking for tenders or job applications.",
      "Feels relieved when support is easily accessible.",
      "Feels satisfied when tasks are completed smoothly and promptly.",
    ],
  },
];

export const MyToolsSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-0 text-white">
      <header className="mb-8 flex items-start gap-3">
        <span className="mt-1 inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#212121]">
          <span className="inline-flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#212121]">
            <span className="h-5 w-5 rounded-full bg-[#008080]" />
          </span>
        </span>
        <h2 className="[font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-white">
          Empathy Map
        </h2>
      </header>
      <div className="relative mx-auto max-w-[1192px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
          {empathySections.map((section) => (
            <Card
              key={section.title}
              className="rounded-[25px] border-0 bg-[#008080] shadow-none"
            >
              <CardContent
                className={`[font-family:'Poppins',Helvetica] px-[28px] pb-[30px] pt-[18px] text-white ${
                  section.title === "Says" || section.title === "Thinks"
                    ? "min-h-[313px]"
                    : "min-h-[477px]"
                }`}
              >
                <h3 className="mb-6 text-[34px] font-medium leading-[normal] tracking-[0] text-white">
                  {section.title}
                </h3>
                <div className="text-justify text-[25px] font-normal leading-[1.4] tracking-[0] text-white">
                  {section.items.map((item, index) => (
                    <p
                      key={`${section.title}-${index}`}
                      className={index > 0 ? "mt-3" : ""}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <img
            className="h-[249px] w-[249px] rounded-full border-[10px] border-solid border-white object-cover"
            alt="Ellipse"
            src="/figmaAssets/ellipse-64.png"
          />
        </div>
      </div>
    </section>
  );
};
