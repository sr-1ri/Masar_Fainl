import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Eye,
  Ear,
  Hand,
  RefreshCw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

type Style = "visual" | "auditory" | "kinesthetic";

const QUESTIONS: { q: string; options: { label: string; value: Style }[] }[] = [
  {
    q: "حين يشرح المعلّم درساً جديداً، أيّ طريقة تساعدك أكثر؟",
    options: [
      { label: "أن أرى مخططاً أو رسماً", value: "visual" },
      { label: "أن أستمع لشرح صوتي مفصّل", value: "auditory" },
      { label: "أن أجرّب الأمر بيدي مباشرة", value: "kinesthetic" },
    ],
  },
  {
    q: "أحفظ المعلومة بسرعة عندما...",
    options: [
      { label: "أكتبها بألوان وأرسم لها مخطط", value: "visual" },
      { label: "أكرّرها بصوت عالٍ أو أستمع لتسجيل", value: "auditory" },
      { label: "أطبّقها بتجربة عملية", value: "kinesthetic" },
    ],
  },
  {
    q: "في وقت المراجعة قبل الاختبار...",
    options: [
      { label: "أصنع خرائط ذهنية وأقرأ ملخصات مرئية", value: "visual" },
      { label: "أناقش الدرس مع زميل أو أعيد شرحه بصوتي", value: "auditory" },
      { label: "أحلّ تمارين كثيرة وأعيد التطبيق", value: "kinesthetic" },
    ],
  },
  {
    q: "حين تتلقى تعليمات لمشروع جديد تفضّل...",
    options: [
      { label: "خطوات مكتوبة مع رسوم توضيحية", value: "visual" },
      { label: "شرحاً صوتياً أو فيديو شارح", value: "auditory" },
      { label: "أن تبدأ مباشرة وتتعلّم بالممارسة", value: "kinesthetic" },
    ],
  },
  {
    q: "ما الذي يشتّتك أكثر أثناء المذاكرة؟",
    options: [
      { label: "الفوضى البصرية حولي", value: "visual" },
      { label: "الضوضاء والأصوات", value: "auditory" },
      { label: "الجلوس الطويل بدون حركة", value: "kinesthetic" },
    ],
  },
];

const RESULTS: Record<
  Style,
  {
    title: string;
    icon: typeof Eye;
    color: string;
    description: string;
    tips: string[];
  }
> = {
  visual: {
    title: "أنت متعلّم بصري",
    icon: Eye,
    color: "from-emerald-700 to-emerald-900",
    description:
      "تمتاز بقدرة عالية على فهم المعلومة عند رؤيتها مرسومة أو ملوّنة. ذاكرتك البصرية قوية.",
    tips: [
      "استخدم الخرائط الذهنية والمخططات بألوان متعدّدة.",
      "حوّل الفقرات الطويلة إلى جداول وقوائم نقطية.",
      "استعن بفيديوهات يوتيوب التي تستخدم رسوماً متحرّكة.",
      "استخدم Sticky Notes ملوّنة على جدار الغرفة لمراجعة المفاهيم.",
    ],
  },
  auditory: {
    title: "أنت متعلّم سمعي",
    icon: Ear,
    color: "from-[hsl(var(--gold-deep))] to-[hsl(var(--gold))]",
    description:
      "تتعلّم بأفضل صورة عبر الاستماع والمناقشة. تتذكّر الشروحات الصوتية أكثر من المكتوبة.",
    tips: [
      "استمع إلى البودكاست التعليمي أثناء المشي أو الرياضة.",
      "اشرح الدرس بصوت عالٍ لنفسك (تقنية فاينمان).",
      "كوّن مجموعة دراسية صغيرة للنقاش.",
      "سجّل ملخصات صوتية واسمعها قبل النوم.",
    ],
  },
  kinesthetic: {
    title: "أنت متعلّم حركي",
    icon: Hand,
    color: "from-teal-700 to-teal-900",
    description:
      "يدك أكبر مساعد لك. التعلّم بالتجربة والتطبيق هو طريقتك الذهبية.",
    tips: [
      "حلّ أكبر عدد من التمارين بدلاً من القراءة المتكرّرة.",
      "استخدم التجارب العملية للعلوم (كيمياء، أحياء، فيزياء).",
      "استخدم بطاقات Anki الورقية ولمسها أثناء المراجعة.",
      "خذ فترات راحة قصيرة كل ٢٥ دقيقة (بومودورو) للحركة.",
    ],
  },
};

export default function Personality() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Style[]>([]);

  function answer(value: Style) {
    const next = [...answers, value];
    setAnswers(next);
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  const done = step >= QUESTIONS.length;
  let result: Style = "visual";
  if (done) {
    const counts: Record<Style, number> = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
    };
    answers.forEach((a) => counts[a]++);
    result = (Object.keys(counts) as Style[]).reduce((a, b) =>
      counts[a] >= counts[b] ? a : b,
    );
  }

  const r = RESULTS[result];
  const Icon = r.icon;

  return (
    <div className="bg-ivory min-h-screen">
      <header className="bg-sadu-dark text-white py-12 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            اختبار سريع — دقيقتان فقط
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ivory">
            <span className="gold-shimmer">تحليل الشخصية</span> الدراسية
          </h1>
          <p className="text-ivory/95 font-semibold max-w-xl mx-auto mt-3">
            هل أنت متعلّم بصري، سمعي، أم حركي؟ اكتشف أسلوبك الأمثل في الفهم.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="luxury-card rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black text-[hsl(var(--gold-deep))] tracking-widest">
                  السؤال {step + 1} / {QUESTIONS.length}
                </span>
                <div className="flex-1 mx-4 h-1.5 bg-gold-soft/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-l from-[hsl(var(--gold-deep))] to-[hsl(var(--gold))] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-black text-[hsl(var(--royal-green))] mb-6 leading-relaxed">
                {QUESTIONS[step].q}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[step].options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => answer(o.value)}
                    className="w-full text-right bg-white border-2 border-gold-soft hover:border-gold hover:bg-gold-soft/10 rounded-2xl p-4 font-bold text-[hsl(var(--royal-green))] transition group flex items-center justify-between"
                  >
                    <span>{o.label}</span>
                    <ArrowLeft className="w-4 h-4 text-[hsl(var(--gold-deep))] opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="luxury-card rounded-3xl overflow-hidden"
            >
              <div className={`h-3 bg-gradient-to-l ${r.color}`} />
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white mx-auto mb-5 shadow-xl`}
                >
                  <Icon className="w-12 h-12" />
                </motion.div>
                <h2 className="text-3xl font-black text-[hsl(var(--royal-green))] mb-2">
                  {r.title}
                </h2>
                <div className="gold-divider w-32 mx-auto my-4" />
                <p className="text-gray-700 leading-relaxed mb-6 max-w-md mx-auto">
                  {r.description}
                </p>

                <div className="bg-sadu rounded-2xl p-5 text-right mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-[hsl(var(--gold-deep))]" />
                    <h3 className="font-black text-[hsl(var(--royal-green))]">
                      نصائح مخصّصة لك
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {r.tips.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[hsl(var(--gold))] shrink-0 mt-0.5">
                          ◆
                        </span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href={`/chat?style=${result}`}
                    className="btn-gold px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    اطلب خطّة من هياف <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={reset}
                    className="bg-white border-2 border-gold-soft text-[hsl(var(--gold-deep))] hover:bg-gold-soft/30 px-6 py-3 rounded-xl font-black flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> إعادة الاختبار
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
