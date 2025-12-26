import type { PageProps, Metadata } from '../../src/types';

export const metadata: Metadata = {
  title: 'Documentation - Oven Framework',
  description: 'Complete documentation for Oven Framework - Learn how to build fast web applications with Bun runtime.',
};

export default function DocsPage({ params }: PageProps) {
  return `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #fff5f2, #ffffff); border-radius: 16px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ff6b35, #f7931e); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Documentation
        </h1>
        <p style="color: #666; font-size: 1.1rem;">Everything you need to build with Oven</p>
        <p style="color: #888;">เอกสารการใช้งาน Oven Framework</p>
      </div>

      <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
        <!-- Sidebar -->
        <aside style="position: sticky; top: 2rem; height: fit-content;">
          <nav style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h3 style="color: #ff6b35; margin-bottom: 1rem; font-size: 0.9rem; text-transform: uppercase;">Getting Started</h3>
            <a href="#installation" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Installation</a>
            <a href="#quick-start" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Quick Start</a>
            <a href="#project-structure" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Project Structure</a>

            <h3 style="color: #ff6b35; margin: 1.5rem 0 1rem; font-size: 0.9rem; text-transform: uppercase;">Core Concepts</h3>
            <a href="#routing" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Routing</a>
            <a href="#pages" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Pages</a>
            <a href="#layouts" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Layouts</a>
            <a href="#api-routes" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">API Routes</a>

            <h3 style="color: #ff6b35; margin: 1.5rem 0 1rem; font-size: 0.9rem; text-transform: uppercase;">Deployment</h3>
            <a href="#docker" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Docker</a>
            <a href="#vercel" style="display: block; padding: 0.5rem 0; color: #666; text-decoration: none; border-left: 2px solid transparent; padding-left: 1rem;">Vercel</a>
          </nav>
        </aside>

        <!-- Content -->
        <main>
          <!-- Installation -->
          <section id="installation" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">01.</span> Installation
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Create a new Oven project with a single command:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;"># Using npx</div>
              <code style="color: #22c55e; font-size: 1.1rem;">npx create-oven my-app</code>
            </div>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;"># Or using bunx</div>
              <code style="color: #22c55e; font-size: 1.1rem;">bunx create-oven my-app</code>
            </div>
          </section>

          <!-- Quick Start -->
          <section id="quick-start" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">02.</span> Quick Start
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Get up and running in seconds:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem;">
              <pre style="color: #e0e0e0; margin: 0; line-height: 2;"><code><span style="color: #888;"># Create project</span>
<span style="color: #22c55e;">npx create-oven my-app</span>

<span style="color: #888;"># Navigate to project</span>
<span style="color: #22c55e;">cd my-app</span>

<span style="color: #888;"># Install dependencies</span>
<span style="color: #22c55e;">bun install</span>

<span style="color: #888;"># Start development server</span>
<span style="color: #22c55e;">bun run dev</span>

<span style="color: #888;"># Open http://localhost:3000</span></code></pre>
            </div>
          </section>

          <!-- Project Structure -->
          <section id="project-structure" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">03.</span> Project Structure
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Oven uses a file-based routing system similar to Next.js:</p>

            <div style="background: #f9f9f9; border-radius: 8px; padding: 1.5rem; font-family: monospace; font-size: 0.9rem;">
              <pre style="margin: 0; color: #333;">my-app/
├── app/
│   ├── layout.tsx          <span style="color: #888;"># Root layout</span>
│   ├── page.tsx            <span style="color: #888;"># Home page (/)</span>
│   ├── loading.tsx         <span style="color: #888;"># Loading UI</span>
│   ├── error.tsx           <span style="color: #888;"># Error boundary</span>
│   │
│   ├── about/
│   │   └── page.tsx        <span style="color: #888;"># /about</span>
│   │
│   ├── blog/
│   │   ├── page.tsx        <span style="color: #888;"># /blog</span>
│   │   └── [slug]/
│   │       └── page.tsx    <span style="color: #888;"># /blog/:slug</span>
│   │
│   ├── api/
│   │   └── users/
│   │       └── route.ts    <span style="color: #888;"># /api/users</span>
│   │
│   └── (dashboard)/        <span style="color: #888;"># Route group</span>
│       └── dashboard/
│           └── page.tsx    <span style="color: #888;"># /dashboard</span>
│
├── public/                 <span style="color: #888;"># Static files</span>
└── oven.config.ts          <span style="color: #888;"># Configuration</span></pre>
            </div>

            <div style="margin-top: 1.5rem;">
              <h4 style="color: #333; margin-bottom: 1rem;">File Conventions:</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 0;"><code style="background: #fff5f2; color: #ff6b35; padding: 0.25rem 0.5rem; border-radius: 4px;">page.tsx</code></td>
                  <td style="padding: 0.75rem 0; color: #666;">Page component for a route</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 0;"><code style="background: #fff5f2; color: #ff6b35; padding: 0.25rem 0.5rem; border-radius: 4px;">layout.tsx</code></td>
                  <td style="padding: 0.75rem 0; color: #666;">Shared wrapper for pages</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 0;"><code style="background: #fff5f2; color: #ff6b35; padding: 0.25rem 0.5rem; border-radius: 4px;">route.ts</code></td>
                  <td style="padding: 0.75rem 0; color: #666;">API endpoint handler</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem 0;"><code style="background: #fff5f2; color: #ff6b35; padding: 0.25rem 0.5rem; border-radius: 4px;">loading.tsx</code></td>
                  <td style="padding: 0.75rem 0; color: #666;">Loading UI</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem 0;"><code style="background: #fff5f2; color: #ff6b35; padding: 0.25rem 0.5rem; border-radius: 4px;">error.tsx</code></td>
                  <td style="padding: 0.75rem 0; color: #666;">Error boundary</td>
                </tr>
              </table>
            </div>
          </section>

          <!-- Routing -->
          <section id="routing" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">04.</span> Routing
            </h2>

            <div style="display: grid; gap: 1.5rem;">
              <div>
                <h4 style="color: #333; margin-bottom: 0.75rem;">Static Routes</h4>
                <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px;">
                  <code style="color: #666;">app/about/page.tsx</code> → <code style="color: #ff6b35;">/about</code>
                </div>
              </div>

              <div>
                <h4 style="color: #333; margin-bottom: 0.75rem;">Dynamic Routes</h4>
                <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px;">
                  <code style="color: #666;">app/blog/[slug]/page.tsx</code> → <code style="color: #ff6b35;">/blog/:slug</code>
                </div>
              </div>

              <div>
                <h4 style="color: #333; margin-bottom: 0.75rem;">Catch-All Routes</h4>
                <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px;">
                  <code style="color: #666;">app/docs/[...path]/page.tsx</code> → <code style="color: #ff6b35;">/docs/*</code>
                </div>
              </div>

              <div>
                <h4 style="color: #333; margin-bottom: 0.75rem;">Route Groups</h4>
                <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px;">
                  <code style="color: #666;">app/(dashboard)/settings/page.tsx</code> → <code style="color: #ff6b35;">/settings</code>
                  <p style="color: #888; font-size: 0.85rem; margin-top: 0.5rem;">Parentheses are excluded from URL</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Pages -->
          <section id="pages" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">05.</span> Pages
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Create pages by adding page.tsx files:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; overflow-x: auto;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;">// app/page.tsx</div>
              <pre style="color: #e0e0e0; margin: 0;"><code><span style="color: #c792ea;">import</span> <span style="color: #89ddff;">type</span> { PageProps, Metadata } <span style="color: #c792ea;">from</span> <span style="color: #c3e88d;">'./types'</span>;

<span style="color: #c792ea;">export const</span> metadata: Metadata = {
  title: <span style="color: #c3e88d;">'Home'</span>,
  description: <span style="color: #c3e88d;">'Welcome to my app'</span>,
};

<span style="color: #c792ea;">export default function</span> <span style="color: #82aaff;">HomePage</span>({ searchParams }: PageProps) {
  <span style="color: #c792ea;">return</span> <span style="color: #c3e88d;">\`
    &lt;div&gt;
      &lt;h1&gt;Hello, Oven! 🔥&lt;/h1&gt;
      &lt;p&gt;Build amazing apps with Bun&lt;/p&gt;
    &lt;/div&gt;
  \`</span>;
}</code></pre>
            </div>
          </section>

          <!-- Layouts -->
          <section id="layouts" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">06.</span> Layouts
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Layouts wrap pages and persist across navigations:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; overflow-x: auto;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;">// app/layout.tsx</div>
              <pre style="color: #e0e0e0; margin: 0;"><code><span style="color: #c792ea;">import</span> <span style="color: #89ddff;">type</span> { LayoutProps } <span style="color: #c792ea;">from</span> <span style="color: #c3e88d;">'./types'</span>;

<span style="color: #c792ea;">export default function</span> <span style="color: #82aaff;">RootLayout</span>({ children }: LayoutProps) {
  <span style="color: #c792ea;">return</span> <span style="color: #c3e88d;">\`
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
      &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;My App&lt;/title&gt;
      &lt;/head&gt;
      &lt;body&gt;
        &lt;nav&gt;...&lt;/nav&gt;
        &lt;main&gt;\${children}&lt;/main&gt;
        &lt;footer&gt;...&lt;/footer&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  \`</span>;
}</code></pre>
            </div>
          </section>

          <!-- API Routes -->
          <section id="api-routes" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">07.</span> API Routes
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Create RESTful APIs with route.ts files:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; overflow-x: auto;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;">// app/api/users/route.ts</div>
              <pre style="color: #e0e0e0; margin: 0;"><code><span style="color: #888;">// GET /api/users</span>
<span style="color: #c792ea;">export async function</span> <span style="color: #82aaff;">GET</span>(request: Request) {
  <span style="color: #c792ea;">const</span> users = [
    { id: <span style="color: #f78c6c;">1</span>, name: <span style="color: #c3e88d;">'John'</span> },
    { id: <span style="color: #f78c6c;">2</span>, name: <span style="color: #c3e88d;">'Jane'</span> },
  ];
  <span style="color: #c792ea;">return</span> Response.json(users);
}

<span style="color: #888;">// POST /api/users</span>
<span style="color: #c792ea;">export async function</span> <span style="color: #82aaff;">POST</span>(request: Request) {
  <span style="color: #c792ea;">const</span> body = <span style="color: #c792ea;">await</span> request.json();
  <span style="color: #c792ea;">return</span> Response.json(body, { status: <span style="color: #f78c6c;">201</span> });
}

<span style="color: #888;">// DELETE, PUT, PATCH also supported</span></code></pre>
            </div>
          </section>

          <!-- Docker -->
          <section id="docker" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">08.</span> Docker Deployment
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Deploy with Docker in production:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem; overflow-x: auto;">
              <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;"># docker-compose.yml</div>
              <pre style="color: #e0e0e0; margin: 0;"><code><span style="color: #f78c6c;">version:</span> <span style="color: #c3e88d;">'3.8'</span>
<span style="color: #f78c6c;">services:</span>
  <span style="color: #f78c6c;">oven:</span>
    <span style="color: #f78c6c;">build:</span> <span style="color: #c3e88d;">.</span>
    <span style="color: #f78c6c;">ports:</span>
      - <span style="color: #c3e88d;">"3000:3000"</span>
    <span style="color: #f78c6c;">environment:</span>
      - <span style="color: #c3e88d;">NODE_ENV=production</span></code></pre>
            </div>

            <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
              <code style="color: #666;">docker-compose up -d</code>
            </div>
          </section>

          <!-- Vercel -->
          <section id="vercel" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: #ff6b35;">09.</span> Vercel Deployment
            </h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Deploy to Vercel with one command:</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 1.5rem;">
              <pre style="color: #e0e0e0; margin: 0;"><code><span style="color: #888;"># Install Vercel CLI</span>
<span style="color: #22c55e;">npm i -g vercel</span>

<span style="color: #888;"># Deploy</span>
<span style="color: #22c55e;">vercel --prod</span></code></pre>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: #fff5f2; border-radius: 8px; border-left: 4px solid #ff6b35;">
              <strong style="color: #ff6b35;">Demo:</strong>
              <a href="https://oven-drab.vercel.app" style="color: #666; margin-left: 0.5rem;">https://oven-drab.vercel.app</a>
            </div>
          </section>

          <!-- Links -->
          <section style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 2rem; border-radius: 12px; text-align: center;">
            <h2 style="color: white; margin-bottom: 1rem;">Ready to Build?</h2>
            <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">Start building with Oven today</p>

            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="https://www.npmjs.com/package/create-oven" style="background: white; color: #ff6b35; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">
                📦 npm
              </a>
              <a href="https://github.com/oven-ttta/oven-framework" style="background: #1a1a1a; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">
                ⭐ GitHub
              </a>
              <a href="/" style="background: rgba(255,255,255,0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">
                ← Home
              </a>
            </div>
          </section>
        </main>
      </div>

      <style>
        aside a:hover {
          color: #ff6b35 !important;
          border-left-color: #ff6b35 !important;
        }
      </style>
    </div>
  `;
}
