import { TIMELINE_CARDS, TIMELINE_WEEKS } from "@/features/case-study-hsl/constants/data";

export function ProjectTimelineSection() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto min-w-[1208px] max-w-[1250px]">
        <div className="grid grid-cols-12 gap-x-0">
          {TIMELINE_WEEKS.map((week, index) => (
            <div
              key={week}
              className={`flex justify-center border-l border-[#bdbdbd] ${
                index === TIMELINE_WEEKS.length - 1 ? "border-r" : ""
              }`}
            >
              <div className="h-[709px] w-full" />
            </div>
          ))}
        </div>

        <div className="-mt-[709px] grid grid-cols-12 grid-rows-[90px_90px_90px_90px_90px] gap-y-[50px]">
          {TIMELINE_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                gridColumn: `${card.colStart} / span ${card.colSpan}`,
                gridRow: `${card.rowStart} / span 1`,
              }}
            >
              <div
                className="flex h-[90px] w-full items-center justify-center rounded-2xl px-4"
                style={{ backgroundColor: card.color }}
              >
                <p className={card.fontSizeClass}>
                  {card.title.split("\n").map((line, index, lines) => (
                    <span key={line}>
                      {line}
                      {index < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 pt-[68px]">
          {TIMELINE_WEEKS.map((week) => (
            <div key={`${week}-label`} className="flex justify-center">
              <p className="w-[73px] text-center font-body text-xl text-[#212121]">
                {week}
                <br />
                Week
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
