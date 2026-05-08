import { Card, CardContent } from "@/components/ui/card";

const sectionContent = {
  titleParts: [
    { text: "Problem", className: "font-medium text-white" },
    { text: " ", className: "font-bold text-white" },
    { text: "Statement", className: "font-bold text-[#008080]" },
  ],
  description:
    "Hindusthan Shipyard Limited (HSL) faced significant issues with its outdated and non-responsive website, which failed to reflect the company's modern capabilities and hindered user engagement. Users struggled with poor navigation and inefficient content organization, making it difficult to access crucial information quickly. Additionally, the lack of mobile optimization led to a subpar experience for users on smartphones and tablets. These problems collectively resulted in low user satisfaction and engagement, adversely affecting HSL's ability to effectively communicate with its stakeholders and showcase its services. The objective is to redesign the website to create a modern, user-friendly, and mobile-responsive platform that enhances user experience and effectively represents HSL's brand and services.",
};

export const CaseStudiesTitleSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <Card className="w-full border-0 bg-transparent shadow-none">
        <CardContent className="flex w-full flex-col items-center px-0 py-0">
          <header className="relative mb-8 flex w-full justify-center">
            <div className="absolute top-1/2 h-8 w-full max-w-[441px] -translate-y-1/2 rounded-[94px] bg-[#212121]" />
            <h2 className="relative px-4 text-center [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0] text-transparent">
              {sectionContent.titleParts.map((part, index) => (
                <span key={`${part.text}-${index}`} className={part.className}>
                  {part.text}
                </span>
              ))}
            </h2>
          </header>
          <p className="w-full [font-family:'Poppins',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-white text-justify">
            {sectionContent.description}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
