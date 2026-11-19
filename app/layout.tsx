import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VillagePulse AI | Start with clarity",
  description: "A practical opportunity and loan decision workspace for rural entrepreneurs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
