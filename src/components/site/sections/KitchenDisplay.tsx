"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Utensils,
  Pizza,
  Soup,
  Coffee,
  IceCream,
  Salad,
  CakeSlice,
  Bike,
  Check,
  Clock,
  ArrowRight,
  Bell,
  ChefHat,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Reveal, Stagger, staggerItem } from "../shared";

/* ---------- Types ---------- */

type Stage = "pending" | "preparing" | "ready" | "delivered";

type Order = {
  id: string;
  ref: string;
  table: string;
  itemName: string;
  icon: LucideIcon;
  qty: number;
  notes?: string;
  stage: Stage;
  // seconds elapsed since the order was placed
  elapsed: number;
};

const STAGES: {
  id: Stage;
  label: string;
  accent: string;
  headerBg: string;
  dot: string;
  countBg: string;
}[] = [
  {
    id: "pending",
    label: "Pending",
    accent: "text-amber-700",
    headerBg: "from-amber-50 to-amber-100/60 border-amber-200",
    dot: "bg-amber-500",
    countBg: "bg-amber-500/15 text-amber-700",
  },
  {
    id: "preparing",
    label: "Preparing",
    accent: "text-brand-700",
    headerBg: "from-brand-50 to-brand-100/60 border-brand-200",
    dot: "bg-brand-500",
    countBg: "bg-brand-500/15 text-brand-700",
  },
  {
    id: "ready",
    label: "Ready",
    accent: "text-green-700",
    headerBg: "from-green-50 to-green-100/60 border-green-200",
    dot: "bg-green-500",
    countBg: "bg-green-500/15 text-green-700",
  },
  {
    id: "delivered",
    label: "Delivered",
    accent: "text-slate-700",
    headerBg: "from-slate-50 to-slate-100/60 border-slate-200",
    dot: "bg-slate-400",
    countBg: "bg-slate-500/15 text-slate-700",
  },
];

const ORDER_FLOW: Stage[] = ["pending", "preparing", "ready", "delivered"];

const NEXT_LABEL: Record<Stage, string> = {
  pending: "Start cooking",
  preparing: "Mark ready",
  ready: "Bump & serve",
  delivered: "Re-open",
};

const NEXT_ICON: Record<Stage, LucideIcon> = {
  pending: Flame,
  preparing: Check,
  ready: ArrowRight,
  delivered: ArrowRight,
};

/* ---------- Seed data ---------- */

const SEED: Order[] = [
  {
    id: "o1",
    ref: "#1042",
    table: "T3",
    itemName: "Paneer Tikka",
    icon: Pizza,
    qty: 2,
    notes: "Less spicy",
    stage: "pending",
    elapsed: 38,
  },
  {
    id: "o2",
    ref: "#1043",
    table: "T7",
    itemName: "Veg Biryani",
    icon: Utensils,
    qty: 1,
    stage: "pending",
    elapsed: 72,
  },
  {
    id: "o3",
    ref: "#1044",
    table: "Online",
    itemName: "Margherita Pizza",
    icon: Pizza,
    qty: 1,
    notes: "Extra cheese",
    stage: "preparing",
    elapsed: 215,
  },
  {
    id: "o4",
    ref: "#1045",
    table: "T1",
    itemName: "Spring Rolls",
    icon: Soup,
    qty: 3,
    stage: "preparing",
    elapsed: 124,
  },
  {
    id: "o5",
    ref: "#1046",
    table: "T6",
    itemName: "Cold Coffee",
    icon: Coffee,
    qty: 2,
    stage: "ready",
    elapsed: 312,
  },
  {
    id: "o6",
    ref: "#1047",
    table: "Online",
    itemName: "Gulab Jamun",
    icon: CakeSlice,
    qty: 4,
    stage: "ready",
    elapsed: 280,
  },
  {
    id: "o7",
    ref: "#1039",
    table: "T8",
    itemName: "Garden Salad",
    icon: Salad,
    qty: 1,
    stage: "delivered",
    elapsed: 642,
  },
  {
    id: "o8",
    ref: "#1040",
    table: "T11",
    itemName: "Chocolate Mousse",
    icon: IceCream,
    qty: 2,
    stage: "delivered",
    elapsed: 510,
  },
];

/* ---------- Helpers ---------- */

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function timerColor(seconds: number): string {
  if (seconds > 300) return "text-red-600 bg-red-50";
  if (seconds > 180) return "text-amber-700 bg-amber-50";
  return "text-green-700 bg-green-50";
}

/* ---------- Order card ---------- */

function OrderCard({
  order,
  onAdvance,
}: {
  order: Order;
  onAdvance: (id: string) => void;
}) {
  const Icon = order.icon;
  const NextIcon = NEXT_ICON[order.stage];
  const isDelivered = order.stage === "delivered";

  return (
    <motion.div
      layout
      layoutId={order.id}
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-white/95 p-3 shadow-sm backdrop-blur",
        "transition-shadow duration-300 hover:shadow-md",
        isDelivered
          ? "border-slate-200 opacity-80"
          : "border-brand-100 hover:border-brand-300",
      )}
    >
      {/* top row: ref + timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-xs font-bold text-foreground">
            {order.ref}
          </span>
          <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-semibold text-brand-700">
            {order.table}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums",
            timerColor(order.elapsed),
          )}
        >
          <Clock className="size-2.5" />
          {fmtTime(order.elapsed)}
        </span>
      </div>

      {/* middle row: item */}
      <div className="mt-2.5 flex items-center gap-2.5">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
            isDelivered
              ? "bg-gradient-to-br from-slate-400 to-slate-500"
              : "bg-gradient-to-br from-brand-500 to-amber-500",
          )}
        >
          <Icon className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {order.itemName}
          </p>
          <p className="text-[10px] text-muted-foreground">
            Qty{" "}
            <span className="font-bold text-brand-700">{order.qty}</span>
            {order.notes ? ` · ${order.notes}` : ""}
          </p>
        </div>
      </div>

      {/* bump / advance button */}
      <button
        type="button"
        onClick={() => onAdvance(order.id)}
        className={cn(
          "mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 active:scale-[0.98]",
          isDelivered
            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
            : "bg-gradient-to-r from-brand-500 to-amber-500 text-white shadow-md shadow-brand-500/25 hover:shadow-brand-500/40",
        )}
      >
        <NextIcon className="size-3.5" />
        {NEXT_LABEL[order.stage]}
      </button>

      {/* rush indicator */}
      {order.elapsed > 240 && !isDelivered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
        >
          <Bell className="size-2.5" />
        </motion.span>
      )}
    </motion.div>
  );
}

/* ---------- Main component ---------- */

export function KitchenDisplay() {
  const [orders, setOrders] = React.useState<Order[]>(SEED);

  // Tick every second — increment elapsed for non-delivered orders
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.stage === "delivered" ? o : { ...o, elapsed: o.elapsed + 1 },
        ),
      );
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = ORDER_FLOW.indexOf(o.stage);
        const next = ORDER_FLOW[(idx + 1) % ORDER_FLOW.length];
        // if reopening delivered → pending, reset nothing; if going forward, keep timer
        return { ...o, stage: next };
      }),
    );
  };

  return (
    <Section id="kds">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 size-96 rounded-full bg-brand-300/15 blur-3xl" />

      <SectionHeading
        eyebrow="Kitchen Display"
        title={
          <>
            Real-time kitchen{" "}
            <span className="text-gradient-orange">sync</span>
          </>
        }
        description="Orders flow from the POS to the kitchen in milliseconds. Watch tickets move through Pending → Preparing → Ready → Delivered, each with a live cooking timer and one-tap bump."
      />

      <Reveal className="mt-12" delay={0.1}>
        <div className="glass-card gradient-border rounded-3xl p-4 shadow-premium sm:p-6">
          {/* Board header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-md">
                <ChefHat className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Expeditor Board</p>
                <p className="text-[10px] text-muted-foreground">
                  Live · Station: Hot · {orders.length} active tickets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Synced
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">
                <Clock className="size-3" />
                Latency 0 ms
              </span>
            </div>
          </div>

          {/* Kanban columns */}
          <Stagger
            className="grid gap-3 sm:gap-4 lg:grid-cols-4"
            staggerChildren={0.08}
          >
            {STAGES.map((stage) => {
              const stageOrders = orders.filter((o) => o.stage === stage.id);
              return (
                <motion.div
                  key={stage.id}
                  variants={staggerItem}
                  className={cn(
                    "flex flex-col rounded-2xl border bg-gradient-to-b p-3",
                    stage.headerBg,
                  )}
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("size-2 rounded-full", stage.dot)} />
                      <h3
                        className={cn(
                          "text-sm font-bold",
                          stage.accent,
                        )}
                      >
                        {stage.label}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "min-w-6 rounded-full px-2 py-0.5 text-center text-[10px] font-bold",
                        stage.countBg,
                      )}
                    >
                      {stageOrders.length}
                    </span>
                  </div>

                  <div className="flex min-h-[160px] flex-1 flex-col gap-2">
                    <AnimatePresence mode="popLayout">
                      {stageOrders.map((o) => (
                        <OrderCard key={o.id} order={o} onAdvance={advance} />
                      ))}
                    </AnimatePresence>

                    {stageOrders.length === 0 && (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/60 bg-white/40 p-4 text-center">
                        <p className="text-[10px] font-medium text-muted-foreground">
                          No orders
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </Stagger>

          {/* footer hint */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 pt-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Bike className="size-3 text-brand-600" />
              Tip: tap the action button to bump tickets forward.
            </span>
            <span className="font-mono">
              Avg prep{" "}
              <span className="font-bold text-brand-700">8m 42s</span>
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default KitchenDisplay;
