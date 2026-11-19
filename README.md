# VillagePulse AI

VillagePulse AI is a mobile-first rural entrepreneurship intelligence and decision-support prototype. It helps a first-time entrepreneur test an opportunity, simulate launch choices, and understand indicative scheme routing before investing.

## Screenshots

The app is designed to be reviewed in Preview. Add exported screenshots here when a production design review is performed.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful checks:

```bash
npm run typecheck
npm test
npm run build
```

## Structure

- `app/` — Next.js App Router shell and global styles.
- `components/` — UI primitives and dashboard sections.
- `lib/finance/` — deterministic scheme routing and repayment schedule.
- `lib/simulator/` — deterministic scenario projection.
- `lib/risk/` — rule-based risk scoring.
- `data/` — clearly labelled SAMPLE data.
- `i18n/` — English, Tamil, and Hindi copy maps.
- `test/` — critical finance engine tests.

## Replacing sample data

`data/sample.ts` is the provider boundary for demo districts, competitors, settlements, and observations. Replace the repository functions with OSM/Overpass, census, or an approved local data adapter. Keep the `DataBadge` provenance fields and last-updated date on every returned data point.

## AI provider

The UI uses a mock/template advisor by default. The provider interface can be connected to an optional server-side LLM adapter later. The advisor is intentionally instructed to cite data context and never perform final arithmetic.

## Known limitations

- The radar is a dependency-free map-like surface using bundled sample coordinates; a future adapter can render Leaflet/OpenStreetMap tiles.
- Persistence is local/browser state in this prototype; production should add Prisma/PostgreSQL/PostGIS and authenticated user-owned plans.
- PDF export uses the browser print dialog to keep the prototype offline and keyless.
- All scheme values and market observations are indicative and must be verified with official State Channelizing Agency documents and local field checks.
