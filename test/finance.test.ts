import test from "node:test";
import assert from "node:assert/strict";
import { calculateScheme } from "@/lib/finance/scheme";

const opts = { interestDuringMoratorium: true, firstInstalmentDate: "2026-04-01" };

test("Rs 1,00,000 margin routes to Term Loan with Rs 10,00,000 project and Rs 9,00,000 loan", () => {
  const result = calculateScheme(100000, opts);
  assert.equal(result.status, "valid");
  assert.equal(result.route?.id, "term");
  assert.equal(result.projectCost, 1000000);
  assert.equal(result.loanAmount, 900000);
});

test("Rs 1.40 lakh project cost stays on Micro Finance boundary", () => {
  const result = calculateScheme(14000, opts);
  assert.equal(result.route?.id, "micro");
  assert.equal(result.projectCost, 140000);
});

test("Micro Finance loan cap creates extra own contribution", () => {
  const result = calculateScheme(14000, opts);
  assert.equal(result.loanAmount, 125000);
  assert.equal(result.extraOwnContribution, 1000);
});

test("Rs 50 lakh project cost remains covered by Term Loan", () => {
  const result = calculateScheme(500000, opts);
  assert.equal(result.status, "valid");
  assert.equal(result.route?.id, "term");
  assert.equal(result.projectCost, 5000000);
});

test("Above Rs 50 lakh is not routed", () => {
  const result = calculateScheme(500001, opts);
  assert.equal(result.status, "uncovered");
  assert.match(result.message, /above Rs 50 lakh/);
});

test("Invalid input is handled without arithmetic", () => {
  const result = calculateScheme("not a number", opts);
  assert.equal(result.status, "invalid");
  assert.equal(result.rows.length, 0);
});
