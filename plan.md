# VillagePulse AI — Implementation Plan

## Architecture and assumptions

VillagePulse AI is implemented as a mobile-first Next.js App Router application with TypeScript strict mode. The first release is intentionally browser-only so the full demo works offline without paid keys or a managed database. Local state is used for the active plan and saved-plan previews; the data boundaries are shaped so Prisma/PostgreSQL/PostGIS and real OSM/census providers can be connected later.

The finance, simulator, and risk engines are pure functions in `lib/finance`, `lib/simulator`, and `lib/risk`. `data/sample.ts` owns clearly labelled SAMPLE DATA. The mock advisor is a local template provider behind a small provider interface. PDF export uses the browser print dialog so it works without a server-side PDF dependency.

## Project structure

- `app/` — App Router shell, layout, global styles, and the primary responsive experience.
- `components/` — Reusable dashboard, form, navigation, trust badges, and advisor UI pieces.
- `lib/finance/` — Scheme routing, repayment schedule, and INR calculations.
- `lib/simulator/` — Scenario inputs, monthly cash-flow projections, and comparison summaries.
- `lib/risk/` — Rule-based factor scoring and mitigation improvement logic.
- `data/` — Seed/demo districts, sample competitors, settlements, and observations.
- `i18n/` — JSON-like translation maps for English, Tamil, and Hindi.
- `test/` — Deterministic engine tests for critical scheme cases.

## Design direction

Three possible directions: **Forest Ledger** (0.04), **Civic Utility** (0.06), **Quiet Harvest** (0.03). Chosen: **Forest Ledger**.

- **Design movement:** modern civic utility with a grounded field-ledger interface: forest navigation, sand-beige canvas, and clean white working surfaces.
- **Core principles:** reassure before asking; show evidence beside every recommendation; make the next action obvious; keep touch targets generous.
- **Color philosophy:** forest green `#1F3D2B` anchors navigation, headings, actions, and identity; sand beige `#E8DCC4` carries the page canvas and soft surfaces; white remains a restrained working-surface contrast.
- **Layout paradigm:** a left rail on desktop becomes a sticky compact tab row on mobile; the main workspace uses an offset two-column rhythm rather than uniform cards.
- **Signature elements:** hypothesis cards with a small evidence trail, trust badges that never hide provenance, and a “decision pulse” strip that summarizes the current plan.
- **Interaction philosophy:** every control updates a plain-language explanation nearby; sliders are paired with numeric readouts; destructive or high-stakes actions are never ambiguous.
- **Animation:** restrained 150–220ms fades and slide-ins for tab changes and advisor replies; no looping decorative motion.
- **Typography:** system Noto Sans stack for Indian script coverage; bold compact display headings and 16px+ body text.
- **Brand essence:** practical intelligence for rural business decisions, before money moves. Personality: grounded, encouraging, transparent.
- **Brand voice:** “See the signal before you spend.” / “This is a hypothesis to test, not a promise.”
- **Wordmark & logo:** a simple pulse line that becomes a village path inside a rounded green square.
- **Signature brand color:** `#1F3D2B` forest pulse green, paired with sand beige `#E8DCC4`.

## Delivery sequence

1. Profile + i18n shell and a preloaded dairy demo.
2. Deterministic scheme calculator and tests.
3. Opportunity radar with sample evidence and radius interaction.
4. What-if simulator and risk check.
5. Feasibility report print/PDF handoff.
6. Advisor, saved plans, trust/about polish.

## Known prototype choices

- The “map” is a dependency-free, map-like interactive canvas with sample markers; the provider interface is ready for Leaflet/OpenStreetMap later.
- The loan calendar uses equal quarterly principal instalments with interest on reducing balance; moratorium interest is a visible assumption toggle.
- “Estimate” and “SAMPLE DATA” language is intentionally persistent because this is decision guidance, not sanction or approval.
