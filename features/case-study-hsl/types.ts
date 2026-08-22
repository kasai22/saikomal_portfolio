export interface TextSegment {
  text: string;
  highlight: boolean;
}

export interface HeroMeta {
  label: string;
  value: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ModuleScope {
  icon: string;
  title: string;
  description: string;
}

export interface RoleItem {
  label: string;
}

export interface AudienceApproachEntry {
  id: "audience" | "approach";
  kind: "list" | "paragraph";
  listItems?: string[];
  paragraph?: string;
}

export interface TimelinePhase {
  phase: string;
  weeks: string;
  /** Share of the 12-week engagement, used for the progress bar width. */
  share: number;
  steps: string[];
}

export interface InterviewGroup {
  title: string;
  questions: string[];
}

export interface EmpathyQuadrant {
  title: "Says" | "Thinks" | "Does" | "Feels";
  items: string[];
}

export interface DesignThinkingStep {
  title: string;
  items: string[];
}

export interface UserGroupSection {
  title: "Goals" | "Frustrations" | "What I designed";
  items: string[];
}

/**
 * Real user groups observed in stakeholder research, replacing the
 * invented personas the case study previously used.
 */
export interface UserGroup {
  id: string;
  name: string;
  module: string;
  summary: string;
  sections: UserGroupSection[];
}

export interface OutcomeItem {
  title: string;
  description: string;
}

export interface FontSample {
  label: string;
  text: string;
  weightClassName: string;
}

export interface ColorSwatch {
  title: string;
  value: string;
}
