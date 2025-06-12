import { inngest } from "@/app/inngest/client";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { generateAvatarUrl } from "@/lib/avatar";
import { streamChat } from "@/lib/stream-chat";
import { client } from "@/lib/stream-video";
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
  MessageNewEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const aiClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!,
  baseURL: "https://api.deepseek.com",
});
function verifySignatureSDK(signature: string, body: string): boolean {
  return client.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");
  const apiKey = request.headers.get("x-api-key");
  if (!signature || !apiKey) {
    return NextResponse.json(
      {
        error: "Missing signature or API key",
      },
      { status: 400 }
    );
  }
  const body = await request.text();
  if (!verifySignatureSDK(signature, body)) {
    return NextResponse.json(
      {
        error: "Invalid signature",
      },
      { status: 401 }
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid JSON",
      },
      { status: 400 }
    );
  }
  const eventType = (payload as Record<string, unknown>)?.type;
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meetingId in call session started event",
        },
        { status: 400 }
      );
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    if (!existingMeeting) {
      return NextResponse.json(
        {
          error: "Meeting not found or already completed",
        },
        { status: 404 }
      );
    }
    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));
    if (!existingAgent) {
      return NextResponse.json(
        {
          error: "Agent not found",
        },
        { status: 404 }
      );
    }

    const call = client.video.call("default", meetingId);
    const realtimeClient = await client.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_SECRET_KEY!,
      agentUserId: existingAgent.id,
    });

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meetingId in call session participant left event",
        },
        { status: 400 }
      );
    }
    const call = client.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meetingId in call session ended event",
        },
        { status: 400 }
      );
    }
    await db
      .update(meetings)
      .set({
        status: "processing",
        endedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
    const call = client.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meetingId in call transcription ready event",
        },
        { status: 400 }
      );
    }
    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcript_url: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json(
        {
          error: "Meeting not found",
        },
        { status: 404 }
      );
    }

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcript_url: updatedMeeting.transcript_url,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({
        recording_url: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  } else if (eventType === "message.new") {
    const event = payload as MessageNewEvent;
    const userId = event.user?.id;
    const channelId = event.channel_id;
    const text = event.message?.text;
    if (!userId || !channelId || !text) {
      return NextResponse.json(
        {
          error: "Missing userId, channelId or text in message new event",
        },
        { status: 400 }
      );
    }
    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));
    if (!existingMeeting) {
      return NextResponse.json(
        {
          error: "Meeting not found or not completed",
        },
        { status: 404 }
      );
    }
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));
    if (!existingAgent) {
      return NextResponse.json(
        {
          error: "Agent not found",
        },
        { status: 404 }
      );
    }
    if (userId !== existingAgent.id) {
      const instructions = `
      You are an AI assistant helping the user revisit a recently completed meeting.
      Below is a summary of the meeting, generated from the transcript:
      
      ${existingMeeting.summary}
      
      The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
      
      ${existingAgent.instructions}
      
      The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
      Always base your responses on the meeting summary above.
      
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.
      
      Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
      `;

      const channel = streamChat.channel("messaging", channelId);
      await channel.watch();
      const previousMessages = channel.state.messages
        .slice(-5)
        .filter((msg) => msg.text && msg.text.trim() !== "")
        .map<ChatCompletionMessageParam>((msg) => ({
          role: msg.user?.id === existingAgent.id ? "assistant" : "user",
          content: msg.text || "",
        }));
      const aiResponse = await aiClient.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: instructions,
          },
          ...previousMessages,
          {
            role: "user",
            content: text,
          },
        ],
      });
      const responseText = aiResponse.choices[0].message.content;
      if (!responseText) {
        return NextResponse.json(
          {
            error: "AI response is empty",
          },
          { status: 400 }
        );
      }
      const avatarUrl = generateAvatarUrl({
        seed: existingAgent.name,
        variant: "botttsNeutral",
      });
      streamChat.upsertUser({
        id: existingAgent.id,
        name: existingAgent.name,
        image: avatarUrl,
      });
      channel.sendMessage({
        text: responseText,
        user: {
          id: existingAgent.id,
          name: existingAgent.name,
          image: avatarUrl,
        },
      });
    }
  }
  return NextResponse.json({ status: "ok" });
}
