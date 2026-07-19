"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wheat,
  Droplet,
  Milk,
  Drumstick,
  Carrot,
  Sparkles,
  Plus,
  AlertTriangle,
  Package,
  TrendingDown,
  Warehouse,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Reveal, Stagger, staggerItem } from "../shared";
import { Badge } from "@/components/ui/badge";

/* ---------- Types & data ---------- */

type Ingredient = {
  id: string;
  name: string;
  unit: string;
  icon: LucideIcon;
  max: number; // max stock in units
  current: number; // current stock
  unitPrice: number; // per unit cost
  gradient: string;
};

const INITIAL: Ingredient[] = [
  {
    id: "rice",
    name: "Basmati Rice",
    unit: "kg",
    icon: Wheat,
    max: 50,
    current: 42,
    unitPrice: 90,
    gradient: "from-amber-400 to-brand-500",
  },
  {
    id: "oil",
    name: "Sunflower Oil",
    unit: "L",
    icon: Droplet,
    max: 30,
    current: 24,
    unitPrice: 130,
    gradient: "from-brand-400 to-amber-500",
  },
  {
    id: "cheese",
    name: "Mozzarella",
    unit: "kg",
    icon: Milk,
    max: 20,
    current: 14,
    unitPrice: 480,
    gradient: "from-amber-500 to-brand-600",
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    unit: "kg",
    icon: Drumstick,
    max: 40,
    current: 9,
    unitPrice: 240,
    gradient: "from-brand-500 to-orange-600",
  },
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    unit: "kg",
    icon: Carrot,
    max: 35,
    current: 22,
    unitPrice: 60,
    gradient: "from-amber-400 to-brand-500",
  },
  {
    id: "spices",
    name: "Spice Mix",
    unit: "kg",
    icon: Sparkles,
    max: 12,
    current: 3,
    unitPrice: 360,
    gradient: "from-brand-600 to-amber-500",
  },
];

/* ---------- Helpers ---------- */

function fmtINR(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function pct(ing: Ingredient) {
  return Math.round((ing.current / ing.max) * 100);
}

function isLow(ing: Ingredient) {
  return pct(ing) < 30;
}

/* ---------- Card ---------- */

function IngredientCard({
  ing,
  onRestock,
}: {
  ing: Ingredient;
  onRestock: (id: string) => void;
}) {
  const Icon = ing.icon;
  const percent = pct(ing);
  const low = isLow(ing);

  return (
    <motion.div
      variants={staggerItem}
      layout
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-white/80 p-5 backdrop-blur transition-all duration-300",
        "glass-card",
        low
          ? "border-red-300/70 ring-1 ring-red-300/50"
          : "border-brand-100 hover:border-brand-300",
      )}
    >
      {/* glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500",
          ing.gradient,
          low ? "!opacity-40" : "",
        )}
      />

      {/* low stock pulse */}
      {low && (
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-red-400/40 animate-pulse" />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
              ing.gradient,
            )}
          >
            <Icon className="size-5.5" />
          </div>
          {low ? (
            <Badge className="border-transparent bg-red-500/15 text-red-700">
              <AlertTriangle className="size-3" />
              Low stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="border-brand-200 bg-brand-50 text-brand-700"
            >
              <Package className="size-3" />
              In stock
            </Badge>
          )}
        </div>

        <h3 className="mt-3.5 text-base font-semibold text-foreground">
          {ing.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {ing.current} {ing.unit} of {ing.max} {ing.unit}
        </p>

        {/* progress bar */}
        <div className="mt-3.5">
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-brand-100">
            <motion.div
              className={cn(
                "h-full rounded-full bg-gradient-to-r",
                low ? "from-red-400 to-red-600" : ing.gradient,
              )}
              animate={{ width: `${percent}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            {/* shimmer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s linear infinite",
              }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold">
            <span className={cn(low ? "text-red-600" : "text-brand-700")}>
              {percent}%
            </span>
            <span className="text-muted-foreground">
              {fmtINR(ing.current * ing.unitPrice)} value
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRestock(ing.id)}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 active:scale-[0.98]",
            low
              ? "bg-gradient-to-r from-red-500 to-brand-500 text-white shadow-md shadow-red-500/25 hover:shadow-red-500/40"
              : "bg-brand-50 text-brand-700 hover:bg-brand-100",
          )}
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          Restock to 100%
        </button>
      </div>
    </motion.div>
  );
}

/* ---------- Summary ---------- */

function SummaryBar({ items }: { items: Ingredient[] }) {
  const totalItems = items.reduce((s, i) => s + i.current, 0);
  const lowCount = items.filter(isLow).length;
  const totalValue = items.reduce((s, i) => s + i.current * i.unitPrice, 0);

  const cards = [
    {
      label: "Total items",
      value: `${totalItems}`,
      sub: "across 6 categories",
      icon: Boxes,
      tint: "bg-brand-50 text-brand-700",
    },
    {
      label: "Low-stock alerts",
      value: `${lowCount}`,
      sub: lowCount > 0 ? "needs attention" : "all healthy",
      icon: AlertTriangle,
      tint: lowCount > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700",
    },
    {
      label: "Inventory value",
      value: fmtINR(totalValue),
      sub: "current stock",
      icon: TrendingDown,
      tint: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/70 p-4 backdrop-blur"
          >
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                c.tint,
              )}
            >
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {c.label}
              </p>
              <p className="text-lg font-bold text-foreground">{c.value}</p>
              <p className="text-[10px] text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Main ---------- */

export function InventorySection() {
  const [items, setItems] = React.useState<Ingredient[]>(INITIAL);

  // Auto-decrement: every 2s decrement a random ingredient by a small amount
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setItems((prev) => {
        // pick a random eligible ingredient (current > 0)
        const eligible = prev
          .map((it, idx) => ({ it, idx }))
          .filter(({ it }) => it.current > 0);
        if (eligible.length === 0) return prev;
        const pick = eligible[Math.floor(Math.random() * eligible.length)];
        const decrement = Math.max(
          1,
          Math.round((Math.random() * 0.06 + 0.02) * pick.it.max),
        );
        return prev.map((it, idx) =>
          idx === pick.idx
            ? { ...it, current: Math.max(0, it.current - decrement) }
            : it,
        );
      });
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);

  const restock = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, current: it.max } : it)),
    );
  };

  const lowCount = items.filter(isLow).length;

  return (
    <Section id="inventory">
      {/* warehouse backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -top-24 right-1/3 -z-10 size-80 rounded-full bg-brand-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 size-72 rounded-full bg-amber-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="Inventory"
        title={
          <>
            Smart inventory that{" "}
            <span className="text-gradient-orange">manages itself</span>
          </>
        }
        description="Stock auto-deducts on every bill — watch levels drop in real time. When anything falls below 30%, Restaurant360 fires an alert and triggers a reorder before you run out."
      />

      <Reveal className="mt-12" delay={0.1}>
        {/* Summary bar */}
        <div className="mb-5 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-md">
            <Warehouse className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Warehouse overview</p>
            <p className="text-[10px] text-muted-foreground">
              Live · auto-deducting every 2s
            </p>
          </div>
        </div>
        <SummaryBar items={items} />
      </Reveal>

      <Stagger
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        staggerChildren={0.07}
      >
        <AnimatePresence mode="popLayout">
          {items.map((ing) => (
            <IngredientCard key={ing.id} ing={ing} onRestock={restock} />
          ))}
        </AnimatePresence>
      </Stagger>

      {/* helper note */}
      <Reveal delay={0.2}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={cn(
                "size-4",
                lowCount > 0 ? "text-red-500" : "text-brand-500",
              )}
            />
            <span>
              {lowCount > 0 ? (
                <>
                  <span className="font-bold text-red-600">{lowCount} item(s)</span>{" "}
                  below threshold — automated reorder triggered.
                </>
              ) : (
                "All categories above threshold — auto-monitoring active."
                )}
            </span>
          </div>
          <span className="font-mono text-[10px]">
            Last sync{" "}
            <span className="font-bold text-brand-700">just now</span>
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

export default InventorySection;
