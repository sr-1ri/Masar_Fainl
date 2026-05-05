import { Router, type IRouter } from "express";
import { eq, asc, desc } from "drizzle-orm";
import {
  db,
  conversations,
  messages,
  type Message,
} from "@workspace/db";
import {
  CreateAnthropicConversationBody,
  GetAnthropicConversationParams,
  DeleteAnthropicConversationParams,
  ListAnthropicMessagesParams,
  SendAnthropicMessageParams,
  SendAnthropicMessageBody,
  ListAnthropicConversationsResponse,
  GetAnthropicConversationResponse,
  ListAnthropicMessagesResponse,
} from "@workspace/api-zod";
import { anthropic } from "@workspace/integrations-anthropic-ai";

const router: IRouter = Router();

const STAGE_LABELS: Record<string, string> = {
  middle_school: "المرحلة المتوسطة",
  high_school: "المرحلة الثانوية",
  university_prep: "التحضير الجامعي",
  university: "المرحلة الجامعية",
};

const STYLE_LABELS: Record<string, string> = {
  visual: "بصري — يتعلّم بالرسوم والمخططات والألوان",
  auditory: "سمعي — يتعلّم بالاستماع والشرح الصوتي والمناقشة",
  kinesthetic: "حركي — يتعلّم بالتطبيق العملي والتجارب الحسّية",
};

function buildSystemPrompt(stage?: string, learningStyle?: string): string {
  const stageLabel = stage && STAGE_LABELS[stage] ? STAGE_LABELS[stage] : "غير محددة";
  const styleLine =
    learningStyle && STYLE_LABELS[learningStyle]
      ? `\nأسلوب التعلّم المفضّل للطالب: ${STYLE_LABELS[learningStyle]}. صمّم نصائحك بما يناسب هذا النمط.`
      : "";
  return `أنت "هياف"، المساعد الذكي في منصة "مسار" التعليمية للطلاب السعوديين.

شخصيتك:
- ودود، متفهم، ومتحمس لمساعدة الطلاب على النجاح.
- تتحدث العربية الفصحى المبسطة، مع لمسة سعودية دافئة عند الحاجة.
- خبير بالمناهج السعودية والجامعات السعودية والتخصصات المطلوبة في سوق العمل السعودي.

وظائفك الأساسية:
1. تحليل نقاط الضعف الأكاديمية للطالب وتقديم خطة مذاكرة عملية مخصصة.
2. اقتراح طرق مذاكرة مبتكرة وفعّالة (مثل خرائط المفاهيم، تقنية بومودورو، الاستذكار النشط).
3. شرح تخصصات الجامعات السعودية: المتطلبات، فرص العمل، الجامعات الأقوى في كل تخصص (مثل جامعة الملك فهد للبترول والمعادن، جامعة الملك سعود، جامعة الملك عبدالعزيز، جامعة الملك خالد، جامعة الملك عبدالله للعلوم والتقنية، جامعة الإمام، جامعة الأميرة نورة، إلخ).
4. توجيه الطالب حسب مرحلته الدراسية الحالية.

موارد سعودية موثوقة تستطيع ترشيحها للطالب عند الحاجة:
- اختباري القدرات والتحصيلي: منصة "نون أكاديمية"، قناة "فهد التميمي" على يوتيوب، نماذج قياس الرسمية.
- المنهج السعودي: منصة "مدرستي"، قناة "عين" التعليمية.
- التخصصات والقبول الجامعي: بوابات القبول الموحد لجامعات الرياض ومكة، وموقع كل جامعة.
رشّح هذه الموارد حين تكون مناسبة فقط — لا تذكرها عشوائياً.

المرحلة الدراسية للطالب الحالي: ${stageLabel}.${styleLine}

قواعد تحليل الصور (إن أرفق الطالب صوراً):
- إذا أرفق الطالب صورة "كشف درجات" أو "نتائج اختبار" حلّل النقاط القوية والضعيفة وقدّم خطة تحسين عملية لكل مادة ضعيفة.
- إذا أرفق صورة "جدول مذاكرة" أو "جدول حصص" قيّم توزيع الوقت واقترح تعديلات (راحة، تنويع المواد، توقيت الذروة الذهنية).
- إذا كانت الصورة غير واضحة أو غير ذات صلة، اطلب من الطالب توضيحاً.

قواعد:
- ردودك دائماً بالعربية.
- كن مختصراً وواضحاً، ونظّم الإجابات بنقاط أو قوائم عند الحاجة.
- لا تستخدم الإيموجي.
- إذا سُئلت عن أمر خارج نطاق التعليم والتخصصات، أعد التوجيه بلطف.`;
}

type AllowedMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";
type ImageBlock = {
  type: "image";
  source: { type: "base64"; media_type: AllowedMediaType; data: string };
};
type TextBlock = { type: "text"; text: string };

function parseDataUrl(dataUrl: string): ImageBlock | null {
  const match = /^data:(image\/(?:png|jpeg|jpg|gif|webp));base64,(.+)$/i.exec(
    dataUrl,
  );
  if (!match) return null;
  const lower = match[1].toLowerCase();
  const mediaType: AllowedMediaType =
    lower === "image/jpg" ? "image/jpeg" : (lower as AllowedMediaType);
  return {
    type: "image",
    source: { type: "base64", media_type: mediaType, data: match[2] },
  };
}

router.get("/anthropic/conversations", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(conversations)
    .orderBy(desc(conversations.createdAt));
  res.json(ListAnthropicConversationsResponse.parse(rows));
});

router.post("/anthropic/conversations", async (req, res): Promise<void> => {
  const parsed = CreateAnthropicConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(conversations)
    .values({ title: parsed.data.title })
    .returning();
  res.status(201).json(row);
});

router.get("/anthropic/conversations/:id", async (req, res): Promise<void> => {
  const params = GetAnthropicConversationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));
  res.json(
    GetAnthropicConversationResponse.parse({
      ...conv,
      messages: msgs,
    }),
  );
});

router.delete("/anthropic/conversations/:id", async (req, res): Promise<void> => {
  const params = DeleteAnthropicConversationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [deleted] = await db
    .delete(conversations)
    .where(eq(conversations.id, params.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/anthropic/conversations/:id/messages", async (req, res): Promise<void> => {
  const params = ListAnthropicMessagesParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));
  res.json(ListAnthropicMessagesResponse.parse(rows));
});

router.post("/anthropic/conversations/:id/messages", async (req, res): Promise<void> => {
  const params = SendAnthropicMessageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = SendAnthropicMessageBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  const imageDataUrls = (body.data.images ?? []).slice(0, 4);
  const imageBlocks = imageDataUrls
    .map(parseDataUrl)
    .filter((b): b is ImageBlock => b !== null);

  const persistedUserContent =
    imageBlocks.length > 0
      ? `${body.data.content}\n\n[أرفق الطالب ${imageBlocks.length} صورة للتحليل]`
      : body.data.content;

  await db.insert(messages).values({
    conversationId: params.data.id,
    role: "user",
    content: persistedUserContent,
  });

  const history: Message[] = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, params.data.id))
    .orderBy(asc(messages.createdAt));

  const chatMessages = history.map((m, idx) => {
    const isLastUser = idx === history.length - 1 && m.role === "user";
    if (isLastUser && imageBlocks.length > 0) {
      const blocks: (TextBlock | ImageBlock)[] = [
        ...imageBlocks,
        { type: "text", text: body.data.content },
      ];
      return { role: "user" as const, content: blocks };
    }
    return {
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    };
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: buildSystemPrompt(body.data.stage, body.data.learningStyle),
      messages: chatMessages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        fullResponse += event.delta.text;
        res.write(
          `data: ${JSON.stringify({ content: event.delta.text })}\n\n`,
        );
      }
    }

    await db.insert(messages).values({
      conversationId: params.data.id,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Streaming error");
    res.write(
      `data: ${JSON.stringify({ error: "حدث خطأ أثناء توليد الرد. حاول مرة أخرى." })}\n\n`,
    );
    res.end();
  }
});

export default router;
