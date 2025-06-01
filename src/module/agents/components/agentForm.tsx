import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GenerateAvatar } from "@/components/generate-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { on } from "events";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

function AgentForm({ onSuccess, onCancel, initialValues }: AgentFormProps) {
  const trpc = useTRPC();
  const client = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await client.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await client.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        if (initialValues?.id) {
          await client.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: initialValues || {
      name: "",
      instructions: "",
    },
  });
  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (data: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({
        id: initialValues.id,
        ...data,
      });
    } else {
      createAgent.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <GenerateAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agent Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful assistant that can answer questions about the weather."
                />
              </FormControl>
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
            {isPending ? "Saving..." : isEdit ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AgentForm;
