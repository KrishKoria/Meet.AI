import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingDetailsView from "@/module/meetings/views/meetingDetailsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface MeetingPageProps {
  params: Promise<{ meetingId: string }>;
}

async function MeetingPage({ params }: MeetingPageProps) {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const client = getQueryClient();
  void client.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
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
        <MeetingDetailsView meetingId={meetingId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default MeetingPage;
