"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewMeetingDialog from "./new-meeting-dialog";
import { useState } from "react";

function MeetingsListHeader() {
  const [open, setOpen] = useState(false);
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
        <div className="flex items-center gap-x-2 p-1"></div>
      </div>
    </>
  );
}

export default MeetingsListHeader;
