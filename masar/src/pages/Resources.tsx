import { motion } from "framer-motion";
import { ExternalLink, Globe, Video, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const platforms = [
  {
    name: "منصة سطر",
    url: "https://satr.com",
    description: "منصة سعودية رائدة لتدريس اختبارات القدرات والتحصيلي بأسلوب احترافي.",
    tags: ["قدرات", "تحصيلي", "سعودية"],
    color: "from-emerald-700 to-emerald-900",
  },
  {
    name: "نون أكاديمية",
    url: "https://noonacademy.com",
    description: "منصة عربية تفاعلية لمختلف المراحل مع حصص جماعية مباشرة.",
    tags: ["متوسط", "ثانوي", "عربية"],
    color: "from-amber-700 to-amber-900",
  },
  {
    name: "كورسيرا",
    url: "https://coursera.org",
    description: "كورسات أكاديمية من جامعات عالمية كستانفورد وييل وميشيغان مع شهادات معتمدة.",
    tags: ["جامعي", "احترافي", "عالمية"],
    color: "from-blue-700 to-blue-900",
  },
  {
    name: "يوديمي",
    url: "https://udemy.com",
    description: "آلاف الدورات في البرمجة والتصميم وريادة الأعمال بأسعار مناسبة.",
    tags: ["مهارات", "تقنية", "تصميم"],
    color: "from-purple-700 to-purple-900",
  },
  {
    name: "إدراك",
    url: "https://edraak.org",
    description: "منصة عربية مجانية بدعم من مؤسسة الملكة رانيا تقدم كورسات عالية الجودة.",
    tags: ["مجاني", "عربية", "متنوعة"],
    color: "from-teal-700 to-teal-900",
  },
  {
    name: "Khan Academy بالعربية",
    url: "https://ar.khanacademy.org",
    description: "محتوى مجاني لجميع المراحل في الرياضيات والعلوم والاقتصاد.",
    tags: ["مجاني", "متوسط", "ثانوي"],
    color: "from-cyan-700 to-cyan-900",
  },
];

const educators = [
  {
    name: "فهد التميمي",
    handle: "@fahad_altmimi",
    platform: "يوتيوب · تويتر",
    field: "اختبار القدرات",
    description: "حلول مفصلة وأسرار اختبار القدرات بأسلوب مبسّط.",
  },
  {
    name: "أ. محمد الشهري",
    handle: "@math_alshehri",
    platform: "يوتيوب",
    field: "الرياضيات للثانوي",
    description: "شرح مناهج الرياضيات السعودية للمسار العام والصحي.",
  },
  {
    name: "كيمياء مع المهندس",
    handle: "@chem.engineer",
    platform: "تيك توك · إنستغرام",
    field: "الكيمياء",
    description: "ملخصات سريعة وتجارب مرئية لتثبيت المفاهيم الكيميائية.",
  },
  {
    name: "Study with Reema",
    handle: "@studywithreema",
    platform: "يوتيوب · سناب",
    field: "تنظيم الوقت",
    description: "محتوى Study Vlogs ومنظّمات ذكية للطالبة السعودية.",
  },
  {
    name: "Saud Tips",
    handle: "@saud.tips",
    platform: "تيك توك",
    field: "نصائح جامعية",
    description: "نصائح للمستجدّين في الجامعات السعودية والقبول الموحّد.",
  },
  {
    name: "د. عبدالله الغامدي",
    handle: "@dr_alghamdi",
    platform: "تويتر · يوتيوب",
    field: "التوجيه المهني",
    description: "إرشاد للتخصصات وسوق العمل السعودي ورؤية ٢٠٣٠.",
  },
];

export default function Resources() {
  return (
    <div className="bg-ivory">
      <header className="bg-sadu-dark text-white py-14 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            مكتبة المصادر السعودية والعالمية
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-3 text-ivory">
            <span className="gold-shimmer">مصادر</span> تستحق المتابعة
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-2xl mx-auto leading-relaxed">
            أبرز المنصات التعليمية والمؤثرين السعوديين الذين يصنعون فرقاً
            حقيقياً في رحلة الطالب.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 space-y-14">
        {/* Platforms */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[hsl(var(--royal-green))] to-[hsl(var(--royal-green-light))] flex items-center justify-center text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
                منصات تعليمية
              </h2>
              <p className="text-sm text-gray-500">
                للقدرات، الجامعات، والمهارات الاحترافية
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="luxury-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`h-2 bg-gradient-to-l ${p.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-black text-[hsl(var(--royal-green))]">
                      {p.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-[hsl(var(--gold-deep))] group-hover:translate-x-[-2px] transition" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-gold-soft text-[hsl(var(--gold-deep))] text-[10px]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Educators */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] flex items-center justify-center text-[hsl(var(--royal-green))]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[hsl(var(--royal-green))]">
                مؤثّرون تعليميون سعوديون
              </h2>
              <p className="text-sm text-gray-500">
                يوتيوب · تيك توك · سناب · تويتر
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {educators.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="luxury-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] text-[hsl(var(--royal-green))] font-black flex items-center justify-center text-lg">
                    {e.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-[hsl(var(--royal-green))] truncate">
                      {e.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--gold-deep))] font-bold truncate">
                      {e.handle}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-gold-soft text-[hsl(var(--gold-deep))] mb-2"
                >
                  {e.field}
                </Badge>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  {e.description}
                </p>
                <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase">
                  {e.platform}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
