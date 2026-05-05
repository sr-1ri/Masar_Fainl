import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Compass, Award, Sparkles } from "lucide-react";
import { useListStages, type Stage } from "@workspace/api-client-react";

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
};

export default function Stages() {
  const { data, isLoading } = useListStages();
  const stages = (data as Stage[] | undefined) ?? [];

  return (
    <div className="bg-ivory min-h-screen">
      <header className="bg-sadu-dark text-white py-12 px-4 border-b-2 border-gold">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-gold-soft/40 text-[hsl(var(--gold-bright))] px-3 py-1 rounded-full text-xs font-black mb-3">
            <Sparkles className="w-3 h-3" />
            رحلتك التعليمية
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-2 text-ivory">
            <span className="gold-shimmer">مراحلك</span> الدراسية
          </h1>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 font-semibold max-w-xl mx-auto">
            هياف يفهم اختلاف كل مرحلة ويوجّهك حسب موقعك في رحلتك التعليمية.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-20">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stages.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="luxury-card rounded-2xl p-6 flex gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--royal-green))] to-[hsl(var(--royal-green-light))] text-white flex items-center justify-center shrink-0 ring-2 ring-gold-soft">
                  {iconMap[s.icon] ?? <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[hsl(var(--royal-green))] mb-1">
                    {s.nameAr}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {s.descriptionAr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
