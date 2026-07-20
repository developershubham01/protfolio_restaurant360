"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CalendarCheck,
  FileText,
  Check,
  SendHorizontal,
  Clock,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Section,
  SectionHeading,
  Reveal,
  MagneticButton,
  Particles,
} from "../shared";

/* ================================================================== */
/*  Animated world-map background (SVG dot-matrix + glowing hubs)     */
/* ================================================================== */

// ViewBox is 0 0 1000 500. Continents are approximated as rectangles
// holding a dot-matrix — purely decorative, no cartographic accuracy.
const CONTINENT_BOXES: Array<[number, number, number, number]> = [
  // [x, y, w, h]
  [90, 80, 200, 160],   // North America
  [255, 250, 95, 170],  // South America
  [460, 90, 110, 100],  // Europe
  [475, 195, 120, 190], // Africa
  [565, 80, 260, 190],  // Asia
  [785, 330, 120, 80],  // Oceania
];

// Hub nodes (approx viewBox coords)
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

// Connections (pairs of hub ids)
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
  // perpendicular lift for an arc
  const cx = mx - dy * lift;
  const cy = my + dx * lift;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function WorldMapBackground() {
  // Build dot matrix once (client-only to avoid hydration mismatch from jitter)
  const [dots, setDots] = React.useState<Array<{ x: number; y: number; r: number }>>([]);

  React.useEffect(() => {
    const out: Array<{ x: number; y: number; r: number }> = [];
    const step = 13;
    for (const [bx, by, bw, bh] of CONTINENT_BOXES) {
      for (let x = bx; x < bx + bw; x += step) {
        for (let y = by; y < by + bh; y += step) {
          // soft per-dot jitter for organic feel
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
      {/* Soft warm wash */}
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" />

      {/* World map SVG */}
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      >
        {/* Dot-matrix continents */}
        <g fill="rgba(234, 88, 12, 0.32)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>

        {/* Connection lines (animated dashes) */}
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

        {/* Hub nodes */}
        <g>
          {HUBS.map((h, i) => (
            <g key={h.id}>
              {/* outer pulsing ring */}
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
              {/* core dot */}
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
              {/* subtle white halo for crispness */}
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

      {/* Edge fades to blend with section bg */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

      {/* Floating particles */}
      <Particles count={22} />
    </div>
  );
}

/* ================================================================== */
/*  Contact method card                                                */
/* ================================================================== */

type ContactMethod = {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  sub?: string;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Phone,
    label: "Call Sales",
    value: "+1 (415) 360-7360",
    href: "tel:+14153607360",
    sub: "Mon–Fri, 9am–8pm IST / EST",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "sales@restaurant360.io",
    href: "mailto:sales@restaurant360.io",
    sub: "Avg. response under 2 hours",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Bandra Kurla Complex, Mumbai",
    sub: "Offices in NYC · London · Singapore",
  },
];

function ContactMethodCard({ m }: { m: ContactMethod }) {
  const Inner = (
    <div className="glass-card group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-orange">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110">
        <m.icon className="size-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          {m.label}
        </div>
        <div className="mt-1 truncate text-sm font-semibold text-foreground">
          {m.value}
        </div>
        {m.sub && (
          <div className="mt-0.5 text-xs text-muted-foreground">{m.sub}</div>
        )}
      </div>
    </div>
  );

  if (m.href) {
    return (
      <a href={m.href} className="block">
        {Inner}
      </a>
    );
  }
  return Inner;
}

/* ================================================================== */
/*  Field helper                                                       */
/* ================================================================== */

function Field({
  id,
  label,
  children,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </Label>
      {children}
    </div>
  );
}

const fieldClass =
  "h-12 rounded-xl border-brand-200/80 bg-white/70 px-4 text-sm text-foreground shadow-sm backdrop-blur transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-brand-300 focus-visible:border-brand-500 focus-visible:ring-brand-500/30 focus-visible:ring-[3px]";

/* ================================================================== */
/*  Success state                                                      */
/* ================================================================== */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center px-6 py-14 text-center"
    >
      {/* Animated check */}
      <div className="relative">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
          className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-glow-orange"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="size-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.span>
        {/* Pulsing rings */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-brand-400/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
        Thanks! We&apos;ll be in touch.
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        A Restaurant360 product specialist will reach out within one business
        hour to schedule your personalised demo.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50 hover:shadow-glow-orange-sm"
      >
        <ArrowRight className="size-4 rotate-180" />
        Send another message
      </button>
    </motion.div>
  );
}

/* ================================================================== */
/*  Form                                                               */
/* ================================================================== */

type FormState = {
  name: string;
  restaurant: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  restaurant: "",
  email: "",
  phone: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = React.useState(false);

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Front-end mock — no backend call.
    setSubmitted(true);
  };

  return (
    <div className="glass-card gradient-border relative overflow-hidden rounded-3xl p-6 shadow-premium sm:p-8">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-amber-300/25 blur-3xl" />

      <div className="relative">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessState
              key="success"
              onReset={() => {
                setForm(EMPTY);
                setSubmitted(false);
              }}
            />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="name" label="Full Name" required>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="e.g. Aarav Sharma"
                    className={fieldClass}
                  />
                </Field>
                <Field id="restaurant" label="Restaurant Name" required>
                  <Input
                    id="restaurant"
                    required
                    value={form.restaurant}
                    onChange={update("restaurant")}
                    placeholder="e.g. Spice Route Chain"
                    className={fieldClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="email" label="Work Email" required>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@restaurant.com"
                    className={fieldClass}
                  />
                </Field>
                <Field id="phone" label="Phone Number">
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+1 415 360 7360"
                    className={fieldClass}
                  />
                </Field>
              </div>

              <Field id="message" label="How can we help?" required>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us about your restaurants, locations, and what you're looking to solve…"
                  className={cn(
                    fieldClass,
                    "h-32 min-h-32 resize-none py-3",
                  )}
                />
              </Field>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy. We never share
                  your data.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-orange active:translate-y-0"
                >
                  Send Message
                  <SendHorizontal className="size-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Section                                                            */
/* ================================================================== */

export function ContactSection() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <WorldMapBackground />

      <SectionHeading
        align="left"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s modernise your{" "}
            <span className="text-gradient-orange">restaurant operations</span>
          </>
        }
        description="Book a personalised walkthrough, get a tailored quote for your chain, or just talk to a product specialist. We typically reply within one business hour."
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* LEFT — copy + methods + CTAs */}
        <Reveal direction="right" className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50 px-3 py-1 text-brand-700">
              <Globe2 className="size-3.5" />
              Trusted on 4 continents
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-white/70 px-3 py-1">
              <Clock className="size-3.5 text-brand-600" />
              &lt; 2 hr avg. response
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Talk to a{" "}
            <span className="text-gradient-orange">product specialist</span>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Whether you run a single café or a 200-outlet cloud kitchen empire,
            our team has shipped rollouts of every scale. Bring your toughest
            operational problem — we&apos;ll show you exactly how Restaurant360
            solves it.
          </p>

          {/* Contact methods */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_METHODS.map((m) => (
              <ContactMethodCard key={m.label} m={m} />
            ))}
            <div className="glass-card flex items-center gap-3 rounded-2xl p-5 sm:col-span-2">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-brand-500 text-white shadow-lg">
                <CalendarCheck className="size-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Live Demo
                </div>
                <div className="text-sm font-semibold text-foreground">
                  See Restaurant360 on your data — 30 minutes, no slides.
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              as="a"
              href="#contact"
              className="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 text-white shadow-glow-orange hover:shadow-glow-orange"
            >
              <CalendarCheck className="size-4" /> Book Demo
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="border border-brand-200 bg-white/80 px-6 py-3.5 text-foreground shadow-sm backdrop-blur hover:bg-brand-50"
            >
              <FileText className="size-4" /> Get Quote
            </MagneticButton>
            <MagneticButton
              as="a"
              href="tel:+14153607360"
              className="px-6 py-3.5 text-brand-700 hover:bg-brand-50"
            >
              <Phone className="size-4" /> Call Sales
            </MagneticButton>
          </div>
        </Reveal>

        {/* RIGHT — form */}
        <Reveal direction="left" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export default ContactSection;
