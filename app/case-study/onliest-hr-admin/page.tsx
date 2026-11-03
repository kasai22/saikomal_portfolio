import type { Metadata } from "next";
import { getUxProject, uxProjectTitle } from "@/constants/projects";
import { ProjectSummaryPage } from "@/features/case-study-summary/project-summary-page";
import { RoleWorkflowFigure } from "@/components/case-study/role-workflow-figure";

const PROJECT = getUxProject("hr-admin");

export const metadata: Metadata = {
  title: `${uxProjectTitle(PROJECT)} — Project Summary`,
  description: PROJECT.seoDescription,
  alternates: { canonical: PROJECT.href },
};

/**
 * Onliest HR Admin — a project summary, written from the résumé record only.
 * No product screens are published yet, so the page leads with a diagram of
 * the documented scope instead of a screenshot.
 */
export default function HrAdminPage() {
  return (
    <ProjectSummaryPage
      project={PROJECT}
      overview="Onliest HR Admin is an internal HRMS. I designed role-based workflows for attendance, leave, onboarding and approvals across Admin, Manager and Employee roles — and the exception handling, bulk actions, audit trails and accessible table and form experiences that enterprise HR work depends on."
      visual={<RoleWorkflowFigure className="min-h-[340px]" />}
      sections={[
        {
          label: "Roles",
          title: "Three roles,",
          accent: "one set of records",
          sub: "Admin, Manager and Employee act on the same attendance, leave, onboarding and approval records with different responsibilities — so each role gets an interface shaped to its part of the work.",
          points: [
            "Role-based workflows for Admin, Manager and Employee users.",
            "Attendance, leave, onboarding and approvals designed as connected workflows rather than separate screens.",
            "Reusable Figma patterns shared with Onliest's Marketplace and Revenue products.",
          ],
        },
        {
          label: "Patterns",
          title: "Designed for the",
          accent: "exceptions",
          sub: "Enterprise HR work is mostly the cases that do not follow the happy path. These are the patterns designed for them.",
          items: [
            {
              term: "Exception handling",
              detail: "A clear path for the records that do not fit the rule, instead of a dead end.",
            },
            {
              term: "Bulk actions",
              detail: "Acting on many records at once, for the roles that review work in volume.",
            },
            {
              term: "Audit trails",
              detail: "A visible record of who changed what, and when, on every decision.",
            },
            {
              term: "Accessible tables",
              detail: "Data-dense tables that stay readable and navigable by keyboard.",
            },
            {
              term: "Accessible forms",
              detail: "Data-entry patterns with clear labels, validation and error recovery.",
            },
          ],
        },
      ]}
      ctaTagline="Let's design enterprise workflows people can trust."
    />
  );
}
