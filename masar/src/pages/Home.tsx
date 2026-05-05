import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Compass,
  Award,
  Sparkles,
  GraduationCap,
  Lightbulb,
  ArrowLeft,
  PlayCircle,
  Brain,
  Target,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";
import { useGetDashboardSummary } from "@workspace/api-client-react";

const corridors = [
  {
    title: "رواق التأسيس",
    stage: "متوسط",
    description:
      "تهيئة مبكرة لاختبارات قياس وكسر روتين المذاكرة التقليدي.",
    cta: "ابدأ الرحلة",
    href: "/methods",
    icon: Lightbulb,
    accent: "from-emerald-700 to-emerald-900",
  },
  {
    title: "رواق العبور",
    stage: "ثانوي",
    description:
      "اكتشف تخصصك الجامعي المناسب وتعرف على نسب القبول والشهادات الاحترافية.",
    cta: "استكشف الجامعات",
    href: "/admissions",
    icon: Compass,
    accent: "from-[hsl(var(--gold-deep))] to-[hsl(var(--gold))]",
  },
  {
    title: "رواق التميز",
    stage: "جامعي",
    description:
      "مصادر التدريب التعاوني، الشهادات الاحترافية، وبوابة الفرص الوظيفية.",
    cta: "طوّر مهاراتك",
    href: "/resources",
    icon: Award,
    accent: "from-emerald-800 to-teal-700",
  },
];

const featureCards = [
  {
    title: "اختبار الشخصية الدراسية",
    description: "اكتشف هل أنت متعلم بصري، سمعي، أم حركي — في دقيقتين.",
    icon: Brain,
    href: "/personality",
    cta: "ابدأ الاختبار",
  },
  {
    title: "هياف يحلّل صورك",
    description: "ارفع كشف درجاتك أو جدولك ودع هياف يحلّله بذكاء.",
    icon: ImageIcon,
    href: "/chat",
    cta: "جرّب الآن",
  },
  {
    title: "تقنيات المذاكرة الحديثة",
    description: "بومودورو، التكرار المتباعد، والخرائط الذهنية بالذكاء الاصطناعي.",
    icon: Target,
    href: "/methods",
    cta: "تعلّم الطريقة",
  },
];

export default function Home() {
  const { data: summary } = useGetDashboardSummary();

  return (
    <div className="bg-ivory">
      {/* HERO */}
      <header className="relative bg-sadu border-b-2 border-gold py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/70 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[hsl(var(--gold))] text-[hsl(var(--royal-green))] px-4 py-1.5 rounded-full text-xs font-black mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--gold-deep))]" />
            رؤية ٢٠٣٠ — المرجع الأول للتعليم المستدام
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-[hsl(var(--royal-green-deep))] mb-4 leading-tight">
            مستقبلك يبدأ بـ{" "}
            <span className="font-display gold-shimmer-light text-6xl md:text-8xl">
              "مسار"
            </span>
          </h2>
          <div className="gold-divider w-40 mx-auto my-6" />
          <p className="text-[hsl(var(--ink))] max-w-2xl mx-auto leading-relaxed text-lg font-bold">
            أول منصة سعودية ذكية ترافقك من المرحلة المتوسطة وحتى أول خطوة في
            مسارك المهني — بإلهام من تراث عسير وأصالة جامعة الملك خالد.
          </p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Link
              href="/chat"
              className="btn-gold px-7 py-3.5 rounded-xl flex items-center gap-2"
            >
              تحدّث مع هياف
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/personality"
              className="bg-white border-2 border-[hsl(var(--royal-green))] text-[hsl(var(--royal-green-deep))] hover:bg-[hsl(var(--royal-green))] hover:text-ivory px-7 py-3.5 rounded-xl font-black transition shadow-sm"
            >
              اكتشف شخصيتك الدراسية
            </Link>
          </div>
        </motion.div>
      </header>

      {/* VIDEO PLACEHOLDER */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-6">
          <p className="text-xs font-black text-[hsl(var(--gold-deep))] tracking-widest mb-2">
            جولة سريعة
          </p>
          <h3 className="font-display text-4xl text-[hsl(var(--royal-green-deep))]">
            طريقة استخدام منصة مسار
          </h3>
          <div className="gold-divider w-24 mx-auto mt-3" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden bg-sadu-dark border-2 border-gold shadow-2xl shadow-emerald-900/40"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--royal-green-deep))]/85 via-transparent to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              type="button"
              aria-label="تشغيل الفيديو"
              className="group relative w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--gold-bright))] to-[hsl(var(--gold-deep))] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-2 border-[hsl(var(--gold-deep))]"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />
              <PlayCircle className="w-14 h-14 text-[hsl(var(--royal-green-deep))] relative" />
            </button>
            <p className="font-display mt-6 text-3xl gold-shimmer">
              فيديو سينمائي — قريباً
            </p>
            <p className="text-sm text-ivory mt-2 max-w-sm text-center font-bold">
              جولة مرئية تعرّفك على رحلة الطالب داخل مسار من الـتأسيس إلى التميز.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CORRIDORS */}
      <main className="container mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-black text-[hsl(var(--gold-deep))] tracking-widest mb-2">
            ثلاثة أروقة
          </p>
          <h3 className="font-display text-4xl text-[hsl(var(--royal-green-deep))]">
            اختر الرواق المناسب لمرحلتك
          </h3>
          <div className="gold-divider w-24 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corridors.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-[hsl(var(--gold-soft))]"
              >
                <div className={`h-2 bg-gradient-to-l ${c.accent}`} />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.accent} flex items-center justify-center text-ivory shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-black bg-[hsl(var(--gold-soft))] text-[hsl(var(--royal-green-deep))] border border-[hsl(var(--gold))]">
                      {c.stage}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl text-[#064E3B] mb-2 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-[hsl(var(--ink))] mb-5 leading-relaxed font-semibold">
                    {c.description}
                  </p>
                  <Link
                    href={c.href}
                    className="font-black inline-flex items-center gap-1 text-[hsl(var(--gold-deep))] hover:gap-2 transition-all"
                  >
                    {c.cta} <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FEATURE STRIP */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {featureCards.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-5 border-2 border-[hsl(var(--gold-soft))] hover:border-gold transition flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--gold-bright))] to-[hsl(var(--gold-deep))] flex items-center justify-center text-[hsl(var(--royal-green-deep))] shrink-0 border border-[hsl(var(--gold-deep))]">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-[#064E3B] mb-1 text-base">
                    {f.title}
                  </h4>
                  <p className="text-sm text-[hsl(var(--ink))] mb-2 font-medium">
                    {f.description}
                  </p>
                  <Link
                    href={f.href}
                    className="text-xs font-black text-[hsl(var(--gold-deep))] inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {f.cta} <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* STATS */}
        {summary && (
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<GraduationCap className="w-5 h-5" />}
              label="مراحل دراسية"
              value={summary.totalStages}
            />
            <StatCard
              icon={<Compass className="w-5 h-5" />}
              label="تخصص جامعي"
              value={summary.totalSpecializations}
            />
            <StatCard
              icon={<Lightbulb className="w-5 h-5" />}
              label="طريقة مذاكرة"
              value={summary.totalStudyTips}
            />
            <StatCard
              icon={<BookOpen className="w-5 h-5" />}
              label="محادثة مع هياف"
              value={summary.totalConversations}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-[hsl(var(--gold-soft))]">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(var(--gold-bright))] to-[hsl(var(--gold-deep))] text-[hsl(var(--royal-green-deep))] flex items-center justify-center shadow-sm border border-[hsl(var(--gold-deep))]">
        {icon}
      </div>
      <div>
        <div className="font-display text-3xl text-[#064E3B] leading-none">
          {value}
        </div>
        <div className="text-xs text-[hsl(var(--ink))] font-black mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
