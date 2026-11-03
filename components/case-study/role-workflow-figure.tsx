import { cn } from "@/lib/utils";

const ROLES = ["Admin", "Manager", "Employee"] as const;
const WORKFLOWS = ["Attendance", "Leave", "Onboarding", "Approvals"] as const;
const PATTERNS = ["Exception handling", "Bulk actions", "Audit trails", "Accessible tables & forms"];

interface RoleWorkflowFigureProps {
  /**
   * `compact` fits a card's image slot: the matrix only, no pattern list, so
   * it holds at 160px tall. The full figure leads the project summary page.
   */
  compact?: boolean;
  className?: string;
}

/**
 * The scope of Onliest HR Admin, drawn rather than screenshotted: the three
 * roles, the four workflows designed for them, and the patterns that run
 * across all of it.
 *
 * Only the documented scope is drawn — no per-cell detail is implied beyond
 * "this role has a designed path through this workflow". It stands in for a
 * screenshot until real, shareable screens are available, and it says so.
 *
 * Set in the site's technical-drawing vocabulary — mono annotation, hairline
 * rules, square marks — so it reads as a figure, not as a missing image.
 */
export function RoleWorkflowFigure({ compact = false, className }: RoleWorkflowFigureProps) {
  return (
    <figure
      className={cn(
        "bg-grid flex h-full w-full flex-col justify-center bg-paper-raised",
        compact ? "px-4 py-3" : "p-5 sm:p-8",
        className,
      )}
    >
      <table className="w-full table-fixed border-collapse text-left">
        <caption
          className={cn(
            "t-label text-left text-ink/55",
            compact ? "mb-2" : "mb-4",
          )}
        >
          Scope — 3 roles × 4 workflows
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[24%] pb-1.5">
              <span className="sr-only">Role</span>
            </th>
            {WORKFLOWS.map((w) => (
              <th
                key={w}
                scope="col"
                className={cn(
                  "pb-1.5 text-center font-mono font-medium uppercase leading-tight tracking-[0.06em] text-ink/62",
                  compact ? "text-[8px]" : "text-[9px] sm:text-[10px]",
                )}
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((role) => (
            <tr key={role} className="border-t border-[color:var(--rule)]">
              <th
                scope="row"
                className={cn(
                  "pr-2 font-semibold text-ink",
                  compact ? "py-1.5 text-[11px]" : "py-3 text-[12px]",
                )}
              >
                {role}
              </th>
              {WORKFLOWS.map((w) => (
                <td key={w} className={cn("text-center", compact ? "py-1.5" : "py-3")}>
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 bg-[color:var(--accent,#3D5A80)]"
                  />
                  <span className="sr-only">Designed</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!compact && (
        <>
          <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-[color:var(--rule)] pt-4">
            {PATTERNS.map((p) => (
              <li key={p} className="t-chip">
                {p}
              </li>
            ))}
          </ul>
          <figcaption className="t-label mt-4 text-ink/45">
            Diagram of the project scope — not a product screenshot
          </figcaption>
        </>
      )}
      {compact && <figcaption className="sr-only">Diagram of the project scope</figcaption>}
    </figure>
  );
}
