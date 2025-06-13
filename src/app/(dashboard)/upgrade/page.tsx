import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import UpgradeView from "@/module/premium/views/upgradeView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function UpgradePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const client = getQueryClient();
  void client.prefetchQuery(trpc.premium.getCurrentSubscription.queryOptions());
  void client.prefetchQuery(trpc.premium.getProducts.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Suspense
        fallback={
          <LoadingState title="Loading" description="This may take a moment" />
        }
      >
        <UpgradeView />
      </Suspense>
    </HydrationBoundary>
  );
}

export default UpgradePage;
