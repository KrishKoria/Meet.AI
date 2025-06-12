import { meetingsRouter } from "@/module/meetings/procedures";
import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/module/agents/procedures";
import { premiumRouter } from "@/module/premium/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  premium: premiumRouter,
});
export type AppRouter = typeof appRouter;
