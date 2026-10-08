"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Globe2,
  Sparkles,
} from "lucide-react";
import {
  Section,
  SectionHeading,
  Reveal,
  MagneticButton,
  Particles,
} from "../shared";
import { SOCIALS, SOCIAL_ICONS } from "@/lib/socials";

/* ================================================================== */
/*  Animated world-map background (SVG dot-matrix + glowing hubs)     */
/* ================================================================== */

const CONTINENT_BOXES: Array<[number, number, number, number]> = [
  [90, 80, 200, 160],   // North America
  [255, 250, 95, 170],  // South America
  [460, 90, 110, 100],  // Europe
  [475, 195, 120, 190], // Africa
  [565, 80, 260, 190],  // Asia
  [785, 330, 120, 80],  // Oceania
];

const HUBS: Array<{ id: string; x: number; y: number; label: string }> = [
  { id: "sf", x: 150, y: 175, label: "San Francisco" },
  { id: "nyc", x: 235, y: 165, label: "New York" },
  { id: "lon", x: 495, y: 130, label: "London" },
  { id: "dxb", x: 615, y: 205, label: "Dubai" },
  { id: "mum", x: 680, y: 215, label: "Mumbai HQ" },
  { id: "sgp", x: 735, y: 275, label: "Singapore" },
  { id: "syd", x: 870, y: 365, label: "Sydney" },
  { id: "los", x: 520, y: 280, label: "Lagos" },
  { id: "sao", x: 305, y: 345, label: "São Paulo" },
];

const CONNECTIONS: Array<[string, string]> = [
  ["sf", "nyc"],
  ["nyc", "lon"],
  ["nyc", "sao"],
  ["lon", "dxb"],
  ["lon", "los"],
  ["dxb", "mum"],
  ["mum", "sgp"],
  ["sgp", "syd"],
  ["mum", "lon"],
  ["sf", "mum"],
];

function arcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lift = 0.18,
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * lift;
  const cy = my + dx * lift;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function WorldMapBackground() {
  const [dots, setDots] = React.useState<Array<{ x: number; y: number; r: number }>>([]);

  React.useEffect(() => {
    const out: Array<{ x: number; y: number; r: number }> = [];
    const step = 13;
    for (const [bx, by, bw, bh] of CONTINENT_BOXES) {
      for (let x = bx; x < bx + bw; x += step) {
        for (let y = by; y < by + bh; y += step) {
          const jx = (Math.random() - 0.5) * 3.5;
          const jy = (Math.random() - 0.5) * 3.5;
          out.push({ x: x + jx, y: y + jy, r: 1.15 });
        }
      }
    }
    setDots(out);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" />

      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      >
        <g fill="rgba(234, 88, 12, 0.32)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>

        <g
          fill="none"
          stroke="url(#connGradient)"
          strokeWidth={1.2}
          strokeLinecap="round"
        >
          {CONNECTIONS.map(([a, b], i) => {
            const ha = HUBS.find((h) => h.id === a)!;
            const hb = HUBS.find((h) => h.id === b)!;
            const d = arcPath(ha.x, ha.y, hb.x, hb.y, 0.12);
            return (
              <motion.path
                key={`${a}-${b}`}
                d={d}
                strokeDasharray="4 8"
                initial={{ strokeDashoffset: 0, opacity: 0.25 }}
                animate={{
                  strokeDashoffset: [0, -48],
                  opacity: [0.18, 0.55, 0.18],
                }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            );
          })}
        </g>

        <g>
          {HUBS.map((h, i) => (
            <g key={h.id}>
              <motion.circle
                cx={h.x}
                cy={h.y}
                r={4}
                fill="rgba(249, 115, 22, 0.18)"
                animate={{ r: [4, 18, 4], opacity: [0.6, 0, 0.6] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.4,
                }}
              />
              <motion.circle
                cx={h.x}
                cy={h.y}
                r={3}
                fill="#f97316"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              />
              <circle
                cx={h.x}
                cy={h.y}
                r={1.4}
                fill="#fff"
                opacity={0.9}
              />
            </g>
          ))}
        </g>

        <defs>
          <linearGradient id="connGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

      <Particles count={22} />
    </div>
  );
}

/* ================================================================== */
/*  Contact Items & Component                                          */
/* ================================================================== */

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@abwcurious.com",
    href: "mailto:info@abwcurious.com",
    actionLabel: "Send an Email",
    sub: "Write to us anytime — fast response guaranteed",
    external: false,
  },
  {
    icon: Phone,
    label: "Mobile / Call",
    value: "+91 9930338504",
    href: "tel:+919930338504",
    actionLabel: "Call Now",
    sub: "Available for direct voice calls & WhatsApp",
    external: false,
  },
  {
    icon: Globe2,
    label: "Official Website",
    value: "www.abwcurious.com",
    href: "https://www.abwcurious.com",
    actionLabel: "Visit Website",
    sub: "Explore ABWcurious (OPC) Pvt. Ltd. solutions",
    external: true,
  },
];

export function ContactSection() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <WorldMapBackground />

      <SectionHeading
        align="center"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s connect & modernise your{" "}
            <span className="text-gradient-orange">restaurant operations</span>
          </>
        }
        description={
          <>
            Restaurant360 is an initiative of{" "}
            <a
              href="https://www.abwcurious.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              ABWcurious (OPC) Pvt. Ltd.
            </a>
            . Reach out directly or visit{" "}
            <a
              href="https://www.abwcurious.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              www.abwcurious.com
            </a>
            .
          </>
        }
      />

      {/* Trust & response badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50 px-3.5 py-1.5 text-brand-700">
          <Globe2 className="size-3.5" />
          ABWcurious (OPC) Pvt. Ltd.
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/80 px-3.5 py-1.5 backdrop-blur">
          <Clock className="size-3.5 text-brand-600" />
          Fast Turnaround
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/80 px-3.5 py-1.5 backdrop-blur">
          <Sparkles className="size-3.5 text-amber-500" />
          Dedicated Support
        </span>
      </div>

      {/* Centered Contact Cards */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACT_ITEMS.map((item, index) => (
          <Reveal
            key={item.label}
            direction={index === 0 ? "right" : index === 1 ? "up" : "left"}
            delay={0.1 * index}
          >
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="glass-card gradient-border group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-premium transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-orange"
            >
              {/* Soft decorative glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-brand-400/15 blur-2xl transition-opacity group-hover:bg-brand-400/25" />

              <div>
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="size-7" />
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    {item.label}
                  </div>
                  <div className="mt-2 text-xl font-bold font-display text-foreground transition-colors group-hover:text-brand-600 sm:text-2xl">
                    {item.value}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.sub}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 font-semibold text-sm text-brand-600 transition-colors group-hover:text-brand-700">
                <span>{item.actionLabel}</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Quick CTAs */}
      <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          as="a"
          href="mailto:info@abwcurious.com"
          className="bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-white shadow-glow-orange hover:shadow-glow-orange"
        >
          <Mail className="size-4" /> Email: info@abwcurious.com
        </MagneticButton>
        <MagneticButton
          as="a"
          href="tel:+919930338504"
          className="border border-brand-200 bg-white/90 px-7 py-3.5 text-foreground shadow-sm backdrop-blur hover:bg-brand-50"
        >
          <Phone className="size-4 text-brand-600" /> Call: +91 9930338504
        </MagneticButton>
        <MagneticButton
          as="a"
          href="https://www.abwcurious.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-brand-200 bg-white/90 px-7 py-3.5 text-foreground shadow-sm backdrop-blur hover:bg-brand-50"
        >
          <Globe2 className="size-4 text-brand-600" /> www.abwcurious.com
        </MagneticButton>
      </Reveal>

      {/* Social Links */}
      <Reveal delay={0.25} className="mx-auto mt-12 max-w-4xl">
        <div className="glass-card gradient-border flex flex-col items-center justify-between gap-5 rounded-3xl p-6 sm:flex-row">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              ABWcurious (OPC) Pvt. Ltd.
            </div>
            <div className="mt-0.5 text-sm font-semibold text-foreground">
              Connect with us across channels & platforms
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${s.label}: ${s.handle}`}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-white/90 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-glow-orange-sm"
                >
                  {Icon && <Icon className="size-4 text-brand-500 transition-transform duration-200 group-hover:scale-110" />}
                  <span>{s.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default ContactSection;
