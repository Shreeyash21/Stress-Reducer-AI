import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stress Reducer AI — Your AI Companion for Mental Wellness",
    template: "%s | Stress Reducer AI",
  },
  description:
    "AI-powered mental wellness platform. Reduce stress, track emotions, and get personalized wellness guidance through intelligent AI conversations.",
  keywords: [
    "mental wellness",
    "stress reduction",
    "AI therapy",
    "mood tracking",
    "mindfulness",
    "mental health",
    "emotional wellness",
    "meditation",
  ],
  authors: [{ name: "Stress Reducer AI" }],
  creator: "Stress Reducer AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Stress Reducer AI — Your AI Companion for Mental Wellness",
    description:
      "AI-powered mental wellness platform. Reduce stress, track emotions, and get personalized wellness guidance.",
    siteName: "Stress Reducer AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stress Reducer AI",
    description: "Your AI Companion for Mental Wellness",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-dark-950 text-dark-50 antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(15, 23, 42, 0.95)",
                color: "#f8fafc",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "0.75rem",
                backdropFilter: "blur(20px)",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#f8fafc",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#f8fafc",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
