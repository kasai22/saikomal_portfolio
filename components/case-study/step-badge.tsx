interface StepBadgeProps {
  n: string;
}

export function StepBadge({ n }: StepBadgeProps) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--accent,#008080)] text-xs font-bold text-[color:var(--accent,#008080)]">
      {n}
    </div>
  );
}
