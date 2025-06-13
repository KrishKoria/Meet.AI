# MeetAI 🤖💬

## _The future of intelligent meetings is here_

Transform your meetings into collaborative experiences with AI agents that don't just attend—they participate, understand, and help you achieve more. MeetAI is a cutting-edge platform that seamlessly blends real-time video conferencing with advanced AI capabilities.

---

## ✨ What Makes MeetAI Special?

### 🎯 **Intelligent Meeting Orchestration**

- **Smart AI Agents**: Create custom AI assistants with tailored instructions and personalities
- **Real-time Participation**: AI agents join your calls, respond to voice, and contribute meaningfully
- **Adaptive Learning**: Agents remember context and maintain conversation continuity
- **Multi-Agent Ecosystem**: Deploy different agents for different meeting types and purposes

### 🎥 **Enterprise-Grade Video Experience**

- **Crystal Clear Calls**: Powered by Stream Video for professional-quality conferences
- **Live Transcription**: Automatic, real-time transcription with speaker identification
- **Smart Recordings**: Auto-generated recordings with searchable content
- **Mobile-First Design**: Seamless experience across all devices

### 🧠 **Post-Meeting Intelligence**

- **AI-Powered Summaries**: Comprehensive meeting summaries with key insights
- **Interactive Chat**: Continue conversations with your AI agent after meetings
- **Searchable Transcripts**: Find any moment in your meeting history instantly

### 🚀 **Developer-Friendly Architecture**

- **Type-Safe APIs**: Built with tRPC for end-to-end type safety
- **Real-time Everything**: WebSocket-powered live updates and notifications
- **Scalable Infrastructure**: Built to handle enterprise-scale meeting loads
- **Modern Stack**: Next.js 15, TypeScript, and cutting-edge tools

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    Client[Next.js Client] --> tRPC[tRPC API Layer]
    tRPC --> Auth[Better Auth]
    tRPC --> DB[(PostgreSQL + Drizzle)]
    tRPC --> Stream[Stream Video/Chat]
    tRPC --> AI[OpenAI + DeepSeek]

    Webhooks[Stream Webhooks] --> Processing[Inngest Jobs]
    Processing --> AI
    Processing --> DB

    Auth --> Polar[Polar Billing]
    Stream --> Recording[Auto Recording]
    AI --> Transcription[Live Transcription]
```

## 🛠️ Technology Stack

### **Frontend Excellence**

```typescript
Framework: Next.js 15 with App Router
Language: TypeScript (100% type-safe)
Styling: Tailwind CSS + Custom Design System
Components: Radix UI + Custom Component Library
State: TanStack Query
Forms: React Hook Form + Zod Validation
```

### **Backend Power**

```typescript
API Layer: tRPC (Type-safe APIs)
Database: PostgreSQL + Drizzle ORM
Authentication: Better Auth (Multi-provider)
Background Jobs: Inngest (Event-driven)
File Storage: Stream CDN
WebSockets: Real-time updates
```

### **AI & Video Infrastructure**

```typescript
Video Platform: Stream Video SDK
Chat System: Stream Chat SDK
AI Models: OpenAI GPT-4 + DeepSeek
Voice Processing: OpenAI Realtime API
Transcription: Stream Transcription
Summaries: Custom AI Agents
```

### **DevOps & Monitoring**

```typescript
Hosting: Vercel (Zero-config deployment)
Database: Neon PostgreSQL (Serverless)
Billing: Polar (Subscription management)
Monitoring: Built-in error tracking
Analytics: Custom dashboard
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **PostgreSQL database** (or Neon account)
- **OpenAI API key** (paid tier for voice features)
- **Stream account** (Video & Chat)
- **Git** for version control

### 1. **Clone & Install**

```bash
# Clone the repository
git clone https://github.com/yourusername/meetai.git
cd meetai

# Install dependencies (we recommend pnpm)
pnpm install
# or npm install
```

### 2. **Environment Configuration**

Create `.env.local` with your API keys:

```env
# Database Configuration
DB_URL="postgresql://user:pass@localhost:5432/meetai"

# Authentication
BETTER_AUTH_SECRET="your-super-secret-auth-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# AI Services
OPENAI_API_SECRET_KEY="sk-your-openai-api-key"
DEEPSEEK_API_KEY="your-deepseek-api-key"

# Stream Video & Chat
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your-stream-video-key"
STREAM_VIDEO_SECRET_KEY="your-stream-video-secret"
NEXT_PUBLIC_STREAM_CHAT_API_KEY="your-stream-chat-key"
STREAM_CHAT_SECRET_KEY="your-stream-chat-secret"

# Background Processing
INNGEST_EVENT_KEY="evt_your-inngest-event-key"
INNGEST_SIGNING_KEY="signkey_your-inngest-signing-key"

# Social Authentication (Optional)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-secret"
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-secret"
```

### 3. **Database Setup**

```bash
# Initialize database schema
pnpm db:push

# Optional: Seed with sample data
pnpm db:seed
```

### 4. **Launch Development Server**

```bash
pnpm dev
```

Visit `http://localhost:3000` and create your first AI agent! 🎉

---

## 📁 Project Architecture

Our codebase follows a feature-driven modular architecture:

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication flows
│   │   ├── sign-in/        # Login page
│   │   └── sign-up/        # Registration page
│   ├── (dashboard)/        # Protected dashboard area
│   │   ├── agents/         # AI agent management
│   │   ├── meetings/       # Meeting dashboard
│   │   └── upgrade/        # Billing & subscription
│   ├── api/                # API routes & webhooks
│   │   ├── webhook/        # Stream webhook handlers
│   │   └── trpc/          # tRPC endpoint
│   ├── call/               # Video call interface
│   └── inngest/            # Background job functions
├── components/             # Reusable UI components
│   ├── ui/                # Base UI primitives
│   ├── data-table.tsx     # Advanced data tables
│   ├── generate-avatar.tsx # Dynamic avatar generation
│   └── responsive-dialog.tsx # Mobile-first dialogs
├── db/                     # Database layer
│   ├── schema.ts          # Drizzle schema definitions
│   └── index.ts           # Database connection
├── hooks/                  # Custom React hooks
│   ├── use-debounce.ts    # Performance optimization
│   ├── use-mobile.ts      # Responsive design
│   └── use-confirm.tsx    # User confirmations
├── lib/                    # Core utilities
│   ├── auth.ts            # Authentication config
│   ├── stream-video.ts    # Video SDK setup
│   ├── stream-chat.ts     # Chat SDK setup
│   └── utils.ts           # Helper functions
├── module/                 # Feature modules
│   ├── agents/            # 🤖 AI Agent Management
│   │   ├── components/    # Agent UI components
│   │   ├── procedures.ts  # Agent API endpoints
│   │   ├── schemas.ts     # Validation schemas
│   │   └── views/         # Agent page views
│   ├── meetings/          # 🎥 Meeting Management
│   │   ├── components/    # Meeting UI components
│   │   ├── procedures.ts  # Meeting API endpoints
│   │   └── views/         # Meeting page views
│   ├── auth/              # 🔐 Authentication
│   ├── call/              # 📞 Video Calling
│   ├── dashboard/         # 📊 Dashboard
│   └── premium/           # 💎 Subscription Management
└── trpc/                   # API layer
    ├── init.ts            # tRPC initialization
    ├── client.ts          # Client-side setup
    └── server.ts          # Server-side setup
```

---

## 🎯 Key Features Deep Dive

### **🤖 AI Agent System**

Create sophisticated AI assistants that understand context and maintain personality:

```typescript
// Example: Creating a Project Manager Agent
const projectManagerAgent = {
  name: "Project Manager Pro",
  instructions: `
    You are an experienced project manager who:
    - Tracks action items and deadlines
    - Asks clarifying questions about requirements
    - Suggests best practices for team collaboration
    - Maintains a professional but friendly tone
  `,
};
```

**Agent Capabilities:**

- 🎯 **Custom Instructions**: Define personality, expertise, and behavior
- 🧠 **Memory**: Remembers conversation context across sessions
- 🎤 **Voice Interaction**: Responds to voice input in real-time
- 📊 **Meeting Analytics**: Tracks participation and engagement
- 🔄 **Multi-Meeting**: Same agent can join different meetings

### **📹 Video Conference System**

Enterprise-grade video conferencing with AI integration:

- **HD Video/Audio**: Crystal clear quality up to 4K
- **Screen Sharing**: Share presentations, documents, and applications
- **Recording**: Automatic recording with post-processing
- **Mobile Support**: Native mobile experience
- **Low Latency**: Global edge network for optimal performance

### **🎯 Meeting Intelligence**

Transform raw meetings into actionable insights:

```typescript
// Auto-generated meeting summary example
{
  overview: "Product roadmap planning session focusing on Q2 features...",
  keyPoints: [
    "Agreed on user authentication as top priority",
    "Timeline set for beta release in March",
    "Budget approved for additional developer resources"
  ],
  actionItems: [
    { assignee: "john@company.com", task: "Draft technical specs", due: "2024-01-15" }
  ],
  nextSteps: "Follow-up meeting scheduled for January 20th"
}
```

### **💬 Post-Meeting Chat**

Continue conversations with context-aware AI:

- **Meeting Memory**: AI remembers everything discussed
- **Document Search**: Find specific moments from transcripts
- **Follow-up Questions**: Ask for clarifications or expansions
- **Action Tracking**: Monitor progress on agreed items

---

## 🔧 Advanced Configuration

### **Custom AI Models**

MeetAI supports multiple AI providers for different use cases:

```typescript
// config/ai-models.ts
export const AI_MODELS = {
  conversation: "gpt-4-turbo", // For real-time chat
  summarization: "deepseek-chat", // For meeting summaries
  chat: "deepseek-chat", // For post-meeting interactions
};
```

### **Webhook Configuration**

Set up Stream webhooks for real-time events:

```bash
# Your webhook endpoint
https://yourdomain.com/api/webhook

# Required events:
- call.session_started
- call.session_ended
- call.transcription_ready
- call.recording_ready
- message.new
```

### **Database Migrations**

Using Drizzle for type-safe database operations:

```bash
# Generate migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Studio for database exploration
pnpm db:studio
```

---

## 🚀 Deployment Guide

### **Vercel Deployment (Recommended)**

1. **Connect Repository**

   - Link your GitHub repository to Vercel
   - Configure environment variables in dashboard
   - Enable automatic deployments

2. **Environment Variables**

   ```bash
   # Copy all variables from .env.local to Vercel dashboard
   # Ensure BETTER_AUTH_URL points to your production domain
   ```

3. **Database Setup**

   ```bash
   # Use Neon for serverless PostgreSQL
   # Update DB_URL with production connection string
   ```

---

## 🛠️ Development Workflow

### **Git Workflow**

```bash
# Feature development
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature

# Create PR for review
```

### **Environment Management**

```bash
# Development
pnpm dev           # Local development server
pnpm dev:ngrok   # Expose local server via ngrok
pnpm dlx inngest@latest dev # Start Inngest local dev server

# Production build
pnpm build         # Build for production
pnpm start         # Start production server

# Database operations
pnpm db:studio     # Visual database editor
pnpm db:reset      # Reset database (dev only)
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Setup**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Contribution Guidelines**

- 📝 **Code Style**: Follow existing patterns and ESLint rules
- ✅ **Testing**: Add tests for new features
- 📚 **Documentation**: Update docs for user-facing changes
- 🔍 **Type Safety**: Maintain 100% TypeScript coverage
- 🎯 **Performance**: Consider performance impact of changes

### **Issue Reporting**

- 🐛 **Bug Reports**: Use the bug report template
- 💡 **Feature Requests**: Describe use case and expected behavior
- 📖 **Documentation**: Help improve our guides and examples
