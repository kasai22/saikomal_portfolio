import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import {
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  COMPETITIVE_OPPORTUNITIES,
} from "@/features/case-study-clappit/constants/data";

export function CompetitiveAnalysisSection() {
  return (
    <section>
      <SectionHeading
        label="Competitive Analysis"
        title="Where the Market"
        accent="Falls Short"
        sub="Benchmarking 5 direct and adjacent competitors to identify gaps and position ClappIt's UX opportunity."
      />

      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-white/35">
                UX Dimension
              </th>
              {COMPARISON_COLUMNS.map((col) => (
                <th
                  key={col}
                  className={`px-3 py-4 text-center text-xs font-semibold uppercase tracking-widest ${
                    col === "ClappIt" ? "text-[color:var(--accent)]" : "text-white/35"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.dim} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="py-4 pr-6 text-sm text-white/65">{row.dim}</td>
                {row.vals.map((v, i) => (
                  <td
                    key={i}
                    className={`px-3 py-4 text-center text-xs ${
                      i === row.vals.length - 1
                        ? "font-semibold text-[color:var(--accent)]"
                        : "text-white/55"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {COMPETITIVE_OPPORTUNITIES.map((o) => (
          <AccentCard key={o.opp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
              Opportunity Identified
            </span>
            <h4 className="mb-2 mt-2 text-sm font-bold text-white">{o.opp}</h4>
            <p className="text-sm leading-relaxed text-white/60">{o.insight}</p>
          </AccentCard>
        ))}
      </div>
    </section>
  );
}
