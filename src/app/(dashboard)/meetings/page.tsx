import { LoadingState } from "@/components/loading-state";
import MeetingsView from "@/module/meetings/views/meetingView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

function MeetingsPage() {
  const client = getQueryClient();
  void client.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
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
  );
}

export default MeetingsPage;
