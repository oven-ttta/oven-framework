import type { PageProps, Metadata } from '../../../../src/types';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'View your application analytics and insights',
};

export default function AnalyticsPage({ params }: PageProps) {
  const chartData = [
    { month: 'Jan', visitors: 4500, pageViews: 12000, bounceRate: 45 },
    { month: 'Feb', visitors: 5200, pageViews: 14500, bounceRate: 42 },
    { month: 'Mar', visitors: 6100, pageViews: 17800, bounceRate: 38 },
    { month: 'Apr', visitors: 5800, pageViews: 16200, bounceRate: 40 },
    { month: 'May', visitors: 7200, pageViews: 21000, bounceRate: 35 },
    { month: 'Jun', visitors: 8500, pageViews: 25600, bounceRate: 32 },
  ];

  const topPages = [
    { path: '/', views: 45200, avgTime: '2:34' },
    { path: '/about', views: 12800, avgTime: '1:45' },
    { path: '/blog', views: 9600, avgTime: '3:12' },
    { path: '/dashboard', views: 7400, avgTime: '4:56' },
    { path: '/api/hello', views: 5200, avgTime: '0:05' },
  ];

  const sources = [
    { name: 'Google', visitors: 12500, percent: 45 },
    { name: 'Direct', visitors: 8300, percent: 30 },
    { name: 'Twitter', visitors: 3600, percent: 13 },
    { name: 'GitHub', visitors: 2200, percent: 8 },
    { name: 'Other', visitors: 1100, percent: 4 },
  ];

  const maxVisitors = Math.max(...chartData.map(d => d.visitors));

  return \`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 0.25rem;">Analytics</h1>
          <p style="color: #666;">การวิเคราะห์ข้อมูล</p>
        </div>
        <select style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: white;">
          <option>Last 6 months</option>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>

      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="color: #888; font-size: 0.9rem; margin-bottom: 0.5rem;">Total Visitors</div>
          <div style="font-size: 2rem; font-weight: bold; color: #333;">37,300</div>
          <div style="color: #22c55e; font-size: 0.9rem;">↑ 12.5% vs last period</div>
        </div>
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="color: #888; font-size: 0.9rem; margin-bottom: 0.5rem;">Page Views</div>
          <div style="font-size: 2rem; font-weight: bold; color: #333;">107,100</div>
          <div style="color: #22c55e; font-size: 0.9rem;">↑ 18.3% vs last period</div>
        </div>
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="color: #888; font-size: 0.9rem; margin-bottom: 0.5rem;">Avg. Session</div>
          <div style="font-size: 2rem; font-weight: bold; color: #333;">2:48</div>
          <div style="color: #22c55e; font-size: 0.9rem;">↑ 5.2% vs last period</div>
        </div>
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="color: #888; font-size: 0.9rem; margin-bottom: 0.5rem;">Bounce Rate</div>
          <div style="font-size: 2rem; font-weight: bold; color: #333;">38.5%</div>
          <div style="color: #22c55e; font-size: 0.9rem;">↓ 3.1% vs last period</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <!-- Visitors Chart -->
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h3 style="margin-bottom: 1.5rem;">Visitors Overview</h3>
          <div style="display: flex; align-items: flex-end; gap: 1rem; height: 200px;">
            \${chartData.map(d => \`
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                <div style="
                  width: 100%;
                  height: \${(d.visitors / maxVisitors) * 180}px;
                  background: linear-gradient(180deg, #ff6b35, #f7931e);
                  border-radius: 8px 8px 0 0;
                  transition: height 0.3s;
                "></div>
                <div style="color: #666; font-size: 0.8rem; margin-top: 0.5rem;">\${d.month}</div>
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Traffic Sources -->
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h3 style="margin-bottom: 1.5rem;">Traffic Sources</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            \${sources.map(s => \`
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span style="color: #333;">\${s.name}</span>
                  <span style="color: #666;">\${s.percent}%</span>
                </div>
                <div style="background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #ff6b35, #f7931e); height: 100%; width: \${s.percent}%; border-radius: 4px;"></div>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      </div>

      <!-- Top Pages Table -->
      <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1.5rem;">Top Pages</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #f0f0f0;">
              <th style="text-align: left; padding: 1rem; color: #888; font-weight: 500;">Page</th>
              <th style="text-align: right; padding: 1rem; color: #888; font-weight: 500;">Views</th>
              <th style="text-align: right; padding: 1rem; color: #888; font-weight: 500;">Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            \${topPages.map((page, i) => \`
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 1rem;">
                  <code style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 4px;">\${page.path}</code>
                </td>
                <td style="padding: 1rem; text-align: right; font-weight: 500;">\${page.views.toLocaleString()}</td>
                <td style="padding: 1rem; text-align: right; color: #666;">\${page.avgTime}</td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`;
}
