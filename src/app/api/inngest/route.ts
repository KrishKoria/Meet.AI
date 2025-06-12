import { inngest } from "@/app/inngest/client";
import { MeetingsProcessing } from "@/app/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [MeetingsProcessing],
});
