import type { Context, RouteHandler, APIHandler } from '../types';

/**
 * Define a page route handler
 */
export function defineRoute(handler: RouteHandler): RouteHandler {
  return handler;
}

/**
 * Define an API route handler
 * Automatically handles JSON serialization for object responses
 */
export function defineAPIRoute(handler: APIHandler): RouteHandler {
  return async (ctx: Context): Promise<Response> => {
    // Parse JSON body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(ctx.method)) {
      const contentType = ctx.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        try {
          ctx.body = await ctx.req.json();
        } catch {
          return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
        }
      }
    }

    const result = await handler(ctx);

    // If result is already a Response, return it
    if (result instanceof Response) {
      return result;
    }

    // Otherwise, serialize to JSON
    return Response.json(result);
  };
}

/**
 * JSON response helper
 */
export function json(data: unknown, init?: ResponseInit): Response {
  return Response.json(data, init);
}

/**
 * Redirect response helper
 */
export function redirect(url: string, status: 302 | 301 | 307 | 308 = 302): Response {
  return new Response(null, {
    status,
    headers: { Location: url },
  });
}

/**
 * HTML response helper
 */
export function html(content: string, init?: ResponseInit): Response {
  return new Response(content, {
    ...init,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...init?.headers,
    },
  });
}

/**
 * Text response helper
 */
export function text(content: string, init?: ResponseInit): Response {
  return new Response(content, {
    ...init,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...init?.headers,
    },
  });
}
