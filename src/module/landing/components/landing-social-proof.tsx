import { Card, CardContent } from "@/components/ui/card";
import {
  ClockIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

const stats = [
  {
    icon: ClockIcon,
    value: "40%",
    label: "Time Saved",
    description: "Less time spent on meeting notes and follow-ups",
  },
  {
    icon: UsersIcon,
    value: "5,000+",
    label: "Teams",
    description: "Companies using Meet.AI daily",
  },
  {
    icon: MessageSquareIcon,
    value: "2M+",
    label: "Meetings",
    description: "Successfully transcribed and summarized",
  },
  {
    icon: TrendingUpIcon,
    value: "98%",
    label: "Satisfaction",
    description: "Of users recommend Meet.AI to colleagues",
  },
];

const testimonials = [
  {
    quote:
      "Meet.AI has transformed how our team runs meetings. The AI agent is like having a super-powered assistant that never misses anything.",
    author: "Sarah Chen",
    role: "VP of Product",
    company: "TechCorp",
    avatar: "SC",
  },
  {
    quote:
      "The post-meeting summaries alone save us hours every week. But the real magic is having AI participate in real-time discussions.",
    author: "Marcus Johnson",
    role: "Engineering Manager",
    company: "StartupXYZ",
    avatar: "MJ",
  },
  {
    quote:
      "I was skeptical about AI in meetings, but Meet.AI proved me wrong. It's intuitive, powerful, and actually useful.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "InnovateCo",
    avatar: "ER",
  },
];

export function LandingSocialProof() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-background border-border/50"
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4">
                  <stat.icon className="size-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Loved by teams{" "}
            <span className="text-primary">around the world</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about transforming their meetings
            with AI.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border-border/50 hover:border-primary/20 transition-colors"
            >
              <CardContent className="p-6">
                {/* Quote */}
                <div className="mb-6">
                  <svg
                    className="size-8 text-primary/20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-foreground leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company logos */}
        <div className="mt-16 pt-16 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by innovative teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {[
              "Acme Corp",
              "Globex",
              "Initech",
              "Umbrella",
              "Wayne Ent",
              "Stark Ind",
            ].map((company) => (
              <div
                key={company}
                className="text-xl font-bold text-muted-foreground tracking-tight"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
