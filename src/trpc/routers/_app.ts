import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/module/agents/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});
export type AppRouter = typeof appRouter;
