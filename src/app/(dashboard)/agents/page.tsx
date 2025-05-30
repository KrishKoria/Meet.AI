import { LoadingState } from "@/components/loading-state";
import AgentsView from "@/module/agents/views/agentsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function AgentsPage() {
  const client = getQueryClient();
  void client.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="Please wait while we load the agents."
          />
        }
      >
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  );
}
