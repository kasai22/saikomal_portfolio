import {
  inputVar,
  restingTransform,
  reveal,
  wipe,
  type Bracket,
  type InputId,
  type Layout,
  type StageId,
  type StepId,
} from "@/components/product-mind/product-mind-timeline";
import { cn } from "@/lib/utils";
import type { MindCluster, MindInput, MindStage } from "@/features/home/types";

/**
 * The three kinds of thing that carry a word on this canvas: a loose input, a
 * group's name, and a stage of the structure.
 *
 * All three are server-rendered and none of them hold state or a motion value.
 * Every animated property is a `var()` written by the stage's single scroll
 * subscription, and every one of those carries a fallback that composes into
 * the resolved drawing.
 */

/* ------------------------------------------------------------------ *
 * Inputs
 * ------------------------------------------------------------------ */

interface InputTokenProps {
  input: MindInput;
  layout: Layout;
}

/**
 * One of the nine things a problem arrives as.
 *
 * A chip, not a box: these are notes on a table, and they read as material
 * rather than as architecture. The distinction matters, because the entire
 * point of the sequence is that they *become* architecture — so what they
 * start as has to be visibly a different class of object from the stages on
 * the right.
 *
 * ── The one thing on this page that actually moves ──────────────────────
 * Its whole transform, position and tilt together, is a single custom
 * property. The fallback written into the markup is the *resolved* position —
 * sorted into its group, straightened — so the server render, the first client
 * frame and reduced motion all paint the tidy state without a second code
 * path, and only a live scroll ever pulls it back out to where it landed.
 */
export function InputToken({ input, layout }: InputTokenProps) {
  const id = input.id as InputId;
  const { token, type } = layout;

  return (
    <div
      style={{
        width: token.w,
        height: token.h,
        transform: `var(${inputVar(id)}, ${restingTransform(id, layout)})`,
        opacity: `var(--m-in-${id}, 1)`,
      }}
      className="absolute left-0 top-0 flex items-center justify-center border border-ink/15 bg-paper-panel"
    >
      <span
        style={{ fontSize: type.token }}
        className="whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.12em] text-ink/80"
      >
        {input.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Groups
 * ------------------------------------------------------------------ */

interface ClusterLabelProps {
  cluster: MindCluster;
  bracket: Bracket;
  type: Layout["type"];
}

/**
 * A group's name, written beside its bracket at the moment the bracket is
 * drawn. Left-aligned to the bracket's own spine, so the two read as one mark
 * rather than as a label that happens to be nearby.
 */
export function ClusterLabel({ cluster, bracket, type }: ClusterLabelProps) {
  return (
    <div
      style={{
        left: bracket.label.x,
        top: bracket.label.y,
        opacity: `var(--m-br-${cluster.id}, 1)`,
      }}
      className="absolute -translate-y-1/2"
    >
      <p
        style={{ fontSize: type.note }}
        className="flex items-baseline gap-1.5 whitespace-nowrap leading-none"
      >
        <span className="font-mono font-medium uppercase tracking-[0.12em] text-brand-ink">
          {cluster.label}
        </span>
        <span className="text-ink/45">{cluster.note}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Stages
 * ------------------------------------------------------------------ */

interface StageBoxProps {
  stage: MindStage;
  layout: Layout;
  step: StepId;
}

/**
 * One stage of the structure the sorted inputs turn into.
 *
 * Uncovered from its left edge rather than faded in, because the chain is
 * growing rightwards and a box that appears in the direction the structure is
 * travelling reads as an extension of it. The artefact line underneath is the
 * real output of the corresponding step in `PROCESS_STEPS` — it is what makes
 * this a diagram of a method somebody actually has rather than five nouns in a
 * row.
 *
 * The product is the last box and the only one with anything drawn inside it:
 * three rules that resolve into the suggestion of an interface. Not a
 * screenshot and not a wireframe — at 150px wide either would be illegible.
 * Just enough to say that what comes out the end is a thing with a shape.
 */
export function StageBox({ stage, layout, step }: StageBoxProps) {
  const box = layout.stage[stage.id as StageId];
  const { type } = layout;
  const isProduct = stage.id === "product";

  return (
    <div
      style={{ left: box.cx, top: box.cy }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        style={{ width: box.w, height: box.h, ...wipe(step) }}
        className={cn(
          "corner-ticks flex flex-col items-center justify-center border bg-paper-panel",
          isProduct ? "border-ink/35" : "border-ink/15",
        )}
      >
        <span
          style={{ fontSize: type.stage }}
          className="whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.14em] text-ink"
        >
          {stage.label}
        </span>

        {isProduct && (
          <span
            aria-hidden="true"
            className="mt-2.5 flex w-full flex-col items-center gap-[3px] px-5"
          >
            {[0.55, 1, 0.78].map((scale, index) => (
              <span
                key={scale}
                style={{
                  width: `${scale * 100}%`,
                  opacity: `calc((var(--m-settle, 1) - ${index * 0.28}) * 3)`,
                }}
                className="h-px bg-brand-ink"
              />
            ))}
          </span>
        )}
      </div>

      {/* The artefact, under the box rather than in it — a caption on a
          drawing, which is what it is. Sits outside the wipe so it fades in
          just behind the box it belongs to. */}
      <p
        style={{ width: box.caption, fontSize: type.note, ...reveal(step) }}
        className="absolute left-1/2 mt-2.5 -translate-x-1/2 text-center leading-snug text-ink/45"
      >
        {stage.output}
      </p>
    </div>
  );
}
