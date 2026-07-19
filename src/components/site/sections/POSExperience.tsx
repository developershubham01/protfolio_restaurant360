"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Wine,
  Coffee,
  IceCream,
  Salad,
  Pizza,
  Soup,
  CakeSlice,
  Plus,
  Minus,
  Trash2,
  Banknote,
  CreditCard,
  Smartphone,
  Receipt,
  Table2,
  Check,
  Sparkles,
  Percent,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, Reveal } from "../shared";

/* ---------- Types ---------- */

type TableStatus = "available" | "occupied";

type FloorTable = {
  id: string;
  label: string;
  seats: number;
  status: TableStatus;
};

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  icon: LucideIcon;
};

type CategoryId = "starters" | "mains" | "beverages" | "desserts";

type CartLine = {
  item: MenuItem;
  qty: number;
};

type GstRate = 5 | 12 | 18;
type PaymentMethod = "cash" | "card" | "upi" | null;

/* ---------- Data ---------- */

const TABLES: FloorTable[] = [
  { id: "T1", label: "T1", seats: 2, status: "occupied" },
  { id: "T2", label: "T2", seats: 4, status: "available" },
  { id: "T3", label: "T3", seats: 4, status: "occupied" },
  { id: "T4", label: "T4", seats: 2, status: "available" },
  { id: "T5", label: "T5", seats: 6, status: "available" },
  { id: "T6", label: "T6", seats: 2, status: "occupied" },
  { id: "T7", label: "T7", seats: 4, status: "available" },
  { id: "T8", label: "T8", seats: 6, status: "occupied" },
  { id: "T9", label: "T9", seats: 2, status: "available" },
  { id: "T10", label: "T10", seats: 4, status: "available" },
  { id: "T11", label: "T11", seats: 4, status: "occupied" },
  { id: "T12", label: "T12", seats: 2, status: "available" },
];

const CATEGORIES: { id: CategoryId; label: string; icon: LucideIcon }[] = [
  { id: "starters", label: "Starters", icon: Soup },
  { id: "mains", label: "Mains", icon: Utensils },
  { id: "beverages", label: "Beverages", icon: Coffee },
  { id: "desserts", label: "Desserts", icon: IceCream },
];

const MENU: MenuItem[] = [
  // Starters
  { id: "s1", name: "Crispy Corn", price: 220, category: "starters", icon: Salad },
  { id: "s2", name: "Paneer Tikka", price: 280, category: "starters", icon: Pizza },
  { id: "s3", name: "Spring Rolls", price: 180, category: "starters", icon: Soup },
  // Mains
  { id: "m1", name: "Butter Naan", price: 60, category: "mains", icon: Utensils },
  { id: "m2", name: "Paneer Butter Masala", price: 320, category: "mains", icon: Pizza },
  { id: "m3", name: "Veg Biryani", price: 260, category: "mains", icon: Utensils },
  { id: "m4", name: "Margherita Pizza", price: 380, category: "mains", icon: Pizza },
  // Beverages
  { id: "b1", name: "Cold Coffee", price: 140, category: "beverages", icon: Coffee },
  { id: "b2", name: "Fresh Lime Soda", price: 90, category: "beverages", icon: Wine },
  { id: "b3", name: "Masala Chai", price: 60, category: "beverages", icon: Coffee },
  // Desserts
  { id: "d1", name: "Gulab Jamun", price: 120, category: "desserts", icon: CakeSlice },
  { id: "d2", name: "Chocolate Mousse", price: 180, category: "desserts", icon: IceCream },
];

const GST_RATES: GstRate[] = [5, 12, 18];

/* ---------- Helpers ---------- */

const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

function fmt2(n: number) {
  return String(n).padStart(2, "0");
}

/* ---------- Sub-components ---------- */

function FloorPanel({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const occupied = TABLES.filter((t) => t.status === "occupied").length;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <Table2 className="size-4 text-brand-600" />
          <h3 className="text-sm font-semibold text-foreground">Floor Layout</h3>
        </div>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
          {occupied} / {TABLES.length} seated
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {TABLES.map((t) => {
          const isSelected = selected === t.id;
          const isOccupied = t.status === "occupied";
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              aria-pressed={isSelected}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
                isSelected
                  ? "border-brand-500 bg-brand-500 text-white shadow-lg shadow-brand-500/40 scale-[1.03]"
                  : isOccupied
                    ? "border-brand-300 bg-brand-100/70 text-brand-800 hover:border-brand-400"
                    : "border-dashed border-brand-200 bg-white/60 text-brand-500 hover:border-brand-400 hover:bg-brand-50",
              )}
            >
              <Table2 className="size-4" />
              <span className="mt-1 text-xs font-bold">{t.label}</span>
              <span className="text-[9px] opacity-80">{t.seats} seats</span>
              {isSelected && (
                <motion.span
                  layoutId="table-select"
                  className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-white text-brand-600 shadow"
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3 px-1 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand-500" /> Occupied
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-dashed border-brand-300" /> Available
        </span>
      </div>
    </div>
  );
}

function MenuPanel({
  activeCat,
  setActiveCat,
  onAdd,
  cartIds,
}: {
  activeCat: CategoryId;
  setActiveCat: (c: CategoryId) => void;
  onAdd: (item: MenuItem) => void;
  cartIds: Set<string>;
}) {
  const filtered = MENU.filter((m) => m.category === activeCat);
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <Utensils className="size-4 text-brand-600" />
          <h3 className="text-sm font-semibold text-foreground">Menu</h3>
        </div>
        <span className="text-[10px] text-muted-foreground">Tap + to add</span>
      </div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5 pb-3">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const active = c.id === activeCat;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-brand-500 to-amber-500 text-white shadow-md shadow-brand-500/30"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100",
              )}
            >
              <Icon className="size-3.5" />
              {c.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          <motion.ul
            key={activeCat}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            {filtered.map((item) => {
              const Icon = item.icon;
              const inCart = cartIds.has(item.id);
              return (
                <li
                  key={item.id}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-200",
                    inCart
                      ? "border-brand-300 bg-brand-50/70"
                      : "border-brand-100 bg-white/70 hover:border-brand-200 hover:bg-brand-50/40",
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-amber-100 text-brand-700">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs font-medium text-brand-700">
                      {formatINR(item.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAdd(item)}
                    aria-label={`Add ${item.name} to cart`}
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                      "bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-md shadow-brand-500/30",
                      "hover:scale-110 hover:shadow-brand-500/50 active:scale-95",
                    )}
                  >
                    <Plus className="size-4" strokeWidth={2.5} />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CartPanel({
  cart,
  onQty,
  onRemove,
  gstRate,
  onGst,
  discount,
  onDiscount,
  onPay,
  table,
}: {
  cart: CartLine[];
  onQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  gstRate: GstRate;
  onGst: (r: GstRate) => void;
  discount: string;
  onDiscount: (v: string) => void;
  onPay: (m: Exclude<PaymentMethod, null>) => void;
  table: string | null;
}) {
  const subtotal = cart.reduce((s, l) => s + l.item.price * l.qty, 0);
  const discountNum = Math.min(Math.max(Number(discount) || 0, 0), subtotal);
  const taxable = Math.max(subtotal - discountNum, 0);
  const gst = Math.round((taxable * gstRate) / 100);
  const total = taxable + gst;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <Receipt className="size-4 text-brand-600" />
          <h3 className="text-sm font-semibold text-foreground">Current Order</h3>
        </div>
        {table && (
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
            {table} · Dine-in
          </span>
        )}
      </div>

      {/* Cart lines */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {cart.length === 0 ? (
          <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-6 text-center">
            <Utensils className="size-6 text-brand-300" />
            <p className="text-xs font-medium text-muted-foreground">
              Select a table and add items to begin billing.
            </p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {cart.map((line) => {
                const Icon = line.item.icon;
                return (
                  <motion.li
                    key={line.item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 rounded-xl bg-white/80 p-2 shadow-sm border border-brand-100"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {line.item.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatINR(line.item.price)} × {line.qty}
                      </p>
                    </div>
                    {/* qty stepper */}
                    <div className="flex items-center gap-1 rounded-lg bg-brand-50 p-0.5">
                      <button
                        type="button"
                        onClick={() => onQty(line.item.id, -1)}
                        aria-label={`Decrease ${line.item.name}`}
                        className="flex size-6 items-center justify-center rounded-md bg-white text-brand-700 shadow-sm transition hover:bg-brand-100"
                      >
                        <Minus className="size-3" strokeWidth={2.5} />
                      </button>
                      <span className="w-4 text-center text-xs font-bold text-foreground">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onQty(line.item.id, 1)}
                        aria-label={`Increase ${line.item.name}`}
                        className="flex size-6 items-center justify-center rounded-md bg-white text-brand-700 shadow-sm transition hover:bg-brand-100"
                      >
                        <Plus className="size-3" strokeWidth={2.5} />
                      </button>
                    </div>
                    <span className="w-12 text-right text-xs font-bold text-foreground">
                      {formatINR(line.item.price * line.qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(line.item.id)}
                      aria-label={`Remove ${line.item.name}`}
                      className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {/* Totals */}
      <div className="mt-3 space-y-2 rounded-2xl bg-brand-50/60 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">{formatINR(subtotal)}</span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Percent className="size-3" /> Discount
          </span>
          <div className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 shadow-sm">
            <span className="text-brand-600">₹</span>
            <input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => onDiscount(e.target.value)}
              placeholder="0"
              className="w-12 bg-transparent text-right text-xs font-semibold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label="Discount amount in rupees"
            />
          </div>
        </div>

        {/* GST toggle */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">GST</span>
          <div className="flex items-center gap-1 rounded-lg bg-white p-0.5 shadow-sm">
            {GST_RATES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onGst(r)}
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-bold transition-all",
                  gstRate === r
                    ? "bg-brand-500 text-white shadow"
                    : "text-brand-700 hover:bg-brand-50",
                )}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Tax amount</span>
          <span className="font-semibold text-foreground">{formatINR(gst)}</span>
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-brand-200 pt-2">
          <span className="text-sm font-bold text-foreground">Total</span>
          <motion.span
            key={total}
            initial={{ scale: 1.08, color: "#f97316" }}
            animate={{ scale: 1, color: "#1a1a1a" }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold text-foreground"
          >
            {formatINR(total)}
          </motion.span>
        </div>
      </div>

      {/* Payment buttons */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {([
          { id: "cash", label: "Cash", icon: Banknote },
          { id: "card", label: "Card", icon: CreditCard },
          { id: "upi", label: "UPI", icon: Smartphone },
        ] as const).map((p) => {
          const Icon = p.icon;
          const disabled = cart.length === 0;
          return (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              onClick={() => onPay(p.id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border-2 p-2.5 text-xs font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
                disabled
                  ? "cursor-not-allowed border-brand-100 bg-brand-50/30 text-muted-foreground/60"
                  : "border-brand-200 bg-white text-brand-700 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:shadow-md hover:shadow-brand-500/20",
              )}
            >
              <Icon className="size-4" />
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Receipt preview ---------- */

function ReceiptPreview({
  open,
  cart,
  gstRate,
  discount,
  table,
  method,
  onClose,
}: {
  open: boolean;
  cart: CartLine[];
  gstRate: GstRate;
  discount: string;
  table: string | null;
  method: PaymentMethod;
  onClose: () => void;
}) {
  if (!open) return null;
  const subtotal = cart.reduce((s, l) => s + l.item.price * l.qty, 0);
  const discountNum = Math.min(Math.max(Number(discount) || 0, 0), subtotal);
  const taxable = Math.max(subtotal - discountNum, 0);
  const gst = Math.round((taxable * gstRate) / 100);
  const total = taxable + gst;
  const now = new Date();
  const methodLabel =
    method === "cash" ? "Cash" : method === "card" ? "Card" : method === "upi" ? "UPI" : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs rounded-3xl bg-white p-6 shadow-premium"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close receipt"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
        >
          <X className="size-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-lg">
            <Receipt className="size-6" />
          </div>
          <h4 className="mt-3 font-display text-lg font-bold text-foreground">
            Restaurant360
          </h4>
          <p className="text-[10px] text-muted-foreground">
            {now.toLocaleDateString("en-IN")} ·{" "}
            {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-[10px] text-muted-foreground">
            Table {table ?? "—"} · Dine-in · Inv #{Math.floor(Math.random() * 9000 + 1000)}
          </p>
        </div>

        <div className="my-3 border-t border-dashed border-brand-200" />

        <ul className="space-y-1 text-xs">
          {cart.map((l) => (
            <li key={l.item.id} className="flex justify-between text-foreground">
              <span className="truncate pr-2">
                {l.qty}× {l.item.name}
              </span>
              <span className="font-medium">{formatINR(l.item.price * l.qty)}</span>
            </li>
          ))}
        </ul>

        <div className="my-3 border-t border-dashed border-brand-200" />

        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          {discountNum > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Discount</span>
              <span>-{formatINR(discountNum)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>GST ({gstRate}%)</span>
            <span>{formatINR(gst)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-brand-200 pt-1 text-sm font-bold text-foreground">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <div className="flex justify-between text-[10px] text-brand-700">
            <span>Paid via {methodLabel}</span>
            <span className="inline-flex items-center gap-1">
              <Check className="size-3" /> Success
            </span>
          </div>
        </div>

        <div className="my-3 border-t border-dashed border-brand-200" />

        <p className="text-center text-[10px] text-muted-foreground">
          Thank you for dining with us!
          <br />
          <span className="inline-flex items-center gap-1 text-brand-600">
            <Sparkles className="size-3" /> Powered by Restaurant360 POS
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Main component ---------- */

export function POSExperience() {
  const [selectedTable, setSelectedTable] = React.useState<string | null>("T3");
  const [activeCat, setActiveCat] = React.useState<CategoryId>("starters");
  const [cart, setCart] = React.useState<CartLine[]>([
    { item: MENU[1], qty: 1 }, // Paneer Tikka
    { item: MENU[3], qty: 2 }, // Butter Naan
  ]);
  const [gstRate, setGstRate] = React.useState<GstRate>(5);
  const [discount, setDiscount] = React.useState<string>("");
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(null);

  const cartIds = React.useMemo(
    () => new Set(cart.map((l) => l.item.id)),
    [cart],
  );

  const handleAdd = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.item.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l,
        )
        .filter((l) => l.qty > 0),
    );
  };

  const handleRemove = (id: string) =>
    setCart((prev) => prev.filter((l) => l.item.id !== id));

  const handlePay = (m: Exclude<PaymentMethod, null>) => {
    if (cart.length === 0) return;
    setPaymentMethod(m);
    setReceiptOpen(true);
  };

  const closeReceipt = () => {
    setReceiptOpen(false);
    // clear cart after small delay so the receipt feels complete
    setTimeout(() => {
      setCart([]);
      setPaymentMethod(null);
      setDiscount("");
    }, 200);
  };

  return (
    <Section id="pos">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div className="pointer-events-none absolute -top-24 right-1/4 -z-10 size-72 rounded-full bg-brand-300/20 blur-3xl" />

      <SectionHeading
        eyebrow="POS Experience"
        title={
          <>
            Billing that feels like{" "}
            <span className="text-gradient-orange">magic</span>
          </>
        }
        description="A glimpse of the live POS — pick a table, build the order, apply discounts and tax, then tender cash, card or UPI. Every interaction responds instantly."
      />

      <Reveal className="mt-12" delay={0.1}>
        <div className="glass-card gradient-border overflow-hidden rounded-3xl shadow-premium">
          {/* Dashboard chrome */}
          <div className="flex items-center justify-between border-b border-brand-100 bg-white/60 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-green-400" />
              </div>
              <span className="ml-2 text-xs font-semibold text-muted-foreground">
                pos.restaurant360.app / billing
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Shift open · Register #1
              </span>
            </div>
          </div>

          {/* Three-column dashboard */}
          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,360px)]">
            {/* Floor — left */}
            <div className="rounded-2xl border border-brand-100 bg-white/70 p-4 lg:max-h-[560px]">
              <FloorPanel selected={selectedTable} onSelect={setSelectedTable} />
            </div>

            {/* Menu — middle */}
            <div className="rounded-2xl border border-brand-100 bg-white/70 p-4 lg:max-h-[560px]">
              <MenuPanel
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                onAdd={handleAdd}
                cartIds={cartIds}
              />
            </div>

            {/* Cart — right */}
            <div className="rounded-2xl border border-brand-100 bg-white/70 p-4 lg:max-h-[560px]">
              <CartPanel
                cart={cart}
                onQty={handleQty}
                onRemove={handleRemove}
                gstRate={gstRate}
                onGst={setGstRate}
                discount={discount}
                onDiscount={setDiscount}
                onPay={handlePay}
                table={selectedTable}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        <ReceiptPreview
          open={receiptOpen}
          cart={cart}
          gstRate={gstRate}
          discount={discount}
          table={selectedTable}
          method={paymentMethod}
          onClose={closeReceipt}
        />
      </AnimatePresence>
    </Section>
  );
}

export default POSExperience;
