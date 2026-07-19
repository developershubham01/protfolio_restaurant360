"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ChefHat,
  Boxes,
  Users,
  BarChart3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading, Reveal } from "../shared";
import { cn } from "@/lib/utils";

type ViewId = "pos" | "kds" | "inventory" | "crm" | "reports" | "admin";

type View = {
  id: ViewId;
  label: string;
  icon: LucideIcon;
  render: () => React.ReactNode;
};

/* ---------- Laptop screen mock views (all in orange theme) ---------- */

function ViewHeader({
  color,
  icon: Icon,
  title,
  pill,
  pillTone = "brand",
}: {
  color: string;
  icon: LucideIcon;
  title: string;
  pill: string;
  pillTone?: "brand" | "amber" | "emerald";
}) {
  const pillClass =
    pillTone === "amber"
      ? "bg-amber-100 text-amber-700"
      : pillTone === "emerald"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-brand-100 text-brand-700";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex size-6 items-center justify-center rounded-md bg-gradient-to-br text-white",
            color,
          )}
        >
          <Icon className="size-3.5" />
        </div>
        <div className="h-2 w-20 rounded-full bg-foreground/90" />
      </div>
      <div
        className={cn(
          "rounded-full px-2 py-0.5 text-[8px] font-semibold",
          pillClass,
        )}
      >
        {pill}
      </div>
    </div>
  );
}

function PosView() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-brand-500 to-brand-600"
        icon={LayoutDashboard}
        title="POS"
        pill="Live"
      />
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Sales", v: "₹2.4L" },
          { l: "Orders", v: "348" },
          { l: "Avg", v: "₹689" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-brand-50 p-2">
            <div className="text-[7px] font-semibold uppercase tracking-wide text-brand-700">
              {s.l}
            </div>
            <div className="mt-0.5 font-display text-[11px] font-bold text-foreground">
              {s.v}
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-1 rounded-lg bg-gradient-to-br from-brand-50/60 to-white p-2">
        <div className="flex items-center justify-between">
          <div className="text-[8px] font-semibold uppercase text-muted-foreground">
            Sales / hour
          </div>
          <div className="text-[8px] font-semibold text-brand-600">+12.4%</div>
        </div>
        <svg viewBox="0 0 200 60" className="mt-1 w-full">
          <defs>
            <linearGradient id="pos-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 45 L20 32 L40 38 L60 22 L80 28 L100 14 L120 20 L140 8 L160 16 L180 6 L200 12 L200 60 L0 60 Z"
            fill="url(#pos-grad)"
          />
          <path
            d="M0 45 L20 32 L40 38 L60 22 L80 28 L100 14 L120 20 L140 8 L160 16 L180 6 L200 12"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

function KdsView() {
  const tickets = [
    { id: "#A042", items: 3, time: "2:15", status: "cooking" as const },
    { id: "#A043", items: 5, time: "0:48", status: "new" as const },
    { id: "#A044", items: 2, time: "4:30", status: "late" as const },
    { id: "#A045", items: 4, time: "1:02", status: "cooking" as const },
    { id: "#A046", items: 6, time: "0:12", status: "new" as const },
    { id: "#A047", items: 3, time: "2:50", status: "cooking" as const },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-amber-500 to-brand-600"
        icon={ChefHat}
        title="KDS"
        pill="Station 1"
      />
      <div className="grid flex-1 grid-cols-3 gap-2">
        {tickets.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-lg border p-2",
              t.status === "late"
                ? "border-red-300 bg-red-50"
                : t.status === "cooking"
                  ? "border-brand-300 bg-brand-50"
                  : "border-slate-200 bg-white",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-[10px] font-bold text-foreground">
                {t.id}
              </div>
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  t.status === "late"
                    ? "bg-red-500"
                    : t.status === "cooking"
                      ? "animate-pulse bg-brand-500"
                      : "bg-slate-300",
                )}
              />
            </div>
            <div className="mt-1 text-[8px] text-muted-foreground">
              {t.items} items
            </div>
            <div
              className={cn(
                "mt-0.5 font-display text-[10px] font-bold",
                t.status === "late" ? "text-red-600" : "text-brand-700",
              )}
            >
              {t.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryView() {
  const items = [
    { name: "Tomatoes", stock: 24, status: "low" as const },
    { name: "Chicken", stock: 78, status: "ok" as const },
    { name: "Rice", stock: 92, status: "ok" as const },
    { name: "Cheese", stock: 18, status: "low" as const },
    { name: "Cooking Oil", stock: 65, status: "ok" as const },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-brand-500 to-amber-500"
        icon={Boxes}
        title="Inventory"
        pill="2 alerts"
        pillTone="amber"
      />
      <div className="flex-1 space-y-1.5">
        {items.map((it) => (
          <div
            key={it.name}
            className="rounded-lg border border-slate-100 bg-white p-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-semibold text-foreground">
                {it.name}
              </div>
              <div
                className={cn(
                  "text-[8px] font-bold",
                  it.status === "low" ? "text-red-500" : "text-brand-600",
                )}
              >
                {it.stock}/100
              </div>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  "h-full rounded-full",
                  it.status === "low"
                    ? "bg-gradient-to-r from-red-400 to-red-500"
                    : "bg-gradient-to-r from-brand-400 to-brand-600",
                )}
                style={{ width: `${it.stock}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmView() {
  const guests = [
    { name: "Aarav S.", visits: 42, tier: "Gold", spent: "₹84k" },
    { name: "Diya M.", visits: 28, tier: "Silver", spent: "₹39k" },
    { name: "Rohan K.", visits: 67, tier: "Platinum", spent: "₹1.2L" },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-brand-500 to-brand-600"
        icon={Users}
        title="CRM"
        pill="2,418 guests"
      />
      <div className="flex-1 space-y-1.5">
        {guests.map((g) => (
          <div
            key={g.name}
            className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white p-2"
          >
            <div className="size-7 rounded-full bg-gradient-to-br from-brand-400 to-amber-400" />
            <div className="flex-1">
              <div className="text-[9px] font-semibold text-foreground">
                {g.name}
              </div>
              <div className="text-[7px] text-muted-foreground">
                {g.visits} visits · {g.spent}
              </div>
            </div>
            <div
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase",
                g.tier === "Platinum"
                  ? "bg-slate-900 text-white"
                  : g.tier === "Gold"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600",
              )}
            >
              {g.tier}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsView() {
  const bars = [40, 65, 50, 80, 35, 70, 90];
  const rows = [
    { l: "Dine-in", v: "₹1.2L", p: "48%" },
    { l: "Delivery", v: "₹84k", p: "34%" },
    { l: "Takeaway", v: "₹42k", p: "18%" },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-brand-500 to-brand-700"
        icon={BarChart3}
        title="Reports"
        pill="+18% MoM"
      />
      <div className="flex h-14 items-end justify-between gap-1 rounded-lg bg-brand-50/60 p-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 items-end justify-center">
            <div
              className="w-full rounded-t bg-gradient-to-t from-brand-500 to-amber-400"
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1">
        {rows.map((r) => (
          <div
            key={r.l}
            className="flex items-center justify-between rounded bg-slate-50 px-2 py-1"
          >
            <div className="text-[8px] font-medium text-foreground">{r.l}</div>
            <div className="flex items-center gap-2">
              <div className="text-[8px] font-semibold text-foreground">
                {r.v}
              </div>
              <div className="text-[7px] text-muted-foreground">{r.p}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminView() {
  const branches = [
    { name: "Mumbai · Bandra", status: "online" as const, orders: 142 },
    { name: "Delhi · CP", status: "online" as const, orders: 98 },
    { name: "Bangalore · Indira", status: "online" as const, orders: 124 },
    { name: "Pune · Koregaon", status: "maintenance" as const, orders: 0 },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3.5">
      <ViewHeader
        color="from-slate-800 to-brand-700"
        icon={ShieldCheck}
        title="Super Admin"
        pill="3 / 4 live"
        pillTone="emerald"
      />
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-brand-50 p-1.5">
          <div className="text-[7px] uppercase text-brand-700">Tenants</div>
          <div className="font-display text-[11px] font-bold text-foreground">
            24
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 p-1.5">
          <div className="text-[7px] uppercase text-amber-700">Outlets</div>
          <div className="font-display text-[11px] font-bold text-foreground">
            312
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        {branches.map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-between rounded bg-slate-50 px-2 py-1"
          >
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  b.status === "online" ? "bg-emerald-500" : "bg-amber-500",
                )}
              />
              <div className="text-[8px] font-medium text-foreground">
                {b.name}
              </div>
            </div>
            <div className="text-[7px] text-muted-foreground">
              {b.orders} orders
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS: View[] = [
  { id: "pos", label: "POS Dashboard", icon: LayoutDashboard, render: PosView },
  { id: "kds", label: "Kitchen Display", icon: ChefHat, render: KdsView },
  { id: "inventory", label: "Inventory", icon: Boxes, render: InventoryView },
  { id: "crm", label: "CRM", icon: Users, render: CrmView },
  { id: "reports", label: "Reports", icon: BarChart3, render: ReportsView },
  { id: "admin", label: "Super Admin", icon: ShieldCheck, render: AdminView },
];

/* ---------- Device mockups ---------- */

function PhoneMock() {
  return (
    <div className="relative w-32 rounded-[2rem] border-4 border-slate-900 bg-slate-900 p-1 shadow-premium sm:w-36">
      {/* notch */}
      <div className="absolute left-1/2 top-1 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-800" />
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        <div className="flex flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <div className="text-[8px] font-bold text-foreground">Your Order</div>
            <div className="size-3 rounded-full bg-brand-100" />
          </div>
          <div className="rounded-lg bg-brand-50 p-1.5">
            <div className="text-[7px] uppercase tracking-wide text-brand-700">
              Table 12 · 2 guests
            </div>
            <div className="mt-0.5 font-display text-[10px] font-bold text-foreground">
              ₹1,240
            </div>
          </div>
          {[
            { n: "Margherita", q: 2, p: "₹480" },
            { n: "Truffle Pasta", q: 1, p: "₹560" },
            { n: "Coke", q: 2, p: "₹200" },
          ].map((item) => (
            <div key={item.n} className="flex items-center gap-1.5">
              <div className="size-5 rounded bg-gradient-to-br from-brand-200 to-amber-200" />
              <div className="flex-1">
                <div className="text-[7px] font-semibold text-foreground">
                  {item.n}
                </div>
                <div className="text-[6px] text-muted-foreground">
                  Qty {item.q}
                </div>
              </div>
              <div className="text-[7px] font-bold text-brand-600">{item.p}</div>
            </div>
          ))}
          <button className="mt-1 rounded-md bg-gradient-to-r from-brand-500 to-brand-600 py-1 text-center text-[8px] font-semibold text-white">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function TabletMock() {
  return (
    <div className="relative w-44 rounded-[1.5rem] border-4 border-slate-900 bg-slate-900 p-1.5 shadow-premium sm:w-52">
      <div className="absolute left-1/2 top-0.5 h-0.5 w-2 -translate-x-1/2 rounded-full bg-slate-700" />
      <div className="overflow-hidden rounded-[1.1rem] bg-white">
        <div className="flex flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="size-3 rounded bg-gradient-to-br from-brand-500 to-brand-600" />
              <div className="text-[8px] font-bold text-foreground">
                Waiter POS
              </div>
            </div>
            <div className="rounded-full bg-brand-100 px-1 py-0.5 text-[6px] font-semibold text-brand-700">
              Riya · T4
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["Starters", "Mains", "Desserts", "Drinks", "Sides", "Specials"].map(
              (cat) => (
                <div
                  key={cat}
                  className="rounded bg-brand-50 p-1 text-center text-[6px] font-semibold text-brand-700"
                >
                  {cat}
                </div>
              ),
            )}
          </div>
          <div className="space-y-1">
            {[
              { n: "Paneer Tikka", p: "₹280" },
              { n: "Butter Naan", p: "₹60" },
            ].map((item) => (
              <div
                key={item.n}
                className="flex items-center justify-between rounded border border-slate-100 px-1.5 py-1"
              >
                <div className="text-[7px] font-medium text-foreground">
                  {item.n}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex size-3 items-center justify-center rounded-full bg-brand-100 text-[7px] font-bold text-brand-700">
                    +
                  </div>
                  <div className="text-[7px] font-bold text-foreground">
                    {item.p}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main ---------- */

export function PlatformShowcase() {
  const [active, setActive] = React.useState(0);
  const activeView = VIEWS[active];

  // Auto-cycle every 3s; resets when user clicks a tab.
  React.useEffect(() => {
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % VIEWS.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, [active]);

  return (
    <Section id="platform" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-25 mask-fade-b" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-200/30 blur-3xl" />

      <SectionHeading
        eyebrow="Interactive Platform"
        title={
          <>
            One platform. <span className="text-gradient-orange">Every screen.</span>
          </>
        }
        description="From the back office to the kitchen, the waiter's tablet, and the customer's phone — Resto360 keeps every device in perfect sync. Click a tab to explore each view."
      />

      <div className="relative mx-auto mt-14 max-w-5xl">
        {/* Floating glow behind */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/25 blur-3xl" />

        {/* Laptop (3D) */}
        <Reveal direction="up" duration={0.8}>
          <div className="perspective-2000 mx-auto max-w-[760px]">
            <motion.div
              initial={{ rotateX: 12, rotateY: 0 }}
              whileHover={{ rotateX: 4, rotateY: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Screen frame */}
              <div className="relative rounded-[20px] border border-slate-300/60 bg-slate-900 p-2.5 shadow-premium">
                {/* Notch */}
                <div className="absolute left-1/2 top-1.5 h-1 w-14 -translate-x-1/2 rounded-full bg-slate-700/70" />
                {/* Screen */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-white">
                  {/* Reflection overlay */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView.id}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      {activeView.render()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Screen label badge */}
                  <div className="absolute bottom-2 left-2 z-30 flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-0.5 text-[8px] font-semibold text-brand-700 shadow-sm backdrop-blur">
                    <span className="size-1.5 rounded-full bg-brand-500 animate-glow-pulse" />
                    {activeView.label}
                  </div>
                </div>
              </div>

              {/* Base (slightly wider than screen) */}
              <div
                className="mx-auto h-2.5 rounded-b-2xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 shadow-lg"
                style={{ width: "108%", marginLeft: "-4%" }}
              />
              {/* Trackpad indent */}
              <div className="mx-auto mt-0.5 h-0.5 w-24 rounded-full bg-slate-300/60" />
            </motion.div>
          </div>
        </Reveal>

        {/* Desktop floating phone (left-bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-0 z-20 hidden lg:block"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-brand-400/30 blur-2xl" />
          <PhoneMock />
          <div className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Customer · Mobile Ordering
          </div>
        </motion.div>

        {/* Desktop floating tablet (right-top) */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-10 z-20 hidden lg:block"
        >
          <div className="absolute inset-0 -z-10 rounded-[1.5rem] bg-amber-400/30 blur-2xl" />
          <TabletMock />
          <div className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Waiter · Tablet Ordering
          </div>
        </motion.div>

        {/* Mobile / tablet stacked device row */}
        <div className="mt-10 flex items-start justify-center gap-6 lg:hidden">
          <Reveal direction="up" delay={0.25} className="flex flex-col items-center">
            <PhoneMock />
            <div className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Customer
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.35} className="flex flex-col items-center">
            <TabletMock />
            <div className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Waiter
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tab buttons */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {VIEWS.map((v, i) => {
            const Icon = v.icon;
            const isActive = i === active;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${v.label} view`}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-orange-sm"
                    : "border border-border bg-white/70 text-muted-foreground backdrop-blur hover:border-brand-200 hover:text-brand-700",
                )}
              >
                <Icon className="size-3.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand-500 animate-glow-pulse" />
          Auto-cycling every 3 seconds — click a tab to take control
        </div>
      </Reveal>
    </Section>
  );
}

export default PlatformShowcase;
