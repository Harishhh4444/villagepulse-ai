import type { Language, Profile } from "@/lib/types";

export interface AdvisorContext {
  language: Language;
  profile: Profile;
  activeTab: string;
  question: string;
}

export interface AdvisorProvider {
  answer(context: AdvisorContext): string;
}

export const mockAdvisorProvider: AdvisorProvider = {
  answer: ({ profile, activeTab }) => `Based on your ${profile.category} plan in ${profile.village}, start with the visible ${activeTab === "radar" ? "SAMPLE market hypotheses" : activeTab === "finance" ? "scheme assumptions" : "plan assumptions"}. This advisor is a mock provider, so verify the answer with a local mentor or official source.`,
};

export function answerWithMockAdvisor(context: AdvisorContext): string {
  return mockAdvisorProvider.answer(context);
}
