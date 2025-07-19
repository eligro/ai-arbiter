# AI Arbiter - Dispute Resolution Platform

## Overview
**AI Arbiter** is a modern web application that facilitates dispute resolution using AI-powered mediation. The platform enables parties to create conflicts, submit arguments, and receive AI-generated decisions through Google's Gemini API, providing an accessible alternative to traditional arbitration.

## Project Vision
To democratize dispute resolution by making it:
- **Accessible**: No complex legal procedures or high costs
- **Fast**: Automated decisions without lengthy court processes  
- **Fair**: AI-powered analysis removes human bias
- **Transparent**: Complete audit trail of all decisions
- **Multilingual**: Support for English and Hebrew with RTL layout

## Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom dark theme
- **Zustand** for state management
- **React Router** for client-side routing
- **Framer Motion** for smooth animations
- **React Hook Form + Zod** for form validation

### Backend & Services
- **Supabase** (PostgreSQL + Auth + RLS)
- **Google OAuth** for authentication
- **Google Gemini API** for AI decision-making (planned)
- **i18next** for internationalization

### Security
- **Row-Level Security (RLS)** on all database tables
- **Phone number hashing** for privacy
- **OAuth-only authentication** (no password storage)
- **Comprehensive audit logging**

## Architecture

### Database Schema
```sql
-- Core tables with RLS policies
conflicts              # Main dispute records
├── conflict_members    # Party roles (initiator/participant/arbiter)
├── conflict_invitations # Email-based party invitations
├── inputs             # Arguments and evidence submissions
├── questions          # AI-generated clarifying questions
├── decisions          # Final AI or human resolutions
└── audit_log          # Complete activity tracking
```

### Authentication Flow
1. **Google OAuth** → Supabase Auth → User Session
2. **Protected Routes** with automatic session restoration
3. **Global State Management** via Zustand store
4. **Secure API calls** with automatic token handling

### Conflict Management Process
1. **Creation**: 3-step wizard (Details → Invite → Review)
2. **Arguments**: Structured input collection from all parties
3. **AI Analysis**: Gemini API processes arguments and evidence
4. **Decision**: AI-generated resolution with explanation
5. **Appeals**: Built-in appeal mechanism for fairness

## Current Implementation Status

### ✅ Completed Features
- **Project Setup**: Vite + React + TypeScript foundation
- **Authentication**: Google OAuth with Supabase integration
- **Database**: Complete schema with RLS security policies
- **UI Foundation**: Dark theme with responsive design
- **Basic Routing**: Protected routes and navigation
- **State Management**: Zustand stores for auth and conflicts

### 🔄 In Progress
- **Conflict Workflow**: Enhanced dispute creation and management
- **UI Polish**: Improved forms and user experience

### ⏳ Planned Features
- **AI Integration**: Google Gemini API for automated decisions
- **Multi-party Support**: Complex disputes with multiple participants
- **Human Arbitration**: Option for human expert involvement
- **Internationalization**: English/Hebrew with RTL support
- **Admin Dashboard**: Oversight and conflict management tools
- **Mobile App**: React Native companion app

## Key Files & Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main app wrapper
│   ├── ProtectedRoute.tsx      # Auth guard component
│   └── conflict/               # Conflict-specific components
│       ├── ConflictWizard.tsx  # 3-step creation flow
│       └── Step*.tsx           # Individual wizard steps
├── hooks/
│   └── useAuth.ts              # Authentication hook
├── pages/
│   ├── LoginPage.tsx           # Google OAuth login
│   ├── SignupPage.tsx          # Account creation
│   ├── DashboardPage.tsx       # User dashboard
│   └── HomePage.tsx            # Landing page
├── services/
│   ├── auth.ts                 # Authentication API
│   ├── conflicts.ts            # Conflict CRUD operations
│   └── *.ts                    # Other service layers
├── stores/
│   ├── authStore.ts            # Global auth state
│   └── conflictStore.ts        # Conflict form state
└── types/
    └── database.ts             # TypeScript definitions
```

## Environment Configuration

### Required Variables
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Development Setup
1. **Install dependencies**: `npm install`
2. **Configure environment**: Copy `.env.example` to `.env`
3. **Start development**: `npm run dev`
4. **Build production**: `npm run build`

## Security Considerations

### Row-Level Security (RLS)
- **User Isolation**: Users can only access their own data
- **Conflict Members**: Only parties involved can view conflicts
- **Invitation System**: Secure email-based party addition
- **Audit Trail**: Complete logging of all actions

### Data Privacy
- **Phone Hashing**: Phone numbers stored as hashes only
- **OAuth Only**: No password storage or management
- **GDPR Compliance**: User data deletion and export capabilities

## Deployment

### Vercel Configuration
- **Environment Variables**: Must be configured in Vercel dashboard
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

### Google Cloud Setup
- **OAuth Consent Screen**: Configured for production use
- **Client Credentials**: Separate for dev/prod environments
- **Redirect URIs**: Must include production domain

## Contributing

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

### Development Workflow
1. **Feature branches** from `main`
2. **Pull requests** with detailed descriptions
3. **Code review** before merging
4. **Automated testing** (planned)

## Roadmap

### Phase 1: Core Platform ✅
- Basic authentication and user management
- Conflict creation and party management
- Database schema and security

### Phase 2: AI Integration 🔄
- Google Gemini API integration
- Automated question generation
- AI-powered decision making

### Phase 3: Advanced Features ⏳
- Multi-language support (English/Hebrew)
- Human arbitration workflows
- Mobile application
- Advanced analytics and reporting

---

**AI Arbiter** represents the future of accessible dispute resolution, combining modern web technologies with AI-powered decision-making to create a fair, fast, and transparent arbitration platform.