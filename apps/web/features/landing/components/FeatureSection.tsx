import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";


const features = [
  {
    title: "Smart Dashboard",
    description:
      "Monitor your complete financial condition in one place.",
  },
  {
    title: "Portfolio Tracking",
    description:
      "Track assets and investment performance.",
  },
  {
    title: "AI Insights",
    description:
      "Understand your financial behavior with intelligent analysis.",
  },
];


export function FeatureSection() {
  return (
    <Section>
      <Container>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Everything you need to master your money
          </h2>

          <p className="mt-4 text-muted-foreground">
            Built as your personal financial operating system.
          </p>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <GlassCard
              key={feature.title}
              className="p-6"
            >

              <h3 className="text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>

            </GlassCard>
          ))}

        </div>

      </Container>
    </Section>
  );
}