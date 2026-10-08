"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "../shared/ShimmerButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Platform", href: "#platform" },
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
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3.5 py-2 border transition-all duration-500 sm:px-4.5 bg-gradient-to-r shadow-glow-orange",
          scrolled
            ? "from-brand-600 via-brand-500 to-amber-500 border-brand-400/30 py-1.5"
            : "from-brand-500 via-brand-600 to-amber-500 border-brand-400/20",
        )}
      >
        <a href="#top" className="flex items-center select-none transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="rounded-full bg-white px-4 py-1.5 flex items-center justify-center shadow-sm">
            <img src="/logo.svg" alt="Restaurant360 Logo" className="h-6.5 w-auto block" />
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-white/90 transition-all duration-300 hover:text-white hover:bg-white/15"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ShimmerButton
            as="a"
            href="#contact"
            background="rgba(255, 255, 255, 1)"
            shimmerColor="rgba(249, 115, 22, 0.7)"
            className="text-brand-600 hover:text-brand-700 font-bold shadow-md px-5 py-2"
          >
            Book Demo
          </ShimmerButton>
        </div>

        <button
          className="grid size-9 place-items-center rounded-full bg-white text-brand-600 shadow-sm lg:hidden hover:bg-brand-50 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
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
