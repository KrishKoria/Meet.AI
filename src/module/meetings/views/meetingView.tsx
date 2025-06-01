"use client";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
      {data.items.length === 0 && (
        <EmptyState
          title="No Meetings Found"
          description="Try creating a new meeting. The meetings will help you manage your tasks."
        />
      )}
    </div>
  );
}

export default MeetingsView;
