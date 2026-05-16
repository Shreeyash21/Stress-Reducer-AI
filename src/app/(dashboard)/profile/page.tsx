"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useAppStore } from "@/store/useAppStore";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    fullName: user?.email?.split("@")[0] || "",
    email: user?.email || "",
    bio: "Mental wellness enthusiast on a journey to inner peace.",
    wellnessGoals: ["Reduce daily stress", "Improve sleep quality", "Practice mindfulness"],
  });

  const [notifications, setNotifications] = useState({
    dailyCheckin: true,
    meditationReminders: true,
    weeklyReport: true,
    emergencyAlerts: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Profile updated successfully!");
    setSaving(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="min-h-screen">
      <TopBar title="Profile & Settings" subtitle="Manage your account" />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                  activeTab === tab.id
                    ? "bg-brand-500/15 border border-brand-500/20 text-brand-300"
                    : "text-dark-400 hover:bg-dark-800/50 hover:text-dark-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-dark-100 mb-5">Personal Information</h3>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center text-white text-2xl font-bold">
                    {profile.fullName.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">Change Avatar</Button>
                    <p className="text-xs text-dark-500 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={profile.fullName}
                    onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    disabled
                    hint="Email cannot be changed"
                  />
                  <Textarea
                    label="Bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    hint="Tell us a bit about yourself"
                  />

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Wellness Goals
                    </label>
                    <div className="space-y-2">
                      {profile.wellnessGoals.map((goal, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand-500" />
                          <span className="text-sm text-dark-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave} loading={saving}>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-dark-100 mb-5">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: "dailyCheckin", label: "Daily Check-in Reminder", desc: "Get reminded to log your mood every day" },
                    { key: "meditationReminders", label: "Meditation Reminders", desc: "Scheduled reminders for mindfulness sessions" },
                    { key: "weeklyReport", label: "Weekly Wellness Report", desc: "Receive your weekly wellness summary" },
                    { key: "emergencyAlerts", label: "Emergency Support Alerts", desc: "Important mental health resources and alerts" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30">
                      <div>
                        <p className="font-medium text-dark-200 text-sm">{item.label}</p>
                        <p className="text-xs text-dark-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative",
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-brand-500"
                            : "bg-dark-700"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                            notifications[item.key as keyof typeof notifications] ? "left-7" : "left-1"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <Button onClick={handleSave} loading={saving} className="mt-4">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </motion.div>
            )}

            {activeTab === "privacy" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-dark-100 mb-5">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Your data is protected</span>
                    </div>
                    <p className="text-xs text-dark-400">
                      All your conversations and mood data are encrypted end-to-end. We never share your personal information with third parties.
                    </p>
                  </div>
                  {[
                    { label: "Data Encryption", status: "Active", color: "text-green-400" },
                    { label: "Two-Factor Authentication", status: "Disabled", color: "text-yellow-400" },
                    { label: "Session Management", status: "Active", color: "text-green-400" },
                    { label: "Data Export", status: "Available", color: "text-brand-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-dark-800/30">
                      <span className="text-sm text-dark-300">{item.label}</span>
                      <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                  <Button variant="danger" size="sm">
                    Delete Account
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-dark-100 mb-5">Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-3">Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "dark", label: "Dark Mode", desc: "Easy on the eyes", active: true },
                        { id: "light", label: "Light Mode", desc: "Coming soon", active: false },
                      ].map((theme) => (
                        <div
                          key={theme.id}
                          className={cn(
                            "p-4 rounded-xl border cursor-pointer transition-all",
                            theme.active
                              ? "border-brand-500/40 bg-brand-500/10"
                              : "border-dark-700/50 opacity-50 cursor-not-allowed"
                          )}
                        >
                          <p className="font-medium text-dark-200 text-sm">{theme.label}</p>
                          <p className="text-xs text-dark-500">{theme.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-3">Accent Color</label>
                    <div className="flex gap-3">
                      {["#6366f1", "#a855f7", "#06b6d4", "#22c55e", "#f97316", "#ec4899"].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white/30 transition-all"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
