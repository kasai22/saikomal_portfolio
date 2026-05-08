import { Card, CardContent } from "@/components/ui/card";

const architectureImage = {
  src: "/figmaAssets/image-15.png",
  alt: "Information Architecture diagram",
};

export const ExplorationPhaseSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-[1078px] flex-col items-center gap-6">
        <div className="h-8 w-full max-w-[559px] rounded-[94px] bg-[#212121]" />
        <header className="text-center">
          <h2 className="mt-[-1.00px] [font-family:'Poppins',Helvetica] text-[41px] font-normal leading-[normal] tracking-[0] text-transparent">
            <span className="font-medium text-white">Information</span>
            <span className="font-bold text-white">&nbsp;</span>
            <span className="font-bold text-[#008080]">Architecture</span>
          </h2>
        </header>
        <Card className="w-full border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <img
              className="block h-auto w-full object-cover"
              alt={architectureImage.alt}
              src={architectureImage.src}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
