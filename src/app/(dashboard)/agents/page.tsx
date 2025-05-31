import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import AgentsListHeader from "@/module/agents/components/agentsListHeader";
import AgentsView from "@/module/agents/views/agentsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AgentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const client = getQueryClient();
  void client.prefetchQuery(trpc.agents.getMany.queryOptions({}));
  return (
    <>
      <AgentsListHeader />
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
    </>
  );
}
