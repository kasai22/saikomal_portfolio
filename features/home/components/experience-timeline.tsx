import { GlassSurface } from "@/components/ui/glass-surface";
import { RevealItem } from "@/components/ui/reveal-item";
import type { ExperienceEntry } from "@/features/home/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-5">
      <div
        className="absolute bottom-0 left-[13px] top-2 w-px bg-gradient-to-b from-brand via-white/10 to-transparent"
        aria-hidden="true"
      />
      {entries.map((entry, i) => (
        <RevealItem key={entry.company} delayMs={i * 100}>
          <li className="relative pl-10">
            <div
              className={`absolute left-0 top-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                entry.current ? "border-brand bg-brand/15" : "border-white/15 bg-white/5"
              }`}
              aria-hidden="true"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${entry.current ? "animate-pulse bg-brand-light" : "bg-white/40"}`}
              />
            </div>

            <GlassSurface level={entry.current ? 2 : 1} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="t-h3 text-white">
                  {entry.role} <span className="font-normal text-white/45">· {entry.company}</span>
                </h3>
                <span className="t-eyebrow text-brand-light">{entry.duration}</span>
              </div>
              <p className="t-meta mt-1 text-white/35">{entry.location}</p>
              <ul className="mt-3.5 space-y-2">
                {entry.summary.map((line) => (
                  <li key={line} className="t-meta flex items-start gap-2.5 text-white/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/60" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </GlassSurface>
          </li>
        </RevealItem>
      ))}
    </ol>
  );
}
