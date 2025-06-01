import { meetingsRouter } from "@/module/meetings/procedures";
import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/module/agents/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
export type AppRouter = typeof appRouter;
