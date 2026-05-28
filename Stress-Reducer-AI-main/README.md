# 🧠 Stress Reducer AI

> AI-powered mental wellness companion for stress management, mood tracking, and guided mindfulness.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat-square&logo=openai)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 🤖 **AI Chat Companion (Aria)** — Empathetic conversations powered by GPT-4o-mini with emotion detection
- 📊 **Mood Tracking & Analytics** — Log your emotions daily and visualize wellness trends over time
- 📓 **Wellness Journal** — Write and reflect with AI-generated insights on your entries
- 🌬️ **Breathing Exercises** — Guided breathing techniques to reduce stress instantly
- 🧘 **Wellness Activities** — Meditation, gratitude, and mindfulness tools
- 🔐 **Secure Authentication** — Email/password auth with Supabase, Row Level Security on all data
- 📱 **Responsive Design** — Fully optimized for desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| AI | OpenAI GPT-4o-mini |
| Charts | Recharts |
| State | Zustand |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- An [OpenAI](https://platform.openai.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/Shreeyash21/Stress-Reducer-AI.git
cd Stress-Reducer-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Stress Reducer AI
```

### 4. Set up the database

1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard)
2. Copy the contents of `src/lib/supabase/schema.sql`
3. Paste and run it — this creates all tables, policies, and triggers

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

The app uses 6 tables in Supabase:

- `user_profiles` — User info, stress baseline, wellness goals
- `mood_entries` — Mood scores, emotions, stress levels, AI insights
- `conversations` — Chat session metadata
- `chat_messages` — Individual messages with emotion detection
- `journal_entries` — Journal entries with AI analysis
- `wellness_activity_logs` — Breathing, meditation, exercise logs

All tables have **Row Level Security (RLS)** enabled — users can only access their own data.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── analytics/
│   │   ├── breathing/
│   │   ├── chat/
│   │   ├── dashboard/
│   │   ├── journal/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── wellness/
│   ├── api/chat/           # OpenAI chat API route
│   └── auth/               # Login & signup pages
├── components/
│   ├── dashboard/          # Dashboard UI components
│   ├── landing/            # Landing page sections
│   └── ui/                 # Reusable UI components
├── lib/supabase/           # Supabase client & schema
├── services/               # API service layer
├── store/                  # Zustand global state
└── types/                  # TypeScript types
```

---

## 🔒 Security

- `.env.local` is excluded from version control
- All database tables use Row Level Security
- Users can only read/write their own data
- Auth handled entirely by Supabase

---

## 📄 License

MIT License — feel free to use this project for learning or building your own wellness app.

---

<p align="center">Built with ❤️ for better mental wellness</p>
