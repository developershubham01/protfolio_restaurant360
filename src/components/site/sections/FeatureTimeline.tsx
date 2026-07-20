"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  UtensilsCrossed,
  Building2,
  Receipt,
  ChefHat,
  Boxes,
  Award,
  BarChart3,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading, Reveal } from "../shared";
import { cn } from "@/lib/utils";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
};

const STEPS: Step[] = [
  {
    icon: Rocket,
    title: "Tenant Onboarding",
    description:
      "Provision a new tenant in seconds — branding, currency, tax rules, and roles configured automatically.",
    duration: "5 min",
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Setup",
    description:
      "Import recipes, build categories, attach modifiers, and set pricing with multi-variant support.",
    duration: "30 min",
  },
  {
    icon: Building2,
    title: "Branch Creation",
    description:
      "Spin up new outlets under the tenant with shared catalog but local inventory and staff.",
    duration: "10 min",
  },
  {
    icon: Receipt,
    title: "POS Billing",
    description:
      "Start taking orders and printing bills from any device — POS, tablet, or QR — instantly.",
    duration: "Live",
  },
  {
    icon: ChefHat,
    title: "Kitchen Processing",
    description:
      "Orders route to the right KDS station with prep timers, bumping, and chef status updates.",
    duration: "Live",
  },
  {
    icon: Boxes,
    title: "Inventory Deduction",
    description:
      "Stock auto-deducts against recipes the moment an order is fired — no manual stock takes.",
    duration: "Auto",
  },
  {
    icon: Award,
    title: "CRM Rewards",
    description:
      "Loyalty points accrue automatically and trigger tier upgrades, offers, and re-engagement flows.",
    duration: "Auto",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description:
      "Live dashboards roll up across branches with menu-mix, peak-hour, and forecast insights.",
    duration: "Live",
  },
  {
    icon: Calculator,
    title: "Accounting Reports",
    description:
      "P&L, GST, and ledger reports export to Tally, QuickBooks, or your ERP in one click.",
    duration: "Daily",
  },
];

function Node({ index }: { index: number }) {
  return (
    <div className="relative">
      {/* outer pulse glow */}
      <div className="absolute -inset-2 -z-10 rounded-full bg-brand-400/40 blur-md animate-glow-pulse" />
      {/* ring */}
      <div className="absolute -inset-1 rounded-full border border-brand-300/60" />
      {/* main circle */}
      <div className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-glow-orange-sm ring-4 ring-background">
        <span className="font-display text-sm font-bold">{index}</span>
      </div>
    </div>
  );
}

function StepCard({ step, isLeft }: { step: Step; isLeft: boolean }) {
  const { icon: Icon, title, description, duration } = step;
  return (
    <div className="group relative gradient-border rounded-2xl">
      <div className="glass-card relative flex flex-col rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium">
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-brand-400/0 to-amber-400/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-brand-400/30 group-hover:to-amber-400/30 group-hover:opacity-100" />

        <div
          className={cn(
            "flex items-center gap-3",
            isLeft && "md:flex-row-reverse md:text-right",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200/60 transition-transform duration-500 group-hover:scale-110">
            <Icon className="size-5" />
          </div>
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <span className="ml-auto hidden rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700 md:inline-block">
            {duration}
          </span>
        </div>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-muted-foreground",
            isLeft && "md:text-right",
          )}
        >
          {description}
        </p>
        <div className="mt-3 md:hidden">
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FeatureTimeline() {
  return (
    <Section id="timeline" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/20 blur-3xl" />

      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From onboarding to analytics —{" "}
            <span className="text-gradient-orange">automated</span>
          </>
        }
        description="Nine connected stages that take a restaurant from empty tenant to a fully-instrumented, multi-branch operation. Each step flows into the next — no swivel-chair integrations."
      />

      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* Track (static dim line) */}
        <div className="absolute left-5 top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />

        {/* Animated drawing line */}
        <motion.div
          className="absolute left-5 top-0 h-full w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-brand-400 via-brand-500 to-amber-400 md:left-1/2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="space-y-10 md:space-y-16">
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={step.title}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Node */}
                <div className="absolute left-5 top-4 z-10 -translate-x-1/2 md:left-1/2 md:top-6">
                  <Node index={i + 1} />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "pl-16 md:pl-0",
                    isLeft
                      ? "md:col-start-1 md:pr-16"
                      : "md:col-start-2 md:pl-16",
                  )}
                >
                  <Reveal direction={isLeft ? "right" : "left"} duration={0.6}>
                    <StepCard step={step} isLeft={isLeft} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-2 left-5 -translate-x-1/2 md:left-1/2"
        >
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-brand-300 bg-background">
            <div className="size-2.5 rounded-full bg-gradient-to-br from-brand-500 to-amber-500" />
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-base text-muted-foreground sm:text-lg">
            The whole flow runs{" "}
            <span className="font-semibold text-foreground">without manual sync</span>{" "}
            — and finishes in{" "}
            <span className="font-display font-bold text-gradient-orange">
              under 60 minutes
            </span>{" "}
            for a new chain.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

export default FeatureTimeline;
