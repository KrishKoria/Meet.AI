import ResponsiveDialog from "@/components/responsive-dialog";
import { MeetingGetOne } from "../types";
import MeetingForm from "./meetingForm";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

function UpdateMeetingDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Meeting"
      description="Update an existing meeting"
    >
      <MeetingForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}

export default UpdateMeetingDialog;
