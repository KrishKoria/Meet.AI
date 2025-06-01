"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import SpecificAgentViewHeader from "../components/specificAgentViewHeader";
import { GenerateAvatar } from "@/components/generate-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useConfirm from "@/hooks/use-confirm";

interface SpecificAgentViewProps {
  agentId: string;
}

function SpecificAgentView({ agentId }: SpecificAgentViewProps) {
  const router = useRouter();
  const client = useQueryClient();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const removeAgentMutation = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await client.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        // client.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this agent?",
    `The agent and all associated ${data.meetingCount} meetings will be permanently removed and cannot be recovered.`
  );
  const handleRemove = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) return;
    await removeAgentMutation.mutateAsync({ id: agentId });
  };
  return (
    <>
      <RemoveConfirmation />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <SpecificAgentViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {}}
          onRemove={() => handleRemove()}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GenerateAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
            </div>
            <h2 className="text-2xl font-medium">{data.name}</h2>
            <Badge
              variant={"outline"}
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificAgentView;
