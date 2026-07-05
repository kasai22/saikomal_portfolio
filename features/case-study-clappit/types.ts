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

export interface AudienceSegment {
  icon: string;
  role: string;
  freq: string;
  goal: string;
  frustration: string;
  needs: string[];
  behavior: string;
}

export interface TimelineStage {
  num: string;
  stage: string;
  detail: string;
}

export interface StageDetail {
  stage: string;
  icon: string;
  activities: string[];
  output: string;
  decision: string;
}

export interface DesignGoal {
  n: string;
  goal: string;
  desc: string;
}

export interface ComparisonRow {
  dim: string;
  vals: string[];
}

export interface CompetitiveOpportunity {
  opp: string;
  insight: string;
}

export interface ProcessStep {
  step: string;
  detail: string;
}

export interface FrameworkStep {
  label: string;
  desc: string;
}

export interface VisualDecision {
  title: string;
  desc: string;
}

export interface ResearchPersona {
  persona: string;
  icon: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  motivation: string;
  behavior: string;
}

export interface ResearchInsight {
  insight: string;
  detail: string;
}

export interface UserFlowRedesign {
  flow: string;
  icon: string;
  before: string[];
  after: string[];
  improvement: string;
}

export interface TypeSample {
  label: string;
  size: string;
  sample: string;
  className: string;
}

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

export interface DesignToken {
  token: string;
  val: string;
}

export interface ComponentStat {
  v: string;
  l: string;
}

export interface HighFidelityScreen {
  screen: string;
  icon: string;
  decision: string;
  tag: string;
}

export interface OutcomeMetric {
  metric: string;
  label: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  role: string;
}

export interface EnterpriseLearning {
  l: string;
  d: string;
}

export interface SystemInvestmentPoint {
  text: string;
}
