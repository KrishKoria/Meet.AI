"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingDetailsViewHeader from "../components/meetingDetailsViewHeader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useConfirm from "@/hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { useState } from "react";
import UpcomingState from "../components/states/upcoming-state";
import ActiveState from "../components/states/active-state";
import CancelledState from "../components/states/cancel-state";
import ProcessingState from "../components/states/processing-state";
import CompletedState from "../components/states/complete-state";
interface MeetingDetailsProps {
  meetingId: string;
}

function MeetingDetailsView({ meetingId }: MeetingDetailsProps) {
  const trpc = useTRPC();
  const client = useQueryClient();
  const router = useRouter();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const removeMeetingMutation = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await client.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this meeting?",
    `The meeting will be permanently removed and cannot be recovered.`
  );
  const handleRemove = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) return;
    await removeMeetingMutation.mutateAsync({ id: meetingId });
  };
  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 flex flex-col py-4 px-4 md:px-8 gap-y-4">
        <MeetingDetailsViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemove}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancel={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
}

export default MeetingDetailsView;
