# 🔥 Oven Framework

A **Next.js-style full-stack web framework** powered by [Bun](https://bun.sh) runtime.

Build modern web applications with file-based routing, server-side rendering, and API routes — up to **4x faster** than Node.js.

[![npm version](https://img.shields.io/npm/v/create-oven.svg)](https://www.npmjs.com/package/create-oven)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Demo:** [https://oven-drab.vercel.app](https://oven-drab.vercel.app)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📁 **App Router** | Next.js-style file-based routing with nested layouts |
| ⚡ **Blazing Fast** | Powered by Bun runtime, up to 4x faster than Node.js |
| 🎨 **SSR Built-in** | Server-side rendering out of the box |
| 🔌 **API Routes** | Create RESTful APIs with `route.ts` files |
| 📦 **TypeScript First** | Full TypeScript support with type safety |
| 🧩 **Nested Layouts** | Compose UIs with nested layouts and route groups |
| 🚀 **Zero Config** | Start building immediately, no complex setup |
| 🐳 **Docker Ready** | Production-ready Docker configuration included |

---

## 🚀 Quick Start

### Create a New Project

```bash
# Using npx
npx create-oven my-app

# Or using bunx
bunx create-oven my-app

# Navigate to project
cd my-app

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📁 Project Structure

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (/)
│   ├── loading.tsx         # Loading UI
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   │
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   │
│   ├── blog/
│   │   ├── layout.tsx      # Blog layout
│   │   ├── page.tsx        # Blog list (/blog)
│   │   └── [slug]/
│   │       └── page.tsx    # Blog post (/blog/:slug)
│   │
│   ├── api/
│   │   └── users/
│   │       ├── route.ts    # API endpoint (/api/users)
│   │       └── [id]/
│   │           └── route.ts # API endpoint (/api/users/:id)
│   │
│   └── (dashboard)/        # Route group (no URL segment)
│       ├── layout.tsx      # Dashboard layout
│       └── dashboard/
│           └── page.tsx    # Dashboard (/dashboard)
│
├── public/                 # Static files
├── components/             # Shared components
├── lib/                    # Utilities
├── oven.config.ts          # Configuration
└── package.json
```

---

## 📄 File Conventions

| File | Purpose |
|------|---------|
| `layout.tsx` | Shared UI wrapper for a route segment and its children |
| `page.tsx` | Unique UI for a route, makes the route publicly accessible |
| `loading.tsx` | Loading UI shown while page content loads |
| `error.tsx` | Error UI boundary for a segment and its children |
| `not-found.tsx` | UI shown when a route is not found (404) |
| `route.ts` | API endpoint handler (GET, POST, PUT, DELETE, etc.) |

---

## 🛣️ Routing

### Pages

Create a `page.tsx` file in any folder under `app/` to create a route:

```typescript
// app/page.tsx → /
// app/about/page.tsx → /about
// app/blog/[slug]/page.tsx → /blog/:slug

import type { PageProps, Metadata } from './types';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my app',
};

export default function HomePage({ searchParams }: PageProps) {
  return `
    <div>
      <h1>Hello, Oven! 🔥</h1>
      <p>Build amazing apps with Bun</p>
    </div>
  `;
}
```

### Dynamic Routes

Use brackets `[param]` for dynamic segments:

```typescript
// app/blog/[slug]/page.tsx

export default function BlogPost({ params }: PageProps) {
  return `
    <article>
      <h1>Post: ${params.slug}</h1>
    </article>
  `;
}
```

### Catch-All Routes

Use `[...param]` for catch-all segments:

```typescript
// app/docs/[...path]/page.tsx → /docs/a/b/c

export default function Docs({ params }: PageProps) {
  const path = params.path; // "a/b/c"
  return `<div>Path: ${path}</div>`;
}
```

---

## 🧩 Layouts

Layouts wrap pages and persist across navigations:

```typescript
// app/layout.tsx

import type { LayoutProps } from './types';

export default function RootLayout({ children }: LayoutProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My App</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        <main>${children}</main>
      </body>
    </html>
  `;
}
```

### Nested Layouts

Each route segment can have its own layout:

```typescript
// app/blog/layout.tsx

export default function BlogLayout({ children }: LayoutProps) {
  return `
    <div class="blog-container">
      <aside>Blog Sidebar</aside>
      <main>${children}</main>
    </div>
  `;
}
```

---

## 🔌 API Routes

Create API endpoints using `route.ts` files:

```typescript
// app/api/users/route.ts

// GET /api/users
export async function GET(request: Request) {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];
  return Response.json(users);
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = { id: Date.now(), ...body };
  return Response.json(newUser, { status: 201 });
}

// PUT, PATCH, DELETE also supported
export async function DELETE(request: Request) {
  return Response.json({ message: 'Deleted' });
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  return Response.json({ id: userId, name: 'User ' + userId });
}
```

---

## 📦 Route Groups

Use parentheses `(name)` to organize routes without affecting the URL:

```
app/
├── (marketing)/
│   ├── layout.tsx      # Marketing layout
│   ├── page.tsx        # / (home)
│   └── about/
│       └── page.tsx    # /about
│
└── (dashboard)/
    ├── layout.tsx      # Dashboard layout (different from marketing)
    └── dashboard/
        └── page.tsx    # /dashboard
```

---

## 🏷️ Metadata

Define metadata for SEO:

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  keywords: ['oven', 'bun', 'framework'],
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    type: 'website',
  },
};

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

---

## ⚙️ Configuration

Create `oven.config.ts` in your project root:

```typescript
import type { OvenConfig } from 'oven';

const config: OvenConfig = {
  // Server port
  port: 3000,

  // App directory
  appDir: 'app',

  // Public directory for static files
  publicDir: 'public',

  // Enable/disable features
  features: {
    ssr: true,
    streaming: true,
  },
};

export default config;
```

---

## 📖 TypeScript Types

```typescript
// Page props
interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

// Layout props
interface LayoutProps {
  children: string;
  params: Record<string, string>;
}

// Metadata
interface Metadata {
  title?: string | { default: string; template?: string };
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    images?: string[];
  };
}
```

---

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .

FROM oven/bun:1-slim AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/app ./app
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/package.json ./
COPY --from=builder /app/oven.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/public* ./public/

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "bin/oven.js", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  oven:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
```

### Run with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## ▲ Vercel Deployment

### 1. Add `vercel.json`

```json
{
  "buildCommand": "bun run build:vercel",
  "outputDirectory": "dist",
  "installCommand": "curl -fsSL https://bun.sh/install | bash && ~/.bun/bin/bun install",
  "framework": null
}
```

### 2. Add build script

```json
{
  "scripts": {
    "build:vercel": "bun run scripts/build-static.ts"
  }
}
```

### 3. Deploy

```bash
vercel --prod
```

---

## 🆚 Oven vs Next.js

| Feature | Oven 🔥 | Next.js |
|---------|---------|---------|
| **Runtime** | Bun | Node.js |
| **Cold Start** | ~0ms | ~200ms |
| **Install Time** | ~1s | ~30s |
| **TypeScript** | Native | Compiled |
| **Bundle Size** | Smaller | Larger |
| **Speed** | **4x faster** | Baseline |

---

## 💻 CLI Commands

```bash
# Create new project
npx create-oven my-app

# Development server (with hot reload)
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

---

## 🗺️ Roadmap

- [x] **v0.1.0** — Initial release with core features
- [ ] **v0.2.0** — React/JSX component support
- [ ] **v0.3.0** — Edge runtime (Cloudflare Workers)
- [ ] **v0.4.0** — Middleware support
- [ ] **v1.0.0** — Stable production release

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```bash
# Clone the repository
git clone https://github.com/oven-ttta/oven-framework.git

# Install dependencies
cd oven-framework
bun install

# Start development
bun run dev
```

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **npm** | [npmjs.com/package/create-oven](https://www.npmjs.com/package/create-oven) |
| **GitHub** | [github.com/oven-ttta/oven-framework](https://github.com/oven-ttta/oven-framework) |
| **Demo** | [oven-drab.vercel.app](https://oven-drab.vercel.app) |

---

<p align="center">
  <strong>Made with ❤️ and 🔥</strong>
  <br>
  <sub>Powered by Bun</sub>
</p>
