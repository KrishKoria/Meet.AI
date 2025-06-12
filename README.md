# MeetAI 🤖💬

A modern AI-powered meeting platform that enables intelligent conversations and automated meeting management with real-time transcription, AI agents, and comprehensive analytics.

## 🚀 Features

### 🎯 Core Features

- **AI-Powered Meetings**: Create meetings with intelligent AI agents that can participate and assist
- **Real-time Video Calls**: High-quality video conferencing with Stream Video integration
- **Live Transcription**: Automatic transcription of meeting conversations
- **AI Chat Assistant**: Post-meeting AI chat for questions and clarifications
- **Meeting Recordings**: Automatic recording and playback functionality
- **Smart Summaries**: AI-generated meeting summaries and insights

### 🤖 AI Agent Management

- **Custom AI Agents**: Create and configure personalized AI assistants
- **Agent Instructions**: Define specific behaviors and knowledge for each agent
- **Multi-Agent Support**: Multiple agents can participate in different meetings
- **Agent Analytics**: Track agent performance and meeting participation

### 📊 Meeting Management

- **Meeting Dashboard**: Comprehensive overview of all meetings
- **Status Tracking**: Real-time meeting status (upcoming, active, completed, processing)
- **Search & Filter**: Advanced search and filtering capabilities
- **Meeting History**: Complete history with transcripts and recordings

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation

### Backend

- **API**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth for secure user management
- **File Storage**: Cloud storage for recordings and transcripts
- **Background Jobs**: Inngest for async processing

### AI & Video

- **AI Models**:
  - OpenAI GPT for conversations and summaries
  - DeepSeek API for enhanced AI capabilities
- **Video Platform**: Stream Video & Chat for real-time communication
- **Voice Processing**: OpenAI Realtime API for voice interactions

### Infrastructure

- **Hosting**: Vercel for deployment
- **Database**: Neon PostgreSQL
- **Monitoring**: Built-in error handling and logging
- **Webhooks**: Stream webhooks for real-time events

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stream API keys (Video & Chat)
- DeepSeek API key (optional)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/meetai.git
cd meetai
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file:

```env
# Database
DB_URL="postgresql://username:password@localhost:5432/meetai"

# Authentication
BETTER_AUTH_SECRET="your-auth-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_SECRET_KEY="sk-your-openai-api-key"

# DeepSeek (optional)
DEEPSEEK_API_KEY="your-deepseek-api-key"

# Stream
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your-stream-video-api-key"
STREAM_VIDEO_SECRET_KEY="your-stream-video-secret"
NEXT_PUBLIC_STREAM_CHAT_API_KEY="your-stream-chat-api-key"
STREAM_CHAT_SECRET_KEY="your-stream-chat-secret"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

### 4. Database Setup

```bash
# Push database schema
npm run db:push

# Optional: Seed database
npm run db:seed
```

### 5. Run Development Server and Inngest Server

```bash
npm run dev
pnpm run dlx inngest@latest dev
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```bash
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main dashboard
│   ├── api/               # API routes & webhooks
│   └── call/              # Video call interface
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── db/                   # Database configuration & schema
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── module/               # Feature modules
│   ├── agents/          # AI agent management
│   ├── auth/            # Authentication
│   ├── call/            # Video calling
│   ├── dashboard/       # Dashboard components
│   └── meetings/        # Meeting management
└── trpc/                # tRPC configuration
```

## 🔧 Key Configuration

### Database Schema

The application uses Drizzle ORM with the following main entities:

- **Users**: User accounts and profiles
- **Agents**: AI agent configurations
- **Meetings**: Meeting records and metadata
- **Sessions**: Authentication sessions

### API Routes

- `/api/webhook` - Stream webhooks for real-time events
- `/api/trpc` - tRPC API endpoints
- `/api/inngest` - Background job processing

### Authentication

- Email/password authentication
- Social login (Google, GitHub)
- Session-based authentication with Better Auth

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Database Deployment

1. Set up Neon PostgreSQL database
2. Update `DB_URL` in environment variables
3. Run migrations: `npm run db:push`

### Webhook Configuration

Configure Stream webhooks to point to your deployed URL:

```bash
https://yourdomain.com/api/webhook
```

## 🔒 Environment Variables

| Variable                           | Description                    | Required |
| ---------------------------------- | ------------------------------ | -------- |
| `DB_URL`                           | PostgreSQL connection string   | ✅       |
| `BETTER_AUTH_SECRET`               | Authentication secret key      | ✅       |
| `OPENAI_API_SECRET_KEY`            | OpenAI API key for AI features | ✅       |
| `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` | Stream Video public key        | ✅       |
| `STREAM_VIDEO_SECRET_KEY`          | Stream Video secret key        | ✅       |
| `NEXT_PUBLIC_STREAM_CHAT_API_KEY`  | Stream Chat public key         | ✅       |
| `STREAM_CHAT_SECRET_KEY`           | Stream Chat secret key         | ✅       |
| `DEEPSEEK_API_KEY`                 | DeepSeek API key (optional)    | ⚠️       |
| `INNGEST_EVENT_KEY`                | Inngest event key              | ✅       |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Common Issues

### OpenAI API Limitations

- **Free Tier**: OpenAI free tier does NOT support Realtime API
- **Solution**: Upgrade to paid OpenAI account for voice features

### Webhook Duplicate Events

- **Issue**: Receiving multiple responses for single messages
- **Solution**: Implement idempotency checks in webhook handlers

### Authentication Errors

- **Issue**: "Unauthorized" errors during server rendering
- **Solution**: Add proper authentication guards in components

## 📚 API Documentation

### Meeting Endpoints

- `GET /api/trpc/meetings.getMany` - List meetings with filters
- `POST /api/trpc/meetings.create` - Create new meeting
- `GET /api/trpc/meetings.getOne` - Get meeting details
- `PATCH /api/trpc/meetings.update` - Update meeting
- `DELETE /api/trpc/meetings.delete` - Delete meeting

### Agent Endpoints

- `GET /api/trpc/agents.getMany` - List AI agents
- `POST /api/trpc/agents.create` - Create new agent
- `GET /api/trpc/agents.getOne` - Get agent details
- `PATCH /api/trpc/agents.update` - Update agent
- `DELETE /api/trpc/agents.delete` - Delete agent
