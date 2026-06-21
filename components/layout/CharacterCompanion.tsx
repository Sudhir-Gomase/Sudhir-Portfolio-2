"use client";

import { useEffect, useRef, useState } from "react";
import { getAvatarBreakpoint } from "@/lib/avatarLayout";
import { characterScroll } from "@/lib/characterScroll";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

export default function CharacterCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const update = () => setBreakpoint(getAvatarBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();
      const role = roleRef.current;
      if (!role) return;

      const applyPose = () => {
        const inHero = characterScroll.inHero;
        const bp = getAvatarBreakpoint(window.innerWidth);
        gsap.set(role, { autoAlpha: inHero && bp !== "mobile" ? 1 : 0 });
      };

      gsap.ticker.add(applyPose);

      return () => {
        gsap.ticker.remove(applyPose);
      };
    },
    { scope: wrapRef, dependencies: [breakpoint] }
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[15] overflow-hidden"
      aria-hidden
    >
      <div
        ref={roleRef}
        className="invisible absolute top-[calc(var(--nav-h)+1.5rem)] z-20 hidden text-right md:block md:top-[calc(var(--nav-h)+2rem)] lg:top-[calc(var(--nav-h)+2.5rem)]"
      >
        <p className="text-sm font-medium tracking-wide text-brand">A Backend</p>
        <p className="text-stroke font-display text-[clamp(1.2rem,2vw,2.25rem)] leading-none">
          Engineer
        </p>
        <p className="font-display text-[clamp(1.35rem,2.4vw,2.65rem)] leading-none text-ink-heading">
          Developer
        </p>
      </div>
    </div>
  );
}
