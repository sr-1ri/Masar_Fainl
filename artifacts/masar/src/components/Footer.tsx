import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sadu-dark text-ivory mt-16 border-t-2 border-gold">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <p className="font-display gold-shimmer text-5xl tracking-wider mb-2 leading-none">
            مسار
          </p>
          <div className="gold-divider w-32 mx-auto my-4" />
          <p className="text-ivory/95 max-w-xl mx-auto leading-relaxed font-bold">
            المرجع الأول للتعليم المستدام في المملكة العربية السعودية —
            من المرحلة المتوسطة وحتى أول خطوة في مسارك المهني.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[hsl(var(--gold-bright))] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>صُنع بإلهام من تراث عسير ورؤية ٢٠٣٠</span>
            <Sparkles className="w-3 h-3" />
          </div>
        </div>
      </div>
    </footer>
  );
}
