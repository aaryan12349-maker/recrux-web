"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="app-shell">{children}</div>;
  }

  return (
    <div className="app-shell">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.995,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
          y: {
            type: "spring",
            stiffness: 92,
            damping: 22,
            mass: 1,
          },
          scale: {
            type: "spring",
            stiffness: 120,
            damping: 24,
            mass: 0.95,
          },
        }}
        style={{ willChange: "transform, opacity" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
}
