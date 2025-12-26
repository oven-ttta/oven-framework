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
            color: #ccc;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            📊 Overview / ภาพรวม
          </a>
          <a href="/dashboard/analytics" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #ccc;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            📈 Analytics / วิเคราะห์
          </a>
          <a href="/dashboard/users" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #ccc;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            👥 Users / ผู้ใช้
          </a>
          <a href="/dashboard/settings" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #ccc;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 0.25rem;
          ">
            ⚙️ Settings / ตั้งค่า
          </a>
        </nav>

        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #333;">
          <a href="/" style="
            display: block;
            padding: 0.75rem 1rem;
            color: #ff6b35;
            text-decoration: none;
            border-radius: 8px;
          ">
            ← Back to Home
          </a>
        </div>
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
