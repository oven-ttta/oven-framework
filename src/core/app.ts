import type { OvenConfig, Middleware, Context, NextFunction } from '../types';
import { Router } from './router';
import { serve } from './server';
import { createAppRouter } from './app-router';

const defaultConfig: Required<OvenConfig> = {
  port: 3000,
  appDir: 'app',
  publicDir: 'public',
  dev: process.env.NODE_ENV !== 'production',
  basePath: '',
};

export class Oven {
  private config: Required<OvenConfig>;
  private router: Router;
  private middlewares: Middleware[] = [];
  private initialized: boolean = false;

  constructor(config: OvenConfig = {}) {
    this.config = { ...defaultConfig, ...config };
    this.router = new Router();
  }

  /**
   * Initialize the app router by scanning the app directory
   */
  async init(): Promise<void> {
    if (this.initialized) return;

    const appRouter = await createAppRouter(this.config.appDir);
    this.router.merge(appRouter);
    this.initialized = true;
  }

  /**
   * Add middleware to the application
   */
  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * Add a GET route
   */
  get(path: string, handler: (ctx: Context) => Response | Promise<Response>): this {
    this.router.add('GET', path, handler);
    return this;
  }

  /**
   * Add a POST route
   */
  post(path: string, handler: (ctx: Context) => Response | Promise<Response>): this {
    this.router.add('POST', path, handler);
    return this;
  }

  /**
   * Add a PUT route
   */
  put(path: string, handler: (ctx: Context) => Response | Promise<Response>): this {
    this.router.add('PUT', path, handler);
    return this;
  }

  /**
   * Add a DELETE route
   */
  delete(path: string, handler: (ctx: Context) => Response | Promise<Response>): this {
    this.router.add('DELETE', path, handler);
    return this;
  }

  /**
   * Add a PATCH route
   */
  patch(path: string, handler: (ctx: Context) => Response | Promise<Response>): this {
    this.router.add('PATCH', path, handler);
    return this;
  }

  /**
   * Get the router instance
   */
  getRouter(): Router {
    return this.router;
  }

  /**
   * Get the configuration
   */
  getConfig(): Required<OvenConfig> {
    return this.config;
  }

  /**
   * Handle an incoming request
   */
  async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const ctx = this.createContext(req, url);

    // Run through middleware chain
    const runMiddleware = async (index: number): Promise<Response> => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        return await middleware(ctx, () => runMiddleware(index + 1));
      }

      // After all middleware, try to match a route
      const match = this.router.match(req.method, url.pathname);

      if (match) {
        ctx.params = match.params;
        return await match.route.handler(ctx);
      }

      // 404 Not Found
      return new Response('Not Found', { status: 404 });
    };

    try {
      return await runMiddleware(0);
    } catch (error) {
      console.error('Oven Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  /**
   * Create a context object from a request
   */
  private createContext(req: Request, url: URL): Context {
    const cookieStore = new Map<string, string>();
    const setCookies: string[] = [];

    // Parse cookies from request
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookieStore.set(name, decodeURIComponent(value));
        }
      });
    }

    return {
      req,
      params: {},
      searchParams: Object.fromEntries(url.searchParams),
      headers: req.headers,
      pathname: url.pathname,
      method: req.method,
      cookies: {
        get: (name: string) => cookieStore.get(name),
        set: (name, value, options = {}) => {
          let cookie = `${name}=${encodeURIComponent(value)}`;
          if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
          if (options.expires) cookie += `; Expires=${options.expires.toUTCString()}`;
          if (options.path) cookie += `; Path=${options.path}`;
          if (options.domain) cookie += `; Domain=${options.domain}`;
          if (options.secure) cookie += '; Secure';
          if (options.httpOnly) cookie += '; HttpOnly';
          if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
          setCookies.push(cookie);
          cookieStore.set(name, value);
        },
        delete: (name: string) => {
          setCookies.push(`${name}=; Max-Age=0`);
          cookieStore.delete(name);
        },
      },
    };
  }

  /**
   * Start the server
   */
  async listen(port?: number): Promise<void> {
    await this.init();
    const finalPort = port ?? this.config.port;
    await serve(this, finalPort);
  }
}

/**
 * Create a new Oven application
 */
export function createApp(config: OvenConfig = {}): Oven {
  return new Oven(config);
}
