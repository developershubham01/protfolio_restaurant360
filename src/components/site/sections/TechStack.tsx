"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Cloud,
  Container,
  Database,
  GitBranch,
  KeyRound,
  Leaf,
  Layers,
  Server,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Reveal,
  Section,
  SectionHeading,
  Stagger,
  TiltCard,
  staggerItem,
} from "../shared";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Category = "Backend" | "Frontend" | "Database" | "DevOps" | "Security";

type Tech = {
  name: string;
  badge: string;
  icon: LucideIcon;
  category: Category;
  color: string;
  description: string;
  why: string;
};

const TECHS: Tech[] = [
  {
    name: "Spring Boot",
    badge: "SB",
    icon: Leaf,
    category: "Backend",
    color: "#ea580c",
    description:
      "The core backend framework powering Restaurant360's REST + WebSocket APIs. Spring Boot auto-configures the entire application context, giving us production-ready services in minutes.",
    why: "Mature ecosystem, first-class security, and battle-tested at enterprise scale — perfect for multi-tenant restaurant workloads.",
  },
  {
    name: "Java 25",
    badge: "25",
    icon: Zap,
    category: "Backend",
    color: "#f97316",
    description:
      "We build on the latest LTS — Java 25 — for virtual threads, pattern matching and modern language features that keep request handlers fast and the codebase clean.",
    why: "Virtual threads let us serve thousands of concurrent POS sessions per instance with minimal memory.",
  },
  {
    name: "PostgreSQL",
    badge: "PG",
    icon: Database,
    category: "Database",
    color: "#fb923c",
    description:
      "The primary relational store for orders, customers, inventory and financials. Schemas are migrated with Flyway, and JSONB columns handle flexible menu configs.",
    why: "ACID guarantees + excellent analytical query planner = trustworthy reporting at scale.",
  },
  {
    name: "React",
    badge: "R",
    icon: Layers,
    category: "Frontend",
    color: "#f59e0b",
    description:
      "The UI layer of Restaurant360's web dashboards (POS, KDS, analytics). Component-driven, declarative and instantly reactive to live order events.",
    why: "The largest talent pool and ecosystem makes iteration fast and onboarding painless.",
  },
  {
    name: "TypeScript",
    badge: "TS",
    icon: ShieldCheck,
    category: "Frontend",
    color: "#ea580c",
    description:
      "Every line of frontend (and shared types with backend) is strictly typed. End-to-end type safety catches bugs before they ship.",
    why: "Type-driven development cuts refactor time in half and makes APIs self-documenting.",
  },
  {
    name: "Vite",
    badge: "V",
    icon: Zap,
    category: "Frontend",
    color: "#f97316",
    description:
      "Our dev server and build pipeline. Vite's native ESM + HMR gives sub-50ms hot reloads across hundreds of components and routes.",
    why: "Developer velocity compounds — faster builds means more experiments shipped per week.",
  },
  {
    name: "Flyway",
    badge: "FW",
    icon: GitBranch,
    category: "Database",
    color: "#fb923c",
    description:
      "Versioned SQL migrations for PostgreSQL. Every release ships a deterministic, replayable schema change set — zero drift between environments.",
    why: "Repeatable migrations make rollbacks safe and zero-downtime deploys realistic.",
  },
  {
    name: "JWT",
    badge: "JWT",
    icon: KeyRound,
    category: "Security",
    color: "#f59e0b",
    description:
      "Stateless authentication for staff, managers and customers. Short-lived access tokens paired with rotating refresh tokens secure every API call.",
    why: "No session store = horizontally scalable auth, perfect for multi-tenant chains.",
  },
  {
    name: "HikariCP",
    badge: "HK",
    icon: Layers,
    category: "Backend",
    color: "#ea580c",
    description:
      "The connection pooler between Spring Boot and PostgreSQL. Tuned for low-latency, high-throughput transactional workloads with intelligent leak detection.",
    why: "Sub-millisecond pool acquisition keeps order writes snappy even during dinner rushes.",
  },
  {
    name: "Tauri",
    badge: "TR",
    icon: Container,
    category: "Frontend",
    color: "#f97316",
    description:
      "Packages the Restaurant360 POS and KDS frontends into lightweight native desktop apps for Windows, macOS and Linux — using the OS webview, not Electron.",
    why: "Tiny binary size (~10MB), native performance and offline-first capability for in-store terminals.",
  },
  {
    name: "Docker",
    badge: "DK",
    icon: Container,
    category: "DevOps",
    color: "#fb923c",
    description:
      "Every service ships as an immutable container. Reproducible builds from dev laptop to production cluster, with multi-stage images kept lean.",
    why: "Eliminates the 'works on my machine' class of bugs and enables horizontal scaling on day one.",
  },
  {
    name: "Supabase",
    badge: "SB",
    icon: Cloud,
    category: "DevOps",
    color: "#f59e0b",
    description:
      "Managed Postgres, auth and storage for early-stage deployments and customer trials. Supabase lets us spin up isolated tenant environments in seconds.",
    why: "Managed infra reduces ops toil, letting a small team serve thousands of restaurants.",
  },
];

const CATEGORY_STYLES: Record<Category, { ring: string; chip: string; glow: string }> = {
  Backend: {
    ring: "from-brand-400 to-brand-600",
    chip: "bg-brand-50 text-brand-700",
    glow: "bg-brand-300/40",
  },
  Frontend: {
    ring: "from-amber-400 to-brand-500",
    chip: "bg-amber-50 text-amber-700",
    glow: "bg-amber-300/40",
  },
  Database: {
    ring: "from-brand-500 to-brand-700",
    chip: "bg-brand-50 text-brand-700",
    glow: "bg-brand-300/40",
  },
  DevOps: {
    ring: "from-amber-400 to-brand-600",
    chip: "bg-amber-50 text-amber-700",
    glow: "bg-amber-300/40",
  },
  Security: {
    ring: "from-brand-500 to-amber-500",
    chip: "bg-brand-50 text-brand-700",
    glow: "bg-brand-300/40",
  },
};

/* ------------------------------------------------------------------ */
/*  Cube card                                                          */
/* ------------------------------------------------------------------ */

function TechCube({ tech, onOpen }: { tech: Tech; onOpen: () => void }) {
  const Icon = tech.icon;
  const style = CATEGORY_STYLES[tech.category];
  return (
    <motion.div variants={staggerItem} className="h-full">
      <TiltCard max={16} className="h-full">
        <button
          type="button"
          onClick={onOpen}
          className="group relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl glass-card gradient-border p-6 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-orange"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60",
              style.glow,
            )}
          />

          {/* 3D cube badge */}
          <div
            className="relative"
            style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className={cn(
                "flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow-orange-sm",
                style.ring,
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="font-display text-2xl font-extrabold tracking-tight">
                {tech.badge}
              </span>
            </motion.div>
            <div
              className={cn(
                "absolute -right-1.5 -top-1.5 flex size-7 items-center justify-center rounded-full bg-white text-brand-700 shadow-premium",
              )}
            >
              <Icon className="size-3.5" />
            </div>
          </div>

          <div className="text-center" style={{ transform: "translateZ(20px)" }}>
            <div className="font-display text-sm font-bold text-foreground">{tech.name}</div>
            <span
              className={cn(
                "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                style.chip,
              )}
            >
              {tech.category}
            </span>
          </div>

          {/* hover hint */}
          <span
            className="absolute bottom-3 right-3 text-[9px] font-semibold text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ transform: "translateZ(10px)" }}
          >
            Tap to explore →
          </span>
        </button>
      </TiltCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tech dialog                                                        */
/* ------------------------------------------------------------------ */

function TechDialog({ tech, open, onOpenChange }: { tech: Tech | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!tech) return null;
  const Icon = tech.icon;
  const style = CATEGORY_STYLES[tech.category];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card overflow-hidden rounded-3xl border-brand-200/60 p-0 sm:max-w-md">
        {/* Header banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50 p-6">
          <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-amber-300/30 blur-3xl" />
          <DialogHeader className="relative space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow-orange-sm",
                  style.ring,
                )}
              >
                <span className="font-display text-xl font-extrabold">{tech.badge}</span>
              </div>
              <div>
                <DialogTitle className="font-display text-xl font-bold text-foreground">
                  {tech.name}
                </DialogTitle>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    style.chip,
                  )}
                >
                  <Icon className="size-2.5" /> {tech.category}
                </span>
              </div>
            </div>
            <DialogDescription className="sr-only">{tech.name} — {tech.category}</DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6 pt-2">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Boxes className="size-3.5" />
              Role in Restaurant360
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{tech.description}</p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-amber-50 p-4">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Zap className="size-3.5" />
              Why we use it
            </div>
            <p className="text-sm leading-relaxed text-foreground">{tech.why}</p>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Server className="size-3" /> Production · stable
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="size-3" /> Enterprise-ready
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function TechStack() {
  const [selected, setSelected] = React.useState<Tech | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (t: Tech) => {
    setSelected(t);
    setOpen(true);
  };

  return (
    <Section id="stack" className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-32 -z-10 size-80 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-32 -z-10 size-80 rounded-full bg-amber-200/40 blur-3xl" />

      <SectionHeading
        eyebrow="Technology Stack"
        title={
          <>
            Built on a <span className="text-gradient-orange">battle-tested stack</span>
          </>
        }
        description="Twelve production-grade technologies, handpicked for performance, security and longevity. Hover to tilt, click any cube to dive into its role in Restaurant360."
      />

      {/* Category legend */}
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(CATEGORY_STYLES) as Category[]).map((cat) => (
            <span
              key={cat}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                CATEGORY_STYLES[cat].chip,
              )}
            >
              <span className={cn("size-1.5 rounded-full bg-gradient-to-r", CATEGORY_STYLES[cat].ring)} />
              {cat}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Cube grid */}
      <Stagger
        className="perspective-2000 mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
        staggerChildren={0.06}
      >
        {TECHS.map((t) => (
          <TechCube key={t.name} tech={t} onOpen={() => handleOpen(t)} />
        ))}
      </Stagger>

      {/* Bottom note */}
      <Reveal>
        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-brand-600" />
            Every component is audited, dependency-pinned and shipped behind a defense-in-depth security layer.
          </div>
        </div>
      </Reveal>

      <TechDialog tech={selected} open={open} onOpenChange={setOpen} />
    </Section>
  );
}

export default TechStack;
