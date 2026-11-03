import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackToPortfolioLink } from "@/components/case-study/back-to-portfolio-link";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { cssVars } from "@/lib/css-vars";
import {
  ENGINEERING_PROJECTS,
  getEngineeringProject,
  type EngineeringProject,
} from "@/constants/projects";

/**
 * The engineering evidence page — one per independent project.
 *
 * Organised around the split a hiring team actually asks about: what was
 * designed, what was implemented, what was integrated, and where AI helped.
 * Every claim comes from `ENGINEERING_PROJECTS`, which is itself sourced
 * from each project's repository and its live deployment. Sections with no
 * documented evidence are left out rather than filled in.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ENGINEERING_PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getEngineeringProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Engineering`,
    description: `${project.description} Stack: ${project.stack.slice(0, 4).join(", ")}.`,
    alternates: { canonical: project.href },
  };
}


const OWNERSHIP_COLUMNS: { key: keyof EngineeringProject["ownership"]; title: string }[] = [
  { key: "designed", title: "What I designed" },
  { key: "implemented", title: "What I implemented" },
  { key: "integrated", title: "What I integrated" },
  { key: "aiAssisted", title: "Where AI assisted" },
];

const EXTERNAL_LINK =
  "inline-flex items-center gap-1.5 rounded-sm border border-ink/15 bg-paper-panel px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-instant hover:border-[color:var(--accent)]";

export default async function EngineeringProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getEngineeringProject(slug);
  if (!project) notFound();

  const columns = OWNERSHIP_COLUMNS.filter((c) => project.ownership[c.key]?.length);
  const accentVars = cssVars({
    "--accent": project.accent,
    "--accent-subtle": `${project.accent}14`,
    "--accent-border": `${project.accent}47`,
  });

  return (
    <div style={accentVars} className="min-h-screen bg-paper text-ink">
      <section className="pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-20">
          <BackToPortfolioLink />
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
            {project.category.replace(" | ", " · ")}
          </p>
          <h1 className="t-display mb-4 mt-4 text-ink">{project.name}</h1>
          <p className="max-w-2xl text-[16px] leading-relaxed text-ink/70">{project.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={EXTERNAL_LINK}>
              Visit {project.urlDisplay} <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={EXTERNAL_LINK}>
                Source on GitHub <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          <div className="mt-10 overflow-hidden rounded-sm border border-ink/12 bg-paper-panel">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-6 pb-16">
        <section>
          <SectionHeading label="Objective" title="The product" accent="objective" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <SurfaceCard>
              <p className="text-[15px] leading-relaxed text-ink/75">{project.objective}</p>
            </SurfaceCard>
            <SurfaceCard>
              <dl className="space-y-4 text-[13px]">
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-ink/55">Role</dt>
                  <dd className="mt-1 font-medium text-ink">
                    Independent project — product, design, front-end and integration
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-ink/55">Timeline</dt>
                  <dd className="mt-1 text-ink/75">Independent Project</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-ink/55">Deployment</dt>
                  <dd className="mt-1 text-ink/75">{project.deployment}</dd>
                </div>
              </dl>
            </SurfaceCard>
          </div>
        </section>

        <section>
          <SectionHeading label="Stack" title="Technology" accent="stack" />
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="t-chip bg-paper-panel text-ink/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading
            label="Ownership"
            title="Designed, implemented,"
            accent="integrated"
            sub="What I did on each side of the project — kept separate, because they are different kinds of work. AI tools accelerated implementation; understanding the code, reviewing the output, integrating it and validating it stayed with me."
          />
          <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${columns.length > 3 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
            {columns.map((column) => (
              <SurfaceCard key={column.key} className="p-5 md:p-6">
                <h3 className="mb-4 text-[14px] font-semibold text-ink">{column.title}</h3>
                <BulletList items={project.ownership[column.key] ?? []} />
              </SurfaceCard>
            ))}
          </div>
        </section>

        {project.challenges.length > 0 && (
          <section>
            <SectionHeading label="Problem solving" title="Challenges and" accent="decisions" />
            <ol className="space-y-4">
              {project.challenges.map((c, i) => (
                <li key={c.problem}>
                  <SurfaceCard className="grid grid-cols-1 gap-4 md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
                    <span className="font-mono text-[12px] text-ink/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-widest text-ink/55">Challenge</p>
                      <p className="text-[14px] leading-relaxed text-ink">{c.problem}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                        Approach
                      </p>
                      <p className="text-[14px] leading-relaxed text-ink/75">{c.approach}</p>
                    </div>
                  </SurfaceCard>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.validation && (
          <section>
            <SectionHeading label="Validation" title="How it is" accent="verified" />
            <SurfaceCard>
              <BulletList items={project.validation} />
            </SurfaceCard>
          </section>
        )}

        {project.excerpt && project.repo && (
          <section>
            <SectionHeading
              label="Code"
              title="From the"
              accent="repository"
              sub={project.excerpt.caption}
            />
            <figure className="overflow-hidden rounded-sm border border-ink/12 bg-[#14140F]">
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3 font-mono text-[12px] text-white/70">
                <span>{project.excerpt.path}</span>
                <a
                  href={`${project.repo}/blob/HEAD/${project.excerpt.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  View on GitHub <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
              <pre className="overflow-x-auto p-5 text-[12.5px] leading-relaxed text-[#E8E6DD]">
                <code>{project.excerpt.code}</code>
              </pre>
            </figure>
          </section>
        )}

        {project.limits && (
          <section>
            <SectionHeading label="Honest limits" title="Not built" accent="yet" />
            <SurfaceCard>
              <BulletList items={project.limits} />
            </SurfaceCard>
          </section>
        )}

        <CaseStudyCta tagline="Let's build the next one together." />
      </div>
    </div>
  );
}
