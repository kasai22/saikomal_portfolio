import {
  CLUSTER_IDS,
  arrive,
  draw,
  type Layout,
} from "@/components/product-mind/product-mind-timeline";

/**
 * Everything on this canvas that is a line rather than a word: the three
 * brackets that gather the sorted inputs into groups, the three wires those
 * groups feed into the insight, and the four along the chain.
 *
 * ── Why the brackets are the third phase ────────────────────────────────
 * "A pattern emerges" is the hardest of the five phases to draw without
 * resorting to something decorative. What it actually looks like, when a
 * person does it, is somebody putting a bracket down the side of a list and
 * writing a word next to it — the moment nine loose things become three named
 * ones. So that is what it is: a rule with a tick turning in at each end,
 * drawn top to bottom across the three groups, and a name appearing beside it.
 *
 * ── No motion values ────────────────────────────────────────────────────
 * Every line here draws itself from a CSS custom property written on an
 * ancestor. `pathLength={1}` normalises each path to one unit, so a single
 * dash of that length slides into place as `stroke-dashoffset` runs 1 → 0,
 * whatever the path's real length is. Nothing in this file re-renders while
 * the reader scrolls, and it holds no state of its own — it is a server
 * component.
 */

const WIRE = "rgba(20,20,15,0.22)";
const MARK = "rgba(138,90,10,0.6)";

interface MindFieldProps {
  layout: Layout;
  width: number;
  height: number;
}

export function MindField({ layout, width, height }: MindFieldProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {layout.bracket.map((bracket) => (
        <path
          key={bracket.id}
          d={bracket.d}
          fill="none"
          stroke={MARK}
          strokeWidth={1}
          pathLength={1}
          style={{
            strokeDasharray: "1",
            strokeDashoffset: `calc(1 - var(--m-br-${bracket.id}, 1))`,
          }}
        />
      ))}

      {CLUSTER_IDS.map((id) => {
        const edge = layout.feed[id];
        return (
          <g key={id}>
            <path
              d={edge.d}
              fill="none"
              stroke={WIRE}
              strokeWidth={1}
              pathLength={1}
              style={{
                strokeDasharray: "1",
                strokeDashoffset: `calc(1 - var(--m-fd-${id}, 1))`,
              }}
            />
            <path
              d="M-4.5 -4 L0 0 L-4.5 4"
              fill="none"
              stroke={WIRE}
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${edge.arrow.x.toFixed(1)} ${edge.arrow.y.toFixed(1)}) rotate(${edge.arrow.angle.toFixed(1)})`}
              style={{ opacity: `calc((var(--m-fd-${id}, 1) - 0.72) * 3.6)` }}
            />
          </g>
        );
      })}

      {layout.chain.map(({ step, edge }) => (
        <g key={step}>
          <path
            d={edge.d}
            fill="none"
            stroke={WIRE}
            strokeWidth={1}
            pathLength={1}
            style={draw(step)}
          />
          {/* A bare chevron rather than a filled triangle: this is a
              schematic, and a solid head at 1px stroke weight reads as a
              blob. */}
          <path
            d="M-4.5 -4 L0 0 L-4.5 4"
            fill="none"
            stroke={WIRE}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={`translate(${edge.arrow.x.toFixed(1)} ${edge.arrow.y.toFixed(1)}) rotate(${edge.arrow.angle.toFixed(1)})`}
            style={arrive(step)}
          />
        </g>
      ))}
    </svg>
  );
}
