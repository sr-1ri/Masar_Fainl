import { useState } from "react";
import { Plus, Trash2, MessageCircle } from "lucide-react";
import {
  useListAnthropicConversations,
  useDeleteAnthropicConversation,
  type AnthropicConversation,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { HayyafChatPanel } from "@/components/HayyafChatPanel";
import { cn } from "@/lib/utils";

export default function Chat() {
  const queryClient = useQueryClient();
  const { data: conversations } = useListAnthropicConversations();
  const deleteConv = useDeleteAnthropicConversation();
  const [activeId, setActiveId] = useState<number | undefined>(undefined);

  const list = (conversations as AnthropicConversation[] | undefined) ?? [];

  async function handleDelete(id: number) {
    await deleteConv.mutateAsync({ id });
    if (activeId === id) setActiveId(undefined);
    queryClient.invalidateQueries({ queryKey: [`/api/anthropic/conversations`] });
  }

  return (
    <div className="container mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <aside className="bg-white border rounded-2xl p-4 h-fit lg:sticky lg:top-24">
        <Button
          onClick={() => setActiveId(undefined)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 mb-3"
        >
          <Plus className="w-4 h-4 ms-1" /> محادثة جديدة
        </Button>
        <div className="text-xs font-bold text-gray-500 mb-2 px-2">
          المحادثات السابقة
        </div>
        {list.length === 0 ? (
          <p className="text-sm text-gray-400 px-2 py-4 text-center">
            لا توجد محادثات بعد
          </p>
        ) : (
          <ul className="space-y-1 max-h-[60vh] overflow-y-auto">
            {list.map((c) => (
              <li
                key={c.id}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-2 py-2 cursor-pointer transition",
                  activeId === c.id
                    ? "bg-emerald-50 border border-emerald-200"
                    : "hover:bg-gray-50",
                )}
                onClick={() => setActiveId(c.id)}
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-sm truncate flex-1">{c.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(c.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                  aria-label="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="bg-emerald-50/40 border border-emerald-100 rounded-3xl p-4 md:p-6">
        <HayyafChatPanel
          conversationId={activeId}
          onConversationCreated={(id) => setActiveId(id)}
        />
      </section>
    </div>
  );
}
