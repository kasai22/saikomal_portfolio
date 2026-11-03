import { DownloadIcon } from "@/components/icons";
import { ActionButton } from "@/components/ui/action-button";
import { DrawBox } from "@/components/animations/Reveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { SNAPSHOT_METRICS } from "@/features/home/constants/data";
import { CONTACT } from "@/constants/profile";

/**
 * The thirty-second version, for anyone scanning rather than reading: the
 * six headline numbers, with the résumé one click away.
 *
 * Four are résumé facts — five years across software, data and product
 * design, 4+ of them in UX, and Kudra's two measured outcomes — and two are
 * counts of what is on this page. Nothing else on the site is a figure.
 *
 * It follows the work rather than interrupting the approach to it, so it
 * summarises evidence the reader has just seen instead of asserting it first.
 */
export function RecruiterSnapshot() {
  return (
    <section aria-label="At a glance" className="bg-paper-raised">
      <DrawBox className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-7 lg:flex-row lg:items-center lg:justify-between">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {SNAPSHOT_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse justify-end gap-1.5">
              <dt className="t-meta text-ink/62">{metric.label}</dt>
              <dd className="text-[24px] font-medium leading-none tracking-[-0.03em] tabular-nums text-brand-ink">
                <AnimatedCounter value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
        <ActionButton
          as="a"
          href={CONTACT.resume.href}
          download={CONTACT.resume.fileName}
          data-cursor="open"
          className="shrink-0 self-start lg:self-center"
        >
          Download résumé
          <DownloadIcon className="h-3.5 w-3.5" />
        </ActionButton>
      </DrawBox>
    </section>
  );
}
