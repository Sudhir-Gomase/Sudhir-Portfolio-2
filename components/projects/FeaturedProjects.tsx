"use client";

import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProjectPreview from "@/components/projects/ProjectPreview";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import type { Project } from "@/lib/data";

function StackBlock({
  title,
  stack,
  modules,
}: {
  title: string;
  stack: string[];
  modules: string[];
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas/80 p-5">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-dark dark:text-brand">
        {title}
      </h4>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {stack.map((t) => (
          <span
            key={t}
            className="rounded-md bg-navy/5 px-2 py-0.5 text-[11px] font-medium text-navy dark:bg-white/5 dark:text-brand-light"
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="space-y-1.5">
        {modules.map((m) => (
          <li key={m} className="flex items-start gap-2 text-xs text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedProjectSlide({ project, index }: { project: Project; index: number }) {
  return (
    <article className="surface-card h-full overflow-hidden">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="order-2 p-5 sm:p-7 md:p-8 lg:order-none lg:p-10">
          <span className="label-caps text-brand-dark dark:text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="mb-4 mt-3">
            <span className="text-xs text-ink-faint">{project.role}</span>
          </div>

          <h3 className="font-display text-xl text-ink-heading sm:text-2xl md:text-3xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-2 text-sm font-semibold text-brand-dark dark:text-brand">
              {project.subtitle}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
            {project.longDescription || project.description}
          </p>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Key features
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                  <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5L6.5 12L13 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark dark:bg-brand dark:text-[#0c0e16]"
            >
              Visit live site
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 10L10 4M10 4H5M10 4V9"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        <div className="order-1 flex flex-col border-t border-line bg-canvas-muted/50 p-5 sm:p-6 md:p-8 lg:order-none lg:border-l lg:border-t-0">
          <div className="flex-1">
            <ProjectPreview project={project} />
          </div>
          {project.frontend && project.backend && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 lg:grid-cols-2">
              <StackBlock
                title="Frontend"
                stack={project.frontend.stack}
                modules={project.frontend.modules.slice(0, 3)}
              />
              <StackBlock
                title="Backend"
                stack={project.backend.stack}
                modules={project.backend.modules.slice(0, 3)}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

const SLIDE_GAP = 24;

export default function FeaturedProjects({ featured }: { featured: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => setSlideWidth(viewport.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport || featured.length === 0 || slideWidth === 0) return;

      const next = (index + featured.length) % featured.length;
      viewport.scrollTo({ left: next * (slideWidth + SLIDE_GAP), behavior: "smooth" });
      setActive(next);
    },
    [featured.length, slideWidth]
  );

  const goPrev = useCallback(() => scrollToIndex(active - 1), [active, scrollToIndex]);
  const goNext = useCallback(() => scrollToIndex(active + 1), [active, scrollToIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || featured.length === 0 || slideWidth === 0) return;

    const syncActive = () => {
      const step = slideWidth + SLIDE_GAP;
      const index = Math.round(viewport.scrollLeft / step);
      setActive(Math.min(Math.max(index, 0), featured.length - 1));
    };

    syncActive();
    viewport.addEventListener("scroll", syncActive, { passive: true });

    return () => viewport.removeEventListener("scroll", syncActive);
  }, [featured.length, slideWidth]);

  useGSAP(
    () => {
      registerGsapPlugins();
      const wrap = wrapRef.current;
      if (!wrap) return;

      gsap.fromTo(
        wrap,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: wrapRef }
  );

  if (featured.length === 0) return null;

  const current = featured[active];

  return (
    <div ref={wrapRef} className="invisible mt-8 md:mt-10">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </p>
          <p className="mt-1 truncate font-display text-lg text-ink-heading sm:text-xl">
            {current?.title}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={goPrev}
            data-cursor="hover"
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-lg text-ink-muted shadow-soft transition-colors hover:border-brand/35 hover:text-ink-heading"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            data-cursor="hover"
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-lg text-ink-muted shadow-soft transition-colors hover:border-brand/35 hover:text-ink-heading"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="projects-carousel overflow-x-auto"
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ width: slideWidth > 0 ? featured.length * slideWidth + (featured.length - 1) * SLIDE_GAP : undefined }}
        >
          {featured.map((project, i) => (
            <div
              key={project.id}
              className="shrink-0 snap-start snap-always"
              style={{ width: slideWidth > 0 ? slideWidth : "100%" }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${featured.length}: ${project.title}`}
              aria-hidden={active !== i}
            >
              <FeaturedProjectSlide project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
        {featured.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            data-cursor="hover"
            aria-label={`Go to ${project.title}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2 min-w-[8px] rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-brand" : "w-2 bg-line hover:bg-brand/40"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-faint sm:hidden">
        Swipe to explore projects
      </p>
    </div>
  );
}
