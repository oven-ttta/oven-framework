import type { PageProps, Metadata } from '../../../src/types';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Oven dashboard overview',
};

export default function DashboardPage({ params }: PageProps) {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Page Views', value: '45,678', change: '+8%', icon: '👁️' },
    { label: 'Revenue', value: '$12,345', change: '+23%', icon: '💰' },
    { label: 'Active Sessions', value: '567', change: '+5%', icon: '🔥' },
  ];

  return `
    <div>
      <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">Dashboard Overview</h1>
      <p style="color: #666; margin-bottom: 2rem;">Welcome back! Here's what's happening.</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        ${stats.map(stat => `
          <div style="
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          ">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${stat.icon}</div>
            <div style="font-size: 2rem; font-weight: bold; color: #333;">${stat.value}</div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
              <span style="color: #666;">${stat.label}</span>
              <span style="color: #22c55e;">${stat.change}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 1rem;">Recent Activity</h2>
          <div style="border-left: 2px solid #ff6b35; padding-left: 1rem;">
            <div style="margin-bottom: 1rem;">
              <div style="color: #333;">New user registered</div>
              <div style="color: #888; font-size: 0.9rem;">2 minutes ago</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="color: #333;">Payment received</div>
              <div style="color: #888; font-size: 0.9rem;">15 minutes ago</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="color: #333;">New blog post published</div>
              <div style="color: #888; font-size: 0.9rem;">1 hour ago</div>
            </div>
            <div>
              <div style="color: #333;">Server deployed</div>
              <div style="color: #888; font-size: 0.9rem;">3 hours ago</div>
            </div>
          </div>
        </div>

        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 1rem;">Quick Actions</h2>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="/dashboard/users" style="
              display: block;
              padding: 0.75rem 1rem;
              background: #f5f5f5;
              border-radius: 8px;
              color: #333;
              text-decoration: none;
            ">
              Add New User
            </a>
            <a href="/dashboard/analytics" style="
              display: block;
              padding: 0.75rem 1rem;
              background: #f5f5f5;
              border-radius: 8px;
              color: #333;
              text-decoration: none;
            ">
              View Analytics
            </a>
            <a href="/dashboard/settings" style="
              display: block;
              padding: 0.75rem 1rem;
              background: #f5f5f5;
              border-radius: 8px;
              color: #333;
              text-decoration: none;
            ">
              Update Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
