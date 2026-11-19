import type { Language } from "@/lib/types";

export const translations: Record<Language, Record<string, string>> = {
  en: { start: "Start your plan", dashboard: "Your decision workspace", radar: "Opportunity Radar", simulator: "What-If Simulator", risk: "Risk Check", finance: "Scheme calculator", report: "Feasibility report", saved: "Saved plans", about: "Data & Trust", sample: "SAMPLE DATA", estimate: "Estimate", tagline: "Test the opportunity. Simulate the decision. Start with clarity." },
  ta: { start: "உங்கள் திட்டத்தைத் தொடங்குங்கள்", dashboard: "உங்கள் முடிவு பணியிடம்", radar: "வாய்ப்பு ரேடார்", simulator: "என்ன ஆகும்?", risk: "ஆபத்து சோதனை", finance: "திட்டக் கணிப்பான்", report: "சாத்தியக்கூறு அறிக்கை", saved: "சேமித்த திட்டங்கள்", about: "தரவு & நம்பிக்கை", sample: "மாதிரி தரவு", estimate: "மதிப்பீடு", tagline: "வாய்ப்பை சோதிக்கவும். முடிவை உருவகப்படுத்தவும். தெளிவுடன் தொடங்கவும்." },
  hi: { start: "अपना प्लान शुरू करें", dashboard: "आपका निर्णय कार्यक्षेत्र", radar: "अवसर रडार", simulator: "क्या हो अगर सिम्युलेटर", risk: "जोखिम जांच", finance: "योजना कैलकुलेटर", report: "व्यवहार्यता रिपोर्ट", saved: "सहेजे गए प्लान", about: "डेटा और भरोसा", sample: "नमूना डेटा", estimate: "अनुमान", tagline: "अवसर जांचें। निर्णय का सिमुलेशन करें। स्पष्टता से शुरू करें।" },
};

export function t(language: Language, key: string): string { return translations[language][key] ?? translations.en[key] ?? key; }
