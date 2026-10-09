"use client";

import {
  Building2,
  Cloud,
  Hotel,
  Palmtree,
  Store,
  Network,
  Wine,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading, Marquee, Reveal } from "../shared";

type Client = { name: string; icon: LucideIcon; tag: string };

const ROW_A: Client[] = [
  { name: "Restaurant Chains", icon: Building2, tag: "Multi-outlet" },
  { name: "Cloud Kitchens", icon: Cloud, tag: "Delivery-first" },
  { name: "Hotels", icon: Hotel, tag: "F&B + Stay" },
  { name: "Resorts", icon: Palmtree, tag: "Boutique" },
  { name: "Food Courts", icon: Store, tag: "Multi-vendor" },
  { name: "Franchises", icon: Network, tag: "Multi-brand" },
  { name: "Fine Dining", icon: Wine, tag: "Premium" },
  { name: "Quick Service", icon: Utensils, tag: "QSR" },
];

// Slightly reshuffled order for the second row for visual variety.
const ROW_B: Client[] = [
  { name: "Fine Dining", icon: Wine, tag: "Premium" },
  { name: "Quick Service", icon: Utensils, tag: "QSR" },
  { name: "Franchises", icon: Network, tag: "Multi-brand" },
  { name: "Cloud Kitchens", icon: Cloud, tag: "Delivery-first" },
  { name: "Resorts", icon: Palmtree, tag: "Boutique" },
  { name: "Hotels", icon: Hotel, tag: "F&B + Stay" },
  { name: "Food Courts", icon: Store, tag: "Multi-vendor" },
  { name: "Restaurant Chains", icon: Building2, tag: "Multi-outlet" },
];

function WordmarkChip({ client }: { client: Client }) {
  const { name, icon: Icon, tag } = client;
  return (
    <div className="group/chip relative flex items-center gap-3.5 rounded-2xl border border-border/70 bg-white/70 px-5 py-3.5 opacity-60 grayscale backdrop-blur-sm transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:border-brand-200 hover:shadow-glow-orange-sm hover:-translate-y-0.5">
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-amber-100 text-brand-600 transition-all duration-500 group-hover/chip:from-brand-500 group-hover/chip:to-amber-500 group-hover/chip:text-white group-hover/chip:shadow-glow-orange-sm">
        <Icon className="size-5" />
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/40" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display whitespace-nowrap text-base font-semibold tracking-tight text-foreground">
          {name}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover/chip:text-brand-600">
          {tag}
        </span>
      </span>
    </div>
  );
}

const FOOTER_STATS = [
  { label: "restaurants onboarded", value: "50+", dot: "bg-brand-500" },
  { label: "months since launch", value: "6 Mo", dot: "bg-amber-500" },
  { label: "platform uptime", value: "99.99%", dot: "bg-brand-400" },
];

export function TrustedCompanies() {
  return (
    <Section id="trusted" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/20 blur-3xl" />

      <SectionHeading
        eyebrow="Trusted Companies"
        title={
          <>
            Trusted by{" "}
            <span className="text-gradient-orange">50+ restaurants</span>
          </>
        }
        description="A fast-growing new platform launched just 6 months ago — already trusted by 50+ independent restaurants, cafés, and cloud kitchens."
      />

      <div className="mt-14 flex flex-col gap-6">
        <Reveal>
          <Marquee duration={38} pauseOnHover>
            {ROW_A.map((c) => (
              <WordmarkChip key={c.name} client={c} />
            ))}
          </Marquee>
        </Reveal>
        <Reveal delay={0.1}>
          <Marquee duration={44} reverse pauseOnHover>
            {ROW_B.map((c) => (
              <WordmarkChip key={`${c.name}-b`} client={c} />
            ))}
          </Marquee>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {FOOTER_STATS.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                className={`size-1.5 rounded-full ${s.dot} animate-glow-pulse`}
              />
              <span className="font-display font-semibold text-foreground">
                {s.value}
              </span>
              {s.label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export default TrustedCompanies;
