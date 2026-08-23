import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import type { Metric } from "@/features/home/types";

interface MetricRowProps {
  metrics: Metric[];
  /** `accent` tints the figures with the card's `--accent` var. */
  tone?: "accent" | "brand";
  className?: string;
}

/**
 * The outcome of a project, stated as figures rather than a sentence. Used
 * on every project surface so "what happened" is visible before anyone
 * clicks into a case study.
 */
export function MetricRow({ metrics, tone = "accent", className }: MetricRowProps) {
  return (
    <dl className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0">
          <dt className="sr-only">{metric.label}</dt>
          <dd
            className={cn(
              "text-base font-semibold leading-none tracking-[-0.02em] tabular-nums",
              tone === "accent" ? "[color:var(--accent)]" : "text-brand-ink",
            )}
          >
            <CountUp value={metric.value} />
          </dd>
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-ink/60">{metric.label}</p>
        </div>
      ))}
    </dl>
  );
}
