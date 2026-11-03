import type { ReactNode } from "react";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { BulletList } from "@/components/case-study/bullet-list";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { cssVars } from "@/lib/css-vars";
import type { UxProject } from "@/constants/projects";

export interface SummarySection {
  label: string;
  title: string;
  accent: string;
  sub?: string;
  /** Plain points. */
  points?: string[];
  /** Or term-and-definition pairs, rendered as a grid of cards. */
  items?: { term: string; detail: string }[];
}

interface ProjectSummaryPageProps {
  project: UxProject;
  /** The opening paragraph — what the project was, from the record. */
  overview: string;
  /** The image or diagram that leads the page. */
  visual: ReactNode;
  sections: SummarySection[];
  ctaTagline: string;
}

/**
 * A project summary — the shorter sibling of the long-form case studies.
 *
 * Used for projects where the documented record is a résumé entry and the
 * available artefacts, rather than a full research write-up. Built from the
 * same shared case-study pieces (section heading, surface and accent cards,
 * bullet list, CTA) and the same paper-and-accent treatment, so it reads as
 * part of the same archive — just shorter, and honest about being shorter.
 */
export function ProjectSummaryPage({
  project,
  overview,
  visual,
  sections,
  ctaTagline,
}: ProjectSummaryPageProps) {
  const accentVars = cssVars({
    "--accent": project.accent,
    "--accent-subtle": `${project.accent}1A`,
    "--accent-border": `${project.accent}4D`,
  });

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    ...(project.context ? [{ label: "Context", value: project.context }] : []),
    { label: "Format", value: "Project summary" },
  ];

  return (
    <div style={accentVars} className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden pt-20">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-20">
          <BackToPortfolioLink />
          <p>
            <span className="inline-block rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
              {project.subtitle}
            </span>
          </p>
          <h1 className="t-display mb-4 mt-5 text-ink">{project.name}</h1>
          <p className="max-w-2xl text-[16px] leading-relaxed text-ink/70">{overview}</p>

          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div
                key={m.label}
                className="rounded-sm border border-[color:var(--panel-1-border)] bg-[var(--panel-1-bg)] px-4 py-3"
              >
                <dt className="mb-1 text-[11px] uppercase tracking-widest text-ink/60">{m.label}</dt>
                <dd className="text-[13px] font-semibold text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 overflow-hidden rounded-sm border border-ink/12 bg-paper-panel">{visual}</div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-16">
        {sections.map((section) => (
          <section key={section.label}>
            <SectionHeading
              label={section.label}
              title={section.title}
              accent={section.accent}
              sub={section.sub}
            />
            {section.points && (
              <SurfaceCard>
                <BulletList items={section.points} />
              </SurfaceCard>
            )}
            {section.items && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <SurfaceCard key={item.term} className="p-5 md:p-6">
                    <h3 className="mb-2 text-[14px] font-semibold text-ink">{item.term}</h3>
                    <p className="text-[13px] leading-relaxed text-ink/70">{item.detail}</p>
                  </SurfaceCard>
                ))}
              </div>
            )}
          </section>
        ))}

        <section>
          <SectionHeading label="Focus" title="What this project" accent="demonstrates" />
          <AccentCard>
            <ul className="flex flex-wrap gap-2">
              {project.focus.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-[color:var(--accent-border)] bg-paper-panel px-3 py-1.5 text-[13px] text-ink/80"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-ink/65">
              This is a summary rather than a full case study. A walkthrough of the work is
              available on request.
            </p>
          </AccentCard>
        </section>

        <CaseStudyCta tagline={ctaTagline} />
      </div>
    </div>
  );
}
