import type { PageProps, Metadata } from '../../src/types';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news and tutorials from the Oven team',
};

const posts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Oven',
    excerpt: 'Learn how to create your first Oven application from scratch.',
    date: '2024-01-15',
    category: 'tutorials',
  },
  {
    slug: 'api-routes',
    title: 'Building API Routes in Oven',
    excerpt: 'Create powerful API endpoints using route.ts files.',
    date: '2024-01-12',
    category: 'tutorials',
  },
  {
    slug: 'layouts',
    title: 'Understanding Nested Layouts',
    excerpt: 'Master the art of composing UIs with nested layouts.',
    date: '2024-01-10',
    category: 'tutorials',
  },
  {
    slug: 'bun-performance',
    title: 'Why Bun Makes Oven Fast',
    excerpt: 'Discover how Bun runtime powers Oven\'s performance.',
    date: '2024-01-08',
    category: 'news',
  },
];

export default function BlogPage({ searchParams }: PageProps) {
  const category = searchParams.category;
  const filteredPosts = category
    ? posts.filter(p => p.category === category)
    : posts;

  return `
    <div>
      <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Blog</h1>
      <p style="color: #666; margin-bottom: 2rem;">
        Latest news, tutorials, and tips from the Oven team
      </p>

      ${category ? `
        <div style="margin-bottom: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
          Filtering by: <strong>${category}</strong>
          <a href="/blog" style="margin-left: 1rem; color: #ff6b35;">Clear filter</a>
        </div>
      ` : ''}

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${filteredPosts.map(post => `
          <article style="
            background: white;
            border: 1px solid #eee;
            border-radius: 12px;
            padding: 1.5rem;
            transition: box-shadow 0.2s;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="
                background: #ff6b35;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 999px;
                font-size: 0.8rem;
              ">${post.category}</span>
              <time style="color: #888; font-size: 0.9rem;">${post.date}</time>
            </div>
            <h2 style="margin-bottom: 0.5rem;">
              <a href="/blog/${post.slug}" style="color: #333; text-decoration: none;">
                ${post.title}
              </a>
            </h2>
            <p style="color: #666; line-height: 1.6;">${post.excerpt}</p>
            <a href="/blog/${post.slug}" style="
              color: #ff6b35;
              text-decoration: none;
              font-weight: 500;
              display: inline-block;
              margin-top: 1rem;
            ">
              Read more →
            </a>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}
