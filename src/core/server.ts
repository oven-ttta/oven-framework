import type { Oven } from './app';

/**
 * Start the Bun server
 */
export async function serve(app: Oven, port: number): Promise<void> {
  const config = app.getConfig();

  const server = Bun.serve({
    port,
    development: config.dev,

    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url);

      // Try to serve static files from public directory
      if (config.publicDir) {
        const staticResponse = await serveStatic(url.pathname, config.publicDir);
        if (staticResponse) {
          return staticResponse;
        }
      }

      // Handle the request through the app
      return app.handle(req);
    },

    error(error: Error): Response {
      console.error('Server error:', error);
      return new Response('Internal Server Error', { status: 500 });
    },
  });

  console.log(`
  🔥 Oven is ready!

  ➜ Local:   http://localhost:${server.port}
  ➜ Network: http://${getNetworkAddress()}:${server.port}

  ${config.dev ? '🛠️  Development mode enabled' : '🚀 Production mode'}
  `);
}

/**
 * Serve static files from a directory
 */
async function serveStatic(
  pathname: string,
  publicDir: string
): Promise<Response | null> {
  // Security: prevent directory traversal
  if (pathname.includes('..')) {
    return null;
  }

  const filePath = `${publicDir}${pathname}`;

  try {
    const file = Bun.file(filePath);
    const exists = await file.exists();

    if (exists) {
      return new Response(file, {
        headers: {
          'Content-Type': file.type,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch {
    // File doesn't exist or can't be read
  }

  return null;
}

/**
 * Get the network address for display
 */
function getNetworkAddress(): string {
  try {
    // This is a simplified version - in production you'd want to use os.networkInterfaces()
    return '0.0.0.0';
  } catch {
    return 'localhost';
  }
}

/**
 * Hot reload support for development
 */
export class HotReloader {
  private watchers: Map<string, ReturnType<typeof Bun.spawn>> = new Map();

  async watch(dirs: string[], onChange: () => void): Promise<void> {
    for (const dir of dirs) {
      // Use Bun's file watcher
      const watcher = Bun.spawn(['bun', 'run', '--watch', dir], {
        onExit: () => {
          onChange();
        },
      });

      this.watchers.set(dir, watcher);
    }
  }

  stop(): void {
    for (const watcher of this.watchers.values()) {
      watcher.kill();
    }
    this.watchers.clear();
  }
}
