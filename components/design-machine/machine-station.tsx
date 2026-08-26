import Image from "next/image";
import { MachinePart } from "@/components/design-machine/machine-parts";
import {
  focusVar,
  reveal,
  type StationId,
  type machineScale,
} from "@/components/design-machine/design-machine-timeline";
import { MACHINE_PRODUCT } from "@/features/home/constants/data";
import { cn } from "@/lib/utils";
import type { MachineStation as Station } from "@/features/home/types";

/**
 * One station of the machine: the part, what step of the method it is, and
 * what that step puts out.
 *
 * ── Nothing here moves ──────────────────────────────────────────────────
 * A machine's stations are bolted down. The only thing that changes as the
 * camera arrives is how strongly the station reads — the apparatus takes its
 * accent, the label block comes up out of grey, and the rule under it extends.
 * All three are one custom property, that station's own focus, and all three
 * are opacity or a scale on a hairline. The camera does the travelling; the
 * machine does not shuffle about to meet it.
 *
 * ── The delivery end ────────────────────────────────────────────────────
 * The last station is the only one carrying a photograph, and it is a real
 * one: Kudra's fleet view, the same file the case study uses. It resolves
 * inside the aperture on its own window rather than with the station, so the
 * machine visibly finishes its run and *then* hands something over.
 *
 * A server component — no state, no measurement, no motion of its own.
 */

interface MachineStationProps {
  station: Station;
  index: number;
  size: ReturnType<typeof machineScale>;
  /** Left edge of this station's column on the plane, in pixels. */
  x: number;
  /** Vertical centre of the machine's spine, in pixels. */
  spine: number;
}

export function MachineStationBlock({ station, index, size, x, spine }: MachineStationProps) {
  const id = station.id as StationId;
  const isOutput = id === "output";
  const focus = focusVar(id);

  return (
    <div style={{ left: x, top: spine, width: size.column }} className="absolute -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        {/* The apparatus. Sits above its own label, the way a part sits above
            its callout on a drawing. */}
        <div
          style={{ opacity: `calc(0.42 + ${focus} * 0.58)` }}
          className="flex items-end justify-center"
        >
          <MachinePart id={id} size={size.glyph} />
        </div>

        {/* The tie line between the part and what it is called. */}
        <span
          aria-hidden="true"
          style={{ height: Math.round(size.glyph * 0.22), opacity: focus }}
          className="w-px bg-brand/50"
        />

        <p
          style={{ fontSize: size.part, opacity: `calc(0.5 + ${focus} * 0.5)` }}
          className="mt-2 font-mono font-medium uppercase leading-none tracking-[0.18em] text-brand-ink"
        >
          {station.part}
        </p>

        <h3
          style={{ fontSize: size.title, opacity: `calc(0.35 + ${focus} * 0.65)` }}
          className="mt-2 font-medium leading-none tracking-[-0.02em] text-ink"
        >
          {station.step && (
            <span className="mr-2 font-mono tabular-nums tracking-[0.1em] text-ink/35">
              {station.step}
            </span>
          )}
          {station.title}
        </h3>

        {/* The rule under the title extends as the camera arrives. Scale on a
            hairline — one composited property, no layout. */}
        <span
          aria-hidden="true"
          style={{ transform: `scaleX(${focus})` }}
          className="mt-2.5 h-px w-full origin-center bg-ink/20"
        />

        <p
          style={{ fontSize: size.body, opacity: `calc(0.2 + ${focus} * 0.8)` }}
          className="mt-2.5 leading-snug text-ink/70"
        >
          {station.description}
        </p>

        <p
          style={{ fontSize: size.note, opacity: `calc(0.15 + ${focus} * 0.85)` }}
          className="mt-2 font-mono uppercase leading-snug tracking-[0.1em] text-ink/45"
        >
          {station.output}
        </p>

        {isOutput && (
          <figure
            style={{ width: size.column, ...reveal("deliver") }}
            className="corner-ticks mt-3.5 border border-ink/20 bg-paper-panel p-1"
          >
            {/* `sizes` is what stops Next serving a 1328 KB original into a
                220px slot. The real file is a wide screenshot; at this size the
                browser only ever fetches the small rendition. */}
            <Image
              src={MACHINE_PRODUCT.src}
              alt={MACHINE_PRODUCT.alt}
              width={1600}
              height={900}
              sizes="240px"
              className="h-auto w-full"
            />
          </figure>
        )}
      </div>

      {/* The station's index, set large and faint on the near plane. A drawing
          numbers its parts; this is that numeral, and it is the one piece of
          type that belongs to the machine rather than to the reader. */}
      <span
        aria-hidden="true"
        style={{
          fontSize: size.numeral,
          top: -Math.round(size.numeral * 1.15),
          opacity: `calc(${focus} * 0.14)`,
        }}
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono font-medium leading-none tracking-[-0.02em] text-ink",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
