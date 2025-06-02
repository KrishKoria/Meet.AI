import CommandSelect from "@/components/command-select";
import { useTRPC } from "@/trpc/client";
import useMeetingsFilters from "../hooks/use-meetings-filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { GenerateAvatar } from "@/components/generate-avatar";

export const AgentFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();
  const [agents, setAgents] = useState("");
  const debouncedAgents = useDebounce(agents, 300);
  const { data: agentsData } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: debouncedAgents,
    })
  );
  return (
    <CommandSelect
      className="h-9"
      placeholder="Filter by agent"
      value={filters.agentId ?? ""}
      options={(agentsData?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GenerateAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgents}
    ></CommandSelect>
  );
};
