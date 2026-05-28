import { createClient } from "@/lib/supabase/client";
import type { JournalEntry, MoodLevel } from "@/types";

const supabase = createClient();

export const journalService = {
  async createEntry(data: {
    title: string;
    content: string;
    mood_score?: MoodLevel;
    tags?: string[];
    ai_analysis?: string;
  }): Promise<{ entry: JournalEntry | null; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { entry: null, error: "Not authenticated" };

    const { data: entry, error } = await supabase
      .from("journal_entries")
      .insert({ user_id: user.id, ...data })
      .select()
      .single();

    return { entry: entry as JournalEntry, error };
  },

  async getEntries(limit = 20): Promise<{ entries: JournalEntry[]; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { entries: [], error: "Not authenticated" };

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    return { entries: (data as JournalEntry[]) || [], error };
  },

  async updateEntry(
    id: string,
    data: Partial<Pick<JournalEntry, "title" | "content" | "mood_score" | "tags" | "ai_analysis">>
  ): Promise<{ entry: JournalEntry | null; error: unknown }> {
    const { data: entry, error } = await supabase
      .from("journal_entries")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    return { entry: entry as JournalEntry, error };
  },

  async deleteEntry(id: string) {
    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", id);

    return { error };
  },
};
