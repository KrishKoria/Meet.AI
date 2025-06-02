import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface CallPageProps {
  params: Promise<{
    meetingId: string;
  }>;
}

async function CallPage({ params }: CallPageProps) {
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
      <CallView />
    </HydrationBoundary>
  );
}

export default CallPage;
