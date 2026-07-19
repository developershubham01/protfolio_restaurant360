"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "../shared/MagneticButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "glass-card shadow-premium"
            : "border border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow-orange-sm">
            <ChefHat className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-amber-400 ring-2 ring-white" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              Restaurant<span className="text-gradient-orange">360</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Enterprise ERP
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <MagneticButton
            as="a"
            href="#contact"
            className="px-4 py-2 text-foreground hover:bg-brand-50"
          >
            Sign in
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-white shadow-glow-orange-sm hover:shadow-glow-orange"
          >
            Book Demo
          </MagneticButton>
        </div>

        <button
          className="grid size-10 place-items-center rounded-xl border border-border bg-white/70 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-3 right-3 top-[72px] rounded-2xl glass-card p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-brand-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Book Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
