import { Card, CardContent } from "@/components/ui/card";

const audienceItems = [
  "Potential Clients and Customers:",
  "Industry Partners and Suppliers",
  "Employees and Job Seekers",
  "Investors and Stakeholders",
  "Government and Regulatory Bodies",
  "Media and Press",
  "General Public and Community",
];

const sections = [
  {
    id: "audience",
    titleStart: "Target",
    titleEnd: "Audience",
    titleWidth: "max-w-[375px]",
    pillWidth: "w-[374px]",
    imageSrc: "/figmaAssets/undraw-target-re-fi8j-1.svg",
    imageAlt: "Undraw target re",
    imageFirstOnMobile: false,
    imageClassName:
      "w-full max-w-[616.83px] self-center object-contain lg:self-start",
    content: (
      <Card className="w-full rounded-[30px] border-0 bg-[#212121] shadow-none">
        <CardContent className="px-7 py-6 sm:px-[34px] sm:py-[25px]">
          <ul className="[font-family:'Poppins',Helvetica] text-base font-normal leading-[17.8px] tracking-[0] text-white">
            {audienceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "approach",
    titleStart: "The",
    titleEnd: "Approach",
    titleWidth: "max-w-[350px]",
    pillWidth: "w-[283px]",
    imageSrc: "/figmaAssets/undraw-logic-re-nyb4-1.svg",
    imageAlt: "Undraw logic re",
    imageFirstOnMobile: true,
    imageClassName:
      "w-full max-w-[493.3px] self-center object-contain lg:self-start",
    content: (
      <div className="[font-family:'Poppins',Helvetica] text-base font-normal leading-normal tracking-[0] text-white text-left lg:text-justify">
        For the Hindusthan Shipyard Limited (HSL) project, the approach will
        involve conducting comprehensive design research to understand the needs
        of various stakeholders, including clients, partners, employees,
        investors, and the general public. We will start with user surveys and
        usability testing on the current website to identify pain points and
        areas for improvement. Based on these insights, we&apos;ll create
        wireframes and high-fidelity prototypes focusing on a modern, intuitive
        design that enhances navigation and accessibility. Ensuring full mobile
        responsiveness, we will implement a streamlined content organization and
        robust search functionality. The design will undergo multiple iterations
        based on user feedback to ensure optimal usability and satisfaction,
        ultimately delivering a website that effectively represents HSL&apos;s
        brand and services while meeting the needs of its diverse audience.
      </div>
    ),
  },
];

export const CaseStudiesPreviewSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-[1214px] flex-col gap-12 lg:gap-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`grid grid-cols-1 items-start gap-8 lg:grid-cols-2 ${
              index === 1 ? "lg:pt-0" : ""
            }`}
          >
            <div
              className={`${
                section.imageFirstOnMobile
                  ? "order-1 lg:order-1"
                  : "order-2 lg:order-2"
              } flex justify-center`}
            >
              <img
                className={section.imageClassName}
                alt={section.imageAlt}
                src={section.imageSrc}
              />
            </div>
            <article
              className={`${
                section.imageFirstOnMobile
                  ? "order-2 lg:order-2"
                  : "order-1 lg:order-1"
              } flex flex-col ${
                section.id === "approach" ? "lg:pt-[139px]" : "pt-0"
              }`}
            >
              <header className="relative mb-7">
                <div
                  className={`mt-[27px] h-8 rounded-[94px] bg-[#212121] ${section.pillWidth}`}
                />
                <h2
                  className={`absolute left-4 top-0 [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0] text-transparent ${section.titleWidth}`}
                >
                  <span className="font-medium text-white">
                    {section.titleStart}
                  </span>
                  <span className="font-bold text-white">&nbsp;</span>
                  <span className="font-bold text-[#008080]">
                    {section.titleEnd}
                  </span>
                </h2>
              </header>
              <div className={section.id === "approach" ? "pl-4" : ""}>
                {section.content}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
