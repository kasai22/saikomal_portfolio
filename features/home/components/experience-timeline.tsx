import { Panel } from "@/components/ui/panel";
import { RevealItem } from "@/components/ui/reveal-item";
import type { ExperienceEntry } from "@/features/home/types";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

/**
 * Each role is a two-column row: the identity and dates on the left, what
 * actually changed on the right. That split is what lets the timeline use
 * the full slide width — a single narrow column left half the slide empty
 * while the rest of the deck ran edge to edge.
 */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-4">
      <div
        className="absolute bottom-0 left-[13px] top-2 w-px bg-gradient-to-b from-brand via-ink/[0.06] to-transparent"
        aria-hidden="true"
      />
      {entries.map((entry, i) => (
        <RevealItem key={entry.company} delayMs={i * 100}>
          <li className="relative pl-10">
            <div
              className={`absolute left-0 top-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
 entry.current ? "border-brand bg-brand/15" : "border-ink/16 bg-ink/[0.035]"
 }`}
              aria-hidden="true"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${entry.current ? "animate-pulse bg-brand-light" : "bg-ink/30"}`}
              />
            </div>

            <Panel level={entry.current ? 2 : 1} className="p-5">
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
                <div>
                  <h3 className="t-h3 text-ink">{entry.role}</h3>
                  <p className="t-meta mt-1 text-ink/62">{entry.company}</p>
                  <p className="t-eyebrow mt-2.5 text-brand-ink">{entry.duration}</p>
                  <p className="t-meta mt-1 text-ink/60">{entry.location}</p>
                </div>
                <ul className="space-y-2 sm:border-l sm:border-ink/[0.096] sm:pl-8">
                  {entry.summary.map((line) => (
                    <li key={line} className="t-meta flex items-start gap-2.5 text-ink/65">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/60" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </li>
        </RevealItem>
      ))}
    </ol>
  );
}
