"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./new-agent-dialog";
import { useState } from "react";
import useAgentsFilters from "../hooks/use-agents-filters";
import AgentsSearchFilter from "./agentsSearchFilter";
import { DEFAULT_PAGE } from "@/constants";

function AgentsListHeader() {
  const [filter, setFilter] = useAgentsFilters();
  const [open, setOpen] = useState(false);
  const isFilterModified = !!filter.search;
  const onClearFilters = () => {
    setFilter({ search: "", page: DEFAULT_PAGE });
  };

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="px-4 py-4 md:px-8 flex-col flex gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear Filter
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default AgentsListHeader;
