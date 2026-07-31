import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container>
        <div className="flex flex-col gap-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold tracking-[0.2em] text-white">
              ATLAS
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your finance operating system.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ATLAS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}