import type { PageProps, Metadata } from '../src/types';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Oven - A full-stack web framework powered by Bun',
};

export default function HomePage({ searchParams }: PageProps) {
  return `
    <div style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
      <header style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 4rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff6b35, #f7931e); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Welcome to Oven 🔥
        </h1>
        <p style="font-size: 1.5rem; color: #666; max-width: 600px; margin: 0 auto;">
          The Next.js-style full-stack framework for Bun
        </p>
      </header>

      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">📁 App Router</h3>
          <p style="color: #666; line-height: 1.6;">
            Next.js-style file-based routing with layouts, loading states, and error boundaries.
          </p>
        </div>

        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">⚡ Blazing Fast</h3>
          <p style="color: #666; line-height: 1.6;">
            Powered by Bun runtime for maximum performance and minimal cold starts.
          </p>
        </div>

        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">🎨 SSR Built-in</h3>
          <p style="color: #666; line-height: 1.6;">
            Server-side rendering out of the box with streaming support.
          </p>
        </div>

        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">🔌 API Routes</h3>
          <p style="color: #666; line-height: 1.6;">
            Create API endpoints with route.ts files - just like Next.js!
          </p>
        </div>

        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">📦 TypeScript</h3>
          <p style="color: #666; line-height: 1.6;">
            First-class TypeScript support with full type safety.
          </p>
        </div>

        <div style="background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h3 style="color: #ff6b35; margin-bottom: 1rem;">🧩 Nested Layouts</h3>
          <p style="color: #666; line-height: 1.6;">
            Compose UIs with nested layouts and route groups.
          </p>
        </div>
      </section>

      <section style="background: #1a1a1a; border-radius: 12px; padding: 2rem; margin-bottom: 4rem;">
        <h2 style="color: #fff; margin-bottom: 1.5rem;">Quick Start</h2>
        <pre style="background: #2d2d2d; padding: 1.5rem; border-radius: 8px; overflow-x: auto; color: #e0e0e0;">
<code><span style="color: #888;"># Create a new project</span>
bunx oven create my-app

<span style="color: #888;"># Navigate to project</span>
cd my-app

<span style="color: #888;"># Start development server</span>
bun run dev</code></pre>
      </section>

      <section style="text-align: center;">
        <h2 style="margin-bottom: 2rem;">Project Structure</h2>
        <pre style="background: #f5f5f5; padding: 2rem; border-radius: 12px; text-align: left; display: inline-block;">
my-app/
├── app/
│   ├── layout.tsx        <span style="color: #888;"># Root layout</span>
│   ├── page.tsx          <span style="color: #888;"># Home page (/)</span>
│   ├── loading.tsx       <span style="color: #888;"># Loading UI</span>
│   ├── error.tsx         <span style="color: #888;"># Error UI</span>
│   ├── not-found.tsx     <span style="color: #888;"># 404 page</span>
│   ├── about/
│   │   └── page.tsx      <span style="color: #888;"># /about</span>
│   ├── blog/
│   │   ├── layout.tsx    <span style="color: #888;"># Blog layout</span>
│   │   ├── page.tsx      <span style="color: #888;"># /blog</span>
│   │   └── [slug]/
│   │       └── page.tsx  <span style="color: #888;"># /blog/:slug</span>
│   ├── api/
│   │   └── hello/
│   │       └── route.ts  <span style="color: #888;"># API: /api/hello</span>
│   └── (dashboard)/      <span style="color: #888;"># Route group</span>
│       ├── layout.tsx
│       └── settings/
│           └── page.tsx  <span style="color: #888;"># /settings</span>
├── public/               <span style="color: #888;"># Static files</span>
├── components/           <span style="color: #888;"># Shared components</span>
└── oven.config.ts        <span style="color: #888;"># Configuration</span>
        </pre>
      </section>
    </div>
  `;
}
