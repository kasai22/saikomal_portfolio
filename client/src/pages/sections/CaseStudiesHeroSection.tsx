import { Card, CardContent } from "@/components/ui/card";

const roleItems = [
  "Design Strategy",
  "Problem Solution",
  "Information Architecture",
  "Empathy Mapping",
  "Usability Testing",
  "User Flow",
  "Prototyping",
  "Wireframes",
  "Competitive Analysis",
  "Visual Design",
  "User Research",
  "User Persona",
];

export const CaseStudiesHeroSection = (): JSX.Element => {
  return (
    <section className="w-full bg-black px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-2">
          <div className="h-8 w-[189px] rounded-[94px] bg-[#212121]" />
          <h2 className="mt-[-32px] text-center [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-none tracking-[0] text-white">
            <span className="font-medium text-white">My</span>
            <span className="font-bold text-white">&nbsp;</span>
            <span className="font-bold text-[#008080]">Role</span>
          </h2>
        </header>
        <div className="grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {roleItems.map((item) => (
            <Card
              key={item}
              className="w-full max-w-max rounded-[15px] border-0 bg-[#212121] shadow-[0px_2px_10px_#0000001a]"
            >
              <CardContent className="flex min-h-[72px] items-center justify-center px-6 py-4">
                <p className="[font-family:'Poppins',Helvetica] text-center text-[18px] font-normal leading-normal tracking-[0] text-white sm:text-[20px] md:text-[26px]">
                  {item}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
