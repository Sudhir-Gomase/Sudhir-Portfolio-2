"use client";

import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import TypingEffect from "@/components/hero/TypingEffect";
import { characterScroll } from "@/lib/characterScroll";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { siteConfig, typingPhrases, stats } from "@/lib/data";

const heroStats = [
  { value: `${stats.yearsExperience}+`, label: "Years experience" },
  { value: `${stats.performanceImprovement}%`, label: "API speed gain" },
  { value: `${stats.errorReduction}%`, label: "Error reduction" },
];

const [firstName, lastName] = siteConfig.name.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-word",
          { y: 72, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09 }
        )
        .fromTo(
          ".hero-line",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07 },
          "-=0.45"
        );

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=95%",
          pin: true,
          scrub: 0.28,
          onUpdate: (self) => {
            characterScroll.progress = self.progress;
          },
        },
      }).to(".hero-content", { y: -48, autoAlpha: 0.35, ease: "none" }, 0.2);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute -left-40 top-16 h-[380px] w-[380px] rounded-full bg-brand/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[90px]" />

      <div className="hero-wrap relative z-10 min-h-[100svh] pt-[76px] pb-10 lg:pt-[88px] lg:pb-14">
        <div className="relative flex min-h-[calc(100svh-76px)] flex-col justify-center lg:min-h-[calc(100svh-88px)]">
          <div className="hero-content relative z-20 flex flex-col justify-center md:max-w-[46%] md:py-12 lg:max-w-[42%]">
            <h1 className="font-display text-display-hero text-ink-heading" aria-label={siteConfig.name}>
              <span className="hero-word block invisible">{firstName}</span>
              <span className="hero-word text-stroke mt-1 block invisible md:mt-2">{lastName}</span>
            </h1>

            <p className="hero-line invisible mt-6 max-w-md text-base leading-[1.75] text-ink-muted md:mt-8 md:text-lg">
              I craft production-grade APIs and cloud systems that scale — from database
              design to AWS deployment.
            </p>

            <div className="hero-line invisible mt-4 md:mt-5">
              <TypingEffect phrases={typingPhrases} />
            </div>

            <div className="hero-line invisible mt-8 flex flex-wrap gap-3 md:mt-10">
              <MagneticButton href="#projects">View my work</MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Get in touch
              </MagneticButton>
            </div>

            <div className="hero-line invisible mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8 md:mt-12 md:gap-6 md:pt-10">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-ink-heading md:text-4xl lg:text-[2.75rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-wider text-ink-faint md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
