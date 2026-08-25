import {
  LAYERS,
  STAGES,
  layerVar,
  stageVar,
} from "@/components/product-build/product-build-timeline";

/**
 * The build manifest — what is being added, in what order, under which stage.
 *
 * This is the half of the section that makes it an argument rather than an
 * effect. The canvas shows an interface appearing; the manifest names the
 * sixteen things it is made of and groups them into the five stages a product
 * passes through. Read together they say: this is not drawing, it is
 * construction, and the order is not arbitrary.
 *
 * It runs as a strip above the frame rather than as a column beside it,
 * because the frame needs every pixel of width it can get before a nine-column
 * operations table reads as anything at all.
 *
 * Static markup, like the canvas: every tick reads a custom property and
 * nothing here re-renders. Ticks fill on `scaleX` rather than `width`, so a
 * layer landing costs a composite and nothing else.
 */
export function BuildManifest() {
  return (
    <ol className="flex items-start gap-4 sm:gap-6">
      {STAGES.map((stage, index) => (
        <li
          key={stage.label}
          className="min-w-0 flex-1"
          style={{ opacity: `var(${stageVar(index)}, 1)` }}
        >
          <div className="flex items-baseline gap-1.5">
            <span className="t-label tabular-nums text-brand-ink">{`0${index + 1}`}</span>
            <span className="t-label truncate text-ink">{stage.label}</span>
          </div>

          <div className="mt-2 flex gap-1">
            {LAYERS.filter((layer) => stage.layers.includes(layer.id)).map((layer) => (
              <span key={layer.id} className="relative h-[3px] flex-1 bg-ink/[0.09]">
                <span
                  className="absolute inset-0 block bg-brand"
                  style={{
                    transform: `scaleX(var(${layerVar(layer.id)}, 1))`,
                    transformOrigin: "left",
                  }}
                />
              </span>
            ))}
          </div>

          {/* The layer names themselves, on the widest viewports only — below
              that the ticks carry the count and the stage carries the reading. */}
          <p className="mt-1.5 hidden truncate text-[9px] leading-relaxed text-ink/45 xl:block">
            {LAYERS.filter((layer) => stage.layers.includes(layer.id))
              .map((layer) => layer.label)
              .join(" · ")}
          </p>
        </li>
      ))}
    </ol>
  );
}
