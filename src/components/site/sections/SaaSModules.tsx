"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Crown,
  Store,
  Receipt,
  ChefHat,
  ClipboardList,
  Boxes,
  Users,
  BarChart3,
  Bot,
  LayoutDashboard,
  Bike,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeading,
  Stagger,
  staggerItem,
  MagneticButton,
} from "../shared";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type Module = {
  id: string;
  title: string;
  short: string;
  long: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
};

const MODULES: Module[] = [
  {
    id: "super-admin",
    title: "Super Admin",
    short: "Multi-tenant control over every restaurant on the platform.",
    long: "Govern the entire Restaurant360 cloud from a single command center. Provision tenants, manage white-label branding, monitor SLA breaches, and roll out updates globally without touching a single server.",
    icon: ShieldCheck,
    features: [
      "Multi-tenant provisioning & RBAC matrix",
      "White-label branding & custom domains",
      "Global usage metering and billing engine",
      "Audit trail with immutable event log",
    ],
    gradient: "from-brand-500 to-amber-500",
  },
  {
    id: "restaurant-owner",
    title: "Restaurant Owner",
    short: "P&L, growth and franchise health in one cockpit.",
    long: "A cockpit for owners tracking P&L across branches. See live revenue, food cost ratios, staff productivity and franchisee performance with one tap drill-downs.",
    icon: Crown,
    features: [
      "Real-time P&L across all branches",
      "Franchisee scorecards & leaderboard",
      "Food cost ratio & margin alerts",
      "Goal tracking with monthly targets",
    ],
    gradient: "from-brand-600 to-brand-400",
  },
  {
    id: "branch-manager",
    title: "Branch Manager",
    short: "Run a single location end-to-end, shift to shift.",
    long: "Run a single location shift-to-shift. Manage rosters, approve comps, monitor wait-times, and resolve exceptions before they hit reviews.",
    icon: Store,
    features: [
      "Shift roster & attendance approvals",
      "Live wait-time and table turn monitor",
      "Comp & void approvals with reason codes",
      "Daily Z-report and cash reconciliation",
    ],
    gradient: "from-amber-500 to-brand-500",
  },
  {
    id: "cashier",
    title: "Cashier",
    short: "Lightning-fast billing with split & multi-pay.",
    long: "A blazing-fast billing screen designed for high-volume counters. Split bills, hold & recall orders, accept cash, card, UPI and wallets with a single tap.",
    icon: Receipt,
    features: [
      "Split, merge & hold bills in one tap",
      "Cash, card, UPI & wallet tendering",
      "Auto GST/TCS calculation by item",
      "Offline-first with auto-sync",
    ],
    gradient: "from-brand-400 to-amber-400",
  },
  {
    id: "chef",
    title: "Chef",
    short: "Recipes, yields and prep queues for the kitchen.",
    long: "Digital recipe book with yield tracking, allergen flags and prep queues. Standardize every plate so it tastes identical across branches.",
    icon: ChefHat,
    features: [
      "Recipe standardization & yields",
      "Allergen & dietary tagging",
      "Prep queue with par-level alerts",
      "Plating photos & batch costing",
    ],
    gradient: "from-brand-500 to-orange-600",
  },
  {
    id: "waiter",
    title: "Waiter",
    short: "Tableside ordering on phone or tablet.",
    long: "Tableside ordering on any phone or tablet. Send orders instantly to KDS, modify on the fly, and fire courses at the perfect moment.",
    icon: ClipboardList,
    features: [
      "Tableside ordering with modifiers",
      "Course timing & fire-on-cue",
      "Live table status & guest notes",
      "Tip pooling & shift performance",
    ],
    gradient: "from-amber-400 to-brand-500",
  },
  {
    id: "inventory",
    title: "Inventory",
    short: "Real-time stock with auto-deduction & alerts.",
    long: "Live stock that auto-deducts on every bill, with low-stock alerts, expiry tracking and supplier reorders triggered before you run out.",
    icon: Boxes,
    features: [
      "Recipe-linked auto deduction",
      "Expiry & batch tracking",
      "Supplier reorder automation",
      "Variance & theft detection",
    ],
    gradient: "from-brand-600 to-amber-500",
  },
  {
    id: "crm",
    title: "CRM",
    short: "Guest profiles, loyalty and smart campaigns.",
    long: "Unified guest profiles across channels. Run loyalty tiers, birthday campaigns, and win-back flows that actually move the needle on repeat orders.",
    icon: Users,
    features: [
      "360° guest profile & visit history",
      "Tiered loyalty & points engine",
      "Birthday & win-back automations",
      "NPS and review request flows",
    ],
    gradient: "from-amber-500 to-brand-600",
  },
  {
    id: "reports",
    title: "Reports",
    short: "Drill-down analytics & exportable dashboards.",
    long: "Drill-down analytics across sales, items, hours, staff and channels. Schedule exports, share dashboards, and spot trends before they cost you.",
    icon: BarChart3,
    features: [
      "Sales mix & menu engineering",
      "Hourly heatmap & labor ratio",
      "Scheduled PDF / CSV exports",
      "Shareable live dashboard links",
    ],
    gradient: "from-brand-500 to-amber-600",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    short: "Natural-language insights and forecasts.",
    long: "Ask anything — 'why did Wednesday lunch drop?' — and get an answer grounded in your data. Forecasts demand, suggests promos, and flags anomalies.",
    icon: Bot,
    features: [
      "Natural-language Q&A on live data",
      "Demand forecasting by hour & item",
      "Anomaly detection & smart alerts",
      "Promo suggestion engine",
    ],
    gradient: "from-brand-400 to-orange-500",
  },
  {
    id: "kds",
    title: "Kitchen Display",
    short: "Real-time order board with bump routing.",
    long: "A latency-free kitchen display that routes orders by station, tracks prep timers, and bumps tickets forward the moment a course is plated.",
    icon: LayoutDashboard,
    features: [
      "Station-based order routing",
      "Live prep timers with color cues",
      "Bump & recall with one touch",
      "Expeditor view for chefs",
    ],
    gradient: "from-amber-600 to-brand-500",
  },
  {
    id: "online-orders",
    title: "Online Orders",
    short: "Aggregator sync for delivery & pickup.",
    long: "One inbox for every channel — Zomato, Swiggy, WhatsApp, web — with auto-accept, prep-time SLAs and driver dispatch that keeps ratings green.",
    icon: Bike,
    features: [
      "Unified aggregator inbox",
      "Auto-accept with prep-time SLA",
      "Driver dispatch & tracking",
      "Channel-wise P&L breakdown",
    ],
    gradient: "from-brand-500 to-amber-400",
  },
];

function ModuleCard({
  module,
  onOpen,
  index,
}: {
  module: Module;
  onOpen: (m: Module) => void;
  index: number;
}) {
  const Icon = module.icon;
  return (
    <motion.button
      variants={staggerItem}
      type="button"
      onClick={() => onOpen(module)}
      aria-label={`Open ${module.title} module details`}
      className={cn(
        "group relative text-left",
        "rounded-3xl p-5 sm:p-6",
        "glass-card gradient-border overflow-hidden",
        "transition-all duration-300",
        "hover:-translate-y-1.5 hover:shadow-premium hover:glow-orange-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
      )}
    >
      {/* hover gradient glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70",
          "bg-gradient-to-br",
          module.gradient,
        )}
      />

      <div className="relative z-10">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
            module.gradient,
          )}
        >
          <Icon className="size-6" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-foreground">
          {module.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {module.short}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
          Explore module
          <ArrowRight className="size-3.5" />
        </div>
      </div>

      {/* index ticker */}
      <span className="absolute bottom-3 right-4 font-display text-xs font-bold text-brand-200/80">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.button>
  );
}

export function SaaSModules() {
  const [openModule, setOpenModule] = React.useState<Module | null>(null);

  return (
    <Section id="modules">
      {/* subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="SaaS Modules"
        title={
          <>
            Role-based modules for{" "}
            <span className="text-gradient-orange">every team</span>
          </>
        }
        description="Granular, role-based access across 12 specialized modules — from super-admin multi-tenant control to the line cook's KDS. Each persona gets exactly what they need, nothing they don't."
      />

      <Stagger
        className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
        staggerChildren={0.05}
      >
        {MODULES.map((m, i) => (
          <ModuleCard
            key={m.id}
            module={m}
            onOpen={setOpenModule}
            index={i}
          />
        ))}
      </Stagger>

      {/* Premium popup */}
      <Dialog
        open={!!openModule}
        onOpenChange={(open) => !open && setOpenModule(null)}
      >
        <DialogContent className="overflow-hidden rounded-3xl border-brand-200/60 p-0 sm:max-w-lg">
          <AnimatePresence mode="wait">
            {openModule && (
              <motion.div
                key={openModule.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* header band */}
                <div
                  className={cn(
                    "relative bg-gradient-to-br p-6 sm:p-8",
                    openModule.gradient,
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                      <openModule.icon className="size-7" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                        Module
                      </p>
                      <DialogTitle className="text-2xl font-bold text-white">
                        {openModule.title}
                      </DialogTitle>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                    {openModule.long}
                  </DialogDescription>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                      Key features
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {openModule.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-foreground"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                            <Check className="size-3.5" />
                          </span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      Part of every Restaurant360 plan.
                    </p>
                    <MagneticButton
                      as="a"
                      href="#contact"
                      ariaLabel={`Explore the ${openModule.title} module`}
                      className="bg-gradient-to-r from-brand-500 to-amber-500 px-5 py-2.5 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50"
                    >
                      Explore module
                      <ArrowRight className="size-4" />
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden close for accessibility — the visible X is provided by DialogContent */}
          <DialogClose className="sr-only">Close</DialogClose>
        </DialogContent>
      </Dialog>
    </Section>
  );
}

export default SaaSModules;
