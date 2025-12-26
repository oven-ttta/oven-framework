import type { Route, RouteHandler } from '../types';

interface RouteMatch {
  route: Route;
  params: Record<string, string>;
}

export class Router {
  private routes: Map<string, Route[]> = new Map();

  /**
   * Add a route to the router
   */
  add(method: string, path: string, handler: RouteHandler): void {
    const { pattern, paramNames } = this.pathToRegex(path);

    const route: Route = {
      path,
      pattern,
      paramNames,
      handler,
      method,
    };

    const methodRoutes = this.routes.get(method) || [];
    methodRoutes.push(route);
    this.routes.set(method, methodRoutes);
  }

  /**
   * Match a request to a route
   */
  match(method: string, pathname: string): RouteMatch | null {
    const methodRoutes = this.routes.get(method) || [];

    for (const route of methodRoutes) {
      const match = pathname.match(route.pattern);

      if (match) {
        const params: Record<string, string> = {};

        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });

        return { route, params };
      }
    }

    return null;
  }

  /**
   * Convert a path pattern to a regex
   * Supports:
   * - /users/:id -> /users/123
   * - /files/* -> /files/any/path/here
   * - /posts/[slug] -> /posts/my-post
   * - /blog/[...path] -> /blog/2024/01/my-post
   */
  private pathToRegex(path: string): { pattern: RegExp; paramNames: string[] } {
    const paramNames: string[] = [];

    let regexStr = path
      // Handle catch-all routes [...param]
      .replace(/\[\.\.\.(\w+)\]/g, (_, name) => {
        paramNames.push(name);
        return '(.+)';
      })
      // Handle bracket params [param]
      .replace(/\[(\w+)\]/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      })
      // Handle colon params :param
      .replace(/:(\w+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      })
      // Handle wildcard *
      .replace(/\*/g, '.*');

    // Escape special regex characters (except what we've already processed)
    regexStr = regexStr.replace(/([.+?^${}()|[\]\\])/g, (match) => {
      // Don't escape our already-processed patterns
      if (match === '(' || match === ')' || match === '[' || match === ']') {
        return match;
      }
      return '\\' + match;
    });

    return {
      pattern: new RegExp(`^${regexStr}$`),
      paramNames,
    };
  }

  /**
   * Get all registered routes
   */
  getRoutes(): Map<string, Route[]> {
    return this.routes;
  }

  /**
   * Merge another router into this one
   */
  merge(router: Router, prefix: string = ''): void {
    for (const [method, routes] of router.getRoutes()) {
      for (const route of routes) {
        this.add(method, prefix + route.path, route.handler);
      }
    }
  }
}

/**
 * Create a new router instance
 */
export function createRouter(): Router {
  return new Router();
}
