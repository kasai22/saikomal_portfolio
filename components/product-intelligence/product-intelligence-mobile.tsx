import { AI_BRANCH, AI_CAPABILITIES, AI_LOOP } from "@/features/home/constants/data";
import { cn } from "@/lib/utils";
import type { IntelligenceStage } from "@/features/home/types";

/**
 * Below `md`: the same system as a vertical flow.
 *
 * A diagram with a fan, two return brackets and a signal circulating them has
 * nowhere to go on a 390px viewport, so nothing is scaled down — it is
 * rewritten. What has to survive the translation is what the figure is for:
 *
 *   · the order — six stages, and which one feeds which
 *   · the loop — feedback does not end the flow, it re-enters context
 *   · the two branches — ask when unsure, check before showing
 *
 * Everything the desktop stage puts behind a hover is written out in full
 * here, because there is no hover to put it behind. That also means this is
 * the copy of the content that lives in the page's HTML: the media query
 * resolves `false` on the server, so this is what is rendered and crawled, and
 * the desktop canvas is swapped in on the first client render.
 *
 * A server component — there is no state, no measurement and no motion in it.
 */
export function ProductIntelligenceMobile() {
  return (
    <div>
      <ol className="flex flex-col">
        {AI_LOOP.map((stage, index) => (
          <li key={stage.id}>
            {index > 0 && <Feed />}
            <StageRow stage={stage} index={index} />
            {stage.id === "reason" && <Capabilities />}
            {stage.id === "reason" && (
              <Branch label={AI_BRANCH.clarify.label} note={AI_BRANCH.clarify.note} back />
            )}
            {stage.id === "action" && (
              <Branch label={AI_BRANCH.guard.label} note={AI_BRANCH.guard.note} />
            )}
          </li>
        ))}
      </ol>

      {/* The loop closing. On the stage this is a bracket running back up the
          outside; here it can only be said — but it has to be said, because a
          list that simply stops is the pipeline this figure argues against. */}
      <div className="mt-4 flex items-center gap-2.5 border-t border-brand/30 pt-3">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M11.5 7a4.5 4.5 0 1 1-2.2-3.87"
            stroke="#8A5A0A"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path d="M6.6 2.4 9.8 3.2 9 6.4" stroke="#8A5A0A" strokeWidth="1" />
        </svg>
        <p className="font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-ink/60">
          Returns to context
        </p>
      </div>
    </div>
  );
}

function StageRow({ stage, index }: { stage: IntelligenceStage; index: number }) {
  const human = stage.side === "human";

  return (
    <div
      className={cn(
        "px-4 py-3.5",
        human
          ? "border-l-2 border-brand/50 bg-brand/[0.04]"
          : "corner-ticks border-ink/12 border bg-paper-panel",
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <span className="t-label shrink-0 tabular-nums text-brand-ink">{`0${index + 1}`}</span>
        <h3
          className={cn(
            "font-mono text-[15px] font-medium uppercase leading-none tracking-[0.13em]",
            human ? "text-brand-ink" : "text-ink",
          )}
        >
          {stage.label}
        </h3>
      </div>
      <p className="t-meta mt-2 text-ink/60">{stage.note}</p>
      <ul className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {stage.detail.map((item, position) => (
          <li
            key={item}
            className="font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-ink/55"
          >
            {position > 0 && (
              <span className="mr-1.5 text-brand" aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** What the system reaches for. Indented, because it sits inside a stage. */
function Capabilities() {
  return (
    <ul className="ml-4 mt-2 grid grid-cols-3 gap-1.5 border-l border-dashed border-ink/20 pl-3">
      {AI_CAPABILITIES.map((capability) => (
        <li key={capability.id} className="border border-dashed border-ink/20 px-2 py-1.5">
          <p className="font-mono text-[9px] font-medium uppercase leading-none tracking-[0.1em] text-ink/80">
            {capability.label}
          </p>
          <p className="mt-1 text-[9px] leading-tight text-ink/45">{capability.note}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * A named branch. `back` marks the one that returns up the flow rather than
 * continuing down it — the mark is the only way a vertical list can say that.
 *
 * Drawn rather than typed. `↰` and `⊣` are the right characters for these two
 * ideas and neither is in the site's typeface, so both fall back to whatever
 * the system has and land at a different weight and baseline from everything
 * around them. Twelve pixels of SVG renders identically everywhere.
 */
function Branch({ label, note, back }: { label: string; note: string; back?: boolean }) {
  return (
    <div className="ml-4 mt-2 flex items-baseline gap-2 pl-3">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="shrink-0 translate-y-0.5"
        aria-hidden="true"
      >
        {back ? (
          // Turns back and goes up: the return to context.
          <>
            <path d="M11 10.5H3.5V2" stroke="#8A5A0A" strokeWidth="1" />
            <path d="M1 4.5 3.5 1.5 6 4.5" stroke="#8A5A0A" strokeWidth="1" />
          </>
        ) : (
          // A crossbar on the wire: the gate everything passes before display.
          <>
            <path d="M6 0v12" stroke="rgba(20,20,15,0.2)" strokeWidth="1" />
            <path d="M1.5 6h9" stroke="#8A5A0A" strokeWidth="1" />
          </>
        )}
      </svg>
      <p className="font-mono text-[9px] uppercase leading-none tracking-[0.1em] text-brand-ink">
        {label}
        <span className="ml-1.5 normal-case tracking-normal text-ink/45">{note}</span>
      </p>
    </div>
  );
}

/** The marker between two stages. One head — here, direction is the content. */
function Feed() {
  return (
    <div className="flex items-center gap-2 py-3" aria-hidden="true">
      <svg width="9" height="22" viewBox="0 0 9 22" fill="none" className="shrink-0">
        <path d="M4.5 0v22" stroke="rgba(20,20,15,0.2)" strokeWidth="1" />
        <path d="M1 18.5 4.5 21.5 8 18.5" stroke="#C9871F" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-ink/[0.08]" />
    </div>
  );
}
