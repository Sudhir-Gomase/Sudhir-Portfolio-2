"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const HERO_PROFILE_SRC = "/hero/profile.jpg";

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 615;

type HeroProfileProps = {
  className?: string;
  /** Blends photo wall into page — no card frame */
  seamless?: boolean;
};

export default function HeroProfile({ className, seamless = false }: HeroProfileProps) {
  const image = (
    <Image
      src={HERO_PROFILE_SRC}
      alt="Sudhir Gomase — Backend Developer"
      width={IMAGE_WIDTH}
      height={IMAGE_HEIGHT}
      priority
      quality={100}
      unoptimized
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 620px"
      className="h-auto w-full object-contain"
      draggable={false}
    />
  );

  if (seamless) {
    return (
      <div className={cn("relative w-full bg-hero-photo", className)}>
        {image}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-elevated">
        {image}
      </div>
    </div>
  );
}
