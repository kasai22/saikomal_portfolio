import Image from "next/image";
import { PillHeading } from "@/components/case-study/pill-heading";

export function HighFidelityDesignsSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1202px] flex-col items-center">
      <PillHeading
        pillWidth={525}
        fontSize={45}
        segments={[
          { text: "High-Fidelity ", accent: true },
          { text: "Designs", accent: false },
        ]}
      />
      <div className="mt-[70px] w-full">
        <Image
          src="/figmaAssets/mask-group.png"
          alt="Collage of high-fidelity mobile design screens for the HSL website"
          width={1200}
          height={1071}
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
