"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Crown,
  ArrowRight,
  Wifi,
  Headphones,
  Lock,
  DatabaseBackup,
  Globe,
  Webhook,
  Sparkles,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeading,
  Reveal,
  Stagger,
  MagneticButton,
} from "../shared";

type Plan = {
  name: string;
  monthly: number | null; // null = "Custom"
  unit: string; // per-branch / per-location note
  tagline: string;
  cta: string;
  href: string;
  features: string[];
  highlight?: boolean;
  icon: LucideIcon;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 2499,
    unit: "/branch/mo",
    tagline: "For single-location restaurants getting started.",
    cta: "Start free trial",
    href: "#contact",
    icon: Sparkles,
    features: [
      "1 Branch / location",
      "POS + Kitchen Display",
      "Inventory basics",
      "Basic CRM",
      "5 staff accounts",
      "Email support",
      "Mobile app included",
    ],
  },
  {
    name: "Professional",
    monthly: 6499,
    unit: "/branch/mo",
    tagline: "For growing multi-location restaurant chains.",
    cta: "Start free trial",
    href: "#contact",
    icon: RefreshCw,
    features: [
      "Up to 5 branches",
      "Full POS + KDS + Inventory",
      "Advanced CRM + Loyalty",
      "Analytics & Reports",
      "25 staff accounts",
      "24/7 priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    unit: "Let's talk",
    tagline: "For large chains, franchises & cloud kitchens.",
    cta: "Contact sales",
    href: "#contact",
    icon: Crown,
    highlight: true,
    features: [
      "Unlimited branches",
      "White-label + custom domain",
      "Dedicated account manager",
      "On-prem / private cloud",
      "99.99% uptime SLA",
      "Custom integrations",
      "SSO + audit logs",
    ],
  },
];

const INCLUDES: { icon: LucideIcon; label: string }[] = [
  { icon: Wifi, label: "Offline + Online" },
  { icon: Headphones, label: "24/7 support" },
  { icon: Lock, label: "SSL security" },
  { icon: DatabaseBackup, label: "Daily backups" },
  { icon: Globe, label: "Multi-language" },
  { icon: Webhook, label: "API access" },
  { icon: Sparkles, label: "Free updates" },
  { icon: RefreshCw, label: "Auto-sync" },
];

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function yearlyPrice(monthly: number): number {
  // 2 months free on annual → effective monthly = monthly * 10 / 12
  return Math.round((monthly * 10) / 12);
}

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN");
}

export function PricingSection() {
  const [yearly, setYearly] = React.useState(false);

  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[480px] -translate-x-1/2 rounded-full bg-brand-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Simple, <span className="text-gradient-orange">transparent</span> pricing
          </>
        }
        description="Pay per branch, scale as you grow. No hidden fees, no per-seat surprises. Cancel anytime."
      />

      {/* Billing toggle */}
      <Reveal className="mt-8 flex justify-center" delay={0.1}>
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              !yearly
                ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-orange-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
              yearly
                ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-orange-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Yearly
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                yearly ? "bg-white/25 text-white" : "bg-brand-100 text-brand-700",
              )}
            >
              2 months free
            </span>
          </button>
        </div>
      </Reveal>

      {/* Plan cards */}
      <Stagger
        className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-center"
        staggerChildren={0.1}
        amount={0.2}
      >
        {PLANS.map((plan) => (
          <motion.div key={plan.name} variants={cardEnter}>
            <PlanCard plan={plan} yearly={yearly} />
          </motion.div>
        ))}
      </Stagger>

      {/* All plans include */}
      <Reveal className="mt-14" delay={0.1}>
        <div className="glass-card gradient-border rounded-3xl p-6 sm:p-8">
          <div className="text-center">
            <h3 className="font-display text-base font-semibold text-foreground">
              All plans include
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you need to run a modern restaurant, included by default.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INCLUDES.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2.5 rounded-2xl border border-border bg-white/70 px-3 py-2.5"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-50 to-amber-50 text-brand-600 ring-1 ring-brand-200/60">
                  <item.icon className="size-4" strokeWidth={2} />
                </span>
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const { icon: Icon } = plan;
  const isCustom = plan.monthly === null;
  const price = isCustom ? null : yearly ? yearlyPrice(plan.monthly as number) : plan.monthly;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-6 sm:p-7",
        plan.highlight
          ? "glass-card gradient-border shadow-premium glow-orange lg:scale-[1.04]"
          : "glass-card",
      )}
    >
      {/* Most Popular badge */}
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow-orange-sm">
            <Crown className="size-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl ring-1",
            plan.highlight
              ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white ring-brand-400/50 shadow-glow-orange-sm"
              : "bg-gradient-to-br from-brand-50 to-amber-50 text-brand-600 ring-brand-200/60",
          )}
        >
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <h3 className="font-display text-xl font-bold text-foreground">
          {plan.name}
        </h3>
      </div>

      <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mt-4 min-h-[5.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${plan.name}-${yearly}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {isCustom ? (
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                  Custom
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-semibold text-muted-foreground">
                  ₹
                </span>
                <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {formatINR(price as number)}
                </span>
                <span className="text-sm text-muted-foreground">{plan.unit}</span>
              </div>
            )}
            {yearly && !isCustom && (
              <div className="mt-1.5 text-xs font-medium text-green-600">
                Save ₹{formatINR((plan.monthly as number) * 2)} / year · billed annually
              </div>
            )}
            {isCustom && (
              <div className="mt-1.5 text-xs text-muted-foreground">
                Tailored to your restaurant network size.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="mt-2 [&>div]:w-full">
        <MagneticButton
          as="a"
          href={plan.href}
          ariaLabel={`${plan.cta} — ${plan.name} plan`}
          className={cn(
            "w-full px-5 py-3.5",
            plan.highlight
              ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow-orange hover:shadow-glow-orange"
              : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
          )}
        >
          {plan.cta}
          <ArrowRight className="size-4" />
        </MagneticButton>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />

      {/* Features */}
      <ul className="space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2
              className={cn(
                "mt-0.5 size-4 shrink-0",
                plan.highlight ? "text-brand-600" : "text-brand-500",
              )}
            />
            <span className="text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>

      {/* Bottom check */}
      <div className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="size-3.5 text-green-500" strokeWidth={3} />
        No credit card required · 14-day free trial
      </div>
    </motion.div>
  );
}

export default PricingSection;
