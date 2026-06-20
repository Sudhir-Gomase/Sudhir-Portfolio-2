"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  splitBy?: "words" | "characters";
  delay?: number;
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  splitBy = "words",
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const parts = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
      >
        {parts.map((part, i) => (
          <motion.span
            key={`${part}-${i}`}
            variants={itemVariants}
            className="inline-block"
            style={{ marginRight: splitBy === "words" ? "0.3em" : undefined }}
          >
            {part}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
