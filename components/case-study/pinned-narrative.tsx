"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

export interface NarrativeStage {
  /** Two-digit index. The sequence is the argument, so it is numbered. */
  step: string;
  /** The state of the operation at this point in the story. */
  title: string;
  /** One line on what changed. */
  detail: string;
  /** Concrete items evidencing this stage — all from the case study's data. */
  items: string[];
  /** Screenshot standing in for this stage, if the study has one. */
  image?: { src: string; alt: string; width: number; height: number };
}

interface PinnedNarrativeProps {
  stages: NarrativeStage[];
  /** Accessible name for the whole sequence. */
  label: string;
  className?: string;
}

/**
 * The one pinned, scrubbed sequence on the site.
 *
 * A single visual stays fixed while the narrative advances beside it, and
 * the visual changes state as each stage takes over. It exists here and
 * nowhere else because this is the only place where the *transformation* is
 * the point: an operation moving from phone calls and spreadsheets to a
 * structured, trip-centric, measurable system. Showing four screenshots in a
 * row would list the destinations; pinning one and changing it shows the
 * change.
 *
 * ── Why GSAP for this and Motion for everything else ────────────────────
 * Pinning means taking an element out of flow, holding it for a measured
 * scroll distance, then returning it — while keeping the surrounding layout
 * stable. ScrollTrigger's `pin` does exactly that, including the spacer
 * maths. Motion has no equivalent, and hand-rolling it with `position:
 * sticky` plus scroll maths is where this kind of section usually breaks.
 * Everything that is *not* a pin stays on Motion.
 *
 * ── Desktop only, by construction ───────────────────────────────────────
 * Pinning hijacks scroll, which is the wrong trade on a phone: it makes a
 * page feel stuck, costs a frame budget the device does not have, and
 * conflicts with browser chrome that resizes the viewport mid-scroll. Below
 * `lg`, and under reduced motion, no ScrollTrigger is ever created — the
 * same stages render as an ordinary vertical sequence. That is not a
 * degraded fallback; it is the same content read the normal way.
 *
 * ── GSAP is loaded on demand, not imported ──────────────────────────────
 * The library is `import()`ed inside the effect, so it is fetched only when
 * a pin is actually going to be created. Importing it at module scope put
 * 118 KB of ScrollTrigger on the **home page**, which pins nothing — Next
 * prefetches the linked case-study route, and the prefetch pulled the
 * library with it. Deferring to the effect also means GSAP never downloads
 * on mobile or under reduced motion, on any route.
 *
 * ── Cleanup ─────────────────────────────────────────────────────────────
 * Everything is created inside a `gsap.context()` scoped to the container,
 * and `ctx.revert()` on unmount kills the triggers, removes the pin spacer
 * and restores every inline style GSAP wrote. Without that, navigating away
 * mid-pin leaves a stranded spacer and a dead trigger still measuring
 * scroll. The async import adds one wrinkle: the component can unmount
 * before the library arrives, so the teardown has to handle a context that
 * does not exist yet — hence the `cancelled` flag.
 */
export function PinnedNarrative({ stages, label, className }: PinnedNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rich, reduced } = useMotionTier();
  const [active, setActive] = useState(0);

  // `rich` is desktop + real pointer; pinning also needs the height to be
  // worth it, so this is the one place that gates on the widest tier.
  const pinned = rich && !reduced;

  useEffect(() => {
    if (!pinned || !containerRef.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context((self) => {
        const panels = self.selector?.(".narrative-stage") as HTMLElement[] | undefined;
        if (!panels?.length) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top+=80",
          end: () => `+=${window.innerHeight * (stages.length - 0.35)}`,
          pin: ".narrative-visual",
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            // Which stage owns the current scroll position. Clamped so the
            // last stage stays selected through the tail of the pin rather
            // than flickering past the end of the array.
            const index = Math.min(
              stages.length - 1,
              Math.floor(trigger.progress * stages.length),
            );
            setActive((current) => (current === index ? current : index));
          },
        });
      }, containerRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pinned, stages.length]);

  const current = stages[active] ?? stages[0];

  return (
    <div ref={containerRef} className={cn("relative", className)} aria-label={label}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        {/* ── The narrative column ───────────────────────────────────── */}
        <ol className="flex flex-col gap-6 lg:gap-[45vh]">
          {stages.map((stage, i) => (
            <li
              key={stage.step}
              className={cn(
                "narrative-stage rounded-sm border p-5 transition-colors duration-base lg:border-0 lg:p-0",
                "border-ink/12 bg-ink/[0.02] lg:bg-transparent",
                pinned && i !== active && "lg:opacity-40",
                pinned && i === active && "lg:opacity-100",
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="t-eyebrow tabular-nums text-[color:var(--accent,#008080)]">
                  {stage.step}
                </span>
                <span
                  className="h-px flex-1 bg-[color:var(--accent,#008080)]/25"
                  aria-hidden="true"
                />
              </div>
              <h3 className="t-h3 mt-3 text-ink">{stage.title}</h3>
              <p className="t-body mt-2 text-ink/65">{stage.detail}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {stage.items.map((item) => (
                  <li key={item} className="t-chip">
                    {item}
                  </li>
                ))}
              </ul>

              {/* On small screens each stage carries its own visual, so the
                  sequence reads normally without any pinning. */}
              {stage.image && (
                <div className="mt-4 overflow-hidden rounded-sm border border-ink/12 lg:hidden">
                  <Image
                    src={stage.image.src}
                    alt={stage.image.alt}
                    width={stage.image.width}
                    height={stage.image.height}
                    className="block h-auto w-full"
                  />
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* ── The pinned visual ──────────────────────────────────────── */}
        <div className="narrative-visual hidden lg:block">
          <div className="relative overflow-hidden rounded-sm border border-ink/12 bg-paper-panel">
            {stages.map((stage, i) =>
              stage.image ? (
                <div
                  key={stage.step}
                  className={cn(
                    "transition-opacity duration-base",
                    i === active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={stage.image.src}
                    alt={stage.image.alt}
                    width={stage.image.width}
                    height={stage.image.height}
                    className="block h-auto w-full"
                  />
                </div>
              ) : null,
            )}
            <div className="flex items-center gap-3 border-t border-ink/12 px-4 py-3">
              <span className="t-eyebrow tabular-nums text-[color:var(--accent,#008080)]">
                {current?.step}
              </span>
              <span className="t-meta text-ink/70">{current?.title}</span>
              {/* Progress through the sequence, as a hairline. */}
              <span className="ml-auto flex gap-1" aria-hidden="true">
                {stages.map((stage, i) => (
                  <span
                    key={stage.step}
                    className={cn(
                      "h-px w-6 transition-colors duration-base",
                      i <= active ? "bg-[color:var(--accent,#008080)]" : "bg-ink/15",
                    )}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
