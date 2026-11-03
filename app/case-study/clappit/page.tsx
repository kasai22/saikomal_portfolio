import type { Metadata } from "next";
import Image from "next/image";
import { getUxProject, uxProjectTitle } from "@/constants/projects";
import { ProjectSummaryPage } from "@/features/case-study-summary/project-summary-page";

const PROJECT = getUxProject("clappit");

export const metadata: Metadata = {
  title: `${uxProjectTitle(PROJECT)} — Project Summary`,
  description: PROJECT.seoDescription,
  alternates: { canonical: PROJECT.href },
};

/**
 * ClappIt — a project summary.
 *
 * Everything here is either the résumé entry or something visible in the
 * project's own dashboard design (`/figmaAssets/clappit-dashboard.png`).
 * An earlier, longer ClappIt case study was removed from the site in a past
 * redesign; it is not restored here because its figures, personas and
 * testimonials could not be verified.
 */
export default function ClappitPage() {
  const image = PROJECT.image!;
  return (
    <ProjectSummaryPage
      project={PROJECT}
      overview="ClappIt is a cloud infrastructure platform — clusters, pods, services, data sources, alerts and network traffic in one product. I simplified its workflows for both technical and non-technical users, through clearer information architecture and navigation, and reusable UI components and design patterns across its modules."
      visual={
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          sizes="(min-width: 1280px) 1232px, 100vw"
          className="block h-auto w-full"
        />
      }
      sections={[
        {
          label: "The problem",
          title: "Infrastructure, for more than",
          accent: "infrastructure engineers",
          sub: "The same product had to make sense to the engineers running it and to the people who only needed to know whether it was healthy.",
          points: [
            "Many kinds of infrastructure object — clouds, clusters, projects, apps, services — each with its own state.",
            "Operational signals — health, performance, errors, alerts, traffic — competing for attention on one screen.",
            "Users with very different technical depth working from the same interface.",
          ],
        },
        {
          label: "Design decisions",
          title: "What the dashboard",
          accent: "shows",
          sub: "Each decision below is visible in the dashboard design above.",
          items: [
            {
              term: "Navigation by infrastructure object",
              detail:
                "A persistent rail — Dashboard, Clouds, Cluster, Projects, Apps, Teams, Settings, Services — so a user always knows which layer they are in.",
            },
            {
              term: "Cluster context in the header",
              detail:
                "Provider, cluster, node status, nodes available and last update sit together, with Refresh, Kill and Clone beside the context they act on.",
            },
            {
              term: "Severity-coded alerts",
              detail:
                "Critical, High, Medium and Low, with a legend, timeline and severity filters, and acknowledge or dismiss inline.",
            },
            {
              term: "One reusable panel pattern",
              detail:
                "Title, filter, refresh, overflow menu and a “View all” exit — the same shell for pods health, application performance, services, data sources, errors, alerts and network traffic.",
            },
            {
              term: "Status in words, not only colour",
              detail:
                "Healthy, Poor and Warning are written out next to their colour, so state is readable without relying on colour alone.",
            },
            {
              term: "Workspaces as tabs",
              detail:
                "Namespaces open as tabs at the foot of the workspace, so switching context does not mean losing it.",
            },
          ],
        },
        {
          label: "My contribution",
          title: "Structure first, then",
          accent: "a system",
          points: [
            "Simplified complex cloud-infrastructure workflows for technical and non-technical users.",
            "Restructured information architecture and navigation around the objects users actually manage.",
            "Created reusable UI components and scalable design patterns across product modules.",
          ],
        },
      ]}
      ctaTagline="Let's make complex technical products usable."
    />
  );
}
