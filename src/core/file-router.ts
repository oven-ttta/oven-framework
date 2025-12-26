import type { Context, PageModule, RouteHandler } from '../types';
import { Router } from './router';
import { renderHTML } from './render';
import { html } from './route';

/**
 * File-based router that scans directories for route files
 * Supports Next.js-style file routing:
 * - pages/index.ts -> /
 * - pages/about.ts -> /about
 * - pages/users/[id].ts -> /users/:id
 * - pages/blog/[...slug].ts -> /blog/*
 */
export class FileRouter {
  private router: Router;
  private pagesDir: string;
  private apiDir: string;

  constructor(pagesDir: string = 'pages', apiDir: string = 'api') {
    this.router = new Router();
    this.pagesDir = pagesDir;
    this.apiDir = apiDir;
  }

  /**
   * Scan and register all routes from the file system
   */
  async scan(): Promise<Router> {
    await this.scanPages();
    await this.scanAPI();
    return this.router;
  }

  /**
   * Scan pages directory for page routes
   */
  private async scanPages(): Promise<void> {
    const glob = new Bun.Glob('**/*.{ts,tsx,js,jsx}');

    try {
      for await (const file of glob.scan({ cwd: this.pagesDir })) {
        // Skip files starting with _ or .
        if (file.startsWith('_') || file.startsWith('.')) {
          continue;
        }

        const routePath = this.fileToRoute(file);
        const filePath = `${this.pagesDir}/${file}`;

        this.router.add('GET', routePath, await this.createPageHandler(filePath));
      }
    } catch (error) {
      // Pages directory doesn't exist - that's okay
      console.log(`No pages directory found at: ${this.pagesDir}`);
    }
  }

  /**
   * Scan API directory for API routes
   */
  private async scanAPI(): Promise<void> {
    const glob = new Bun.Glob('**/*.{ts,js}');

    try {
      for await (const file of glob.scan({ cwd: this.apiDir })) {
        // Skip files starting with _ or .
        if (file.startsWith('_') || file.startsWith('.')) {
          continue;
        }

        const routePath = '/api' + this.fileToRoute(file);
        const filePath = `${this.apiDir}/${file}`;

        await this.registerAPIRoute(routePath, filePath);
      }
    } catch (error) {
      // API directory doesn't exist - that's okay
      console.log(`No API directory found at: ${this.apiDir}`);
    }
  }

  /**
   * Convert a file path to a route path
   */
  private fileToRoute(file: string): string {
    let route = '/' + file
      // Remove extension
      .replace(/\.(ts|tsx|js|jsx)$/, '')
      // Convert index to /
      .replace(/\/index$/, '')
      .replace(/^index$/, '')
      // Convert [param] to :param
      .replace(/\[\.\.\.(\w+)\]/g, '*')
      .replace(/\[(\w+)\]/g, ':$1');

    // Ensure route starts with /
    if (!route.startsWith('/')) {
      route = '/' + route;
    }

    // Handle root index
    if (route === '') {
      route = '/';
    }

    return route;
  }

  /**
   * Create a page handler from a file path
   */
  private async createPageHandler(filePath: string): Promise<RouteHandler> {
    return async (ctx: Context): Promise<Response> => {
      try {
        // Dynamic import the page module
        const module: PageModule = await import(
          Bun.resolveSync('./' + filePath, process.cwd())
        );

        // Run loader if present
        let data = {};
        if (module.loader) {
          data = await module.loader(ctx);
        }

        // Render the page
        const content = await module.default({
          params: ctx.params,
          query: ctx.query,
          data,
        });

        const htmlContent = renderHTML(content, {
          meta: module.meta,
        });

        return html(htmlContent);
      } catch (error) {
        console.error(`Error rendering page ${filePath}:`, error);
        return new Response('Internal Server Error', { status: 500 });
      }
    };
  }

  /**
   * Register API routes from a file
   */
  private async registerAPIRoute(routePath: string, filePath: string): Promise<void> {
    try {
      const module = await import(
        Bun.resolveSync('./' + filePath, process.cwd())
      );

      // Support both default export and method exports
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

      for (const method of methods) {
        const handler = module[method] || (method === 'GET' && module.default);

        if (handler) {
          this.router.add(method, routePath, async (ctx: Context) => {
            const result = await handler(ctx);

            if (result instanceof Response) {
              return result;
            }

            return Response.json(result);
          });
        }
      }
    } catch (error) {
      console.error(`Error loading API route ${filePath}:`, error);
    }
  }

  /**
   * Get the router instance
   */
  getRouter(): Router {
    return this.router;
  }
}

/**
 * Create a file router and scan for routes
 */
export async function createFileRouter(
  pagesDir?: string,
  apiDir?: string
): Promise<Router> {
  const fileRouter = new FileRouter(pagesDir, apiDir);
  return await fileRouter.scan();
}
