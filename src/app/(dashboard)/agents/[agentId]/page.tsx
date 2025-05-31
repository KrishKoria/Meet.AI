import { LoadingState } from "@/components/loading-state";
import SpecificAgentView from "@/module/agents/views/specificAgentView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface AgentPageProps {
  params: Promise<{
    agentId: string;
  }>;
}
async function AgentPage({ params }: AgentPageProps) {
  const { agentId } = await params;
  const client = getQueryClient();
  void client.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agent"
            description="Please wait while we load the agent."
          />
        }
      >
        <SpecificAgentView agentId={agentId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default AgentPage;
