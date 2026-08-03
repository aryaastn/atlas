import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: {
    icon: "h-9 w-9",
    text: "text-lg",
    subtitle: "text-[11px]",
  },
  md: {
    icon: "h-10 w-10",
    text: "text-xl",
    subtitle: "text-xs",
  },
  lg: {
    icon: "h-14 w-14",
    text: "text-[34px]",
    subtitle: "text-sm",
  },
} as const;

export function Logo({
  compact = false,
  showText = true,
  size = "md",
  className,
}: LogoProps) {
  const styles = sizeClasses[size];

  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          styles.icon,
        )}
      >
        <Image
          src="/brand/atlas-symbol.svg"
          alt="ATLAS"
          fill
          priority
          className="object-contain"
        />
      </div>

      {!compact && showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold leading-none tracking-[-0.06em] text-white",
              styles.text,
            )}
          >
            {siteConfig.name}
          </span>

          <span
            className={cn(
              "mt-1 leading-none text-white/55",
              styles.subtitle,
            )}
          >
            {siteConfig.description}
          </span>
        </div>
      )}
    </div>
  );
}