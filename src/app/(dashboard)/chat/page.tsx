"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import {
  Send,
  Plus,
  Brain,
  Trash2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { chatService } from "@/services/chat.service";
import { useAppStore } from "@/store/useAppStore";
import type { ChatMessage, Conversation } from "@/types";
import { formatRelativeTime, cn } from "@/lib/utils";
import toast from "react-hot-toast";

const quickPrompts = [
  "I'm feeling stressed about work",
  "Help me with a breathing exercise",
  "I need some motivation today",
  "I'm feeling anxious and overwhelmed",
  "Guide me through meditation",
  "I want to talk about my feelings",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center flex-shrink-0">
        <Brain className="w-4 h-4 text-white" />
      </div>
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-400"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-end gap-3 mb-4", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
          isUser
            ? "bg-gradient-to-br from-brand-500 to-neon-purple text-white"
            : "bg-gradient-to-br from-brand-500 to-neon-purple"
        )}
      >
        {isUser ? "U" : <Brain className="w-4 h-4 text-white" />}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[75%]", isUser ? "items-end" : "items-start", "flex flex-col gap-1")}>
        <div
          className={cn(
            "px-4 py-3 text-sm leading-relaxed",
            isUser ? "chat-bubble-user text-white" : "chat-bubble-ai text-dark-200"
          )}
        >
          {message.content.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < message.content.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
        <span className="text-xs text-dark-600 px-1">
          {formatRelativeTime(message.created_at)}
        </span>
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const { activeConversationId, setActiveConversation, conversations, setConversations, addConversation, messages, setMessages, addMessage, isTyping, setTyping } = useAppStore();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    // Load conversations
    const loadConversations = async () => {
      const { conversations: convs } = await chatService.getConversations();
      setConversations(convs);
    };
    loadConversations();
  }, [setConversations]);

  useEffect(() => {
    // Load messages for active conversation
    if (activeConversationId) {
      const loadMessages = async () => {
        const { messages: msgs } = await chatService.getMessages(activeConversationId);
        setMessages(msgs);
      };
      loadMessages();
    }
  }, [activeConversationId, setMessages]);

  const createNewConversation = async () => {
    const { conversation, error } = await chatService.createConversation("New Conversation");
    if (error) {
      toast.error("Database not set up. Please run the schema SQL in Supabase.");
      return;
    }
    if (conversation) {
      addConversation(conversation);
      setActiveConversation(conversation.id);
      setMessages([]);
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || sending) return;

    setInput("");
    setSending(true);

    // Create conversation if none exists
    let convId = activeConversationId;
    if (!convId) {
      const { conversation, error } = await chatService.createConversation(
        messageText.slice(0, 50)
      );
      if (error || !conversation) {
        toast.error("Database not ready. Please run the schema SQL in your Supabase project.");
        setSending(false);
        return;
      }
      addConversation(conversation);
      setActiveConversation(conversation.id);
      convId = conversation.id;
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      conversation_id: convId,
      role: "user",
      content: messageText,
      created_at: new Date().toISOString(),
    };
    addMessage(userMsg);
    await chatService.saveMessage(convId, "user", messageText);

    // Show typing indicator
    setTyping(true);

    try {
      // Call AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          context: messages.slice(-10),
        }),
      });

      const data = await response.json();

      setTyping(false);

      // Add AI response
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        conversation_id: convId,
        role: "assistant",
        content: data.message,
        emotion_detected: data.emotion_detected,
        created_at: new Date().toISOString(),
      };
      addMessage(aiMsg);
      await chatService.saveMessage(convId, "assistant", data.message, data.emotion_detected);
    } catch {
      setTyping(false);
      toast.error("Failed to get AI response");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversation sidebar */}
      <div className="w-64 border-r border-dark-800/50 glass flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-dark-800/50">
          <Button onClick={createNewConversation} size="sm" className="w-full">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-dark-500 text-xs">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv: Conversation) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all",
                  activeConversationId === conv.id
                    ? "bg-brand-500/15 border border-brand-500/20"
                    : "hover:bg-dark-800/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-dark-500 flex-shrink-0" />
                  <span className="text-xs text-dark-300 truncate">{conv.title}</span>
                </div>
                <p className="text-xs text-dark-600 mt-1 truncate pl-5">
                  {conv.last_message || "No messages yet"}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="AI Companion" subtitle="Aria — Your mental wellness AI" />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && !activeConversationId ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center mb-6 pulse-glow"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-dark-100 mb-2"
              >
                Hi, I&apos;m Aria 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-dark-400 mb-8"
              >
                Your AI mental wellness companion. I&apos;m here to listen, support, and guide you through your wellness journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-2 w-full"
              >
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-left p-3 rounded-xl glass border border-dark-700/50 hover:border-brand-500/30 text-xs text-dark-300 hover:text-dark-100 transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-brand-400 mb-1" />
                    {prompt}
                  </button>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-dark-800/50 glass">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Share how you're feeling... (Enter to send)"
                  rows={1}
                  className="input-dark resize-none pr-12 py-3 min-h-[48px] max-h-32"
                  style={{ height: "auto" }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = Math.min(target.scrollHeight, 128) + "px";
                  }}
                />
              </div>
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || sending}
                loading={sending}
                className="h-12 w-12 p-0 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-dark-600 mt-2 text-center">
              Aria is an AI companion, not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
