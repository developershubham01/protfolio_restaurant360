"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Award, Trophy, BadgeCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeading,
  Stagger,
  staggerItem,
  Reveal,
  Marquee,
} from "../shared";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Testimonial = {
  name: string;
  initials: string;
  role: string;
  restaurant: string;
  quote: string;
  gradient: string;
  span?: "tall" | "short";
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Sharma",
    initials: "AS",
    role: "Owner",
    restaurant: "Spice Route Chain",
    gradient: "from-brand-400 to-brand-600",
    span: "tall",
    quote:
      "We rolled out Restaurant360 across 14 outlets in 6 weeks. The POS is so fast our servers fire orders in under 4 seconds, even during the Friday dinner rush. Multi-branch control from one dashboard finally stopped the chaos of reconciling 14 spreadsheets every night. Our end-of-day close went from 2 hours to 8 minutes.",
  },
  {
    name: "Priya Nair",
    initials: "PN",
    role: "Founder",
    restaurant: "Cafe Bloom",
    gradient: "from-amber-400 to-brand-500",
    span: "short",
    quote:
      "Inventory alerts caught a milk shortage before Saturday brunch — that single notification saved us a fully booked weekend.",
  },
  {
    name: "Raj Patel",
    initials: "RP",
    role: "CEO",
    restaurant: "CloudKitchen Co.",
    gradient: "from-brand-500 to-amber-500",
    span: "tall",
    quote:
      "Running 22 cloud kitchens on one ERP used to be a nightmare. The AI forecasts now predict demand by hour and kitchen — we cut food waste by 31% in the first quarter. Recipe costing is finally accurate to the rupee, and central kitchen transfers auto-sync to every branch in real time. This is the platform I wish I had 5 years ago.",
  },
  {
    name: "Mei Lin",
    initials: "ML",
    role: "Operations Director",
    restaurant: "Dragon Wok",
    gradient: "from-orange-400 to-brand-600",
    span: "short",
    quote:
      "KDS screen routing alone paid for the whole subscription — tickets stopped getting lost during peak hours, period.",
  },
  {
    name: "David Okafor",
    initials: "DO",
    role: "Managing Partner",
    restaurant: "Saffron Table",
    gradient: "from-brand-400 to-amber-600",
    span: "tall",
    quote:
      "The analytics layer is unreal. I can see covers, average ticket, and dish-level margin for any of our 9 locations from my phone — live. The CRM loyalty engine brought our repeat-customer rate from 38% to 61% in four months. Support actually picks up the phone, and the team has shipped 3 features we requested. Best software decision we've made.",
  },
  {
    name: "Sofia Rossi",
    initials: "SR",
    role: "Co-Owner",
    restaurant: "Bella Cucina",
    gradient: "from-amber-500 to-brand-500",
    span: "short",
    quote:
      "Switched from a legacy POS in a weekend. Training the floor staff took under an hour — the interface just makes sense.",
  },
];

const AWARDS = [
  { icon: Trophy, label: "Fast Growing Restaurant Tech · 2026" },
  { icon: Award, label: "50+ Active Restaurants in 6 Months" },
  { icon: BadgeCheck, label: "ISO 27001 Ready" },
  { icon: Sparkles, label: "PCI-DSS Compliant Payments" },
  { icon: Trophy, label: "99.99% Verified Uptime" },
  { icon: Award, label: "Offline-First Hybrid Architecture" },
  { icon: BadgeCheck, label: "SOC 2 Ready Infrastructure" },
];

/* ------------------------------------------------------------------ */
/*  Floating wrapper — staggered subtle float                         */
/* ------------------------------------------------------------------ */

function FloatingCard({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  // staggered durations for organic rhythm
  const duration = 6 + (index % 3) * 1.6;
  const delay = (index % 4) * 0.7;
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className={cn("break-inside-avoid mb-6", className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                              */
/* ------------------------------------------------------------------ */

function Avatar({
  initials,
  gradient,
  name,
}: {
  initials: string;
  gradient: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-sm font-bold text-white shadow-lg",
          gradient,
        )}
        aria-hidden
      >
        {initials}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">{name}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-amber-500" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current drop-shadow-[0_1px_2px_rgba(245,158,11,0.35)]" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <FloatingCard index={index}>
      <div className="glass-card gradient-border group relative overflow-hidden rounded-3xl p-6 shadow-premium transition-all duration-300 hover:shadow-glow-orange">
        {/* Decorative quote glyph */}
        <Quote
          className="pointer-events-none absolute -right-2 -top-2 size-20 text-brand-200/50 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-300/60"
          aria-hidden
        />
        <div className="relative">
          <Stars />
          <p
            className={cn(
              "mt-4 text-[15px] leading-relaxed text-foreground/90",
              t.span === "tall" ? "" : "line-clamp-3",
            )}
          >
            “{t.quote}”
          </p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand-100/70 pt-4">
            <Avatar initials={t.initials} gradient={t.gradient} name={t.name} />
            <div className="text-right">
              <div className="text-xs font-semibold text-foreground">{t.role}</div>
              <div className="text-xs text-brand-700">{t.restaurant}</div>
            </div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="relative overflow-hidden">
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -left-20 top-20 -z-10 size-72 rounded-full bg-brand-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-80 rounded-full bg-amber-300/25 blur-3xl" />

      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            Loved by <span className="text-gradient-orange">50+ restaurants</span> in 6 months
          </>
        }
        description="Launched just 6 months ago, 50+ innovative restaurant operators and managers have already switched to Restaurant360 — and the feedback has been extraordinary."
      />

      {/* Masonry via CSS columns */}
      <Stagger
        className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3"
        staggerChildren={0.12}
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </Stagger>

      {/* Awards / mentions marquee */}
      <Reveal delay={0.1} className="mt-16">
        <div className="glass-card relative overflow-hidden rounded-3xl px-4 py-5 shadow-premium">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Trophy className="size-3.5 text-brand-500" />
            Modern Standards · Rapidly Growing
          </div>
          <Marquee duration={32} pauseOnHover>
            {AWARDS.map((a, i) => (
              <div
                key={`${a.label}-${i}`}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground/80"
              >
                <a.icon className="size-4 text-brand-500" />
                <span>{a.label}</span>
                <span className="ml-12 size-1.5 rounded-full bg-brand-300/70" aria-hidden />
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  );
}

export default TestimonialsSection;
