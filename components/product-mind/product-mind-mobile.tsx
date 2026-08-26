import { MIND_STAGES, PROBLEM_CLUSTERS, PROBLEM_INPUTS } from "@/features/home/constants/data";
import type { MindCluster } from "@/features/home/types";

/**
 * Below `md`: the same story, simplified hard.
 *
 * A canvas whose whole subject is nine things travelling across it has nothing
 * to offer a 390px viewport — there is no distance for them to travel. So the
 * migration is not scaled down, it is dropped, and what is kept is the thing
 * the migration was in service of:
 *
 *   · that a problem arrives as nine unsorted things — shown as one loose row
 *     of chips, wrapped and deliberately unaligned
 *   · that sorting them into three named groups is the first real decision
 *   · that the groups produce a chain, and the chain ends in a product
 *
 * Three ideas, three blocks, no simultaneous motion at all. This is also the
 * copy of the content that lives in the page's HTML — the media query resolves
 * `false` on the server, so this is what is rendered and crawled, and the
 * canvas is swapped in on the first client render.
 *
 * A server component: no state, no measurement, no motion.
 */
export function ProductMindMobile() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="t-label text-ink/50">Nine inputs, no order</h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {PROBLEM_INPUTS.map((input) => (
            <li
              key={input.id}
              className="border border-ink/15 bg-paper-panel px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-ink/80"
            >
              {input.label}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="t-label text-ink/50">Sorted into three</h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {PROBLEM_CLUSTERS.map((cluster) => (
            <Group key={cluster.id} cluster={cluster} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="t-label text-ink/50">Which becomes a structure</h3>
        <ol className="mt-3 flex flex-col">
          {MIND_STAGES.map((stage, index) => (
            <li key={stage.id}>
              {index > 0 && <Step />}
              <div
                className={
                  stage.id === "product"
                    ? "corner-ticks border border-ink/35 bg-paper-panel px-4 py-3"
                    : "corner-ticks border-ink/12 border bg-paper-panel px-4 py-3"
                }
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="t-label shrink-0 tabular-nums text-brand-ink">{`0${index + 1}`}</span>
                  <h4 className="font-mono text-[14px] font-medium uppercase leading-none tracking-[0.14em] text-ink">
                    {stage.label}
                  </h4>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-ink/50">{stage.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/** One group: its bracket rendered as a left rule, its name, and its three. */
function Group({ cluster }: { cluster: MindCluster }) {
  const members = PROBLEM_INPUTS.filter((input) => input.cluster === cluster.id);

  return (
    <li className="border-l border-brand/50 pl-3">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-brand-ink">
          {cluster.label}
        </span>
        <span className="text-[10px] leading-none text-ink/45">{cluster.note}</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {members.map((input) => (
          <li
            key={input.id}
            className="border border-ink/15 bg-paper-panel px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.1em] text-ink/70"
          >
            {input.label}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** The marker between two stages. One head — here, direction is the content. */
function Step() {
  return (
    <div className="flex items-center gap-2 py-2.5" aria-hidden="true">
      <svg width="9" height="20" viewBox="0 0 9 20" fill="none" className="shrink-0">
        <path d="M4.5 0v20" stroke="rgba(20,20,15,0.2)" strokeWidth="1" />
        <path d="M1 16.5 4.5 19.5 8 16.5" stroke="#C9871F" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-ink/[0.08]" />
    </div>
  );
}
