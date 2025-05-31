"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return <ErrorState title="Error" description="Failed to load the agent." />;
}
