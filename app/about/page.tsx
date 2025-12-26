import type { PageProps, Metadata } from '../../src/types';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Oven Framework',
};

export default function AboutPage({ params }: PageProps) {
  return `
    <div style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
      <h1 style="font-size: 3rem; margin-bottom: 2rem;">About Oven 🔥</h1>

      <section style="margin-bottom: 3rem;">
        <p style="font-size: 1.2rem; color: #555; line-height: 1.8; margin-bottom: 1.5rem;">
          Oven is a full-stack web framework designed specifically for the Bun runtime.
          It brings the familiar Next.js App Router experience to Bun, giving you the
          best of both worlds - the developer experience you love with the blazing
          fast performance of Bun.
        </p>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem;">Why Oven?</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>🚀 Built for Bun</strong> - Takes full advantage of Bun's native speed
          </li>
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>📁 App Router</strong> - Next.js-style file-based routing
          </li>
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>🎨 Layouts</strong> - Nested layouts with shared UI
          </li>
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>⚡ Loading States</strong> - Built-in loading UI support
          </li>
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>🔌 API Routes</strong> - Create APIs with route.ts
          </li>
          <li style="padding: 1rem; background: #f9f9f9; border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>📦 TypeScript</strong> - First-class TypeScript support
          </li>
        </ul>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem;">File Conventions</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #ff6b35; color: white;">
              <th style="padding: 1rem; text-align: left;">File</th>
              <th style="padding: 1rem; text-align: left;">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 1rem;"><code>layout.tsx</code></td>
              <td style="padding: 1rem;">Shared UI wrapper for pages</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 1rem;"><code>page.tsx</code></td>
              <td style="padding: 1rem;">Page component for a route</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 1rem;"><code>loading.tsx</code></td>
              <td style="padding: 1rem;">Loading UI for the segment</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 1rem;"><code>error.tsx</code></td>
              <td style="padding: 1rem;">Error UI for the segment</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 1rem;"><code>not-found.tsx</code></td>
              <td style="padding: 1rem;">Custom 404 page</td>
            </tr>
            <tr>
              <td style="padding: 1rem;"><code>route.ts</code></td>
              <td style="padding: 1rem;">API route handler</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div style="text-align: center; margin-top: 3rem;">
        <a href="/" style="
          background: #ff6b35;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          display: inline-block;
        ">
          ← Back to Home
        </a>
      </div>
    </div>
  `;
}
