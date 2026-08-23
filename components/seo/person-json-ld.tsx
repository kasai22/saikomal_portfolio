import { SITE_URL } from "@/constants/site";
import { CONTACT_EMAIL, CONTACT_SOCIALS, RECRUITER_SNAPSHOT } from "@/features/home/constants/data";

/**
 * schema.org Person graph so search engines and AI crawlers can read the
 * resume-level facts (role, skills, employer, profiles) without parsing the
 * page copy. Rendered once from the root layout.
 */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sai Komal",
    alternateName: "Chunduri Sai Komal",
    url: SITE_URL,
    email: `mailto:${CONTACT_EMAIL}`,
    jobTitle: "Product Designer & UX Engineer",
    description:
      "Product Designer and UX Engineer specialising in enterprise dashboards, operational workflows and design-to-code delivery.",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: "Onliest" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "VIT Vellore" },
    knowsAbout: [
      "User Experience Design",
      "Product Design",
      "Design Systems",
      "Information Architecture",
      "Usability Testing",
      "React",
      "Next.js",
      "Figma",
    ],
    seeks: { "@type": "Demand", name: RECRUITER_SNAPSHOT.availability },
    sameAs: CONTACT_SOCIALS.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
