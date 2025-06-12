import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema, agentsUpdateSchema } from "./schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        );
      if (!existingAgent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return existingAgent;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            input.search ? ilike(agents.name, `%${input.search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(input.pageSize)
        .offset((input.page - 1) * input.pageSize);

      const totalCount = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            input.search ? ilike(agents.name, `%${input.search}%`) : undefined
          )
        );
      const totalPages = Math.ceil(totalCount[0].count / input.pageSize);
      return {
        items: data,
        totalCount: totalCount[0].count,
        totalPages,
      };
    }),
  create: premiumProcedure("agents")
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [deletedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();
      if (!deletedAgent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return deletedAgent;
    }),
  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();
      if (!updatedAgent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return updatedAgent;
    }),
});
