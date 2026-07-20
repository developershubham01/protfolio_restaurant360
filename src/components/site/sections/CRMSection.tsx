"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Award,
  Cake,
  Gift,
  History,
  Sparkles,
  Star,
  Ticket,
  TrendingUp,
  Trophy,
  UserCircle2,
  Users,
  Wallet,
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

const SPEND_DATA = [
  { m: "Apr", v: 2100 },
  { m: "May", v: 2680 },
  { m: "Jun", v: 2340 },
  { m: "Jul", v: 3120 },
  { m: "Aug", v: 3680 },
  { m: "Sep", v: 3210 },
  { m: "Oct", v: 4150 },
];

const TIERS = [
  { name: "Silver", pts: 500, active: false },
  { name: "Gold", pts: 2000, active: true },
  { name: "Platinum", pts: 5000, active: false },
];

const COUPONS = [
  { code: "WELCOME20", desc: "20% off first order", tone: "from-brand-400 to-brand-600" },
  { code: "BDAY-FREE", desc: "Free dessert", tone: "from-amber-400 to-brand-500" },
];

const ORDER_HISTORY = [
  { id: "#1247", label: "Butter Chicken Combo", time: "2d ago", amount: "₹640" },
  { id: "#1188", label: "Margherita + Coke", time: "5d ago", amount: "₹420" },
  { id: "#1102", label: "Family Feast", time: "1w ago", amount: "₹1,280" },
];

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: "orange" | "amber";
  visual: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: Wallet,
    title: "Reward Points",
    desc: "Auto-earn points per ₹ spent and redeem at checkout.",
    accent: "orange",
    visual: <PointsRing />,
  },
  {
    icon: Trophy,
    title: "Membership Tiers",
    desc: "Silver, Gold & Platinum tiers unlock escalating perks.",
    accent: "amber",
    visual: <TierLadder />,
  },
  {
    icon: Cake,
    title: "Birthday Offers",
    desc: "Auto-triggered free dessert & greeting on customer birthdays.",
    accent: "orange",
    visual: <BirthdayBadge />,
  },
  {
    icon: Ticket,
    title: "Coupons",
    desc: "Issue branded coupons with redemption limits and tracking.",
    accent: "amber",
    visual: <CouponTickets />,
  },
  {
    icon: History,
    title: "Order History",
    desc: "Lifetime spend, frequency and favorite dishes at a glance.",
    accent: "orange",
    visual: <OrderHistoryMini />,
  },
  {
    icon: Users,
    title: "Referral Rewards",
    desc: "Friend signs up — both earn bonus points automatically.",
    accent: "amber",
    visual: <ReferralMini />,
  },
];

/* ------------------------------------------------------------------ */
/*  Small visuals                                                      */
/* ------------------------------------------------------------------ */

function PointsRing() {
  const value = 2480;
  const max = 3500;
  const pct = Math.min(100, (value / max) * 100);
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-[84px]">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="rgba(234, 88, 12, 0.14)"
            strokeWidth="7"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="url(#pointsGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="pointsGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold text-foreground">
            <AnimatedCounter value={value} />
          </span>
          <span className="text-[10px] text-muted-foreground">pts</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">71% to Platinum</p>
        <p>Earn 1,020 more pts</p>
      </div>
    </div>
  );
}

function TierLadder() {
  return (
    <div className="flex items-end justify-between gap-2">
      {TIERS.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className={cn(
            "flex-1 rounded-2xl border px-3 py-2.5 text-center",
            t.active
              ? "border-brand-300 bg-gradient-to-b from-brand-50 to-white shadow-glow-orange-sm"
              : "border-border bg-muted/40",
          )}
          style={{ marginBottom: i === 1 ? 0 : i === 0 ? 8 : 4 }}
        >
          <div
            className={cn(
              "mx-auto mb-1 flex size-7 items-center justify-center rounded-full",
              t.active
                ? "bg-gradient-to-br from-brand-400 to-brand-600 text-white"
                : "bg-white text-muted-foreground",
            )}
          >
            <Star className={cn("size-3.5", t.active && "fill-current")} />
          </div>
          <div
            className={cn(
              "text-[11px] font-semibold",
              t.active ? "text-brand-700" : "text-muted-foreground",
            )}
          >
            {t.name}
          </div>
          <div className="text-[10px] text-muted-foreground">{t.pts}+</div>
        </motion.div>
      ))}
    </div>
  );
}

function BirthdayBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-brand-500 text-white shadow-glow-orange-sm"
        >
          <Cake className="size-6" />
        </motion.div>
        <Sparkles className="absolute -right-1 -top-1 size-4 text-amber-500" />
      </div>
      <div className="text-xs">
        <p className="font-semibold text-foreground">Aarav&apos;s birthday</p>
        <p className="text-muted-foreground">Free dessert unlocked · Oct 24</p>
      </div>
    </div>
  );
}

function CouponTickets() {
  return (
    <div className="flex flex-col gap-2">
      {COUPONS.map((c, i) => (
        <motion.div
          key={c.code}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: i * 0.12, duration: 0.45 }}
          className="relative flex items-center justify-between overflow-hidden rounded-xl border border-dashed border-brand-300 bg-white px-3 py-2"
        >
          <div>
            <div
              className={cn(
                "bg-gradient-to-r bg-clip-text font-mono text-xs font-bold text-transparent",
                c.tone,
              )}
            >
              {c.code}
            </div>
            <div className="text-[10px] text-muted-foreground">{c.desc}</div>
          </div>
          <div
            className={cn(
              "rounded-md bg-gradient-to-r px-2 py-1 text-[10px] font-semibold text-white",
              c.tone,
            )}
          >
            USE
          </div>
          {/* ticket notch */}
          <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-muted" />
          <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-muted" />
        </motion.div>
      ))}
    </div>
  );
}

function OrderHistoryMini() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SPEND_DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="#ea580c"
              strokeWidth={2}
              fill="url(#spendGrad)"
              isAnimationActive
              animationDuration={1100}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Lifetime spend</span>
        <span className="font-semibold text-brand-700">
          ₹<AnimatedCounter value={21470} />
        </span>
      </div>
    </div>
  );
}

function ReferralMini() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex -space-x-2">
        {["#fb923c", "#f59e0b", "#ea580c", "#fdba74"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1 }}
            className="size-8 rounded-full border-2 border-white shadow-sm"
            style={{ background: c }}
          />
        ))}
        <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-brand-50 text-[10px] font-bold text-brand-700">
          +8
        </span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
        <div className="text-xs">
          <p className="font-semibold text-foreground">Referrals</p>
          <p className="text-[10px] text-muted-foreground">+150 pts each</p>
        </div>
        <div className="font-display text-sm font-bold text-brand-700">
          +<AnimatedCounter value={1200} /> pts
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile card                                                       */
/* ------------------------------------------------------------------ */

function ProfileCard() {
  return (
    <Reveal direction="right">
      <div className="gradient-border glass-card relative overflow-hidden rounded-3xl p-6 shadow-premium">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-amber-300/30 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-xl font-bold text-white shadow-glow-orange-sm">
              AM
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-white">
              <Award className="size-3.5" />
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-foreground">Aarav Mehta</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                <Star className="size-2.5 fill-current" /> Gold Member
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              aarav.mehta@email.com · Member since 2022
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                <TrendingUp className="size-2.5" /> +18% this month
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <UserCircle2 className="size-2.5" /> VIP
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-border bg-white/70 p-3 text-center">
            <div className="font-display text-base font-bold text-foreground">
              <AnimatedCounter value={2480} />
            </div>
            <div className="text-[10px] text-muted-foreground">Reward pts</div>
          </div>
          <div className="rounded-2xl border border-border bg-white/70 p-3 text-center">
            <div className="font-display text-base font-bold text-foreground">
              <AnimatedCounter value={47} />
            </div>
            <div className="text-[10px] text-muted-foreground">Orders</div>
          </div>
          <div className="rounded-2xl border border-border bg-white/70 p-3 text-center">
            <div className="font-display text-base font-bold text-foreground">
              ₹<AnimatedCounter value={21470} />
            </div>
            <div className="text-[10px] text-muted-foreground">Lifetime</div>
          </div>
        </div>

        {/* Mini spend chart */}
        <div className="relative mt-4 rounded-2xl border border-border bg-white/60 p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-foreground">Spend over time</span>
            <span className="text-[10px] text-muted-foreground">Last 7 months</span>
          </div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPEND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="profileSpendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  width={36}
                />
                <Tooltip
                  cursor={{ stroke: "#fdba74", strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #fed7aa",
                    background: "rgba(255,255,255,0.95)",
                    fontSize: 11,
                    boxShadow: "0 12px 30px -12px rgba(234,88,12,0.4)",
                  }}
                  labelStyle={{ color: "#c2410c", fontWeight: 600 }}
                  formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spend"]}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#ea580c"
                  strokeWidth={2.5}
                  fill="url(#profileSpendGrad)"
                  isAnimationActive
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order history mini list */}
        <div className="relative mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-foreground">Recent orders</span>
            <span className="text-[10px] text-brand-700">View all</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {ORDER_HISTORY.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl border border-border bg-white/60 px-2.5 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Receipt />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground">{o.label}</div>
                    <div className="text-[9px] text-muted-foreground">
                      {o.id} · {o.time}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-foreground">{o.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Receipt() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const isOrange = feature.accent === "orange";
  return (
    <motion.div variants={staggerItem} className="h-full">
      <div className="group glass-card gradient-border relative h-full overflow-hidden rounded-3xl p-5 shadow-premium transition-transform duration-300 hover:-translate-y-1.5">
        <div
          className={cn(
            "pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100",
            isOrange ? "bg-brand-300/40" : "bg-amber-300/40",
          )}
        />
        <div className="relative flex items-center justify-between">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-2xl text-white shadow-glow-orange-sm",
              isOrange
                ? "bg-gradient-to-br from-brand-400 to-brand-600"
                : "bg-gradient-to-br from-amber-400 to-brand-500",
            )}
          >
            <Icon className="size-5" />
          </div>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
              isOrange ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-700",
            )}
          >
            CRM
          </span>
        </div>
        <h3 className="relative mt-4 font-display text-base font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground">
          {feature.desc}
        </p>
        <div className="relative mt-4">{feature.visual}</div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function CRMSection() {
  return (
    <Section id="crm" className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-32 -z-10 size-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-24 -z-10 size-80 rounded-full bg-amber-200/40 blur-3xl" />

      <SectionHeading
        eyebrow="CRM"
        title={
          <>
            Turn first-time guests into <span className="text-gradient-orange">loyal regulars</span>
          </>
        }
        description="A complete customer cockpit — reward points, tiered memberships, birthday delights, coupons, order history and referrals, all in one beautiful dashboard."
      />

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-12">
        {/* Profile card */}
        <div className="lg:col-span-5">
          <ProfileCard />
        </div>

        {/* Feature grid */}
        <div className="lg:col-span-7">
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2" staggerChildren={0.08}>
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </Stagger>
        </div>
      </div>

      {/* Bottom row: gift / loyalty banner */}
      <Reveal>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-brand-200/60 bg-gradient-to-r from-brand-50 via-white to-amber-50 p-5 sm:flex-row sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow-orange-sm">
              <Gift className="size-5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-foreground">
                Lifecycle automation built in
              </h4>
              <p className="text-xs text-muted-foreground">
                Trigger rewards, win-backs and re-engagement on autopilot.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["Win-back", "Re-engage", "Upsell", "Anniversary"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default CRMSection;
