# VNX-Architype

VNX-Architype is an all-in-one architectural super-app for homeowners and building professionals to plan rooms in AR, draft simple 2D/3D layouts (BIM-lite), collaborate, and generate basic docs/estimates.

## 🏗️ Architecture

This is a Turborepo monorepo containing:

- **apps/architype-web**: Next.js 14 web application with App Router, Tailwind CSS, and shadcn/ui
- **apps/architype-mobile**: Expo React Native mobile application with AR capabilities
- **packages/architype-ui**: Shared UI components
- **packages/architype-api**: Shared API utilities and Zod schemas
- **packages/architype-db**: Database types and migrations for Supabase
- **packages/architype-workers**: Supabase Edge Functions
- **packages/architype-config**: Shared configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Supabase account
- Vercel account (for deployment)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd vnx-architype
   pnpm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project
   - Run the migration: `packages/architype-db/migrations/0001_init.sql`
   - Copy your project URL and anon key

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   cp apps/architype-web/.env.example apps/architype-web/.env.local
   cp apps/architype-mobile/.env.example apps/architype-mobile/.env.local
   ```
   
   Fill in your Supabase credentials in all `.env.local` files.

4. **Start development servers:**
   ```bash
   # Start all apps
   pnpm dev
   
   # Or start individually
   pnpm --filter @vnx-architype/web dev
   pnpm --filter @vnx-architype/mobile start
   ```

5. **Access the applications:**
   - Web app: http://localhost:3000
   - Mobile app: Use Expo Go app to scan QR code

## 📱 Features

### MVP Scope (Included)

- ✅ **Authentication**: Email/phone/magic link with Supabase Auth
- ✅ **Organization & Project Management**: Multi-tenant with RLS
- ✅ **AR Planning**: Mobile AR scan/measure/place (placeholder implementation)
- ✅ **Project Hub**: Overview with activity feed
- ✅ **Responsive Design**: Mobile-first web interface
- ✅ **Real-time Collaboration**: Project sharing and events

### Planned Features

- 🔄 **2D Layout Editor**: Walls/doors/windows editor
- 🔄 **3D Viewer**: Basic 3D visualization
- 🔄 **Cost Estimation**: Simple cost calculator
- 🔄 **PDF Export**: Static views export
- 🔄 **Payment Integration**: Plan gating and subscriptions

## 🛠️ Development

### Available Scripts

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Clean build artifacts
pnpm clean
```

### Database Management

```bash
# Run migrations
pnpm db:migrate

# Reset database (development only)
pnpm db:reset
```

### Package Structure

Each package follows this structure:
- `package.json` - Package configuration
- `index.ts` - Main export file
- `src/` - Source code (if applicable)
- `types/` - TypeScript type definitions

## 🚢 Deployment

### Vercel (Web App)

1. **Connect repository to Vercel**
2. **Configure build settings:**
   - Build Command: `pnpm install --frozen-lockfile && pnpm -w build`
   - Install Command: `pnpm install`
   - Framework Preset: Next.js
   - Root Directory: `apps/architype-web`

3. **Add environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Optional: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_ADSENSE_CLIENT`

4. **Deploy:**
   - Push to `main` branch for automatic deployment
   - Or use Vercel CLI: `vercel --prod`

### Expo (Mobile App)

```bash
cd apps/architype-mobile

# Build for development
expo build:android
expo build:ios

# Publish update
expo publish
```

### Supabase Edge Functions

```bash
cd packages/architype-workers

# Deploy functions
supabase functions deploy architype_create_project
supabase functions deploy architype_log_event
```

## 🔧 Configuration

### Environment Variables

#### Web App (`apps/architype-web/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=optional_posthog_key
NEXT_PUBLIC_SENTRY_DSN=optional_sentry_dsn
NEXT_PUBLIC_ADSENSE_CLIENT=optional_adsense_client
```

#### Mobile App (`apps/architype-mobile/.env.local`)
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_SCHEME=vnx-architype
```

#### Edge Functions (`packages/architype-workers/.env`)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **architype.orgs** - Organizations/workspaces
- **architype.memberships** - User-organization relationships
- **architype.projects** - Architectural projects
- **architype.project_members** - Project access control
- **architype.events** - Activity feed and audit log
- **architype.v_profiles** - User profile view

All tables include Row Level Security (RLS) policies for multi-tenant data isolation.

## 🧪 Testing

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Test build
pnpm build
```

## 📚 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Mobile**: Expo, React Native, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **State Management**: Zustand, TanStack Query
- **Build System**: Turborepo, pnpm
- **Deployment**: Vercel (web), Expo (mobile)
- **CI/CD**: GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs` (coming soon)

---

Built with ❤️ by the VNX-Architype team

