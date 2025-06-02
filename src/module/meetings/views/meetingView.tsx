"use client";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import useMeetingsFilters from "../hooks/use-meetings-filters";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import DataPagination from "@/components/pagination";

function MeetingsView() {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const deferredSearch = useDebounce(filters.search, 300);
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
      search: deferredSearch,
    })
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
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
