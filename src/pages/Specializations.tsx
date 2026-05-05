import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, TrendingUp, Sparkles } from "lucide-react";
import {
  useListSpecializations,
  type Specialization,
} from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const demandLabels: Record<string, { label: string; classes: string }> = {
  very_high: { label: "طلب مرتفع جداً", classes: "bg-red-100 text-red-700" },
  high: { label: "طلب مرتفع", classes: "bg-orange-100 text-orange-700" },
  medium: { label: "طلب متوسط", classes: "bg-yellow-100 text-yellow-700" },
  low: { label: "طلب منخفض", classes: "bg-gray-100 text-gray-700" },
};

export default function Specializations() {
  const { data, isLoading } = useListSpecializations();
  const [filter, setFilter] = useState<string | "all">("all");

  const specs = (data as Specialization[] | undefined) ?? [];
  const categories = useMemo(
    () => Array.from(new Set(specs.map((s) => s.category))),
    [specs],
  );
  const filtered =
    filter === "all" ? specs : specs.filter((s) => s.category === filter);

  return (
    <div className="bg-ivory min-h-screen">
      <header className="bg-sadu-dark text-white py-12 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            دليلك للتخصصات
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-3 text-ivory">
            <span className="gold-shimmer">التخصصات</span> الجامعية السعودية
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-xl mx-auto">
            استكشف أبرز التخصصات في الجامعات السعودية وفرصها في سوق العمل.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            الكل
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </FilterChip>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-20">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-20">لا توجد تخصصات</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => {
              const demand = demandLabels[s.demandLevel] ?? demandLabels.medium;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="luxury-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-black text-[hsl(var(--royal-green))]">
                      {s.nameAr}
                    </h3>
                    <Badge className={cn("border-0", demand.classes)}>
                      <TrendingUp className="w-3 h-3 ms-1" />
                      {demand.label}
                    </Badge>
                  </div>
                  <Badge
                    variant="outline"
                    className="mb-3 border-gold-soft text-[hsl(var(--gold-deep))]"
                  >
                    {s.category}
                  </Badge>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {s.descriptionAr}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-[hsl(var(--royal-green))] font-black mb-1">
                        <Building2 className="w-4 h-4" />
                        أبرز الجامعات
                      </div>
                      <ul className="text-gray-600 space-y-0.5 pr-6 list-disc marker:text-[hsl(var(--gold))]">
                        {s.topUniversitiesAr.map((u) => (
                          <li key={u}>{u}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[hsl(var(--royal-green))] font-black mb-1">
                        <Briefcase className="w-4 h-4" />
                        مسارات مهنية
                      </div>
                      <ul className="text-gray-600 space-y-0.5 pr-6 list-disc marker:text-[hsl(var(--gold))]">
                        {s.careerPathsAr.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-black transition border",
        active
          ? "bg-gradient-to-l from-[hsl(var(--gold-deep))] to-[hsl(var(--gold))] text-white border-[hsl(var(--gold))]"
          : "bg-white text-[hsl(var(--royal-green))] border-gold-soft hover:bg-gold-soft/20",
      )}
    >
      {children}
    </button>
  );
}
