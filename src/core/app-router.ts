import type {
  Context,
  RouteHandler,
  PageModule,
  LayoutModule,
  LoadingModule,
  ErrorModule,
  NotFoundModule,
  RouteModule,
  Metadata,
  PageProps,
  LayoutProps,
} from '../types';
import { Router } from './router';
import { generateMetaTags } from './metadata';

interface RouteSegment {
  path: string;
  type: 'static' | 'dynamic' | 'catch-all' | 'optional-catch-all' | 'group';
  paramName?: string;
}

interface AppRoute {
  segments: RouteSegment[];
  page?: string;
  layout?: string;
  loading?: string;
  error?: string;
  notFound?: string;
  route?: string; // API route
}

/**
 * Next.js App Router style file-based router
 */
export class AppRouter {
  private router: Router;
  private appDir: string;
  private routes: Map<string, AppRoute> = new Map();
  private layouts: Map<string, LayoutModule> = new Map();

  constructor(appDir: string = 'app') {
    this.router = new Router();
    this.appDir = appDir;
  }

  /**
   * Scan the app directory and build routes
   */
  async scan(): Promise<Router> {
    await this.scanDirectory(this.appDir, []);
    return this.router;
  }

  /**
   * Recursively scan directory for route files
   */
  private async scanDirectory(dir: string, parentSegments: RouteSegment[]): Promise<void> {
    const glob = new Bun.Glob('*');

    try {
      const entries: string[] = [];
      for await (const entry of glob.scan({ cwd: dir, onlyFiles: false })) {
        entries.push(entry);
      }

      // Sort to ensure consistent ordering
      entries.sort();

      for (const entry of entries) {
        const fullPath = `${dir}/${entry}`;

        // Check if it's a directory
        const isDir = await this.isDirectory(fullPath);

        if (isDir) {
          // Parse directory name for route segment
          const segment = this.parseSegment(entry);

          // Skip route groups from URL path but continue scanning
          if (segment.type === 'group') {
            await this.scanDirectory(fullPath, parentSegments);
          } else {
            await this.scanDirectory(fullPath, [...parentSegments, segment]);
          }
        } else {
          // Handle route files
          await this.handleRouteFile(dir, entry, parentSegments);
        }
      }
    } catch (error) {
      // Directory doesn't exist
      console.log(`App directory not found: ${dir}`);
    }
  }

  /**
   * Check if path is a directory
   */
  private async isDirectory(path: string): Promise<boolean> {
    try {
      const file = Bun.file(path);
      // If we can't get size, it might be a directory
      await file.text();
      return false;
    } catch {
      return true;
    }
  }

  /**
   * Parse a directory segment name
   */
  private parseSegment(name: string): RouteSegment {
    // Route group: (name)
    if (name.startsWith('(') && name.endsWith(')')) {
      return { path: '', type: 'group' };
    }

    // Optional catch-all: [[...name]]
    if (name.startsWith('[[...') && name.endsWith(']]')) {
      const paramName = name.slice(5, -2);
      return { path: `*`, type: 'optional-catch-all', paramName };
    }

    // Catch-all: [...name]
    if (name.startsWith('[...') && name.endsWith(']')) {
      const paramName = name.slice(4, -1);
      return { path: `*`, type: 'catch-all', paramName };
    }

    // Dynamic: [name]
    if (name.startsWith('[') && name.endsWith(']')) {
      const paramName = name.slice(1, -1);
      return { path: `:${paramName}`, type: 'dynamic', paramName };
    }

    // Static
    return { path: name, type: 'static' };
  }

  /**
   * Handle a route file (page.tsx, layout.tsx, etc.)
   */
  private async handleRouteFile(
    dir: string,
    filename: string,
    segments: RouteSegment[]
  ): Promise<void> {
    const baseName = filename.replace(/\.(ts|tsx|js|jsx)$/, '');
    const filePath = `${dir}/${filename}`;
    const routePath = this.segmentsToPath(segments);

    switch (baseName) {
      case 'page':
        await this.registerPage(routePath, filePath, segments);
        break;

      case 'layout':
        await this.registerLayout(routePath, filePath);
        break;

      case 'route':
        await this.registerAPIRoute(routePath, filePath);
        break;

      case 'loading':
        await this.registerLoading(routePath, filePath);
        break;

      case 'error':
        await this.registerError(routePath, filePath);
        break;

      case 'not-found':
        await this.registerNotFound(routePath, filePath);
        break;
    }
  }

  /**
   * Convert segments to URL path
   */
  private segmentsToPath(segments: RouteSegment[]): string {
    if (segments.length === 0) return '/';

    const path = segments
      .filter(s => s.type !== 'group')
      .map(s => s.path)
      .join('/');

    return '/' + path;
  }

  /**
   * Register a page route
   */
  private async registerPage(
    routePath: string,
    filePath: string,
    segments: RouteSegment[]
  ): Promise<void> {
    const handler = await this.createPageHandler(filePath, routePath);
    this.router.add('GET', routePath, handler);
  }

  /**
   * Create a page handler
   */
  private async createPageHandler(filePath: string, routePath: string): Promise<RouteHandler> {
    return async (ctx: Context): Promise<Response> => {
      try {
        // Import page module
        const pageModule: PageModule = await import(
          Bun.resolveSync('./' + filePath, process.cwd())
        );

        const props: PageProps = {
          params: ctx.params,
          searchParams: ctx.searchParams,
        };

        // Generate metadata
        let metadata: Metadata = pageModule.metadata || {};
        if (pageModule.generateMetadata) {
          metadata = await pageModule.generateMetadata(props);
        }

        // Render page content
        let content = await pageModule.default(props);

        // Wrap with layouts (from root to current)
        content = await this.wrapWithLayouts(content, routePath, ctx.params);

        // Generate full HTML
        const html = this.generateHTML(content, metadata);

        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      } catch (error) {
        console.error(`Error rendering page ${filePath}:`, error);
        return new Response('Internal Server Error', { status: 500 });
      }
    };
  }

  /**
   * Register a layout
   */
  private async registerLayout(routePath: string, filePath: string): Promise<void> {
    try {
      const layoutModule: LayoutModule = await import(
        Bun.resolveSync('./' + filePath, process.cwd())
      );
      this.layouts.set(routePath, layoutModule);
    } catch (error) {
      console.error(`Error loading layout ${filePath}:`, error);
    }
  }

  /**
   * Wrap content with all applicable layouts
   */
  private async wrapWithLayouts(
    content: string,
    routePath: string,
    params: Record<string, string>
  ): Promise<string> {
    // Get all parent paths
    const paths = this.getParentPaths(routePath);
    let wrappedContent = content;

    // Apply layouts from deepest to root
    for (const path of paths.reverse()) {
      const layout = this.layouts.get(path);
      if (layout) {
        const props: LayoutProps = { children: wrappedContent, params };
        wrappedContent = await layout.default(props);
      }
    }

    // Apply root layout
    const rootLayout = this.layouts.get('/');
    if (rootLayout) {
      const props: LayoutProps = { children: wrappedContent, params };
      wrappedContent = await rootLayout.default(props);
    }

    return wrappedContent;
  }

  /**
   * Get all parent paths for a route
   */
  private getParentPaths(routePath: string): string[] {
    const parts = routePath.split('/').filter(Boolean);
    const paths: string[] = [];

    for (let i = 1; i <= parts.length; i++) {
      paths.push('/' + parts.slice(0, i).join('/'));
    }

    return paths;
  }

  /**
   * Register an API route (route.ts)
   */
  private async registerAPIRoute(routePath: string, filePath: string): Promise<void> {
    try {
      const routeModule: RouteModule = await import(
        Bun.resolveSync('./' + filePath, process.cwd())
      );

      const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

      for (const method of methods) {
        const handler = routeModule[method];
        if (handler) {
          this.router.add(method, routePath, async (ctx: Context) => {
            const result = await handler(ctx.req, { params: ctx.params });
            return result;
          });
        }
      }
    } catch (error) {
      console.error(`Error loading API route ${filePath}:`, error);
    }
  }

  /**
   * Register loading component
   */
  private async registerLoading(routePath: string, filePath: string): Promise<void> {
    // Loading components are used for streaming/suspense
    // For now, store reference for future use
  }

  /**
   * Register error component
   */
  private async registerError(routePath: string, filePath: string): Promise<void> {
    // Error components for error boundaries
    // Store reference for error handling
  }

  /**
   * Register not-found component
   */
  private async registerNotFound(routePath: string, filePath: string): Promise<void> {
    // Custom 404 pages
  }

  /**
   * Generate full HTML document
   */
  private generateHTML(content: string, metadata: Metadata): string {
    const metaTags = generateMetaTags(metadata);
    const title = typeof metadata.title === 'string'
      ? metadata.title
      : metadata.title?.default || 'Oven App';

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.escapeHtml(title)}</title>
    ${metaTags}
  </head>
  <body>
    ${content}
  </body>
</html>`;
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Get the router instance
   */
  getRouter(): Router {
    return this.router;
  }
}

/**
 * Create and scan an app router
 */
export async function createAppRouter(appDir: string = 'app'): Promise<Router> {
  const appRouter = new AppRouter(appDir);
  return await appRouter.scan();
}
