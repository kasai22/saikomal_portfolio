"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { MachineStationBlock } from "@/components/design-machine/machine-station";
import { Workpiece } from "@/components/design-machine/machine-parts";
import {
  PLANE,
  STATION_X,
  machineScale,
  machineVars,
  restingCamera,
} from "@/components/design-machine/design-machine-timeline";
import { DESIGN_MACHINE } from "@/features/home/constants/data";

/**
 * The stage — a machine seen from the side, and a camera that travels its
 * length.
 *
 * ── What the reader scrolls through ─────────────────────────────────────
 * A problem drops into an intake. The camera follows it: through a stack of
 * screens that catches what is out of scope, past a press that puts a
 * structure into it, an assembly that stacks it into something running, a
 * gauge that measures it, and out through an aperture where a real shipped
 * screen resolves. The piece being worked stays in the middle of frame the
 * whole way and changes shape six times; the machine slides past behind it.
 *
 * ── Why it is driven by ScrollTrigger and pinned by CSS ─────────────────
 * The narrative is a GSAP timeline on a ScrollTrigger with a numerical scrub,
 * which is what gives the camera its weight — the dolly eases behind the wheel
 * rather than being welded to it.
 *
 * The *pin*, though, is `position: sticky`, not ScrollTrigger's. This site
 * runs Lenis, and ScrollTrigger's pinning works by inserting a spacer and
 * rewriting the pinned element's position on every update, which is exactly
 * the sort of thing that fights a momentum-scroll loop for control of the same
 * scroll position. Sticky is declarative, the browser owns it, it cannot
 * desync, and it is what the site's other four figures already pin with. So
 * ScrollTrigger does what only it can do — a scrubbed master timeline — and
 * the browser keeps doing what it is already good at.
 *
 * ── Why GSAP is imported inside the effect ──────────────────────────────
 * The same reason the case-study narrative does it: ScrollTrigger is ~118 KB,
 * and importing it at module scope would put it in the home page's bundle for
 * every visitor including the ones who will never see this run. Deferring to
 * the effect means it is fetched only on a viewport that will actually build
 * the timeline, and never at all under reduced motion or below `md`.
 *
 * ── Cost ────────────────────────────────────────────────────────────────
 * One `onUpdate` writes about twenty custom properties onto one node. Three
 * layers read three of them as `translate3d` — the only transforms in the
 * figure — and roughly seventy elements read the rest as opacity. Nothing
 * re-renders, nothing runs on a clock, and there is no filter, shadow or blur
 * anywhere in it.
 */

/** Used for the server render and the first client render. Then measured. */
const FALLBACK = { width: 1100, height: 620 };

interface DesignMachineProps {
  /**
   * The section's runway. ScrollTrigger measures against this element, and the
   * timeline finishes before the sticky stage releases it.
   */
  runway: RefObject<HTMLDivElement | null>;
  /** Where the timeline ends, as a fraction of the runway's height. */
  end: number;
  /** False under reduced motion or below `md` — GSAP is never fetched. */
  driven: boolean;
}

export function DesignMachine({ runway, end, driven }: DesignMachineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width === 0) return;
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      setSize((prev) =>
        Math.abs(prev.width - next.width) < 2 && Math.abs(prev.height - next.height) < 2
          ? prev
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { width, height } = size;
  const scale = useMemo(() => machineScale(width), [width]);
  const planeWidth = Math.round(width * PLANE.width);
  // The spine carries the stations; the rail is the line the piece runs
  // along. They used to sit 0.46 and 0.87 down the stage, which left a hand's
  // width of nothing between the bottom of a station and the rail under it.
  const spine = Math.round(height * 0.44);
  const rail = Math.round(height * 0.8);
  // How far below the spine a station's label block ends, and so where its
  // mount can start without crossing the copy. Derived from the apparatus size
  // because everything in the block is scaled off that.
  const mountDrop = Math.round(scale.glyph * 1.45);

  const apply = useCallback(
    (progress: number) => {
      const element = ref.current;
      if (!element) return;
      for (const [property, value] of machineVars(progress, width)) {
        element.style.setProperty(property, value);
      }
    },
    [width],
  );

  useEffect(() => {
    if (!driven || !runway.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !runway.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => apply(state.p),
          scrollTrigger: {
            trigger: runway.current,
            start: "top top",
            // The timeline has to finish while the stage is still pinned, so
            // it ends part-way down the runway rather than at the bottom of
            // it. A function so `invalidateOnRefresh` can re-measure it after
            // a resize changes the runway's height.
            end: () => `+=${Math.round((runway.current?.offsetHeight ?? 0) * end)}`,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      }, runway);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [apply, driven, end, runway]);

  // Paints the machine at rest before ScrollTrigger has arrived, and re-paints
  // it onto the new geometry after a resize. Progress 0 is the right state to
  // hold there: this figure is only ever mounted above the fold of its own
  // runway, so a reader who has not scrolled into it yet should be looking at
  // the intake, not at the delivery end.
  useEffect(() => {
    if (!driven) return;
    apply(0);
  }, [apply, driven]);

  const resting = restingCamera(width);
  const focus = Math.round(width * PLANE.focus);

  return (
    <div ref={ref}>
      <div
        ref={stageRef}
        // `overflow-hidden` is doing real work here rather than guarding an
        // edge case: the plane is nearly three times the stage's width and
        // most of it is outside the frame at any moment. This is the camera's
        // viewport.
        //
        // The three planes inside carry `translate3d`, which promotes each of
        // them to its own compositor layer on its own. They deliberately do
        // *not* also carry `will-change` — each plane is nearly three viewports
        // wide and a full stage tall, so hinting three of those costs real
        // texture memory to buy a first-frame promotion the transform was
        // already going to trigger.
        className="relative h-[70svh] max-h-[660px] min-h-[440px] w-full overflow-hidden"
      >
        {/* ── Back plane · the structure the machine is bolted to ───────── */}
        <div
          style={{
            width: planeWidth,
            transform: `translate3d(var(--dm-back, ${resting.back}), 0, 0)`,
          }}
          className="absolute inset-y-0 left-0"
        >
          <MachineFrame width={planeWidth} rail={rail} height={height} />
        </div>

        {/* ── Mid plane · the machine itself ────────────────────────────── */}
        <div
          style={{
            width: planeWidth,
            transform: `translate3d(var(--dm-mid, ${resting.mid}), 0, 0)`,
          }}
          className="absolute inset-y-0 left-0"
        >
          {DESIGN_MACHINE.map((station, index) => (
            <MachineStationBlock
              key={station.id}
              station={station}
              index={index}
              size={scale}
              x={Math.round(STATION_X[station.id] * planeWidth) - scale.column / 2}
              spine={spine}
            />
          ))}

          {/* The mounts: a hairline from under each station down to the rail it
              stands on.

              Drawn here, in the plane's own coordinates, rather than inside the
              station — from in there the offset would have to be measured
              against a block whose height depends on how its description
              wraps, and it got that wrong: the line started half way up and
              ran straight through the copy. Out here both ends are known
              exactly. It is still on the *mid* plane, so it travels with the
              station it holds up rather than drifting off it the way it did
              when the background owned it.

              The delivery end has none. It is not mounted on the line; it is
              where things leave it. */}
          {DESIGN_MACHINE.filter((station) => station.id !== "output").map((station) => (
            <span
              key={`mount-${station.id}`}
              aria-hidden="true"
              style={{
                left: Math.round(STATION_X[station.id] * planeWidth),
                top: spine + mountDrop,
                height: Math.max(rail - spine - mountDrop, 0),
                opacity: `calc(0.25 + var(--dm-s-${station.id}, 1) * 0.6)`,
              }}
              className="pointer-events-none absolute w-px bg-ink/25"
            />
          ))}
        </div>

        {/* ── Fore plane · the datum the parts are measured against ─────── */}
        <div
          style={{
            width: planeWidth,
            transform: `translate3d(var(--dm-fore, ${resting.fore}), 0, 0)`,
          }}
          className="pointer-events-none absolute inset-y-0 left-0"
        >
          <MachineDatum width={planeWidth} y={rail} />
        </div>

        {/* ── The piece being worked ────────────────────────────────────── */}
        {/* Not on any plane. It sits at the camera's focus mark and stays
            there, because the camera is following it — which is what makes the
            machine read as travelling past rather than the piece as sliding
            along. */}
        <div
          style={{ left: focus, top: rail }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <Workpiece size={Math.round(scale.glyph * 0.82)} />
          {/* The carrier it rides on. Two marks either side of the rail — the
              drafting shorthand for "this is the thing being conveyed", and
              the only reason the piece reads as *on* the line rather than
              floating above it. */}
          <span
            aria-hidden="true"
            style={{ width: Math.round(scale.glyph * 0.82) }}
            className="absolute left-1/2 top-full mt-1 flex -translate-x-1/2 justify-between"
          >
            <span className="h-1.5 w-px bg-brand-ink/60" />
            <span className="h-1.5 w-px bg-brand-ink/60" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The frame the machine is bolted to: two long rails running its whole length.
 *
 * Only the rails. The mounting ticks that drop from each station down to them
 * used to live here too, and that was wrong — this is the far plane, so it
 * travels at 0.62 of the camera's rate, and a tick on it drifted steadily away
 * from the station it was supposedly holding up. Anything attached to a
 * station has to move with that station. The ticks are drawn by the station
 * itself now; what is left here is the only thing that genuinely belongs to
 * the background, which is the run of the rails.
 */
function MachineFrame({ width, rail, height }: { width: number; rail: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0"
    >
      <path d={`M0 ${rail}H${width}`} stroke="rgba(20,20,15,0.16)" strokeWidth="1" />
      <path d={`M0 ${rail + 7}H${width}`} stroke="rgba(20,20,15,0.07)" strokeWidth="1" />
    </svg>
  );
}

/**
 * The datum line, with a mark every so often along it. Nearest plane, so it
 * travels fastest — the ground going past a moving camera, which is the single
 * clearest depth cue a side-on dolly has.
 */
function MachineDatum({ width, y }: { width: number; y: number }) {
  const step = 48;
  const marks = Math.ceil(width / step);

  return (
    <svg
      width={width}
      height={20}
      viewBox={`0 0 ${width} 20`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ top: y + 14 }}
      className="absolute left-0"
    >
      {Array.from({ length: marks }, (_, i) => {
        const x = i * step;
        const tall = i % 4 === 0;
        return (
          <path key={x} d={`M${x} 0V${tall ? 9 : 5}`} stroke="rgba(20,20,15,0.2)" strokeWidth="1" />
        );
      })}
    </svg>
  );
}
