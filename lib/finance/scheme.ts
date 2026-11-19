import type { LoanRow } from "@/lib/types";

export type SchemeRoute = "micro" | "term";
export type FinanceStatus = "valid" | "invalid" | "uncovered";

export interface SchemeConfig {
  id: SchemeRoute;
  name: string;
  minProjectCost: number;
  maxProjectCost: number;
  financingRate: number;
  loanCap: number;
  annualRate: number;
  tenureYears: number;
  moratoriumMonths: number;
}

export const SCHEMES: SchemeConfig[] = [
  { id: "micro", name: "Micro Finance Scheme", minProjectCost: 0, maxProjectCost: 140000, financingRate: 0.9, loanCap: 125000, annualRate: 0.065, tenureYears: 3, moratoriumMonths: 3 },
  { id: "term", name: "Term Loan Scheme", minProjectCost: 140000.01, maxProjectCost: 5000000, financingRate: 0.9, loanCap: 4500000, annualRate: 0.08, tenureYears: 7, moratoriumMonths: 6 },
];

export interface FinanceOptions {
  interestDuringMoratorium: boolean;
  firstInstalmentDate: string;
}

export interface SchemeResult {
  status: FinanceStatus;
  message: string;
  marginCapital: number;
  projectCost: number;
  requestedLoan: number;
  loanAmount: number;
  ownContribution: number;
  extraOwnContribution: number;
  route?: SchemeConfig;
  rows: LoanRow[];
  totalInterest: number;
  totalRepayment: number;
  quarterlyInstalment: number;
}

const invalidResult = (message: string, marginCapital = 0): SchemeResult => ({
  status: "invalid", message, marginCapital, projectCost: 0, requestedLoan: 0, loanAmount: 0, ownContribution: 0, extraOwnContribution: 0, rows: [], totalInterest: 0, totalRepayment: 0, quarterlyInstalment: 0,
});

export function parseMarginCapital(value: string | number): number | null {
  const parsed = typeof value === "number" ? value : Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100000000) return null;
  return parsed;
}

export function buildRepaymentSchedule(loanAmount: number, route: SchemeConfig, options: FinanceOptions): { rows: LoanRow[]; totalInterest: number; totalRepayment: number; quarterlyInstalment: number } {
  const periods = route.tenureYears * 4;
  const moratoriumQuarters = Math.ceil(route.moratoriumMonths / 3);
  const repaymentPeriods = Math.max(1, periods - moratoriumQuarters);
  let balance = loanAmount;
  const principalPerPeriod = loanAmount / repaymentPeriods;
  const quarterlyRate = route.annualRate / 4;
  let totalInterest = 0;
  const rows: LoanRow[] = [];

  for (let index = 0; index < periods; index += 1) {
    const isMoratorium = index < moratoriumQuarters;
    const openingBalance = balance;
    const interest = balance * quarterlyRate;
    const principal = isMoratorium ? 0 : Math.min(principalPerPeriod, balance);
    const capitalised = isMoratorium && options.interestDuringMoratorium ? interest : 0;
    const instalment = isMoratorium ? (options.interestDuringMoratorium ? 0 : interest) : principal + interest;
    balance = Math.max(0, balance + capitalised - principal);
    totalInterest += interest;
    rows.push({ period: `Q${index + 1}`, openingBalance, principal, interest, instalment, closingBalance: balance, isMoratorium });
  }
  return { rows, totalInterest, totalRepayment: rows.reduce((sum, row) => sum + row.instalment, 0), quarterlyInstalment: principalPerPeriod + loanAmount * quarterlyRate };
}

export function calculateScheme(value: string | number, options: FinanceOptions = { interestDuringMoratorium: true, firstInstalmentDate: "2026-04-01" }): SchemeResult {
  const marginCapital = parseMarginCapital(value);
  if (marginCapital === null) return invalidResult("Enter a positive margin capital amount up to Rs 10 crore.");
  const projectCost = marginCapital / 0.1;
  const requestedLoan = projectCost * 0.9;
  if (projectCost > 5000000) return { ...invalidResult("The stated scheme limits do not cover a project cost above Rs 50 lakh.", marginCapital), status: "uncovered", projectCost, requestedLoan, ownContribution: marginCapital };
  const route = projectCost <= SCHEMES[0].maxProjectCost ? SCHEMES[0] : SCHEMES[1];
  const loanAmount = Math.min(requestedLoan, route.loanCap);
  const ownContribution = projectCost - loanAmount;
  const extraOwnContribution = Math.max(0, ownContribution - marginCapital);
  const schedule = buildRepaymentSchedule(loanAmount, route, options);
  return { status: "valid", message: "Estimate. Verify with the official State Channelizing Agency / scheme documents.", marginCapital, projectCost, requestedLoan, loanAmount, ownContribution, extraOwnContribution, route, ...schedule };
}
