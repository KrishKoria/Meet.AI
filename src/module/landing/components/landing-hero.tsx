"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, PlayIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const rotatingWords = ["Intelligent", "Efficient", "Collaborative", "Powerful"];

export function LandingHero() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0 hover:bg-primary/15"
            >
              <SparklesIcon className="size-3.5 mr-1" />
              Introducing AI-Powered Meetings
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Make Your Meetings{" "}
            <span className="relative">
              <span className="text-primary relative z-10 inline-block min-w-[280px] sm:min-w-[320px] md:min-w-[400px]">
                <span
                  key={currentWord}
                  className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  {rotatingWords[currentWord]}
                </span>
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C50 4 100 2 150 3C200 4 250 7 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your meetings with AI agents that don&apos;t just attend —
            they participate, understand context, and help you achieve more. Get
            real-time transcription, smart summaries, and actionable insights.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/sign-up">
                Start Free Trial
                <ArrowRightIcon className="size-4 ml-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="#demo">
                <PlayIcon className="size-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary border-2 border-background flex items-center justify-center text-xs text-white font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>
                <strong className="text-foreground">5,000+</strong> teams trust
                us
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="size-4 text-yellow-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-1">
                <strong className="text-foreground">4.9/5</strong> rating
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative mx-auto max-w-5xl">
            {/* Browser mockup */}
            <div className="rounded-xl border bg-card shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-background/80 rounded-md text-xs text-muted-foreground">
                    meet.ai/call/demo-meeting
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="aspect-[16/9] bg-gradient-to-br from-sidebar via-sidebar/95 to-sidebar relative">
                {/* Simulated meeting UI */}
                <div className="absolute inset-4 grid grid-cols-3 gap-4">
                  {/* Main video area */}
                  <div className="col-span-2 bg-black/30 rounded-lg flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                      <p className="text-white/80 text-sm font-medium">
                        You&apos;re presenting
                      </p>
                    </div>
                  </div>
                  {/* Sidebar with AI agent and participant */}
                  <div className="flex flex-col gap-4">
                    {/* AI Agent */}
                    <div className="flex-1 bg-primary/20 rounded-lg border border-primary/30 flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-primary/30 mb-3 flex items-center justify-center animate-pulse">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <p className="text-white text-xs font-medium">
                        AI Assistant
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary text-[10px]">
                          Listening...
                        </span>
                      </div>
                    </div>
                    {/* Participant */}
                    <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 mb-3 flex items-center justify-center">
                        <span className="text-2xl">👩</span>
                      </div>
                      <p className="text-white/80 text-xs font-medium">Sarah</p>
                    </div>
                  </div>
                </div>
                {/* Bottom controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  {["🎤", "📹", "💬", "📋", "🔴"].map((emoji, i) => (
                    <button
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                        i === 4
                          ? "bg-red-500/80"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                {/* Transcription overlay */}
                <div className="absolute bottom-20 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <p className="text-white/60 text-xs mb-1">
                    Live Transcription
                  </p>
                  <p className="text-white text-sm">
                    &ldquo;...and that&apos;s why I think we should focus on the
                    Q2 roadmap first.
                    <span className="text-primary">
                      {" "}
                      AI: I&apos;ve noted that as an action item.
                    </span>
                    &rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
