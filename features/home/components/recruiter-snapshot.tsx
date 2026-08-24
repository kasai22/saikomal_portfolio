import { DownloadIcon } from "@/components/icons";
import { ActionButton } from "@/components/ui/action-button";
import { DrawBox } from "@/components/animations/Reveal";
import { RECRUITER_SNAPSHOT } from "@/features/home/constants/data";

const ROWS: { label: string; value: string }[] = [
  { label: "Experience", value: RECRUITER_SNAPSHOT.experience },
  { label: "Focus", value: RECRUITER_SNAPSHOT.focus },
  { label: "Industries", value: RECRUITER_SNAPSHOT.industries.join(" · ") },
  { label: "Front-end", value: RECRUITER_SNAPSHOT.frontEnd },
  { label: "Design", value: RECRUITER_SNAPSHOT.design },
  { label: "AI workflow", value: RECRUITER_SNAPSHOT.ai },
  { label: "Location", value: RECRUITER_SNAPSHOT.location },
  { label: "Availability", value: RECRUITER_SNAPSHOT.availability },
];

/**
 * The thirty-second version, for anyone scanning rather than reading — a
 * flat definition list of the facts a recruiter checks first, with the
 * resume one click away.
 */
export function RecruiterSnapshot() {
  return (
    <section aria-label="Recruiter snapshot" className="bg-paper-raised">
      <DrawBox className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-4">
          {ROWS.map((row) => (
            <div key={row.label}>
              <dt className="t-eyebrow text-ink/60">{row.label}</dt>
              <dd className="t-meta mt-1 text-ink/85">{row.value}</dd>
            </div>
          ))}
        </dl>
        <ActionButton
          as="a"
          href="/SaiKomal_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="SaiKomal_Resume.pdf"
          className="shrink-0"
        >
          Resume
          <DownloadIcon className="h-3.5 w-3.5" />
        </ActionButton>
      </DrawBox>
    </section>
  );
}
