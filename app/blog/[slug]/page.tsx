import type { PageProps, Metadata } from '../../../src/types';

// Generate metadata dynamically based on slug
export function generateMetadata({ params }: PageProps): Metadata {
  const title = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title,
    description: `Read about ${title} on the Oven blog`,
  };
}

// This would be replaced with actual data fetching
const posts: Record<string, { title: string; content: string; date: string; author: string }> = {
  'getting-started': {
    title: 'Getting Started with Oven',
    date: '2024-01-15',
    author: 'Oven Team',
    content: `
      <p>Welcome to Oven! This guide will help you create your first Oven application.</p>

      <h2>Installation</h2>
      <p>First, make sure you have Bun installed. Then create a new project:</p>
      <pre><code>bunx oven create my-app
cd my-app
bun install
bun run dev</code></pre>

      <h2>Project Structure</h2>
      <p>Oven uses a file-based routing system similar to Next.js App Router:</p>
      <ul>
        <li><code>app/</code> - Your application routes</li>
        <li><code>app/page.tsx</code> - Home page</li>
        <li><code>app/layout.tsx</code> - Root layout</li>
        <li><code>public/</code> - Static assets</li>
      </ul>

      <h2>Creating Pages</h2>
      <p>Create a new page by adding a <code>page.tsx</code> file in the app directory:</p>
      <pre><code>// app/about/page.tsx
export default function AboutPage() {
  return `&lt;h1&gt;About Us&lt;/h1&gt;`;
}</code></pre>
    `,
  },
  'api-routes': {
    title: 'Building API Routes in Oven',
    date: '2024-01-12',
    author: 'Oven Team',
    content: `
      <p>Learn how to create API endpoints using route.ts files.</p>

      <h2>Creating an API Route</h2>
      <p>Create a <code>route.ts</code> file in any directory under <code>app/</code>:</p>
      <pre><code>// app/api/hello/route.ts
export function GET(request: Request) {
  return Response.json({ message: 'Hello!' });
}

export function POST(request: Request) {
  return Response.json({ received: true });
}</code></pre>

      <h2>Dynamic API Routes</h2>
      <p>Use brackets for dynamic segments:</p>
      <pre><code>// app/api/users/[id]/route.ts
export function GET(request: Request, { params }) {
  return Response.json({ userId: params.id });
}</code></pre>
    `,
  },
  'layouts': {
    title: 'Understanding Nested Layouts',
    date: '2024-01-10',
    author: 'Oven Team',
    content: `
      <p>Layouts are a powerful way to share UI between pages.</p>

      <h2>Root Layout</h2>
      <p>The root layout wraps your entire application:</p>
      <pre><code>// app/layout.tsx
export default function RootLayout({ children }) {
  return `
    &lt;html&gt;
      &lt;body&gt;${children}&lt;/body&gt;
    &lt;/html&gt;
  `;
}</code></pre>

      <h2>Nested Layouts</h2>
      <p>Create layouts for specific sections:</p>
      <pre><code>// app/blog/layout.tsx
export default function BlogLayout({ children }) {
  return `
    &lt;div&gt;
      &lt;nav&gt;Blog Navigation&lt;/nav&gt;
      ${children}
    &lt;/div&gt;
  `;
}</code></pre>
    `,
  },
};

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug];

  if (!post) {
    return `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h1>Post Not Found</h1>
        <p style="color: #666;">The blog post you're looking for doesn't exist.</p>
        <a href="/blog" style="color: #ff6b35;">← Back to Blog</a>
      </div>
    `;
  }

  return `
    <article style="max-width: 700px;">
      <a href="/blog" style="color: #ff6b35; text-decoration: none; display: inline-block; margin-bottom: 2rem;">
        ← Back to Blog
      </a>

      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${post.title}</h1>

      <div style="display: flex; gap: 1rem; color: #666; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eee;">
        <span>By ${post.author}</span>
        <span>•</span>
        <time>${post.date}</time>
      </div>

      <div style="line-height: 1.8; color: #333;">
        ${post.content}
      </div>

      <style>
        article h2 { margin: 2rem 0 1rem; color: #ff6b35; }
        article p { margin-bottom: 1rem; }
        article pre { background: #1a1a1a; color: #e0e0e0; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
        article code { font-family: monospace; }
        article ul { margin: 1rem 0; padding-left: 2rem; }
        article li { margin-bottom: 0.5rem; }
      </style>
    </article>
  `;
}
