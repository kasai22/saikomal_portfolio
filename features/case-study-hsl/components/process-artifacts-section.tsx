import { SectionHeading } from "@/components/case-study/section-heading";
import {
  AffinityMap,
  ArtifactFrame,
  FlowDiagram,
  Wireframe,
} from "@/components/case-study/process-artifacts";

/**
 * Working drawings for HSL. The clusters are the stakeholder-interview
 * observations grouped under the three findings they produced; the flow is
 * the candidate journey as redesigned, with the status states that used to
 * be invisible now named; the wireframe is the candidate portal reduced to
 * its regions.
 */

const AFFINITY_CLUSTERS = [
  {
    theme: "Applying is a black box",
    notes: [
      "Submits an application, then waits with no confirmation",
      "“Has anyone actually looked at my application?”",
      "“Did my submission even go through?”",
    ],
  },
  {
    theme: "Status lives in an inbox",
    notes: [
      "Vendors depend on email to learn a tender changed",
      "“Can I see the tender documents without waiting for the mail?”",
      "Re-checks the tenders page repeatedly for changes",
    ],
  },
  {
    theme: "Staff are the status API",
    notes: [
      "Calls or emails the office to ask for an update",
      "Teams spend a large part of the day answering “where does mine stand?”",
      "“I just need to know which department handles this.”",
    ],
  },
];

const CANDIDATE_FLOW = [
  { label: "Submitted", detail: "Receipt shown on screen, not promised by email" },
  { label: "Under review", detail: "Stage visible with the date it changed" },
  { label: "Shortlisted", detail: "Next step and who owns it" },
  { label: "Decision", detail: "Outcome posted to the portal" },
];

const PORTAL_WIREFRAME = [
  [
    { label: "Header / department", span: 12, kind: "block" as const, rows: 1 },
  ],
  [
    { label: "Application status stepper", span: 8, kind: "stat" as const },
    { label: "What happens next", span: 4, kind: "bars" as const, rows: 3 },
  ],
  [
    { label: "Submitted documents", span: 6, kind: "bars" as const, rows: 4 },
    { label: "Contact — the right desk", span: 6, kind: "block" as const, rows: 4 },
  ],
];

export function ProcessArtifactsSection() {
  return (
    <section>
      <SectionHeading
        label="Process Artifacts"
        title="The working"
        accent="drawings"
        sub="Stakeholder sessions across five modules, synthesised into the structure the screens were built on."
      />

      <div className="flex flex-col gap-6">
        <ArtifactFrame
          figure="Fig. 01"
          title="Affinity map — stakeholder interview synthesis"
          caption="~5 stakeholders per module, 5 modules"
        >
          <AffinityMap clusters={AFFINITY_CLUSTERS} />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 02"
          title="Candidate journey — status made visible"
          caption="Every state now has a screen"
        >
          <FlowDiagram nodes={CANDIDATE_FLOW} />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 03"
          title="Candidate portal wireframe — low fidelity"
          caption="Status first, documents second"
        >
          <Wireframe screen="Candidate portal" regions={PORTAL_WIREFRAME} />
        </ArtifactFrame>
      </div>
    </section>
  );
}
