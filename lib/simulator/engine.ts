import type { ScenarioInput, ScenarioProjection } from "@/lib/types";

const BASE_RAW_MATERIAL_PER_UNIT = 34;
const BASE_TRANSPORT_PER_UNIT = 7;
const SEASONAL_MONTHS = new Set([5, 6, 7]);

export function projectScenario(input: ScenarioInput): ScenarioProjection {
  const variableUnit = BASE_RAW_MATERIAL_PER_UNIT * (1 + input.rawMaterialChange / 100) + BASE_TRANSPORT_PER_UNIT * (1 + input.transportChange / 100);
  const monthlyFixed = input.rent + input.labour;
  const monthlyRevenue = input.sellingPrice * input.monthlySales;
  const monthlyVariable = variableUnit * input.monthlySales;
  const monthlyProfit = monthlyRevenue - monthlyVariable - monthlyFixed;
  const contribution = Math.max(1, input.sellingPrice - variableUnit);
  const breakEvenUnits = Math.ceil(monthlyFixed / contribution);
  const breakEvenMonths = Math.ceil(input.startupBudget / Math.max(1, monthlyProfit));
  const workingCapital = Math.ceil((monthlyFixed + monthlyVariable) * 1.5);
  let cumulativeCash = -input.startupBudget;
  let peakPressure = Math.abs(cumulativeCash);
  const cashFlow = Array.from({ length: 12 }, (_, index) => {
    const seasonalUnits = SEASONAL_MONTHS.has(index) ? input.monthlySales * (1 - input.seasonalDip / 100) : input.monthlySales;
    const revenue = input.sellingPrice * seasonalUnits;
    const variable = variableUnit * seasonalUnits;
    const profit = revenue - variable - monthlyFixed;
    cumulativeCash += profit;
    peakPressure = Math.max(peakPressure, Math.abs(Math.min(cumulativeCash, 0)));
    return { month: `M${index + 1}`, cash: Math.round(cumulativeCash), profit: Math.round(profit) };
  });
  return { input, monthlyRevenue, monthlyFixed, monthlyVariable, monthlyProfit, breakEvenUnits, breakEvenMonths, peakCashPressure: Math.ceil(peakPressure), workingCapital, cashFlow };
}

export function advisorSummary(base: ScenarioProjection, alternative: ScenarioProjection): string {
  const profitDelta = alternative.monthlyProfit - base.monthlyProfit;
  const cashDelta = alternative.peakCashPressure - base.peakCashPressure;
  if (profitDelta >= 0 && cashDelta <= 0) return `${alternative.input.name} improves the monthly profit picture while reducing peak cash pressure. The main change is a stronger price/volume mix; validate demand before committing.`;
  if (profitDelta >= 0) return `${alternative.input.name} improves monthly profit, but it asks for more cash upfront or carries a deeper seasonal dip. The trade-off is profitability versus resilience.`;
  return `${alternative.input.name} is less profitable on the current assumptions. It may still be useful as a cautious pilot because it keeps the launch smaller; validate supplier and buyer access first.`;
}
