export type StreamEvent =
  | { type: "delta"; content: string }
  | { type: "done" }
  | { type: "error"; error: string };

export async function streamHayyaf(
  conversationId: string,
  content: string,
  stage: string | undefined,
  onEvent: (e: StreamEvent) => void,
  images?: string[],
  learningStyle?: string,
  signal?: AbortSignal,
): Promise<void> {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const url = `${baseUrl}/api/anthropic/conversations/${conversationId}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      stage,
      ...(images && images.length > 0 ? { images } : {}),
      ...(learningStyle ? { learningStyle } : {}),
    }),
    signal,
  });

  if (!res.ok || !res.body) {
    onEvent({ type: "error", error: "تعذّر الاتصال بهياف. حاول مرة أخرى." });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const chunk = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const line = chunk.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      try {
        const payload = JSON.parse(line.slice(6));
        if (payload.error) {
          onEvent({ type: "error", error: payload.error });
        } else if (payload.done) {
          onEvent({ type: "done" });
        } else if (payload.content) {
          onEvent({ type: "delta", content: payload.content });
        }
      } catch {
        // ignore malformed chunk
      }
    }
  }
}
