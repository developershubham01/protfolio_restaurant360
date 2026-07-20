"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Magnetic button — gently follows the cursor and snaps back on leave.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = "button",
  href,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp: any = as;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Comp
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 will-change-transform",
          className,
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
