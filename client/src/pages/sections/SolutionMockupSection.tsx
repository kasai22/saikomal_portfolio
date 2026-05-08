import { Card, CardContent } from "@/components/ui/card";

const researchSummary =
  "Qualitative research for Hindusthan Shipyard Limited (HSL) involves conducting in-depth interviews, focus groups, observational studies, and usability tests to gain deep insights into stakeholder perceptions, behaviors, and needs related to the current website and its redesign. By exploring user experiences, preferences, and challenges through open-ended questions and direct observations, the research aims to uncover nuanced insights that inform a user-centered approach to improving website navigation, content accessibility, visual design, and overall user experience.";

const interviewGroups = [
  {
    title: "For Vendors",
    questions: [
      "How do you currently engage with HSL regarding procurement and partnership opportunities?",
      "What information or resources do you typically seek on the HSL website when considering collaboration?",
      "What are the key factors that influence your decision to partner with a shipyard like HSL?",
      "In what ways could the HSL website better facilitate communication and information exchange between suppliers and the shipyard?",
      "What improvements would you suggest to enhance the procurement process and transparency on the website?",
    ],
  },
  {
    title: "For Employees",
    questions: [
      "How would you describe the current effectiveness of the HSL website in communicating the company's capabilities and services?",
      "What feedback have you received from clients, partners, or other stakeholders regarding their experience with the website?",
      "Are there specific areas of the website's navigation or content organization that you believe could be improved?",
      "How does the website currently support internal processes such as HR communications, news updates, or corporate announcements?",
      "From your perspective, what are the key goals or objectives that the redesigned website should achieve?",
    ],
  },
  {
    title: "General Questions",
    questions: [
      "How often do you visit the HSL website, and for what specific purposes?",
      "What do you find most valuable about the current website, and what aspects do you find least helpful?",
      "Can you share a recent positive or negative experience you had while navigating or using the HSL website?",
      "How does the website compare to competitors or industry standards in terms of usability, design, and content?",
      "What suggestions or recommendations would you have for improving the overall user experience on the HSL website?",
    ],
  },
];

const insights = [
  "Navigation Complexity: Users frequently encounter challenges with the current website's navigation, finding it complex and difficult to locate specific information such as services offered, project details, and contact information. Simplifying and streamlining navigation emerged as a top priority.",
  "Mobile Usability: Mobile users, including clients and vendors, face significant usability issues due to the website's lack of responsiveness and slow loading times on mobile devices. Enhancing mobile optimization is essential to improve accessibility and user experience across all devices.",
  "Content Accessibility: Stakeholders expressed a need for clearer and more organized content presentation. Important information is currently buried deep within the site, making it hard for users to find relevant details quickly. A structured and searchable content layout is essential for facilitating efficient information retrieval.",
  "Visual Design and Brand Representation: The outdated visual design of the current website does not align with HSL's modern capabilities and industry standards. Stakeholders emphasized the importance of a visually appealing and professional design that reflects HSL's brand identity as a leading shipyard.",
  "Communication Effectiveness: There is a strong consensus among stakeholders regarding the need for improved communication channels and transparency on the website. Clear and accessible contact information, along with responsive communication channels, are critical for fostering trust and facilitating business interactions.",
  "User Engagement and Interaction: Stakeholders value interactive elements and engaging features that enhance user experience and encourage exploration of the website. Incorporating interactive tools, client testimonials, and multimedia content can significantly enhance user engagement and satisfaction.",
];

const sectionHeaders = [
  { title: "Qualitative Research", accent: false },
  { title: "Interview Questions", accent: false },
];

const PillIcon = () => (
  <div className="flex h-[34px] w-7 shrink-0 items-center justify-center rounded-[13.97px/17px] bg-[#212121]">
    <div className="relative h-[27px] w-[22px] rounded-[11.06px/13.46px] bg-[#212121]">
      <div className="absolute left-1.5 top-[7px] h-5 w-4 rounded-[8.15px/9.92px] bg-[#008080]" />
    </div>
  </div>
);

export const SolutionMockupSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-3 py-0 text-white">
      <div className="mx-auto flex w-full max-w-[1208px] flex-col items-center">
        <header className="mb-7 flex w-full justify-center">
          <div className="h-8 w-full max-w-[369px] rounded-[94px] bg-[#212121]" />
        </header>
        <div className="mb-12 text-center [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0]">
          <span className="font-bold text-[#008080]">Emphatize</span>
          <span className="font-bold text-white">&nbsp;</span>
          <span className="font-medium text-white">Phase</span>
        </div>
        <div className="flex w-full flex-col gap-10">
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <PillIcon />
            </div>
            <div className="flex-1">
              <h2 className="mb-6 [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-white">
                {sectionHeaders[0].title}
              </h2>
              <p className="max-w-[1019px] [font-family:'Poppins',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-white text-justify">
                {researchSummary}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <PillIcon />
            </div>
            <div className="flex-1">
              <h2 className="mb-6 [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-white">
                {sectionHeaders[1].title}
              </h2>
              <div className="max-w-[952px] space-y-5 [font-family:'Poppins',Helvetica] text-justify tracking-[0]">
                {interviewGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-1 text-xl font-bold leading-[normal] text-white">
                      {group.title}
                    </h3>
                    <ul className="space-y-0 [font-family:'Poppins',Helvetica] text-base font-normal leading-[normal] text-white">
                      {group.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Card className="w-full rounded-[15px] border-0 bg-[#212121] shadow-none">
            <CardContent className="px-6 py-7 sm:px-[94px] sm:py-[29px]">
              <div className="max-w-[985px]">
                <h2 className="mb-10 [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-[#008080]">
                  Key Insight Derived
                </h2>
                <div className="space-y-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[normal] tracking-[0] text-white text-justify">
                  {insights.map((insight) => (
                    <p key={insight}>{insight}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
