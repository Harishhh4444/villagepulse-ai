export type Language = "en" | "ta" | "hi";
export type Category = "dairy" | "general-store" | "tailoring" | "food-processing" | "agri-inputs" | "poultry" | "repair";
export type BadgeKind = "verified" | "assumption" | "estimate";

export interface Profile {
  language: Language;
  state: string;
  district: string;
  block: string;
  village: string;
  marginCapital: number;
  category: Category;
  notes: string;
}

export interface DataBadge {
  kind: BadgeKind;
  label: string;
  source?: string;
  updated?: string;
}

export interface Competitor {
  id: string;
  name: string;
  type: "competitor" | "collection" | "settlement";
  category: Category;
  x: number;
  y: number;
  population?: number;
  badge: DataBadge;
}

export interface Observation {
  title: string;
  body: string;
  evidence: string;
  confidence: "High" | "Medium" | "Low";
  badge: DataBadge;
}

export interface ScenarioInput {
  id: string;
  name: string;
  startupBudget: number;
  sellingPrice: number;
  monthlySales: number;
  seasonalDip: number;
  rawMaterialChange: number;
  transportChange: number;
  rent: number;
  labour: number;
}

export interface ScenarioProjection {
  input: ScenarioInput;
  monthlyRevenue: number;
  monthlyFixed: number;
  monthlyVariable: number;
  monthlyProfit: number;
  breakEvenUnits: number;
  breakEvenMonths: number;
  peakCashPressure: number;
  workingCapital: number;
  cashFlow: Array<{ month: string; cash: number; profit: number }>;
}

export interface RiskFactor {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  reason: string;
  warning: string;
  mitigation: string;
}

export interface LoanRow {
  period: string;
  openingBalance: number;
  principal: number;
  interest: number;
  instalment: number;
  closingBalance: number;
  isMoratorium: boolean;
}
