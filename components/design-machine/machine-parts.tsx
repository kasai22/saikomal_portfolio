import type { StationId } from "@/components/design-machine/design-machine-timeline";

/**
 * The apparatus. Six parts, each drawn as the mechanism it is named after.
 *
 * ── What these are and are not ──────────────────────────────────────────
 * Every one is a piece of *equipment*, not a piece of a factory. There is no
 * conveyor belt, no cog, no chimney and no robot arm. The vocabulary is the
 * one an engineering drawing uses for the same ideas — an intake that
 * narrows, a stack of screens with a mesh that gets finer, a press with two
 * plates, an assembly of layers, a gauge with a needle, an aperture. Each is a
 * plausible mechanical answer to what its step actually does, which is the
 * whole conceit: the method already *is* a machine, and this is what it would
 * look like if somebody built it.
 *
 * ── Why they are one file of static SVG ─────────────────────────────────
 * Six drawings, no state, no props beyond an id, no motion of their own — the
 * camera moves past them and their strength is set by a custom property on an
 * ancestor. That makes this a server component and keeps roughly sixty paths
 * out of the client bundle and off the animation path entirely.
 *
 * All six are drawn on the same 100 x 100 grid, in hairlines, so they sit at a
 * consistent weight down the length of the machine however the stage scales.
 */

const WIRE = "rgba(20,20,15,0.34)";
const FAINT = "rgba(20,20,15,0.16)";
const ACCENT = "#C9871F";

interface PartProps {
  id: StationId;
  size: number;
}

export function MachinePart({ id, size }: PartProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      {PARTS[id]}
    </svg>
  );
}

/**
 * The accent inside each part is driven by that station's own focus property,
 * so the mechanism the camera is standing in front of is the one that reads as
 * running. Nothing moves — a machine's parts are where they are.
 */
const live = (id: StationId) => ({ opacity: `var(--dm-s-${id}, 1)` });

const PARTS: Record<StationId, React.ReactNode> = {
  /* An intake. Wide mouth, narrowing throat, material dropping in. */
  input: (
    <>
      <path d="M12 16h76L58 54v30H42V54Z" stroke={WIRE} strokeWidth="1.4" />
      <path d="M20 16 50 48 80 16" stroke={FAINT} strokeWidth="1" />
      <g style={live("input")}>
        <circle cx="34" cy="8" r="2.4" fill={ACCENT} />
        <circle cx="50" cy="4" r="2.4" fill={ACCENT} />
        <circle cx="66" cy="9" r="2.4" fill={ACCENT} />
        <path d="M42 68h16" stroke={ACCENT} strokeWidth="1.4" />
      </g>
    </>
  ),

  /* Three screens, each finer than the last. Some of it does not get through. */
  filter: (
    <>
      <path d="M14 12v76M86 12v76" stroke={WIRE} strokeWidth="1.4" />
      <path d="M14 30h72M14 52h72M14 74h72" stroke={WIRE} strokeWidth="1.2" />
      <path d="M26 30v-6M42 30v-6M58 30v-6M74 30v-6" stroke={FAINT} strokeWidth="1" />
      <path d="M30 52v-8M46 52v-8M62 52v-8" stroke={FAINT} strokeWidth="1" />
      <g style={live("filter")}>
        <path d="M50 74v18" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="50" cy="96" r="2.6" fill={ACCENT} />
        {/* Caught on the way down — the part of the brief that is out of scope. */}
        <circle cx="24" cy="41" r="2.2" fill={ACCENT} opacity="0.4" />
        <circle cx="72" cy="41" r="2.2" fill={ACCENT} opacity="0.4" />
      </g>
    </>
  ),

  /* A press. Two plates closing on a blank, leaving a grid in it. */
  form: (
    <>
      <path d="M10 14h80v12H10zM10 74h80v12H10z" stroke={WIRE} strokeWidth="1.4" />
      <path
        d="M28 26v10M50 26v10M72 26v10M28 64v10M50 64v10M72 64v10"
        stroke={FAINT}
        strokeWidth="1"
      />
      <rect x="26" y="38" width="48" height="24" stroke={WIRE} strokeWidth="1.2" />
      <g style={live("form")}>
        <path d="M26 46h48M42 38v24M58 38v24" stroke={ACCENT} strokeWidth="1.1" />
      </g>
    </>
  ),

  /* An assembly. Layers seated one on the next into a single block. */
  construct: (
    <>
      <path d="M22 78h56v10H22z" stroke={WIRE} strokeWidth="1.4" />
      <path d="M26 62h48v14H26z" stroke={WIRE} strokeWidth="1.2" />
      <path d="M30 46h40v14H30z" stroke={WIRE} strokeWidth="1.2" />
      <g style={live("construct")}>
        <path d="M34 30h32v14H34z" stroke={ACCENT} strokeWidth="1.3" />
        <path d="M50 10v16M44 20l6 6 6-6" stroke={ACCENT} strokeWidth="1.2" />
      </g>
    </>
  ),

  /* A gauge. Scale, needle, and a datum it is being read against. */
  test: (
    <>
      <path d="M14 68a36 36 0 0 1 72 0" stroke={WIRE} strokeWidth="1.4" />
      <path
        d="M18 58l-6-3M30 42l-5-5M50 34v-7M70 42l5-5M82 58l6-3"
        stroke={FAINT}
        strokeWidth="1"
      />
      <path d="M14 78h72" stroke={WIRE} strokeWidth="1.2" />
      <g style={live("test")}>
        <path d="M50 68 68 48" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="50" cy="68" r="3" fill={ACCENT} />
        <path d="M38 90l7 7 15-16" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </>
  ),

  /* An aperture. The frame the finished thing is handed through. */
  output: (
    <>
      <path d="M10 22h80v56H10z" stroke={WIRE} strokeWidth="1.4" />
      <path d="M10 22 26 38v24L10 78M90 22 74 38v24l16 16" stroke={FAINT} strokeWidth="1" />
      <g style={live("output")}>
        <path d="M26 38h48v24H26z" stroke={ACCENT} strokeWidth="1.3" />
        <path d="M26 46h48" stroke={ACCENT} strokeWidth="1" />
      </g>
    </>
  ),
};

/* ------------------------------------------------------------------ *
 * The workpiece
 * ------------------------------------------------------------------ */

/**
 * The one thing in the figure that changes shape.
 *
 * Six forms, one per station, drawn on the same 60 x 60 grid and crossfaded by
 * `--dm-f-N` as each station passes the focus mark. It goes in as a scatter of
 * unrelated marks and comes out as a screen: loose → gathered → structured →
 * formed → built → checked.
 *
 * They are stacked rather than swapped, because replacing DOM mid-scroll is
 * how a smooth scrub turns into a stutter. Six small groups, one opacity each.
 */
export function Workpiece({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {FORMS.map((form, index) => (
        <g key={index} style={{ opacity: `var(--dm-f-${index}, ${index === 5 ? 1 : 0})` }}>
          {form}
        </g>
      ))}
    </svg>
  );
}

const FORMS: React.ReactNode[] = [
  /* 0 · loose — nothing relates to anything. */
  <>
    <circle cx="12" cy="18" r="2.4" fill={ACCENT} />
    <circle cx="44" cy="11" r="2.4" fill={ACCENT} />
    <circle cx="27" cy="38" r="2.4" fill={ACCENT} />
    <circle cx="49" cy="44" r="2.4" fill={ACCENT} />
    <circle cx="16" cy="49" r="2.4" fill={ACCENT} />
  </>,
  /* 1 · gathered — the same marks, brought into line. */
  <>
    <circle cx="18" cy="22" r="2.4" fill={ACCENT} />
    <circle cx="30" cy="22" r="2.4" fill={ACCENT} />
    <circle cx="42" cy="22" r="2.4" fill={ACCENT} />
    <circle cx="24" cy="36" r="2.4" fill={ACCENT} />
    <circle cx="36" cy="36" r="2.4" fill={ACCENT} />
  </>,
  /* 2 · structured — a frame, not yet a screen. */
  <>
    <rect x="12" y="14" width="36" height="32" stroke={ACCENT} strokeWidth="1.4" />
    <path d="M12 24h36M24 24v22" stroke={ACCENT} strokeWidth="1.1" />
  </>,
  /* 3 · formed — the frame given a layout. */
  <>
    <rect x="12" y="14" width="36" height="32" stroke={ACCENT} strokeWidth="1.4" />
    <path d="M12 22h36M22 22v24" stroke={ACCENT} strokeWidth="1.1" />
    <path d="M26 28h18M26 33h18M26 38h11" stroke={ACCENT} strokeWidth="1" opacity="0.7" />
  </>,
  /* 4 · built — filled in, running. */
  <>
    <rect x="12" y="14" width="36" height="32" stroke={ACCENT} strokeWidth="1.4" />
    <path d="M12 22h36M22 22v24" stroke={ACCENT} strokeWidth="1.1" />
    <rect x="14" y="16" width="32" height="4" fill={ACCENT} opacity="0.45" />
    <rect x="26" y="26" width="18" height="3" fill={ACCENT} opacity="0.6" />
    <rect x="26" y="32" width="18" height="3" fill={ACCENT} opacity="0.6" />
    <rect x="26" y="38" width="11" height="3" fill={ACCENT} opacity="0.6" />
  </>,
  /* 5 · checked — and signed off. */
  <>
    <rect x="12" y="14" width="36" height="32" stroke={ACCENT} strokeWidth="1.4" />
    <path d="M12 22h36M22 22v24" stroke={ACCENT} strokeWidth="1.1" />
    <rect x="14" y="16" width="32" height="4" fill={ACCENT} opacity="0.45" />
    <rect x="26" y="26" width="18" height="3" fill={ACCENT} opacity="0.6" />
    <rect x="26" y="32" width="18" height="3" fill={ACCENT} opacity="0.6" />
    <path d="M34 44l5 5 11-12" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
  </>,
];
