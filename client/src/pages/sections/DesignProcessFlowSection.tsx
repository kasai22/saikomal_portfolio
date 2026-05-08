import { Card, CardContent } from "@/components/ui/card";

const personaCards = [
  {
    id: "persona-1",
    title: "User Persona 1",
    imageSrc: "/figmaAssets/ellipse-58.png",
    imageAlt: "Rakesh Sharma",
    details: [
      { label: "Name", value: "Rakesh Sharma" },
      { label: "Age", value: "39" },
      { label: "Occupation", value: "Business Owner (Engineering Supplies)" },
      { label: "Location", value: "Mumbai, India" },
    ],
    storyTitle: "Breif Story",
    story:
      "Rakesh Sharma, a successful business owner from Mumbai, is eager to expand his engineering supplies company by securing tenders with Hindustan Shipyard Limited (HSL). However, he struggles with the HSL website's complex navigation, slow tender updates, and unclear submission processes. Rakesh's primary goal is to streamline the bidding process, allowing him to efficiently manage tenders and track their progress in real time. Winning more contracts with HSL would significantly grow his business, and he is motivated by the prospect of more efficient tender management.",
    sections: [
      {
        title: "Goals",
        items: [
          "Successfully bid for tenders on the HSL website.",
          "Easily track the status of submitted tenders.",
          "Receive timely notifications about new tenders and bidding deadlines.",
        ],
      },
      {
        title: "Frustations",
        items: [
          "Difficulty in finding current tenders quickly.",
          "Lack of clear, real-time updates on tender status.",
          "Complicated documentation upload process during tender submission.",
        ],
      },
      {
        title: "Needs",
        items: [
          "A simplified tender submission process.",
          "Clear guidelines and step-by-step instructions for bid submission.",
          "Easy access to tender history and updates.",
        ],
      },
      {
        title: "Motivations",
        items: [
          "Expanding his business by securing large-scale contracts.",
          "Ensuring that his company stays competitive in the industry.",
          "Winning more tenders efficiently without wasting time on administrative tasks.",
        ],
      },
    ],
  },
  {
    id: "persona-2",
    title: "User Persona 2",
    imageSrc: "/figmaAssets/ellipse-91.png",
    imageAlt: "Meera Patel",
    details: [
      { label: "Name", value: "Meera Patel" },
      { label: "Age", value: "27" },
      { label: "Occupation", value: "Mechanical Engineer" },
      { label: "Location", value: "Visakhapatnam, India" },
    ],
    storyTitle: "Breif Story",
    story:
      "Meera Patel, a mechanical engineer from Visakhapatnam, is keen to secure a job at Hindustan Shipyard Limited (HSL) but finds the application process difficult to navigate. The website's recruitment section is confusing, and the lack of communication after submitting her application leaves her anxious. Meera's goal is to land a stable engineering job, but she feels disconnected and frustrated by the unclear process. She wishes for a more transparent and responsive system that keeps candidates informed at every step, motivating her to pursue her career aspirations.",
    sections: [
      {
        title: "Goals",
        items: [
          "Find and apply for relevant job openings at HSL.",
          "Track the status of her job application.",
          "Understand the company's recruitment process and timelines.",
        ],
      },
      {
        title: "Frustations",
        items: [
          "Difficulty navigating the recruitment section of the website.",
          "Lack of clear information on the status of her job application.",
          "Slow response times to inquiries regarding her application.",
        ],
      },
      {
        title: "Needs",
        items: [
          "A user-friendly application process with all steps clearly outlined.",
          "Immediate acknowledgment and regular updates after submitting an application.",
          "Easy access to FAQs or contact information for recruitment-related queries.",
        ],
      },
      {
        title: "Motivations",
        items: [
          "Securing a stable and well-paying job in a reputed organization.",
          "Finding a job that aligns with her engineering background.",
          "Receiving prompt communication and updates to reduce anxiety about her application status.",
        ],
      },
    ],
  },
];

export const DesignProcessFlowSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-black px-4 pb-6 pt-0 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col">
        <header className="mb-10 flex flex-col items-start gap-5 pt-0">
          <div className="mx-auto flex items-center justify-center">
            <div className="relative h-[62px] w-[328px]">
              <div className="absolute left-0 top-7 h-8 w-[326px] rounded-[94px] bg-[#212121]" />
              <div className="absolute left-6 top-0 w-[302px] [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0] text-transparent">
                <span className="font-medium text-white">Define</span>
                <span className="font-bold text-white">&nbsp;</span>
                <span className="font-bold text-[#008080]">Phase</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-[34px] w-[38px] rounded-[19.09px/17px] bg-[#212121]">
              <div className="absolute left-1 top-1 h-[27px] w-[30px] rounded-[15.11px/13.46px] bg-[#212121]" />
              <div className="absolute left-2 top-[7px] h-5 w-[22px] rounded-[11.14px/9.92px] bg-[#008080]" />
            </div>
            <h2 className="[font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-white">
              User Persona
            </h2>
          </div>
        </header>
        <div className="flex flex-col gap-[100px]">
          {personaCards.map((persona) => (
            <article
              key={persona.id}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[509px_minmax(0,823px)] lg:gap-[60px]"
            >
              <Card className="h-full rounded-[25px] border-0 bg-transparent shadow-[4px_4px_30px_#0000001a]">
                <CardContent className="flex h-full flex-col px-6 pb-8 pt-[22px]">
                  <img
                    className="mx-auto h-[249px] w-[277px] border-[10px] border-solid border-white object-cover"
                    alt={persona.imageAlt}
                    src={persona.imageSrc}
                  />
                  <h3 className="mt-2 text-center [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-[#ff66c4]">
                    {persona.title}
                  </h3>
                  <dl className="mt-8 grid grid-cols-[minmax(104px,170px)_1fr] gap-y-4">
                    {persona.details.map((detail) => (
                      <div
                        key={`${persona.id}-${detail.label}`}
                        className="contents"
                      >
                        <dt className="[font-family:'Poppins',Helvetica] text-[25px] font-medium leading-[normal] tracking-[0] text-white">
                          {detail.label}
                        </dt>
                        <dd className="[font-family:'Poppins',Helvetica] text-[25px] font-normal leading-[normal] tracking-[0] text-white">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <h4 className="mt-10 text-center [font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-[#ff66c4]">
                    {persona.storyTitle}
                  </h4>
                  <p className="mt-6 [font-family:'Poppins',Helvetica] text-justify text-2xl font-normal leading-[normal] tracking-[0] text-white">
                    {persona.story}
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-[34px]">
                {persona.sections.map((section) => (
                  <Card
                    key={`${persona.id}-${section.title}`}
                    className="rounded-[25px] border-0 bg-transparent shadow-[0px_2px_10px_#0000001a]"
                  >
                    <CardContent className="px-[29px] py-[28px]">
                      <h3 className="[font-family:'Poppins',Helvetica] text-[34px] font-medium leading-[normal] tracking-[0] text-[#ff66c4]">
                        {section.title}
                      </h3>
                      <ul className="mt-8 space-y-1 [font-family:'Poppins',Helvetica] text-[26px] font-normal leading-[normal] tracking-[0] text-white">
                        {section.items.map((item, index) => (
                          <li
                            key={`${persona.id}-${section.title}-${index}`}
                            className="text-justify"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
