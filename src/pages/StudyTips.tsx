import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { useListStudyTips, type StudyTip } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

export default function StudyTips() {
  const { data, isLoading } = useListStudyTips();
  const tips = (data as StudyTip[] | undefined) ?? [];

  return (
    <div className="bg-ivory min-h-screen">
      <header className="bg-sadu-dark text-white py-12 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            طرق إبداعية
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-2 text-ivory">
            <span className="gold-shimmer">طرق</span> المذاكرة الإبداعية
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-xl mx-auto">
            تقنيات مدروسة لرفع تركيزك وتثبيت معلوماتك بدون إرهاق.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-20">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tips.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="luxury-card border-r-4 border-r-[hsl(var(--gold))] rounded-2xl p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold))] text-[hsl(var(--royal-green))] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-[hsl(var(--royal-green))]">
                      {t.titleAr}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="border-gold-soft text-[hsl(var(--gold-deep))]"
                      >
                        {t.category}
                      </Badge>
                      {t.durationMinutes && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {t.durationMinutes} دقيقة
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{t.bodyAr}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
