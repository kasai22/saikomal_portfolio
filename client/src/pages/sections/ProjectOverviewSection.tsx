import { Card, CardContent } from "@/components/ui/card";

const weekLabels = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
];

const timelineCards = [
  {
    title: "UX Design",
    color: "#ff66c4",
    colStart: 1,
    colSpan: 8,
    rowStart: 1,
    rowSpan: 1,
    titleClassName:
      "text-[32px] leading-[normal] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "UI Design",
    color: "#ff66c4",
    colStart: 9,
    colSpan: 4,
    rowStart: 1,
    rowSpan: 1,
    titleClassName:
      "text-[32px] leading-[normal] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Strategy\n(Research)",
    color: "#a882fd",
    colStart: 1,
    colSpan: 2,
    rowStart: 2,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Paper\nWireframes",
    color: "#a882fd",
    colStart: 9,
    colSpan: 2,
    rowStart: 2,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Interview, Empathy Map,\nUser Journey Map",
    color: "#a882fd",
    colStart: 2,
    colSpan: 3,
    rowStart: 3,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Visual Design\n& Prototyping",
    color: "#a882fd",
    colStart: 9,
    colSpan: 2,
    rowStart: 3,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Problem Statement &\nGoal Statement",
    color: "#a882fd",
    colStart: 4,
    colSpan: 3,
    rowStart: 4,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Usability\nTesting Phase",
    color: "#a882fd",
    colStart: 11,
    colSpan: 2,
    rowStart: 4,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
  {
    title: "Competitive Analysis &\nInformation Architecture",
    color: "#a882fd",
    colStart: 5,
    colSpan: 3,
    rowStart: 5,
    rowSpan: 1,
    titleClassName:
      "text-[22px] leading-[28px] font-medium text-[#212121] text-center [font-family:'Poppins',Helvetica]",
  },
];

export const ProjectOverviewSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="w-full overflow-x-auto">
        <div className="mx-auto min-w-[1208px] max-w-[1250px]">
          <div className="grid grid-cols-12 gap-x-0">
            {weekLabels.map((week, index) => (
              <div
                key={week}
                className={`flex justify-center border-l border-[#bdbdbd] ${
                  index === weekLabels.length - 1 ? "border-r" : ""
                }`}
              >
                <div className="h-[709px] w-full" />
              </div>
            ))}
          </div>
          <div className="-mt-[709px] grid grid-cols-12 grid-rows-[90px_90px_90px_90px_90px] gap-y-[50px]">
            {timelineCards.map((card) => (
              <Card
                key={card.title}
                className="border-0 bg-transparent shadow-none"
                style={{
                  gridColumn: `${card.colStart} / span ${card.colSpan}`,
                  gridRow: `${card.rowStart} / span ${card.rowSpan}`,
                }}
              >
                <CardContent className="flex h-[90px] items-center justify-center rounded-[15px] p-0">
                  <div
                    className="flex h-full w-full items-center justify-center rounded-[15px] px-4"
                    style={{ backgroundColor: card.color }}
                  >
                    <p className={card.titleClassName}>
                      {card.title.split("\n").map((line, index) => (
                        <span key={`${card.title}-${index}`}>
                          {line}
                          {index < card.title.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-12 pt-[68px]">
            {weekLabels.map((week) => (
              <div key={`${week}-label`} className="flex justify-center">
                <p className="w-[73px] text-center text-xl font-normal leading-[normal] tracking-[0] text-[#212121] [font-family:'Poppins',Helvetica]">
                  {week}
                  <br />
                  Week
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
