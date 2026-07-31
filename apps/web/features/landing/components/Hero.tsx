import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section className="flex min-h-screen items-center">
      <Container>
        <GlassCard
          className="
            mx-auto
            max-w-5xl
            px-10
            py-16
            lg:px-20
            lg:py-20
            shadow-[0_40px_120px_rgba(99,102,241,0.20)]
          "
        >
          {/* Brand Header */}
          <header className="flex items-center gap-6">
            <Image
              src="/brand/atlas-symbol.svg"
              alt="ATLAS Logo"
              width={82}
              height={82}
              priority
              className="shrink-0"
            />
            <div>
              <h1 className="text-5xl font-black tracking-[-0.06em] leading-none text-white">
                ATLAS
              </h1>
              <p className="mt-2 text-lg leading-none text-white/55">
                Your Financial Operating System
              </p>
            </div>
          </header>

          {/* Hero Content */}
          <div className="mt-14 flex flex-col items-center text-center">
            <Badge>Personal Finance Operating System</Badge>

            <Heading
              className="mt-8 max-w-3xl"
              title="Take Control of Your Financial Future"
              description="ATLAS helps you track, analyze, and optimize every rupiah with a beautiful dashboard built for modern investors."
            />

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="
                  rounded-2xl
                  bg-indigo-500
                  px-8
                  hover:bg-indigo-400
                  shadow-xl
                  shadow-indigo-500/30
                "
              >
                Start Free
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  rounded-2xl
                  border-white/20
                  bg-white/5
                  px-8
                  backdrop-blur-xl
                  hover:bg-white/10
                "
              >
                Live Demo
              </Button>
            </div>

            <p className="mt-8 text-sm text-white/45">
              Built for developers, investors, and finance enthusiasts.
            </p>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}