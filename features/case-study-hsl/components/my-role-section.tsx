import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { MY_ROLE_SUMMARY, ROLE_ITEMS } from "@/features/case-study-hsl/constants/data";

export function MyRoleSection() {
  return (
    <section>
      <SectionHeading label="My Role" title="What I Actually" accent="Owned" />
      <AccentCard>
        <p className="mb-6 text-[13px] leading-relaxed text-ink/75">{MY_ROLE_SUMMARY}</p>
        <ul className="flex flex-wrap gap-2">
          {ROLE_ITEMS.map((role) => (
            <li
              key={role.label}
              className="rounded-full border border-ink/12 bg-ink/[0.035] px-4 py-2 text-[13px] text-ink/72"
            >
              {role.label}
            </li>
          ))}
        </ul>
      </AccentCard>
    </section>
  );
}
