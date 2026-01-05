import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/95 to-sidebar" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <SparklesIcon className="size-4 text-primary" />
          <span className="text-sm text-white/80">
            Start your 14-day free trial today
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Ready to transform{" "}
          <span className="text-primary">your meetings?</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Join thousands of teams who have already revolutionized how they meet,
          collaborate, and get things done with AI-powered assistance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-12 px-8 text-base bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="/sign-up">
              Get Started Free
              <ArrowRightIcon className="size-4 ml-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/50">
          No credit card required. Free plan available.
        </p>
      </div>
    </section>
  );
}
