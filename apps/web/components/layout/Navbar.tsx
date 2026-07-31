import Link from "next/link";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Docs",
    href: "#docs",
  },
  {
    label: "GitHub",
    href: "https://github.com",
  },
];

export function Navbar() {
  return (
    <header className="relative z-50 flex justify-center px-6 pt-6">
      <nav
        className="
          group
          relative
          flex
          w-full
          max-w-6xl
          items-center
          justify-between

          overflow-hidden
          rounded-2xl

          border
          border-white/15

          bg-white/[0.06]

          px-5
          py-3

          shadow-[0_20px_80px_rgba(0,0,0,0.35)]

          backdrop-blur-3xl

          transition-all
          duration-500

          hover:border-white/25
          hover:bg-white/[0.08]
        "
      >

        {/* Glass Reflection */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/20
            via-transparent
            to-transparent
            opacity-60
          "
        />

        {/* Ambient Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -top-20
            left-1/3
            h-40
            w-40
            rounded-full
            bg-indigo-500/20
            blur-3xl
          "
        />


        {/* Content */}
        <div className="relative z-10 flex w-full items-center justify-between">

          {/* Logo */}
          <Logo 
            size="md"
          />


          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  text-sm
                  font-medium
                  text-white/60

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                {item.label}
              </Link>
            ))}
          </div>


          {/* CTA */}
          <Button
            className="
              rounded-xl

              border
              border-white/20

              bg-white/[0.12]

              text-white

              shadow-[0_8px_30px_rgba(99,102,241,0.25)]

              backdrop-blur-xl

              transition-all
              duration-300

              hover:bg-white/[0.18]
              hover:scale-[1.03]
            "
          >
            Get Started
          </Button>

        </div>

      </nav>
    </header>
  );
}