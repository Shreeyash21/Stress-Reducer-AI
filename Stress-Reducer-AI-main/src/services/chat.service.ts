import { createClient } from "@/lib/supabase/client";
import type { ChatMessage, Conversation } from "@/types";

const supabase = createClient();

export const chatService = {
  async createConversation(title = "New Conversation"): Promise<{ conversation: Conversation | null; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { conversation: null, error: "Not authenticated" };

    const { data, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, title })
      .select()
      .single();

    return { conversation: data as Conversation, error };
  },

  async getConversations(): Promise<{ conversations: Conversation[]; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { conversations: [], error: "Not authenticated" };

    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(20);

    return { conversations: (data as Conversation[]) || [], error };
  },

  async getMessages(conversationId: string): Promise<{ messages: ChatMessage[]; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { messages: [], error: "Not authenticated" };

    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    return { messages: (data as ChatMessage[]) || [], error };
  },

  async saveMessage(
    conversationId: string,
    role: "user" | "assistant",
    content: string,
    emotionDetected?: string
  ): Promise<{ message: ChatMessage | null; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { message: null, error: "Not authenticated" };

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role,
        content,
        emotion_detected: emotionDetected,
      })
      .select()
      .single();

    // Update conversation
    await supabase
      .from("conversations")
      .update({
        last_message: content.slice(0, 100),
        message_count: supabase.rpc("increment", { row_id: conversationId }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    return { message: data as ChatMessage, error };
  },

  async updateConversationTitle(conversationId: string, title: string) {
    const { error } = await supabase
      .from("conversations")
      .update({ title })
      .eq("id", conversationId);

    return { error };
  },

  async deleteConversation(conversationId: string) {
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    return { error };
  },
};
