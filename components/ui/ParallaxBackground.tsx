"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <motion.div
        style={{ opacity }}
        className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand/5 blur-3xl"
      />
    </div>
  );
}
