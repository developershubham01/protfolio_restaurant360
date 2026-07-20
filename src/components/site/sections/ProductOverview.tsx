"use client";

import { motion } from "framer-motion";
import {
  Receipt,
  LayoutDashboard,
  Boxes,
  Users,
  BarChart3,
  UserCog,
  Cloud,
  Brain,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading, Stagger, staggerItem } from "../shared";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

const FEATURES: Feature[] = [
  {
    icon: Receipt,
    title: "POS Billing",
    description:
      "Lightning-fast billing with split payments, QR ordering, and resilient offline fallback.",
    accent: "from-brand-500 to-brand-600",
  },
  {
    icon: LayoutDashboard,
    title: "Kitchen Display",
    description:
      "Real-time KDS with order routing, prep timers, and station-based chef views.",
    accent: "from-amber-500 to-brand-500",
  },
  {
    icon: Boxes,
    title: "Inventory",
    description:
      "Automatic stock deduction, low-stock alerts, and intelligent supplier reordering.",
    accent: "from-brand-500 to-amber-500",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Live sales dashboards, menu-mix analysis, and demand forecast modeling.",
    accent: "from-amber-500 to-brand-600",
  },
  {
    icon: Cloud,
    title: "Cloud ERP",
    description:
      "Multi-tenant architecture syncs every branch and brand in real time.",
    accent: "from-brand-400 to-brand-600",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description:
      "Predictive demand, menu engineering, and anomaly detection out of the box.",
    accent: "from-amber-500 to-brand-500",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, title, description, accent } = feature;
  return (
    <div className="group relative h-full gradient-border rounded-3xl">
      <div className="glass-card relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-brand-400/0 via-amber-400/0 to-brand-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-brand-400/40 group-hover:via-amber-400/25 group-hover:to-brand-600/40 group-hover:opacity-100" />

        {/* icon tile */}
        <div className="relative mb-5 inline-flex">
          <div
            className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${accent} opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-100`}
          />
          <div
            className={`relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-glow-orange-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
          >
            <Icon className="size-7" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-white/80 shadow-glow-orange-sm" />
          </div>
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Explore module
          <ArrowUpRight className="size-3.5" />
        </div>

        {/* corner shimmer */}
        <div className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-gradient-to-br from-brand-300/30 to-amber-300/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export function ProductOverview() {
  return (
    <Section id="features" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -left-32 top-40 -z-10 size-96 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 -z-10 size-96 rounded-full bg-amber-200/30 blur-3xl" />

      <SectionHeading
        eyebrow="Product Overview"
        title={
          <>
            Everything your restaurant needs,{" "}
            <span className="text-gradient-orange">in one platform</span>
          </>
        }
        description="Eight unified modules that work together — from the front counter to the back office. No integrations to maintain, no data silos to bridge."
      />

      <Stagger
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.07}
      >
        {FEATURES.map((feature) => (
          <motion.div key={feature.title} variants={staggerItem} className="h-full">
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </Stagger>

      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:p-8"
      >
        <div className="text-center sm:text-left">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Want to see every module in action?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Book a 20-minute walkthrough with a product specialist.
          </p>
        </div>
        <a
          href="#platform"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow-orange-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-orange"
        >
          Explore the platform
          <ArrowUpRight className="size-4" />
        </a>
      </motion.div>
    </Section>
  );
}

export default ProductOverview;
