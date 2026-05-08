import { Card, CardContent } from "@/components/ui/card";

const titleParts = [
  { text: "Possible", className: "font-medium text-white" },
  { text: " Solution", className: "font-bold text-[#008080]" },
];

const description =
  "To address the challenges faced by Hindusthan Shipyard Limited (HSL), the website redesign will focus on creating a modern and visually appealing design that aligns with the company's brand identity, simplifying the navigation structure to enhance user experience, and ensuring full mobile responsiveness to cater to all device users. This includes reorganizing content to make important information easily accessible, integrating a search functionality for quick information retrieval, and conducting thorough usability testing to refine the design based on user feedback. By implementing these solutions, the redesigned website will improve user engagement, reduce bounce rates, and effectively communicate HSL's capabilities and services to its stakeholders.";

export const CaseStudiesDescriptionSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-[1150px] flex-col items-center gap-10">
        <header className="relative flex w-full justify-center pt-1">
          <div className="relative inline-flex items-center justify-center px-6 pt-0">
            <div className="absolute left-1/2 top-[27px] h-8 w-[369px] -translate-x-1/2 rounded-[94px] bg-[#212121]" />
            <h2 className="relative text-center [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0] text-transparent">
              {titleParts.map((part) => (
                <span key={part.text} className={part.className}>
                  {part.text}
                </span>
              ))}
            </h2>
          </div>
        </header>
        <Card className="w-full border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <p className="w-full [font-family:'Poppins',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-white text-justify">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
