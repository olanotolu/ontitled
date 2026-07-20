import type { AccountType } from "@/lib/settings/types";

export type OnboardingStepId =
  | "account-type"
  | "personal"
  | "business"
  | "ownership"
  | "identity"
  | "review";

export type StepDef = {
  id: OnboardingStepId;
  label: string;
  description: string;
  path: string;
};

export function stepsFor(accountType: AccountType | null): StepDef[] {
  if (accountType === "business") {
    return [
      {
        id: "personal",
        label: "Personal details",
        description: "Info about you",
        path: "/onboarding/personal",
      },
      {
        id: "business",
        label: "Business details",
        description: "Info about the business",
        path: "/onboarding/business",
      },
      {
        id: "ownership",
        label: "Ownership details",
        description: "Ownership structure",
        path: "/onboarding/ownership",
      },
      {
        id: "review",
        label: "Review",
        description: "Confirm and submit",
        path: "/onboarding/review",
      },
    ];
  }
  if (accountType === "individual") {
    return [
      {
        id: "personal",
        label: "Personal details",
        description: "Info about you",
        path: "/onboarding/personal",
      },
      {
        id: "identity",
        label: "Identity details",
        description: "Verify your identity",
        path: "/onboarding/identity",
      },
      {
        id: "review",
        label: "Review",
        description: "Confirm and submit",
        path: "/onboarding/review",
      },
    ];
  }
  return [];
}

export function pathForStep(
  accountType: AccountType | null,
  step: OnboardingStepId
): string {
  if (step === "account-type") return "/onboarding";
  const found = stepsFor(accountType).find((s) => s.id === step);
  return found?.path || "/onboarding";
}
