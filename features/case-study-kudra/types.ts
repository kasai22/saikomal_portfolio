export interface MetadataItem {
  label: string;
  value: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface UserRole {
  role: string;
  icon: string;
  responsibilities: string[];
  painPoints: string[];
}

export interface ResearchArea {
  area: string;
  desc: string;
}

export interface ResearchStat {
  v: string;
  l: string;
}

export interface KeyInsight {
  num: string;
  title: string;
  desc: string;
}

export interface UxGoal {
  goal: string;
  desc: string;
}

export interface ArchitectureModule {
  module: string;
  icon: string;
  desc: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  items: string[];
}

export interface LifecycleState {
  state: string;
  desc: string;
}

export interface BalancingFactor {
  f: string;
  v: string;
}

export interface DesignPrinciple {
  p: string;
  d: string;
}

export interface StatusColor {
  state: string;
  color: string;
  label: string;
}

export interface ScreenShowcase {
  imageSrc: string;
  title: string;
  desc: string;
  tag: string;
}

export interface Feature {
  feature: string;
  icon: string;
  detail: string;
}

export interface Challenge {
  ch: string;
  detail: string;
  solution: string;
}

export interface OutcomeMetric {
  metric: string;
  label: string;
  desc: string;
}

export interface Learning {
  l: string;
  d: string;
}

export interface FutureScopeItem {
  title: string;
  icon: string;
  desc: string;
}

export interface Deliverable {
  d: string;
  icon: string;
}
