# VillagePulse AI — Delivery Checklist

## 1. Profile flow and i18n shell
- [ ] Landing view has the VillagePulse AI name, tagline, three feature cards, language switcher, and a prominent Start your plan CTA.
- [ ] Profile flow is multi-step with a progress bar and collects language, state/district/block/village, margin capital, category, and optional notes.
- [ ] Profile is preloaded for the dairy demo with Rs 1,00,000 margin capital and no phone, Aadhaar, or ID fields.
- [ ] English, Tamil, and Hindi translation maps are structured for additional JSON languages.
- [ ] Voice input buttons are available on text inputs where Web Speech API is supported.

## 2. Deterministic scheme calculator
- [ ] Indicative project cost is margin capital / 0.10 and indicative loan is the lesser of 90% of project cost and the editable scheme cap.
- [ ] Micro Finance routes through Rs 1.40 lakh project cost; Term Loan routes above Rs 1.40 lakh through Rs 50 lakh; above Rs 50 lakh is explicitly uncovered.
- [ ] Invalid, negative, zero, nonnumeric, and very large values are handled with clear messages.
- [ ] Loan cap cases explain extra own contribution required.
- [ ] Repayment output shows rate, tenure, moratorium, instalment estimate, total interest, total repayment, and quarterly calendar.
- [ ] Moratorium interest, repayment method, and first instalment date are visible assumptions.
- [ ] Operating expense / working capital and loan instalment remain separate, with a combined quarterly cash-needed view.
- [ ] Outputs are labelled estimates and official verification is requested.
- [ ] Unit tests cover Rs 1,00,000 margin, Rs 1.40 lakh boundary, cap, Rs 50 lakh boundary, above Rs 50 lakh, and invalid input.

## 3. Opportunity radar
- [ ] Sample data is visibly labelled SAMPLE DATA and includes dairy shops, collection points, and settlements.
- [ ] Service radius can move between 5 km and 10 km and updates catchment metrics.
- [ ] Map-like view shows category markers and settlement markers.
- [ ] Ranked observations are hypotheses with evidence and confidence.
- [ ] Catchment population, competitor count, density, and opportunity score are visible.

## 4. Simulator and risk
- [ ] Base Plan plus at least two scenarios expose adjustable budget, price, volume, seasonal dip, raw-material change, transport change, rent, and labour.
- [ ] Deterministic outputs include revenue, fixed/variable expenses, profit, break-even, cash pressure, working capital, and a 12-month chart.
- [ ] Plain-language summary explains computed changes without acting as the calculator.
- [ ] Rule-based risk engine covers supplier, seasonality, distribution, fixed costs, competition, and buyer concentration.
- [ ] Overall risk score, factor reasons, warning signs, mitigations, and improved score after mitigations are visible.

## 5. Report, trust, and support
- [ ] Report includes profile, catchment, opportunity evidence, SWOT, competitors, price reasoning, threats, scenario comparison, risk, scheme routing, repayment, assumptions, sources, and disclaimer.
- [ ] Report has a print-friendly layout and Download PDF action.
- [ ] Trust badges distinguish Verified data, Your assumption, and AI estimate with source/date where applicable.
- [ ] Key assumptions can be confirmed before report generation.
- [ ] Advisor is available on dashboard tabs and uses a mock provider that cites context and avoids final arithmetic.
- [ ] Saved plans can be reopened.
- [ ] About / Data & Trust page explains provenance and limitations.

## 6. Quality and delivery
- [ ] Strict TypeScript and reusable module boundaries are in place.
- [ ] `public/manus-routes.json` lists the complete page routes.
- [ ] README includes setup, structure, sample-data swap path, screenshots placeholder, and limitations.
- [ ] Build and tests pass before checkpoint.
