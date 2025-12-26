import type { LayoutProps, Metadata } from '../src/types';

export const metadata: Metadata = {
  title: {
    default: 'Oven App',
    template: '%s | Oven',
  },
  description: 'A full-stack web framework powered by Bun',
  keywords: ['bun', 'framework', 'fullstack', 'ssr'],
  themeColor: '#ff6b35',
};

export default function RootLayout({ children }: LayoutProps) {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Share+Tech&display=swap" rel="stylesheet">

    <div id="__oven">
      <nav style="
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      ">
        <a href="/" style="color: white; text-decoration: none; font-size: 1.5rem; font-weight: bold;">
          🔥 Oven
        </a>
        <div style="display: flex; gap: 1.5rem;">
          <a href="/" style="color: white; text-decoration: none;">Home</a>
          <a href="/docs" style="color: white; text-decoration: none;">Docs</a>
          <a href="/about" style="color: white; text-decoration: none;">About</a>
          <a href="/blog" style="color: white; text-decoration: none;">Blog</a>
          <a href="/dashboard" style="color: white; text-decoration: none;">Dashboard</a>
        </div>
      </nav>
      <main style="min-height: calc(100vh - 140px);">
        ${children}
      </main>
      <footer style="
        background: #1a1a1a;
        color: #888;
        padding: 2rem;
        text-align: center;
      ">
        <p>Built with 🔥 Oven Framework - Powered by Bun</p>
      </footer>
    </div>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Share+Tech&display=swap');

      * { margin: 0; padding: 0; box-sizing: border-box; }

      body {
        font-family: 'Share Tech', 'Prompt', system-ui, -apple-system, sans-serif;
      }

      /* Thai text uses Prompt font */
      :lang(th),
      [lang="th"],
      .th {
        font-family: 'Prompt', sans-serif;
      }

      /* Apply Prompt for Thai unicode range */
      @font-face {
        font-family: 'OvenFont';
        src: local('Prompt');
        unicode-range: U+0E00-U+0E7F; /* Thai */
      }

      @font-face {
        font-family: 'OvenFont';
        src: local('Share Tech');
        unicode-range: U+0000-U+00FF, U+0100-U+017F; /* Latin */
      }

      body {
        font-family: 'OvenFont', 'Share Tech', 'Prompt', sans-serif;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Share Tech', 'Prompt', sans-serif;
        font-weight: 600;
      }

      a:hover { opacity: 0.8; }

      code, pre {
        font-family: 'Share Tech Mono', 'Fira Code', monospace;
      }
    </style>
  `;
}
