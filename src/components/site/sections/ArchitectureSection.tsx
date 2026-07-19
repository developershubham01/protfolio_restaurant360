"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CloudUpload,
  Database,
  Globe,
  KeyRound,
  Layers,
  Server,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Reveal,
  Section,
  SectionHeading,
  Stagger,
  staggerItem,
} from "../shared";

/* ------------------------------------------------------------------ */
/*  Nodes                                                              */
/* ------------------------------------------------------------------ */

type FlowNode = {
  id: string;
  label: string;
  role: string;
  icon: LucideIcon;
  accent: "orange" | "amber";
};

const NODES: FlowNode[] = [
  { id: "browser", label: "Browser", role: "Customer entry point", icon: Globe, accent: "orange" },
  { id: "react", label: "React", role: "UI rendering layer", icon: Layers, accent: "amber" },
  { id: "spring", label: "Spring Boot", role: "API & business logic", icon: Server, accent: "orange" },
  { id: "jwt", label: "JWT Auth", role: "Stateless auth layer", icon: KeyRound, accent: "amber" },
  { id: "postgres", label: "PostgreSQL", role: "Transactional store", icon: Database, accent: "orange" },
  { id: "storage", label: "Cloud Storage", role: "Files & backups", icon: CloudUpload, accent: "amber" },
  { id: "analytics", label: "Analytics Engine", role: "Insights pipeline", icon: BarChart3, accent: "orange" },
];

/* ------------------------------------------------------------------ */
/*  Node card                                                          */
/* ------------------------------------------------------------------ */

function NodeCard({ node, index }: { node: FlowNode; index: number }) {
  const Icon = node.icon;
  const isOrange = node.accent === "orange";
  return (
    <motion.div variants={staggerItem} className="relative shrink-0">
      {/* step number */}
      <span
        className={cn(
          "absolute -left-2 -top-2 z-10 flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-glow-orange-sm",
          isOrange
            ? "bg-gradient-to-br from-brand-500 to-brand-700"
            : "bg-gradient-to-br from-amber-400 to-brand-500",
        )}
      >
        {index + 1}
      </span>

      <div className="group glass-card gradient-border relative w-[150px] overflow-hidden rounded-3xl p-4 shadow-premium transition-transform duration-300 hover:-translate-y-1.5">
        <div
          className={cn(
            "pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100",
            isOrange ? "bg-brand-300/40" : "bg-amber-300/40",
          )}
        />
        <div className="relative flex items-center gap-2.5">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl text-white shadow-glow-orange-sm",
              isOrange
                ? "bg-gradient-to-br from-brand-400 to-brand-600"
                : "bg-gradient-to-br from-amber-400 to-brand-500",
            )}
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm font-bold leading-tight text-foreground">
              {node.label}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-brand-700">
              Layer {index + 1}
            </div>
          </div>
        </div>
        <p className="relative mt-3 text-[11px] leading-relaxed text-muted-foreground">
          {node.role}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connectors                                                         */
/* ------------------------------------------------------------------ */

const ORANGE = "#f97316";
const ORANGE_LIGHT = "#fdba74";

/** Horizontal connector with animated dashed flow + traveling dot */
function ConnectorHorizontal({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative h-10 w-10 shrink-0 sm:w-14 lg:w-16" aria-hidden>
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 64 40"
        preserveAspectRatio="none"
      >
        {/* base dashed line */}
        <line
          x1="2"
          y1="20"
          x2="62"
          y2="20"
          stroke={ORANGE_LIGHT}
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
        {/* animated flowing dash */}
        <motion.line
          x1="2"
          y1="20"
          x2="62"
          y2="20"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeDasharray="8 56"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 64 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      </svg>
      {/* traveling glowing dot */}
      <motion.span
        className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_12px_3px_rgba(249,115,22,0.7)]"
        animate={{ left: ["2%", "94%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </div>
  );
}

/** Vertical connector (mobile) */
function ConnectorVertical({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative h-10 w-10 shrink-0" aria-hidden>
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
      >
        <line
          x1="20"
          y1="2"
          x2="20"
          y2="38"
          stroke={ORANGE_LIGHT}
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
        <motion.line
          x1="20"
          y1="2"
          x2="20"
          y2="38"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeDasharray="8 34"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 42 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      </svg>
      <motion.span
        className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_12px_3px_rgba(249,115,22,0.7)]"
        animate={{ top: ["2%", "94%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function ArchitectureSection() {
  return (
    <Section id="architecture" className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-32 -z-10 size-80 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-32 -z-10 size-80 rounded-full bg-amber-200/40 blur-3xl" />

      <SectionHeading
        eyebrow="Architecture"
        title={
          <>
            A system engineered to <span className="text-gradient-orange">scale</span>
          </>
        }
        description="Every request flows through a deliberate, layered pipeline — from the browser to our analytics engine. Watch the flow move."
      />

      {/* ===== Desktop: horizontal flow ===== */}
      <Reveal>
        <div className="perspective-2000 mt-14 hidden lg:block">
          <Stagger
            className="flex flex-row items-center justify-center"
            staggerChildren={0.1}
          >
            {NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <NodeCard node={node} index={i} />
                {i < NODES.length - 1 && (
                  <ConnectorHorizontal delay={i * 0.25} />
                )}
              </React.Fragment>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* ===== Tablet: 2-row wrap flow ===== */}
      <Reveal>
        <div className="mt-12 hidden sm:block lg:hidden">
          <Stagger
            className="flex flex-row flex-wrap items-center justify-center gap-y-4"
            staggerChildren={0.1}
          >
            {NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <NodeCard node={node} index={i} />
                {i < NODES.length - 1 && (
                  <ConnectorHorizontal delay={i * 0.25} />
                )}
              </React.Fragment>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* ===== Mobile: vertical flow ===== */}
      <Reveal>
        <div className="mt-12 block sm:hidden">
          <Stagger
            className="flex flex-col items-center"
            staggerChildren={0.1}
          >
            {NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <NodeCard node={node} index={i} />
                {i < NODES.length - 1 && (
                  <ConnectorVertical delay={i * 0.25} />
                )}
              </React.Fragment>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* ===== Legend / annotations ===== */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Server,
            title: "Stateless & elastic",
            desc: "Every layer scales horizontally. Add capacity at the layer under load — nothing else changes.",
          },
          {
            icon: KeyRound,
            title: "Secure by default",
            desc: "JWT-verified requests, RBAC roles and per-tenant isolation enforced at the API boundary.",
          },
          {
            icon: BarChart3,
            title: "Observable end-to-end",
            desc: "Every hop emits structured events feeding the analytics engine in near real-time.",
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="glass-card gradient-border relative h-full overflow-hidden rounded-3xl p-5 shadow-premium">
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-brand-300/30 blur-2xl" />
                <div className="relative flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow-orange-sm">
                    <Icon className="size-4.5" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground">{card.title}</h4>
                </div>
                <p className="relative mt-3 text-xs leading-relaxed text-muted-foreground">
                  {card.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default ArchitectureSection;
