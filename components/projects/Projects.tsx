"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".section-reveal"),
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".section-header-wrap"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="projects" ref={ref} className="py-20 md:py-28 md:pr-[38%] lg:pr-[36%]">
      <div className="section-wrap">
        <div className="section-header-wrap">
          <SectionHeader
            index="03 — Work"
            title="Selected projects"
            description="Enterprise systems built at WE-Matter — real products, real architecture."
            className="section-reveal invisible"
          />
        </div>
        <FeaturedProjects featured={projects.filter((p) => p.featured)} />
      </div>
    </section>
  );
}
