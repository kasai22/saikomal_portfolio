import {
  ACTIVITY,
  DETAIL,
  KPIS,
  NAV_ACTIVE,
  ROWS,
  SEGMENTS,
  SEGMENT_ACTIVE,
  STATE_COLOR,
  STATUS_SPLIT,
  TABLE_FOOTER,
  type TripRow,
} from "@/components/product-build/product-build-data";

/**
 * The same product, as it would actually ship on a phone.
 *
 * Not the desktop console scaled down — a nine-column operations table on a
 * 390px viewport is unreadable at any size, and shrinking it would be a worse
 * answer than not showing it. This is the mobile form of the same product:
 * app bar, summary tiles, filter chips, a priority list of trips as cards,
 * the status distribution, an activity feed, and the trip inspector.
 *
 * Static — no scroll assembly below `md`. The section's argument is carried by
 * the stage list above it; this is what gets built.
 */
export function ProductBuildMobile() {
  return (
    <div className="border-ink/14 overflow-hidden border bg-paper-panel">
      {/* App bar */}
      <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2.5">
        <span className="h-4 w-4 shrink-0 bg-brand" aria-hidden="true" />
        <span className="text-[12px] font-semibold leading-none text-ink">{NAV_ACTIVE}</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border border-ink/30" aria-hidden="true" />
          <span className="relative">
            <span
              className="block h-3.5 w-3.5 rounded-[1px] border border-ink/30"
              aria-hidden="true"
            />
            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand text-[6px] font-semibold leading-none text-ink">
              3
            </span>
          </span>
          <span className="h-5 w-5 rounded-full bg-ink/10" aria-hidden="true" />
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-px bg-ink/10">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="bg-paper-panel px-3 py-2.5">
            <p className="font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-ink/40">
              {kpi.label}
            </p>
            <p
              className={`mt-1.5 text-[19px] font-medium leading-none tracking-[-0.03em] ${
                kpi.tone === "risk" ? "text-[#b91c1c]" : "text-ink"
              }`}
            >
              {kpi.value}
            </p>
            <p className="mt-1 truncate text-[9px] leading-none text-ink/45">{kpi.note}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 overflow-hidden border-y border-ink/10 px-3 py-2">
        {SEGMENTS.map((segment, i) => (
          <span
            key={segment}
            className={`shrink-0 border px-2 py-1 text-[9px] leading-none ${
              i === SEGMENT_ACTIVE
                ? "border-brand/40 bg-brand/[0.1] font-medium text-brand-ink"
                : "border-ink/12 text-ink/55"
            }`}
          >
            {segment}
          </span>
        ))}
        <span className="ml-auto shrink-0 text-[9px] leading-none text-ink/45">
          {TABLE_FOOTER.total}
        </span>
      </div>

      {/* Priority list — the table, as cards. */}
      <ul>
        {ROWS.slice(0, 4).map((row) => (
          <TripCard key={row.trip} row={row} />
        ))}
      </ul>

      {/* Analytics */}
      <div className="border-t border-ink/10 px-3 py-3">
        <p className="font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-ink/45">
          Trip status
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {STATUS_SPLIT.map((entry) => (
            <li key={entry.label} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="w-[68px] shrink-0 text-[10px] leading-none text-ink/65">
                {entry.label}
              </span>
              <span className="h-[3px] min-w-0 flex-1 bg-ink/[0.07]" aria-hidden="true">
                <span
                  className="block h-full"
                  style={{
                    width: `${Math.round(entry.share * 100)}%`,
                    backgroundColor: entry.color,
                  }}
                />
              </span>
              <span className="w-[16px] shrink-0 text-right text-[10px] tabular-nums leading-none text-ink/50">
                {entry.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Activity */}
      <div className="border-t border-ink/10 px-3 py-3">
        <p className="font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-ink/45">
          Operations activity
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {ACTIVITY.slice(0, 3).map((entry) => (
            <li key={entry.time} className="flex items-start gap-2">
              <span className="shrink-0 font-mono text-[9px] tabular-nums leading-none text-ink/40">
                {entry.time}
              </span>
              <span className="min-w-0 flex-1 truncate text-[10px] leading-none text-ink/60">
                {entry.event}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detail view */}
      <div className="border-ink/14 border-t bg-paper-raised px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold leading-none text-ink">{DETAIL.trip}</span>
          <span className="border-ink/12 flex items-center gap-1 border px-1.5 py-[2px]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: STATE_COLOR[DETAIL.state] }}
              aria-hidden="true"
            />
            <span className="text-[9px] leading-none text-ink/65">{DETAIL.state}</span>
          </span>
        </div>
        <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
          {DETAIL.fields.map((field) => (
            <div key={field.label} className="min-w-0">
              <dt className="font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-ink/35">
                {field.label}
              </dt>
              <dd className="mt-1 truncate text-[10px] leading-none text-ink/75">{field.value}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-3 inline-block bg-brand px-2.5 py-1.5 text-[10px] font-medium leading-none text-ink">
          {DETAIL.action}
        </span>
      </div>
    </div>
  );
}

function TripCard({ row }: { row: TripRow }) {
  return (
    <li className="flex items-center gap-2.5 border-b border-ink/[0.07] px-3 py-2.5">
      <span
        className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
          row.state === "Scheduled" ? "border border-ink/30" : ""
        }`}
        style={{ backgroundColor: STATE_COLOR[row.state] }}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-medium leading-none text-ink">{row.trip}</span>
          <span className="text-[9px] leading-none text-ink/45">{row.state}</span>
          {row.priority === "High" && (
            <span className="ml-auto shrink-0 bg-[#ef4444]/[0.12] px-1 py-[2px] text-[7px] font-medium uppercase leading-none tracking-[0.06em] text-[#b91c1c]">
              High
            </span>
          )}
        </div>
        <p className="mt-1.5 truncate text-[10px] leading-none text-ink/65">{row.route}</p>
        <p className="mt-1.5 truncate text-[9px] leading-none text-ink/40">
          {row.vehicle} · {row.driver} · ETA {row.eta}
          {row.load !== null && ` · ${row.load}%`}
        </p>
      </div>
    </li>
  );
}
