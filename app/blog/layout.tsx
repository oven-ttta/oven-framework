import type { LayoutProps, Metadata } from '../../src/types';

export const metadata: Metadata = {
  title: {
    template: '%s | Oven Blog',
    default: 'Blog',
  },
};

export default function BlogLayout({ children }: LayoutProps) {
  return `
    <div style="display: flex; max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <aside style="
        width: 250px;
        padding-right: 2rem;
        border-right: 1px solid #eee;
      ">
        <h3 style="color: #ff6b35; margin-bottom: 1rem;">Blog Categories</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog" style="color: #555; text-decoration: none;">All Posts</a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog?category=tutorials" style="color: #555; text-decoration: none;">Tutorials</a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog?category=news" style="color: #555; text-decoration: none;">News</a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog?category=tips" style="color: #555; text-decoration: none;">Tips & Tricks</a>
          </li>
        </ul>

        <h3 style="color: #ff6b35; margin: 2rem 0 1rem;">Recent Posts</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog/getting-started" style="color: #555; text-decoration: none; font-size: 0.9rem;">
              Getting Started with Oven
            </a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog/api-routes" style="color: #555; text-decoration: none; font-size: 0.9rem;">
              Building API Routes
            </a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="/blog/layouts" style="color: #555; text-decoration: none; font-size: 0.9rem;">
              Understanding Layouts
            </a>
          </li>
        </ul>
      </aside>

      <main style="flex: 1; padding-left: 2rem;">
        ${children}
      </main>
    </div>
  `;
}
