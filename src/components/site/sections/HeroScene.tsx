"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ChefHat,
  Utensils,
  UserRound,
  BarChart3,
  Bot,
  Boxes,
  Bike,
  Tablet,
  RefreshCw,
  Receipt,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FloatItem = {
  icon: React.ReactNode;
  label: string;
  sub: string;
  className: string;
  depth: number;
  delay: number;
  accent?: "orange" | "amber";
};

const ITEMS: FloatItem[] = [
  {
    icon: <Receipt className="size-5" />,
    label: "POS Billing",
    sub: "Table 12 · ₹1,840",
    className: "left-[2%] top-[14%]",
    depth: 60,
    delay: 0,
    accent: "orange",
  },
  {
    icon: <LayoutDashboard className="size-5" />,
    label: "Kitchen Display",
    sub: "4 preparing",
    className: "right-[1%] top-[8%]",
    depth: 90,
    delay: 0.6,
    accent: "amber",
  },
  {
    icon: <ChefHat className="size-5" />,
    label: "Chef",
    sub: "On duty",
    className: "left-[6%] top-[52%]",
    depth: 40,
    delay: 1.2,
  },

  {
    icon: <UserRound className="size-5" />,
    label: "Customer",
    sub: "Gold member",
    className: "left-[14%] bottom-[6%]",
    depth: 55,
    delay: 0.9,
  },
  {
    icon: <BarChart3 className="size-5" />,
    label: "Analytics",
    sub: "+18% revenue",
    className: "right-[12%] bottom-[8%]",
    depth: 85,
    delay: 1.5,
    accent: "amber",
  },
  {
    icon: <Bot className="size-5" />,
    label: "AI Hologram",
    sub: "Forecast ready",
    className: "left-[44%] top-[2%]",
    depth: 110,
    delay: 0.4,
    accent: "orange",
  },
  {
    icon: <Boxes className="size-5" />,
    label: "Inventory",
    sub: "Stock OK",
    className: "left-[40%] bottom-[0%]",
    depth: 50,
    delay: 1.1,
  },
];

export function HeroScene() {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      className="perspective-2000 relative mx-auto aspect-square w-full max-w-[560px]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(251,146,60,0.35),transparent_60%)] blur-2xl" />

      {/* Rotating cloud-sync rings */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-300/40"
            style={{
              width: 240 + i * 130,
              height: 240 + i * 130,
              left: -(120 + i * 65),
              top: -(120 + i * 65),
              transform: `rotateX(${72 - i * 4}deg)`,
            }}
            animate={{ rotateZ: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 26 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute size-2.5 rounded-full bg-brand-500 shadow-glow-orange-sm"
              style={{ top: -5, left: "50%", transform: "translateX(-50%)" }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* The stage */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        {/* Central hub — the restaurant */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translateZ(40px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <CentralHub />
        </motion.div>

        {/* Floating mini cards */}
        {ITEMS.map((it) => (
          <FloatingCard key={it.label} item={it} />
        ))}

        {/* Floating POS tablet */}
        <motion.div
          className="absolute right-[26%] top-[24%]"
          style={{ transform: "translateZ(70px)" }}
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="rounded-2xl border border-brand-200/70 bg-white/90 p-2 shadow-premium backdrop-blur">
            <div className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-2 py-1">
              <Tablet className="size-3.5 text-brand-600" />
              <span className="text-[10px] font-semibold text-brand-700">POS Tablet</span>
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="h-3 rounded bg-brand-100" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Food delivery icon */}
        <motion.div
          className="absolute left-[28%] top-[30%]"
          style={{ transform: "translateZ(95px)" }}
          animate={{ y: [0, 14, 0], x: [0, 6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-brand-500 text-white shadow-glow-orange-sm">
            <Bike className="size-5" />
          </div>
        </motion.div>

        {/* Cloud sync badge */}
        <motion.div
          className="absolute bottom-[26%] right-[28%]"
          style={{ transform: "translateZ(80px)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/90 px-3 py-1.5 shadow-premium backdrop-blur">
            <RefreshCw className="size-3.5 text-brand-600" />
            <span className="text-[10px] font-semibold text-foreground">Offline + Online Sync</span>
            <span className="size-1.5 animate-glow-pulse rounded-full bg-green-500" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CentralHub() {
  return (
    <div className="relative w-44 sm:w-52">
      <div className="gradient-border overflow-hidden rounded-3xl bg-white p-5 shadow-premium">
        <div className="flex items-center justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow-orange-sm">
            <Utensils className="size-5" />
          </span>
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
            ● Live
          </span>
        </div>
        <div className="mt-4 font-display text-xl font-bold leading-none text-foreground">
          Restaurant<span className="text-gradient-orange">360</span>
        </div>
        <p className="mt-1 text-[11px] font-medium text-muted-foreground">
          Live hub · 50+ restaurants online
        </p>

        {/* Mini analytics */}
        <div className="mt-3 flex items-end gap-1">
          {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-amber-400"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: "easeOut" }}
              style={{ minHeight: 6 }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Revenue today</span>
          <span className="font-semibold text-foreground">₹4.82L</span>
        </div>
      </div>

      {/* Glow under hub */}
      <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-brand-400/40 to-amber-300/30 blur-xl" />
    </div>
  );
}

function FloatingCard({ item }: { item: FloatItem }) {
  const accent =
    item.accent === "amber"
      ? "from-amber-400 to-brand-500"
      : "from-brand-400 to-brand-600";
  return (
    <motion.div
      className={cn("absolute w-32 sm:w-36", item.className)}
      style={{ transform: `translateZ(${item.depth}px)` }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5 + item.delay, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
    >
      <div className="glass-card rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "grid size-8 place-items-center rounded-lg bg-gradient-to-br text-white shadow-glow-orange-sm",
              accent,
            )}
          >
            {item.icon}
          </span>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-foreground">{item.label}</div>
            <div className="truncate text-[10px] text-muted-foreground">{item.sub}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
