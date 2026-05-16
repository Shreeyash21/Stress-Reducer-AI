import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, ChatMessage, Conversation, MoodEntry } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  // Chat
  activeConversationId: string | null;
  conversations: Conversation[];
  messages: ChatMessage[];
  isTyping: boolean;
  setActiveConversation: (id: string | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;

  // Mood
  recentMoodEntries: MoodEntry[];
  setRecentMoodEntries: (entries: MoodEntry[]) => void;
  addMoodEntry: (entry: MoodEntry) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),

      // Chat
      activeConversationId: null,
      conversations: [],
      messages: [],
      isTyping: false,
      setActiveConversation: (id) => set({ activeConversationId: id }),
      setConversations: (conversations) => set({ conversations }),
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        })),
      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      setTyping: (isTyping) => set({ isTyping }),

      // Mood
      recentMoodEntries: [],
      setRecentMoodEntries: (entries) => set({ recentMoodEntries: entries }),
      addMoodEntry: (entry) =>
        set((state) => ({
          recentMoodEntries: [entry, ...state.recentMoodEntries],
        })),

      // UI
      sidebarOpen: true,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      theme: "dark",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "stress-reducer-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        activeConversationId: state.activeConversationId,
      }),
    }
  )
);
