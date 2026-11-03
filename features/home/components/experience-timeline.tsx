import { Panel } from "@/components/ui/panel";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { formatYearMonth, isoYearMonth, type Employment } from "@/constants/profile";

interface ExperienceTimelineProps {
  entries: Employment[];
}

/**
 * Each role is a two-column row: the identity and dates on the left, what
 * actually changed on the right. That split is what lets the timeline use
 * the full slide width — a single narrow column left half the slide empty
 * while the rest of the deck ran edge to edge.
 *
 * Dates are formatted from the structured résumé record in
 * `constants/profile.ts` — never typed here — and marked up as `<time>` so
 * the machine-readable value travels with the readable one.
 *
 * The connector rule sits in a wrapper rather than inside the `<ol>`: a list
 * may only contain list items, and the rule is decoration, not an entry.
 */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div
        className="absolute bottom-0 left-[13px] top-2 w-px bg-gradient-to-b from-brand via-ink/[0.06] to-transparent"
        aria-hidden="true"
      />
      <Stagger as="ol" className="flex flex-col gap-4">
        {entries.map((entry) => {
          const current = entry.end === null;
          return (
            <StaggerItem key={entry.id} as="li" className="relative pl-10">
              <div
                className={`absolute left-0 top-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  current ? "border-brand bg-brand/15" : "border-ink/16 bg-ink/[0.035]"
                }`}
                aria-hidden="true"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${current ? "animate-pulse bg-brand-light" : "bg-ink/30"}`}
                />
              </div>

              <Panel level={current ? 2 : 1} className="p-5">
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
                  <div>
                    <h3 className="t-h3 text-ink">{entry.role}</h3>
                    <p className="t-meta mt-1 text-ink/62">{entry.company}</p>
                    <p className="t-eyebrow mt-2.5 text-brand-ink">
                      <time dateTime={isoYearMonth(entry.start)}>
                        {formatYearMonth(entry.start)}
                      </time>
                      {" – "}
                      {entry.end ? (
                        <time dateTime={isoYearMonth(entry.end)}>
                          {formatYearMonth(entry.end)}
                        </time>
                      ) : (
                        "Present"
                      )}
                    </p>
                    <p className="t-meta mt-1 text-ink/60">{entry.location}</p>
                  </div>
                  <div className="sm:border-l sm:border-ink/[0.096] sm:pl-8">
                    <ul className="space-y-2">
                      {entry.summary.map((line) => (
                        <li key={line} className="t-meta flex items-start gap-2.5 text-ink/65">
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/60"
                            aria-hidden="true"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Focus">
                      {entry.focus.map((item) => (
                        <li key={item} className="t-chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
