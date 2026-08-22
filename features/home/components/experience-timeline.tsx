import { GlassSurface } from "@/components/ui/glass-surface";
import { RevealItem } from "@/components/ui/reveal-item";
import type { ExperienceEntry } from "@/features/home/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-8">
      <div className="absolute bottom-0 left-[15px] top-2 w-px bg-white/10" aria-hidden="true" />
      {entries.map((entry, i) => (
        <RevealItem key={entry.company} delayMs={i * 100}>
          <li className="relative pl-12">
            <div
              className={`absolute left-0 top-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                entry.current ? "border-brand bg-brand/15" : "border-white/15 bg-white/5"
              }`}
              aria-hidden="true"
            >
              <span className={`h-2 w-2 rounded-full ${entry.current ? "animate-pulse bg-brand-light" : "bg-white/40"}`} />
            </div>

            <GlassSurface level={entry.current ? 2 : 1} className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-bold text-white">
                  {entry.role} <span className="font-normal text-white/50">· {entry.company}</span>
                </h3>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-light">
                  {entry.duration}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/40">{entry.location}</p>
              <ul className="mt-4 space-y-2">
                {entry.summary.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
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
