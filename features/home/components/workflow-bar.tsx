import type { WorkflowMetric } from "@/features/home/types";

interface WorkflowBarProps {
  metric: WorkflowMetric;
}

export function WorkflowBar({ metric }: WorkflowBarProps) {
  return (
    <div className="flex min-w-[160px] flex-1 items-center gap-3">
      <span className="shrink-0 whitespace-nowrap text-xs text-white/50">{metric.label}</span>
      <div
        role="progressbar"
        aria-label={metric.label}
        aria-valuenow={metric.pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${metric.pct}%`,
            background: "linear-gradient(90deg, #008080, #00b3b3)",
          }}
        />
      </div>
      <span className="text-xs tabular-nums text-brand">{metric.pct}%</span>
    </div>
  );
}
