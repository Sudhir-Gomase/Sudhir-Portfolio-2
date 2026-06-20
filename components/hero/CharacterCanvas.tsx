"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import CharacterModel from "@/components/hero/CharacterModel";
import { characterConfig } from "@/lib/characterConfig";
import { cn } from "@/lib/utils";

const { scroll: scrollCfg } = characterConfig;

function LoadingPulse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-brand/15 ring-1 ring-brand/25" />
    </div>
  );
}

export default function CharacterCanvas({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("relative min-h-[360px] w-full", className)}>
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className={cn("relative h-full min-h-[360px] w-full", className)}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-brand/20 blur-[90px]"
        aria-hidden
      />
      <Canvas
        shadows
        camera={{ position: [0, scrollCfg.cameraY, scrollCfg.cameraZStart], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="relative z-10"
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
