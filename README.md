# 🩺 MediVoiceAI : AI Medical Voice Agent

An AI-powered medical voice assistant that enables users to have natural voice conversations with virtual doctors. The application uses AI to understand user symptoms, generate intelligent responses, and maintain conversation history.

## 🌐 Live Demo

🔗 **Live Application:** https://ai-medical-voice-agent-trju.vercel.app

## 📸 Screenshots

> Add screenshots here after deployment.

| Home | Dashboard |
|------|-----------|
| ![Home](screenshots/home.png) | ![Dashboard](screenshots/dashboard.png) |

| Voice Consultation | History |
|-------------------|---------|
| ![Voice](screenshots/voice.png) | ![History](screenshots/history.png) |

---

## ✨ Features

- 🔐 Secure authentication with Clerk
- 🎙️ AI-powered voice conversations
- 🤖 Multiple AI doctor personas
- 💬 Real-time medical consultations
- 📜 Consultation history
- 💾 Persistent database storage
- 📱 Responsive UI
- ⚡ Fast Next.js App Router architecture

---

## 🛠 Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Drizzle ORM
- Neon PostgreSQL

### Authentication
- Clerk

### AI Services
- Google Gemma
- Vapi AI
- AssemblyAI (Speech-to-Text)

### Deployment
- Vercel

---

## 🏗 Project Structure

```
app/
components/
context/
db/
lib/
public/
hooks/
```

---
## 🧠 How It Works

1. User signs in securely using Clerk.
2. Selects an AI doctor.
3. Starts a voice consultation.
4. Vapi streams voice conversation.
5. Gemini generates AI medical responses.
6. Session data is stored in Neon PostgreSQL.
7. Previous consultations can be viewed from History.

---

## 📂 Database

Built using **Drizzle ORM** with **Neon PostgreSQL**.

Main tables include:

- Users
- Sessions
- Consultation History

---

## 👩‍💻 Author

**Somili Das**

GitHub: https://github.com/SomiliDas



