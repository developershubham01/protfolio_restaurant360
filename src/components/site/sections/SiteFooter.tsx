"use client";

import {
  ChefHat,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { SOCIALS, SOCIAL_ICONS } from "@/lib/socials";

const QUICK_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Platform", href: "#platform" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-gradient-to-b from-white to-brand-50/60">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-0 size-[420px] -translate-x-1/2 rounded-full bg-brand-300/25 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr]">
          {/* Brand */}
          <Reveal>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow-orange-sm">
                <ChefHat className="size-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Restaurant<span className="text-gradient-orange">360</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The enterprise Restaurant ERP platform unifying POS, kitchen, inventory,
              CRM, analytics and AI for chains, cloud kitchens and franchises.
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-brand-200/80 bg-brand-50/70 px-3 py-1.5 text-xs text-foreground/80">
              <span>Restaurant360 is</span>
              <a
                href="https://www.abwcurious.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
              >
                ABWcurious (OPC) Pvt. Ltd.
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={`${s.label}: ${s.handle}`}
                    className="grid size-9 place-items-center rounded-xl border border-border bg-white text-muted-foreground transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                  </a>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href="https://www.abwcurious.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand-600"
              >
                <ArrowUpRight className="size-4 text-brand-500" /> www.abwcurious.com
              </a>
              <a
                href="mailto:info@abwcurious.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand-600"
              >
                <Mail className="size-4 text-brand-500" /> info@abwcurious.com
              </a>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.08} className="lg:justify-self-end">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Newsletter strip */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200/60 bg-white/70 p-5 backdrop-blur sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Get product updates & restaurant tech insights
              </p>
              <p className="text-sm text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </div>
            <form className="flex w-full max-w-md items-center gap-2">
              <input
                type="email"
                placeholder="you@restaurant.com"
                className="h-11 w-full rounded-full border border-border bg-white px-4 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              />
              <button
                type="button"
                className="h-11 shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 text-sm font-semibold text-white shadow-glow-orange-sm transition-shadow hover:shadow-glow-orange"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Restaurant360 is{" "}
            <a
              href="https://www.abwcurious.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:text-brand-600 hover:underline"
            >
              ABWcurious (OPC) Pvt. Ltd.
            </a>{" "}
            All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 animate-glow-pulse rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
