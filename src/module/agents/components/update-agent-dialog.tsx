import ResponsiveDialog from "@/components/responsive-dialog";
import AgentForm from "./agentForm";
import { AgentGetOne } from "../types";

interface UpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Agent"
      description="Update an existing agent"
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}

export default UpdateAgentDialog;
