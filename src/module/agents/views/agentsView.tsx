"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function AgentsView() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );
  if (isLoading)
    return (
      <LoadingState
        title="Loading Agents"
        description="Please wait while we load the agents."
      />
    );
  if (isError) return <div>Error loading agents</div>;
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
