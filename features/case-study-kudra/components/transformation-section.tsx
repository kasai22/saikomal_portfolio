import { SectionHeading } from "@/components/case-study/section-heading";
import { PinnedNarrative, type NarrativeStage } from "@/components/case-study/pinned-narrative";
import {
  COORDINATION_METHODS,
  LIFECYCLE_STATES,
  OUTCOME_METRICS,
  WORKFLOW_STEPS,
} from "@/features/case-study-kudra/constants/data";

/**
 * The Kudra transformation, as one continuous scroll.
 *
 * Four stages, in the order the operation actually moved through them:
 * call-heavy coordination → structured workflows → a trip-centric system →
 * data-driven operations. Each stage is assembled from content already in
 * this case study, and nothing is added:
 *
 *   01  `COORDINATION_METHODS` — how the work was coordinated before
 *   02  `WORKFLOW_STEPS`       — the seven documented workflow stages
 *   03  `LIFECYCLE_STATES`     — the trip state machine that replaced them
 *   04  `OUTCOME_METRICS`      — the measured results, verbatim
 *
 * The stage-four figures are the case study's own reported outcomes, quoted
 * as written. No metric here is derived, rounded or invented.
 *
 * The screenshots are the real product screens already used in the Screen
 * Showcase section further down, each paired with the stage it evidences —
 * a trip being created, the fleet registry, live tracking, the reports view.
 */

const STAGES: NarrativeStage[] = [
  {
    step: "01",
    title: "Manual, call-heavy operations",
    detail:
      "Fleet coordination ran on conversation. Status lived with whoever last picked up the phone.",
    items: COORDINATION_METHODS,
    image: {
      src: "/kudra/add-device.png",
      alt: "Kudra — registering a vehicle and its GPS device",
      width: 1918,
      height: 1026,
    },
  },
  {
    step: "02",
    title: "Structured workflows",
    detail:
      "Every operation became a defined step with a defined output, from trip creation through to reporting.",
    items: WORKFLOW_STEPS.map((step) => step.title),
    image: {
      src: "/kudra/fleet-management.png",
      alt: "Kudra — structured vehicle registry with operational status",
      width: 1918,
      height: 1026,
    },
  },
  {
    step: "03",
    title: "A trip-centric system",
    detail:
      "The trip replaced the vehicle as the unit of work, and carried its own state from creation to reconciliation.",
    items: LIFECYCLE_STATES.map((state) => state.state),
    image: {
      src: "/kudra/live-tracking.png",
      alt: "Kudra — live trip tracking with halt-point timeline",
      width: 1918,
      height: 1026,
    },
  },
  {
    step: "04",
    title: "Data-driven fleet operations",
    detail:
      "With every movement tied to a structured trip record, the operation could finally be measured.",
    items: OUTCOME_METRICS.slice(0, 4).map((m) => `${m.metric} · ${m.label}`),
    image: {
      src: "/kudra/vehicle-reports.png",
      alt: "Kudra — per-vehicle analytics and utilisation reporting",
      width: 1918,
      height: 1026,
    },
  },
];

export function TransformationSection() {
  return (
    <section>
      <SectionHeading
        label="The Transformation"
        title="From phone calls to a"
        accent="measurable operation"
        sub="The same fleet, at four points in its move from conversation-driven coordination to a structured, trip-centric system."
      />
      <PinnedNarrative stages={STAGES} label="How Kudra changed fleet operations" />
    </section>
  );
}
