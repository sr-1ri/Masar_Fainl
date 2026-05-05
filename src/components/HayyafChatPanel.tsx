import { useEffect, useRef, useState } from "react";
import { Bot, Send, Loader2, ImagePlus, X } from "lucide-react";
import {
  useCreateAnthropicConversation,
  useListAnthropicMessages,
  type AnthropicMessage as ApiMessage,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { streamHayyaf } from "@/lib/streamChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: "middle_school", label: "المرحلة المتوسطة" },
  { id: "high_school", label: "المرحلة الثانوية" },
  { id: "university_prep", label: "التحضير الجامعي" },
  { id: "university", label: "المرحلة الجامعية" },
];

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4 MB

interface Props {
  conversationId?: number;
  onConversationCreated?: (id: number) => void;
  defaultStage?: string;
  initialPrompt?: string;
  compact?: boolean;
  learningStyle?: string;
}

interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
  images?: string[];
}

export function HayyafChatPanel({
  conversationId: externalId,
  onConversationCreated,
  defaultStage = "high_school",
  initialPrompt = "كيف أستعد للقدرات؟",
  compact = false,
  learningStyle,
}: Props) {
  const queryClient = useQueryClient();
  const [conversationId, setConversationId] = useState<number | undefined>(externalId);
  const [stage, setStage] = useState(defaultStage);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<DisplayMessage[]>([]);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const createConv = useCreateAnthropicConversation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConversationId(externalId);
    setLocalMessages([]);
    setStreaming(null);
    setPendingImages([]);
  }, [externalId]);

  const { data: serverMessages } = useListAnthropicMessages(
    conversationId ?? 0,
    {
      query: {
        enabled: Boolean(conversationId),
      } as never,
    },
  );

  const messages: DisplayMessage[] = [
    ...((serverMessages as ApiMessage[] | undefined) ?? []).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    ...localMessages,
    ...(streaming !== null
      ? [{ role: "assistant" as const, content: streaming, pending: true }]
      : []),
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, streaming]);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, MAX_IMAGES - pendingImages.length);
    const dataUrls: string[] = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) continue;
      if (f.size > MAX_IMAGE_SIZE) continue;
      const data = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = () => reject(r.error);
        r.readAsDataURL(f);
      });
      dataUrls.push(data);
    }
    setPendingImages((prev) => [...prev, ...dataUrls].slice(0, MAX_IMAGES));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if ((!text && pendingImages.length === 0) || streaming !== null) return;

    const sentImages = [...pendingImages];
    const finalText =
      text || (sentImages.length > 0 ? "حلّل لي هذه الصور من فضلك." : "");

    setInput("");
    setPendingImages([]);
    setLocalMessages((prev) => [
      ...prev,
      { role: "user", content: finalText, images: sentImages },
    ]);
    setStreaming("");

    let convId = conversationId;
    if (!convId) {
      try {
        const conv = await createConv.mutateAsync({
          data: { title: finalText.slice(0, 60) || "تحليل صورة" },
        });
        convId = conv.id;
        setConversationId(convId);
        onConversationCreated?.(convId);
      } catch {
        setStreaming(null);
        setLocalMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "تعذّر إنشاء محادثة. حاول مرة أخرى.",
          },
        ]);
        return;
      }
    }

    let acc = "";
    const convIdSafe = convId;
    await streamHayyaf(
      String(convIdSafe),
      finalText,
      stage,
      (e) => {
        if (e.type === "delta") {
          acc += e.content;
          setStreaming(acc);
        } else if (e.type === "done") {
          setLocalMessages((prev) => [
            ...prev,
            { role: "assistant", content: acc },
          ]);
          setStreaming(null);
          if (convId) {
            queryClient.invalidateQueries({
              queryKey: [`/api/anthropic/conversations/${convId}/messages`],
            });
            queryClient.invalidateQueries({
              queryKey: [`/api/anthropic/conversations`],
            });
          }
        } else {
          setLocalMessages((prev) => [
            ...prev,
            { role: "assistant", content: e.error },
          ]);
          setStreaming(null);
        }
      },
      sentImages,
      learningStyle,
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!compact && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--royal-green))] to-[hsl(var(--royal-green-light))] rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-gold-soft">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[hsl(var(--royal-green))]">
              اسأل هياف
            </h3>
            <p className="text-sm text-gray-500">
              مساعدك الذكي · يحلّل النصوص والصور
            </p>
          </div>
          <div className="ms-auto">
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="w-44 bg-white border-gold-soft">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "bg-white rounded-2xl border border-gold-soft p-4 overflow-y-auto",
          compact ? "h-64" : "h-[460px]",
        )}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <Bot className="w-12 h-12 mb-2 text-[hsl(var(--gold))]" />
            <p className="italic">هياف ينتظر سؤالك...</p>
            <p className="text-xs mt-2 text-gray-400">
              جرّب: "{initialPrompt}" — أو ارفع صورة كشف درجاتك
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl p-3 max-w-[85%]",
                  m.role === "user"
                    ? "bg-gold-soft/30 text-[hsl(var(--royal-green))] ms-auto"
                    : "bg-emerald-50 text-emerald-900",
                )}
              >
                <div className="text-xs font-black mb-1 opacity-70">
                  {m.role === "user" ? "أنت" : "هياف"}
                </div>
                {m.images && m.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {m.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg border border-gold-soft"
                      />
                    ))}
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                  {m.pending && (
                    <Loader2 className="inline w-4 h-4 ms-2 animate-spin" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pendingImages.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-gold-soft/20 border border-gold-soft rounded-xl">
          {pendingImages.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt=""
                className="w-16 h-16 object-cover rounded-lg border border-gold"
              />
              <button
                type="button"
                onClick={() =>
                  setPendingImages((prev) => prev.filter((_, j) => j !== i))
                }
                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                aria-label="إزالة"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={pendingImages.length >= MAX_IMAGES || streaming !== null}
          className="border-gold-soft text-[hsl(var(--gold-deep))] hover:bg-gold-soft/30 px-3"
          aria-label="إرفاق صورة"
          title="إرفاق صورة (كشف درجات، جدول، إلخ)"
        >
          <ImagePlus className="w-5 h-5" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`مثلاً: ${initialPrompt}`}
          className="flex-1 bg-white border-gold-soft"
          disabled={streaming !== null}
        />
        <Button
          type="submit"
          disabled={
            streaming !== null ||
            (!input.trim() && pendingImages.length === 0)
          }
          className="btn-gold px-6 !rounded-md"
        >
          {streaming !== null ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 ms-1" /> إرسال
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
