import type { Profile, RiskFactor, ScenarioProjection } from "@/lib/types";

export interface RiskAnswers {
  supplierDependency: boolean;
  seasonalDemand: boolean;
  weakDistribution: boolean;
  highFixedCosts: boolean;
  intenseCompetition: boolean;
  singleBuyer: boolean;
}

const defaultAnswers: RiskAnswers = { supplierDependency: true, seasonalDemand: true, weakDistribution: true, highFixedCosts: true, intenseCompetition: false, singleBuyer: true };

export function evaluateRisk(_profile: Profile, scenario: ScenarioProjection, answers: Partial<RiskAnswers> = {}): { factors: RiskFactor[]; score: number; band: "Low" | "Medium" | "High"; improvedScore: number } {
  const a = { ...defaultAnswers, ...answers };
  const factors: RiskFactor[] = [
    { id: "supplier", label: "Single-supplier dependency", score: a.supplierDependency ? 14 : 4, maxScore: 16, reason: a.supplierDependency ? "The plan assumes one main milk or raw-material source." : "More than one source is assumed.", warning: "A missed pickup or price change could stop daily operations.", mitigation: "Keep two approved suppliers and a 7-day backup purchasing plan." },
    { id: "season", label: "Seasonal demand or supply", score: a.seasonalDemand ? 13 : 5, maxScore: 16, reason: a.seasonalDemand ? "The dairy scenario expects a seasonal dip in sales and supply." : "No major seasonal swing is assumed.", warning: "Cash may tighten during the dip months.", mitigation: "Pre-sell subscriptions and reserve working capital for 3 lean months." },
    { id: "distribution", label: "Weak distribution access", score: a.weakDistribution ? 10 : 3, maxScore: 14, reason: a.weakDistribution ? "The service area includes settlements beyond the centre." : "Routes are already reliable.", warning: "Transport time and fuel can erase margin on small orders.", mitigation: "Cluster deliveries by route and set a minimum order size." },
    { id: "fixed", label: "Fixed costs versus revenue", score: a.highFixedCosts ? 9 : 3, maxScore: 14, reason: a.highFixedCosts ? `Rent and labour consume a meaningful share of projected contribution (Rs ${Math.round(scenario.monthlyFixed).toLocaleString("en-IN")}/month).` : "Fixed costs are kept light.", warning: "Low-volume months can turn fixed costs into losses.", mitigation: "Start with shared space or part-time help until volume is proven." },
    { id: "competition", label: "Category competition", score: a.intenseCompetition ? 8 : 4, maxScore: 12, reason: a.intenseCompetition ? "Several sample dairy markers are visible in the centre." : "Competition is present but unevenly distributed.", warning: "A similar offer may be copied quickly.", mitigation: "Differentiate with reliable delivery windows and subscription bundles." },
    { id: "buyer", label: "Single-major-buyer dependence", score: a.singleBuyer ? 12 : 4, maxScore: 14, reason: a.singleBuyer ? "A collection or institutional buyer could become the main outlet." : "Sales are spread across multiple buyer types.", warning: "One buyer changing terms could create unsold stock.", mitigation: "Keep households, tea shops, and one institutional buyer in the mix." },
  ];
  const score = Math.min(100, factors.reduce((sum, factor) => sum + factor.score, 0));
  const improvedScore = Math.max(0, Math.round(score * 0.54));
  const band = score >= 60 ? "High" : score >= 35 ? "Medium" : "Low";
  return { factors, score, band, improvedScore };
}
