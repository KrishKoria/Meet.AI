import { Button } from "@/components/ui/button";
import Link from "next/link";

function CallEnded() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="flex flex-1 py-4 px-8 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">You have left the call</h6>
            <p className="text-sm">
              Summary of the call will be available in the meeting history.
            </p>
          </div>
          <Button asChild>
            <Link href={"/meetings"}>Back to Meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CallEnded;
