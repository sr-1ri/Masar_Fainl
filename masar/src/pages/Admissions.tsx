import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  GraduationCap,
  Filter,
  Award,
  Sparkles,
} from "lucide-react";
import {
  useListUniversityPrograms,
  type UniversityProgram,
} from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "العلوم الصحية",
  "الهندسة والحاسب",
  "العلوم الإدارية",
  "تخصصات المستقبل",
];

function rateColor(rate: number): { bg: string; text: string; bar: string } {
  if (rate >= 95)
    return { bg: "bg-red-50", text: "text-red-700", bar: "bg-red-500" };
  if (rate >= 90)
    return {
      bg: "bg-orange-50",
      text: "text-orange-700",
      bar: "bg-orange-500",
    };
  if (rate >= 85)
    return { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" };
  if (rate >= 80)
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      bar: "bg-emerald-500",
    };
  return { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500" };
}

export default function Admissions() {
  const { data, isLoading } = useListUniversityPrograms();
  const programs = (data as UniversityProgram[] | undefined) ?? [];
  const [universityFilter, setUniversityFilter] = useState<string | "all">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");

  const universities = useMemo(
    () => Array.from(new Set(programs.map((p) => p.universityAr))).sort(),
    [programs],
  );

  const filtered = useMemo(() => {
    return programs.filter(
      (p) =>
        (universityFilter === "all" || p.universityAr === universityFilter) &&
        (categoryFilter === "all" || p.category === categoryFilter),
    );
  }, [programs, universityFilter, categoryFilter]);

  const groupedByUniversity = useMemo(() => {
    const groups = new Map<string, UniversityProgram[]>();
    for (const p of filtered) {
      if (!groups.has(p.universityAr)) groups.set(p.universityAr, []);
      groups.get(p.universityAr)!.push(p);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  return (
    <div className="bg-ivory min-h-screen">
      <header className="bg-sadu-dark text-white py-14 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            رواق العبور — ثانوي
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-3 text-ivory">
            <span className="gold-shimmer">جامعات السعودية</span> ونسب القبول
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-2xl mx-auto leading-relaxed">
            استعرض البرامج المتاحة في أبرز الجامعات السعودية مع نسب القبول
            التقريبية، الفرص الوظيفية، والشهادات الاحترافية المطلوبة لكل تخصص.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        <div className="luxury-card rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-black text-[hsl(var(--royal-green))]">
            <Filter className="w-4 h-4" />
            تصفية:
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={universityFilter === "all"}
              onClick={() => setUniversityFilter("all")}
            >
              كل الجامعات
            </Chip>
            {universities.map((u) => (
              <Chip
                key={u}
                active={universityFilter === u}
                onClick={() => setUniversityFilter(u)}
              >
                {u.replace("جامعة ", "")}
              </Chip>
            ))}
          </div>
          <div className="w-full border-t border-gold-soft/40 my-1" />
          <div className="flex flex-wrap gap-2">
            <Chip
              active={categoryFilter === "all"}
              onClick={() => setCategoryFilter("all")}
              variant="green"
            >
              كل التصنيفات
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                active={categoryFilter === c}
                onClick={() => setCategoryFilter(c)}
                variant="green"
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-20">جاري التحميل...</div>
        ) : groupedByUniversity.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            لا توجد برامج مطابقة لهذه التصفية
          </div>
        ) : (
          <div className="space-y-12">
            {groupedByUniversity.map(([uniName, uniPrograms]) => (
              <section key={uniName}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--royal-green))] to-[hsl(var(--royal-green-light))] text-white flex items-center justify-center shadow-md ring-2 ring-gold-soft">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
                      {uniName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {uniPrograms.length} برنامج متاح
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {uniPrograms.map((p, i) => (
                    <ProgramCard key={p.id} program={p} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  index,
}: {
  program: UniversityProgram;
  index: number;
}) {
  const c = rateColor(program.admissionRate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="luxury-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <GraduationCap className="w-5 h-5 text-[hsl(var(--gold-deep))] shrink-0" />
          <h3 className="text-lg font-black text-[hsl(var(--royal-green))] truncate">
            {program.programAr}
          </h3>
        </div>
        <div
          className={cn(
            "shrink-0 rounded-xl px-3 py-1.5 text-center min-w-[68px] border",
            c.bg,
          )}
        >
          <div className={cn("text-xl font-black leading-none", c.text)}>
            {program.admissionRate}
            <span className="text-sm">%</span>
          </div>
          <div className={cn("text-[10px] font-bold mt-0.5", c.text)}>
            نسبة القبول
          </div>
        </div>
      </div>

      <Badge
        variant="outline"
        className="border-gold-soft text-[hsl(var(--gold-deep))] mb-3 self-start"
      >
        {program.category}
      </Badge>

      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", c.bar)}
          initial={{ width: 0 }}
          whileInView={{ width: `${program.admissionRate}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.04 }}
        />
      </div>

      <div className="text-sm space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[hsl(var(--royal-green))] font-black mb-1.5">
            <Briefcase className="w-4 h-4" />
            مسميات وظيفية
          </div>
          <ul className="text-gray-600 space-y-0.5 pr-5 list-disc marker:text-[hsl(var(--gold))]">
            {program.careersAr.map((career) => (
              <li key={career}>{career}</li>
            ))}
          </ul>
        </div>

        {program.certificationsAr && program.certificationsAr.length > 0 && (
          <div className="border-t border-gold-soft/40 pt-3">
            <div className="flex items-center gap-1.5 text-[hsl(var(--gold-deep))] font-black mb-1.5">
              <Award className="w-4 h-4" />
              شهادات احترافية مفيدة
            </div>
            <div className="flex flex-wrap gap-1">
              {program.certificationsAr.map((cert) => (
                <span
                  key={cert}
                  className="bg-gold-soft/30 border border-gold-soft text-[hsl(var(--gold-deep))] px-2 py-0.5 rounded-md text-xs font-bold"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Chip({
  active,
  onClick,
  children,
  variant = "gold",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "gold" | "green";
}) {
  const activeClasses =
    variant === "green"
      ? "bg-[hsl(var(--royal-green))] text-white border-[hsl(var(--royal-green))]"
      : "bg-gradient-to-l from-[hsl(var(--gold-deep))] to-[hsl(var(--gold))] text-white border-[hsl(var(--gold))]";
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-black transition border",
        active
          ? activeClasses
          : "bg-white text-gray-700 border-gold-soft hover:bg-gold-soft/20",
      )}
    >
      {children}
    </button>
  );
}
