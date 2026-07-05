import Image from "next/image";
import { PillHeading } from "@/components/case-study/pill-heading";

export function InformationArchitectureSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1078px] flex-col items-center gap-6">
      <PillHeading
        pillWidth={559}
        segments={[
          { text: "Information", accent: false },
          { text: " Architecture", accent: true },
        ]}
      />
      <div className="w-full">
        <Image
          src="/figmaAssets/image-15.png"
          alt="Information architecture diagram showing the redesigned HSL site map"
          width={1972}
          height={4096}
          className="block h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
