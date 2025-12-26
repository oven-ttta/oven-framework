import type { PageProps, Metadata } from '../../src/types';

export const metadata: Metadata = {
  title: 'About Oven Framework',
  description: 'Learn about Oven - A Next.js-style full-stack web framework powered by Bun. Fast, modern, and developer-friendly.',
};

export default function AboutPage({ params }: PageProps) {
  const fileConventions = [
    { file: 'layout.tsx', purpose: 'Shared UI wrapper for pages', purposeTh: 'UI wrapper ที่ใช้ร่วมกัน' },
    { file: 'page.tsx', purpose: 'Page component for a route', purposeTh: 'Component หน้าเว็บ' },
    { file: 'loading.tsx', purpose: 'Loading UI while page loads', purposeTh: 'UI แสดงขณะโหลด' },
    { file: 'error.tsx', purpose: 'Error boundary for the segment', purposeTh: 'จัดการ error' },
    { file: 'not-found.tsx', purpose: 'Custom 404 page', purposeTh: 'หน้า 404' },
    { file: 'route.ts', purpose: 'API route handler', purposeTh: 'API endpoint' },
  ];

  const timeline = [
    { version: '0.1.0', date: 'Dec 2024', title: 'Initial Release', desc: 'First public release with core features' },
    { version: '0.2.0', date: 'Coming Soon', title: 'React Support', desc: 'JSX/TSX components with React' },
    { version: '0.3.0', date: 'Planned', title: 'Edge Runtime', desc: 'Deploy to edge with Cloudflare Workers' },
    { version: '1.0.0', date: 'Planned', title: 'Stable Release', desc: 'Production-ready with full features' },
  ];

  const comparison = [
    { feature: 'Runtime', oven: 'Bun', next: 'Node.js', speed: '4x faster' },
    { feature: 'Cold Start', oven: '~0ms', next: '~200ms', speed: '∞ faster' },
    { feature: 'Install Time', oven: '~1s', next: '~30s', speed: '30x faster' },
    { feature: 'TypeScript', oven: 'Native', next: 'Compiled', speed: 'Instant' },
    { feature: 'Bundle Size', oven: 'Smaller', next: 'Larger', speed: '~40% less' },
  ];

  return `
    <div style="max-width: 1000px; margin: 0 auto; padding: 4rem 2rem;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff6b35, #f7931e); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          About Oven 🔥
        </h1>
        <p style="font-size: 1.3rem; color: #666; max-width: 700px; margin: 0 auto;">
          A Next.js-style full-stack web framework built for the Bun runtime
        </p>
        <p style="color: #888; margin-top: 0.5rem;">
          เฟรมเวิร์ค Full-stack สไตล์ Next.js สร้างมาสำหรับ Bun โดยเฉพาะ
        </p>
      </div>

      <!-- Why Oven Section -->
      <section style="margin-bottom: 4rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem; font-size: 2rem;">Why Oven? ทำไมต้อง Oven?</h2>

        <div style="display: grid; gap: 1rem;">
          <div style="background: linear-gradient(135deg, #fff5f2, #ffffff); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ff6b35;">
            <h3 style="margin-bottom: 0.5rem;">🚀 Built for Bun</h3>
            <p style="color: #666; margin-bottom: 0.5rem;">Takes full advantage of Bun's native speed - up to 4x faster than Node.js</p>
            <p style="color: #888; font-size: 0.9rem;">ใช้ประโยชน์จากความเร็วของ Bun อย่างเต็มที่ - เร็วกว่า Node.js ถึง 4 เท่า</p>
          </div>

          <div style="background: linear-gradient(135deg, #fff5f2, #ffffff); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ff6b35;">
            <h3 style="margin-bottom: 0.5rem;">📁 Familiar DX</h3>
            <p style="color: #666; margin-bottom: 0.5rem;">Next.js App Router conventions you already know and love</p>
            <p style="color: #888; font-size: 0.9rem;">รูปแบบ App Router แบบ Next.js ที่คุณคุ้นเคยและชื่นชอบ</p>
          </div>

          <div style="background: linear-gradient(135deg, #fff5f2, #ffffff); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ff6b35;">
            <h3 style="margin-bottom: 0.5rem;">📦 Zero Config</h3>
            <p style="color: #666; margin-bottom: 0.5rem;">Start building immediately - no complex configuration needed</p>
            <p style="color: #888; font-size: 0.9rem;">เริ่มสร้างได้ทันที ไม่ต้องตั้งค่าซับซ้อน</p>
          </div>

          <div style="background: linear-gradient(135deg, #fff5f2, #ffffff); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ff6b35;">
            <h3 style="margin-bottom: 0.5rem;">🔒 Type Safe</h3>
            <p style="color: #666; margin-bottom: 0.5rem;">First-class TypeScript support with full type inference</p>
            <p style="color: #888; font-size: 0.9rem;">รองรับ TypeScript อย่างเต็มรูปแบบพร้อม type inference</p>
          </div>
        </div>
      </section>

      <!-- Comparison Table -->
      <section style="margin-bottom: 4rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem; font-size: 2rem;">Oven vs Next.js</h2>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <thead>
              <tr style="background: linear-gradient(135deg, #ff6b35, #f7931e);">
                <th style="padding: 1rem; text-align: left; color: white;">Feature</th>
                <th style="padding: 1rem; text-align: center; color: white;">Oven 🔥</th>
                <th style="padding: 1rem; text-align: center; color: white;">Next.js</th>
                <th style="padding: 1rem; text-align: center; color: white;">Difference</th>
              </tr>
            </thead>
            <tbody>
              ${comparison.map((row, i) => `
                <tr style="border-bottom: 1px solid #eee; background: ${i % 2 === 0 ? '#fafafa' : 'white'};">
                  <td style="padding: 1rem; font-weight: 500;">${row.feature}</td>
                  <td style="padding: 1rem; text-align: center; color: #22c55e; font-weight: 600;">${row.oven}</td>
                  <td style="padding: 1rem; text-align: center; color: #666;">${row.next}</td>
                  <td style="padding: 1rem; text-align: center; color: #ff6b35; font-weight: 500;">${row.speed}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- File Conventions -->
      <section style="margin-bottom: 4rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem; font-size: 2rem;">File Conventions</h2>
        <p style="color: #666; margin-bottom: 1.5rem;">รูปแบบไฟล์ที่รองรับ</p>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <thead>
              <tr style="background: #1a1a1a;">
                <th style="padding: 1rem; text-align: left; color: white;">File</th>
                <th style="padding: 1rem; text-align: left; color: white;">Purpose</th>
                <th style="padding: 1rem; text-align: left; color: white;">คำอธิบาย</th>
              </tr>
            </thead>
            <tbody>
              ${fileConventions.map((row, i) => `
                <tr style="border-bottom: 1px solid #eee; background: ${i % 2 === 0 ? '#fafafa' : 'white'};">
                  <td style="padding: 1rem;"><code style="background: #f0f0f0; padding: 0.25rem 0.5rem; border-radius: 4px; color: #ff6b35;">${row.file}</code></td>
                  <td style="padding: 1rem; color: #333;">${row.purpose}</td>
                  <td style="padding: 1rem; color: #666;">${row.purposeTh}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Roadmap -->
      <section style="margin-bottom: 4rem;">
        <h2 style="color: #ff6b35; margin-bottom: 1.5rem; font-size: 2rem;">Roadmap</h2>
        <p style="color: #666; margin-bottom: 1.5rem;">แผนการพัฒนา</p>

        <div style="position: relative; padding-left: 2rem; border-left: 3px solid #ff6b35;">
          ${timeline.map((item, i) => `
            <div style="margin-bottom: 2rem; position: relative;">
              <div style="
                position: absolute;
                left: -2.65rem;
                width: 1.25rem;
                height: 1.25rem;
                background: ${i === 0 ? '#ff6b35' : '#ddd'};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              "></div>
              <div style="background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="
                    background: ${i === 0 ? '#ff6b35' : '#666'};
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 999px;
                    font-size: 0.85rem;
                    font-weight: 600;
                  ">v${item.version}</span>
                  <span style="color: #888; font-size: 0.9rem;">${item.date}</span>
                </div>
                <h3 style="margin-bottom: 0.25rem;">${item.title}</h3>
                <p style="color: #666; margin: 0;">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Getting Started -->
      <section style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 2.5rem; border-radius: 16px; text-align: center;">
        <h2 style="color: white; margin-bottom: 1rem;">Ready to Get Started?</h2>
        <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">พร้อมเริ่มต้นหรือยัง?</p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/" style="
            background: white;
            color: #ff6b35;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          ">← Back to Home</a>
          <a href="/blog" style="
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          ">Read Blog →</a>
        </div>
      </section>
    </div>
  `;
}
