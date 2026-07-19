"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, PhoneCall, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "../shared/MagneticButton";
import { Particles } from "../shared/Particles";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { HeroScene } from "./HeroScene";

const STATS = [
  { value: 12000, suffix: "+", label: "Restaurants" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Uptime" },
  { value: 48, suffix: "M+", label: "Orders / yr" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Avg. rating" },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-aurora pt-28 pb-16 sm:pt-32"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />
      <Particles count={26} />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 size-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 size-80 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur"
          >
            <Sparkles className="size-3.5" />
            Now with AI Insights & Multi-tenant Cloud ERP
            <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] text-white">NEW</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Restaurant<span className="text-gradient-orange">360</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-3 text-xl font-semibold text-foreground sm:text-2xl"
          >
            Enterprise Restaurant ERP Platform
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Cloud-integrated Restaurant ERP built for restaurant chains, cafés, food
            courts, cloud kitchens, and franchises — unifying POS, kitchen, inventory,
            CRM, analytics and AI in one cinematic platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <MagneticButton
              as="a"
              href="#platform"
              className="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 text-white shadow-glow-orange hover:shadow-glow-orange"
            >
              <Play className="size-4" /> Live Demo
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#features"
              className="border border-brand-200 bg-white/80 px-6 py-3.5 text-foreground shadow-sm backdrop-blur hover:bg-brand-50"
            >
              View Features <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="px-6 py-3.5 text-brand-700 hover:bg-brand-50"
            >
              <PhoneCall className="size-4" /> Contact Sales
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/70 bg-white/60 p-3 text-center backdrop-blur lg:text-left"
              >
                <div className="font-display text-2xl font-bold text-foreground">
                  <AnimatedCounter
                    value={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                  />
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Rating row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start"
          >
            <div className="flex -space-x-2">
              {["#fb923c", "#f59e0b", "#ea580c", "#fdba74"].map((c) => (
                <span
                  key={c}
                  className="size-7 rounded-full border-2 border-white"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <span>Trusted by 12,000+ restaurants worldwide</span>
          </motion.div>
        </div>

        {/* Right — animated scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
