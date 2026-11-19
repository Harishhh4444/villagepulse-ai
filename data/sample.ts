import type { Competitor, Observation, Profile } from "@/lib/types";

export const demoProfile: Profile = {
  language: "en",
  state: "Tamil Nadu",
  district: "Tiruvallur",
  block: "Poonamallee",
  village: "Kattupakkam",
  marginCapital: 100000,
  category: "dairy",
  notes: "Interested in a small dairy collection and home-delivery service.",
};

export const sampleCompetitors: Competitor[] = [
  { id: "c1", name: "Kaveri Milk Point", type: "competitor", category: "dairy", x: 42, y: 36, badge: { kind: "verified", label: "Verified data", source: "SAMPLE local business seed", updated: "2025-10-01" } },
  { id: "c2", name: "Sri Lakshmi Dairy", type: "competitor", category: "dairy", x: 61, y: 51, badge: { kind: "verified", label: "Verified data", source: "SAMPLE local business seed", updated: "2025-10-01" } },
  { id: "c3", name: "Aavin Collection Shed", type: "collection", category: "dairy", x: 68, y: 30, badge: { kind: "verified", label: "Verified data", source: "SAMPLE collection point seed", updated: "2025-10-01" } },
  { id: "c4", name: "Ponni Milk Booth", type: "competitor", category: "dairy", x: 29, y: 61, badge: { kind: "verified", label: "Verified data", source: "SAMPLE local business seed", updated: "2025-10-01" } },
  { id: "c5", name: "West Farm Cluster", type: "settlement", category: "dairy", x: 21, y: 28, population: 2120, badge: { kind: "verified", label: "Verified data", source: "SAMPLE settlement seed", updated: "2025-09-15" } },
  { id: "c6", name: "Kovilambakkam Hamlet", type: "settlement", category: "dairy", x: 77, y: 65, population: 1560, badge: { kind: "verified", label: "Verified data", source: "SAMPLE settlement seed", updated: "2025-09-15" } },
  { id: "c7", name: "North Street", type: "settlement", category: "dairy", x: 50, y: 76, population: 3310, badge: { kind: "verified", label: "Verified data", source: "SAMPLE settlement seed", updated: "2025-09-15" } },
];

export const sampleObservations: Observation[] = [
  { title: "Home delivery may be an open lane", body: "This is a hypothesis: several dairy points appear near the village centre, while nearby settlements sit farther from a daily doorstep option.", evidence: "4 sample dairy markers + 3 sample settlements", confidence: "Medium", badge: { kind: "estimate", label: "AI estimate", source: "Derived from SAMPLE data", updated: "2025-10-01" } },
  { title: "A collection partnership could reduce spoilage", body: "This is a hypothesis: a collection point is visible on the east side, so a scheduled pickup route may be worth testing before buying more refrigeration.", evidence: "1 sample collection point within the 10 km view", confidence: "Medium", badge: { kind: "estimate", label: "AI estimate", source: "Derived from SAMPLE data", updated: "2025-10-01" } },
  { title: "Competition is present but not dense everywhere", body: "This is a hypothesis: the centre has multiple milk sellers, while the west and south edges show fewer dairy markers.", evidence: "3 competitors across the current service area", confidence: "High", badge: { kind: "estimate", label: "AI estimate", source: "Derived from SAMPLE data", updated: "2025-10-01" } },
];

export const categoryLabels: Record<Profile["category"], string> = {
  dairy: "Dairy & milk services",
  "general-store": "General store",
  tailoring: "Tailoring",
  "food-processing": "Food processing",
  "agri-inputs": "Agri-inputs",
  poultry: "Poultry",
  repair: "Repair services",
};
