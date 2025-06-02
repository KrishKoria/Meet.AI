"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import useAgentsFilters from "../hooks/use-agents-filters";
import DataPagination from "../components/pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { useDebounce } from "@/hooks/use-debounce";

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFilters();
  const router = useRouter();
  const trpc = useTRPC();
  const deferredSearch = useDebounce(filters.search, 300);
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters, search: deferredSearch })
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No Agents Found"
          description="Try creating a new agent. The agents will join your meetings and help you with tasks."
        />
      )}
    </div>
  );
}
