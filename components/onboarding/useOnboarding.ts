"use client";

import { useCallback, useEffect, useState } from "react";
import type { AccountType, OnboardingData } from "@/lib/settings/types";
import type { StepDef } from "@/lib/onboarding/steps";

export type OnboardingState = {
  accountType: AccountType | null;
  onboardingCompleted: boolean;
  onboardingStep: string;
  firstName: string;
  lastName: string;
  phone: string;
  handle: string;
  email: string;
  displayName: string;
  onboarding: OnboardingData;
  steps: StepDef[];
};

export function useOnboardingState() {
  const [data, setData] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding/state", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load onboarding state");
      setData((await res.json()) as OnboardingState);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload, setData };
}

export async function saveOnboarding(body: Record<string, unknown>) {
  const res = await fetch("/api/onboarding/save", {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Save failed");
  return json;
}

export async function completeOnboarding() {
  const res = await fetch("/api/onboarding/complete", {
    method: "POST",
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Could not complete");
  return json as { redirectTo: string };
}
