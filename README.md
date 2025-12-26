# Oven 🔥

A Next.js-style full-stack web framework powered by Bun.

## Features

- **App Router** - Next.js-style file-based routing
- **Layouts** - Nested layouts with shared UI
- **Loading States** - Built-in loading.tsx support
- **Error Handling** - error.tsx for error boundaries
- **API Routes** - Create APIs with route.ts files
- **Route Groups** - Organize routes with (folder) syntax
- **TypeScript** - First-class TypeScript support
- **Blazing Fast** - Powered by Bun runtime

## Quick Start

```bash
# Create a new project
bunx oven create my-app

# Navigate to project
cd my-app

# Install dependencies
bun install

# Start development server
bun run dev
```

## Project Structure

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout (required)
│   ├── page.tsx            # Home page (/)
│   ├── loading.tsx         # Loading UI
│   ├── error.tsx           # Error UI
│   ├── not-found.tsx       # 404 page
│   │
│   ├── about/
│   │   └── page.tsx        # /about
│   │
│   ├── blog/
│   │   ├── layout.tsx      # Blog layout
│   │   ├── page.tsx        # /blog
│   │   └── [slug]/
│   │       └── page.tsx    # /blog/:slug
│   │
│   ├── api/
│   │   ├── hello/
│   │   │   └── route.ts    # /api/hello
│   │   └── users/
│   │       ├── route.ts    # /api/users
│   │       └── [id]/
│   │           └── route.ts # /api/users/:id
│   │
│   └── (dashboard)/        # Route group (not in URL)
│       ├── layout.tsx      # Dashboard layout
│       └── dashboard/
│           ├── page.tsx    # /dashboard
│           └── settings/
│               └── page.tsx # /dashboard/settings
│
├── public/                 # Static files
├── components/             # Shared components
├── lib/                    # Utilities
└── oven.config.ts          # Configuration
```

## File Conventions

| File | Purpose |
|------|---------|
| `layout.tsx` | Shared UI wrapper for pages |
| `page.tsx` | Page component for a route |
| `loading.tsx` | Loading UI while page loads |
| `error.tsx` | Error UI for error boundaries |
| `not-found.tsx` | Custom 404 page |
| `route.ts` | API route handler |

## Pages

Create a `page.tsx` file to define a route:

```typescript
// app/page.tsx → /
import type { PageProps, Metadata } from 'oven';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my app',
};

export default function HomePage({ searchParams }: PageProps) {
  return `<h1>Welcome!</h1>`;
}
```

## Layouts

Wrap pages with shared UI using `layout.tsx`:

```typescript
// app/layout.tsx
import type { LayoutProps, Metadata } from 'oven';

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return `
    <html>
      <body>
        <nav>...</nav>
        ${children}
        <footer>...</footer>
      </body>
    </html>
  `;
}
```

## Dynamic Routes

Use brackets for dynamic segments:

```typescript
// app/blog/[slug]/page.tsx → /blog/:slug
export default function BlogPost({ params }: PageProps) {
  return `<h1>Post: ${params.slug}</h1>`;
}
```

### Catch-All Routes

```typescript
// app/docs/[...slug]/page.tsx → /docs/*
export default function Docs({ params }: PageProps) {
  // params.slug = ['intro', 'getting-started'] for /docs/intro/getting-started
  return `<h1>${params.slug.join('/')}</h1>`;
}
```

## API Routes

Create API endpoints with `route.ts`:

```typescript
// app/api/hello/route.ts → /api/hello

export async function GET(request: Request) {
  return Response.json({ message: 'Hello!' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body });
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts → /api/users/:id

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({ userId: params.id });
}
```

## Route Groups

Organize routes without affecting the URL:

```typescript
// app/(marketing)/about/page.tsx → /about
// app/(shop)/products/page.tsx → /products

// Both can have their own layouts without adding to the URL path
```

## Metadata

Define metadata for SEO:

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: [{ url: '/og-image.png' }],
  },
};

// Dynamic metadata
export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Post: ${params.slug}`,
  };
}
```

## Configuration

Create `oven.config.ts`:

```typescript
import type { OvenConfig } from 'oven';

const config: OvenConfig = {
  port: 3000,
  appDir: 'app',
  publicDir: 'public',
  dev: process.env.NODE_ENV !== 'production',
};

export default config;
```

## CLI Commands

```bash
# Start development server
oven dev

# Build for production
oven build

# Start production server
oven start

# Create a new project
oven create <project-name>
```

## Middleware

```typescript
import { Oven, cors, logger } from 'oven';

const app = new Oven();

app.use(logger({ format: 'dev' }));
app.use(cors({ origin: '*' }));

app.listen(3000);
```

## Requirements

- [Bun](https://bun.sh) >= 1.0.0

## License

MIT
