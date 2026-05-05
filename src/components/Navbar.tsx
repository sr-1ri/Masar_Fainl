import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/chat", label: "هياف" },
  { href: "/specializations", label: "التخصصات" },
  { href: "/admissions", label: "نسب القبول" },
  { href: "/methods", label: "طرق المذاكرة" },
  { href: "/resources", label: "المصادر" },
  { href: "/stages", label: "المراحل" },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-sadu-dark text-ivory sticky top-0 z-50 shadow-[0_2px_24px_-4px_rgba(6,78,59,0.35)] border-b-2 border-gold">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--gold-bright))] via-[hsl(var(--gold))] to-[hsl(var(--gold-deep))] flex items-center justify-center text-[hsl(var(--royal-green-deep))] font-display text-2xl shadow-md border border-[hsl(var(--gold-deep))]">
            م
          </div>
          <div className="leading-tight">
            <div className="font-display gold-shimmer text-[2rem] tracking-wider leading-none">
              مسار
            </div>
            <div className="text-[10px] text-[hsl(var(--gold-soft))] tracking-wide font-bold mt-0.5">
              المرجع الأول للتعليم المستدام
            </div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-black transition-all relative",
                    active
                      ? "btn-gold !rounded-lg !py-1.5"
                      : "text-ivory hover:text-[hsl(var(--gold-bright))] hover:bg-white/10",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-ivory hover:bg-white/10"
          aria-label="القائمة"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[hsl(var(--royal-green-deep))] border-t border-gold/40">
          <ul className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = location === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm font-black",
                      active
                        ? "btn-gold !rounded-lg"
                        : "text-ivory hover:bg-white/10",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
