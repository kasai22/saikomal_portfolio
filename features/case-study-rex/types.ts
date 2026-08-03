export interface MetaItem {
  label: string;
  value: string;
}

export interface TeamToolItem {
  label: string;
  value: string;
}

export interface ProblemPoint {
  title: string;
  desc: string;
}

export interface SolutionPillar {
  icon: string;
  title: string;
  desc: string;
}

export interface KeyFeature {
  title: string;
  tag: string;
  desc: string;
}

export interface HighFidelityScreen {
  screen: string;
  image: string;
  tag: string;
  decision: string;
}

export interface OutcomeMetric {
  metric: string;
  label: string;
  desc: string;
}

export interface AgentRole {
  agent: string;
  role: string;
}
