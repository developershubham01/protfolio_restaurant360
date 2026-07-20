"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CalendarClock,
  IndianRupee,
  PackageCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AnimatedCounter,
  Reveal,
  Section,
  SectionHeading,
  Stagger,
  staggerItem,
} from "../shared";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const REVENUE_DATA = [
  { d: "Mon", v: 42500, p: 44800 },
  { d: "Tue", v: 38200, p: 40100 },
  { d: "Wed", v: 51200, p: 52600 },
  { d: "Thu", v: 47800, p: 49900 },
  { d: "Fri", v: 68400, p: 69500 },
  { d: "Sat", v: 91200, p: 93800 },
  { d: "Sun", v: 73500, p: 76800 },
];

const FORECAST_DATA = [
  { d: "W1", a: 184000, f: 184000 },
  { d: "W2", a: 196500, f: 196500 },
  { d: "W3", a: 188200, f: 188200 },
  { d: "W4", a: 212000, f: 212000 },
  { d: "W5", a: null, f: 234500 },
  { d: "W6", a: null, f: 251800 },
];

const PEAK_HOURS = [
  { h: "9a", v: 22 },
  { h: "11a", v: 34 },
  { h: "1p", v: 78 },
  { h: "3p", v: 41 },
  { h: "5p", v: 52 },
  { h: "7p", v: 96 },
  { h: "9p", v: 84 },
  { h: "11p", v: 38 },
];

const POPULAR_DISHES = [
  { name: "Butter Chicken", value: 432, pct: 96 },
  { name: "Paneer Tikka", value: 388, pct: 86 },
  { name: "Margherita Pizza", value: 312, pct: 69 },
  { name: "Masala Dosa", value: 268, pct: 60 },
  { name: "Biryani", value: 245, pct: 54 },
];

const PROFIT_DATA = [
  { m: "Apr", v: 18 },
  { m: "May", v: 22 },
  { m: "Jun", v: 19 },
  { m: "Jul", v: 26 },
  { m: "Aug", v: 31 },
  { m: "Sep", v: 28 },
  { m: "Oct", v: 36 },
];

const INVENTORY_DATA = [
  { d: "Mon", lvl: 84 },
  { d: "Tue", lvl: 72 },
  { d: "Wed", lvl: 64 },
  { d: "Thu", lvl: 51 },
  { d: "Fri", lvl: 38 },
  { d: "Sat", lvl: 22 },
];

const ORANGE = "#f97316";
const ORANGE_DARK = "#ea580c";
const AMBER = "#f59e0b";
const AMBER_LIGHT = "#fbbf24";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type TileProps = {
  icon: LucideIcon;
  label: string;
  accent?: "orange" | "amber";
  className?: string;
  children: React.ReactNode;
};

function Tile({ icon: Icon, label, accent = "orange", className, children }: TileProps) {
  return (
    <motion.div variants={staggerItem} className={cn("h-full", className)}>
      <div className="group glass-card gradient-border relative h-full overflow-hidden rounded-3xl p-5 shadow-premium transition-transform duration-300 hover:-translate-y-1.5">
        <div
          className={cn(
            "pointer-events-none absolute -right-12 -top-12 size-32 rounded-full blur-2xl transition-opacity duration-500",
            accent === "orange" ? "bg-brand-300/40" : "bg-amber-300/40",
          )}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-xl text-white shadow-glow-orange-sm",
                accent === "orange"
                  ? "bg-gradient-to-br from-brand-400 to-brand-600"
                  : "bg-gradient-to-br from-amber-400 to-brand-500",
              )}
            >
              <Icon className="size-4.5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
          <span
            className={cn(
              "size-1.5 rounded-full animate-glow-pulse",
              accent === "orange" ? "bg-brand-500" : "bg-amber-500",
            )}
          />
        </div>
        <div className="relative mt-4">{children}</div>
      </div>
    </motion.div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  prefix = "₹",
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  prefix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-brand-200/70 bg-white/95 px-3 py-2 shadow-premium backdrop-blur">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="mt-0.5 flex items-center gap-2 text-[11px] text-foreground">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color || p.fill || p.stroke }}
          />
          <span className="capitalize text-muted-foreground">{p.name}:</span>
          <span className="font-bold">
            {prefix}
            {Number(p.value).toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Assistant Widget                                                */
/* ------------------------------------------------------------------ */

function AIAssistant() {
  const messages = [
    "Predicted 18% revenue growth next week — staff up Sat 8pm.",
    "Biryani stock will run out by Friday. Reorder tomorrow.",
    "3 VIPs are likely to churn. Send win-back offers now.",
  ];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % messages.length);
    }, 4200);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <Reveal direction="left" delay={0.2}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-card gradient-border relative w-full max-w-sm overflow-hidden rounded-3xl p-4 shadow-premium"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow-orange-sm">
            <Bot className="size-5.5" />
            <span className="absolute -right-0.5 -top-0.5 flex size-3 items-center justify-center">
              <span className="absolute size-3 animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="size-2.5 rounded-full bg-brand-500 ring-2 ring-white" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-foreground">R360 Assistant</span>
              <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brand-700">
                AI
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">Live · forecasting engine</div>
          </div>
        </div>

        <div className="relative mt-3 min-h-[58px] rounded-2xl border border-brand-100 bg-white/70 p-3">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-xs leading-relaxed text-foreground"
          >
            <Sparkles className="mr-1 inline size-3.5 text-amber-500" />
            {messages[idx]}
          </motion.p>
          <div className="mt-2 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="size-1 rounded-full bg-brand-400"
              />
            ))}
            <span className="ml-1 text-[9px] text-muted-foreground">typing insight…</span>
          </div>
        </div>

        <div className="relative mt-2 flex flex-wrap items-center gap-1.5">
          {["Forecast", "Stock alert", "Churn risk", "Pricing"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-brand-200 bg-white/60 px-2 py-0.5 text-[9px] font-semibold text-brand-700"
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric tiles content                                               */
/* ------------------------------------------------------------------ */

function RevenueTile() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-3xl font-bold text-foreground">
            ₹
            <AnimatedCounter value={912400} />
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-600">
              <ArrowUpRight className="size-3" />
              18.4%
            </span>
            <span className="text-muted-foreground">vs last week</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-brand-700">
          <IndianRupee className="size-3" /> This week
        </div>
      </div>
      <div className="mt-3 h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.5} />
                <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              name="actual"
              stroke={ORANGE_DARK}
              strokeWidth={2.5}
              fill="url(#revGrad)"
              isAnimationActive
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="p"
              name="predicted"
              stroke={AMBER_LIGHT}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              fill="none"
              isAnimationActive
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PredictionTile() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-2xl font-bold text-foreground">
            ₹<AnimatedCounter value={251800} />
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">6-week forecast (next 2 wk)</div>
        </div>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
          <TrendingUp className="size-3" /> +18%
        </span>
      </div>
      <div className="mt-3 h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={FORECAST_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="fcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={AMBER} stopOpacity={0.45} />
                <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="d"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={32}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="a"
              name="actual"
              stroke={ORANGE_DARK}
              strokeWidth={2.5}
              fill="url(#fcGrad)"
              isAnimationActive
              animationDuration={1200}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="f"
              name="forecast"
              stroke={AMBER_LIGHT}
              strokeWidth={2}
              strokeDasharray="5 4"
              fill="none"
              isAnimationActive
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PeakHoursTile() {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <div className="font-display text-2xl font-bold text-foreground">
            <AnimatedCounter value={8} />
            <span className="text-base text-muted-foreground">pm</span>
          </div>
          <div className="text-[11px] text-muted-foreground">Peak footfall tonight</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
          <CalendarClock className="size-3" /> 96% capacity
        </span>
      </div>
      <div className="h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PEAK_HOURS} margin={{ top: 4, right: 0, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(234,88,12,0.08)" vertical={false} />
            <XAxis
              dataKey="h"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ fill: "rgba(249,115,22,0.08)" }}
              content={<ChartTooltip prefix="" />}
            />
            <Bar dataKey="v" name="covers" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1100}>
              {PEAK_HOURS.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.v >= 90
                      ? ORANGE_DARK
                      : entry.v >= 70
                        ? ORANGE
                        : entry.v >= 50
                          ? AMBER
                          : "#fcd34d"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PopularDishesTile() {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <div className="font-display text-lg font-bold text-foreground">Top dishes</div>
          <div className="text-[11px] text-muted-foreground">By units sold · this week</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
          <Boxes className="size-3" /> 1,645 units
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {POPULAR_DISHES.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3">
            <span className="w-5 font-display text-xs font-bold text-brand-700">#{i + 1}</span>
            <div className="flex-1">
              <div className="mb-0.5 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-foreground">{d.name}</span>
                <span className="text-muted-foreground">{d.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-brand-500 to-brand-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfitTile() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-3xl font-bold text-foreground">
            ₹<AnimatedCounter value={36} />L
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">Profit · last 7 months</div>
        </div>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
          <ArrowUpRight className="size-3" /> +28%
        </span>
      </div>
      <div className="mt-3 h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PROFIT_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(234,88,12,0.08)" vertical={false} />
            <XAxis
              dataKey="m"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ stroke: "#fdba74", strokeWidth: 1 }}
              content={<ChartTooltip prefix="₹" />}
            />
            <Line
              type="monotone"
              dataKey="v"
              name="profit"
              stroke={ORANGE_DARK}
              strokeWidth={3}
              dot={{ r: 3, fill: ORANGE_DARK, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#fff", stroke: ORANGE_DARK, strokeWidth: 2 }}
              isAnimationActive
              animationDuration={1300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InventoryTile() {
  const lowStock = INVENTORY_DATA[INVENTORY_DATA.length - 1].lvl;
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-2xl font-bold text-foreground">
            <AnimatedCounter value={lowStock} />%
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Stock projected · Sat low
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
          <PackageCheck className="size-3" /> Reorder
        </span>
      </div>
      <div className="mt-3 h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={INVENTORY_DATA} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="d"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={28}
              domain={[0, 100]}
            />
            <Tooltip content={<ChartTooltip prefix="" />} />
            <Area
              type="monotone"
              dataKey="lvl"
              name="stock %"
              stroke={AMBER}
              strokeWidth={2.5}
              fill="url(#invGrad)"
              isAnimationActive
              animationDuration={1100}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function AIAnalytics() {
  return (
    <Section id="ai" className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute -right-32 top-24 -z-10 size-96 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-20 -z-10 size-80 rounded-full bg-amber-200/30 blur-3xl" />

      <SectionHeading
        eyebrow="AI Analytics"
        title={
          <>
            Predict tomorrow, <span className="text-gradient-orange">today</span>
          </>
        }
        description="A real-time intelligence layer that forecasts revenue, projects stock, surfaces churn risk and staffs you up before the rush — all rendered in a single cinematic dashboard."
      />

      <div className="mt-14 grid items-start gap-5 lg:grid-cols-12">
        {/* Left column: metrics grid */}
        <div className="lg:col-span-8">
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2" staggerChildren={0.08}>
            <Tile icon={IndianRupee} label="Revenue" className="sm:col-span-2">
              <RevenueTile />
            </Tile>
            <Tile icon={TrendingUp} label="Sales Prediction">
              <PredictionTile />
            </Tile>
            <Tile icon={CalendarClock} label="Peak Hours" accent="amber">
              <PeakHoursTile />
            </Tile>
            <Tile icon={Boxes} label="Popular Dishes">
              <PopularDishesTile />
            </Tile>
            <Tile icon={IndianRupee} label="Profit" accent="amber">
              <ProfitTile />
            </Tile>
            <Tile icon={PackageCheck} label="Inventory Forecast" className="sm:col-span-2">
              <InventoryTile />
            </Tile>
          </Stagger>
        </div>

        {/* Right column: AI assistant + KPI rail */}
        <div className="lg:col-span-4">
          <Stagger className="flex flex-col gap-5" staggerChildren={0.1}>
            <motion.div variants={staggerItem}>
              <AIAssistant />
            </motion.div>
            <motion.div variants={staggerItem}>
              <div className="glass-card gradient-border relative overflow-hidden rounded-3xl p-5 shadow-premium">
                <div className="pointer-events-none absolute -left-8 -top-8 size-32 rounded-full bg-amber-300/30 blur-3xl" />
                <div className="relative flex items-center gap-2">
                  <Sparkles className="size-4 text-amber-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live KPIs
                  </span>
                </div>
                <div className="relative mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: "Avg. ticket", value: 642, prefix: "₹" },
                    { label: "Table turnover", value: 4.8, decimals: 1, suffix: "x" },
                    { label: "Repeat rate", value: 68, suffix: "%" },
                    { label: "NPS", value: 72 },
                  ].map((k) => (
                    <div key={k.label} className="rounded-2xl border border-border bg-white/70 p-3">
                      <div className="font-display text-lg font-bold text-foreground">
                        {k.prefix}
                        <AnimatedCounter value={k.value} decimals={k.decimals ?? 0} suffix={k.suffix ?? ""} />
                      </div>
                      <div className="text-[10px] text-muted-foreground">{k.label}</div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-3 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-amber-50 p-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-brand-700">
                    <Bot className="size-3.5" />
                    Recommended action
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    Add 2 servers and 1 line cook for Sat 7–9pm. Expected uplift: ₹38K.
                  </p>
                </div>
              </div>
            </motion.div>
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

export default AIAnalytics;
