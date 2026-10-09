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
  CheckCircle2,
  ShieldCheck,
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
  { icon: Users, value: 50, suffix: "+", label: "Restaurants Live" },
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
const ARC_RADIUS = 145;
const ARC_LENGTH = Math.PI * ARC_RADIUS; // ≈ 455.53

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
        description="Sub-second response times, real-time kitchen sync, and a hybrid architecture that keeps every branch running fast offline and online — even at peak dinner rush."
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
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Progress arc offset for 99.99%
  const fillOffset = ARC_LENGTH * (1 - GAUGE_VALUE / 100);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex w-full max-w-3xl flex-col items-center"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-8 size-[380px] rounded-full bg-gradient-to-b from-brand-300/30 to-amber-300/20 blur-3xl"
        aria-hidden
      />

      {/* Gauge container */}
      <div className="relative w-full max-w-[540px] px-4">
        <svg
          viewBox="0 0 380 230"
          className="w-full drop-shadow-sm"
          role="img"
          aria-label="High-availability Uptime gauge at 99.99%"
        >
          <defs>
            <linearGradient id="perfGaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="35%" stopColor="#fb923c" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <filter id="perfGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <path
            d="M 45 185 A 145 145 0 0 1 335 185"
            fill="none"
            stroke="rgba(234, 88, 12, 0.12)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Calibrated Tick Marks */}
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = -180 + (i / 10) * 180; // -180° → 0°
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 5 === 0;
            const r1 = 124;
            const r2 = isMajor ? 112 : 118;
            const x1 = Math.round((190 + r1 * Math.cos(rad)) * 100) / 100;
            const y1 = Math.round((185 + r1 * Math.sin(rad)) * 100) / 100;
            const x2 = Math.round((190 + r2 * Math.cos(rad)) * 100) / 100;
            const y2 = Math.round((185 + r2 * Math.sin(rad)) * 100) / 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? "rgba(234, 88, 12, 0.45)" : "rgba(234, 88, 12, 0.22)"}
                strokeWidth={isMajor ? 2.2 : 1.2}
                strokeLinecap="round"
              />
            );
          })}

          {/* Animated filled progress arc */}
          <motion.path
            d="M 45 185 A 145 145 0 0 1 335 185"
            fill="none"
            stroke="url(#perfGaugeGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={ARC_LENGTH}
            initial={{ strokeDashoffset: ARC_LENGTH }}
            animate={{ strokeDashoffset: inView ? fillOffset : ARC_LENGTH }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Glowing live beacon at the 99.99% endpoint */}
          <g transform="translate(335, 185)">
            <motion.circle
              r="8"
              fill="#ea580c"
              opacity={0.35}
              animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0.1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle r="4.5" fill="#ea580c" filter="url(#perfGlow)" />
            <circle r="2.2" fill="#ffffff" />
          </g>

          {/* Scale benchmarks */}
          <text
            x="45"
            y="212"
            fontSize="12"
            fontWeight="600"
            fill="rgba(100, 116, 139, 0.75)"
            textAnchor="middle"
          >
            0%
          </text>
          <text
            x="190"
            y="42"
            fontSize="10"
            fontWeight="500"
            fill="rgba(100, 116, 139, 0.55)"
            textAnchor="middle"
          >
            50%
          </text>
          <text
            x="335"
            y="212"
            fontSize="12"
            fontWeight="600"
            fill="rgba(100, 116, 139, 0.75)"
            textAnchor="middle"
          >
            100%
          </text>
        </svg>

        {/* Center Readout: Clean, Spacious, and Zero Overlap */}
        <div className="pointer-events-none absolute inset-x-0 top-[30%] flex flex-col items-center justify-center text-center">
          <div className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-none">
            <span className="text-gradient-orange">
              <AnimatedCounter value={GAUGE_VALUE} decimals={2} suffix="%" duration={1.6} />
            </span>
          </div>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-xs backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>All Systems Operational</span>
            <span className="text-emerald-300">•</span>
            <span className="font-medium text-emerald-700">99.99% Uptime</span>
          </div>
        </div>
      </div>

      {/* User-friendly reliability badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/60 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur">
          <CheckCircle2 className="size-3.5 text-emerald-600" />
          <span>24/7/365 Real-Time Monitoring</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/60 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur">
          <Zap className="size-3.5 text-amber-500" />
          <span>Sub-Second Offline Failover</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/60 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur">
          <ShieldCheck className="size-3.5 text-brand-600" />
          <span>Enterprise SLA Guarantee</span>
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
