import { Card, CardContent } from "@/components/ui/card";
import {
  BotIcon,
  BrainIcon,
  FileTextIcon,
  GlobeIcon,
  MessageSquareIcon,
  MicIcon,
  ShieldCheckIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";

const features = [
  {
    icon: BotIcon,
    title: "Smart AI Agents",
    description:
      "Create custom AI assistants with tailored instructions that understand your business context and participate meaningfully in discussions.",
  },
  {
    icon: MicIcon,
    title: "Real-time Voice AI",
    description:
      "AI agents respond to voice input instantly, providing answers, taking notes, and contributing to conversations naturally.",
  },
  {
    icon: FileTextIcon,
    title: "Live Transcription",
    description:
      "Automatic, real-time transcription with speaker identification. Never miss a word, even in fast-paced discussions.",
  },
  {
    icon: BrainIcon,
    title: "Intelligent Summaries",
    description:
      "Get comprehensive AI-generated summaries with key insights, action items, and follow-ups after every meeting.",
  },
  {
    icon: MessageSquareIcon,
    title: "Post-Meeting Chat",
    description:
      "Continue conversations with context-aware AI that remembers everything discussed and helps with follow-up questions.",
  },
  {
    icon: VideoIcon,
    title: "HD Video Calls",
    description:
      "Crystal clear video conferencing powered by Stream with screen sharing, recording, and mobile support.",
  },
  {
    icon: ZapIcon,
    title: "Instant Actions",
    description:
      "AI tracks commitments, deadlines, and action items automatically. Get reminders and follow-up suggestions.",
  },
  {
    icon: GlobeIcon,
    title: "Works Everywhere",
    description:
      "Join from any device with a fully responsive experience. Desktop, tablet, or mobile — always ready.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant, end-to-end encryption, and granular access controls. Your data stays yours.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need for{" "}
            <span className="text-primary">smarter meetings</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-powered transcription to intelligent summaries, Meet.AI
            gives your team superpowers to collaborate more effectively.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
