/**
 * Static Site Generator for Vercel deployment
 * Pre-renders all pages to static HTML
 */

import { AppRouter } from '../src/core/app-router';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const OUTPUT_DIR = 'dist';

// Define routes to pre-render
const routes = [
  '/',
  '/about',
  '/blog',
  '/dashboard',
  '/dashboard/analytics',
  '/dashboard/users',
  '/dashboard/settings',
];

async function build() {
  console.log('🔥 Building Oven for Vercel...\n');

  // Use relative path for app directory
  const appRouter = new AppRouter('app');
  const router = await appRouter.scan();

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const route of routes) {
    try {
      // Create a mock request
      const url = new URL(route, 'http://localhost:3000');
      const request = new Request(url.toString());

      // Match and execute route
      const match = router.match('GET', route);

      if (match) {
        const context = {
          req: request,
          params: match.params,
          searchParams: Object.fromEntries(url.searchParams),
        };

        // Handler is on match.route.handler
        const response = await match.route.handler(context);
        const html = await response.text();

        // Create directory structure
        let outputPath = route === '/' ? '/index' : route;
        const dir = join(OUTPUT_DIR, outputPath.split('/').slice(0, -1).join('/'));
        await mkdir(dir, { recursive: true });

        // Write HTML file
        const filePath = join(OUTPUT_DIR, `${outputPath}.html`);
        await writeFile(filePath, html);
        console.log(`  ✓ ${route} -> ${filePath}`);
      } else {
        console.log(`  ⚠ ${route}: No matching route found`);
      }
    } catch (error) {
      console.error(`  ✗ ${route}: ${error}`);
    }
  }

  console.log('\n✨ Build complete!');
  console.log(`📦 Output: ${OUTPUT_DIR}/`);
}

build().catch(console.error);
