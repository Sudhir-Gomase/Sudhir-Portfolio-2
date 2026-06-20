"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GameCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.28 });
  const ringY = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.28 });
  const trailX = useSpring(cursorX, { stiffness: 240, damping: 32, mass: 0.45 });
  const trailY = useSpring(cursorY, { stiffness: 240, damping: 32, mass: 0.45 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    setEnabled(true);
    document.documentElement.classList.add("game-cursor");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"));
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("game-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const ringClass = hovering ? "h-11 w-11" : clicking ? "h-6 w-6" : "h-8 w-8";
  const trailClass = hovering ? "h-14 w-14" : clicking ? "h-9 w-9" : "h-11 w-11";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <motion.div
        className={`absolute rounded-full border border-brand/25 transition-[width,height] duration-150 ease-out ${trailClass}`}
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%" }}
      />

      <motion.div
        className={`absolute rounded-full border-2 border-brand bg-brand/5 transition-[width,height] duration-150 ease-out ${ringClass}`}
        style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}
      />

      {/* Crosshair lines */}
      <motion.div className="absolute" style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}>
        <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-brand/70" />
        <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-brand/70" />
      </motion.div>

      {/* Center dot — snaps to cursor */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(196,160,82,0.8)]"
        style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
      />
    </div>
  );
}
