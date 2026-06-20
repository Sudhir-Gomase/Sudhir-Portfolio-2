"use client";

import { useEffect, useState } from "react";
import { getTimeGreeting } from "@/lib/greeting";
import { cn } from "@/lib/utils";

type TimeGreetingProps = {
  role?: string;
  className?: string;
  variant?: "hero" | "avatar";
};

export default function TimeGreeting({
  role = "Backend Developer",
  className,
  variant = "hero",
}: TimeGreetingProps) {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(getTimeGreeting());

    const interval = window.setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (variant === "avatar") {
    return (
      <p
        className={cn(
          "label-caps whitespace-nowrap text-[10px] tracking-[0.22em] text-brand-dark dark:text-brand sm:text-[11px]",
          className
        )}
      >
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(196,160,82,0.55)]"
            aria-hidden
          />
          {greeting ?? "Hello!"}
        </span>
      </p>
    );
  }

  return (
    <p className={className}>
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_rgba(196,160,82,0.55)]"
          aria-hidden
        />
        {greeting ?? "Hello!"}
      </span>
      <span className="text-ink-faint"> · </span>
      {role}
    </p>
  );
}
