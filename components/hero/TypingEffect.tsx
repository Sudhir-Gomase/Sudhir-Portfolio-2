"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TypingEffectProps {
  phrases: string[];
  interval?: number;
}

export default function TypingEffect({ phrases, interval = 3500 }: TypingEffectProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className="relative inline-block min-h-[1.5em] text-brand-dark">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="inline-block text-sm font-medium md:text-base"
        >
          → {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
