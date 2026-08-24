import { SectionHeading } from "@/components/case-study/section-heading";
import {
  AffinityMap,
  ArtifactFrame,
  FlowDiagram,
  Wireframe,
} from "@/components/case-study/process-artifacts";
import { LIFECYCLE_STATES } from "@/features/case-study-kudra/constants/data";

/**
 * The working drawings behind the Kudra prose. The flow is the documented
 * lifecycle; the affinity clusters are the field-research areas grouped
 * under the insights they produced; the wireframe is the dashboard reduced
 * to its regions and their hierarchy.
 */

const AFFINITY_CLUSTERS = [
  {
    theme: "Coordination runs on people",
    notes: [
      "Trips coordinated verbally between fleet and branches",
      "Call frequency high; information lost in verbal updates",
      "Branches learn about incoming deliveries by phone",
    ],
  },
  {
    theme: "The record is scattered",
    notes: [
      "Trip info lives across calls, WhatsApp, spreadsheets, memory",
      "Paper-based fuel records with accuracy gaps",
      "No single place to check what a vehicle is doing",
    ],
  },
  {
    theme: "People think in trips, not vehicles",
    notes: [
      "Managers say “the Chennai trip”, not a registration number",
      "Status questions are about a journey, not an asset",
      "Cost only makes sense per trip, not per vehicle",
    ],
  },
];

const DASHBOARD_WIREFRAME = [
  [{ label: "Fleet status counters", span: 12, kind: "stat" as const }],
  [
    { label: "Live vehicle map", span: 8, kind: "map" as const, rows: 7 },
    { label: "Active trips", span: 4, kind: "bars" as const, rows: 6 },
  ],
  [{ label: "Trip table — status first", span: 12, kind: "bars" as const, rows: 4 }],
];

export function ProcessArtifactsSection() {
  return (
    <section>
      <SectionHeading
        label="Process Artifacts"
        title="The working"
        accent="drawings"
        sub="Field research, synthesis and structure — the artefacts the finished screens came out of."
      />

      <div className="flex flex-col gap-6">
        <ArtifactFrame
          figure="Fig. 01"
          title="Affinity map — field research synthesis"
          caption="3 clusters from 6 research areas"
        >
          <AffinityMap clusters={AFFINITY_CLUSTERS} />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 02"
          title="Trip lifecycle — state flow"
          caption={`${LIFECYCLE_STATES.length} states`}
        >
          <FlowDiagram
            nodes={LIFECYCLE_STATES.map((s) => ({ label: s.state, detail: s.desc }))}
          />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 03"
          title="Dashboard wireframe — low fidelity"
          caption="Region hierarchy, before any UI"
        >
          <Wireframe screen="Fleet dashboard" sidebar={{ label: "Nav" }} regions={DASHBOARD_WIREFRAME} />
        </ArtifactFrame>
      </div>
    </section>
  );
}
