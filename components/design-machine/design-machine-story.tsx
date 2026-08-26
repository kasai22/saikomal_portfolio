import Image from "next/image";
import { MachinePart } from "@/components/design-machine/machine-parts";
import { DESIGN_MACHINE, MACHINE_PRODUCT } from "@/features/home/constants/data";
import { cn } from "@/lib/utils";

/**
 * The machine as a vertical sequence — what a phone gets, and what anybody
 * gets who has asked for reduced motion.
 *
 * ── Why one component serves both ───────────────────────────────────────
 * The desktop figure is a camera travelling a plane three times wider than the
 * screen. Neither of those readers can have that: one has no width to travel
 * across, and the other has asked not to be moved. Both need the same thing —
 * the machine laid out so it can be read rather than driven — so they get the
 * same component rather than two that would drift apart.
 *
 * Nothing is lost by it. Every station keeps its apparatus drawing, its part
 * name, its step, its description and its artefact, and the delivery end keeps
 * the real screen. What goes is the camera, which was never carrying
 * information, only the sense of travelling through one thing rather than
 * reading six.
 *
 * This is also the copy that lives in the page's HTML: the media query
 * resolves `false` on the server, so this is what is rendered and crawled, and
 * the canvas is swapped in on the first client render on a wide viewport.
 *
 * A server component — no state, no measurement, no motion.
 */
export function DesignMachineStory() {
  return (
    <ol className="flex flex-col">
      {DESIGN_MACHINE.map((station, index) => {
        const isOutput = station.id === "output";

        return (
          <li key={station.id}>
            {index > 0 && <Feed />}

            <div
              className={cn(
                "corner-ticks flex gap-4 border bg-paper-panel px-4 py-4 sm:gap-5 sm:px-5",
                isOutput ? "border-ink/30" : "border-ink/12",
              )}
            >
              <div className="shrink-0 pt-0.5">
                <MachinePart id={station.id} size={44} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="t-label text-brand-ink">{station.part}</span>
                  {station.step && (
                    <span className="font-mono text-[10px] tabular-nums leading-none tracking-[0.1em] text-ink/35">
                      {station.step}
                    </span>
                  )}
                </div>

                <h3 className="mt-1.5 text-[17px] font-medium leading-none tracking-[-0.02em] text-ink">
                  {station.title}
                </h3>

                <p className="t-meta mt-2 text-ink/65">{station.description}</p>

                <p className="mt-2 font-mono text-[9.5px] uppercase leading-snug tracking-[0.1em] text-ink/45">
                  {station.output}
                </p>

                {isOutput && (
                  <figure className="mt-3 border border-ink/15 bg-paper p-1">
                    {/* `sizes` keeps the phone from fetching the full-width
                        original for a 300px slot. */}
                    <Image
                      src={MACHINE_PRODUCT.src}
                      alt={MACHINE_PRODUCT.alt}
                      width={1600}
                      height={900}
                      sizes="(min-width: 640px) 420px, 300px"
                      className="h-auto w-full"
                    />
                  </figure>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** The marker between two stations. One head — here, direction is the content. */
function Feed() {
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
