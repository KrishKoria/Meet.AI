"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import SpecificAgentViewHeader from "../components/specificAgentViewHeader";

interface SpecificAgentViewProps {
  agentId: string;
}

function SpecificAgentView({ agentId }: SpecificAgentViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <SpecificAgentViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
}

export default SpecificAgentView;
