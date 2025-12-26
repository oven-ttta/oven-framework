import type { LayoutProps } from '../../src/types';

// Route group layout - URL won't include (dashboard)
export default function DashboardLayout({ children }: LayoutProps) {
  return `
    <div style="display: flex; min-height: calc(100vh - 140px);">
      <aside style="
        width: 250px;
        background: #1a1a1a;
        padding: 2rem 1rem;
      ">
        <h3 style="color: #ff6b35; margin-bottom: 1.5rem; padding: 0 1rem;">Dashboard</h3>
        <nav>
          <a href="/dashboard" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #888;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            📊 Overview
          </a>
          <a href="/dashboard/analytics" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #888;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            📈 Analytics
          </a>
          <a href="/dashboard/settings" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #888;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            ⚙️ Settings
          </a>
          <a href="/dashboard/users" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #888;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            👥 Users
          </a>
        </nav>
      </aside>

      <main style="flex: 1; padding: 2rem; background: #f5f5f5;">
        ${children}
      </main>

      <style>
        aside a:hover {
          background: #2a2a2a;
          color: #fff;
        }
      </style>
    </div>
  `;
}
