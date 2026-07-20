import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding — [Ontitled]",
  description: "Set up your Ontitled account",
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children;
}
