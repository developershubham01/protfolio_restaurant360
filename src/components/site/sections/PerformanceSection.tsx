"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Gauge,
  Zap,
  MonitorCheck,
  RefreshCw,
  Server,
  Users,
  Database,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeading,
  Reveal,
  Stagger,
  AnimatedCounter,
} from "../shared";

type Metric = {
  icon: LucideIcon;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accent?: boolean;
};

const METRICS: Metric[] = [
  { icon: Gauge, value: 99.99, decimals: 2, suffix: "%", label: "Uptime SLA", accent: true },
  { icon: Zap, value: 10, prefix: "<", suffix: "ms", label: "Instant Billing" },
  { icon: MonitorCheck, value: 50, prefix: "<", suffix: "ms", label: "Zero Latency POS" },
  { icon: RefreshCw, value: 100, prefix: "<", suffix: "ms", label: "Kitchen Sync" },
  { icon: Server, value: 80, prefix: "<", suffix: "ms", label: "Fast API Response" },
  { icon: Users, value: 10, suffix: "K+", label: "Concurrent Users" },
  { icon: Database, value: 1, suffix: "ms", label: "Database Indexing" },
];

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const GAUGE_VALUE = 99.99;
const ARC_RADIUS = 150;
const ARC_LENGTH = Math.PI * ARC_RADIUS; // ≈ 471.24

export function PerformanceSection() {
  return (
    <Section id="performance" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dots opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-40 -z-10 size-72 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 -z-10 size-80 rounded-full bg-brand-300/25 blur-3xl" />

      <SectionHeading
        eyebrow="Performance"
        title={
          <>
            Built for <span className="text-gradient-orange">speed</span> at scale
          </>
        }
        description="Sub-second response times, real-time kitchen sync, and a globally distributed cloud that keeps every branch running fast — even at peak dinner rush."
      />

      {/* Gauge hero */}
      <Reveal className="mt-12" delay={0.1}>
        <GaugeHero />
      </Reveal>

      {/* Metric cards */}
      <Stagger
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
        staggerChildren={0.06}
        amount={0.2}
      >
        {METRICS.map((m) => (
          <motion.div key={m.label} variants={cardEnter}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

function GaugeHero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Needle angle: -90° (pointing left) → ~89.98° (pointing right) for 99.99%.
  const needleTarget = -90 + (GAUGE_VALUE / 100) * 180;
  const fillOffset = ARC_LENGTH * (1 - GAUGE_VALUE / 100);

  return (
    <div
      ref={ref}
      className="relative mx-auto grid w-full max-w-3xl place-items-center"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute size-[420px] rounded-full bg-brand-300/20 blur-3xl"
        aria-hidden
      />

      {/* Gauge SVG */}
      <div className="relative w-full max-w-[560px]">
        <svg
          viewBox="0 0 360 240"
          className="w-full"
          role="img"
          aria-label="Uptime gauge at 99.99 percent"
        >
          <defs>
            <linearGradient id="perfGaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="45%" stopColor="#fb923c" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="perfNeedleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <path
            d="M 30 200 A 150 150 0 0 1 330 200"
            fill="none"
            stroke="rgba(234, 88, 12, 0.12)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = -180 + (i / 10) * 180; // -180° → 0°
            const rad = (angle * Math.PI) / 180;
            const r1 = 130;
            const r2 = i % 5 === 0 ? 116 : 122;
            const round = (n: number) => Math.round(n * 100) / 100;
            const x1 = round(180 + r1 * Math.cos(rad));
            const y1 = round(200 + r1 * Math.sin(rad));
            const x2 = round(180 + r2 * Math.cos(rad));
            const y2 = round(200 + r2 * Math.sin(rad));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(234, 88, 12, 0.28)"
                strokeWidth={i % 5 === 0 ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Animated foreground arc */}
          <motion.path
            d="M 30 200 A 150 150 0 0 1 330 200"
            fill="none"
            stroke="url(#perfGaugeGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={ARC_LENGTH}
            initial={{ strokeDashoffset: ARC_LENGTH }}
            animate={{ strokeDashoffset: inView ? fillOffset : ARC_LENGTH }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />

          {/* Needle */}
          <motion.g
            style={{ transformOrigin: "180px 200px" }}
            initial={{ rotate: -90 }}
            animate={{ rotate: inView ? needleTarget : -90 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            <line
              x1="180"
              y1="200"
              x2="180"
              y2="70"
              stroke="url(#perfNeedleGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="180" cy="70" r="6" fill="#ea580c" />
          </motion.g>

          {/* Hub */}
          <circle cx="180" cy="200" r="12" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="180" cy="200" r="4" fill="#ea580c" />

          {/* Min/Max labels */}
          <text x="30" y="222" fontSize="11" fill="rgba(15, 23, 42, 0.5)" textAnchor="middle">
            0%
          </text>
          <text x="330" y="222" fontSize="11" fill="rgba(15, 23, 42, 0.5)" textAnchor="middle">
            100%
          </text>
        </svg>

        {/* Center readout */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex flex-col items-center">
          <div className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            <span className="text-gradient-orange">
              <AnimatedCounter value={GAUGE_VALUE} decimals={2} suffix="%" />
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-green-500 animate-glow-pulse" />
            Uptime
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  value,
  decimals = 0,
  prefix,
  suffix,
  label,
  accent,
}: Metric) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group glass-card gradient-border relative h-full overflow-hidden rounded-2xl p-4",
        accent && "ring-1 ring-brand-300/60",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow-orange-sm transition-transform group-hover:scale-110",
            accent ? "from-amber-400 to-brand-600" : "from-brand-400 to-brand-600",
          )}
        >
          <Icon className="size-4" strokeWidth={2.2} />
        </span>
        {accent && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-700">
            Live
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        <AnimatedCounter value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default PerformanceSection;
