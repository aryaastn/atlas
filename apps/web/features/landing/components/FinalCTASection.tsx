import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

export function FinalCTASection() {
  return (
    <Section>
      <Container>
        <GlassCard className="relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
              <Sparkles size={23} />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Take control of your financial world.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Bring your accounts, transactions, goals, and investments into
              one clear financial operating system.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
            >
              Open ATLAS
              <ArrowRight size={18} />
            </Link>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}