"use client";

import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("mb-8 md:mb-10", align === "center" && "text-center", className)}
    >
      <span
        className={cn(
          "label-caps mb-4 inline-block text-brand-dark",
          align === "center" && "block"
        )}
      >
        {index}
      </span>

      <AnimatedHeading
        text={title}
        as="h2"
        className="font-display text-display-lg text-ink-heading"
      />

      {description && (
        <p
          className={cn(
            "mt-4 max-w-lg text-base leading-relaxed text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
