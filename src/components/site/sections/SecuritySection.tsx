"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  UserCog,
  Lock,
  ScrollText,
  Webhook,
  DatabaseBackup,
  CloudCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Reveal, Stagger } from "../shared";

type Feature = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

const FEATURES: Feature[] = [
  { icon: KeyRound, label: "JWT Authentication", desc: "Signed, stateless tokens for every session." },
  { icon: UserCog, label: "Role Based Access", desc: "Granular permissions per role & module." },
  { icon: Lock, label: "Encrypted Passwords", desc: "Salted bcrypt hashing, never plaintext." },
  { icon: ScrollText, label: "Audit Logs", desc: "Tamper-evident logs for every action." },
  { icon: Webhook, label: "Secure APIs", desc: "OAuth2, rate-limited & signed payloads." },
  { icon: DatabaseBackup, label: "Database Backup", desc: "Hourly snapshots with 30-day PITR." },
  { icon: CloudCheck, label: "Cloud Security", desc: "ISO 27001 & SOC 2 ready infrastructure." },
];

const chipEnter: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Polar position for an item around a center, starting at top (12 o'clock), clockwise. */
function radialPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI;
  return {
    x: Math.round(radius * Math.sin(angle)),
    y: -Math.round(radius * Math.cos(angle)),
  };
}

export function SecuritySection() {
  return (
    <Section id="security" className="relative overflow-hidden bg-aurora">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-brand-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="Security"
        title={
          <>
            Enterprise-grade <span className="text-gradient-orange">security</span> by default
          </>
        }
        description="Bank-grade encryption, granular access controls, and continuous monitoring protect every order, customer, and report across your restaurant network."
      />

      {/* Desktop — radial arrangement around the shield */}
      <Reveal className="mt-12 hidden lg:block" delay={0.1}>
        <div className="relative mx-auto h-[640px] w-full max-w-5xl">
          <ShieldCenterpiece />
          <Stagger
            className="absolute inset-0"
            staggerChildren={0.08}
            amount={0.2}
          >
            {FEATURES.map((f, i) => {
              const pos = radialPosition(i, FEATURES.length, 270);
              return (
                <div
                  key={f.label}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  }}
                >
                  <motion.div variants={chipEnter}>
                    <FeatureChip {...f} />
                  </motion.div>
                </div>
              );
            })}
          </Stagger>
        </div>
      </Reveal>

      {/* Mobile / tablet — shield hero + grid */}
      <div className="mt-12 lg:hidden">
        <Reveal>
          <ShieldCenterpiece compact />
        </Reveal>
        <Stagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          staggerChildren={0.07}
        >
          {FEATURES.map((f) => (
            <motion.div key={f.label} variants={chipEnter}>
              <FeatureChip {...f} />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function ShieldCenterpiece({ compact = false }: { compact?: boolean }) {
  const containerSize = compact ? "h-[320px]" : "h-full";
  const shieldSize = compact ? "size-36" : "size-44";

  return (
    <div className={cn("relative grid w-full place-items-center", containerSize)}>
      {/* Pulsing aura rings */}
      <div
        className="pointer-events-none absolute inset-0 grid place-items-center"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-400/40"
            style={{ width: 220 + i * 80, height: 220 + i * 80 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 4, delay: i * 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Soft glow blob */}
      <div
        className="pointer-events-none absolute size-72 rounded-full bg-brand-400/30 blur-3xl"
        aria-hidden
      />

      {/* Outer rotating dashed ring */}
      <motion.svg
        className="absolute"
        width="360"
        height="360"
        viewBox="0 0 360 360"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="secDashGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <circle
          cx="180"
          cy="180"
          r="160"
          fill="none"
          stroke="url(#secDashGrad)"
          strokeWidth="2"
          strokeDasharray="6 14"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Inner counter-rotating thin ring */}
      <motion.svg
        className="absolute"
        width="300"
        height="300"
        viewBox="0 0 300 300"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <circle
          cx="150"
          cy="150"
          r="135"
          fill="none"
          stroke="rgba(249, 115, 22, 0.18)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </motion.svg>

      {/* Shield body with continuous float */}
      <motion.div
        className={cn(
          "relative grid place-items-center rounded-[2.25rem] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 text-white shadow-premium glow-orange",
          shieldSize,
        )}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner glass highlight */}
        <div
          className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-white/30 to-transparent"
          aria-hidden
        />
        {/* Lock glyph */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShieldCheck className="size-20" strokeWidth={1.5} />
        </motion.div>
        {/* Compliance badge */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700 shadow-glow-orange-sm">
          SOC 2 Ready
        </span>
      </motion.div>
    </div>
  );
}

function FeatureChip({ icon: Icon, label, desc }: Feature) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group glass-card gradient-border relative w-52 rounded-2xl p-4"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-amber-50 text-brand-600 ring-1 ring-brand-200/70 transition-colors group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold text-foreground">{label}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default SecuritySection;
