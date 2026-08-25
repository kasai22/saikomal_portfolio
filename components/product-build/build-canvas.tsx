import type { CSSProperties, ReactNode } from "react";
import {
  ACTIVITY,
  COLUMNS,
  DETAIL,
  FILTERS,
  FLEET_STATUS,
  HOVERED_ROW,
  KPIS,
  NAV_ACTIVE,
  NAV_GROUPS,
  ROWS,
  SEGMENTS,
  SEGMENT_ACTIVE,
  SELECTED_ROW,
  STATE_COLOR,
  STATUS_SPLIT,
  TABLE_FOOTER,
  UTILISATION,
  type TripRow,
} from "@/components/product-build/product-build-data";
import {
  dock,
  drawFrom,
  grow,
  reveal,
  rise,
  slideX,
  wipeX,
  wipeY,
  type LayerId,
} from "@/components/product-build/product-build-timeline";

/**
 * The interface being assembled: an operations console for fleet and trip
 * management, populated end to end.
 *
 * ── How each region arrives ─────────────────────────────────────────────
 * Nothing fades in from nowhere. Every surface is *drawn* from the edge it
 * belongs to — the rail grows down its grid column, the header extends along
 * its alignment, the workspace establishes between them, the analytics column
 * comes inward from the right guide. Contents then arrive into surfaces that
 * already exist: header controls from the right edge they live on, summary
 * cards dividing the workspace left to right, the table filling downward,
 * analytics blocks entering from the table side because that is what they are
 * derived from, and the inspector docking up from beneath the rows.
 *
 * The scale is always on a bare surface — a border and a background with
 * nothing inside it — because scaling a box with content in it renders the
 * content squashed, which is the giveaway that something is being stretched
 * rather than built.
 *
 * ── Accumulation ────────────────────────────────────────────────────────
 * Every layer's resting value is 1, so a region that has arrived stays. The
 * rail is still there when the table fills; the table is still there when the
 * product becomes interactive. Only the grid changes after arriving, and it
 * recedes rather than leaves.
 *
 * ── Static markup, CSS-variable driven ──────────────────────────────────
 * No hooks, no state, no motion components. Every element reads a custom
 * property the stage sets on its root, so roughly two hundred and sixty
 * elements animate off twenty-six property writes a frame, and nothing
 * animates width, height, top or left.
 *
 * ── What is real and what is not ────────────────────────────────────────
 * The information architecture is Kudra's — its modules, its trip state
 * machine, its status colours, its status-first column order. The rows are
 * demonstration values, and the caption under the frame says so.
 */
export function BuildCanvas() {
  return (
    <div className="relative h-[clamp(430px,54svh,520px)] w-full overflow-hidden">
      {/* The canvas. An empty frame drawn from its own left edge. */}
      <div
        className="absolute inset-0 border border-ink/20 bg-paper"
        style={{ ...reveal("canvas"), ...drawFrom("canvas", "left") }}
      />

      {/* The grid and its alignment guides. These are the design canvas: they
          establish early, everything is built onto them, and at the end they
          recede to a quarter weight rather than disappearing — the finished
          interface has to read as constructed *on* the grid. */}
      <div
        className="bg-grid absolute inset-0"
        style={{ opacity: "var(--l-grid, 0.28)", backgroundSize: "4.1666% 7.1428%" }}
      />
      <Guide className="left-[13%]" />
      <Guide className="right-[25%] hidden lg:block" />

      <div className="absolute inset-0 flex gap-2 p-2.5">
        <Rail />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Header />
          <Summary />
          <FilterBar />
          <TableRegion />
        </div>

        <Analytics />
      </div>
    </div>
  );
}

function Guide({ className }: { className: string }) {
  return (
    <div
      className={`absolute inset-y-0 w-px bg-brand/40 ${className}`}
      style={{ opacity: "var(--l-grid, 0.28)", ...drawFrom("grid", "top") }}
    />
  );
}

/**
 * A region of the layout. Its surface is drawn from `edge` on `frame`; its
 * contents are positioned above and arrive on their own layers.
 */
function Panel({
  frame,
  edge,
  className,
  children,
}: {
  frame: LayerId;
  edge: "top" | "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className="border-ink/12 absolute inset-0 border bg-paper-panel"
        style={{ ...reveal(frame), ...drawFrom(frame, edge) } as CSSProperties}
      />
      <div className="relative flex h-full min-h-0 flex-col">{children}</div>
    </div>
  );
}

/** Mono micro-label. The site sets every index and caption in this face. */
function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[8px] uppercase leading-none tracking-[0.1em] ${className ?? "text-ink/45"}`}
    >
      {children}
    </span>
  );
}

function Caret() {
  return (
    <svg width="6" height="4" viewBox="0 0 6 4" className="shrink-0" aria-hidden="true">
      <path d="M0 0h6L3 4z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Structure — the rail grows down its grid column
 * ------------------------------------------------------------------ */

function Rail() {
  return (
    <Panel frame="railFrame" edge="top" className="w-[13%] min-w-[104px] shrink-0">
      <div className="flex h-full flex-col p-2.5" style={wipeY("nav")}>
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 shrink-0 bg-brand" aria-hidden="true" />
          <span className="truncate text-[10px] font-semibold leading-none text-ink">Kudra</span>
        </div>

        <div className="mt-3 flex min-h-0 flex-col gap-2.5 overflow-hidden">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <Label className="text-ink/35">{group.label}</Label>
              <ul className="mt-1.5 flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = item === NAV_ACTIVE;
                  return (
                    <li key={item} className="relative">
                      {/* The selected navigation item — an interaction state,
                          so it lands with the others at the end. */}
                      {active && (
                        <span
                          className="absolute inset-y-0 -left-2.5 right-0 border-l-2 border-brand bg-brand/[0.07]"
                          style={{ ...reveal("states"), ...drawFrom("states", "left") }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative block truncate py-[3px] text-[10px] leading-none ${
                          active ? "font-medium text-brand-ink" : "text-ink/55"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* A live fleet summary — Kudra's four vehicle statuses. It fills the
            foot of the rail, and its dots take their colour with the rest of
            the status layer. */}
        <div className="mt-auto border-t border-ink/10 pt-2">
          <Label className="text-ink/35">Fleet</Label>
          <ul className="mt-1.5 flex flex-col gap-1">
            {FLEET_STATUS.map((entry) => (
              <li key={entry.state} className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color, opacity: "var(--l-status, 1)" }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-[9px] leading-none text-ink/55">
                  {entry.state}
                </span>
                <span className="shrink-0 text-[9px] tabular-nums leading-none text-ink/40">
                  {entry.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 border-t border-ink/10 pt-2">
          <span className="h-5 w-5 shrink-0 rounded-full bg-ink/10" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[9px] leading-none text-ink">Dispatch</p>
            <p className="mt-0.5 truncate text-[7px] leading-none text-ink/45">Operations</p>
          </div>
          <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-[#22c55e]" aria-hidden="true" />
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ *
 * Structure / Design — the header extends, then fills with controls
 * ------------------------------------------------------------------ */

function Header() {
  return (
    <Panel frame="headFrame" edge="left" className="h-[44px] shrink-0">
      <div className="flex h-full items-center gap-3 px-3">
        {/* The title belongs to the header itself, so it arrives with it. */}
        <div className="min-w-0" style={slideX("headFrame", -8)}>
          <Label className="text-ink/35">Operations / Trips</Label>
          <p className="mt-1 truncate text-[13px] font-semibold leading-none text-ink">Trips</p>
        </div>

        {/* Controls arrive later, into a header that already exists, entering
            from the right edge they live on. */}
        <div className="ml-auto flex items-center gap-1.5" style={slideX("controls", 10)}>
          <span className="border-ink/14 flex h-[22px] w-[120px] items-center gap-1.5 border bg-ink/[0.02] px-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full border border-ink/30"
              aria-hidden="true"
            />
            <span className="truncate text-[8px] leading-none text-ink/40">Search trips</span>
          </span>
          <span className="border-ink/14 flex h-[22px] items-center gap-1 border px-1.5 text-[8px] leading-none text-ink/60">
            Today · 12 Mar
            <Caret />
          </span>
          <span className="border-ink/14 relative flex h-[22px] w-[22px] shrink-0 items-center justify-center border">
            <span className="h-2 w-2 rounded-[1px] border border-ink/35" aria-hidden="true" />
            <span
              className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand text-[6px] font-semibold leading-none text-ink"
              style={reveal("states")}
            >
              3
            </span>
          </span>
          <span className="h-[22px] w-[22px] shrink-0 rounded-full bg-ink/10" aria-hidden="true" />
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ *
 * Design — cards divide the workspace, then the figures land in them
 * ------------------------------------------------------------------ */

function Summary() {
  return (
    // The wipe is the division: the cards do not appear, the workspace is cut
    // into four across, left to right.
    <div className="grid shrink-0 grid-cols-4 gap-2" style={wipeX("kpi")}>
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className="border-ink/12 border bg-paper-panel px-2.5 py-2"
          style={rise("kpi", 8)}
        >
          <Label className="text-ink/40">{kpi.label}</Label>
          <div className="mt-1.5 flex items-baseline gap-1" style={rise("data", 6)}>
            <span
              className={`text-[20px] font-medium leading-none tracking-[-0.03em] ${
                kpi.tone === "risk" ? "text-[#b91c1c]" : "text-ink"
              }`}
            >
              {kpi.value}
            </span>
            {kpi.trend && <Trend direction={kpi.trend} tone={kpi.tone} />}
          </div>
          <p className="mt-1.5 truncate text-[8px] leading-none text-ink/45" style={reveal("data")}>
            {kpi.note}
          </p>
          <span className="mt-2 block h-[2px] w-full bg-ink/[0.07]" aria-hidden="true">
            <span
              className={`block h-full ${kpi.tone === "risk" ? "bg-[#ef4444]" : "bg-brand"}`}
              style={{ width: `${Math.round(kpi.fill * 100)}%`, ...grow("data", "x") }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function Trend({ direction, tone }: { direction: "up" | "down"; tone?: string }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      className={tone === "risk" ? "text-[#ef4444]" : "text-[#22c55e]"}
      aria-hidden="true"
    >
      <path d={direction === "up" ? "M3.5 0 7 5H0z" : "M3.5 7 0 2h7z"} fill="currentColor" />
    </svg>
  );
}

function FilterBar() {
  return (
    <div className="flex shrink-0 items-center gap-1.5" style={wipeX("filters")}>
      <span className="border-ink/14 flex h-[24px] w-[110px] shrink-0 items-center gap-1.5 border bg-paper-panel px-1.5">
        <span className="h-2 w-2 shrink-0 rounded-full border border-ink/30" aria-hidden="true" />
        <span className="truncate text-[8px] leading-none text-ink/40">Search trips</span>
      </span>

      <span className="border-ink/14 flex h-[24px] shrink-0 items-center border bg-paper-panel">
        {SEGMENTS.map((segment, i) => (
          <span
            key={segment}
            className={`relative px-2 text-[8px] leading-none ${
              i === SEGMENT_ACTIVE ? "font-medium text-brand-ink" : "text-ink/50"
            } ${i > 0 ? "border-l border-ink/10" : ""}`}
          >
            {i === SEGMENT_ACTIVE && (
              <span className="absolute inset-0 bg-brand/[0.1]" style={reveal("states")} />
            )}
            <span className="relative">{segment}</span>
          </span>
        ))}
      </span>

      {FILTERS.map((filter) => (
        <span
          key={filter}
          className="border-ink/14 flex h-[24px] shrink-0 items-center gap-1 border bg-paper-panel px-1.5 text-[8px] leading-none text-ink/55"
        >
          {filter}
          <Caret />
        </span>
      ))}

      <span className="ml-auto shrink-0 text-[8px] leading-none text-ink/45">
        {TABLE_FOOTER.total} trips
      </span>
      <span className="shrink-0 text-[8px] leading-none text-brand-ink">Reset</span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Design / System / Product — the table, its statuses, and the inspector
 * ------------------------------------------------------------------ */

function TableRegion() {
  return (
    <Panel frame="workFrame" edge="top" className="min-h-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col" style={wipeY("table")}>
        <div className="flex shrink-0 items-center border-b border-ink/10 px-2.5 py-1.5">
          {COLUMNS.map((column) => (
            <span key={column.key} className={`${column.width} pr-1`}>
              <Label className="text-ink/40">{column.label}</Label>
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          {ROWS.map((row, index) => (
            <Row key={row.trip} row={row} index={index} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-ink/10 px-2.5 py-1.5">
          <span className="text-[8px] leading-none text-ink/45">
            Showing {TABLE_FOOTER.showing} of {TABLE_FOOTER.total}
          </span>
          <span className="ml-auto flex items-center gap-1">
            {["‹", "1", "2", "3", "›"].map((page, i) => (
              <span
                key={i}
                className={`flex h-[15px] w-[15px] items-center justify-center border text-[7px] leading-none ${
                  i === 1
                    ? "border-brand/40 bg-brand/[0.1] text-brand-ink"
                    : "border-ink/12 text-ink/45"
                }`}
              >
                {page}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* The inspector. Docks up from beneath the rows once one is selected —
          the moment the drawing stops being a system and starts being a
          product with somewhere to go next. Its own contents then land in
          order: identity, then fields, then the lifecycle, then the action. */}
      <div
        className="border-ink/14 absolute inset-x-0 bottom-0 border-t bg-paper-raised px-2.5 py-2 shadow-[0_-1px_0_rgba(20,20,15,0.05)]"
        style={dock("detail")}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold leading-none text-ink">{DETAIL.trip}</span>
          <StateChip state={DETAIL.state} />
          <span className="ml-auto text-[8px] leading-none text-ink/35">Esc to close</span>
        </div>

        <div className="mt-2 flex items-start gap-3">
          <dl className="flex min-w-0 flex-1 gap-3" style={wipeX("detail")}>
            {DETAIL.fields.map((field) => (
              <div key={field.label} className="min-w-0">
                <dt>
                  <Label className="text-ink/35">{field.label}</Label>
                </dt>
                <dd className="mt-1 truncate text-[9px] leading-none text-ink/75">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hidden shrink-0 items-center gap-1 xl:flex" style={wipeX("states")}>
            {DETAIL.timeline.map((step, i) => (
              <span key={step.label} className="flex items-center gap-1">
                {i > 0 && <span className="h-px w-3 bg-ink/15" aria-hidden="true" />}
                <span
                  className={`h-1.5 w-1.5 rounded-full ${step.done ? "bg-brand" : "border border-ink/25"}`}
                  aria-hidden="true"
                />
                <span
                  className={`text-[7px] leading-none ${step.done ? "text-ink/65" : "text-ink/35"}`}
                >
                  {step.label}
                </span>
              </span>
            ))}
          </div>

          {/* The last thing to arrive in the whole sequence. */}
          <span
            className="shrink-0 bg-brand px-2 py-1 text-[8px] font-medium leading-none text-ink"
            style={rise("settle", 6)}
          >
            {DETAIL.action}
          </span>
        </div>
      </div>
    </Panel>
  );
}

function Row({ row, index }: { row: TripRow; index: number }) {
  const selected = index === SELECTED_ROW;
  const hovered = index === HOVERED_ROW;

  return (
    <div className="relative flex items-center border-b border-ink/[0.06] px-2.5 py-[7px]">
      {/* Selection lands first and the pointer state follows, so the product
          reads as being driven rather than as switching on all at once. */}
      {selected && (
        <span
          className="absolute inset-y-0 -left-px right-0 border-l-2 border-brand bg-brand/[0.06]"
          style={{ ...reveal("select"), ...drawFrom("select", "left") }}
        />
      )}
      {hovered && <span className="absolute inset-0 bg-ink/[0.03]" style={reveal("states")} />}

      <span className={`${COLUMNS[0]!.width} relative flex items-center gap-1 pr-1`}>
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            row.state === "Scheduled" ? "border border-ink/30" : ""
          }`}
          style={{ backgroundColor: STATE_COLOR[row.state], opacity: "var(--l-status, 1)" }}
          aria-hidden="true"
        />
        <span className="truncate text-[9px] leading-none text-ink/70">{row.state}</span>
      </span>

      <span
        className={`${COLUMNS[1]!.width} relative truncate pr-1 text-[9px] leading-none text-ink`}
      >
        {row.trip}
      </span>
      <Cell width={COLUMNS[2]!.width}>{row.vehicle}</Cell>
      <Cell width={COLUMNS[3]!.width}>{row.driver}</Cell>
      <Cell width={COLUMNS[4]!.width}>{row.route}</Cell>
      <Cell width={COLUMNS[5]!.width}>{row.departure}</Cell>
      <Cell width={COLUMNS[6]!.width}>{row.eta}</Cell>

      <span className={`${COLUMNS[7]!.width} relative pr-1`}>
        {row.load === null ? (
          <span className="text-[9px] leading-none text-ink/25">—</span>
        ) : (
          <span className="flex items-center gap-1">
            <span className="h-[3px] w-full max-w-[22px] bg-ink/[0.08]" aria-hidden="true">
              <span
                className="block h-full bg-ink/30"
                style={{ width: `${row.load}%`, ...grow("status", "x") }}
              />
            </span>
            <span className="text-[8px] leading-none text-ink/50">{row.load}%</span>
          </span>
        )}
      </span>

      <span className={`${COLUMNS[8]!.width} relative pr-1`}>
        <span
          className={`inline-block truncate px-1 py-[2px] text-[7px] font-medium uppercase leading-none tracking-[0.06em] ${
            row.priority === "High"
              ? "bg-[#ef4444]/[0.12] text-[#b91c1c]"
              : row.priority === "Med"
                ? "bg-ink/[0.06] text-ink/60"
                : "text-ink/35"
          }`}
          style={reveal("status")}
        >
          {row.priority}
        </span>
      </span>
    </div>
  );
}

function Cell({ width, children }: { width: string; children: ReactNode }) {
  return (
    <span className={`${width} relative truncate pr-1 text-[9px] leading-none text-ink/65`}>
      {children}
    </span>
  );
}

function StateChip({ state }: { state: TripRow["state"] }) {
  return (
    <span className="border-ink/12 flex items-center gap-1 border px-1.5 py-[2px]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${state === "Scheduled" ? "border border-ink/30" : ""}`}
        style={{ backgroundColor: STATE_COLOR[state] }}
        aria-hidden="true"
      />
      <span className="text-[8px] leading-none text-ink/65">{state}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * System — analytics derived from the table beside it
 * ------------------------------------------------------------------ */

/**
 * Every block enters from the left, which is where the table is. Combined
 * with the order — the table's own statuses take their colour first, and only
 * then does the distribution of those statuses appear — the panel reads as
 * something the data produced rather than three charts that showed up.
 */
function Analytics() {
  return (
    <Panel
      frame="workFrame"
      edge="right"
      className="hidden w-[25%] min-w-[200px] shrink-0 lg:block"
    >
      <div className="flex h-full flex-col gap-3 p-2.5">
        <div className="flex min-h-0 flex-[1.1] flex-col" style={slideX("chart", -10)}>
          <div className="flex shrink-0 items-baseline justify-between">
            <Label>Fleet utilisation</Label>
            <span className="text-[10px] font-medium leading-none text-ink">81%</span>
          </div>
          <div className="mt-2 flex min-h-[46px] flex-1 items-end gap-[3px]">
            {UTILISATION.map((height, i) => (
              <span
                key={i}
                className={`flex-1 ${i === UTILISATION.length - 1 ? "bg-brand" : "bg-ink/15"}`}
                style={{ height: `${height}%`, ...grow("chart", "y") }}
              />
            ))}
          </div>
          <div className="mt-1 flex shrink-0 justify-between">
            <span className="text-[7px] leading-none text-ink/35">12 days ago</span>
            <span className="text-[7px] leading-none text-ink/35">Today</span>
          </div>
        </div>

        <div className="shrink-0 border-t border-ink/10 pt-2.5" style={slideX("split", -10)}>
          <Label>Trip status</Label>
          <ul className="mt-2 flex flex-col gap-1.5">
            {STATUS_SPLIT.map((entry) => (
              <li key={entry.label} className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
                <span className="w-[58px] shrink-0 truncate text-[8px] leading-none text-ink/60">
                  {entry.label}
                </span>
                <span className="h-[3px] min-w-0 flex-1 bg-ink/[0.07]" aria-hidden="true">
                  <span
                    className="block h-full"
                    style={{
                      width: `${Math.round(entry.share * 100)}%`,
                      backgroundColor: entry.color,
                      ...grow("split", "x"),
                    }}
                  />
                </span>
                <span className="w-[14px] shrink-0 text-right text-[8px] tabular-nums leading-none text-ink/50">
                  {entry.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col border-t border-ink/10 pt-2.5"
          style={slideX("feed", -10)}
        >
          <Label>Operations activity</Label>
          <ul
            className="mt-2 flex min-h-0 flex-col gap-[7px] overflow-hidden"
            style={wipeY("feed")}
          >
            {ACTIVITY.map((entry) => (
              <li key={entry.time} className="flex shrink-0 items-start gap-1.5">
                <span className="mt-[1px] shrink-0 font-mono text-[7px] tabular-nums leading-none text-ink/40">
                  {entry.time}
                </span>
                <span
                  className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-ink/20"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-[8px] leading-none text-ink/60">
                  {entry.event}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
