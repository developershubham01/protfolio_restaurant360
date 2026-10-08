"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Clean card container without mouse tilt/glare effects.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}
