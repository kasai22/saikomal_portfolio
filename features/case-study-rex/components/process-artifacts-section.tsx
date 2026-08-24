import { SectionHeading } from "@/components/case-study/section-heading";
import {
  AffinityMap,
  ArtifactFrame,
  FlowDiagram,
  Wireframe,
} from "@/components/case-study/process-artifacts";

/**
 * Working drawings for REX. The flow is the documented request path
 * through the agent stack, including the guardrail that can send a result
 * back rather than out; the clusters are the problems the BRD was written
 * against; the wireframe is the stylist chat reduced to its regions.
 */

const REQUEST_FLOW = [
  { label: "Entry", detail: "Chat, wizard, image or browse" },
  { label: "Orchestrator", detail: "Routes to specialist agents" },
  { label: "Discovery", detail: "Asks only what is missing" },
  { label: "Scoring", detail: "Match, confidence, penalties" },
  { label: "Guardrail", detail: "Validated against real inventory", decision: true },
  { label: "Display", detail: "Design + explained score" },
];

const PROBLEM_CLUSTERS = [
  {
    theme: "Search cannot hold intent",
    notes: [
      "A vague instinct has no keyword to type",
      "Generic search returns a catalogue, not a recommendation",
      "Customers abandon rather than refine",
    ],
  },
  {
    theme: "Unexplained results are not trusted",
    notes: [
      "A ranked list with no reason reads as arbitrary",
      "High-value purchases need a stated rationale",
      "Confidence has to be visible, not implied",
    ],
  },
  {
    theme: "Invented answers destroy trust",
    notes: [
      "Availability, price and delivery must be real",
      "Bridal timing is non-negotiable",
      "Every claim needs a source to check against",
    ],
  },
];

const CHAT_WIREFRAME = [
  [
    { label: "Mode switch — chat / wizard", span: 12, kind: "block" as const, rows: 1 },
  ],
  [
    { label: "Conversation + transcript", span: 5, kind: "bars" as const, rows: 6 },
    { label: "Generated design", span: 4, kind: "map" as const, rows: 7 },
    { label: "Match score + why", span: 3, kind: "stat" as const },
  ],
  [
    { label: "Input", span: 8, kind: "block" as const, rows: 1 },
    { label: "Refine in Design Studio", span: 4, kind: "block" as const, rows: 1 },
  ],
];

export function ProcessArtifactsSection() {
  return (
    <section>
      <SectionHeading
        label="Process Artifacts"
        title="The working"
        accent="drawings"
        sub="How a request actually moves through the system, and the problems the BRD was written against."
      />

      <div className="flex flex-col gap-6">
        <ArtifactFrame
          figure="Fig. 01"
          title="Request flow — agent orchestration"
          caption="Guardrail can return a result rather than release it"
        >
          <FlowDiagram nodes={REQUEST_FLOW} />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 02"
          title="Affinity map — problem synthesis"
          caption="3 clusters behind the brief"
        >
          <AffinityMap clusters={PROBLEM_CLUSTERS} />
        </ArtifactFrame>

        <ArtifactFrame
          figure="Fig. 03"
          title="Stylist chat wireframe — low fidelity"
          caption="Conversation and recommendation always co-visible"
        >
          <Wireframe screen="Interactive stylist chat" regions={CHAT_WIREFRAME} />
        </ArtifactFrame>
      </div>
    </section>
  );
}
