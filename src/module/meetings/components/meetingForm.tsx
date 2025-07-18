import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingGetOne } from "../types";
import { useState } from "react";
import CommandSelect from "@/components/command-select";
import { GenerateAvatar } from "@/components/generate-avatar";
import NewAgentDialog from "@/module/agents/components/new-agent-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

function MeetingForm({ onSuccess, onCancel, initialValues }: MeetingFormProps) {
  const trpc = useTRPC();
  const client = useQueryClient();
  const router = useRouter();
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const debouncedAgentSearch = useDebounce(agentSearch, 300);
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: debouncedAgentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await client.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        await client.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await client.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        if (initialValues?.id) {
          await client.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: initialValues || {
      name: "",
      agentId: "",
    },
  });
  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (data: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({
        id: initialValues.id,
        ...data,
      });
    } else {
      createMeeting.mutate(data);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={() => setOpenNewAgentDialog(false)}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Meeting Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items || []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GenerateAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-6 border"
                          />
                          <span className="font-medium">{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not sure which agent to use? You can{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create a new agent.
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant={"ghost"}
                type="button"
                disabled={isPending}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Meeting"
                : "Create Meeting"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default MeetingForm;
