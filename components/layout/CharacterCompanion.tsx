"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import TimeGreeting from "@/components/hero/TimeGreeting";
import {
  CHARACTER_JOURNEY_SECTIONS,
  easeSectionBlend,
  getSectionBlend,
  getSectionConfig,
} from "@/lib/characterJourney";
import { characterScroll } from "@/lib/characterScroll";
import { characterConfig, getScrollZoomProgress } from "@/lib/characterConfig";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CharacterCanvas = dynamic(() => import("@/components/hero/CharacterCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-brand/15 ring-1 ring-brand/25" />
    </div>
  ),
});

const { scroll: scrollCfg } = characterConfig;
const SCRUB = 0.28;

type PoseState = {
  xVw: number;
  scale: number;
  yPx: number;
  opacity: number;
};

function isHeroPinActive() {
  const hero = document.getElementById("hero");
  if (!hero) return false;
  return ScrollTrigger.getAll().some(
    (st) => st.vars.trigger === hero && st.vars.pin && st.isActive
  );
}

function computeTargetPose(): PoseState & { sectionIndex: number; side: "left" | "right"; progress: number } {
  if (isHeroPinActive()) {
    const cfg = CHARACTER_JOURNEY_SECTIONS[0];
    const zoom = getScrollZoomProgress(characterScroll.progress);
    const zoomScale = gsap.utils.interpolate(
      scrollCfg.containerScaleMin,
      scrollCfg.containerScaleMax,
      zoom
    );

    return {
      xVw: cfg.xVw,
      scale: cfg.scale * zoomScale,
      yPx: -10 * zoom,
      opacity: characterScroll.opacity,
      sectionIndex: 0,
      side: cfg.side,
      progress: characterScroll.progress,
    };
  }

  const blend = getSectionBlend();
  const eased = easeSectionBlend(blend.t);
  const from = getSectionConfig(blend.from);
  const to = getSectionConfig(blend.to);

  const sectionIndex = eased > 0.5 ? blend.to : blend.from;
  const side = eased > 0.5 ? to.side : from.side;

  return {
    xVw: gsap.utils.interpolate(from.xVw, to.xVw, eased),
    scale: gsap.utils.interpolate(from.scale, to.scale, eased),
    yPx: 0,
    opacity: characterScroll.opacity,
    sectionIndex,
    side,
    progress: eased,
  };
}

export default function CharacterCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const poseRef = useRef<PoseState>({ xVw: 21, scale: 1, yPx: 0, opacity: 1 });
  const roleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const inner = innerRef.current;
      const role = roleRef.current;
      if (!inner) return;

      const applyPose = () => {
        const target = computeTargetPose();
        const current = poseRef.current;
        const smooth = 0.16;

        current.xVw += (target.xVw - current.xVw) * smooth;
        current.scale += (target.scale - current.scale) * smooth;
        current.yPx += (target.yPx - current.yPx) * smooth;
        current.opacity += (target.opacity - current.opacity) * smooth;

        characterScroll.sectionIndex = target.sectionIndex;
        characterScroll.side = target.side;
        if (!isHeroPinActive()) {
          characterScroll.progress = target.progress;
        }

        gsap.set(inner, {
          x: `${current.xVw}vw`,
          y: current.yPx,
          scale: current.scale,
          opacity: current.opacity,
          transformOrigin: "center center",
        });

        if (role) {
          const showRole = isHeroPinActive() && characterScroll.progress > 0.08;
          gsap.set(role, { autoAlpha: showRole ? 1 : 0 });
        }
      };

      gsap.ticker.add(applyPose);

      const hero = document.getElementById("hero");
      if (hero && role) {
        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=95%",
            scrub: SCRUB,
          },
        })
          .fromTo(role, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, ease: "none" }, 0.12)
          .fromTo(
            role.querySelectorAll(".hero-role-line"),
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.06, ease: "none" },
            0.18
          );
      }

      const footer = document.querySelector("footer");
      if (footer) {
        ScrollTrigger.create({
          trigger: footer,
          start: "top 92%",
          end: "top 55%",
          scrub: SCRUB,
          onUpdate: (self) => {
            characterScroll.opacity = 1 - self.progress;
          },
          onLeaveBack: () => {
            characterScroll.opacity = 1;
          },
        });
      }

      return () => {
        gsap.ticker.remove(applyPose);
      };
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[25] hidden md:block"
      aria-hidden
    >
      <div
        ref={innerRef}
        className="character-companion-inner absolute left-1/2 top-[42%] h-[min(72vh,620px)] w-[min(48vw,520px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="absolute -left-2 top-[2%] z-20 sm:left-0 sm:top-[3%]">
          <TimeGreeting variant="avatar" />
        </div>

        <div
          ref={roleRef}
          className="invisible absolute -right-2 top-[14%] z-20 text-right sm:right-0 sm:top-[16%]"
        >
          <p className="hero-role-line text-sm font-medium tracking-wide text-brand-dark dark:text-brand">
            A Backend
          </p>
          <p className="hero-role-line text-stroke font-display text-[clamp(1.5rem,2.8vw,2.75rem)] leading-none">
            Engineer
          </p>
          <p className="hero-role-line font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-none text-ink-heading">
            Developer
          </p>
        </div>

        <CharacterCanvas className="h-full w-full" />
      </div>
    </div>
  );
}
