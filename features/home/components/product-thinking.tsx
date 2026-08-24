"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { Panel } from "@/components/ui/panel";
import { STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { SPRING_LAYOUT, SPRING_SCROLL } from "@/lib/animations/springs";
import { ENTER, WIPE } from "@/lib/animations/transitions";
import { drawLine, fadeMove, staggerContainer } from "@/lib/animations/variants";
import { useSectionScroll } from "@/hooks/use-scroll-tier";
import { cn } from "@/lib/utils";
import { ABOUT_FOCUS, PRODUCT_THINKING } from "@/features/home/constants/data";

/** How far the outer two concepts start apart, in px, before converging. */
const SPREAD = 26;

/**
 * Engineering + UX + Product — three disciplines that resolve into one way of
 * working.
 *
 * ── The argument, and how motion carries it ─────────────────────────────
 * The three concepts start visually separate and converge as the section
 * crosses the viewport: Engineering drifts right, Product drifts left, UX
 * holds the centre, and the rules between them draw closed. The synthesis
 * line then resolves underneath. The claim is that these are not three
 * skills on a list but one combined practice, so the motion is the claim —
 * separate things becoming one system.
 *
 * ── Readable with every animation off ───────────────────────────────────
 * This is the constraint that shaped the implementation. The *resting*
 * state of every value here is the final, converged state — the scroll
 * transforms interpolate *toward* what the element already is, and pin to
 * it whenever scroll motion is disabled. So with JavaScript inert, reduced
 * motion on, or on a small screen, the reader gets the finished composition
 * immediately: three labelled concepts, their contributions, and the
 * conclusion. Nothing is hidden behind a trigger and nothing has to move
 * for the section to make sense.
 *
 * ── Hover ───────────────────────────────────────────────────────────────
 * A single focus ring travels between the three panels on `layoutId`, so it
 * reads as one object moving rather than three rings fading in and out —
 * the same device as the nav's active indicator. Hovering a concept brings
 * its contributions to full strength and softens the other two. At rest the
 * ring sits on Product, because that is where the other two are going.
 *
 * Hover uses React state deliberately: it changes on enter and leave only,
 * not per pointer move, so it is nowhere near the frequency that has to
 * stay on motion values.
 *
 * The panels are not focusable. Making three non-interactive cards tabbable
 * would add tab stops that lead nowhere, and the highlight is emphasis
 * rather than information — a keyboard or screen-reader user already has
 * every contribution in the markup.
 *
 * ── Mobile ──────────────────────────────────────────────────────────────
 * Below `lg` the three stack vertically with a connector drawn down the
 * side and no spatial convergence — the horizontal drift has nowhere to go
 * on a narrow viewport, and pretending otherwise just makes the panels
 * jitter.
 */
export function ProductThinking() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, enabled } = useSectionScroll(ref, ["start 0.9", "start 0.35"]);
  const smooth = useSpring(progress, SPRING_SCROLL);
  const [hovered, setHovered] = useState<number | null>(null);

  // Every transform below ends at the resting state and only *starts*
  // somewhere else when scroll motion is available.
  const engineeringX = useTransform(smooth, [0, 1], [enabled ? -SPREAD : 0, 0]);
  const productX = useTransform(smooth, [0, 1], [enabled ? SPREAD : 0, 0]);
  const bridgeScale = useTransform(smooth, [0, 1], [enabled ? 0 : 1, 1]);
  const synthesisOpacity = useTransform(smooth, [0, 1], [enabled ? 0.25 : 1, 1]);

  const drift = [engineeringX, undefined, productX] as const;
  // At rest the ring sits on Product — the thing the other two resolve into.
  const focused = hovered ?? PRODUCT_THINKING.length - 1;

  return (
    <div ref={ref} className="mt-4">
      <div className="relative flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
        {/* The connector. Horizontal between the panels on desktop, vertical
            down the stack on mobile. Drawn, not faded — a line closing is
            the whole point. */}
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.default}
          variants={drawLine("y")}
          transition={WIPE}
          className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-brand/50 via-brand/25 to-transparent lg:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: bridgeScale }}
          className="absolute left-[12%] right-[12%] top-1/2 hidden h-px origin-center bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block"
        />

        {PRODUCT_THINKING.map((concept, i) => {
          const isFocused = focused === i;
          const isProduct = i === PRODUCT_THINKING.length - 1;

          return (
            <div
              key={concept.label}
              className="relative flex flex-1 flex-col items-stretch gap-3 pl-6 lg:flex-row lg:items-stretch lg:pl-0"
            >
              {/* Node on the mobile connector rail, positioned against this
                  concept's own row. */}
              <span
                className={cn(
                  "absolute left-0 top-[22px] h-[7px] w-[7px] -translate-x-[3px] rounded-full border transition-colors duration-fast lg:hidden",
                  isFocused ? "border-brand bg-brand" : "border-ink/24 bg-paper",
                )}
                aria-hidden="true"
              />

              <motion.div
                style={{ x: drift[i] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative h-full flex-1 rounded-sm"
              >
                {/* One ring, travelling between panels. */}
                {isFocused && (
                  <motion.span
                    layoutId="triad-focus"
                    transition={SPRING_LAYOUT}
                    aria-hidden="true"
                    // `inset-0`, not `-inset-px`: an outset ring sits 1px
                    // beyond its parent on every side, which pushed the
                    // document 3px wider than the viewport at 768px and gave
                    // the whole page a horizontal scrollbar.
                    className="pointer-events-none absolute inset-0 rounded-sm border border-brand/45"
                  />
                )}

                <Panel
                  level={isProduct ? 3 : 2}
                  className={cn("h-full p-5 transition-colors duration-fast", isProduct && "border-brand/30")}
                >
                  <h3 className={cn("t-h3", isProduct ? "text-brand-ink" : "text-ink")}>
                    {concept.label}
                  </h3>
                  <p className="t-meta mb-4 mt-1 text-ink/60">{concept.detail}</p>
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT.default}
                    variants={staggerContainer(STAGGER.tight)}
                    className="space-y-2"
                  >
                    {concept.points.map((point) => (
                      <motion.li
                        key={point}
                        variants={fadeMove("up", 6)}
                        transition={ENTER}
                        className={cn(
                          "t-meta flex items-center gap-2.5 transition-colors duration-fast",
                          isFocused ? "text-ink" : "text-ink/60",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1 w-1 shrink-0 rounded-full transition-colors duration-fast",
                            isFocused ? "bg-brand" : "bg-brand/45",
                          )}
                          aria-hidden="true"
                        />
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </Panel>
              </motion.div>

              {/* The operator between concepts. */}
              {!isProduct && (
                <span
                  className="hidden shrink-0 self-center text-lg font-light text-ink/60 lg:block"
                  aria-hidden="true"
                >
                  +
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* The result. Sits under the row rather than as a fourth panel, so the
          three read as inputs and this reads as what they add up to. */}
      <motion.div
        style={{ opacity: synthesisOpacity }}
        className="mt-5 flex flex-col gap-3 border-t border-ink/12 pt-5 sm:flex-row sm:items-baseline sm:gap-5"
      >
        <p className="t-eyebrow shrink-0 text-brand-ink">= Product thinking</p>
        <p className="t-body max-w-xl text-ink/70">{ABOUT_FOCUS}</p>
      </motion.div>
    </div>
  );
}
