import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Timer,
  Brain,
  RotateCcw,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  Map as MapIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AGE_TAGS: Record<string, string> = {
  middle: "متوسط",
  high: "ثانوي",
  uni: "جامعي",
  all: "كل المراحل",
};

const techniques = [
  {
    id: "pomodoro",
    title: "تقنية بومودورو",
    subtitle: "Pomodoro Technique",
    description:
      "اعمل بتركيز مكثّف ٢٥ دقيقة، ثم خذ راحة ٥ دقائق. كل ٤ جلسات يستحقّك راحة طويلة ١٥–٣٠ دقيقة.",
    benefits: [
      "تقلّل من التشتّت ورهق التحديق المستمر.",
      "ترفع جودة الفهم بدل كميّة الساعات.",
      "مناسبة للمواد الكثيفة (كيمياء، رياضيات، فيزياء).",
    ],
    ages: ["middle", "high", "uni"],
  },
  {
    id: "spaced",
    title: "التكرار المتباعد",
    subtitle: "Spaced Repetition",
    description:
      "راجع المعلومة في فترات متباعدة (يوم، ٣ أيام، أسبوع، شهر) لينقلها دماغك إلى الذاكرة طويلة المدى.",
    benefits: [
      "تثبّت الكلمات والمصطلحات بسهولة.",
      "تنقذك في اختبارات التحصيلي والقدرات.",
      "أداتها المثالية: بطاقات أنكي (Anki) أو Quizlet.",
    ],
    ages: ["middle", "high", "uni"],
  },
  {
    id: "mindmap",
    title: "الخرائط الذهنية بالذكاء الاصطناعي",
    subtitle: "AI-Powered Mind Maps",
    description:
      "حوّل فصلاً كاملاً إلى مخطط مرئي يربط الأفكار في فروع. مع أدوات الذكاء الاصطناعي يصير الأمر أسرع.",
    benefits: [
      "مثالية للمتعلم البصري.",
      "تكشف العلاقة بين المفاهيم.",
      "أدوات مقترحة: Whimsical AI، Xmind AI، Notion AI.",
    ],
    ages: ["high", "uni"],
  },
  {
    id: "feynman",
    title: "تقنية فاينمان",
    subtitle: "Feynman Technique",
    description:
      "اشرح الدرس بصوت عالٍ وكأنك تشرحه لطفل في الخامسة. كلما تعثّرت، رجعت للمصدر — هكذا تكتشف فجواتك.",
    benefits: [
      "تكشف ما تظنّ أنّك فهمته فعلاً.",
      "مناسبة للمتعلم السمعي.",
      "ممتازة للمواد النظرية (تاريخ، أحياء).",
    ],
    ages: ["middle", "high", "uni"],
  },
];

export default function Methods() {
  return (
    <div className="bg-ivory">
      <header className="bg-sadu-dark text-white py-14 px-4 border-b-2 border-gold relative">
        <div className="container mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            تقنيات حديثة مدعومة بالعلم
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-3 text-ivory">
            <span className="gold-shimmer">طرق المذاكرة</span> الحديثة
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-2xl mx-auto leading-relaxed">
            تقنيات مثبتة علمياً ترفع تركيزك وتثبّت معلوماتك — مع مؤقّت بومودورو
            تفاعلي ومراجعة افتراضية بالتكرار المتباعد.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 space-y-12">
        {/* Pomodoro Timer interactive */}
        <PomodoroTimer />

        {/* Techniques grid */}
        <section>
          <h2 className="text-2xl font-black text-[hsl(var(--royal-green))] mb-2 text-center">
            أربع تقنيات تستحق التجربة
          </h2>
          <div className="gold-divider w-24 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {techniques.map((t, i) => (
              <TechCard key={t.id} t={t} index={i} />
            ))}
          </div>
        </section>

        {/* Spaced repetition demo */}
        <SpacedRepetitionDemo />

        {/* Mind map placeholder */}
        <MindMapShowcase />
      </div>
    </div>
  );
}

function TechCard({
  t,
  index,
}: {
  t: (typeof techniques)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="luxury-card rounded-3xl p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-black text-[hsl(var(--royal-green))]">
            {t.title}
          </h3>
          <p className="text-xs text-gold-deep tracking-wide italic">
            {t.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 justify-end max-w-[40%]">
          {t.ages.map((a) => (
            <Badge
              key={a}
              variant="outline"
              className="border-gold-soft text-[hsl(var(--gold-deep))] text-[10px]"
            >
              {AGE_TAGS[a]}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{t.description}</p>
      <ul className="space-y-1.5 text-sm text-gray-600">
        {t.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-[hsl(var(--gold))] shrink-0">◆</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "rest">("work");
  const [completed, setCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (mode === "work") {
            setMode("rest");
            setCompleted((c) => c + 1);
            return 5 * 60;
          } else {
            setMode("work");
            return 25 * 60;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  function reset() {
    setRunning(false);
    setMode("work");
    setSeconds(25 * 60);
    setCompleted(0);
  }

  const total = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((total - seconds) / total) * 100;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <section className="luxury-card rounded-3xl p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] flex items-center justify-center text-[hsl(var(--royal-green))]">
          <Timer className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
            مؤقّت بومودورو
          </h2>
          <p className="text-sm text-gray-500">
            {mode === "work"
              ? "وقت تركيز — اعمل بدون انقطاع"
              : "وقت راحة — انهض، اشرب ماء، تنفّس"}
          </p>
        </div>
      </div>

      <div className="relative w-56 h-56 mx-auto mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--gold-soft) / 0.3)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={mode === "work" ? "hsl(var(--royal-green))" : "hsl(var(--gold))"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 283} 283`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-black text-[hsl(var(--royal-green))] tabular-nums">
            {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </div>
          <div className="text-xs font-bold text-gold-deep mt-1">
            {mode === "work" ? "تركيز" : "راحة"}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setRunning((v) => !v)}
          className="btn-gold px-6 py-2.5 rounded-xl flex items-center gap-2"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "إيقاف مؤقت" : "ابدأ"}
        </button>
        <button
          onClick={reset}
          className="bg-white border-2 border-gold-soft text-[hsl(var(--gold-deep))] hover:bg-gold-soft/30 px-6 py-2.5 rounded-xl font-black flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> تصفير
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        جلسات مكتملة:{" "}
        <span className="font-black text-[hsl(var(--gold-deep))]">{completed}</span>
      </p>
    </section>
  );
}

const SR_CARDS = [
  { q: "ما تقنية تثبيت المعلومات في الذاكرة طويلة المدى؟", a: "التكرار المتباعد" },
  { q: "كم مدة جلسة بومودورو الواحدة؟", a: "٢٥ دقيقة عمل + ٥ دقائق راحة" },
  { q: "أفضل تقنية للمتعلم البصري؟", a: "الخرائط الذهنية" },
  { q: "ما تقنية فاينمان باختصار؟", a: "اشرح الدرس بكلمات بسيطة وكأنك تعلّمه لطفل" },
];

function SpacedRepetitionDemo() {
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  function next(level: "hard" | "good" | "easy") {
    setShowAnswer(false);
    setIdx((i) => (i + 1) % SR_CARDS.length);
    void level;
  }

  const card = SR_CARDS[idx];

  return (
    <section className="luxury-card rounded-3xl p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] flex items-center justify-center text-[hsl(var(--royal-green))]">
          <RotateCcw className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
            بطاقة تكرار متباعد
          </h2>
          <p className="text-sm text-gray-500">جرّب أداة المراجعة الذكية</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[hsl(var(--ivory))] to-white border-2 border-gold-soft rounded-2xl p-8 min-h-[180px] flex flex-col items-center justify-center text-center">
        <p className="text-xs font-black text-[hsl(var(--gold-deep))] mb-3 tracking-widest">
          البطاقة {idx + 1} / {SR_CARDS.length}
        </p>
        <p className="text-xl font-black text-[hsl(var(--royal-green))] mb-4">
          {card.q}
        </p>
        {showAnswer ? (
          <p className="text-lg text-gray-700 italic">{card.a}</p>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="text-sm font-bold text-[hsl(var(--gold-deep))] underline"
          >
            إظهار الإجابة
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => next("hard")}
            className="bg-red-50 border border-red-200 text-red-700 rounded-xl py-2 text-sm font-bold hover:bg-red-100"
          >
            صعبة (يوم)
          </button>
          <button
            onClick={() => next("good")}
            className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl py-2 text-sm font-bold hover:bg-amber-100"
          >
            جيدة (٣ أيام)
          </button>
          <button
            onClick={() => next("easy")}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl py-2 text-sm font-bold hover:bg-emerald-100"
          >
            سهلة (أسبوع)
          </button>
        </div>
      )}
    </section>
  );
}

function MindMapShowcase() {
  const branches = [
    { ar: "الفصل الأول", color: "bg-emerald-100 text-emerald-800" },
    { ar: "المفاهيم الأساسية", color: "bg-blue-100 text-blue-800" },
    { ar: "الأمثلة", color: "bg-amber-100 text-amber-800" },
    { ar: "التطبيقات", color: "bg-purple-100 text-purple-800" },
    { ar: "الأسئلة المتكررة", color: "bg-rose-100 text-rose-800" },
    { ar: "الملخص النهائي", color: "bg-teal-100 text-teal-800" },
  ];
  return (
    <section className="luxury-card rounded-3xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] flex items-center justify-center text-[hsl(var(--royal-green))]">
          <MapIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
            الخريطة الذهنية بالذكاء الاصطناعي
          </h2>
          <p className="text-sm text-gray-500">
            مثال على بنية فصل دراسي مرئي
          </p>
        </div>
      </div>
      <div className="relative bg-sadu rounded-2xl p-8 min-h-[260px]">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(var(--royal-green))] to-[hsl(var(--royal-green-light))] text-white font-black flex items-center justify-center text-center text-sm shadow-xl shadow-emerald-900/30 ring-4 ring-gold/40 mb-6">
            <Brain className="w-6 h-6 ms-1" /> المادة
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {branches.map((b, i) => (
              <motion.div
                key={b.ar}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "px-4 py-3 rounded-2xl font-bold text-center text-sm border border-white/40 shadow-sm",
                  b.color,
                )}
              >
                {b.ar}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        أدوات مقترحة: Whimsical AI · Xmind AI · Notion AI · MindMeister
      </p>
    </section>
  );
}
