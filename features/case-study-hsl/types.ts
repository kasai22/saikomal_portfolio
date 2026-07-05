import type { HeadingSegment } from "@/components/case-study/pill-heading";

export interface TextSegment {
  text: string;
  highlight: boolean;
}

export interface RoleItem {
  label: string;
}

export interface AudienceApproachEntry {
  id: "audience" | "approach";
  heading: HeadingSegment[];
  pillWidth: number;
  imageSrc: string;
  imageAlt: string;
  imageFirstOnMobile: boolean;
  kind: "list" | "paragraph";
  listItems?: string[];
  paragraph?: string;
}

export interface TimelineCard {
  title: string;
  color: string;
  colStart: number;
  colSpan: number;
  rowStart: number;
  fontSizeClass: string;
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
  iconSrc: string;
  iconAlt: string;
  connectorSrc: string | null;
  items: string[];
}

export interface PersonaDetail {
  label: string;
  value: string;
}

export interface PersonaSection {
  title: "Goals" | "Frustrations" | "Needs" | "Motivations";
  items: string[];
}

export interface Persona {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  details: PersonaDetail[];
  story: string;
  sections: PersonaSection[];
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
