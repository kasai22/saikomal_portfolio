import { DownloadIcon } from "@/components/icons";
import { GlassButton } from "@/components/ui/glass-button";
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

export function RecruiterSnapshot() {
  return (
    <section aria-label="Recruiter snapshot" className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <dl className="grid flex-1 grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
          {ROWS.map((row) => (
            <div key={row.label}>
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm text-white/90">{row.value}</dd>
            </div>
          ))}
        </dl>
        <GlassButton
          as="a"
          href="/SaiKomal_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="SaiKomal_Resume.pdf"
          className="shrink-0"
        >
          Download resume
          <DownloadIcon className="h-4 w-4" />
        </GlassButton>
      </div>
    </section>
  );
}
