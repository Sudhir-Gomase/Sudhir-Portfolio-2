"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/data";

const PREVIEW_WIDTH = 480;
const PREVIEW_HEIGHT = 300;
const THUMB_WIDTH = 72;

export default function ProjectPreview({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  if (shots.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-line bg-canvas-muted">
        <span className="text-sm text-ink-faint">{project.title}</span>
      </div>
    );
  }

  const current = shots[active];

  const scrollToThumb = (index: number) => {
    setActive(index);
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
  };

  return (
    <div className="mx-auto w-full max-w-[500px]">
      <div className="overflow-hidden rounded-xl border border-line bg-[#eef1f5] shadow-soft dark:bg-[#1a1d28]">
        <div
          className="screenshot-viewport overflow-auto"
          style={{ height: PREVIEW_HEIGHT, maxWidth: PREVIEW_WIDTH, margin: "0 auto" }}
        >
          <div className="inline-flex min-w-full justify-center p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.src}
              src={current.src}
              alt={current.caption}
              draggable={false}
              className="block h-auto shrink-0 select-none"
              style={{ width: PREVIEW_WIDTH }}
            />
          </div>
        </div>
        <div className="border-t border-line bg-surface px-4 py-2.5">
          <p className="text-xs font-medium text-ink-muted">{current.caption}</p>
        </div>
      </div>

      {shots.length > 1 && (
        <div ref={stripRef} className="screenshot-strip mt-3 flex max-w-full gap-1.5 overflow-x-auto pb-1.5 pt-0.5">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => scrollToThumb(i)}
              data-cursor="hover"
              style={{ width: THUMB_WIDTH }}
              className={`relative h-10 shrink-0 overflow-hidden rounded-md border transition-colors ${
                i === active
                  ? "border-brand bg-brand/5 ring-1 ring-brand/30"
                  : "border-line bg-surface opacity-75 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.caption} className="h-full w-full object-contain object-top p-0.5" />
            </button>
          ))}
        </div>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-dark transition-colors hover:text-navy dark:hover:text-brand"
        >
          View live product
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  );
}
