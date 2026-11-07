/**
 * Portfolio case studies. A project can reference a store app through
 * `appSlug`: name, status, stack and artwork are then read from the catalog
 * so the same data is never written twice.
 *
 * Any case-study field left undefined renders as "documentation in progress".
 */

import type { Localized } from "./app";

export type ProjectLayout = "wide" | "tall" | "square";

export interface CaseStudy {
  problem?: string;
  goals?: string[];
  architecture?: string;
  decisions?: string[];
  challenges?: string[];
  nextSteps?: string[];
}

export interface Project {
  slug: string;
  appSlug?: string;
  /** Required only when the project is not linked to a store app. */
  name?: string;
  type: Localized;
  year?: number;
  summary: Localized;
  layout: ProjectLayout;
  tone: "light" | "dark";
  caseStudy: Localized<CaseStudy>;
}
