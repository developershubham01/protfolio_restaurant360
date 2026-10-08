"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

/**
 * Clean, simple button without jarring mouse-follow physics.
 */
export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const Comp: any = as;

  return (
    <div className="inline-block">
      <Comp
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200",
          className,
        )}
      >
        {children}
      </Comp>
    </div>
  );
}
