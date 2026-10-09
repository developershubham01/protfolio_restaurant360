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
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3.5 py-2 border transition-all duration-500 sm:px-4.5 backdrop-blur-md shadow-xl",
          scrolled
            ? "bg-black/95 border-neutral-800 shadow-2xl py-1.5"
            : "bg-neutral-950/90 border-neutral-800/80 shadow-black/40",
        )}
      >
        <a href="#top" className="flex items-center select-none transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="rounded-full bg-white px-3.5 py-1.5 flex items-center justify-center shadow-xs">
            <img src="/logo.png" alt="Restaurant360 Logo" className="h-6 w-auto block" />
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ShimmerButton
            as="a"
            href="#contact"
            background="rgba(249, 115, 22, 1)"
            shimmerColor="rgba(255, 255, 255, 0.75)"
            className="text-white font-semibold shadow-md px-5 py-2 hover:bg-brand-600"
          >
            Book Demo
          </ShimmerButton>
        </div>

        <button
          className="grid size-9 place-items-center rounded-full bg-white/10 text-white border border-white/15 shadow-xs lg:hidden hover:bg-white/20 transition-colors"
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
            className="absolute left-3 right-3 top-[72px] rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-xl p-4 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:from-brand-600 hover:to-brand-700"
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
