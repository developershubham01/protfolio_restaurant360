"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  Boxes,
  Users,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Reveal } from "../shared";

type MockKind =
  | "dashboard"
  | "pos"
  | "kitchen"
  | "inventory"
  | "crm"
  | "reports"
  | "admin";

type Shot = {
  id: MockKind;
  title: string;
  url: string;
  icon: LucideIcon;
  Mock: React.ComponentType;
};

const SHOTS: Shot[] = [
  { id: "dashboard", title: "Dashboard", url: "app.restaurant360.io/dashboard", icon: LayoutDashboard, Mock: DashboardMock },
  { id: "pos", title: "POS", url: "app.restaurant360.io/pos", icon: ShoppingCart, Mock: POSMock },
  { id: "kitchen", title: "Kitchen", url: "app.restaurant360.io/kds", icon: ChefHat, Mock: KitchenMock },
  { id: "inventory", title: "Inventory", url: "app.restaurant360.io/inventory", icon: Boxes, Mock: InventoryMock },
  { id: "crm", title: "CRM", url: "app.restaurant360.io/crm", icon: Users, Mock: CRMMock },
  { id: "reports", title: "Reports", url: "app.restaurant360.io/reports", icon: BarChart3, Mock: ReportsMock },
  { id: "admin", title: "Super Admin", url: "app.restaurant360.io/super-admin", icon: Building2, Mock: AdminMock },
];

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ScreenshotsGallery() {
  return (
    <Section id="screenshots" className="relative overflow-hidden bg-aurora">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[420px] -translate-x-1/2 rounded-full bg-brand-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="Screenshots"
        title={
          <>
            Take a tour of <span className="text-gradient-orange">Restaurant360</span>
          </>
        }
        description="Every module of the platform — from POS and Kitchen Display to CRM, Reports and multi-tenant Super Admin — designed for speed and clarity."
      />

      <Reveal className="mt-12" delay={0.1}>
        <ScreenshotsCarousel shots={SHOTS} />
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */

function ScreenshotsCarousel({ shots }: { shots: Shot[] }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const animatingRef = React.useRef(false);
  const total = shots.length;

  // Auto-advance
  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  // Scroll active into view
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[active] as HTMLElement | undefined;
    if (!child) return;
    animatingRef.current = true;
    track.scrollTo({ left: child.offsetLeft - 12, behavior: "smooth" });
    const t = window.setTimeout(() => {
      animatingRef.current = false;
    }, 650);
    return () => window.clearTimeout(t);
  }, [active]);

  // Track scroll → sync active (skip while programmatic smooth-scroll)
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (animatingRef.current) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let dist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const childCenter = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(childCenter - center);
        if (d < dist) {
          dist = d;
          closest = i;
        }
      });
      setActive((prev) => (prev === closest ? prev : closest));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: 1 | -1) => setActive((p) => (p + dir + total) % total);

  // Mouse drag-to-scroll. The ref holds drag mechanics; `dragging` state drives cursor.
  const drag = React.useRef({ startX: 0, startLeft: 0 });
  const [dragging, setDragging] = React.useState(false);
  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { startX: e.pageX, startLeft: track.scrollLeft };
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.pageX - drag.current.startX;
    track.scrollLeft = drag.current.startLeft - dx;
  };
  const stopDrag = () => setDragging(false);

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-3 pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          stopDrag();
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        {shots.map((s, i) => (
          <div
            key={s.id}
            data-index={i}
            className="w-[88vw] shrink-0 snap-center sm:w-[440px]"
          >
            <motion.div
              variants={cardEnter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="glass-card gradient-border h-full overflow-hidden rounded-3xl shadow-premium"
            >
              <BrowserFrame url={s.url} title={s.title} icon={s.icon}>
                <s.Mock />
              </BrowserFrame>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <NavButton dir="prev" onClick={() => step(-1)} />
        <Dots total={total} active={active} onSelect={setActive} />
        <NavButton dir="next" onClick={() => step(1)} />
      </div>
    </div>
  );
}

function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={dir === "prev" ? "Previous screenshot" : "Next screenshot"}
      className="grid size-11 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 shadow-glow-orange-sm transition-colors hover:bg-brand-50"
    >
      <Icon className="size-5" />
    </motion.button>
  );
}

function Dots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to screenshot ${i + 1}`}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i === active
              ? "w-6 bg-gradient-to-r from-brand-500 to-brand-600"
              : "w-2 bg-brand-200 hover:bg-brand-300",
          )}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Browser frame                                                       */
/* ------------------------------------------------------------------ */

function BrowserFrame({
  url,
  title,
  icon: Icon,
  children,
}: {
  url: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-brand-50/80 to-amber-50/80 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-brand-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-brand-300" />
        </div>
        <div className="mx-auto flex max-w-[260px] items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1 text-[11px] text-muted-foreground">
          <Lock className="size-3 shrink-0 text-green-500" />
          <span className="truncate">{url}</span>
        </div>
        <div className="flex items-center gap-1.5 text-brand-600">
          <Icon className="size-4" />
          <span className="hidden text-xs font-semibold sm:inline">{title}</span>
        </div>
      </div>
      {/* Body */}
      <div className="bg-white p-4">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mock UIs                                                            */
/* ------------------------------------------------------------------ */

function DashboardMock() {
  const kpis = [
    { label: "Revenue", value: "₹4.2L", delta: "+12%" },
    { label: "Orders", value: "1,248", delta: "+8%" },
    { label: "Customers", value: "856", delta: "+5%" },
    { label: "AOV", value: "₹340", delta: "+3%" },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-border bg-brand-50/40 px-3 py-2"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {k.label}
            </div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-foreground">
                {k.value}
              </span>
              <span className="text-[10px] font-semibold text-green-600">
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-white p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground">
            Sales · last 7 days
          </span>
          <span className="text-[10px] text-muted-foreground">+18.2%</span>
        </div>
        <svg viewBox="0 0 320 110" className="w-full">
          <defs>
            <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 85 L45 70 L90 75 L135 50 L180 58 L225 30 L270 38 L320 18 L320 110 L0 110 Z"
            fill="url(#dashArea)"
          />
          <path
            d="M0 85 L45 70 L90 75 L135 50 L180 58 L225 30 L270 38 L320 18"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="320" cy="18" r="3.5" fill="#ea580c" />
        </svg>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function POSMock() {
  const products = [
    { name: "Margherita", price: "₹320", emoji: "🍕" },
    { name: "Burger", price: "₹180", emoji: "🍔" },
    { name: "Cappuccino", price: "₹120", emoji: "☕" },
    { name: "Pasta", price: "₹240", emoji: "🍝" },
    { name: "Salad", price: "₹180", emoji: "🥗" },
    { name: "Dessert", price: "₹150", emoji: "🍰" },
  ];
  const cart = [
    { name: "Margherita", qty: 2, price: "₹640" },
    { name: "Cappuccino", qty: 1, price: "₹120" },
  ];
  return (
    <div className="grid grid-cols-5 gap-3">
      {/* Products */}
      <div className="col-span-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground">Menu</span>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[9px] font-semibold text-brand-700">
            24 items
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-border bg-white p-1.5 text-center"
            >
              <div className="text-base leading-none">{p.emoji}</div>
              <div className="mt-1 text-[9px] font-medium text-foreground">
                {p.name}
              </div>
              <div className="text-[9px] font-semibold text-brand-600">
                {p.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cart */}
      <div className="col-span-2 flex flex-col rounded-xl bg-brand-50/60 p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground">Cart</span>
          <span className="text-[9px] text-muted-foreground">Table 7</span>
        </div>
        <div className="space-y-1.5">
          {cart.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-md bg-white px-1.5 py-1 text-[10px]"
            >
              <span className="truncate text-foreground">
                {c.qty}× {c.name}
              </span>
              <span className="font-semibold text-foreground">{c.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-1 border-t border-brand-200 pt-1.5">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Subtotal</span>
            <span>₹760</span>
          </div>
          <div className="flex justify-between text-[11px] font-bold text-foreground">
            <span>Total</span>
            <span>₹892</span>
          </div>
          <button className="mt-1 w-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 py-1.5 text-[10px] font-semibold text-white">
            Charge ₹892
          </button>
        </div>
      </div>
    </div>
  );
}

function KitchenMock() {
  const cols = [
    { title: "Queued", color: "bg-slate-400", cards: [{ t: "T-07", n: "3 items", m: "2m" }, { t: "T-12", n: "5 items", m: "4m" }] },
    { title: "Cooking", color: "bg-amber-500", cards: [{ t: "T-03", n: "2 items", m: "6m" }, { t: "T-09", n: "4 items", m: "9m" }] },
    { title: "Ready", color: "bg-green-500", cards: [{ t: "T-05", n: "3 items", m: "ready" }] },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((col) => (
        <div key={col.title} className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className={cn("size-1.5 rounded-full", col.color)} />
            <span className="text-[10px] font-semibold text-foreground">
              {col.title}
            </span>
          </div>
          {col.cards.map((c, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-white p-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-foreground">
                  {c.t}
                </span>
                <span className="text-[9px] text-muted-foreground">{c.m}</span>
              </div>
              <div className="mt-0.5 text-[9px] text-muted-foreground">{c.n}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function InventoryMock() {
  const items = [
    { name: "Tomatoes", cur: 120, max: 150, pct: 80 },
    { name: "Onions", cur: 80, max: 150, pct: 53 },
    { name: "Chicken", cur: 30, max: 100, pct: 30, low: true },
    { name: "Rice", cur: 200, max: 200, pct: 100 },
    { name: "Cooking Oil", cur: 45, max: 100, pct: 45, low: true },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-foreground">
          Stock Levels
        </span>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
          2 low
        </span>
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.name} className="rounded-lg border border-border bg-white px-2 py-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-medium text-foreground">{it.name}</span>
              <span
                className={cn(
                  "font-semibold",
                  it.low ? "text-amber-600" : "text-muted-foreground",
                )}
              >
                {it.cur}/{it.max} kg
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-brand-100">
              <div
                className={cn(
                  "h-full rounded-full",
                  it.low
                    ? "bg-gradient-to-r from-amber-400 to-amber-500"
                    : "bg-gradient-to-r from-brand-400 to-brand-600",
                )}
                style={{ width: `${it.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CRMMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-gradient-to-br from-brand-50 to-amber-50 p-3">
        <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-display text-base font-bold text-white">
          P
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold text-foreground">
              Priya Sharma
            </span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold text-amber-700">
              GOLD
            </span>
          </div>
          <div className="text-[9px] text-muted-foreground">
            priya.s@email.com · 24 visits
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-sm font-bold text-brand-600">
            ₹48,200
          </div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground">
            Lifetime
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Visits", v: "24" },
          { l: "AOV", v: "₹2,008" },
          { l: "Last seen", v: "2d ago" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-white p-2 text-center">
            <div className="font-display text-sm font-bold text-foreground">
              {s.v}
            </div>
            <div className="text-[8px] uppercase tracking-wider text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-white p-2">
        <div className="mb-1 text-[10px] font-semibold text-foreground">
          Recent Orders
        </div>
        {[
          { id: "#1024", amt: "₹840", time: "2d ago" },
          { id: "#1018", amt: "₹1,200", time: "1w ago" },
          { id: "#1010", amt: "₹650", time: "2w ago" },
        ].map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between border-t border-border py-1 text-[10px] first:border-0"
          >
            <span className="font-medium text-foreground">{o.id}</span>
            <span className="text-muted-foreground">{o.time}</span>
            <span className="font-semibold text-brand-600">{o.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsMock() {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const pie = [
    { label: "Dine-in", pct: 52, color: "#ea580c" },
    { label: "Delivery", pct: 33, color: "#fb923c" },
    { label: "Takeaway", pct: 15, color: "#fdba74" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-white p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground">
            Weekly Revenue
          </span>
          <span className="text-[10px] font-semibold text-green-600">+18.2%</span>
        </div>
        <div className="flex h-24 items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-400"
                style={{ height: `${h}%` }}
              />
              <span className="text-[8px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white p-3">
        <div className="mb-2 text-[11px] font-semibold text-foreground">
          Channel Split
        </div>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 36 36" className="size-16 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#fdba74"
              strokeWidth="6"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#fb923c"
              strokeWidth="6"
              strokeDasharray="58 88"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#ea580c"
              strokeWidth="6"
              strokeDasharray="46 100"
            />
          </svg>
          <div className="flex-1 space-y-1">
            {pie.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="flex items-center gap-1.5 text-foreground">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: p.color }}
                  />
                  {p.label}
                </span>
                <span className="font-semibold text-foreground">{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMock() {
  const rows = [
    { name: "Spice Route", plan: "Enterprise", branches: 12, status: "Active" },
    { name: "Cafe Mocha", plan: "Professional", branches: 5, status: "Active" },
    { name: "Burger Hub", plan: "Starter", branches: 1, status: "Trial" },
    { name: "Pizza Palace", plan: "Professional", branches: 8, status: "Active" },
    { name: "Cloud Kitchen Co", plan: "Enterprise", branches: 24, status: "Active" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.8fr] gap-2 border-b border-border bg-brand-50/60 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Tenant</span>
        <span>Plan</span>
        <span>Branches</span>
        <span>Status</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.name}
          className="grid grid-cols-[1.5fr_1fr_0.7fr_0.8fr] items-center gap-2 border-b border-border px-2.5 py-1.5 text-[10px] last:border-0"
        >
          <span className="truncate font-medium text-foreground">{r.name}</span>
          <span className="text-muted-foreground">{r.plan}</span>
          <span className="font-semibold text-foreground">{r.branches}</span>
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "size-1.5 rounded-full",
                r.status === "Active" ? "bg-green-500" : "bg-amber-500",
              )}
            />
            <span className="text-muted-foreground">{r.status}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ScreenshotsGallery;
