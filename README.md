# Tích Xanh AI — Web App

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Web dashboard của **Tích Xanh AI** — ứng dụng gamification phân loại rác dành cho học sinh Đồng Nai.

## Tech Stack

| Layer         | Tech                                        |
| ------------- | ------------------------------------------- |
| Framework     | React 19 + TanStack Start + TanStack Router |
| Bundler       | Vite 7                                      |
| Styling       | Tailwind CSS v4                             |
| UI Components | shadcn/ui (Radix UI)                        |
| Animation     | Framer Motion + GSAP + Anime.js             |
| Forms         | React Hook Form + Zod                       |
| State         | TanStack Query                              |
| Deploy        | Vercel (Edge Runtime via Cloudflare)        |

## Quick Start (Local Dev)

### Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io/) ≥ 9

### 1. Clone & Install

```bash
git clone https://github.com/Loid-Trix-AI/tichxanh-ai-web.git
cd tichxanh-ai-web
cp .env.example .env.local
pnpm install
```

### 2. Điền Environment Variables

```bash
# .env.local
VITE_SUPABASE_URL=http://127.0.0.1:54321        # local dev
VITE_SUPABASE_ANON_KEY=your_local_anon_key       # từ supabase start output
```

### 3. Start Dev Server

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start dev server (HMR)           |
| `pnpm build`   | Production build                 |
| `pnpm preview` | Preview production build locally |
| `pnpm lint`    | ESLint check                     |
| `pnpm format`  | Prettier format                  |

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── core/            # Core providers, config, constants
├── features/        # Feature modules (auth, leaderboard, scan, etc.)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── api/
├── locales/         # i18n strings (vi, en)
├── routes/          # TanStack Router file-based routes
├── shared/          # Shared components, utils, types
├── router.tsx       # Router config
├── server.ts        # SSR entry point
└── styles.css       # Global styles + Tailwind tokens
```

## Deployment (Vercel)

Web app được deploy tự động lên **Vercel** khi push lên `main`.

### Setup Vercel (One-time)

1. Import repo `tichxanh-ai-web` vào Vercel
2. Thêm environment variables trong Vercel dashboard:
   - `VITE_SUPABASE_URL` — production Supabase URL
   - `VITE_SUPABASE_ANON_KEY` — production anon key

> Không cần Dockerfile — Vercel build natively.

## Environment Variables

| Variable                 | Description                | Required |
| ------------------------ | -------------------------- | -------- |
| `VITE_SUPABASE_URL`      | Supabase project URL       | ✅       |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key | ✅       |

## Links

- [Architecture Docs](https://github.com/Loid-Trix-AI/tichxanh-ai-workspace/blob/main/docs/ARCHITECTURE.md)
- [Backend Repo](https://github.com/Loid-Trix-AI/tichxanh-ai-backend)
- [Flutter Repo](https://github.com/Loid-Trix-AI/tichxanh-ai-flutter)
- [Workspace Hub](https://github.com/Loid-Trix-AI/tichxanh-ai-workspace)
