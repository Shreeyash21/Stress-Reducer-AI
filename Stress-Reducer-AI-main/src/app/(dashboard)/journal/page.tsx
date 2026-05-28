"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { journalService } from "@/services/journal.service";
import type { JournalEntry, MoodLevel } from "@/types";
import { formatDate, getMoodEmoji, cn } from "@/lib/utils";
import { BookOpen, Plus, X, Tag, Sparkles, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const moodOptions: MoodLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tagSuggestions = ["work", "family", "health", "gratitude", "anxiety", "growth", "relationships", "goals"];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    mood_score: 5 as MoodLevel,
    tags: [] as string[],
    newTag: "",
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const { entries } = await journalService.getEntries();
    setEntries(entries);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    setSaving(true);
    try {
      const aiAnalysis = generateAIAnalysis(form.content, form.mood_score);
      const { entry, error } = await journalService.createEntry({
        title: form.title,
        content: form.content,
        mood_score: form.mood_score,
        tags: form.tags,
        ai_analysis: aiAnalysis,
      });

      if (error) {
        toast.error("Failed to save journal entry");
      } else if (entry) {
        setEntries((prev) => [entry, ...prev]);
        setShowForm(false);
        setForm({ title: "", content: "", mood_score: 5, tags: [], newTag: "" });
        toast.success("Journal entry saved! ✨");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const generateAIAnalysis = (content: string, mood: MoodLevel): string => {
    const wordCount = content.split(" ").length;
    const hasPositive = /happy|grateful|excited|love|joy|wonderful|great/i.test(content);
    const hasNegative = /stress|anxious|worried|sad|difficult|hard|struggle/i.test(content);

    if (mood >= 7 && hasPositive) {
      return "Your entry reflects a positive emotional state. The themes of gratitude and joy are evident. Keep nurturing these feelings through daily mindfulness practices.";
    }
    if (mood <= 4 && hasNegative) {
      return "I notice some challenging emotions in your writing. This is completely valid. Consider trying a breathing exercise or reaching out to your support network. Remember, difficult times are temporary.";
    }
    if (wordCount > 100) {
      return "You've written a detailed reflection today. This level of self-awareness is a powerful tool for emotional growth. Your ability to articulate your feelings shows great emotional intelligence.";
    }
    return "Thank you for taking time to journal today. Regular reflection is one of the most powerful tools for mental wellness. Keep building this healthy habit.";
  };

  const addTag = () => {
    if (form.newTag.trim() && !form.tags.includes(form.newTag.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleDelete = async (id: string) => {
    const { error } = await journalService.deleteEntry(id);
    if (!error) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEntry?.id === id) setSelectedEntry(null);
      toast.success("Entry deleted");
    }
  };

  // Demo entries
  const demoEntries: JournalEntry[] = [
    {
      id: "demo1",
      user_id: "demo",
      title: "Finding Peace in the Chaos",
      content: "Today was overwhelming but I managed to take 10 minutes for myself. The breathing exercises really helped calm my anxiety before the big presentation.",
      mood_score: 7,
      tags: ["work", "anxiety", "growth"],
      ai_analysis: "Your entry shows resilience and self-awareness. Taking time for yourself during stressful periods is a sign of emotional maturity.",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo2",
      user_id: "demo",
      title: "Grateful for Small Moments",
      content: "Had coffee with an old friend today. Sometimes the simplest moments bring the most joy. Feeling grateful for the connections in my life.",
      mood_score: 9,
      tags: ["gratitude", "relationships"],
      ai_analysis: "Beautiful reflection on gratitude and connection. These positive social interactions are vital for mental wellness.",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  const displayEntries = entries.length > 0 ? entries : demoEntries;

  return (
    <div className="min-h-screen">
      <TopBar title="Wellness Journal" subtitle="Reflect, grow, and heal" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-dark-50">My Journal</h2>
            <p className="text-dark-400 text-sm">{displayEntries.length} entries</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" />
            New Entry
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entries list */}
          <div className="lg:col-span-1 space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl bg-dark-800/50 shimmer" />
                ))}
              </div>
            ) : (
              displayEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedEntry(entry)}
                  className={cn(
                    "glass-card p-4 cursor-pointer transition-all",
                    selectedEntry?.id === entry.id
                      ? "border-brand-500/40 bg-brand-500/5"
                      : "hover:border-dark-600"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-dark-100 text-sm truncate flex-1">
                      {entry.title}
                    </h4>
                    <span className="text-lg ml-2">{getMoodEmoji(entry.mood_score as MoodLevel)}</span>
                  </div>
                  <p className="text-xs text-dark-500 line-clamp-2 mb-2">{entry.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {entry.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded-md bg-brand-500/10 text-brand-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-dark-600">{formatDate(entry.created_at)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Entry detail / Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-dark-100">New Journal Entry</h3>
                    <button onClick={() => setShowForm(false)} className="text-dark-500 hover:text-dark-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Title"
                      placeholder="What's on your mind today?"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    />

                    <Textarea
                      label="Your thoughts"
                      placeholder="Write freely... this is your safe space."
                      value={form.content}
                      onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                      rows={8}
                    />

                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        How are you feeling? {getMoodEmoji(form.mood_score)}
                      </label>
                      <div className="flex gap-1">
                        {moodOptions.map((score) => (
                          <button
                            key={score}
                            onClick={() => setForm((p) => ({ ...p, mood_score: score }))}
                            className={cn(
                              "w-8 h-8 rounded-lg text-xs font-medium transition-all",
                              form.mood_score === score
                                ? "bg-brand-500 text-white"
                                : "bg-dark-800 text-dark-400 hover:bg-dark-700"
                            )}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {form.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-brand-500/10 text-brand-300 text-xs">
                            {tag}
                            <button onClick={() => removeTag(tag)}>
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={form.newTag}
                          onChange={(e) => setForm((p) => ({ ...p, newTag: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && addTag()}
                          placeholder="Add a tag..."
                          className="input-dark flex-1 text-sm py-2"
                        />
                        <Button variant="secondary" size="sm" onClick={addTag}>
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tagSuggestions.filter((t) => !form.tags.includes(t)).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setForm((p) => ({ ...p, tags: [...p.tags, tag] }))}
                            className="text-xs px-2 py-1 rounded-lg bg-dark-800/50 text-dark-500 hover:text-dark-300 hover:bg-dark-700/50 transition-all"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleSave} loading={saving} className="w-full">
                      <Sparkles className="w-4 h-4" />
                      Save Entry with AI Analysis
                    </Button>
                  </div>
                </motion.div>
              ) : selectedEntry ? (
                <motion.div
                  key={selectedEntry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-dark-50 text-lg">{selectedEntry.title}</h3>
                      <p className="text-dark-500 text-sm">{formatDate(selectedEntry.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoodEmoji(selectedEntry.mood_score as MoodLevel)}</span>
                      <button
                        onClick={() => handleDelete(selectedEntry.id)}
                        className="text-dark-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedEntry.tags?.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-brand-500/10 text-brand-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-dark-300 leading-relaxed mb-6 whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>

                  {selectedEntry.ai_analysis && (
                    <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-xs font-semibold text-brand-300">AI Analysis</span>
                      </div>
                      <p className="text-xs text-dark-300 leading-relaxed">{selectedEntry.ai_analysis}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <BookOpen className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-dark-400 mb-2">Select an entry to read</h3>
                  <p className="text-dark-600 text-sm">Or create a new journal entry to start reflecting</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
