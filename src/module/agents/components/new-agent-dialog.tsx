import ResponsiveDialog from "@/components/responsive-dialog";
import AgentForm from "./agentForm";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function NewAgentDialog({ open, onOpenChange }: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      description="Create a new agent"
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}

export default NewAgentDialog;
