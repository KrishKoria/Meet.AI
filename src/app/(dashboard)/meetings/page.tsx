import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingsListHeader from "@/module/meetings/components/meetingsListHeader";
import { loadSearchParams } from "@/module/meetings/params";
import MeetingsView from "@/module/meetings/views/meetingView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type { SearchParams } from "nuqs";

interface MeetingsPageProps {
  searchParams: Promise<SearchParams>;
}

async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const filters = await loadSearchParams(searchParams);
  const client = getQueryClient();
  void client.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(client)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Meetings"
              description="Please wait while we load the meetings."
            />
          }
        >
          <MeetingsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default MeetingsPage;
