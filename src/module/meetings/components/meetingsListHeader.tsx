"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewMeetingDialog from "./new-meeting-dialog";
import { useState } from "react";
import MeetingsSearchFilter from "./meetingsSearchFilter";
import { StatusFilters } from "./status-filter";
import { AgentFilter } from "./agent-filter";
import useMeetingsFilters from "../hooks/use-meetings-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function MeetingsListHeader() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();
  const isFilterModified =
    !!filters.search || !!filters.agentId || !!filters.status;
  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE, agentId: "", status: null });
  };
  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
      <div className="px-4 py-4 md:px-8 flex-col flex gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilters />
            <AgentFilter />
            {isFilterModified && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                Clear Filter
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

export default MeetingsListHeader;
