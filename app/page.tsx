import type { PageProps, Metadata } from '../src/types';

export const metadata: Metadata = {
  title: 'Oven Framework - Next.js-style for Bun',
  description: 'A blazing fast full-stack web framework powered by Bun runtime. Build modern web applications with file-based routing, SSR, and API routes.',
  keywords: ['bun', 'framework', 'fullstack', 'ssr', 'typescript', 'web framework'],
  openGraph: {
    title: 'Oven Framework',
    description: 'Next.js-style full-stack framework for Bun',
    type: 'website',
  },
};

export default function HomePage({ searchParams }: PageProps) {
  const features = [
    {
      icon: '📁',
      title: 'App Router',
      titleTh: 'ระบบ Routing',
      desc: 'Next.js-style file-based routing with nested layouts, loading states, and error boundaries.',
      descTh: 'ระบบ routing แบบ Next.js รองรับ layouts ซ้อนกัน, loading states และ error boundaries',
    },
    {
      icon: '⚡',
      title: 'Blazing Fast',
      titleTh: 'เร็วสุดขีด',
      desc: 'Powered by Bun runtime - up to 4x faster than Node.js with native TypeScript support.',
      descTh: 'ขับเคลื่อนด้วย Bun runtime เร็วกว่า Node.js ถึง 4 เท่า รองรับ TypeScript',
    },
    {
      icon: '🎨',
      title: 'SSR Built-in',
      titleTh: 'SSR พร้อมใช้',
      desc: 'Server-side rendering out of the box with streaming support for optimal performance.',
      descTh: 'Server-side rendering พร้อมใช้งาน รองรับ streaming เพื่อประสิทธิภาพสูงสุด',
    },
    {
      icon: '🔌',
      title: 'API Routes',
      titleTh: 'API Routes',
      desc: 'Create RESTful APIs with route.ts files. Support GET, POST, PUT, DELETE and more.',
      descTh: 'สร้าง RESTful API ด้วยไฟล์ route.ts รองรับ GET, POST, PUT, DELETE',
    },
    {
      icon: '📦',
      title: 'TypeScript First',
      titleTh: 'TypeScript',
      desc: 'Full TypeScript support with type safety, auto-completion, and better developer experience.',
      descTh: 'รองรับ TypeScript เต็มรูปแบบ type safety และ auto-completion',
    },
    {
      icon: '🧩',
      title: 'Nested Layouts',
      titleTh: 'Layouts ซ้อนกัน',
      desc: 'Compose UIs with nested layouts and route groups for better code organization.',
      descTh: 'สร้าง UI ด้วย layouts ซ้อนกันและ route groups เพื่อจัดระเบียบโค้ด',
    },
  ];

  const stats = [
    { value: '4x', label: 'Faster than Node.js', labelTh: 'เร็วกว่า Node.js' },
    { value: '0ms', label: 'Cold Start', labelTh: 'Cold Start' },
    { value: '100%', label: 'TypeScript', labelTh: 'TypeScript' },
    { value: '∞', label: 'Possibilities', labelTh: 'ความเป็นไปได้' },
  ];

  return \`
    <div style="background: linear-gradient(180deg, #fff5f2 0%, #ffffff 100%);">
      <!-- Hero Section -->
      <section style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; text-align: center;">
        <div style="margin-bottom: 2rem;">
          <span style="background: #fff3e0; color: #ff6b35; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.9rem; font-weight: 500;">
            🚀 Version 0.1.0 Released
          </span>
        </div>

        <h1 style="font-size: 4rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff6b35, #f7931e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.2;">
          Build Faster with Oven 🔥
        </h1>

        <p style="font-size: 1.5rem; color: #666; max-width: 700px; margin: 0 auto 1rem;">
          The Next.js-style full-stack framework for Bun
        </p>
        <p style="font-size: 1.1rem; color: #888; max-width: 600px; margin: 0 auto 2rem;">
          เฟรมเวิร์ค Full-stack สไตล์ Next.js สำหรับ Bun
        </p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/about" style="
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            transition: transform 0.2s;
          ">
            Get Started →
          </a>
          <a href="https://github.com/oven-ttta/oven-framework" style="
            background: #1a1a1a;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
          ">
            ⭐ GitHub
          </a>
        </div>
      </section>

      <!-- Stats Section -->
      <section style="background: #1a1a1a; padding: 3rem 2rem; margin: 2rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center;">
          \${stats.map(stat => \`
            <div>
              <div style="font-size: 3rem; font-weight: bold; color: #ff6b35;">\${stat.value}</div>
              <div style="color: #888;">\${stat.label}</div>
              <div style="color: #666; font-size: 0.9rem;">\${stat.labelTh}</div>
            </div>
          \`).join('')}
        </div>
      </section>

      <!-- Features Section -->
      <section style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem;">Features</h2>
        <p style="text-align: center; color: #666; margin-bottom: 3rem;">ความสามารถที่ครบครัน</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
          \${features.map(f => \`
            <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #f0f0f0;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">\${f.icon}</div>
              <h3 style="color: #333; margin-bottom: 0.25rem; font-size: 1.3rem;">\${f.title}</h3>
              <p style="color: #ff6b35; font-size: 0.9rem; margin-bottom: 0.75rem;">\${f.titleTh}</p>
              <p style="color: #666; line-height: 1.6; margin-bottom: 0.5rem;">\${f.desc}</p>
              <p style="color: #888; font-size: 0.9rem; line-height: 1.6;">\${f.descTh}</p>
            </div>
          \`).join('')}
        </div>
      </section>

      <!-- Code Example Section -->
      <section style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem;">Simple & Intuitive</h2>
        <p style="text-align: center; color: #666; margin-bottom: 3rem;">เรียบง่ายและใช้งานง่าย</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
          <div style="background: #1a1a1a; border-radius: 12px; padding: 1.5rem; overflow: hidden;">
            <div style="color: #888; margin-bottom: 1rem; font-size: 0.9rem;">📄 app/page.tsx</div>
            <pre style="color: #e0e0e0; margin: 0; overflow-x: auto; font-size: 0.9rem;"><code>import type { PageProps } from 'oven';

export const metadata = {
  title: 'Home',
  description: 'Welcome to my app',
};

export default function Home({ searchParams }: PageProps) {
  return \\\`
    &lt;h1&gt;Hello, Oven! 🔥&lt;/h1&gt;
    &lt;p&gt;Build amazing apps with Bun&lt;/p&gt;
  \\\`;
}</code></pre>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 1.5rem; overflow: hidden;">
            <div style="color: #888; margin-bottom: 1rem; font-size: 0.9rem;">📄 app/api/users/route.ts</div>
            <pre style="color: #e0e0e0; margin: 0; overflow-x: auto; font-size: 0.9rem;"><code>// GET /api/users
export async function GET(request: Request) {
  const users = await db.users.findMany();
  return Response.json(users);
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create(body);
  return Response.json(user, { status: 201 });
}</code></pre>
          </div>
        </div>
      </section>

      <!-- Quick Start Section -->
      <section style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 4rem 2rem; margin-top: 2rem;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h2 style="color: white; font-size: 2.5rem; margin-bottom: 1rem;">Ready to Start?</h2>
          <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.2rem;">
            Get up and running in seconds
          </p>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 1.5rem; text-align: left;">
            <pre style="color: #e0e0e0; margin: 0; font-size: 1rem;"><code><span style="color: #888;"># Create a new project</span>
bunx oven create my-app

<span style="color: #888;"># Navigate to project</span>
cd my-app

<span style="color: #888;"># Start development server</span>
bun run dev

<span style="color: #888;"># Open http://localhost:3000 🚀</span></code></pre>
          </div>
        </div>
      </section>

      <!-- Project Structure Section -->
      <section style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 0.5rem;">Project Structure</h2>
        <p style="text-align: center; color: #666; margin-bottom: 3rem;">โครงสร้างโปรเจค</p>

        <div style="display: flex; justify-content: center;">
          <pre style="background: #f9f9f9; padding: 2rem; border-radius: 12px; font-size: 0.95rem; border: 1px solid #eee;">
my-app/
├── app/
│   ├── layout.tsx        <span style="color: #888;"># Root layout</span>
│   ├── page.tsx          <span style="color: #888;"># Home page (/)</span>
│   ├── loading.tsx       <span style="color: #888;"># Loading UI</span>
│   ├── error.tsx         <span style="color: #888;"># Error boundary</span>
│   ├── not-found.tsx     <span style="color: #888;"># 404 page</span>
│   │
│   ├── about/
│   │   └── page.tsx      <span style="color: #888;"># About (/about)</span>
│   │
│   ├── blog/
│   │   ├── layout.tsx    <span style="color: #888;"># Blog layout</span>
│   │   ├── page.tsx      <span style="color: #888;"># Blog list (/blog)</span>
│   │   └── [slug]/
│   │       └── page.tsx  <span style="color: #888;"># Blog post (/blog/:slug)</span>
│   │
│   ├── api/
│   │   └── users/
│   │       ├── route.ts  <span style="color: #888;"># API (/api/users)</span>
│   │       └── [id]/
│   │           └── route.ts  <span style="color: #888;"># API (/api/users/:id)</span>
│   │
│   └── (dashboard)/      <span style="color: #888;"># Route group</span>
│       ├── layout.tsx    <span style="color: #888;"># Dashboard layout</span>
│       └── dashboard/
│           └── page.tsx  <span style="color: #888;"># Dashboard (/dashboard)</span>
│
├── public/               <span style="color: #888;"># Static files</span>
├── components/           <span style="color: #888;"># Shared components</span>
└── oven.config.ts        <span style="color: #888;"># Configuration</span>
          </pre>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem; text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">Explore More</h2>
        <p style="color: #666; margin-bottom: 2rem;">สำรวจเพิ่มเติม</p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/about" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border-radius: 8px; color: #333; text-decoration: none;">📚 Documentation</a>
          <a href="/blog" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border-radius: 8px; color: #333; text-decoration: none;">📝 Blog</a>
          <a href="/dashboard" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border-radius: 8px; color: #333; text-decoration: none;">📊 Dashboard Demo</a>
          <a href="/api/hello" style="padding: 0.75rem 1.5rem; background: #f5f5f5; border-radius: 8px; color: #333; text-decoration: none;">🔌 API Demo</a>
        </div>
      </section>
    </div>
  \`;
}
