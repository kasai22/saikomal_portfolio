import { SITE_URL } from "@/constants/site";
import { CONTACT, EXPERIENCE, PROFILE, SOCIAL_LINKS, isoYearMonth } from "@/constants/profile";
import { ENGINEERING_PROJECTS, UX_PROJECTS, uxProjectTitle } from "@/constants/projects";

/**
 * schema.org graph so search engines and AI crawlers can read the
 * résumé-level facts — role, skills, employer and its dates, profiles, and
 * the work on this site — without parsing the page copy. Rendered once from
 * the root layout, and built entirely from `constants/profile.ts` and
 * `constants/projects.ts`, so it cannot disagree with the pages.
 */
export function PersonJsonLd() {
  const current = EXPERIENCE.find((role) => role.end === null);

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PROFILE.name,
    alternateName: PROFILE.legalName,
    url: SITE_URL,
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    jobTitle: PROFILE.title,
    description: PROFILE.summary,
    address: { "@type": "PostalAddress", addressLocality: "Visakhapatnam", addressCountry: "IN" },
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    alumniOf: { "@type": "CollegeOrUniversity", name: PROFILE.education.school },
    hasOccupation: EXPERIENCE.map((role) => ({
      "@type": "EmployeeRole",
      roleName: role.role,
      startDate: isoYearMonth(role.start),
      ...(role.end && { endDate: isoYearMonth(role.end) }),
      worksFor: { "@type": "Organization", name: role.company },
    })),
    knowsAbout: [
      "Product Design",
      "UX Engineering",
      "Enterprise UX",
      "AI Product Design",
      "Human-AI Interaction",
      "Design Systems",
      "Information Architecture",
      "Usability Testing",
      "Data-Heavy Interfaces",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "SQL",
      "REST APIs",
      "Figma",
    ],
    sameAs: SOCIAL_LINKS.map((social) => social.href),
  };

  const work = [
    ...UX_PROJECTS.map((project) => ({
      "@type": "CreativeWork",
      name: uxProjectTitle(project),
      url: `${SITE_URL}${project.href}`,
      description: project.seoDescription,
      dateCreated: project.timeline.split("–")[0],
      creator: { "@id": `${SITE_URL}/#person` },
    })),
    ...ENGINEERING_PROJECTS.map((project) => ({
      "@type": "WebSite",
      name: project.name,
      url: project.url,
      description: project.description,
      creator: { "@id": `${SITE_URL}/#person` },
      ...(project.repo && { subjectOf: { "@type": "SoftwareSourceCode", codeRepository: project.repo } }),
    })),
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": [person, ...work] };

  return (
    <script
      type="application/ld+json"
      // `<` is escaped so no string in the graph can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
