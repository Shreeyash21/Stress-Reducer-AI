"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";

const benefits = [
  "Free AI mental wellness companion",
  "Mood tracking & analytics",
  "Guided breathing exercises",
  "Personalized wellness insights",
];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await authService.signUp(
        formData.email,
        formData.password,
        formData.fullName
      );
      if (error) {
        toast.error(error.message || "Sign up failed");
      } else {
        toast.success("Account created! Welcome to Stress Reducer AI 🎉");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center mb-6">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-dark-50 mb-4">
            Start your{" "}
            <span className="gradient-text">wellness journey</span> today
          </h2>
          <p className="text-dark-400 text-lg mb-8">
            Join thousands of people who have transformed their mental health
            with AI-powered support.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-dark-300">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center text-white text-sm font-bold">
                SC
              </div>
              <div>
                <p className="font-medium text-dark-100 text-sm">Sarah Chen</p>
                <p className="text-dark-500 text-xs">Software Engineer</p>
              </div>
            </div>
            <p className="text-dark-300 text-sm italic">
              &ldquo;This app changed my life. My anxiety is at an all-time low
              after just 3 months of daily use.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center mb-6 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-dark-50">
                Stress Reducer <span className="gradient-text">AI</span>
              </span>
            </Link>
          </div>

          <div className="glass-card p-8">
            <h1 className="text-2xl font-bold text-dark-50 mb-1">Create your account</h1>
            <p className="text-dark-400 text-sm mb-6">Free forever. No credit card required.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                error={errors.fullName}
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) => update("password", e.target.value)}
                error={errors.password}
                icon={<Lock className="w-4 h-4" />}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                icon={<Lock className="w-4 h-4" />}
              />

              <p className="text-xs text-dark-500">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-brand-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-brand-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-center text-dark-400 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
