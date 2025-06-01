"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return <div className="">{JSON.stringify(data, null, 2)}</div>;
}

export default MeetingsView;
