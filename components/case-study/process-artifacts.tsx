"use client";

import { motion } from "motion/react";
import { STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { ENTER, WIPE } from "@/lib/animations/transitions";
import { drawLine, fadeMove, staggerContainer, wipeIn } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Process artefacts — the working drawings behind the prose. Each one
 * is built from the case study's own documented content (lifecycle
 * states, research areas, agent roles), and each is labelled as a
 * diagram or wireframe so it is never mistaken for a product
 * screenshot.
 *
 * These are the one place on the site where motion is information
 * rather than decoration. A flow diagram is *about* sequence, an
 * affinity map is *about* grouping, a wireframe is *about* hierarchy —
 * so revealing a flow in order, notes under the theme they were
 * clustered into, and regions in reading priority shows the thinking
 * instead of just displaying its output. Everything animates once, on
 * entry, and only transform/opacity/clip-path is touched.
 * ------------------------------------------------------------------ */

interface ArtifactFrameProps {
  /** e.g. "FIG. 01". */
  figure: string;
  /** What the artefact is. */
  title: string;
  /** What it shows, in one line. */
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

/** Shared technical frame: figure number, title, ruled body, caption. */
export function ArtifactFrame({ figure, title, caption, children, className }: ArtifactFrameProps) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={fadeMove("up")}
      transition={ENTER}
      className={cn("border border-ink/[0.14] bg-paper-panel", className)}
    >
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink/[0.1] px-4 py-2.5">
        <span className="t-eyebrow text-brand-ink">{figure}</span>
        <span className="t-eyebrow text-ink/70">{title}</span>
        {caption && <span className="t-meta ml-auto text-ink/60">{caption}</span>}
      </figcaption>
      <div className="bg-dots p-5 sm:p-7">{children}</div>
    </motion.figure>
  );
}

/* ---------------------------- flow diagram ------------------------- */

export interface FlowNode {
  label: string;
  /** Optional second line inside the node. */
  detail?: string;
  /** Renders as a decision diamond rather than a box. */
  decision?: boolean;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  className?: string;
}

/**
 * A left-to-right node chain (top-to-bottom on small screens), drawn in
 * hairlines. Deliberately schematic — this is the flow as documented, not a
 * render of the UI.
 *
 * Nodes land in order and each connector draws itself between them, so the
 * diagram builds along the path a request actually takes. Watching it
 * assemble is the point: the sequence is the content.
 */
export function FlowDiagram({ nodes, className }: FlowDiagramProps) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.base)}
      className={cn("flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch", className)}
    >
      {nodes.map((node, i) => (
        <li key={node.label} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
          <motion.div
            variants={fadeMove("up", 10)}
            transition={ENTER}
            className={cn(
              "flex flex-1 flex-col justify-center border bg-paper-panel px-3 py-3 text-center",
              node.decision ? "border-brand/70 bg-brand/10" : "border-ink/30",
            )}
          >
            <span className="t-eyebrow block text-ink/60">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-h4 mt-1 block text-ink">{node.label}</span>
            {node.detail && <span className="t-meta mt-1 block text-ink/60">{node.detail}</span>}
          </motion.div>

          {i < nodes.length - 1 && (
            <motion.span
              aria-hidden="true"
              variants={drawLine("x")}
              transition={WIPE}
              className="mx-auto flex h-5 w-px shrink-0 origin-top items-center justify-center bg-ink/30 lg:mx-0 lg:h-px lg:w-6 lg:origin-left"
            >
              <span className="hidden h-1.5 w-1.5 translate-x-2.5 rotate-45 border-r border-t border-ink/45 lg:block" />
              <span className="h-1.5 w-1.5 translate-y-2 rotate-45 border-b border-r border-ink/45 lg:hidden" />
            </motion.span>
          )}
        </li>
      ))}
    </motion.ol>
  );
}

/* ---------------------------- affinity map ------------------------- */

export interface AffinityCluster {
  /** The theme the notes were grouped under. */
  theme: string;
  /** Raw observations, as captured. */
  notes: string[];
}

interface AffinityMapProps {
  clusters: AffinityCluster[];
  className?: string;
}

/**
 * Research notes grouped under the themes they were clustered into — the
 * synthesis step, shown rather than described. Notes are the raw
 * observations; the theme is the conclusion drawn from them.
 *
 * Each theme arrives before the notes filed under it, which is the order the
 * synthesis is read in, not the order it happened in. Stating the conclusion
 * and then the evidence is the right way round for someone scanning.
 */
export function AffinityMap({ clusters, className }: AffinityMapProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.base)}
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {clusters.map((cluster) => (
        <motion.div
          key={cluster.theme}
          variants={staggerContainer(STAGGER.tight)}
          className="flex flex-col gap-2"
        >
          <motion.p
            variants={fadeMove("up", 8)}
            transition={ENTER}
            className="t-eyebrow border-b border-ink/25 pb-2 text-brand-ink"
          >
            {cluster.theme}
          </motion.p>
          <ul className="flex flex-col gap-2">
            {cluster.notes.map((note) => (
              <motion.li
                key={note}
                variants={fadeMove("up", 8)}
                transition={ENTER}
                className="border border-ink/[0.14] bg-brand/[0.09] px-3 py-2 text-[11px] leading-[1.45] text-ink/80 shadow-[1px_1px_0_rgba(20,20,15,0.07)]"
              >
                {note}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ------------------------------ wireframe -------------------------- */

export interface WireRegion {
  /** What this region of the screen is. */
  label: string;
  /** Rough share of the row's width, 1–12. */
  span: number;
  /** Visual treatment: bars stand in for data rows, blocks for panels. */
  kind?: "block" | "bars" | "map" | "stat";
  /** Height in rem-ish steps. */
  rows?: number;
}

interface WireframeProps {
  /** Screen name, drawn into the frame's title bar. */
  screen: string;
  /** Full-height left column, if the screen has one. Modelled separately
   *  because a sidebar spans every row — repeating it per row would read
   *  as three navs rather than one. */
  sidebar?: { label: string; span?: number };
  regions: WireRegion[][];
  className?: string;
}

/**
 * Low-fidelity wireframe: a screen reduced to its regions and the hierarchy
 * between them. No colour, no copy — the point is where things sit and how
 * much weight each region carries.
 *
 * Regions wipe in downward, in source order, which is the order they were
 * prioritised in. The reveal sequence is the hierarchy argument.
 */
export function Wireframe({ screen, sidebar, regions, className }: WireframeProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.tight)}
      className={cn("border border-ink/30 bg-paper-panel", className)}
    >
      <div className="flex items-center gap-1.5 border-b border-ink/25 bg-paper-sunk px-3 py-2">
        <span className="h-2 w-2 rounded-full border border-ink/35" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full border border-ink/35" aria-hidden="true" />
        <span className="t-eyebrow ml-2 text-ink/60">{screen}</span>
      </div>

      <div className="flex gap-2 p-3">
        {sidebar && (
          <motion.div
            variants={wipeIn("down")}
            transition={WIPE}
            style={{ flexGrow: sidebar.span ?? 2, flexBasis: 0 }}
            className="flex min-w-0 flex-col gap-1.5 border border-dashed border-ink/35 p-2"
          >
            <span className="t-eyebrow truncate text-ink/60">{sidebar.label}</span>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-1.5 bg-ink/[0.16]" style={{ width: `${88 - i * 6}%` }} aria-hidden="true" />
            ))}
          </motion.div>
        )}
        {/* `min-w-0` is load-bearing: `flex-1` leaves `min-width: auto`, so
            without it this column refuses to shrink below the intrinsic
            width of its widest region label. On a 390px viewport that made
            the wireframe 511px wide and gave the whole REX page a 179px
            horizontal scroll. */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {regions.map((row, rowIndex) => (
            <div key={rowIndex} className="flex min-w-0 gap-2">
              {row.map((region) => (
                <motion.div
                  key={region.label}
                  variants={wipeIn("down")}
                  transition={WIPE}
                  style={{ flexGrow: region.span, flexBasis: 0 }}
                  className={cn(
                    "flex min-w-0 flex-col justify-between border border-dashed border-ink/35 p-2",
                    region.kind === "map" && "bg-ink/[0.04]",
                  )}
                >
                  <span className="t-eyebrow truncate text-ink/60">{region.label}</span>

                  {region.kind === "bars" && (
                    <span className="mt-2 flex flex-col gap-1.5" aria-hidden="true">
                      {Array.from({ length: region.rows ?? 4 }).map((_, i) => (
                        <span key={i} className="h-1.5 bg-ink/[0.16]" style={{ width: `${92 - i * 11}%` }} />
                      ))}
                    </span>
                  )}

                  {region.kind === "stat" && (
                    <span className="mt-2 flex items-end gap-1" aria-hidden="true">
                      <span className="h-5 w-10 bg-brand/45" />
                      <span className="h-2 w-6 bg-ink/[0.16]" />
                    </span>
                  )}

                  {region.kind === "map" && (
                    <span
                      className="mt-2 block"
                      style={{ height: `${(region.rows ?? 5) * 0.7}rem` }}
                      aria-hidden="true"
                    >
                      <span className="block h-full w-full border border-ink/[0.16] bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,rgba(20,20,15,0.06)_7px,rgba(20,20,15,0.06)_8px)]" />
                    </span>
                  )}

                  {(region.kind === "block" || !region.kind) && (
                    <span
                      className="mt-2 block bg-ink/[0.07]"
                      style={{ height: `${(region.rows ?? 2) * 0.65}rem` }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
