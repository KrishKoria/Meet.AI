import { Badge } from "@/components/ui/badge";
import { BotIcon, CalendarIcon, SparklesIcon, VideoIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BotIcon,
    title: "Create Your AI Agent",
    description:
      "Design a custom AI assistant with specific instructions tailored to your meeting needs. Set its personality, expertise areas, and how it should participate.",
    color: "bg-blue-500/10 text-blue-600",
    borderColor: "border-blue-500/20",
  },
  {
    number: "02",
    icon: CalendarIcon,
    title: "Schedule a Meeting",
    description:
      "Create a meeting and invite your AI agent along with human participants. The agent is ready to join and contribute from the start.",
    color: "bg-purple-500/10 text-purple-600",
    borderColor: "border-purple-500/20",
  },
  {
    number: "03",
    icon: VideoIcon,
    title: "Run Your Meeting",
    description:
      "Start your video call with real-time transcription. Your AI agent listens, responds to questions, takes notes, and tracks action items automatically.",
    color: "bg-amber-500/10 text-amber-600",
    borderColor: "border-amber-500/20",
  },
  {
    number: "04",
    icon: SparklesIcon,
    title: "Get Instant Insights",
    description:
      "After the meeting, receive an AI-generated summary with key decisions, action items, and follow-ups. Continue chatting with your AI for any clarifications.",
    color: "bg-emerald-500/10 text-emerald-600",
    borderColor: "border-emerald-500/20",
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-0"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get started in{" "}
            <span className="text-primary">four simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From setup to insights in minutes. Meet.AI is designed to be
            intuitive and powerful from day one.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? "lg:text-right lg:pr-16"
                      : "lg:text-left lg:pl-16"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-5xl font-bold text-muted-foreground/20">
                      {step.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center`}
                    >
                      <step.icon className="size-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 lg:left-1/2 top-6 -translate-x-1/2 hidden md:flex">
                  <div
                    className={`w-4 h-4 rounded-full bg-primary ring-4 ring-background`}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
