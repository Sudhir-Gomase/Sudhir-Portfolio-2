"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollBackgroundShift() {
  const { scrollYProgress } = useScroll();

  const wash1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.6, 0]);
  const wash2 = useTransform(scrollYProgress, [0.15, 0.35, 0.55, 0.75], [0, 1, 0.7, 0]);
  const wash3 = useTransform(scrollYProgress, [0.45, 0.65, 0.85, 1], [0, 0.8, 1, 0.6]);
  const wash4 = useTransform(scrollYProgress, [0.7, 0.9, 1], [0, 1, 0.8]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Light mode washes */}
      <motion.div
        className="absolute inset-0 dark:hidden"
        style={{
          opacity: wash1,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(196,160,82,0.14) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 dark:hidden"
        style={{
          opacity: wash2,
          background:
            "radial-gradient(ellipse 70% 55% at 80% 40%, rgba(30,41,59,0.07) 0%, transparent 65%)",
        }}
      />
      <motion.div
        className="absolute inset-0 dark:hidden"
        style={{
          opacity: wash3,
          background:
            "radial-gradient(ellipse 90% 50% at 50% 80%, rgba(196,160,82,0.1) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="absolute inset-0 dark:hidden"
        style={{
          opacity: wash4,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.04) 50%, rgba(196,160,82,0.06) 100%)",
        }}
      />

      {/* Dark mode washes */}
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          opacity: wash1,
          background:
            "radial-gradient(ellipse 80% 60% at 15% 15%, rgba(196,160,82,0.18) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          opacity: wash2,
          background:
            "radial-gradient(ellipse 75% 55% at 85% 35%, rgba(99,102,241,0.12) 0%, transparent 65%)",
        }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          opacity: wash3,
          background:
            "radial-gradient(ellipse 90% 50% at 50% 75%, rgba(196,160,82,0.14) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          opacity: wash4,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(8,9,15,0.5) 40%, rgba(196,160,82,0.08) 100%)",
        }}
      />
    </div>
  );
}
