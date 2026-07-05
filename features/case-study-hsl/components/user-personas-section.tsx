import Image from "next/image";
import { PillHeading } from "@/components/case-study/pill-heading";
import { NestedMarkerIcon } from "@/components/case-study/nested-marker-icon";
import { PERSONAS } from "@/features/case-study-hsl/constants/data";

export function UserPersonasSection() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col">
        <header className="mb-10 flex flex-col items-start gap-5">
          <PillHeading
            pillWidth={326}
            segments={[
              { text: "Define", accent: false },
              { text: " Phase", accent: true },
            ]}
          />
          <div className="flex items-center gap-4">
            <NestedMarkerIcon
              outerClassName="h-[34px] w-[38px] rounded-[19px/17px]"
              middleClassName="left-1 top-1 h-[27px] w-[30px] rounded-[15px/13px]"
              innerClassName="left-2 top-[7px] h-5 w-[22px] rounded-[11px/10px]"
            />
            <h2 className="font-body text-3xl font-medium text-white sm:text-[34px]">
              User Persona
            </h2>
          </div>
        </header>

        <div className="flex flex-col gap-[100px]">
          {PERSONAS.map((persona) => (
            <article
              key={persona.id}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[509px_minmax(0,823px)] lg:gap-[60px]"
            >
              <div className="flex h-full flex-col rounded-[25px] px-6 pb-8 pt-[22px] shadow-[4px_4px_30px_#0000001a]">
                <Image
                  src={persona.imageSrc}
                  alt={persona.imageAlt}
                  width={400}
                  height={persona.id === "persona-1" ? 604 : 600}
                  className="mx-auto h-[249px] w-[277px] rounded-md border-[10px] border-white object-cover"
                />
                <h3 className="mt-2 text-center font-body text-3xl font-medium text-[#ff66c4] sm:text-[34px]">
                  {persona.title}
                </h3>
                <dl className="mt-8 grid grid-cols-[minmax(104px,170px)_1fr] gap-y-4">
                  {persona.details.map((detail) => (
                    <div key={detail.label} className="contents">
                      <dt className="font-body text-2xl font-medium text-white">
                        {detail.label}
                      </dt>
                      <dd className="font-body text-2xl text-white">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
                <h4 className="mt-10 text-center font-body text-3xl font-medium text-[#ff66c4] sm:text-[34px]">
                  Brief Story
                </h4>
                <p className="mt-6 text-justify font-body text-2xl text-white">{persona.story}</p>
              </div>

              <div className="flex flex-col gap-[34px]">
                {persona.sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-[25px] px-[29px] py-[28px] shadow-[0px_2px_10px_#0000001a]"
                  >
                    <h3 className="font-body text-3xl font-medium text-[#ff66c4] sm:text-[34px]">
                      {section.title}
                    </h3>
                    <ul className="mt-8 space-y-1 font-body text-2xl text-white">
                      {section.items.map((item) => (
                        <li key={item} className="text-justify">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
