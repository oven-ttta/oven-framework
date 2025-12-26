/**
 * Oven Server
 * Powered by Bun
 */

const PORT = parseInt(process.env.PORT || '3000');
const isDev = process.env.NODE_ENV !== 'production';

const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

// Routes map
const routes = new Map();

async function scanRoutes() {
  const appDir = './app';

  // Scan for page files
  const glob = new Bun.Glob('**/page.{tsx,jsx,ts,js}');

  for await (const file of glob.scan({ cwd: appDir })) {
    const routePath = '/' + file
      .replace(/\/page\.(tsx|jsx|ts|js)$/, '')
      .replace(/^page\.(tsx|jsx|ts|js)$/, '')
      .replace(/\/$/, '') || '/';

    const normalizedPath = routePath === '' ? '/' : routePath;

    routes.set(normalizedPath, async (req) => {
      try {
        const module = await import(`${process.cwd()}/${appDir}/${file}`);
        const content = await module.default();

        // Wrap with layout
        let html = content;
        try {
          const layoutPath = `${process.cwd()}/${appDir}/layout.tsx`;
          const layout = await import(layoutPath);
          html = await layout.default({ children: content });
        } catch (e) {
          // Try .js extension
          try {
            const layoutPath = `${process.cwd()}/${appDir}/layout.js`;
            const layout = await import(layoutPath);
            html = await layout.default({ children: content });
          } catch {}
        }

        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      } catch (error) {
        console.error('Page error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    });
  }
}

async function main() {
  const start = Date.now();

  await scanRoutes();

  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      // Remove trailing slash
      if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }

      // Check routes
      const handler = routes.get(pathname);
      if (handler) {
        return handler(req);
      }

      // Static files from public
      const publicPath = './public' + pathname;
      const file = Bun.file(publicPath);
      if (await file.exists()) {
        return new Response(file);
      }

      // 404
      return new Response('Not Found', { status: 404 });
    },
  });

  console.log(`
  ${c.green}▲${c.reset} Ready in ${Date.now() - start}ms

  ${c.dim}➜${c.reset}  Local:   ${c.cyan}http://localhost:${PORT}${c.reset}
  `);
}

main().catch(console.error);
